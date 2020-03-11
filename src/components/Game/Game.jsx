import React, { Component } from 'react';
import Header from '../Header';
import Video from '../Video';
import Tasks from '../Tasks';
import PerformanceBonuses from '../PerformanceBonuses';
import './style.css';

export default class Game extends Component {
    state = {
        pageData: {}
    };
    componentDidMount() {
        const { whoIsIt } = this.props;
        let url;
        if (whoIsIt === 'isClient') {
            url = 'https://bagiran.ru/game/customer';
        }
        if (whoIsIt === 'isTrainer') {
            url = 'https://bagiran.ru/game/trainer';
        }
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Request-Headers': 'X-Requested-With, Origin',
                Origin: 'https://localhost:3000/'
            }
        })
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    pageData: data
                });
            });
    }
    render() {
        const { pageData } = this.state;
        return (
            <main className="game">
                <Header
                    title="Игра"
                    desc="Добро пожаловать! Смотри видео, выполняй задания, повышай уровень, получай бонусы"
                ></Header>
                <Video pageData={pageData.video}></Video>
                <Tasks pageData={pageData.tasks}></Tasks>
                <PerformanceBonuses
                    pageData={pageData.bonus}
                ></PerformanceBonuses>
            </main>
        );
    }
}
