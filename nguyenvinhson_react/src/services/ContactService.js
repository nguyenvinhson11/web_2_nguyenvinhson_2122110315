import httpAxios from "./httpAxios";

const ContactService = {
  // Lấy danh sách contact
  index: async () => {
    return await httpAxios.get(`contact`);
  },

  // Lấy danh sách contact trong thùng rác
  trash: async () => {
    return await httpAxios.get(`contact/trash`);
  },

  // Hiển thị thông tin chi tiết của một contact theo ID
  show: async (id) => {
    return await httpAxios.get(`contact/show/${id}`);
  },

  // Thêm mới một contact
  create: async (data) => {
    return await httpAxios.post(`contact/insert`, data);
  },

  // Cập nhật một contact theo ID
  update: async (id, data) => {
    return await httpAxios.post(`contact/update/${id}`, data);
  },

  // Thay đổi trạng thái của một contact (kích hoạt/vô hiệu)
  status: async (id) => {
    return await httpAxios.get(`contact/status/${id}`);
  },

  // Xóa một contact theo ID (di chuyển vào thùng rác)
  delete: async (id) => {
    return await httpAxios.get(`contact/delete/${id}`);
  },

  // Khôi phục một contact từ thùng rác
  restore: async (id) => {
    return await httpAxios.get(`contact/restore/${id}`);
  },

  // Xóa hẳn một contact theo ID
  destroy: async (id) => {
    return await httpAxios.delete(`contact/destroy/${id}`);
  },
};

export default ContactService;
