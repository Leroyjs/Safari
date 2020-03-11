import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '',
        addData: '',
        title: '',
        oneChargeList: [],
        oneChargeList_2: [],
        values: {
            oneChargeList: '',
            oneChargeList_2: ''
        },
        errors: {
            oneChargeList: false,
            oneChargeList_2: false
        },
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
        if (this.state.values.oneChargeList) {
            let oneChargeList_2 = [];
            for (let i = +this.state.values.oneChargeList + 1; i < 24; i++) {
                if (i < 10) {
                    oneChargeList_2.push({
                        title: '0' + i + ' : 00',
                        postArg: 'to',
                        value: i
                    });
                } else {
                    oneChargeList_2.push({
                        title: i + ' : 00',
                        postArg: 'to',
                        value: i
                    });
                }
            }
            console.log(oneChargeList_2);
            console.log(this.state.oneChargeList_2);
            if (
                JSON.stringify(oneChargeList_2) !==
                JSON.stringify(this.state.oneChargeList_2)
            ) {
                this.setState({
                    oneChargeList_2
                });
            }
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
    handleRadioChangeSecond = (event) => {
        const radioValue = event.target.value;
        let values = JSON.parse(JSON.stringify(this.state.values));
        let errors = JSON.parse(JSON.stringify(this.state.errors));
        values.oneChargeList_2 = radioValue;
        errors.oneChargeList_2 = false;
        console.log(this.state);
        this.setState({ values, errors });
    };
    handleSave = () => {
        const {
            url,
            oneChargeList,
            oneChargeList_2,
            values,
            errors,
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
        if (oneChargeList_2.length !== 0) {
            if (values.oneChargeList_2) {
                data +=
                    oneChargeList_2[0].postArg +
                    '=' +
                    values.oneChargeList_2 +
                    '&';
                newErrors.oneChargeList_2 = false;
            } else {
                newErrors.oneChargeList_2 = true;
            }
        }

        addData
            ? (data += addData)
            : (data = data.substring(0, data.length - 1));
        let countErrors = 0;
        if (newErrors.oneChargeList === true) {
            countErrors++;
        }
        if (newErrors.oneChargeList_2 === true) {
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
            oneChargeList_2,
            time,
            errorBack
        } = this.state;
        console.log(time);

        return ReactDOM.createPortal(
            <section className="modal-trainer-duty">
                <h3>{title}</h3>
                {oneChargeList.length !== 0 && (
                    <>
                        Начало дежурства
                        <div
                            className={
                                'modal-trainer-duty__List ' +
                                (errors.oneChargeList &&
                                    'modal-trainer-duty__error')
                            }
                        >
                            {oneChargeList.map((input, index) => (
                                <div
                                    key={index + '-modal-trainer-duty-list'}
                                    className={
                                        'modal-trainer-duty__List-item ' +
                                        (errors.oneChargeList &&
                                            'modal-trainer-duty__error')
                                    }
                                >
                                    <input
                                        id={index + '-modal-trainer-duty-list'}
                                        className={
                                            errors.oneChargeList &&
                                            'modal-trainer-duty__error'
                                        }
                                        onChange={this.handleRadioChange}
                                        name={'radio'}
                                        type="radio"
                                        value={input.value}
                                    />
                                    <label
                                        htmlFor={
                                            index + '-modal-trainer-duty-list'
                                        }
                                    >
                                        {input.title}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {oneChargeList_2.length !== 0 && (
                    <>
                        Конец дежурства
                        <div
                            className={
                                'modal-trainer-duty__List ' +
                                (errors.oneChargeList_2 &&
                                    'modal-trainer-duty__error')
                            }
                        >
                            {oneChargeList_2.map((input, index) => (
                                <div
                                    key={index + '-modal-trainer-duty-list'}
                                    className={
                                        'modal-trainer-duty__List-item ' +
                                        (errors.oneChargeList_2 &&
                                            'modal-trainer-duty__error')
                                    }
                                >
                                    <input
                                        id={
                                            index +
                                            '-modal-trainer-duty-list-second'
                                        }
                                        className={
                                            errors.oneChargeList_2 &&
                                            'modal-trainer-duty__error'
                                        }
                                        onChange={this.handleRadioChangeSecond}
                                        name={'radio_2'}
                                        type="radio"
                                        value={input.value}
                                    />
                                    <label
                                        htmlFor={
                                            index +
                                            '-modal-trainer-duty-list-second'
                                        }
                                    >
                                        {input.title}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {errorBack}
                <div className="modal-trainer-duty__buttons">
                    <button onClick={this.handleSave}>Готово</button>
                    <button onClick={() => handleModal(false)}>Отмена</button>
                </div>
            </section>,
            document.getElementById('portal')
        );
    }
}
