import React, { Component } from 'react';
import Chart from 'react-google-charts';
import './style.css';
export default class HeaderPersonalArea extends Component {
    componentDidMount() {
        console.log(new Date(2014, 0, 1));
    }
    render() {
        return (
            <section className="progress">
                <h2>Прогресс в тренировках</h2>
                <div
                    id="chart_div"
                    style={{
                        display: 'flex',
                        overflow: 'hidden',
                        marginLeft: '-11.5%'
                    }}
                >
                    <Chart
                        width={'109%'}
                        height={'150px'}
                        chartType="LineChart"
                        loader={<div>Загрузка графика...</div>}
                        data={[
                            ['data', 'weight'],
                            ['01.20', 125],
                            ['02.20', 100],
                            ['03 20', 105],
                            ['04 20', 75],
                            ['05 20', 50]
                        ]}
                        options={{
                            legend: {
                                position: 'none'
                            },
                            vAxis: {
                                title: '',
                                textStyle: {
                                    fontSize: 10
                                }
                            },
                            hAxis: {
                                title: '',
                                textStyle: {
                                    fontSize: 10
                                }
                            },
                            series: {
                                0: { color: '#ee4d45' }
                            }
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                    {/* <Chart
                        width={'99%'}
                        height={'130px'}
                        chartType="Line"
                        loader={<div>Загрузка графика...</div>}
                        data={[
                            [{ type: 'date', label: '' }, ''],
                            [new Date(2014, 0, 1), 125],
                            [new Date(2014, 1), 100],
                            [new Date(2014, 2), 105],
                            [new Date(2014, 3), 75],
                            [new Date(2014, 4), 70],
                            [new Date(2014, 5), 68]
                        ]}
                        options={{
                            chart: {
                                title: ''
                            },
                            legend: {
                                position: 'none'
                            },
                            width: '100%',
                            height: 130,
                            series: {
                                // Gives each series an axis name that matches the Y-axis below.
                                0: {
                                    color: '#ee4d45',
                                    axis: 'Daylight'
                                }
                            },
                            vAxis: {
                                title: 'Popularity'
                            }
                        }}
                        rootProps={{ 'data-testid': '4' }}
                    /> */}
                </div>
            </section>
        );
    }
}
