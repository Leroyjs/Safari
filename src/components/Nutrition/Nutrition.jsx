import React, { Component } from 'react';
import Header from '../Header';
import Calendar from '../Calendar';

export default class Nutrition extends Component {
    render() {
        return (
            <main className="nutrition">
                <Header
                    title="Питание"
                    desc="Фиксируйте каждый прием пищи (за заполнный день 10 баллов) тренер проверит и напишет комментарий"
                ></Header>
                <Calendar></Calendar>
            </main>
        );
    }
}
