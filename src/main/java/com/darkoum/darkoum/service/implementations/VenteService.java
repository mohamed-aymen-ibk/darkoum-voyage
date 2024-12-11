package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.VenteDtoRequest;
import com.darkoum.darkoum.dtos.response.VenteDtoResponse;
import com.darkoum.darkoum.model.Vente;
import com.darkoum.darkoum.repository.VenteRepository;
import com.darkoum.darkoum.service.interfaces.VenteServiceInterface;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VenteService implements VenteServiceInterface {

    @Autowired
    private VenteRepository venteRepository;

    @Override
    public VenteDtoResponse createVente(VenteDtoRequest venteDtoRequest) {
        Vente vente = new Vente();
        vente.setQuantity(venteDtoRequest.getQuantity());
        vente.setTotalPrice(venteDtoRequest.getTotalPrice());
        vente.setDescription(venteDtoRequest.getDescription());

        Vente savedVente = venteRepository.save(vente);

        return mapToDto(savedVente);
    }

    @Override
    public VenteDtoResponse getVenteById(Long id) {
        Vente vente = venteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vente not found"));
        return mapToDto(vente);
    }

    @Override
    public List<VenteDtoResponse> getAllVentes() {
        return venteRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public VenteDtoResponse updateVente(Long id, VenteDtoRequest venteDtoRequest) {
        Vente vente = venteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vente not found"));

        vente.setQuantity(venteDtoRequest.getQuantity());
        vente.setTotalPrice(venteDtoRequest.getTotalPrice());
        vente.setDescription(venteDtoRequest.getDescription());

        Vente updatedVente = venteRepository.save(vente);

        return mapToDto(updatedVente);
    }

    @Override
    public void deleteVente(Long id) {
        Vente vente = venteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vente not found"));
        venteRepository.delete(vente);
    }

    private VenteDtoResponse mapToDto(Vente vente) {
        VenteDtoResponse dto = new VenteDtoResponse();
        dto.setId(vente.getId());
        dto.setQuantity(vente.getQuantity());
        dto.setTotalPrice(vente.getTotalPrice());
        dto.setDescription(vente.getDescription());
        return dto;
    }
}
