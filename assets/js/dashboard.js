console.log("%c<<< load dashboard.js >>>", "background: #cff4fc; color:#052c65; padding: 2px 5px;");

document.addEventListener("DOMContentLoaded", function () {

	// Configuración del clima
	const apiKey = '5604bcc2-eefa-11ef-85cb-0242ac130003-5604bd30-eefa-11ef-85cb-0242ac130003';  // Reemplaza con tu clave real de StormGlass
	const lat = -33.4489; // Latitud de Santiago, Chile
	const lng = -70.6693; // Longitud de Santiago, Chile
	const params = 'airTemperature'; // Parámetro para obtener temperatura

	async function getWeather() {
		try {
			const response = await fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
				headers: { 'Authorization': apiKey }
			});

			const data = await response.json();
			console.log("%c<<< Weather Data >>>", "color: blue; font-weight: bold;", data);

			if (data.hours && data.hours.length > 0) {
				let temperature = data.hours[0].airTemperature.noaa ?? "--";

				// Redondear temperatura
				if (typeof temperature === "number") {
					temperature = Math.round(temperature);
				}

				// Actualizar elementos en la UI
				document.getElementById('temp').innerHTML = `<i class="bi bi-brightness-high"></i> ${temperature}<sup>°C</sup>`;
				document.getElementById('city').textContent = "Santiago";
				document.getElementById('area').textContent = "Chile";
			} else {
				document.getElementById('city').textContent = "No disponible";
				document.getElementById('area').textContent = "No disponible";
			}
		} catch (error) {
			console.error('Error obteniendo datos del clima:', error);
			document.getElementById('city').textContent = "Error al cargar";
		}
	}

	// Llamar a la función para obtener el clima
	getWeather();

	/*
		JAVASCRIPT PURO - Manejo de validaciones en formularios
	*/
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

	/*
		JAVASCRIPT PURO - Carga de datos en una tabla usando DataTables
	*/
	fetch('./assets/dummy/data-tabla.json')
		.then(response => response.json())
		.then(data => {
			console.log("%c<<< jsonLocal for dataTable >>>", "color: green; font-weight: bold;", data);
			$('#dataTable').DataTable({
				data: data,
				columns: [
					//{ data: null, render: function () { return '<input type="checkbox" class="row-checkbox">'; } },
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
		Carga de datos en un Select2
	*/
	fetch('./assets/dummy/data-tabla.json')
		.then(response => response.json())
		.then(data => {
			let selectData = data.map(item => ({
				id: item.Bkg,
				text: `${item.GsaName} - ${item.Bkg}`,
				bkg: item.Bkg
			}));

			$('#selectGsa, #filterSelect2').select2({
				theme: 'bootstrap-5',
				data: selectData,
				placeholder: "Selecciona item",
				dropdownAutoWidth: true,
				width: '100%',
				allowClear: true,
				templateResult: function (data) {
					if (!data.id) return data.text;
					return $(`<span>${data.text}</span>`);
				},
				templateSelection: function (data) {
					return data.text;
				}
			});
		})
		.catch(error => console.error("Error cargando JSON:", error));

});

/*
	JQUERY - Manejo de clases en la barra de navegación
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
