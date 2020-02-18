import React, { Component } from 'react';
import './style.css';

let array = [
    {
        time: '14:00-17:00',
        hours: '3',
        supports: '5'
    },
    {
        time: '14:00-17:00',
        hours: '3',
        supports: '5'
    },
    {
        time: '14:00-17:00',
        hours: '3',
        supports: '5'
    },
    {
        time: '14:00-17:00',
        hours: '3',
        supports: '5'
    }
];
export default class CalendarStatDuty extends Component {
    render() {
        return (
            <section className="calendar-stat-duty">
                <h2>30 Января</h2>
                <div className="calendar-stat-duty__name-row">
                    <h3>Время</h3>
                    <h3>Часов</h3>
                    <h3>Помощи</h3>
                </div>
                {array.map((dutyItem, index) => (
                    <div
                        key={index + 'duty'}
                        className="calendar-stat-duty__row"
                    >
                        <span>{dutyItem.time}</span>
                        <span>{dutyItem.hours}</span>
                        <span>{dutyItem.supports}</span>
                    </div>
                ))}
                <button>+</button>
                <div className="calendar-stat-duty__bottom-row">
                    <span>Вы получаете 71 балл!</span>
                </div>
            </section>
        );
    }
}
