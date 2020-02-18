import React, { Component } from 'react';
import star from './rate-star.png';
import './style.css';
let nutrition = {
    comment: 'какой плов??? а так норм',
    breakfast: ['овсянка', '1 кусок хлеба', 'чай'],
    snack_1: ['овсянка', '1 кусок хлеба', 'чай'],
    lunch: ['овсянка', '1 кусок хлеба', 'чай'],
    snack_2: ['овсянка', '1 кусок хлеба', 'чай'],
    dinner: ['овсянка', '1 кусок хлеба', 'чай']
};
export default class DayNutrition extends Component {
    render() {
        return (
            <section className="day-nutrition">
                <div className="day-nutrition__block">
                    <div className="day-nutrition__header">
                        <h3>30 Января</h3>
                        <span>
                            Оценка:
                            <img src={star} alt="star" />
                            <img src={star} alt="star" />
                            <img src={star} alt="star" />
                            <img src={star} alt="star" />
                            <img src={star} alt="star" />
                        </span>
                    </div>
                    <div className="day-nutrition__main">
                        <span className="day-nutrition__eat">
                            Завтрак:{' '}
                            {nutrition.breakfast.map((eat, index) => (
                                <span key={index}>{eat}</span>
                            ))}
                        </span>
                        <span className="day-nutrition__eat">
                            Перекус:{' '}
                            {nutrition.snack_1.map((eat, index) => (
                                <span key={index}>{eat}</span>
                            ))}
                        </span>
                        <span className="day-nutrition__eat">
                            Обед:{' '}
                            {nutrition.lunch.map((eat, index) => (
                                <span key={index}>{eat}</span>
                            ))}
                        </span>
                        <span className="day-nutrition__eat">
                            Перекус:{' '}
                            {nutrition.snack_2.map((eat, index) => (
                                <span key={index}>{eat}</span>
                            ))}
                        </span>
                        <span className="day-nutrition__eat">
                            Ужин:{' '}
                            {nutrition.dinner.map((eat, index) => (
                                <span key={index}>{eat}</span>
                            ))}
                        </span>
                    </div>
                    <div className="day-nutrition__footer">
                        <span>
                            Комментарий тренера: <br />
                            <b>{nutrition.comment}</b>
                        </span>
                        <br />
                        <br />
                        <span className="day-nutrition__bonus">
                            Вы получаете 10 баллов!
                        </span>
                    </div>
                </div>
            </section>
        );
    }
}
