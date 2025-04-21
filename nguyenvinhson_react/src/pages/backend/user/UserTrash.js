import React, { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import { FaRecycle, FaTrashRestoreAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const UserTrash = () => {
    const [users, setUsers] = useState([]);

    const fetchTrash = async () => {
        try {
            const res = await UserService.trash();
            setUsers(res.$values);
        } catch (err) {
            console.error("❌ Lỗi lấy danh sách user đã xóa:", err);
        }
    };

    useEffect(() => {
        fetchTrash();
    }, []);

    const handleRestore = async (id) => {
        if (window.confirm("Khôi phục người dùng này?")) {
            try {
                await UserService.restore(id);
                fetchTrash();
                alert("✅ Đã khôi phục!");
            } catch (err) {
                console.error("❌ Lỗi khôi phục:", err);
            }
        }
    };

    const handleForceDelete = async (id) => {
        if (window.confirm("Xóa vĩnh viễn người dùng này?")) {
            try {
                await UserService.destroy(id);
                fetchTrash();
                alert("✅ Đã xóa vĩnh viễn!");
            } catch (err) {
                console.error("❌ Lỗi xóa vĩnh viễn:", err);
            }
        }
    };

    return (
        <div className="p-8 bg-gradient-to-br from-red-100 to-white shadow-lg rounded-xl border border-red-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-red-700 tracking-wide uppercase">
            🗑️ Thùng rác người dùng
          </h1>
      
          <Link
            to="/admin/user"
            className="inline-flex items-center gap-2 bg-red-200 text-red-700 hover:bg-red-300 font-semibold px-4 py-2 rounded-lg shadow"
          >
            <MdOutlineArrowBack className="text-lg" />
            Quay lại
          </Link>
        </div>
      
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="table-auto w-full text-sm text-gray-700">
            <thead className="bg-red-50 text-left border-b border-red-200">
              <tr>
                <th className="px-4 py-3">Họ tên</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Vai trò</th>
                <th className="px-4 py-3 text-center">Chức năng</th>
                <th className="px-4 py-3 text-center">ID</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition border-b border-gray-200"
                  >
                    <td className="px-4 py-2">{user.fullName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleRestore(user.id)}
                          className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded shadow"
                          title="Khôi phục"
                        >
                          <FaTrashRestoreAlt />
                        </button>
                        <button
                          onClick={() => handleForceDelete(user.id)}
                          className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded shadow"
                          title="Xóa vĩnh viễn"
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">{user.id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                    Không có người dùng nào trong thùng rác.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    );
};

export default UserTrash;
