import React, { Component } from 'react';
import './style.css';

export default class Training extends Component {
    componentDidMount() {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
    }
    componentWillUnmount() {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
    }
    render() {
        return (
            <div className="preloader">
                <div class="cssload-container">
                    <div class="cssload-speeding-wheel"></div>
                </div>
            </div>
        );
    }
}
