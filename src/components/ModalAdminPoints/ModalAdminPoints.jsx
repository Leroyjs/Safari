import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '',
        addData: '',
        title: '',
        values: '',
        valuesCom: '',
        errors: false,
        errorBack: '',
        canUpate: true
    };
    componentDidMount() {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
        this.setState({
            oneChargeList: this.props.oneChargeList
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
    handleTextChange = (event) => {
        const values = event.target.value;
        const errors = false;
        this.setState({ values, errors });
    };
    handleCommentChange = (event) => {
        const valuesCom = event.target.value;
        this.setState({ valuesCom });
    };

    handleSave = () => {
        const { url, values, valuesCom } = this.state;
        const { plus = true, addData } = this.props;
        if (values) {
            let data = '';
            if (plus) {
                data += '&money=' + values;
            } else {
                data += '&money=-' + values;
            }
            data += addData;
            data += '&comment=' + valuesCom;
            this.send(url, data);
        } else {
            this.setState({
                errors: true
            });
        }
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
                console.warn(data);
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
        const { title, errorBack, values, errors, valuesCom } = this.state;
        const { handleModal } = this.props;
        return ReactDOM.createPortal(
            <section className="modal-trainer-duty">
                <h3>{title}</h3>
                <div
                    style={{ width: '50%' }}
                    className="modal-trainer-introductory-call__input"
                >
                    <input
                        className={
                            errors && 'modal-trainer-introductory-call__error'
                        }
                        onChange={this.handleTextChange}
                        key={'1-modal-trainer-introductory-call-input'}
                        name={'1_inputs'}
                        placeholder={'Кол-во баллов'}
                        type="text"
                        value={values}
                    />
                    <input
                        onChange={this.handleCommentChange}
                        key={'1-modal-trainer-introductory-call-input'}
                        name={'1_inputs'}
                        placeholder={'Комментарий'}
                        type="text"
                        value={valuesCom}
                    />
                </div>
                {errorBack}
                <div
                    className="modal-trainer-duty__buttons"
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <button
                        style={{
                            marginRight: '20px',
                            marginLeft: '-20px'
                        }}
                        onClick={this.handleSave}
                    >
                        Подтвердить
                    </button>
                    <button onClick={() => handleModal(false)}>Отмена</button>
                </div>
            </section>,
            document.getElementById('portal')
        );
    }
}
