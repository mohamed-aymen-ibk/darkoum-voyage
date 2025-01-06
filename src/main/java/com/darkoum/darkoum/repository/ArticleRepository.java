package com.darkoum.darkoum.repository;

import com.darkoum.darkoum.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.logging.Filter;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    @Query("SELECT a.name FROM Article a")
    List<String> findAllArticleNames();
    List<Article> findByNameIn(List<String> names);
    Page<Article> findByNameContainingIgnoreCase(String name, Pageable pageable);
}