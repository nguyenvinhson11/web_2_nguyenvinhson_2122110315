import React, { useState, useEffect } from "react";
import MenuService from "../../../services/MenuService";
import CategoryService from "../../../services/CategoryService";
import BrandService from "../../../services/BrandService";
import { useNavigate } from "react-router-dom";

const MenuAdd = () => {
  const [menu, setMenu] = useState({
    name: "",
    link: "",
    type: "custom", // Thêm loại menu
    source: "custom", // Loại nguồn: custom, category, brand
    source_id: "", // ID của Category hoặc Brand nếu được chọn
    status: true,
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await CategoryService.index();
        setCategories(result.categorys || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const result = await BrandService.index();
        setBrands(result.brands || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await MenuService.create(menu);
      if (result.status) {
        alert("Thêm menu thành công!");
        navigate("/admin/menus");
      } else {
        alert("Thêm menu thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm menu:", error);
      setErrors(error.response?.data?.errors || {});
    }
  };

  return (
    <div className="container max-w-2xl mx-auto mt-10">
      <h1 className="text-center text-2xl font-bold mb-6">Thêm Menu Mới</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block font-bold mb-2">Tên Menu</label>
          <input
            type="text"
            name="name"
            value={menu.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Nhập tên menu"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Link</label>
          <input
            type="text"
            name="link"
            value={menu.link}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Nhập đường dẫn"
          />
          {errors.link && (
            <p className="text-red-500 text-sm mt-1">{errors.link[0]}</p>
          )}
        </div>

        

        <div className="mb-4">
          <label className="block font-bold mb-2">Kiểu</label>
          <input
            type="text"
            name="type"
            value={menu.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Nhập đường dẫn"
          />
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type[0]}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Nguồn</label>
          <select
            name="source"
            value={menu.source}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="custom">Tùy chỉnh</option>
            <option value="category">Danh mục (Category)</option>
            <option value="brand">Thương hiệu (Brand)</option>
          </select>
        </div>

        {menu.source === "category" && (
          <div className="mb-4">
            <label className="block font-bold mb-2">Chọn Danh mục</label>
            <select
              name="source_id"
              value={menu.source_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {menu.source === "brand" && (
          <div className="mb-4">
            <label className="block font-bold mb-2">Chọn Thương hiệu</label>
            <select
              name="source_id"
              value={menu.source_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Chọn thương hiệu</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block font-bold mb-2">Trạng Thái</label>
          <select
            name="status"
            value={menu.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value={0}>Chưa xuất bản</option>
            <option value={1}>Xuất bản</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Thêm Menu
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuAdd;
