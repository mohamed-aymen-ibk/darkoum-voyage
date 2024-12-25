package com.darkoum.darkoum.repository;

import com.darkoum.darkoum.model.Provider;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProviderRepository extends JpaRepository<Provider, Long> {
    Optional<Provider> findProviderByName(@NotBlank(message = "Company name is required") String name);
    Optional<Provider> findProviderByEmail(@NotBlank(message = "Email is required") String email);
    Optional<Provider> findProviderByPhoneNumber(@NotBlank(message = "Phone number is required") String phoneNumber);
    Optional<Provider> findProviderById(@NotBlank(message = "Provider id is required") long id);
}
