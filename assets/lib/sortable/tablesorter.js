document.addEventListener("DOMContentLoaded", function () {
	const table1 = document.getElementById("sortable-table-1");
	if (table1) {
		new Tablesort(table1);
	}

	const table2 = document.getElementById("sortable-table-2");
	if (table2) {
		new Tablesort(table2);
	}
});
