package com.sunbase.admin;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sunbase.model.BlogPost;
import com.sunbase.model.User;
import com.sunbase.service.BlogPostService;
import com.sunbase.serviceImpl.BlogPostServiceImpl;

@WebServlet("/AdminHome")
@SuppressWarnings("serial")
public class AdminHome extends HttpServlet {

	private BlogPostService blogPostService;

	public void init() {
		blogPostService = new BlogPostServiceImpl();
	}

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			if (user != null && "Admin".equals(user.getRole())) {
				int userId = user.getUserID();
				List<BlogPost> blogPosts = blogPostService.getBlogPostsByUserId(userId);
				request.setAttribute("blogPosts", blogPosts);

				response.setContentType("text/html; charset=UTF-8");
				request.getRequestDispatcher("admin/index.jsp").forward(request, response);
			} else {
				response.sendRedirect("Home");
			}
		} else {
			response.sendRedirect("Home");
		}
	}
}
