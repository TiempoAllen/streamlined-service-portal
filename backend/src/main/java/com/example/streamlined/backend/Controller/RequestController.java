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
import org.springframework.http.MediaType;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
    @RequestParam(value = "attachment", required = false) MultipartFile attachment) throws IOException {

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

    // Check if the attachment is provided and save the file if present
    if (attachment != null && !attachment.isEmpty()) {
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

@PutMapping("/update/{requestId}")
public ResponseEntity<RequestEntity> updateRequest(
        @PathVariable int requestId,
        @RequestParam(value = "technician", required = false) String technician,
        @RequestParam(value = "request_location", required = false) String request_location,
        @RequestParam(value = "datetime", required = false) String datetime,
        @RequestParam(value = "purpose", required = false) String purpose,
        @RequestParam(value = "user_id", required = false) Long user_id,
        @RequestParam(value = "attachment", required = false) MultipartFile attachment) throws IOException {
    
    // Fetch the existing request
    Optional<RequestEntity> optionalRequest = rserv.getRequestById(requestId);
    
    if (!optionalRequest.isPresent()) {
        return ResponseEntity.notFound().build();
    }
    
    RequestEntity existingRequest = optionalRequest.get();

    // Update fields if provided
    if (technician != null) existingRequest.setTechnician(technician);
    if (request_location != null) existingRequest.setRequest_location(request_location);
    if (datetime != null) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            Date parsedDate = dateFormat.parse(datetime);
            existingRequest.setDatetime(new Timestamp(parsedDate.getTime()));
        } catch (ParseException e) {
            throw new RuntimeException("Invalid datetime format. Please use 'yyyy-MM-dd'T'HH:mm:ss'.", e);
        }
    }
    if (purpose != null) existingRequest.setPurpose(purpose);
    if (user_id != null) existingRequest.setUser_id(user_id);

    // Check if the attachment is provided and save the file if present
    if (attachment != null && !attachment.isEmpty()) {
        byte[] bytes = attachment.getBytes();
        Path uploadDir = Paths.get("uploads");

        // Check if the directory exists, if not create it
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        Path path = uploadDir.resolve(attachment.getOriginalFilename());
        Files.write(path, bytes);
        existingRequest.setAttachment(path.toString());
    }

    // Save the updated request
    RequestEntity updatedRequest = rserv.addRequest(existingRequest);
    return ResponseEntity.ok(updatedRequest);
}



	

	/*@PostMapping("/add")
	public RequestEntity addRequest (@RequestBody RequestEntity request) {
        return rserv.addRequest(request);
    }*/
	
	@GetMapping("/all")
	public List<RequestEntity> getAllRequests(){
		return rserv.getAllRequests();
	}
	
	@GetMapping("/{requestId}")
    public Optional<RequestEntity> getRequestById(@PathVariable int requestId) {
        Optional<RequestEntity> request = rserv.getRequestById(requestId);
        return request;
    }
	
	@PutMapping("/updateStatus")
	public RequestEntity updateStatus(@RequestParam int requestId, @RequestBody RequestEntity newRequestStatus) {
		return rserv.updateStatus(requestId, newRequestStatus);
	}
	
	@PostMapping("/assignTechnician")
	public ResponseEntity<String> assignTechnicianToRequest(
	        @RequestParam Long requestId, 
	        @RequestParam Long tech_id) {
	    rserv.assignTechnicianToRequest(requestId, tech_id);
	    return ResponseEntity.ok("Technician " + tech_id + " assigned to request " + requestId + " successfully");
	}
	
	@PostMapping("/removeTechnician")
	public ResponseEntity<String> removeTechnicianFromRequest(
	        @RequestParam Long requestId) {
	    rserv.removeTechnicianFromRequest(requestId);
	    return ResponseEntity.ok("Technician removed from request " + requestId + " successfully");
	}

	
	// @PutMapping("/updateAnnouncement")
	// public RequestEntity updateUser(@RequestParam int request_id, @RequestBody RequestEntity newAnnouncementDetails) {
	// 	return rserv.updateAnnouncement(request_id, newAnnouncementDetails);
	// }
	
	@DeleteMapping("/{requestId}")
	public String deleteRequest (@PathVariable int requestId) {
		return rserv.deleteRequest(requestId);
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

    @GetMapping("/uploads/{fileName:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        try {
            // Sanitize the file name to remove unwanted characters
            fileName = fileName.trim().replaceAll("[\\n\\r]", ""); // Remove newlines
    
            // Define the path to the uploads directory
            Path filePath = Paths.get("uploads").resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
    
            // Check if the resource exists and is readable
            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok().body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
    



}

