import React, { Component } from 'react';
import HeaderPersonalArea from '../HeaderPersonalArea/';
import Progress from '../Progress';
import TrainerBonuses from '../TrainerBonuses';
import Volume from '../Volume';
import Result from '../Result';
import Bonuses from '../Bonuses';
import Calendar from '../Calendar';
import ClientsList from '../ClientsList';
import ModalVacation from '../ModalVacation';
import CalendarListClients from '../CalendarListClients';
import './style.css';

export default class PersonalArea extends Component {
    state = {
        pageData: {},
        dataList: {},
        activeDate: {
            day: 0,
            month: 0,
            year: 0
        },
        myCoach: true,
        vacationList: []
    };

    componentDidMount() {
        const { whoIsIt } = this.props;
        if (whoIsIt === 'isClient') {
            let url = '/main/customer';
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
                    console.warn(data);
                    fetch('/api/my-trainer', {
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
        }
        if (whoIsIt === 'isTrainer') {
            const now = new Date();
            let url = '/main/trainer';
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
                    fetch('/api/get-holiday', {
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
                        .then((vacationList) => {
                            console.log(data);
                            this.setState({
                                pageData: data,
                                activeDate: {
                                    year: now.getFullYear(),
                                    month: 1 + now.getMonth(),
                                    day: now.getDate()
                                },
                                dataList: data.days,
                                vacationList
                            });
                        });
                });
        }
    }

    handleChange = (data) => {
        const { month, year } = this.state.activeDate;
        if (data.month === month && data.year === year) {
            console.log(data);
            this.setState({
                activeDate: data
            });
        } else {
            const date = 'date=' + data.year + '-' + data.month;
            const url = '/main/trainer-get-all-days';
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
    updata = () => {
        const { whoIsIt } = this.props;
        if (whoIsIt === 'isClient') {
            let url = '/main/customer';
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
                    console.warn(data);
                    fetch('/api/my-trainer', {
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
        }
        if (whoIsIt === 'isTrainer') {
            const now = new Date();
            let url = '/main/trainer';
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
                    fetch('/api/get-holiday', {
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
                        .then((vacationList) => {
                            console.log(data);
                            this.setState({
                                pageData: data,
                                activeDate: {
                                    year: now.getFullYear(),
                                    month: 1 + now.getMonth(),
                                    day: now.getDate()
                                },
                                dataList: data.days,
                                vacationList
                            });
                        });
                });
        }
    };
    handleModal = (modal) => {
        this.setState({
            modal
        });
    };
    render() {
        const { data, whoIsIt } = this.props;
        const {
            pageData,
            activeDate,
            dataList,
            myCoach,
            modal,
            vacationList
        } = this.state;
        console.warn(pageData);
        let lvl = 0;
        if (pageData.header) {
            lvl = pageData.header.lvl;
        }
        return (
            <div className="personal-area">
                <HeaderPersonalArea
                    whoIsIt={whoIsIt}
                    data={data}
                    updata={this.updata}
                    pageData={pageData.header}
                    myCoach={myCoach}
                >
                    {whoIsIt === 'isTrainer' && (
                        <button
                            style={{
                                width: 'auto',
                                height: 'auto',
                                marginTop: '8px',
                                marginLeft: '30px',
                                padding: '0 20px'
                            }}
                            onClick={() => this.handleModal(true)}
                        >
                            Отпуск
                        </button>
                    )}
                </HeaderPersonalArea>
                {whoIsIt === 'isClient' && (
                    <main>
                        <Progress pageData={pageData.chartWeight}></Progress>
                        <Volume pageData={pageData.volume}></Volume>
                        <Result pageData={pageData.result}></Result>
                        <Bonuses
                            lvl={lvl}
                            update={this.updata}
                            pageData={pageData.bonus}
                        ></Bonuses>
                    </main>
                )}
                {whoIsIt === 'isTrainer' && (
                    <main>
                        <Calendar
                            handleChange={this.handleChange}
                            activeDate={activeDate}
                            pageData={dataList}
                        ></Calendar>
                        <div
                            style={{
                                backgroundColor: '#fff',
                                padding: '0 14px'
                            }}
                        >
                            <span
                                style={{
                                    paddingBottom: '7px',
                                    fontSize: '15px',
                                    fontWeight: '600'
                                }}
                            >
                                Текущие отпуска:
                            </span>
                            {vacationList.length ? (
                                vacationList.map((item, index) => (
                                    <div
                                        key={index + '-vacationList'}
                                        style={{
                                            borderTop:
                                                index && '1px #cdcdcd solid',
                                            fontSize: '11px',
                                            padding: '7px'
                                        }}
                                    >
                                        <span>
                                            Начало отпуска: {item.date_from}
                                        </span>
                                        <br />
                                        <span>
                                            Конец отпуска: {item.date_to}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <span> пусто</span>
                            )}
                        </div>
                        <CalendarListClients
                            activeDate={activeDate}
                            clientsList={pageData.clientsList}
                        ></CalendarListClients>
                        <TrainerBonuses
                            lvl={lvl}
                            update={this.updata}
                            pageData={pageData.bonus}
                        ></TrainerBonuses>
                        <ClientsList
                            update={this.updata}
                            handleChangeId={this.props.handleChangeId}
                            pageData={pageData.clientsList}
                        ></ClientsList>
                        {modal && (
                            <ModalVacation
                                title={'Начало отпуска'}
                                addData={''}
                                updata={this.updata}
                                handleModal={this.handleModal}
                            ></ModalVacation>
                        )}
                    </main>
                )}
            </div>
        );
    }
}
