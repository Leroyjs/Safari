import React, { Component } from 'react';
import './style.css';

export default class Statistics extends Component {
    state = {
        pageData: {
            numberWorkouts: '32',
            block: '2/10',
            assessment: '4.9',
            nextWorkout: '______'
        }
    };

    componentDidUpdate() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });
        }
    }
    render() {
        const { button = true } = this.props;
        const { pageData = true } = this.state;
        return (
            <section className="statistics">
                <p>
                    Выполнено тренировок: <span>{pageData.numberWorkouts}</span>
                </p>
                <p>
                    Действующий блок: <span>{pageData.block}</span>
                    {button && (
                        <button className="statistics__buy">
                            Приобрести пт
                        </button>
                    )}
                </p>
                <p>
                    Средняя оценка тренировок:{' '}
                    <span>{pageData.assessment}</span>
                </p>
                <p>
                    Следующая тренировка: <span>{pageData.nextWorkout}</span>
                </p>
                {button && <button>Записаться на тренировку</button>}
            </section>
        );
    }
}
