import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavMenu from '../NavMenu';
import Main from '../Main';
import Admin from '../Admin';
import connect from '@vkontakte/vk-connect';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    componentDidMount() {
        connect.send('VKWebAppInit', {});
        connect
            .sendPromise('VKWebAppGetUserInfo', {})
            .then((dat) => {
                console.log(dat);
                this.setState({
                    data: dat
                });
            })
            .catch((error) => {
                console.log('error');
            });
    }
    render() {
        const { whoIsIt } = this.props;
        const { data } = this.state;
        return (
            <>
                <BrowserRouter>
                    {whoIsIt !== 'isAdmin' && (
                        <Main whoIsIt={whoIsIt} data={data}></Main>
                    )}
                    {whoIsIt !== 'isAdmin' && (
                        <NavMenu whoIsIt={whoIsIt}></NavMenu>
                    )}
                    {whoIsIt === 'isAdmin' && <Admin></Admin>}
                </BrowserRouter>
            </>
        );
    }
}
