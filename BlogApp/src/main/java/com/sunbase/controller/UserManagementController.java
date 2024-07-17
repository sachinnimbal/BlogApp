package com.sunbase.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/UserManage")
@SuppressWarnings("serial")
public class UserManagementController extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String action = request.getParameter("action");

		if ("signup".equals(action)) {
			// Forward to newUser.jsp for signing up
			request.getRequestDispatcher("newUser.jsp").forward(request, response);
		} else if ("signin".equals(action)) {
			// Forward to oldUser.jsp for signing in
			request.getRequestDispatcher("oldUser.jsp").forward(request, response);
		} else {
			// Default send Redirect to Home Page
			response.sendRedirect("Home");
		}

	}

}
