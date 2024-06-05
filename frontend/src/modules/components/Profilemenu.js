import { Link, useNavigate } from "react-router-dom"

const ProfileMenu = () => {

    const navigator = useNavigate()
    const userinfo = JSON.parse(localStorage.getItem("userinfo"))
    const role = userinfo ? userinfo.role : 0

    const logout = () => {
        localStorage.clear()
        navigator("/products")
    }

    return (
        <div>
            {role == 1?
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/profile" className="text-dark" style={{ textDecoration: 'none'}}>Admin Profile</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/categories" className="text-dark" style={{ textDecoration: 'none'}}>Categories</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/products" className="text-dark" style={{ textDecoration: 'none'}}>Products</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/orders" className="text-dark" style={{ textDecoration: 'none'}}>Orders</Link>
                </li>
            </ul>
            :
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/profile" className="text-dark" style={{ textDecoration: 'none'}}>Profile</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/order" className="text-dark" style={{ textDecoration: 'none'}}>Orders</Link>
                </li>
            </ul>
            }
            <button className="btn btn-sm btn-dark mt-5" onClick={() => logout()}>LogOut</button>
        </div>
    )
}

export default ProfileMenu