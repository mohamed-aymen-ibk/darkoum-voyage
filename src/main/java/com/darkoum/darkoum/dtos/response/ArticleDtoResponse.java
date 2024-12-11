package com.darkoum.darkoum.dtos.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleDtoResponse {

    private Long id;
    private String name;
    private Double price;
    private Integer stock;
    private String providerName; // Nom du fournisseur lié
}
