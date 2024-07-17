package com.sunbase.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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

@WebServlet("/SearchServlet")
@SuppressWarnings("serial")
public class SearchServlet extends HttpServlet {

	private BlogPostService blogPostService;
	private UserService userService;

	public void init() {
		blogPostService = new BlogPostServiceImpl();
		userService = new UserServiceImpl();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String query = request.getParameter("query");

		List<BlogPost> searchResults = null;
		Map<Integer, String> adminNames = new HashMap<>();
		HttpSession session = request.getSession();

		if (query != null && !query.isEmpty()) {
			// Attempt to parse query as a date
			Date dateQuery = parseDate(query);

			if (dateQuery != null) {
				searchResults = blogPostService.searchByDate(dateQuery);
			} else {
				searchResults = blogPostService.searchByTitle(query);
			}

			for (BlogPost blogPost : searchResults) {
				User adminUser = userService.getUserById(blogPost.getUserId());
				adminNames.put(blogPost.getId(), adminUser != null ? adminUser.getName() : "Unknown");
			}
		} else {
			session.setAttribute("notification", "Please enter a search query.");
			request.getRequestDispatcher("search-results.jsp").forward(request, response);
			return;
		}

		request.setAttribute("searchResults", searchResults);
		request.setAttribute("query", query);
		request.setAttribute("adminNames", adminNames);
		request.getRequestDispatcher("search-results.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	private Date parseDate(String query) {
		Date dateQuery = null;

		SimpleDateFormat[] dateFormats = { new SimpleDateFormat("dd MMMM yyyy"), // Format: 16 July 2024
				new SimpleDateFormat("dd-MM-yyyy"), // Format: 16-07-2024
		};

		for (SimpleDateFormat format : dateFormats) {
			try {
				dateQuery = format.parse(query);
				System.out.println("Parsed date with format [" + format.toPattern() + "]: " + dateQuery);
				return dateQuery;
			} catch (ParseException e) {
				System.out.println("Failed to parse date with format: " + format.toPattern());
			}
		}

		return null;
	}

}
