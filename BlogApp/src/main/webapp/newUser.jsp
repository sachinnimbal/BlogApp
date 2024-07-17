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

	<main class="form-signup w-100 m-auto">
		<form class="needs-validation" action="User" method="POST" novalidate>
			<h1 class="h3 mb-3 fw-normal">Please fill all details</h1>

			<div class="form-floating">
				<input type="text" class="form-control" id="floatingInput"
					placeholder="Sachin Nimbal" name="full_name" required> <label
					for="floatingInput">Full Name</label>
			</div>

			<div class="form-floating">
				<input type="email" class="form-control" id="floatingInput"
					placeholder="sachinnimbal9@gmail.com" name="emailAddress" required
					pattern="[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)">
				<label for="floatingInput">Email address</label>
				<div class="invalid-feedback">Please enter a valid email
					address.</div>
			</div>
			<div class="form-floating">
				<input type="password" class="form-control" id="newPassword"
					placeholder="Password" name="newpassword" required
					pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?])[A-Za-z\d@$!%*?]{8,}$">
				<label for="newPassword">Password</label>
				<div class="invalid-feedback">Password must be at least 8
					characters long and include at least one uppercase letter, one
					lowercase letter, one digit, and one special character (@$!%*?).</div>
			</div>
			<div class="form-floating">
				<input type="password" class="form-control" id="confirmPassword"
					placeholder="Confirm Password" required name="confirmPassword">
				<label for="confirmPassword">Confirm Password</label>
				<div class="invalid-feedback">Passwords do not match.</div>
			</div>
			<div class="form-floating">
				<select class="form-control" id="floatingRole" name="select_role"
					required>
					<option value="" disabled>Select Role</option>
					<option value="Admin">Admin</option>
					<option value="Viewer" selected>Viewer</option>
				</select> <label for="floatingRole">Role</label>
				<div class="invalid-feedback">Please select a role.</div>
			</div>

			<div class="d-flex text-end">
				<a class="link-underline-light w-100"
					href="UserManage?action=signin">Already Registered?</a>
			</div>

			<input class="btn btn-primary w-100 py-2" type="submit"
				value="Sign up">

		</form>
	</main>

	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
	<script>
		(function() {
			'use strict'

			// Fetch all the forms we want to apply custom Bootstrap validation styles to
			const forms = document.querySelectorAll('.needs-validation')

			// Loop over them and prevent submission
			Array.prototype.slice
					.call(forms)
					.forEach(
							function(form) {
								form
										.addEventListener(
												'submit',
												function(event) {
													if (!form.checkValidity()) {
														event.preventDefault()
														event.stopPropagation()
													}

													// Check password match
													const newPassword = form.newpassword.value;
													const confirmPassword = form.confirmPassword.value;

													if (newPassword !== confirmPassword) {
														event.preventDefault();
														event.stopPropagation();
														document
																.getElementById('confirmPassword').classList
																.add('is-invalid');
													} else {
														document
																.getElementById('confirmPassword').classList
																.remove('is-invalid');
														document
																.getElementById('confirmPassword').classList
																.add('is-valid');
													}

													form.classList
															.add('was-validated');
												}, false);
							});
		})();
	</script>
</body>
</html>
