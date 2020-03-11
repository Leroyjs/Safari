import React, { Component } from 'react';
import Header from '../Header';
import Statistics from '../Statistics';
import TrainingMonth from '../TrainingMonth';
import TerenovkaStatistics from '../TerenovkaStatistics';
import './style.css';

export default class Training extends Component {
    state = {
        pageData: {
            workoutState: {},
            Workout: []
        },
        activeDay: [],
        statistics: []
    };
    componentDidMount() {
        let url = 'https://bagiran.ru/training';
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
                let activeDay = [];
                let statistics = [];
                for (let i = 0; i < data.Workout.length; i++) {
                    activeDay.push(false);
                    statistics.push(false);
                }
                console.log(data);
                console.log(activeDay);
                this.setState({
                    activeDay,
                    pageData: data,
                    statistics
                });
            });
    }
    handleLoad = (date, index, close) => {
        let data = `date=${date}`;
        let activeDay = JSON.parse(JSON.stringify(this.state.activeDay));
        let statistics = JSON.parse(JSON.stringify(this.state.statistics));
        if (!activeDay[index] || !close) {
            let url = 'https://bagiran.ru/training/get';
            fetch(url, {
                method: 'POST',
                body: data,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            })
                .then((result) => {
                    return result.json();
                })
                .then((dat) => {
                    statistics[index] = dat;
                    console.log(close, activeDay[index]);
                    if (!activeDay[index] || close) {
                        activeDay[index] = !activeDay[index];
                        this.setState({
                            statistics,
                            activeDay
                        });
                    } else {
                        this.setState({
                            statistics
                        });
                    }
                });
        } else {
            activeDay[index] = !activeDay[index];
            this.setState({
                activeDay
            });
        }
    };
    render() {
        const { pageData, activeDay, statistics } = this.state;
        return (
            <main className="training">
                <Header
                    title="Тренировки"
                    desc="Тренер фиксирует всю тренировку с подходами, повторениями и весами"
                ></Header>
                <Statistics pageData={pageData.workoutState}></Statistics>
                {pageData.Workout.map((block, index) => (
                    <div key={index + '-TerenovkaStatistics'}>
                        <TrainingMonth
                            index={index}
                            handleLoad={this.handleLoad}
                            pageData={block}
                        ></TrainingMonth>
                        {activeDay[index] && (
                            <TerenovkaStatistics
                                pageData={statistics[index]}
                            ></TerenovkaStatistics>
                        )}
                    </div>
                ))}
            </main>
        );
    }
}
