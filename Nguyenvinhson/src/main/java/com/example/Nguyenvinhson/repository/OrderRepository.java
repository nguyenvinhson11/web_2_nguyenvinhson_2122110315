package com.example.Nguyenvinhson.repository;

import com.example.Nguyenvinhson.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    // Lấy tất cả đơn hàng chưa bị xóa mềm
    List<Order> findByDeletedAtIsNull();

    // Lấy tất cả đơn hàng theo userId và chưa bị xóa
    List<Order> findByUserIdAndDeletedAtIsNull(Integer userId);

}
