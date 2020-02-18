import React, { Component } from 'react';
import SpendItem from '../SpendItem';
import './style.css';

export default class PerformanceBonuses extends Component {
    render() {
        return (
            <section className="performance-bonuses">
                <h2>Бонусы за выполнение</h2>
                <div className="performance-bonuses__row">
                    <SpendItem
                        src="gym.svg"
                        title="1 пт"
                        price="100 баллов"
                    ></SpendItem>
                    <SpendItem
                        src="massage.svg"
                        title="Массаж"
                        price="100 баллов"
                    ></SpendItem>
                    <SpendItem
                        src="spa.svg"
                        title="SPA"
                        price="200 баллов"
                    ></SpendItem>
                </div>
            </section>
        );
    }
}
