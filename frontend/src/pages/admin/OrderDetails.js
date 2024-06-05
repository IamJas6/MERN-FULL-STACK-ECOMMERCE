import axios from "axios"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import ProfileMenu from "../../modules/components/Profilemenu"
import { useParams } from "react-router-dom"


const statusItems = ['Initiated', 'Pending', 'Processing', 'Completed', 'Cancelled']

const OrderDetails = () => {

    const { orderId } = useParams()

    const [loading, setLoading] = useState(false)

    const [orderInfo, setOrderInfo] = useState(null)

    const [status, setStatus] = useState('')

    const getOrderInfo = async (orderId) => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/order/${orderId}`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response && response.data) {
                const { orderInfo } = response.data.data
                setOrderInfo(orderInfo)
                setStatus(orderInfo.status)
            }
        } catch (error) {
            toast.error("Error, try again")
        } finally {
            setLoading(false)
        }
    }

    const updateOrderStatus = async () => {
        try {
            const reqObj = {status}
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_API}/api/order/${orderId}`,reqObj, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response && response.data) {
                const { mssg } = response.data
                toast.success(mssg)
            }
        } catch (error) {
            toast.error("Error, try again")
        }
    }

    const inputChangeHandler = (e) => {
        setStatus(e.target.value)
    }

    useEffect(()=>{
        if(orderId){
            getOrderInfo(orderId)
        }
    },[])

    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>Order Details</h2>
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
                        <h4>Address:</h4><div>
                            {orderInfo && 
                            <>
                            <p>{orderInfo.firstname} {orderInfo.secondname}</p>
                            <p>{orderInfo.address}, {orderInfo.address2},</p>
                            <p>{orderInfo.city}, {orderInfo.state}, {orderInfo.zip}</p>
                            </>
                            }
                        </div>
                        <hr/>
                        <h4>Products:</h4>
                    <table className="table">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Product</th>
                                    <th>Image</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            {orderInfo && orderInfo.products && orderInfo.products.length > 0 && orderInfo.products.map((item, key) => (
                                <tr key={key}>
                                    <td>{key + 1}</td> 
                                    <td>{item.product.name}</td>
                                    <td>
                                        <img src={`${process.env.REACT_APP_BACKEND_API}${item.product.image}`} width={80} />
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4}><strong>Total</strong></td>
                                <td><strong>{orderInfo ? orderInfo.totalAmount : 0}</strong></td>
                            </tr>
                        </table>
                        <hr/>
                        <h4>Status:</h4>
                        <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select className="form-control" name="status" value={status} onChange={(e) => inputChangeHandler(e)}>
                                    <option>select</option>
                                    {statusItems.map((item, key)=>(
                                        <option key={key} value={item}>{item}</option>
                                    ))}
                                </select>
                        <button type="button" className="btn btn-dark float-end mt-3" onClick={() => updateOrderStatus()}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails