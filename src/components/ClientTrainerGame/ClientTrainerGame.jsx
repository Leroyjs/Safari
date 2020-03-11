import React, { Component } from 'react';
import ClientTrainerHeader from '../ClientTrainerHeader';
import Video from '../Video';
import Tasks from '../Tasks';
import PerformanceBonuses from '../PerformanceBonuses';
import './style.css';

export default class Game extends Component {
    render() {
        console.log(process.env.PUBLIC_URL);
        return (
            <main className="client-trainer-game">
                <ClientTrainerHeader
                    title="Игра"
                    desc="Добро пожаловать! Смотри видео, выполняй задания, повышай уровень, получай бонусы"
                ></ClientTrainerHeader>
                <Video></Video>
                <Tasks></Tasks>
                <PerformanceBonuses></PerformanceBonuses>
            </main>
        );
    }
}
