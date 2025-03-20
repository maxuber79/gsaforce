document.addEventListener('DOMContentLoaded', () => {
	/* function myFunction() {
		// Get the text field
		var copyText = document.getElementById("myInput");
	
		// Select the text field
		copyText.select();
		copyText.setSelectionRange(0, 99999); // For mobile devices
	
		// Copy the text inside the text field
		navigator.clipboard.writeText(copyText.value);
	  
		// Alert the copied text
		alert("Copied the text: " + copyText.value);
	} */

	/*let text = document.getElementById('myText').innerHTML;
	const copyContent = async () => {
	 try {
		await navigator.clipboard.writeText(text);
		console.log('Content copied to clipboard');
	 } catch (err) {
		console.error('Failed to copy: ', err);
	 }
	}*/

	//});/* document.addEventListener */

	/* const progressBar = document.querySelector('.progressBar');
	const section = document.querySelector('.wrapper-main');
	//const section = document.getElementsByTagName('body')[0];
	
	const scrollProgressBar = () => {
		let scrollDistance = -(section.getBoundingClientRect().top);
		let progressPercentage =
			(scrollDistance /
				(section.getBoundingClientRect().height -
					document.documentElement.clientHeight)) * 100;
	
		let val = Math.floor(progressPercentage);
		progressBar.style.width = val + '%';
	
		if (val < 0) {
			progressBar.style.width = '0%';
		}
	};
	
	window.addEventListener('scroll', scrollProgressBar); */



	/* window.onscroll = function() {myFunction()};
	
	function myFunction() {
		var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		var scrolled = (winScroll / height) * 100;
		document.getElementById("myBar").style.width = scrolled + "%";
	} */
	window.onscroll = () => {
		myProgressBar();
	};

	const myProgressBar = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrolled = (winScroll / height) * 100;
		document.getElementById("myBar").style.width = scrolled + "%";
	};

	window.addEventListener("scroll", function () {
		let navbar = document.getElementById("nav");

		if (window.scrollY > 70) {
			console.info('%c Se agrega la clase navbar-scroll', 'color: white; background-color: blue; padding: 4px 8px; border-radius: 4px; font-weight: bold;');

			navbar.classList.add("navbar-scroll");
		} else {
			navbar.classList.remove("navbar-scroll");
			console.clear();
			console.info('%c Se quita la clase navbar-scroll', 'color: white; background-color: orange; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
		}
	});

	fetch('https://randomuser.me/api/?results=7')
		.then(response => response.json())
		.then(data => {
			console.log(data.results[0]); // Imprime el primer usuario
		})
	.catch(error => console.error('Error:', error));


	/*
			JAVASCRIPT PURO - Manejo de validaciones en formularios
	*/
	var forms = document.getElementsByClassName('needs-validation');
	if (forms.length > 0) {
		Array.prototype.filter.call(forms, function (form) {
			form.addEventListener('submit', function (event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}

	/*
			Carga de datos en todos los Select2 dinámicos
	*/
	if (document.querySelector('.select2-dynamic')) {
		fetch('./assets/dummy/data-tabla.json')
			.then(response => response.json())
			.then(data => {
				let selectData = data.map(item => ({
					id: item.Bkg,
					text: `${item.GsaName} - ${item.Bkg}`,
					bkg: item.Bkg
				}));

				if (typeof $ !== "undefined" && $.fn.select2) {
					document.querySelectorAll('.select2-dynamic').forEach(select => {
						$(select).select2({
							theme: 'bootstrap-5',
							data: selectData,
							placeholder: "Selecciona item",
							dropdownAutoWidth: true,
							width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
							allowClear: true,
							dropdownParent: $(select).parent(),
							templateResult: function (data) {
								if (!data.id) return data.text;
								return $(`<span>${data.text}</span>`);
							},
							templateSelection: function (data) {
								return data.text;
							}
						});
					});
				}
			})
			.catch(error => console.error("Error cargando JSON:", error));
	}
 
	/**
	 * Scroll top button
	 */
	let scrollTop = document.querySelector('.scroll-top');

	function toggleScrollTop() {
		if (scrollTop) {
			window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
		}
	}
	scrollTop.addEventListener('click', (e) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	window.addEventListener('load', toggleScrollTop);
	document.addEventListener('scroll', toggleScrollTop);

	/*document.addEventListener('DOMContentLoaded', function () {
		var myButton = document.getElementById('myButton');
	  
		// Activar el tooltip al hacer clic
		myButton.addEventListener('click', function () {
			var tooltip = new bootstrap.Tooltip(myButton);
			tooltip.show();
	
			// Desaparecer el tooltip después de 2 segundos
			setTimeout(function () {
				tooltip.hide();
			}, 2000);
		});*/
	// Selecciona el elemento que quieres observar
	/* window.addEventListener('scroll', function () {
		var div = document.getElementById('hero-zoom');
		var divRect = div.getBoundingClientRect();
		var scrollTop = window.scrollY || document.documentElement.scrollTop;
		var divTop = divRect.top + (scrollTop - 1);

 
		console.table(div.getBoundingClientRect());
		console.log('%cAltura del div contenedor - divRect.height ---->', 'background: #cfe2ff; color: #084298; padding: 2px 5px;', divRect.height.toFixed() + "px");
		console.log('%cdivRect top ---->', 'background: #e2e3e5; color: #2b2f32; padding: 2px 5px;', divRect.top.toFixed() + "px");
		console.log('%cscrollTop ---->', 'background: #fff3cd; color: #664d03; padding: 2px 5px;', scrollTop.toFixed() + "px");
		console.log('%cPosición superior del div ---->', 'background: #f8d7da; color: #58151c; padding: 2px 5px;', divTop.toFixed() + "px");

		if (scrollTop >= divTop) {
			console.log(true);
			//alert('esta dentro',JSON.stringify(scrollTop.toFixed() + "px"), JSON.stringify(divTop.toFixed() + "px"))

		} else {
			console.log(false)
		}

	}); */
});