package com.darkoum.darkoum.repository;

import com.darkoum.darkoum.model.Provider;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface ProviderRepository extends JpaRepository<Provider, Long> {
    Optional<Provider> findProviderByName(@NotBlank(message = "Company name is required") String name);
    Optional<Provider> findProviderByEmail(@NotBlank(message = "Email is required") String email);
    Optional<Provider> findProviderByPhoneNumber(@NotBlank(message = "Phone number is required") String phoneNumber);
    Page<Provider> findByNameContainingIgnoreCase(String name, Pageable pageable);
    @Query("SELECT p.name FROM Provider p")
    List<String> findAllProviderNames();
}