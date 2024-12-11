package com.darkoum.darkoum.service.interfaces;

import com.darkoum.darkoum.dtos.request.ClientDtoRequest;
import com.darkoum.darkoum.dtos.response.ClientDtoResponse;

import java.util.List;

public interface ClientServiceInterface {
    ClientDtoResponse createClient(ClientDtoRequest clientDtoRequest);

    ClientDtoResponse getClientById(Long id);

    List<ClientDtoResponse> getAllClients();

    List<ClientDtoResponse> getClientsByUser(Long userId);

    ClientDtoResponse updateClient(Long id, ClientDtoRequest clientDtoRequest);

    void deleteClient(Long id);
}
