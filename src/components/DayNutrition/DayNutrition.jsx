import React, { Component } from 'react';
import star from './rate-star.png';
import './style.css';

export default class DayNutrition extends Component {
    state = {
        pageData: {
            rating: [],
            comment: '',
            points: '',
            eat: []
        },
        date: {}
    };
    componentDidUpdate() {
        let date = this.props.activeDate;
        if (date !== undefined && date !== this.state.date) {
            date = 'date=' + date.year + '-' + date.month + '-' + date.day;

            const url = 'https://bagiran.ru/nutrition';
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                body: date,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            })
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    this.setState({
                        pageData: data,
                        date: this.props.activeDate
                    });
                });
        }
    }
    render() {
        const { pageData, date } = this.state;
        let newDate;
        // eslint-disable-next-line default-case
        switch (date.month - 1) {
            case 0:
                newDate = date.day + ' Января';
                break;
            case 1:
                newDate = date.day + ' Февраля';
                break;
            case 2:
                newDate = date.day + ' Марта';
                break;
            case 3:
                newDate = date.day + ' Апреля';
                break;
            case 4:
                newDate = date.day + ' Мая';
                break;
            case 5:
                newDate = date.day + ' Июня';
                break;
            case 6:
                newDate = date.day + ' Июля';
                break;
            case 7:
                newDate = date.day + ' Августа';
                break;
            case 8:
                newDate = date.day + ' Сентября';
                break;
            case 9:
                newDate = date.day + ' Октября';
                break;
            case 10:
                newDate = date.day + ' Ноября';
                break;
            case 11:
                newDate = date.day + ' Декабря';
                break;
        }
        return (
            <section className="day-nutrition">
                <div className="day-nutrition__block">
                    <div className="day-nutrition__header">
                        <h3>{newDate}</h3>
                        <span>
                            Оценка:
                            {pageData.rating.length !== 0
                                ? pageData.rating.map(() => (
                                      <img src={star} alt="star" />
                                  ))
                                : ' Нет оценки'}
                        </span>
                    </div>
                    <div className="day-nutrition__main">
                        {pageData.eat.length !== 0 ? (
                            pageData.eat.map((eat, index) => (
                                <span className="day-nutrition__eat">
                                    <span>{eat.name}: </span>
                                    <span key={index}>{eat.value}</span>
                                    <span className="day-nutrition__plus">
                                        +
                                    </span>
                                </span>
                            ))
                        ) : (
                            <>
                                <span className="day-nutrition__eat">
                                    <span className="day-nutrition__list-name">
                                        Завтрак:{' '}
                                    </span>
                                    <span></span>
                                    <span className="day-nutrition__plus">
                                        +
                                    </span>
                                </span>
                                <span className="day-nutrition__eat">
                                    <span className="day-nutrition__list-name">
                                        Перекус:
                                    </span>
                                    <span></span>
                                    <span className="day-nutrition__plus">
                                        +
                                    </span>
                                </span>
                                <span className="day-nutrition__eat">
                                    <span className="day-nutrition__list-name">
                                        Обед:
                                    </span>
                                    <span></span>
                                    <span className="day-nutrition__plus">
                                        +
                                    </span>
                                </span>
                                <span className="day-nutrition__eat">
                                    <span className="day-nutrition__list-name">
                                        Перекус:
                                    </span>
                                    <span></span>
                                    <span className="day-nutrition__plus">
                                        +
                                    </span>
                                </span>
                                <span className="day-nutrition__eat">
                                    <span className="day-nutrition__list-name">
                                        Ужин:
                                    </span>
                                    <span></span>
                                    <span className="day-nutrition__plus">
                                        +
                                    </span>
                                </span>
                            </>
                        )}
                    </div>
                    <div className="day-nutrition__footer">
                        <span>
                            Комментарий тренера: <br />
                            {pageData.comment ? (
                                <b>{pageData.comment}</b>
                            ) : (
                                'Комментария еще нет...'
                            )}
                        </span>
                        <br />
                        <br />
                        {pageData.eat.length !== 0 && (
                            <span className="day-nutrition__bonus">
                                Вы получаете 10 баллов!
                            </span>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
