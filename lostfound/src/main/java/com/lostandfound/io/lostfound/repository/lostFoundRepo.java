package com.lostandfound.io.lostfound.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lostandfound.io.lostfound.entity.user;

public interface lostFoundRepo extends JpaRepository<user, Integer>{

	boolean existsByEmail(String adminEmail);

	boolean existsByMobile(long mobile);

	Optional<user> findByEmail(String email);

}
