package com.lostandfound.io.lostfound.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.lostandfound.io.lostfound.entity.user;
import com.lostandfound.io.lostfound.repository.lostFoundRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;




@Component
@RequiredArgsConstructor
@Slf4j
public class AdminRegistration implements CommandLineRunner{
	@Value("${admin.email}")
	private String adminEmail;
	
	@Value("${admin.password}")
	private String adminPassword;
	
	private final lostFoundRepo lostFoundrepo; 

	@Override
	public void run(String... args) throws Exception {
		
		if(lostFoundrepo.existsByEmail(adminEmail)) {
			log.info("admin email already exist");
			return;
		}
		
		user adminUser=new user(null,"lavithesh",adminEmail,adminPassword,adminPassword,0L,"ADMIN",null,null,null,null,null);
		
		lostFoundrepo.save(adminUser);
		log.info("admin registered Successfully");
		
		
	}

}
