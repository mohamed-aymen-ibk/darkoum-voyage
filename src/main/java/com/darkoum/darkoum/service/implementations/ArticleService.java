package com.darkoum.darkoum.service.implementations;

import com.darkoum.darkoum.dtos.request.ArticleDtoRequest;
import com.darkoum.darkoum.dtos.response.ArticleDtoResponse;
import com.darkoum.darkoum.model.Article;
import com.darkoum.darkoum.model.Pack;
import com.darkoum.darkoum.model.User;
import com.darkoum.darkoum.repository.ArticleRepository;
import com.darkoum.darkoum.repository.PackRepository;
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
    private UserRepository userRepository;

    @Autowired
    private PackRepository packRepository;


    @Override
    @Transactional
    public ArticleDtoResponse createArticle(ArticleDtoRequest articleDtoRequest) {


        User user = userRepository.findById(articleDtoRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Article article = getArticle(articleDtoRequest, user);

        try {
            Article savedArticle = articleRepository.save(article);
            return mapToDto(savedArticle);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create article: " + e.getMessage());
        }
    }

    private static Article getArticle(ArticleDtoRequest articleDtoRequest, User user) {
        Article article = new Article();
        article.setCodeArticle(articleDtoRequest.getCodeArticle());
        article.setDesignation(articleDtoRequest.getDesignation());
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
    public Page<ArticleDtoResponse> searchArticlesByDesignation(String designation, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return articleRepository.findByDesignationContainingIgnoreCase(designation,pageable)
                .map(this::mapToDto);
    }

    @Override
    @Transactional
    public ArticleDtoResponse updateArticle(Long id, ArticleDtoRequest articleDtoRequest) {

        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        article.setCodeArticle(articleDtoRequest.getCodeArticle());
        article.setDesignation(articleDtoRequest.getDesignation());

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
            List<Article> articles = pack.getArticles();

            if (articles != null && articles.contains(article)) {
                articles.remove(article);

                packRepository.save(pack);
            }
        }
        articleRepository.delete(article);
    }

    private ArticleDtoResponse mapToDto(Article article) {
        ArticleDtoResponse dto = new ArticleDtoResponse();
        dto.setId(article.getId());
        dto.setCodeArticle(article.getCodeArticle());
        dto.setDesignation(article.getDesignation());
        return dto;
    }
}