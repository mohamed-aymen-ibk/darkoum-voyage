package com.darkoum.darkoum.controller;

import com.darkoum.darkoum.dtos.request.UserDtoRequest;
import com.darkoum.darkoum.dtos.response.UserDtoResponse;
import com.darkoum.darkoum.model.*;
import com.darkoum.darkoum.service.interfaces.UserServiceInterface;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/users")
@Validated
public class UserController {
    private final UserServiceInterface userService;

    @PostMapping
    public UserDtoResponse create(@RequestBody @Valid UserDtoRequest user) {
        return userService.create(user);
    }

    @PutMapping("{id}")
    public UserDtoResponse update(@RequestBody @Valid UserDtoRequest user, @PathVariable Long id) {
        return userService.update(user, id);
    }

    @GetMapping
    public List<UserDtoResponse> getAll() {
        return userService.findAll();
    }

    @GetMapping("{id}")
    public UserDtoResponse getUser(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }

    //Relations
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Client> clients;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Provider> providers;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Article> articles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Pack> packs;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Vente> ventes;
}