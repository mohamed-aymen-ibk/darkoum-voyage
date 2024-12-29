package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.ArticleDtoRequest;
import com.darkoum.darkoum.dtos.response.ArticleDtoResponse;
import com.darkoum.darkoum.model.Article;
import com.darkoum.darkoum.model.Pack;
import com.darkoum.darkoum.model.Provider;
import com.darkoum.darkoum.model.User;
import com.darkoum.darkoum.repository.ArticleRepository;
import com.darkoum.darkoum.repository.PackRepository;
import com.darkoum.darkoum.repository.ProviderRepository;
import com.darkoum.darkoum.repository.UserRepository;
import com.darkoum.darkoum.service.interfaces.ArticleServiceInterface;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ArticleService implements ArticleServiceInterface {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PackRepository packRepository;


    @Override
    @Transactional
    public ArticleDtoResponse createArticle(ArticleDtoRequest articleDtoRequest) {
        Provider provider = providerRepository.findProviderByName(articleDtoRequest.getProviderName())
                .orElseThrow(() -> new RuntimeException("Provider not found or multiple providers with the same name were found"));

        User user = userRepository.findById(articleDtoRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Article article = getArticle(articleDtoRequest, provider, user);

        try {
            Article savedArticle = articleRepository.save(article);
            return mapToDto(savedArticle);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create article: " + e.getMessage());
        }
    }

    private static Article getArticle(ArticleDtoRequest articleDtoRequest, Provider provider, User user) {
        Article article = new Article();
        article.setName(articleDtoRequest.getName());
        article.setDescription(articleDtoRequest.getDescription());
        article.setPrice(articleDtoRequest.getPrice());

        // Handle the null stock here:
        if (articleDtoRequest.getStock() == null) {
            article.setStock(0);
        } else {
            article.setStock(articleDtoRequest.getStock());
        }
        article.setProvider(provider);
        article.setUser(user); // Set the user here
        return article;
    }

    @Override
    public ArticleDtoResponse getArticleById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
        return mapToDto(article);
    }

    @Override
    public Page<ArticleDtoResponse> getAllArticles(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return articleRepository.findAll(pageable)
                .map(this::mapToDto);
    }
    @Override
    public Page<ArticleDtoResponse> searchArticlesByName(String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return articleRepository.findByNameContainingIgnoreCase(name, pageable)
                .map(this::mapToDto);
    }

    @Override
    @Transactional
    public ArticleDtoResponse updateArticle(Long id, ArticleDtoRequest articleDtoRequest) {
        Provider provider = providerRepository.findProviderByName(articleDtoRequest.getProviderName())
                .orElseThrow(() -> new RuntimeException("Provider not found or multiple providers with the same name were found"));

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        article.setName(articleDtoRequest.getName());
        article.setDescription(articleDtoRequest.getDescription());
        article.setPrice(articleDtoRequest.getPrice());

        if (articleDtoRequest.getStock() == null) {
            article.setStock(0);
        } else {
            article.setStock(articleDtoRequest.getStock());
        }

        article.setProvider(provider);

        try {
            Article updatedArticle = articleRepository.save(article);
            return mapToDto(updatedArticle);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update article: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public void deleteArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        // Get all packs that reference this article
        List<Pack> packs = packRepository.findAll();
        for (Pack pack : packs) {
            // Get the articles in this pack
            List<Article> articles = pack.getArticles();

            if (articles != null && articles.contains(article)) {
                // if this article is part of the list, remove it
                articles.remove(article);

                // Persist the updated pack
                packRepository.save(pack);
            }
        }
        // Then delete the article
        articleRepository.delete(article);
    }

    private ArticleDtoResponse mapToDto(Article article) {
        ArticleDtoResponse dto = new ArticleDtoResponse();
        dto.setId(article.getId());
        dto.setName(article.getName());
        dto.setDescription(article.getDescription());
        dto.setPrice(article.getPrice());
        dto.setStock(article.getStock());
        if(article.getProvider() != null)
        {
            dto.setProviderName(article.getProvider().getName());
        }
        return dto;
    }
}