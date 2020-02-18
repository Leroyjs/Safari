import React, { Component } from 'react';
import './style.css';

let array = {
    plan: '31 000 / 60 000'
};
export default class SaleHeader extends Component {
    render() {
        return (
            <header className="sale-header">
                <h1>Продажи</h1>
                <span>План</span>
                <span className="sale-header__plan-cost">{array.plan}</span>
                <button>Провести продажу</button>
            </header>
        );
    }
}
