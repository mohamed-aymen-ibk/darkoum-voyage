package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.ClientDtoRequest;
import com.darkoum.darkoum.dtos.response.ClientDtoResponse;
import com.darkoum.darkoum.model.Client;
import com.darkoum.darkoum.model.User;
import com.darkoum.darkoum.repository.ClientRepository;
import com.darkoum.darkoum.repository.UserRepository;
import com.darkoum.darkoum.service.interfaces.ClientServiceInterface;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClientService implements ClientServiceInterface {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ClientDtoResponse createClient(ClientDtoRequest clientDtoRequest) {
        User user = userRepository.findById(clientDtoRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Client client = new Client();
        client.setName(clientDtoRequest.getName());
        client.setEmail(clientDtoRequest.getEmail());
        client.setPhoneNumber(clientDtoRequest.getPhoneNumber());
        client.setAddress(clientDtoRequest.getAddress());
        client.setUser(user);

        Client savedClient = clientRepository.save(client);

        return mapToDto(savedClient);
    }

    @Override
    public ClientDtoResponse getClientById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        return mapToDto(client);
    }

    @Override
    public List<ClientDtoResponse> getAllClients() {
        return clientRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ClientDtoResponse> getClientsByUser(Long userId) {
        return clientRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ClientDtoResponse updateClient(Long id, ClientDtoRequest clientDtoRequest) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        client.setName(clientDtoRequest.getName());
        client.setEmail(clientDtoRequest.getEmail());
        client.setPhoneNumber(clientDtoRequest.getPhoneNumber());
        client.setAddress(clientDtoRequest.getAddress());

        Client updatedClient = clientRepository.save(client);

        return mapToDto(updatedClient);
    }

    @Override
    public void deleteClient(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        clientRepository.delete(client);
    }

    private ClientDtoResponse mapToDto(Client client) {
        ClientDtoResponse dto = new ClientDtoResponse();
        dto.setId(client.getId());
        dto.setName(client.getName());
        dto.setEmail(client.getEmail());
        dto.setPhoneNumber(client.getPhoneNumber());
        dto.setAddress(client.getAddress());
        dto.setUserName(client.getUser().getName());
        return dto;
    }
}
