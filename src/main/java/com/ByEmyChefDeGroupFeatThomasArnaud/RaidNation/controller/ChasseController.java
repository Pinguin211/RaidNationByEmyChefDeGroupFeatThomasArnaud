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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.ChasseTresor;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository.ChasseRepository;

@RestController
@RequestMapping("/api/chasses")
public class ChasseController {
	@Autowired 
	private ChasseRepository chasseRepository;
	
	@PostMapping
	public ResponseEntity<ChasseTresor> createChasseTresor(@RequestBody ChasseTresor r) {	
		chasseRepository.save(r);
		return ResponseEntity.ok(r);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ChasseTresor> getChasseTresor(@PathVariable Long id) {
		ChasseTresor r;
		try {
			r = chasseRepository.findById(id).get();
		}catch(Exception e) {
				return ResponseEntity.status(404).build();
		}
		
		return ResponseEntity.ok(r);
	}
	
	@GetMapping
	public List<ChasseTresor> getAllChasseTresor() {
		List <ChasseTresor> n;
		n = (List<ChasseTresor>) chasseRepository.findAll();
		return n;
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<ChasseTresor> updateChasseTresor(@PathVariable Long id, @RequestBody ChasseTresor r){
		ChasseTresor r2 = chasseRepository.findById(id).get();
		if(r.getType()!=null) { r2.setType(r.getType());}
		if(r.getNbCartes()==0) { r2.setNbCartes(r.getNbCartes());}
		if(r.getHoraire()!=null) { r2.setHoraire(r.getHoraire());}
		chasseRepository.save(r2); 
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ChasseTresor> deleteNourriture(@PathVariable Long id){
		chasseRepository.deleteById(id);
		return ResponseEntity.ok().build();
		
	}

}
