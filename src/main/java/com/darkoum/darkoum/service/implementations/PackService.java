package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.PackDtoRequest;
import com.darkoum.darkoum.dtos.response.PackDtoResponse;
import com.darkoum.darkoum.model.Pack;
import com.darkoum.darkoum.repository.PackRepository;
import com.darkoum.darkoum.service.interfaces.PackServiceInterface;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PackService implements PackServiceInterface {

    @Autowired
    private PackRepository packRepository;

    @Override
    public PackDtoResponse createPack(PackDtoRequest packDtoRequest) {
        Pack pack = new Pack();
        pack.setName(packDtoRequest.getName());
        pack.setDescription(packDtoRequest.getDescription());

        Pack savedPack = packRepository.save(pack);

        return mapToDto(savedPack);
    }

    @Override
    public PackDtoResponse getPackById(Long id) {
        Pack pack = packRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pack not found"));
        return mapToDto(pack);
    }

    @Override
    public List<PackDtoResponse> getAllPacks() {
        return packRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PackDtoResponse updatePack(Long id, PackDtoRequest packDtoRequest) {
        Pack pack = packRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pack not found"));

        pack.setName(packDtoRequest.getName());
        pack.setDescription(packDtoRequest.getDescription());

        Pack updatedPack = packRepository.save(pack);

        return mapToDto(updatedPack);
    }

    @Override
    public void deletePack(Long id) {
        Pack pack = packRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pack not found"));
        packRepository.delete(pack);
    }

    private PackDtoResponse mapToDto(Pack pack) {
        PackDtoResponse dto = new PackDtoResponse();
        dto.setId(pack.getId());
        dto.setName(pack.getName());
        dto.setDescription(pack.getDescription());
        return dto;
    }
}
