package com.darkoum.darkoum.dtos.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ProviderDtoResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String serviceType;
    private LocalDateTime createdAt;
}