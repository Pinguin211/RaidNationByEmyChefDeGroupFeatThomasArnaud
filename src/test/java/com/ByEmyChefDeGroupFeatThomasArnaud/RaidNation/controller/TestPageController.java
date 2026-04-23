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
        return "forward:/test/index.html";
    }

    /**
     * Redirige vers la page de test players.
     *
     * @return forward vers la page players
     */
    @GetMapping({"/test/players", "/test/players/"})
    public String testPlayersPage() {
        return "forward:/test/players.html";
    }

    /**
     * Redirige vers la page de test classes.
     *
     * @return forward vers la page classes
     */
    @GetMapping({"/test/classes", "/test/classes/"})
    public String testClassesPage() {
        return "forward:/test/classes.html";
    }

    /**
     * Redirige vers la page de test groupes.
     *
     * @return forward vers la page groupes
     */
    @GetMapping({"/test/groupes", "/test/groupes/"})
    public String testGroupesPage() {
        return "forward:/test/groupes.html";
    }
    
    
    /**
     * Redirige vers la page de test raids.
     *
     * @return forward vers la page raids
     */
    @GetMapping({"/test/raids", "/test/raids/"})
    public String testRaidsPage() {
        return "forward:/test/raids.html";
    }
}
