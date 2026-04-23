package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.entity.Player;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.GroupeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Controller de vue en zone test pour consulter les groupes.
 */
@RestController
@RequestMapping("/api/groupes")
public class GroupeViewController {

    private final GroupeRepository groupeRepository;

    public GroupeViewController(GroupeRepository groupeRepository) {
        this.groupeRepository = groupeRepository;
    }

    /**
     * Retourne la liste des groupes avec leurs associations.
     *
     * @return liste de groupes
     */
    @GetMapping
    public List<GroupeResponse> listGroupes() {
        return groupeRepository.findAll().stream()
                .map(groupe -> new GroupeResponse(
                        groupe.getId(),
                        groupe.getNom(),
                        groupe.getPlayers().stream().map(Player::getId).collect(Collectors.toSet())
                ))
                .toList();
    }

    public record GroupeResponse(Integer id, String nom, Set<Integer> playerIds) {
    }
}
