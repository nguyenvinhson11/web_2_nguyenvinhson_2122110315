// src/services/OrderService.js
import httpAxios from "./httpAxios";

const OrderService = {
  // Tạo đơn hàng
  create: async (data) => {
    return await httpAxios.post("order", data);
  },

  // Lấy danh sách tất cả đơn hàng
  getAll: async () => {
    return await httpAxios.get("order");
  },

  // Lấy chi tiết đơn hàng theo ID
  getById: async (id) => {
    return await httpAxios.get(`order/${id}`);
  },

  // Cập nhật đơn hàng
  update: async (id, data) => {
    return await httpAxios.put(`order/${id}`, data);
  },

  // Xóa mềm đơn hàng
  delete: async (id) => {
    return await httpAxios.delete(`order/${id}`);
  },

  // Khôi phục đơn hàng đã xóa mềm
  restore: async (id) => {
    return await httpAxios.put(`order/restore/${id}`);
  },

  // Xóa vĩnh viễn đơn hàng
  destroy: async (id) => {
    return await httpAxios.delete(`order/destroy/${id}`);
  }
};

export default OrderService;
