import React, { useEffect, useState } from "react"
import axios from 'axios'
import Product from "../modules/components/Product"

const Products = () => {

    const [products, setProducts] = useState([])

    //API Calling
    const getProducts = async () => {
        const response = await axios.get('http://localhost:3001/api/product')
        if(response && response.data){
            console.log("response:",response.data)
            const items = response.data.data.products
            setProducts(items)
        }
        
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>Product listing Page</h2>
                </div>
                <div className="product-listing">
                <div className="row">
                    {products && products.length>0 && products.map((item, key)=>(
                        <div className="col-md-3 my-4" key={key}>
                            <Product item={item} />
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    )
}

export default Products