import React, { useState, useEffect } from "react";
import { PiEye } from "react-icons/pi";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Link, useOutletContext } from "react-router-dom";
import ProductService from "../../../services/ProductService";

const ProductAll = () => {
 

  const [products, setProducts] = useState([]);

  const { updateCartCount } = useOutletContext();
  const urlImage = "http://localhost:8080/uploads/product/";

 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.index();

        setProducts(response);
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm flash sale:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
      updateCartCount(cartItems.length);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  return (


    <section className=" py-3">

      <div className="container max-w-7xl mx-auto">

        <h1 className="text-center bg-category py-7 my-2 mt-10 uppercase text-3xl font-bold text-white">
          Tất cả sản phẩm
        </h1>
      </div>
      <div className="container max-w-7xl mx-auto">



        <div className="grid grid-cols-12 mt-10 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="col-span-3">
                <div className="wrap">
                  <div className="in">
                    <div className="">
                      <div className="product-item flex flex-col  justify-between h-full transform hover:scale-105 transition-transform duration-300 p-3 relative bg-white shadow rounded-lg">

                        {/* Giảm giá */}
                        {product.priceSale && (
                          <span className="bg-main text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                            {Math.floor(
                              ((product.price - product.priceSale) / product.price) * 100
                            )}%
                          </span>
                        )}

                        {/* Ảnh */}
                        <div className="product-image">
                          <img
                            src={urlImage + product.thumbnail}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded mb-3"
                          />
                        </div>

                        {/* Tên */}
                        <div className="product-name my-2">
                          <strong className="text-lg">{product.name}</strong>
                        </div>

                        {/* Giá */}
                        <div className="product-price mb-2">
                          <div className="flex justify-between items-center">
                            <strong className="text-red-600 text-xl">
                              {new Intl.NumberFormat("vi-VN").format(
                                product.priceSale ?? product.price
                              )}
                              đ
                            </strong>
                            {product.priceSale !== null && (
                              <del className="text-black text-sm">
                                {new Intl.NumberFormat("vi-VN").format(product.price)}đ
                              </del>
                            )}
                          </div>
                        </div>

                        {/* Button */}
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center bg-blue-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-3 rounded"
                          >
                            <LiaCartPlusSolid className="mr-1 text-xl" />
                            Thêm vào giỏ
                          </button>

                          <Link
                            to={`/productDetail/${product.id}`}
                            className="text-white text-xl bg-main hover:bg-red-600 p-2 rounded"
                          >
                            <PiEye />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-12 text-center">Không có sản phẩm mới.</p>
          )}
        </div>



      </div>
    </section>
  );
};

export default ProductAll;