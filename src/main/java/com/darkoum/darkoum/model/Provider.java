package com.darkoum.darkoum.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "providers")
@Getter
@Setter
@NoArgsConstructor
public class Provider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "Company name is required")
    private String name;

    @Column(unique = true, nullable = false)
    @Email(message = "Email should be valid")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column
    private String address;

    @Column(name = "service_type")
    private String serviceType;

    @Column(name = "code_provider")
    private String codeProvider;

    @Column(name = "designation")
    private String designation;

    @Column(name = "ice")
    private String ice;

    @Column(name = "rc")
    private String rc;

    @Column(name = "rib")
    private String rib;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    //relations
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}