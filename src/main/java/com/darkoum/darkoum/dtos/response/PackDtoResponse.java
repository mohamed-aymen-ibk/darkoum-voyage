package com.darkoum.darkoum.dtos.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PackDtoResponse {

    private Long id;
    private String packNumber;
    private Float price;
    private Integer quantity;
    private List<String> articleNames;
    private List<String> providerNames;
    private List<String> clientNames;
    private LocalDateTime createdAt;
}