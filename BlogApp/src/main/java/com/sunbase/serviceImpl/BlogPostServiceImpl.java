package com.sunbase.serviceImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.sunbase.model.BlogPost;
import com.sunbase.service.BlogPostService;
import com.sunbase.util.DBConnectionUtil;

public class BlogPostServiceImpl implements BlogPostService {

	// SQL statements
	public static final String CREATE_TABLE_BLOG_POSTS = "CREATE TABLE IF NOT EXISTS `blog_posts` ("
			+ "`id` INT AUTO_INCREMENT PRIMARY KEY," + "`user_id` INT NOT NULL," + "`title` VARCHAR(255) NOT NULL,"
			+ "`category` VARCHAR(100)," + "`cover_image` VARCHAR(255)," + "`video` VARCHAR(255)," + "`paragraph` TEXT,"
			+ "`created_date` DATETIME NOT NULL," + "`updated_date` DATETIME,"
			+ "FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)" + ")";

	private static final String INSERT_BLOGPOST = "INSERT INTO `blog_posts` (`user_id`, `title`, `category`, `cover_image`, `video`, `paragraph`, `created_date`, `updated_date`) "
			+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

	private static final String SELECT_BY_USER_ID = "SELECT * FROM `blog_posts` WHERE `user_id` = ?";

	private static final String SELECT_BY_ID = "SELECT * FROM `blog_posts` WHERE `id` = ?";

	private static final String SELECT_ALL = "SELECT * FROM `blog_posts`";

	private static final String UPDATE_BLOGPOST = "UPDATE `blog_posts` SET `title` = ?, `category` = ?, `cover_image` = ?, `video` = ?, `paragraph` = ?, `updated_date` = ? WHERE `id` = ?";

	private static final String DELETE_BLOGPOST = "DELETE FROM `blog_posts` WHERE `id` = ?";

	private static final String SELECT_LATEST_BLOGS = "SELECT * FROM `blog_posts` ORDER BY `created_date` DESC LIMIT 6";

	private static final String PREVIOUS_POST_ID = "SELECT `id` FROM `blog_posts` WHERE `id` < ? ORDER BY `id` DESC LIMIT 1";

	private static final String NEXT_POST_ID = "SELECT `id` FROM `blog_posts` WHERE `id` > ? ORDER BY `id` ASC LIMIT 1";

	private static final String SELECT_BY_CATEGORY = "SELECT * FROM `blog_posts` WHERE `category` = ?";

