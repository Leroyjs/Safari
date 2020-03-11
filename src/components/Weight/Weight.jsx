import React, { Component } from 'react';
import ProgressDop from '../ProgressDop';
import './style.css';
export default class Weight extends Component {
    constructor(props) {
        super(props);
        this.tableMain = React.createRef();
    }
    state = {
        pageData: [['data', 'Вес']]
    };

    componentDidUpdate() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });
            const { anthropometry } = this.props;
            console.log(this.props.pageData);
            const tableMain = this.tableMain.current;
            let emptyBlocks = 7 - this.props.pageData.length;
            for (let i = 0; i < emptyBlocks; i++) {
                let div = document.createElement('div');
                div.classList.add('weight__table-main-column');
                div.innerHTML =
                    '<div class="weight__table-main-item ' +
                    (anthropometry && 'table-anthropometry__table-name') +
                    '"></div>';
                tableMain.append(div);
            }
        }
    }

    render() {
        const { name, anthropometry } = this.props;
        const { pageData } = this.state;
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
                                index !== 0 && (
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
                                )
                        )}
                        <div className="weight__table-main-column">
                            <div
                                className={
                                    'volume__table-main-item volume__table-main-item_plus ' +
                                    (anthropometry &&
                                        'table-anthropometry__table-name')
                                }
                            >
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
