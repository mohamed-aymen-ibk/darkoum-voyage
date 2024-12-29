package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.VenteDtoRequest;
import com.darkoum.darkoum.dtos.response.VenteDtoResponse;
import com.darkoum.darkoum.model.Client;
import com.darkoum.darkoum.model.Pack;
import com.darkoum.darkoum.model.Vente;
import com.darkoum.darkoum.repository.ClientRepository;
import com.darkoum.darkoum.repository.PackRepository;
import com.darkoum.darkoum.repository.VenteRepository;
import com.darkoum.darkoum.service.interfaces.VenteServiceInterface;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class VenteService implements VenteServiceInterface {

    @Autowired
    private VenteRepository venteRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PackRepository packRepository;

    @Override
    @Transactional
    public VenteDtoResponse createVente(VenteDtoRequest venteDtoRequest) {
        Vente vente = new Vente();

        if (venteDtoRequest.getClientId() == null) {
            throw new RuntimeException("Client ID cannot be null");
        }
        if (venteDtoRequest.getPackId() == null) {
            throw new RuntimeException("Pack ID cannot be null");
        }

        Client client = clientRepository.findById(venteDtoRequest.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));
        Pack pack = packRepository.findById(venteDtoRequest.getPackId())
                .orElseThrow(() -> new RuntimeException("Pack not found"));

        vente.setClient(client);
        vente.setPack(pack);
        vente.setPaymentStatus(venteDtoRequest.getPaymentStatus());
        vente.setDescription(venteDtoRequest.getDescription());

        try {
            Vente savedVente = venteRepository.save(vente);
            return mapToDto(savedVente);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create sale: " + e.getMessage());
        }
    }


    @Override
    public VenteDtoResponse getVenteById(Long id) {
        Vente vente = venteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vente not found"));
        return mapToDto(vente);
    }

    @Override
    public Page<VenteDtoResponse> getAllVentes(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return venteRepository.findAll(pageable)
                .map(this::mapToDto);
    }


    @Override
    @Transactional
    public VenteDtoResponse updateVente(Long id, VenteDtoRequest venteDtoRequest) {
        Vente vente = venteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vente not found"));

        vente.setPaymentStatus(venteDtoRequest.getPaymentStatus());
        vente.setDescription(venteDtoRequest.getDescription());
        try {
            Vente updatedVente = venteRepository.save(vente);
            return mapToDto(updatedVente);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update sale: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void deleteVente(Long id) {
        Vente vente = venteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vente not found"));
        venteRepository.delete(vente);
    }

    private VenteDtoResponse mapToDto(Vente vente) {
        VenteDtoResponse dto = new VenteDtoResponse();
        dto.setId(vente.getId());
        if (vente.getClient() != null) {
            dto.setClientName(vente.getClient().getName());
        }
        if (vente.getPack() != null) {
            dto.setPackName(vente.getPack().getName());
        }
        dto.setPaymentStatus(vente.getPaymentStatus());
        dto.setCreatedAt(vente.getCreatedAt());
        dto.setDescription(vente.getDescription());
        return dto;
    }
}