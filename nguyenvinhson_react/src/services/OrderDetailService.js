import httpAxios from "./httpAxios";

const OrderDetailService = {
  // Lấy tất cả chi tiết đơn hàng
  getAll: async () => {
    return await httpAxios.get("order-detail");
  },

  // Lấy chi tiết đơn hàng theo ID
  getById: async (id) => {
    return await httpAxios.get(`order-detail/${id}`);
  },

  // Tạo mới một chi tiết đơn hàng
  create: async (data) => {
    return await httpAxios.post("order-detail", data);
  },

  // Cập nhật chi tiết đơn hàng
  update: async (id, data) => {
    return await httpAxios.put(`order-detail/${id}`, data);
  },

  // Xóa mềm chi tiết đơn hàng
  delete: async (id) => {
    return await httpAxios.delete(`order-detail/${id}`);
  },

  // Khôi phục chi tiết đơn hàng
  restore: async (id) => {
    return await httpAxios.put(`order-detail/restore/${id}`);
  },

  // Xoá vĩnh viễn chi tiết đơn hàng
  destroy: async (id) => {
    return await httpAxios.delete(`order-detail/destroy/${id}`);
  }
};

export default OrderDetailService;
