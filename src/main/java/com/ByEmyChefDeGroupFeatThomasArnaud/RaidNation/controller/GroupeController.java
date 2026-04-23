package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.entity.Groupe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.entity.Player;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.GroupeRepository;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.PlayerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

/**
 * API principale pour la gestion des groupes.
 * Fournit les operations de creation, suppression et gestion du lien groupe-player.
 */
@RestController
@RequestMapping("/api/groupes")
public class GroupeController {

    private final GroupeRepository groupeRepository;
    private final PlayerRepository playerRepository;

    public GroupeController(GroupeRepository groupeRepository, PlayerRepository playerRepository) {
        this.groupeRepository = groupeRepository;
        this.playerRepository = playerRepository;
    }

    /**
     * Cree un groupe.
     *
     * @param request payload contenant le nom
     * @return le groupe cree ou 400 si invalide
     */
    @PostMapping
    public ResponseEntity<Groupe> createGroupe(@RequestBody CreateGroupeRequest request) {
        if (request.nom() == null || request.nom().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Groupe groupe = new Groupe();
        groupe.setNom(request.nom().trim());

        return ResponseEntity.status(HttpStatus.CREATED).body(groupeRepository.save(groupe));
    }

    /**
     * Supprime un groupe et retire ses associations avec les players.
     *
     * @param id identifiant du groupe
     * @return 204 si supprime, 404 sinon
     */
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteGroupe(@PathVariable Integer id) {
        Groupe groupe = groupeRepository.findById(id).orElse(null);
        if (groupe == null) {
            return ResponseEntity.notFound().build();
        }

        ArrayList<Player> players = new ArrayList<>(groupe.getPlayers());
        for (Player player : players) {
            player.getGroupes().remove(groupe);
        }
        playerRepository.saveAll(players);

        groupeRepository.delete(groupe);
        return ResponseEntity.noContent().build();
    }

    /**
     * Associe un player a un groupe.
     *
     * @param groupeId identifiant du groupe
     * @param playerId identifiant du player
     * @return 204 si associe, 404 si une entite est absente
     */
    @PostMapping("/{groupeId}/players/{playerId}")
    @Transactional
    public ResponseEntity<Void> addPlayerToGroupe(@PathVariable Integer groupeId, @PathVariable Integer playerId) {
        Groupe groupe = groupeRepository.findById(groupeId).orElse(null);
        Player player = playerRepository.findById(playerId).orElse(null);

        if (groupe == null || player == null) {
            return ResponseEntity.notFound().build();
        }

        player.getGroupes().add(groupe);
        groupe.getPlayers().add(player);
        playerRepository.save(player);

        return ResponseEntity.noContent().build();
    }

    /**
     * Retire l'association entre un groupe et un player.
     *
     * @param groupeId identifiant du groupe
     * @param playerId identifiant du player
     * @return 204 si retire, 404 si une entite est absente
     */
    @DeleteMapping("/{groupeId}/players/{playerId}")
    @Transactional
    public ResponseEntity<Void> removePlayerFromGroupe(@PathVariable Integer groupeId, @PathVariable Integer playerId) {
        Groupe groupe = groupeRepository.findById(groupeId).orElse(null);
        Player player = playerRepository.findById(playerId).orElse(null);

        if (groupe == null || player == null) {
            return ResponseEntity.notFound().build();
        }

        player.getGroupes().remove(groupe);
        groupe.getPlayers().remove(player);
        playerRepository.save(player);

        return ResponseEntity.noContent().build();
    }

    public record CreateGroupeRequest(String nom) {
    }
}
