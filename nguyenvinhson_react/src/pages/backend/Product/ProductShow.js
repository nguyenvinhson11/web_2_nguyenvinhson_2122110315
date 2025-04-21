import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import { RiArrowGoBackFill } from "react-icons/ri";

const ProductShow = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ProductService.show(id);
        setProduct(res);
      } catch (error) {
        console.error("❌ Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto mt-5 p-1 rounded-xl bg-gradient-to-br from-emerald-100 to-lime-100 shadow">
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-emerald-700 uppercase tracking-wide">
            📦 Chi tiết sản phẩm
          </h1>
          <Link
            to="/admin/product"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded flex items-center gap-1 shadow"
          >
            <RiArrowGoBackFill />
            Quay lại
          </Link>
        </div>

        {product ? (
          <table className="w-full table-auto border text-sm text-gray-800">
            <tbody>
              <tr className="bg-gray-100">
                <td className="font-semibold border p-3 w-1/3">ID</td>
                <td className="border p-3 font-bold text-emerald-700">{product.id}</td>
              </tr>
              <tr>
                <td className="font-semibold border p-3">Tên sản phẩm</td>
                <td className="border p-3">{product.name}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-semibold border p-3">Giá</td>
                <td className="border p-3">{product.price.toLocaleString("vi-VN")}₫</td>
              </tr>
              <tr>
                <td className="font-semibold border p-3">Giá khuyến mãi</td>
                <td className="border p-3">
                  {product.priceSale
                    ? `${product.priceSale.toLocaleString("vi-VN")}₫`
                    : "Không có"}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-semibold border p-3">Mô tả</td>
                <td className="border p-3">{product.description || "Không có"}</td>
              </tr>
              <tr>
                <td className="font-semibold border p-3">Danh mục</td>
                <td className="border p-3">{product.category?.name ?? "Không rõ"}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-semibold border p-3">Thương hiệu</td>
                <td className="border p-3">{product.brand?.name ?? "Không rõ"}</td>
              </tr>
              <tr>
                <td className="font-semibold border p-3">Ảnh sản phẩm</td>
                <td className="border p-3">
                  {product.thumbnail ? (
                    <img
                      src={`http://localhost:8080/uploads/product/${product.thumbnail}`}  
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded shadow"
                    />
                  ) : (
                    <span className="text-gray-400 italic">Không có ảnh</span>
                  )}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-semibold border p-3">Người tạo</td>
                <td className="border p-3">{product.createdByUser?.fullName ?? "Không rõ"}</td>
              </tr>
              <tr>
                <td className="font-semibold border p-3">Người cập nhật</td>
                <td className="border p-3">{product.updatedByUser?.fullName ?? "Chưa từng cập nhật"}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-semibold border p-3">Người xóa</td>
                <td className="border p-3">{product.deletedByUser?.fullName ?? "Không có"}</td>
              </tr>
              <tr>
                <td className="font-semibold border p-3">Ngày tạo</td>
                <td className="border p-3">
                  {product.createdAt && new Date(product.createdAt).toLocaleString("vi-VN")}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="font-semibold border p-3">Ngày cập nhật</td>
                <td className="border p-3">
                  {product.updatedAt && new Date(product.updatedAt).toLocaleString("vi-VN")}
                </td>
              </tr>
              <tr>
                <td className="font-semibold border p-3">Ngày xóa</td>
                <td className="border p-3">
                  {product.deletedAt
                    ? new Date(product.deletedAt).toLocaleString("vi-VN")
                    : "Chưa bị xóa"}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 italic">Đang tải dữ liệu...</p>
        )}
      </div>
    </div>
  );
};

export default ProductShow;
