package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controleur web principal de l'application.
 * Garantit que la route racine affiche la page principale.
 */
@Controller
public class MainPageController {

    /**
     * Affiche la page principale de l'application.
     *
     * @return forward vers l'index principal
     */
    @GetMapping({"/", ""})
    public String home() {
        return "forward:/index.html";
    }

    /**
     * Affiche la page principale d'ajout de classe.
     *
     * @return forward vers la page classes
     */
    @GetMapping({"/classes", "/classes/"})
    public String classesPage() {
        return "forward:/classes.html";
    }
    
    /**
     * Affiche la page principale d'ajout de groupe.
     *
     * @return forward vers la page groupes
     */
    @GetMapping({"/groupes", "/groupes/"})
    public String groupesPage() {
        return "forward:/groupes.html";
    }

    /**
     * Affiche la page principale de gestion des players.
     *
     * @return forward vers la page players
     */
    @GetMapping({"/players", "/players/"})
    public String playersPage() {
        return "forward:/players.html";
    }
    
    /**
     * Affiche la page principale de gestion des players.
     *
     * @return forward vers la page players
     */
    @GetMapping({"/raids", "/raids/"})
    public String raidsPage() {
        return "forward:/raids.html";
    }
}