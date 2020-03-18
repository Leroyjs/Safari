import React, { Component } from 'react';
import ModalClientTrainerAnthropometry from '../ModalClientTrainerAnthropometry';
import './style.css';

export default class Volume extends Component {
    constructor(props) {
        super(props);
        this.tableMain = React.createRef();
        this.state = {
            pageData: [],
            modal: false,
            madalTitle: '',
            input: {
                title: 'val',
                postArg: ''
            },
            modalType: '',
            emptyBlocks: []
        };
    }
    componentDidUpdate() {
        const { modalData } = this.props;
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });

            let emptyBlocks = [];
            let emptyBlocksLength;

            emptyBlocksLength = 7 - this.props.pageData.length;

            for (let i = 0; i < emptyBlocksLength; i++) {
                emptyBlocks.push(1);
            }
            this.setState({
                pageData: this.props.pageData,
                emptyBlocks
            });
        }
    }
    handleModal = (modal, madalTitle, title, modalType) => {
        const { update } = this.props;
        this.setState({
            modal,
            madalTitle,
            input: {
                title,
                postArg: 'val'
            },
            modalType
        });
        if (update) {
            update();
        }
    };
    render() {
        const {
            anthropometry,
            activeId,
            modalData,
            isClientModal = false
        } = this.props;
        const {
            pageData,
            modal,
            madalTitle,
            input,
            modalType,
            emptyBlocks
        } = this.state;

        console.warn(pageData);

        return (
            <section
                className={
                    'volume' + ' ' + (anthropometry && 'table-anthropometry')
                }
            >
                <h2>Объемы (см)</h2>
                <div
                    className={
                        'volume__table' +
                        ' ' +
                        (anthropometry && 'table-anthropometry__table')
                    }
                >
                    <div className="volume__table-name ">
                        <div
                            style={{ minHeight: '18px' }}
                            className={
                                'volume__table-name-item volume__table-name-item_data ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Дата</h4>
                        </div>
                        <div
                            style={{ minHeight: '21px' }}
                            className={
                                'volume__table-name-item ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Талия</h4>
                        </div>
                        <div
                            style={{ minHeight: '21px' }}
                            className={
                                'volume__table-name-item ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Бедро</h4>
                        </div>
                        <div
                            style={{ minHeight: '21px' }}
                            className={
                                'volume__table-name-item ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Руки</h4>
                        </div>
                        <div
                            style={{ minHeight: '21px' }}
                            className={
                                'volume__table-name-item ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Грудь</h4>
                        </div>
                        <div
                            style={{ minHeight: '21px' }}
                            className={
                                'volume__table-name-item ' +
                                (anthropometry &&
                                    'table-anthropometry__table-name')
                            }
                        >
                            <h4>Ноги</h4>
                        </div>
                    </div>
                    <div className="volume__table-main">
                        {pageData.map(
                            (volum, index) =>
                                index !== pageData.length - 1 && (
                                    <div
                                        key={index + 'column'}
                                        className="volume__table-main-column"
                                    >
                                        <div
                                            key={index + 'data'}
                                            className="volume__table-main-item volume__table-main-item_data"
                                        >
                                            <span>{volum.data}</span>
                                        </div>

                                        <div
                                            key={index + 'waist'}
                                            className="volume__table-main-item"
                                        >
                                            {volum.waist && (
                                                <span>{volum.waist}</span>
                                            )}
                                        </div>

                                        <div
                                            key={index + 'hips'}
                                            className="volume__table-main-item"
                                        >
                                            {volum.hips && (
                                                <span>{volum.hips}</span>
                                            )}
                                        </div>

                                        <div
                                            key={index + 'arm'}
                                            className="volume__table-main-item"
                                        >
                                            {volum.arm && (
                                                <span>{volum.arm}</span>
                                            )}
                                        </div>

                                        <div
                                            key={index + 'chest'}
                                            className="volume__table-main-item"
                                        >
                                            {volum.chest && (
                                                <span>{volum.chest}</span>
                                            )}
                                        </div>

                                        <div
                                            key={index + 'legs'}
                                            className="volume__table-main-item"
                                        >
                                            {volum.legs && (
                                                <span>{volum.legs}</span>
                                            )}
                                        </div>
                                    </div>
                                )
                        )}

                        {pageData.length != 0 && (
                            <div
                                key={pageData.length + 'column'}
                                className="volume__table-main-column dopppppp"
                            >
                                <div
                                    key={pageData.length + 'data'}
                                    className="volume__table-main-item volume__table-main-item_data"
                                >
                                    {pageData[pageData.length - 1].data && (
                                        <span>
                                            {pageData[pageData.length - 1].data}
                                        </span>
                                    )}
                                </div>

                                {pageData[pageData.length - 1].waist !=
                                'plus' ? (
                                    <div
                                        key={pageData.length + 'waist'}
                                        className="volume__table-main-item"
                                    >
                                        <span>
                                            {
                                                pageData[pageData.length - 1]
                                                    .waist
                                            }
                                        </span>
                                    </div>
                                ) : (
                                    <div className="volume__table-main-item volume__table-main-item_plus">
                                        {modalData && (
                                            <span
                                                onClick={() =>
                                                    this.handleModal(
                                                        true,
                                                        'Добавить объем талии',
                                                        'Объем талии',
                                                        'waist'
                                                    )
                                                }
                                            >
                                                +
                                            </span>
                                        )}
                                    </div>
                                )}
                                {pageData[pageData.length - 1].hips !=
                                'plus' ? (
                                    <div
                                        key={pageData.length + 'hips'}
                                        className="volume__table-main-item"
                                    >
                                        <span>
                                            {pageData[pageData.length - 1].hips}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="volume__table-main-item volume__table-main-item_plus">
                                        {modalData && (
                                            <span
                                                onClick={() =>
                                                    this.handleModal(
                                                        true,
                                                        'Добавить объем бедра',
                                                        'Объем бедра',
                                                        'hips'
                                                    )
                                                }
                                            >
                                                +
                                            </span>
                                        )}
                                    </div>
                                )}
                                {pageData[pageData.length - 1].arm != 'plus' ? (
                                    <div
                                        key={pageData.length + 'arm'}
                                        className="volume__table-main-item"
                                    >
                                        <span>
                                            {pageData[pageData.length - 1].arm}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="volume__table-main-item volume__table-main-item_plus">
                                        {modalData && (
                                            <span
                                                onClick={() =>
                                                    this.handleModal(
                                                        true,
                                                        'Добавить объем руки',
                                                        'Объем руки',
                                                        'arm'
                                                    )
                                                }
                                            >
                                                +
                                            </span>
                                        )}
                                    </div>
                                )}

                                {pageData[pageData.length - 1].chest !=
                                'plus' ? (
                                    <div
                                        key={pageData.length + 'chest'}
                                        className="volume__table-main-item"
                                    >
                                        <span>
                                            {
                                                pageData[pageData.length - 1]
                                                    .chest
                                            }
                                        </span>
                                    </div>
                                ) : (
                                    <div className="volume__table-main-item volume__table-main-item_plus">
                                        {modalData && (
                                            <span
                                                onClick={() =>
                                                    this.handleModal(
                                                        true,
                                                        'Добавить объем груди',
                                                        'Объем груди',
                                                        'chest'
                                                    )
                                                }
                                            >
                                                +
                                            </span>
                                        )}
                                    </div>
                                )}
                                {pageData[pageData.length - 1].legs !=
                                'plus' ? (
                                    <div
                                        key={pageData.length + 'legs'}
                                        className="volume__table-main-item"
                                    >
                                        <span>
                                            {pageData[pageData.length - 1].legs}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="volume__table-main-item volume__table-main-item_plus">
                                        {modalData && (
                                            <span
                                                onClick={() =>
                                                    this.handleModal(
                                                        true,
                                                        'Добавить объем ноги',
                                                        'Объем ноги',
                                                        'legs'
                                                    )
                                                }
                                            >
                                                +
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {emptyBlocks.map((volum, index) => (
                            <div
                                key={index + 'column'}
                                className="volume__table-main-column"
                            >
                                <div
                                    key={index + 'data'}
                                    className="volume__table-main-item volume__table-main-item_data"
                                >
                                    <span>{volum.data}</span>
                                </div>
                                <div
                                    key={index + 'waist'}
                                    className="volume__table-main-item"
                                >
                                    <span>{volum.waist}</span>
                                </div>
                                <div
                                    key={index + 'hips'}
                                    className="volume__table-main-item"
                                >
                                    <span>{volum.hips}</span>
                                </div>
                                <div
                                    key={index + 'arm'}
                                    className="volume__table-main-item"
                                >
                                    <span>{volum.arm}</span>
                                </div>
                                <div
                                    key={index + 'chest'}
                                    className="volume__table-main-item"
                                >
                                    <span>{volum.chest}</span>
                                </div>
                                <div
                                    key={index + 'legs'}
                                    className="volume__table-main-item"
                                >
                                    <span>{volum.legs}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {modal && !isClientModal && (
                    <ModalClientTrainerAnthropometry
                        url={modalData.url + '/anthropometry/save-volume'}
                        title={madalTitle}
                        inputs={[
                            {
                                title: input.title,
                                postArg: input.postArg,
                                mandatory: true
                            }
                        ]}
                        handleModal={this.handleModal}
                        addData={'id=' + activeId + '&type=' + modalType}
                    ></ModalClientTrainerAnthropometry>
                )}
                {modal && isClientModal && (
                    <ModalClientTrainerAnthropometry
                        url={'/anthropometry/save-volume'}
                        title={madalTitle}
                        inputs={[
                            {
                                title: input.title,
                                postArg: input.postArg,
                                mandatory: true
                            }
                        ]}
                        handleModal={this.handleModal}
                        addData={'type=' + modalType}
                    ></ModalClientTrainerAnthropometry>
                )}
            </section>
        );
    }
}
