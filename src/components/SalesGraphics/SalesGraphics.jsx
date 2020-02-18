import React, { Component } from 'react';
import './style.css';
import img from './3-layers.png';

let array = [
    {
        name: 'Константин',
        value: 10
    },
    {
        name: 'Олег',
        value: 70
    },
    {
        name: 'Николай',
        value: 50
    },
    {
        name: 'Юля',
        value: 60
    }
];
export default class SalesGraphics extends Component {
    constructor(props) {
        super(props);
        this.usersList = React.createRef();
    }
    componentDidMount() {
        let usersList = this.usersList.current.children;
        for (let i = 0; i < usersList.length; i++) {
            const listItem = usersList[i].lastElementChild.lastElementChild;
            listItem.style.width = array[i].value + '%';
        }
    }
    render() {
        return (
            <section className="sales-graphics">
                <div className="sales-graphics__inner">
                    <h2>Продажи всех тренеров</h2>
                    <div ref={this.usersList}>
                        {array.map((user, index) => (
                            <div
                                key={index + '-sales-graphics'}
                                className="sales-graphics__row"
                            >
                                <span>{user.name}</span>
                                <div className="sales-graphics__graphic-wrapper">
                                    <div className="sales-graphics__graphic-inner"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="sales-graphics__main-graphics">
                        <span>600 000</span>
                        <img src={img} alt="" />
                        <span>1 000 000</span>
                    </div>
                </div>
            </section>
        );
    }
}
