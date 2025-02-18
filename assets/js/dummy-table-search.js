console.log("%c<<< 👉 load dummy-table-search.js >>>", "background: #6610f2; color:#fff; padding: 2px 5px;font-weight: bold");

document.addEventListener("DOMContentLoaded", function () {
	let flightsData = [];
	let filteredFlights = [];

	fetch('https://raw.githubusercontent.com/maxuber79/gsaforce/refs/heads/main/assets/dummy/data-flight.json')
		.then(response => response.json())
		.then(data => {
			flightsData = data;
			console.log("%c<<< flightsData >>>", "color: deeppink; font-weight: bold;", flightsData);
		})
		.catch(error => console.error("Error loading flight data:", error));

	const form = document.getElementById("form-search");
	const tableBody = document.querySelector("#table-search tbody");
	const cleanBtn = document.getElementById("clean");
	const selectAllFlightsCheckbox = document.getElementById("selectAllFlights");
	const deleteAllFlightsBtn = document.getElementById("deleteAllFlights"); // ✅ Nuevo botón

	function displayFlights(flights) {
		tableBody.innerHTML = "";

		if (flights.length === 0) {
			tableBody.innerHTML = `<tr><td colspan="8" class="text-center">No flights found</td></tr>`;
			return;
		}

		flights.forEach(flight => {
			console.log("%c<<< flights.forEach >>>", "color: lime; font-weight: bold;", flight);
			const row = document.createElement("tr");
			row.innerHTML = `
                <td><input type="checkbox" class="flight-checkbox" data-flight-number="${flight.flightNumber}"></td>
                <td>${flight.flightNumber}</td>
                <td>${flight.airline}</td>
                <td>${flight.destination}</td>
                <td>${new Date(flight.departure).toLocaleString()}</td>
                <td class="font-weight-medium">
                	<div class="badge ${flight.statusClass}">${flight.status}</div>
            		</td>
                <td><a href="#" class="ti-pencil edit-btn" data-flight-number="${flight.flightNumber}" data-bs-toggle="modal" data-bs-target="#editModal"></a></td>
                <td><a href="#" class="ti-trash delete-btn" data-flight-number="${flight.flightNumber}" data-bs-toggle="modal" data-bs-target="#deleteModal"></a></td>
            `;
			tableBody.appendChild(row);
		});

		addEditFunctionality();
		addDeleteFunctionality();
		addCheckboxFunctionality();
	}

	function getStatusClass(status) {
		switch (status.toLowerCase()) {
			case "on time": return "text-bg-success";
			case "delayed": return "text-bg-warning";
			case "cancelled": return "text-bg-danger";
			default: return "";
		}
	}

	function filterFlights() {
		const flightNumber = document.getElementById("FlightNumber").value.trim().toLowerCase();
		const airline = document.getElementById("Airline").value.trim().toLowerCase();
		const destination = document.getElementById("Destination").value.trim().toLowerCase();

		filteredFlights = flightsData.filter(flight =>
			(flightNumber === "" || flight.flightNumber.toLowerCase().includes(flightNumber)) &&
			(airline === "" || flight.airline.toLowerCase().includes(airline)) &&
			(destination === "" || flight.destination.toLowerCase().includes(destination))
		);

		localStorage.setItem("filteredFlights", JSON.stringify(filteredFlights)); // ✅ Guardamos la búsqueda en localStorage
		displayFlights(filteredFlights);
	}

	form.addEventListener("submit", function (event) {
		event.preventDefault();
		console.log("%c<<< form.addEventListener >>>", "color: green; font-weight: bold;", event);
		filterFlights();
	});

	cleanBtn.addEventListener("click", function (event) {
		event.preventDefault();
		form.reset();
		filteredFlights = [];
		localStorage.removeItem("filteredFlights"); // ✅ Limpia el localStorage
		tableBody.innerHTML = "";
	});

	tableBody.innerHTML = "";

	function addCheckboxFunctionality() {
		const checkboxes = document.querySelectorAll("#table-search .flight-checkbox");

		checkboxes.forEach(checkbox => {
			checkbox.addEventListener("change", function () {
				updateSelectAllCheckbox();
			});
		});

		if (selectAllFlightsCheckbox) {
			selectAllFlightsCheckbox.addEventListener("change", function () {
				const isChecked = selectAllFlightsCheckbox.checked;
				checkboxes.forEach(checkbox => {
					console.log("%c<<< checkbox >>>", "color: blue; font-weight: bold;", checkbox);
					checkbox.checked = isChecked;
				});

				// ✅ Si se marca "Seleccionar Todos", activamos el botón "Eliminar Todos"
				deleteAllFlightsBtn.disabled = !isChecked;
			});
		}
	}

	function updateSelectAllCheckbox() {
		const checkboxes = document.querySelectorAll("#table-search .flight-checkbox");
		const checkedCheckboxes = document.querySelectorAll("#table-search .flight-checkbox:checked");

		selectAllFlightsCheckbox.checked = checkboxes.length > 0 && checkboxes.length === checkedCheckboxes.length;

		// ✅ Activar o desactivar el botón de "Eliminar Todos"
		deleteAllFlightsBtn.disabled = checkedCheckboxes.length === 0;
	}

	function addDeleteFunctionality() {
		document.querySelectorAll(".delete-btn").forEach(button => {
			button.addEventListener("click", function () {
				const flightNumber = this.getAttribute("data-flight-number");
				document.getElementById("confirmDelete").setAttribute("data-flight-number", flightNumber);
			});
		});

		document.getElementById("confirmDelete").addEventListener("click", function () {
			const flightNumber = this.getAttribute("data-flight-number");

			filteredFlights = filteredFlights.filter(flight => flight.flightNumber !== flightNumber);

			localStorage.setItem("filteredFlights", JSON.stringify(filteredFlights)); // ✅ Actualiza localStorage
			displayFlights(filteredFlights);
			document.getElementById("deleteModal").querySelector(".btn-close").click();
		});
	}

	function addEditFunctionality() {
		document.querySelectorAll(".edit-btn").forEach(button => {
			button.addEventListener("click", function () {
				const flightNumber = this.getAttribute("data-flight-number");
				const flight = filteredFlights.find(flight => flight.flightNumber === flightNumber);

				document.getElementById("editFlightNumber").value = flight.flightNumber;
				document.getElementById("editAirline").value = flight.airline;
				document.getElementById("editDestination").value = flight.destination;
				document.getElementById("editDeparture").value = flight.departure;
				document.getElementById("editStatus").value = flight.status;

				const saveEditButton = document.getElementById("saveChanges");
				if (saveEditButton) {
					saveEditButton.setAttribute("data-flight-number", flightNumber);
				}
			});
		});

		const saveEditButton = document.getElementById("saveChanges");
		if (saveEditButton) {
			saveEditButton.addEventListener("click", function () {
				const flightNumber = this.getAttribute("data-flight-number");

				const flight = filteredFlights.find(flight => flight.flightNumber === flightNumber);
				flight.status = document.getElementById("editStatus").value;
				flight.statusClass = getStatusClass(flight.status);

				localStorage.setItem("filteredFlights", JSON.stringify(filteredFlights)); // ✅ Actualiza localStorage
				displayFlights(filteredFlights);
				document.getElementById("editModal").querySelector(".btn-close").click();
			});
		}
	}

	// ✅ **Funcionalidad del botón "Eliminar Todos"**
	deleteAllFlightsBtn.addEventListener("click", function () {
		filteredFlights = [];
		localStorage.removeItem("filteredFlights"); // ✅ Limpia el localStorage
		displayFlights(filteredFlights);
	});
});







