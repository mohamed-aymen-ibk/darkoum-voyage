package com.darkoum.darkoum.repository;

import com.darkoum.darkoum.model.Pack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PackRepository extends JpaRepository<Pack, Long> {

    @Query("SELECT p.packNumber FROM Pack p")
    List<String> findAllPackNames();

    Page<Pack> findByPackNumberContainingIgnoreCase(String packNumber, Pageable pageable);

    List<Pack> findByPackNumberIn(List<String> packNumbers);

}