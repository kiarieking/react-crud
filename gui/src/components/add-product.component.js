import React, {Component} from 'react'
import ProductDataService from '../services/product'

export default class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.onChangeProductname = this.onChangeProductname.bind(this);
        this.onChangeProductdescription=this.onChangeProductdescription.bind(this)
        this.onChangeSupplier=this.onChangeSupplier.bind(this)
        this.onChangeStock=this.onChangeStock.bind(this)
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);
        this.state = {
            id: null,
            productname: "",
            productdescription: "", 
            supplier: "",
            stock:0,
            available: false,

            submitted:false
        }
    }

    onChangeProductname(e) {
        this.setState({
          productname: e.target.value
        })
      }
    

    onChangeProductdescription(e) {
        this.setState({
          productdescription: e.target.value
        })
      } 
      

    onChangeSupplier(e) {
        this.setState({
          supplier: e.target.value
        })
      } 

    onChangeStock(e) {
        this.setState({
          stock: e.target.value
        })
      }  
    
    saveTutorial() {
        var data = {
          productname: this.state.productname,
          productdescription: this.state.productdescription,
          supplier: this.state.supplier,
          stock:this.state.stock,
          available: this.state.available
        }

     ProductDataService.createProduct(data)
    .then(response => {
      this.setState({
        productname: response.data.productname,
        productdescription: response.data.productdescription,
        supplier: response.data.supplier,
        stock: response.data.stock,
        available: response.data.available,

        submitted: true
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
    }

    newTutorial() {
        this.setState({
            id: null,
            productname: "",
            productdescription: "", 
            supplier: "",
            stock:0,
            available: false,

            submitted: false
        });
      }

    render() {
        return (
            <div className="submit-form">
               {this.state.submitted ?(
                   <div>
                       <h4>Product added successfuly!!</h4>
                       <button className="btn btn-outline-sucess" onClick={this.newTutorial}>
                           Add Product
                       </button>
                   </div>
               ):(
                   <div>
                    <div className="form-group">
                        <label htmlFor="productname">productname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productname"
                            required
                            value={this.state.productname}
                            onChange={this.onChangeProductname}
                            name="productname"
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="productdescription">productdescription</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productdescription"
                            required
                            value={this.state.productdescription}
                            onChange={this.onChangeProductdescription}
                            name="productdescription"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="supplier">supplier</label>
                        <input
                            type="text"
                            className="form-control"
                            id="supplier"
                            required
                            value={this.state.supplier}
                            onChange={this.onChangeSupplier}
                            name="supplier"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">stock</label>
                        <input
                            type="text"
                            className="form-control"
                            id="stock"
                            required
                            value={this.state.stock}
                            onChange={this.onChangeStock}
                            name="stock"
                        />
                    </div>

                    <button className="btn btn-primary" onClick={this.saveTutorial}>Post product</button>

                   </div>
               )} 
            </div>
        )
    }
}


