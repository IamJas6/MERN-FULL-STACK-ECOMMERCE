import ProfileMenu from "../../modules/components/Profilemenu";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";

const CategroyForm = () => {

    const navigation = useNavigate()

    const [data, setData] = useState({
        name: "",
        image: null
    })
    const [ loading, setLoading ] = useState(false)

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

    const actionSubmit = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("image", data.image)
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/category`, formData, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type' : 'multipart/form-data'
                }
        })
        if(response && response.data){
            const { mssg } = response.data
            toast.success(mssg)
            navigation('/admin/categories')
        }
        } catch (error) {
            toast.error("Error, try again")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>Create Categories</h2>
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
                                <label className="form-label">Category Name</label>
                                <input className="form-control" name="name" type="text" value={data.name} onChange={(e) => inputChangeHandler(e) } />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image</label>
                                <input className="form-control" name="image" type="file" onChange={(e) => fileChangeHandler(e) } />
                            </div>
                        </form>
                        <button type="submit" className="btn btn-dark float-end" onClick={() => actionSubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategroyForm