import React, { Component } from 'react';
import ModalBool from '../ModalBool';
import './style.css';

export default class Bonuses extends Component {
    state = {
        pageData: [],
        modul: false
    };
    componentDidUpdate() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });
        }
    }
    handleModal = (modal) => {
        this.setState({
            modal
        });
    };
    render() {
        const { buttonOff = false, lvl } = this.props;
        const { pageData, modal } = this.state;
        return (
            <section className="bonuses">
                {lvl > 1 && (
                    <>
                        <h2>Бонусы {lvl - 1} уровня</h2>
                        <p>
                            Бонусы действительны в течение 5 дней, затем сгорают
                            <br />
                            Получить бонусы или купоны можно на ресепшене
                        </p>
                        {pageData.length !== 0 ? (
                            <ul>
                                {pageData.map((bonus, index) => (
                                    <li
                                        key={index + '-bonuses'}
                                        className={
                                            bonus.status && 'bonuses_active'
                                        }
                                    >
                                        {bonus.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Бонусов нет</p>
                        )}
                    </>
                )}
                {!buttonOff && (
                    <button onClick={() => this.handleModal(true)}>
                        Мне помог дежурный тренер
                    </button>
                )}
                {modal && (
                    <ModalBool
                        url={'/main/customer-help'}
                        title={'Вам помог дежурный тренер?'}
                        handleModal={this.handleModal}
                        addData={''}
                    ></ModalBool>
                )}
            </section>
        );
    }
}
