package com.darkoum.darkoum.service.interfaces;

import com.darkoum.darkoum.dtos.request.ProviderDtoRequest;
import com.darkoum.darkoum.dtos.response.ProviderDtoResponse;

import java.util.List;

public interface ProviderServiceInterface {
    ProviderDtoResponse createProvider(ProviderDtoRequest providerDtoRequest);

    ProviderDtoResponse getProviderById(Long id);

    List<ProviderDtoResponse> getAllProviders();

    ProviderDtoResponse updateProvider(Long id, ProviderDtoRequest providerDtoRequest);

    void deleteProvider(Long id);
}
