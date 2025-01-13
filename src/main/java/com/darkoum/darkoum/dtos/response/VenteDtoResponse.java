package com.darkoum.darkoum.dtos.response;

import com.darkoum.darkoum.model.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class VenteDtoResponse {

    private Long id;
    private String clientName;
    private String packNumber;
    private Integer quantity;
    private LocalDateTime createdAt;
    private String saleNumber;
    private List<String> articleNames;
    private List<String> providerNames;
}