import React, { Component } from 'react';
import './style.css';

export default class AdminCustomerGame extends Component {
    state = {
        lvlList: [
            {
                video: '',
                text: '',
                numberWorkouts: '',
                taskCoach: '',
                taskAdmin: '',
                bonus0: '',
                bonus1: '',
                bonus2: '',
                points: ''
            }
        ]
    };
    handleChange = (event) => {
        const [index, name] = event.target.name.split('_');
        let lvlList = JSON.parse(JSON.stringify(this.state.lvlList));
        lvlList[index][name] = event.target.value;
        this.setState({ lvlList });
    };

    handleAdd = () => {
        const template = {
            video: '',
            text: '',
            numberWorkouts: '',
            taskCoach: '',
            taskAdmin: '',
            bonus0: '',
            bonus1: '',
            bonus2: '',
            points: ''
        };
        let lvlList = JSON.parse(JSON.stringify(this.state.lvlList));
        lvlList.push(template);
        this.setState({ lvlList });
    };
    handleDel = (event) => {
        const [index, name] = event.target.name.split('_');
        let lvlList = JSON.parse(JSON.stringify(this.state.lvlList));
        lvlList.splice(index, 1);
        const url = 'https://bagiran.ru/main/admin-delete';
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
    handleSave = (event) => {
        const [index] = event.target.name.split('_');
        let lvlList = JSON.parse(JSON.stringify(this.state.lvlList[index]));
        console.log(lvlList);
        const url = 'https://bagiran.ru/main/admin-save';
        const {
            video,
            text,
            numberWorkouts,
            taskCoach,
            taskAdmin,
            bonus0,
            bonus1,
            bonus2,
            points
        } = lvlList;
        let data = `lvl=${+index +
            1}&video=${video}&text=${text}&numberWorkouts=${numberWorkouts}&taskCoach=${taskCoach}&taskAdmin=${taskAdmin}&bonus0=${bonus0}&bonus1=${bonus1}&bonus2=${bonus2}&points=${points}`;
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
    componentDidMount() {
        let url = 'https://bagiran.ru/main/admin';
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
                this.setState({
                    lvlList: data
                });
            });
    }
    render() {
        return (
            <section className="admin-customer-game">
                {this.state.lvlList.map((lvlData, index) => (
                    <div
                        key={index + 'admin-customer-game__lvl'}
                        className="admin-customer-game__lvl"
                    >
                        <div className="admin-customer-game__column">
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
                            <label>
                                Количество тренировок
                                <input
                                    onChange={this.handleChange}
                                    name={index + '_numberWorkouts'}
                                    type="text"
                                    value={lvlData.numberWorkouts}
                                />
                            </label>
                            <label>
                                Задание тренеру
                                <input
                                    onChange={this.handleChange}
                                    name={index + '_taskCoach'}
                                    type="text"
                                    value={lvlData.taskCoach}
                                />
                            </label>
                            <label>
                                Задание администратору
                                <input
                                    onChange={this.handleChange}
                                    name={index + '_taskAdmin'}
                                    type="text"
                                    value={lvlData.taskAdmin}
                                />
                            </label>
                            <label>
                                Количество баллов
                                <input
                                    onChange={this.handleChange}
                                    name={index + '_points'}
                                    type="text"
                                    value={lvlData.points}
                                />
                            </label>
                            <div className="admin-customer-game__button-block">
                                <button
                                    onClick={this.handleSave}
                                    name={index + '_save'}
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
                        <div className="admin-customer-game__column">
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
                    className="admin-customer-game__add-button"
                >
                    +
                </button>
            </section>
        );
    }
}
