import httpAxios from "./httpAxios";

const brandService = {
  // 📦 Lấy danh sách thương hiệu
  index: async () => {
    return await httpAxios.get("brand");
  },

  // 🔍 Lấy thông tin 1 thương hiệu
  show: async (id) => {
    return await httpAxios.get(`brand/${id}`);
  },

  // ➕ Tạo mới thương hiệu
  create: async (data) => {
    return await httpAxios.post("brand", data);
  },

  // ✏️ Cập nhật thương hiệu
  update: async (id, data) => {
    return await httpAxios.put(`brand/${id}`, data);
  },

  // 🗑️ Xóa mềm
  delete: async (id) => {
    return await httpAxios.delete(`brand/${id}`);
  },

  // ♻️ Khôi phục thương hiệu
  restore: async (id) => {
    return await httpAxios.put(`brand/restore/${id}`);
  },

  // ❌ Xóa vĩnh viễn thương hiệu
  destroy: async (id) => {
    return await httpAxios.delete(`brand/destroy/${id}`);
  },
};

export default brandService;
