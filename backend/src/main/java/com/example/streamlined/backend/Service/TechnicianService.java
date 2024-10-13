package com.example.streamlined.backend.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.streamlined.backend.Entity.TechnicianEntity;
import com.example.streamlined.backend.Repository.RequestRepository;
import com.example.streamlined.backend.Repository.TechnicianRepository;

@Service
public class TechnicianService {
	@Autowired
	TechnicianRepository trepo;
	
	RequestRepository rrepo;
	
	public TechnicianEntity addTechnician(TechnicianEntity technician) {
		// technician.setStatus("Pending");
		return trepo.save(technician);
	}
	
	public List<TechnicianEntity> getAllTechnician() {
		return trepo.findAll();
	}
	
	public Optional<TechnicianEntity> getTechnicianById(int tid) {
		return trepo.findById(tid);	
	}
	
	// @SuppressWarnings("finally")
	// public TechnicianEntity updateStatus(int tid, TechnicianEntity newTechnicianStatus) {
	// 	TechnicianEntity technician = new TechnicianEntity();
	// 	try {
	// 		technician = trepo.findById(tid).get();
			
	// 		technician.setStatus(newTechnicianStatus.getStatus());
	// 		//technician.setStatus("Approved");
	// 	} catch(NoSuchElementException ex) {
	// 		throw new NoSuchElementException("technician " + tid + " does not exist!");
	// 	} finally {
	// 		return trepo.save(technician);
	// 	}
	// }
	
	@SuppressWarnings("finally")
	public TechnicianEntity updateTechnician(int tid, TechnicianEntity newTechnicianDetails) {
		TechnicianEntity technician = new TechnicianEntity();
		try {
			technician = trepo.findById(tid).get();
			
			technician.setTech_name(newTechnicianDetails.getTech_name());
			technician.setTech_phone(newTechnicianDetails.getTech_phone());
			technician.setTech_gender(newTechnicianDetails.getTech_gender());
			technician.setTech_status(newTechnicianDetails.getTech_status());
			technician.setTech_classification(newTechnicianDetails.getTech_classification());
			//technician.setStatus("Approved");
		} catch(NoSuchElementException ex) {
			throw new NoSuchElementException("Technician " + tid + " does not exist!");
		} finally {
			return trepo.save(technician);
		}
	}
	
	public TechnicianEntity assignTechnicianToRequest(int tid, Long request_id, String request_purpose) {
	    TechnicianEntity technician;
	    try {
	        technician = trepo.findById(tid).orElseThrow(() -> 
	            new NoSuchElementException("Technician " + tid + " does not exist!")
	        );
	        
	        // Set the request_id, purpose, and availability
	        technician.setRequest_id(request_id);
	        technician.setPurpose(request_purpose);
	        technician.setIsavailable(false);
	        
	    } catch(NoSuchElementException ex) {
	        throw new NoSuchElementException("Technician " + tid + " does not exist!");
	    } 
	    return trepo.save(technician);
	}
	
//	public RequestEntity getRequestByTechnician(Long tech_id) {
//        Optional<RequestEntity> request = rrepo.findFirstByTechId(tech_id);
//        if (request.isPresent()) {
//            return request.get();
//        } else {
//            throw new NoSuchElementException("No active request found for technician with ID " + tech_id);
//        }
//    }
	
	public String deleteTechnician (int tid) {
		String msg = "";
		
		if(trepo.findById(tid) != null) {
			trepo.deleteById(tid);
			msg = "Technician " + tid + " is successfully deleted!";
		} else {
			msg = "Technician " + tid + " does not exist.";
		}
		return msg;
	}
	
}
