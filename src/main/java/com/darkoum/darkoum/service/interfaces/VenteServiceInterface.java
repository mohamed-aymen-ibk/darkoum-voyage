package com.darkoum.darkoum.service.interfaces;

import com.darkoum.darkoum.dtos.request.VenteDtoRequest;
import com.darkoum.darkoum.dtos.response.VenteDtoResponse;

import java.util.List;

public interface VenteServiceInterface {
    VenteDtoResponse createVente(VenteDtoRequest venteDtoRequest);

    VenteDtoResponse getVenteById(Long id);

    List<VenteDtoResponse> getAllVentes();

    VenteDtoResponse updateVente(Long id, VenteDtoRequest venteDtoRequest);

    void deleteVente(Long id);

}