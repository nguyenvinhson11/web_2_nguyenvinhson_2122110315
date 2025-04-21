import React, { useState, useEffect } from "react";
import CategoryService from "../../../services/CategoryService";
import {
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa"; // Import các icon cần thiết
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const CategoryList = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await CategoryService.index();
        console.log("data nhận được", data);
        setCategories(data);

      } catch (err) {
        console.error("Lỗi lấy danh sách category:", err);
      }
    };
    getData();





  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      try {
        await CategoryService.destroy(id); // gọi tới DELETE /api/User/{id}
        setCategories(categories.filter((u) => u.id !== id)); // cập nhật UI sau khi xóa
        alert("✅ Đã xóa ");
      } catch (error) {
        console.error("❌ Lỗi khi xóa user:", error);
      }
    }
  };

  return (
    <>

      <div className="bg-gradient-to-br from-green-100 via-lime-100 to-emerald-100 p-5 h-screen">

        <div className="bg-white p-5 rounded-lg">
          <div className=" flex items-center justify-between px-4 py-5 rounded-t-lg shadow bg-gradient-to-r from-emerald-400 to-lime-500  rounded-lg mb-6 m-5">
            <h1 className="text-3xl font-extrabold text-white uppercase tracking-wide">
              🗂️ Quản lý danh mục
            </h1>

            <Link
              to="/admin/category/create"
              className="flex items-center gap-2 bg-white text-emerald-600 hover:bg-emerald-100 font-semibold border border-emerald-500 py-2 px-4 rounded-lg shadow"
            >
              <IoMdAdd className="text-xl" />
              Thêm mới
            </Link>
          </div>

          {/* Nút thao tác */}
          <div className="flex justify-end space-x-3 mb-6 pr-2 m-5">
           

           
          </div>

          {/* Bảng danh sách */}
          <div className="overflow-x-auto bg-white rounded-lg shadow m-5">
            <table className="table-auto w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-lime-100 text-left uppercase  ">
                  <th className="px-4 py-3 border-b">Tên danh mục</th>
                  <th className="px-4 py-3 border-b">Ngày tạo</th>
                  <th className="px-4 py-3 border-b">Tạo bởi</th>
                  <th className="px-4 py-3 border-b text-center">Chức năng</th>
                  <th className="px-4 py-3 border-b text-center">ID</th>
                </tr>
              </thead>
              <tbody>
                {categories && categories.length > 0 ? (
                  categories.map((category, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 border-b">{category.name}</td>
                      <td className="px-4 py-2 border-b">
                        {new Date(category.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {category.createdByUser?.fullName ?? "Không rõ"}
                      </td>
                      <td className="px-4 py-2 border-b text-center space-x-1">
                        <Link
                          to={`show/${category.id}`}
                          className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded shadow"
                          title="Xem"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          to={`update/${category.id}`}
                          className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded shadow"
                          title="Sửa"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow"
                          title="Xóa"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                      <td className="px-4 py-2 border-b text-center">{category.id}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400 italic">
                      Không có danh mục nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>


      </div>





    </>



  );
};

export default CategoryList;
