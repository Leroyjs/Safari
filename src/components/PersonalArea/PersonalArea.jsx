import React, { Component } from 'react';
import HeaderPersonalArea from '../HeaderPersonalArea/';
import Progress from '../Progress';
import Volume from '../Volume';
import Result from '../Result';
import Bonuses from '../Bonuses';
import Calendar from '../Calendar';
import ClientsList from '../ClientsList';
import CalendarListClients from '../CalendarListClients';
import './style.css';

export default class PersonalArea extends Component {
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
        const { whoIsIt } = this.props;
        if (whoIsIt === 'isClient') {
            let url = 'https://bagiran.ru/main/customer';
            fetch(url, {
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
                .then((data) => {
                    this.setState({
                        pageData: data
                    });
                });
        }
        if (whoIsIt === 'isTrainer') {
            const now = new Date();
            let url = 'https://bagiran.ru/main/trainer';
            fetch(url, {
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
            const url = 'https://bagiran.ru/main/trainer-get-all-days';
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
        const { data, whoIsIt } = this.props;
        const { pageData, activeDate, dataList } = this.state;
        return (
            <div className="personal-area">
                <HeaderPersonalArea
                    whoIsIt={whoIsIt}
                    data={data}
                    pageData={pageData.header}
                ></HeaderPersonalArea>
                {whoIsIt === 'isClient' && (
                    <main>
                        <Progress pageData={pageData.chartWeight}></Progress>
                        <Volume pageData={pageData.volume}></Volume>
                        <Result pageData={pageData.result}></Result>
                        <Bonuses pageData={pageData.bonus}></Bonuses>
                    </main>
                )}
                {whoIsIt === 'isTrainer' && (
                    <main>
                        <Calendar
                            handleChange={this.handleChange}
                            activeDate={activeDate}
                            pageData={dataList}
                        ></Calendar>
                        <CalendarListClients
                            activeDate={activeDate}
                            clientsList={pageData.clientsList}
                        ></CalendarListClients>
                        <ClientsList
                            pageData={pageData.clientsList}
                        ></ClientsList>
                    </main>
                )}
            </div>
        );
    }
}
