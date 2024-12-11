package com.darkoum.darkoum.controller;


import com.darkoum.darkoum.dtos.request.ArticleDtoRequest;
import com.darkoum.darkoum.dtos.response.ArticleDtoResponse;
import com.darkoum.darkoum.service.interfaces.ArticleServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleServiceInterface articleService;

    @PostMapping
    public ResponseEntity<ArticleDtoResponse> createArticle(@RequestBody ArticleDtoRequest articleDtoRequest) {
        return ResponseEntity.ok(articleService.createArticle(articleDtoRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDtoResponse> getArticleById(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticleById(id));
    }

    @GetMapping
    public ResponseEntity<List<ArticleDtoResponse>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleDtoResponse> updateArticle(
            @PathVariable Long id,
            @RequestBody ArticleDtoRequest articleDtoRequest) {
        return ResponseEntity.ok(articleService.updateArticle(id, articleDtoRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}
