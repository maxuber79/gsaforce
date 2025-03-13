(function ($) {
	'use strict';

	$(function () {
		var body = $('body');
		var sidebar = $('.sidebar');
		var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');

		/**
		 * =============================
		 * 1. Template.js - Manejo de navegación y sidebar
		 * =============================
		 */
		function addActiveClass(element) {
			if (current === "") {
				if (element.attr('href').indexOf("index.html") !== -1) {
					element.parents('.nav-item').last().addClass('active');
					if (element.parents('.sub-menu').length) {
						element.closest('.collapse').addClass('show');
						element.addClass('active');
					}
				}
			} else {
				if (element.attr('href').indexOf(current) !== -1) {
					element.parents('.nav-item').last().addClass('active');
					if (element.parents('.sub-menu').length) {
						element.closest('.collapse').addClass('show');
						element.addClass('active');
					}
					if (element.parents('.submenu-item').length) {
						element.addClass('active');
					}
				}
			}
		}

		$('.nav li a', sidebar).each(function () {
			addActiveClass($(this));
		});

		sidebar.on('show.bs.collapse', '.collapse', function () {
			sidebar.find('.collapse.show').collapse('hide');
		});

		$('[data-toggle="minimize"]').on("click", function () {
			body.toggleClass(body.hasClass('sidebar-toggle-display') || body.hasClass('sidebar-absolute') ? 'sidebar-hidden' : 'sidebar-icon-only');
		});

		// Manejo de tooltips y popovers
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
		tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl);
		});

		var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
		popoverTriggerList.map(function (popoverTriggerEl) {
			return new bootstrap.Popover(popoverTriggerEl);
		});
	});

	/**
	 * =============================
	 * 2. Menu.js - Carga dinámica del menú desde JSON
	 * =============================
	 */
	document.addEventListener("DOMContentLoaded", function () {
		const menuContainer = document.getElementById("menuContainer");

		fetch('./assets/dummy/menu.json')
			.then(response => response.json())
			.then(menuData => {
				let menuHTML = "";
				menuData.forEach((item, index) => {
					if (item.subMenu) {
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
												${item.subMenu.map(sub => `<li class="nav-item"><a class="nav-link" href="${sub.link}">${sub.title}</a></li>`).join("")}
										</ul>
								</div>
						</li>`;
					} else {
						menuHTML += `<li class="nav-item"><a class="nav-link" href="${item.link}"><i class="${item.icon} menu-icon"></i><span class="menu-title">${item.title}</span></a></li>`;
					}
				});
				menuContainer.innerHTML = menuHTML;
			})
			.catch(error => console.error("Error al cargar el menú:", error));
	});

	/**
	 * =============================
	 * 3. Off-canvas.js - Manejo del sidebar offcanvas
	 * =============================
	 */
	$(function () {
		$('[data-toggle="offcanvas"]').on("click", function () {
			$('.sidebar-offcanvas').toggleClass('active');
		});
	});

	/**
	 * =============================
	 * 4. Settings.js - Manejo de configuraciones del panel de ajustes
	 * =============================
	 */
	$(function () {
		$(".nav-settings").on("click", function () {
			$("#right-sidebar").toggleClass("open");
		});
		$(".settings-close").on("click", function () {
			$("#right-sidebar,#theme-settings").removeClass("open");
		});
		$("#settings-trigger").on("click", function () {
			$("#theme-settings").toggleClass("open");
		});
	});

})(jQuery);
