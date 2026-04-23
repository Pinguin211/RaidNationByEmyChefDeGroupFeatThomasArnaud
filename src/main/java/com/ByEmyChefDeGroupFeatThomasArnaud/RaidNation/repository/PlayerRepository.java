package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository Spring Data pour l'entite {@link Player}.
 */
public interface PlayerRepository extends JpaRepository<Player, Integer> {
}
