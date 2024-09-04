package com.example.campus.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class CampusUserController {
	@Autowired
	CampusUserService userv;
	
	@GetMapping("/hello")
	public String printHello() {
		return "Hello World!";
	}
	

	@PostMapping("/insertUser")
	public CampusUserEntity insertUser (@RequestBody CampusUserEntity user) {
		return userv.insertUser(user);
	}
	
	@GetMapping("/getAllUsers")
	public List<CampusUserEntity> getAllUsers(){
		return userv.getAllUsers();
	}
	
	@PutMapping("/updateUser")
	public CampusUserEntity updateUser(@RequestParam int uid, @RequestBody CampusUserEntity newUserDetails) {
		return userv.updateUser(uid, newUserDetails);
	}
	
	@DeleteMapping("/deleteUser/{uid}")
	public String deleteUser (@PathVariable int uid) {
		return userv.deleteUser(uid);
	}
	
	@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody CampusUserEntity loginRequest) {
		
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        CampusUserEntity user = userv.loginUser(email, password);

        if (user != null) {
            // Successful login, return the user details
            return ResponseEntity.ok(user);
        } else {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}
