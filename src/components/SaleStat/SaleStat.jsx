import React, { Component } from 'react';
import ModalTrainerSaleStat from '../ModalTrainerSaleStat';
import './style.css';

export default class SaleStat extends Component {
    state = {
        pageData: [],
        modal: false
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
    handleModal = (modal) => {
        this.setState({
            canUpate: true,
            modal
        });
    };
    render() {
        const { pageData, modal } = this.state;
        return (
            <section className="sale-stat">
                <div className="sale-stat__inner">
                    <h2>Январь</h2>
                    <div className="sale-stat__name-row">
                        <span>Дата</span>
                        <span>ФИО</span>
                        <span>Телефон</span>
                        <span>Источник</span>
                    </div>
                    {pageData.length !== 0 ? (
                        pageData.map((user, index) => (
                            <div
                                key={index + 'sale-stat'}
                                className="sale-stat__main-row"
                            >
                                <div className="sale-stat__main-row-1">
                                    <span>{user.date}</span>
                                    <span>{user.name}</span>
                                    <span>{user.phone}</span>
                                    <span>{user.source}</span>
                                </div>
                                <div className="sale-stat__main-row-2">
                                    <div className="sale-stat__main-row-inner-1">
                                        <b>Кол-во ПТ: </b>
                                        <span>{user.count}</span>
                                    </div>

                                    <div className="sale-stat__main-row-inner-2">
                                        <b>Сумма:</b> <span>{user.sum}р</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Продаж нет</p>
                    )}
                    <button onClick={() => this.handleModal(true)}>
                        Провести продажу
                    </button>
                </div>
                {modal && (
                    <ModalTrainerSaleStat
                        handleModal={this.handleModal}
                    ></ModalTrainerSaleStat>
                )}
            </section>
        );
    }
}
