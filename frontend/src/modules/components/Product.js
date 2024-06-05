import React from "react"
import axios from "axios"
import { toast } from "react-toastify"

const Product = (props) => {
    const { item } = props

    //add to cart api 
    const actionCart = async (productId) => {
        try {
            const reqObj = {
                productId: productId,
                quantity: 1
            }
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/cart`, reqObj, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })

            if(response && response.data){
                const { mssg } = response.data
                toast.success(mssg)
            }
            console.log("response:",response) 
        } catch (error) {
            toast.error("Add to cart error, try again")
        } 
    }

    return (
        <div className="card">
            <img src={`${process.env.REACT_APP_BACKEND_API}${item.image}`} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">Rs. {item.pricePerQuantity} /-</p>
                <button type="button" className="btn btn-dark" onClick={() => actionCart(item._id)}>Add To Cart</button>
            </div>
        </div>
    )
}

export default Product