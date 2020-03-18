import React, { Component } from 'react';
import './style.css';

export default class Header extends Component {
    render() {
        const { title, subtitle, desc, children } = this.props;
        return (
            <section className="header">
                <h1>{title}</h1>
                <span>{subtitle}</span>
                <p>{desc}</p>
                {children}
            </section>
        );
    }
}
