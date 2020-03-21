import React, { Component } from 'react';
import arrowLeft from './img/left-arrow.png';
import arrowRight from './img/right-arrow.png';
import './style.css';

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.calendar = React.createRef();
    }
    createCalendar(elem, year, month, activeDay) {
        const { pageData } = this.props;

        let mon = month - 1;
        let d = new Date(year, mon);
        let table = '';

        for (let i = 0; i < this.getDay(d); i++) {
            table += '<div class="calendar__item"></div>';
        }
        let g = 0;
        let b = 0;
        let y = 0;
        console.log(pageData);
        while (d.getMonth() === mon) {
            table +=
                '<div id=' +
                year +
                '-' +
                month +
                '-' +
                d.getDate() +
                ' class="calendar__item ' +
                (activeDay == d.getDate() && ' calendar_red ') +
                ' ' +
                (pageData.green[g] == d.getDate() && ' calendar_green ') +
                (pageData.blue[b] == d.getDate() && ' calendar_blue ') +
                (pageData.yellow[y] == d.getDate() && ' calendar_yellow ') +
                '">' +
                d.getDate() +
                '</div>';
            if (pageData.green[g] == d.getDate()) {
                g++;
            }
            if (pageData.blue[b] == d.getDate()) {
                b++;
            }
            if (pageData.yellow[y] == d.getDate()) {
                y++;
            }
            d.setDate(d.getDate() + 1);
        }

        if (this.getDay(d) !== 0) {
            for (let i = this.getDay(d); i < 7; i++) {
                table += '<div class="calendar__item"></div>';
            }
        }

        elem.innerHTML = table;
        const elemChildren = elem.children;
        for (let i = 0; i < elemChildren.length; i++) {
            elemChildren[i].addEventListener('click', () => {
                const id = elemChildren[i].id.split('-');
                let date = {
                    year: +id[0],
                    month: +id[1],
                    day: +id[2]
                };

                const { handleChange } = this.props;
                handleChange(date);
            });
        }
    }

    getDay(date) {
        let day = date.getDay();
        if (day === 0) day = 7;
        return day - 1;
    }
    componentDidUpdate() {
        const calendar = this.calendar.current;
        const { year, month, day } = this.props.activeDate;
        this.createCalendar(calendar, year, month, day);
    }
    nextMonth = () => {
        const { handleChange } = this.props;
        const { year, month } = this.props.activeDate;
        if (month < 12) {
            handleChange({
                year,
                month: month + 1,
                day: 1
            });
        } else {
            handleChange({
                year: year + 1,
                month: 1,
                day: 1
            });
        }
    };
    earlyMonth = () => {
        const { handleChange } = this.props;
        const { year, month, day } = this.props.activeDate;
        if (month > 1) {
            handleChange({
                year,
                month: month - 1,
                day: 1
            });
        } else {
            handleChange({
                year: year - 1,
                month: 12,
                day: 1
            });
        }
    };
    render() {
        let month = '';
        // eslint-disable-next-line default-case
        switch (this.props.activeDate.month - 1) {
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
                    <div ref={this.calendar} className="calendar__main"></div>
                </section>
            </>
        );
    }
}
