package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Raid extends Activite{

	@Id
	@GeneratedValue
	private Long id;
	private String difficulte;
	private String type;
	private Boolean isFarmSession;
	
	public Raid() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
