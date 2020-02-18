import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import personalArea from './img/personal-area.png';
import anthropometry from './img/anthropometry.png';
import training from './img/training.png';
import nutrition from './img/nutrition.png';
import play from './img/play.png';
import './style.css';

export default class ClientTrainerNav extends Component {
    state = {
        active: 'personalArea'
    };
    render() {
        return (
            <div className="client-trainer-nav">
                <Link to="/Client-trainer">
                    <img
                        src={personalArea}
                        alt="Personal area"
                        className="client-trainer-nav__personal-area"
                    />
                </Link>

                <Link to="/Client-trainer/Anthropometry">
                    <img
                        src={anthropometry}
                        alt="Anthropometry"
                        className="client-trainer-nav__anthropometry"
                    />
                </Link>

                <Link to="/Client-trainer/Training">
                    <img
                        src={training}
                        alt="Training"
                        className="client-trainer-nav__training"
                    />
                </Link>

                <Link to="/Client-trainer/Nutrition">
                    <img
                        src={nutrition}
                        alt="Nutrition"
                        className="client-trainer-nav__nutrition"
                    />
                </Link>

                <Link to="/Client-trainer/Game">
                    <img
                        src={play}
                        alt="Game"
                        className="client-trainer-nav__play"
                    />
                </Link>
            </div>
        );
    }
}
