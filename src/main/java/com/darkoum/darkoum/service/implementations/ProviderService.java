package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.ProviderDtoRequest;
import com.darkoum.darkoum.dtos.response.ProviderDtoResponse;
import com.darkoum.darkoum.model.Provider;
import com.darkoum.darkoum.repository.ProviderRepository;
import com.darkoum.darkoum.service.interfaces.ProviderServiceInterface;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class ProviderService implements ProviderServiceInterface {

    @Autowired
    private ProviderRepository providerRepository;

    @Override
    public ProviderDtoResponse createProvider(ProviderDtoRequest providerDtoRequest) {
        Provider provider = new Provider();
        provider.setCompanyName(providerDtoRequest.getName());
        provider.setEmail(providerDtoRequest.getEmail());
        provider.setPhoneNumber(providerDtoRequest.getPhone());

        Provider savedProvider = providerRepository.save(provider);

        return mapToDto(savedProvider);
    }

    @Override
    public ProviderDtoResponse getProviderById(Long id) {
        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
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
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        provider.setCompanyName(providerDtoRequest.getName());
        provider.setEmail(providerDtoRequest.getEmail());
        provider.setPhoneNumber(providerDtoRequest.getPhone());

        Provider updatedProvider = providerRepository.save(provider);

        return mapToDto(updatedProvider);
    }

    @Override
    public void deleteProvider(Long id) {
        Provider provider = providerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Provider not found"));
        providerRepository.delete(provider);
    }

    private ProviderDtoResponse mapToDto(Provider provider) {
        ProviderDtoResponse dto = new ProviderDtoResponse();
        dto.setId(provider.getId());
        dto.setName(provider.getCompanyName());
        dto.setEmail(provider.getEmail());
        dto.setPhone(provider.getPhoneNumber());
        return dto;
    }
}
