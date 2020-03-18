import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '',
        addData: '',
        title: '',
        values: '',
        valuesCom: '',
        errors: false,
        errorBack: '',
        canUpate: true,
        list: []
    };
    componentDidMount() {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
        const data = this.props.addData;
        fetch('https://bagiran.ru/admin/custome-points/get-money-story', {
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
            .then((list) => {
                console.log(list);
                this.setState({
                    oneChargeList: this.props.oneChargeList,
                    list
                });
            });
    }
    componentWillUnmount() {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
    }
    render() {
        const { title, list } = this.state;
        const { handleModal } = this.props;
        return ReactDOM.createPortal(
            <section className="modal-trainer-duty">
                <h3>{title}</h3>
                <div
                    style={{
                        width: '90%',
                        maxHeight: '300px',
                        overflow: 'auto'
                    }}
                    className="modal-trainer-introductory-call__input"
                >
                    <div className="admin-custome-points__name-row">
                        <h3 className="admin-custome-points_long">Дата</h3>
                        <h3>Баллы</h3>
                        <h3>Комментарий</h3>
                    </div>
                    <div>
                        {list.map((item, index) => (
                            <div
                                key={index + '-admin-custome-points'}
                                className="admin-custome-points__main-row"
                            >
                                <span className="admin-custome-points_long">
                                    {item.date}
                                </span>
                                <span>{item.money}</span>
                                <span>{item.comment}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="modal-trainer-duty__buttons"
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <button onClick={() => handleModal(false)}>Закрыть</button>
                </div>
            </section>,
            document.getElementById('portal')
        );
    }
}
