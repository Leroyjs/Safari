import React, { Component } from 'react';
import ModalBool from '../ModalBool';
import './style.css';

export default class SpendItem extends Component {
    state = {
        modal: false
    };
    handleModal = (modal) => {
        const { update } = this.props;
        console.warn('dfdgfg', modal);
        this.setState({
            modal
        });
        update();
    };
    render() {
        const { img, title, price, id, whoIsIt } = this.props;
        const { modal } = this.state;
        let url = '';
        if (whoIsIt === 'isTrainer') {
            url = '/spend-points/trainer-order';
        }
        if (whoIsIt === 'isClient') {
            url = '/spend-points/customer-order';
        }
        return (
            <>
                <div
                    className="spend-item"
                    onClick={() => this.handleModal(true)}
                >
                    {img}
                    <h3>{title}</h3>
                    <span>{price} баллов</span>
                </div>
                {modal && (
                    <ModalBool
                        url={url}
                        title={'Купить "' + title + '"'}
                        handleModal={this.handleModal}
                        addData={'id=' + id}
                    ></ModalBool>
                )}
            </>
        );
    }
}
