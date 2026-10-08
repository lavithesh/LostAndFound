package com.lostandfound.io.lostfound.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
@Data
@Entity
public class foundItem {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String itemName;
	private String description;
	private String location;
	private LocalDate dateLost;
	private String image;
	private String status;
	private int userId;

}
