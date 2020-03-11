import React, { Component } from 'react';
import './style.css';

export default class SaleHeader extends Component {
    state = {
        pageData: {}
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
            <header className="sale-header">
                <h1>Продажи</h1>
                <span>План</span>
                <span className="sale-header__plan-cost">
                    {pageData.now} / {pageData.plan}
                </span>
                <button>Провести продажу</button>
            </header>
        );
    }
}
