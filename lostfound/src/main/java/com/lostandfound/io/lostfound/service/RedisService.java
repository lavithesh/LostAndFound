package com.lostandfound.io.lostfound.service;

import java.time.Duration;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.lostandfound.io.lostfound.entity.user;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class RedisService{
	private static final String USER_DTO_KEY = "dto-";
	private static final String OTP_KEY = "otp-";

	private static final Duration USER_DTO_TTL = Duration.ofMinutes(15);
	private static final Duration OTP_TTL = Duration.ofMinutes(2);
	private static final Duration TICKET_TTL = Duration.ofMinutes(15);

	private final RedisTemplate<String, Object> redisTemplate;

	
	@Async
	public void saveUserDto(String email, user userDto) {
		redisTemplate.opsForValue().set(USER_DTO_KEY + email, userDto, USER_DTO_TTL);
	}

	
	@Async
	public void saveOtp(String email, int otp) {
		redisTemplate.opsForValue().set(OTP_KEY + email, otp, OTP_TTL);
	}


	public user getUserDto(String email) {
		Object value = redisTemplate.opsForValue().get(USER_DTO_KEY + email);
		return (value instanceof user dto) ? dto : null;
	}

	
	public int getOtp(String email) {
		Object value = redisTemplate.opsForValue().get(OTP_KEY + email);
		return (value instanceof Integer otp) ? otp : 0;
	}
}
