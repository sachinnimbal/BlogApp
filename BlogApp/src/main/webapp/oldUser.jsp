<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Blog App | Sign Up</title>
<link rel="stylesheet" href="assets/css/blogapp.css">
<link rel="icon" href="assets/Images/logo.png" type="image/png">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<style>
html, body {
	height: 100%;
}
</style>
</head>
<body class="d-flex align-items-center py-4 bg-body-tertiary">


	<nav class="navbar navbar-light bg-light fixed-top shadow">
		<div class="container-fluid">
			<a class="navbar-brand" href="Home"> <img
				src="assets/Images/logo.png" alt="Logo" width="30" height="28"
				class="d-inline-block align-text-top"> Blog App
			</a> <a class="btn btn-sm btn-primary text-white" href="Home">Home</a>
		</div>
	</nav>

	<main class="form-signin w-100 m-auto">

		<%
		if (session.getAttribute("loginFailed") != null) {
		%>
		<div class="alert alert-warning alert-dismissible fade show"
			role="alert">
			<strong>Oops!</strong>
			<%=session.getAttribute("loginFailed")%>
			<button type="button" class="btn-close" data-bs-dismiss="alert"
				aria-label="Close"></button>
		</div>
		<%
		}
		%>


		<form action="AuthServlet" method="POST">
			<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

			<div class="form-floating">
				<input type="email" class="form-control" id="floatingInput"
					placeholder="sachinnimbal9@gmail.com" name="email"
					required="required"> <label for="floatingInput">Email
					address</label>
			</div>
			<div class="form-floating">
				<input type="password" class="form-control" id="floatingPassword"
					placeholder="Password" name="password" required="required">
				<label for="floatingPassword">Password</label>
			</div>

			<div class="d-flex text-end">
				<a class="link-underline-light w-100"
					href="UserManage?action=signup">Not Registered?</a>
			</div>

			<input class="btn btn-primary w-100 py-2" type="submit"
				value="Sign in">

		</form>
	</main>

	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>