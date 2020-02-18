import React, { Component } from 'react';
import Header from '../Header';
import Volume from '../Volume';
import Result from '../Result';
import Weight from '../Weight';

export default class Anthropometry extends Component {
    render() {
        return (
            <main className="anthropometry">
                <Header
                    title="Антропометрия"
                    desc="Показатели фиксируются 1 раз в месяц 1 числа каждого месяца"
                ></Header>
                <Result></Result>
                <Volume anthropometry="true"></Volume>
                <Weight anthropometry="true" name="Вес (кг)"></Weight>
                <Weight anthropometry="true" name="Пульс  (уд. мин)"></Weight>
            </main>
        );
    }
}
