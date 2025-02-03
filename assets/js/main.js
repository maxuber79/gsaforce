/**
* Template Name: Numerus
* Template URL: https://www.numerus.cl
* Author: webmain.cl
* License:
*/
console.log('%c<<< load main js >>>', 'background: #cff4fc; color:#055160; padding: 2px 5px;');

 document.addEventListener('DOMContentLoaded', () => {
  "use strict";

	/**
   * Preloader
   */
 const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
			//console.log('%c<<< load ready >>>', 'background: #198754; color: #fff; padding: 2px 5px;');
      preloader.remove();
    });
  } 

	/**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('.header-site');
	const selectHero = document.querySelector('.hero, .hero-page');
  if (selectHeader) {
	//console.log(true, 'Si existe selectHeader');
	
  document.addEventListener('scroll', () => {
      //window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
		if (window.scrollY > 50) {  
			selectHeader.classList.add('sticky-on-top');
		} else { 
			selectHeader.classList.remove('sticky-on-top');
		}
		});
	} else {
		console.log(true, 'No existe selectHeader');
	}

	if(selectHero) {
		//console.log(true, 'Si existe selectHero');
		document.addEventListener('scroll', () => {
			if (window.scrollY > 50) {     	
    		selectHero.classList.add('sticky-hero'); 
			}
			else {
				selectHero.classList.remove('sticky-hero');
			}  
		});
	} else {
		console.log(true, 'No existe selectHero');
	}
	/*
   * @Back to top button
   **/
  const scrollTop = document.querySelector('.back-to-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

/*
 * @Typed.js
 * Setup and start animation!
 */
// Función para crear un Typed en un elemento del DOM si existe
function createTypedIfExist(selector, options) {
    const element = document.querySelector(selector);
    if (element) {
        new Typed(selector, options);
    }
}

// Configuración compartida para los Typed
const sharedOptions = {
    strings: ['eficientes', 'conectados', 'personalizados', 'ágiles'],
    typeSpeed: 60,
};

// Crear Typed para el elemento '#element'
createTypedIfExist('#element', {
    ...sharedOptions,
    loop: true,
});

// Crear Typed para el elemento '#element-footer'
createTypedIfExist('#element-footer', {
    ...sharedOptions,
    loop: true,
});

// Crear Typed para el elemento '#element-page'
createTypedIfExist('#element-page', {
    ...sharedOptions,
    stringsElement: '#typed-strings',
    typeSpeed: 50,
    loop: false,
});

// Crear Typed para el elemento '#element-page'
createTypedIfExist('#element-banner', {
   // ...sharedOptions,
    stringsElement: '#typed-strings-banner',
    typeSpeed: 50,
    loop: false,
});

// Crear Typed para el elemento '#element-category'
createTypedIfExist('#element-category', {
   //...sharedOptions,
    stringsElement: '#typed-strings-category',
    typeSpeed: 50,
    loop: false,
});


	function isMobileOrTablet() {
		//Menor o igual a 768px medidas de mobile y tablets
		return $(window).width() <= 768 && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
	//console.log('%c<< load isMobileOrTablet() >>','background: #198754; color: #fff; padding: 2px 5px;', isMobileOrTablet(), );
	const anchors = document.getElementsByTagName('html')[0];

	if(isMobileOrTablet()) {
		//console.log(true, 'Cumple las medidas de mobile y tablets', 'Esto es el anchor ------>', anchors );
		
		window.addEventListener('scroll',() => {			
			if (window.scrollY > 1) {
				console.log('Es > a 1', true);
				//anchor.setAttribute("style", "scroll-behavior:auto;")
				anchors.setAttribute('style', 'scroll-behavior:auto;');
			} else {
				console.log('Es < a 1', false);
				//anchor.setAttribute("style", "background-color: red;");
				anchors.removeAttribute('style');
			}				
		});
	} else {
		//console.log(false, 'NO esta dentro de las medidas de mobile y tablets' );
	}

	
// Function para scroll en footer
const footer = document.querySelector('.main-footer');

// Obtener el ancho del viewport
const viewportWidth = window.innerWidth;
//console.log('que muestra la siguinte variable ------>', viewportWidth + 'px')

// Verificar si el ancho del viewport es mayor que 1024px
if (viewportWidth > 1024) {
	//console.log('%cEl viewportWidth es mayor a 1024px','background: #198754; color: #fff; padding: 2px 5px;'); 
    // Opciones para el IntersectionObserver
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    };

    // Callback del IntersectionObserver
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                //console.log('%cEl footer está visible','background: #fff3cd; color: #664d03; padding: 2px 5px;'); 
                window.addEventListener('scroll', adjustBackgroundSize);
                adjustBackgroundSize();
            } else {
                //console.log('El footer no está visible');
                window.removeEventListener('scroll', adjustBackgroundSize);
                footer.style.backgroundSize = '';
            }
        });
    };

    // Función para ajustar el tamaño del fondo del footer según el desplazamiento vertical de la página
    function adjustBackgroundSize() {
        const scroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const footerRect = footer.getBoundingClientRect();
        const footerTop = footerRect.top;
        const footerHeight = footerRect.height;

        const visibleFooterHeight = Math.max(0, Math.min(footerHeight, windowHeight - footerTop));
        const percentageVisible = (visibleFooterHeight / footerHeight) * 100;

        console.log('date footer:', visibleFooterHeight.toFixed() + "px", 'otro dato:', footerHeight.toFixed() + "px",'porcentaje visible:', percentageVisible.toFixed() + "px")
        footer.style.backgroundSize = `${100 + percentageVisible}%`;
        footer.style.backgroundPosition = 87 + "%";
    }

    // Crear el IntersectionObserver con el callback y opciones
    const observer = new IntersectionObserver(callback, options);

    // Observar el footer
    observer.observe(footer);
} else {
    console.log('%cEl ancho del viewport es menor o igual a 1024px. El código no se ejecutará.','background: #dc3545; color: #f8d7da; padding: 2px 5px;');
}

/**
 * @Masonry js
 */
const grid = document.querySelector('.grid');
if(grid) {
	//console.log(true);
	var msnry = new Masonry( grid, {
		// options
		itemSelector: '.grid-item',
		columnWidth: 350
	});
// element argument can be a selector string
//   for an individual element
var msnry = new Masonry( '.grid', {
  // options
});
} else {
	//console.log(false)
}

AOS.init();

 });/* document.addEventListener */