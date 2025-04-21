package com.example.Nguyenvinhson.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TopicUpdateRequest {

    @Size(max = 200, message = "Tên không được quá 200 ký tự")
    private String name;

    private String description;

    private Integer updatedBy;
}
