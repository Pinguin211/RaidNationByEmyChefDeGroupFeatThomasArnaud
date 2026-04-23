package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import java.util.Set;
import java.util.HashSet;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Activite implements Serializable{
	
	@Id
	@GeneratedValue
	private Long id;
	private LocalDateTime horaire;
	
	@ManyToMany(mappedBy = "activites")
    @JsonIgnoreProperties({"activites", "players"})
    private Set<Groupe> groupes = new HashSet<>();
	
	public Set<Groupe> getGroupes() {
        return groupes;
    }

    public void setGroupes(Set<Groupe> groupes) {
        this.groupes = groupes;
    }
	
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
