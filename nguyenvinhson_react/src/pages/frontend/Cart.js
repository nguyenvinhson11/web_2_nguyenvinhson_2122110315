import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import OrderService from "../../services/OrderService";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmForm, setShowConfirmForm] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const { updateCartCount } = useOutletContext();
  const navigate = useNavigate();
  const urlImage = "http://localhost:8080/uploads/product/";

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    updateCartCount(updated.reduce((total, item) => total + item.quantity, 0));
  };

  const handleQuantityChange = (id, delta) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const quantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = item.priceSale ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  const handleCheckoutClick = () => {
    const user = AuthService.getUser();
    if (!user) return navigate("/login");
    setUserInfo(user);
    setName(user.fullName || "");
    setPhone(user.phone || "");
    setEmail(user.email || "");
    setAddress(user.address || "");
    setShowConfirmForm(true);
  };

  const handleCheckout = async () => {
    if (!name || !phone || !address) return alert("❌ Vui lòng nhập đầy đủ thông tin");

    const orderData = {
      name,
      phone,
      email,
      address,
      note: "Đặt hàng từ website",
      totalAmount,
      paymentMethod: "cash",
      orderDetails: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.priceSale ?? item.price,
        note: "",
      })),
    };

    try {
      await OrderService.create(orderData);
      localStorage.removeItem("cart");
      setCartItems([]);
      updateCartCount(0);
      setShowConfirmForm(false);
      alert("✅ Đặt hàng thành công!");
    } catch (err) {
      console.error("❌ Lỗi đặt hàng:", err);
      alert("Đặt hàng thất bại!");
    }
  };

  return (
    <div className="container max-w-7xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-5">🛒 Giỏ hàng</h1>

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Hình</th>
              <th className="p-3">Sản phẩm</th>
              <th className="p-3">Giá</th>
              <th className="p-3">Số lượng</th>
              <th className="p-3">Thành tiền</th>
              <th className="p-3">Xoá</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={item.id} className="text-center border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <img
                      className="w-24 h-24 object-cover mx-auto"
                      src={`${urlImage}${item.thumbnail}`}
                      alt={item.name}
                    />
                  </td>
                  <td className="p-3 font-semibold">{item.name}</td>
                  <td className="p-3 text-red-600">
                    {new Intl.NumberFormat("vi-VN").format(item.priceSale ?? item.price)} đ
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center items-center">
                      <button onClick={() => handleQuantityChange(item.id, -1)} className="px-2 border">-</button>
                      <span className="px-3">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)} className="px-2 border">+</button>
                    </div>
                  </td>
                  <td className="p-3 font-bold">
                    {new Intl.NumberFormat("vi-VN").format(
                      (item.priceSale ?? item.price) * item.quantity
                    )} đ
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-600 hover:underline">
                      Xoá
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="text-center p-5">Giỏ hàng trống.</td></tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="text-right font-semibold p-3">Tổng cộng:</td>
              <td colSpan="2" className="font-bold p-3 text-red-600">
                {new Intl.NumberFormat("vi-VN").format(totalAmount)} đ
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {cartItems.length > 0 && (
        <div className="mt-6">
          <div className="text-right">
            <button
              onClick={handleCheckoutClick}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
            >
              ✅ Đặt hàng
            </button>
          </div>

          {showConfirmForm && (
            <div className="mt-6 p-4 border rounded bg-gray-50">
              <h2 className="text-lg font-bold mb-4">📦 Xác nhận thông tin đặt hàng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 font-medium">Họ tên người nhận</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Họ tên người nhận"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Số điện thoại</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Số điện thoại"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Địa chỉ giao hàng</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Địa chỉ giao hàng"
                  />
                </div>
              </div>

              <div className="text-right space-x-2">
                <button
                  onClick={() => setShowConfirmForm(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  ❌ Huỷ
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  ✅ Xác nhận đặt hàng
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
