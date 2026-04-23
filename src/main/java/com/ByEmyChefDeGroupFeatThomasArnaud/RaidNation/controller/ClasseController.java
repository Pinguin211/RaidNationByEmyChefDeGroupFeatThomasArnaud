package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Classe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Player;
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
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
/**
 * API principale pour la gestion des classes.
 * Fournit les operations de creation et suppression.
 */
@RestController
@RequestMapping("/api/classes")
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
    public ResponseEntity<Classe> createClasse(@RequestBody CreateClasseRequest request) {
        if (request.nom() == null || request.nom().isBlank() || request.role() == null || request.role().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        Classe classe = new Classe();
        classe.setNom(request.nom().trim());
        classe.setRole(request.role().trim());

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

    public record CreateClasseRequest(String nom, String role) {
    }
    
    @GetMapping
    public ResponseEntity<List<Classe>> getAllClasses() {
        return ResponseEntity.ok(classeRepository.findAll());
    }

    /**
     * Récupère une classe spécifique par son ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Classe> getClasseById(@PathVariable Integer id) {
        return classeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
