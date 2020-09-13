import React, {Component} from 'react';
import axios from 'axios';
const qs = require('querystring');

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            usertype: '',
            usernames: {}
        }

        this.giveWarning = 0;

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsertype = this.onChangeUsertype.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password : event.target.value })
    }

    onChangeUsertype(event) {
        let value = event.target.value;
        if(value != 'customer' && value != 'vendor'){
            this.giveWarning = 1;
        } else {
            this.giveWarning = 0;
        }
        this.setState({ usertype : value})
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.giveWarning == 0){
            const newUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                usertype: this.state.usertype
            }


            const config = {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }

            axios.post('http://localhost:4000/signup', qs.stringify(newUser), config)
                 .then(res => console.log("signup successful"));

        }
        else{
            alert('User was not added! Please check the details again!!');
        }

        this.setState({
            username: '',
            email: '',
            password: '',
            usertype: ''
        });

        this.giveWarning = 0;
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
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
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
                        <label>User Type(customer/vendor): </label>
                        <input type="text" 
                               className={"form-control " + (this.giveWarning ? 'btn-danger' : '')}
                               value={this.state.usertype} 
                               onChange={this.onChangeUsertype}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
