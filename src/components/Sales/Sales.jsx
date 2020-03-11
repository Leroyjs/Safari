import React, { Component } from 'react';
import SaleHeader from '../SaleHeader';
import TrainingMonth from '../TrainingMonth';
import SaleStat from '../SaleStat';
import ConversionDuty from '../ConversionDuty';
import ConversionIntroductory from '../ConversionIntroductory';
import SalesGraphics from '../SalesGraphics';

export default class Duty extends Component {
    state = {
        pageData: {
            header: {},
            trainings: [],
            footer: {}
        },
        sales: [],
        duty: {},
        demo: {},
        activeMonth: '',
        list: {
            trainings: [
                {
                    title: 'Январь',
                    subtitle: '30к',
                    date: '2020-01'
                },
                {
                    title: 'Февраль',
                    subtitle: '20к',
                    date: '2020-02'
                },
                {
                    title: 'Март',
                    subtitle: '',
                    date: '2020-03'
                },
                {
                    title: 'Апрель',
                    subtitle: '',
                    date: '2020-04'
                },
                {
                    title: 'Май',
                    subtitle: '',
                    date: '2020-05'
                },
                {
                    title: 'Июнь',
                    subtitle: '',
                    date: '2020-06'
                },
                {
                    title: 'Июль',
                    subtitle: '',
                    date: '2020-04'
                },
                {
                    title: 'Август',
                    subtitle: ''
                },
                {
                    title: 'Сентябрь',
                    subtitle: ''
                },
                {
                    title: 'Октябрь',
                    subtitle: ''
                },
                {
                    title: 'Ноябрь',
                    subtitle: ''
                },
                {
                    title: 'Декабрь',
                    subtitle: ''
                }
            ]
        }
    };
    componentDidMount() {
        let url = 'https://bagiran.ru/sales';
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
                console.log(data);
                this.setState({
                    pageData: data,
                    sales: data.sales,
                    duty: data.duty,
                    demo: data.demo
                });
            });
    }
    handleLoad = (date, index, close) => {
        let data = `date=${date}`;
        console.log(data);

        let url = 'https://bagiran.ru/sales/get';
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
            .then((dat) => {
                console.log(dat);
                this.setState({
                    sales: dat.sales,
                    duty: dat.duty,
                    demo: dat.demo
                });
            });
    };
    render() {
        const { pageData, list, sales, duty, demo } = this.state;
        return (
            <main className="sales">
                <SaleHeader pageData={pageData.header}></SaleHeader>
                <TrainingMonth
                    index={1}
                    handleLoad={this.handleLoad}
                    title="Продажи"
                    pageData={list}
                    folding={false}
                ></TrainingMonth>
                <SaleStat pageData={sales}></SaleStat>
                <ConversionDuty pageData={duty}></ConversionDuty>
                <ConversionIntroductory
                    pageData={demo}
                ></ConversionIntroductory>
                <SalesGraphics pageData={pageData.footer}></SalesGraphics>
            </main>
        );
    }
}
