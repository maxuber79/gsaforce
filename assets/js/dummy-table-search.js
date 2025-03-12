console.log("%c<<< 👉 load dummy-table-search.js >>>", "background: #6610f2; color:#fff; padding: 2px 5px;font-weight: bold");

document.addEventListener("DOMContentLoaded", function () {

	// 🔥 URL de los datos de vuelos
	const FLIGHT_DATA_URL = "https://raw.githubusercontent.com/maxuber79/gsaforce/refs/heads/main/assets/dummy/data-flight.json";

	let flightsData = [];
	let filteredFlights = [];

	// 🔹 Referencias a elementos del DOM
	const form = document.getElementById("form-search");
	const tableBody = document.querySelector("#table-search tbody");
	const cleanBtn = document.getElementById("clean");
	const selectAllFlightsCheckbox = document.getElementById("selectAllFlights");
	const deleteAllFlightsBtn = document.getElementById("deleteAllFlights");

	// ✅ **Cargar datos desde JSON**
	function loadFlightData() {
		if (!tableBody) {
			console.warn("dummy-table-search.js: La tabla no existe en este HTML.");
			return;
		}

		fetch(FLIGHT_DATA_URL)
			.then(response => {
				if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
				return response.json();
			})
			.then(data => {
				flightsData = Array.isArray(data) ? data : [];
				console.log("%c<<< flightsData Loaded >>>", "color: deeppink; font-weight: bold;", flightsData);
			})
			.catch(error => console.error("Error cargando los datos de vuelos:", error));
	}

	/**
	 * 🛠️ Muestra los vuelos en la tabla
	 * @param {Array} flights - Lista de vuelos a mostrar
	 */
	function displayFlights(flights) {
		if (!tableBody) return;

		tableBody.innerHTML = "";

		if (!flights || flights.length === 0) {
			tableBody.innerHTML = `<tr><td colspan="8" class="text-center">No flights found</td></tr>`;
			return;
		}

		flights.forEach(flight => {
			console.log("%c<<< flights.forEach >>>", "color: lime; font-weight: bold;", flight);
			const row = document.createElement("tr");
			row.innerHTML = `
                <td><input type="checkbox" class="flight-checkbox" data-flight-number="${flight.flightNumber}"></td>
                <td>${flight.flightNumber || "N/A"}</td>
                <td>${flight.airline || "N/A"}</td>
                <td>${flight.destination || "N/A"}</td>
                <td>${flight.departure ? new Date(flight.departure).toLocaleString() : "N/A"}</td>
                <td class="font-weight-medium">
                    <div class="badge ${flight.statusClass || ''}">${flight.status || "N/A"}</div>
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
		switch (status?.toLowerCase()) {
			case "on time": return "text-bg-success";
			case "delayed": return "text-bg-warning";
			case "cancelled": return "text-bg-danger";
			default: return "";
		}
	}

	function filterFlights() {
		const flightNumber = document.getElementById("FlightNumber")?.value.trim().toLowerCase() || "";
		const airline = document.getElementById("Airline")?.value.trim().toLowerCase() || "";
		const destination = document.getElementById("Destination")?.value.trim().toLowerCase() || "";

		filteredFlights = flightsData.filter(flight =>
			(!flightNumber || flight.flightNumber?.toLowerCase().includes(flightNumber)) &&
			(!airline || flight.airline?.toLowerCase().includes(airline)) &&
			(!destination || flight.destination?.toLowerCase().includes(destination))
		);

		localStorage.setItem("filteredFlights", JSON.stringify(filteredFlights));
		displayFlights(filteredFlights);
	}

	form?.addEventListener("submit", function (event) {
		event.preventDefault();
		console.log("%c<<< form.addEventListener >>>", "color: green; font-weight: bold;", event);
		filterFlights();
	});

	cleanBtn?.addEventListener("click", function (event) {
		event.preventDefault();
		form?.reset();
		filteredFlights = [];
		localStorage.removeItem("filteredFlights");
		tableBody.innerHTML = "";
		console.log("%c<<< Search Cleared >>>", "color: red; font-weight: bold;");
	});

	function addCheckboxFunctionality() {
		const checkboxes = document.querySelectorAll("#table-search .flight-checkbox");

		checkboxes.forEach(checkbox => {
			checkbox.addEventListener("change", function () {
				updateSelectAllCheckbox();
			});
		});

		selectAllFlightsCheckbox?.addEventListener("change", function () {
			const isChecked = this.checked;
			checkboxes.forEach(checkbox => {
				checkbox.checked = isChecked;
			});
			deleteAllFlightsBtn.disabled = !isChecked;
		});
	}

	function updateSelectAllCheckbox() {
		const checkboxes = document.querySelectorAll("#table-search .flight-checkbox");
		const checkedCheckboxes = document.querySelectorAll("#table-search .flight-checkbox:checked");

		if (selectAllFlightsCheckbox) {
			selectAllFlightsCheckbox.checked = checkboxes.length > 0 && checkboxes.length === checkedCheckboxes.length;
		}

		deleteAllFlightsBtn.disabled = checkedCheckboxes.length === 0;
	}

	function addDeleteFunctionality() {
		document.querySelectorAll(".delete-btn").forEach(button => {
			button.addEventListener("click", function () {
				const flightNumber = this.getAttribute("data-flight-number");
				document.getElementById("confirmDelete")?.setAttribute("data-flight-number", flightNumber);
			});
		});

		document.getElementById("confirmDelete")?.addEventListener("click", function () {
			const flightNumber = this.getAttribute("data-flight-number");

			filteredFlights = filteredFlights.filter(flight => flight.flightNumber !== flightNumber);
			localStorage.setItem("filteredFlights", JSON.stringify(filteredFlights));
			displayFlights(filteredFlights);
			document.getElementById("deleteModal")?.querySelector(".btn-close")?.click();
		});
	}

	function addEditFunctionality() {
		document.querySelectorAll(".edit-btn").forEach(button => {
			button.addEventListener("click", function () {
				const flightNumber = this.getAttribute("data-flight-number");
				const flight = filteredFlights.find(flight => flight.flightNumber === flightNumber);

				if (flight) {
					document.getElementById("editFlightNumber")?.setAttribute("value", flight.flightNumber);
					document.getElementById("editAirline")?.setAttribute("value", flight.airline);
					document.getElementById("editDestination")?.setAttribute("value", flight.destination);
					document.getElementById("editDeparture")?.setAttribute("value", flight.departure);
					document.getElementById("editStatus")?.setAttribute("value", flight.status);
					document.getElementById("saveChanges")?.setAttribute("data-flight-number", flightNumber);
				}
			});
		});
	}

	deleteAllFlightsBtn?.addEventListener("click", function () {
		filteredFlights = [];
		localStorage.removeItem("filteredFlights");
		displayFlights(filteredFlights);
	});

	loadFlightData();
});
