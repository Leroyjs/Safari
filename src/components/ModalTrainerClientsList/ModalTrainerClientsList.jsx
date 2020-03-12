import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '',
        addData: '',
        title: '',
        oneChargeList: [],
        time: {
            free: [],
            postArg: 'time'
        },
        values: {
            oneChargeList: '',
            time: ''
        },
        errors: {
            oneChargeList: false,
            time: false
        },
        errorBack: ''
    };
    componentDidMount() {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
        let data = this.props.addData;
        console.log(data);
        fetch(
            'https://bagiran.ru/client-trainer/training/get-time-for-record',
            {
                method: 'POST',
                body: data,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            }
        ) //dev
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                const time = {
                    free: data,
                    postArg: 'hour'
                };
                this.setState({
                    time
                });
            });
    }
    componentWillUnmount() {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
    }

    componentDidUpdate() {
        const { oneChargeList, title, addData, url } = this.props;
        if (
            (oneChargeList !== this.state.oneChargeList ||
                title !== this.state.title ||
                addData !== this.state.addData ||
                url !== this.state.url) &&
            oneChargeList !== undefined &&
            title !== undefined &&
            addData !== undefined &&
            url !== undefined
        ) {
            this.setState({
                oneChargeList,
                title,
                addData,
                url
            });
        }
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
            oneChargeList,
            values,
            errors,
            time,
            addData
        } = this.state;
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
        if (time.free.length !== 0) {
            if (values.time) {
                data += time.postArg + '=' + values.time + '&';
                newErrors.time = false;
            } else {
                newErrors.time = true;
            }
        }

        addData
            ? (data += addData)
            : (data = data.substring(0, data.length - 1));
        let countErrors = 0;
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
        const { title, errors, oneChargeList, time, errorBack } = this.state;
        console.log(errors);
        const freeTimeNone = time.free.some((item) => item);
        console.log(freeTimeNone);
        return ReactDOM.createPortal(
            <section className="modal-trainer-clients-list">
                <h3>{title}</h3>
                {freeTimeNone ? (
                    <div
                        className={
                            'modal-trainer-clients-list__List modal-trainer-clients-list_low ' +
                            (errors.time && 'modal-trainer-clients-list__error')
                        }
                    >
                        {time.free.map(
                            (input, index) =>
                                input && (
                                    <div
                                        key={
                                            index +
                                            '-modal-trainer-clients-list-list'
                                        }
                                        className={
                                            'modal-trainer-clients-list__List-item ' +
                                            (errors.time &&
                                                'modal-trainer-clients-list__error')
                                        }
                                    >
                                        <input
                                            id={
                                                index +
                                                '-modal-trainer-clients-list-list-time'
                                            }
                                            className={
                                                errors.time &&
                                                'modal-trainer-clients-list__error'
                                            }
                                            onChange={this.handleTimeChange}
                                            name={'time'}
                                            type="radio"
                                            value={index}
                                        />
                                        <label
                                            htmlFor={
                                                index +
                                                '-modal-trainer-clients-list-list-time'
                                            }
                                        >
                                            {index < 10
                                                ? '0' + index + ' : 00'
                                                : index + ' : 00'}
                                        </label>
                                    </div>
                                )
                        )}
                    </div>
                ) : (
                    'Нет доступного времени'
                )}
                {oneChargeList.length !== 0 && (
                    <div
                        className={
                            'modal-trainer-clients-list__List ' +
                            (errors.oneChargeList &&
                                'modal-trainer-clients-list__error')
                        }
                    >
                        {oneChargeList.map((input, index) => (
                            <div
                                key={index + '-modal-trainer-clients-list-list'}
                                className={
                                    'modal-trainer-clients-list__List-item ' +
                                    (errors.oneChargeList &&
                                        'modal-trainer-clients-list__error')
                                }
                            >
                                <input
                                    id={
                                        index +
                                        '-modal-trainer-clients-list-list'
                                    }
                                    className={
                                        errors.oneChargeList &&
                                        'modal-trainer-clients-list__error'
                                    }
                                    onChange={this.handleRadioChange}
                                    name={'radio'}
                                    type="radio"
                                    value={input.value}
                                />
                                <label
                                    htmlFor={
                                        index +
                                        '-modal-trainer-clients-list-list'
                                    }
                                >
                                    {input.title}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
                {errorBack}
                <div className="modal-trainer-clients-list__buttons">
                    <button onClick={this.handleSave}>Готово</button>
                    <button onClick={() => handleModal(false)}>Отмена</button>
                </div>
            </section>,
            document.getElementById('portal')
        );
    }
}
