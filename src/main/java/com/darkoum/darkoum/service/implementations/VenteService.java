package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.VenteDtoRequest;
import com.darkoum.darkoum.dtos.response.VenteDtoResponse;
import com.darkoum.darkoum.model.*;
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

import java.util.HashSet;
import java.util.Set;
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
    @Transactional
    public VenteDtoResponse createVente(VenteDtoRequest venteDtoRequest) {
        Set<Client> clients = new HashSet<>();
        Set<Pack> packs = new HashSet<>();
        // Fetch clients by IDs if they exist
        if (venteDtoRequest.getClientIds() != null && !venteDtoRequest.getClientIds().isEmpty()) {
            clients = venteDtoRequest.getClientIds().stream()
                    .map(clientId -> clientRepository.findById(clientId)
                            .orElseThrow(() -> new RuntimeException("Client not found with ID: " + clientId)))
                    .collect(Collectors.toSet());
        }


        if (venteDtoRequest.getPackIds() != null && !venteDtoRequest.getPackIds().isEmpty()) {
            packs = venteDtoRequest.getPackIds().stream()
                    .map(packId -> packRepository.findById(packId)
                            .orElseThrow(() -> new RuntimeException("Pack not found with ID: " + packId)))
                    .collect(Collectors.toSet());
        }

        // Validate pack quantities
        for (Pack pack : packs) {
            if (venteDtoRequest.getQuantity() > pack.getQuantity()) {
                throw new RuntimeException("Quantity of sale is greater than pack's quantity for pack ID: " + pack.getId());
            }
        }

        // Update pack quantities
        for (Pack pack : packs) {
            pack.setQuantity(pack.getQuantity() - venteDtoRequest.getQuantity());
            packRepository.save(pack);
        }

        // Create the Vente entity
        Vente vente = new Vente();
        vente.setSaleNumber(venteDtoRequest.getSaleNumber());
        vente.setQuantity(venteDtoRequest.getQuantity());
        vente.setPrice(venteDtoRequest.getPrice());
        vente.setPacks(packs);
        vente.setClients(clients);

        // Save the Vente
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

        // Update fields if provided
        if (venteDtoRequest.getClientIds() != null && !venteDtoRequest.getClientIds().isEmpty()) {
            Set<Client> clients = venteDtoRequest.getClientIds().stream()
                    .map(clientId -> clientRepository.findById(clientId)
                            .orElseThrow(() -> new RuntimeException("Client not found with ID: " + clientId)))
                    .collect(Collectors.toSet());
            vente.setClients(clients);
        }

        if (venteDtoRequest.getPackIds() != null && !venteDtoRequest.getPackIds().isEmpty()) {
            Set<Pack> packs = venteDtoRequest.getPackIds().stream()
                    .map(packId -> packRepository.findById(packId)
                            .orElseThrow(() -> new RuntimeException("Pack not found with ID: " + packId)))
                    .collect(Collectors.toSet());
            vente.setPacks(packs);
        }

        if (venteDtoRequest.getSaleNumber() != null) {
            vente.setSaleNumber(venteDtoRequest.getSaleNumber());
        }

        if (venteDtoRequest.getQuantity() != null) {
            vente.setQuantity(venteDtoRequest.getQuantity());
        }

        if (venteDtoRequest.getPrice() != null) {
            vente.setPrice(venteDtoRequest.getPrice());
        }

        // Save the updated Vente
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
        dto.setSaleNumber(vente.getSaleNumber());
        dto.setQuantity(vente.getQuantity());
        dto.setPrice(vente.getPrice());
        dto.setCreatedAt(vente.getCreatedAt());

        // Map client names
        dto.setClientNames(vente.getClients().stream()
                .map(Client::getName)
                .collect(Collectors.toList()));

        // Map pack numbers
        dto.setPackNumbers(vente.getPacks().stream()
                .map(Pack::getPackNumber)
                .collect(Collectors.toList()));

        // Map provider names
        dto.setProviderNames(vente.getPacks().stream()
                .flatMap(pack -> pack.getProviders().stream())
                .map(Provider::getName)
                .collect(Collectors.toList()));
        return dto;
    }
}