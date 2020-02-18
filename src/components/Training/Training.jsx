import React, { Component } from 'react';
import Header from '../Header';
import Statistics from '../Statistics';
import TrainingMonth from '../TrainingMonth';
import TerenovkaStatistics from '../TerenovkaStatistics';
import './style.css';

export default class Training extends Component {
    render() {
        return (
            <main className="training">
                <Header
                    title="Тренировки"
                    desc="Тренер фиксирует всю тренировку с подходами, повторениями и весами"
                ></Header>
                <Statistics></Statistics>
                <TrainingMonth></TrainingMonth>
                <TerenovkaStatistics></TerenovkaStatistics>
                <TrainingMonth></TrainingMonth>
            </main>
        );
    }
}
