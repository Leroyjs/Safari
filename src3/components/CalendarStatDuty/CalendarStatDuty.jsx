import React, { Component } from 'react';
import ModalTrainerDuty from '../ModalTrainerDuty';
import './style.css';

export default class CalendarStatDuty extends Component {
    state = {
        pageData: {
            time: []
        },
        date: '',
        modal: false,
        canUpate: false
    };
    componentDidUpdate() {
        let date = this.props.activeDate;
        console.log(date);
        if (
            (date !== undefined && date !== this.state.date) ||
            this.state.canUpate
        ) {
            date = 'date=' + date.year + '-' + date.month + '-' + date.day;

            const url = '/calendar/get-day';
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                body: date,
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
                    console.log(data);
                    this.setState({
                        canUpate: false,
                        pageData: data,
                        date: this.props.activeDate
                    });
                });
        }
    }
    handleModal = (modal) => {
        this.setState({
            canUpate: true,
            modal
        });
    };
    render() {
        const { pageData, date, modal } = this.state;
        const addData = 'date=' + date.year + '-' + date.month + '-' + date.day;
        let oneChargeList = [];
        for (let i = 0; i < 24; i++) {
            if (i < 10) {
                oneChargeList.push({
                    title: '0' + i + ' : 00',
                    postArg: 'from',
                    value: i
                });
            } else {
                oneChargeList.push({
                    title: i + ' : 00',
                    postArg: 'from',
                    value: i
                });
            }
        }
        console.log(pageData);
        let newDate;
        // eslint-disable-next-line default-case
        switch (date.month - 1) {
            case 0:
                newDate = date.day + ' Января';
                break;
            case 1:
                newDate = date.day + ' Февраля';
                break;
            case 2:
                newDate = date.day + ' Марта';
                break;
            case 3:
                newDate = date.day + ' Апреля';
                break;
            case 4:
                newDate = date.day + ' Мая';
                break;
            case 5:
                newDate = date.day + ' Июня';
                break;
            case 6:
                newDate = date.day + ' Июля';
                break;
            case 7:
                newDate = date.day + ' Августа';
                break;
            case 8:
                newDate = date.day + ' Сентября';
                break;
            case 9:
                newDate = date.day + ' Октября';
                break;
            case 10:
                newDate = date.day + ' Ноября';
                break;
            case 11:
                newDate = date.day + ' Декабря';
                break;
        }
        return (
            <section className="calendar-stat-duty__wrapper">
                <div className="calendar-stat-duty">
                    <h2>{newDate}</h2>
                    <div className="calendar-stat-duty__name-row">
                        <h3>Время</h3>
                        <h3>Часов</h3>
                        <h3>Помощи</h3>
                    </div>
                    <div className="calendar-stat-duty__main-table">
                        <div className="calendar-stat-duty__column">
                            {pageData.time.map((dutyItem, index) => (
                                <div
                                    key={index + 'duty'}
                                    className="calendar-stat-duty__row"
                                >
                                    <span>{dutyItem}</span>
                                </div>
                            ))}
                        </div>
                        <div className="calendar-stat-duty__column calendar-stat-duty__sum-center">
                            {pageData.time.length !== 0 && (
                                <span>{pageData.sum}</span>
                            )}
                        </div>
                        <div className="calendar-stat-duty__column calendar-stat-duty__sum-right">
                            {pageData.time.length !== 0 && (
                                <span>{pageData.supports}</span>
                            )}
                        </div>
                    </div>
                    <button onClick={() => this.handleModal(true)}>+</button>
                    <div className="calendar-stat-duty__bottom-row">
                        {/* <span>Вы получаете 71 балл!</span> */}
                    </div>
                </div>
                {modal && (
                    <ModalTrainerDuty
                        title={'Записаться на дежурство'}
                        addData={addData}
                        url={'/calendar/add'}
                        handleModal={this.handleModal}
                        oneChargeList={oneChargeList}
                    ></ModalTrainerDuty>
                )}
            </section>
        );
    }
}
