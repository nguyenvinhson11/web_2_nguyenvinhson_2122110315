import React, { useState, useEffect } from "react";
import UserService from "../../../services/UserService";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import {
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const BASE_IMG_URL = "http://localhost:8080/uploads/user/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await UserService.index();
        console.log("kết quả: ", result);
        setUsers(result); // 👈 đảm bảo API trả về đúng định dạng
      } catch (error) {
        console.error("Lỗi load danh sách user:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      try {
        await UserService.destroy(id); // gọi tới DELETE /api/User/{id}
        setUsers(users.filter((u) => u.id !== id)); // cập nhật UI sau khi xóa
        alert("✅ Đã xóa mềm người dùng!");
      } catch (error) {
        console.error("❌ Lỗi khi xóa user:", error);
      }
    }
  };


  return (
    <>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 py-6 px-4 shadow-md rounded-lg mb-6 m-5">
        <h1 className="text-3xl font-extrabold text-white uppercase tracking-wide">
          👥 Quản lý thành viên
        </h1>
      </div>

      {/* Nút thao tác */}
      <div className="flex justify-end space-x-3 mb-6 pr-2 m-5">
        <Link
          to="/admin/user/create"
          className="flex items-center gap-2 bg-white text-cyan-600 hover:bg-cyan-100 font-semibold border border-cyan-500 py-2 px-4 rounded-lg shadow"
        >
          <IoMdAdd className="text-xl" />
          Thêm mới
        </Link>

        <Link
          to="/admin/user/trash"
          className="flex items-center gap-2 bg-red-100 text-red-600 hover:bg-red-200 font-semibold border border-red-400 py-2 px-4 rounded-lg shadow"
        >
          <FaTrashAlt className="text-sm" />
          Thùng rác
        </Link>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto bg-white rounded-lg shadow m-5">
        <table className="table-auto w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-cyan-100 text-left">
              <th className="px-4 py-3 border-b">Ảnh</th>
              <th className="px-4 py-3 border-b">Họ tên</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Điện thoại</th>
              <th className="px-4 py-3 border-b">Vai trò</th>
              <th className="px-4 py-3 border-b">Ngày tạo</th>
              <th className="px-4 py-3 border-b text-center">Chức năng</th>
              <th className="px-4 py-3 border-b text-center">ID</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border-b">
                    {user.avatar ? (
                    

                     // user.avatar là: "nguyen-vinh-son.png"
                     <img
                       src={BASE_IMG_URL + user.avatar}
                       alt={user.fullName}
                       className="w-12 h-12 rounded-full object-cover"
                     />
                     
                    ) : (
                      <span className="text-gray-400 italic">Không có ảnh</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">{user.fullName}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">{user.phone}</td>
                  <td className="px-4 py-2 border-b">{user.role || "customer"}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-2 border-b text-center space-x-1">
                    <Link
                      to={`show/${user.id}`}
                      className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded shadow"
                      title="Xem"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`update/${user.id}`}
                      className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded shadow"
                      title="Sửa"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow"
                      title="Xóa "
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b text-center">{user.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-400 italic">
                  Không có dữ liệu người dùng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>

  );
};




export default UserList;
