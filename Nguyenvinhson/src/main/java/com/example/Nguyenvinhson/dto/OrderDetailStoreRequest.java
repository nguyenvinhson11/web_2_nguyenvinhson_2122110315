package com.example.Nguyenvinhson.dto;



import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderDetailStoreRequest {
    private Integer orderId;       // ⚠️ PHẢI CÓ FIELD NÀY
    private Integer productId;
    private Integer quantity;
    private BigDecimal price;
    private String note;
}


