package com.sunbase.service;

import java.util.List;

import com.sunbase.model.User;

public interface UserService {

	// CRUD operations

	// Create operation
	boolean addUser(User user);

	// Read operations
	User getUserById(int userId);

	User getUserByEmail(String email);

	List<User> getAllUsers();

	boolean emailExists(String email);

	// Update operations
	boolean updateUser(User user);

	// Delete operation
	boolean deleteUser(int userId);


}
