import React, { Component, useState } from 'react';
import plus from './+.png';
import minus from './-.png';
import eye from './eye.png';
import ok from './ok.svg';
import './style.css';

export default class AdminCustomePoints extends Component {
    state = {
        usersList: [
            {
                name: 'Иванов Иван Иванович',
                phone: '89998887766',
                lvl: '2',
                points: '500'
            },
            {
                name: 'Иванов Иван Иванович',
                phone: '89998887766',
                lvl: '2',
                points: '500'
            },
            {
                name: 'Иванов Иван Иванович',
                phone: '89998887766',
                lvl: '2',
                points: '500'
            },
            {
                name: 'Иванов Иван Иванович',
                phone: '89998887766',
                lvl: '2',
                points: '500'
            }
        ]
    };
    render() {
        return (
            <section className="admin-custome-points">
                <div className="admin-custome-points__table">
                    <div className="admin-custome-points__name-row">
                        <h3 className="admin-custome-points_long">ФИО</h3>
                        <h3>Номер телефона</h3>
                        <h3>Уровень</h3>
                        <h3>Баллы</h3>
                        <div className="admin-custome-points__search admin-custome-points_medium">
                            <input type="text" />
                            <button>Поиск</button>
                        </div>
                    </div>
                    {this.state.usersList.map((user, index) => (
                        <div
                            key={index + '-admin-custome-points'}
                            className="admin-custome-points__main-row"
                        >
                            <span className="admin-custome-points_long">
                                {user.name}
                            </span>
                            <span>{user.phone}</span>
                            <span>{user.lvl}</span>
                            <span>{user.points}</span>
                            <div className="admin-custome-points__img admin-custome-points_medium">
                                <img src={ok} alt="" />
                                <img src={eye} alt="" />
                                <img src={minus} alt="" />
                                <img src={plus} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
}
