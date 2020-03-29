import React, { Component } from 'react';
import './style.css';

export default class Video extends Component {
    state = {
        pageData: {
            name: '',
            url: ''
        }
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
    render() {
        const { name, url } = this.state.pageData;
        return (
            <section className="video">
                <h2>{name}</h2>
                <iframe
                    src={'https://www.youtube.com/embed/' + url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen=""
                ></iframe>
            </section>
        );
    }
}
