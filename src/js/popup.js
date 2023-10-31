window.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body')
    const popupButton = document.querySelector('.button-popup');
    const popup = document.querySelector('.popup');
    const popupBody = document.querySelector('.popup__body');
    const popupClose = document.querySelector('.popup__close');
    let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + "px";
    window.addEventListener('resize', () => {
        return paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + "px";
    });

    popupButton.addEventListener('click', showPopup);
    function showPopup() {
        popup.classList.add('is-open');
        body.classList.add('is-lock');
        body.style.paddingRight = paddingValue;
        popup.addEventListener('click', closePopup);
    }
    function closePopup(e) {
        if(e.target === popupBody || e.target === popupClose) {
            popup.classList.remove('is-open');
            body.classList.remove('is-lock');
            body.style.paddingRight = "";
            popup.removeEventListener('click', closePopup);
        }
    }
});