import React, { Component } from 'react';
import AdminNav from '../AdminNav';
import AdminMain from '../AdminMain';
import './style.css';

export default class Admin extends Component {
    render() {
        return (
            <section className="admin">
                <AdminNav></AdminNav>
                <AdminMain></AdminMain>
            </section>
        );
    }
}
