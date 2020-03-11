import React, { Component } from 'react';
import './style.css';

export default class AdminTrainersGame extends Component {
    state = {
        lvlList: [
            {
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
    handleSave = (event) => {
        const [index] = event.target.name.split('_');
        let lvlList = JSON.parse(JSON.stringify(this.state.lvlList[index]));
        console.log(lvlList);
        const url = 'https://bagiran.ru/admin/trainers-game/save';
        const {
            video,
            text,
            numberWorkouts,
            powerChecks,
            duty,
            help,
            calls,
            introductory,
            sales,
            salesAmount,
            taskManager,
            bonus0,
            bonus1,
            bonus2,
            points
        } = lvlList;
        let data = `lvl=${+index +
            1}&video=${video}&text=${text}&numberWorkouts=${numberWorkouts}&powerChecks=${powerChecks}&duty=${duty}&help=${help}&calls=${calls}&introductory=${introductory}&sales=${sales}&salesAmount=${salesAmount}&points=${points}&taskManager=${taskManager}&bonus0=${bonus0}&bonus1=${bonus1}&bonus2=${bonus2}`;
        console.log(data);
        fetch(url, {
            method: 'POST',
            body: data,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Request-Headers': 'X-Requested-With, Origin',
                Origin: 'https://localhost:3000/'
            }
        });
    };
    handleDel = (event) => {
        const [index, name] = event.target.name.split('_');
        let lvlList = JSON.parse(JSON.stringify(this.state));
        lvlList = lvlList.lvlList;
        lvlList.splice(index, 1);
        const url = 'https://bagiran.ru/admin/trainers-game/delete';
        const data = 'lvl=' + (+index + 1);
        fetch(url, {
            method: 'POST',
            body: data,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Request-Headers': 'X-Requested-With, Origin',
                Origin: 'https://localhost:3000/'
            }
        })
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                console.log(data);
                if (data.success === 'Уровень успешно удален.') {
                    this.setState({ lvlList });
                }
            });
    };
    componentDidMount() {
        let url = 'https://bagiran.ru/admin/trainers-game/get-all';
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Request-Headers': 'X-Requested-With, Origin',
                Origin: 'https://localhost:3000/'
            }
        })
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    lvlList: data
                });
            });
    }
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
                                <button
                                    name={index + '_save'}
                                    onClick={this.handleSave}
                                >
                                    Сохранить изменения
                                </button>
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
                                    lvlData.video &&
                                    'https://www.youtube.com/embed/' +
                                        lvlData.video
                                }
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                frameBorder="0"
                                allowFullScreen=""
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
