package com.nberimen.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class User {

	@Id
	@GeneratedValue
	private long id;
	
	private String username;
	
	private String displayName;
	
	private String password;
}
