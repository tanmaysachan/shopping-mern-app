import React, {Component} from 'react';
import axios from 'axios';
const qs = require('querystring');

export default class CreateProduct extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        localStorage.setItem("user_token", "");
        localStorage.setItem("usertype", "nouser");
        localStorage.setItem("username", "");
        this.props.history.push('/login');
        window.location.reload();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="submit" value="Logout" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

