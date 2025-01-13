package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.PackDtoRequest;
import com.darkoum.darkoum.dtos.response.PackDtoResponse;
import com.darkoum.darkoum.model.Article;
import com.darkoum.darkoum.model.Pack;
import com.darkoum.darkoum.model.Provider;
import com.darkoum.darkoum.repository.ArticleRepository;
import com.darkoum.darkoum.repository.PackRepository;
import com.darkoum.darkoum.repository.ProviderRepository;
import com.darkoum.darkoum.service.interfaces.PackServiceInterface;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    @Transactional
    public PackDtoResponse createPack(PackDtoRequest packDtoRequest) {
        Pack pack = new Pack();
        pack.setPackNumber(packDtoRequest.getPackNumber());
        pack.setPrice(packDtoRequest.getPrice());
        pack.setQuantity(packDtoRequest.getQuantity());
        if (packDtoRequest.getArticleNames() != null && !packDtoRequest.getArticleNames().isEmpty()) {
            List<Article> articles = articleRepository.findByCodeArticleIn(packDtoRequest.getArticleNames());
            pack.setArticles(articles);
        }
        if(packDtoRequest.getProviderNames() != null && !packDtoRequest.getProviderNames().isEmpty())
        {
            List<Provider> providers =  providerRepository.findProvidersByNameIn(packDtoRequest.getProviderNames());
            pack.setProviders(providers);
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
        if (packDtoRequest.getArticleNames() != null && !packDtoRequest.getArticleNames().isEmpty()) {
            List<Article> articles = articleRepository.findByCodeArticleIn(packDtoRequest.getArticleNames());
            pack.setArticles(articles);
        }
        if(packDtoRequest.getProviderNames() != null && !packDtoRequest.getProviderNames().isEmpty())
        {
            List<Provider> providers =  providerRepository.findProvidersByNameIn(packDtoRequest.getProviderNames());
            pack.setProviders(providers);
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
        if (pack.getArticles() != null) {
            dto.setArticleNames(pack.getArticles().stream()
                    .map(Article::getCodeArticle)
                    .collect(Collectors.toList()));
        }
        if (pack.getProviders() != null)
        {
            dto.setProviderNames(pack.getProviders().stream().map(Provider::getName).collect(Collectors.toList()));
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
}