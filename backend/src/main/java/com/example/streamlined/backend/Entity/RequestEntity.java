package com.example.streamlined.backend.Entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tblRequests")
public class RequestEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long request_id;
	
	@Column(name = "purpose")
    private String purpose;

    @Column(name = "datetime")
    private Timestamp datetime;

    @Column(name = "status")
    private String status;

    @Column(name = "request_location")
    private String request_location;

    @Column(name = "department")
    private String department;

    @Column(name = "user_id")
    private Long user_id;

    @Column(name = "user_firstname")
    private String user_firstname;
    
    @Column(name = "user_lastname")
    private String user_lastname;
    
    @Column(name = "technician")
    private String technician;
    
    @Column(name = "attachment")
    private String attachment;

	public RequestEntity() {
		super();
	}

	

	public RequestEntity(Long request_id, String purpose, Timestamp datetime, String status, String request_location,
			String department, Long user_id, String user_firstname, String user_lastname, String technician,
			String attachment) {
		super();
		this.request_id = request_id;
		this.purpose = purpose;
		this.datetime = datetime;
		this.status = status;
		this.request_location = request_location;
		this.department = department;
		this.user_id = user_id;
		this.user_firstname = user_firstname;
		this.user_lastname = user_lastname;
		this.technician = technician;
		this.attachment = attachment;
	}



	public Long getRequest_id() {
		return request_id;
	}

	public void setRequest_id(Long request_id) {
		this.request_id = request_id;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public Timestamp getDatetime() {
		return datetime;
	}

	public void setDatetime(Timestamp datetime) {
		this.datetime = datetime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRequest_location() {
		return request_location;
	}

	public void setRequest_location(String request_location) {
		this.request_location = request_location;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public String getUser_firstname() {
		return user_firstname;
	}

	public void setUser_firstname(String user_firstname) {
		this.user_firstname = user_firstname;
	}

	public String getUser_lastname() {
		return user_lastname;
	}

	public void setUser_lastname(String user_lastname) {
		this.user_lastname = user_lastname;
	}

	public String getTechnician() {
		return technician;
	}

	public void setTechnician(String technician) {
		this.technician = technician;
	}



	public String getAttachment() {
		return attachment;
	}



	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}
    
	
    
}
