import React, { Component } from 'react';
import ok from './checked.png';
import x from './x.png';
import no from './not-checked.png';
import ModalTrainerClientsList from '../ModalTrainerClientsList';
import ModalTrainerStatus from '../ModalTrainerStatus';
import './style.css';

export default class CalendarListClients extends Component {
    state = {
        pageData: [],
        date: '',
        modal: false,
        canUpate: true
    };

    componentDidUpdate() {
        let date = this.props.activeDate;

        if (
            (date !== undefined && date !== this.state.date) ||
            this.state.canUpate
        ) {
            date = 'date=' + date.year + '-' + date.month + '-' + date.day;

            const url = 'https://bagiran.ru/main/trainer-get-record';

            fetch(url, {
                method: 'POST',
                credentials: 'include',
                body: date,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            })
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    console.log(data);

                    this.setState({
                        canUpate: false,
                        pageData: data,
                        date: this.props.activeDate
                    });
                });
        }
    }

    handleModal = (modal) => {
        this.setState({
            canUpate: true,
            modal
        });
    };
    handleSelectModal = (selectModal, activeId) => {
        this.setState({
            canUpate: true,
            selectModal,
            activeId
        });
    };
    render() {
        const { pageData, date, modal, selectModal, activeId } = this.state;
        const { clientsList = [] } = this.props;
        let oneChargeList = [];
        clientsList.forEach((item, i) => {
            oneChargeList.push({
                title: item.name,
                postArg: 'id',
                value: item.id
            });
        });
        console.log(pageData);
        const addData = 'date=' + date.year + '-' + date.month + '-' + date.day;
        let newDate;

        // eslint-disable-next-line default-case
        switch (date.month - 1) {
            case 0:
                newDate = date.day + ' Января';
                break;
            case 1:
                newDate = date.day + ' Февраля';
                break;
            case 2:
                newDate = date.day + ' Марта';
                break;
            case 3:
                newDate = date.day + ' Апреля';
                break;
            case 4:
                newDate = date.day + ' Мая';
                break;
            case 5:
                newDate = date.day + ' Июня';
                break;
            case 6:
                newDate = date.day + ' Июля';
                break;
            case 7:
                newDate = date.day + ' Августа';
                break;
            case 8:
                newDate = date.day + ' Сентября';
                break;
            case 9:
                newDate = date.day + ' Октября';
                break;
            case 10:
                newDate = date.day + ' Ноября';
                break;
            case 11:
                newDate = date.day + ' Декабря';
                break;
        }
        return (
            <section className="calendar-list-clients">
                {' '}
                <div className="calendar-list-clients-inner">
                    {' '}
                    <div className="calendar-list-clients__title">
                        {' '}
                        <h2>Запись на тренировки</h2> <h3> {newDate}</h3>{' '}
                    </div>{' '}
                    {pageData.map((user, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                this.handleSelectModal(true, user.id)
                            }
                        >
                            <b> {user.time}</b> <span> {user.name}</span>{' '}
                            {user.confirmed === 3 && <img src={x} alt="" />}
                            {user.confirmed === 2 && <img src={x} alt="" />}
                            {user.confirmed === 1 && <img src={ok} alt="" />}
                            {user.confirmed === 0 && <img src={no} alt="" />}
                            <span> {user.mark}</span>
                        </div>
                    ))}
                    <button onClick={() => this.handleModal(true)}>
                        {' '}
                        Добавить{' '}
                    </button>{' '}
                </div>{' '}
                {selectModal && (
                    <ModalTrainerStatus
                        addData={'id=' + activeId}
                        handleModal={this.handleSelectModal}
                    ></ModalTrainerStatus>
                )}
                {modal && (
                    <ModalTrainerClientsList
                        title={'Добавить запись на тренеровку'}
                        addData={addData}
                        url={'/client-trainer/training/record'}
                        handleModal={this.handleModal}
                        oneChargeList={oneChargeList}
                    ></ModalTrainerClientsList>
                )}
            </section>
        );
    }
}
