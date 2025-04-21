import { useOutletContext } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { PiEye } from "react-icons/pi";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import Product3DViewer from "../../../Product3D "; // Điều chỉnh đường dẫn nếu cần

const ProductSale = () => {
  const url3D = "/product3D/";

  const urlImage =
    "http://localhost/website/nguyenvinhson_laravel/public/images/";

    // Lấy `updateCartCount` từ `useOutletContext`
  const { updateCartCount } = useOutletContext();

  const [productSale, setProductSale] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductService.productSale(4);
      setProductSale(result.products);
      console.log("Sản phẩm khuyến mãi:", result);
    };
    fetchData();
  }, []);
  console.log("Sản phẩm khuyến mãi :", productSale);

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
      <section className="product-new">
        <div className="container max-w-7xl mx-auto">
          <h1 className="text-center bg-category py-7 my-20 uppercase text-3xl font-bold text-white">
            Sản phẩm khuyến mãi
          </h1>

          <div className="grid grid-cols-12">
            {productSale.length > 0 ? (
              productSale.map((product) => (
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
                          {product.price_sale !== null && (
                            <span className="bg-main text-white px-2 py-1 text-xs rounded-full absolute top-2 right-2">
                              {Math.floor(
                                ((product.price - product.price_sale) /
                                  product.price) *
                                  100
                              )}
                              %
                            </span>
                          )}

                          <div className="product-image">
                            {hoveredProductId === product.id &&
                            product.modelPath ? (
                              <div className="model-container">
                                <Product3DViewer
                                  modelPath={url3D + product.modelPath}
                                />
                              </div>
                            ) : (
                              product.images.length > 0 && (
                                <img
                                  className="w-full mb-2"
                                  src={
                                    urlImage +
                                    "product/" +
                                    product.images[0].thumbnail
                                  }
                                  alt={`${product.name} - 0`}
                                />
                              )
                            )}
                          </div>

                          <div className="product-name my-2">
                            <strong className="text-lg py-1">
                              {product.name}
                            </strong>
                          </div>
                          <div className="product-price">
                            <div className="flex justify-between items-center">
                              <strong className="text-red-600 text-xl">
                                {new Intl.NumberFormat("vi-VN").format(
                                  product.price_sale ?? product.price
                                )}
                                đ
                              </strong>
                              {product.price_sale !== null && (
                                <del className="text-black">
                                  {new Intl.NumberFormat("vi-VN").format(
                                    product.price
                                  )}
                                  đ
                                </del>
                              )}
                            </div>
                          </div>

                          <div className="product-cart-hearth-eye mt-3">
                            <div className="flex justify-between items-center">
                              <button onClick={() => handleAddToCart(product)} className="flex items-center bg-addcard hover:bg-red-600 text-white text-sm font-bold py-1.5 px-4 rounded">
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
              ))
            ) : (
              <p className="col-span-12 text-center">
                Không có sản phẩm khuyến mãi.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSale;
