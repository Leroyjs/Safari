import React, { Component } from 'react';
import './style.css';

export default class SpendItem extends Component {
    render() {
        const { img, title, price } = this.props;
        return (
            <div className="spend-item">
                {img}
                <h3>{title}</h3>
                <span>{price}</span>
            </div>
        );
    }
}
