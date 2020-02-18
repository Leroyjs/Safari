import React, { Component } from 'react';
import './style.css';

export default class SpendItem extends Component {
    render() {
        const { src, title, price } = this.props;
        return (
            <div className="spend-item">
                <img
                    src={process.env.PUBLIC_URL + '/img/spend-inems-img/' + src}
                    alt=""
                />
                <h3>{title}</h3>
                <span>{price}</span>
            </div>
        );
    }
}
