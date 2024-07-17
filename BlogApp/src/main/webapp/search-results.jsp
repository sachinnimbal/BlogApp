<%@page import="java.util.Map"%>
<%@page import="com.sunbase.model.User"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page import="java.util.List"%>
<%@ page import="com.sunbase.model.BlogPost"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.time.format.DateTimeFormatter"%>
<%@ page import="java.time.ZoneId"%>
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
					name="query" required="required">
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

	<%
	String notificationMessage = null;
	if (request.getAttribute("notification") != null) {
		notificationMessage = (String) request.getAttribute("notification");
	} else if (session.getAttribute("notification") != null) {
		notificationMessage = (String) session.getAttribute("notification");
		session.removeAttribute("notification");
	}

	if (notificationMessage != null) {
		String imageSrc = notificationMessage.contains("successfully")
		? "assets/Images/check.png"
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

	<main class="container">
		<div class="row g-5 mt-3">
			<div class="col-md-12">
				<div class="container">
					<div class="section-title">
						<h2>
							<span>Search Results</span>
						</h2>
					</div>
					<div class="row">
						<%
						String query = (String) request.getAttribute("query");
						if (query != null && !query.isEmpty()) {
						%>
						<h5>
							Search results for:
							<%=query%></h5>
						<%
						}
						%>
					</div>
					<div class="row">
						<%
						@SuppressWarnings("unchecked")
						List<BlogPost> searchResults = (List<BlogPost>) request.getAttribute("searchResults");
						if (searchResults != null && !searchResults.isEmpty()) {
							for (BlogPost blogPost : searchResults) {
								@SuppressWarnings("unchecked")
								Map<Integer, String> adminNames = (Map<Integer, String>) request.getAttribute("adminNames");
								String adminName = adminNames.get(blogPost.getId());
								String formattedDate = blogPost.getCreatedDate().format(DateTimeFormatter.ofPattern("dd MMMM yyyy hh:mm:ss a"));
						%>
						<div class="col-md-6">
							<div class="card mb-3">
								<div class="row g-0">
									<div class="col-md-4">
										<img src="CoverImages/<%=blogPost.getCoverImage()%>"
											class="img-fluid rounded h-100" alt="Cover Image">
									</div>
									<div class="col-md-8">
										<div class="card-body col d-flex flex-column position-static">
											<strong class="d-inline-block mb-2 text-primary-emphasis"><%=blogPost.getCategory()%></strong>
											<h5 class="card-title">
												<%
												String title = blogPost.getTitle();
												String[] titleWords = title.split(" ");
												for (int j = 0; j < Math.min(titleWords.length, 6); j++) {
													out.print(titleWords[j] + " ");
												}
												if (titleWords.length > 6) {
													out.print("...");
												}
												%>
											</h5>
											<div class="blog-post-content">
												<p class="card-text">
													<%
													String paragraph = blogPost.getParagraph();
													String[] words = paragraph.split(" ");
													for (int i = 0; i < Math.min(words.length, 13); i++) {
														out.print(words[i] + " ");
													}
													if (words.length > 13) {
														out.print("...");
													}
													%>
												</p>
											</div>
											<p class="card-text">
												<small class="text-muted">Posted on <%=formattedDate%>
													by <span class="text-primary-emphasis"><%=adminName%></span></small>
											</p>
											<a href="" onclick="openInNewTab('<%=blogPost.getId()%>')"
												class="icon-link gap-1 icon-link-hover stretched-link">Continue
												reading</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<%
						}
						} else {
						%>
						<div class="col-md-12">
							<p>No results found.</p>
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
