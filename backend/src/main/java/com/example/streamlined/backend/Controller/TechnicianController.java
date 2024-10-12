package com.example.streamlined.backend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.streamlined.backend.Entity.RequestEntity;
import com.example.streamlined.backend.Entity.TechnicianEntity;
import com.example.streamlined.backend.Service.TechnicianService;

@RestController
@RequestMapping("/technician")
@CrossOrigin(origins = "http://localhost:3000")
public class TechnicianController {
	@Autowired
	TechnicianService tserv;
	

	@PostMapping("/addTechnician")
	public TechnicianEntity addTechnician (@RequestBody TechnicianEntity technician) {
        return tserv.addTechnician(technician);
    }
	
	@GetMapping("/getAllTechnician")
	public List<TechnicianEntity> getAllTechnician(){
		return tserv.getAllTechnician();
	}
	
	@GetMapping("/getTechnician/{tid}")
    public Optional<TechnicianEntity> getTechnicianById(@PathVariable int tid) {
        Optional<TechnicianEntity> technician = tserv.getTechnicianById(tid);
        return technician;
    }
	
//	@PutMapping("/updateStatus")
//	public TechnicianEntity updateStatus(@RequestParam int tid, @RequestBody TechnicianEntity newTechnicianStatus) {
//		return tserv.updateStatus(tid, newTechnicianStatus);
//	}
//	
	@PutMapping("/updateTechnician")
	public TechnicianEntity updateTechnician(@RequestParam int tid, @RequestBody TechnicianEntity newTechnicianDetails) {
		return tserv.updateTechnician(tid, newTechnicianDetails);
	}
	
	@PutMapping("/assignToRequest")
	public TechnicianEntity assignTechnicianToRequest(
	        @RequestParam int tid, 
	        @RequestParam Long request_id, 
	        @RequestParam String request_purpose) {
	    return tserv.assignTechnicianToRequest(tid, request_id, request_purpose);
	}

//	@GetMapping("/currentRequest/{tech_id}")
//    public RequestEntity getRequestByTechnician(@PathVariable Long tech_id) {
//        return tserv.getRequestByTechnician(tech_id);
//    }
	
	@DeleteMapping("/deleteTechnician/{tid}")
	public String deleteTechnician (@PathVariable int tid) {
		return tserv.deleteTechnician(tid);
	}
}
