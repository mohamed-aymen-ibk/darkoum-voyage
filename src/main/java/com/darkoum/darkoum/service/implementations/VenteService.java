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
import org.springframework.dao.DataAccessException;
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
        Vente vente = new Vente();
        try{
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
            vente.setSaleNumber(venteDtoRequest.getSaleNumber());
            vente.setQuantity(venteDtoRequest.getQuantity());
            vente.setPrice(venteDtoRequest.getPrice());
            vente.setFactured(venteDtoRequest.getFactured() != null ? venteDtoRequest.getFactured() : false);
            vente.setPacks(packs);
            vente.setClients(clients);
            // Save the Vente
            Vente savedVente = venteRepository.save(vente);
            return mapToDto(savedVente, savedVente.getClients(), savedVente.getPacks());
        }catch(DataAccessException e){
            throw new RuntimeException("Database error while creating sale: " + e.getMessage());
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to create sale: " + e.getMessage());
        }
    }

    @Override
    public VenteDtoResponse getVenteById(Long id) {
        try{
            Vente vente = venteRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Vente not found with ID: "+id));
            return mapToDto(vente, vente.getClients(), vente.getPacks());
        } catch (DataAccessException e){
            throw new RuntimeException("Database error while retrieving sale with ID: " + id + " Error: " + e.getMessage());
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to retrieve sale with ID: " + id + " Error: " + e.getMessage());
        }
    }

    @Override
    public Page<VenteDtoResponse> getAllVentes(int page, int size, String facturedStatus) {
        try{
            Pageable pageable = PageRequest.of(page, size);
            Page<Vente> ventesPage;
            if (facturedStatus != null && !facturedStatus.equals("All")){
                boolean factured = facturedStatus.equals("Factured");
                ventesPage = venteRepository.findAllByFactured(factured, pageable);
            }else{
                ventesPage =  venteRepository.findAll(pageable);
            }
            return ventesPage.map(vente -> mapToDto(vente,vente.getClients(), vente.getPacks()));
        }catch(DataAccessException e){
            throw new RuntimeException("Database error while retrieving all sales" +  e.getMessage());
        }catch(Exception e) {
            throw new RuntimeException("Failed to retrieve all sales: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public VenteDtoResponse updateVente(Long id, VenteDtoRequest venteDtoRequest) {
        try{
            Vente vente = venteRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Vente not found with ID: "+ id));

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
            vente.setFactured(venteDtoRequest.getFactured() != null ? venteDtoRequest.getFactured() : false);

            // Save the updated Vente
            Vente updatedVente = venteRepository.save(vente);
            return mapToDto(updatedVente, updatedVente.getClients(), updatedVente.getPacks());
        }catch(DataAccessException e){
            throw new RuntimeException("Database error while updating sale with ID: " + id + "Error: " + e.getMessage());
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to update sale with ID: " + id + "Error: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void deleteVente(Long id) {
        try{
            Vente vente = venteRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Vente not found with ID: "+ id));
            venteRepository.delete(vente);
        }catch(DataAccessException e){
            throw new RuntimeException("Database error while deleting sale with ID: " + id + " Error: " + e.getMessage());
        }catch (Exception e) {
            throw new RuntimeException("Failed to delete sale with ID: " + id + " Error: " + e.getMessage());
        }

    }

    private VenteDtoResponse mapToDto(Vente vente, Set<Client> clients, Set<Pack> packs) {
        VenteDtoResponse dto = new VenteDtoResponse();
        dto.setId(vente.getId());
        dto.setSaleNumber(vente.getSaleNumber());
        dto.setQuantity(vente.getQuantity());
        dto.setPrice(vente.getPrice());
        dto.setCreatedAt(vente.getCreatedAt());
        dto.setFactured(vente.isFactured());

        // Map client names
        dto.setClientNames(clients.stream()
                .map(Client::getName)
                .collect(Collectors.toList()));

        // Map pack numbers
        dto.setPackNumbers(packs.stream()
                .map(Pack::getPackNumber)
                .collect(Collectors.toList()));

        // Map provider names
        dto.setProviderNames(packs.stream()
                .flatMap(pack -> pack.getProviders().stream())
                .map(Provider::getName)
                .collect(Collectors.toList()));
        return dto;
    }
}