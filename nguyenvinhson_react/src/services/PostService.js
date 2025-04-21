import httpAxios from "./httpAxios";

const PostService = {
  // Lấy danh sách post
  index: async () => {
    return await httpAxios.get(`post`);
  },

  // Lấy danh sách post trong thùng rác
  trash: async () => {
    return await httpAxios.get(`post/trash`);
  },

  // Hiển thị thông tin chi tiết của một post theo ID
  show: async (id) => {
    return await httpAxios.get(`post/show/${id}`);
  },

  // Thêm mới một post
  create: async (data) => {
    return await httpAxios.post(`post/store`, data);
  },

  // Cập nhật một post theo ID
  update: async (id, data) => {
    return await httpAxios.post(`post/update/${id}`, data);
  },

  // Thay đổi trạng thái của một post (kích hoạt/vô hiệu)
  status: async (id) => {
    return await httpAxios.get(`post/status/${id}`);
  },

  // Xóa một post theo ID (di chuyển vào thùng rác)
  delete: async (id) => {
    return await httpAxios.get(`post/delete/${id}`);
  },

  // Khôi phục một post từ thùng rác
  restore: async (id) => {
    return await httpAxios.get(`post/restore/${id}`);
  },

  // Xóa hẳn một post theo ID
  destroy: async (id) => {
    return await httpAxios.delete(`post/destroy/${id}`);
  },


   // Hiển thị thông tin chi tiết của một post theo ID
   PostDetail: async (id) => {
    return await httpAxios.get(`post/show/${id}`);
  },
};

export default PostService;
