package com.darkoum.darkoum.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PackDtoRequest {

    @NotBlank(message = "Name is required")
    private String name;

    private String description;
}
