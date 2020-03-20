import React, { Component } from 'react';
import Header from '../Header';
import Statistics from '../Statistics';
import ClientTrainingMonth from '../ClientTrainingMonth';
import ClientTerenovkaStatistics from '../ClientTerenovkaStatistics';
import TrainingMonth from '../TrainingMonth';
import TerenovkaStatistics from '../TerenovkaStatistics';
import ModalRating from '../ModalRating';
import ModalRatingSolo from '../ModalRatingSolo';
import './style.css';

export default class Training extends Component {
    state = {
        pageData: {
            workoutState: {},
            Workout: [],
            header: { points: { training: '' } }
        },
        activeDay: [],
        statistics: [],
        myCoach: true,
        modal: true
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
                fetch('https://bagiran.ru/api/my-trainer', {
                    method: 'POST',
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
                    .then((myCoach) => {
                        console.warn(myCoach);
                        console.warn(data);
                        this.setState({
                            activeDay,
                            pageData: data,
                            myCoach,
                            statistics
                        });
                    });
            });
    }
    update = () => {
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
                console.warn(data);
                console.log(activeDay);
                this.setState({
                    activeDay,
                    pageData: data,
                    statistics
                });
            });
    };
    handleLoad = (date, index, close) => {
        console.warn(date, index, close);
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
                    statistics[index].date = date;
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
    handleModal = (modal) => {
        this.setState({
            modal
        });
    };
    render() {
        const { pageData, activeDay, statistics, myCoach, modal } = this.state;
        let newTraning = Boolean(pageData.prevTrainingId);
        console.log(pageData);
        return (
            <main className="training">
                <Header
                    title="Тренировки"
                    desc={
                        <>
                            Тренер фиксирует всю тренировку с подходами,
                            повторениями и весами <br></br>
                            Баллы за тренировку{' '}
                            {pageData.header.points.training}
                        </>
                    }
                ></Header>
                <Statistics
                    update={this.update}
                    pageData={pageData.workoutState}
                ></Statistics>
                {myCoach
                    ? pageData.Workout.map((block, index) => (
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
                      ))
                    : pageData.Workout.map((block, index) => (
                          <div key={index + '-TerenovkaStatistics'}>
                              <ClientTrainingMonth
                                  index={index}
                                  handleLoad={this.handleLoad}
                                  pageData={block}
                                  activeId={0}
                                  update={this.update}
                              ></ClientTrainingMonth>
                              {activeDay[index] && (
                                  <ClientTerenovkaStatistics
                                      pageData={statistics[index]}
                                      activeId={0}
                                      handleLoad={this.handleLoad}
                                  ></ClientTerenovkaStatistics>
                              )}
                          </div>
                      ))}
                {modal && myCoach && newTraning && (
                    <ModalRating
                        handleModal={this.handleModal}
                        update={this.update}
                        id={pageData.prevTrainingId}
                    ></ModalRating>
                )}
                {modal && !myCoach && newTraning && (
                    <ModalRatingSolo
                        handleModal={this.handleModal}
                        update={this.update}
                        id={pageData.prevTrainingId}
                    ></ModalRatingSolo>
                )}
            </main>
        );
    }
}
