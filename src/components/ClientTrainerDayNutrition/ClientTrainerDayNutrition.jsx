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
        const { activeId } = this.props;
        let date = this.props.activeDate;
        if (date !== undefined && date !== this.state.date) {
            date =
                'date=' +
                date.year +
                '-' +
                date.month +
                '-' +
                date.day +
                '&id=' +
                activeId;
            console.log(date);
            const url = 'https://bagiran.ru/client-trainer/nutrition';
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
        console.log(pageData);
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
                        {pageData.eat.length ? (
                            pageData.eat.map((eat, index) => (
                                <span className="day-nutrition__eat">
                                    <span>{eat.name}: </span>
                                    <span key={index}>{eat.value}</span>
                                </span>
                            ))
                        ) : (
                            <span>Клиент не заполнил питание</span>
                        )}
                    </div>
                    <div className="day-nutrition__footer">
                        <span>
                            Комментарий тренера: <br />
                            {pageData.comment ? (
                                <b>{pageData.comment}</b>
                            ) : (
                                <b>
                                    <button>+</button>
                                </b>
                            )}
                        </span>
                        <br />
                        <br />
                        <span className="day-nutrition__bonus">
                            {pageData.comment && '5 баллов за проверку'}
                        </span>
                    </div>
                </div>
            </section>
        );
    }
}
