import React, { Component } from 'react';
import plus from './+.png';
import star from './rate-star.png';
import ModalClientTrainerAnthropometry from '../ModalClientTrainerAnthropometry';
import './style.css';

export default class TerenovkaStatistics extends Component {
    state = {
        pageData: {},
        canUpate: true,
        modal: false,
        madalTitle: '',
        input: [
            {
                title: '',
                postArg: '',
                mandatory: true
            }
        ],
        addData: '',
        modalUrl: ''
    };
    componentDidMount() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData,
                canUpate: false
            });
        }
    }
    componentDidUpdate() {
        if (
            (this.props.pageData !== undefined &&
                this.props.pageData !== this.state.pageData) ||
            this.state.canUpate
        ) {
            this.setState({
                pageData: this.props.pageData,
                canUpate: false
            });
        }
    }

    handleModal = (modal, madalTitle, input, addData, modalUrl) => {
        this.setState({
            canUpate: true,
            modal,
            madalTitle,
            input,
            addData,
            modalUrl
        });
        this.props.handleLoad(this.state.pageData.date, 0);
    };
    render() {
        const oneInput = [
            {
                title: 'Название упражнения',
                postArg: 'ex_title',
                mandatory: true
            }
        ];
        const twoInput = [
            {
                title: 'Кол-во повторений',
                postArg: 'app_val1',
                mandatory: true
            },
            {
                title: 'Вес',
                postArg: 'app_val2',
                mandatory: true
            }
        ];
        const {
            pageData,
            modal,
            madalTitle,
            input,
            addData,
            modalUrl
        } = this.state;
        const { activeId } = this.props;
        let canAdd = false;
        if (this.state.pageData.date) {
            let date = this.state.pageData.date.split('-');
            date = date.map((item) => +item);
            console.warn(pageData);
            const now = new Date();
            if (
                now.getFullYear() === date[0] &&
                now.getMonth() + 1 === date[1] &&
                now.getDate() === date[2]
            ) {
                canAdd = true;
            }
        }
        return (
            <section className="ct-terenovka-statistics">
                <div className="ct-terenovka-statistics__title">
                    <h2>{pageData.title}</h2>
                    <div className="ct-terenovka-statistics__rating-area">
                        <span>Оценка:</span>
                        <br />
                        {pageData.score !== undefined && pageData.score.length
                            ? pageData.score.map(() => (
                                  <img src={star} alt="star" />
                              ))
                            : 'Нет оценки'}
                    </div>
                </div>
                <div className="ct-terenovka-statistics__list">
                    {Object.keys(pageData).map((type) => {
                        // eslint-disable-next-line default-case
                        switch (type) {
                            case 'warmUp':
                                return (
                                    <div
                                        key={'warmUp'}
                                        className="ct-terenovka-statistics__item"
                                    >
                                        <div className="ct-terenovka-statistics__item-title">
                                            <h4>Разминка</h4>
                                            {pageData.warmUp.name ? (
                                                <span>
                                                    {pageData.warmUp.name}
                                                </span>
                                            ) : (
                                                canAdd && (
                                                    <button
                                                        onClick={() =>
                                                            this.handleModal(
                                                                true,
                                                                'Добавить название упражнения',
                                                                oneInput,
                                                                'ex_number=-1',
                                                                '/client-trainer/training/save-ex-title'
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                )
                                            )}
                                        </div>
                                        <div className="ct-terenovka-statistics__item-load_warm-up">
                                            {pageData.warmUp.quantity ? (
                                                <b>
                                                    {pageData.warmUp.quantity +
                                                        (pageData.warmUp.load &&
                                                            '/') +
                                                        ' ' +
                                                        pageData.warmUp.load}
                                                </b>
                                            ) : (
                                                canAdd && (
                                                    <img
                                                        onClick={() =>
                                                            this.handleModal(
                                                                true,
                                                                'Добавить подход',
                                                                twoInput,
                                                                'ex_number=-1' +
                                                                    '&app_number=1',
                                                                '/client-trainer/training/save'
                                                            )
                                                        }
                                                        src={plus}
                                                        alt=""
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                );
                            case 'exercises':
                                return (
                                    <>
                                        {pageData.exercises.map(
                                            (exercise, index) => (
                                                <div
                                                    key={index + 'exercise'}
                                                    className="ct-terenovka-statistics__item"
                                                >
                                                    <div className="ct-terenovka-statistics__item-title">
                                                        <h4>
                                                            {index +
                                                                1 +
                                                                ' упражнение'}
                                                        </h4>
                                                        {console.log(
                                                            exercise.name !==
                                                                false
                                                        )}
                                                        {exercise.name ? (
                                                            <span>
                                                                {exercise.name}
                                                            </span>
                                                        ) : (
                                                            canAdd &&
                                                            (index === 0 ||
                                                                pageData
                                                                    .exercises[
                                                                    index - 1
                                                                ].name) && (
                                                                <button
                                                                    onClick={() =>
                                                                        this.handleModal(
                                                                            true,
                                                                            'Добавить название упражнения',
                                                                            oneInput,
                                                                            'ex_number=' +
                                                                                (index +
                                                                                    1),
                                                                            '/client-trainer/training/save-ex-title'
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="ct-terenovka-statistics__item-load">
                                                        <div className="ct-terenovka-statistics__item-load-top">
                                                            {exercise.quantity.map(
                                                                (
                                                                    quantity,
                                                                    index
                                                                ) => (
                                                                    <b
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            quantity
                                                                        }
                                                                    </b>
                                                                )
                                                            )}
                                                            {exercise.load
                                                                .length !== 5 &&
                                                                canAdd && (
                                                                    <b
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <img
                                                                            onClick={() =>
                                                                                this.handleModal(
                                                                                    true,
                                                                                    'Добавить подход',
                                                                                    twoInput,
                                                                                    'ex_number=' +
                                                                                        (index +
                                                                                            1) +
                                                                                        '&app_number=' +
                                                                                        (exercise
                                                                                            .quantity
                                                                                            .length +
                                                                                            1),
                                                                                    '/client-trainer/training/save'
                                                                                )
                                                                            }
                                                                            src={
                                                                                plus
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </b>
                                                                )}
                                                        </div>
                                                        <div className="ct-terenovka-statistics__item-load-bottom">
                                                            {exercise.load &&
                                                                exercise.load.map(
                                                                    (
                                                                        load,
                                                                        index
                                                                    ) => (
                                                                        <b
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            {
                                                                                load
                                                                            }
                                                                        </b>
                                                                    )
                                                                )}
                                                            {exercise.load
                                                                .length !==
                                                                5 && (
                                                                <b
                                                                    key={index}
                                                                ></b>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                        {canAdd && (
                                            <button
                                                onClick={() =>
                                                    this.handleModal(
                                                        true,
                                                        'Добавить название упражнения',
                                                        oneInput,
                                                        'ex_number=' +
                                                            (pageData.exercises
                                                                .length +
                                                                1),
                                                        '/client-trainer/training/save-ex-title'
                                                    )
                                                }
                                                className="ct-terenovka-statistics__dop-item"
                                            >
                                                Добавить упражнение
                                            </button>
                                        )}
                                    </>
                                );
                            case 'hitch':
                                return (
                                    <div
                                        key={'hitch'}
                                        className="ct-terenovka-statistics__item"
                                    >
                                        <div className="ct-terenovka-statistics__item-title">
                                            <h4>Заминка</h4>
                                            {pageData.hitch.name ? (
                                                <span>
                                                    {pageData.hitch.name}
                                                </span>
                                            ) : (
                                                canAdd && (
                                                    <button
                                                        onClick={() =>
                                                            this.handleModal(
                                                                true,
                                                                'Добавить название упражнения',
                                                                oneInput,
                                                                'ex_number=-2',
                                                                '/client-trainer/training/save-ex-title'
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                )
                                            )}
                                        </div>
                                        <div className="ct-terenovka-statistics__item-load_warm-up">
                                            {pageData.hitch.quantity ? (
                                                <b>
                                                    {pageData.hitch.quantity +
                                                        (pageData.hitch.load &&
                                                            '/') +
                                                        ' ' +
                                                        pageData.hitch.load}
                                                </b>
                                            ) : (
                                                canAdd && (
                                                    <img
                                                        onClick={() =>
                                                            this.handleModal(
                                                                true,
                                                                'Добавить подход',
                                                                twoInput,
                                                                'ex_number=-2' +
                                                                    '&app_number=1',
                                                                '/client-trainer/training/save'
                                                            )
                                                        }
                                                        src={plus}
                                                        alt=""
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                );
                        }
                    })}
                </div>
                {modal && (
                    <ModalClientTrainerAnthropometry
                        url={modalUrl}
                        title={madalTitle}
                        inputs={input}
                        handleModal={this.handleModal}
                        addData={'id=' + activeId + '&' + addData}
                    ></ModalClientTrainerAnthropometry>
                )}
            </section>
        );
    }
}
