package com.example.Nguyenvinhson.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductStoreRequest {

    @NotBlank(message = "Tên sản phẩm không được để trống")
    @Size(max = 200, message = "Tên không quá 200 ký tự")
    private String name;

    @NotNull(message = "Giá không được để trống")
    private BigDecimal price;

    private BigDecimal priceSale;

    private String description;

    @NotNull(message = "Danh mục không được để trống")
    private Integer categoryId;

    @NotNull(message = "Thương hiệu không được để trống")
    private Integer brandId;

    // Upload file thumbnail
    private MultipartFile thumbnailFile;
}
