package com.sunbase.controller;

import java.io.IOException;
import java.time.LocalDateTime;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sunbase.model.User;
import com.sunbase.service.UserService;
import com.sunbase.serviceImpl.UserServiceImpl;
import org.mindrot.jbcrypt.BCrypt;

@WebServlet("/User")
@SuppressWarnings("serial")
public class UserController extends HttpServlet {

	private UserService userService;

	public UserController() {
		this.userService = new UserServiceImpl();
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String name = request.getParameter("full_name");
		String email = request.getParameter("emailAddress");
		String password = request.getParameter("newpassword");
		String confirmPassword = request.getParameter("confirmPassword");
		String role = request.getParameter("select_role");
		HttpSession session = request.getSession();

		if (password.equals(confirmPassword)) {
			// Hash the password using BCrypt
			String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

			User user = new User();
			user.setName(name);
			user.setEmail(email);
			user.setPassword(hashedPassword);
			user.setRole(role);
			user.setActive(true);
			user.setCreatedDate(LocalDateTime.now());

			// Check if email already exists
			if (userService.emailExists(email)) {
				session.setAttribute("notification", "Email address already exists. Please try another email. &#128683;");
				response.sendRedirect("Home");
				return;
			}

			boolean isUserAdded = userService.addUser(user);

			if (isUserAdded) {
				session.setAttribute("notification", "Registered successfully ! Please log in to continue. 🎉");
				response.sendRedirect("Home");
			} else {
				session.setAttribute("notification", "Registration failed. Please try again. &#128683;");
				response.sendRedirect("Home");
			}
		} else {
			session.setAttribute("notification", "Registration failed. Passwords do not match. &#128683;");
		}
	}

}
