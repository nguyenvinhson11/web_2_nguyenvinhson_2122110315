import React, { useEffect, useState } from "react";


import Slider from "../Banner/slider";
import Flashsale from "../Flash_Sale/flash_sale";
import ProductNew from "../Product/ProductNew";
import ProductSale from "../Product/ProductSale";
import ProductCategory from "../Product/ProductCategory";
import ProductBestSale from "../Product/ProductBestSale";
import PostList from "../PostList";
import ProductByDienThoai from "../Product/ProductByDienThoai";
import ProductByTablet from "../Product/ProductByTablet";





import ProductService from "../../../services/ProductService";


const Home = () => {






  return (
    <>
      <section className="slide-show">
        <Slider />
      </section>

      {/* <h1 className="mb-96"></h1> */}

      <section className="main">
        <section className="flash-sale">
          <Flashsale />
        </section>


        <div className="container max-w-7xl mx-auto">

          <h1 className="text-center bg-category py-7 my-2 mt-10 uppercase text-3xl font-bold text-white">
            Sản phẩm mới nhất
          </h1>
        </div>






        <ProductNew />


        <div className="container max-w-7xl mx-auto">

          <h1 className="text-center bg-category py-7 my-2 mt-10 uppercase text-3xl font-bold text-white">
            Đồng hồ cơ 
          </h1>
        </div>

        <ProductByDienThoai />


        <div className="container max-w-7xl mx-auto">

          <h1 className="text-center bg-category py-7 my-2 mt-10 uppercase text-3xl font-bold text-white">
            Đồng hồ thông minh
          </h1>
        </div>

        <ProductByTablet />

        {/* <ProductSale />





        <PostList /> */}



      </section>
    </>
  );
};

export default Home;
