import React, { Component } from 'react';
import './style.css';

export default class HeaderPersonalArea extends Component {
    state = {
        pageData: {
            data: '',
            number: '',
            points: '500',
            lvl: '3',
            rating: '4.9',
            training: '654',
            customers: '34'
        }
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
        const { data, whoIsIt } = this.props;
        const { pageData } = this.state;
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
                            <b>{pageData.lvl} уровень Safari из 10</b>
                            <br />
                            <span>Начал тренировки: {pageData.data}</span>
                            <br />
                            <span>Клубная карта: {pageData.number}</span>
                            <br />
                            <span>Заработано баллов: {pageData.points}</span>
                            <br />
                        </div>
                    )}
                    {whoIsIt === 'isTrainer' && (
                        <div className="header-personal-area__column-2">
                            <span>
                                Общее кол-во клиентов: {pageData.customers}
                            </span>
                            <br />
                            <span>Кол-во тренировок: {pageData.training}</span>
                            <br />
                            <span>Оценка от клиентов: {pageData.rating}</span>
                            <br />
                            <span>Кол-во баллов: {pageData.points}</span>
                            <br />
                        </div>
                    )}
                </div>
                {whoIsIt === 'isClient' && <button>Выбрать тренера</button>}
            </header>
        );
    }
}
