package com.darkoum.darkoum.repository;


import com.darkoum.darkoum.model.Vente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface VenteRepository extends JpaRepository<Vente, Long> {

    @Query("SELECT v FROM Vente v WHERE v.factured = :facturedStatus")
    Page<Vente> findAllByFactured(boolean facturedStatus, Pageable pageable);
}