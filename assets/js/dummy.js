/* 

✅ Carga los datos desde data.json o localStorage.
✅ Permite editar y guardar productos correctamente.
✅ Corrige el error de aria-hidden al cerrar los modales.
✅ Implementa el botón "Seleccionar Todos" y la eliminación en lote.
✅ Muestra en la consola los productos eliminados.
✅ Incluye el botón para resetear localStorage y recargar los datos desde data.json.
*/
/* 
console.log("%c<<< load dummy.js >>>", "background: #cff4fc; color:#055160; padding: 2px 5px;");

const STORAGE_KEY = "productData"; // Clave para LocalStorage

// Función para abrir el modal de edición
function openEditModal(event) {
	const index = event.target.dataset.index;
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

	if (data && data[index]) {
		const item = data[index];
		document.getElementById("editProductName").value = item.product;
		document.getElementById("editProductPrice").value = item.price;
		document.getElementById("saveChanges").setAttribute("data-index", index);
	}
}

// Función para abrir el modal de eliminación
function openDeleteModal(event) {
	const index = event.target.dataset.index;
	document.getElementById("confirmDelete").setAttribute("data-index", index);
}

// Función para cargar datos (desde LocalStorage o JSON)
function loadTable() {
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

	if (!data) {
		fetch('/assets/dummy/data.json')
			.then(response => response.json())
			.then(jsonData => {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(jsonData));
				renderTable(jsonData);
			})
			.catch(error => console.error("Error al cargar los datos:", error));
	} else {
		renderTable(data);
	}
}

// Función para renderizar la tabla
function renderTable(data) {
	console.log("%c<<< load DATA dummy >>>", "background: #cff4fc; color:#055160; padding: 2px 5px;", data);
	const tableBody = document.querySelector(".table tbody");
	tableBody.innerHTML = "";

	data.forEach((item, index) => {
		const row = document.createElement("tr");
		row.setAttribute("data-index", index);

		row.innerHTML = `
						<td><input type="checkbox" class="row-checkbox" data-index="${index}"></td>
						<td>${item.product}</td>
						<td class="font-weight-bold">${item.price}</td>
						<td>${item.date}</td>
						<td class="font-weight-medium">
								<div class="badge ${item.statusClass}">${item.status}</div>
						</td>
						<td><button class="btn btn-table gsa-primary">View</button></td>
						<td><a href="#" class="ti-pencil edit-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#editModal"></a></td>
						<td><a href="#" class="ti-trash delete-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#deleteModal"></a></td>
				`;
		tableBody.appendChild(row);
	});

	// Agregar eventos a los botones
	document.querySelectorAll(".edit-btn").forEach(button => {
		button.addEventListener("click", openEditModal);
	});

	document.querySelectorAll(".delete-btn").forEach(button => {
		button.addEventListener("click", openDeleteModal);
	});

	// Evento para seleccionar todos los checkboxes
	document.getElementById("selectAll").addEventListener("change", function () {
		const isChecked = this.checked;
		document.querySelectorAll(".row-checkbox").forEach(cb => {
			cb.checked = isChecked;
		});
	});

	// Evento para deseleccionar "Seleccionar Todos" si un checkbox se desmarca manualmente
	document.querySelectorAll(".row-checkbox").forEach(cb => {
		cb.addEventListener("change", function () {
			if (!this.checked) {
				document.getElementById("selectAll").checked = false;
			}
		});
	});
}

// Función para guardar cambios en edición
document.getElementById("saveChanges").addEventListener("click", function () {
	const index = this.dataset.index;
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

	const newName = document.getElementById("editProductName").value;
	const newPrice = document.getElementById("editProductPrice").value;

	// Actualizar en el array
	data[index].product = newName;
	data[index].price = newPrice;

	// Guardar en LocalStorage
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

	// Volver a renderizar la tabla
	renderTable(data);

	// Forzar cierre del modal correctamente
	let editModal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
	if (editModal) {
		editModal.hide();
		document.activeElement.blur(); // Evita que el botón quede enfocado
	}
});

// Función para eliminar una fila individual
document.getElementById("confirmDelete").addEventListener("click", function () {
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
	const index = parseInt(this.dataset.index);

	if (index >= 0 && index < data.length) {
		console.log("%c<<< Producto Eliminado >>>", "color: red; font-weight: bold;", data[index]);
		data.splice(index, 1);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		renderTable(data);
	}

	let deleteModal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
	if (deleteModal) {
		deleteModal.hide();
		document.activeElement.blur(); // Evita que el botón quede enfocado
	}
});

// Función para eliminar múltiples filas seleccionadas
document.getElementById("deleteSelected").addEventListener("click", function () {
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
	const selectedCheckboxes = document.querySelectorAll(".row-checkbox:checked");

	if (selectedCheckboxes.length === 0) {
		alert("Selecciona al menos un producto para eliminar.");
		return;
	}

	// Obtener los productos seleccionados antes de eliminarlos
	const selectedIndices = Array.from(selectedCheckboxes).map(cb => parseInt(cb.dataset.index));
	const deletedItems = data.filter((_, index) => selectedIndices.includes(index));

	console.log("%c<<< Productos Eliminados >>>", "color: red; font-weight: bold;", deletedItems);

	// Filtrar los productos no seleccionados
	data = data.filter((_, index) => !selectedIndices.includes(index));
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	renderTable(data);
});

// Función para resetear LocalStorage y recargar datos desde JSON
document.getElementById("resetData").addEventListener("click", function () {
	console.log("%c<<< Reseteando LocalStorage >>>", "background: yellow; color: black; padding: 2px 5px;");
	localStorage.removeItem(STORAGE_KEY);
	loadTable();
});

// Cargar la tabla cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadTable); */


