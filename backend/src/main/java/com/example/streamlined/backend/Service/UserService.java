package com.example.streamlined.backend.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.streamlined.backend.Config.JwtUtil;
import com.example.streamlined.backend.Entity.UserEntity;
import com.example.streamlined.backend.Repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;


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
		String email = user.getEmail();
	    if (urepo.existsByEmail(email)) {
	        throw new IllegalArgumentException("Email already exists");
	    }
	    return urepo.save(user);
	}

	public List<UserEntity> getAllUsers() {
		return urepo.findAll();
	}

	public Optional<UserEntity> getUserById(int user_id) {
		return urepo.findById(user_id);
	}

	public String uploadProfilePicture(int userId, MultipartFile file) {
        UserEntity user = urepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            byte[] imageBytes = file.getBytes(); // Convert file to byte array
            user.setProfilePicture(imageBytes); // Store byte array in user entity
            urepo.save(user); // Save user entity to the database
            return "Profile picture uploaded successfully";
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile picture: " + e.getMessage());
        }
    }

	public byte[] getProfilePicture(int userId) {
    Optional<UserEntity> userOpt = urepo.findById(userId); // Returns Optional<UserEntity>
    
    if (userOpt.isPresent()) {
        UserEntity user = userOpt.get(); // Extract UserEntity from Optional
        return user.getProfilePicture(); // Return the profile picture byte array
    } else {
        // Handle the case where the user is not found
        throw new EntityNotFoundException("User with ID " + userId + " not found");
    	}
	}

	
	@SuppressWarnings("finally")
	public UserEntity updateUser(int user_id, UserEntity newUserDetails) {
		UserEntity user = new UserEntity();
		try {
			user = urepo.findById(user_id).get();
			
			user.setFirstname(newUserDetails.getFirstname());
			user.setLastname(newUserDetails.getLastname());
			user.setEmail(newUserDetails.getEmail());
			user.setPassword(newUserDetails.getPassword());
		} catch(NoSuchElementException ex) {
			throw new NoSuchElementException("User " + user_id + " does not exist!");
		} finally {
			return urepo.save(user);
		}
	}
	
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
