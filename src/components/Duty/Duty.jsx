import React, { Component } from 'react';
import Header from '../Header';
import Calendar from '../Calendar';
import CalendarStatDuty from '../CalendarStatDuty/';
import DutySales from '../DutySales/';
export default class Duty extends Component {
    render() {
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
                <Calendar hidden={true}></Calendar>
                <CalendarStatDuty></CalendarStatDuty>
                <DutySales></DutySales>
            </main>
        );
    }
}
