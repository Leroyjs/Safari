import React, { Component } from 'react';
import ModalTrainerIntroductoryRecord from '../ModalTrainerIntroductoryRecord';
import x from './x.png';
import './style.css';

export default class IntroductoryTableRecord extends Component {
    state = {
        pageData: [],
        date: '',
        modal: false,
        canUpate: true
    };
    componentDidUpdate() {
        let date = this.props.activeDate;
        if (
            (date !== undefined && date !== this.state.date) ||
            this.state.canUpate
        ) {
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
                        pageData: data.IntroductoryTableRecord,
                        date: this.props.activeDate,
                        canUpate: false
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
    handleDel = (id) => {
        fetch('/introductory/del-demo', {
            method: 'POST',
            credentials: 'include',
            body: 'id=' + id,
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
        const { pageData, modal } = this.state;
        console.log(pageData);
        return (
            <section className="introductory-table">
                <div className="introductory-table__inner">
                    <h2>Запись на вводные</h2>
                    <div className="introductory-table__name-row">
                        <span className="introductory-table__little-item">
                            Дата
                        </span>
                        <span>ФИО</span>
                        <span>Телефон</span>
                        <span>Тренировка</span>
                        <span style={{ minWidth: '10px' }}></span>
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
                                {row.time}
                            </span>
                            <span
                                onClick={() => this.handleDel(row.id)}
                                style={{ minWidth: '10px' }}
                            >
                                <img
                                    style={{ maxHeight: '10px' }}
                                    src={x}
                                ></img>
                            </span>
                        </div>
                    ))}
                    <button onClick={() => this.handleModal(true)}>+</button>
                </div>
                {modal && (
                    <ModalTrainerIntroductoryRecord
                        handleModal={this.handleModal}
                    ></ModalTrainerIntroductoryRecord>
                )}
            </section>
        );
    }
}
