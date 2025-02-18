document.addEventListener("DOMContentLoaded", function () {
	const menuContainer = document.getElementById("menuContainer");

	fetch('./assets/dummy/menu.json') // Cargar el JSON
		.then(response => response.json())
		.then(menuData => {
			let menuHTML = "";

			menuData.forEach((item, index) => {
				if (item.subMenu) {
					// Si tiene submenú, se genera un collapse de Bootstrap
					let collapseId = `menuCollapse${index}`;
					menuHTML += `
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="collapse" href="#${collapseId}" aria-expanded="false">
                                <i class="${item.icon} menu-icon"></i>
                                <span class="menu-title">${item.title}</span>
                                <i class="menu-arrow"></i>
                            </a>
                            <div class="collapse" id="${collapseId}">
                                <ul class="nav flex-column sub-menu">
                                    ${item.subMenu.map(sub => `
                                        <li class="nav-item"><a class="nav-link" href="${sub.link}">${sub.title}</a></li>
                                    `).join("")}
                                </ul>
                            </div>
                        </li>
                    `;
				} else {
					// Si no tiene submenú, se genera un solo enlace
					menuHTML += `
                        <li class="nav-item">
                            <a class="nav-link" href="${item.link}">
                                <i class="${item.icon} menu-icon"></i>
                                <span class="menu-title">${item.title}</span>
                            </a>
                        </li>
                    `;
				}
			});

			menuContainer.innerHTML = menuHTML;
		})
		.catch(error => console.error("Error al cargar el menú:", error));
});
