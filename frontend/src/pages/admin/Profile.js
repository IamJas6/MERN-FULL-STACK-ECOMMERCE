import { useState, useEffect } from "react"
import ProfileMenu from "../../modules/components/Profilemenu"
import {toast} from "react-toastify"
import axios from "axios"

const AdminProfile = () => {
    const [loading, setLoading] = useState(false)
    const [userinfo, setUserInfo] = useState('')

    const getUserInfo = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/user`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response); // Add this line to debug

            if(response && response.data) {
                const {userinfo} = response.data.data
                setUserInfo(userinfo)
            }
        } catch(error) {
            toast.error("Error, try again")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getUserInfo()
    },[])

    let Role = ""
    if(userinfo.role == 1){
        Role = "Admin"
    }

    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>Admin Profile</h2>
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
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td>{userinfo._id}</td>
                                        <td>{userinfo.name}</td>
                                        <td>{userinfo.email}</td>
                                        <td>{Role}</td>
                                        <td>{userinfo.createdAt}</td>
                                        <td>{userinfo.updatedAt}</td>
                                    </tr>
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AdminProfile