package com.example.Nguyenvinhson.repository;

import com.example.Nguyenvinhson.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // ✅ Đăng nhập bằng email + password
    Optional<User> findByEmailAndPassword(String email, String password);

    Optional<User> findByEmail(String email);

    // ✅ Dùng cho GET /api/user (danh sách chưa xóa)
    List<User> findByDeletedAtIsNull();

    // ✅ Dùng cho GET /api/user/trash (danh sách đã xóa)
    List<User> findByDeletedAtIsNotNull();
}
