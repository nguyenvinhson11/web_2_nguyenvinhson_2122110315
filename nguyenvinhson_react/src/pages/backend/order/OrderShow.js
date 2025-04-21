import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderService";
import OrderDetailService from "../../../services/OrderDetailService";
import { RiArrowGoBackFill } from "react-icons/ri";

const OrderDetailList = () => {

  const BASE_IMG_URL = "http://localhost:8080/uploads/product/";

  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await OrderService.getById(orderId);
        console.log("data:", response);
        setOrder(response);
      } catch (err) {
        setError("Không thể tải đơn hàng.");
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleDelete = async (detailId) => {
    if (window.confirm("Bạn có chắc muốn xóa chi tiết đơn hàng này không?")) {
      try {
        await OrderDetailService.delete(detailId);
        setOrder((prev) => ({
          ...prev,
          orderDetails: prev.orderDetails.filter((item) => item.id !== detailId)
        }));
        alert("✅ Đã xóa chi tiết đơn hàng");
      } catch (err) {
        console.error("❌ Lỗi khi xóa chi tiết đơn hàng:", err);
        alert("Xóa thất bại!");
      }
    }
  };

  if (error) return <p className="text-red-600 text-center mt-5">{error}</p>;
  if (!order) return <p className="text-center mt-5">Đang tải dữ liệu đơn hàng...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold text-indigo-700 uppercase">
            🧾 Chi tiết đơn hàng #{order.id}
          </h2>
          <Link
            to="/admin/order"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded shadow flex items-center gap-2"
          >
            <RiArrowGoBackFill />
            Quay lại
          </Link>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg shadow-inner mb-6 space-y-2 text-gray-800">
          <p><strong>👤 Người nhận:</strong> {order.name}</p>
          <p><strong>📞 Điện thoại:</strong> {order.phone}</p>
          <p><strong>📧 Email:</strong> {order.email}</p>
          <p><strong>🏠 Địa chỉ:</strong> {order.address}</p>
          <p><strong>📝 Ghi chú:</strong> {order.note || "Không có"}</p>
          <p><strong>💳 Thanh toán:</strong> {order.paymentMethod}</p>
          <p className="text-xl font-bold text-emerald-600">
            💰 Tổng tiền: {new Intl.NumberFormat("vi-VN").format(
              order.orderDetails?.reduce((sum, item) => sum + item.price * item.quantity, 0)
            )} đ

          </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-700 mb-3">🛒 Sản phẩm trong đơn</h3>
        <div className="overflow-auto rounded-lg shadow">
          <table className="min-w-full bg-white text-sm text-gray-800">
            <thead className="bg-cyan-100 text-cyan-900">
              <tr>
                <th className="p-3 text-left border">#</th>
                <th className="p-3 text-left border">Ảnh sản phẩm</th>
                <th className="p-3 text-left border">Tên sản phẩm</th>
                <th className="p-3 text-center border">Số lượng</th>
                <th className="p-3 text-right border">Đơn giá</th>
                <th className="p-3 text-right border">Thành tiền</th>
                <th className="p-3 text-center border">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetails?.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 border">{index + 1}</td>
                  <td className="px-3 py-2 border">
                      {item.product.thumbnail ? (
                        <img
                        src={BASE_IMG_URL + item.product.thumbnail}
                          alt={item.product.name}
                          className="h-16 w-16 object-cover rounded shadow"
                        />
                      ) : (
                        <span className="text-gray-400 italic">Không có ảnh</span>
                      )}
                    </td>
                  <td className="p-3 border">{item.product?.name || "(Không có tên)"}</td>
                  <td className="p-3 text-center border">{item.quantity}</td>
                  <td className="p-3 text-right border">
                    {new Intl.NumberFormat("vi-VN").format(item.price)} đ
                  </td>
                  <td className="p-3 text-right border font-medium text-emerald-600">
                    {new Intl.NumberFormat("vi-VN").format(item.price * item.quantity)} đ
                  </td>
                  <td className="p-3 text-center border space-x-1">
                    <Link
                      to={`/admin/order/show/${orderId}/update/${item.id}`}
                      className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded shadow"
                      title="Sửa"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow"
                      title="Xóa"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailList;