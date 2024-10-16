package com.example.streamlined.backend.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.streamlined.backend.Entity.UserEntity;
import com.example.streamlined.backend.Repository.UserRepository;
import com.example.streamlined.backend.Service.UserService;



@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired
	UserService userv;

    @Autowired
    UserRepository urepo;

    // @Autowired
    // private BCryptPasswordEncoder passwordEncoder;
	
	@GetMapping("/hello")
	public String printHello() {
		return "Hello World!";
	}


	@PostMapping("/add")
    public ResponseEntity<?> insertUser(@RequestBody UserEntity user) {
        try {
            UserEntity newUser = userv.insertUser(user);
            return ResponseEntity.ok(newUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/updateUser")
	public UserEntity updateUser(@RequestParam int uid, @RequestBody UserEntity newUserDetails) {
		return userv.updateUser(uid, newUserDetails);
	}
	

	@GetMapping("/all")
	public List<UserEntity> getAllUsers(){
		return userv.getAllUsers();
	}

	@GetMapping("/{user_id}")
    public Optional<UserEntity> getUserById(@PathVariable int user_id) {
        Optional<UserEntity> user = userv.getUserById(user_id);
        return user;
    }

	/*@PutMapping("/updateUser")
	public UserEntity updateUser(@RequestParam int uid, @RequestBody UserEntity newUserDetails) {
		return userv.updateUser(uid, newUserDetails);
	}*/

	@DeleteMapping("/{user_id}")
	public String deleteUser (@PathVariable int user_id) {
		return userv.deleteUser(user_id);
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserEntity loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Map<String, Object> loginResponse = userv.loginUser(email, password);

        if (loginResponse != null) {
            // Successful login
            return ResponseEntity.ok(loginResponse);
        } else {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PutMapping("/updatePassword/{userId}")
    public ResponseEntity<String> updatePassword(
            @PathVariable int userId,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        
        System.out.println("User ID: " + userId);
        System.out.println("Old Password: " + oldPassword);
        System.out.println("New Password: " + newPassword);
    
        boolean isUpdated = userv.updatePassword(userId, oldPassword, newPassword);
        if (isUpdated) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update password. Please check your old password.");
        }
    }
    

    @PostMapping("/uploadProfilePicture/{userId}")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable int userId, @RequestParam("file") MultipartFile file) {
        UserEntity user = urepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        try {
            byte[] imageBytes = file.getBytes(); // Convert file to byte array
            user.setProfilePicture(imageBytes); // Store byte array in user entity
            urepo.save(user); // Save user entity to the database
            return ResponseEntity.ok("Profile picture uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture");
        }
    }


    @GetMapping("/{userId}/profile-picture")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable int userId) {
        byte[] imageBytes = userv.getProfilePicture(userId);

        // Check if the image bytes are null or empty
        if (imageBytes == null || imageBytes.length == 0) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if no image found
        }

        // Set headers and return the image
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // Adjust if your images are in a different format
        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }

//     @PutMapping("/update-password")
//     public ResponseEntity<?> updatePassword(
//         @AuthenticationPrincipal UserEntity userEntity,
//         @RequestBody UpdatePasswordDTO updatePasswordDTO) {

//     String username = userEntity.getUsername();

//     // Retrieve the user from the database using Optional
//     Optional<UserEntity> optionalUser = userv.findByUsername(username);

//     if (optionalUser.isEmpty()) {
//         return ResponseEntity.badRequest().body("User not found");
//     }

//     UserEntity user = optionalUser.get();

//     // Check if the old password matches
//     if (!passwordEncoder.matches(updatePasswordDTO.getOldPassword(), user.getPassword())) {
//         return ResponseEntity.badRequest().body("Old password is incorrect");
//     }

//     // Check if the new password and confirm password match
//     if (!updatePasswordDTO.getNewPassword().equals(updatePasswordDTO.getConfirmPassword())) {
//         return ResponseEntity.badRequest().body("New password and confirm password do not match");
//     }

//     // Update the user's password
//     user.setPassword(passwordEncoder.encode(updatePasswordDTO.getNewPassword()));
//     urepo.save(user); // Save the updated user back to the database

//     return ResponseEntity.ok("Password updated successfully");
// }



}
