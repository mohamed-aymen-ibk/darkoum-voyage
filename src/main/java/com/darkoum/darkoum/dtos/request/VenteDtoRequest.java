package com.darkoum.darkoum.dtos.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class VenteDtoRequest {
    @NotEmpty(message = "At least one client ID is required")
    private Set<Long> clientIds;

    @NotEmpty(message = "At least one pack ID is required")
    private Set<Long> packIds;

    @NotNull(message = "Sale number is required")
    private String saleNumber;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @NotNull(message = "Price is required")
    private Float price;
}