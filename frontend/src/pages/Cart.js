import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from "react-toastify"
import { useNavigate, Link } from 'react-router-dom'

const Cart = () => {
    const navigator = useNavigate()

    const [ cartProducts, setCartProducts ] = useState([])
    const [ total, setTotal ] = useState(0)

    const getCarts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/cart`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
        })
        if(response && response.data){
            if(response.data.data.cart){
                const { products, totalAmount } = response.data.data.cart
                setCartProducts(products)
                setTotal(totalAmount)
            } else {
                navigator("/products")
            }
        }
        } catch (error) {
            toast.error("Error, try again")
        }
    }

    const removeItem = async (productId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/api/cart/${productId}`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
        })
        if(response && response.data){
            const { mssg } = response.data
            toast.success(mssg)
            navigator("/products")
            getCarts()
        }
        } catch(error) {
            toast.error("Cannot remove item, try again")
        }
    }

    useEffect(() => {
        getCarts();
    })

    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>Cart</h2>
                </div>
                <table className="table">
                <thead align="center">
                    <tr>
                        <th>Sl.No</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Price</th>
                        <th>Delete Item</th>
                    </tr>
                </thead>
                <tbody align="center">
                    {cartProducts && cartProducts.length > 0 && cartProducts.map((item, key) => {
                        return(
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td align="justify">
                                    <img src={`${process.env.REACT_APP_BACKEND_API}${item.product.image}`} width={50} alt="item" />  {item.product.name}
                                </td>
                                <td>{item.quantity}</td>
                                <td>{item.product.pricePerQuantity}</td>
                                <td>{item.price}</td>
                                <td><button className="btn btn-sm btn-danger" onClick={() => removeItem(item.product._id)}>Remove</button></td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{total}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <Link to="/checkout" className="btn btn-dark d-block">Checkout</Link>
            </div>
            </div>
        </div>
    )
}

export default Cart