import React, { Component } from 'react';
import ClientTrainerHeaderPA from '../ClientTrainerHeaderPA';
import Progress from '../Progress';
import Volume from '../Volume';
import Result from '../Result';
import Bonuses from '../Bonuses';
import Calendar from '../Calendar';
import ClientsList from '../ClientsList';

const data = {
    photo_100:
        'https://up.kpop.re/src/3c/f96574f680afa90a9d6b37849656757082bd19.jpg'
};
export default class ClientTrainer extends Component {
    render() {
        const isTrainer = false;
        return (
            <div className="personal-area">
                <ClientTrainerHeaderPA
                    isTrainer={isTrainer}
                    data={data}
                ></ClientTrainerHeaderPA>
                {!isTrainer && (
                    <main>
                        <Progress></Progress>
                        <Volume></Volume>
                        <Result></Result>
                        <Bonuses buttonOff={true}></Bonuses>
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
