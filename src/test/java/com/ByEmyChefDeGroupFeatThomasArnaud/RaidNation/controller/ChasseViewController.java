package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.ChasseRepository;

@RestController
@RequestMapping("/test/api/chasses")
public class ChasseViewController {

	private final ChasseRepository chasseRepository;

    public ChasseViewController(ChasseRepository raidRepository) {
        this.chasseRepository = raidRepository;
    }

    /**
     * Retourne la liste des raids avec leurs associations.
     *
     * @return liste de raids
     */
    @GetMapping
    public List<ChasseResponse> listChasses() {
        return chasseRepository.findAll().stream()
                .map(chasse -> new ChasseResponse(
                        chasse.getId(),
                        chasse.getType(),
                        chasse.getHoraire(),
                        chasse.getNbCartes()
                ))
                .toList();
    }

    public record ChasseResponse(Long id, String Type, LocalDateTime horaire, int nbCartes) {
    }
}
