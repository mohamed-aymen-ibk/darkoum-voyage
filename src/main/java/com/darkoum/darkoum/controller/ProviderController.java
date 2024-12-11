package com.darkoum.darkoum.controller;


import com.darkoum.darkoum.dtos.request.ProviderDtoRequest;
import com.darkoum.darkoum.dtos.response.ProviderDtoResponse;
import com.darkoum.darkoum.service.interfaces.ProviderServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
public class ProviderController {

    @Autowired
    private ProviderServiceInterface providerService;

    @PostMapping
    public ResponseEntity<ProviderDtoResponse> createProvider(@RequestBody ProviderDtoRequest providerDtoRequest) {
        return ResponseEntity.ok(providerService.createProvider(providerDtoRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProviderDtoResponse> getProviderById(@PathVariable Long id) {
        return ResponseEntity.ok(providerService.getProviderById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProviderDtoResponse>> getAllProviders() {
        return ResponseEntity.ok(providerService.getAllProviders());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProviderDtoResponse> updateProvider(
            @PathVariable Long id,
            @RequestBody ProviderDtoRequest providerDtoRequest) {
        return ResponseEntity.ok(providerService.updateProvider(id, providerDtoRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProvider(@PathVariable Long id) {
        providerService.deleteProvider(id);
        return ResponseEntity.noContent().build();
    }
}
