package com.example.campus.backend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tbluser")
public class CampusUserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int uid;
	
	@Column(name="firstname")
	private String fname;
	
	@Column(name="lastname")
	private String lname;
	
	private String email;
	
	private String password;

	public CampusUserEntity() {
		super();
	}

	public CampusUserEntity(int uid, String fname, String lname, String email, String password) {
		super();
		this.uid = uid;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.password = password;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
