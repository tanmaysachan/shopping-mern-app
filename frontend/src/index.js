import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Customer from './Customer';
import Vendor from './Vendor';
import * as serviceWorker from './serviceWorker';

if(localStorage.getItem("usertype") == "nouser" || localStorage.getItem("usertype") == null){
    ReactDOM.render(<App />, document.getElementById('root'));
}

else if(localStorage.getItem("usertype") == "customer"){
    ReactDOM.render(<Customer />, document.getElementById('root'));
}

else if(localStorage.getItem("usertype") == "vendor"){
    ReactDOM.render(<Vendor />, document.getElementById('root'));
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
