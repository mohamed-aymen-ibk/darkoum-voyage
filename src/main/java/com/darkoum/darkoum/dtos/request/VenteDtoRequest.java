package com.darkoum.darkoum.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VenteDtoRequest {

    @NotNull(message = "Client ID is required")
    private Long clientId;

    @NotNull(message = "Pack ID is required")
    private Long packId;

    @NotBlank(message = "Sale number is required")
    private String saleNumber;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;

    private Float price;
}