package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.PackDtoRequest;
import com.darkoum.darkoum.dtos.response.PackDtoResponse;
import com.darkoum.darkoum.model.Article;
import com.darkoum.darkoum.model.Client;
import com.darkoum.darkoum.model.Pack;
import com.darkoum.darkoum.model.Provider;
import com.darkoum.darkoum.repository.ArticleRepository;
import com.darkoum.darkoum.repository.ClientRepository;
import com.darkoum.darkoum.repository.PackRepository;
import com.darkoum.darkoum.repository.ProviderRepository;
import com.darkoum.darkoum.service.interfaces.PackServiceInterface;
import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class PackService implements PackServiceInterface {
    private static final Logger logger = LoggerFactory.getLogger(PackService.class);

    @Autowired
    private PackRepository packRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Override
    @Transactional
    public PackDtoResponse createPack(PackDtoRequest packDtoRequest) {
        Pack pack = new Pack();
        pack.setPackNumber(packDtoRequest.getPackNumber());
        pack.setPrice(packDtoRequest.getPrice());
        pack.setQuantity(packDtoRequest.getQuantity());
        pack.setStorable(packDtoRequest.getStorable());

        // Set Articles
        if (packDtoRequest.getArticleNames() != null && !packDtoRequest.getArticleNames().isEmpty()) {
            List<Article> articles = articleRepository.findByCodeArticleIn(packDtoRequest.getArticleNames());
            pack.setArticles(articles);
        }

        // Set Providers
        if (packDtoRequest.getProviderNames() != null && !packDtoRequest.getProviderNames().isEmpty()) {
            List<Provider> providers = providerRepository.findProvidersByNameIn(packDtoRequest.getProviderNames());
            pack.setProviders(providers);
        }

        // Set Clients
        if (packDtoRequest.getClientNames() != null && !packDtoRequest.getClientNames().isEmpty()) {
            List<Client> clients = clientRepository.findByNameIn(packDtoRequest.getClientNames());
            pack.setClients(clients);
        }

        Pack savedPack = packRepository.save(pack);
        return mapToDto(savedPack);
    }

    @Override
    public PackDtoResponse getPackById(Long id) {
        Pack pack = packRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pack not found"));
        return mapToDto(pack);
    }

    @Override
    public Page<PackDtoResponse> getAllPacks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return packRepository.findAll(pageable)
                .map(this::mapToDto);
    }
    @Override
    public Page<PackDtoResponse> getAllPacks(int page, int size, String storableStatus) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Specification<Pack> spec = getPackSpecification(storableStatus);

            return packRepository.findAll(spec, pageable)
                    .map(this::mapToDto);

        } catch (DataAccessException e) {
            throw new RuntimeException("Database error while retrieving sales: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve sales: " + e.getMessage());
        }
    }



    @Override
    public Page<PackDtoResponse> searchPacksByPackNumber(String packNumber, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return packRepository.findByPackNumberContainingIgnoreCase(packNumber, pageable)
                .map(this::mapToDto);
    }

    @Override
    @Transactional
    public PackDtoResponse updatePack(Long id, PackDtoRequest packDtoRequest) {
        Pack pack = packRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pack not found"));

        pack.setPackNumber(packDtoRequest.getPackNumber());
        pack.setPrice(packDtoRequest.getPrice());
        pack.setQuantity(packDtoRequest.getQuantity());
        pack.setStorable(packDtoRequest.getStorable());

        // Update Articles
        if (packDtoRequest.getArticleNames() != null && !packDtoRequest.getArticleNames().isEmpty()) {
            List<Article> articles = articleRepository.findByCodeArticleIn(packDtoRequest.getArticleNames());
            pack.setArticles(articles);
        }

        // Update Providers
        if (packDtoRequest.getProviderNames() != null && !packDtoRequest.getProviderNames().isEmpty()) {
            List<Provider> providers = providerRepository.findProvidersByNameIn(packDtoRequest.getProviderNames());
            pack.setProviders(providers);
        }

        // Update Clients
        if (packDtoRequest.getClientNames() != null && !packDtoRequest.getClientNames().isEmpty()) {
            List<Client> clients = clientRepository.findByNameIn(packDtoRequest.getClientNames());
            pack.setClients(clients);
        }

        Pack updatedPack = packRepository.save(pack);
        return mapToDto(updatedPack);
    }

    @Override
    @Transactional
    public void deletePack(Long id) {
        logger.info("Deleting pack with id: {}", id);
        Pack pack = packRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pack not found"));
        logger.info("Pack found: {}", pack);
        packRepository.delete(pack);
        logger.info("Pack with id: {} deleted", id);
    }

    private PackDtoResponse mapToDto(Pack pack) {
        PackDtoResponse dto = new PackDtoResponse();
        dto.setId(pack.getId());
        dto.setPackNumber(pack.getPackNumber());
        dto.setPrice(pack.getPrice());
        dto.setQuantity(pack.getQuantity());
        dto.setStorable(pack.getStorable());

        if (pack.getArticles() != null) {
            dto.setArticleNames(pack.getArticles().stream()
                    .map(Article::getCodeArticle).toList());
        }

        if (pack.getProviders() != null) {
            dto.setProviderNames(pack.getProviders().stream()
                    .map(Provider::getName).toList());
        }

        if (pack.getClients() != null) {
            dto.setClientNames(pack.getClients().stream()
                    .map(Client::getName).toList());
        }

        dto.setCreatedAt(pack.getCreatedAt());
        return dto;
    }

    @Override
    public List<String> getAllPackNames() {
        return packRepository.findAllPackNames();
    }

    @Override
    public List<String> getAllArticleNames() {
        return articleRepository.findAllArticleCodes();
    }
    @Override
    public List<String> getClientNames(){
        return clientRepository.findAllClientNames();
    }
    @Override
    public List<String> getAllProviderNames() {
        return providerRepository.findAllProviderNames();
    }


    private Specification<Pack> getPackSpecification(String storableStatus) {
        return (root, query, criteriaBuilder) -> {
            if ("Storable".equalsIgnoreCase(storableStatus)) {
                return criteriaBuilder.equal(root.get("storable"), true);
            } else if ("Not Storable".equalsIgnoreCase(storableStatus)) {
                return criteriaBuilder.equal(root.get("storable"), false);
            } else {
                return null; // No filter
            }
        };
    }
}