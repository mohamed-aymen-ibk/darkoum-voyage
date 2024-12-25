package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.ArticleDtoRequest;
import com.darkoum.darkoum.dtos.response.ArticleDtoResponse;
import com.darkoum.darkoum.model.Article;
import com.darkoum.darkoum.model.Provider;
import com.darkoum.darkoum.repository.ArticleRepository;
import com.darkoum.darkoum.repository.ProviderRepository;
import com.darkoum.darkoum.service.interfaces.ArticleServiceInterface;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ArticleService implements ArticleServiceInterface {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Override
    @Transactional
    public ArticleDtoResponse createArticle(ArticleDtoRequest articleDtoRequest) {
        Provider provider = providerRepository.findByName(articleDtoRequest.getProviderName())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        Article article = new Article();
        article.setName(articleDtoRequest.getName());
        article.setDescription(articleDtoRequest.getDescription());
        article.setPrice(articleDtoRequest.getPrice());

        // Handle the null stock here:
        if (articleDtoRequest.getStock() == null){
            article.setStock(0);
        } else {
            article.setStock(articleDtoRequest.getStock());
        }
        article.setProvider(provider);

        Article savedArticle = articleRepository.save(article);
        return mapToDto(savedArticle);
    }

    @Override
    public ArticleDtoResponse getArticleById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
        return mapToDto(article);
    }

    @Override
    public List<ArticleDtoResponse> getAllArticles() {
        return articleRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ArticleDtoResponse updateArticle(Long id, ArticleDtoRequest articleDtoRequest) {
        Provider provider = providerRepository.findByName(articleDtoRequest.getProviderName())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        article.setName(articleDtoRequest.getName());
        article.setDescription(articleDtoRequest.getDescription());
        article.setPrice(articleDtoRequest.getPrice());

        if (articleDtoRequest.getStock() == null){
            article.setStock(0);
        } else {
            article.setStock(articleDtoRequest.getStock());
        }

        article.setProvider(provider);

        Article updatedArticle = articleRepository.save(article);
        return mapToDto(updatedArticle);
    }

    @Override
    public void deleteArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
        articleRepository.delete(article);
    }

    private ArticleDtoResponse mapToDto(Article article) {
        ArticleDtoResponse dto = new ArticleDtoResponse();
        dto.setId(article.getId());
        dto.setName(article.getName());
        dto.setDescription(article.getDescription());
        dto.setPrice(article.getPrice());
        dto.setStock(article.getStock()); // Safe to do this as non-null in DB
        dto.setProviderName(article.getProvider().getName());

        return dto;
    }
}