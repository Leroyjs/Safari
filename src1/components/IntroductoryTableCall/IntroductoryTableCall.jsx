import React, { Component } from 'react';
import ModalTrainerIntroductoryCall from '../ModalTrainerIntroductoryCall';
import './style.css';

export default class IntroductoryTableCall extends Component {
    state = {
        pageData: [],
        date: '',
        modal: false,
        canUpate: false
    };
    componentDidUpdate() {
        let date = this.props.activeDate;
        if (
            (date !== undefined &&
                (date.month !== this.state.date.month ||
                    date.year !== this.state.date.year)) ||
            this.state.canUpate
        ) {
            console.log('call');
            date = 'date=' + date.year + '-' + date.month + '-' + date.day;

            const url = '/introductory/get-day';
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
                    console.log(data);
                    this.setState({
                        canUpate: false,
                        pageData: data.IntroductoryTableCall,
                        date: this.props.activeDate
                    });
                });
        }
    }
    handleModal = (modal) => {
        this.setState({
            canUpate: true,
            modal
        });
    };
    render() {
        const { pageData, modal } = this.state;
        console.log(pageData);
        return (
            <section className="introductory-table">
                <div className="introductory-table__inner">
                    <h2>Звонки на запись (за месяц)</h2>
                    <div className="introductory-table__name-row">
                        <span className="introductory-table__little-item">
                            Дата
                        </span>
                        <span>ФИО</span>
                        <span>Телефон</span>
                        <span className="introductory-table__little-item">
                            Запись
                        </span>
                        <span>Причина</span>
                    </div>
                    {pageData.map((row, index) => (
                        <div
                            key={index + '-introductory-table'}
                            className="introductory-table__main-row"
                        >
                            <span className="introductory-table__little-item">
                                {row.data}
                            </span>
                            <span>{row.name}</span>
                            <span>{row.phone}</span>
                            <span className="introductory-table__little-item">
                                {row.recording}
                            </span>
                            <span>{row.comment}</span>
                        </div>
                    ))}
                    <button onClick={() => this.handleModal(true)}>+</button>
                </div>
                {modal && (
                    <ModalTrainerIntroductoryCall
                        handleModal={this.handleModal}
                    ></ModalTrainerIntroductoryCall>
                )}
            </section>
        );
    }
}
