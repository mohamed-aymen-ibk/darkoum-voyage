package com.darkoum.darkoum.service.interfaces;

import com.darkoum.darkoum.dtos.request.PackDtoRequest;
import com.darkoum.darkoum.dtos.response.PackDtoResponse;

import java.util.List;

public interface PackServiceInterface {
    PackDtoResponse createPack(PackDtoRequest packDtoRequest);

    PackDtoResponse getPackById(Long id);

    List<PackDtoResponse> getAllPacks();

    PackDtoResponse updatePack(Long id, PackDtoRequest packDtoRequest);

    void deletePack(Long id);
}
