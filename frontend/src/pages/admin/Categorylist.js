import axios from "axios"
import { toast } from "react-toastify"
import { useState, useEffect } from "react"
import ProfileMenu from "../../modules/components/Profilemenu"
import { Link } from "react-router-dom"

const CategoryList = () => {
    const [categories, setCategories] = useState([])

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
    useEffect(() => {
        getCategories()
    },[])

    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>Categories</h2>
                </div><br/>
                <div className="row">
                    <div className="col-md-4">
                        <ProfileMenu />
                    </div>
                    <div className="col-md-8">
                        <Link to="/admin/category/form" className="btn btn-dark float-end">Create</Link>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories && categories.length > 0 && categories.map((item, key)=>(
                                    <tr key={key}>
                                        <td>{key+1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <img src={item.logo} width={40} />
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

export default CategoryList