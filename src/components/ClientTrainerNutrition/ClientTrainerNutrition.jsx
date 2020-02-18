import React, { Component } from 'react';
import ClientTrainerHeader from '../ClientTrainerHeader';
import Calendar from '../Calendar';
import ClientTrainerNav from '../ClientTrainerNav';
import ClientTrainerDayNutrition from '../ClientTrainerDayNutrition';

export default class Nutrition extends Component {
    render() {
        return (
            <main className="nutrition">
                <ClientTrainerNav></ClientTrainerNav>
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
