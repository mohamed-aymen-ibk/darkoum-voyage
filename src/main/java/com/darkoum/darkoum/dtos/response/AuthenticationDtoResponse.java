package com.darkoum.darkoum.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthenticationDtoResponse {
    private String token;
    private UserDtoResponse userDetails;
}
