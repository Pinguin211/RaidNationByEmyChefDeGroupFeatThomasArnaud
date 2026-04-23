package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model;

import jakarta.persistence.Entity;

@Entity
public class Raid extends Activite {

	private String difficulte;
	private String type;
	private Boolean isFarmSession;
	
	public Raid() {
		super();
	}

	public String getDifficulte() {
		return difficulte;
	}

	public void setDifficulte(String difficulte) {
		this.difficulte = difficulte;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Boolean getIsFarmSession() {
		return isFarmSession;
	}

	public void setIsFarmSession(Boolean isFarmSession) {
		this.isFarmSession = isFarmSession;
	}
}