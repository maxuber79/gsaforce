console.log("%c<<< load dummy-datatable.js >>>", "background: #cff4fc; color:#055160; padding: 2px 5px;");

document.addEventListener("DOMContentLoaded", function () {
	const jsonURL = 'https://raw.githubusercontent.com/maxuber79/gsaforce/refs/heads/main/assets/dummy/data-flight.json';

	// Obtener referencia a la tabla y su cuerpo
	const table = document.getElementById("sortable-table-2");
	const tbody = document.getElementById("flight-data-2");

	// Verificar si la tabla y su cuerpo existen antes de continuar
	if (!table || !tbody) {
		console.warn("dummy-datatable.js: La tabla o el tbody no existen en este HTML.");
		return; // Detener ejecución si no están presentes
	}

	// Cargar el JSON y llenar la tabla
	fetch(jsonURL)
		.then(response => {
			if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
			return response.json();
		})
		.then(data => {
			tbody.innerHTML = ""; // Limpiar la tabla antes de insertar datos

			// Iterar sobre cada vuelo en el JSON y agregarlo a la tabla
			data.forEach((flight, index) => {
				const row = document.createElement("tr");
				row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${flight.flightNumber || "N/A"}</td>
                    <td>${flight.airline || "N/A"}</td>
                    <td>${flight.destination || "N/A"}</td>
                    <td>${flight.departure ? new Date(flight.departure).toLocaleString() : "N/A"}</td>
                    <td><div class="badge ${flight.statusClass || ''}">${flight.status || "N/A"}</div></td>
                `;
				tbody.appendChild(row);
			});

			// Inicializar DataTables solo si está disponible
			if (typeof $ !== "undefined" && $.fn.DataTable) {
				$(table).DataTable({
					responsive: true,
					paging: true,
					searching: true,
					ordering: true,
					lengthMenu: [10, 25, 50, 100],
					language: {
						lengthMenu: "Mostrar _MENU_ registros por página",
						zeroRecords: "No se encontraron vuelos",
						info: "Mostrando _START_ a _END_ de _TOTAL_ vuelos",
						infoEmpty: "No hay datos disponibles",
						infoFiltered: "(filtrado de _MAX_ registros en total)",
						search: "Buscar:",
						paginate: {
							first: "Primero",
							last: "Último",
							next: "Siguiente",
							previous: "Anterior"
						}
					}
				});
			} else {
				console.warn("dummy-datatable.js: DataTables no está disponible.");
			}
		})
		.catch(error => console.error("Error cargando los datos:", error));
});
