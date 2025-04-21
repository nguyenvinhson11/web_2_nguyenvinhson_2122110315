package com.example.Nguyenvinhson.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "brands")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    // Người tạo
    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "id", insertable = false, updatable = false)
    private User createdByUser;

    @Column(name = "created_by")
    private Integer createdBy;

    // Người cập nhật
    @ManyToOne
    @JoinColumn(name = "updated_by", referencedColumnName = "id", insertable = false, updatable = false)
    private User updatedByUser;

    @Column(name = "updated_by")
    private Integer updatedBy;

    // Người xóa
    @ManyToOne
    @JoinColumn(name = "deleted_by", referencedColumnName = "id", insertable = false, updatable = false)
    private User deletedByUser;

    @Column(name = "deleted_by")
    private Integer deletedBy;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
    private LocalDateTime deletedAt;

    // Quan hệ 1-nhiều: Brand có nhiều Product
    @OneToMany(mappedBy = "brand")
    @JsonIgnore
    private List<Product> products;
}
