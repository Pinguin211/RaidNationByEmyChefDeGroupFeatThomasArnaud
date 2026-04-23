package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Classe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Groupe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.PlayerRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Controller de vue en zone test pour consulter les players.
 */
@RestController
@RequestMapping("/api/players")
public class PlayerViewController {

    private final PlayerRepository playerRepository;

    public PlayerViewController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    /**
     * Retourne la liste des players avec leurs associations.
     *
     * @return liste de players
     */
    @GetMapping
    public List<PlayerResponse> listPlayers() {
        return playerRepository.findAll().stream()
                .map(player -> new PlayerResponse(
                        player.getId(),
                        player.getNom(),
                        player.getClasses().stream().map(Classe::getId).collect(Collectors.toSet()),
                        player.getGroupes().stream().map(Groupe::getId).collect(Collectors.toSet())
                ))
                .toList();
    }

    public record PlayerResponse(Integer id, String nom, Set<Integer> classeIds, Set<Integer> groupeIds) {
    }
}
