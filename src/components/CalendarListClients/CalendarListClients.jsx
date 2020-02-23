import React, { Component } from 'react';
import ok from './checked.png';
import no from './not-checked.png';
import './style.css';

let array = [
    {
        time: '12:00',
        name: 'Ivan I.I.',
        confirmed: true
    },
    {
        time: '12:00',
        name: 'Ivan I.I.',
        confirmed: true
    },
    {
        time: '12:00',
        name: 'Ivan I.I.',
        confirmed: false
    },
    {
        time: '12:00',
        name: 'Ivan I.I.',
        confirmed: true
    },
    {
        time: '12:00',
        name: 'Ivan I.I.',
        confirmed: true
    }
];

export default class CalendarListClients extends Component {
    render() {
        return (
            <section className="calendar-list-clients">
                <div className="calendar-list-clients-inner">
                    {array.map((user, index) => (
                        <div key={index}>
                            <b>{user.time}</b>
                            <span>{user.name}</span>
                            {user.confirmed ? (
                                <img src={ok} alt="" />
                            ) : (
                                <img src={no} alt="" />
                            )}
                        </div>
                    ))}
                    <button>Добавить</button>
                </div>
            </section>
        );
    }
}
