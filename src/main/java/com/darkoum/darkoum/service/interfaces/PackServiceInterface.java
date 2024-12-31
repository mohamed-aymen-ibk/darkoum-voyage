package com.darkoum.darkoum.service.interfaces;

import com.darkoum.darkoum.dtos.request.PackDtoRequest;
import com.darkoum.darkoum.dtos.response.PackDtoResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PackServiceInterface {
    PackDtoResponse createPack(PackDtoRequest packDtoRequest);

    List<String> getAllPackNames();

    List<String> getAllArticleNames();

    PackDtoResponse getPackById(Long id);

    Page<PackDtoResponse> getAllPacks(int page, int size);

    Page<PackDtoResponse> searchPacksByName(String name, int page, int size);

    PackDtoResponse updatePack(Long id, PackDtoRequest packDtoRequest);

    void deletePack(Long id);
}