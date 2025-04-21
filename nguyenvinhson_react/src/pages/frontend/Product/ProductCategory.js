import { useOutletContext } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { PiEye } from "react-icons/pi";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import ProductService from "../../../services/ProductService";

const ProductCategory = () => {
  const urlImage = "http://localhost/website/nguyenvinhson_laravel/public/images/";

  // Lấy `updateCartCount` từ `useOutletContext`
  const { updateCartCount } = useOutletContext();

  const [productCategory, setProductCategory] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductService.productCategory(4);
      setProductCategory(result.products);
    };
    fetchData();
  }, []);

  console.log("Sản phẩm theo danh mục", productCategory);

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Nếu sản phẩm đã có, tăng số lượng mà không thay đổi `cartCount`
      existingItem.quantity += 1;
    } else {
      // Nếu sản phẩm chưa có, thêm vào giỏ hàng và cập nhật `cartCount`
      cartItems.push({ ...product, quantity: 1 });
      updateCartCount(cartItems.length); // Chỉ cập nhật `cartCount` khi thêm sản phẩm mới
    }

    // Lưu lại vào localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  return (
    <>
      <section className="product-category">
        <div className="container max-w-7xl mx-auto">
          {productCategory.length > 0 ? (
            productCategory.map((category) => (
              <div key={category.id} className="category-section mb-10">
                {/* Hiển thị tên danh mục */}
                <h2 className="text-center bg-category  py-7 uppercase text-3xl font-bold text-white mb-16">
                  {category.name}
                </h2>

                <div className="grid grid-cols-12 gap-4">
                  {category.products.map((product) => (
                    <div
                      key={product.id}
                      className="col-span-3"
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                    >
                      <div className="wrap">
                        <div className="in">
                          <div className="product-card">
                            <div className="product-item transform hover:scale-105 transition-transform duration-300 p-3">
                              {product.product_sale && (
                                <span className="bg-main text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                                  {Math.floor(
                                    ((product.price - product.product_sale.price_sale) / product.price) * 100
                                  )}
                                  %
                                </span>
                              )}

                              <div className="product-image">
                                {product.images.length > 0 && (
                                  <img
                                    className="w-full mb-2"
                                    src={urlImage + "product/" + product.images[0].thumbnail}
                                    alt={`${product.name} - 0`}
                                  />
                                )}
                              </div>

                              <div className="product-name my-2">
                                <strong className="text-lg py-1">{product.name}</strong>
                              </div>
                              <div className="product-price">
                                <div className="flex justify-between items-center">
                                  <strong className="text-red-600 text-xl">
                                    {new Intl.NumberFormat("vi-VN").format(
                                      product.product_sale?.price_sale ?? product.price
                                    )}
                                    đ
                                  </strong>
                                  {product.product_sale && (
                                    <del className="text-black">
                                      {new Intl.NumberFormat("vi-VN").format(product.price)}đ
                                    </del>
                                  )}
                                </div>
                              </div>

                              <div className="product-cart-hearth-eye mt-3">
                                <div className="flex justify-between items-center">
                                  <button  onClick={() => handleAddToCart(product)}  className="flex items-center bg-addcard hover:bg-red-600 text-white text-sm font-bold py-1.5 px-4 rounded">
                                    <LiaCartPlusSolid className="mr-1 text-2xl" />
                                    <p>Thêm vào giỏ hàng</p>
                                  </button>

                                  <Link
                                to={`productDetail/${product.id}`}
                                className="text-white text-2xl rounded px-1 py-1 bg-main hover:bg-red-600"
                              >
                                <PiEye />
                              </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Không có sản phẩm mới.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductCategory;
