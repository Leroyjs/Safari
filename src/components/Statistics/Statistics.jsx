import React, { Component } from 'react';
import './style.css';

export default class Statistics extends Component {
    render() {
        const { button = true } = this.props;
        return (
            <section className="statistics">
                <p>
                    Выполнено тренировок:<span>32</span>
                </p>
                <p>
                    Действующий блок:<span>2/10</span>
                    <button className="statistics__buy">Приобрести пт</button>
                </p>
                <p>
                    Средняя оценка тренировок:<span>4.9</span>
                </p>
                <p>
                    Следующая тренировка:<span>________</span>
                </p>
                {button && <button>Записаться на тренировку</button>}
            </section>
        );
    }
}
