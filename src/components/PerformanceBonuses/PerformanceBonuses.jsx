import React, { Component } from 'react';
import SpendItem from '../SpendItem';
import './style.css';

export default class PerformanceBonuses extends Component {
    render() {
        return (
            <section className="performance-bonuses">
                <h2>Бонусы за выполнение</h2>
                <div className="performance-bonuses__row">
                    <ul>
                        <li>SPA процедура</li>
                        <li className="bonuses_active">Шейкер</li>
                        <li>Смузи на баре</li>
                    </ul>
                </div>
            </section>
        );
    }
}
