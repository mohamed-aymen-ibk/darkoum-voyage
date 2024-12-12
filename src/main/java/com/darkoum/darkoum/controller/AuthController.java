package com.darkoum.darkoum.controller;

import com.darkoum.darkoum.dtos.request.LoginDtoRequest;
import com.darkoum.darkoum.dtos.request.UserDtoRequest;
import com.darkoum.darkoum.dtos.response.LoginDtoResponse;
import com.darkoum.darkoum.dtos.response.UserDtoResponse;
import com.darkoum.darkoum.security.jwt.JwtService;
import com.darkoum.darkoum.service.interfaces.UserServiceInterface;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/authentication")
public class AuthController {

    private final UserServiceInterface userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/register")
    public UserDtoResponse register(@RequestBody @Valid UserDtoRequest userRequest) {
        return userService.create(userRequest);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDtoResponse> login(@RequestBody @Valid LoginDtoRequest loginRequest) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        String token = jwtService.generateToken(userDetails);

        LoginDtoResponse response = LoginDtoResponse.builder()
                .token(token)
                .userDetails(userService.findUserByEmail(loginRequest.getEmail()))
                .build();

        return ResponseEntity.ok(response);
    }
}