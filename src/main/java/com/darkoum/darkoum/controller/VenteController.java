package com.darkoum.darkoum.controller;

import com.darkoum.darkoum.dtos.request.VenteDtoRequest;
import com.darkoum.darkoum.dtos.response.VenteDtoResponse;
import com.darkoum.darkoum.service.interfaces.VenteServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
public class VenteController {

    @Autowired
    private VenteServiceInterface venteService;

    @PostMapping
    public ResponseEntity<VenteDtoResponse> createVente(@RequestBody VenteDtoRequest venteDtoRequest) {
        return ResponseEntity.ok(venteService.createVente(venteDtoRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VenteDtoResponse> getVenteById(@PathVariable Long id) {
        return ResponseEntity.ok(venteService.getVenteById(id));
    }

    @GetMapping
    public ResponseEntity<Page<VenteDtoResponse>> getAllVentes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(venteService.getAllVentes(page, size));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VenteDtoResponse> updateVente(
            @PathVariable Long id,
            @RequestBody VenteDtoRequest venteDtoRequest) {
        return ResponseEntity.ok(venteService.updateVente(id, venteDtoRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVente(@PathVariable Long id) {
        venteService.deleteVente(id);
        return ResponseEntity.noContent().build();
    }
}