import React, { useState, useEffect } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import AuthService from "../../services/AuthService";
const LayoutBackend = () => {
  const [open, setOpen] = useState({
    product: false,
    banhang: false
  });

  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const handleLogout = () => {
    AuthService.logout();               // xóa token + user
    navigate("/loginadmin", { replace: true });  // chuyển về login
  };

  const toggleMenu = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
       

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);

        
      } catch (error) {
        console.error("Lỗi khi load layout:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-12 h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="col-span-2 p-5 border-r border-gray-800 flex flex-col">
        <h1 className="text-xl font-bold uppercase mb-8 tracking-wider text-center text-white">🚀 Admin Panel</h1>

        {user ? (

          <div className="flex items-center mb-8">
            <img
              src={`http://localhost:8080/uploads/user/${user.avatar || "default.png"}`}
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <p className="text-base font-semibold">{user.fullName}</p>
          </div>

        ) : (

          <div className="flex items-center mb-8">
            <img
              src="/images/footer/facebook.png"
              alt="avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <p className="text-base font-semibold">Nguyễn Vinh Sơn</p>
          </div>


        )}

        {/* User Info */}


        {/* Menu */}
        <nav className="flex-1">
          <ul className="space-y-5 text-sm font-medium">
            {/* Quản lý sản phẩm */}
            <li>
              <div
                className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-800 cursor-pointer"
                onClick={() => toggleMenu("product")}
              >
                <span className="text-lg uppercase">🛒 Quản lý</span>
                <AiOutlineLeft className={`transition-transform ${open.product ? "-rotate-90" : ""}`} />
              </div>
              {open.product && (
                <ul className="pl-6 mt-1 space-y-5 text-base">
                  <li><Link to="/admin/product" className="hover:text-cyan-400 block">📦 Sản phẩm</Link></li>
                  <li><Link to="/admin/category" className="hover:text-cyan-400 block">🗂️ Danh mục</Link></li>
                  <li><Link to="/admin/brand" className="hover:text-cyan-400 block">🏷️ Thương hiệu</Link></li>
                </ul>
              )}
            </li>

            {/* Bán hàng */}
            <li>
              <div
                className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-800 cursor-pointer"
                onClick={() => toggleMenu("banhang")}
              >
                <span className="text-lg uppercase">💸 Bán hàng</span>
                <AiOutlineLeft className={`transition-transform ${open.banhang ? "-rotate-90" : ""}`} />
              </div>
              {open.banhang && (
                <ul className="pl-6 mt-1 space-y-5 text-base">
                  <li className="flex items-center justify-between">
                    <Link to="/admin/order" className="hover:text-cyan-400 block">📄 Đơn hàng</Link>

                  </li>

                  <li><Link to="/admin/user" className="hover:text-cyan-400 block">👥 Thành viên</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <footer className="mt-auto text-xs text-gray-400 pt-5 border-t border-gray-800">
          <p>Version 3.2.0</p>
          <p>&copy; 2014–2024 Nguyen Vinh Son</p>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="col-span-10 bg-gray-100 text-gray-900 overflow-y-auto">
        <div className="bg-white shadow px-6 py-3 flex justify-between items-center border-b border-gray-200">
          <div className="font-bold uppercase tracking-wide text-sm">
            <Link to="/admin" className="hover:text-indigo-600">🏠 Trang chủ</Link>
          </div>
          <button onClick={handleLogout} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm">
            <RiLogoutCircleRLine className="text-lg" />
            Đăng xuất
          </button>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LayoutBackend;
