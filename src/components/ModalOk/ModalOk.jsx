import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Statistics extends Component {
    state = {
        hidden: false
    };
    componentDidMount() {
        const { handleModal } = this.props;
        setTimeout(() => {
            handleModal(false);
        }, 2000);
        setTimeout(() => {
            this.setState({
                hidden: true
            });
        }, 1000);
    }
    render() {
        const { text } = this.props;
        const { hidden } = this.state;
        return ReactDOM.createPortal(
            <div className={'modal-ok ' + (hidden && 'modal-ok_hidden')}>
                <span>{text}</span>
            </div>,
            document.getElementById('portal')
        );
    }
}
