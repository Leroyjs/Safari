import React, { Component } from 'react';
import ModalSelectTrainer from '../ModalSelectTrainer';
import ModalOk from '../ModalOk';
import './style.css';

export default class HeaderPersonalArea extends Component {
    state = {
        pageData: {
            data: '',
            number: '',
            points: '500',
            lvl: '3',
            rating: '4.9',
            training: '654',
            customers: '34'
        },
        modal: false,
        modalOk: false
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
    handleModalOk = (modalOk) => {
        this.setState({
            canUpate: true,
            modalOk
        });
    };
    handleModal = (modal) => {
        this.props.updata();
        this.setState({
            canUpate: true,
            modal
        });
    };
    render() {
        const { data, whoIsIt, myCoach, children } = this.props;
        const { pageData, modal, modalOk } = this.state;
        console.warn(myCoach);
        console.log(pageData);
        return (
            <header className="header-personal-area">
                <h1>Личный кабинет</h1>
                <div className="header-personal-area__row">
                    <div className="header-personal-area__column">
                        <img src={data.photo_100} alt="" className="" />
                        <span>{data.first_name + ' ' + data.last_name}</span>
                    </div>
                    {whoIsIt === 'isClient' && (
                        <div className="header-personal-area__column-2">
                            <b>{pageData.lvl} уровень Safari из 10</b>
                            <br />
                            <span>Начал тренировки: {pageData.data}</span>
                            <br />
                            <span>Клубная карта: {pageData.number}</span>
                            <br />
                            <span>Заработано баллов: {pageData.points}</span>
                            <br />
                        </div>
                    )}
                    {whoIsIt === 'isTrainer' && (
                        <div className="header-personal-area__column-2">
                            <span>
                                Общее кол-во клиентов: {pageData.customers}
                            </span>
                            <br />
                            <span>Кол-во тренировок: {pageData.training}</span>
                            <br />
                            <span>Оценка от клиентов: {pageData.rating}</span>
                            <br />
                            <span>Кол-во баллов: {pageData.points}</span>
                            <br />
                            {children}
                        </div>
                    )}
                </div>

                {whoIsIt === 'isClient' && !myCoach ? (
                    <button onClick={() => this.handleModal(true)}>
                        Выбрать тренера
                    </button>
                ) : (
                    whoIsIt === 'isClient' && (
                        <span
                            style={{
                                fontSize: '11px',
                                marginTop: '5px'
                            }}
                        >
                            {'Ваш тренер: ' + myCoach.name}
                        </span>
                    )
                )}
                {modal && (
                    <ModalSelectTrainer
                        url={'/main/customer-select-trainer'}
                        handleModal={this.handleModal}
                        handleModalOk={this.handleModalOk}
                        title="Выбрать тренера"
                    ></ModalSelectTrainer>
                )}
                {modalOk && (
                    <ModalOk
                        text={'Тренер выбран'}
                        handleModal={this.handleModalOk}
                    ></ModalOk>
                )}
            </header>
        );
    }
}
