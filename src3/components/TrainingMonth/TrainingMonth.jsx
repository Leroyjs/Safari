import React, { Component } from 'react';
import './style.css';

export default class TrainingMonth extends Component {
    constructor(props) {
        super(props);
        this.trainingMonthBlock = React.createRef();
        this.trainingMonthItems = React.createRef();
        this.state = {
            activeTraining: '',
            pageData: {
                trainings: []
            },
            index: 0
        };
    }
    componentDidUpdate() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            const { folding = true } = this.props;
            if (folding === false) {
                let now = new Date();
                let month = now.getMonth() + 1;
                if (month < 10) month = '0' + month;
                this.setState({
                    activeTraining: now.getFullYear() + '-' + month
                });
            }
            console.log(this.props);
            if (
                this.props.pageData !== undefined &&
                this.props.pageData !== this.state.pageData
            ) {
                this.setState({
                    pageData: this.props.pageData,
                    index: this.props.index
                });
                console.log(this.props);
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
                    const monthItemChildrenWidth =
                        monthItemsChildrenStyle.width;
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
                    coordinateXDelta =
                        e.targetTouches[0].pageX - coordinateXOld;
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
        }
    }

    componentDidMount() {
        const { folding = true } = this.props;
        if (folding === false) {
            let now = new Date();
            let month = now.getMonth() + 1;
            if (month < 10) month = '0' + month;
            this.setState({
                activeTraining: now.getFullYear() + '-' + month
            });
        }
        console.log(this.props);
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData,
                index: this.props.index
            });
            console.log(this.props);
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
    }
    handleClick = (data) => {
        const { handleLoad, folding = true } = this.props;
        console.log(this.state.index);
        const index = JSON.parse(JSON.stringify(this.state.index));
        if (data === this.state.activeTraining) {
            if (folding) {
                this.setState({
                    activeTraining: ''
                });
            }
            handleLoad(data, index, true);
        } else {
            this.setState({
                activeTraining: data
            });
            handleLoad(data, index, false);
        }
    };
    render() {
        const { title, trainings } = this.state.pageData;
        const { activeTraining } = this.state;
        return (
            <section className="training-month">
                <h2>{title}</h2>
                <div
                    ref={this.trainingMonthBlock}
                    className="training-month__block"
                >
                    <div
                        ref={this.trainingMonthItems}
                        className="training-month__items"
                    >
                        {trainings.map((data, index) => (
                            <div
                                key={index}
                                className={
                                    'training-month__item ' +
                                    (activeTraining === data.date &&
                                        'training-month_active')
                                }
                                onClick={() => this.handleClick(data.date)}
                            >
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
