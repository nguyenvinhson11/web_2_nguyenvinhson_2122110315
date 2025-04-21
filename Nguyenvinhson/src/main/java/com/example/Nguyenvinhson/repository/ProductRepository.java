package com.example.Nguyenvinhson.repository;

import com.example.Nguyenvinhson.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByDeletedAtIsNull();

    List<Product> findByCategoryIdAndDeletedAtIsNull(int categoryId);

    List<Product> findByBrandIdAndDeletedAtIsNull(int brandId);
}
