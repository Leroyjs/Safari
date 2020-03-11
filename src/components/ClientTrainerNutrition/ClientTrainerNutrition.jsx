import React, { Component } from 'react';
import ClientTrainerHeader from '../ClientTrainerHeader';
import Calendar from '../Calendar';
import ClientTrainerDayNutrition from '../ClientTrainerDayNutrition';
import './style.css';

export default class Nutrition extends Component {
    render() {
        return (
            <main className="client-trainer-nutrition">
                <ClientTrainerHeader
                    title="Питание"
                    desc="Клиент фиксирует каждый прием пищи (за заполн-
ный день 10 баллов) тренер проверяет и пишет
комментарий"
                ></ClientTrainerHeader>
                <Calendar hidden={true}></Calendar>
                <ClientTrainerDayNutrition></ClientTrainerDayNutrition>
            </main>
        );
    }
}
