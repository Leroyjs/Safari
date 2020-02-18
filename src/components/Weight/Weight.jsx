import React, { Component } from 'react';
import './style.css';
let array = [98, 95, 92, 80, 95, 92, 80, 95, 92, 80];
export default class Weight extends Component {
    constructor(props) {
        super(props);
        this.tableMain = React.createRef();
    }
    componentDidMount() {
        const { anthropometry } = this.props;
        console.log(anthropometry);
        const tableMain = this.tableMain.current;
        let emptyBlocks = 7 - array.length;
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
    render() {
        const { name, anthropometry } = this.props;
        return (
            <section
                className={'weight ' + (anthropometry && 'table-anthropometry')}
            >
                <h2>{name}</h2>
                <div className="weight__table">
                    <div ref={this.tableMain} className="weight__table-main">
                        {array.map((volum) => (
                            <div className="weight__table-main-column">
                                <div
                                    className={
                                        'weight__table-main-item ' +
                                        (anthropometry &&
                                            'table-anthropometry__table-name')
                                    }
                                >
                                    <span>{volum}</span>
                                </div>
                            </div>
                        ))}
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
