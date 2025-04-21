import httpAxios from "./httpAxios";

const ProductstoreService = {
  // Lấy danh sách productstore
  index: async () => {
    return await httpAxios.get(`productstore`);
  },

  // Lấy danh sách productstore trong thùng rác
  trash: async () => {
    return await httpAxios.get(`productstore/trash`);
  },

  // Hiển thị thông tin chi tiết của một productstore theo ID
  show: async (id) => {
    return await httpAxios.get(`productstore/show/${id}`);
  },

  // Thêm mới một productstore
  create: async (data) => {
    return await httpAxios.post(`productstore/store`, data);
  },

  // Cập nhật một productstore theo ID
  update: async (id, data) => {
    return await httpAxios.productstore(`productstore/update/${id}`, data);
  },

  // Thay đổi trạng thái của một productstore (kích hoạt/vô hiệu)
  status: async (id) => {
    return await httpAxios.get(`productstore/status/${id}`);
  },

  // Xóa một productstore theo ID (di chuyển vào thùng rác)
  delete: async (id) => {
    return await httpAxios.get(`productstore/delete/${id}`);
  },

  // Khôi phục một productstore từ thùng rác
  restore: async (id) => {
    return await httpAxios.get(`productstore/restore/${id}`);
  },

  // Xóa hẳn một productstore theo ID
  destroy: async (id) => {
    return await httpAxios.delete(`productstore/destroy/${id}`);
  }
};

export default ProductstoreService;
