import React, { Component } from 'react';
import './style.css';
let array = [
    {
        data: '03.01',
        name: 'Ivan I.I.',
        phone: '89512700000',
        recording: 'Да'
    },
    {
        data: '03.01',
        name: 'Иван И.И',
        phone: '89512700000',
        recording: 'Да'
    },
    {
        data: '03.01',
        name: 'Андреев К.А.',
        phone: '89512700000',
        recording: 'Да'
    },
    {
        data: '03.01',
        name: 'Ivan I.I.',
        phone: '89512700000',
        recording: 'Да'
    }
];
export default class IntroductoryTableCall extends Component {
    render() {
        return (
            <section className="introductory-table">
                <div className="introductory-table__inner">
                    <h2>Звонки на запись (за месяц)</h2>
                    <div className="introductory-table__name-row">
                        <span>Дата</span>
                        <span>ФИО</span>
                        <span>Телефон</span>
                        <span>Запись</span>
                    </div>
                    {array.map((row, index) => (
                        <div
                            key={index + '-introductory-table'}
                            className="introductory-table__main-row"
                        >
                            <span>{row.data}</span>
                            <span>{row.name}</span>
                            <span>{row.phone}</span>
                            <span>{row.recording}</span>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
}
