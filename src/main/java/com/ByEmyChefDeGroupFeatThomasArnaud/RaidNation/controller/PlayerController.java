package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.entity.Classe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.entity.Groupe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.entity.Player;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.ClasseRepository;
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
 * API principale pour la gestion des players.
 * Fournit les operations de creation, suppression et gestion du lien player-classe.
 */
@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerRepository playerRepository;
    private final ClasseRepository classeRepository;

    public PlayerController(PlayerRepository playerRepository, ClasseRepository classeRepository) {
        this.playerRepository = playerRepository;
        this.classeRepository = classeRepository;
    }

    /**
     * Cree un player.
     *
     * @param request payload contenant le nom
     * @return le player cree ou 400 si invalide
     */
    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody CreatePlayerRequest request) {
        if (request.nom() == null || request.nom().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Player player = new Player();
        player.setNom(request.nom().trim());

        return ResponseEntity.status(HttpStatus.CREATED).body(playerRepository.save(player));
    }

    /**
     * Supprime un player et nettoie ses associations many-to-many.
     *
     * @param id identifiant du player
     * @return 204 si supprime, 404 sinon
     */
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletePlayer(@PathVariable Integer id) {
        Player player = playerRepository.findById(id).orElse(null);
        if (player == null) {
            return ResponseEntity.notFound().build();
        }

        ArrayList<Classe> classes = new ArrayList<>(player.getClasses());
        for (Classe classe : classes) {
            classe.getPlayers().remove(player);
        }

        ArrayList<Groupe> groupes = new ArrayList<>(player.getGroupes());
        for (Groupe groupe : groupes) {
            groupe.getPlayers().remove(player);
        }

        player.getClasses().clear();
        player.getGroupes().clear();
        playerRepository.save(player);

        playerRepository.delete(player);
        return ResponseEntity.noContent().build();
    }

    /**
     * Associe une classe a un player.
     *
     * @param playerId identifiant du player
     * @param classeId identifiant de la classe
     * @return 204 si associe, 404 si une entite est absente
     */
    @PostMapping("/{playerId}/classes/{classeId}")
    @Transactional
    public ResponseEntity<Void> addClasseToPlayer(@PathVariable Integer playerId, @PathVariable Integer classeId) {
        Player player = playerRepository.findById(playerId).orElse(null);
        Classe classe = classeRepository.findById(classeId).orElse(null);

        if (player == null || classe == null) {
            return ResponseEntity.notFound().build();
        }

        player.getClasses().add(classe);
        classe.getPlayers().add(player);
        playerRepository.save(player);

        return ResponseEntity.noContent().build();
    }

    /**
     * Retire l'association entre un player et une classe.
     *
     * @param playerId identifiant du player
     * @param classeId identifiant de la classe
     * @return 204 si retire, 404 si une entite est absente
     */
    @DeleteMapping("/{playerId}/classes/{classeId}")
    @Transactional
    public ResponseEntity<Void> removeClasseFromPlayer(@PathVariable Integer playerId, @PathVariable Integer classeId) {
        Player player = playerRepository.findById(playerId).orElse(null);
        Classe classe = classeRepository.findById(classeId).orElse(null);

        if (player == null || classe == null) {
            return ResponseEntity.notFound().build();
        }

        player.getClasses().remove(classe);
        classe.getPlayers().remove(player);
        playerRepository.save(player);

        return ResponseEntity.noContent().build();
    }

    public record CreatePlayerRequest(String nom) {
    }
}
