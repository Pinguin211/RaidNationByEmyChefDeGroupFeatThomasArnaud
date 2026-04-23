package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller.ClasseViewController;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller.GroupeViewController;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller.PlayerViewController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Import;

/**
 * Point d'entree dedie a l'execution de l'application en mode test local.
 * Lance l'application normale et ajoute explicitement la configuration de test.
 */
public class TestApplication {

    public static void main(String[] args) {
        SpringApplication.from(RaidNationApplication::main)
                .with(TestConfig.class)
                .run(args);
    }

    @TestConfiguration(proxyBeanMethods = false)
    @Import({
            PlayerViewController.class,
            ClasseViewController.class,
            GroupeViewController.class
    })
    static class TestConfig {
        // Ajouter ici des beans/configs specifiques test si necessaire.
    }
}
