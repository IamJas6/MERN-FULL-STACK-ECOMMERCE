import ProfileMenu from "../../modules/components/Profilemenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {

    const navigation = useNavigate()
    const {productId} = useParams()

    const [ loading, setLoading ] = useState(false)
    const [categories, setCategories] = useState([])
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "",
        quantity: "",
        pricePerQuantity: "",
        image: null
    })
    const [error, setError] = useState({
        name: "",
        description: "",
        category: "",
        quantity: "",
        pricePerQuantity: "",
        image: null
    })

    const inputChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    
    const fileChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.files[0]
        })
    }

    const getCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/category`)
            if (response && response.data) {
                const { categories } = response.data.data
                setCategories(categories)
            }
        } catch (error) {
            toast.error("error, try again")
        }
    }

    const validate = (formData) => {
        let isValid =  true

        const errors = {
            name: "",
            description: "",
            category: "",
            quantity: "",
            pricePerQuantity: "",
            image: null
        }
        if(!formData.name){
            isValid = false
            errors.name = "Enter Name"
        }
        if(!formData.description){
            isValid = false
            errors.description = "Enter Description"
        }
        if(!formData.category){
            isValid = false
            errors.category = "Select Category"
        }
        if(!formData.quantity){
            isValid = false
            errors.quantity = "Min Quantity Is 1"
        }
        if(!formData.pricePerQuantity){
            isValid = false
            errors.pricePerQuantity = "Min Price Should Be 1"
        }
        if(!formData.image){
            isValid = false
            errors.image = "Upload Image"
        }
        setError({...errors})
        return isValid
    }

    const actionProductCreate = async () => {
        if (validate(data)) {
            try {
                setLoading(true)
                const formData = new FormData()
                formData.append("name",data.name)
                formData.append("description",data.description)
                formData.append("category",data.category)
                formData.append("quantity",data.quantity)
                formData.append("pricePerQuantity",data.pricePerQuantity)
                formData.append("image",data.image)

                const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/product`, formData, {
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type' : 'multipart/form-data'
                    }
                })
                if(response && response.data){
                    const { mssg } = response.data
                    toast.success(mssg)
                    navigation('/admin/products')
                }

            } catch(error) {
                toast.error("Error, try again")
            } finally {
                setLoading(false)
            }
        }
    }

    const actionProductEdit = async (productId) => {
        try {
                const formData = new FormData()
                formData.append("name",data.name)
                formData.append("description",data.description)
                formData.append("category",data.category)
                formData.append("quantity",data.quantity)
                formData.append("pricePerQuantity",data.pricePerQuantity)
                formData.append("image",data.image)

                const response = await axios.put(`${process.env.REACT_APP_BACKEND_API}/api/product/${productId}`, formData, {
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type' : 'multipart/form-data'
                    }
                })
                if(response && response.data){
                    const { mssg } = response.data
                    toast.success(mssg)
                    navigation('/admin/products')
                }
        } catch (error) {
            toast.error("Error, try again")
        }
    }

    const actionSubmit = () => {
        if(productId){
            actionProductEdit(productId)
        } else {
            actionProductCreate()
        }
    }

    const getProductDetails = async (productId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/product/${productId}`)
            if(response && response.data){
                const { productinfo } = response.data.data
                setData({
                    ...data,
                    name: productinfo.name,
                    description: productinfo.description,
                    category: productinfo.category._id,
                    quantity: productinfo.quantity,
                    pricePerQuantity: productinfo.pricePerQuantity,
                    image: productinfo.image
                })
            }
        } catch (error) {
            toast.error("Error, try again")
        }
    }

    useEffect(() => {
        getCategories()
        if(productId){
            getProductDetails(productId)
        }
    },[])

    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>{productId ? "Edit" : "Create" } Products</h2>
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
                        <form>
                        <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input className="form-control" name="name" type="text" value={data.name} onChange={(e) => inputChangeHandler(e)} />
                                {error.name && <div className="text-danger">{error.name}</div>}
                            </div>
                        <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input className="form-control" name="description" type="text" value={data.description} onChange={(e) => inputChangeHandler(e)} />
                                {error.description && <div className="text-danger">{error.description}</div>}
                            </div>
                        <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select className="form-control" name="category" value={data.category} onChange={(e) => inputChangeHandler(e)}>
                                    <option>select</option>
                                    {categories && categories.length > 0 && categories.map((category, key)=>(
                                        <option value={category._id} key={key}>{category.name}</option>
                                    ))}
                                </select>
                                {error.category && <div className="text-danger">{error.category}</div>}
                            </div>
                        <div className="mb-3">
                                <label className="form-label">Quantity</label>
                                <input className="form-control" name="quantity" type="text" value={data.quantity} onChange={(e) => inputChangeHandler(e)} />
                                {error.quantity && <div className="text-danger">{error.quantity}</div>}
                            </div>
                        <div className="mb-3">
                                <label className="form-label">Price Per Quantity</label>
                                <input className="form-control" name="pricePerQuantity" type="text" value={data.pricePerQuantity} onChange={(e) => inputChangeHandler(e)} />
                                {error.pricePerQuantity && <div className="text-danger">{error.pricePerQuantity}</div>}
                            </div>
                        <div className="mb-3">
                                <label className="form-label">Image</label>
                                <input className="form-control" name="image" type="file" onChange={(e) => fileChangeHandler(e)} />
                                {error.image && <div className="text-danger">{error.image}</div>}
                            </div>
                        </form>
                        <button type="submit" className="btn btn-dark float-end" onClick={() => actionSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductForm