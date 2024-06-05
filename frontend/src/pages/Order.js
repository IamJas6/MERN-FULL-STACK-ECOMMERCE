import { useState, useEffect } from "react"
import axios from "axios"
import ProfileMenu from "../modules/components/Profilemenu"
import { toast } from "react-toastify"

const Order = () => {

    const [ order, setOrders ] = useState([])

    //api calling
    const getOrders = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/order-user`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
        })
        if(response && response.data) {
            const { order } = response.data.data
            setOrders(order)
        }
        } catch (error) {
            toast.error("Error, try again")
        }
    }

    useEffect(() => {
        getOrders();
    }, [])


    const overallTotalAmount = order.reduce((acc, prod) => acc + prod.totalAmount, 0);

    return(
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>Your Orders</h2>
                </div><br/>
                <div className="row">
                    <div className="col-md-4">
                        <ProfileMenu />
                    </div>
                    <div className="col-md-8">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Order Id</th>
                                    <th>Product</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order && order.length > 0 && order.map((prod, key) => (
                                    <tr key={key}>
                                        <td>{key+1}</td>
                                        <td>{prod._id}</td>
                                            <td>
                                                {prod.products && prod.products.length > 0 && prod.products.map((item, idx) => (
                                                    <div key={idx}>
                                                    <img src={`${process.env.REACT_APP_BACKEND_API}${item.product.image}`} width={50} alt="item" /> <br/>
                                                    {item.product.name}
                                                    </div>
                                                ))}
                                            </td>
                                        <td>{prod.paymentType}</td>
                                        <td>{prod.status}</td>
                                        <td>{prod.totalAmount}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="5"><strong>Total</strong></td>
                                    <td><strong>{overallTotalAmount}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order