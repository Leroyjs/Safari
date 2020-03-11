import React, { Component } from 'react';
import './style.css';

export default class Bonuses extends Component {
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
        const { buttonOff = false } = this.props;
        const { pageData } = this.state;
        return (
            <section className="bonuses">
                <h2>Бонусы 3 уровня</h2>
                <p>
                    Бонусы действительны в течение 5 дней, затем сгорают
                    <br />
                    Получить бонусы или купоны можно на ресепшене
                </p>
                <ul>
                    {pageData.map((bonus, index) => (
                        <li
                            key={index + '-bonuses'}
                            className={bonus.status && 'bonuses_active'}
                        >
                            {bonus.name}
                        </li>
                    ))}
                </ul>
                {!buttonOff && <button>Мне помог дежурный тренер</button>}
            </section>
        );
    }
}
