import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { AuthConsumer, AuthProvider } from './Auth';

const Mock = () => (
    <AuthProvider>
        <AuthConsumer>
            {({ login, email, authError, logout, isLoggedIn }) => (
                <>
                    <button
                        type="button"
                        data-testid="login"
                        onClick={() => login('test@test.ru', 'test')}
                    ></button>
                    <button
                        type="button"
                        data-testid="logout"
                        onClick={logout}
                    ></button>
                    <div data-testid="is-logged">{String(isLoggedIn)}</div>
                    <div data-testid="email">{String(email)}</div>
                    <div data-testid="auth-error">{String(authError)}</div>
                </>
            )}
        </AuthConsumer>
    </AuthProvider>
);

describe('Auth', () => {
    it('свойство контекста isLoggedIn == false', () => {
        const { getByTestId } = render(Mock());

        expect(getByTestId('is-logged').textContent).toEqual('false');
    });
    it('свойство контекста email == ""', () => {
        const { getByTestId } = render(Mock());

        expect(getByTestId('email').textContent).toEqual('');
    });
    it('свойство контекста authError == ""', () => {
        const { getByTestId } = render(Mock());

        expect(getByTestId('auth-error').textContent).toEqual('');
    });
    it(
        'При вызове метода контекста login, is-logged становится равно true.' +
            ' При вызове метода контекста logout, is-logged становится равно false.',
        () => {
            const { getByTestId } = render(Mock());

            fireEvent.click(getByTestId('login'));
            expect(getByTestId('is-logged').textContent).toEqual('true');

            fireEvent.click(getByTestId('logout'));
            expect(getByTestId('is-logged').textContent).toEqual('false');
        }
    );
});
