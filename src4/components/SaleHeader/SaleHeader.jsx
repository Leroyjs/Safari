import React, { Component } from 'react';
import ModalTrainerSaleStat from '../ModalTrainerSaleStat';
import './style.css';

export default class SaleHeader extends Component {
    state = {
        pageData: {
            points: {
                trainerSale: ''
            }
        },
        modal: false
    };
    componentDidUpdate() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });
        }
    }
    handleModal = (modal) => {
        this.setState({
            canUpate: true,
            modal
        });
    };
    render() {
        const { pageData, modal } = this.state;
        return (
            <header className="sale-header">
                <h1>Продажи</h1>
                <span
                    style={{
                        fontWeight: '300',
                        marginBottom: '10px'
                    }}
                >
                    Баллы за продажу {pageData.points.trainerSale}
                </span>
                <span>План</span>
                <span className="sale-header__plan-cost">
                    {pageData.now} / {pageData.plan}
                </span>
                <button onClick={() => this.handleModal(true)}>
                    Провести продажу
                </button>
                {modal && (
                    <ModalTrainerSaleStat
                        handleModal={this.handleModal}
                    ></ModalTrainerSaleStat>
                )}
            </header>
        );
    }
}
