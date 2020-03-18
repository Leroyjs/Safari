import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    componentDidMount() {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
    }
    componentWillUnmount() {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
    }

    render() {
        return ReactDOM.createPortal(
            <section className="modal-trainer-duty">
                <div className="modal__stub"></div>
            </section>,
            document.getElementById('portal')
        );
    }
}
