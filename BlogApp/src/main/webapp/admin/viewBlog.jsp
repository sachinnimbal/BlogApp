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
<title>Blog App | Admin</title>
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
</style>
</head>
<body>

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

	<nav class="navbar navbar-dark bg-dark">
		<div class="container-fluid justify-content-between">
			<a class="navbar-brand" href="AdminHome"> <img
				src="assets/Images/logo.png" alt="Logo" width="30" height="28"
				class="d-inline-block align-text-top"> Blog App
			</a>
			<%
			if (isLoggedIn) {
			%>
			<a class="btn btn-sm btn-primary text-white" href="Logout">Logout</a>
			<%
			}
			%>
		</div>
	</nav>

	<main class="container mt-4">
		<div class="row g-5">
			<div class="col-md-9">
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
				<h1 class="blog-post-title"><%=blogPost.getTitle()%></h1>
				<img src="CoverImages/<%=blogPost.getCoverImage()%>"
					class="img-fluid blog-post-image" alt="Cover Image">
				<div class="blog-post-meta">
					<p class="text-muted">
						Posted on
						<%=formattedDate%>
						by
						<%=adminName%>
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
							<form action="ViewBlog" method="post">
								<input type="hidden" name="postId" value="<%=previousPostId%>">
								<button type="submit"
									style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
									class="btn btn-outline-primary <%=previousPostId == -1 ? "disabled" : ""%>">
									<span aria-hidden="true">&laquo; Previous</span>
								</button>
							</form>
						</li>
						<li>
							<form action="ViewBlog" method="post">
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
		</div>
	</main>

	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
