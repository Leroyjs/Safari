import React, { Component } from 'react';
import star from './rate-star.png';
import pencil from './pencil.svg';
import ModalClientTrainerAnthropometry from '../ModalClientTrainerAnthropometry';
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
        modal: false
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
    handleModal = (modal, madalTitle, input, addData, modalUrl) => {
        let date = this.props.activeDate;
        date = 'date=' + date.year + '-' + date.month + '-' + date.day;
        const url = 'https://bagiran.ru/nutrition';
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: date,
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
                this.setState({
                    pageData: data,
                    date: this.props.activeDate,
                    modal,
                    madalTitle,
                    input,
                    addData,
                    modalUrl
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
                title: 'Еда',
                postArg: 'value',
                mandatory: true
            }
        ];
        const now = new Date();
        let today = false;
        console.log(pageData);
        if (
            now.getFullYear() === date.year &&
            now.getMonth() + 1 === date.month &&
            now.getDate() === date.day
        ) {
            today = true;
        }
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
                            <>
                                {pageData.eat.map((eat, index) => (
                                    <span className="day-nutrition__eat">
                                        <span>{eat.name}: </span>
                                        <span key={index}>{eat.value}</span>
                                        {today &&
                                            (!eat.value ? (
                                                <span
                                                    onClick={() =>
                                                        this.handleModal(
                                                            true,
                                                            eat.name,
                                                            oneInput,
                                                            'type=' +
                                                                (index + 1),
                                                            '/nutrition/add'
                                                        )
                                                    }
                                                    className="day-nutrition__plus"
                                                >
                                                    +
                                                </span>
                                            ) : (
                                                <img
                                                    onClick={() =>
                                                        this.handleModal(
                                                            true,
                                                            eat.name,
                                                            oneInput,
                                                            'type=' +
                                                                (index + 1),
                                                            '/nutrition/add'
                                                        )
                                                    }
                                                    style={{
                                                        height: '12px',
                                                        marginLeft: '3px'
                                                    }}
                                                    src={pencil}
                                                    alt=""
                                                ></img>
                                            ))}
                                    </span>
                                ))}
                                <button
                                    onClick={() =>
                                        this.handleModal(
                                            true,
                                            'Прием пищи ' +
                                                (pageData.eat.length + 1),
                                            oneInput,
                                            'type=' + (pageData.eat.length + 1),
                                            '/nutrition/add'
                                        )
                                    }
                                    style={{
                                        maxWidth: '150px',
                                        marginLeft: '0',
                                        marginTop: '3px'
                                    }}
                                    className="button_standart"
                                >
                                    Добавить приeм пищи
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="day-nutrition__eat">
                                    <span className="day-nutrition__list-name">
                                        Завтрак:{' '}
                                    </span>
                                    <span></span>
                                    {today && (
                                        <span
                                            onClick={() =>
                                                this.handleModal(
                                                    true,
                                                    'Завтрак',
                                                    oneInput,
                                                    'type=1',
                                                    '/nutrition/add'
                                                )
                                            }
                                            className="day-nutrition__plus"
                                        >
                                            +
                                        </span>
                                    )}
                                </span>
                                <span className="day-nutrition__eat">
                                    <span className="day-nutrition__list-name">
                                        Перекус:
                                    </span>
                                    <span></span>
                                    {today && (
                                        <span
                                            onClick={() =>
                                                this.handleModal(
                                                    true,
                                                    'Перекус',
                                                    oneInput,
                                                    'type=2',
                                                    '/nutrition/add'
                                                )
                                            }
                                            className="day-nutrition__plus"
                                        >
                                            +
                                        </span>
                                    )}
                                </span>
                                <span className="day-nutrition__eat">
                                    <span className="day-nutrition__list-name">
                                        Обед:
                                    </span>
                                    <span></span>
                                    {today && (
                                        <span
                                            onClick={() =>
                                                this.handleModal(
                                                    true,
                                                    'Обед',
                                                    oneInput,
                                                    'type=3',
                                                    '/nutrition/add'
                                                )
                                            }
                                            className="day-nutrition__plus"
                                        >
                                            +
                                        </span>
                                    )}
                                </span>
                                <span className="day-nutrition__eat">
                                    <span className="day-nutrition__list-name">
                                        Перекус:
                                    </span>
                                    <span></span>
                                    {today && (
                                        <span
                                            onClick={() =>
                                                this.handleModal(
                                                    true,
                                                    'Перекус',
                                                    oneInput,
                                                    'type=4',
                                                    '/nutrition/add'
                                                )
                                            }
                                            className="day-nutrition__plus"
                                        >
                                            +
                                        </span>
                                    )}
                                </span>
                                <span className="day-nutrition__eat">
                                    <span className="day-nutrition__list-name">
                                        Ужин:
                                    </span>
                                    <span></span>
                                    {today && (
                                        <span
                                            onClick={() =>
                                                this.handleModal(
                                                    true,
                                                    'Ужин',
                                                    oneInput,
                                                    'type=5',
                                                    '/nutrition/add'
                                                )
                                            }
                                            className="day-nutrition__plus"
                                        >
                                            +
                                        </span>
                                    )}
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
                {modal && (
                    <ModalClientTrainerAnthropometry
                        url={modalUrl}
                        title={madalTitle}
                        inputs={input}
                        handleModal={this.handleModal}
                        addData={addData}
                    ></ModalClientTrainerAnthropometry>
                )}
            </section>
        );
    }
}
