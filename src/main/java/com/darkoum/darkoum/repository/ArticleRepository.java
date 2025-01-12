package com.darkoum.darkoum.repository;

import com.darkoum.darkoum.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    @Query("SELECT a.codeArticle FROM Article a")
    List<String> findAllArticleCodes();

    Page<Article> findByDesignationContainingIgnoreCase(String designation, Pageable pageable);

    List<Article> findByCodeArticleIn(List<String> codeArticles);
}