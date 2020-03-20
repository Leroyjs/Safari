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
        let warnCall = false;
        let warnDemo = false;

        if (pageData.cvDemoCall < 20) {
            warnCall = true;
        }
        if (pageData.cvSaleDemo < 25) {
            warnDemo = true;
        }
        return (
            <section className="conversion-introductory">
                <div className="conversion-introductory__h2">
                    <h2>Конверсия с вводных</h2>
                    <div className="conversion-duty__percent">
                        {pageData.cvDemoCall}%
                    </div>
                    <div className="conversion-duty__percent">
                        {pageData.cvSaleDemo}%
                    </div>
                </div>
                {warnCall && (
                    <div className="conversion-duty__support">
                        <div className="conversion-duty__question">!</div>
                        <p>
                            Пройди курс по продажам по телефону, плохо продаешь
                            по телефону
                        </p>
                    </div>
                )}
                {warnDemo && (
                    <div className="conversion-duty__support">
                        <div className="conversion-duty__question">!</div>
                        <p>
                            Пройди курс по вводным тренировкам, мы расскажем как
                            продавать на вводных
                        </p>
                    </div>
                )}
                <p>Звонков по вводным: {pageData.call}</p>
                <p>Проведено вводных: {pageData.demo}</p>
                <p>cv из звонков в проведенные: {pageData.cvDemoCall}%</p>
                <p>Купили: {pageData.sale}</p>
                <p>cv из проведенных в продажу: {pageData.cvSaleDemo}%</p>
                <p>Средний чек: {pageData.avgPrice} р</p>
                <b>Цель 25% от плана = 15 000 р</b>
                <br />
                <div className="conversion-duty__support">
                    <div className="conversion-duty__question">?</div>
                    <p>В следующем месяце нужно {pageData.nextPlan} звонков</p>
                    <p>либо лучше продавать по телефону</p>
                </div>
            </section>
        );
    }
}
