package com.darkoum.darkoum.repository;

import com.darkoum.darkoum.model.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Page<Client> findByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query("SELECT c.name FROM Client c")
    List<String> findAllClientNames();

    @Query("SELECT c.codeClient FROM Client c")
    List<String> findAllCodeClients();

    List<Client> findByUserId(Long userId);

    @Query("SELECT c FROM Client c")
    Page<Client> findAllClients(Pageable pageable);

    List<Client> findByNameIn(List<String> names);
}