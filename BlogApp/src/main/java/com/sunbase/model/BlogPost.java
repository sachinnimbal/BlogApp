package com.sunbase.model;

import java.time.LocalDateTime;

public class BlogPost {

	private int id;
	private int userId;
	private String title;
	private String category;
	private String coverImage;
	private String video;
	private String paragraph;
	private LocalDateTime createdDate;
	private LocalDateTime updatedDate;

	public BlogPost() {
		// Default constructor
	}

	public BlogPost(int id, int userId, String title, String category, String coverImage, String video,
			String paragraph, LocalDateTime createdDate, LocalDateTime updatedDate) {
		super();
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.category = category;
		this.coverImage = coverImage;
		this.video = video;
		this.paragraph = paragraph;
		this.createdDate = createdDate;
		this.updatedDate = updatedDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getCoverImage() {
		return coverImage;
	}

	public void setCoverImage(String coverImage) {
		this.coverImage = coverImage;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}

	public String getParagraph() {
		return paragraph;
	}

	public void setParagraph(String paragraph) {
		this.paragraph = paragraph;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	public LocalDateTime getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(LocalDateTime updatedDate) {
		this.updatedDate = updatedDate;
	}

}
