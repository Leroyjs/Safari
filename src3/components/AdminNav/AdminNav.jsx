import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default class AdminNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'Customer-game'
        };
    }
    componentDidMount() {
        console.log(document.location.pathname);
    }
    handleClick(active) {
        this.setState({
            active
        });
    }

    render() {
        return (
            <section className="admin-nav">
                <Link
                    className={
                        'admin-nav__link-1 admin-nav__link admin-nav__link_z-bottom ' +
                        (this.state.active === 'Customer-game' &&
                            ' admin-nav__link_active')
                    }
                    to="/"
                    onClick={() => this.handleClick('Customer-game')}
                >
                    <div>Игра клиентов</div>
                </Link>
                <Link
                    className={
                        'admin-nav__link-2 admin-nav__link ' +
                        (this.state.active === 'Trainers-game' &&
                            ' admin-nav__link_active')
                    }
                    to="/Admin/Trainers-game"
                    onClick={() => this.handleClick('Trainers-game')}
                >
                    <div>Игра тренеров</div>
                </Link>
                <Link
                    className={
                        'admin-nav__link-3 admin-nav__link ' +
                        (this.state.active === 'Custome-points' &&
                            ' admin-nav__link_active')
                    }
                    to="/Admin/Custome-points"
                    onClick={() => this.handleClick('Custome-points')}
                >
                    <div>Баллы клиентов</div>
                </Link>
                <Link
                    className={
                        'admin-nav__link-4 admin-nav__link admin-nav__link_z-bottom ' +
                        (this.state.active === 'Trainers-points' &&
                            ' admin-nav__link_active')
                    }
                    to="/Admin/Trainers-points"
                    onClick={() => this.handleClick('Trainers-points')}
                >
                    <div>Баллы тренеров</div>
                </Link>
            </section>
        );
    }
}
