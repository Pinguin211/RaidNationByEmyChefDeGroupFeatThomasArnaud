package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.RaidRepository;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Raid;

@RestController
public class RaidController {
	
	@Autowired 
	private RaidRepository raidRepository;
	
	@PostMapping("/new-raid")
	public ResponseEntity<Raid> createRaid(@RequestBody Raid r) {	
		raidRepository.save(r);
		return ResponseEntity.ok(r);
	}
	
	@GetMapping("/raid/{id}")
	public ResponseEntity<Raid> getRaid(@PathVariable Long id) {
		Raid r;
		try {
			r = raidRepository.findById(id).get();
		}catch(Exception e) {
				return ResponseEntity.status(404).build();
		}
		
		return ResponseEntity.ok(r);
	}
	
	@GetMapping("/raids/")
	public List<Raid> getAllRaid() {
		List <Raid> n;
		n = (List<Raid>) raidRepository.findAll();
		return n;
	}
	
	
	@PutMapping("/update-raid/{id}")
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
	
	@DeleteMapping("/delete-raid/{id}")
	public ResponseEntity<Raid> deleteNourriture(@PathVariable Long id){
		raidRepository.deleteById(id);
		return ResponseEntity.ok().build();
		
	}

}
