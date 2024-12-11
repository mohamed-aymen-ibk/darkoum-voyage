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
    public ArticleDtoResponse createArticle(ArticleDtoRequest articleDtoRequest) {
        Provider provider = providerRepository.findById(articleDtoRequest.getProviderId())
                .orElseThrow(() -> new RuntimeException("Provider not found"));

        Article article = new Article();
        article.setName(articleDtoRequest.getName());
        article.setPrice(articleDtoRequest.getPrice());
        article.setStock(articleDtoRequest.getStock());
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
    public ArticleDtoResponse updateArticle(Long id, ArticleDtoRequest articleDtoRequest) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        article.setName(articleDtoRequest.getName());
        article.setPrice(articleDtoRequest.getPrice());
        article.setStock(articleDtoRequest.getStock());

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
        dto.setPrice(article.getPrice());
        dto.setStock(article.getStock());
        dto.setProviderName(article.getProvider().getCompanyName());
        return dto;
    }
}
