import React, { Component } from 'react';
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
        return (
            <section className="terenovka-statistics">
                <div className="terenovka-statistics__title">
                    <div className="">
                        <h3>14 января </h3>
                        <h2>{pageData.title}</h2>
                    </div>
                    <div className="rating-area">
                        <span>Оценка:</span>
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
                    </div>
                </div>
                <div className="terenovka-statistics__list">
                    {Object.keys(pageData).map((type) => {
                        // eslint-disable-next-line default-case
                        switch (type) {
                            case 'warmUp':
                                return (
                                    <div
                                        key={'warmUp'}
                                        className="terenovka-statistics__item"
                                    >
                                        <div className="terenovka-statistics__item-title">
                                            <h4>Разминка</h4>
                                            <span>{pageData.warmUp.name}</span>
                                        </div>
                                        <div className="terenovka-statistics__item-load_warm-up">
                                            <b>
                                                {pageData.warmUp.quantity +
                                                    (pageData.warmUp.load &&
                                                        '/') +
                                                    ' ' +
                                                    pageData.warmUp.load}
                                            </b>
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
                                                    className="terenovka-statistics__item"
                                                >
                                                    <div className="terenovka-statistics__item-title">
                                                        <h4>
                                                            {index +
                                                                1 +
                                                                ' упражнение'}
                                                        </h4>
                                                        <span>
                                                            {exercise.name}
                                                        </span>
                                                    </div>
                                                    <div className="terenovka-statistics__item-load">
                                                        <div className="terenovka-statistics__item-load-top">
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
                                                        </div>
                                                        <div className="terenovka-statistics__item-load-bottom">
                                                            {exercise.load.map(
                                                                (
                                                                    load,
                                                                    index
                                                                ) => (
                                                                    <b
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {load}
                                                                    </b>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </>
                                );
                            case 'hitch':
                                return (
                                    <div
                                        key={'hitch'}
                                        className="terenovka-statistics__item"
                                    >
                                        <div className="terenovka-statistics__item-title">
                                            <h4>Заминка</h4>
                                            <span>{pageData.hitch.name}</span>
                                        </div>
                                        <div className="terenovka-statistics__item-load_warm-up">
                                            <b>
                                                {pageData.hitch.quantity +
                                                    (pageData.hitch.load &&
                                                        '/') +
                                                    ' ' +
                                                    pageData.hitch.load}
                                            </b>
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
