import React, { Component } from 'react';
import arrowLeft from './img/left-arrow.png';
import arrowRight from './img/right-arrow.png';
import DayNutrition from '../DayNutrition';
import CalendarListClients from '../CalendarListClients';
import './style.css';

export default class Calendar extends Component {
    state = {
        day: 21,
        month: 11,
        year: 2020
    };
    componentDidUpdate(params) {
        function createCalendar(elem, year, month) {
            let mon = month - 1;
            let d = new Date(year, mon);

            let table = '';

            for (let i = 0; i < getDay(d); i++) {
                table += '<div class="calendar__item"></div>';
            }

            while (d.getMonth() == mon) {
                table +=
                    '<div class="calendar__item">' + d.getDate() + '</div>';

                d.setDate(d.getDate() + 1);
            }

            if (getDay(d) != 0) {
                for (let i = getDay(d); i < 7; i++) {
                    table += '<div class="calendar__item"></div>';
                }
            }

            elem.innerHTML = table;
        }

        function getDay(date) {
            let day = date.getDay();
            if (day == 0) day = 7;
            return day - 1;
        }
        const calendar = document.querySelector('.calendar__main');
        createCalendar(calendar, this.state.year, this.state.month);
    }
    componentDidMount() {
        function createCalendar(elem, year, month) {
            let mon = month - 1;
            let d = new Date(year, mon);

            let table = '';

            for (let i = 0; i < getDay(d); i++) {
                table += '<div class="calendar__item"></div>';
            }

            while (d.getMonth() == mon) {
                table +=
                    '<div class="calendar__item">' + d.getDate() + '</div>';

                d.setDate(d.getDate() + 1);
            }

            if (getDay(d) != 0) {
                for (let i = getDay(d); i < 7; i++) {
                    table += '<div class="calendar__item"></div>';
                }
            }

            elem.innerHTML = table;
        }

        function getDay(date) {
            let day = date.getDay();
            if (day == 0) day = 7;
            return day - 1;
        }
        const calendar = document.querySelector('.calendar__main');
        createCalendar(calendar, this.state.year, this.state.month);
    }
    nextMonth = () => {
        if (this.state.month < 12) {
            this.setState({
                month: this.state.month + 1
            });
        } else {
            this.setState({
                month: 1,
                year: this.state.year + 1
            });
        }
        console.log(this.state);
    };
    earlyMonth = () => {
        if (this.state.month > 1) {
            this.setState({
                month: this.state.month - 1
            });
        } else {
            this.setState({
                month: 12,
                year: this.state.year - 1
            });
        }
        console.log(this.state);
    };
    render() {
        let month = '';
        const { isTrainer, hidden = false } = this.props;
        // eslint-disable-next-line default-case
        switch (this.state.month - 1) {
            case 0:
                month = 'Январь';
                break;
            case 1:
                month = 'Февраль';
                break;
            case 2:
                month = 'Март';
                break;
            case 3:
                month = 'Апрель';
                break;
            case 4:
                month = 'Май';
                break;
            case 5:
                month = 'Июнь';
                break;
            case 6:
                month = 'Июль';
                break;
            case 7:
                month = 'Август';
                break;
            case 8:
                month = 'Сентябрь';
                break;
            case 9:
                month = 'Октябрь';
                break;
            case 10:
                month = 'Ноябрь';
                break;
            case 11:
                month = 'Декабрь';
                break;
        }
        return (
            <>
                <section className="calendar">
                    <div className="calendar__month">
                        <img
                            src={arrowLeft}
                            alt="arrow"
                            className="calendar__arrow"
                            onClick={this.earlyMonth}
                        />
                        <h3>{month}</h3>
                        <img
                            src={arrowRight}
                            className="calendar__arrow"
                            alt="arrow"
                            onClick={this.nextMonth}
                        />
                    </div>
                    <div className="calendar__main"></div>
                </section>
                {!isTrainer && !hidden && <DayNutrition></DayNutrition>}
                {isTrainer && !hidden && (
                    <CalendarListClients></CalendarListClients>
                )}
            </>
        );
    }
}
