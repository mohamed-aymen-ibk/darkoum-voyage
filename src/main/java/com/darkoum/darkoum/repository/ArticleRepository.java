package com.darkoum.darkoum.repository;

import com.darkoum.darkoum.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    @Query("SELECT a.name FROM Article a")
    List<String> findAllArticleNames();
}
