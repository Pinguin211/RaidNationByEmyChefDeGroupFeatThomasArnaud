package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Controller web pour les pages liees aux activites.
 */
@Controller
public class ActivitePageController {

    /**
     * Affiche la page de detail d'une activite.
     *
     * @param id identifiant de l'activite
     * @return forward vers la page statique de detail
     */
    @GetMapping({"/activite/{id}", "/activité/{id}"})
    public String activiteDetailPage(@PathVariable Long id) {
        return "forward:/activite-detail.html";
    }
}
