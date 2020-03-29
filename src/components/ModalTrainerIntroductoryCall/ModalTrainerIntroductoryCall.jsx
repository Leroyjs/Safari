import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '/introductory/add-call',
        addData: '',
        title: 'Звонки на запись',
        inputs: [
            {
                title: 'ФИО',
                postArg: 'name',
                mandatory: true
            },
            {
                title: 'Телефон',
                postArg: 'phone',
                mandatory: true
            }
        ],
        oneChargeList: [
            {
                title: 'Записался',
                postArg: 'status',
                value: '1'
            },
            {
                title: 'Отказался',
                postArg: 'status',
                value: '0'
            }
        ],
        secondInput: {
            title: 'Причина(кратко)',
            postArg: 'comment',
            mandatory: false
        },
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

    handleTextChange = (event) => {
        const [index, type] = event.target.name.split('_');
        let values = JSON.parse(JSON.stringify(this.state.values));
        let errors = JSON.parse(JSON.stringify(this.state.errors));
        console.log(index, type, values);
        values[type][index] = event.target.value;
        errors.inputs[index] = false;
        this.setState({ values, errors });
    };
    handleRadioChange = (event) => {
        const radioValue = event.target.value;
        let values = JSON.parse(JSON.stringify(this.state.values));
        let errors = JSON.parse(JSON.stringify(this.state.errors));
        values.oneChargeList = radioValue;
        errors.oneChargeList = false;
        console.log(this.state);
        if (radioValue === '0') {
            this.setState({
                values,
                secondInput: {
                    title: 'Причина(кратко)',
                    postArg: 'comment',
                    mandatory: true
                },
                errors
            });
        }
        if (radioValue === '1') {
            this.setState({
                values,
                secondInput: {
                    title: 'Причина(кратко)',
                    postArg: 'comment',
                    mandatory: false
                },
                errors
            });
        }
    };
    handleTimeChange = (event) => {
        const timeValue = event.target.value;
        let values = JSON.parse(JSON.stringify(this.state.values));
        let errors = JSON.parse(JSON.stringify(this.state.errors));
        values.time = timeValue;
        errors.time = false;
        console.log(this.state);
        this.setState({ values, errors });
    };
    handleSave = () => {
        const {
            url,
            inputs,
            oneChargeList,
            values,
            secondInput,
            errors,
            addData
        } = this.state;
        let data = '';
        let newErrors = JSON.parse(JSON.stringify(errors));
        inputs.forEach((item, i) => {
            if (values.inputs[i]) {
                data += item.postArg + '=' + values.inputs[i] + '&';
                newErrors.inputs[i] = false;
            } else {
                if (item.mandatory) {
                    newErrors.inputs[i] = true;
                }
            }
        });
        if (oneChargeList.length !== 0) {
            if (values.oneChargeList) {
                data +=
                    oneChargeList[0].postArg + '=' + values.oneChargeList + '&';
                newErrors.oneChargeList = false;
            } else {
                newErrors.oneChargeList = true;
            }
        }
        console.log(values.secondInput[0]);
        if (values.secondInput[0] && values.oneChargeList === '0') {
            data += secondInput.postArg + '=' + values.secondInput[0] + '&';
            newErrors.secondInput = false;
        } else {
            if (secondInput.mandatory) {
                newErrors.secondInput = true;
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
            values,
            oneChargeList,
            inputs,
            errorBack,
            secondInput
        } = this.state;
        console.log(errors);
        const freeTimeNone = true;
        console.log(freeTimeNone);
        return ReactDOM.createPortal(
            <section className="modal-trainer-introductory-call">
                <h3>{title}</h3>
                {inputs.length !== 0 && (
                    <div className="modal-trainer-introductory-call__input">
                        {inputs.map((input, index) => (
                            <input
                                className={
                                    errors.inputs[index] &&
                                    'modal-trainer-introductory-call__error'
                                }
                                onChange={this.handleTextChange}
                                key={
                                    index +
                                    '-modal-trainer-introductory-call-input'
                                }
                                name={index + '_inputs_' + index.postArg}
                                placeholder={input.title}
                                type="text"
                                value={values.inputs[index]}
                            />
                        ))}
                    </div>
                )}
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
                {values.oneChargeList === '0' && (
                    <div className="modal-trainer-introductory-call__input">
                        <input
                            className={
                                errors.secondInput &&
                                'modal-trainer-introductory-call__error'
                            }
                            onChange={this.handleTextChange}
                            key={'second-modal-trainer-introductory-call-input'}
                            name={'0_secondInput_'}
                            placeholder={secondInput.title}
                            type="text"
                            value={values.secondInput}
                        />
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
