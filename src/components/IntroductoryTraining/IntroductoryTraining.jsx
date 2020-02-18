import React, { Component } from 'react';
import Header from '../Header';
import Calendar from '../Calendar';
import IntroductoryTableCall from '../IntroductoryTableCall/';
import IntroductoryTableRecord from '../IntroductoryTableRecord/';
import DutySales from '../DutySales/';
export default class IntroductoryTraining extends Component {
    render() {
        return (
            <main className="introductory-training">
                <Header
                    title="Вводные тренировки"
                    desc={
                        <>
                            Тренер фиксирует вводные в календаре <br />
                            (за заполненный день 3 балла) <br />
                            (за договоренность 3 балла) <br />
                            (за продажу с вводной 30 баллов) <br />
                        </>
                    }
                ></Header>
                <Calendar hidden={true}></Calendar>
                <IntroductoryTableCall></IntroductoryTableCall>
                <IntroductoryTableRecord></IntroductoryTableRecord>
                <DutySales></DutySales>
            </main>
        );
    }
}
