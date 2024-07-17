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

@WebServlet("/UpdateBlog")
@SuppressWarnings("serial")
@MultipartConfig
public class UpdateBlogServlet extends HttpServlet {

	private BlogPostService blogPostService;

	public UpdateBlogServlet() {
		blogPostService = new BlogPostServiceImpl();
		BlogPostServiceImpl.createBlogPostTable();
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			if (user != null && "Admin".equals(user.getRole())) {

				String postIdStr = request.getParameter("postId");
				String title = request.getParameter("blogTitle");
				String category = request.getParameter("blogCategory");
				String paragraph = request.getParameter("blogParagraph");

				Part coverImagePart = request.getPart("blogCover");
				String youtubeLink = request.getParameter("blogVideoLink");

				int userId = user.getUserID();
				BlogPost blogPost = new BlogPost();
				blogPost.setUserId(userId);

				boolean isUpdated = false;

				if (postIdStr != null && !postIdStr.isEmpty()) {
					int postId = Integer.parseInt(postIdStr);
					blogPost.setId(postId);
					blogPost.setUpdatedDate(LocalDateTime.now());

					// Fetch the existing blog post from the database
					BlogPost existingBlogPost = blogPostService.getBlogPostById(postId);

					// Check and update title
					if (title != null && !title.isEmpty() && !title.equals(existingBlogPost.getTitle())) {
						blogPost.setTitle(title);
						isUpdated = true;
					} else {
						blogPost.setTitle(existingBlogPost.getTitle());
					}

					// Check and update category
					if (category != null && !category.isEmpty() && !category.equals(existingBlogPost.getCategory())) {
						blogPost.setCategory(category);
						isUpdated = true;
					} else {
						blogPost.setCategory(existingBlogPost.getCategory());
					}

					// Check and update paragraph
					if (paragraph != null && !paragraph.isEmpty()
							&& !paragraph.equals(existingBlogPost.getParagraph())) {
						blogPost.setParagraph(paragraph);
						isUpdated = true;
					} else {
						blogPost.setParagraph(existingBlogPost.getParagraph());
					}

					// Check and update cover image
					if (coverImagePart != null && coverImagePart.getSize() > 0) {
						String coverImage = saveFile(coverImagePart, "CoverImages/");
						blogPost.setCoverImage(coverImage);
						isUpdated = true;
					} else {
						blogPost.setCoverImage(existingBlogPost.getCoverImage());
					}

					// Check and update YouTube link
					if (youtubeLink != null && !youtubeLink.isEmpty()
							&& !youtubeLink.equals(existingBlogPost.getVideo())) {
						blogPost.setVideo(youtubeLink);
						isUpdated = true;
					} else {
						blogPost.setVideo(existingBlogPost.getVideo());
					}

					if (isUpdated) {
						boolean success = blogPostService.updateBlogPost(blogPost);
						if (success) {
							session.setAttribute("notification", "Blog post updated successfully. 🎉");
						} else {
							session.setAttribute("notification", "Failed to update blog post. &#128683;");
						}
					}
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
