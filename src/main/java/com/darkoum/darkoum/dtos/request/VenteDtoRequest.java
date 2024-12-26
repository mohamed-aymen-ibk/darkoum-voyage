package com.darkoum.darkoum.dtos.request;

import com.darkoum.darkoum.model.PaymentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VenteDtoRequest {

    @NotNull(message = "Client ID is required")
    private Long clientId;

    @NotNull(message = "Pack ID is required")
    private Long packId;


    private String description;

    @NotNull(message = "Payment status is required")
    private PaymentStatus paymentStatus;
}