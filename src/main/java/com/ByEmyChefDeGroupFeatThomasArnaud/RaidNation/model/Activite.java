package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Activite implements Serializable{
	
	@Id
	@GeneratedValue
	private Long id;
	private LocalDateTime horaire;
	
	public Activite() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getHoraire() {
		return horaire;
	}

	public void setHoraire(LocalDateTime horaire) {
		this.horaire = horaire;
	}

	
	
}
