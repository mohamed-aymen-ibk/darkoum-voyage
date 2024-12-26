// Updated src/main/java/com/darkoum/darkoum/service/implementations/ProviderService.java
package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.ProviderDtoRequest;
import com.darkoum.darkoum.dtos.response.ProviderDtoResponse;
import com.darkoum.darkoum.model.Provider;
import com.darkoum.darkoum.model.User;
import com.darkoum.darkoum.repository.ProviderRepository;
import com.darkoum.darkoum.repository.UserRepository;
import com.darkoum.darkoum.service.interfaces.ProviderServiceInterface;
import com.darkoum.darkoum.exeption.ResourceNotFoundException;
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
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        if (email == null || email.isEmpty()) {
            throw new ResourceNotFoundException("User not authenticated");
        }

        // Fetch the authenticated user by email
        User loggedInUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Proceed to create the provider
        Provider provider = new Provider();
        provider.setName(providerDtoRequest.getName());
        provider.setEmail(providerDtoRequest.getEmail());
        provider.setPhoneNumber(providerDtoRequest.getPhone());
        provider.setUser(loggedInUser); // Associate provider with the logged-in user

        Provider savedProvider = providerRepository.save(provider);

        // Map the saved provider to response DTO
        return mapToDto(savedProvider);
    }

    @Override
    public ProviderDtoResponse getProviderById(Long id) {
        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Provider not found"));
        return mapToDto(provider);
    }

    @Override
    public List<ProviderDtoResponse> getAllProviders() {
        return providerRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProviderDtoResponse updateProvider(Long id, ProviderDtoRequest providerDtoRequest) {
        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Provider not found"));

        provider.setName(providerDtoRequest.getName());
        provider.setEmail(providerDtoRequest.getEmail());
        provider.setPhoneNumber(providerDtoRequest.getPhone());


        Provider updatedProvider = providerRepository.save(provider);
        return mapToDto(updatedProvider);
    }

    @Override
    public void deleteProvider(Long id) {
        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Provider not found"));
        providerRepository.delete(provider);
    }

    private ProviderDtoResponse mapToDto(Provider provider) {
        ProviderDtoResponse dto = new ProviderDtoResponse();
        dto.setId(provider.getId());
        dto.setName(provider.getName());
        dto.setEmail(provider.getEmail());
        dto.setPhone(provider.getPhoneNumber());
        return dto;
    }
}