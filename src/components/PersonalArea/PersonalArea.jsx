import React, { Component } from 'react';
import HeaderPersonalArea from '../HeaderPersonalArea/';
import Progress from '../Progress';
import Volume from '../Volume';
import Result from '../Result';
import Bonuses from '../Bonuses';
import Calendar from '../Calendar';
import ClientsList from '../ClientsList';

export default class PersonalArea extends Component {
    render() {
        const { data, isTrainer } = this.props;
        return (
            <div className="personal-area">
                <HeaderPersonalArea
                    isTrainer={isTrainer}
                    data={data}
                ></HeaderPersonalArea>
                {!isTrainer && (
                    <main>
                        <Progress></Progress>
                        <Volume></Volume>
                        <Result></Result>
                        <Bonuses></Bonuses>
                    </main>
                )}
                {isTrainer && (
                    <main>
                        <Calendar isTrainer={isTrainer}></Calendar>
                        <ClientsList></ClientsList>
                    </main>
                )}
            </div>
        );
    }
}
