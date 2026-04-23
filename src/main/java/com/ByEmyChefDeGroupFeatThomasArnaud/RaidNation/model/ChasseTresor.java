package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model;

import jakarta.persistence.Entity;

@Entity
public class ChasseTresor extends Activite { // Hérite de l'ID d'Activite
	
    // nbCartes est un champ simple, pas un ID !
    private int nbCartes; 
    private String type;
	
    public ChasseTresor() {
        super();
    }

    public int getNbCartes() {
        return nbCartes;
    }

    public void setNbCartes(int nbCartes) {
        this.nbCartes = nbCartes;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}