package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Controller web gérant uniquement l'accès aux pages (vues).
 * Il ne contient aucune logique de données JSON.
 */
@Controller
public class ActivitePageController {

    /**
     * Affiche la page de détail d'une activité.
     * Les deux routes (avec et sans accent) pointent vers le même fichier HTML.
     * * @param id identifiant de l'activité (utilisé par le JS dans la page)
     * @return forward vers la page statique de détail
     */
    @GetMapping({"/activite/{id}", "/activité/{id}"})
    public String activiteDetailPage(@PathVariable Long id) {
        // Le forward permet de garder l'URL /activite/15 dans le navigateur
        // tout en affichant le contenu de activite-detail.html
        return "forward:/activite-detail.html";
    }
}