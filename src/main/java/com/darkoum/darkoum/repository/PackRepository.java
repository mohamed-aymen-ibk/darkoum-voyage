package com.darkoum.darkoum.repository;

import com.darkoum.darkoum.model.Pack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PackRepository extends JpaRepository<Pack, Long> {
    Optional<Pack> findPackByName(String name);
    Optional<Pack> findPackById(Long id);
    List<Pack> findByNameContainingIgnoreCase(String name);

}