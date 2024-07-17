<%@page import="java.time.format.DateTimeFormatter"%>
<%@page import="com.sunbase.model.BlogPost"%>
<%@page import="java.util.List"%>
<%@page import="com.sunbase.model.User"%>
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
</style>
</head>
<body>

	<%
User user = (User) session.getAttribute("user");
boolean isLoggedIn = user != null;
@SuppressWarnings("unchecked")
List<BlogPost> blogPosts = (List<BlogPost>) request.getAttribute("blogPosts");
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
		<%
		if (isLoggedIn) {
		%>
		<div class="bubble">
			<div class="bubble-text">
				<h1 class="text-bold d-inline-block text-primary-emphasis">
					Welcome,
					<%=user.getName()%></h1>
			</div>
		</div>
		<%
		}
		%>
		<div class="row g-5">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header d-flex justify-content-between">
						<h5 class="card-title">My Blog Posts</h5>
						<a href="AddBlog" class="btn btn-sm btn-primary">Add Blog</a>
					</div>
					<div class="card-body table-responsive">
						<table id="blogPostsTable"
							class="table table-hover table-bordered">
							<thead>
								<tr>
									<th>#</th>
									<th>Title</th>
									<th>Category</th>
									<th>Cover Image</th>
									<th>Date</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<%
								if (blogPosts != null && !blogPosts.isEmpty()) {
									int count = 1;
									for (BlogPost post : blogPosts) {
								%>
								<tr>
									<td class="align-middle text-center"><%=count++%></td>
									<td class="align-middle"><%=post.getTitle()%></td>
									<td class="align-middle"><%=post.getCategory()%></td>
									<td class="align-middle text-center">
										<%
										if (post.getCoverImage() != null) {
										%> <img
										src="<%=request.getContextPath() + "/CoverImages/" + post.getCoverImage()%>"
										alt="Cover Image" width="100" height="60"> <%
 }
 %>
									</td>
									<td class="align-middle text-center"><%=(post.getCreatedDate() != null)
		? post.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a"))
		: "NA"%><br> <%=(post.getUpdatedDate() != null)
		? post.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss a"))
		: "NA"%></td>


									<td class="align-middle text-center">
										<!-- Edit -->
										<form action="EditBlog" method="post" style="display: inline;">
											<input type="hidden" name="postId" value="<%=post.getId()%>">
											<button type="submit" class="btn btn-sm btn-outline-primary">
												<i class="bi bi-pencil-square"></i>
											</button>
										</form> <!-- View -->
										<form action="ViewBlog" method="post" style="display: inline;">
											<input type="hidden" name="postId" value="<%=post.getId()%>">
											<button type="submit" class="btn btn-sm btn-outline-success">
												<i class="bi bi-eye"></i>
											</button>
										</form> <!-- Delete --> <a class="btn btn-sm btn-outline-danger"
										href="DeleteBlog?postId=<%=post.getId()%>"> <i
											class="bi bi-trash"></i></a>
									</td>

								</tr>
								<%
								}
								} else {
								%>
								<tr>
									<td colspan="7" class="text-center">No blog posts found.</td>
								</tr>
								<%
								}
								%>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</main>

	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script
		src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
	<script
		src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

	<script>
		$(document).ready(function() {
			$('#blogPostsTable').DataTable();
		});
	</script>
</body>
</html>
