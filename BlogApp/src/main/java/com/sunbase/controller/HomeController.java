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

@WebServlet("/Home")
@SuppressWarnings("serial")
public class HomeController extends HttpServlet {

	private BlogPostService blogPostService;
	private UserService userService;

	public void init() {
		blogPostService = new BlogPostServiceImpl();
		userService = new UserServiceImpl();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		List<BlogPost> allBlogs = blogPostService.getAllBlogs();
		List<BlogPost> latestBlogs = blogPostService.getLatestBlogs();
		Map<Integer, String> adminNames = new HashMap<>();

		for (BlogPost blogPost : allBlogs) {
			User adminUser = userService.getUserById(blogPost.getUserId());
			adminNames.put(blogPost.getId(), adminUser != null ? adminUser.getName() : "Unknown");
		}
		
		for (BlogPost latestBlogPost : latestBlogs) {
			User adminUser = userService.getUserById(latestBlogPost.getUserId());
			adminNames.put(latestBlogPost.getId(), adminUser != null ? adminUser.getName() : "Unknown");
		}

		request.setAttribute("latestBlogs", latestBlogs);
		request.setAttribute("adminNames", adminNames);
		request.setAttribute("allBlogs", allBlogs);
		request.getRequestDispatcher("index.jsp").forward(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}
}
