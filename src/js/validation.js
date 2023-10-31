import mask from "./mask.js";
import { response } from "./requests.js";

window.addEventListener("DOMContentLoaded", function() {
    

    const inputs = document.querySelectorAll('.form__input');

    let maskvalue = false;
    
    mask.on('complete', () =>  maskvalue = true);

    form.addEventListener('submit', formSend);

    function formSend(e) {

          e.preventDefault();

          let error = formValidate(form);
        
          let formData = new FormData(form);

          if(error === 0) {
                response(inputs,formData)
                maskvalue = false
        }
    }
    function formValidate(form) {
        let error = 0;
        removeGenerateError()
        let required = document.querySelectorAll('.required');
        for(let index = 0; index<required.length; index++) {
            const input = required[index];
            formRemoveError(input);
            if(input.classList.contains('email')) {
            if(input.value !== '') {
                if(emailText(input)) {
                    formAddError(input,'Не корректный e-mail');
                    error++;
               }
            } else {
                formAddError(input,'Поле обязательно для ввода');
                error++;
            }
        }
            else if(input.classList.contains('phone')) {
                if(!maskvalue ) {
                    formAddError(input,'Поле обязательно для ввода');
                    error++
                }
                   
            } 
            else {
                if(input.value === '') {
                    formAddError(input,'Поле обязательно для ввода');
                    error++;
                }
            }
        }
        return error
    }
    function formAddError(input,text) {
         input.classList.add('js-error');
         let err = generateError(text)
         input.after(err)
    }
    function generateError(text) {
        let err = document.createElement('div');
        err.className = 'js-text-error';
        err.style.color = 'red';
        err.style.fontSize = '13px';
        err.textContent = text;
        return err
    }
    function removeGenerateError() {
        let errors = document.querySelectorAll('.js-text-error')
        for(let i = 0; i<errors.length; i++) {
            errors[i].remove();
        }
    }
    function formRemoveError(input) {
         input.classList.remove('js-error')
    }
    function emailText(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }
})