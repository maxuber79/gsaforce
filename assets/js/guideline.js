
console.log("%c<<< load guideline.js >>>", "background: blue; color:#ffffff; padding: 2px 5px; font-weight: bold;");
document.addEventListener('DOMContentLoaded', () => {
	//console.log("%c[DOMContentLoaded] guideline.js ejecutado ✅", "color: green; font-weight: bold;");

	window.onscroll = () => {
		myProgressBar();
	};

	const myProgressBar = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrolled = (winScroll / height) * 100;
		document.getElementById("myBar").style.width = scrolled + "%";
	};

	window.addEventListener("scroll", function () {
		let navbar = document.getElementById("nav");

		if (window.scrollY > 70) {
			console.info('%c Se agrega la clase navbar-scroll', 'color: white; background-color: blue; padding: 4px 8px; border-radius: 4px; font-weight: bold;');

			navbar.classList.add("navbar-scroll");
		} else {
			navbar.classList.remove("navbar-scroll");
			console.clear();
			console.info('%c Se quita la clase navbar-scroll', 'color: white; background-color: orange; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
		}
	});

	/*
			Carga de datos en todos los Select2 dinámicos
	*/
	const selects = document.querySelectorAll('.select2-dynamic');

	document.querySelectorAll('.select2-dynamic').forEach(select => {
		$(select).select2({
			theme: 'bootstrap-5', 
			placeholder: "Selecciona item",
			dropdownAutoWidth: true,
			width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
			allowClear: true,
			dropdownParent: $(select).parent(), // Corrige el menú dentro del input-group
			templateResult: function (data) {
				if (!data.id) return data.text;
				return $(`<span>${data.text}</span>`);
			},
			templateSelection: function (data) {
				return data.text;
			}
		});
	});

	/*
			JAVASCRIPT PURO - Manejo de validaciones en formularios
	*/
	var forms = document.getElementsByClassName('needs-validation');
	if (forms.length > 0) {
		Array.prototype.filter.call(forms, function (form) {
			form.addEventListener('submit', function (event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}
	//Copiar texto colores
	const copyButtons = document.querySelectorAll('.copy-button');
	
	// Agrega un controlador de eventos a cada botón
	copyButtons.forEach( button => {
		button.addEventListener('click', () => {
			console.log("%c<<< addEventListener >>>", "color: green; font-weight: bold;", button);
			copyContent(button); 
		});
	});

	function copyContent(button) {

		let colorHex = button.parentNode.querySelector('.sg-color-value').textContent;
		console.log('let colorHex:', colorHex)
		// Intenta copiar al portapapeles
		try {
			navigator.clipboard.writeText(colorHex);
			console.log("%cContent copied to clipboard:", "color: green; font-weight: bold;", colorHex);

			// Mostrar mensaje de éxito al usuario
			showCopySuccessMessage();
		} catch (err) {
			console.error('Failed to copy: ', err);
			// Mostrar mensaje de error al usuario
			showCopyFailureMessage();
		}
	}


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