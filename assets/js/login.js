console.log("%c<<< load login.js >>>", "background: #cff4fc; color:#055160; padding: 2px 5px;")

document.addEventListener('DOMContentLoaded', function () {
	// Referencia al formulario
	const form = document.getElementById('loginForm');

	// Evento de submit
	form.addEventListener('submit', function (event) {
		// Validación del formulario
		if (!form.checkValidity()) {
			event.preventDefault();
			event.stopPropagation();
			form.classList.add('was-validated');
		} else {
			// Si es válido, redirige al dashboard
			event.preventDefault(); 
			window.location.href = 'dashboard.html';
		}
	});
});
