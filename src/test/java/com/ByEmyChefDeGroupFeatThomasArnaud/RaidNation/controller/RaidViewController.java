package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.RaidRepository;

/**
 * Controller de vue en zone test pour consulter les classes.
 */
@RestController
@RequestMapping("/test/api/raids")
public class RaidViewController {
	
	private final RaidRepository raidRepository;

    public RaidViewController(RaidRepository raidRepository) {
        this.raidRepository = raidRepository;
    }

    /**
     * Retourne la liste des raids avec leurs associations.
     *
     * @return liste de raids
     */
    @GetMapping
    public List<RaidResponse> listRaids() {
        return raidRepository.findAll().stream()
                .map(raid -> new RaidResponse(
                        raid.getId(),
                        raid.getNom(),
                        raid.getType(),
                        raid.getDifficulte(),
                        raid.getHoraire(),
                        raid.getIsFarmSession()                
                ))
                .toList();
    }

    public record RaidResponse(Long id, String nom, String Type, String difficulte, LocalDateTime horaire, Boolean isFarmSession) {
    }

}
