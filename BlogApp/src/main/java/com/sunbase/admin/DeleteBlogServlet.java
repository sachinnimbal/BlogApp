package com.sunbase.admin;

import com.sunbase.model.User;
import com.sunbase.service.BlogPostService;
import com.sunbase.serviceImpl.BlogPostServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet("/DeleteBlog")
@SuppressWarnings("serial")
public class DeleteBlogServlet extends HttpServlet {

	private BlogPostService blogPostService;

	public DeleteBlogServlet() {
		blogPostService = new BlogPostServiceImpl();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			if (user != null && "Admin".equals(user.getRole())) {
				String postIdStr = request.getParameter("postId");
				if (postIdStr != null && !postIdStr.isEmpty()) {
					int postId = Integer.parseInt(postIdStr);
					boolean success = blogPostService.deleteBlogPost(postId);
					if (success) {
						session.setAttribute("notification", "Blog post deleted successfully. 🎉");
					} else {
						session.setAttribute("notification", "Failed to delete blog post. &#128683;");
					}
				} else {
					session.setAttribute("notification", "Invalid request to delete blog post. &#128683;");
				}
				response.sendRedirect("AdminHome");
			} else {
				response.sendRedirect("Home");
			}
		} else {
			response.sendRedirect("Home");
		}
	}
}
