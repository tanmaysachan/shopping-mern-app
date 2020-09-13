import React, {Component} from 'react';
import axios from 'axios';
const qs = require('querystring');

export default class DispatchProduct extends Component {

    constructor(props){
        super(props);
        this.state = {
            products : []
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/user/product/ready?toke=' + localStorage.getItem('user_token'))
            .then(res => {
                console.log(res);
                this.setState({products : res.data})
            });
    }

    onSubmit(product){

        const prod = {
            name : product
        };

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        return e => {
            e.preventDefault();
            console.log(product);
            axios.post('http://localhost:4000/user/product/dispatch?toke=' + localStorage.getItem('user_token'), qs.stringify(prod), config);
        }
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.products.map((product, i) => {
                        return (
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.stat}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td></td>
                                <td>
                                    <form onSubmit={this.onSubmit(product.name)}>
                                        <div className="form-group">
                                            <input type="submit" value="Dispatch Product" className="btn btn-primary"/>
                                        </div>
                                    </form>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
                </table>
            </div>
        )
    }

}


