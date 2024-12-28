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

import java.util.stream.Collectors;

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
    public VenteDtoResponse createVente(VenteDtoRequest venteDtoRequest) {
        Vente vente = new Vente();
        Client client = clientRepository.findById(venteDtoRequest.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));
        Pack pack = packRepository.findById(venteDtoRequest.getPackId())
                .orElseThrow(() -> new RuntimeException("Pack not found"));
        vente.setClient(client);
        vente.setPack(pack);
        vente.setPaymentStatus(venteDtoRequest.getPaymentStatus());
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
    public Page<VenteDtoResponse> getAllVentes(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return venteRepository.findAll(pageable)
                .map(this::mapToDto);
    }


    @Override
    public VenteDtoResponse updateVente(Long id, VenteDtoRequest venteDtoRequest) {
        Vente vente = venteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vente not found"));

        vente.setPaymentStatus(venteDtoRequest.getPaymentStatus());
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
        dto.setClientName(vente.getClient().getName());
        dto.setPackName(vente.getPack().getName());
        dto.setPaymentStatus(vente.getPaymentStatus());
        dto.setCreatedAt(vente.getCreatedAt());
        dto.setDescription(vente.getDescription());
        return dto;
    }
}