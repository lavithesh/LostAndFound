package com.lostandfound.io.lostfound.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostandfound.io.lostfound.entity.lostItem;

public interface lostRepo extends JpaRepository<lostItem, Integer>{

	List<lostItem> findByUserId(Integer id);

}
