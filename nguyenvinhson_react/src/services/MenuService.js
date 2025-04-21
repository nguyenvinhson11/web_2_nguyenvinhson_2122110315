import httpAxios from "./httpAxios";

const MenuService = {
  // Lấy danh sách menu
  index: async () => {
    return await httpAxios.get(`menu`);
  },

  // Lấy danh sách menu trong thùng rác
  trash: async () => {
    return await httpAxios.get(`menu/trash`);
  },

  // Hiển thị thông tin chi tiết của một menu theo ID
  show: async (id) => {
    return await httpAxios.get(`menu/show/${id}`);
  },

  create: async (data) => {
    return await httpAxios.post('menu/store', data);
  },

  // Cập nhật một menu theo ID
  update: async (id, data) => {
    return await httpAxios.post(`menu/update/${id}`, data);
  },

  // Thay đổi trạng thái của một menu (kích hoạt/vô hiệu)
  status: async (id) => {
    return await httpAxios.get(`menu/status/${id}`);
  },

  // Xóa một menu theo ID (di chuyển vào thùng rác)
  delete: async (id) => {
    return await httpAxios.get(`menu/delete/${id}`);
  },

  // Khôi phục một menu từ thùng rác
  restore: async (id) => {
    return await httpAxios.get(`menu/restore/${id}`);
  },

  // Xóa hẳn một menu theo ID
  destroy: async (id) => {
    return await httpAxios.delete(`menu/destroy/${id}`);
  }
};

export default MenuService;
