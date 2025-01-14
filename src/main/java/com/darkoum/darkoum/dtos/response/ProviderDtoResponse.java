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
    private String codeProvider;
    private String designation;
    private String ice;
    private String rc;
    private String rib;
    private String serviceType;
    private LocalDateTime createdAt;
}