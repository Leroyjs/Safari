import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PersonalArea from '../PersonalArea/';
import Anthropometry from '../Anthropometry';
import Training from '../Training';
import Nutrition from '../Nutrition';
import Game from '../Game';
import SpendPoints from '../SpendPoints';
import Duty from '../Duty';
import Sales from '../Sales';
import IntroductoryTraining from '../IntroductoryTraining';
import ClientTrainer from '../ClientTrainer';
import ClientTrainerAnthropometry from '../ClientTrainerAnthropometry';
import ClientTrainerGame from '../ClientTrainerGame';
import ClientTrainerNutrition from '../ClientTrainerNutrition';
import ClientTrainerTraining from '../ClientTrainerTraining';
import ClientTrainerNav from '../ClientTrainerNav';

export default class Main extends Component {
    state = {
        activeId: '1'
    };
    handleChangeId = (activeId) => {
        console.log(activeId);
        this.setState({
            activeId
        });
    };
    render() {
        const { whoIsIt, data } = this.props;
        const { activeId } = this.state;
        return (
            <>
                <Route
                    path="/"
                    render={() => (
                        <PersonalArea
                            handleChangeId={this.handleChangeId}
                            whoIsIt={whoIsIt}
                            data={data}
                        />
                    )}
                    exact
                ></Route>
                <Route
                    path="/Introductory"
                    component={IntroductoryTraining}
                    exact
                ></Route>
                <Route
                    path="/Client-trainer"
                    component={ClientTrainerNav}
                ></Route>
                <Route
                    path="/Client-trainer"
                    render={() => <ClientTrainer activeId={activeId} />}
                    exact
                ></Route>
                <Route
                    path="/Client-trainer/Anthropometry"
                    render={() => (
                        <ClientTrainerAnthropometry activeId={activeId} />
                    )}
                    exact
                ></Route>
                <Route
                    path="/Client-trainer/Game"
                    render={() => <ClientTrainerGame activeId={activeId} />}
                    exact
                ></Route>
                <Route
                    path="/Client-trainer/Nutrition"
                    render={() => (
                        <ClientTrainerNutrition activeId={activeId} />
                    )}
                    exact
                ></Route>
                <Route
                    path="/Client-trainer/Training"
                    render={() => <ClientTrainerTraining activeId={activeId} />}
                    exact
                ></Route>
                <Route path="/Calendar" component={Duty} exact></Route>
                <Route path="/Sales" component={Sales} exact></Route>
                <Route
                    path="/Anthropometry"
                    component={Anthropometry}
                    exact
                ></Route>
                <Route path="/Training" component={Training} exact></Route>
                <Route path="/Nutrition" component={Nutrition} exact></Route>
                <Route
                    path="/Game"
                    render={() => <Game whoIsIt={whoIsIt} />}
                    exact
                ></Route>
                <Route
                    path="/SpendPoints"
                    render={() => <SpendPoints whoIsIt={whoIsIt} />}
                    exact
                ></Route>
            </>
        );
    }
}
