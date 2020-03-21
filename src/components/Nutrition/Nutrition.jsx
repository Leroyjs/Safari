import React, { Component } from 'react';
import Header from '../Header';
import Calendar from '../Calendar';
import DayNutrition from '../DayNutrition';
import './style.css';

export default class Nutrition extends Component {
    state = {
        pageData: { header: { points: { clientFood: '' } } },
        activeDate: {
            day: 0,
            month: 0,
            year: 0
        }
    };
    componentDidMount() {
        const now = new Date();
        const date = 'date=' + now.getFullYear() + '-' + (1 + now.getMonth());
        const url = 'https://bagiran.ru/nutrition/get-all';
        fetch(url, {
            method: 'POST',
            body: date,
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
            .then((fulDays) => {
                console.log(fulDays);
                this.setState({
                    pageData: fulDays,
                    activeDate: {
                        year: now.getFullYear(),
                        month: 1 + now.getMonth(),
                        day: now.getDate()
                    }
                });
                console.log(this.state);
            });
    }
    handleChange = (data) => {
        const { month, year } = this.state.activeDate;
        if (data.month === month && data.year === year) {
            this.setState({
                activeDate: data
            });
        } else {
            const date = 'date=' + data.year + '-' + data.month;
            const url = 'https://bagiran.ru/nutrition/get-all';
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
                        pageData: fulDays,
                        activeDate: data
                    });
                    console.log(fulDays);
                });
        }
    };
    render() {
        const { pageData, activeDate } = this.state;
        console.log(pageData);
        console.log(activeDate);
        return (
            <main className="nutrition">
                <Header
                    title="Питание"
                    // desc={
                    //     <>
                    //         Фиксируйте каждый прием пищи (за заполнный день{' '}
                    //         {pageData.header.points.clientFood} баллов) тренер
                    //         проверит и напишет комментарий
                    //     </>
                    // }
                ></Header>
                <Calendar
                    handleChange={this.handleChange}
                    activeDate={activeDate}
                    pageData={pageData.days}
                ></Calendar>
                <DayNutrition activeDate={activeDate}></DayNutrition>
            </main>
        );
    }
}
