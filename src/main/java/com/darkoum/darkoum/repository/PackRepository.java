package com.darkoum.darkoum.repository;

import com.darkoum.darkoum.model.Pack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PackRepository extends JpaRepository<Pack, Long> {
    Optional<Pack> findByName(String name);
    Optional<Pack> findById(Long id);
}
