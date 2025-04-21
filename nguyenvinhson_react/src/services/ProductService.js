import httpAxios from "./httpAxios";

const ProductService = {
  // Lấy danh sách product
  index: async () => {
    return await httpAxios.get("product");
  },

   // 🆕 Lấy sản phẩm theo danh mục
   getByCategory: async (categoryId) => {
    return await httpAxios.get(`product/category/${categoryId}`);
  },

  // 🆕 Lấy sản phẩm theo thương hiệu
  getByBrand: async (brandId) => {
    return await httpAxios.get(`product/brand/${brandId}`);
  },

  // Lấy danh sách product đã xóa (thùng rác)
  trash: async () => {
    return await httpAxios.get("product/trash");
  },

  // Hiển thị chi tiết product theo ID
  show: async (id) => {
    return await httpAxios.get(`product/${id}`);
  },

  // Tạo mới product
  // Bố chuẩn bị sẵn data (FormData hoặc object thường) bên trang CreateProduct rồi truyền vào đây
  create: async (data) => {
    return await httpAxios.post("product", data);
    // Lưu ý: KHÔNG cần tự set headers Content-Type,
    // axios sẽ tự nhận khi data là FormData
  },

  // Cập nhật product theo ID
  update: async (id, data) => {
    return await httpAxios.put(`product/${id}`, data);
  },

  // Xóa mềm product
  delete: async (id) => {
    return await httpAxios.delete(`product/${id}`);
  },

  // Khôi phục product từ thùng rác
  restore: async (id) => {
    return await httpAxios.put(`product/restore/${id}`);
  },

  // Xóa vĩnh viễn product
  destroy: async (id) => {
    return await httpAxios.delete(`product/destroy/${id}`);
  },
};

export default ProductService;
