import React, { Component } from 'react';
import Header from '../Header';
import Video from '../Video';
import Tasks from '../Tasks';
import PerformanceBonuses from '../PerformanceBonuses';

export default class Game extends Component {
    render() {
        console.log(process.env.PUBLIC_URL);
        return (
            <main className="anthropometry">
                <Header
                    title="Игра"
                    desc="Добро пожаловать! Смотри видео, выполняй задания, повышай уровень, получай бонусы"
                ></Header>
                <Video></Video>
                <Tasks></Tasks>
                <PerformanceBonuses></PerformanceBonuses>
            </main>
        );
    }
}
