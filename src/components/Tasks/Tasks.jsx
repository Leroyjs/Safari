import React, { Component } from 'react';
import './style.css';

export default class Tasks extends Component {
    state = {
        pageData: {
            desc: '',
            tasksList: []
        }
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
        const { desc, tasksList } = this.state.pageData;
        return (
            <section className="tasks">
                <h2>Задания данного уровня</h2>
                <p className="tasks__desc">{desc}</p>
                <ul>
                    {tasksList.map((task, index) => (
                        // eslint-disable-next-line no-unused-expressions
                        <li
                            key={index + '-tasks'}
                            className={task.state && 'tasks__completed'}
                        >
                            {task.name}
                            {task.type === 'count_training' &&
                                ' тренировок (считает по посещениям в программе)'}
                            {task.type === 'count_food' && ' проверок питания'}
                            {task.type === 'count_duty' &&
                                ' проведено дежурств'}
                            {task.type === 'count_help' && ' проведено помощи'}
                            {task.type === 'count_call' && ' звонков'}
                            {task.type === 'count_demo' && ' проведено вводных'}
                            {task.type === 'count_sale' && ' проведено продаж'}
                            {task.type === 'sum_sale' && ' сумма продаж'}
                        </li>
                    ))}
                    {this.props.children}
                </ul>
            </section>
        );
    }
}
