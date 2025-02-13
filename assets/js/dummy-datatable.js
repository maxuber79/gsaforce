console.log("%c<<< load dummy-datatable.js >>>", "background: #cff4fc; color:#055160; padding: 2px 5px;");
document.addEventListener("DOMContentLoaded", function () {
	const jsonURL = 'https://raw.githubusercontent.com/maxuber79/gsaforce/refs/heads/main/assets/dummy/data-flight.json';

	// Obtener referencia al cuerpo de la tabla
	const table = document.getElementById("sortable-table-2");
	const tbody = document.getElementById("flight-data-2");

	// Cargar el JSON y llenar la tabla
	fetch(jsonURL)
		.then(response => response.json())
		.then(data => {
			tbody.innerHTML = ""; // Limpiar la tabla antes de insertar datos

			// Iterar sobre cada vuelo en el JSON y agregarlo a la tabla
			data.forEach((flight, index) => {
				const row = document.createElement("tr");
				row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${flight.flightNumber}</td>
                    <td>${flight.airline}</td>
                    <td>${flight.destination}</td>
                    <td>${new Date(flight.departure).toLocaleString()}</td>
                    <td><div class="badge ${flight.statusClass}">${flight.status}</div></td>
                `;
				tbody.appendChild(row);
			});

			// Inicializar DataTables después de agregar los datos
			$(table).DataTable({
				responsive: true, // Hace que la tabla sea adaptable
				paging: true, // Habilita paginación
				searching: true, // Activa la búsqueda
				ordering: true, // Permite ordenar columnas
				lengthMenu: [10, 25, 50, 100], // Opciones de cantidad de filas por página
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
		})
		.catch(error => console.error("Error cargando los datos:", error));
});
