import React, { Component } from 'react';
import './style.css';

export default class PerformanceBonuses extends Component {
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
        return (
            <section className="performance-bonuses">
                <h2>Бонусы за выполнение</h2>
                <div className="performance-bonuses__row">
                    <ul>
                        {pageData.map((bonus, index) => (
                            <li
                                key={index + '-bonuses'}
                                className="bonuses_active"
                            >
                                {bonus}
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="performance-bonuses__desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                </p>
            </section>
        );
    }
}
