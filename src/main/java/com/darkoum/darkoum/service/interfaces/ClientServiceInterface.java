package com.darkoum.darkoum.service.interfaces;

import com.darkoum.darkoum.dtos.request.ClientDtoRequest;
import com.darkoum.darkoum.dtos.response.ClientDtoResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ClientServiceInterface {
    ClientDtoResponse createClient(ClientDtoRequest clientDtoRequest);

    ClientDtoResponse getClientById(Long id);

    Page<ClientDtoResponse> getAllClients(int page, int size);

    Page<ClientDtoResponse> searchClientsByName(String name, int page, int size);

    List<ClientDtoResponse> getClientsByUser(Long userId);

    ClientDtoResponse updateClient(Long id, ClientDtoRequest clientDtoRequest);

    void deleteClient(Long id);

    List<String> getAllClientNames();
}