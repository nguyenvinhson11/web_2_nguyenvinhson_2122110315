import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ProductService from "../../../services/ProductService";
import CategoryService from "../../../services/CategoryService";
import BrandService from "../../../services/BrandService";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const urlImage = "http://localhost:8080/uploads";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priceSale, setPriceSale] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load dropdown data
    const loadDropdowns = async () => {
      const cats = await CategoryService.index();
      setCategories(cats);
      const brs = await BrandService.index();
      setBrands(brs.$values || brs);
    };

    // Load product data
    const loadProduct = async () => {
      try {
        const data = await ProductService.show(id);
        setName(data.name);
        setPrice(data.price);
        setPriceSale(data.priceSale || "");
        setDescription(data.description || "");
        setCategoryId(data.categoryId);
        setBrandId(data.brandId);
        setThumbnailPreview(data.thumbnail); // chỉ là tên file
      } catch (error) {
        console.error("Lỗi khi load sản phẩm:", error);
        setError("Không tìm thấy sản phẩm!");
      }
    };

    loadDropdowns();
    loadProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      if (name) formData.append("Name", name);
      if (price) formData.append("Price", price);
      if (priceSale) formData.append("PriceSale", priceSale);
      if (description) formData.append("Description", description);
      if (categoryId) formData.append("CategoryId", categoryId);
      if (brandId) formData.append("BrandId", brandId);
      if (thumbnailFile) formData.append("ThumbnailFile", thumbnailFile);

      await ProductService.update(id, formData);
      alert("Cập nhật thành công!");
      navigate("/admin/product");
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      setError("Cập nhật thất bại!");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
    {/* Tiêu đề + Nút hành động */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-extrabold text-fuchsia-700 uppercase tracking-wide flex items-center gap-2">
        📝 Sửa sản phẩm
      </h1>
      <div className="flex gap-3">
        <button
          type="submit"
          form="editProductForm"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-4 py-2 rounded shadow"
        >
          ✅ Cập nhật
        </button>
        <Link
          to="/admin/product"
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded shadow"
        >
          ❌ Hủy
        </Link>
      </div>
    </div>
  
    {/* Lỗi */}
    {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}
  
    {/* Form */}
    <form id="editProductForm" onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Tên sản phẩm */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">Tên sản phẩm</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
  
      {/* Giá và giá khuyến mãi */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Giá</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Giá khuyến mãi</label>
          <input
            type="number"
            value={priceSale}
            onChange={(e) => setPriceSale(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
      </div>
  
      {/* Mô tả */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">Mô tả</label>
        <textarea
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
  
      {/* Danh mục & Thương hiệu */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Danh mục</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Thương hiệu</label>
          <select
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="">-- Chọn thương hiệu --</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>
  
      {/* Ảnh thumbnail + preview */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">Ảnh sản phẩm</label>
        {thumbnailPreview && (
          <img
            src={`${urlImage}/product/${thumbnailPreview}`}
            alt="thumbnail"
            className="w-32 h-32 object-cover rounded shadow mb-2"
          />
        )}
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

export default UpdateProduct;
