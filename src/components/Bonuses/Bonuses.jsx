import React, { Component } from 'react';
import './style.css';

export default class Bonuses extends Component {
    render() {
        return (
            <section className="bonuses">
                <h2>Бонусы 3 уровня</h2>
                <p>
                    Бонусы действительны в течение 5 дней, затем сгорают
                    <br />
                    Получить бонусы или купоны можно на ресепшене
                </p>
                <ul>
                    <li>SPA процедура</li>
                    <li className="bonuses_active">Шейкер</li>
                    <li>Смузи на баре</li>
                </ul>
                <button>Мне помог дежурный тренер</button>
            </section>
        );
    }
}
