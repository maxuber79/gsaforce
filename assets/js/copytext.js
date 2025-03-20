document.addEventListener('DOMContentLoaded', () => {

	//Copiar texto colores
	const copyButtons = document.querySelectorAll('.copy-button');

	// Agrega un controlador de eventos a cada botón
	copyButtons.forEach(button => {
		button.addEventListener('click', () => {
			console.log(button)
			copyContent(button);
		});
	});

	async function copyContent(button) {
		let colorHex = button.parentNode.querySelector('.sg-color-value').textContent;
		console.log('let colorHex:', colorHex)
		// Intenta copiar al portapapeles
		try {
			await navigator.clipboard.writeText(colorHex);
			console.log('Content copied to clipboard');

			// Mostrar mensaje de éxito al usuario
			showCopySuccessMessage();
		} catch (err) {
			console.error('Failed to copy: ', err);
			// Mostrar mensaje de error al usuario
			showCopyFailureMessage();
		}
	}


	//Copiar botones
	//const enlaces = document.querySelectorAll('a[href="#"]');
	const enlaces = document.querySelectorAll('.buttonClass');
	enlaces.forEach(enlace => {

		enlace.addEventListener('click', function (event) {
			console.log('click:', enlace)
			event.preventDefault(); // Evitar que el enlace se comporte normalmente
			const textToCopy = this.textContent;
			navigator.clipboard.writeText(textToCopy)
				.then(() => {
					console.log('Texto copiado al portapapeles con éxito:', textToCopy);
					showCopySuccessMessage();
				})
				.catch(err => {
					console.error('Error al copiar texto al portapapeles:', err);
					showCopyFailureMessage();
				});

		});
	});

	function showCopySuccessMessage() {
		Swal.fire({
			title: 'Content copied to clipboard',
			icon: 'success',
			timer: 2000, // Duración en milisegundos
			timerProgressBar: true,
			showConfirmButton: false
		});
	}

	function showCopyFailureMessage() {
		Swal.fire({
			title: 'Failed to copy content',
			text: 'Please try again or copy manually.',
			icon: 'error',
			showConfirmButton: true
		});
	}
});
