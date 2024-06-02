package com.example.streamlined.backend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.streamlined.backend.Entity.RequestEntity;
import com.example.streamlined.backend.Service.RequestService;

@RestController
@RequestMapping("/request")
@CrossOrigin(origins = "http://localhost:3000")
public class RequestController {
	@Autowired
	RequestService rserv;
	
	@PostMapping("/add")
    public RequestEntity addRequest(@RequestBody RequestEntity request) {
        return rserv.addRequest(request);
    }
	

	/*@PostMapping("/add")
	public RequestEntity addRequest (@RequestBody RequestEntity request) {
        return rserv.addRequest(request);
    }*/
	
	@GetMapping("/all")
	public List<RequestEntity> getAllRequests(){
		return rserv.getAllRequests();
	}
	
	@GetMapping("/{request_id}")
    public Optional<RequestEntity> getRequestById(@PathVariable int request_id) {
        Optional<RequestEntity> request = rserv.getRequestById(request_id);
        return request;
    }
	
	// @PutMapping("/updateStatus")
	// public RequestEntity updateStatus(@RequestParam int request_id, @RequestBody RequestEntity newAnnouncementStatus) {
	// 	return rserv.updateStatus(request_id, newAnnouncementStatus);
	// }
	
	// @PutMapping("/updateAnnouncement")
	// public RequestEntity updateUser(@RequestParam int request_id, @RequestBody RequestEntity newAnnouncementDetails) {
	// 	return rserv.updateAnnouncement(request_id, newAnnouncementDetails);
	// }
	
	@DeleteMapping("/{request_id}")
	public String deleteRequest (@PathVariable int request_id) {
		return rserv.deleteRequest(request_id);
	}
}