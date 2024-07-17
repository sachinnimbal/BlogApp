<%@ page import="java.time.format.DateTimeFormatter"%>
<%@ page import="com.sunbase.model.BlogPost"%>
<%@ page import="java.util.List, java.util.Map"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
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
<link rel="stylesheet" href="assets/css/blogapp.css">
<link rel="icon" href="assets/Images/logo.png" type="image/png">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet">
<style>
.blog-card {
	margin-bottom: 20px;
}

.blog-card img {
	max-width: 150px;
}

.blog-card-body {
	display: flex;
	flex-direction: column;
}

.center-container {
	height: 100vh;
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
			com.sunbase.model.User user = (com.sunbase.model.User) session.getAttribute("user");
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
		<div class="row mt-4">
			<div class="col-md-8">
				<div class="container">
					<a href="Home" class="btn btn-sm btn-primary">Go Back</a>
					<div class="section-title">
						<%
						@SuppressWarnings("unchecked")
						List<BlogPost> blogs = (List<BlogPost>) request.getAttribute("blogs");
						@SuppressWarnings("unchecked")
						Map<Integer, String> adminNames = (Map<Integer, String>) request.getAttribute("adminNames");
						SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMMM yyyy hh:mm:ss a");
						if (blogs != null && !blogs.isEmpty()) {
							BlogPost blogPost = blogs.get(0);
							// Get the first blog post to display the category
						%>
						<h2>
							<span><%=blogPost.getCategory()%></span>
						</h2>
					</div>

					<div class="row">
						<%
						for (BlogPost post : blogs) {
							String formattedDate = dateFormat
							.format(Date.from(post.getCreatedDate().atZone(ZoneId.systemDefault()).toInstant()));
							String adminName = adminNames.get(post.getId());
						%>
						<div class="col-md-12">
							<div class="card mb-3">
								<div class="row g-0">
									<div class="col-md-4">
										<img src="CoverImages/<%=post.getCoverImage()%>"
											class="img-fluid rounded h-100" alt="Cover Image">
									</div>
									<div class="col-md-8">
										<div class="card-body col d-flex flex-column position-static">
											<div class="d-flex justify-content-between">
												<strong class="d-inline-block mb-2 text-primary-emphasis"><%=post.getCategory()%></strong>
												<%
												if (post.getUpdatedDate() != null) {
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
												String title = post.getTitle();
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
													String paragraph = post.getParagraph();
													String[] words = paragraph.split(" ");
													for (int i = 0; i < Math.min(words.length, 12); i++) {
														out.print(words[i] + " ");
													}
													if (words.length > 14) {
														out.print("...");
													}
													%>
												</p>
											</div>
											<p class="card-text">
												<small class="text-muted">Posted on <%=formattedDate%>
													by <span class="text-primary-emphasis"><%=adminName%></span></small>
											</p>
											<a href="" onclick="openInNewTab('<%=post.getId()%>')"
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

					<%
					} else {
					%>
					<div class="col-md-12">
						<h5 class="card-title">No Blogs Available</h5>
						<div class="blog-post-content">
							<p class="card-text">There are no blogs available in this
								category at the moment. Please check back later.</p>
						</div>
					</div>
					<%
					}
					%>
				</div>
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
						%>
					</div>
				</div>
			</div>

		</div>
	</main>

	<script>
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

</body>
</html>
