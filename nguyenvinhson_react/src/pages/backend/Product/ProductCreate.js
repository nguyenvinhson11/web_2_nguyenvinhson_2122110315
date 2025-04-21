import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import BrandService from "../../../services/BrandService";
import ProductService from "../../../services/ProductService";

const ProductCreate = () => {
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priceSale, setPriceSale] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [error, setError] = useState("");

  // dropdown data
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // load categories và brands khi mở form
    (async () => {
      try {
        const cats = await CategoryService.index();
        setCategories(cats );
        const brs = await BrandService.index();
        setBrands(brs); // nếu trả về $values hoặc mảng trực tiếp
      } catch (err) {
        console.error("Lỗi tải danh mục/brand:", err);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !price || !categoryId || !brandId) {
      setError("Vui lòng điền đủ các trường bắt buộc.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Price", price);
      if (priceSale)     formData.append("PriceSale", priceSale);
      if (description)   formData.append("Description", description);
      formData.append("CategoryId", categoryId);
      formData.append("BrandId", brandId);
      if (thumbnailFile) formData.append("ThumbnailFile", thumbnailFile);

      await ProductService.create(formData);
      alert("Tạo sản phẩm thành công!");
      navigate("/admin/product");
    } catch (err) {
      console.error("Lỗi khi tạo sản phẩm:", err);
      setError("Có lỗi xảy ra, thử lại sau.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
    {/* Tiêu đề & Nút hành động */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-extrabold text-green-700 uppercase tracking-wide">
        🛍️ Thêm sản phẩm
      </h1>
      <div className="flex gap-3">
        <button
          type="submit"
          form="productForm"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow"
        >
          💾 Lưu
        </button>
        <Link
          to="/admin/product"
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded shadow"
        >
          ❌ Hủy
        </Link>
      </div>
    </div>
  
    {/* Hiển thị lỗi nếu có */}
    {error && (
      <div className="mb-4 text-red-600 font-medium">
        {error}
      </div>
    )}
  
    {/* Form nhập liệu */}
    <form id="productForm" onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Tên sản phẩm */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700">
          Tên sản phẩm <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
  
      {/* Giá gốc & Khuyến mãi */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Giá gốc <span className="text-red-500">*</span></label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Giá khuyến mãi</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={priceSale}
            onChange={(e) => setPriceSale(e.target.value)}
          />
        </div>
      </div>
  
      {/* Mô tả */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700">Mô tả</label>
        <textarea
          className="w-full border rounded p-2"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
  
      {/* Danh mục & Thương hiệu */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Danh mục <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border rounded p-2"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Thương hiệu <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border rounded p-2"
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            required
          >
            <option value="">-- Chọn thương hiệu --</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>
  
      {/* Ảnh thumbnail */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700">Ảnh thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnailFile(e.target.files[0])}
        />
      </div>
    </form>
  </div>
  
  );
};

export default ProductCreate;
