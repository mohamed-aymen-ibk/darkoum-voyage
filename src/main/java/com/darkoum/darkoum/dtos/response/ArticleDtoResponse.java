package com.darkoum.darkoum.dtos.response;

import lombok.Data;

@Data
public class ArticleDtoResponse {
    private Long id;
    private String name;
    private String description;
    private double price;
    private int stock;
    private String providerName;
}