import React, { Component } from 'react';
import SaleHeader from '../SaleHeader';
import TrainingMonth from '../TrainingMonth';
import Preloader from '../Preloader';
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
            trainings: []
        },
        isLoaded: false
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
                let list = {
                    trainings: data.trainings
                };
                console.log(list);
                this.setState({
                    list: {
                        trainings: data.trainings
                    },
                    pageData: data,
                    sales: data.sales,
                    duty: data.duty,
                    demo: data.demo,
                    isLoaded: true
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
        const { pageData, list, sales, duty, demo, isLoaded } = this.state;
        console.log(pageData);
        return (
            <>
                {!isLoaded && <Preloader></Preloader>}
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
            </>
        );
    }
}
