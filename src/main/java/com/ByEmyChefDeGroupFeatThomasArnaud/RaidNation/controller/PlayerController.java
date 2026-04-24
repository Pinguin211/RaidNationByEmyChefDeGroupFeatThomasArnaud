package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Classe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Groupe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Player;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.ClasseRepository;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.PlayerRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
/**
 * API principale pour la gestion des players.
 * Fournit les operations de creation, suppression et gestion du lien player-classe.
 */
@RestController
@RequestMapping("/api/players")
@Tag(name = "Players", description = "Gestion des joueurs et de leurs classes")
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
    @Operation(summary = "Creer un player")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Player cree"),
            @ApiResponse(responseCode = "400", description = "Payload invalide", content = @Content)
    })
    public ResponseEntity<Player> createPlayer(@RequestBody CreatePlayerRequest request) {
        if (request.nom() == null || request.nom().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Player player = new Player();
        player.setNom(request.nom().trim());

        return ResponseEntity.status(HttpStatus.CREATED).body(playerRepository.save(player));
    }

    /**
     * Modifie un player (nom + classes associees).
     *
     * @param id identifiant du player
     * @param request payload contenant le nom et les ids de classes
     * @return le player mis a jour, 400 si invalide, 404 si absent
     */
    @PutMapping("/{id}")
    @Transactional
    @Operation(summary = "Modifier un player")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Player modifie"),
            @ApiResponse(responseCode = "400", description = "Payload invalide", content = @Content),
            @ApiResponse(responseCode = "404", description = "Player introuvable", content = @Content)
    })
    public ResponseEntity<Player> updatePlayer(@PathVariable Integer id, @RequestBody UpdatePlayerRequest request) {
        if (request.nom() == null || request.nom().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Player player = playerRepository.findById(id).orElse(null);
        if (player == null) {
            return ResponseEntity.notFound().build();
        }

        player.setNom(request.nom().trim());

        ArrayList<Classe> oldClasses = new ArrayList<>(player.getClasses());
        for (Classe oldClasse : oldClasses) {
            oldClasse.getPlayers().remove(player);
        }
        player.getClasses().clear();

        Set<Classe> newClasses = new HashSet<>();
        if (request.classeIds() != null && !request.classeIds().isEmpty()) {
            newClasses.addAll(classeRepository.findAllById(request.classeIds()));
        }

        for (Classe classe : newClasses) {
            classe.getPlayers().add(player);
        }
        player.getClasses().addAll(newClasses);

        return ResponseEntity.ok(playerRepository.save(player));
    }

    /**
     * Supprime un player et nettoie ses associations many-to-many.
     *
     * @param id identifiant du player
     * @return 204 si supprime, 404 sinon
     */
    @DeleteMapping("/{id}")
    @Transactional
    @Operation(summary = "Supprimer un player")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Player supprime"),
            @ApiResponse(responseCode = "404", description = "Player introuvable", content = @Content)
    })
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
    @Operation(summary = "Associer une classe a un player")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Association creee"),
            @ApiResponse(responseCode = "404", description = "Player ou classe introuvable", content = @Content)
    })
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
    @Operation(summary = "Retirer une classe d'un player")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Association supprimee"),
            @ApiResponse(responseCode = "404", description = "Player ou classe introuvable", content = @Content)
    })
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

    public record UpdatePlayerRequest(String nom, List<Integer> classeIds) {
    }
    
    @GetMapping
    @Operation(summary = "Lister tous les players")
    @ApiResponse(responseCode = "200", description = "Liste des players")
    public ResponseEntity<List<Player>> getAllPlayers() {
        return ResponseEntity.ok(playerRepository.findAll());
    }

    /**
     * Récupère un player spécifique par son ID.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Recuperer un player par ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Player trouve"),
            @ApiResponse(responseCode = "404", description = "Player introuvable", content = @Content)
    })
    public ResponseEntity<Player> getPlayerById(@PathVariable Integer id) {
        return playerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
