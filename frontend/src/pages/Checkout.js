import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'


const Checkout = () => {
    const navigator = useNavigate()

    const [ cartProducts, setCartProducts ] = useState([])
    const [ total, setTotal ] = useState(0)
    const [ orderId, setOrderId ] = useState(null)
    const [ data, setData ] = useState({
        paymentType: "COD",
        firstname: "",
        secondname: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: ""
    })
    const [ error, setError ] = useState({
        paymentType: "",
        firstname: "",
        secondname: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: ""
    })

    const inputChangeHandle = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

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

    const validate = (formData) => {
        let isValid =  true

        const errors = {
            paymentType: "",
            firstname: "",
            secondname: "",
            address: "",
            address2: "",
            city: "",
            state: "",
            zip: ""
        }
        if(!formData.firstname){
            isValid = false
            errors.firstname = "Enter first name"
        }
        if(!formData.secondname){
            isValid = false
            errors.secondname = "Enter second name"
        }
        if(!formData.address){
            isValid = false
            errors.address = "Enter address1"
        }
        if(!formData.address2){
            isValid = false
            errors.address2 = "Enter address2"
        }
        if(!formData.city){
            isValid = false
            errors.city = "Enter city name"
        }
        if(!formData.state){
            isValid = false
            errors.state = "Enter state name"
        }
        if(!formData.zip){
            isValid = false
            errors.zip = "Enter zip code"
        }
        setError({...errors})
        return isValid
    }

    const initiateCheckout = async (data) => {
        if(validate(data)){
            //initiate checkout api call
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/checkout`, data, {
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem("token")}`
                    }
                })

                if (response && response.data){
                    const { mssg } = response.data
                    const { orderId } = response.data.data
                    setOrderId(orderId)
                    toast.success(mssg)
                }
            } catch (error) {
                toast.error("Error, try again")
            }
        } else {
            alert("Enter all form details")
        }
    }

    const confirmCheckout = async (orderId) => { 
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_API}/api/checkout/${orderId}`, {}, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })

            if(response && response.data){
                const { mssg } = response.data
                toast.success(mssg)
                navigator('/profile')
            }
        } catch (error) {
            toast.error("Error, try again")
        }
    }

    const actionCheckout = () => {
        if (orderId) {
            confirmCheckout(orderId)
        } else {
            initiateCheckout(data)
        }
    }

    useEffect(() => {
        getCarts();
    })
    
    return(
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>Checkout</h2>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form className="mx-auto row">
                            <div className="col-md-6">
                                <label className="form-label">First Name</label>
                                <input className="form-control" type="text" name="firstname" value={data.firstname} onChange={(e) => inputChangeHandle(e)} />
                                {error.firstname && <div className="text-danger">{error.firstname}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Second Name</label>
                                <input className="form-control" type="text" name="secondname" value={data.secondname} onChange={(e) => inputChangeHandle(e)} />
                                {error.secondname && <div className="text-danger">{error.secondname}</div>}
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Address 1</label>
                                <input className="form-control" type="text" name="address" value={data.address} onChange={(e) => inputChangeHandle(e)} />
                                {error.address && <div className="text-danger">{error.address}</div>}
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Address 2</label>
                                <input className="form-control" type="text" name="address2" value={data.address2} onChange={(e) => inputChangeHandle(e)} />
                                {error.address2 && <div className="text-danger">{error.address2}</div>}
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">City</label>
                                <input className="form-control" type="text" name="city" value={data.city} onChange={(e) => inputChangeHandle(e)} />
                                {error.city && <div className="text-danger">{error.city}</div>}
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">State</label>
                                <input className="form-control" type="text" name="state" value={data.state} onChange={(e) => inputChangeHandle(e)} />
                                {error.state && <div className="text-danger">{error.state}</div>}
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Zip</label>
                                <input className="form-control" type="text" name="zip" value={data.zip} onChange={(e) => inputChangeHandle(e)} />
                                {error.zip && <div className="text-danger">{error.zip}</div>}
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div className="text-center">
                            <h2>Products</h2>
                        </div>
                        <table className="table">
                            <thead align="center">
                                <tr>
                                    <th>Sl.No</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total Price</th>
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
                        <div className="my-3">
                            <strong>Payment type</strong>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="paymentType" value={"COD"} checked= {data.paymentType === "COD"} />
                                <label className="form-check-label">COD</label>
                            </div>
                        </div>
                        <div className="my-3">
                            <button className="btn btn-dark d-block w-100" type="button" onClick={() => actionCheckout()}>
                                {orderId == null ? "Checkout" : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout