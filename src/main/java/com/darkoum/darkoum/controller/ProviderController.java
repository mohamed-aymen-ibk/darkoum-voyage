package com.darkoum.darkoum.controller;

import com.darkoum.darkoum.dtos.request.ProviderDtoRequest;
import com.darkoum.darkoum.dtos.response.ProviderDtoResponse;
import com.darkoum.darkoum.service.interfaces.ProviderServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/providers")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProviderController {

    private final ProviderServiceInterface providerService;

    @PostMapping
    public ResponseEntity<ProviderDtoResponse> createProvider(@RequestBody ProviderDtoRequest providerDtoRequest) {
        return ResponseEntity.ok(providerService.createProvider(providerDtoRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProviderDtoResponse> getProviderById(@PathVariable Long id) {
        return ResponseEntity.ok(providerService.getProviderById(id));
    }

    @GetMapping("/names")
    public ResponseEntity<List<String>> getAllProviderNames() {
        return ResponseEntity.ok(providerService.getAllProviderNames());
    }


    @GetMapping
    public ResponseEntity<Page<ProviderDtoResponse>> getAllProviders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String name
    ){
        if(name == null || name.isEmpty()){
            return ResponseEntity.ok(providerService.getAllProviders(page, size));
        }
        return ResponseEntity.ok(providerService.searchProvidersByName(name, page, size));
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