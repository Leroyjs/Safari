import React, { Component } from 'react';
import Header from '../Header';
import SpendItems from '../SpendItems';
import Preloader from '../Preloader';

export default class SpendPoints extends Component {
    state = {
        pageData: { money: 0 },
        isLoaded: false
    };
    componentDidMount() {
        const { whoIsIt } = this.props;
        let url;
        if (whoIsIt === 'isClient') {
            url = 'https://bagiran.ru/spend-points/customer';
        }
        if (whoIsIt === 'isTrainer') {
            url = 'https://bagiran.ru/spend-points/trainer';
        }
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
                    pageData: data,
                    isLoaded: true
                });
            });
    }
    update = () => {
        const { whoIsIt } = this.props;
        let url;
        if (whoIsIt === 'isClient') {
            url = 'https://bagiran.ru/spend-points/customer';
        }
        if (whoIsIt === 'isTrainer') {
            url = 'https://bagiran.ru/spend-points/trainer';
        }
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
                    pageData: data,
                    isLoaded: true
                });
            });
    };
    render() {
        const { money } = this.state.pageData;
        const { isLoaded } = this.state;
        const { whoIsIt } = this.props;
        return (
            <>
                {!isLoaded && <Preloader></Preloader>}
                <main className="spend-points">
                    <Header
                        title="Потратить баллы"
                        subtitle={'На счету: ' + money + ' баллов'}
                        desc="Зарабатывай баллы в игре или записывай ежедневно питание. Баллы можно потратить на оплату услуг клуба Safari sport"
                    ></Header>
                    <SpendItems
                        update={this.update}
                        whoIsIt={whoIsIt}
                    ></SpendItems>
                </main>
            </>
        );
    }
}
