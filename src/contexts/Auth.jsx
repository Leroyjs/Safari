import React, { PureComponent } from 'react';

const { Provider, Consumer: AuthConsumer } = React.createContext();
const user = {
    email: 'test@test.ru',
    password: 'test'
};

class AuthProvider extends PureComponent {
    state = {
        isLoggedIn: false,
        email: '',
        authError: ''
    };
    login = (email, password) => {
        if (email === user.email && password === user.password) {
            this.setState({
                email,
                isLoggedIn: true,
                authError: ''
            });
        } else {
            this.setState({
                authError: 'Email или пароль указан неправильно'
            });
        }
        console.log(this.state);
    };

    logout = () => {
        this.setState({
            isLoggedIn: false
        });
    };

    getProviderValue = () => {
        const { isLoggedIn, email, authError } = this.state;

        return {
            isLoggedIn,
            email,
            authError,
            login: this.login,
            logout: this.logout
        };
    };

    render() {
        const { children } = this.props;

        return <Provider value={this.getProviderValue()}>{children}</Provider>;
    }
}

export { AuthProvider, AuthConsumer };
