package com.darkoum.darkoum.controller;


import com.darkoum.darkoum.dtos.request.ClientDtoRequest;
import com.darkoum.darkoum.dtos.response.ClientDtoResponse;
import com.darkoum.darkoum.service.interfaces.ClientServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientServiceInterface clientService;

    @PostMapping
    public ResponseEntity<ClientDtoResponse> createClient(@RequestBody ClientDtoRequest clientDtoRequest) {
        return ResponseEntity.ok(clientService.createClient(clientDtoRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDtoResponse> getClientById(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.getClientById(id));
    }

    @GetMapping
    public ResponseEntity<List<ClientDtoResponse>> getAllClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ClientDtoResponse>> getClientsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(clientService.getClientsByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDtoResponse> updateClient(
            @PathVariable Long id,
            @RequestBody ClientDtoRequest clientDtoRequest) {
        return ResponseEntity.ok(clientService.updateClient(id, clientDtoRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
