package com.sunbase.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sunbase.model.BlogPost;
import com.sunbase.model.User;
import com.sunbase.service.BlogPostService;
import com.sunbase.service.UserService;
import com.sunbase.serviceImpl.BlogPostServiceImpl;
import com.sunbase.serviceImpl.UserServiceImpl;

@WebServlet("/ViewBlogs")
@SuppressWarnings("serial")
public class ViewBlogsServlet extends HttpServlet {

	private BlogPostService blogPostService;
	private UserService userService;

	public void init() {
		blogPostService = new BlogPostServiceImpl();
		userService = new UserServiceImpl();
	}

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		if (session != null) {

			String postIdStr = request.getParameter("postId");
			if (postIdStr != null && !postIdStr.isEmpty()) {
				try {
					int postId = Integer.parseInt(postIdStr);
					BlogPost blogPost = blogPostService.getBlogPostById(postId);
					List<BlogPost> latestBlogs = blogPostService.getLatestBlogs();
					Map<Integer, String> adminNames = new HashMap<>();

					for (BlogPost latestBlogPost : latestBlogs) {
						User adminUser = userService.getUserById(latestBlogPost.getUserId());
						adminNames.put(latestBlogPost.getId(), adminUser != null ? adminUser.getName() : "Unknown");
					}

					request.setAttribute("latestBlogs", latestBlogs);

					if (blogPost != null) {
						User adminUser = userService.getUserById(blogPost.getUserId());
						String adminName = adminUser != null ? adminUser.getName() : "Unknown";

						request.setAttribute("adminName", adminName);
						request.setAttribute("blogPost", blogPost);

						// Fetch previous and next post ids for pagination
						int previousPostId = blogPostService.getPreviousPostId(postId);
						int nextPostId = blogPostService.getNextPostId(postId);

						request.setAttribute("previousPostId", previousPostId);
						request.setAttribute("nextPostId", nextPostId);

						request.getRequestDispatcher("viewBlogs.jsp").forward(request, response);
					} else {
						session.setAttribute("notification", "Blog post with ID " + postId + " not found. &#128683;");
						response.sendRedirect("Home");
					}
				} catch (NumberFormatException e) {
					session.setAttribute("notification", "Invalid postId format. &#128683;");
					response.sendRedirect("Home");
				}
			} else {
				session.setAttribute("notification", "postId parameter is missing. &#128683;");
				response.sendRedirect("Home");
			}
		} else {
			response.sendRedirect("Home");
		}
	}
}