/* document.addEventListener("DOMContentLoaded", function () {
	let flightsData = [];

	// Cargar los datos del JSON
	fetch('./assets/dummy/data-flight.json')
		.then(response => response.json())
		.then(data => {
			flightsData = data;
			console.log("%c<<< flightsData >>>", "color: deeppink; font-weight: bold;", flightsData);
		})
		.catch(error => console.error("Error loading flight data:", error));

	const form = document.getElementById("form-search");
	const tableBody = document.querySelector("#table-search tbody");
	const cleanBtn = document.getElementById("clean");
	const selectAllCheckbox = document.getElementById("selectAll");

	function displayFlights(flights) {
		tableBody.innerHTML = "";

		if (flights.length === 0) {
			tableBody.innerHTML = `<tr><td colspan="8" class="text-center">No flights found</td></tr>`;
			return;
		}

		flights.forEach((flight, index) => {
			console.log("%c<<< flights.forEach >>>", "color: lime; font-weight: bold;", flight, index);
			const row = document.createElement("tr");
			row.innerHTML = `
                <td><input type="checkbox" class="flight-checkbox" data-index="${index}"></td>
                <td>${flight.flightNumber}</td>
                <td>${flight.airline}</td>
                <td>${flight.destination}</td>
                <td>${new Date(flight.departure).toLocaleString()}</td> 
								<td class="font-weight-medium">
                	<div class="badge ${flight.statusClass}">${flight.status}</div>
            		</td>
                <td><a href="#" class="ti-pencil edit-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#editModal"></a></td>
                <td><a href="#" class="ti-trash delete-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#deleteModal"></a></td>
            `;
			tableBody.appendChild(row);
		});

		addEditFunctionality();
		addDeleteFunctionality();
		addCheckboxFunctionality();
	}

	function filterFlights() {
		const flightNumber = document.getElementById("FlightNumber").value.trim().toLowerCase();
		const airline = document.getElementById("Airline").value.trim().toLowerCase();
		const destination = document.getElementById("Destination").value.trim().toLowerCase();

		const filteredFlights = flightsData.filter(flight =>
			(flightNumber === "" || flight.flightNumber.toLowerCase().includes(flightNumber)) &&
			(airline === "" || flight.airline.toLowerCase().includes(airline)) &&
			(destination === "" || flight.destination.toLowerCase().includes(destination))
		);

		displayFlights(filteredFlights);
	}

	form.addEventListener("submit", function (event) {
		event.preventDefault();
		console.log("%c<<< form.addEventListener >>>", "color: #ffc107; font-weight: bold;", event);
		filterFlights();
	});

	cleanBtn.addEventListener("click", function (event) {
		event.preventDefault();
		form.reset();
		tableBody.innerHTML = "";
	});

	tableBody.innerHTML = "";

	// 🟢 **Función para manejar checkboxes individuales y el checkbox general**
	function addCheckboxFunctionality() {
		const checkboxes = document.querySelectorAll(".flight-checkbox");

		checkboxes.forEach(checkbox => {
			checkbox.addEventListener("change", function () {
				updateSelectAllCheckbox();
			});
		});

		// Evento para el checkbox general (Seleccionar/Deseleccionar todos)
		if (selectAllCheckbox) {
			selectAllCheckbox.addEventListener("change", function () {
				const isChecked = this.checked;
				checkboxes.forEach(checkbox => {
					checkbox.checked = isChecked;
				});
			});
		}
	}

	// Función para actualizar el checkbox general basado en la selección
	function updateSelectAllCheckbox() {
		const checkboxes = document.querySelectorAll(".flight-checkbox");
		const checkedCheckboxes = document.querySelectorAll(".flight-checkbox:checked");

		selectAllCheckbox.checked = checkboxes.length === checkedCheckboxes.length;
	}

	// ✅ **Función para EDITAR un vuelo**
	function addEditFunctionality() {
		document.querySelectorAll(".edit-btn").forEach(button => {
			button.addEventListener("click", function () {
				const index = this.getAttribute("data-index");
				const flight = flightsData[index];

				document.getElementById("editFlightNumber").value = flight.flightNumber;
				document.getElementById("editAirline").value = flight.airline;
				document.getElementById("editDestination").value = flight.destination;
				document.getElementById("editDeparture").value = flight.departure;
				document.getElementById("editStatus").value = flight.status;

				const saveEditButton = document.getElementById("saveChanges");
				if (saveEditButton) {
					saveEditButton.setAttribute("data-index", index);
				}
			});
		});

		const saveEditButton = document.getElementById("saveChanges");
		if (saveEditButton) {
			saveEditButton.addEventListener("click", function () {
				const index = this.getAttribute("data-index");

				if (index !== null) {
					flightsData[index].flightNumber = document.getElementById("editFlightNumber").value;
					flightsData[index].airline = document.getElementById("editAirline").value;
					flightsData[index].destination = document.getElementById("editDestination").value;
					flightsData[index].departure = document.getElementById("editDeparture").value;
					flightsData[index].status = document.getElementById("editStatus").value;

					displayFlights(flightsData);
					document.getElementById("editModal").querySelector(".btn-close").click();
				}
			});
		}
	}

	// ❌ **Función para ELIMINAR un vuelo**
	function addDeleteFunctionality() {
		document.querySelectorAll(".delete-btn").forEach(button => {
			button.addEventListener("click", function () {
				const index = this.getAttribute("data-index");
				const confirmDeleteButton = document.getElementById("confirmDelete");

				if (confirmDeleteButton) {
					confirmDeleteButton.setAttribute("data-index", index);
				}
			});
		});

		const confirmDeleteButton = document.getElementById("confirmDelete");
		if (confirmDeleteButton) {
			confirmDeleteButton.addEventListener("click", function () {
				const index = this.getAttribute("data-index");

				if (index !== null) {
					flightsData.splice(index, 1);
					displayFlights(flightsData);
					document.getElementById("deleteModal").querySelector(".btn-close").click();
				}
			});
		}
	}
}); */


