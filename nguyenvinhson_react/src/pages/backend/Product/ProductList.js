import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import ProductService from "../../../services/ProductService";

const ProductList = () => {

  const BASE_IMG_URL = "http://localhost:8080/uploads/product/";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductService.index();
        console.log("data nhận được:", data)
        // Nếu có $values thì lấy và lọc bỏ phần tử không có id (tránh $ref)

        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await ProductService.destroy(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        alert("Đã xóa sản phẩm!");
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-teal-100 to-teal-200  p-5 h-screen">
        <div className="content flex items-center justify-between px-4 py-5 bg-gradient-to-r from-teal-500 to-teal-700 rounded-t-lg shadow">
          <h1 className="uppercase text-2xl font-bold text-white tracking-wide">
            📦 Quản lý sản phẩm
          </h1>
          <Link
            to="/admin/product/create"
            className="bg-white hover:bg-gray-100 text-teal-700 font-semibold px-4 py-2 rounded-md flex items-center shadow"
          >
            <IoMdAdd className="mr-2" /> Thêm sản phẩm
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow m-5">
          <table className="table-auto w-full text-sm border border-gray-300">
            <thead>
              <tr className="bg-teal-700 text-left text-white/100 uppercase">
                <th className="w-12 px-3 py-2 border">#</th>
                <th className="w-28 px-3 py-2 border">Hình</th>
                <th className="px-3 py-2 border">Tên sản phẩm</th>
                <th className="px-3 py-2 border">Danh mục</th>
                <th className="px-3 py-2 border">Thương hiệu</th>
                <th className="w-56 px-3 py-2 border text-center">Chức năng</th>
                <th className="w-12 px-3 py-2 border text-center">ID</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                    <td className="text-center px-3 py-2 border">
                      <input type="checkbox" />
                    </td>

                    <td className="px-3 py-2 border">
                      {product.thumbnail ? (
                        <img
                        src={BASE_IMG_URL + product.thumbnail}
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded shadow"
                        />
                      ) : (
                        <span className="text-gray-400 italic">Không có ảnh</span>
                      )}
                    </td>

                    <td className="px-3 py-2 border">{product.name}</td>

                    <td className="px-3 py-2 border">
                      {product.category?.name || <span className="text-gray-400">__</span>}
                    </td>

                    <td className="px-3 py-2 border">
                      {product.brand?.name || <span className="text-gray-400">__</span>}
                    </td>

                    <td className="px-4 py-2 border text-center space-x-1">
                      <Link
                        to={`show/${product.id}`}
                        className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded shadow"
                        title="Xem"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`update/${product.id}`}
                        className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded shadow"
                        title="Sửa"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow"
                        title="Xóa"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>

                    <td className="text-center px-3 py-2 border">{product.id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500 italic">
                    Không có sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>







    </>

  );
};

export default ProductList;
