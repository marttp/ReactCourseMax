import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Axios from 'axios';

Axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
Axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
Axios.defaults.headers.post['Content-Type'] = 'application/json';

// Intercept every time when you request to outside
Axios.interceptors.request.use(request => {
    console.log(request)
    // return to next step
    // if not enter. It's be blocking your request
    return request;
}, error => {
    console.log(error)
    return Promise.reject(error)
});

Axios.interceptors.response.use(response => {
    console.log(response)
    return response;
}, error => {
    console.log(error)
    return Promise.reject(error)
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
