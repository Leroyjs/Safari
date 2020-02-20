import React, { Component } from 'react';
import './style.css';

export default class AdminTrainersGame extends Component {
    state = {
        lvlList: [
            {
                video: 'https://www.youtube.com/embed/-qzRU7T4la0',
                text: '',
                numberWorkouts: '',
                powerChecks: '',
                duty: '',
                help: '',
                calls: '',
                introductory: '',
                sales: '',
                salesAmount: '',
                points: '',
                taskManager: '',
                bonus0: '',
                bonus1: '',
                bonus2: ''
            }
        ]
    };
    handleChange = (event) => {
        const [index, name] = event.target.name.split('_');
        let lvlList = JSON.parse(JSON.stringify(this.state));
        lvlList = lvlList.lvlList;
        lvlList[index][name] = event.target.value;
        this.setState({ lvlList });
    };

    handleAdd = () => {
        const template = {
            video: '',
            text: '',
            numberWorkouts: '',
            powerChecks: '',
            duty: '',
            help: '',
            calls: '',
            introductory: '',
            sales: '',
            salesAmount: '',
            points: '',
            taskManager: '',
            bonus0: '',
            bonus1: '',
            bonus2: ''
        };
        let lvlList = JSON.parse(JSON.stringify(this.state));
        lvlList = lvlList.lvlList;
        lvlList.push(template);
        this.setState({ lvlList });
    };
    handleDel = (event) => {
        const [index, name] = event.target.name.split('_');
        let lvlList = JSON.parse(JSON.stringify(this.state));
        lvlList = lvlList.lvlList;
        lvlList.splice(index, 1);
        this.setState({ lvlList });
    };
    render() {
        return (
            <section className="admin-trainers-game">
                {this.state.lvlList.map((lvlData, index) => (
                    <div
                        key={index + 'admin-trainers-game__lvl'}
                        className="admin-trainers-game__lvl"
                    >
                        <div className="admin-trainers-game__column">
                            <h2>{index + 1 + ' уровень'}</h2>
                            <label>
                                Ссылка на видео
                                <input
                                    onChange={this.handleChange}
                                    name={index + '_video'}
                                    type="text"
                                    value={lvlData.video}
                                />
                            </label>
                            <label>
                                Текст задания
                                <textarea
                                    onChange={this.handleChange}
                                    name={index + '_text'}
                                    type="text"
                                    value={lvlData.text}
                                />
                            </label>
                            <div className="admin-trainers-game__inputs-block">
                                <label>
                                    Тренировок:
                                    <input
                                        onChange={this.handleChange}
                                        name={index + '_numberWorkouts'}
                                        type="text"
                                        value={lvlData.numberWorkouts}
                                    />
                                </label>
                                <label>
                                    Проверок питания:
                                    <input
                                        onChange={this.handleChange}
                                        name={index + '_powerChecks'}
                                        type="text"
                                        value={lvlData.powerChecks}
                                    />
                                </label>
                                <label>
                                    Дежурств:
                                    <input
                                        onChange={this.handleChange}
                                        name={index + '_duty'}
                                        type="text"
                                        value={lvlData.duty}
                                    />
                                </label>
                                <label>
                                    Помощи:
                                    <input
                                        onChange={this.handleChange}
                                        name={index + '_help'}
                                        type="text"
                                        value={lvlData.help}
                                    />
                                </label>
                                <label>
                                    Звонков:
                                    <input
                                        onChange={this.handleChange}
                                        name={index + '_calls'}
                                        type="text"
                                        value={lvlData.calls}
                                    />
                                </label>
                                <label>
                                    Вводных:
                                    <input
                                        onChange={this.handleChange}
                                        name={index + '_introductory'}
                                        type="text"
                                        value={lvlData.introductory}
                                    />
                                </label>
                                <label>
                                    Продаж:
                                    <input
                                        onChange={this.handleChange}
                                        name={index + '_sales'}
                                        type="text"
                                        value={lvlData.sales}
                                    />
                                </label>
                                <label>
                                    Сумма продаж:
                                    <input
                                        onChange={this.handleChange}
                                        name={index + '_salesAmount'}
                                        type="text"
                                        value={lvlData.salesAmount}
                                    />
                                </label>
                            </div>
                            <label>
                                Количество баллов
                                <input
                                    onChange={this.handleChange}
                                    name={index + '_points'}
                                    type="text"
                                    value={lvlData.points}
                                />
                            </label>
                            <label>
                                Задание фитнес-менеджеру
                                <input
                                    onChange={this.handleChange}
                                    name={index + '_taskManager'}
                                    type="text"
                                    value={lvlData.taskManager}
                                />
                            </label>
                            <div className="admin-trainers-game__button-block">
                                <button>Сохранить изменения</button>
                                <button
                                    name={index + '_del'}
                                    onClick={this.handleDel}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                        <div className="admin-trainers-game__column">
                            <iframe
                                src={
                                    lvlData.video.split(
                                        'https://www.youtube.com/embed/'
                                    ).length > 1 && lvlData.video
                                }
                                allowfullscreen
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                frameborder="0"
                                allowfullscreen=""
                            ></iframe>
                            <label>
                                Награда 1
                                <input
                                    onChange={this.handleChange}
                                    name={index + '_bonus0'}
                                    type="text"
                                    value={lvlData.bonus0}
                                />
                            </label>
                            <label>
                                Награда 2
                                <input
                                    onChange={this.handleChange}
                                    name={index + '_bonus1'}
                                    type="text"
                                    value={lvlData.bonus1}
                                />
                            </label>
                            <label>
                                Награда 3
                                <input
                                    onChange={this.handleChange}
                                    name={index + '_bonus2'}
                                    type="text"
                                    value={lvlData.bonus2}
                                />
                            </label>
                        </div>
                    </div>
                ))}
                <button
                    onClick={this.handleAdd}
                    className="admin-trainers-game__add-button"
                >
                    +
                </button>
            </section>
        );
    }
}
