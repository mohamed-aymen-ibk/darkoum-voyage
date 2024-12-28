package com.darkoum.darkoum.repository;

import com.darkoum.darkoum.model.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByUserId(Long userId);
    Page<Client> findByNameContainingIgnoreCase(String name, Pageable pageable);
}