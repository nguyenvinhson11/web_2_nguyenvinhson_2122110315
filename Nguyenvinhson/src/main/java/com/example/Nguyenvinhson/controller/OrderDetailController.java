package com.example.Nguyenvinhson.controller;

import com.example.Nguyenvinhson.dto.OrderDetailStoreRequest;
import com.example.Nguyenvinhson.dto.OrderDetailUpdateRequest;
import com.example.Nguyenvinhson.dto.OrderDetailWithProduct;
import com.example.Nguyenvinhson.entity.Order;
import com.example.Nguyenvinhson.entity.OrderDetail;
import com.example.Nguyenvinhson.entity.Product;
import com.example.Nguyenvinhson.repository.OrderDetailRepository;
import com.example.Nguyenvinhson.repository.OrderRepository;
import com.example.Nguyenvinhson.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order-detail")
@RequiredArgsConstructor
public class OrderDetailController {

    private final OrderDetailRepository orderDetailRepo;
    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;

     // ✅ Lấy user ID từ token (bên trong subject)
    private int getUserIdFromToken() {
        return Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    // Lấy toàn bộ chi tiết đơn hàng, kèm tên & ảnh sản phẩm
    @GetMapping
    public ResponseEntity<?> getAll() {
        List<OrderDetailWithProduct> list = orderDetailRepo.findAllWithProductInfo();
        return ResponseEntity.ok(list);
    }

    // Lấy chi tiết theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        return orderDetailRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Thêm chi tiết đơn hàng mới
    @PostMapping
    @Transactional
    public ResponseEntity<?> create(@RequestBody OrderDetailStoreRequest request,
            @AuthenticationPrincipal UserDetails user) {
        int userId = Integer.parseInt(user.getUsername());

        Optional<Order> orderOpt = orderRepo.findById(request.getOrderId());
        Optional<Product> productOpt = productRepo.findById(request.getProductId());

        if (orderOpt.isEmpty())
            return ResponseEntity.badRequest().body("Không tìm thấy đơn hàng");
        if (productOpt.isEmpty())
            return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm");
        if (request.getQuantity() == null || request.getPrice() == null)
            return ResponseEntity.badRequest().body("Thiếu dữ liệu số lượng hoặc giá");

        OrderDetail detail = OrderDetail.builder()
                .orderId(request.getOrderId())
                .product(productOpt.get())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .note(request.getNote())
                .createdBy(userId)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        orderDetailRepo.save(detail);
        return ResponseEntity.ok(detail);
    }

    // Cập nhật chi tiết đơn hàng
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id,
            @RequestBody OrderDetailUpdateRequest request) {
        Optional<OrderDetail> optional = orderDetailRepo.findById(id);
        if (optional.isEmpty())
            return ResponseEntity.notFound().build();

        OrderDetail detail = optional.get();
        int userId = getUserIdFromToken(); 

        if (request.getQuantity() != null && request.getQuantity() > 0)
            detail.setQuantity(request.getQuantity());

        if (request.getPrice() != null && request.getPrice().compareTo(BigDecimal.ZERO) > 0)
            detail.setPrice(request.getPrice());

        if (request.getNote() != null)
            detail.setNote(request.getNote());

        detail.setUpdatedBy(userId);
        detail.setUpdatedAt(LocalDateTime.now());
        detail.setDeletedAt(null); 

        orderDetailRepo.save(detail);
        return ResponseEntity.ok(detail);
    }

    // Xóa mềm
    @DeleteMapping("/{id}")
    public ResponseEntity<?> softDelete(@PathVariable Integer id,
            @AuthenticationPrincipal UserDetails user) {
        Optional<OrderDetail> optional = orderDetailRepo.findById(id);
        if (optional.isEmpty())
            return ResponseEntity.notFound().build();

        OrderDetail detail = optional.get();
        detail.setDeletedAt(LocalDateTime.now());
        detail.setDeletedBy(Integer.parseInt(user.getUsername()));

        orderDetailRepo.save(detail);
        return ResponseEntity.ok("Đã xóa mềm");
    }

   
    @PutMapping("/restore/{id}")
    public ResponseEntity<?> restore(@PathVariable Integer id,
            @AuthenticationPrincipal UserDetails user) {
        Optional<OrderDetail> optional = orderDetailRepo.findById(id);
        if (optional.isEmpty() || optional.get().getDeletedAt() == null)
            return ResponseEntity.notFound().build();

        OrderDetail detail = optional.get();
        detail.setDeletedAt(null);
        detail.setUpdatedBy(Integer.parseInt(user.getUsername()));
        detail.setUpdatedAt(LocalDateTime.now());

        orderDetailRepo.save(detail);
        return ResponseEntity.ok("Đã khôi phục");
    }

    // Xóa vĩnh viễn
    @DeleteMapping("/destroy/{id}")
    public ResponseEntity<?> destroy(@PathVariable Integer id) {
        return orderDetailRepo.findById(id)
                .map(detail -> {
                    orderDetailRepo.delete(detail);
                    return ResponseEntity.ok("Đã xóa vĩnh viễn");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
