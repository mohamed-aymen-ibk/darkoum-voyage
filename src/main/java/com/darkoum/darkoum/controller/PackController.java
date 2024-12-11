package com.darkoum.darkoum.controller;


import com.darkoum.darkoum.dtos.request.PackDtoRequest;
import com.darkoum.darkoum.dtos.response.PackDtoResponse;
import com.darkoum.darkoum.service.interfaces.PackServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packs")
public class PackController {

    @Autowired
    private PackServiceInterface packService;

    @PostMapping
    public ResponseEntity<PackDtoResponse> createPack(@RequestBody PackDtoRequest packDtoRequest) {
        return ResponseEntity.ok(packService.createPack(packDtoRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PackDtoResponse> getPackById(@PathVariable Long id) {
        return ResponseEntity.ok(packService.getPackById(id));
    }

    @GetMapping
    public ResponseEntity<List<PackDtoResponse>> getAllPacks() {
        return ResponseEntity.ok(packService.getAllPacks());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PackDtoResponse> updatePack(
            @PathVariable Long id,
            @RequestBody PackDtoRequest packDtoRequest) {
        return ResponseEntity.ok(packService.updatePack(id, packDtoRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePack(@PathVariable Long id) {
        packService.deletePack(id);
        return ResponseEntity.noContent().build();
    }
}
