package com.example.streamlined.backend.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.streamlined.backend.Entity.RequestEntity;
import com.example.streamlined.backend.Entity.TechnicianEntity;
import com.example.streamlined.backend.Entity.UserEntity;
import com.example.streamlined.backend.Repository.RequestRepository;
import com.example.streamlined.backend.Repository.TechnicianRepository;
import com.example.streamlined.backend.Repository.UserRepository;


@Service
public class RequestService {
	@Autowired
	RequestRepository rrepo;
	
	@Autowired
    UserRepository urepo;
	
	@Autowired
	TechnicianRepository trepo;
	
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
	
	public Optional<RequestEntity> getRequestById(int requestId) {
		return rrepo.findById(requestId);	
	}
	
	@SuppressWarnings("finally")
	public RequestEntity updateStatus(int requestId, RequestEntity newRequestStatus) {
		RequestEntity request = new RequestEntity();
		try {
			request = rrepo.findById(requestId).get();
			
			request.setStatus(newRequestStatus.getStatus());
			//announcement.setStatus("Approved");
		} catch(NoSuchElementException ex) {
			throw new NoSuchElementException("Request " + requestId + " does not exist!");
		} finally {
			return rrepo.save(request);
		}
	}
	
	public RequestEntity assignTechnicianToRequest(Long requestId, Long tech_id) {
        RequestEntity request = rrepo.findById(requestId.intValue())
                .orElseThrow(() -> new NoSuchElementException("Request " + requestId + " does not exist!"));
        
        TechnicianEntity technician = trepo.findById(tech_id.intValue())
                .orElseThrow(() -> new NoSuchElementException("Technician " + tech_id + " does not exist!"));
        
        request.setTech_id(technician.getTech_id());
        request.setTech_name(technician.getTech_name());
        return rrepo.save(request);
    }
	
	public RequestEntity removeTechnicianFromRequest(Long requestId) {
	    RequestEntity request = rrepo.findById(requestId.intValue())
	            .orElseThrow(() -> new NoSuchElementException("Request " + requestId + " does not exist!"));

	    // Remove the technician from the request by setting fields to null
	    request.setTech_id(null);
	    request.setTech_name(null);

	    return rrepo.save(request);

		
	}
	/* public RequestEntity updateRequest(int requestId, RequestEntity newRequest) {
        // Find the existing request
       // Optional<RequestEntity> existingRequestOpt = rrepo.getRequestById(requestId);
        
        if (existingRequestOpt.isPresent()) {
            RequestEntity existingRequest = existingRequestOpt.get();
            // Update the existing request fields with the new request data
            existingRequest.setTechnician(newRequest.getTechnician());
            existingRequest.setRequest_location(newRequest.getRequest_location());
            existingRequest.setDatetime(newRequest.getDatetime());
            existingRequest.setPurpose(newRequest.getPurpose());
            existingRequest.setUser_id(newRequest.getUser_id());
            existingRequest.setAttachment(newRequest.getAttachment());

            // Save and return the updated request
            return rrepo.save(existingRequest);
        } else {
            throw new RuntimeException("Request with ID " + requestId + " not found.");
        }
    }  */

	
//	@SuppressWarnings("finally")
//	public RequestEntity updateAnnouncement(int request_id, RequestEntity newAnnouncementDetails) {
//		RequestEntity announcement = new RequestEntity();
//		try {
//			announcement = rrepo.findById(request_id).get();
//			
//			announcement.setTitle(newAnnouncementDetails.getTitle());
//			announcement.setContent(newAnnouncementDetails.getContent());
//			announcement.setDate(newAnnouncementDetails.getDate().toString());
//			//announcement.setStatus("Approved");
//		} catch(NoSuchElementException ex) {
//			throw new NoSuchElementException("Announcement " + request_id + " does not exist!");
//		} finally {
//			return rrepo.save(announcement);
//		}
//	}
	
	public String deleteRequest (int requestId) {
		String msg = "";
		
		if(rrepo.findById(requestId) != null) {
			rrepo.deleteById(requestId);
			msg = "Request " + requestId + " is successfully deleted!";
		} else {
			msg = "Request " + requestId + " does not exist.";
		}
		return msg;
	}
}
