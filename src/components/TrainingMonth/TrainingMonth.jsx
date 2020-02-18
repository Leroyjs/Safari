import React, { Component } from 'react';
import './style.css';

export default class TrainingMonth extends Component {
    constructor(props) {
        super(props);
        this.trainingMonthBlock = React.createRef();
        this.trainingMonthItems = React.createRef();
        this.state = {
            statisticsIsOpen: false,
            activeTraining: '.2020.january.20'
        };
    }
    componentDidMount() {
        const monthBlock = this.trainingMonthBlock.current;
        const monthItems = this.trainingMonthItems.current;
        const monthItemsChildren = monthItems.children;
        const monthItemStyle = monthItems.style;
        let coordinateX = '0';
        let coordinateXDelta;
        let coordinateXOld;
        let monthItemsChildrenWidth = 0;
        for (let i = 0; i < monthItemsChildren.length; i++) {
            const monthItemsChildrenStyle = getComputedStyle(
                monthItemsChildren[i]
            );
            const monthItemChildrenWidth = monthItemsChildrenStyle.width;
            monthItemsChildrenWidth += +monthItemChildrenWidth.substring(
                0,
                monthItemChildrenWidth.length - 2
            );
        }
        const monthBlockStyle = getComputedStyle(monthBlock);
        let monthBlockWidth = monthBlockStyle.width;
        monthBlockWidth = +monthBlockWidth.substring(
            0,
            monthBlockWidth.length - 2
        );
        const maxLeft = monthBlockWidth - monthItemsChildrenWidth;
        monthBlock.addEventListener('touchstart', (e) => {
            coordinateXOld = e.targetTouches[0].pageX;
            coordinateX = getComputedStyle(monthItems);
            coordinateX = coordinateX.left;
        });
        monthBlock.addEventListener('touchmove', (e) => {
            coordinateXDelta = e.targetTouches[0].pageX - coordinateXOld;
            if (
                +coordinateX.substring(0, coordinateX.length - 2) +
                    coordinateXDelta <=
                    0 &&
                +coordinateX.substring(0, coordinateX.length - 2) +
                    coordinateXDelta >=
                    maxLeft
            ) {
                monthItemStyle.left =
                    +coordinateX.substring(0, coordinateX.length - 2) +
                    coordinateXDelta +
                    'px';
            }
        });
    }
    openingStatHandler = () => {
        this.setState({
            statisticsIsOpen: !this.state.statisticsIsOpen
        });
    };
    render() {
        const {
            title = 'Январь',
            trainings = [
                {
                    title: 'Ноги',
                    subtitle: '3'
                },
                {
                    title: 'Ноги',
                    subtitle: '3'
                },
                {
                    title: 'Ноги',
                    subtitle: '3'
                },
                {
                    title: 'Ноги',
                    subtitle: '3'
                },
                {
                    title: 'Ноги',
                    subtitle: '3'
                },
                {
                    title: 'Ноги',
                    subtitle: '3'
                },
                {
                    title: 'Ноги',
                    subtitle: '3'
                },
                {
                    title: 'Ноги',
                    subtitle: '3'
                },
                {
                    title: 'Ноги',
                    subtitle: '3'
                },
                {
                    title: 'Ноги',
                    subtitle: '3'
                },
                {
                    title: 'Ноги',
                    subtitle: '3'
                }
            ]
        } = this.props;

        return (
            <section className="training-month">
                <h2>{title}</h2>
                <div
                    ref={this.trainingMonthBlock}
                    className="training-month__block"
                >
                    <div
                        onClick={this.openingStatHandler}
                        ref={this.trainingMonthItems}
                        className="training-month__items"
                    >
                        {trainings.map((data, index) => (
                            <div key={index} className="training-month__item">
                                <span className="training-month__name">
                                    {data.title}
                                </span>
                                <span className="training-month__data">
                                    {data.subtitle}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}
