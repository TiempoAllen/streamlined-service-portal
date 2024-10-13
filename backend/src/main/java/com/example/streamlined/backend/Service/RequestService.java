package com.example.streamlined.backend.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.data.domain.Sort;
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
		return rrepo.findAll(Sort.by(Sort.Direction.DESC, "datetime"));
	}
	
	public List<RequestEntity> findPendingRequests() {
        return rrepo.findByStatus("Pending");
    }

    public List<RequestEntity> findApprovedRequests() {
        return rrepo.findByStatus("Approved");
    }

    public List<RequestEntity> findRecentRequests() {
        return rrepo.findTop4ByOrderByDatetimeDesc(); // Fetch recent requests, adjust as needed
    }


	public Optional<RequestEntity> getRequestById(int request_id) {
		return rrepo.findById(request_id);	
	}
	
	@SuppressWarnings("finally")
	public RequestEntity updateStatus(int request_id, RequestEntity newRequestStatus) {
		RequestEntity request = new RequestEntity();
		try {
			request = rrepo.findById(request_id).get();
			
			request.setStatus(newRequestStatus.getStatus());
			//announcement.setStatus("Approved");
		} catch(NoSuchElementException ex) {
			throw new NoSuchElementException("Request " + request_id + " does not exist!");
		} finally {
			return rrepo.save(request);
		}
	}
	
	public RequestEntity assignTechnicianToRequest(Long request_id, Long tech_id) {
        RequestEntity request = rrepo.findById(request_id.intValue())
                .orElseThrow(() -> new NoSuchElementException("Request " + request_id + " does not exist!"));
        
        TechnicianEntity technician = trepo.findById(tech_id.intValue())
                .orElseThrow(() -> new NoSuchElementException("Technician " + tech_id + " does not exist!"));
        
        request.setTech_id(technician.getTech_id());
        request.setTech_name(technician.getTech_name());
        return rrepo.save(request);
    }
	
	public RequestEntity removeTechnicianFromRequest(Long request_id) {
	    RequestEntity request = rrepo.findById(request_id.intValue())
	            .orElseThrow(() -> new NoSuchElementException("Request " + request_id + " does not exist!"));

	    // Remove the technician from the request by setting fields to null
	    request.setTech_id(null);
	    request.setTech_name(null);

	    return rrepo.save(request);
	}

	
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
