import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '',
        addData: '',
        title: '',
        values: '',
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

    handleSave = () => {
        const { url, values } = this.state;
        if (values) {
            const data = 'club_card=' + values;
            this.send(url, data);
        } else {
            this.setState({
                errors: true
            });
        }
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
                    handleModal(false);
                }
            });
    }
    render() {
        const { title, errorBack, values, errors } = this.state;

        return ReactDOM.createPortal(
            <section className="modal-trainer-duty">
                <h3>{title}</h3>
                <div className="modal-trainer-introductory-call__input">
                    <input
                        className={
                            errors && 'modal-trainer-introductory-call__error'
                        }
                        onChange={this.handleTextChange}
                        key={'1-modal-trainer-introductory-call-input'}
                        name={'1_inputs'}
                        placeholder={'Номер карты'}
                        type="text"
                        value={values}
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
                    <button onClick={this.handleSave}>Подтвердить</button>
                </div>
            </section>,
            document.getElementById('portal')
        );
    }
}
