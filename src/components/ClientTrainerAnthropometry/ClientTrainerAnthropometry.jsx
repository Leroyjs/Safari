import React, { Component } from 'react';
import ClientTrainerHeader from '../ClientTrainerHeader';
import Volume from '../Volume';
import Result from '../Result';
import Weight from '../Weight';
import './style.css';
export default class ClientTrainerAnthropometry extends Component {
    state = {
        pageData: {}
    };
    componentDidMount() {
        const { activeId } = this.props;
        const url = 'https://bagiran.ru/client-trainer/anthropometry';
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
                this.setState({
                    pageData: data
                });
            });
    }

    update = () => {
        const { activeId } = this.props;
        const url = 'https://bagiran.ru/client-trainer/anthropometry';
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
                this.setState({
                    pageData: data
                });
            });
    };
    render() {
        const { pageData } = this.state;
        const { activeId } = this.props;
        return (
            <main className="client-trainer-anthropometry">
                <ClientTrainerHeader
                    title="Антропометрия"
                    desc="Показатели фиксируются 1 раз в месяц 1 числа каждого месяца"
                ></ClientTrainerHeader>
                <Result pageData={pageData.result}></Result>
                <Volume
                    pageData={pageData.volume}
                    anthropometry="true"
                    activeId={activeId}
                    update={this.update}
                    modalData={{
                        url: '/client-trainer'
                    }}
                ></Volume>
                <Weight
                    update={this.update}
                    modalData={{
                        url: '/client-trainer/anthropometry/save-weight',
                        title: 'Ваш вес',
                        inputs: {
                            title: 'Вес',
                            postArg: 'val'
                        }
                    }}
                    pageData={pageData.weight}
                    anthropometry="true"
                    name="Вес (кг)"
                    activeId={activeId}
                ></Weight>
                <Weight
                    update={this.update}
                    modalData={{
                        url: '/client-trainer/anthropometry/save-pulse',
                        title: 'Ваш пульс',
                        inputs: {
                            title: 'Пульс',
                            postArg: 'val'
                        }
                    }}
                    activeId={activeId}
                    pageData={pageData.puls}
                    anthropometry="true"
                    name="Пульс  (уд. мин)"
                ></Weight>
            </main>
        );
    }
}
