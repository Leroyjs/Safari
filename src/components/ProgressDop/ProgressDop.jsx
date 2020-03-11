import React, { Component } from 'react';
import Chart from 'react-google-charts';
import './style.css';
export default class HeaderPersonalArea extends Component {
    state = {
        pageData: [['data', 'Вес']]
    };

    componentDidUpdate() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });
        }
    }
    render() {
        const { pageData } = this.state;
        return (
            <section className="progress-dop">
                <span className="progress-dop__axis progress-dop_date">
                    Дата
                </span>
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
                        data={pageData}
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
                                    color: 'rgb(34, 34, 34)',
                                    fontSize: 10
                                }
                            },
                            series: {
                                0: { color: '#EF4444' }
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
