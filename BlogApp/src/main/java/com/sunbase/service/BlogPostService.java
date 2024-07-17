package com.sunbase.service;

import java.util.Date;
import java.util.List;

import com.sunbase.model.BlogPost;

public interface BlogPostService {

	boolean addBlogPost(BlogPost blogPost);

	List<BlogPost> getBlogPostsByUserId(int userId);

	BlogPost getBlogPostById(int id);

	boolean updateBlogPost(BlogPost blogPost);

	boolean deleteBlogPost(int postId);

	List<BlogPost> getLatestBlogs();

	int getPreviousPostId(int postId);

	int getNextPostId(int postId);

	List<BlogPost> getBlogsByCategory(String category);

	List<BlogPost> getAllBlogs();

	List<BlogPost> searchByDate(Date dateQuery);

	List<BlogPost> searchByTitle(String query);

}
