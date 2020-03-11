import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default class ClientsList extends Component {
    state = {
        pageData: []
    };
    componentDidUpdate() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });
        }
    }
    render() {
        const { pageData } = this.state;
        console.log(pageData);
        return (
            <section className="clients-list">
                <h2>Клиенты</h2>
                {pageData.map((client, index) => (
                    <Link key={'client' + index} to="/Client-trainer">
                        <div className="clients-list__item">
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
