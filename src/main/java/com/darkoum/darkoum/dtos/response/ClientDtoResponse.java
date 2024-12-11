package com.darkoum.darkoum.dtos.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientDtoResponse {

    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;
    private String userName; // Nom de l'utilisateur lié
}
