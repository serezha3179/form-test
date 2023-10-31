import IMask from 'imask';
const phone = document.querySelector('.phone')
const maskOptions = {
    mask: '+{375}(00)000-00-00',
    lazy: false,
    placeholderChar: '_'
  };
const mask = IMask(phone, maskOptions);

export default mask