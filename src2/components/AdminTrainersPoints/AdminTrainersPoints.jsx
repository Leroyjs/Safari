import React, { Component, useState } from 'react';
import ModalAdminPoints from '../ModalAdminPoints';
import ModalAdminList from '../ModalAdminList';
import ModalAdminUser from '../ModalAdminUser';
import ModalBool from '../ModalBool';
import userIcon from './user.png';
import plus from './+.png';
import minus from './-.png';
import eye from './eye.png';
import ok from './ok.png';
import './style.css';

export default class AdminTrainerPoints extends Component {
    state = {
        usersList: [],
        end: true,
        page: 1,
        input: '',
        search: '',
        modalPoints: false,
        modalHistory: false,
        actideId: 0,
        activeAction: true
    };
    handleChange = (event) => {
        const input = event.target.value;
        if (input) {
            let url = '/admin/trainers-points/search';
            const body = 's=' + input;
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                body: body,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            })
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    console.log(data.error);
                    if (data.error === undefined) {
                        this.setState({
                            usersList: data.list,
                            end: data.end,
                            search: '',
                            input
                        });
                    }
                    if (data.error === 'Ничего не найдено.') {
                        this.setState({
                            search: 'Ничего не найдено.',
                            input
                        });
                    }
                });
        } else {
            console.log(input, 'else');
            let url = '/admin/trainers-points/get-all';
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            })
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    this.setState({
                        usersList: data.list,
                        end: data.end,
                        page: 1,
                        input,
                        search: ''
                    });
                });
        }
    };
    componentDidMount() {
        let url = '/admin/trainers-points/get-all';
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
                    usersList: data.list,
                    end: data.end
                });
            });
    }
    handleLoad = () => {
        const { input } = this.state;
        let body = 'page=' + (this.state.page + 1);
        if (input) {
            body = 'page=' + (this.state.page + 1) + '&s=' + input;
        } else {
            body = 'page=' + (this.state.page + 1);
        }
        const url = '/admin/trainers-points/get-part';
        fetch(url, {
            method: 'POST',
            body: body,
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
                const oldList = this.state.usersList;
                this.setState({
                    usersList: oldList.concat(data.list),
                    end: data.end,
                    page: this.state.page + 1
                });
            });
    };
    handleModalPoints = (modalPoints, actideId, activeAction) => {
        this.setState({
            modalPoints,
            actideId,
            activeAction
        });
        this.update();
    };
    handleModalHistory = (modalHistory, actideId) => {
        this.setState({
            modalHistory,
            actideId
        });
        this.update();
    };
    handleModalUser = (modalUser, actideId, userName) => {
        this.setState({
            modalUser,
            actideId,
            userName
        });
        this.update();
    };
    handleModalBool = (modalBool, actideId) => {
        if (modalBool) {
            fetch('/admin/custome-points/get-task', {
                method: 'POST',
                body: 'user=' + actideId,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            })
                .then((result) => {
                    return result.json();
                })
                .then((modalTitle) => {
                    this.setState({
                        modalBool,
                        modalTitle,
                        actideId
                    });
                });
        } else {
            this.setState({
                modalBool,
                actideId
            });
        }
        this.update();
    };
    update() {
        console.log('update');
        let url = '/admin/trainers-points/get-all';
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
                    usersList: data.list,
                    end: data.end
                });
            });
    }
    render() {
        const {
            usersList,
            end,
            input,
            search,
            modalPoints,
            modalHistory,
            modalBool,
            modalUser,
            modalTitle,
            userName,
            actideId,
            activeAction
        } = this.state;
        return (
            <section className="admin-custome-points">
                <div className="admin-custome-points__table">
                    <div className="admin-custome-points__name-row">
                        <h3 className="admin-custome-points_long">ФИО</h3>
                        <h3>Уровень</h3>
                        <h3>Баллы</h3>
                        <div className="admin-custome-points__search admin-custome-points_medium">
                            <input
                                type="text"
                                onChange={this.handleChange}
                                value={input}
                                placeholder="Поиск"
                            />
                        </div>
                    </div>
                    {search === '' &&
                        usersList.map((user, index) => (
                            <div
                                key={index + '-admin-custome-points'}
                                className="admin-custome-points__main-row"
                                id={'user_' + user.user}
                            >
                                <span className="admin-custome-points_long">
                                    {user.name}
                                </span>
                                <span>{user.lvl}</span>
                                <span>{user.points}</span>
                                <div className="admin-custome-points__img admin-custome-points_medium">
                                    <img
                                        onClick={() =>
                                            this.handleModalUser(
                                                true,
                                                user.user,
                                                user.name
                                            )
                                        }
                                        src={userIcon}
                                        alt=""
                                    />
                                    <img
                                        onClick={() =>
                                            this.handleModalHistory(
                                                true,
                                                user.user,
                                                false
                                            )
                                        }
                                        src={eye}
                                        alt=""
                                    />
                                    <img
                                        onClick={() =>
                                            this.handleModalPoints(
                                                true,
                                                user.user,
                                                false
                                            )
                                        }
                                        src={minus}
                                        alt=""
                                    />
                                    <img
                                        onClick={() =>
                                            this.handleModalPoints(
                                                true,
                                                user.user,
                                                true
                                            )
                                        }
                                        src={plus}
                                        alt=""
                                    />
                                    {user.task && (
                                        <img
                                            onClick={() =>
                                                this.handleModalBool(
                                                    true,
                                                    user.user
                                                )
                                            }
                                            src={ok}
                                            alt=""
                                        />
                                    )}
                                </div>
                            </div>
                        ))}

                    {!end && search === '' && (
                        <button
                            className="admin-custome-points__load-bottom"
                            onClick={this.handleLoad}
                        >
                            Загрузить еще
                        </button>
                    )}
                    {search === 'Ничего не найдено.' && (
                        <span>Ничего не найдено</span>
                    )}
                </div>
                {modalPoints &&
                    (activeAction ? (
                        <ModalAdminPoints
                            title={'Добавить баллы'}
                            addData={'&user=' + actideId}
                            handleModal={this.handleModalPoints}
                            url={'/admin/custome-points/add-money'}
                            plus={true}
                        ></ModalAdminPoints>
                    ) : (
                        <ModalAdminPoints
                            title={'Отнять баллы'}
                            addData={'&user=' + actideId}
                            handleModal={this.handleModalPoints}
                            url={'/admin/custome-points/add-money'}
                            plus={false}
                        ></ModalAdminPoints>
                    ))}
                {modalHistory && (
                    <ModalAdminList
                        addData={'user=' + actideId}
                        handleModal={this.handleModalHistory}
                    ></ModalAdminList>
                )}
                {modalBool && (
                    <ModalBool
                        addData={'user=' + actideId}
                        handleModal={this.handleModalBool}
                        url={'/admin/custome-points/ok-task'}
                        title={modalTitle.name}
                    ></ModalBool>
                )}
                {modalUser && (
                    <ModalAdminUser
                        title={userName}
                        url={'/admin/custome-points/edit-role'}
                        addData={'user=' + actideId}
                        handleModal={this.handleModalUser}
                    ></ModalAdminUser>
                )}
            </section>
        );
    }
}
