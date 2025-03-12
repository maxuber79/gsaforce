console.log("%c<<< load dummy.js >>>", "background: #20c997; color:#cff4fc; padding: 2px 5px;");

const STORAGE_KEY = "flightData"; // Clave para LocalStorage
const FLIGHT_DATA_URL = 'https://raw.githubusercontent.com/maxuber79/gsaforce/refs/heads/main/assets/dummy/data-flight.json';

// Función para cargar datos (desde LocalStorage o JSON)
function loadTable() {
	if (!document.getElementById("sortable-table-1")) {
		console.warn("dummy.js: La tabla no existe en este HTML.");
		return;
	}

	fetch(FLIGHT_DATA_URL)
		.then(response => {
			if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
			return response.json();
		})
		.then(jsonData => {
			console.log("Datos cargados desde JSON:", jsonData);

			let storedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

			// Fusionar datos evitando duplicados
			let updatedData = mergeFlightData(storedData, jsonData);

			localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
			renderTable(updatedData);
		})
		.catch(error => console.error("Error al cargar los datos:", error));
}

// Función para fusionar datos sin duplicados (según `flightNumber`)
function mergeFlightData(existingData, newData) {
	let flightsMap = new Map();

	existingData.forEach(flight => flightsMap.set(flight.flightNumber, flight));
	newData.forEach(flight => flightsMap.set(flight.flightNumber, flight));

	return Array.from(flightsMap.values());
}

// Función para renderizar la tabla
function renderTable(data) {
	console.log("Renderizando tabla con datos:", data);

	if (!Array.isArray(data)) {
		console.error("Los datos no son un array:", data);
		return;
	}

	const tableBody = document.querySelector("#sortable-table-1 tbody");
	if (!tableBody) return;

	tableBody.innerHTML = "";

	data.forEach((item, index) => {
		const row = document.createElement("tr");
		row.setAttribute("data-index", index);

		row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" data-index="${index}"></td>
            <td>${item.flightNumber || "N/A"}</td>
            <td>${item.airline || "N/A"}</td>
            <td>${item.destination || "N/A"}</td>
            <td>${item.departure ? new Date(item.departure).toLocaleString() : "N/A"}</td>
            <td class="font-weight-medium">
                <div class="badge ${item.statusClass || ''}">${item.status || "N/A"}</div>
            </td>
            <td><a href="#" class="ti-pencil edit-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#editModal"></a></td>
            <td><a href="#" class="ti-trash delete-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#deleteModal"></a></td>
        `;
		tableBody.appendChild(row);
	});

	// Asignar eventos a los botones solo si existen en el DOM
	document.querySelectorAll(".edit-btn").forEach(button => button.addEventListener("click", openEditModal));
	document.querySelectorAll(".delete-btn").forEach(button => button.addEventListener("click", openDeleteModal));

	let selectAll = document.getElementById("selectAll");
	if (selectAll) {
		selectAll.addEventListener("change", function () {
			document.querySelectorAll(".row-checkbox").forEach(cb => cb.checked = this.checked);
		});
	}

	document.querySelectorAll(".row-checkbox").forEach(cb => {
		cb.addEventListener("change", function () {
			if (!this.checked && selectAll) selectAll.checked = false;
		});
	});
}

// Función para abrir el modal de edición
function openEditModal(event) {
	const index = event.target.dataset.index;
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

	if (data && data[index]) {
		const item = data[index];

		document.getElementById("editFlightNumber").value = item.flightNumber;
		document.getElementById("editAirline").value = item.airline;
		document.getElementById("editDestination").value = item.destination;
		document.getElementById("editDeparture").value = item.departure ? new Date(item.departure).toISOString().slice(0, 16) : "";
		document.getElementById("editStatus").value = item.status;
		document.getElementById("saveChanges").setAttribute("data-index", index);
	}
}

// Función para guardar cambios en edición
document.getElementById("saveChanges")?.addEventListener("click", function () {
	const index = parseInt(this.dataset.index);
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

	if (!data || index < 0 || index >= data.length) {
		console.error("Error: índice inválido. No se puede actualizar el vuelo.");
		return;
	}

	data[index].flightNumber = document.getElementById("editFlightNumber").value;
	data[index].airline = document.getElementById("editAirline").value;
	data[index].destination = document.getElementById("editDestination").value;
	data[index].departure = new Date(document.getElementById("editDeparture").value).toLocaleString();
	data[index].status = document.getElementById("editStatus").value;

	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	renderTable(data);

	let editModal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
	if (editModal) editModal.hide();
});

// Función para abrir el modal de eliminación
function openDeleteModal(event) {
	const index = event.target.dataset.index;
	document.getElementById("confirmDelete")?.setAttribute("data-index", index);
}

// Función para eliminar un vuelo
document.getElementById("confirmDelete")?.addEventListener("click", function () {
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
	const index = parseInt(this.dataset.index);

	if (index >= 0 && index < data.length) {
		console.log("%c<<< Vuelo Eliminado >>>", "color: red; font-weight: bold;", data[index]);
		data.splice(index, 1);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		renderTable(data);
	}

	let deleteModal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
	if (deleteModal) deleteModal.hide();
});

// Función para eliminar múltiples vuelos seleccionados
document.getElementById("deleteSelected")?.addEventListener("click", function () {
	let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
	const selectedCheckboxes = document.querySelectorAll(".row-checkbox:checked");

	if (selectedCheckboxes.length === 0) {
		alert("Selecciona al menos un vuelo para eliminar.");
		return;
	}

	const selectedIndices = Array.from(selectedCheckboxes).map(cb => parseInt(cb.dataset.index));
	console.log("%c<<< Vuelos Eliminados >>>", "color: red; font-weight: bold;", selectedIndices.map(i => data[i]));

	data = data.filter((_, index) => !selectedIndices.includes(index));
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	renderTable(data);
});

// Función para resetear LocalStorage y recargar datos
document.getElementById("resetData")?.addEventListener("click", function () {
	console.log("%c<<< Reseteando LocalStorage >>>", "background: yellow; color: black; padding: 2px 5px;");
	localStorage.removeItem(STORAGE_KEY);
	loadTable();
});

// Cargar la tabla cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadTable);
