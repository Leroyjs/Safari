import React, { Component } from 'react';
import './style.css';

export default class SalesGraphics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageData: {
                main: {
                    totalSum: 0,
                    planSum: 0,
                    percent: 0
                },
                sub: [
                    {
                        name: '',
                        percent: 0
                    }
                ]
            }
        };
    }
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
        const mainRotate = Math.round((180 * +pageData.main.percent) / 100);
        console.log(mainRotate);
        return (
            <section className="sales-graphics">
                <div className="sales-graphics__inner">
                    <h2>Продажи всех тренеров</h2>
                    <div>
                        {pageData.sub.map((user, index) => (
                            <div
                                key={index + '-sales-graphics'}
                                className="sales-graphics__row"
                            >
                                <span>{user.name}</span>
                                <div className="sales-graphics__graphic-wrapper">
                                    <div
                                        style={{ width: user.percent + '%' }}
                                        className="sales-graphics__graphic-inner"
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="sales-graphics__main-graphics">
                        <span>{pageData.main.totalSum}</span>
                        <div className="main-graphics__box">
                            <div
                                style={{
                                    transform: 'rotate(' + mainRotate + 'deg)'
                                }}
                                className="main-graphics__inner"
                            ></div>
                            <div className="main-graphics__inner-inner"></div>
                        </div>
                        <span>{pageData.main.planSum}</span>
                    </div>
                </div>
            </section>
        );
    }
}
