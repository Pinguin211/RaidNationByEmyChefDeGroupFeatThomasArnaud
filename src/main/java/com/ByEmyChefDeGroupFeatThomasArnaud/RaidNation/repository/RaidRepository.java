package com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.ByEmyChefDeGroupFeatThomasArnaud.RaidNation.model.Raid;

public interface RaidRepository extends CrudRepository<Raid,Long> {

	@Override
    List<Raid> findAll();
}
