import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '',
        addData: '',
        title: '',
        errorBack: '',
        canUpate: true,
        ratingTrainer: 0,
        ratingTraining: 0
    };
    componentDidMount() {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
        this.setState({
            oneChargeList: this.props.oneChargeList
        });
    }
    componentWillUnmount() {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
    }

    componentDidUpdate() {
        const { title, addData, url } = this.props;
        if (
            (title !== this.state.title ||
                addData !== this.state.addData ||
                url !== this.state.url) &&
            title !== undefined &&
            addData !== undefined &&
            url !== undefined
        ) {
            this.setState({
                title,
                addData,
                url
            });
        }
    }
    handleMarkTrainer = (ratingTrainer) => {
        this.setState({
            ratingTrainer
        });
    };
    handleMarkTraining = (ratingTraining) => {
        this.setState({
            ratingTraining
        });
    };
    handleSave = () => {
        const { ratingTraining } = this.state;
        const { id } = this.props;
        if (ratingTraining) {
            const dataTraining = 'score=' + ratingTraining + '&id=' + id;

            this.send(dataTraining);
        } else {
            this.setState({ errorBack: 'Нужно выставить оценки' });
        }
    };
    send(dataTraining) {
        console.log('/training/score-training', dataTraining);
        const { update } = this.props;
        fetch('/training/score-training', {
            method: 'POST',
            body: dataTraining,
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
            .then((data) => {
                console.log(data);
                update();
            });
    }
    render() {
        const { handleModal } = this.props;
        const { title, errorBack } = this.state;

        return ReactDOM.createPortal(
            <section className="modal-trainer-duty">
                <h3>{title}</h3>
                <span>Оцените тренировку</span>
                <span
                    className="day-nutrition__rating-area"
                    style={{
                        width: 'auto',
                        marginTop: '2px',
                        marginBottom: '50px'
                    }}
                >
                    <input type="radio" id="star-5" name="rating" value="5" />
                    <label
                        style={{
                            fontSize: '37px',
                            width: '36px'
                        }}
                        onClick={() => this.handleMarkTraining(5)}
                        htmlFor="star-5"
                        title="Оценка «5»"
                    ></label>
                    <input type="radio" id="star-4" name="rating" value="4" />
                    <label
                        style={{
                            fontSize: '37px',
                            width: '36px'
                        }}
                        onClick={() => this.handleMarkTraining(4)}
                        htmlFor="star-4"
                        title="Оценка «4»"
                    ></label>
                    <input type="radio" id="star-3" name="rating" value="3" />
                    <label
                        style={{
                            fontSize: '37px',
                            width: '36px'
                        }}
                        onClick={() => this.handleMarkTraining(3)}
                        htmlFor="star-3"
                        title="Оценка «3»"
                    ></label>
                    <input type="radio" id="star-2" name="rating" value="2" />
                    <label
                        style={{
                            fontSize: '37px',
                            width: '36px'
                        }}
                        onClick={() => this.handleMarkTraining(2)}
                        htmlFor="star-2"
                        title="Оценка «2»"
                    ></label>
                    <input type="radio" id="star-1" name="rating" value="1" />
                    <label
                        style={{
                            fontSize: '37px',
                            width: '36px'
                        }}
                        onClick={() => this.handleMarkTraining(1)}
                        htmlFor="star-1"
                        title="Оценка «1»"
                    ></label>
                </span>

                {errorBack}
                <div className="modal-trainer-duty__buttons" style={{}}>
                    <button onClick={this.handleSave}>Оценить</button>
                    <button onClick={() => handleModal(false)}>Позже</button>
                </div>
            </section>,
            document.getElementById('portal')
        );
    }
}
