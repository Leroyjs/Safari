import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calendar from '../Calendar';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '/api/holiday',
        addData: '',
        title: '',

        time: {
            free: [
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ],
            postArg: 'hour_to'
        },
        values: {
            inputs: ['', ''],
            secondInput: [''],
            time: ''
        },
        errors: {
            secondInput: false,
            inputs: [],
            time: false
        },
        errorBack: '',
        activeDate: {
            day: 1,
            month: 1,
            year: 1
        },
        dataList: { green: [], blue: [], yellow: [] }
    };
    componentDidMount() {
        const now = new Date();
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';

        this.setState({
            activeDate: {
                year: now.getFullYear(),
                month: 1 + now.getMonth(),
                day: now.getDate()
            }
        });
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
        const { url, values, errors, activeDate, time } = this.state;
        const { addData } = this.props;
        let data = '';
        let newErrors = JSON.parse(JSON.stringify(errors));
        if (time.free.length !== 0) {
            if (values.time) {
                data += time.postArg + '=' + values.time + '&';
                newErrors.time = false;
            } else {
                newErrors.time = true;
            }
        }
        data +=
            'to=' +
            activeDate.year +
            '-' +
            activeDate.month +
            '-' +
            activeDate.day +
            '&';
        addData
            ? (data += addData)
            : (data = data.substring(0, data.length - 1));
        let countErrors = newErrors.inputs.filter((error) => error === true)
            .length;
        if (newErrors.time === true) {
            countErrors++;
        }
        countErrors === 0
            ? this.send(url, data)
            : this.setState({ errors: newErrors });
    };
    send(url, data) {
        const { handleModal, updata } = this.props;
        console.log('' + url);
        console.log(data);
        fetch('' + url, {
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
                    updata();
                    handleModal(false);
                }
            });
    }
    handleChange = (data) => {
        let date = 'date=' + data.year + '-' + data.month + '-' + data.day;
        console.log(data);

        this.setState({
            activeDate: data
        });
    };
    render() {
        const { handleModal } = this.props;
        const { errors, errorBack, activeDate, dataList, time } = this.state;
        const { title } = this.props;
        console.log(errors);
        const freeTimeNone = time.free.some((item) => item);
        console.log(freeTimeNone);
        return ReactDOM.createPortal(
            <section className="modal-trainer-introductory-call">
                <h3>{title}</h3>
                <Calendar
                    handleChange={this.handleChange}
                    activeDate={activeDate}
                    pageData={dataList}
                ></Calendar>
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
                                                '-modal-trainer-clients-list-list-time-2'
                                            }
                                            className={
                                                errors.time &&
                                                'modal-trainer-clients-list__error'
                                            }
                                            onChange={this.handleTimeChange}
                                            name={'time-2'}
                                            type="radio"
                                            value={index}
                                        />
                                        <label
                                            htmlFor={
                                                index +
                                                '-modal-trainer-clients-list-list-time-2'
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