/* document.addEventListener("DOMContentLoaded", function () {
	let flightsData = [];

	// Cargar los datos del JSON
	fetch('./assets/dummy/data-flight.json')
		.then(response => response.json())
		.then(data => {
			flightsData = data;
			console.log("%c<<< flightsData >>>", "color: deeppink; font-weight: bold;", flightsData);
		})
		.catch(error => console.error("Error loading flight data:", error));

	// Seleccionar elementos del formulario y la tabla
	const form = document.getElementById("form-search");
	const tableBody = document.querySelector("#table-search tbody");
	const cleanBtn = document.getElementById("clean");

	// Función para mostrar los vuelos en la tabla
	function displayFlights(flights) {
		tableBody.innerHTML = ""; // Limpiar tabla antes de agregar datos

		if (flights.length === 0) {
			tableBody.innerHTML = `<tr><td colspan="8" class="text-center">No flights found</td></tr>`;
			return;
		}

		flights.forEach((flight, index) => {
			console.log("%c<<< flights.forEach >>>", "color: lime; font-weight: bold;", flight, index);
			const row = document.createElement("tr");
			row.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${flight.flightNumber}</td>
                <td>${flight.airline}</td>
                <td>${flight.destination}</td>
                <td>${new Date(flight.departure).toLocaleString()}</td>
                <td><span class="${flight.statusClass}">${flight.status}</span></td>
                <td><a href="#" class="ti-pencil edit-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#editModal"></a></td>
                <td><a href="#" class="ti-trash delete-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#deleteModal"></a></td>
            `;
			tableBody.appendChild(row);
		});

		// Agregar funcionalidad a los botones de edición y eliminación
		addEditFunctionality();
		addDeleteFunctionality();
	}

	// Función para filtrar los vuelos según los campos ingresados
	function filterFlights() {
		const flightNumber = document.getElementById("FlightNumber").value.trim().toLowerCase();
		const airline = document.getElementById("Airline").value.trim().toLowerCase();
		const destination = document.getElementById("Destination").value.trim().toLowerCase();

		const filteredFlights = flightsData.filter(flight =>
			(flightNumber === "" || flight.flightNumber.toLowerCase().includes(flightNumber)) &&
			(airline === "" || flight.airline.toLowerCase().includes(airline)) &&
			(destination === "" || flight.destination.toLowerCase().includes(destination))
		);

		displayFlights(filteredFlights);
	}

	// Evento para filtrar los datos cuando se envía el formulario
	form.addEventListener("submit", function (event) {
		event.preventDefault();
		filterFlights();
	});

	// Evento para limpiar el formulario y la tabla
	cleanBtn.addEventListener("click", function (event) {
		event.preventDefault();
		form.reset();
		tableBody.innerHTML = ""; // Limpiar tabla
	});

	// **Al inicio la tabla estará vacía**
	tableBody.innerHTML = "";

	// Función para manejar la edición de un vuelo
	function addEditFunctionality() {
		document.querySelectorAll(".edit-btn").forEach(button => {
			button.addEventListener("click", function () {
				const index = this.getAttribute("data-index");
				const flight = flightsData[index];

				document.getElementById("editFlightNumber").value = flight.flightNumber;
				document.getElementById("editAirline").value = flight.airline;
				document.getElementById("editDestination").value = flight.destination;
				document.getElementById("editDeparture").value = flight.departure;
				document.getElementById("editStatus").value = flight.status;

				document.getElementById("saveEdit").setAttribute("data-index", index);
			});
		});

		document.getElementById("saveEdit").addEventListener("click", function () {
			const index = this.getAttribute("data-index");

			flightsData[index].flightNumber = document.getElementById("editFlightNumber").value;
			flightsData[index].airline = document.getElementById("editAirline").value;
			flightsData[index].destination = document.getElementById("editDestination").value;
			flightsData[index].departure = document.getElementById("editDeparture").value;
			flightsData[index].status = document.getElementById("editStatus").value;

			displayFlights(flightsData);
			document.getElementById("editModal").querySelector(".btn-close").click();
		});
	}

	// Función para manejar la eliminación de un vuelo
	function addDeleteFunctionality() {
		document.querySelectorAll(".delete-btn").forEach(button => {
			button.addEventListener("click", function () {
				const index = this.getAttribute("data-index");
				document.getElementById("confirmDelete").setAttribute("data-index", index);
			});
		});

		document.getElementById("confirmDelete").addEventListener("click", function () {
			const index = this.getAttribute("data-index");
			flightsData.splice(index, 1);
			displayFlights(flightsData);
			document.getElementById("deleteModal").querySelector(".btn-close").click();
		});
	}
}); */

