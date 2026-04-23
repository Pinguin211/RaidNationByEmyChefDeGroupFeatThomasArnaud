package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Activite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository pour gérer l'entité Activite et ses sous-classes (Raid, ChasseTresor).
 */
@Repository
public interface ActiviteRepository extends JpaRepository<Activite, Long> {
    // Spring Data JPA générera automatiquement les méthodes save, findAll, etc.
}