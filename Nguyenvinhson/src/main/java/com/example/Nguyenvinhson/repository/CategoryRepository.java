package com.example.Nguyenvinhson.repository;

import com.example.Nguyenvinhson.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByDeletedAtIsNull();
}
