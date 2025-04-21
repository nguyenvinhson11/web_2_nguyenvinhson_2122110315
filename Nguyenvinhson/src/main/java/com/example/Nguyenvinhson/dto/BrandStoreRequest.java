package com.example.Nguyenvinhson.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BrandStoreRequest {
    @NotBlank(message = "Tên thương hiệu không được để trống")
    private String name;
}
