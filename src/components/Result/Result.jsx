import React, { Component } from 'react';
import plus from './plus.png';
import './style.css';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.resultBlock = React.createRef();
        this.state = {
            pageData: []
        };
    }
    componentDidUpdate() {
        if (
            this.props.pageData !== undefined &&
            this.props.pageData !== this.state.pageData
        ) {
            this.setState({
                pageData: this.props.pageData
            });
            const resultBlock = this.resultBlock.current;
            const resultBlockChildren = resultBlock.children;
            let sumBlockChildren = 94;
            let coordinateX;
            let coordinateXDelta = 0;
            let coordinateXOld;
            for (let i = 0; i < this.props.pageData.length; i++) {
                sumBlockChildren += 94;
            }

            const resultBlockWidth = document.documentElement.clientWidth;
            const maxLeft = resultBlockWidth - sumBlockChildren;

            resultBlock.addEventListener('touchstart', (e) => {
                coordinateXOld = e.targetTouches[0].pageX;
                coordinateX = getComputedStyle(resultBlock);
                coordinateX = coordinateX.left;
                coordinateX = +coordinateX.substring(0, coordinateX.length - 2);
            });
            resultBlock.addEventListener('touchmove', (e) => {
                coordinateXDelta = e.targetTouches[0].pageX - coordinateXOld;
                if (
                    coordinateX + coordinateXDelta <= 15 &&
                    coordinateX + coordinateXDelta >= maxLeft
                ) {
                    resultBlock.style.left =
                        +coordinateX + coordinateXDelta + 'px';
                }
            });
        }
    }
    handleLoadImg(e, url, id) {
        const { update } = this.props;
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        console.warn(files.size);
        reader.addEventListener('load', (e) => {
            console.warn(e.target.result);
            const data = 'val=' + e.target.result + id;
            fetch(url, {
                method: 'POST',
                body: data,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Request-Headers':
                        'X-Requested-With, Origin',
                    Origin: 'https://localhost:3000/'
                }
            })
                .then((result) => {
                    return result.json();
                })
                .then((dat) => {
                    update();
                    console.warn(dat);
                });
        });
    }
    render() {
        const { pageData } = this.state;
        console.log(pageData);
        const { url, id } = this.props;
        console.warn(pageData);
        let nextPlus = false;
        if (pageData.length !== 0) {
            let lastData = pageData[pageData.length - 1].data;
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
            <section className="result">
                <h2>Результат</h2>
                <div ref={this.resultBlock} className="result__block">
                    {pageData.map((result, index) =>
                        result.photo !== 'plus' ? (
                            <div key={index} className="result__item">
                                <div
                                    className="result__item-img"
                                    style={{
                                        backgroundImage:
                                            'url(' + result.photo + ')',
                                        backgroundPosition: 'center'
                                    }}
                                ></div>
                                {console.warn(result.photo)}
                                <span>{result.data}</span>
                            </div>
                        ) : (
                            url && (
                                <div className="result__inputFile">
                                    <input
                                        style={{ display: 'none' }}
                                        type="file"
                                        name="file"
                                        id="file"
                                        className="inputfile"
                                        onChange={(e) =>
                                            this.handleLoadImg(e, url, id)
                                        }
                                    />

                                    <label htmlFor="file">
                                        <img src={plus} alt="" />
                                    </label>
                                </div>
                            )
                        )
                    )}
                </div>
            </section>
        );
    }
}
