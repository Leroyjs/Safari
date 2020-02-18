import React, { Component } from 'react';
import './style.css';

export default class ConversionDuty extends Component {
    render() {
        return (
            <section className="conversion-introductory">
                <div className="conversion-introductory__h2">
                    <h2>Конверсия с вводных</h2>
                </div>
                <p>Звонков по вводным: 31</p>
                <p>Проведено вводных: 4</p>
                <p>cv из звонков в проведенные: 12,9%</p>
                <p>Купили: 1</p>
                <p>cv из проведенных в продажу: 25%</p>
                <p>Средний чек: 7000 р</p>
                <b>Цель 25% от плана = 15 000 р</b>
                <p>В следующем месяце нужно 60 звонков</p>
                <p>либо лучше продавать по телефону</p>
            </section>
        );
    }
}
