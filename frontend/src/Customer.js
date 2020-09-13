import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import LoginUser from './components/login-user.component'
import CreateProduct from './components/create-product.component'
import LogoutUser from './components/logout-user.component'
import SearchProduct from './components/search-product.component'
import Search from './components/search.component'
import ViewOrders from './components/view-orders.component'
import EditOrder from './components/edit-order.component'

function App() {
    return (
	<Router>
	  <div className="container">
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
		  <Link to="/" className="navbar-brand">App</Link>
		  <div className="collapse navbar-collapse">
			<ul className="navbar-nav mr-auto">
			  <li className="navbar-item">
				<Link to="/search" className="nav-link">Search Product</Link>
			  </li>
			  <li className="navbar-item">
				<Link to="/orders" className="nav-link">Check Orders</Link>
			  </li>
			  <li className="navbar-item">
				<Link to="/editorder" className="nav-link">Edit Order</Link>
			  </li>
			  <li className="navbar-item">
				<Link to="/logout" className="nav-link">Logout</Link>
			  </li>
			</ul>
		  </div>
		</nav>

		<br/>
        <Route path="/search" component={Search}/>
        <Route path="/orders" component={ViewOrders}/>
        <Route path="/editorder" component={EditOrder}/>
        <Route path="/logout" component={LogoutUser}/>
      	</div>
	</Router>
    );
}

export default App;  
//<Route path="/checkorder" component={SearchProduct}/>

// <Route path="/searchproduct" component={SearchProduct}/>
// <Route path="/dispatchorder" component={DispatchOrder}/>
// <Route path="/orders" component={ViewOrders}/>
// <Route path="/myreview" component={VendorReview}/>
// <Route path="/productreview" component={ProductReview}/>
// <Route path="/logout" component={LogoutUser}/>

