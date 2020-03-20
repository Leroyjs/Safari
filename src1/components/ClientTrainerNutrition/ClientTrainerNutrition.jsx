import React, { Component } from 'react';
import ClientTrainerHeader from '../ClientTrainerHeader';
import Calendar from '../Calendar';
import ClientTrainerDayNutrition from '../ClientTrainerDayNutrition';
import './style.css';

export default class Nutrition extends Component {
    state = {
        pageData: {
            header: {
                points: {
                    trainerFood: ''
                }
            }
        },
        activeDate: {
            day: 0,
            month: 0,
            year: 0
        }
    };
    componentDidMount() {
        const { activeId } = this.props;
        const now = new Date();
        const date =
            'date=' +
            now.getFullYear() +
            '-' +
            (1 + now.getMonth()) +
            '&id=' +
            activeId;
        const url = '/client-trainer/nutrition/get-all';
        console.log(url, date);
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
            });
    }
    handleChange = (data) => {
        const { activeId } = this.props;
        const { month, year } = this.state.activeDate;
        if (data.month === month && data.year === year) {
            this.setState({
                activeDate: data
            });
        } else {
            const date =
                'date=' + data.year + '-' + data.month + '&id=' + activeId;
            const url = '/client-trainer/nutrition/get-all';
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
                    console.log(this.state);
                });
        }
    };
    render() {
        const { activeId } = this.props;
        const { pageData, activeDate } = this.state;
        console.log(pageData);
        return (
            <main className="client-trainer-nutrition">
                <ClientTrainerHeader
                    title="Питание"
                    // desc={
                    //     <>
                    //         Клиент фиксирует каждый прием пищи (за заполнный
                    //         день {pageData.header.points.trainerFood} баллов)
                    //         тренер проверяет и пишет комментарий"
                    //     </>
                    // }
                ></ClientTrainerHeader>
                <Calendar
                    handleChange={this.handleChange}
                    activeDate={activeDate}
                    pageData={pageData.days}
                ></Calendar>
                <ClientTrainerDayNutrition
                    activeId={activeId}
                    activeDate={activeDate}
                ></ClientTrainerDayNutrition>
            </main>
        );
    }
}
