package com.lostandfound.io.lostfound.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Data
@Setter
@Getter
@Entity
public class lostItem {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private int id;
private String itemName;
private String description;
private String location;
@JsonFormat(pattern = "yyyy-MM-dd")
private LocalDate dateLost;
private String image;
private String status;
private int userId;

}
