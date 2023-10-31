/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_main_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/main.sass */ "./sass/main.sass");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.html */ "./index.html");
/* harmony import */ var _mask_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mask.js */ "./js/mask.js");
/* harmony import */ var _popup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./popup.js */ "./js/popup.js");
/* harmony import */ var _popup_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_popup_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validation.js */ "./js/validation.js");
/* harmony import */ var _requests__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./requests */ "./js/requests.js");







/***/ }),

/***/ "./js/mask.js":
/*!********************!*\
  !*** ./js/mask.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var imask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! imask */ "../node_modules/imask/esm/index.js");

const phone = document.querySelector('.phone');
const maskOptions = {
  mask: '+{375}(00)000-00-00',
  lazy: false,
  placeholderChar: '_'
};
const mask = (0,imask__WEBPACK_IMPORTED_MODULE_0__["default"])(phone, maskOptions);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mask);

/***/ }),

/***/ "./js/popup.js":
/*!*********************!*\
  !*** ./js/popup.js ***!
  \*********************/
/***/ (() => {

window.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector('body');
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
    if (e.target === popupBody || e.target === popupClose) {
      popup.classList.remove('is-open');
      body.classList.remove('is-lock');
      body.style.paddingRight = "";
      popup.removeEventListener('click', closePopup);
    }
  }
});

/***/ }),

/***/ "./js/requests.js":
/*!************************!*\
  !*** ./js/requests.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   response: () => (/* binding */ response)
/* harmony export */ });
/* harmony import */ var _mask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mask */ "./js/mask.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation */ "./js/validation.js");


async function response(inputs, formData) {
  let response;
  try {
    response = await fetch("http://localhost:9090/api/registration", {
      method: "POST",
      body: formData
    });
    if (response.ok) {
      let result = await response.json();
      inputs.forEach(item => {
        if (item.id === "formPhone") {
          _mask__WEBPACK_IMPORTED_MODULE_0__["default"].value = "";
        } else {
          item.value = '';
        }
      });
      alert(JSON.stringify(result.message));
    } else {
      let fields = [];
      inputs.forEach(item => {
        if (item.id === "formName") {
          fields.push('Поле Имя заполнено не верно');
        } else if (item.id === "formEmail") {
          fields.push('Поле "Е-mail" заполнено не верно');
        } else if (item.id === "formPhone") {
          fields.push('Поле "Телефон" заполнено не верно');
        } else if (item.id === "formText") {
          fields.push('Поле "Сообщение" заполнено не верно');
        }
      });
      alert(fields);
      inputs.forEach(item => {
        if (item.id === "formPhone") {
          _mask__WEBPACK_IMPORTED_MODULE_0__["default"].value = "";
        } else {
          item.value = '';
        }
      });
    }
  } catch (err) {
    alert('Сервер не запущен');
  }
}


/***/ }),

/***/ "./js/validation.js":
/*!**************************!*\
  !*** ./js/validation.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mask_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mask.js */ "./js/mask.js");
/* harmony import */ var _requests_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./requests.js */ "./js/requests.js");


window.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll('.form__input');
  let maskvalue = false;

  // function maskValueChange(boolean) {
  //     return maskvalue = boolean
  // }

  // mask.on('complete', () => maskValueChange(true));
  _mask_js__WEBPACK_IMPORTED_MODULE_0__["default"].on('complete', () => maskvalue = true);
  form.addEventListener('submit', formSend);
  function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);
    let formData = new FormData(form);
    if (error === 0) {
      (0,_requests_js__WEBPACK_IMPORTED_MODULE_1__.response)(inputs, formData);
      maskvalue = false;
    }
  }
  function formValidate(form) {
    let error = 0;
    removeGenerateError();
    let required = document.querySelectorAll('.required');
    for (let index = 0; index < required.length; index++) {
      const input = required[index];
      formRemoveError(input);
      if (input.classList.contains('email')) {
        if (input.value !== '') {
          if (emailText(input)) {
            formAddError(input, 'Не корректный e-mail');
            error++;
          }
        } else {
          formAddError(input, 'Поле обязательно для ввода');
          error++;
        }
      } else if (input.classList.contains('phone')) {
        if (!maskvalue) {
          formAddError(input, 'Поле обязательно для ввода');
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input, 'Поле обязательно для ввода');
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input, text) {
    input.classList.add('js-error');
    let err = generateError(text);
    input.after(err);
  }
  function generateError(text) {
    let err = document.createElement('div');
    err.className = 'js-text-error';
    err.style.color = 'red';
    err.style.fontSize = '13px';
    err.textContent = text;
    return err;
  }
  function removeGenerateError() {
    let errors = document.querySelectorAll('.js-text-error');
    for (let i = 0; i < errors.length; i++) {
      errors[i].remove();
    }
  }
  function formRemoveError(input) {
    input.classList.remove('js-error');
  }
  function emailText(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});

/***/ }),

/***/ "./index.html":
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>test</title>\r\n</head>\r\n  <body>\r\n     <div class=\"wrapper\">\r\n        <div class=\"form\">\r\n          <form action=\"#\" id=\"form\" class=\"form__body\">\r\n            <h1 class=\"form__title\">Тестовое задание</h1>\r\n                <div class=\"form__item\">\r\n                  <label for=\"formName\" class=\"form__label\">Имя:</label>\r\n                  <input type=\"text\" id=\"formName\" name=\"name\" class=\"form__input required\">\r\n                </div>\r\n                <div class=\"form__item\">  \r\n                  <label for=\"formEmail\" class=\"form__label\">Е-mail:</label>\r\n                  <input type=\"text\" id=\"formEmail\" name=\"email\" class=\"form__input required email\">\r\n                </div>  \r\n                <div class=\"form__item\">\r\n                  <label for=\"formPhone\" class=\"form__label\">Телефон:</label>\r\n                  <input type=\"phone\" id=\"formPhone\" name=\"phone\" class=\"form__input required phone\">\r\n                </div>\r\n                <div class=\"form__item\">\r\n                  <label for=\"formMessage\" class=\"form__label\">Сообщение:</label>\r\n                  <textarea name=\"message\" id=\"formMessage\" cols=\"30\" rows=\"10\" class=\"form__input required\"></textarea>\r\n                </div>\r\n              <button type=\"submit\" class=\"form__button\">Отправить</button>\r\n          </form>\r\n        </div>\r\n        <button class=\"button-popup\">Показать модальное окно</button>\r\n     </div>\r\n     <div class=\"popup\">\r\n        <div class=\"popup__body\">\r\n            <div class=\"popup__content\">\r\n                <span class=\"popup__close\">\r\n                </span>\r\n                <h1 class=\"popup__title\">Модальное окно</h1>\r\n            </div>\r\n        </div>\r\n    </div>\r\n  </body>\r\n</html>\r\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./sass/main.sass":
/*!************************!*\
  !*** ./sass/main.sass ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_imask_esm_index_js"], () => (__webpack_require__("./js/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map