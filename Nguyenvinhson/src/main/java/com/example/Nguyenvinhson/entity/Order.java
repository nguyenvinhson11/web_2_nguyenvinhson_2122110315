package com.example.Nguyenvinhson.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;

    private String name;
    private String phone;
    private String email;
    private String address;
    private String note;
    private BigDecimal totalAmount;
    private String paymentMethod;

    private Integer createdBy;
    private Integer updatedBy;
    private Integer deletedBy;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    // @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch =
    // FetchType.EAGER)
    // @JsonManagedReference
    // @Builder.Default
    // private List<OrderDetail> orderDetails = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")// thêm dòng này để nói rõ mối quan hệ 1-nhiều
    @Builder.Default 
    private List<OrderDetail> orderDetails = new ArrayList<>();

}
