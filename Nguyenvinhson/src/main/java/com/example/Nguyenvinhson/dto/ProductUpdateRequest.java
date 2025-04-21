package com.example.Nguyenvinhson.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductUpdateRequest {

    private String name;

    private BigDecimal price;
    private BigDecimal priceSale;

    private String description;

    private Integer categoryId;
    private Integer brandId;

    // Ảnh mới nếu có upload
    private MultipartFile thumbnailFile;
}
