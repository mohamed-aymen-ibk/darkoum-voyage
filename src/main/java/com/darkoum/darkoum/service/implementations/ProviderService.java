package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.ProviderDtoRequest;
import com.darkoum.darkoum.dtos.response.ProviderDtoResponse;
import com.darkoum.darkoum.model.Provider;
import com.darkoum.darkoum.model.User;
import com.darkoum.darkoum.repository.ProviderRepository;
import com.darkoum.darkoum.repository.UserRepository;
import com.darkoum.darkoum.service.interfaces.ProviderServiceInterface;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class ProviderService implements ProviderServiceInterface {

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ProviderDtoResponse createProvider(ProviderDtoRequest providerDtoRequest) {
        // Retrieve the currently logged-in user
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User loggedInUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create the provider entity
        Provider provider = new Provider();
        provider.setName(providerDtoRequest.getName());
        provider.setEmail(providerDtoRequest.getEmail());
        provider.setPhoneNumber(providerDtoRequest.getPhone());
        provider.setUser(loggedInUser);

        // Save the provider to the database
        Provider savedProvider = providerRepository.save(provider);

        // Return the DTO response
        return mapToDto(savedProvider);
    }

    @Override
    public ProviderDtoResponse getProviderById(Long id) {
        // Fetch the provider by ID from the database
        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        // Return the DTO response
        return mapToDto(provider);
    }

    @Override
    public List<ProviderDtoResponse> getAllProviders() {
        // Fetch all providers and map them to DTO responses
        return providerRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProviderDtoResponse updateProvider(Long id, ProviderDtoRequest providerDtoRequest) {
        // Fetch the provider by ID
        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        // Update provider fields
        provider.setName(providerDtoRequest.getName());
        provider.setEmail(providerDtoRequest.getEmail());
        provider.setPhoneNumber(providerDtoRequest.getPhone());

        // Save the updated provider
        Provider updatedProvider = providerRepository.save(provider);

        // Return the updated provider DTO
        return mapToDto(updatedProvider);
    }

    @Override
    public void deleteProvider(Long id) {
        // Fetch and delete the provider by ID
        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        providerRepository.delete(provider);
    }

    // Helper method to map Provider entity to DTO
    private ProviderDtoResponse mapToDto(Provider provider) {
        ProviderDtoResponse dto = new ProviderDtoResponse();
        dto.setId(provider.getId());
        dto.setName(provider.getName());
        dto.setEmail(provider.getEmail());
        dto.setPhone(provider.getPhoneNumber());
        return dto;
    }
}
