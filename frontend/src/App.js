// import Home from "./pages/Home"
import Layout from "./modules/Layout"
import { Navigate, useRoutes } from "react-router-dom";
import Home from "./pages/Home"

//customer pages
import Products from "./pages/Products"
import SignUp from "./pages/Signup";
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Order from "./pages/Order"

//admin pages
import AdminProfile from "./pages/admin/Profile"
import CategoryList from "./pages/admin/Categorylist"
import CategroyForm from "./pages/admin/Categoryform"
import ProductList from "./pages/admin/ProductList"
import ProductForm from "./pages/admin/ProductForm"
import OrderList from "./pages/admin/OrderList"
import OrderDetails from "./pages/admin/OrderDetails"


const routes = (isLoggedIn, role) => {
  return ([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "profile",
          element: checkAuth(isLoggedIn, role, <Profile />),
        },
        {
          path: "cart",
          element: checkAuth(isLoggedIn, role, <Cart />),
        },
        {
          path: "checkout",
          element: checkAuth(isLoggedIn, role, <Checkout />),
        },
        {
          path: "order",
          element: checkAuth(isLoggedIn, role, <Order />),
        },
        {
          path: "admin/profile",
          element: checkAdminAuth(isLoggedIn, role, <AdminProfile />),
        },
        {
          path: "/admin/categories",
          element: checkAdminAuth(isLoggedIn, role, <CategoryList />),
        },
        {
          path: "/admin/category/form",
          element: checkAdminAuth(isLoggedIn, role, <CategroyForm />),
        },
        {
          path: "/admin/products",
          element: checkAdminAuth(isLoggedIn, role, <ProductList />),
        },
        {
          path: "/admin/product/form",
          element: checkAdminAuth(isLoggedIn, role, <ProductForm />),
        },
        {
          path: "/admin/product/form/:productId",
          element: checkAdminAuth(isLoggedIn, role, <ProductForm />),
        },
        {
          path: "/admin/orders",
          element: checkAdminAuth(isLoggedIn, role, <OrderList />),
        },
        {
          path: "/admin/order/:orderId",
          element: checkAdminAuth(isLoggedIn, role, <OrderDetails />),
        },
      ],
    },
  ])
}

const checkAuth = (isLoggedIn, role, element) => {
  if(isLoggedIn && role == 0) {
    return element
  } else if (role != 0) {
    return <Navigate to="/" />
  } 
  return <Navigate to="/login" />
}

const checkAdminAuth = (isLoggedIn, role, element) => {
  if(isLoggedIn && role == 1) {
    return element
  } else if (role != 1) {
    return <Navigate to="/" />
  } 
  return <Navigate to="/login" />
}

function App() {

  const isLoggedIn = localStorage.getItem("token") ? true : false
  const userinfo = JSON.parse(localStorage.getItem("userinfo"))
  const role = userinfo ? userinfo.role : 0

  let appRoutes = useRoutes(routes(isLoggedIn, role));

  return appRoutes
}

export default App;
