import httpAxios from "./httpAxios";

const UserService = {
  // ✅ Lấy danh sách user (GET /api/user)
  index: async () => {
    return await httpAxios.get("user");
  },

  // ✅ Lấy danh sách user trong thùng rác (GET /api/user/trash)
  trash: async () => {
    return await httpAxios.get("user/trash");
  },

  // ✅ Lấy 1 user theo ID (GET /api/user/{id})
  show: async (id) => {
    return await httpAxios.get(`user/${id}`);
  },

  // ✅ Tạo user mới (POST /api/user) với multipart/form-data
  create: async (data) => {
    return await httpAxios.post("user", data);
    // ⚠️ KHÔNG set headers thủ công vì Axios tự xử lý multipart
  },

  // ✅ Cập nhật user theo ID (PUT /api/user/{id}) với multipart/form-data
  update: async (id, data) => {
    return await httpAxios.put(`user/${id}`, data);
  },

  // ✅ Xóa mềm user (DELETE /api/user/{id})
  delete: async (id) => {
    return await httpAxios.delete(`user/${id}`);
  },

  // ✅ Khôi phục user đã xóa (PUT /api/user/restore/{id})
  restore: async (id) => {
    return await httpAxios.put(`user/restore/${id}`);
  },

  // ✅ Xóa vĩnh viễn user (DELETE /api/user/destroy/{id})
  destroy: async (id) => {
    return await httpAxios.delete(`user/destroy/${id}`);
  },
};

export default UserService;
