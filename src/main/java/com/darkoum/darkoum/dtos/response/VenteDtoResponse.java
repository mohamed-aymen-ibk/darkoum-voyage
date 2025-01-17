package com.darkoum.darkoum.dtos.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class VenteDtoResponse {
    private Long id;
    private Integer quantity;
    private LocalDateTime createdAt;
    private String saleNumber;
    private Float price;
    private List<String> providerNames;
    private List<String> clientNames;
    private List<String> packNumbers;
}