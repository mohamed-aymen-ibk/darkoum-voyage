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

    // Create a new provider
    @PostMapping
    public ResponseEntity<ProviderDtoResponse> createProvider(@RequestBody ProviderDtoRequest providerDtoRequest) {
        return ResponseEntity.ok(providerService.createProvider(providerDtoRequest));
    }

    // Get provider by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProviderDtoResponse> getProviderById(@PathVariable Long id) {
        return ResponseEntity.ok(providerService.getProviderById(id));
    }

    // Get all providers
    @GetMapping
    public ResponseEntity<List<ProviderDtoResponse>> getAllProviders() {
        return ResponseEntity.ok(providerService.getAllProviders());
    }

    // Update provider by ID
    @PutMapping("/{id}")
    public ResponseEntity<ProviderDtoResponse> updateProvider(
            @PathVariable Long id,
            @RequestBody ProviderDtoRequest providerDtoRequest) {

        // Check if the provider exists first, if not return a 404 (Not Found)
        if (providerService.getProviderById(id) == null) {
            return ResponseEntity.notFound().build();
        }

        // Call the service layer to handle the update logic
        ProviderDtoResponse updatedProvider = providerService.updateProvider(id, providerDtoRequest);

        return ResponseEntity.ok(updatedProvider);  // Return the updated provider's response
    }

    // Delete provider by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProvider(@PathVariable Long id) {
        providerService.deleteProvider(id);
        return ResponseEntity.noContent().build();  // Return status 204 No Content after successful deletion
    }
}
