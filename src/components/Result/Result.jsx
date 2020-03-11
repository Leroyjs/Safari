import React, { Component } from 'react';
import './style.css';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.resultBlock = React.createRef();
        this.state = {
            pageData: []
        };
    }
    componentDidUpdate() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });
            const resultBlock = this.resultBlock.current;
            const resultBlockChildren = resultBlock.children;
            let sumBlockChildren = 0;
            let coordinateX;
            let coordinateXDelta = 0;
            let coordinateXOld;
            for (let i = 0; i < this.props.pageData.length; i++) {
                sumBlockChildren += 94;
            }

            const resultBlockWidth = document.documentElement.clientWidth;
            const maxLeft = resultBlockWidth - sumBlockChildren;

            resultBlock.addEventListener('touchstart', (e) => {
                coordinateXOld = e.targetTouches[0].pageX;
                coordinateX = getComputedStyle(resultBlock);
                coordinateX = coordinateX.left;
                coordinateX = +coordinateX.substring(0, coordinateX.length - 2);
            });
            resultBlock.addEventListener('touchmove', (e) => {
                coordinateXDelta = e.targetTouches[0].pageX - coordinateXOld;
                if (
                    coordinateX + coordinateXDelta <= 15 &&
                    coordinateX + coordinateXDelta >= maxLeft
                ) {
                    resultBlock.style.left =
                        +coordinateX + coordinateXDelta + 'px';
                }
            });
        }
    }
    render() {
        const { pageData } = this.state;
        return (
            <section className="result">
                <h2>Результат</h2>
                <div ref={this.resultBlock} className="result__block">
                    {pageData.map((result, index) => (
                        <div key={index} className="result__item">
                            <div
                                className="result__item-img"
                                style={{
                                    backgroundImage:
                                        'url(' +
                                        '/img/results-foto/' +
                                        result.photo +
                                        ')'
                                }}
                            ></div>
                            <span>{result.data}</span>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
}
