import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

let whoIsIt = '';
let stub = true;
let url = 'https://bagiran.ru/api/cors';
fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Request-Headers': 'X-Requested-With, Origin',
        Origin: 'https://localhost:3000/'
    }
}).then(() => {
    let url = 'https://bagiran.ru/api/auth';
    fetch(url, {
        method: 'POST',
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
            whoIsIt = data.who;
            stub = data.stub;

            console.log(data);
            ReactDOM.render(
                <App whoIsIt={'isTrainer'} />,
                document.getElementById('root')
            );
        });
});
