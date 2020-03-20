import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavMenu from '../NavMenu';
import Main from '../Main';
import Admin from '../Admin';
import ModalStub from '../ModalStub';
import ModalReg from '../ModalReg';
import bridge from '@vkontakte/vk-bridge';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            whoIsIt: false,
            stub: true,
            reg: false
        };
    }
    componentDidMount() {
        let whoIsIt = '';
        let stub = true;
        fetch('https://bagiran.ru/api/cors', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Request-Headers': 'X-Requested-With, Origin',
                Origin: 'https://localhost:3000/'
            }
        }).then(() => {
            fetch('https://bagiran.ru/api/auth', {
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
                    console.log(data);
                    whoIsIt = data.who;
                    stub = data.stub;
                    if (whoIsIt === 'no') {
                        this.setState({
                            stub,
                            reg: true
                        });
                    } else {
                        console.log(data);
                        bridge.send('VKWebAppInit', {});
                        bridge
                            .sendPromise('VKWebAppGetUserInfo', {})
                            .then((dat) => {
                                this.setState({
                                    data: dat,
                                    whoIsIt,
                                    stub
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        // bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": 1, "key": "dBuBKe1kFcdemzB"});
                        bridge.send('VKWebAppAllowMessagesFromGroup', {
                            group_id: 53728458, // id группы, где вы админ, куда виджет
                            key: 'dBuBKe1kFcdemzB'
                        });
                    }
                });
        });
    }
    handleReg = (reg) => {
        let whoIsIt = '';
        let stub = true;
        fetch('https://bagiran.ru/api/auth', {
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
                whoIsIt = data.who;
                stub = data.stub;
                if (whoIsIt === 'no') {
                    this.setState({
                        stub,
                        reg: true
                    });
                } else {
                    console.log(data);
                    bridge.send('VKWebAppInit', {});
                    bridge
                        .sendPromise('VKWebAppGetUserInfo', {})
                        .then((dat) => {
                            this.setState({
                                data: dat,
                                whoIsIt,
                                stub,
                                reg: false
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    bridge.send('VKWebAppAllowMessagesFromGroup', {
                        group_id: 53728458,
                        key: 'dBuBKe1kFcdemzB'
                    });
                }
            });
    };
    render() {
        const { data, stub, whoIsIt, reg } = this.state;
        return (
            <>
                {!stub && whoIsIt && (
                    <BrowserRouter>
                        {whoIsIt !== 'isAdmin' && (
                            <Main whoIsIt={whoIsIt} data={data}></Main>
                        )}
                        {whoIsIt !== 'isAdmin' && (
                            <NavMenu whoIsIt={whoIsIt}></NavMenu>
                        )}
                        {whoIsIt === 'isAdmin' && <Admin></Admin>}
                    </BrowserRouter>
                )}
                {stub && <ModalStub></ModalStub>}
                {reg && (
                    <ModalReg
                        url={'/api/reg'}
                        addData=""
                        title="Введите номер вашей карты"
                        handleModal={this.handleReg}
                    ></ModalReg>
                )}
            </>
        );
    }
}
