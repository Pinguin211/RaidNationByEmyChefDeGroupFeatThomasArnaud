package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.ChasseTresor;
import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Raid;

public interface ChasseRepository extends CrudRepository<ChasseTresor,Long> {

	@Override
    List<ChasseTresor> findAll();
}
