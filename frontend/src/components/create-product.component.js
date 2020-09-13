import React, {Component} from 'react';
import axios from 'axios';
const qs = require('querystring');

export default class CreateProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            quantity: '',
            mintodispatch: '',
            soldby: '',
            usertype: '',
            prodimg: ''
        }

        this.giveWarning = 0;

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeMintodispatch = this.onChangeMintodispatch.bind(this);
        this.onChangeProdimg = this.onChangeProdimg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(event){
        this.setState({name:event.target.value});
    }

    onChangePrice(event){
        this.setState({price:Number(event.target.value)});
    }

    onChangeProdimg(event){
        this.setState({prodimg:event.target.value})
    }

    onChangeMintodispatch(event){
        this.setState({mintodispatch:Number(event.target.value)});
    }

    onSubmit(e){
        e.preventDefault();

        const productinfo = {
            name : this.state.name,
            price : this.state.price,
            mintodispatch : this.state.mintodispatch,
            prodimg : this.state.prodimg,
            stat: "waiting",
            quantity: Number(0),
            soldby : localStorage.getItem("username")
        };

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

        axios.post('http://localhost:4000/user/product/create?toke=' + localStorage.getItem("user_token"), qs.stringify(productinfo), config)
             .then(res => {
                console.log(productinfo)
             });

        this.setState({
            name: '',
            price: '',
            mintodispatch: ''
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
                        <label>Price: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.price}
                               onChange={this.onChangePrice}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Minimum quantity to dispatch: </label>
                        <input type="text" 
                               className="form-control"
                               value={this.state.mintodispatch} 
                               onChange={this.onChangeMintodispatch}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}


