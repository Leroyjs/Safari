import React, { Component } from 'react';
import './style.css';

let array = {
    data: '01.01.20',
    number: '861928719921',
    points: '500',
    lvl: '3',
    rating: '4.9',
    training: '654',
    customers: '34'
};
export default class HeaderPersonalArea extends Component {
    render() {
        const { data, whoIsIt } = this.props;
        return (
            <header className="header-personal-area">
                <h1>Личный кабинет</h1>
                <div className="header-personal-area__row">
                    <div className="header-personal-area__column">
                        <img src={data.photo_100} alt="" className="" />
                        <span>{data.first_name + ' ' + data.last_name}</span>
                    </div>
                    {whoIsIt === 'isClient' && (
                        <div className="header-personal-area__column-2">
                            <b>{array.lvl} уровень Safari из 10</b>
                            <br />
                            <span>Начал тренировки: {array.data}</span>
                            <br />
                            <span>Клубная карта: {array.number}</span>
                            <br />
                            <span>Заработано баллов: {array.points}</span>
                            <br />
                        </div>
                    )}
                    {whoIsIt === 'isTrainer' && (
                        <div className="header-personal-area__column-2">
                            <span>
                                Общее кол-во клиентов: {array.customers}
                            </span>
                            <br />
                            <span>Кол-во тренировок: {array.training}</span>
                            <br />
                            <span>Оценка от клиентов: {array.rating}</span>
                            <br />
                            <span>Кол-во баллов: {array.points}</span>
                            <br />
                        </div>
                    )}
                </div>
                {whoIsIt === 'isClient' && <button>Выбрать тренера</button>}
            </header>
        );
    }
}
