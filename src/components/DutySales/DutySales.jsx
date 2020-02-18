import React, { Component } from 'react';
import './style.css';

let array = [
    {
        name: 'Иванов И.Ф',
        phone: '89998887766',
        sales: '5 пт',
        sum: '3500р'
    }
];
export default class DutySales extends Component {
    render() {
        return (
            <section className="duty-sales">
                <div className="duty-sales__inner">
                    <h2>Продажи</h2>
                    <div className="duty-sales__name-row">
                        <div className="duty-sales__item">ФИО</div>
                        <div className="duty-sales__item">Телефон</div>
                        <div className="duty-sales__item">Продажа</div>
                        <div className="duty-sales__item">Сумма</div>
                    </div>
                    {array.map((row, index) => (
                        <div
                            key={index + '-duty-sales'}
                            className="duty-sales__main-row"
                        >
                            <div className="duty-sales__item">{row.name}</div>
                            <div className="duty-sales__item">{row.phone}</div>
                            <div className="duty-sales__item">{row.sales}</div>
                            <div className="duty-sales__item">{row.sum}</div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
}
