import React, { Component } from 'react';
import './style.css';

export default class ClientTrainerHeaderPA extends Component {
    state = {
        pageData: {
            data: '',
            number: '',
            points: '',
            lvl: '',
            rating: '',
            training: '',
            customers: ''
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
        const { pageData } = this.state;
        return (
            <header className="client-trainer-header-pa">
                <h1>Личный кабинет</h1>
                <div className="client-trainer-header-pa__row">
                    <div className="client-trainer-header-pa__column">
                        <img src={pageData.photo} alt="" className="" />
                        <span>{pageData.name}</span>
                    </div>

                    <div className="client-trainer-header-pa__column-2">
                        <b>{pageData.lvl} уровень Safari из 10</b>
                        <br />
                        <span>Начал тренировки: {pageData.data}</span>
                        <br />
                        <span>Клубная карта: {pageData.number}</span>
                        <br />
                        <span>Заработано баллов: {pageData.points}</span>
                        <br />
                    </div>
                </div>
            </header>
        );
    }
}
