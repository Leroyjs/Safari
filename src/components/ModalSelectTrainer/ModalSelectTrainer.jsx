import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '',
        title: '',
        errorBack: '',
        values: { trainers: '' },
        trainers: [],
        errors: [],
        canUpate: true
    };
    componentDidMount() {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
        fetch('https://bagiran.ru/main/customer-get-all-trainers', {
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
            .then((data) => {
                console.log(data);
                this.setState({
                    trainers: data
                });
            });
    }
    componentWillUnmount() {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
    }

    componentDidUpdate() {
        const { title, url } = this.props;
        if (
            (title !== this.state.title && title !== undefined) ||
            (url !== this.state.url && url !== undefined)
        ) {
            this.setState({
                title,
                url
            });
        }
    }
    handleRadioChange = (event) => {
        const radioValue = event.target.value;
        let values = JSON.parse(JSON.stringify(this.state.values));
        let errors = JSON.parse(JSON.stringify(this.state.errors));
        values.trainers = radioValue;
        errors.trainers = false;
        console.log(this.state);
        this.setState({ values, errors });
    };
    handleSave = () => {
        const { url, trainers, values, errors, addData } = this.state;
        let data = '';
        let newErrors = JSON.parse(JSON.stringify(errors));
        if (trainers.length !== 0) {
            if (values.trainers) {
                data += 'id=' + values.trainers + '&';
                newErrors.trainers = false;
            } else {
                newErrors.trainers = true;
            }
        }
        addData
            ? (data += addData)
            : (data = data.substring(0, data.length - 1));
        let countErrors = 0;
        if (newErrors.trainers === true) {
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
                console.log(data);
                if (data.error) {
                    this.setState({
                        errorBack: data.error
                    });
                    console.log(data);
                } else {
                    handleModal(false, true);
                }
            });
    }
    render() {
        const { handleModal } = this.props;
        const { title, errorBack, errors, trainers } = this.state;
        return ReactDOM.createPortal(
            <section className="modal-trainer-duty">
                <h3>{title}</h3>
                {trainers.length !== 0 && (
                    <div
                        style={{
                            maxHeight: '60%'
                        }}
                        className={
                            'modal-trainer-clients-list__List ' +
                            (errors.trainers &&
                                'modal-trainer-clients-list__error')
                        }
                    >
                        {trainers.map((input, index) => (
                            <div
                                key={index + '-modal-trainer-clients-list-list'}
                                className={
                                    'modal-trainer-clients-list__List-item ' +
                                    (errors.trainers &&
                                        'modal-trainer-clients-list__error')
                                }
                            >
                                <input
                                    id={
                                        index +
                                        '-modal-trainer-clients-list-list'
                                    }
                                    className={
                                        errors.trainers &&
                                        'modal-trainer-clients-list__error'
                                    }
                                    onChange={this.handleRadioChange}
                                    name={'radio'}
                                    type="radio"
                                    value={input.id}
                                />
                                <label
                                    htmlFor={
                                        index +
                                        '-modal-trainer-clients-list-list'
                                    }
                                    style={{ display: 'flex' }}
                                >
                                    <div
                                        alt=""
                                        style={{
                                            height: '70px',
                                            width: '70px',

                                            backgroundImage:
                                                "url('" + input.photo + "')",
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            borderRadius: '50%',
                                            marginRight: '20px'
                                        }}
                                    />{' '}
                                    <span>{input.name}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                )}
                {errorBack}
                <div className="modal-trainer-duty__buttons" style={{}}>
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
