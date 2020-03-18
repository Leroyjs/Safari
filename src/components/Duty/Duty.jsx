import React, { Component } from 'react';
import Header from '../Header';
import Calendar from '../Calendar';
import CalendarStatDuty from '../CalendarStatDuty/';
import DutySales from '../DutySales/';
import ModalBool from '../ModalBool';
import ModalDutyRating from '../ModalDutyRating';
import './style.css';
export default class Duty extends Component {
    state = {
        pageData: {},
        dataList: {},
        activeDate: {
            day: 0,
            month: 0,
            year: 0
        },
        isDuty: false,
        modal: false,
        code: 0
    };
    componentDidMount() {
        const now = new Date();
        let url = 'https://bagiran.ru/calendar/';
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
                fetch('https://bagiran.ru/calendar/is-duty', {
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
                    .then((isDuty) => {
                        console.log(isDuty);
                        this.setState({
                            pageData: data,
                            activeDate: {
                                year: now.getFullYear(),
                                month: 1 + now.getMonth(),
                                day: now.getDate()
                            },
                            dataList: data.days,
                            isDuty
                        });
                    });
            });
    }
    update = () => {
        const now = new Date();
        let url = 'https://bagiran.ru/calendar/';
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
                fetch('https://bagiran.ru/calendar/is-duty', {
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
                    .then((isDuty) => {
                        console.log(isDuty);
                        this.setState({
                            pageData: data,
                            activeDate: {
                                year: now.getFullYear(),
                                month: 1 + now.getMonth(),
                                day: now.getDate()
                            },
                            dataList: data.days,
                            isDuty
                        });
                    });
            });
    };
    handleChange = (data) => {
        const { month, year } = this.state.activeDate;
        if (data.month === month && data.year === year) {
            console.log(data);
            this.setState({
                activeDate: data
            });
        } else {
            const date = 'date=' + data.year + '-' + data.month;
            const url = 'https://bagiran.ru/calendar/get-all-days';
            fetch(url, {
                method: 'POST',
                body: date,
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
                .then((fulDays) => {
                    this.setState({
                        dataList: fulDays.days,
                        activeDate: data
                    });
                    console.log(this.state);
                });
        }
    };
    handleModal = (modal) => {
        if (modal) {
            fetch('https://bagiran.ru/calendar/add-code', {
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
                .then((code) => {
                    console.log(code);
                    this.setState({
                        code,
                        modal
                    });
                });
        } else {
            fetch('https://bagiran.ru/calendar/del-code', {
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
                .then((code) => {
                    console.log(code);
                    this.setState({
                        modal
                    });
                });
        }
    };
    handleClose = (close) => {
        this.setState({
            close
        });
    };
    render() {
        const {
            pageData,
            activeDate,
            dataList,
            isDuty,
            modal,
            code,
            close
        } = this.state;
        console.warn(pageData);
        return (
            <main className="duty">
                <Header
                    title="Дежурство"
                    desc={
                        <>
                            Тренер фиксирует дежурство в календаре <br />
                            (за заполненный день 3 балла) <br />
                            (за каждую помощь 3 балла) <br />
                            (за продажу с дежурства 50 баллов)
                        </>
                    }
                >
                    {isDuty && (
                        <button
                            className={'button_standart'}
                            style={{ marginLeft: '0' }}
                            onClick={() => this.handleModal(true)}
                        >
                            Сгенерировать код
                        </button>
                    )}
                </Header>
                <Calendar
                    handleChange={this.handleChange}
                    activeDate={activeDate}
                    pageData={dataList}
                ></Calendar>
                <CalendarStatDuty activeDate={activeDate}></CalendarStatDuty>
                <DutySales pageData={pageData.dutySales}></DutySales>
                {modal && (
                    <ModalBool
                        url={'/calendar/del-code'}
                        title={code}
                        addData=""
                        handleModal={this.handleModal}
                    ></ModalBool>
                )}
                {Boolean(pageData.prevDutyId) && !close && (
                    <ModalDutyRating
                        addData={'id=' + pageData.prevDutyId}
                        title={'Чек-лист'}
                        url={'/calendar/score-duty'}
                        update={this.update}
                        handleClose={this.handleClose}
                    ></ModalDutyRating>
                )}
            </main>
        );
    }
}
