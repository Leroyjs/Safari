import React, { Component } from 'react';
import Header from '../Header';
import SpendItems from '../SpendItems';

export default class SpendPoints extends Component {
    render() {
        return (
            <main className="spend-points">
                <Header
                    title="Потратить баллы"
                    subtitle="На счету: 500 баллов"
                    desc="Зарабатывай баллы в игре или записывай ежедневно питание. Баллы можно потратить на оплату услуг клуба Safari sport"
                ></Header>
                <SpendItems></SpendItems>
            </main>
        );
    }
}
