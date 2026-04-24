package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Classe;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
/**
 * API principale pour la gestion des classes.
 * Fournit les operations de creation et suppression.
 */
@RestController
@RequestMapping("/api/classes")
@Tag(name = "Classes", description = "Gestion des classes de personnages")
public class ClasseController {

    private final ClasseRepository classeRepository;
    private final PlayerRepository playerRepository;

    public ClasseController(ClasseRepository classeRepository, PlayerRepository playerRepository) {
        this.classeRepository = classeRepository;
        this.playerRepository = playerRepository;
    }

    /**
     * Cree une classe.
     *
     * @param request payload contenant nom et role
     * @return la classe creee ou 400 si invalide
     */
    @PostMapping
    @Operation(summary = "Creer une classe")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Classe creee"),
            @ApiResponse(responseCode = "400", description = "Payload invalide", content = @Content)
    })
    public ResponseEntity<Classe> createClasse(@RequestBody CreateClasseRequest request) {
        if (request.nom() == null || request.nom().isBlank() || request.role() == null || request.role().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Classe classe = new Classe();
        classe.setNom(request.nom().trim());
        classe.setRole(request.role().trim());
        classe.setIcon(request.icon().trim());
        

        return ResponseEntity.status(HttpStatus.CREATED).body(classeRepository.save(classe));
    }

    /**
     * Supprime une classe et retire ses associations avec les players.
     *
     * @param id identifiant de la classe
     * @return 204 si supprimee, 404 sinon
     */
    @DeleteMapping("/{id}")
    @Transactional
    @Operation(summary = "Supprimer une classe")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Classe supprimee"),
            @ApiResponse(responseCode = "404", description = "Classe introuvable", content = @Content)
    })
    public ResponseEntity<Void> deleteClasse(@PathVariable Integer id) {
        Classe classe = classeRepository.findById(id).orElse(null);
        if (classe == null) {
            return ResponseEntity.notFound().build();
        }

        ArrayList<Player> players = new ArrayList<>(classe.getPlayers());
        for (Player player : players) {
            player.getClasses().remove(classe);
        }
        playerRepository.saveAll(players);

        classeRepository.delete(classe);
        return ResponseEntity.noContent().build();
    }

    public record CreateClasseRequest(String nom, String role, String icon) {
    }
    
    @GetMapping
    @Operation(summary = "Lister toutes les classes")
    @ApiResponse(responseCode = "200", description = "Liste des classes")
    public ResponseEntity<List<Classe>> getAllClasses() {
        return ResponseEntity.ok(classeRepository.findAll());
    }

    /**
     * Récupère une classe spécifique par son ID.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Recuperer une classe par ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Classe trouvee"),
            @ApiResponse(responseCode = "404", description = "Classe introuvable", content = @Content)
    })
    public ResponseEntity<Classe> getClasseById(@PathVariable Integer id) {
        return classeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
