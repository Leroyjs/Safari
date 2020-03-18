import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModalSelectTrainer from '../ModalSelectTrainer';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '',
        addData: '',
        title: '',
        errorBack: '',
        canUpate: true,
        myTrainer: {},
        modal: false
    };
    componentDidMount() {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
        fetch('https://bagiran.ru/api/my-trainer', {
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
            .then((myTrainer) => {
                console.log(myTrainer);
                this.setState({
                    myTrainer
                });
            });
    }
    componentWillUnmount() {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
    }

    componentDidUpdate() {
        const { title, addData, url } = this.props;
        if (
            (title !== this.state.title ||
                addData !== this.state.addData ||
                url !== this.state.url) &&
            title !== undefined &&
            addData !== undefined &&
            url !== undefined
        ) {
            this.setState({
                title,
                addData,
                url
            });
        }
    }
    handleOne = () => {
        const { url } = this.state;
        let data = 'id=';

        this.send(url, data);
    };

    handleSave = () => {
        const { url, addData, myTrainer } = this.state;
        let data = 'id=' + myTrainer.id + addData;

        this.send(url, data);
    };
    handleModal = (modal, close) => {
        const { handleModal } = this.props;
        if (close) {
            handleModal(false);
        }
        this.setState({
            canUpate: true,
            modal
        });
    };
    send(url, data) {
        const { handleModal } = this.props;
        console.log('https://bagiran.ru' + url);
        console.log(data);
        fetch('https://bagiran.ru' + url, {
            method: 'POST',
            body: data,
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
                if (data.error) {
                    this.setState({
                        errorBack: data.error
                    });
                    console.log(data);
                } else {
                    handleModal(false);
                }
            });
    }
    render() {
        const { handleModal } = this.props;
        const { title, errorBack, myTrainer, modal } = this.state;

        return ReactDOM.createPortal(
            <section className="modal-trainer-duty">
                <>
                    <h3>{title}</h3>
                    {myTrainer && (
                        <div
                            className="modal__my-trainer"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            <img
                                src={myTrainer.img}
                                alt=""
                                style={{
                                    borderRadius: '50%',
                                    height: '150px',
                                    width: '150px'
                                }}
                            />

                            <span
                                style={{
                                    display: 'block',
                                    width: '150px',
                                    textAlign: 'center',
                                    marginTop: '15px'
                                }}
                            >
                                {myTrainer.name}
                            </span>
                            <div
                                className="modal-trainer-duty__buttons"
                                style={{ width: '240px' }}
                            >
                                <button
                                    style={{ width: '100%' }}
                                    onClick={() => this.handleModal(true)}
                                >
                                    Сменить тренера
                                </button>
                            </div>
                            <div
                                className="modal-trainer-duty__buttons"
                                style={{ width: '240px' }}
                            >
                                <button
                                    style={{ width: '100%' }}
                                    onClick={this.handleOne}
                                >
                                    Заниматься одному
                                </button>
                            </div>
                        </div>
                    )}
                    {errorBack}
                    <div className="modal-trainer-duty__buttons" style={{}}>
                        {myTrainer ? (
                            <button
                                style={{
                                    marginRight: '20px',
                                    marginLeft: '-20px'
                                }}
                                onClick={this.handleSave}
                            >
                                Приобрести
                            </button>
                        ) : (
                            <button
                                style={{
                                    marginLeft: '-20px',
                                    marginRight: '20px'
                                }}
                                onClick={() => this.handleModal(true)}
                            >
                                Выбрать тренера
                            </button>
                        )}
                        <button onClick={() => handleModal(false)}>
                            Отмена
                        </button>
                    </div>
                </>
                {modal && (
                    <ModalSelectTrainer
                        url={'/training/buy'}
                        handleModal={this.handleModal}
                        title="Выбрать тренера"
                    ></ModalSelectTrainer>
                )}
            </section>,
            document.getElementById('portalSemi')
        );
    }
}
