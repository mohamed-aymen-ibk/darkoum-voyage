package com.darkoum.darkoum.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProviderDtoRequest {

    @NotBlank(message = "Name is required")
    private String name;

    private String email;

    private String phone;
}
