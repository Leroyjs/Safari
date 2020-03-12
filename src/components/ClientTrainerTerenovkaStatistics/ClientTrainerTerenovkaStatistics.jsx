import React, { Component } from 'react';
import plus from './+.png';
import star from './rate-star.png';
import './style.css';

export default class TerenovkaStatistics extends Component {
    state = {
        pageData: {}
    };

    componentDidMount() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });
            console.log(this.props.pageData);
        }
    }
    componentDidUpdate() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });
            console.log(this.props.pageData);
        }
    }
    render() {
        const { pageData } = this.state;
        console.log(pageData);
        return (
            <section className="ct-terenovka-statistics">
                <div className="ct-terenovka-statistics__title">
                    <div className="ct-terenovka-statistics__title-main">
                        <h3>14 января </h3>
                    </div>
                    <h2>{pageData.title}</h2>
                    <div className="ct-terenovka-statistics__rating-area">
                        <span>Оценка:</span>
                        <br />
                        {pageData.score !== undefined &&
                            pageData.score.map(() => (
                                <img src={star} alt="star" />
                            ))}
                    </div>
                </div>
                <div className="ct-terenovka-statistics__list">
                    {Object.keys(pageData).map((type) => {
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
                                            {pageData.warmUp.name ? (
                                                <span>
                                                    {pageData.warmUp.name}
                                                </span>
                                            ) : (
                                                <button>+</button>
                                            )}
                                        </div>
                                        <div className="ct-terenovka-statistics__item-load_warm-up">
                                            {pageData.warmUp.quantity ? (
                                                <b>
                                                    {pageData.warmUp.quantity +
                                                        (pageData.warmUp.load &&
                                                            '/') +
                                                        ' ' +
                                                        pageData.warmUp.load}
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
                                        {pageData.exercises.map(
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
                                            {pageData.hitch.name ? (
                                                <span>
                                                    {pageData.hitch.name}
                                                </span>
                                            ) : (
                                                <button>+</button>
                                            )}
                                        </div>
                                        <div className="ct-terenovka-statistics__item-load_warm-up">
                                            {pageData.hitch.quantity ? (
                                                <b>
                                                    {pageData.hitch.quantity +
                                                        (pageData.hitch.load &&
                                                            '/') +
                                                        ' ' +
                                                        pageData.hitch.load}
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
