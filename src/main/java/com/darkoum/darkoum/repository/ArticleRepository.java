package com.darkoum.darkoum.repository;

import com.darkoum.darkoum.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
