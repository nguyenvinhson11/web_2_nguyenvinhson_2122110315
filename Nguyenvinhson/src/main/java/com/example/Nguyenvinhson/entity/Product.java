package com.example.Nguyenvinhson.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
// @JsonIgnoreProperties({"createdByUser", "updatedByUser", "deletedByUser", "category", "brand"})

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(precision = 18, scale = 2)
    private BigDecimal priceSale;

    private String description;
    private String thumbnail;

    // 🔗 Category
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Category category;

    @Column(name = "category_id")
    private Integer categoryId;

    // 🔗 Brand
    @ManyToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Brand brand;

    @Column(name = "brand_id")
    private Integer brandId;

    // 🔗 User – người tạo
    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id", insertable = false, updatable = false)
    private User createdByUser;

    @Column(name = "created_by")
    private Integer createdBy;

    // 🔗 User – người sửa
    @ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id", insertable = false, updatable = false)
    private User updatedByUser;

    @Column(name = "updated_by")
    private Integer updatedBy;

    // 🔗 User – người xoá
    @ManyToOne
    @JoinColumn(name = "deleted_by", referencedColumnName = "id", insertable = false, updatable = false)
    private User deletedByUser;

    @Column(name = "deleted_by")
    private Integer deletedBy;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
    private LocalDateTime deletedAt;
}
