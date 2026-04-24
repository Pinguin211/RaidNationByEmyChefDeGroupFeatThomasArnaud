package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.RaidRepository;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Raid;

@RestController
@RequestMapping("/api/raids")
@Tag(name = "Raids", description = "Gestion des activites de type raid")
public class RaidController {
	
	@Autowired 
	private RaidRepository raidRepository;
	
	@PostMapping
	@Operation(summary = "Creer un raid")
	@ApiResponse(responseCode = "200", description = "Raid cree")
	public ResponseEntity<Raid> createRaid(@RequestBody Raid r) {	
		raidRepository.save(r);
		return ResponseEntity.ok(r);
	}
	
	@GetMapping("/{id}")
	@Operation(summary = "Recuperer un raid par ID")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Raid trouve"),
			@ApiResponse(responseCode = "404", description = "Raid introuvable", content = @Content)
	})
	public ResponseEntity<Raid> getRaid(@PathVariable Long id) {
		Raid r;
		try {
			r = raidRepository.findById(id).get();
		}catch(Exception e) {
				return ResponseEntity.status(404).build();
		}
		
		return ResponseEntity.ok(r);
	}
	
	@GetMapping
	@Operation(summary = "Lister tous les raids")
	@ApiResponse(responseCode = "200", description = "Liste des raids")
	public List<Raid> getAllRaid() {
		List <Raid> n;
		n = (List<Raid>) raidRepository.findAll();
		return n;
	}
	
	
	@PutMapping("/id")
	@Operation(summary = "Modifier un raid")
	@ApiResponse(responseCode = "200", description = "Raid modifie")
	public ResponseEntity<Raid> updateRaid(@PathVariable Long id, @RequestBody Raid r){
		Raid r2 = raidRepository.findById(id).get();
		if(r.getDifficulte()!=null) { r2.setDifficulte(r.getDifficulte());}
		if(r.getType()!=null) { r2.setType(r.getType());}
		if(r.getIsFarmSession()!=null) { r2.setIsFarmSession(r.getIsFarmSession());}
		if(r.getNom()!=null) { r2.setNom(r.getNom());}
		if(r.getHoraire()!=null) { r2.setHoraire(r.getHoraire());}
		raidRepository.save(r2); 
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/{id}")
	@Operation(summary = "Supprimer un raid")
	@ApiResponse(responseCode = "200", description = "Raid supprime")
	public ResponseEntity<Raid> deleteNourriture(@PathVariable Long id){
		raidRepository.deleteById(id);
		return ResponseEntity.ok().build();
		
	}

}