/* document.addEventListener("DOMContentLoaded", function () {
	let flightsData = [];

	// Cargar los datos del JSON
	fetch('/assets/dummy/data-flight.json')
		.then(response => response.json())
		.then(data => {
			flightsData = data;
		})
		.catch(error => console.error("Error loading flight data:", error));

	// Seleccionar elementos del formulario y la tabla
	const form = document.getElementById("form-search");
	const tableBody = document.querySelector("#table-search tbody");
	const cleanBtn = document.getElementById("clean");

	// Función para mostrar los vuelos en la tabla
	function displayFlights(flights) {
		tableBody.innerHTML = ""; // Limpiar tabla antes de agregar datos

		if (flights.length === 0) {
			tableBody.innerHTML = `<tr><td colspan="8" class="text-center">No flights found</td></tr>`;
			return;
		}

		flights.forEach(flight => {
			const row = document.createElement("tr");
			row.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${flight.flightNumber}</td>
                <td>${flight.airline}</td>
                <td>${flight.destination}</td>
                <td>${new Date(flight.departure).toLocaleString()}</td>
                <td><div class="badge ${flight.statusClass}">${flight.status}</div></td>
               	<td><a href="#" class="ti-pencil edit-btn" data-index="" data-bs-toggle="modal" data-bs-target="#editModal"></a></td>
            		<td><a href="#" class="ti-trash delete-btn" data-index="" data-bs-toggle="modal" data-bs-target="#deleteModal"></a></td>
            `;
			tableBody.appendChild(row);
		});
	}

	// Función para filtrar los vuelos según los campos ingresados
	function filterFlights() {
		const flightNumber = document.getElementById("FlightNumber").value.trim().toLowerCase();
		const airline = document.getElementById("Airline").value.trim().toLowerCase();
		const destination = document.getElementById("Destination").value.trim().toLowerCase();

		const filteredFlights = flightsData.filter(flight =>
			(flightNumber === "" || flight.flightNumber.toLowerCase().includes(flightNumber)) &&
			(airline === "" || flight.airline.toLowerCase().includes(airline)) &&
			(destination === "" || flight.destination.toLowerCase().includes(destination))
		);

		displayFlights(filteredFlights);
	}

	// Evento para filtrar los datos cuando se envía el formulario
	form.addEventListener("submit", function (event) {
		event.preventDefault();
		filterFlights();
	});

	// Evento para limpiar el formulario y la tabla
	cleanBtn.addEventListener("click", function (event) {
		event.preventDefault();
		form.reset();
		tableBody.innerHTML = ""; // Limpiar tabla
	});

	// **Al inicio la tabla estará vacía**
	tableBody.innerHTML = "";
}); */

