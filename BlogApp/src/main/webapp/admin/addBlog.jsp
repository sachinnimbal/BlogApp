<%@page import="com.sunbase.model.User"%>
<%@page import="java.time.format.DateTimeFormatter"%>
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
	href="https://cdn.quilljs.com/1.3.7/quill.snow.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<style>
html, body {
	height: 100%;
}
</style>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
	<%
	User user = (User) session.getAttribute("user");
	boolean isLoggedIn = user != null;
	%>

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
			<div class="col-md-12">
				<div class="card">
					<div class="card-header d-flex justify-content-between">
						<h5 class="card-title">Add Blog Posts</h5>
						<a href="AdminHome" class="btn btn-sm btn-primary">Go Back</a>
					</div>
					<div class="card-body">
						<form action="InsertBlog" id="addBlogForm" method="POST"
							class="needs-validation" enctype="multipart/form-data" novalidate>
							<div class="mb-3">
								<label for="blogTitle" class="form-label">Title</label> <input
									type="text" class="form-control" id="blogTitle"
									placeholder="Enter the title of this blog" name="blogTitle"
									required>
								<div class="invalid-feedback">Please provide a title.</div>
							</div>
							<div class="mb-3">
								<label for="blogCategory" class="form-label">Category</label> <select
									class="form-select" id="blogCategory" name="blogCategory"
									required>
									<option value="" disabled selected>Select category</option>
									<option value="Lifestyle">Lifestyle</option>
									<option value="Travel">Travel</option>
									<option value="Interior">Interior</option>
									<option value="Growth">Growth</option>
								</select>
								<div class="invalid-feedback">Please select a category.</div>
							</div>
							<div class="mb-3">
								<label for="blogCover" class="form-label">Upload Cover</label> <input
									type="file" class="form-control" id="blogCover"
									name="blogCover" required>
								<div class="invalid-feedback">Please upload a cover.</div>
							</div>
							<div class="mb-3">
								<label for="blogVideoLink" class="form-label">YouTube
									Video Link</label> <input type="text" class="form-control"
									id="blogVideoLink" name="blogVideoLink"
									placeholder="Enter YouTube video link">
								<div class="valid-feedback">Optional.</div>
							</div>
							<div class="mb-3">
								<label for="blogParagraph" class="form-label">Paragraph</label>
								<textarea class="form-control" id="blogParagraph"
									name="blogParagraph" required></textarea>
								<div class="invalid-feedback">Please provide a paragraph.</div>
							</div>
							<button type="submit" class="btn btn-primary">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</main>

	<script>
		(function() {
			'use strict';

			var forms = document.querySelectorAll('.needs-validation');
			Array.prototype.slice.call(forms).forEach(function(form) {
				form.addEventListener('submit', function(event) {
					if (!form.checkValidity()) {
						event.preventDefault();
						event.stopPropagation();
					}
					form.classList.add('was-validated');
				}, false);
			});
		})();
	</script>
</body>
</html>