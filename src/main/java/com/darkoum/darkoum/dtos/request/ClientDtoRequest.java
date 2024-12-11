package com.darkoum.darkoum.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientDtoRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 70, message = "Name must be between 2 and 70 characters")
    private String name;

    @Email(message = "Email should be valid")
    private String email;

    private String phoneNumber;
    private String address;
    private Long userId; // ID de l'utilisateur lié
}
