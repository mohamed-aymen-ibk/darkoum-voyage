package com.darkoum.darkoum.service.interfaces;

import com.darkoum.darkoum.dtos.request.ProviderDtoRequest;
import com.darkoum.darkoum.dtos.response.ProviderDtoResponse;
import org.springframework.data.domain.Page;

import java.util.List;


public interface ProviderServiceInterface {
    ProviderDtoResponse createProvider(ProviderDtoRequest providerDtoRequest);

    ProviderDtoResponse getProviderById(Long id);

    Page<ProviderDtoResponse> getAllProviders(int page, int size);

    Page<ProviderDtoResponse> searchProvidersByName(String name, int page, int size);

    ProviderDtoResponse updateProvider(Long id, ProviderDtoRequest providerDtoRequest);

    void deleteProvider(Long id);

    List<String> getAllProviderNames();
}