/* document.addEventListener("DOMContentLoaded", function () {
	let flightsData = [];

	// Cargar los datos del JSON
	fetch("https://raw.githubusercontent.com/maxuber79/gsaforce/refs/heads/main/assets/dummy/data-flight.json")
		.then(response => response.json())
		.then(data => {
			flightsData = data;
			displayFlights(flightsData);
		})
		.catch(error => console.error("Error loading flight data:", error));

	// Seleccionar elementos del formulario y la tabla
	const form = document.getElementById("form-search");
	const tableBody = document.querySelector("#table-search tbody");
	const cleanBtn = document.getElementById("clean");

	// Función para mostrar los vuelos en la tabla
	function displayFlights(flights) {
		tableBody.innerHTML = ""; // Limpiar tabla antes de agregar datos

		if (flights.length === 0) {
			tableBody.innerHTML = `<tr><td colspan="8" class="text-center">No flights found</td></tr>`;
			return;
		}

		flights.forEach(flight => {
			const row = document.createElement("tr");
			row.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${flight.flightNumber}</td>
                <td>${flight.airline}</td>
                <td>${flight.destination}</td>
                <td>${new Date(flight.departure).toLocaleString()}</td>
                <td><span class="${flight.statusClass}">${flight.status}</span></td>
                <td><button class="btn btn-warning btn-sm">Edit</button></td>
                <td><button class="btn btn-danger btn-sm">Delete</button></td>
            `;
			tableBody.appendChild(row);
		});
	}

	// Función para filtrar los vuelos según los campos ingresados
	function filterFlights() {
		const flightNumber = document.getElementById("FlightNumber").value.trim().toLowerCase();
		const airline = document.getElementById("Airline").value.trim().toLowerCase();
		const destination = document.getElementById("Destination").value.trim().toLowerCase();

		const filteredFlights = flightsData.filter(flight =>
			(flightNumber === "" || flight.flightNumber.toLowerCase().includes(flightNumber)) &&
			(airline === "" || flight.airline.toLowerCase().includes(airline)) &&
			(destination === "" || flight.destination.toLowerCase().includes(destination))
		);

		displayFlights(filteredFlights);
	}

	// Evento para filtrar los datos cuando se envía el formulario
	form.addEventListener("submit", function (event) {
		event.preventDefault();
		filterFlights();
	});

	// Evento para limpiar el formulario y restaurar la tabla original
	cleanBtn.addEventListener("click", function (event) {
		event.preventDefault();
		form.reset();
		displayFlights(flightsData);
	});
}); */

