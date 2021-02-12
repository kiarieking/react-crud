import React, { Component } from 'react'
import ProductDataService from '../services/product'
import {Link} from 'react-router-dom'

export class ProductList extends Component {
    constructor(props) {
        super(props)
        
        this.retrieveProducts = this.retrieveProducts.bind(this)


        this.state = {
             products: [],
             currentProduct: null,
             currentIndex: -1,
             searchName: ""
        }
    }

    componentDidMount(){
        this.retrieveProducts()
    }

    onChangeSearchTitle(e) {
        const searchName = e.target.value;
    
        this.setState({
          searchName: searchName
        });
      }

      retrieveProducts() {
        ProductDataService.getAll()
          .then(response => {
            this.setState({
              products: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      refreshList() {
        this.retrieveTutorials();
        this.setState({
          currentTutorial: null,
          currentIndex: -1
        });
      }
    
      setActiveProduct(product, index) {
        this.setState({
          currentProduct: product,
          currentIndex: index
        });
      }

      removeAllProducts() {
        ProductDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      }

      searchTitle() {
        ProductDataService.findByProductname(this.state.searchName)
          .then(response => {
            this.setState({
              products: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

    render() {

        const{products, currentProduct, currentIndex, searchName} = this.state

        return (
            <div className="list row" >
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Search by product name"
                        value={searchName}
                        onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchName}
                        >
                            Search
                        </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">

                    <h4>Product List</h4>

                    <ul className="list-group">
                        {products &&
                        products.map((product, index) => (
                            <li
                            className={
                                "list-group-item " +
                                (index === currentIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveProduct(product, index)}
                            key={index}
                            >
                            {product.productname}
                            </li>
                        ))}
                    </ul>
                    
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllProducts}
                    >
                        Remove All
                    </button>
                        
                </div>

                <div className="col-md-6">
                    {currentProduct ? (
                    <div>
                        <h4>Product</h4>
                        <div>
                            <label>
                            <strong>Name:</strong>
                            </label>{" "}
                            {currentProduct.productname}
                        </div>
                        <div>
                            <label>
                            <strong>Description:</strong>
                            </label>{" "}
                            {currentProduct.productdescription}
                        </div>
                        <div>
                            <label>
                            <strong>Stock:</strong>
                            </label>{" "}
                            {currentProduct.stock}
                        </div>
                        <div>
                            <label>
                            <strong>Supplier:</strong>
                            </label>{" "}
                            {currentProduct.Supplier}
                        </div>
                        <div>
                            <label>
                            <strong>available:</strong>
                            </label>{" "}
                            {currentProduct.available ? "Available" : "Pending"}
                        </div>

                        <Link
                            to={"/tutorials/" + currentProduct.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                    ) :(
                    <div>
                        <br />
                        <p>Please click on a product...</p>
                    </div>
                    )}
                </div>    

            </div>

        )
    }
}

export default ProductList
