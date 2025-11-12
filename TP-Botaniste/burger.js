isOpen = false;
const burgerButton = document.getElementById('btnBurger');
const sideNav = document.getElementById('side-nav');
const closeButton = document.getElementById('side-nav__close-button');

burgerButton.addEventListener('click', () => {
    isOpen = !isOpen;
    sideNav.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)';
    burgerButton.textContent = isOpen ? 'Burger Close' : 'Burger Open';
});

