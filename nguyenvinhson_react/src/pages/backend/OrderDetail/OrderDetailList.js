import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderService from "../../../services/OrderService";

const OrderDetailList = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await OrderService.getById(id);
        setOrder(response);
      } catch (err) {
        setError("Không thể tải đơn hàng.");
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      }
    };
    fetchOrder();
  }, [id]);

  if (error) {
    return <p className="text-red-600 text-center mt-5">{error}</p>;
  }

  if (!order) {
    return <p className="text-center mt-5">Đang tải dữ liệu đơn hàng...</p>;
  }

  return (
    <div className="container max-w-5xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Chi tiết đơn hàng #{order.id}</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p><strong>Người nhận:</strong> {order.name}</p>
        <p><strong>Điện thoại:</strong> {order.phone}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Địa chỉ:</strong> {order.address}</p>
        <p><strong>Ghi chú:</strong> {order.note}</p>
        <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
        <p><strong>Tổng tiền:</strong> {new Intl.NumberFormat("vi-VN").format(order.totalAmount)} đ</p>
      </div>

      <h3 className="text-xl font-bold mb-2">Danh sách sản phẩm</h3>
      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Tên sản phẩm</th>
              <th className="p-2 border">Số lượng</th>
              <th className="p-2 border">Giá</th>
              <th className="p-2 border">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.orderDetails?.map((item, index) => (
              <tr key={item.id} className="text-center border-t">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{item.product?.name || "(Không có tên)"}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">
                  {new Intl.NumberFormat("vi-VN").format(item.price)} đ
                </td>
                <td className="p-2 border">
                  {new Intl.NumberFormat("vi-VN").format(item.price * item.quantity)} đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailList;