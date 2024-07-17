package com.sunbase.model;

import java.time.LocalDateTime;

public class User {

	private int userID;
	private String name;
	private String email;
	private String password;
	private String role;
	private boolean active;
	private LocalDateTime createdDate;

	public User() {
		// Default constructor
	}

	public User(int userID, String name, String email, String password, String role, boolean active,
			LocalDateTime createdDate) {
		this.userID = userID;
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role;
		this.active = active;
		this.createdDate = createdDate;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	@Override
	public String toString() {
		return "User{" + "userID=" + userID + ", name='" + name + '\'' + ", email='" + email + '\'' + ", role='" + role
				+ '\'' + ", active=" + active + ", createdDate=" + createdDate + '}';
	}
}
