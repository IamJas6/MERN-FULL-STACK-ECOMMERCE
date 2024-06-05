import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAsyncError } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

    const navigation = useNavigate()

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [userInfo, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const inputChangeHandle = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    //Api calling
    const actionSubmit = async () => {
        setLoading(true)
        

        try {
            const reqObj = {
                name: data.name,
                email: data.email,
                pass: data.pass,
            }

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/user`, reqObj);
            if (response && response.data) {
                const user = response.data.data.user
                setUser(user)
            }
        } catch (error) {
            console.error("API request error:", error);
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("token") ? true : false
        if(isLoggedIn){
            navigation('/profile')
        }
    }, [])

    return (
        <div className="my-5">
            <div className="container">
                <div className="text-center">
                    <h2>SignUp Page</h2>
                </div>
                {userInfo && 
                <div className="alert alert-dark" role="alert">
                Account Created Successfully! <Link to="/login">Click here</Link> to login
                </div>
                }
            </div>
            {loading &&
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            }

            <form className="mx-auto" style={{ width: '40%' }}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" name="name" value={data.name} onChange={(e) => inputChangeHandle(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" type="email" name="email" value={data.email} onChange={(e) => inputChangeHandle(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password" name="pass" value={data.pass} onChange={(e) => inputChangeHandle(e)} />
                </div>
                <button type="button" className="btn btn-dark" onClick={() => actionSubmit()}>
                    SignUp
                </button>
            </form>
        </div>
    )
}

export default SignUp