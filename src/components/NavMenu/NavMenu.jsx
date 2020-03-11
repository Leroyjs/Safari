import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './style.css';

export default class App extends Component {
    state = {
        active: 'personalArea'
    };
    handleClick(active) {
        this.setState({
            active
        });
    }
    render() {
        const { whoIsIt } = this.props;
        return (
            <div className="nav-menu">
                <Link
                    to="/"
                    onClick={() => this.handleClick('personalArea')}
                    className={
                        this.state.active === 'personalArea' &&
                        'nav-menu_active'
                    }
                >
                    <svg
                        viewBox="-42 0 512 512.001"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m210.351562 246.632812c33.882813 0 63.21875-12.152343 87.195313-36.128906 23.96875-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.128906 87.195312 23.980469 23.96875 53.316406 36.125 87.191406 36.125zm-65.972656-189.292968c18.394532-18.394532 39.972656-27.335938 65.972656-27.335938 25.996094 0 47.578126 8.941406 65.976563 27.335938 18.394531 18.398437 27.339844 39.980468 27.339844 65.972656 0 26-8.945313 47.578125-27.339844 65.976562-18.398437 18.398438-39.980469 27.339844-65.976563 27.339844-25.992187 0-47.570312-8.945312-65.972656-27.339844-18.398437-18.394531-27.34375-39.976562-27.34375-65.976562 0-25.992188 8.945313-47.574219 27.34375-65.972656zm0 0" />
                        <path d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.3125-10.339844-7.808594-20.550781-13.375-30.335938-5.769532-10.15625-12.550782-19-20.160157-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.042969 5.339844-10.96875 0-22.085937-1.796876-33.042968-5.339844-11.210938-3.621094-20.300782-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.753906-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.609375 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.0625 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.777344-1.023438 19.953125-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.4375 23.730469 65.066406 23.730469h246.53125c26.621094 0 48.511719-7.984375 65.0625-23.730469 16.757813-15.945312 25.253906-37.589843 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm-44.90625 72.828125c-10.933594 10.40625-25.449218 15.464844-44.378906 15.464844h-246.527344c-18.933594 0-33.449218-5.058594-44.378906-15.460938-10.722656-10.207031-15.933594-24.140625-15.933594-42.585937 0-9.59375.316406-19.066407.949219-28.160157.617187-8.921874 1.878906-18.722656 3.75-29.136718 1.847656-10.285156 4.199219-19.9375 6.996094-28.675782 2.683593-8.378906 6.34375-16.675781 10.882812-24.667968 4.332031-7.617188 9.316407-14.152344 14.816407-19.417969 5.144531-4.925781 11.628906-8.957031 19.269531-11.980469 7.066406-2.796875 15.007812-4.328125 23.628906-4.558594 1.050781.558594 2.921875 1.625 5.953125 3.601563 6.167969 4.019531 13.277344 8.605469 21.136719 13.625 8.859375 5.648437 20.273437 10.75 33.910156 15.152344 13.941406 4.507812 28.160156 6.796875 42.273437 6.796875 14.113282 0 28.335938-2.289063 42.269532-6.792969 13.648437-4.410156 25.058594-9.507813 33.929687-15.164063 8.042969-5.140624 14.953125-9.59375 21.121094-13.617187 3.03125-1.972656 4.902344-3.042969 5.953125-3.601563 8.625.230469 16.566406 1.761719 23.636719 4.558594 7.636719 3.023438 14.121093 7.058594 19.265625 11.980469 5.5 5.261719 10.484375 11.796875 14.816406 19.421875 4.542969 7.988281 8.207031 16.289062 10.886719 24.660156 2.800781 8.75 5.15625 18.398438 7 28.675782 1.867187 10.433593 3.132812 20.238281 3.75 29.144531v.007812c.636719 9.058594.957031 18.527344.960937 28.148438-.003906 18.449219-5.214844 32.378906-15.9375 42.582031zm0 0" />
                    </svg>
                </Link>

                {whoIsIt === 'isTrainer' && (
                    <Link
                        to="/Calendar"
                        onClick={() => this.handleClick('calendar')}
                        className={
                            this.state.active === 'calendar' &&
                            'nav-menu_active'
                        }
                    >
                        <svg
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 512 512"
                        >
                            <path
                                d="M467,60h-15V45c0-24.813-20.187-45-45-45s-45,20.187-45,45v15h-60V45c0-24.813-20.187-45-45-45s-45,20.187-45,45v15h-62
			V45c0-24.813-20.187-45-45-45S60,20.187,60,45v15H45C20.187,60,0,80.187,0,105c0,2.176,0,356.248,0,362c0,24.813,20.187,45,45,45
			h422c24.813,0,45-20.187,45-45c0-2.763,0-357.126,0-362C512,80.187,491.813,60,467,60z M392,45c0-8.271,6.729-15,15-15
			s15,6.729,15,15v60c0,8.271-6.729,15-15,15s-15-6.729-15-15V45z M242,45c0-8.271,6.729-15,15-15s15,6.729,15,15v60
			c0,8.271-6.729,15-15,15s-15-6.729-15-15V45z M90,45c0-8.271,6.729-15,15-15s15,6.729,15,15v60c0,8.271-6.729,15-15,15
			s-15-6.729-15-15V45z M482,467c0,8.271-6.729,15-15,15H45c-8.271,0-15-6.729-15-15V212h452V467z M482,182H30v-77
			c0-8.271,6.729-15,15-15h15v15c0,24.813,20.187,45,45,45s45-20.187,45-45V90h62v15c0,24.813,20.187,45,45,45s45-20.187,45-45V90
			h60v15c0,24.813,20.187,45,45,45s45-20.187,45-45V90h15c8.271,0,15,6.729,15,15V182z"
                            />

                            <path
                                d="M437,242H75c-8.284,0-15,6.716-15,15v180c0,8.284,6.716,15,15,15h362c8.284,0,15-6.716,15-15V257
			C452,248.716,445.284,242,437,242z M150,422H90v-60h60V422z M150,332H90v-60h60V332z M242,422h-62v-60h62V422z M242,332h-62v-60
			h62V332z M332,422h-60v-60h60V422z M332,332h-60v-60h60V332z M422,422h-60v-60h60V422z M422,332h-60v-60h60V332z"
                            />
                        </svg>
                    </Link>
                )}
                {whoIsIt === 'isTrainer' && (
                    <Link
                        to="/Introductory"
                        onClick={() => this.handleClick('introductory')}
                        className={
                            this.state.active === 'introductory' &&
                            'nav-menu_active'
                        }
                    >
                        <svg
                            viewBox="0 -66 512.00035 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m461.285156 226.507812-76.492187-5.464843-50.554688-84.214844-25.273437-42.167969v-11.679687c.007812-12.675781-10.261719-22.957031-22.9375-22.964844-2.839844-.003906-5.65625.523437-8.300782 1.546875l-72.6875 28.039062 5.492188-18.433593c4.335938-15.496094-2.699219-31.921875-16.90625-39.476563l-57.035156-30.640625c-4.148438-2.226562-9.316406-.804687-11.742188 3.230469l-83.660156 133.96875-1.765625-1.023438c-4.226563-2.429687-9.621094-.96875-12.046875 3.257813-.054688.089844-.101562.179687-.152344.273437l-26.191406 49.308594c-2.257812 4.257813-.683594 9.535156 3.53125 11.867188l318.535156 176.550781c1.308594.722656 2.777344 1.101563 4.273438 1.101563h131.664062c29.238282-.027344 52.9375-23.722657 52.964844-52.964844v-45.65625c-.09375-28.609375-22.183594-52.328125-50.714844-54.457032zm-94.941406-1.890624-10.082031 3.363281-78.988281-102.699219 20.304687-15.246094zm-230.691406-204.03125 49.621094 26.632812c6.878906 3.636719 10.316406 11.550781 8.28125 19.058594l-7.292969 24.578125-50.671875-30.386719-17.546875-10.53125zm-52.265625 84.25 4.519531-7.0625 29.042969 21.601562c14.78125 11.097656 22.328125 29.375 19.683593 47.671875l-1.101562 25.511719-78.894531-45.472656zm375.648437 257.097656h-129.394531l-308.964844-171.257813 17.839844-33.542969 292.519531 168.3125c1.34375.773438 2.863282 1.179688 4.414063 1.175782h158.894531c0 19.5-15.808594 35.3125-35.308594 35.3125zm35.308594-52.96875h-156.539062l-60.546876-34.859375 20.355469-20.753907c3.363281-3.527343 3.230469-9.117187-.300781-12.480468-3.457031-3.296875-8.910156-3.242188-12.304688.121094l-23.550781 24.011718-33.546875-19.332031 33.644532-26.914063c3.804687-3.046874 4.421874-8.605468 1.375-12.414062-3.046876-3.804688-8.605469-4.421875-12.410157-1.375l-39.046875 31.242188-28.742187-16.527344 43.609375-36.34375c3.75-3.121094 4.257812-8.6875 1.140625-12.4375-3.121094-3.75-8.691407-4.257813-12.441407-1.140625l-48.621093 40.527343-13.648438-7.855468 1.429688-33.886719c3.269531-24.414063-6.960938-48.679687-26.71875-63.382813l-30.078125-22.363281 11.363281-17.839843 78.140625 46.882812c1.050781.605469 2.214844.980469 3.417969 1.105469.210937 0 .394531.070312.609375.085937.210937.019532.34375.0625.511718.0625 1.089844.003906 2.175782-.195312 3.195313-.589844l89.421875-34.488281c1.636719-.625 3.46875-.410156 4.917969.574219 1.453125.996094 2.316406 2.648438 2.304687 4.414062v9.710938l-31.78125 23.832031c-3.898437 2.929688-4.683594 8.464844-1.753906 12.359375.019531.027344.039062.054688.058594.078125l88.277344 114.761719c2.28125 2.988281 6.214843 4.191406 9.78125 2.992188l24.8125-8.273438 79.328124 5.667969c19.304688 1.429687 34.261719 17.46875 34.335938 36.828125zm0 0" />
                            <path d="m52.964844 256h-44.136719c-4.875 0-8.828125 3.953125-8.828125 8.828125s3.953125 8.828125 8.828125 8.828125h44.136719c4.875 0 8.828125-3.953125 8.828125-8.828125s-3.953125-8.828125-8.828125-8.828125zm0 0" />
                            <path d="m0 317.792969c0 4.875 3.953125 8.828125 8.828125 8.828125h114.757813c4.875 0 8.828124-3.953125 8.828124-8.828125s-3.953124-8.828125-8.828124-8.828125h-114.757813c-4.875 0-8.828125 3.953125-8.828125 8.828125zm0 0" />
                            <path d="m220.691406 361.933594h-211.863281c-4.875 0-8.828125 3.949218-8.828125 8.824218s3.953125 8.828126 8.828125 8.828126h211.863281c4.875 0 8.824219-3.953126 8.824219-8.828126s-3.949219-8.824218-8.824219-8.824218zm0 0" />
                        </svg>
                    </Link>
                )}
                {whoIsIt === 'isTrainer' && (
                    <Link
                        to="/Sales"
                        onClick={() => this.handleClick('sales')}
                        className={
                            this.state.active === 'sales' && 'nav-menu_active'
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                d="M488.399,492h-21.933V173.536c0-14.823-12.06-26.882-26.882-26.882H390.56c-14.823,0-26.882,12.06-26.882,26.882V492
			h-55.692V317.825c0-14.823-12.059-26.882-26.882-26.882H232.08c-14.823,0-26.882,12.06-26.882,26.882V492h-55.692v-90.204
			c0-14.823-12.06-26.882-26.882-26.882H73.599c-14.823,0-26.882,12.06-26.882,26.882V492H23.601c-5.523,0-10,4.477-10,10
			s4.477,10,10,10h464.798c5.523,0,10-4.477,10-10S493.922,492,488.399,492z M129.504,492H66.716v-90.204
			c0-3.795,3.087-6.882,6.882-6.882h49.024c3.795,0,6.882,3.087,6.882,6.882V492z M287.985,492h-62.788V317.825
			c0-3.795,3.087-6.882,6.882-6.882h49.024c3.794,0,6.882,3.087,6.882,6.882V492z M446.466,492h-62.788V173.536
			c0-3.795,3.087-6.882,6.882-6.882h49.024c3.795,0,6.882,3.087,6.882,6.882V492z"
                            />

                            <path
                                d="M466.442,10.516c0.14-2.729-0.82-5.504-2.904-7.588c-2.084-2.084-4.859-3.045-7.588-2.904
			C455.789,0.017,455.63,0,455.466,0h-60.5c-5.523,0-10,4.477-10,10s4.477,10,10,10h37.357l-98.857,98.858l-37.28-37.28
			c-1.875-1.875-4.419-2.929-7.071-2.929c-2.652,0-5.196,1.054-7.071,2.929l-179.769,179.77c-3.905,3.905-3.905,10.237,0,14.143
			c1.953,1.951,4.512,2.927,7.071,2.927s5.119-0.976,7.071-2.929L289.115,102.79l37.28,37.28c3.905,3.905,10.237,3.905,14.143,0
			L446.466,34.143v33.81c0,5.523,4.477,10,10,10s10-4.477,10-10V11C466.466,10.837,466.449,10.678,466.442,10.516z"
                            />

                            <circle cx="75.64" cy="303.31" r="10" />
                        </svg>
                    </Link>
                )}
                {whoIsIt === 'isClient' && (
                    <Link
                        to="/Anthropometry"
                        onClick={() => this.handleClick('anthropometry')}
                        className={
                            this.state.active === 'anthropometry' &&
                            'nav-menu_active'
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="1 -69 544.607 544"
                        >
                            <path d="M 186.742188 198.046875 C 231.867188 198.046875 268.667969 170.335938 268.667969 136.386719 C 268.667969 102.433594 231.976562 74.722656 186.742188 74.722656 C 141.507812 74.722656 104.816406 102.433594 104.816406 136.386719 C 104.816406 170.335938 141.617188 198.046875 186.742188 198.046875 Z M 186.742188 96.625 C 219.597656 96.625 246.761719 114.808594 246.761719 136.382812 C 246.761719 157.960938 219.269531 176.140625 186.742188 176.140625 C 154.210938 176.140625 126.71875 157.960938 126.71875 136.382812 C 126.71875 114.808594 154.210938 96.515625 186.742188 96.515625 Z M 186.742188 96.625 " />
                            <path d="M 534.046875 250.292969 L 372.386719 250.292969 L 372.386719 136.273438 C 372.386719 61.359375 289.039062 0.355469 186.195312 0.355469 C 83.347656 0.355469 0 61.359375 0 136.273438 L 0 270.992188 C 0 339.992188 70.644531 396.945312 161.660156 405.597656 L 163.523438 405.597656 C 171.078125 406.257812 178.746094 406.804688 186.523438 406.804688 L 534.046875 406.804688 C 540.09375 406.804688 545 401.898438 545 395.851562 L 545 261.242188 C 545 255.199219 540.09375 250.292969 534.046875 250.292969 Z M 186.742188 22.367188 C 277.097656 22.367188 351.03125 73.515625 351.03125 136.386719 C 351.03125 199.253906 277.539062 250.402344 186.742188 250.402344 C 95.945312 250.402344 22.453125 199.253906 22.453125 136.382812 C 22.453125 73.515625 96.492188 22.367188 186.742188 22.367188 Z M 351.03125 200.238281 L 351.03125 250.292969 L 287.503906 250.292969 C 312.300781 239.054688 333.933594 221.859375 350.480469 200.238281 Z M 523.09375 384.898438 L 501.1875 384.898438 L 501.1875 329.476562 C 501.1875 323.433594 496.28125 318.523438 490.238281 318.523438 C 484.191406 318.523438 479.285156 323.429688 479.285156 329.476562 L 479.285156 385.007812 L 435.472656 385.007812 L 435.472656 354.886719 C 435.472656 348.839844 430.566406 343.933594 424.519531 343.933594 C 418.472656 343.933594 413.566406 348.839844 413.566406 354.886719 L 413.566406 385.007812 L 369.757812 385.007812 L 369.757812 354.886719 C 369.757812 348.839844 364.851562 343.933594 358.804688 343.933594 C 352.757812 343.933594 347.851562 348.839844 347.851562 354.886719 L 347.851562 385.007812 L 304.039062 385.007812 L 304.039062 329.476562 C 304.039062 323.433594 299.132812 318.523438 293.085938 318.523438 C 287.042969 318.523438 282.132812 323.429688 282.132812 329.476562 L 282.132812 385.007812 L 240.1875 385.007812 L 240.1875 354.886719 C 240.1875 348.839844 235.277344 343.933594 229.234375 343.933594 C 223.1875 343.933594 218.28125 348.839844 218.28125 354.886719 L 218.28125 385.007812 L 186.734375 385.007812 C 182.574219 385.007812 178.523438 385.007812 174.46875 385.007812 L 174.46875 354.886719 C 174.46875 348.839844 169.5625 343.933594 163.515625 343.933594 C 157.46875 343.933594 152.5625 348.839844 152.5625 354.886719 L 152.5625 382.378906 C 78.640625 371.425781 23 325.644531 23 270.882812 L 23 200.238281 C 54.324219 243.0625 115.988281 272.195312 187.289062 272.195312 L 523.09375 272.195312 Z M 523.09375 384.898438 " />
                        </svg>
                    </Link>
                )}
                {whoIsIt === 'isClient' && (
                    <Link
                        to="/Training"
                        onClick={() => this.handleClick('training')}
                        className={
                            this.state.active === 'training' &&
                            'nav-menu_active'
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512.001 512.001"
                        >
                            <path
                                d="M498.84,140.45l-31.823-31.823l31.823-31.823c5.858-5.859,5.858-15.356,0-21.215L456.41,13.16
			c-5.853-5.854-15.357-5.857-21.215,0l-31.824,31.823L371.549,13.16c-17.546-17.547-46.098-17.546-63.644,0l-12.413,12.413
			c-16.626-7.959-37.301-5.128-51.231,8.802L223.045,55.59c-5.854,5.852-5.859,15.357,0,21.215l74.253,74.252l-146.24,146.242
			l-74.253-74.253c-5.854-5.854-15.358-5.857-21.215,0L34.376,244.26c-13.829,13.828-16.75,34.488-8.783,51.213l-12.432,12.432
			c-17.547,17.547-17.547,46.098,0,63.645l31.823,31.823l-31.823,31.823c-5.859,5.858-5.859,15.356,0,21.215l42.429,42.43
			c5.854,5.854,15.358,5.857,21.215,0l31.823-31.823l31.824,31.824c17.546,17.545,46.097,17.545,63.644,0l12.414-12.413
			c16.626,7.959,37.301,5.128,51.231-8.802l21.216-21.215c5.853-5.854,5.858-15.357,0-21.215l-74.253-74.253l146.24-146.24
			l74.253,74.253c5.853,5.854,15.358,5.857,21.215,0l21.215-21.215c13.829-13.828,16.75-34.488,8.783-51.213l12.432-12.432
			C516.387,186.547,516.387,157.997,498.84,140.45z M445.804,44.983l21.215,21.215l-21.215,21.216l-21.216-21.215L445.804,44.983z
			 M66.198,467.017l-21.215-21.215l21.215-21.215l21.215,21.215L66.198,467.017z M182.88,477.624
			c-5.848,5.851-15.365,5.849-21.214,0.001l-127.29-127.29c-5.849-5.848-5.849-15.366,0-21.215l10.607-10.607l148.505,148.504
			L182.88,477.624z M257.133,445.804l-10.608,10.606c-5.864,5.864-15.351,5.864-21.215,0L55.591,286.691
			c-5.863-5.863-5.863-15.351,0-21.215l10.607-10.607C72.801,261.473,253.807,442.477,257.133,445.804z M193.488,339.728
			l-21.215-21.215l146.24-146.241l21.215,21.215L193.488,339.728z M456.41,246.525l-10.607,10.607L329.122,140.452l-0.001-0.001
			l-0.001-0.001L254.869,66.2l10.607-10.608c5.862-5.862,15.351-5.865,21.215,0l169.72,169.72
			C462.274,231.173,462.274,240.662,456.41,246.525z M477.625,182.88l-10.607,10.607L318.513,44.983l10.608-10.607
			c5.85-5.849,15.364-5.849,21.215,0l127.289,127.289C483.475,167.514,483.475,177.032,477.625,182.88z"
                            />
                        </svg>
                    </Link>
                )}
                {whoIsIt === 'isClient' && (
                    <Link
                        to="/Nutrition"
                        onClick={() => this.handleClick('nutrition')}
                        className={
                            this.state.active === 'nutrition' &&
                            'nav-menu_active'
                        }
                    >
                        <svg
                            viewBox="0 -1 511.99871 511"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m380.589844 204.039062 30.082031-1.90625c.050781-.003906.105469-.007812.160156-.011718 21.4375-1.808594 40.679688-13.039063 52.796875-30.820313l23.78125-34.890625c20.699219-30.375 28.71875-67.0625 22.574219-103.300781-1.207031-7.117187-4.847656-13.675781-10.246094-18.460937-5.402343-4.789063-12.347656-7.617188-19.558593-7.960938-36.726563-1.757812-72.175782 10.605469-99.847657 34.796875l-31.789062 27.792969c-16.199219 14.160156-25.042969 34.609375-24.269531 56.113281.003906.050781.003906.105469.007812.160156l1.714844 30.089844c.667968 11.730469-3.632813 23.304687-11.777344 31.734375l-248.351562 255.132812c-6.648438 6.933594-10.082032 16.445313-9.664063 26.785157.460937 11.382812 5.683594 22.5625 13.972656 29.910156 7.488281 6.636719 17.78125 10.417969 28.070313 10.417969 1.101562 0 2.203125-.042969 3.300781-.132813 10.316406-.824219 19.351563-5.371093 25.46875-12.847656l223.464844-277.085937c7.410156-9.117188 18.386719-14.773438 30.109375-15.515626zm-42.039063 5.859376-223.445312 277.0625c-3.414063 4.171874-8.664063 6.742187-14.78125 7.230468-7.277344.582032-14.738281-1.839844-19.964844-6.472656-5.226563-4.636719-8.523437-11.753906-8.816406-19.046875-.25-6.128906 1.667969-11.648437 5.363281-15.5l248.332031-255.113281c11.132813-11.519532 16.992188-27.296875 16.085938-43.289063l-1.714844-30.011719c-.582031-16.832031 6.351563-32.835937 19.035156-43.925781l31.789063-27.792969c24.671875-21.566406 56.289062-32.578124 89.015625-31.023437 3.726562.179687 7.3125 1.640625 10.105469 4.117187 2.792968 2.472657 4.671874 5.863282 5.296874 9.539063 5.476563 32.308594-1.671874 65.011719-20.125 92.089844l-23.78125 34.894531c-9.488281 13.921875-24.546874 22.722656-41.328124 24.164062l-30 1.898438c-15.984376 1.015625-30.945313 8.726562-41.066407 21.179688zm0 0" />
                            <path d="m497.820312 440.570312-166.519531-151.667968c-3.132812-2.855469-7.984375-2.628906-10.84375.503906-2.851562 3.132812-2.625 7.988281.507813 10.84375l166.476562 151.632812c3.960938 3.660157 6.207032 9.054688 6.328125 15.1875.144531 7.296876-2.71875 14.597657-7.660156 19.539063-4.9375 4.9375-12.226563 7.808594-19.539063 7.660156-6.132812-.121093-11.527343-2.367187-15.148437-6.285156l-148.382813-162.90625c-2.855468-3.136719-7.710937-3.359375-10.84375-.507813-3.132812 2.855469-3.359374 7.710938-.503906 10.84375l148.417969 162.945313c6.523437 7.054687 15.8125 11.054687 26.160156 11.257813.269531.003906.535157.007812.804688.007812 11.121093 0 22.242187-4.511719 29.886719-12.160156 7.835937-7.835938 12.378906-19.308594 12.152343-30.695313-.203125-10.347656-4.199219-19.636719-11.292969-26.199219zm0 0" />
                            <path d="m92.609375 202.585938c12.703125 11.703124 29.207031 18.375 46.472656 18.789062.054688.003906.109375.003906.160157.003906l30.140624.09375c11.75.035156 23.042969 5.023438 30.96875 13.660156l13.277344 14.574219c1.515625 1.664063 3.589844 2.507813 5.675782 2.507813 1.84375 0 3.695312-.660156 5.164062-2 3.136719-2.855469 3.363281-7.710938.507812-10.84375l-13.296874-14.59375c-10.828126-11.804688-26.226563-18.601563-42.246094-18.65625l-30.058594-.09375c-13.355469-.339844-26.125-5.453125-36.019531-14.410156l-87.347657-103.835938c-.890624-1.0625-.824218-2.601562.15625-3.582031.671876-.675781 1.460938-.773438 1.871094-.773438s1.199219.097657 1.875.773438l79.507813 79.511719c7.859375 7.859374 20.648437 7.859374 28.507812-.003907l9.34375-9.339843v-.003907l16.589844-16.589843s.003906 0 .003906-.003907c0 0 .003907-.003906.003907-.003906l9.339843-9.339844c7.859375-7.859375 7.859375-20.648437 0-28.507812l-79.507812-79.507813c-1.03125-1.03125-1.03125-2.714844 0-3.746094.980469-.980468 2.519531-1.046874 3.582031-.15625l103.835938 87.351563c8.960937 9.890625 14.074218 22.664063 14.414062 36.015625l.089844 30.0625c.054687 16.015625 6.855468 31.414062 18.675781 42.265625l14.226563 12.957031c3.136718 2.855469 7.988281 2.628906 10.84375-.503906 2.851562-3.136719 2.625-7.988281-.507813-10.84375l-14.203125-12.9375c-8.660156-7.945312-13.644531-19.242188-13.683594-30.988281l-.09375-30.140625c0-.054688 0-.109375-.003906-.164063-.414062-17.265625-7.085938-33.769531-18.789062-46.472656-.21875-.238281-.453126-.464844-.703126-.675781l-104.222656-87.671875c-7.203125-6.0625-17.65625-5.609375-24.3125 1.046875-7.019531 7.019531-7.019531 18.4375 0 25.453125l79.507813 79.511719c1.875 1.875 1.875 4.925781 0 6.800781l-3.917969 3.914062-88.613281-88.609375c-2.996094-3-7.855469-3-10.851563 0-2.996094 2.996094-2.996094 7.855469 0 10.851563l88.613282 88.613281-5.742188 5.738281-88.613281-88.609375c-2.996094-2.996094-7.855469-2.996094-10.851563 0-3 2.996094-3 7.855469 0 10.851563l88.609375 88.613281-3.914062 3.917969c-1.875 1.875-4.925781 1.875-6.800781 0l-79.511719-79.507813c-3.398438-3.398437-7.917969-5.273437-12.726563-5.273437s-9.328125 1.875-12.726562 5.273437c-6.65625 6.65625-7.105469 17.109375-1.046875 24.316406l87.675781 104.21875c.207031.25.433594.484376.671875.703126zm0 0" />
                        </svg>
                    </Link>
                )}

                <Link
                    to="/Game"
                    onClick={() => this.handleClick('game')}
                    className={
                        this.state.active === 'game' && 'nav-menu_active'
                    }
                >
                    <svg
                        viewBox="0 0 499.999 499.999"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m171.875 372.237c-2.701 0-5.402-.702-7.812-2.09-4.837-2.792-7.812-7.95-7.812-13.535v-215.987c0-5.585 2.975-10.727 7.797-13.519 4.837-2.792 10.788-2.838 15.625-.015l187.5 107.94c4.837 2.777 7.828 7.95 7.828 13.535s-2.975 10.742-7.828 13.535l-187.5 108.047c-2.412 1.388-5.113 2.089-7.798 2.089zm15.625-204.589v161.926l140.564-81.009c-.001 0-140.564-80.917-140.564-80.917z" />
                        <path d="m250 499.999c-137.848 0-250-112.152-250-250s112.152-249.999 250-249.999 250 112.152 250 250-112.153 249.999-250 249.999zm0-468.749c-120.62 0-218.75 98.129-218.75 218.75s98.129 218.75 218.75 218.75 218.749-98.13 218.749-218.75-98.129-218.75-218.749-218.75z" />
                    </svg>
                </Link>

                <Link
                    to="/SpendPoints"
                    onClick={() => this.handleClick('spendPoints')}
                    className={
                        this.state.active === 'spendPoints' && 'nav-menu_active'
                    }
                >
                    <svg
                        viewBox="0 -31 512.00026 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0" />
                        <path d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0" />
                        <path d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0" />
                    </svg>
                </Link>
            </div>
        );
    }
}
