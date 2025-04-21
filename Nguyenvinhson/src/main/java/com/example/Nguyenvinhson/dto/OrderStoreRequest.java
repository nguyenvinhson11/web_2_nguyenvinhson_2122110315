package com.example.Nguyenvinhson.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderStoreRequest {
    private String name;
    private String phone;
    private String email;
    private String address;
    private String note;
    private BigDecimal totalAmount;
    private String paymentMethod;
    private List<OrderDetailStoreRequest> orderDetails;
}


