import React, { Component } from 'react';
import './style.css';
let array = [
    {
        data: '02.01',
        name: 'Иванов И.И.',
        phone: '89512700000',
        source: 'Дежурство',
        quantity: '10 пт',
        sum: '7000р'
    },
    {
        data: '02.01',
        name: 'Иванов И.И.',
        phone: '89512700000',
        source: 'Дежурство',
        quantity: '10 пт',
        sum: '7000р'
    },
    {
        data: '02.01',
        name: 'Иванов И.И.',
        phone: '89512700000',
        source: 'Дежурство',
        quantity: '10 пт',
        sum: '7000р'
    }
];
export default class SaleStat extends Component {
    render() {
        return (
            <section className="sale-stat">
                <div className="sale-stat__inner">
                    <h2>Январь</h2>
                    <div className="sale-stat__name-row">
                        <span>Дата</span>
                        <span>ФИО</span>
                        <span>Телефон</span>
                        <span>Источник</span>
                    </div>
                    {array.map((user, index) => (
                        <div
                            key={index + 'sale-stat'}
                            className="sale-stat__main-row"
                        >
                            <div className="sale-stat__main-row-1">
                                <span>{user.data}</span>
                                <span>{user.name}</span>
                                <span>{user.phone}</span>
                                <span>{user.source}</span>
                            </div>
                            <div className="sale-stat__main-row-2">
                                <div className="sale-stat__main-row-inner-1">
                                    <b>Кол-во ПТ: </b>
                                    <span>{user.quantity}</span>
                                </div>
                                <div className="sale-stat__main-row-inner-2">
                                    <b>Сумма:</b> <span>7000р</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button>Провести продажу</button>
                </div>
            </section>
        );
    }
}
