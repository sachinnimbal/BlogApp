<%@page import="java.util.Map"%>
<%@page import="java.time.format.DateTimeFormatter"%>
<%@page import="com.sunbase.model.BlogPost"%>
<%@page import="java.util.List"%>
<%@page import="com.sunbase.model.User"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Blog App</title>
<link rel="stylesheet" href="assets/css/blogapp.css">
<link rel="icon" href="assets/Images/logo.png" type="image/png">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<link rel="stylesheet"
	href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css">
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">

<style>
html, body {
	height: 100%;
}

.blog-post-image {
	margin-top: 10px;
}

.blog-post-meta {
	margin-top: 10px;
	margin-bottom: 10px;
}

.blog-post-content p {
	margin-bottom: 1rem;
}

.pagination {
	justify-content: space-between;
}

.recent-post-title:hover {
	color: #007bff;
}

.recent-text {
	border-left: 3px solid red;
	padding-left: 10px;
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
</head>
<body class="bg-body-tertiary">

	<%
	User user = (User) session.getAttribute("user");
	boolean isLoggedIn = user != null;
	%>

	<%
	String notificationMessage = null;
	// Determine where the notification message is coming from (session or request)
	if (request.getAttribute("notification") != null) {
		notificationMessage = (String) request.getAttribute("notification");
	} else if (session.getAttribute("notification") != null) {
		notificationMessage = (String) session.getAttribute("notification");
		session.removeAttribute("notification");
	}

	if (notificationMessage != null) {
		String imageSrc = notificationMessage.contains("successfully") ? "assets/Images/check.png"
		: "assets/Images/error.png";
	%>
	<figure class="notification">
		<div class="body">
			<img src="<%=imageSrc%>" title="Status" alt="Status" class="icon" />
			<%=notificationMessage%>
		</div>
		<div class="progress"></div>
	</figure>
	<%
	}
	%>

	<nav class="navbar navbar-light bg-light shadow">
		<div class="container-fluid justify-content-between">
			<a class="navbar-brand" href="Home"> <img
				src="assets/Images/logo.png" alt="Logo" width="30" height="28"
				class="d-inline-block align-text-top"> Blog App
			</a>
			<form class="d-flex" role="search" action="SearchServlet"
				method="GET">
				<input class="form-control me-2" type="search"
					placeholder="Search by title or date" aria-label="Search"
					name="query" required="required">
				<button class="btn btn-outline-success" type="submit">Search</button>
			</form>
			<%
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

	<main class="container mt-4">
		<div class="row">
			<div class="col-md-8">
				<%
				BlogPost blogPost = (BlogPost) request.getAttribute("blogPost");
				String adminName = (String) request.getAttribute("adminName");
				Integer previousPostId = (Integer) request.getAttribute("previousPostId");
				Integer nextPostId = (Integer) request.getAttribute("nextPostId");

				// Format the date
				SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM yyyy hh:mm:ss a");
				String formattedDate = dateFormat
						.format(Date.from(blogPost.getCreatedDate().atZone(java.time.ZoneId.systemDefault()).toInstant()));
				%>
				<nav>
					<ul class="pagination">
						<li>
							<form action="ViewBlogs" method="post">
								<input type="hidden" name="postId" value="<%=previousPostId%>">
								<button type="submit"
									style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
									class="btn btn-outline-primary <%=previousPostId == -1 ? "disabled" : ""%>">
									<span aria-hidden="true">&laquo; Previous</span>
								</button>
							</form>
						</li>
						<li>
							<form action="ViewBlogs" method="post">
								<input type="hidden" name="postId" value="<%=nextPostId%>">
								<button type="submit"
									style="border-top-left-radius: 0; border-bottom-left-radius: 0;"
									class="btn btn-outline-primary <%=nextPostId == -1 ? "disabled" : ""%>">
									<span aria-hidden="true">Next &raquo;</span>
								</button>
							</form>
						</li>
					</ul>
				</nav>
				<div class="d-flex justify-content-between">
					<strong class="d-inline-block mb-2 text-primary-emphasis"><%=blogPost.getCategory()%></strong>
					<%
					if (blogPost.getUpdatedDate() != null) {
					%>
					<small class="d-inline-block mb-2 text-muted">Edited </small>
					<%
					} else {
					%>
					<small class="d-inline-block mb-2 text-muted"></small>
					<%
					}
					%>
				</div>
				<h3 class="blog-post-title"><%=blogPost.getTitle()%></h3>
				<img src="CoverImages/<%=blogPost.getCoverImage()%>"
					class="img-fluid blog-post-image" alt="Cover Image">
				<div class="blog-post-meta">
					<p class="text-muted">
						Posted on
						<%=formattedDate%>
						by <span class="text-primary-emphasis"><%=adminName%></span>
					</p>
				</div>
				<div class="blog-post-content">

					<%
					String paragraphContent = blogPost.getParagraph();
					String[] paragraphs = paragraphContent.split("\n");
					boolean firstParagraph = true;

					for (String paragraph : paragraphs) {
						if (firstParagraph) {
							// Display the first paragraph
					%>
					<p class="lh-base" style="text-align: justify;"><%=paragraph%></p>
					<%
					firstParagraph = false;

					// Display embedded YouTube video if available
					String youtubeLink = blogPost.getVideo();
					if (youtubeLink != null && !youtubeLink.isEmpty()) {
						String videoId = youtubeLink.split("v=")[1];
					%>

					<div
						class="embed-responsive align-items-center d-flex justify-content-center">
						<iframe class="embed-responsive-item"
							src="https://www.youtube.com/embed/<%=videoId%>?rel=0&amp;controls=1&amp;showinfo=0"></iframe>
					</div>

					<%
					}
					} else {
					// Display subsequent paragraphs
					%>
					<p class="lh-base" style="text-align: justify;"><%=paragraph%></p>
					<%
					}
					}
					%>

				</div>
				<nav>
					<ul class="pagination">
						<li>
							<form action="ViewBlogs" method="post">
								<input type="hidden" name="postId" value="<%=previousPostId%>">
								<button type="submit"
									style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
									class="btn btn-outline-primary <%=previousPostId == -1 ? "disabled" : ""%>">
									<span aria-hidden="true">&laquo; Previous</span>
								</button>
							</form>
						</li>
						<li>
							<form action="ViewBlogs" method="post">
								<input type="hidden" name="postId" value="<%=nextPostId%>">
								<button type="submit"
									style="border-top-left-radius: 0; border-bottom-left-radius: 0;"
									class="btn btn-outline-primary <%=nextPostId == -1 ? "disabled" : ""%>">
									<span aria-hidden="true">Next &raquo;</span>
								</button>
							</form>
						</li>
					</ul>
				</nav>
			</div>

			<div class="col-md-4">
				<div class="position-sticky" style="top: 2rem;">
					<div class="mb-3">
						<form class="d-flex" role="search" action="SearchServlet"
							method="GET">
							<input class="form-control me-2" type="search"
								placeholder="Search by title or date" aria-label="Search"
								name="query" required="required">
							<button class="btn btn-outline-success" type="submit">Search</button>
						</form>
					</div>
					<div>
						<h4 class="fst-italic recent-text">Recent posts</h4>
						<%
						@SuppressWarnings("unchecked")
						List<BlogPost> latestBlogs = (List<BlogPost>) request.getAttribute("latestBlogs");

						DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd MMM yyyy hh:mm a");

						for (BlogPost recentPost : latestBlogs) {
							String recentPostDate = recentPost.getCreatedDate().format(dateFormatter);

							// Check if the recent post is the current blog post being viewed
							if (recentPost.getId() != blogPost.getId()) {
						%>
						<form action="ViewBlogs" method="post">
							<input type="hidden" name="postId"
								value="<%=recentPost.getId()%>">
							<div
								class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
								onclick="this.parentNode.submit()" style="cursor: pointer;">
								<div class="col-md-4 blog-image-container">
									<img src="CoverImages/<%=recentPost.getCoverImage()%>"
										class="bd-placeholder-img img-fluid rounded h-100 blog-image"
										alt="Cover Image">
								</div>
								<div class="ms-3">
									<h6 class="mb-0 recent-post-title"><%=recentPost.getTitle().length() > 35 ? recentPost.getTitle().substring(0, 35) + "..." : recentPost.getTitle()%></h6>
									<small class="text-body-secondary"><%=recentPostDate%></small>
								</div>
							</div>
						</form>
						<%
						}
						}
						%>
					</div>
				</div>
			</div>

		</div>

	</main>

	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
