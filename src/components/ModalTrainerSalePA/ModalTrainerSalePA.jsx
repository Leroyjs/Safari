import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '/sales/add',
        addData: '',
        title: 'Провести продажу',
        inputs: [
            {
                title: 'Телефон',
                postArg: 'phone',
                mandatory: true
            },
            {
                title: 'Кол-во ПТ',
                postArg: 'count',
                mandatory: true
            },
            {
                title: 'Сумма',
                postArg: 'sum',
                mandatory: true
            }
        ],
        values: {
            inputs: ['', '', '']
        },
        errors: {
            inputs: []
        },
        errorBack: ''
    };
    componentDidMount() {
        const { addData } = this.props;
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
        this.setState({
            addData
        });
    }
    componentWillUnmount() {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
    }

    // componentDidUpdate() {
    //     const { oneChargeList, title, addData, url } = this.props;
    //     if (
    //         (oneChargeList !== this.state.oneChargeList ||
    //             title !== this.state.title ||
    //             addData !== this.state.addData ||
    //             url !== this.state.url) &&
    //         oneChargeList !== undefined &&
    //         title !== undefined &&
    //         addData !== undefined &&
    //         url !== undefined
    //     ) {
    //         this.setState({
    //             oneChargeList,
    //             title,
    //             addData,
    //             url
    //         });
    //     }
    // }
    handleTextChange = (event) => {
        const [index, type] = event.target.name.split('_');
        let values = JSON.parse(JSON.stringify(this.state.values));
        let errors = JSON.parse(JSON.stringify(this.state.errors));
        console.log(index, type, values);
        values[type][index] = event.target.value;
        errors.inputs[index] = false;
        this.setState({ values, errors });
    };

    handleSave = () => {
        const { url, inputs, values, errors, addData } = this.state;
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

        addData
            ? (data += addData)
            : (data = data.substring(0, data.length - 1));
        let countErrors = newErrors.inputs.filter((error) => error === true)
            .length;
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
        const { title, errors, values, inputs, errorBack } = this.state;
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
