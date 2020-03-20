import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '/main/trainer-set-status-record',
        addData: '',
        title: 'Выбрать статус',
        oneChargeList: [
            {
                title: 'Подтвердить',
                postArg: 'status',
                value: '1'
            },
            {
                title: 'Бронь',
                postArg: 'status',
                value: '0'
            },
            {
                title: 'Отменить',
                postArg: 'status',
                value: '2'
            },
            {
                title: 'Не пришел',
                postArg: 'status',
                value: '3'
            }
        ],
        values: {
            inputs: ['', ''],
            secondInput: [''],
            oneChargeList: ''
        },
        errors: {
            secondInput: false,
            inputs: [],
            oneChargeList: false
        },
        errorBack: ''
    };
    componentDidMount() {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
    }
    componentWillUnmount() {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
    }

    handleRadioChange = (event) => {
        const radioValue = event.target.value;
        let values = JSON.parse(JSON.stringify(this.state.values));
        let errors = JSON.parse(JSON.stringify(this.state.errors));
        values.oneChargeList = radioValue;
        errors.oneChargeList = false;
        console.log(this.state);
        this.setState({ values, errors });
    };

    handleSave = () => {
        const { url, oneChargeList, values, errors } = this.state;
        const { addData } = this.props;
        let data = '';
        let newErrors = JSON.parse(JSON.stringify(errors));

        if (oneChargeList.length !== 0) {
            if (values.oneChargeList) {
                data +=
                    oneChargeList[0].postArg + '=' + values.oneChargeList + '&';
                newErrors.oneChargeList = false;
            } else {
                newErrors.oneChargeList = true;
            }
        }

        addData
            ? (data += addData)
            : (data = data.substring(0, data.length - 1));
        let countErrors = newErrors.inputs.filter((error) => error === true)
            .length;
        if (newErrors.oneChargeList === true) {
            countErrors++;
        }
        if (newErrors.time === true) {
            countErrors++;
        }
        countErrors === 0
            ? this.send(url, data)
            : this.setState({ errors: newErrors });
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
        const {
            title,
            errors,

            oneChargeList,

            errorBack
        } = this.state;
        console.log(errors);
        const freeTimeNone = true;
        console.log(freeTimeNone);
        return ReactDOM.createPortal(
            <section className="modal-trainer-introductory-call">
                <h3>{title}</h3>

                {oneChargeList.length !== 0 && (
                    <div
                        className={
                            'modal-trainer-introductory-call__List ' +
                            (errors.oneChargeList &&
                                'modal-trainer-introductory-call__error')
                        }
                    >
                        {oneChargeList.map((input, index) => (
                            <div
                                key={index + '-modal-list'}
                                className={
                                    'modal-trainer-introductory-call__List-item ' +
                                    (errors.oneChargeList &&
                                        'modal-trainer-introductory-call__error')
                                }
                            >
                                <input
                                    id={
                                        index +
                                        '-modal-trainer-introductory-call-list'
                                    }
                                    className={
                                        errors.oneChargeList &&
                                        'modal-trainer-introductory-call__error'
                                    }
                                    onChange={this.handleRadioChange}
                                    name={'radio'}
                                    type="radio"
                                    value={input.value}
                                />
                                <label
                                    htmlFor={
                                        index +
                                        '-modal-trainer-introductory-call-list'
                                    }
                                >
                                    {input.title}
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                {errorBack}
                <div className="modal-trainer-introductory-call__buttons">
                    <button onClick={this.handleSave}>Готово</button>
                    <button onClick={() => handleModal(false)}>Отмена</button>
                </div>
            </section>,
            document.getElementById('portal')
        );
    }
}
