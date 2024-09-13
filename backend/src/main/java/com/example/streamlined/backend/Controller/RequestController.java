package com.example.streamlined.backend.Controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.streamlined.backend.Entity.RequestEntity;
import com.example.streamlined.backend.Service.RequestService;

@RestController
@RequestMapping("/request")
@CrossOrigin(origins = "http://localhost:3000")
public class RequestController {
	@Autowired
	RequestService rserv;
	
	/*@PostMapping("/add")
    public RequestEntity addRequest(@RequestBody RequestEntity request) {
        return rserv.addRequest(request);
    }*/
	
	@PostMapping("/add")
    public RequestEntity addRequest(
        @RequestParam("technician") String technician,
        @RequestParam("request_location") String request_location,
        @RequestParam("datetime") String datetime,
        @RequestParam("purpose") String purpose,
        @RequestParam("user_id") Long user_id,
        @RequestParam("attachment") MultipartFile attachment) throws IOException {
        
        RequestEntity request = new RequestEntity();
        request.setTechnician(technician);
        request.setRequest_location(request_location);

        // Parse the datetime string to a Timestamp
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            Date parsedDate = dateFormat.parse(datetime);
            request.setDatetime(new Timestamp(parsedDate.getTime()));
        } catch (ParseException e) {
            throw new RuntimeException("Invalid datetime format. Please use 'yyyy-MM-dd'T'HH:mm:ss'.", e);
        }

        request.setPurpose(purpose);
        request.setUser_id(user_id);
        
        // Save the file to a local directory or cloud storage
        if (!attachment.isEmpty()) {
            byte[] bytes = attachment.getBytes();
            Path uploadDir = Paths.get("uploads");
            
            // Check if the directory exists, if not create it
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            Path path = uploadDir.resolve(attachment.getOriginalFilename());
            Files.write(path, bytes);
            request.setAttachment(path.toString());
        }

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
	
	@PutMapping("/updateStatus")
	public RequestEntity updateStatus(@RequestParam int request_id, @RequestBody RequestEntity newRequestStatus) {
		return rserv.updateStatus(request_id, newRequestStatus);
	}
	
	@PostMapping("/assignTechnician")
	public ResponseEntity<String> assignTechnicianToRequest(
	        @RequestParam Long request_id, 
	        @RequestParam Long tech_id) {
	    rserv.assignTechnicianToRequest(request_id, tech_id);
	    return ResponseEntity.ok("Technician " + tech_id + " assigned to request " + request_id + " successfully");
	}
	
	@PostMapping("/removeTechnician")
	public ResponseEntity<String> removeTechnicianFromRequest(
	        @RequestParam Long request_id) {
	    rserv.removeTechnicianFromRequest(request_id);
	    return ResponseEntity.ok("Technician removed from request " + request_id + " successfully");
	}

	
	// @PutMapping("/updateAnnouncement")
	// public RequestEntity updateUser(@RequestParam int request_id, @RequestBody RequestEntity newAnnouncementDetails) {
	// 	return rserv.updateAnnouncement(request_id, newAnnouncementDetails);
	// }
	
	@DeleteMapping("/{request_id}")
	public String deleteRequest (@PathVariable int request_id) {
		return rserv.deleteRequest(request_id);
	}
	
	@GetMapping("/attachment/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path file = Paths.get("uploads").resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Could not read the file!", e);
        }
    }
}