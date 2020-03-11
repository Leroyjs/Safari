import React, { Component } from 'react';
import ClientTrainerHeader from '../ClientTrainerHeader';
import Volume from '../Volume';
import Result from '../Result';
import Weight from '../Weight';
import './style.css';
export default class ClientTrainerAnthropometry extends Component {
    render() {
        return (
            <main className="client-trainer-anthropometry">
                <ClientTrainerHeader
                    title="Антропометрия"
                    desc="Показатели фиксируются 1 раз в месяц 1 числа каждого месяца"
                ></ClientTrainerHeader>
                <Result></Result>
                <Volume anthropometry="true"></Volume>
                <Weight anthropometry="true" name="Вес (кг)"></Weight>
                <Weight anthropometry="true" name="Пульс  (уд. мин)"></Weight>
            </main>
        );
    }
}
