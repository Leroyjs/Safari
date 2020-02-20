import React, { Component } from 'react';
import './style.css';

export default class Video extends Component {
    render() {
        return (
            <section className="video">
                <h2>3 уровень</h2>
                <iframe
                    src="https://www.youtube.com/embed/wGnDG_YOOf8"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen=""
                ></iframe>
            </section>
        );
    }
}
