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

import com.sunbase.model.BlogPost;
import com.sunbase.model.User;
import com.sunbase.service.BlogPostService;
import com.sunbase.service.UserService;
import com.sunbase.serviceImpl.BlogPostServiceImpl;
import com.sunbase.serviceImpl.UserServiceImpl;

@WebServlet("/FetchBlogs")
@SuppressWarnings("serial")
public class FetchBlogsServlet extends HttpServlet {

	private BlogPostService blogPostService;
	private UserService userService;

	public void init() {
		blogPostService = new BlogPostServiceImpl();
		userService = new UserServiceImpl();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String category = request.getParameter("category");
		List<BlogPost> blogs = blogPostService.getBlogsByCategory(category);
		Map<Integer, String> adminNames = new HashMap<>();
		List<BlogPost> latestBlogs = blogPostService.getLatestBlogs();

		for (BlogPost latestBlogPost : latestBlogs) {
			User adminUser = userService.getUserById(latestBlogPost.getUserId());
			adminNames.put(latestBlogPost.getId(), adminUser != null ? adminUser.getName() : "Unknown");
		}

		request.setAttribute("latestBlogs", latestBlogs);

		for (BlogPost blogPost : blogs) {
			User adminUser = userService.getUserById(blogPost.getUserId());
			String adminName = adminUser != null ? adminUser.getName() : "Unknown";
			adminNames.put(blogPost.getId(), adminName);
		}

		request.setAttribute("adminNames", adminNames);
		request.setAttribute("blogs", blogs);
		request.getRequestDispatcher("fetchBlogs.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}
}
