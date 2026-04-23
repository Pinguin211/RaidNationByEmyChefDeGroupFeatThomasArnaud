package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Groupe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Player;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.GroupeRepository;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.PlayerRepository;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.ActiviteRepository;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Activite;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List; // Ton import nécessaire pour getAllGroupes()

/**
 * API principale pour la gestion des groupes.
 * Fournit les operations de creation, suppression et gestion du lien groupe-player.
 */
@RestController
@RequestMapping("/api/groupes")
public class GroupeController {

    private final GroupeRepository groupeRepository;
    private final PlayerRepository playerRepository;
    private final ActiviteRepository activiteRepository;

    public GroupeController(GroupeRepository groupeRepository, PlayerRepository playerRepository, ActiviteRepository activiteRepository) {
        this.groupeRepository = groupeRepository;
        this.playerRepository = playerRepository;
        this.activiteRepository = activiteRepository;
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
    
    @GetMapping
    public ResponseEntity<List<Groupe>> getAllGroupes() {
        return ResponseEntity.ok(groupeRepository.findAll());
    }

    /**
     * Récupère un groupe spécifique par son ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Groupe> getGroupeById(@PathVariable Integer id) {
        return groupeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Associe une activite (Raid/Chasse) a un groupe.
     *
     * @param groupeId identifiant du groupe
     * @param activiteId identifiant de l'activite (Attention, c'est un Long)
     * @return 204 si associe, 404 si une entite est absente
     */
    @PostMapping("/{groupeId}/activites/{activiteId}")
    @Transactional
    public ResponseEntity<Void> addActiviteToGroupe(@PathVariable Integer groupeId, @PathVariable Long activiteId) {
        Groupe groupe = groupeRepository.findById(groupeId).orElse(null);
        Activite activite = activiteRepository.findById(activiteId).orElse(null);

        if (groupe == null || activite == null) {
            return ResponseEntity.notFound().build();
        }

        // On lie les deux côtés de la relation Many-To-Many
        groupe.getActivites().add(activite);
        activite.getGroupes().add(groupe);
        
        // On sauvegarde le propriétaire de la relation (le groupe)
        groupeRepository.save(groupe);

        return ResponseEntity.noContent().build();
    }

    /**
     * Retire l'association entre un groupe et une activite.
     */
    @DeleteMapping("/{groupeId}/activites/{activiteId}")
    @Transactional
    public ResponseEntity<Void> removeActiviteFromGroupe(@PathVariable Integer groupeId, @PathVariable Long activiteId) {
        Groupe groupe = groupeRepository.findById(groupeId).orElse(null);
        Activite activite = activiteRepository.findById(activiteId).orElse(null);

        if (groupe == null || activite == null) {
            return ResponseEntity.notFound().build();
        }

        // On casse le lien des deux côtés
        groupe.getActivites().remove(activite);
        activite.getGroupes().remove(groupe);
        
        groupeRepository.save(groupe);

        return ResponseEntity.noContent().build();
    }
}
