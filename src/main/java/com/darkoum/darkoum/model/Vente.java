package com.darkoum.darkoum.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ventes")
@Getter
@Setter
@NoArgsConstructor
public class Vente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Sale number is required")
    private String saleNumber;

    @Column(nullable = false)
    @Positive(message = "Quantity must be positive")
    private Integer quantity;

    @Column(nullable = false)
    @Positive(message = "Price must be positive")
    private Float price;


    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Relations
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;


    @ManyToOne
    @JoinColumn(name = "pack_id")
    private Pack pack;
}