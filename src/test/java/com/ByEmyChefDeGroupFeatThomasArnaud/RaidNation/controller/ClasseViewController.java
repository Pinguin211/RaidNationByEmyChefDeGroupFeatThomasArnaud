package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.entity.Player;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.ClasseRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Controller de vue en zone test pour consulter les classes.
 */
@RestController
@RequestMapping("/api/classes")
public class ClasseViewController {

    private final ClasseRepository classeRepository;

    public ClasseViewController(ClasseRepository classeRepository) {
        this.classeRepository = classeRepository;
    }

    /**
     * Retourne la liste des classes avec leurs associations.
     *
     * @return liste de classes
     */
    @GetMapping
    public List<ClasseResponse> listClasses() {
        return classeRepository.findAll().stream()
                .map(classe -> new ClasseResponse(
                        classe.getId(),
                        classe.getNom(),
                        classe.getRole(),
                        classe.getPlayers().stream().map(Player::getId).collect(Collectors.toSet())
                ))
                .toList();
    }

    public record ClasseResponse(Integer id, String nom, String role, Set<Integer> playerIds) {
    }
}
