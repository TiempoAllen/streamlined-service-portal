package com.example.streamlined.backend.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.streamlined.backend.Entity.RequestEntity;
import com.example.streamlined.backend.Entity.UserEntity;
import com.example.streamlined.backend.Repository.RequestRepository;
import com.example.streamlined.backend.Repository.UserRepository;


@Service
public class RequestService {
	@Autowired
	RequestRepository rrepo;
	
	@Autowired
    UserRepository urepo;
	
	public RequestEntity addRequest(RequestEntity request) {
        Optional<UserEntity> userOpt = urepo.findById(request.getUser_id().intValue());
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            
            request.setDepartment(user.getDepartment());
            request.setUser_firstname(user.getFirstname());
            request.setUser_lastname(user.getLastname());
            
            
        } else {
            throw new NoSuchElementException("User with ID " + request.getUser_id() + " not found.");
        }
        request.setStatus("Pending");
        return rrepo.save(request);
    }
	
	
	/*public RequestEntity addRequest(RequestEntity request) {
		request.setStatus("Pending");
		return rrepo.save(request);
	}*/
	
	public List<RequestEntity> getAllRequests() {
		return rrepo.findAll();
	}
	
	public Optional<RequestEntity> getRequestById(int request_id) {
		return rrepo.findById(request_id);	
	}
	
	// @SuppressWarnings("finally")
	// public RequestEntity updateStatus(int request_id, RequestEntity newAnnouncementStatus) {
	// 	RequestEntity announcement = new RequestEntity();
	// 	try {
	// 		announcement = rrepo.findById(request_id).get();
			
	// 		announcement.setStatus(newAnnouncementStatus.getStatus());
	// 		//announcement.setStatus("Approved");
	// 	} catch(NoSuchElementException ex) {
	// 		throw new NoSuchElementException("Announcement " + request_id + " does not exist!");
	// 	} finally {
	// 		return rrepo.save(announcement);
	// 	}
	// }
	
	// @SuppressWarnings("finally")
	// public RequestEntity updateAnnouncement(int request_id, RequestEntity newAnnouncementDetails) {
	// 	RequestEntity announcement = new RequestEntity();
	// 	try {
	// 		announcement = rrepo.findById(request_id).get();
			
	// 		announcement.setTitle(newAnnouncementDetails.getTitle());
	// 		announcement.setContent(newAnnouncementDetails.getContent());
	// 		announcement.setDate(newAnnouncementDetails.getDate().toString());
	// 		//announcement.setStatus("Approved");
	// 	} catch(NoSuchElementException ex) {
	// 		throw new NoSuchElementException("Announcement " + request_id + " does not exist!");
	// 	} finally {
	// 		return rrepo.save(announcement);
	// 	}
	// }
	
	public String deleteRequest (int request_id) {
		String msg = "";
		
		if(rrepo.findById(request_id) != null) {
			rrepo.deleteById(request_id);
			msg = "Request " + request_id + " is successfully deleted!";
		} else {
			msg = "Request " + request_id + " does not exist.";
		}
		return msg;
	}
}
