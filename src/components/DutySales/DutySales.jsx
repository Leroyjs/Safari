import React, { Component } from 'react';
import './style.css';

export default class DutySales extends Component {
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
        let sum = 0;
        for (let i = 0; i < pageData.length; i++) {
            sum += +pageData[i].sum;
        }
        return (
            <section className="duty-sales">
                <div className="duty-sales__inner">
                    <h2>Продажи</h2>
                    <div className="duty-sales__name-row">
                        <div className="duty-sales__item">ФИО</div>
                        <div className="duty-sales__item">Телефон</div>
                        <div className="duty-sales__item">Продажа</div>
                        <div className="duty-sales__item">Сумма</div>
                    </div>
                    {pageData.map((row, index) => (
                        <div
                            key={index + '-duty-sales'}
                            className="duty-sales__main-row"
                        >
                            <div className="duty-sales__item">{row.name}</div>
                            <div className="duty-sales__item">{row.phone}</div>
                            <div className="duty-sales__item">
                                {row.sales}пт
                            </div>
                            <div className="duty-sales__item">{row.sum}р</div>
                        </div>
                    ))}
                    <span className="duty-sales__sum">Итого: {sum}p</span>
                </div>
            </section>
        );
    }
}
