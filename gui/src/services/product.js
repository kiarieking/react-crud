import http from '../http-common'

class ProductDataService{
    getAll(){
        return http.get("/products")
    }

    get(id){
        return http.get(`/product/${id}`)
    }

    createProduct(data){
        return http.post("/products", data)
    }

    update(id, data){
        return http.put(`/product/${id}`, data)
    }

    delete(id){
        return http.delete(`/product/${id}`)
    }

    deleteAll(){
        return http.delete("/product")
    }

    findByProductname(productname){
        return http.get(`/product/productname=${productname}`)
    }
}

export default new ProductDataService();