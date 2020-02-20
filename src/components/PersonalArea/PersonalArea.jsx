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
        const { data, whoIsIt } = this.props;
        return (
            <div className="personal-area">
                <HeaderPersonalArea
                    whoIsIt={whoIsIt}
                    data={data}
                ></HeaderPersonalArea>
                {whoIsIt === 'isClient' && (
                    <main>
                        <Progress></Progress>
                        <Volume></Volume>
                        <Result></Result>
                        <Bonuses></Bonuses>
                    </main>
                )}
                {whoIsIt === 'isTrainer' && (
                    <main>
                        <Calendar whoIsIt={whoIsIt}></Calendar>
                        <ClientsList></ClientsList>
                    </main>
                )}
            </div>
        );
    }
}
