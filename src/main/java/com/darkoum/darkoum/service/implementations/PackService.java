package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.PackDtoRequest;
import com.darkoum.darkoum.dtos.response.PackDtoResponse;
import com.darkoum.darkoum.model.Article;
import com.darkoum.darkoum.model.Pack;
import com.darkoum.darkoum.repository.ArticleRepository;
import com.darkoum.darkoum.repository.PackRepository;
import com.darkoum.darkoum.service.interfaces.PackServiceInterface;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

    @Override
    public PackDtoResponse createPack(PackDtoRequest packDtoRequest) {
        Pack pack = new Pack();
        pack.setName(packDtoRequest.getName());
        pack.setDescription(packDtoRequest.getDescription());
        pack.setPrice(packDtoRequest.getPrice());

        if (packDtoRequest.getArticleNames() != null && !packDtoRequest.getArticleNames().isEmpty()) {
            List<Article> articles = articleRepository.findByNameIn(packDtoRequest.getArticleNames());
            pack.setArticles(articles);
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
    public Page<PackDtoResponse> searchPacksByName(String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return packRepository.findByNameContainingIgnoreCase(name, pageable)
                .map(this::mapToDto);
    }


    @Override
    public PackDtoResponse updatePack(Long id, PackDtoRequest packDtoRequest) {
        Pack pack = packRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pack not found"));

        pack.setName(packDtoRequest.getName());
        pack.setDescription(packDtoRequest.getDescription());
        pack.setPrice(packDtoRequest.getPrice());
        if (packDtoRequest.getArticleNames() != null && !packDtoRequest.getArticleNames().isEmpty()) {
            List<Article> articles = articleRepository.findByNameIn(packDtoRequest.getArticleNames());
            pack.setArticles(articles);
        }

        Pack updatedPack = packRepository.save(pack);

        return mapToDto(updatedPack);
    }

    @Override
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
        dto.setName(pack.getName());
        dto.setDescription(pack.getDescription());
        dto.setPrice(pack.getPrice());
        if (pack.getArticles() != null) {
            dto.setArticleNames(pack.getArticles().stream().map(Article::getName).collect(Collectors.toList()));
        }
        return dto;
    }
    @Override
    public List<String> getAllPackNames() {
        return packRepository.findAllPackNames();
    }

    public List<String> getAllArticleNames() {
        return articleRepository.findAllArticleNames();
    }
}