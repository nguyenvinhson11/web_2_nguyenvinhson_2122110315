package com.example.Nguyenvinhson.repository;

import com.example.Nguyenvinhson.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
    List<Brand> findByDeletedAtIsNull(); // Lấy tất cả brand chưa bị xóa mềm
}
