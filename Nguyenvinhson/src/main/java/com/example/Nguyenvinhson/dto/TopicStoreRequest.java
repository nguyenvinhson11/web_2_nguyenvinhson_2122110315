package com.example.Nguyenvinhson.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TopicStoreRequest {

    @NotBlank(message = "Tên không được để trống")
    @Size(max = 200, message = "Tên không được quá 200 ký tự")
    private String name;

    private String description;

    private Integer createdBy;
}
