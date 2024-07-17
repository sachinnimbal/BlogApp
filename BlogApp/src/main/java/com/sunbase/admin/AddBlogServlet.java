package com.sunbase.admin;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sunbase.model.User;

@WebServlet("/AddBlog")
@SuppressWarnings("serial")
public class AddBlogServlet extends HttpServlet {

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			if (user != null && "Admin".equals(user.getRole())) {
				request.getRequestDispatcher("admin/addBlog.jsp").forward(request, response);
			} else {
				response.sendRedirect("Home");
			}
		} else {
			response.sendRedirect("Home");
		}
	}

}
