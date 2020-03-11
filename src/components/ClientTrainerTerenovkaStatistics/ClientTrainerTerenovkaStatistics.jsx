import React, { Component } from 'react';
import plus from './+.png';
import star from './rate-star.png';
import './style.css';

export default class TerenovkaStatistics extends Component {
    render() {
        let trainingsList = {
            warmUp: {
                name: 'Дорожка',
                quantity: '10 минут',
                load: 'горка 12'
            },
            exercises: [
                {
                    name: 'Подтягивания',
                    quantity: [5, 5, 5, 5],
                    load: ['20кг', '20кг', '20кг', '20кг']
                },
                {
                    name: null,
                    quantity: [],
                    load: []
                },
                {
                    name: 'Подтягивания',
                    quantity: [5, 5, 5, 5, 5],
                    load: ['20кг', '20кг', '20кг', '20кг', '20кг']
                }
            ],
            hitch: {
                name: 'Элипс',
                quantity: '10 мин',
                load: ''
            }
        };
        return (
            <section className="ct-terenovka-statistics">
                <div className="ct-terenovka-statistics__title">
                    <div className="ct-terenovka-statistics__title-main">
                        <h3>14 января </h3>
                    </div>
                    <h2>Спина</h2>
                    <div className="ct-terenovka-statistics__rating-area">
                        <span>Оценка:</span>
                        <br />
                        <img src={star} alt="star" />
                        <img src={star} alt="star" />
                        <img src={star} alt="star" />
                        <img src={star} alt="star" />
                        <img src={star} alt="star" />
                    </div>
                </div>
                <div className="ct-terenovka-statistics__list">
                    {Object.keys(trainingsList).map((type) => {
                        // eslint-disable-next-line default-case
                        switch (type) {
                            case 'warmUp':
                                return (
                                    <div
                                        key={'warmUp'}
                                        className="ct-terenovka-statistics__item"
                                    >
                                        <div className="ct-terenovka-statistics__item-title">
                                            <h4>Разминка</h4>
                                            {trainingsList.warmUp.name ? (
                                                <span>
                                                    {trainingsList.warmUp.name}
                                                </span>
                                            ) : (
                                                <button>+</button>
                                            )}
                                        </div>
                                        <div className="ct-terenovka-statistics__item-load_warm-up">
                                            {trainingsList.warmUp.quantity ? (
                                                <b>
                                                    {trainingsList.warmUp
                                                        .quantity +
                                                        (trainingsList.warmUp
                                                            .load && '/') +
                                                        ' ' +
                                                        trainingsList.warmUp
                                                            .load}
                                                </b>
                                            ) : (
                                                <img src={plus} alt="" />
                                            )}
                                        </div>
                                    </div>
                                );
                            case 'exercises':
                                return (
                                    <>
                                        {trainingsList.exercises.map(
                                            (exercise, index) => (
                                                <div
                                                    key={index + 'exercise'}
                                                    className="ct-terenovka-statistics__item"
                                                >
                                                    <div className="ct-terenovka-statistics__item-title">
                                                        <h4>
                                                            {index +
                                                                1 +
                                                                ' упражнение'}
                                                        </h4>
                                                        {exercise.name ? (
                                                            <span>
                                                                {exercise.name}
                                                            </span>
                                                        ) : (
                                                            <button>+</button>
                                                        )}
                                                    </div>
                                                    <div className="ct-terenovka-statistics__item-load">
                                                        <div className="ct-terenovka-statistics__item-load-top">
                                                            {exercise.quantity.map(
                                                                (
                                                                    quantity,
                                                                    index
                                                                ) => (
                                                                    <b
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            quantity
                                                                        }
                                                                    </b>
                                                                )
                                                            )}
                                                            {exercise.load
                                                                .length !==
                                                                5 && (
                                                                <b key={index}>
                                                                    <img
                                                                        src={
                                                                            plus
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </b>
                                                            )}
                                                        </div>
                                                        <div className="ct-terenovka-statistics__item-load-bottom">
                                                            {exercise.load &&
                                                                exercise.load.map(
                                                                    (
                                                                        load,
                                                                        index
                                                                    ) => (
                                                                        <b
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                load
                                                                            }
                                                                        </b>
                                                                    )
                                                                )}
                                                            {exercise.load
                                                                .length !==
                                                                5 && (
                                                                <b
                                                                    key={index}
                                                                ></b>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                        <button className="ct-terenovka-statistics__dop-item">
                                            Добавить упражнение
                                        </button>
                                    </>
                                );
                            case 'hitch':
                                return (
                                    <div
                                        key={'hitch'}
                                        className="ct-terenovka-statistics__item"
                                    >
                                        <div className="ct-terenovka-statistics__item-title">
                                            <h4>Заминка</h4>
                                            {trainingsList.hitch.name ? (
                                                <span>
                                                    {trainingsList.hitch.name}
                                                </span>
                                            ) : (
                                                <button>+</button>
                                            )}
                                        </div>
                                        <div className="ct-terenovka-statistics__item-load_warm-up">
                                            {trainingsList.hitch.quantity ? (
                                                <b>
                                                    {trainingsList.hitch
                                                        .quantity +
                                                        (trainingsList.hitch
                                                            .load && '/') +
                                                        ' ' +
                                                        trainingsList.hitch
                                                            .load}
                                                </b>
                                            ) : (
                                                <img src={plus} alt="" />
                                            )}
                                        </div>
                                    </div>
                                );
                        }
                    })}
                </div>
            </section>
        );
    }
}
