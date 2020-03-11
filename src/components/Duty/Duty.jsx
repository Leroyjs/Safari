import React, { Component } from 'react';
import Header from '../Header';
import Calendar from '../Calendar';
import CalendarStatDuty from '../CalendarStatDuty/';
import DutySales from '../DutySales/';
import './style.css';
export default class Duty extends Component {
    state = {
        pageData: {},
        dataList: {},
        activeDate: {
            day: 0,
            month: 0,
            year: 0
        }
    };
    componentDidMount() {
        const now = new Date();
        let url = 'https://bagiran.ru/calendar/';
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
                    dataList: data.days
                });
            });
    }

    handleChange = (data) => {
        const { month, year } = this.state.activeDate;
        if (data.month === month && data.year === year) {
            console.log(data);
            this.setState({
                activeDate: data
            });
        } else {
            const date = 'date=' + data.year + '-' + data.month;
            const url = 'https://bagiran.ru/calendar/get-all-days';
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
        const { pageData, activeDate, dataList } = this.state;
        return (
            <main className="duty">
                <Header
                    title="Дежурство"
                    desc={
                        <>
                            Тренер фиксирует дежурство в календаре <br />
                            (за заполненный день 3 балла) <br />
                            (за каждую помощь 3 балла) <br />
                            (за продажу с дежурства 50 баллов)
                        </>
                    }
                ></Header>
                <Calendar
                    handleChange={this.handleChange}
                    activeDate={activeDate}
                    pageData={dataList}
                ></Calendar>
                <CalendarStatDuty activeDate={activeDate}></CalendarStatDuty>
                <DutySales pageData={pageData.dutySales}></DutySales>
            </main>
        );
    }
}
