import React, { Component } from 'react';
import ClientTrainerHeader from '../ClientTrainerHeader';
import Statistics from '../Statistics';
import ClientTrainerTrainingMonth from '../ClientTrainerTrainingMonth';
import ClientTrainerTerenovkaStatistics from '../ClientTrainerTerenovkaStatistics';
import ClientTrainerNav from '../ClientTrainerNav';
import './style.css';

export default class Training extends Component {
    render() {
        return (
            <main className="training">
                <ClientTrainerNav></ClientTrainerNav>
                <ClientTrainerHeader
                    title="Тренировки"
                    desc="Тренер фиксирует всю тренировку с подходами, повторениями и весами"
                ></ClientTrainerHeader>
                <Statistics button={false}></Statistics>
                <ClientTrainerTrainingMonth></ClientTrainerTrainingMonth>
                <ClientTrainerTerenovkaStatistics></ClientTrainerTerenovkaStatistics>
            </main>
        );
    }
}
