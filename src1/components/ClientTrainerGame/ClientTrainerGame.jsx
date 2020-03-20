import React, { Component } from 'react';
import ClientTrainerHeader from '../ClientTrainerHeader';
import Video from '../Video';
import Tasks from '../Tasks';
import PerformanceBonuses from '../PerformanceBonuses';
import ModalBool from '../ModalBool';
import './style.css';

export default class Game extends Component {
    state = {
        pageData: {},
        modal: false
    };
    componentDidMount() {
        const { activeId } = this.props;
        let url = ' /client-trainer/game';
        const data = 'id=' + activeId;
        console.warn(url, data);
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Request-Headers': 'X-Requested-With, Origin',
                Origin: 'https://localhost:3000/'
            }
        })
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    pageData: data
                });
            });
    }
    handleModal = (modal) => {
        const { activeId } = this.props;
        let url = ' /client-trainer/game';
        const data = 'id=' + activeId;
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Request-Headers': 'X-Requested-With, Origin',
                Origin: 'https://localhost:3000/'
            }
        })
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    pageData: data,
                    modal
                });
            });
    };
    render() {
        const { pageData, modal } = this.state;
        console.warn(pageData);
        const { activeId } = this.props;
        let button = false;
        if (pageData.tasks) {
            button = pageData.tasks.tasksList.some((item) => {
                return item.type === 'task_trainer' && item.state === false;
            });
        }
        return (
            <main className="client-trainer-game">
                <ClientTrainerHeader
                    title="Игра"
                    desc="Добро пожаловать! Смотри видео, выполняй задания, повышай уровень, получай бонусы"
                ></ClientTrainerHeader>
                <Video pageData={pageData.video}></Video>
                <Tasks pageData={pageData.tasks}>
                    {button && (
                        <button
                            className={'button_standart'}
                            onClick={() => this.handleModal(true)}
                        >
                            Подтвердить задание
                        </button>
                    )}
                </Tasks>

                <PerformanceBonuses
                    pageData={pageData.bonus}
                ></PerformanceBonuses>
                {modal && (
                    <ModalBool
                        url="/client-trainer/game/ok-task"
                        title="Подтвердить сдачу задания?"
                        handleModal={this.handleModal}
                        addData={'id=' + activeId}
                    ></ModalBool>
                )}
            </main>
        );
    }
}
