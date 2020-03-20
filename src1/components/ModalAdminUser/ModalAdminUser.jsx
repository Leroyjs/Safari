import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '',
        title: '',
        errorBack: '',
        values: { trainers: '' },
        roles: [
            {
                name: 'Клиент',
                id: '1'
            },
            {
                name: 'Тренер',
                id: '2'
            },
            {
                name: 'Администратор',
                id: '3'
            }
        ],
        role: '',
        errors: [],
        canUpate: true
    };
    componentDidMount() {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
        console.log(this.props.addData);
        fetch('/admin/custome-points/get-role', {
            method: 'POST',
            body: this.props.addData,
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
            .then((role) => {
                console.log(role);
                this.setState({
                    role
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
        const { url, values, errors } = this.state;
        const { addData } = this.props;
        let data = '';
        let newErrors = JSON.parse(JSON.stringify(errors));

        if (values.trainers) {
            data += 'role=' + values.trainers + '&';
            newErrors.trainers = false;
        } else {
            newErrors.trainers = true;
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
        const { title, errorBack, errors, roles, role } = this.state;
        let nameRole;

        switch (role) {
            case '1':
                nameRole = 'Клиент';
                break;

            case '2':
                nameRole = 'Тренер';
                break;
            case '3':
                nameRole = 'Администратор';
                break;

            default:
                nameRole = 'Роль не определена';
                break;
        }
        return ReactDOM.createPortal(
            <section className="modal-trainer-duty">
                <h3>{title}</h3>
                <h3>{nameRole}</h3>
                {roles.length !== 0 && (
                    <div
                        style={{
                            maxHeight: '60%'
                        }}
                        className={
                            'modal-trainer-clients-list__List ' +
                            (errors.roles &&
                                'modal-trainer-clients-list__error')
                        }
                    >
                        {roles.map((input, index) => (
                            <div
                                key={index + '-modal-trainer-clients-list-list'}
                                className={
                                    'modal-trainer-clients-list__List-item ' +
                                    (errors.roles &&
                                        'modal-trainer-clients-list__error')
                                }
                            >
                                <input
                                    id={
                                        index +
                                        '-modal-trainer-clients-list-list'
                                    }
                                    className={
                                        errors.roles &&
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
