<%@page import="com.sunbase.model.User"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.sunbase.model.BlogPost"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.time.LocalDateTime"%>
<%@ page import="java.time.ZoneId"%>
<%@ page import="java.time.ZonedDateTime"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blog App</title>
<style>
.blog-image-container {
	position: relative;
	overflow: hidden;
}

.blog-image {
	transition: transform 0.3s ease-in-out;
}

.blog-image:hover {
	transform: scale(1.1);
}

.category-box {
	position: relative;
	overflow: hidden;
	cursor: pointer;
}

.category-box img {
	width: 100%;
	height: auto;
	transition: transform 0.3s ease-in-out;
}

.category-box .overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	padding: 8px;
	transition: opacity 0.3s ease-in-out;
	opacity: 1;
}

.category-box:hover .overlay {
	opacity: 0;
}

.blog-image-container {
	position: relative;
	overflow: hidden;
}

.blog-image {
	transition: transform 0.3s ease-in-out;
}

.blog-image:hover {
	transform: scale(1.1);
}
</style>
<link rel="stylesheet" href="assets/css/blogapp.css">
<link rel="icon" href="assets/Images/logo.png" type="image/png">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>
<body class="bg-body-tertiary">
	<nav class="navbar navbar-light bg-light fixed-top shadow">
		<div class="container-fluid justify-content-between">
			<a class="navbar-brand" href="Home"> <img
				src="assets/Images/logo.png" alt="Logo" width="30" height="28"
				class="d-inline-block align-text-top"> Blog App
			</a>
			<form class="d-flex" role="search" action="SearchServlet"
				method="GET">
				<input class="form-control me-2" type="search"
					placeholder="Search by title or date" aria-label="Search"
					name="query">
				<button class="btn btn-outline-success" type="submit">Search</button>
			</form>

			<%
			User user = (User) session.getAttribute("user");
			boolean isLoggedIn = user != null;
			if (isLoggedIn) {
			%>
			<a class="btn btn-sm btn-primary text-white" href="Logout">Logout</a>
			<%
			} else {
			%>
			<a class="btn btn-sm btn-primary text-white"
				href="UserManage?action=signin">Sign in</a>
			<%
			}
			%>
		</div>
	</nav>

	<main class="container">
		<div class="row g-5 mt-3">
			<div class="col-md-12">
				<div class="container">
					<div class="section-title">
						<h2>
							<span>Categories</span>
						</h2>
					</div>
					<div class="row gy-4">
						<div class="col-md-3">
							<div class="category-box" onclick="fetchBlogs('lifestyle')">
								<img src="assets/Images/lifestyle.jpg" alt="Lifestyle">
								<div class="overlay">Lifestyle</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="category-box" onclick="fetchBlogs('travel')">
								<img src="assets/Images/travel.jpg" alt="Travel">
								<div class="overlay">Travel</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="category-box" onclick="fetchBlogs('interior')">
								<img src="assets/Images/interior.jpg" alt="Interior">
								<div class="overlay">Interior</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="category-box" onclick="fetchBlogs('growth')">
								<img src="assets/Images/growth.jpg" alt="Growth">
								<div class="overlay">Growth</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row mt-2">
			<div class="col-md-12">
				<div class="container">
					<div class="section-title">
						<h2>
							<span>All Blogs</span>
						</h2>
					</div>
					<div class="row">
						<%
						@SuppressWarnings("unchecked")
						List<BlogPost> allBlogs = (List<BlogPost>) request.getAttribute("allBlogs");
						for (BlogPost allblogPost : allBlogs) {
							@SuppressWarnings("unchecked")
							Map<Integer, String> adminNames = (Map<Integer, String>) request.getAttribute("adminNames");
							SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM yyyy hh:mm:ss a");
							String formattedDate = dateFormat
							.format(Date.from(allblogPost.getCreatedDate().atZone(ZoneId.systemDefault()).toInstant()));
							String adminName = adminNames.get(allblogPost.getId());
						%>
						<div class="col-md-6">
							<div class="card mb-3">
								<div class="row g-0">
									<div class="col-md-4 blog-image-container">
										<img src="CoverImages/<%=allblogPost.getCoverImage()%>"
											class="bd-placeholder-img img-fluid rounded h-100 blog-image"
											alt="Cover Image">
									</div>
									<div class="col-md-8">
										<div class="card-body col d-flex flex-column position-static">
											<div class="d-flex justify-content-between">
												<strong class="d-inline-block mb-2 text-primary-emphasis"><%=allblogPost.getCategory()%></strong>
												<%
												if (allblogPost.getUpdatedDate() != null) {
												%>
												<small class="d-inline-block mb-2 text-muted">Edited</small>
												<%
												} else {
												%>
												<small class="d-inline-block mb-2 text-muted"></small>
												<%
												}
												%>
											</div>
											<h5 class="card-title">
												<%
												String title = allblogPost.getTitle();
												String[] word = title.split(" ");
												for (int j = 0; j < Math.min(word.length, 6); j++) {
													out.print(word[j] + " ");
												}
												if (word.length > 6) {
													out.print("...");
												}
												%>
											</h5>
											<div class="blog-post-content">
												<p class="card-text">
													<%
													String paragraph = allblogPost.getParagraph();
													String[] words = paragraph.split(" ");
													for (int i = 0; i < Math.min(words.length, 10); i++) {
														out.print(words[i] + " ");
													}
													if (words.length > 10) {
														out.print("...");
													}
													%>
												</p>
											</div>
											<p class="card-text">
												<small class="text-muted">Posted on <%=formattedDate%>
													by <span class="text-primary-emphasis"><%=adminName%></span></small>
											</p>
											<a href="" onclick="openInNewTab('<%=allblogPost.getId()%>')"
												class="icon-link gap-1 icon-link-hover stretched-link">Continue
												reading</a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<%
						}
						%>
					</div>
				</div>
			</div>
		</div>
	</main>

	<script>
		function fetchBlogs(category) {
			var form = document.createElement('form');
			form.action = 'FetchBlogs';
			form.method = 'post';
			form.target = '_blank';

			var categoryField = document.createElement('input');
			categoryField.type = 'hidden';
			categoryField.name = 'category';
			categoryField.value = category;
			form.appendChild(categoryField);

			document.body.appendChild(form);
			form.submit();
			document.body.removeChild(form);
		}

		function openInNewTab(postId) {
			var form = document.createElement('form');
			form.action = 'ViewBlogs';
			form.method = 'post';
			form.target = '_blank';
			var postIdField = document.createElement('input');
			postIdField.type = 'hidden';
			postIdField.name = 'postId';
			postIdField.value = postId;
			form.appendChild(postIdField);
			document.body.appendChild(form);
			form.submit();
			document.body.removeChild(form);
		}
	</script>

	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
