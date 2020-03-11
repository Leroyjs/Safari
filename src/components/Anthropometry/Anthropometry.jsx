import React, { Component } from 'react';
import Header from '../Header';
import Volume from '../Volume';
import Result from '../Result';
import Weight from '../Weight';
import './style.css';

export default class Anthropometry extends Component {
    state = {
        pageData: {}
    };
    componentDidMount() {
        let url = 'https://bagiran.ru/anthropometry';
        fetch(url, {
            method: 'POST',
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
    render() {
        const { pageData } = this.state;
        console.log(pageData);
        return (
            <main className="anthropometry">
                <Header
                    title="Антропометрия"
                    desc="Показатели фиксируются 1 раз в месяц 1 числа каждого месяца"
                ></Header>
                <Result pageData={pageData.result}></Result>
                <Volume
                    pageData={pageData.volume}
                    anthropometry="true"
                ></Volume>
                <Weight
                    pageData={pageData.weight}
                    anthropometry="true"
                    name="Вес (кг)"
                ></Weight>
                <Weight
                    pageData={pageData.puls}
                    anthropometry="true"
                    name="Пульс  (уд. мин)"
                ></Weight>
            </main>
        );
    }
}
