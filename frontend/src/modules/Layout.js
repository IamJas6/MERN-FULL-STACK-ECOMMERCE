import React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            <div className="app-header">
                <Header />
            </div>
            <div className="app-body">
                <Outlet />
            </div>
            <div className="app-footer">
                <Footer />
            </div>
        </div>
    )
}

export default Layout