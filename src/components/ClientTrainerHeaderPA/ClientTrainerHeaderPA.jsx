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
export default class ClientTrainerHeaderPA extends Component {
    render() {
        const { data } = this.props;
        return (
            <header className="client-trainer-header-pa">
                <h1>Личный кабинет</h1>
                <div className="client-trainer-header-pa__row">
                    <div className="client-trainer-header-pa__column">
                        <img src={data.photo_100} alt="" className="" />
                        <span>{data.first_name + ' ' + data.last_name}</span>
                    </div>

                    <div className="client-trainer-header-pa__column-2">
                        <b>{array.lvl} уровень Safari из 10</b>
                        <br />
                        <span>Начал тренировки: {array.data}</span>
                        <br />
                        <span>Клубная карта: {array.number}</span>
                        <br />
                        <span>Заработано баллов: {array.points}</span>
                        <br />
                    </div>
                </div>
            </header>
        );
    }
}
