package com.lostandfound.io.lostfound.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostandfound.io.lostfound.entity.foundItem;

public interface foundRepo extends JpaRepository<foundItem, Integer> {

	List<foundItem> findByUserId(Integer id);

}
