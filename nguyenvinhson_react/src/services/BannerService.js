import httpAxios from "./httpAxios";

const BannerService = {
  // Lấy danh sách banner
  index: async () => {
    return await httpAxios.get(`banner`);
  },

  // Lấy danh sách banner trong thùng rác
  trash: async () => {
    return await httpAxios.get(`banner/trash`);
  },

  // Hiển thị thông tin chi tiết của một banner theo ID
  show: async (id) => {
    return await httpAxios.get(`banner/show/${id}`);
  },

  // Thêm mới một banner
  create: async (data) => {
    return await httpAxios.post(`banner/store`, data);
  },

  // Cập nhật một banner theo ID
  update: async (id, data) => {
    return await httpAxios.post(`banner/update/${id}`, data);
  },

  // Thay đổi trạng thái của một banner (kích hoạt/vô hiệu)
  status: async (id) => {
    return await httpAxios.post(`banner/status/${id}`);
  },

  // Xóa một banner theo ID (di chuyển vào thùng rác)
  delete: async (id) => {
    return await httpAxios.get(`banner/delete/${id}`);
  },

  // Khôi phục một banner từ thùng rác
  restore: async (id) => {
    return await httpAxios.get(`banner/restore/${id}`);
  },

  // Xóa hẳn một banner theo ID
  destroy: async (id) => {
    return await httpAxios.delete(`banner/destroy/${id}`);
  }
};

export default BannerService;
