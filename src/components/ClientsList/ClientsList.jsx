import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

let array = [
    {
        name: 'Колташов Никита',
        training: '6/10',
        nutrition: true,
        lvl: '5',
        play: false,
        nextTraining: '18.02.2020',
        rating: '4.9',
        foto:
            'https://sun3-12.userapi.com/c845123/v845123844/1e1542/WCGx0WTjkWc.jpg?ava=1'
    },

    {
        name: 'Колташов Никита',
        training: '6/10',
        nutrition: true,
        lvl: '5',
        play: false,
        nextTraining: '18.02.2020',
        rating: '4.9',
        foto:
            'https://sun3-12.userapi.com/c845123/v845123844/1e1542/WCGx0WTjkWc.jpg?ava=1'
    },

    {
        name: 'Колташов Никита',
        training: '6/10',
        nutrition: true,
        lvl: '5',
        play: false,
        nextTraining: '18.02.2020',
        rating: '4.9',
        foto:
            'https://sun3-12.userapi.com/c845123/v845123844/1e1542/WCGx0WTjkWc.jpg?ava=1'
    },

    {
        name: 'Колташов Никита',
        training: '6/10',
        nutrition: false,
        lvl: '5',
        play: true,
        nextTraining: '18.02.2020',
        rating: '4.9',
        foto:
            'https://sun3-12.userapi.com/c845123/v845123844/1e1542/WCGx0WTjkWc.jpg?ava=1'
    },

    {
        name: 'Колташов Никита',
        training: '6/10',
        nutrition: true,
        lvl: '5',
        play: false,
        nextTraining: '18.02.2020',
        rating: '4.9',
        foto:
            'https://sun3-12.userapi.com/c845123/v845123844/1e1542/WCGx0WTjkWc.jpg?ava=1'
    }
];

export default class ClientsList extends Component {
    render() {
        return (
            <section className="clients-list">
                <h2>Клиенты</h2>
                {array.map((client, index) => (
                    <Link key={'client' + index} to="/Client-trainer">
                        <div className="clients-list__item">
                            {' '}
                            <img src={client.foto} alt="client" />{' '}
                            <div className="clients-list__text">
                                {' '}
                                <span>Тренировки: {client.training}</span>{' '}
                                <span>
                                    {' '}
                                    Питание:{' '}
                                    {client.nutrition ? (
                                        <span className="clients-list_green">
                                            {' '}
                                            заполнил{' '}
                                        </span>
                                    ) : (
                                        <span className="clients-list_red">
                                            не заполнил
                                        </span>
                                    )}
                                </span>{' '}
                                <span>
                                    {' '}
                                    Уровень: {client.lvl}{' '}
                                    {client.play && (
                                        <span className="clients-list_green">
                                            {' '}
                                            new{' '}
                                        </span>
                                    )}
                                </span>{' '}
                                <span>
                                    Следующая тренировка: {client.nextTraining}
                                </span>{' '}
                                <span>Оценка от клиента: {client.rating}</span>{' '}
                            </div>{' '}
                            <div className="clients-list__name">
                                {' '}
                                {client.name}
                            </div>{' '}
                        </div>
                    </Link>
                ))}
            </section>
        );
    }
}
