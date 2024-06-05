import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"

const Login = () => {

    const navigation = useNavigate()

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)

    const inputChangeHandle = (e) => {
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
                email: data.email,
                pass: data.pass,
            }

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/user/login`, reqObj);
            if (response && response.data) {
                const { userinfo, token } = response.data.data
                localStorage.setItem("userinfo", JSON.stringify(userinfo))
                localStorage.setItem("token", token.token)
                navigation('/profile')
            }
        } catch (error) {
            toast.error("Incorrect Email or Password, Try again");
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
                    <h2>Login Page</h2>
                </div>
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
                    <label className="form-label">Email</label>
                    <input className="form-control" type="email" name="email" value={data.email} onChange={(e) => inputChangeHandle(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password" name="pass" value={data.pass} onChange={(e) => inputChangeHandle(e)} />
                </div>
                <button type="button" className="btn btn-dark" onClick={() => actionSubmit()}>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login