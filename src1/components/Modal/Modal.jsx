import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import Calendar from '../Calendar';
import './style.css';

// handleModal = (modal) => {
//     this.setState({
//         modal
//     });
// };

export default class Modal extends Component {
    state = {
        url: '',
        addData: '',
        title: 'title',
        inputs: [
            {
                title: 'Lore',
                postArg: 'lvl',
                mandatory: true
            },
            {
                title: 'Lorem',
                postArg: 'id',
                mandatory: true
            }
        ],
        oneChargeList: [
            {
                title: 'Lorem',
                postArg: 'id',
                value: '123'
            },
            {
                title: 'Lorem',
                postArg: 'id',
                value: '122'
            },
            {
                title: 'Lorem',
                postArg: 'id',
                value: '121'
            },
            {
                title: 'Lorem',
                postArg: 'id',
                value: '123'
            },
            {
                title: 'Lorem',
                postArg: 'id',
                value: '123'
            },
            {
                title: 'Lorem',
                postArg: 'id',
                value: '123'
            }
        ],
        checkboxList: [],
        time: {
            free: [
                true,
                true,
                true,
                true,
                true,
                false,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                false,
                false,
                false,
                false
            ],
            postArg: 'time'
        },
        values: {
            inputs: [],
            oneChargeList: '',
            time: ''
        },
        errors: {
            inputs: [],
            oneChargeList: false,
            time: false
        }
    };
    componentDidMount() {
        let values = {};
        let errors = {};
        const { inputs = [], url, addData = '' } = this.props;
        const countInputs = this.state.inputs.length;
        if (countInputs) {
            values.inputs = [];
            errors.inputs = [];
            for (let i = 0; i < countInputs; i++) {
                values.inputs.push('');
                errors.inputs.push(false);
            }
        }
        function getState() {
            return {
                values,
                errors,
                inputs,
                url: '' + url,
                addData
            };
        }
        console.log(getState());
        this.setState({});
    }
    handleTextChange = (event) => {
        const [index, type] = event.target.name.split('_');
        let values = JSON.parse(JSON.stringify(this.state.values));
        values[type][index] = event.target.value;
        console.log(this.state);
        this.setState({ values });
    };
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
            inputs,
            oneChargeList,
            values,
            errors,
            time,
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
        console.log(data);
        handleModal(false);
        // fetch(url, {
        //     method: 'POST',
        //     body: data,
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Access-Control-Request-Headers': 'X-Requested-With, Origin',
        //         Origin: 'https://localhost:3000/'
        //     }
        // }) //dev
        //     .then((result) => {
        //         return result.json();
        //     })
        //     .then((data) => {
        //         console.log(data);
        //     });
    }
    render() {
        const { handleModal } = this.props;
        const {
            title,
            inputs,
            values,
            errors,
            oneChargeList,
            time
        } = this.state;
        console.log(errors);
        return ReactDOM.createPortal(
            <section className="modal">
                <h3>{title}</h3>
                {inputs.length !== 0 && (
                    <div className="modal__input">
                        {inputs.map((input, index) => (
                            <input
                                className={
                                    errors.inputs[index] && 'modal__error'
                                }
                                onChange={this.handleTextChange}
                                key={index + '-modal-input'}
                                name={index + '_inputs_' + index.postArg}
                                placeholder={input.title}
                                type="text"
                                value={values.inputs[index]}
                            />
                        ))}
                    </div>
                )}
                {time.free.length !== 0 && (
                    <div
                        className={
                            'modal__List modal_low ' +
                            (errors.time && 'modal__error')
                        }
                    >
                        {time.free.map(
                            (input, index) =>
                                input && (
                                    <div
                                        key={index + '-modal-list'}
                                        className={
                                            'modal__List-item ' +
                                            (errors.time && 'modal__error')
                                        }
                                    >
                                        <input
                                            id={index + '-modal-list-time'}
                                            className={
                                                errors.time && 'modal__error'
                                            }
                                            onChange={this.handleTimeChange}
                                            name={'time'}
                                            type="radio"
                                            value={index}
                                        />
                                        <label
                                            htmlFor={index + '-modal-list-time'}
                                        >
                                            {index < 10
                                                ? '0' + index + ' : 00'
                                                : index + ' : 00'}
                                        </label>
                                    </div>
                                )
                        )}
                    </div>
                )}
                {oneChargeList.length !== 0 && (
                    <div
                        className={
                            'modal__List ' +
                            (errors.oneChargeList && 'modal__error')
                        }
                    >
                        {oneChargeList.map((input, index) => (
                            <div
                                key={index + '-modal-list'}
                                className={
                                    'modal__List-item ' +
                                    (errors.oneChargeList && 'modal__error')
                                }
                            >
                                <input
                                    id={index + '-modal-list'}
                                    className={
                                        errors.oneChargeList && 'modal__error'
                                    }
                                    onChange={this.handleRadioChange}
                                    name={'radio'}
                                    type="radio"
                                    value={input.value}
                                />
                                <label htmlFor={index + '-modal-list'}>
                                    {input.title}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
                <div className="modal__buttons">
                    <button onClick={this.handleSave}>Готово</button>
                    <button onClick={() => handleModal(false)}>Отмена</button>
                </div>
            </section>,
            document.getElementById('portal')
        );
    }
}
