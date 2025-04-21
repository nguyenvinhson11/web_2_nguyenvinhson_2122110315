import Dashboard from "../pages/backend/Dashboard";
import User from "../pages/backend/user//index";
import ContactList from "../pages/backend/contact/index";
import MenuList from "../pages/backend/menu/index";
import Product from "../pages/backend/Product";
import ProductSale from "../pages/backend/ProductSale";
import ProductStore from "../pages/backend/ProductStore";

import Banner from "../pages/backend/Banner";

import Category from "../pages/backend/category";

import Brand from "../pages/backend/brand";

import Topic from "../pages/backend/topic";

import Post from "../pages/backend/post";

import OrderDetail from "../pages/backend/OrderDetail/index";

import Order from "../pages/backend/order";


import MenuCreate from "../pages/backend/menu/menuCreate";







const RouterBackend = [
  { path: "/admin", element: <Dashboard /> },



  { path: "/admin/product", element: <Product.List /> },
  { path: "/admin/product/create", element: <Product.Create /> },
  { path: "/admin/product/update/:id", element: <Product.Update /> },
  { path: "/admin/product/show/:id", element: <Product.Show /> },



  { path: "/admin/productsale", element: <ProductSale.List /> },
  { path: "/admin/productsale/create", element: <ProductSale.Create /> },
  { path: "/admin/productsale/show/:id", element: <ProductSale.Show /> },
  { path: "/admin/productsale/update/:id", element: <ProductSale.Update /> },

  { path: "/admin/productstore", element: <ProductStore.List /> },
  { path: "/admin/productstore/create", element: <ProductStore.Create /> },
  { path: "/admin/productstore/update/:id", element: <ProductStore.Update /> },
  { path: "/admin/productstore/show/:id", element: <ProductStore.Show /> },


  { path: "/admin/banner", element: <Banner.List /> },
  { path: "/admin/banner/create", element: <Banner.Create /> },
  { path: "/admin/banner/update/:id", element: <Banner.Update /> },
  { path: "/admin/banner/show/:id", element: <Banner.Show /> },

  { path: "/admin/category", element: <Category.List /> },
  { path: "/admin/category/create", element: <Category.Create /> },
  { path: "/admin/category/update/:id", element: <Category.Update /> },
  { path: "/admin/category/show/:id", element: <Category.Show /> },

  { path: "/admin/brand", element: <Brand.List /> },
  { path: "/admin/brand/create", element: <Brand.Create /> },
  { path: "/admin/brand/show/:id", element: <Brand.Show /> }, 
  { path: "/admin/brand/update/:id", element: <Brand.Update /> },


  { path: "/admin/topic", element: <Topic.List /> },
  { path: "/admin/topic/create", element: <Topic.List /> },
  { path: "/admin/topic/show/:id", element: <Topic.Show /> },
  { path: "/admin/topic/update/:id", element: <Topic.Update /> },

  { path: "/admin/post", element: <Post.List /> },
  { path: "/admin/post/create", element: <Post.Create /> },
  { path: "/admin/post/update/:id", element: <Post.Update /> },
  { path: "/admin/post/show/:id", element: <Post.List /> },





  { path: "/admin/user", element: <User.List /> },
  { path: "/admin/user/trash", element: <User.Trash /> },

  { path: "/admin/user/create", element: <User.Create /> },
  { path: "/admin/user/update/:id", element: <User.Update /> },



  { path: "/admin/order", element: <Order.List /> },
  { path: "/admin/order/show/:orderId", element: <Order.Show /> },
  { path: "/admin/order/update/:id", element: <Order.Update /> },

  { path: "/admin/order/show/:orderId/update/:detailId" ,element: <Order.DetailUpdate /> },



  { path: "/admin/contact", element: <ContactList /> },
  { path: "/admin/menu", element: <MenuList /> },

  { path: "/admin/menu/create", element: <MenuCreate /> },

];

export default RouterBackend;
