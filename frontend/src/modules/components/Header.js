import React from "react"
import { Link } from "react-router-dom"

const Header = () => {

    const isLoggedIn = localStorage.getItem("token") ? true : false
    const userinfo = JSON.parse(localStorage.getItem("userinfo"))
    const role = userinfo ? userinfo.role : 0
 

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">I'M-JAS</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" to="/products">Products</Link>
                    </li>
                </ul>
                </div>
            </div>
                <div className="ml-auto">
                    <div className="navbar-nav">
                        {isLoggedIn ? 
                        <>
                        {role == 1 ?
                        <>
                        <li className="nav-item mx-1">
                            <Link to="admin/profile" className="btn btn-light btn-sm" style={{ textDecoration: 'none', color: 'black', backgroundColor: 'darkgrey' }}>
                                Profile
                            </Link>
                        </li>
                        </>
                        :
                        <>
                        <li className="nav-item mx-1">
                            <Link to="/cart" className="btn btn-light btn-sm" style={{ textDecoration: 'none', color: 'black', backgroundColor: 'darkgrey' }}>
                                Cart
                            </Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link to="/profile" className="btn btn-light btn-sm" style={{ textDecoration: 'none', color: 'black', backgroundColor: 'darkgrey' }}>
                                Profile
                            </Link>
                        </li>
                        </>
                        }
                        </>
                        :
                        <>
                            <li className="nav-item mx-1">
                                <Link to="/login" className="btn btn-light btn-sm" style={{ textDecoration: 'none', color: 'black', backgroundColor: 'darkgrey' }}>
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link to="/signup" className="btn btn-light btn-sm" style={{ textDecoration: 'none', color: 'black', backgroundColor: 'darkgrey' }}>
                                    SignUp
                                </Link>
                            </li>
                        </>
                        }
                    </div>
                </div>
        </nav>
    )
}

export default Header