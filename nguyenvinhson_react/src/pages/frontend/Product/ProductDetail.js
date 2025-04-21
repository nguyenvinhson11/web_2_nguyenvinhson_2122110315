import React, { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import ProductService from "../../../../src/services/ProductService";
import { LiaCartPlusSolid } from "react-icons/lia";
import { PiEye } from "react-icons/pi";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { updateCartCount } = useOutletContext();

  const urlImage = "http://localhost:8080/uploads/product/";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ProductService.show(id);
        setProduct(res);
      } catch (err) {
        console.error("Lỗi tải chi tiết sản phẩm:", err);
      }
    };
    fetchProduct();
  }, [id]);



  useEffect(() => {
    const fetchRelated = async () => {
      if (product?.categoryId) {
        try {
          const res = await ProductService.getRelatedProducts(product.categoryId, product.id);
          setRelatedProducts(res.products ?? []);
        } catch (err) {
          console.error("Lỗi tải sản phẩm liên quan:", err);
        }
      }
    };
    fetchRelated();
  }, [product]);

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
      updateCartCount(cartItems.length);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  if (!product) return <p className="text-center py-10">Đang tải sản phẩm...</p>;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
        ✨ Chi tiết sản phẩm
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Ảnh sản phẩm */}
        <div className="md:col-span-5 bg-white rounded-xl shadow-md p-6">
          <img
            src={urlImage + product.thumbnail}
            alt={product.name}
            className="w-auto h-80 rounded-lg object-cover border border-gray-200 shadow-sm"
          />
          <button
            className="w-full mt-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg transition-all duration-300"
            onClick={() => handleAddToCart(product)}
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="md:col-span-7">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>

          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold text-gray-800">Thương hiệu:</span>{" "}
            {product.brand?.name}
          </p>

          <div className="mb-4">
            <p className="text-2xl text-red-600 font-bold">
              Giá: {new Intl.NumberFormat("vi-VN").format(product.priceSale ?? product.price)} đ
            </p>
            {product.priceSale && (
              <p className="text-base text-gray-500 line-through">
                {new Intl.NumberFormat("vi-VN").format(product.price)} đ
              </p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">📝 Mô tả</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">⚙️ Thông số kỹ thuật</h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{product.content}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductDetail;