console.log("%c<<< load dummy.js >>>", "background: #20c997; color:#cff4fc; padding: 2px 5px;");

 
	const STORAGE_KEY = "flightData"; // Nueva clave para LocalStorage

	// Función para abrir el modal de edición
	function openEditModal(event) {
		const index = event.target.dataset.index;
		let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

		if (data && data[index]) {
			const item = data[index];
			document.getElementById("editFlightNumber").value = item.flightNumber;
			document.getElementById("editAirline").value = item.airline;
			document.getElementById("editDestination").value = item.destination;

			// Convierte la fecha almacenada al formato correcto para "datetime-local"
			let formattedDate = new Date(item.departure).toISOString().slice(0, 16);
			document.getElementById("editDeparture").value = formattedDate;

			document.getElementById("editStatus").value = item.status;
			document.getElementById("saveChanges").setAttribute("data-index", index);
		}
	}


	// Función para abrir el modal de eliminación
	function openDeleteModal(event) {
		const index = event.target.dataset.index;
		document.getElementById("confirmDelete").setAttribute("data-index", index);
	}

	// Función para cargar datos (desde LocalStorage o JSON)
	function loadTable() {

		let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
		const dataDummy = 'https://raw.githubusercontent.com/maxuber79/gsaforce/refs/heads/main/assets/dummy/data-flight.json';
		let dataLocal = 'assets/dummy/data-flight.json';

		
		if (!data) {
			fetch(dataLocal)
				.then(response => response.json())
				.then(jsonData => {
					console.log("%c<<< tabla Info flyng >>>", "color: green; font-weight: bold;", jsonData);
					localStorage.setItem(STORAGE_KEY, JSON.stringify(jsonData));
					renderTable(jsonData);
					console.log("Datos en localStorage:", JSON.parse(localStorage.getItem(STORAGE_KEY)));

				})
				.catch(error => console.error("Error al cargar los datos:", error));
		} else {
			renderTable(data);
		}
	}

