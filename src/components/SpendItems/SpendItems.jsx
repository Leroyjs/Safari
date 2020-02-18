import React, { Component } from 'react';
import SpendItem from '../SpendItem';
import './style.css';

export default class SpendItems extends Component {
    render() {
        const { title, style } = this.props;
        return (
            <section style={style} className="spend-items">
                <h2> {title}</h2>
                <SpendItem
                    src="gym.svg"
                    title="1 пт"
                    price="100 баллов"
                ></SpendItem>
                <SpendItem
                    src="massage.svg"
                    title="Массаж"
                    price="100 баллов"
                ></SpendItem>
                <SpendItem
                    src="spa.svg"
                    title="SPA"
                    price="200 баллов"
                ></SpendItem>
                <SpendItem
                    src="massager.svg"
                    title="Курс LPG"
                    price="1500 баллов"
                ></SpendItem>
                <SpendItem
                    src="sportsman.svg"
                    title="Обучение на тренера"
                    price="5000 баллов"
                ></SpendItem>
                <SpendItem
                    src="gloves.svg"
                    title="Тренировка по боксу"
                    price="200 баллов"
                ></SpendItem>
            </section>
        );
    }
}
