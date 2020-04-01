import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

export default class Modal extends Component {
    state = {
        url: '',
        addData: '',
        title: '',
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

    render() {
        const { handleModal } = this.props;

        return ReactDOM.createPortal(
            <section
                className="modal-trainer-duty"
                style={{
                    overflow: 'auto',
                    padding: '14px',
                    paddingTop: '250px'
                }}
            >
                <div className="">
                    <p>
                        Замеры тела можно производить обычной сантиметровой
                        лентой, а можно – бумажной или ниткой, после чего
                        снимать показания линейкой. Первый способ более удобный,
                        но если нет под рукой сантиметровой ленты, то отлично
                        подойдет и второй способ.
                    </p>
                    <h3>Талия</h3>
                    <p>
                        Измеряется по самому тонкому месту. А если налицо
                        выступающий живот, то замер производится, напротив, по
                        самой широкой части. Не старайтесь, опять же, обмануть
                        показания, поэтому живот не втягивайте, а сантиметровую
                        ленту не натягивайте, слишком сильно, но и провисать она
                        не должна.
                    </p>
                    <h3>Бедра</h3>
                    <p>
                        Замеряются в расслабленном состоянии, по самым
                        выступающим точкам. Лучше проводить измерения с
                        помощником, бывает сложно не только отыскать у себя
                        самые выступающие точки сзади, но ещё и измерить
                        правильно.
                    </p>
                    <h3>Руки</h3>
                    <p>
                        Измеряется в спокойном состоянии – рука висит вдоль
                        тела, расслабленна.
                    </p>
                    <h3>Грудная клетка</h3>
                    <p>
                        Замеряется в самом широком месте — у мужчин и по самым
                        выступающим точкам – у женщин. В спокойном состоянии —
                        замер делается после спокойного, обычного вдоха (не
                        стоит слишком глубоко вдыхать, выпячивать грудь).
                    </p>
                    <h3>Объем ноги</h3>
                    <p>
                        Замеряется самая широкая часть, в расслабленном
                        состоянии, либо стоя спокойно, либо поставив согнутую
                        ногу на стул.
                    </p>
                </div>
                <div
                    className="modal-trainer-duty__buttons"
                    style={{ justifyContent: 'center' }}
                >
                    <button onClick={() => handleModal(false)}>
                        Подтвердить
                    </button>
                </div>
            </section>,
            document.getElementById('portal')
        );
    }
}
