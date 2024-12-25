package com.darkoum.darkoum.dtos.request;

import lombok.Data;

@Data
public class ArticleDtoRequest {
    private String name;
    private String description;
    private double price;
    private Integer stock;
    private String providerName;

}