	public static void createBlogPostTable() {
		try (Connection connection = DBConnectionUtil.getConnection();
				Statement statement = connection.createStatement()) {
			statement.executeUpdate(CREATE_TABLE_BLOG_POSTS);
			System.out.println("`blog_posts` table created successfully or already exists.");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public boolean addBlogPost(BlogPost blogPost) {
		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(INSERT_BLOGPOST)) {
			preparedStatement.setInt(1, blogPost.getUserId());
			preparedStatement.setString(2, blogPost.getTitle());
			preparedStatement.setString(3, blogPost.getCategory());
			preparedStatement.setString(4, blogPost.getCoverImage());
			preparedStatement.setString(5, blogPost.getVideo());
			preparedStatement.setString(6, blogPost.getParagraph());
			preparedStatement.setObject(7, blogPost.getCreatedDate());
			preparedStatement.setObject(8, blogPost.getUpdatedDate());

			int rowsAffected = preparedStatement.executeUpdate();
			return rowsAffected > 0;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<BlogPost> getBlogPostsByUserId(int userId) {
		List<BlogPost> blogPosts = new ArrayList<>();

		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_BY_USER_ID)) {

			preparedStatement.setInt(1, userId);
			ResultSet resultSet = preparedStatement.executeQuery();

			while (resultSet.next()) {
				BlogPost blogPost = extractedResultSet(resultSet);
				blogPosts.add(blogPost);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return blogPosts;
	}

	@Override
	public BlogPost getBlogPostById(int id) {
		BlogPost blogPost = null;

		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_BY_ID)) {

			preparedStatement.setInt(1, id);
			ResultSet resultSet = preparedStatement.executeQuery();

			if (resultSet.next()) {
				blogPost = extractedResultSet(resultSet);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return blogPost;
	}

	@Override
	public boolean updateBlogPost(BlogPost blogPost) {

		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(UPDATE_BLOGPOST)) {
			preparedStatement.setString(1, blogPost.getTitle());
			preparedStatement.setString(2, blogPost.getCategory());
			if (blogPost.getCoverImage() != null) {
				preparedStatement.setString(3, blogPost.getCoverImage());
			} else {
				preparedStatement.setString(3, "");
			}

			if (blogPost.getVideo() != null) {
				preparedStatement.setString(4, blogPost.getVideo());
			} else {
				preparedStatement.setString(4, "");
			}
			preparedStatement.setString(5, blogPost.getParagraph());
			preparedStatement.setObject(6, blogPost.getUpdatedDate());
			preparedStatement.setInt(7, blogPost.getId());

			int rowsAffected = preparedStatement.executeUpdate();
			return rowsAffected > 0;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean deleteBlogPost(int postId) {
		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(DELETE_BLOGPOST)) {
			preparedStatement.setInt(1, postId);
			int rowsAffected = preparedStatement.executeUpdate();
			return rowsAffected > 0;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<BlogPost> getLatestBlogs() {
		List<BlogPost> blogPosts = new ArrayList<>();

		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_LATEST_BLOGS);
				ResultSet resultSet = preparedStatement.executeQuery()) {

			while (resultSet.next()) {
				BlogPost blogPost = extractedResultSet(resultSet);
				blogPosts.add(blogPost);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return blogPosts;
	}

	@Override
	public int getPreviousPostId(int postId) {
		try (Connection conn = DBConnectionUtil.getConnection();
				PreparedStatement stmt = conn.prepareStatement(PREVIOUS_POST_ID)) {
			stmt.setInt(1, postId);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return rs.getInt("id");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

	@Override
	public int getNextPostId(int postId) {
		try (Connection conn = DBConnectionUtil.getConnection();
				PreparedStatement stmt = conn.prepareStatement(NEXT_POST_ID)) {
			stmt.setInt(1, postId);
			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				return rs.getInt("id");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return -1;
	}

	@Override
	public List<BlogPost> getBlogsByCategory(String category) {
		List<BlogPost> blogPosts = new ArrayList<>();

		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_BY_CATEGORY)) {

			preparedStatement.setString(1, category);
			ResultSet resultSet = preparedStatement.executeQuery();

			while (resultSet.next()) {
				BlogPost blogPost = extractedResultSet(resultSet);
				blogPosts.add(blogPost);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return blogPosts;
	}

	@Override
	public List<BlogPost> getAllBlogs() {
		List<BlogPost> blogPosts = new ArrayList<>();

		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement(SELECT_ALL)) {

			ResultSet resultSet = preparedStatement.executeQuery();

			while (resultSet.next()) {
				BlogPost blogPost = extractedResultSet(resultSet);
				blogPosts.add(blogPost);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return blogPosts;
	}

	private BlogPost extractedResultSet(ResultSet resultSet) throws SQLException {
		BlogPost blogPost = new BlogPost();
		blogPost.setId(resultSet.getInt("id"));
		blogPost.setUserId(resultSet.getInt("user_id"));
		blogPost.setTitle(resultSet.getString("title"));
		blogPost.setCategory(resultSet.getString("category"));
		blogPost.setCoverImage(resultSet.getString("cover_image"));
		blogPost.setVideo(resultSet.getString("video"));
		blogPost.setParagraph(resultSet.getString("paragraph"));
		blogPost.setCreatedDate(resultSet.getTimestamp("created_date").toLocalDateTime());
		blogPost.setUpdatedDate(resultSet.getTimestamp("updated_date") != null
				? resultSet.getTimestamp("updated_date").toLocalDateTime()
				: null);
		return blogPost;
	}

	@Override
	public List<BlogPost> searchByDate(Date dateQuery) {
		List<BlogPost> blogPosts = new ArrayList<>();

		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection
						.prepareStatement("SELECT * FROM `blog_posts` WHERE DATE(`created_date`) = ?")) {

			preparedStatement.setDate(1, new java.sql.Date(dateQuery.getTime()));
			ResultSet resultSet = preparedStatement.executeQuery();

			while (resultSet.next()) {
				BlogPost blogPost = extractedResultSet(resultSet);
				blogPosts.add(blogPost);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return blogPosts;
	}

	@Override
	public List<BlogPost> searchByTitle(String query) {
		List<BlogPost> blogPosts = new ArrayList<>();

		try (Connection connection = DBConnectionUtil.getConnection();
				PreparedStatement preparedStatement = connection
						.prepareStatement("SELECT * FROM `blog_posts` WHERE `title` LIKE ?")) {

			preparedStatement.setString(1, "%" + query + "%");
			ResultSet resultSet = preparedStatement.executeQuery();

			while (resultSet.next()) {
				BlogPost blogPost = extractedResultSet(resultSet);
				blogPosts.add(blogPost);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return blogPosts;
	}

}
