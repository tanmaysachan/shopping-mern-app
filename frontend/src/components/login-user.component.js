import React, {Component} from 'react';
import axios from 'axios';
const qs = require('querystring');

export default class LoginUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
	    }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event){
        this.setState({ username: event.target.value });
    }

    onChangePassword(event){
        this.setState({ password: event.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        const userinfo = {
            username : this.state.username,
            password : this.state.password
        };

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

        axios.post('http://localhost:4000/login', qs.stringify(userinfo), config)
             .then(res => {
                console.log(res)
                localStorage.setItem("user_token", res.data.token);
                localStorage.setItem("usertype", res.data.usertype);
                localStorage.setItem("username", res.data.username);
             });

        this.setState({
            username: '',
            password: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}


