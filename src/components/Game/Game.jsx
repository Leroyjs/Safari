import React, { Component } from 'react';
import Header from '../Header';
import Video from '../Video';
import Tasks from '../Tasks';
import PerformanceBonuses from '../PerformanceBonuses';
import ModalPass from '../ModalPass';
import Preloader from '../Preloader';
import './style.css';

export default class Game extends Component {
    state = {
        pageData: {},
        myCoach: true,
        modal: false,
        isLoaded: false
    };
    componentDidMount() {
        const { whoIsIt } = this.props;
        let url;
        if (whoIsIt === 'isClient') {
            url = 'https://bagiran.ru/game/customer';
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            })
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    fetch('https://bagiran.ru/api/my-trainer', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Access-Control-Request-Headers':
                                'X-Requested-With, Origin',
                            Origin: 'https://localhost:3000/'
                        }
                    })
                        .then((result) => {
                            return result.json();
                        })
                        .then((myCoach) => {
                            console.warn(myCoach);
                            this.setState({
                                pageData: data,
                                myCoach,
                                isLoaded: true
                            });
                        });
                });
        }
        if (whoIsIt === 'isTrainer') {
            url = 'https://bagiran.ru/game/trainer';
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            })
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    this.setState({
                        pageData: data,
                        isLoaded: true
                    });
                });
        }
    }
    handleModal = (modal) => {
        this.setState({
            modal
        });
    };
    render() {
        const { pageData, myCoach, modal, isLoaded } = this.state;
        return (
            <>
                {!isLoaded && <Preloader></Preloader>}
                <main className="game">
                    <Header
                        title="Игра"
                        desc="Добро пожаловать! Смотри видео, выполняй задания, повышай уровень, получай бонусы"
                    ></Header>
                    <Video pageData={pageData.video}></Video>
                    <Tasks pageData={pageData.tasks}>
                        {!myCoach && (
                            <button
                                className={'button_standart'}
                                style={{ marginLeft: '0' }}
                                onClick={() => this.handleModal(true)}
                            >
                                Сдать задание дежурному тренеру
                            </button>
                        )}
                    </Tasks>
                    <PerformanceBonuses
                        pageData={pageData.bonus}
                    ></PerformanceBonuses>
                    {modal && (
                        <ModalPass
                            title={'Введите код тренера'}
                            url={'/game/duty-ok'}
                            addData={''}
                            handleModal={this.handleModal}
                        ></ModalPass>
                    )}
                </main>
            </>
        );
    }
}
