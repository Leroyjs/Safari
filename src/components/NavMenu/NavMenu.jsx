import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import personalArea from './img/personal-area.svg';
import anthropometry from './img/anthropometry.svg';
import training from './img/training.svg';
import nutrition from './img/nutrition.svg';
import play from './img/play.svg';
import calendar from './img/calendar.png';
import sales from './img/sales.png';
import introductory from './img/introductory.png';
import spendPoints from './img/spend-points.svg';
import './style.css';

export default class App extends Component {
    state = {
        active: 'personalArea'
    };
    render() {
        const { whoIsIt } = this.props;
        return (
            <div className="nav-menu">
                <Link to="/">
                    <img
                        src={personalArea}
                        alt="Personal area"
                        className="nav__personal-area"
                    />
                </Link>

                {whoIsIt === 'isTrainer' && (
                    <Link to="/Calendar">
                        <img
                            src={calendar}
                            alt="Calendar"
                            className="nav__calendar"
                        />
                    </Link>
                )}
                {whoIsIt === 'isTrainer' && (
                    <Link to="/Introductory">
                        <img
                            src={introductory}
                            alt="Introductory"
                            className="nav__introductory"
                        />
                    </Link>
                )}
                {whoIsIt === 'isTrainer' && (
                    <Link to="/Sales">
                        <img src={sales} alt="Sales" className="nav__sales" />
                    </Link>
                )}
                {whoIsIt === 'isClient' && (
                    <Link to="/Anthropometry">
                        <img
                            src={anthropometry}
                            alt="Anthropometry"
                            className="nav__anthropometry"
                        />
                    </Link>
                )}
                {whoIsIt === 'isClient' && (
                    <Link to="/Training">
                        <img
                            src={training}
                            alt="Training"
                            className="nav__training"
                        />
                    </Link>
                )}
                {whoIsIt === 'isClient' && (
                    <Link to="/Nutrition">
                        <img
                            src={nutrition}
                            alt="Nutrition"
                            className="nav__nutrition"
                        />
                    </Link>
                )}

                <Link to="/Game">
                    <img src={play} alt="Game" className="nav__play" />
                </Link>

                <Link to="/SpendPoints">
                    <img
                        src={spendPoints}
                        alt="Spend points"
                        className="nav__spend-points"
                    />
                </Link>
            </div>
        );
    }
}
