package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Groupe;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository Spring Data pour l'entite {@link Groupe}.
 */
public interface GroupeRepository extends JpaRepository<Groupe, Integer> {
}
