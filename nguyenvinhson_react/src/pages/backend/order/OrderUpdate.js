import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderService";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await OrderService.getById(id);
        setOrder(data);
        setName(data.name);
        setPhone(data.phone);
        setEmail(data.email);
        setAddress(data.address);
      } catch (err) {
        console.error("❌ Không tìm thấy đơn hàng:", err);
        alert("Không tìm thấy đơn hàng");
        navigate("/admin/order");
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await OrderService.update(id, {
        ...order,
        name,
        phone,
        email,
        address,
      });
      alert("✅ Cập nhật thành công!");
      navigate("/admin/order");
    } catch (err) {
      console.error("❌ Lỗi cập nhật đơn hàng:", err);
      alert("Cập nhật thất bại!");
    }
  };

  if (!order) return <div className="p-5">⏳ Đang tải đơn hàng...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">📝 Sửa đơn hàng {id}</h1>
        <button
          onClick={() => navigate("/admin/order")}
          className="flex items-center text-gray-600 hover:text-black"
        >
          <FaArrowLeft className="mr-1" /> Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block font-medium mb-1">Họ tên</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Số điện thoại</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Địa chỉ</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="text-right mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded inline-flex items-center"
          >
            <FaSave className="mr-2" /> Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderEdit;
