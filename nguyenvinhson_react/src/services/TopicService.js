import httpAxios from "./httpAxios";

const TopicService = {
  // Lấy danh sách topic
  index: async () => {
    return await httpAxios.get(`topic`);
  },

  // Lấy danh sách topic trong thùng rác
  trash: async () => {
    return await httpAxios.get(`topic/trash`);
  },

  // Hiển thị thông tin chi tiết của một topic theo ID
  show: async (id) => {
    return await httpAxios.get(`topic/show/${id}`);
  },

  // Thêm mới một topic
  create: async (data) => {
    return await httpAxios.post(`topic/store`, data);
  },

  // Cập nhật một topic theo ID
  update: async (id, data) => {
    return await httpAxios.post(`topic/update/${id}`, data);
  },

  // Thay đổi trạng thái của một topic (kích hoạt/vô hiệu)
  status: async (id) => {
    return await httpAxios.get(`topic/status/${id}`);
  },

  // Xóa một topic theo ID (di chuyển vào thùng rác)
  delete: async (id) => {
    return await httpAxios.get(`topic/delete/${id}`);
  },

  // Khôi phục một topic từ thùng rác
  restore: async (id) => {
    return await httpAxios.get(`topic/restore/${id}`);
  },

  // Xóa hẳn một topic theo ID
  destroy: async (id) => {
    return await httpAxios.delete(`topic/destroy/${id}`);
  }
};

export default TopicService;
