package com.example.campus.backend;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CampusUserService {
	@Autowired
	CampusUserRepository urepo;
	
	public CampusUserEntity loginUser(String email, String password) {
	    // Find user by email
		CampusUserEntity user = urepo.findByEmail(email);
	    
	    if (user != null && user.getPassword().equals(password)) {
	        // Password matches
	        return user;
	    } else {
	        // Invalid credentials
	        return null;
	    }
	}
	
	public CampusUserEntity insertUser(CampusUserEntity user) {
		return urepo.save(user);
	}
	
	public List<CampusUserEntity> getAllUsers() {
		return urepo.findAll();
	}
	
	@SuppressWarnings("finally")
	public CampusUserEntity updateUser(int uid, CampusUserEntity newUserDetails) {
		CampusUserEntity user = new CampusUserEntity();
		try {
			user = urepo.findById(uid).get();
			
			user.setFname(newUserDetails.getFname());
			user.setLname(newUserDetails.getLname());
			user.setEmail(newUserDetails.getEmail());
			user.setPassword(newUserDetails.getPassword());
		} catch(NoSuchElementException ex) {
			throw new NoSuchElementException("User " + uid + " does not exist!");
		} finally {
			return urepo.save(user);
		}
	}
	
	public String deleteUser (int uid) {
		String msg = "";
		
		if(urepo.findById(uid) != null) {
			urepo.deleteById(uid);
			msg = "User " + uid + " is successfully deleted!";
		} else {
			msg = "User " + uid + " does not exist.";
		}
		return msg;
	}
}
