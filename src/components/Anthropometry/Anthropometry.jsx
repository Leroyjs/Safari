import React, { Component } from 'react';
import Preloader from '../Preloader';
import Header from '../Header';
import Volume from '../Volume';
import Result from '../Result';
import Weight from '../Weight';
import ModalInfo from '../ModalInfo';
import './style.css';

export default class Anthropometry extends Component {
    state = {
        pageData: {},
        myCoach: true,
        isLoaded: false,
        modalInfo: false
    };
    componentDidMount() {
        let now = new Date();
        let modalInfo = false;
        if (now.getDate() == 1) {
            modalInfo = true;
        }
        let url = 'https://bagiran.ru/anthropometry';
        fetch(url, {
            method: 'POST',
            credentials: 'include',
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
                        console.warn(data);
                        this.setState({
                            pageData: data,
                            myCoach,
                            isLoaded: true,
                            modalInfo
                        });
                    });
            });
    }
    update = () => {
        console.warn('updata');
        let url = 'https://bagiran.ru/anthropometry';
        fetch(url, {
            method: 'POST',
            credentials: 'include',
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
                            myCoach
                        });
                    });
            });
    };
    handleModalInfo = (modalInfo) => {
        this.setState({
            modalInfo
        });
    };
    render() {
        const { pageData, myCoach, isLoaded, modalInfo } = this.state;
        return (
            <>
                {!isLoaded && <Preloader></Preloader>}
                <main className="anthropometry">
                    <Header
                        title="Антропометрия"
                        desc="Показатели фиксируются 1 раз в месяц 1 числа каждого месяца"
                    ></Header>
                    {myCoach ? (
                        <Result pageData={pageData.result}></Result>
                    ) : (
                        <Result
                            url={'https://bagiran.ru/anthropometry/save-photo'}
                            pageData={pageData.result}
                            update={this.update}
                        ></Result>
                    )}
                    {myCoach ? (
                        <Volume
                            pageData={pageData.volume}
                            anthropometry="true"
                        ></Volume>
                    ) : (
                        <Volume
                            pageData={pageData.volume}
                            anthropometry="true"
                            modalData={{
                                url: '/client-trainer'
                            }}
                            isClientModal={true}
                            update={this.update}
                        ></Volume>
                    )}
                    {myCoach ? (
                        <Weight
                            pageData={pageData.weight}
                            anthropometry="true"
                            name="Вес (кг)"
                        ></Weight>
                    ) : (
                        <Weight
                            pageData={pageData.weight}
                            anthropometry="true"
                            name="Вес (кг)"
                            isClientModal={true}
                            update={this.update}
                            modalData={{
                                url: '/anthropometry/save-weight',
                                title: 'Ваш вес',
                                inputs: {
                                    title: 'Вес',
                                    postArg: 'val'
                                }
                            }}
                        ></Weight>
                    )}
                    {myCoach ? (
                        <Weight
                            pageData={pageData.puls}
                            anthropometry="true"
                            name="Пульс  (уд. мин)"
                        ></Weight>
                    ) : (
                        <Weight
                            update={this.update}
                            isClientModal={true}
                            pageData={pageData.puls}
                            anthropometry="true"
                            name="Пульс  (уд. мин)"
                            modalData={{
                                url: '/anthropometry/save-pulse',
                                title: 'Ваш пульс',
                                inputs: {
                                    title: 'Пульс',
                                    postArg: 'val'
                                }
                            }}
                        ></Weight>
                    )}
                    {modalInfo && (
                        <ModalInfo
                            handleModal={this.handleModalInfo}
                        ></ModalInfo>
                    )}
                </main>
            </>
        );
    }
}
