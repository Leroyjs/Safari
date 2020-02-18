import React, { Component } from 'react';
import SaleHeader from '../SaleHeader';
import TrainingMonth from '../TrainingMonth';
import SaleStat from '../SaleStat';
import ConversionDuty from '../ConversionDuty';
import ConversionIntroductory from '../ConversionIntroductory';
import SalesGraphics from '../SalesGraphics';

export default class Duty extends Component {
    render() {
        return (
            <main className="duty">
                <SaleHeader></SaleHeader>
                <TrainingMonth
                    title="Продажи"
                    trainings={[
                        {
                            title: 'Январь',
                            subtitle: '30к'
                        },
                        {
                            title: 'Февраль',
                            subtitle: '20к'
                        },
                        {
                            title: 'Март',
                            subtitle: ''
                        },
                        {
                            title: 'Апрель',
                            subtitle: ''
                        },
                        {
                            title: 'Май',
                            subtitle: ''
                        },
                        {
                            title: 'Июнь',
                            subtitle: ''
                        },
                        {
                            title: 'Июль',
                            subtitle: ''
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
                    ]}
                ></TrainingMonth>
                <SaleStat></SaleStat>
                <ConversionDuty></ConversionDuty>
                <ConversionIntroductory></ConversionIntroductory>
                <SalesGraphics></SalesGraphics>
            </main>
        );
    }
}
