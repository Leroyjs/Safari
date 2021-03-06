import React, { Component } from 'react';
import './style.css';

export default class ClientTrainerHeader extends Component {
    render() {
        const { title, subtitle, desc } = this.props;
        return (
            <section className="client-trainer-header">
                <div className="client-trainer-header__title">
                    <h2></h2>
                    <h1>{title}</h1>
                </div>
                <span>{subtitle}</span>
                <p>{desc}</p>
            </section>
        );
    }
}
