import React, { Component } from 'react';
import './style.css';
let array = [
    {
        data: '03.01',
        name: 'Ivan I.I.',
        phone: '89512700000',
        time: '13:00',
        rating: '5'
    },
    {
        data: '03.01',
        name: 'Ivan I.I.',
        phone: '89512700000',
        time: '13:00',
        rating: '5'
    },
    {
        data: '03.01',
        name: 'Ivan I.I.',
        phone: '89512700000',
        time: '13:00',
        rating: '5'
    }
];
export default class IntroductoryTableCall extends Component {
    render() {
        return (
            <section className="introductory-table">
                <div className="introductory-table__inner">
                    <h2>Звонки на запись (за месяц)</h2>
                    <div className="introductory-table__name-row">
                        <span className="introductory-table__little-item">
                            Дата
                        </span>
                        <span>ФИО</span>
                        <span>Телефон</span>
                        <span className="introductory-table__little-item">
                            Время
                        </span>
                        <span className="introductory-table__little-item">
                            Оценка
                        </span>
                    </div>
                    {array.map((row, index) => (
                        <div
                            key={index + '-introductory-table'}
                            className="introductory-table__main-row"
                        >
                            <span className="introductory-table__little-item">
                                {row.data}
                            </span>
                            <span>{row.name}</span>
                            <span>{row.phone}</span>
                            <span className="introductory-table__little-item">
                                {row.time}
                            </span>
                            <span className="introductory-table__little-item">
                                {row.rating}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
}
