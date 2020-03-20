import React, { Component } from 'react';
import './style.css';

export default class ConversionDuty extends Component {
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
        let warn = false;

        if (pageData.cvSaleHelp < 5) {
            warn = true;
        }
        return (
            <section className="conversion-duty">
                <div className="conversion-duty__h2">
                    <h2>Конверсия с дежурств</h2>
                    <div className="conversion-duty__percent">
                        {pageData.cvSaleHelp}%
                    </div>
                </div>
                {warn && (
                    <div className="conversion-duty__support">
                        <div className="conversion-duty__question">!</div>
                        <p>Пройди курс по продажам, ты плохо продаешь</p>
                    </div>
                )}
                <p>Смен: {pageData.count}</p>
                <p>Помощи: {pageData.help}</p>
                <p>Продажи: {pageData.sale}</p>
                <p>Средний чек: {pageData.avgPrice} р</p>
                <b>Цель 25% от плана = 15 000 р</b>
                <p>С конверсией {pageData.cvSaleHelp} % с помощи в продажу</p>
                <div className="conversion-duty__support">
                    <div className="conversion-duty__question">?</div>
                    <p>
                        Со средним чеком 7000 р в след месяце <br /> нужно
                        помочь {pageData.nextPlan} клиентам либо лучше продавать
                    </p>
                </div>
            </section>
        );
    }
}
