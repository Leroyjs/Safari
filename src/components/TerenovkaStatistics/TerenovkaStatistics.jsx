import React, { Component } from 'react';
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
        let newDate;
        if (this.state.pageData.date) {
            let date = this.state.pageData.date.split('-');
            date = date.map((item) => +item);
            // eslint-disable-next-line default-case
            switch (date[1] - 1) {
                case 0:
                    newDate = date[2] + ' Января';
                    break;
                case 1:
                    newDate = date[2] + ' Февраля';
                    break;
                case 2:
                    newDate = date[2] + ' Марта';
                    break;
                case 3:
                    newDate = date[2] + ' Апреля';
                    break;
                case 4:
                    newDate = date[2] + ' Мая';
                    break;
                case 5:
                    newDate = date[2] + ' Июня';
                    break;
                case 6:
                    newDate = date[2] + ' Июля';
                    break;
                case 7:
                    newDate = date[2] + ' Августа';
                    break;
                case 8:
                    newDate = date[2] + ' Сентября';
                    break;
                case 9:
                    newDate = date[2] + ' Октября';
                    break;
                case 10:
                    newDate = date[2] + ' Ноября';
                    break;
                case 11:
                    newDate = date[2] + ' Декабря';
                    break;
            }
        }
        return (
            <section className="terenovka-statistics">
                <div className="terenovka-statistics__title">
                    <div className="">
                        <h3>{newDate}</h3>
                        <h2>{pageData.title}</h2>
                    </div>
                    <div className="rating-area">
                        <span>Оценка:</span>
                        <br />
                        {pageData.score && pageData.score.length !== 0
                            ? pageData.score.map(() => (
                                  <img src={star} alt="" />
                              ))
                            : 'Нет оценки'}
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
