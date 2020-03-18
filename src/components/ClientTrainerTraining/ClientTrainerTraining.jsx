import React, { Component } from 'react';
import ClientTrainerHeader from '../ClientTrainerHeader';
import Statistics from '../Statistics';
import ClientTrainerTrainingMonth from '../ClientTrainerTrainingMonth';
import ClientTrainerTerenovkaStatistics from '../ClientTrainerTerenovkaStatistics';
import './style.css';

export default class Training extends Component {
    state = {
        pageData: {
            workoutState: {},
            Workout: []
        },
        activeDay: [],
        statistics: [],
        dateActive: ''
    };
    componentDidMount() {
        const { activeId } = this.props;
        const data = 'id=' + activeId;
        const url = 'https://bagiran.ru/client-trainer/training';
        fetch(url, {
            method: 'POST',
            body: data,
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
    update = () => {
        console.log('update');
        const { activeId } = this.props;
        const data = 'id=' + activeId;
        const url = 'https://bagiran.ru/client-trainer/training';
        fetch(url, {
            method: 'POST',
            body: data,
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
                this.setState({
                    pageData: data
                });
            });
    };
    handleLoad = (date, index, close) => {
        const { activeId } = this.props;

        let data = `date=${date}&id=${activeId}`;
        let activeDay = JSON.parse(JSON.stringify(this.state.activeDay));
        let statistics = JSON.parse(JSON.stringify(this.state.statistics));
        if (!activeDay[index] || !close) {
            let url = 'https://bagiran.ru/client-trainer/training/get';
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
                    statistics[index].date = date;
                    console.warn(dat);
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
        const { activeId } = this.props;
        return (
            <main className="training">
                <ClientTrainerHeader
                    title="Тренировки"
                    desc="Тренер фиксирует всю тренировку с подходами, повторениями и весами"
                ></ClientTrainerHeader>
                <Statistics
                    pageData={pageData.workoutState}
                    button={false}
                ></Statistics>
                {pageData.Workout.map((block, index) => (
                    <div key={index + '-TerenovkaStatistics'}>
                        <ClientTrainerTrainingMonth
                            index={index}
                            handleLoad={this.handleLoad}
                            pageData={block}
                            activeId={activeId}
                            update={this.update}
                        ></ClientTrainerTrainingMonth>
                        {activeDay[index] && (
                            <ClientTrainerTerenovkaStatistics
                                pageData={statistics[index]}
                                activeId={activeId}
                                handleLoad={this.handleLoad}
                            ></ClientTrainerTerenovkaStatistics>
                        )}
                    </div>
                ))}
            </main>
        );
    }
}
