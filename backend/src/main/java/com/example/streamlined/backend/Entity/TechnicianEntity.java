package com.example.streamlined.backend.Entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tblTechnician")
public class TechnicianEntity {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tech_id;
	
    private String tech_name;
    
    private String tech_phone;

    private String tech_gender;

    private String tech_status;

    private String tech_classification;

    @Column(nullable = false)
    private boolean isavailable = true;

    private Long request_id;
    
    @Column(name = "request_purpose")
    private String purpose;

	public TechnicianEntity() {
		super();
	}

	public TechnicianEntity(Long tech_id, String tech_name, String tech_phone, String tech_gender, String tech_status,
			String tech_classification, boolean isavailable, Long request_id, String purpose) {
		super();
		this.tech_id = tech_id;
		this.tech_name = tech_name;
		this.tech_phone = tech_phone;
		this.tech_gender = tech_gender;
		this.tech_status = tech_status;
		this.tech_classification = tech_classification;
		this.isavailable = isavailable;
		this.request_id = request_id;
		this.purpose = purpose;
	}

	public Long getTech_id() {
		return tech_id;
	}

	public void setTech_id(Long tech_id) {
		this.tech_id = tech_id;
	}

	public String getTech_name() {
		return tech_name;
	}

	public void setTech_name(String tech_name) {
		this.tech_name = tech_name;
	}

	public String getTech_phone() {
		return tech_phone;
	}

	public void setTech_phone(String tech_phone) {
		this.tech_phone = tech_phone;
	}

	public String getTech_gender() {
		return tech_gender;
	}

	public void setTech_gender(String tech_gender) {
		this.tech_gender = tech_gender;
	}

	public String getTech_status() {
		return tech_status;
	}

	public void setTech_status(String tech_status) {
		this.tech_status = tech_status;
	}

	public String getTech_classification() {
		return tech_classification;
	}

	public void setTech_classification(String tech_classification) {
		this.tech_classification = tech_classification;
	}

	public boolean isIsavailable() {
		return isavailable;
	}

	public void setIsavailable(boolean isavailable) {
		this.isavailable = isavailable;
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

	

	
    
}