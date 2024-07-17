package com.sunbase.admin;

import java.io.IOException;

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

@WebServlet("/EditBlog")
@SuppressWarnings("serial")
public class EditBlogServlet extends HttpServlet {

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			if (user != null && "Admin".equals(user.getRole())) {
				int postId = Integer.parseInt(request.getParameter("postId"));
				BlogPostService blogPostDAO = new BlogPostServiceImpl();
				BlogPost blogPost = blogPostDAO.getBlogPostById(postId);

				request.setAttribute("blogPost", blogPost);
				request.getRequestDispatcher("admin/editBlog.jsp").forward(request, response);
			} else {
				response.sendRedirect("Home");
			}
		} else {
			response.sendRedirect("Home");
		}
	}

}
