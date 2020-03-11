import React, { Component } from 'react';
import './style.css';
let nutrition = {
    rating: [1, 1, 1, 1],
    comment: 'какой плов??? а так норм',
    points: '12',
    eat: [
        {
            name: 'breakfast',
            value: 'овсянка, 1 кусок хлеба, чай'
        },
        {
            name: 'snack_1',
            value: 'овсянка, 1 кусок хлеба, чай'
        },
        {
            name: 'lunch',
            value: 'овсянка, 1 кусок хлеба, чай'
        },
        {
            name: 'snack_2',
            value: 'овсянка, 1 кусок хлеба, чай'
        },
        {
            name: 'dinner',
            value: 'овсянка, 1 кусок хлеба, чай'
        }
    ]
};
export default class DayNutrition extends Component {
    render() {
        return (
            <section className="day-nutrition">
                <div className="day-nutrition__block">
                    <div className="day-nutrition__header">
                        <h3>30 Января</h3>
                        <span className="day-nutrition__rating-area">
                            <input
                                type="radio"
                                id="star-5"
                                name="rating"
                                value="5"
                            />
                            <label htmlFor="star-5" title="Оценка «5»"></label>
                            <input
                                type="radio"
                                id="star-4"
                                name="rating"
                                value="4"
                            />
                            <label htmlFor="star-4" title="Оценка «4»"></label>
                            <input
                                type="radio"
                                id="star-3"
                                name="rating"
                                value="3"
                            />
                            <label htmlFor="star-3" title="Оценка «3»"></label>
                            <input
                                type="radio"
                                id="star-2"
                                name="rating"
                                value="2"
                            />
                            <label htmlFor="star-2" title="Оценка «2»"></label>
                            <input
                                type="radio"
                                id="star-1"
                                name="rating"
                                value="1"
                            />
                            <label htmlFor="star-1" title="Оценка «1»"></label>
                        </span>
                    </div>
                    <div className="day-nutrition__main">
                        {nutrition.eat.map((eat, index) => (
                            <span className="day-nutrition__eat">
                                {eat.name}: <span key={index}>{eat.value}</span>
                                <span className="day-nutrition__plus">+</span>
                            </span>
                        ))}
                    </div>
                    <div className="day-nutrition__footer">
                        <span>
                            Комментарий тренера: <br />
                            <b>
                                <button>+</button>
                            </b>
                        </span>
                        <br />
                        <br />
                        <span className="day-nutrition__bonus">
                            5 баллов за проверку
                        </span>
                    </div>
                </div>
            </section>
        );
    }
}
