import React, { Component } from 'react';
import ProgressDop from '../ProgressDop';
import ModalClientTrainerAnthropometry from '../ModalClientTrainerAnthropometry';
import './style.css';
export default class Weight extends Component {
    constructor(props) {
        super(props);
        this.tableMain = React.createRef();
    }
    state = {
        pageData: [['data', 'Вес']],
        modal: false,
        canUpate: false,
        emptyBlocks: []
    };

    componentDidUpdate() {
        const { canUpate } = this.state;
        const { modalData, pageData } = this.props;
        if (
            (pageData !== undefined && pageData !== this.state.pageData) ||
            canUpate
        ) {
            let emptyBlocks = [];
            let emptyBlocksLength;

            emptyBlocksLength = 8 - pageData.length;

            for (let i = 0; i < emptyBlocksLength; i++) {
                emptyBlocks.push(1);
            }
            this.setState({
                pageData,
                emptyBlocks,
                canUpate: false
            });
        }
    }
    handleModal = (modal) => {
        this.props.update();
        this.setState({
            canUpate: true,
            modal
        });
    };

    render() {
        const {
            name,
            anthropometry,
            activeId,
            modalData,
            isClientModal
        } = this.props;
        const { pageData, modal, emptyBlocks } = this.state;
        console.warn(pageData);
        let nextPlus = false;
        if (pageData.length !== 0) {
            let lastData = pageData[pageData.length - 1][0];
            lastData = lastData.split('.');
            const now = new Date();
            console.warn(now.getDate());
            if (now.getDate() == 1 && lastData[1] != now.getMonth() + 1) {
                nextPlus = true;
            }
        } else {
            nextPlus = true;
        }
        return (
            <section
                className={'weight ' + (anthropometry && 'table-anthropometry')}
            >
                <h2>{name}</h2>
                <ProgressDop pageData={pageData}></ProgressDop>
                <div className="weight__table">
                    <div ref={this.tableMain} className="weight__table-main">
                        {pageData.map(
                            (volum, index) =>
                                index !== 0 &&
                                (volum[1] !== 'plus' ? (
                                    <div
                                        key={index + '-weight'}
                                        className="weight__table-main-column"
                                    >
                                        <div
                                            className={
                                                'weight__table-main-item ' +
                                                (anthropometry &&
                                                    'table-anthropometry__table-name')
                                            }
                                        >
                                            <span>{volum[1]}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="weight__table-main-column">
                                        <div
                                            className={
                                                'volume__table-main-item volume__table-main-item_plus ' +
                                                (anthropometry &&
                                                    'table-anthropometry__table-name')
                                            }
                                        >
                                            {modalData && (
                                                <span
                                                    onClick={() =>
                                                        this.handleModal(true)
                                                    }
                                                >
                                                    +
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                        )}
                        {emptyBlocks.map(() => (
                            <div className="weight__table-main-column">
                                <div
                                    className={
                                        'volume__table-main-item volume__table-main-item_plus ' +
                                        (anthropometry &&
                                            'table-anthropometry__table-name')
                                    }
                                ></div>
                            </div>
                        ))}
                    </div>
                    {console.log(modalData)}
                </div>
                {modal && !isClientModal && (
                    <ModalClientTrainerAnthropometry
                        url={modalData.url}
                        title={modalData.title}
                        inputs={[
                            {
                                title: modalData.inputs.title,
                                postArg: modalData.inputs.postArg,
                                mandatory: true
                            }
                        ]}
                        handleModal={this.handleModal}
                        addData={'id=' + activeId}
                    ></ModalClientTrainerAnthropometry>
                )}
                {modal && isClientModal && (
                    <ModalClientTrainerAnthropometry
                        url={modalData.url}
                        title={modalData.title}
                        inputs={[
                            {
                                title: modalData.inputs.title,
                                postArg: modalData.inputs.postArg,
                                mandatory: true
                            }
                        ]}
                        handleModal={this.handleModal}
                        addData={''}
                    ></ModalClientTrainerAnthropometry>
                )}
            </section>
        );
    }
}
