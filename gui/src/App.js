import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import AddTutorial from "./components/add-product.component";
import Tutorial from "./components/product.component";
import TutorialsList from "./components/product-list.component";
import AddProduct from './components/add-product.component';
import ProductList from './components/product-list.component'
import Product from './components/product.component'

class App extends Component{
  render(){
    return(
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/products" className="navbar-brand">
            kiarie-products
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/product"} className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/product"]} component={ProductList} />
            <Route exact path="/add" component={AddProduct} />
            <Route path="/product/:id" component={Product} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
