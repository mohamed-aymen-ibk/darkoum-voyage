package com.darkoum.darkoum.dtos.response;

import com.darkoum.darkoum.model.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class VenteDtoResponse {

    private Long id;
    private String clientName;
    private String packName;
    private PaymentStatus paymentStatus;
    private LocalDateTime createdAt;
    private String description;

}