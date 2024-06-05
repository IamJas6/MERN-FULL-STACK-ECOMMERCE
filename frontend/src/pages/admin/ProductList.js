import axios from "axios"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import ProfileMenu from "../../modules/components/Profilemenu"
import { Link } from "react-router-dom"

const ProductList = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const getProducts = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/product`)
            if (response && response.data) {
                const { products } = response.data.data
                setProducts(products)
            }
        } catch (error) {
            toast.error("error, try again")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getProducts()
    },[])

    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>Products</h2>
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
                    <Link to="/admin/product/form" className="btn btn-dark float-end">Create</Link>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.length > 0 && products.map((item, key)=>(
                                    <tr key={key}>
                                        <td>{key+1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <img src={`${process.env.REACT_APP_BACKEND_API}${item.image}`} width={40} />
                                        </td>
                                        <td>{item.category.name}</td>
                                        <td>{item.pricePerQuantity}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.createdAt}</td>
                                        <td>
                                            <Link className="btn btn-sm btn-dark" to={`/admin/product/form/${item._id}`}>Edit</Link>
                                        </td>
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

export default ProductList