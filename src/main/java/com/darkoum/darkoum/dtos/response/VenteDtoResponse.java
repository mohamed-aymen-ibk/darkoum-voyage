package com.darkoum.darkoum.dtos.response;

import com.darkoum.darkoum.model.Client;
import com.darkoum.darkoum.model.Pack;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


@Getter
@Setter
public class VenteDtoResponse {
    private Long id;
    private Integer quantity;
    private LocalDateTime createdAt;
    private String saleNumber;
    private Float price;
    private List<String> providerNames;
    private List<String> clientNames;
    private List<String> packNumbers;
    private Set<Client> clients;
    private Set<Pack> packs;
    private boolean factured;
}