// Función para renderizar la tabla
function renderTable(data) {
	console.log("Renderizando tabla con datos:", data); //Si trae los datos
	if (!Array.isArray(data)) {
		console.error("Los datos no son un array:", data);
		return;
	}
	const tableBody = document.querySelector("#sortable-table-1");
	tableBody.innerHTML = "";

	data.forEach((item, index) => {
		const row = document.createElement("tr");
		row.setAttribute("data-index", index);

		row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" data-index="${index}"></td>
            <td>${item.flightNumber}</td>
            <td>${item.airline}</td>
            <td>${item.destination}</td>
            <td>${item.departure}</td>
            <td class="font-weight-medium">
                <div class="badge ${item.statusClass}">${item.status}</div>
            </td>
            <td><a href="#" class="ti-pencil edit-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#editModal"></a></td>
            <td><a href="#" class="ti-trash delete-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#deleteModal"></a></td>
        `;
		tableBody.appendChild(row);
	});

	document.querySelectorAll(".edit-btn").forEach(button => {
		button.addEventListener("click", openEditModal);
	});

	document.querySelectorAll(".delete-btn").forEach(button => {
		button.addEventListener("click", openDeleteModal);
	});

	document.getElementById("selectAll").addEventListener("change", function () {
		const isChecked = this.checked;
		document.querySelectorAll(".row-checkbox").forEach(cb => {
			cb.checked = isChecked;
		});
	});

	document.querySelectorAll(".row-checkbox").forEach(cb => {
		cb.addEventListener("change", function () {
			if (!this.checked) {
				document.getElementById("selectAll").checked = false;
			}
		});
	});
}
// Función para agregar nuevo vuelo
document.getElementById("addFlightForm").addEventListener("submit", function (event) {
	event.preventDefault(); // Evita que el formulario recargue la página

	let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

	const newFlight = {
		flightNumber: document.getElementById("newFlightNumber").value,
		airline: document.getElementById("newAirline").value,
		destination: document.getElementById("newDestination").value,
		departure: new Date(document.getElementById("newDeparture").value).toLocaleString(),
		status: document.getElementById("newStatus").value
	};

	// Asignar la clase de estado según el vuelo
	newFlight.statusClass = newFlight.status === "On Time" ? "text-bg-success"
		: newFlight.status === "Delayed" ? "text-bg-warning"
			: "text-bg-danger";

	// Agregar el vuelo a la lista y guardar en LocalStorage
	data.push(newFlight);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

	// Mostrar el Toast de éxito
	const successToast = document.getElementById("successToast");
	successToast.className = `toast align-items-center text-bg-success border-0`;
	document.querySelector("#successToast .toast-body").textContent = `✈️ Vuelo ${newFlight.flightNumber} agregado con éxito!`;
	new bootstrap.Toast(successToast).show();

	// Mostrar en consola el vuelo agregado
	console.log("%c<<< Vuelo Agregado >>>", "color: blue; font-weight: bold;", newFlight);

	// Volver a renderizar la tabla
	renderTable(data);

	// Cerrar el modal y resetear el formulario
	let addFlightModal = bootstrap.Modal.getInstance(document.getElementById("addFlightModal"));
	if (addFlightModal) {
		addFlightModal.hide();
		document.activeElement.blur();
	}
	document.getElementById("addFlightForm").reset();
});

// Función para guardar cambios en edición
document.getElementById("saveChanges").addEventListener("click", function () {
	const index = parseInt(this.dataset.index);
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

	// Verificar si el índice es válido
	if (!data || index < 0 || index >= data.length) {
		console.error("Error: índice inválido. No se puede actualizar el vuelo.");
		return;
	}

	const newFlightNumber = document.getElementById("editFlightNumber").value;
	const newAirline = document.getElementById("editAirline").value;
	const newDestination = document.getElementById("editDestination").value;
	const newDeparture = new Date(document.getElementById("editDeparture").value).toLocaleString();
	const newStatus = document.getElementById("editStatus").value;

	// Determinar la clase de color según el estado del vuelo
	let toastClass = "text-bg-success"; // Predeterminado: verde (On Time)
	if (newStatus === "Delayed") toastClass = "text-bg-warning"; // Amarillo
	if (newStatus === "Cancelled") toastClass = "text-bg-danger"; // Rojo

	// Actualizar en el array
	data[index].flightNumber = newFlightNumber;
	data[index].airline = newAirline;
	data[index].destination = newDestination;
	data[index].departure = newDeparture;
	data[index].status = newStatus;
	data[index].statusClass = toastClass; // Se usa en la tabla

	// Guardar en LocalStorage
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

	// Actualizar color del Toast según el estado del vuelo
	const successToast = document.getElementById("successToast");
	successToast.className = `toast align-items-center border-0 ${toastClass}`;
	document.querySelector("#successToast .toast-body").textContent = `✈️ Vuelo ${newFlightNumber} guardado con éxito!`;

	// Mostrar el Toast flotante
	new bootstrap.Toast(successToast).show();

	// Mostrar en consola el vuelo actualizado
	console.log("%c<<< Vuelo Actualizado >>>", "color: green; font-weight: bold;", data[index]);

	// Volver a renderizar la tabla
	renderTable(data);

	// Cerrar el modal correctamente
	let editModal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
	if (editModal) {
		editModal.hide();
		document.activeElement.blur();
	}
});

// Función para eliminar una fila individual
document.getElementById("confirmDelete").addEventListener("click", function () {
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
	const index = parseInt(this.dataset.index);

	if (index >= 0 && index < data.length) {
		const deletedFlight = data[index]; // Guardamos el vuelo eliminado
		console.log("%c<<< Vuelo Eliminado >>>", "color: red; font-weight: bold;", deletedFlight);

		data.splice(index, 1);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		renderTable(data);

		// Mostrar el Toast de eliminación
		const deleteToast = document.getElementById("deleteToast");
		document.querySelector("#deleteToast .toast-body").textContent = `✈️ Vuelo ${deletedFlight.flightNumber} eliminado!`;
		new bootstrap.Toast(deleteToast).show();
	}

	let deleteModal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
	if (deleteModal) {
		deleteModal.hide();
		document.activeElement.blur();
	}
});
// Función para eliminar múltiples vuelos seleccionados
document.getElementById("deleteSelected").addEventListener("click", function () {
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
	const selectedCheckboxes = document.querySelectorAll(".row-checkbox:checked");

	if (selectedCheckboxes.length === 0) {
		alert("Selecciona al menos un vuelo para eliminar.");
		return;
	}

	const selectedIndices = Array.from(selectedCheckboxes).map(cb => parseInt(cb.dataset.index));
	const deletedItems = data.filter((_, index) => selectedIndices.includes(index));

	console.log("%c<<< Vuelos Eliminados >>>", "color: red; font-weight: bold;", deletedItems);

	data = data.filter((_, index) => !selectedIndices.includes(index));
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	renderTable(data);
});

// Función para resetear LocalStorage y recargar datos desde JSON
document.getElementById("resetData").addEventListener("click", function () {
	console.log("%c<<< Reseteando LocalStorage >>>", "background: yellow; color: black; padding: 2px 5px;");
	localStorage.removeItem(STORAGE_KEY);
	loadTable();
});

// Cargar la tabla cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadTable);

