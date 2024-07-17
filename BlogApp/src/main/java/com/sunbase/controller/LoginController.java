package com.sunbase.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.mindrot.jbcrypt.BCrypt;

import com.sunbase.model.User;
import com.sunbase.service.UserService;
import com.sunbase.serviceImpl.UserServiceImpl;

@WebServlet("/AuthServlet")
@SuppressWarnings("serial")
public class LoginController extends HttpServlet {

	private UserService userService;

	public LoginController() {
		this.userService = new UserServiceImpl();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String email = req.getParameter("email");
		String password = req.getParameter("password");

		User user = userService.getUserByEmail(email);

		HttpSession session = req.getSession();

		if (user != null) {
			// Validate password using BCrypt
			if (BCrypt.checkpw(password, user.getPassword())) {
				boolean isActive = user.isActive();

				if (isActive) {
					session.setAttribute("user", user);
					session.setAttribute("notification",
							"Welcome, " + user.getName() + "! Your account has been successfully logged in. 🎉");
					redirectToHome(resp, user.getRole());
				} else {
					session.setAttribute("notification", "Your account has been inactive. Please contact support.");
					resp.sendRedirect("UserManage?action=signin");
				}
			} else {
				session.setAttribute("loginFailed", "Invalid email or password. Please try again.");
				resp.sendRedirect("UserManage?action=signin");
			}
		} else {
			session.setAttribute("loginFailed", "Invalid email or password. Please try again.");
			resp.sendRedirect("UserManage?action=signin");
		}
	}

	private void redirectToHome(HttpServletResponse resp, String userRole) throws IOException {
		switch (userRole) {
		case "Admin":
			resp.sendRedirect("AdminHome");
			break;
		case "Viewer":
			resp.sendRedirect("Home");
			break;
		default:
			resp.sendRedirect("Home");
			break;
		}
	}
}
