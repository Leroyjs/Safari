import React, { Component } from 'react';
import './style.css';

export default class ConversionDuty extends Component {
    render() {
        return (
            <section className="conversion-duty">
                <div className="conversion-duty__h2">
                    <h2>Конверсия с дежурств</h2>
                    <div className="conversion-duty__percent">6,4%</div>
                </div>
                <p>Смен: 9</p>
                <p>Помощи: 31</p>
                <p>Продажи: 2</p>
                <p>Средний чек: 7000 р</p>
                <b>Цель 25% от плана = 15 000 р</b>
                <p>С конверсией 6, 4 % с помощи в продажу</p>
                <p>
                    Со средним чеком 7000 р в след месяце нужно помочь 40
                    клиентам либо лучше продавать
                </p>
            </section>
        );
    }
}
