package com.sunbase.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnectionUtil {

	// If the database does not exist in the MySQL Workbench, this parameter will
	// attempt to create it automatically: createDatabaseIfNotExist=true
	private static final String URL = "jdbc:mysql://localhost:3306/blogapp?createDatabaseIfNotExist=true";
	private static final String USER = "root"; // Update with your MySQL username
	private static final String PASSWORD = "Skn1631$$"; // Update with your MySQL password

	public static Connection getConnection() {
		Connection connection = null;
		try {
			// Load the MySQL JDBC driver
			Class.forName("com.mysql.cj.jdbc.Driver");
			// Get the connection
			connection = DriverManager.getConnection(URL, USER, PASSWORD);
			if (connection != null) {
				System.out.println("Connected to the database!");
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		return connection;
	}

	public static void closeConnection(Connection connection) {
		if (connection != null) {
			try {
				connection.close();
				System.out.println("Connection closed.");
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
