import React, { Component } from 'react';
import ClientTrainerHeaderPA from '../ClientTrainerHeaderPA';
import Progress from '../Progress';
import Volume from '../Volume';
import Result from '../Result';
import Bonuses from '../Bonuses';

export default class ClientTrainer extends Component {
    state = {
        pageData: {}
    };
    componentDidMount() {
        const { activeId } = this.props;
        const url = 'https://bagiran.ru/client-trainer/';
        const data = 'id=' + activeId;
        fetch(url, {
            method: 'POST',
            body: data,
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
                    pageData: data
                });
            });
    }
    render() {
        const { pageData } = this.state;
        const isTrainer = false;
        return (
            <div className="personal-area">
                <ClientTrainerHeaderPA
                    isTrainer={isTrainer}
                    pageData={pageData.header}
                ></ClientTrainerHeaderPA>

                <main>
                    <Progress pageData={pageData.chartWeight}></Progress>
                    <Volume pageData={pageData.volume}></Volume>
                    <Result pageData={pageData.result}></Result>
                    <Bonuses
                        pageData={pageData.bonus}
                        buttonOff={true}
                    ></Bonuses>
                </main>
            </div>
        );
    }
}
