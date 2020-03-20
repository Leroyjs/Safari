import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ModalTrainerSalePA from '../ModalTrainerSalePA';
import './style.css';

export default class ClientsList extends Component {
    state = {
        pageData: [],
        modal: false,
        vk: '',
        name: ''
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
    handleNew = (id) => {
        const url = 'https://bagiran.ru/main/trainer-level-notify';

        fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: 'id=' + id,
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
                this.props.update();
            });
    };
    handleModal = (modal, vk, name) => {
        this.setState({
            canUpate: true,
            modal,
            vk,
            name
        });
        this.props.update();
    };
    render() {
        const { pageData, modal, vk, name } = this.state;
        console.log(pageData);
        return (
            <section className="clients-list">
                <h2>Клиенты</h2>
                {pageData.map((client, index) => (
                    <div className="clients-list__item">
                        <Link
                            onClick={() => this.props.handleChangeId(client.id)}
                            key={'client' + index}
                            to="/Client-trainer"
                        >
                            <img src={client.foto} alt="client" />
                        </Link>
                        <div className="clients-list__text">
                            {' '}
                            <span>
                                {client.training ? (
                                    'Тренировки: ' + client.training
                                ) : (
                                    <button
                                        onClick={() =>
                                            this.handleModal(
                                                true,
                                                client.vk,
                                                client.name
                                            )
                                        }
                                        className={'button_standart'}
                                        style={{
                                            marginBottom: '1px',
                                            marginLeft: '-5px'
                                        }}
                                    >
                                        Продать блок тренировок
                                    </button>
                                )}
                            </span>{' '}
                            <span>
                                {' '}
                                Питание:{' '}
                                {client.nutrition ? (
                                    <span className="clients-list_green">
                                        {' '}
                                        заполнил{' '}
                                    </span>
                                ) : (
                                    <span className="clients-list_red">
                                        не заполнил
                                    </span>
                                )}
                            </span>{' '}
                            <span>
                                {' '}
                                Уровень: {client.lvl}{' '}
                                {client.play && (
                                    <span
                                        onClick={() =>
                                            this.handleNew(client.id)
                                        }
                                        className="clients-list_green"
                                    >
                                        {' '}
                                        new
                                    </span>
                                )}
                            </span>{' '}
                            <span>
                                Следующая тренировка: {client.nextTraining}
                            </span>{' '}
                            <span>Оценка от клиента: {client.rating}</span>{' '}
                        </div>{' '}
                        <div className="clients-list__name"> {client.name}</div>{' '}
                    </div>
                ))}
                {modal && (
                    <ModalTrainerSalePA
                        addData={
                            'vk=https://vk.com/id' +
                            vk +
                            '&source=app' +
                            '&name=' +
                            name
                        }
                        handleModal={this.handleModal}
                    ></ModalTrainerSalePA>
                )}
            </section>
        );
    }
}
