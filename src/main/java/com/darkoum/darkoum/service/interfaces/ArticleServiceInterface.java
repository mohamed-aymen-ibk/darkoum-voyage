package com.darkoum.darkoum.service.interfaces;

import com.darkoum.darkoum.dtos.request.ArticleDtoRequest;
import com.darkoum.darkoum.dtos.response.ArticleDtoResponse;
import org.springframework.data.domain.Page;


public interface ArticleServiceInterface {
    ArticleDtoResponse createArticle(ArticleDtoRequest articleDtoRequest);

    ArticleDtoResponse getArticleById(Long id);

    Page<ArticleDtoResponse> getAllArticles(int page, int size);

    Page<ArticleDtoResponse> searchArticlesByName(String name, int page, int size);

    ArticleDtoResponse updateArticle(Long id, ArticleDtoRequest articleDtoRequest);

    void deleteArticle(Long id);
}