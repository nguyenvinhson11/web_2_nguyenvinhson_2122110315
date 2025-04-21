import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderService";



import {
  FaToggleOn,
  FaToggleOff,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa"; // Import các icon cần thiết
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await OrderService.getAll();
        setOrders(res);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      try {
        await OrderService.destroy(id); // gọi tới DELETE /api/User/{id}
        setOrders(orders.filter((u) => u.id !== id)); // cập nhật UI sau khi xóa
        alert("✅ Đã xóa ");
      } catch (error) {
        console.error("❌ Lỗi khi xóa user:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-fuchsia-100 to-pink-100 p-5 min-h-screen">
        {/* Header */}
        <div className="content flex items-center justify-between px-4 py-5 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-t-lg shadow">
          <h1 className="uppercase text-2xl font-bold text-white tracking-wide">
            🧾 Quản lý đơn hàng
          </h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-b-lg shadow m-5">
          <table className="table-auto w-full text-sm border border-gray-300">
            <thead>
              <tr className="bg-fuchsia-700 text-white uppercase">
                <th className="w-12 px-3 py-2 border">#</th>
                <th className="px-3 py-2 border">Khách hàng</th>
                <th className="px-3 py-2 border">Tổng tiền</th>
                <th className="px-3 py-2 border">Thanh toán</th>
                <th className="px-3 py-2 border">Ngày tạo</th>
                <th className="w-56 px-3 py-2 border text-center">Chức năng</th>
                <th className="w-12 px-3 py-2 border text-center">ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={order.id} className="border-b hover:bg-pink-50 transition text-center">
                    <td className="px-3 py-2 border">{index + 1}</td>
                    <td className="px-3 py-2 border text-left">{order.name}</td>
                    <td className="px-3 py-2 border text-red-600 font-bold">
                      {new Intl.NumberFormat("vi-VN").format(order.totalAmount)} đ
                    </td>
                    <td className="px-3 py-2 border capitalize">{order.paymentMethod}</td>
                    <td className="px-3 py-2 border">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-2 border text-center space-x-1">
                      <Link
                        to={`show/${order.id}`}
                        className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-2 py-1 rounded shadow"
                        title="Xem"
                      >
                        👁️
                      </Link>
                      <Link
                        to={`update/${order.id}`}
                        className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded shadow"
                        title="Sửa"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow"
                        title="Xóa"
                      >
                        🗑️
                      </button>
                    </td>
                    <td className="px-3 py-2 border text-center">{order.id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500 italic">
                    Không có đơn hàng nào.
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

export default OrderList;
