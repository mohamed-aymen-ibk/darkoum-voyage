package com.darkoum.darkoum.service.interfaces;

import com.darkoum.darkoum.dtos.request.ArticleDtoRequest;
import com.darkoum.darkoum.dtos.response.ArticleDtoResponse;

import java.util.List;

public interface ArticleServiceInterface {
    ArticleDtoResponse createArticle(ArticleDtoRequest articleDtoRequest);

    ArticleDtoResponse getArticleById(Long id);

    List<ArticleDtoResponse> getAllArticles();

    ArticleDtoResponse updateArticle(Long id, ArticleDtoRequest articleDtoRequest);

    void deleteArticle(Long id);
}
