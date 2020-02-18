import React, { Component } from 'react';
import './style.css';

export default class Tasks extends Component {
    render() {
        return (
            <section className="tasks">
                <ul>
                    <li className="tasks__completed">
                        15 тренировок (считает по посещениям в программе)
                    </li>
                    <li>50 берпи (сдать тренеру)</li>
                </ul>
            </section>
        );
    }
}
