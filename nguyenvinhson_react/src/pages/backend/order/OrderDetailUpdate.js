import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import OrderDetailService from "../../../services/OrderDetailService";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const OrderDetailEdit = () => {
    const { orderId, detailId } = useParams();

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await OrderDetailService.getById(detailId);
        setQuantity(data.quantity);
        setPrice(data.price);
        setNote(data.note || "");
      } catch (err) {
        console.error("❌ Lỗi khi lấy chi tiết đơn hàng:", err);
        setError("Không tìm thấy chi tiết đơn hàng.");
      }
    };
    fetchDetail();
  }, [detailId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await OrderDetailService.update(detailId, {
        quantity,
        price,
        note,
      });
      alert("✅ Cập nhật thành công!");
      navigate(`/admin/order/show/${orderId}`);

    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      alert("Cập nhật thất bại!");
    }
  };

  if (error) return <p className="text-red-600 text-center mt-5">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">✏️ Sửa chi tiết đơn hàng #{detailId}</h2>
        <Link
          to={-1}
          className="flex items-center text-gray-600 hover:text-black"
        >
          <FaArrowLeft className="mr-1" /> Quay lại
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block font-medium mb-1">Số lượng</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min={1}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Đơn giá</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            min={0}
            step={1000}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ghi chú</label>
          <textarea
            className="w-full p-2 border rounded"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </div>

        <div className="text-right">
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

export default OrderDetailEdit;
