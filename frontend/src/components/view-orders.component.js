import React, {Component} from 'react';
import axios from 'axios';
const qs = require('querystring');

export default class ViewOrders extends Component {

    constructor(props){
        super(props);
        this.state = {
            orders : [],
        };
    }

    componentDidMount(){
        axios.get('http://localhost:4000/user/order?toke=' + localStorage.getItem('user_token'))
            .then(res => {
                console.log(res);
                this.setState({orders : res.data})
            });
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
                        <th>Sold By</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.orders.map((product, i) => {
                        return (
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.stat}</td>
                                <td>{product.quantity}</td>
                                <td>{product.soldby}</td>
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


                                // {this.scamfunction(product.name, product.soldby)}
                                // <td>{this.state.scam[product.name + " " + product.soldby]}</td>
