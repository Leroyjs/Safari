import React, { Component } from 'react';
import Chart from 'react-google-charts';
import './style.css';
export default class HeaderPersonalArea extends Component {
    state = {
        pageData: []
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
        console.log(pageData);
        return (
            <section className="progress">
                <h2>Прогресс в тренировках</h2>
                {pageData.length !== 0 ? (
                    <>
                        <span className="progress__axis progress_weight">
                            Вес
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
                                        0: {
                                            color: '#EF4444'
                                        }
                                    }
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </div>
                    </>
                ) : (
                    'Здесь будет отображаться прогресс'
                )}
            </section>
        );
    }
}
