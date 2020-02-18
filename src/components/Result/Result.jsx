import React, { Component } from 'react';
import './style.css';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.resultBlock = React.createRef();
    }
    componentDidMount() {
        const resultBlock = this.resultBlock.current;
        const resultBlockChildren = resultBlock.children;
        let sumBlockChildren = 0;
        let coordinateX;
        let coordinateXDelta = 0;
        let coordinateXOld;
        for (let i = 0; i < resultBlockChildren.length; i++) {
            const resultBlockChildrenStyle = getComputedStyle(
                resultBlockChildren[i]
            );
            console.log(resultBlockChildren[i]);
            const monthItemChildrenWidth = resultBlockChildrenStyle.width;
            console.log(monthItemChildrenWidth);
            sumBlockChildren +=
                14 +
                +monthItemChildrenWidth.substring(
                    0,
                    monthItemChildrenWidth.length - 2
                );
        }
        console.log(sumBlockChildren);
        const resultBlockWidth = document.documentElement.clientWidth;
        const maxLeft = resultBlockWidth - sumBlockChildren;
        console.log(maxLeft);
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
                resultBlock.style.left = +coordinateX + coordinateXDelta + 'px';
            }
        });
    }
    render() {
        let results = [
            {
                foto: '1.png',
                data: '01.11.20'
            },
            {
                foto: '5.webp',
                data: '01.12.20'
            },
            {
                foto: '1.png',
                data: '01.01.21'
            },
            {
                foto: '1.png',
                data: '01.02.21'
            }
        ];
        return (
            <section className="result">
                <h2>Результат</h2>
                <div ref={this.resultBlock} className="result__block">
                    {results.map((result, index) => (
                        <div key={index} className="result__item">
                            <div
                                className="result__item-img"
                                style={{
                                    backgroundImage:
                                        'url(' +
                                        process.env.PUBLIC_URL +
                                        '/img/results-foto/' +
                                        result.foto +
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
