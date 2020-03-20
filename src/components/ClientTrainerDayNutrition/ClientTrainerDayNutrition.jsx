import React, { Component } from 'react';
import ModalClientTrainerAnthropometry from '../ModalClientTrainerAnthropometry';
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
        date: {},
        modal: false,
        modalUrl: '',
        madalTitle: '',
        addData: '',
        input: [{}],
        canUpate: true
    };

    componentDidUpdate() {
        const { activeId } = this.props;
        let date = this.props.activeDate;
        if (
            (date !== undefined && date !== this.state.date) ||
            this.state.canUpate
        ) {
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
                        date: this.props.activeDate,
                        canUpate: false
                    });
                });
        }
    }
    handleModal = (modal, madalTitle, input, addData, modalUrl) => {
        this.setState({
            canUpate: true,
            modal,
            madalTitle,
            input,
            addData,
            modalUrl
        });
    };
    handleMark = (value) => {
        let date = this.props.activeDate;
        const { activeId } = this.props;
        fetch('https://bagiran.ru/client-trainer/nutrition/add-score', {
            method: 'POST',
            credentials: 'include',
            body:
                'date=' +
                date.year +
                '-' +
                date.month +
                '-' +
                date.day +
                '&id=' +
                activeId +
                '&score=' +
                value,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Request-Headers': 'X-Requested-With, Origin',
                Origin: 'https://localhost:3000/'
            }
        })
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    canUpate: true
                });
            });
    };
    render() {
        const {
            pageData,
            date,
            modal,
            modalUrl,
            madalTitle,
            addData,
            input
        } = this.state;
        const oneInput = [
            {
                title: 'Комментарий',
                postArg: 'comment',
                mandatory: true
            }
        ];
        let newDate;
        console.warn(pageData);
        const { activeId } = this.props;
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
        console.warn(pageData);
        return (
            <section className="day-nutrition">
                <div className="day-nutrition__block">
                    <div className="day-nutrition__header">
                        <h3>{newDate}</h3>
                        {pageData.eat.length !== 0 &&
                        pageData.rating.length === 0 ? (
                            <span className="day-nutrition__rating-area">
                                <input
                                    type="radio"
                                    id="star-5"
                                    name="rating"
                                    value="5"
                                />
                                <label
                                    onClick={() => this.handleMark(5)}
                                    htmlFor="star-5"
                                    title="Оценка «5»"
                                ></label>
                                <input
                                    type="radio"
                                    id="star-4"
                                    name="rating"
                                    value="4"
                                />
                                <label
                                    onClick={() => this.handleMark(4)}
                                    htmlFor="star-4"
                                    title="Оценка «4»"
                                ></label>
                                <input
                                    type="radio"
                                    id="star-3"
                                    name="rating"
                                    value="3"
                                />
                                <label
                                    onClick={() => this.handleMark(3)}
                                    htmlFor="star-3"
                                    title="Оценка «3»"
                                ></label>
                                <input
                                    type="radio"
                                    id="star-2"
                                    name="rating"
                                    value="2"
                                />
                                <label
                                    onClick={() => this.handleMark(2)}
                                    htmlFor="star-2"
                                    title="Оценка «2»"
                                ></label>
                                <input
                                    type="radio"
                                    id="star-1"
                                    name="rating"
                                    value="1"
                                />
                                <label
                                    onClick={() => this.handleMark(1)}
                                    htmlFor="star-1"
                                    title="Оценка «1»"
                                ></label>
                            </span>
                        ) : (
                            <div className="day-nutrition__rating-star">
                                {pageData.rating.map((item, index) => (
                                    <img src={star} alt="" />
                                ))}
                            </div>
                        )}
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
                        {pageData.eat.length !== 0 && (
                            <span>
                                Комментарий тренера: <br />
                                {pageData.comment ? (
                                    <b>{pageData.comment}</b>
                                ) : (
                                    <b>
                                        <button
                                            onClick={() =>
                                                this.handleModal(
                                                    true,
                                                    'Добавить комментарий',
                                                    oneInput,
                                                    'date=' +
                                                        date.year +
                                                        '-' +
                                                        date.month +
                                                        '-' +
                                                        date.day,
                                                    '/client-trainer/nutrition/add-comment'
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </b>
                                )}
                            </span>
                        )}
                        <br />
                        <br />
                        <span className="day-nutrition__bonus">
                            {pageData.comment &&
                                pageData.header.points.trainerFood +
                                    ' баллов за проверку'}
                        </span>
                    </div>
                </div>
                {modal && (
                    <ModalClientTrainerAnthropometry
                        url={modalUrl}
                        title={madalTitle}
                        inputs={input}
                        handleModal={this.handleModal}
                        addData={'id=' + activeId + '&' + addData}
                    ></ModalClientTrainerAnthropometry>
                )}
            </section>
        );
    }
}
