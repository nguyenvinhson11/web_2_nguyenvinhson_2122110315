package com.example.Nguyenvinhson.controller;

import com.example.Nguyenvinhson.dto.OrderStoreRequest;
import com.example.Nguyenvinhson.dto.OrderUpdateRequest;
import com.example.Nguyenvinhson.entity.Order;
import com.example.Nguyenvinhson.entity.OrderDetail;
import com.example.Nguyenvinhson.entity.Product;
import com.example.Nguyenvinhson.repository.OrderDetailRepository;
import com.example.Nguyenvinhson.repository.OrderRepository;
import com.example.Nguyenvinhson.repository.ProductRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ProductRepository productRepository;

    private int getUserId() {
        return Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(orderRepository.findByDeletedAtIsNull());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable int id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody OrderStoreRequest request) {
        int userId = getUserId();

        Order order = Order.builder()
                .userId(userId)
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .address(request.getAddress())
                .note(request.getNote())
                .totalAmount(request.getTotalAmount())
                .paymentMethod(request.getPaymentMethod())
                .createdBy(userId)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        orderRepository.save(order);

        request.getOrderDetails().forEach(item -> {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + item.getProductId()));

            OrderDetail detail = OrderDetail.builder()
                    .orderId(order.getId())
                    .product(product) // Gán đối tượng product, không phải productId nữa
                    .quantity(item.getQuantity())
                    .price(item.getPrice())
                    .note(item.getNote())
                    .createdBy(userId)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            orderDetailRepository.save(detail);
        });

        return ResponseEntity.ok(order);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody OrderUpdateRequest request) {
        return orderRepository.findById(id)
                .map(order -> {
                    int userId = getUserId();

                    if (request.getName() != null)
                        order.setName(request.getName());
                    if (request.getPhone() != null)
                        order.setPhone(request.getPhone());
                    if (request.getEmail() != null)
                        order.setEmail(request.getEmail());
                    if (request.getAddress() != null)
                        order.setAddress(request.getAddress());
                    if (request.getNote() != null)
                        order.setNote(request.getNote());
                    if (request.getPaymentMethod() != null)
                        order.setPaymentMethod(request.getPaymentMethod());
                    if (request.getTotalAmount() != null)
                        order.setTotalAmount(request.getTotalAmount());

                    order.setUpdatedAt(LocalDateTime.now());
                    order.setUpdatedBy(userId);
                    order.setDeletedAt(null);

                    orderRepository.save(order);
                    return ResponseEntity.ok(order);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<?> restore(@PathVariable int id) {
        return orderRepository.findById(id)
                .map(order -> {
                    if (order.getDeletedAt() == null)
                        return ResponseEntity.badRequest().body("Đơn hàng chưa bị xóa");

                    int userId = getUserId();
                    LocalDateTime now = LocalDateTime.now();
                    order.setDeletedAt(null);
                    order.setUpdatedAt(now);
                    order.setUpdatedBy(userId);

                    orderDetailRepository.findByOrderId(order.getId()).forEach(d -> {
                        d.setDeletedAt(null);
                        d.setUpdatedAt(now);
                        d.setUpdatedBy(userId);
                        orderDetailRepository.save(d);
                    });

                    orderRepository.save(order);
                    return ResponseEntity.ok("Đã khôi phục");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> softDelete(@PathVariable int id) {
        return orderRepository.findById(id)
                .map(order -> {
                    int userId = getUserId();
                    LocalDateTime now = LocalDateTime.now();
                    order.setDeletedAt(now);
                    order.setDeletedBy(userId);

                    orderDetailRepository.findByOrderId(order.getId()).forEach(d -> {
                        d.setDeletedAt(now);
                        d.setDeletedBy(userId);
                        orderDetailRepository.save(d);
                    });

                    orderRepository.save(order);
                    return ResponseEntity.ok("Đã xóa mềm");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/destroy/{id}")
    public ResponseEntity<?> destroy(@PathVariable Integer id) {
        try {
            // Kiểm tra đơn hàng tồn tại
            Order order = orderRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

            // Xóa toàn bộ chi tiết đơn hàng trước
            List<OrderDetail> details = orderDetailRepository.findByOrderId(id);
            if (!details.isEmpty()) {
                orderDetailRepository.deleteAll(details);
            }

            // Xóa đơn hàng
            orderRepository.delete(order);

            return ResponseEntity.ok("Đã xóa đơn hàng và các chi tiết đơn hàng liên quan");
        } catch (Exception e) {
            e.printStackTrace(); // Log ra console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Xóa thất bại: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable int userId) {
        return ResponseEntity.ok(orderRepository.findByUserIdAndDeletedAtIsNull(userId));
    }
}
