console.log("%c<<< load dashboard.js >>>", "background: #cff4fc; color:#052c65; padding: 2px 5px;");
/*
		JAVASCRIPT PURO - Manejo de validaciones en formularios
		Este código aplica validaciones personalizadas en los formularios con la clase 'needs-validation'
*/
(function () {
	'use strict';

	window.addEventListener('load', function () {
		var forms = document.getElementsByClassName('needs-validation');

		Array.prototype.filter.call(forms, function (form) {
			form.addEventListener('submit', function (event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);
})();

/*
		JAVASCRIPT PURO - Carga de datos en una tabla usando DataTables
		Este código obtiene datos desde un archivo JSON y los usa para llenar una tabla con funcionalidades de búsqueda, paginación y ordenamiento.
*/
document.addEventListener("DOMContentLoaded", function () {
	fetch('./assets/dummy/data-tabla.json')
		.then(response => response.json())
		.then(data => {
			console.log("%c<<< jsonLocal for dataTable >>>", "color: green; font-weight: bold;", data);
			$('#dataTable').DataTable({
				data: data,
				columns: [
					{ data: null, render: function () { return '<input type="checkbox" class="row-checkbox">'; } },
					{ data: "Bkg" },
					{ data: "GsaName" },
					{ data: "NumBkg" },
					{ data: "Kg" },
					{ data: "SalesUSD" },
					{ data: "CostUSD" },
					{ data: "MarginUSD" }
				],
				paging: true,
				searching: true,
				ordering: true
			});

			// Manejar selección de checkboxes
			document.getElementById("selectAllInformation").addEventListener("click", function () {
				document.querySelectorAll(".row-checkbox").forEach(checkbox => {
					checkbox.checked = this.checked;
				});
			});
		})
		.catch(error => console.error("Error cargando JSON:", error));

	/*
			JAVASCRIPT PURO - Carga de datos en un Select2
			Obtiene datos desde un archivo JSON y los usa para poblar un select con la librería Select2.
	*/
	fetch('./assets/dummy/data-tabla.json')
		.then(response => response.json())
		.then(data => {
			let selectData = data.map(item => ({
				id: item.Bkg,  // ID único
				text: `${item.GsaName} - ${item.Bkg}`, // Mostrar ambos valores
				bkg: item.Bkg // Guardar el Bkg como dato extra
			}));

			$('#selectGsa').select2({
				theme: 'bootstrap-5',
				data: selectData,
				placeholder: "Selecciona item",
				dropdownAutoWidth: true,
				width: '100%',
				allowClear: true,

				// Personaliza cómo se muestran las opciones en el desplegable
				templateResult: function (data) {
					if (!data.id) return data.text; // Evita errores al cargar
					return $(`<span>${data.text}</span>`);
				},

				// Personaliza cómo se muestra la opción seleccionada
				templateSelection: function (data) {
					return data.text;
				}
			});
		})
		.catch(error => console.error("Error cargando JSON:", error));
});

/*
		JQUERY - Manejo de clases en la barra de navegación
		Ajusta clases en la barra de navegación dependiendo de si tiene la clase 'fixed-top' o no.
*/
(function ($) {
	'use strict';
	$(function () {
		if ($(".navbar").hasClass("fixed-top")) {
			console.log('SI existe:', $(".navbar").hasClass("fixed-top"));
			document.querySelector('.page-body-wrapper').classList.remove('pt-0');
			document.querySelector('.navbar').classList.remove('pt-5');
		} else {
			console.log('NO existe:', $(".navbar").hasClass("fixed-top"));
			document.querySelector('.page-body-wrapper').classList.add('pt-0');
			document.querySelector('.navbar').classList.add('pt-5');
			document.querySelector('.navbar').classList.add('mt-3');
		}
	});
})(jQuery);

