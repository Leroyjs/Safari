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
                        </li>
                    ))}
                    {this.props.children}
                </ul>
            </section>
        );
    }
}
