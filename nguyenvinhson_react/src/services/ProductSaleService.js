import httpAxios from "./httpAxios";

const ProductSaleService = {
  // Lấy danh sách product sales
  index: async () => {
    return await httpAxios.get(`productsale`);
  },

  // Lấy thông tin chi tiết của một product sale theo ID
  show: async (id) => {
    return await httpAxios.get(`productsale/show/${id}`);
  },

 // Thay đổi trạng thái của một product (kích hoạt/vô hiệu)
 status: async (id) => {
  return await httpAxios.get(`productsale/status/${id}`);
},

  // Thêm mới một product sale
  create: async (data) => {
    return await httpAxios.post(`productsale/store`, data);
  },

  // Cập nhật thông tin một product sale theo ID
  update: async (id, data) => {
    return await httpAxios.post(`productsale/update/${id}`, data);
  },

  // Xóa một product sale theo ID (chuyển vào thùng rác)
  delete: async (id) => {
    return await httpAxios.get(`productsale/delete/${id}`);
  },

  // Khôi phục một product sale từ thùng rác
  restore: async (id) => {
    return await httpAxios.get(`productsale/restore/${id}`);
  },

  // Xóa hẳn một product sale
  destroy: async (id) => {
    return await httpAxios.delete(`productsale/destroy/${id}`);
  }
};

export default ProductSaleService;
