package com.darkoum.darkoum.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PackDtoRequest {

    @NotBlank(message = "Pack number is required")
    private String packNumber;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Float price;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;

    private List<String> articleNames;

    private List<String> providerNames;
}