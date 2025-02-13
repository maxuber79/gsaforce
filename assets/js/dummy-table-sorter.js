console.log("%c<<< load dummy-tablesorter.js >>>", "background: #cff4fc; color:#055160; padding: 2px 5px;");
document.addEventListener("DOMContentLoaded", function () {
	const jsonURL = 'https://raw.githubusercontent.com/maxuber79/gsaforce/refs/heads/main/assets/dummy/data-flight.json';

	// Obtener referencias a los tbody
	const tbodies = document.querySelectorAll("#flight-data, #flight-data-2");

	// Cargar el JSON
	fetch(jsonURL)
		.then(response => response.json())
		.then(data => {
			// Limpiar cada tbody antes de insertar datos
			tbodies.forEach(tbody => tbody.innerHTML = "");

			// Iterar sobre cada vuelo en el JSON y agregarlo a ambas tablas
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

				// Insertar la fila en cada tbody
				tbodies.forEach(tbody => tbody.appendChild(row.cloneNode(true)));
			});

			// Inicializar Tablesort en ambas tablas
			document.querySelectorAll(".sortable-table").forEach(table => new Tablesort(table));
		})
		.catch(error => console.error("Error cargando los datos:", error));
});
