import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '',
        addData: '',
        title: '',
        checkbox: [false, false, false, false, false],
        errorBack: '',
        canUpate: true
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
    handleList = (e) => {
        const { checkbox } = this.state;

        let index = e.target.id.split('-')[0];
        let newCheckbox = checkbox.slice();
        newCheckbox[index] = !newCheckbox[index];
        this.setState({
            checkbox: newCheckbox
        });
    };
    handleSave = () => {
        const { url, addData, checkbox } = this.state;
        let value = checkbox.filter((item) => item).length;
        let data = 'score=' + value + '&' + addData;

        this.send(url, data);
    };
    send(url, data) {
        const { update } = this.props;
        console.log('https://bagiran.ru' + url);
        console.log(data);
        fetch('https://bagiran.ru' + url, {
            method: 'POST',
            body: data,
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
                if (data.error) {
                    this.setState({
                        errorBack: data.error
                    });
                    console.log(data);
                } else {
                    update();
                }
            });
    }
    render() {
        const { handleClose } = this.props;
        const { title, errorBack, checkbox } = this.state;

        return ReactDOM.createPortal(
            <section className="modal-trainer-duty">
                <h3>{title}</h3>
                <div
                    style={{
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '80%'
                    }}
                >
                    <input
                        type="checkbox"
                        id={'0-checkbox'}
                        style={{
                            marginRight: '10px',
                            minWidth: '13px',
                            minHeight: '13px'
                        }}
                        checked={checkbox[0]}
                        onChange={this.handleList}
                    />
                    <label htmlFor={'0-checkbox'}>Вода в кулерах</label>
                </div>
                <div
                    style={{
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '80%',
                        padding: '5px 0'
                    }}
                >
                    <input
                        type="checkbox"
                        id={'1-checkbox'}
                        style={{
                            marginRight: '10px',
                            minWidth: '13px',
                            minHeight: '13px'
                        }}
                        checked={checkbox[1]}
                        onChange={this.handleList}
                    />
                    <label htmlFor={'1-checkbox'}>Чистота в зале</label>
                </div>
                <div
                    style={{
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '80%',
                        padding: '5px 0'
                    }}
                >
                    <input
                        type="checkbox"
                        id={'2-checkbox'}
                        style={{
                            marginRight: '10px',
                            minWidth: '13px',
                            minHeight: '13px'
                        }}
                        checked={checkbox[2]}
                        onChange={this.handleList}
                    />
                    <label htmlFor={'2-checkbox'}>
                        Все оборудование на месте
                    </label>
                </div>
                <div
                    style={{
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '80%',
                        padding: '5px 0'
                    }}
                >
                    <input
                        type="checkbox"
                        id={'3-checkbox'}
                        style={{
                            marginRight: '10px',
                            minWidth: '13px',
                            minHeight: '13px'
                        }}
                        checked={checkbox[3]}
                        onChange={this.handleList}
                    />
                    <label htmlFor={'3-checkbox'}>
                        Чистое рабочее место (стойка тренера)
                    </label>
                </div>
                <div
                    style={{
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '80%',
                        padding: '5px 0'
                    }}
                >
                    <input
                        type="checkbox"
                        id={'4-checkbox'}
                        style={{
                            marginRight: '10px',
                            minWidth: '13px',
                            minHeight: '13px'
                        }}
                        checked={checkbox[4]}
                        onChange={this.handleList}
                    />
                    <label htmlFor={'4-checkbox'}>
                        Отметка у администратора о закрытии смены с помощью
                        тренерской карты
                    </label>
                </div>
                {errorBack}
                <div className="modal-trainer-duty__buttons" style={{}}>
                    <button
                        style={{
                            marginRight: '20px',
                            marginLeft: '-20px'
                        }}
                        onClick={this.handleSave}
                    >
                        Подтвердить
                    </button>
                    <button onClick={() => handleClose(true)}>Отмена</button>
                </div>
            </section>,
            document.getElementById('portal')
        );
    }
}
