import React, { Component } from 'react';
import AdminCustomerGame from '../AdminCustomerGame';
import AdminTrainersGame from '../AdminTrainersGame';
import AdminCustomePoints from '../AdminCustomePoints';
import AdminTrainersPoints from '../AdminTrainersPoints';
import { Route } from 'react-router-dom';

export default class AdminMain extends Component {
    render() {
        const { whoIsIt, data } = this.props;
        return (
            <>
                <Route path="/" component={AdminCustomerGame} exact></Route>
                <Route
                    path="/Admin/Trainers-game"
                    component={AdminTrainersGame}
                    exact
                ></Route>
                <Route
                    path="/Admin/Custome-points"
                    component={AdminCustomePoints}
                    exact
                ></Route>
                <Route
                    path="/Admin/Trainers-points"
                    component={AdminTrainersPoints}
                    exact
                ></Route>
            </>
        );
    }
}
