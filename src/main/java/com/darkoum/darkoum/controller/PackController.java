package com.darkoum.darkoum.controller;

import com.darkoum.darkoum.dtos.request.PackDtoRequest;
import com.darkoum.darkoum.dtos.response.PackDtoResponse;
import com.darkoum.darkoum.service.interfaces.PackServiceInterface;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packs")
public class PackController {
    private static final Logger logger = LoggerFactory.getLogger(PackController.class);
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
    public ResponseEntity<Page<PackDtoResponse>> getAllPacks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String name
    ){
        if(name == null || name.isEmpty()){
            return ResponseEntity.ok(packService.getAllPacks(page, size));
        }
        return ResponseEntity.ok(packService.searchPacksByName(name, page, size));
    }
    @GetMapping("/names")
    public ResponseEntity<List<String>> getAllPackNames(){
        return ResponseEntity.ok(packService.getAllPackNames());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PackDtoResponse> updatePack(
            @PathVariable Long id,
            @RequestBody PackDtoRequest packDtoRequest) {
        return ResponseEntity.ok(packService.updatePack(id, packDtoRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePack(@PathVariable Long id) {
        try {
            logger.info("Deleting pack with ID: {}", id);
            packService.deletePack(id);
            return ResponseEntity.noContent().build();
        }catch (Exception e){
            logger.error("Error deleting pack with ID: {}", id,e);
            throw e;
        }
    }
    @GetMapping("/articles/names")
    public ResponseEntity<List<String>> getAllArticleNames() {
        return ResponseEntity.ok(packService.getAllArticleNames());
    }
}