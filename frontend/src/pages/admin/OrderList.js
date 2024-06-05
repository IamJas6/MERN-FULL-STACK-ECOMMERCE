import axios from "axios"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import ProfileMenu from "../../modules/components/Profilemenu"
import { Link } from "react-router-dom"

const OrderList = () => {

    const [orders, setOrders] = useState([])
    const [ loading, setLoading ] = useState(false)

    const getOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/order`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response && response.data) {
                const {orders} = response.data.data
                setOrders(orders)
            }
        } catch (error) {
            toast.error("Error, try again")
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=>{
        getOrders() 
    },[])

    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>Orders</h2>
                    {loading &&
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-dark" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    }
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
                                    <th>User</th>
                                    <th>Products</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Payment</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.length > 0 && orders.map((item, key) => (
                                    <tr key={key}>
                                        <td>{key+1}</td>
                                        <td>
                                            <p>{item.user.name}</p>
                                            <p>{item.user.email}</p>
                                        </td>
                                        <td>
                                            {item.products.length > 0 && item.products.map((prod, idx) => (
                                                <p key={idx}>{prod.product.name} | qty:{prod.quantity} | Rs.{prod.price}/-</p>
                                            ))}
                                        </td>
                                        <td>
                                            <p>{item.firstname} {item.secondname}</p>
                                            <p>{item.address}, {item.address2}</p>
                                            <p>{item.city}, {item.state}, {item.zip}</p>
                                        </td>
                                        <td>{item.status}</td>
                                        <td>{item.paymentType}</td>
                                        <td>{item.totalAmount}</td>
                                        <td><Link to={`/admin/order/${item._id}`} className="btn btn-sm btn-dark">View</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderList