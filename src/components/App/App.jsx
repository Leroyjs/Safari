import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavMenu from '../NavMenu';
import Main from '../Main';

export default class App extends Component {
    render() {
        const { data, isTrainer } = this.props;
        return (
            <>
                <BrowserRouter>
                    <Main isTrainer={isTrainer} data={data}></Main>
                    <NavMenu isTrainer={isTrainer}></NavMenu>
                </BrowserRouter>
            </>
        );
    }
}
