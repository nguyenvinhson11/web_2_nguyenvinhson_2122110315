package com.example.Nguyenvinhson.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderDetailUpdateRequest {
   
    private Integer quantity;
    private BigDecimal price;
    private String note;
}

