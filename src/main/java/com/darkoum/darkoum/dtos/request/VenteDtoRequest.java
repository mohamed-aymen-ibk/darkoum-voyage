package com.darkoum.darkoum.dtos.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class VenteDtoRequest {
    private List<Long> clientIds;

    private List<Long> packIds;

    @NotNull(message = "Sale number is required")
    private String saleNumber;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @NotNull(message = "Price is required")
    private Float price;

    private Boolean factured;
}