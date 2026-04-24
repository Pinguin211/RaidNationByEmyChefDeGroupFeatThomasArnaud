package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Activite;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.ChasseTresor;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Classe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Groupe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Player;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Raid;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.ActiviteRepository;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.GroupeRepository;

/**
 * API REST pour la gestion des données liées aux activités.
 * Toutes les routes ici renvoient du JSON.
 */
@RestController
@RequestMapping("/api/activites")
public class ActiviteDetailApiController {

    private final GroupeRepository groupeRepository;
    private final ActiviteRepository activiteRepository;

    public ActiviteDetailApiController(ActiviteRepository activiteRepository, GroupeRepository groupeRepository) {
        this.activiteRepository = activiteRepository;
        this.groupeRepository = groupeRepository;
    }

    /**
     * GET /api/activites
     * Retourne la liste de TOUTES les activités (pour les modales de sélection par exemple).
     */
    @GetMapping
    public ResponseEntity<List<Activite>> getAllActivites() {
        return ResponseEntity.ok(activiteRepository.findAll());
    }

    /**
     * GET /api/activites/{id}
     * Récupère les activités liées à un Groupe (Parent).
     * Note: /{id} ici correspond à l'ID du groupe pour lequel on veut les activités.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Set<Activite>> getActivitesByGroupe(@PathVariable Integer id) {
        return groupeRepository.findById(id)
            .map(parent -> ResponseEntity.ok(parent.getActivites()))
            .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET /api/activites/{id}/detail
     * Retourne le détail complet formaté pour la page de détail d'une activité.
     */
    @GetMapping("/{id}/detail")
    @Transactional(readOnly = true)
    public ResponseEntity<ActiviteDetailResponse> getActiviteDetail(@PathVariable Long id) {
        Activite activite = activiteRepository.findById(id).orElse(null);
        if (activite == null) {
            return ResponseEntity.notFound().build();
        }

        // Mapping des groupes
        List<GroupeRecap> groupes = activite.getGroupes().stream()
                .sorted(Comparator.comparing(g -> g.getId() == null ? Integer.MAX_VALUE : g.getId()))
                .map(this::toGroupeRecap)
                .toList();

        // Extraction unique des joueurs
        Map<Integer, PlayerRecap> playersMap = new LinkedHashMap<>();
        for (GroupeRecap groupe : groupes) {
            for (PlayerRecap player : groupe.players()) {
                if (player.id() != null) {
                    playersMap.put(player.id(), player);
                }
            }
        }

        ActiviteMetadata metadata = toMetadata(activite);

        ActiviteDetailResponse response = new ActiviteDetailResponse(
                activite.getId(),
                activite.getHoraire(),
                metadata.categorie(),
                metadata.nom(),
                metadata.type(),
                metadata.difficulte(),
                metadata.isFarmSession(),
                metadata.nbCartes(),
                groupes,
                playersMap.values().stream().toList()
        );

        return ResponseEntity.ok(response);
    }

    // --- Méthodes de transformation privées ---

    private GroupeRecap toGroupeRecap(Groupe groupe) {
        List<PlayerRecap> players = groupe.getPlayers().stream()
                .sorted(Comparator.comparing(p -> p.getId() == null ? Integer.MAX_VALUE : p.getId()))
                .map(this::toPlayerRecap)
                .toList();
        return new GroupeRecap(groupe.getId(), groupe.getNom(), players);
    }

    private PlayerRecap toPlayerRecap(Player player) {
        List<ClasseRecap> classes = player.getClasses().stream()
                .sorted(Comparator.comparing(c -> c.getId() == null ? Integer.MAX_VALUE : c.getId()))
                .map(this::toClasseRecap)
                .toList();
        return new PlayerRecap(player.getId(), player.getNom(), classes);
    }

    private ClasseRecap toClasseRecap(Classe classe) {
        return new ClasseRecap(classe.getId(), classe.getNom(), classe.getRole());
    }

    private ActiviteMetadata toMetadata(Activite activite) {
        if (activite instanceof Raid raid) {
            return new ActiviteMetadata(
                    "RAID",
                    raid.getNom(),
                    raid.getType(),
                    raid.getDifficulte(),
                    raid.getIsFarmSession(),
                    null
            );
        }
        if (activite instanceof ChasseTresor chasse) {
            return new ActiviteMetadata(
                    "CHASSE_TRESOR",
                    null,
                    chasse.getType(),
                    null,
                    null,
                    chasse.getNbCartes()
            );
        }
        return new ActiviteMetadata("ACTIVITE", null, null, null, null, null);
    }

    // --- Records pour la structure JSON ---

    private record ActiviteMetadata(
            String categorie,
            String nom,
            String type,
            String difficulte,
            Boolean isFarmSession,
            Integer nbCartes
    ) {}

    public record ActiviteDetailResponse(
            Long id,
            LocalDateTime horaire,
            String categorie,
            String nom,
            String type,
            String difficulte,
            Boolean isFarmSession,
            Integer nbCartes,
            List<GroupeRecap> groupes,
            List<PlayerRecap> players
    ) {}

    public record GroupeRecap(
            Integer id,
            String nom,
            List<PlayerRecap> players
    ) {}

    public record PlayerRecap(
            Integer id,
            String nom,
            List<ClasseRecap> classes
    ) {}

    public record ClasseRecap(
            Integer id,
            String nom,
            String role
    ) {}
}