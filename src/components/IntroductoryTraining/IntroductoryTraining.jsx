import React, { Component } from 'react';
import './style.css';
import Header from '../Header';
import Preloader from '../Preloader';
import Calendar from '../Calendar';
import IntroductoryTableCall from '../IntroductoryTableCall/';
import IntroductoryTableRecord from '../IntroductoryTableRecord/';
import DutySales from '../DutySales/';
export default class IntroductoryTraining extends Component {
    state = {
        pageData: {
            header: {
                points: {
                    trainerDemoRecord: '',
                    trainerDemoDay: ''
                }
            }
        },
        dataList: {},
        activeDate: {
            day: 0,
            month: 0,
            year: 0
        },
        isLoaded: false
    };
    componentDidMount() {
        const now = new Date();
        let url = 'https://bagiran.ru/introductory';
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
                    pageData: data,
                    activeDate: {
                        year: now.getFullYear(),
                        month: 1 + now.getMonth(),
                        day: now.getDate()
                    },
                    dataList: data.days,
                    isLoaded: true
                });
            });
    }

    handleChange = (data) => {
        let date = 'date=' + data.year + '-' + data.month;
        const { month, year } = this.state.activeDate;
        if (data.month === month && data.year === year) {
            console.log(data);
            this.setState({
                activeDate: data
            });
        } else {
            const url = 'https://bagiran.ru/introductory/get-all-days';
            fetch(url, {
                method: 'POST',
                body: date,
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
                .then((fulDays) => {
                    this.setState({
                        dataList: fulDays.days,
                        activeDate: data
                    });
                    console.log(this.state);
                });
        }
    };
    render() {
        const { pageData, activeDate, dataList, isLoaded } = this.state;
        console.log(pageData);
        return (
            <>
                {!isLoaded && <Preloader></Preloader>}
                <main className="introductory-training">
                    <Header
                        title="Вводные тренировки"
                        desc={
                            <>
                                Тренер фиксирует вводные в календаре <br />
                                (за заполненный день{' '}
                                {
                                    pageData.header.points.trainerDemoDay
                                } балла) <br />
                                (за продажу с вводной{' '}
                                {pageData.header.points.trainerDemoRecord}{' '}
                                баллов) <br />
                            </>
                        }
                    ></Header>
                    <Calendar
                        handleChange={this.handleChange}
                        activeDate={activeDate}
                        pageData={dataList}
                    ></Calendar>
                    <IntroductoryTableCall
                        activeDate={activeDate}
                    ></IntroductoryTableCall>
                    <IntroductoryTableRecord
                        activeDate={activeDate}
                    ></IntroductoryTableRecord>
                    <DutySales pageData={pageData.dutySales}></DutySales>
                </main>
            </>
        );
    }
}
