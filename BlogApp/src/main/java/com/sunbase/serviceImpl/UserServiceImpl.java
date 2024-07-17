package com.sunbase.serviceImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.sunbase.model.User;
import com.sunbase.service.UserService;
import com.sunbase.util.DBConnectionUtil;

public class UserServiceImpl implements UserService {

	// SQL statements
	public static final String CREATE_TABLE_USERS = "CREATE TABLE IF NOT EXISTS `users` ("
			+ "`id` INT AUTO_INCREMENT PRIMARY KEY," + "`name` VARCHAR(255) NOT NULL,"
			+ "`email` VARCHAR(255) NOT NULL," + "`password` VARCHAR(255) NOT NULL," + "`role` VARCHAR(50) NOT NULL,"
			+ "`active` BOOLEAN DEFAULT FALSE," + "`created_date` DATETIME NOT NULL" + ")";

	public static final String INSERT_USER = "INSERT INTO `users` (`name`, `email`, `password`, `role`, `active`, `created_date`) VALUES (?, ?, ?, ?, ?, ?)";

	public static final String SELECT_BY_ID = "SELECT * FROM `users` WHERE `id` = ?";

	public static final String SELECT_BY_EMAIL = "SELECT * FROM `users` WHERE `email` = ?";

	public static final String SELECT_ALL = "SELECT * FROM `users`";

	public static final String EMAIL_EXISTS = "SELECT COUNT(*) FROM `users` WHERE `email` = ?";

	public static final String UPDATE_USER = "UPDATE `users` SET `name` = ?, `email` = ?, `password` = ?, `role` = ?, `active` = ?, `created_date` = ? WHERE `id` = ?";

	public static final String DELETE_USER = "DELETE FROM `users` WHERE `id` = ?";

	// Method to create the users table if it doesn't exist
	public static void createUsersTable() {
		try (Connection connection = DBConnectionUtil.getConnection();
				Statement statement = connection.createStatement()) {
			statement.executeUpdate(CREATE_TABLE_USERS);
			System.out.println("`users` table created successfully or already exists.");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public boolean addUser(User user) {
		boolean added = false;
		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(INSERT_USER)) {
			preparedStatement.setString(1, user.getName());
			preparedStatement.setString(2, user.getEmail());
			preparedStatement.setString(3, user.getPassword());
			preparedStatement.setString(4, user.getRole());
			preparedStatement.setBoolean(5, user.isActive());
			preparedStatement.setObject(6, user.getCreatedDate());

			int rowsAffected = preparedStatement.executeUpdate();
			if (rowsAffected > 0) {
				added = true;
				System.out.println("User added successfully.");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return added;
	}

	@Override
	public User getUserById(int userId) {
		User user = null;
		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_BY_ID)) {
			preparedStatement.setInt(1, userId);
			ResultSet resultSet = preparedStatement.executeQuery();
			if (resultSet.next()) {
				user = extractUsers(resultSet);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

	@Override
	public User getUserByEmail(String email) {
		User user = null;
		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_BY_EMAIL)) {
			preparedStatement.setString(1, email);
			ResultSet resultSet = preparedStatement.executeQuery();
			if (resultSet.next()) {
				user = extractUsers(resultSet);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

	@Override
	public List<User> getAllUsers() {

		List<User> userList = new ArrayList<>();
		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL)) {
			ResultSet resultSet = preparedStatement.executeQuery();
			while (resultSet.next()) {
				User user = extractUsers(resultSet);
				userList.add(user);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return userList;
	}

	@Override
	public boolean emailExists(String email) {
		boolean exists = false;

		try (Connection conn = DBConnectionUtil.getConnection();
				PreparedStatement pstmt = conn.prepareStatement(EMAIL_EXISTS)) {

			pstmt.setString(1, email);
			ResultSet rs = pstmt.executeQuery();

			if (rs.next()) {
				int count = rs.getInt(1);
				exists = (count > 0);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return exists;
	}

	@Override
	public boolean updateUser(User user) {
		boolean updated = false;
		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(UPDATE_USER)) {
			preparedStatement.setString(1, user.getName());
			preparedStatement.setString(2, user.getEmail());
			preparedStatement.setString(3, user.getPassword());
			preparedStatement.setString(4, user.getRole());
			preparedStatement.setBoolean(5, user.isActive());
			preparedStatement.setObject(6, user.getCreatedDate());
			preparedStatement.setInt(7, user.getUserID());

			int rowsAffected = preparedStatement.executeUpdate();
			if (rowsAffected > 0) {
				updated = true;
				System.out.println("User updated successfully.");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return updated;
	}

	@Override
	public boolean deleteUser(int userId) {
		boolean deleted = false;
		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(DELETE_USER)) {
			preparedStatement.setInt(1, userId);

			int rowsAffected = preparedStatement.executeUpdate();
			if (rowsAffected > 0) {
				deleted = true;
				System.out.println("User deleted successfully.");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return deleted;
	}

	// Helper method to extract user data from ResultSet
	private User extractUsers(ResultSet resultSet) throws SQLException {
		User user = new User();
		user.setUserID(resultSet.getInt("id"));
		user.setName(resultSet.getString("name"));
		user.setEmail(resultSet.getString("email"));
		user.setPassword(resultSet.getString("password"));
		user.setRole(resultSet.getString("role"));
		user.setActive(resultSet.getBoolean("active"));
		user.setCreatedDate(resultSet.getObject("created_date", LocalDateTime.class));
		return user;
	}

}
