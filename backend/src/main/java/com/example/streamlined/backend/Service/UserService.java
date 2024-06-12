package com.example.streamlined.backend.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.streamlined.backend.Config.JwtUtil;
import com.example.streamlined.backend.Entity.UserEntity;
import com.example.streamlined.backend.Repository.UserRepository;


@Service
public class UserService {
	@Autowired
	UserRepository urepo;
	
	@Autowired
    JwtUtil jwtUtil;

	public Map<String, Object> loginUser(String email, String password) {
        // Find user by email
        UserEntity user = urepo.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            // Password matches
            // Generate JWT token
            String token = jwtUtil.generateToken(email);

            // Create response
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user_id", user.getUser_id());
            response.put("user", user);

            return response;
        } else {
            // Invalid credentials
            return null;
        }
    }
	
	public UserEntity insertUser(UserEntity user) {
		return urepo.save(user);
	}
	
	public List<UserEntity> getAllUsers() {
		return urepo.findAll();
	}
	
	public Optional<UserEntity> getUserById(int user_id) {
		return urepo.findById(user_id);	
	}
	
	/*@SuppressWarnings("finally")
	public UserEntity updateUser(int user_id, UserEntity newUserDetails) {
		UserEntity user = new UserEntity();
		try {
			user = urepo.findById(user_id).get();
			
			user.setFname(newUserDetails.getFname());
			user.setLname(newUserDetails.getLname());
			user.setEmail(newUserDetails.getEmail());
			user.setPassword(newUserDetails.getPassword());
		} catch(NoSuchElementException ex) {
			throw new NoSuchElementException("User " + uid + " does not exist!");
		} finally {
			return urepo.save(user);
		}
	}*/
	
	public String deleteUser (int user_id) {
		String msg = "";
		
		if(urepo.findById(user_id) != null) {
			urepo.deleteById(user_id);
			msg = "User " + user_id + " is successfully deleted!";
		} else {
			msg = "User " + user_id + " does not exist.";
		}
		return msg;
	}
}