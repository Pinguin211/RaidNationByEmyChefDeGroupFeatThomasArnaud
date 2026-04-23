package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Activite;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.ChasseTresor;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Classe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Groupe;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Player;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Raid;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.ActiviteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * API de detail des activites avec recap complet.
 */
@RestController
@RequestMapping("/api/activites")
public class ActiviteDetailApiController {

    private final ActiviteRepository activiteRepository;

    public ActiviteDetailApiController(ActiviteRepository activiteRepository) {
        this.activiteRepository = activiteRepository;
    }

    /**
     * Retourne le detail complet d'une activite.
     *
     * @param id identifiant de l'activite
     * @return recap detaille incluant groupes et players
     */
    @GetMapping("/{id}/detail")
    @Transactional(readOnly = true)
    public ResponseEntity<ActiviteDetailResponse> getActiviteDetail(@PathVariable Long id) {
        Activite activite = activiteRepository.findById(id).orElse(null);
        if (activite == null) {
            return ResponseEntity.notFound().build();
        }

        List<GroupeRecap> groupes = activite.getGroupes().stream()
                .sorted(Comparator.comparing(g -> g.getId() == null ? Integer.MAX_VALUE : g.getId()))
                .map(this::toGroupeRecap)
                .toList();

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

    private record ActiviteMetadata(
            String categorie,
            String nom,
            String type,
            String difficulte,
            Boolean isFarmSession,
            Integer nbCartes
    ) {
    }

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
    ) {
    }

    public record GroupeRecap(
            Integer id,
            String nom,
            List<PlayerRecap> players
    ) {
    }

    public record PlayerRecap(
            Integer id,
            String nom,
            List<ClasseRecap> classes
    ) {
    }

    public record ClasseRecap(
            Integer id,
            String nom,
            String role
    ) {
    }
}
