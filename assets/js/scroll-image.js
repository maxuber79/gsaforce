/* window.addEventListener('scroll', function() {
  const scrollValue = window.scrollY;
  const scaleFactor = 1 + (scrollValue / 1000); // Puedes ajustar este valor según tus necesidades
  
  document.querySelector('.img').style.transform = `scale(${scaleFactor})`;
}); */

/* window.addEventListener('scroll', function() {
  const scrollValue = window.scrollY;
  const scaleFactor = 1 + (scrollValue / 100); // Puedes ajustar este valor según tus necesidades
  
  document.querySelector('.background-image').style.transform = `scale(${scaleFactor})`;
}); */
const inner = document.querySelector('.inner');
const section = document.getElementById("hero-zoom");

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.bottom >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function handleScroll() {
    if (isElementInViewport(section)) {
        let value = (window.scrollY - section.offsetTop) / section.offsetHeight + 1;
        inner.style.transform = `scale(${value})`;
    }
}

window.addEventListener('scroll', handleScroll);

handleScroll();






