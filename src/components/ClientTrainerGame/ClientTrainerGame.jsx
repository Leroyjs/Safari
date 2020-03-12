import React, { Component } from 'react';
import ClientTrainerHeader from '../ClientTrainerHeader';
import Video from '../Video';
import Tasks from '../Tasks';
import PerformanceBonuses from '../PerformanceBonuses';
import './style.css';

export default class Game extends Component {
    state = {
        pageData: {}
    };
    componentDidMount() {
        const { activeId } = this.props;
        let url = ' https://bagiran.ru/client-trainer/game';
        const data = '&id=' + activeId;
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: data,
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
        console.log(pageData);
        return (
            <main className="client-trainer-game">
                <ClientTrainerHeader
                    title="Игра"
                    desc="Добро пожаловать! Смотри видео, выполняй задания, повышай уровень, получай бонусы"
                ></ClientTrainerHeader>
                <Video pageData={pageData.video}></Video>
                <Tasks pageData={pageData.tasks}></Tasks>
                <PerformanceBonuses
                    pageData={pageData.bonus}
                ></PerformanceBonuses>
            </main>
        );
    }
}
