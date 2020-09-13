import React, {Component} from 'react';
import axios from 'axios';
const qs = require('querystring');

export default class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : '',
            quan : 0,
            orders : []
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQuan = this.onChangeQuan.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeQuan(event){
        this.setState({ quan : event.target.value });
    }

    onChangeName(event){
        this.setState({ name : event.target.value });

        const prod = {
            name : this.state.name
        };

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

        axios.post('http://localhost:4000/user/product/find?toke=' + localStorage.getItem('user_token'), qs.stringify(prod), config)
            .then(res => {
                console.log(res.data);
                this.setState({ orders : res.data });
            });
    }

    onSubmit(product, soldby){
        const prod = {
            name : product,
            soldby : soldby,
            quantity : this.state.quan,
            placedby : localStorage.getItem("username"),
        };

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        return e => {
            axios.post('http://localhost:4000/user/order/place?toke=' + localStorage.getItem('user_token'), qs.stringify(prod), config)
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    alert("order can't be placed!");
                });
            e.preventDefault();
        }
    }

    render() {
        return (
            <div>
            <form>
                <div className="form-group">
                        <label>Product name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
            </form>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Quantity left to dispatch</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Sold by</th>
                        <th>Place order</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.orders.map((product, i) => {
                        return (
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.stat}</td>
                                <td>{(product.mintodispatch - product.quantity) > 0 ? product.mintodispatch - product.quantity : 0}</td>
                                <td>{product.price}</td>
                                <td></td>
                                <td>{product.soldby}</td>
                                <td>
                                    <form onSubmit={this.onSubmit(product.name, product.soldby)}>
                                        <div className="form-group">
                                            <input type="Number" 
                                                   className="form-control"
                                                   value={this.state.quan}
                                                   onChange={this.onChangeQuan}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input type="submit" value="Order" className="btn btn-primary"/>
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
