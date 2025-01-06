package com.darkoum.darkoum.dtos.request;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@NoArgsConstructor
public class ArticleDtoRequest {
    private String name;
    private String description;
    private double price;
    private Integer stock;
    private String providerName;
    private Long userId;
}