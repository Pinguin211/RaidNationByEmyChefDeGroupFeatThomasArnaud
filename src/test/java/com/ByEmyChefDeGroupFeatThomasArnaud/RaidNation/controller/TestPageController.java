package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Point d'entree web des pages de test.
 */
@Controller
public class TestPageController {

    /**
     * Redirige vers l'index statique des pages de test.
     *
     * @return forward vers la page d'accueil de test
     */
    @GetMapping({"/test", "/test/"})
    public String testIndex() {
        return "forward:/index.html";
    }

    /**
     * Redirige vers la page de test players.
     *
     * @return forward vers la page players
     */
    @GetMapping({"/test/players", "/test/players/"})
    public String testPlayersPage() {
        return "forward:/players.html";
    }

    /**
     * Redirige vers la page de test classes.
     *
     * @return forward vers la page classes
     */
    @GetMapping({"/test/classes", "/test/classes/"})
    public String testClassesPage() {
        return "forward:/classes.html";
    }

    /**
     * Redirige vers la page de test groupes.
     *
     * @return forward vers la page groupes
     */
    @GetMapping({"/test/groupes", "/test/groupes/"})
    public String testGroupesPage() {
        return "forward:/groupes.html";
    }
}
