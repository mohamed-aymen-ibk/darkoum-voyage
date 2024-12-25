package com.darkoum.darkoum.dtos.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleDtoResponse {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String providerName;
}