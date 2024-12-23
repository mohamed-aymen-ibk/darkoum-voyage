package com.darkoum.darkoum.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginDtoResponse {
    private Long userId;
    private String token;
    private UserDtoResponse userDetails;
}
