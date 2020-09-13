import React, {Component} from 'react';
import axios from 'axios';
const qs = require('querystring');

export default class EditOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : "", 
            soldby: "",
            quantity: 0
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSoldby = this.onChangeSoldby.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(event){
        this.setState({name : event.target.value });
    }

    onChangeSoldby(event){
        this.setState({soldby : event.target.value });
    }

    onChangeQuantity(event){
        this.setState({quantity : event.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            soldby: this.state.soldby,
            quantity: this.state.quantity
        }

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

        axios.post('http://localhost:4000/user/order/edit?toke=' + localStorage.getItem("user_token"), qs.stringify(newUser), config)
             .then(res => {
                 console.log("edited succcessfully")
             })
             .catch(error => {
                 alert("Item could not be edited!");
             });
   
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
                    <div className="form-group">
                        <label>SoldBy: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.soldby}
                               onChange={this.onChangeSoldby}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.quantity}
                               onChange={this.onChangeQuantity}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Order" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }

}
