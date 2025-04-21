import Home from "../pages/frontend/Home";
import Product from "../pages/frontend/Product";

import Register from "../pages/frontend/Register";
import Login from "../pages/frontend/Login";

import Cart from "../pages/frontend/Cart";

import PostDetail from "../pages/frontend/PostDetail";
import Contact from "../pages/frontend/Contact";


import ProductByCategory from "../pages/frontend/Product/ProductByCategory";
import ProductByBrand from "../pages/frontend/Product/ProductByBrand";




const RouterFrontend = [

  { path: "/", element: <Home /> },
  { path: "/sanpham", element: <Product.Filter /> },

  { path: "/product/filter", element: <Product.Filter /> },
  { path: "/product/all", element: <Product.All /> },
  { path: "productDetail/:id", element: <Product.Detail /> },

  { path:"/category/:id", element: <ProductByCategory /> },
  { path:"/brand/:id", element: <ProductByBrand /> },


  { path: "/Register", element: <Register /> },

  { path: "/Login", element: <Login /> },

  { path: "/cart", element: <Cart /> },

  { path: "/postDetail/:id", element: <PostDetail /> },

  { path: "/contact", element: <Contact /> },







];

export default RouterFrontend
