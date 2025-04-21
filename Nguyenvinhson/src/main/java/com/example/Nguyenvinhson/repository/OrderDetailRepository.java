package com.example.Nguyenvinhson.repository;

import com.example.Nguyenvinhson.dto.OrderDetailWithProduct;
import com.example.Nguyenvinhson.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {

    // Lấy danh sách chi tiết đơn hàng theo ID đơn hàng (dùng cho soft delete,
    // restore...)
    List<OrderDetail> findByOrderId(Integer orderId);

    List<OrderDetail> findByDeletedAtIsNull();

    // Xóa toàn bộ chi tiết theo ID đơn hàng
    void deleteByOrderId(Integer orderId);

    List<OrderDetail> findByProductId(Integer productId);

    // Custom: Lấy danh sách chi tiết đơn hàng kèm thông tin sản phẩm
    @Query("""
                SELECT
                    od.id AS id,
                    od.quantity AS quantity,
                    od.price AS price,
                    od.note AS note,
                    p.name AS productName,
                    p.thumbnail AS productThumbnail
                FROM OrderDetail od
                JOIN od.product p
                WHERE od.deletedAt IS NULL
            """)
    List<OrderDetailWithProduct> findAllWithProductInfo();
}