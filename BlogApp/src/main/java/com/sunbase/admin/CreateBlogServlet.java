package com.sunbase.admin;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import com.sunbase.model.BlogPost;
import com.sunbase.model.User;
import com.sunbase.service.BlogPostService;
import com.sunbase.serviceImpl.BlogPostServiceImpl;

@SuppressWarnings("serial")
@WebServlet("/InsertBlog")
@MultipartConfig
public class CreateBlogServlet extends HttpServlet {

	private BlogPostService blogPostService;

	public CreateBlogServlet() {
		blogPostService = new BlogPostServiceImpl();
		BlogPostServiceImpl.createBlogPostTable();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			if (user != null && "Admin".equals(user.getRole())) {

				String title = request.getParameter("blogTitle");
				String category = request.getParameter("blogCategory");
				String paragraph = request.getParameter("blogParagraph");

				Part coverImagePart = request.getPart("blogCover");
				String youtubeLink = request.getParameter("blogVideoLink");

				String coverImage = null;
				if (coverImagePart != null && coverImagePart.getSize() > 0) {
					coverImage = saveFile(coverImagePart, "CoverImages/");
				}

				int userId = user.getUserID();

				BlogPost blogPost = new BlogPost();
				blogPost.setUserId(userId);
				blogPost.setTitle(title);
				blogPost.setCategory(category);
				blogPost.setCoverImage(coverImage);
				blogPost.setVideo(youtubeLink);
				blogPost.setParagraph(paragraph);
				blogPost.setCreatedDate(LocalDateTime.now());
				blogPost.setUpdatedDate(null);

				boolean success = blogPostService.addBlogPost(blogPost);

				if (success) {
					session.setAttribute("notification", "Blog post added successfully. 🎉");
				} else {
					session.setAttribute("notification", "Failed to add blog post. &#128683;");
				}

				response.sendRedirect("AdminHome");
			} else {
				response.sendRedirect("Home");
			}
		} else {
			response.sendRedirect("Home");
		}
	}

	private String saveFile(Part filePart, String directory) throws IOException {
		String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
		Path dirPath = Paths.get(this.getServletContext().getRealPath(directory));
		Files.createDirectories(dirPath);
		Path filePath = dirPath.resolve(fileName);
		filePart.write(filePath.toString());
		return fileName;
	}
}
