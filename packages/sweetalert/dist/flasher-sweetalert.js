(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@flasher/flasher')) :
    typeof define === 'function' && define.amd ? define(['@flasher/flasher'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.flasher = global.flasher || {}, global.flasher.sweetalert = factory(global.flasher)));
})(this, (function (flasher) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var flasher__default = /*#__PURE__*/_interopDefaultLegacy(flasher);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    const consolePrefix = 'SweetAlert2:';

    /**
     * Filter the unique values into a new array
     * @param arr
     */
    const uniqueArray = (arr) => {
      const result = [];
      for (let i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) === -1) {
          result.push(arr[i]);
        }
      }
      return result
    };

    /**
     * Capitalize the first letter of a string
     * @param {string} str
     * @returns {string}
     */
    const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    /**
     * @param {NodeList | HTMLCollection | NamedNodeMap | DOMTokenList} nodeList
     * @returns {array}
     */
    const toArray = (nodeList) => Array.prototype.slice.call(nodeList);

    /**
     * Standardize console warnings
     * @param {string | array} message
     */
    const warn = (message) => {
      console.warn(`${consolePrefix} ${typeof message === 'object' ? message.join(' ') : message}`);
    };

    /**
     * Standardize console errors
     * @param {string} message
     */
    const error = (message) => {
      console.error(`${consolePrefix} ${message}`);
    };

    /**
     * Private global state for `warnOnce`
     * @type {Array}
     * @private
     */
    const previousWarnOnceMessages = [];

    /**
     * Show a console warning, but only if it hasn't already been shown
     * @param {string} message
     */
    const warnOnce = (message) => {
      if (!previousWarnOnceMessages.includes(message)) {
        previousWarnOnceMessages.push(message);
        warn(message);
      }
    };

    /**
     * Show a one-time console warning about deprecated params/methods
     */
    const warnAboutDeprecation = (deprecatedParam, useInstead) => {
      warnOnce(
        `"${deprecatedParam}" is deprecated and will be removed in the next major release. Please use "${useInstead}" instead.`
      );
    };

    /**
     * If `arg` is a function, call it (with no arguments or context) and return the result.
     * Otherwise, just pass the value through
     * @param arg
     */
    const callIfFunction = (arg) => (typeof arg === 'function' ? arg() : arg);

    const hasToPromiseFn = (arg) => arg && typeof arg.toPromise === 'function';

    const asPromise = (arg) => (hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg));

    const isPromise = (arg) => arg && Promise.resolve(arg) === arg;

    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const defaultParams = {
      title: '',
      titleText: '',
      text: '',
      html: '',
      footer: '',
      icon: undefined,
      iconColor: undefined,
      iconHtml: undefined,
      template: undefined,
      toast: false,
      showClass: {
        popup: 'swal2-show',
        backdrop: 'swal2-backdrop-show',
        icon: 'swal2-icon-show',
      },
      hideClass: {
        popup: 'swal2-hide',
        backdrop: 'swal2-backdrop-hide',
        icon: 'swal2-icon-hide',
      },
      customClass: {},
      target: 'body',
      color: undefined,
      backdrop: true,
      heightAuto: true,
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      stopKeydownPropagation: true,
      keydownListenerCapture: false,
      showConfirmButton: true,
      showDenyButton: false,
      showCancelButton: false,
      preConfirm: undefined,
      preDeny: undefined,
      confirmButtonText: 'OK',
      confirmButtonAriaLabel: '',
      confirmButtonColor: undefined,
      denyButtonText: 'No',
      denyButtonAriaLabel: '',
      denyButtonColor: undefined,
      cancelButtonText: 'Cancel',
      cancelButtonAriaLabel: '',
      cancelButtonColor: undefined,
      buttonsStyling: true,
      reverseButtons: false,
      focusConfirm: true,
      focusDeny: false,
      focusCancel: false,
      returnFocus: true,
      showCloseButton: false,
      closeButtonHtml: '&times;',
      closeButtonAriaLabel: 'Close this dialog',
      loaderHtml: '',
      showLoaderOnConfirm: false,
      showLoaderOnDeny: false,
      imageUrl: undefined,
      imageWidth: undefined,
      imageHeight: undefined,
      imageAlt: '',
      timer: undefined,
      timerProgressBar: false,
      width: undefined,
      padding: undefined,
      background: undefined,
      input: undefined,
      inputPlaceholder: '',
      inputLabel: '',
      inputValue: '',
      inputOptions: {},
      inputAutoTrim: true,
      inputAttributes: {},
      inputValidator: undefined,
      returnInputValueOnDeny: false,
      validationMessage: undefined,
      grow: false,
      position: 'center',
      progressSteps: [],
      currentProgressStep: undefined,
      progressStepsDistance: undefined,
      willOpen: undefined,
      didOpen: undefined,
      didRender: undefined,
      willClose: undefined,
      didClose: undefined,
      didDestroy: undefined,
      scrollbarPadding: true,
    };

    const updatableParams = [
      'allowEscapeKey',
      'allowOutsideClick',
      'background',
      'buttonsStyling',
      'cancelButtonAriaLabel',
      'cancelButtonColor',
      'cancelButtonText',
      'closeButtonAriaLabel',
      'closeButtonHtml',
      'color',
      'confirmButtonAriaLabel',
      'confirmButtonColor',
      'confirmButtonText',
      'currentProgressStep',
      'customClass',
      'denyButtonAriaLabel',
      'denyButtonColor',
      'denyButtonText',
      'didClose',
      'didDestroy',
      'footer',
      'hideClass',
      'html',
      'icon',
      'iconColor',
      'iconHtml',
      'imageAlt',
      'imageHeight',
      'imageUrl',
      'imageWidth',
      'preConfirm',
      'preDeny',
      'progressSteps',
      'returnFocus',
      'reverseButtons',
      'showCancelButton',
      'showCloseButton',
      'showConfirmButton',
      'showDenyButton',
      'text',
      'title',
      'titleText',
      'willClose',
    ];

    const deprecatedParams = {};

    const toastIncompatibleParams = [
      'allowOutsideClick',
      'allowEnterKey',
      'backdrop',
      'focusConfirm',
      'focusDeny',
      'focusCancel',
      'returnFocus',
      'heightAuto',
      'keydownListenerCapture',
    ];

    /**
     * Is valid parameter
     * @param {string} paramName
     */
    const isValidParameter = (paramName) => {
      return Object.prototype.hasOwnProperty.call(defaultParams, paramName)
    };

    /**
     * Is valid parameter for Swal.update() method
     * @param {string} paramName
     */
    const isUpdatableParameter = (paramName) => {
      return updatableParams.indexOf(paramName) !== -1
    };

    /**
     * Is deprecated parameter
     * @param {string} paramName
     */
    const isDeprecatedParameter = (paramName) => {
      return deprecatedParams[paramName]
    };

    const checkIfParamIsValid = (param) => {
      if (!isValidParameter(param)) {
        warn(`Unknown parameter "${param}"`);
      }
    };

    const checkIfToastParamIsValid = (param) => {
      if (toastIncompatibleParams.includes(param)) {
        warn(`The parameter "${param}" is incompatible with toasts`);
      }
    };

    const checkIfParamIsDeprecated = (param) => {
      if (isDeprecatedParameter(param)) {
        warnAboutDeprecation(param, isDeprecatedParameter(param));
      }
    };

    /**
     * Show relevant warnings for given params
     *
     * @param params
     */
    const showWarningsForParams = (params) => {
      if (!params.backdrop && params.allowOutsideClick) {
        warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
      }

      for (const param in params) {
        checkIfParamIsValid(param);

        if (params.toast) {
          checkIfToastParamIsValid(param);
        }

        checkIfParamIsDeprecated(param);
      }
    };

    const swalPrefix = 'swal2-';

    /**
     * @param {string[]} items
     * @returns {object}
     */
    const prefix = (items) => {
      const result = {};
      for (const i in items) {
        result[items[i]] = swalPrefix + items[i];
      }
      return result
    };

    const swalClasses = prefix([
      'container',
      'shown',
      'height-auto',
      'iosfix',
      'popup',
      'modal',
      'no-backdrop',
      'no-transition',
      'toast',
      'toast-shown',
      'show',
      'hide',
      'close',
      'title',
      'html-container',
      'actions',
      'confirm',
      'deny',
      'cancel',
      'default-outline',
      'footer',
      'icon',
      'icon-content',
      'image',
      'input',
      'file',
      'range',
      'select',
      'radio',
      'checkbox',
      'label',
      'textarea',
      'inputerror',
      'input-label',
      'validation-message',
      'progress-steps',
      'active-progress-step',
      'progress-step',
      'progress-step-line',
      'loader',
      'loading',
      'styled',
      'top',
      'top-start',
      'top-end',
      'top-left',
      'top-right',
      'center',
      'center-start',
      'center-end',
      'center-left',
      'center-right',
      'bottom',
      'bottom-start',
      'bottom-end',
      'bottom-left',
      'bottom-right',
      'grow-row',
      'grow-column',
      'grow-fullscreen',
      'rtl',
      'timer-progress-bar',
      'timer-progress-bar-container',
      'scrollbar-measure',
      'icon-success',
      'icon-warning',
      'icon-info',
      'icon-question',
      'icon-error',
      'no-war',
    ]);

    const iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

    /**
     * Gets the popup container which contains the backdrop and the popup itself.
     *
     * @returns {HTMLElement | null}
     */
    const getContainer = () => document.body.querySelector(`.${swalClasses.container}`);

    /**
     * @param {string} selectorString
     * @returns {HTMLElement | null}
     */
    const elementBySelector = (selectorString) => {
      const container = getContainer();
      return container ? container.querySelector(selectorString) : null
    };

    /**
     * @param {string} className
     * @returns {HTMLElement | null}
     */
    const elementByClass = (className) => {
      return elementBySelector(`.${className}`)
    };

    /**
     * @returns {HTMLElement | null}
     */
    const getPopup = () => elementByClass(swalClasses.popup);

    /**
     * @returns {HTMLElement | null}
     */
    const getIcon = () => elementByClass(swalClasses.icon);

    /**
     * @returns {HTMLElement | null}
     */
    const getTitle = () => elementByClass(swalClasses.title);

    /**
     * @returns {HTMLElement | null}
     */
    const getHtmlContainer = () => elementByClass(swalClasses['html-container']);

    /**
     * @returns {HTMLElement | null}
     */
    const getImage = () => elementByClass(swalClasses.image);

    /**
     * @returns {HTMLElement | null}
     */
    const getProgressSteps$1 = () => elementByClass(swalClasses['progress-steps']);

    /**
     * @returns {HTMLElement | null}
     */
    const getValidationMessage = () => elementByClass(swalClasses['validation-message']);

    /**
     * @returns {HTMLElement | null}
     */
    const getConfirmButton = () => elementBySelector(`.${swalClasses.actions} .${swalClasses.confirm}`);

    /**
     * @returns {HTMLElement | null}
     */
    const getDenyButton = () => elementBySelector(`.${swalClasses.actions} .${swalClasses.deny}`);

    /**
     * @returns {HTMLElement | null}
     */
    const getInputLabel = () => elementByClass(swalClasses['input-label']);

    /**
     * @returns {HTMLElement | null}
     */
    const getLoader = () => elementBySelector(`.${swalClasses.loader}`);

    /**
     * @returns {HTMLElement | null}
     */
    const getCancelButton = () => elementBySelector(`.${swalClasses.actions} .${swalClasses.cancel}`);

    /**
     * @returns {HTMLElement | null}
     */
    const getActions = () => elementByClass(swalClasses.actions);

    /**
     * @returns {HTMLElement | null}
     */
    const getFooter = () => elementByClass(swalClasses.footer);

    /**
     * @returns {HTMLElement | null}
     */
    const getTimerProgressBar = () => elementByClass(swalClasses['timer-progress-bar']);

    /**
     * @returns {HTMLElement | null}
     */
    const getCloseButton = () => elementByClass(swalClasses.close);

    // https://github.com/jkup/focusable/blob/master/index.js
    const focusable = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`;
    /**
     * @returns {HTMLElement[]}
     */
    const getFocusableElements = () => {
      const focusableElementsWithTabindex = toArray(
        getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')
      )
        // sort according to tabindex
        .sort((a, b) => {
          const tabindexA = parseInt(a.getAttribute('tabindex'));
          const tabindexB = parseInt(b.getAttribute('tabindex'));
          if (tabindexA > tabindexB) {
            return 1
          } else if (tabindexA < tabindexB) {
            return -1
          }
          return 0
        });

      const otherFocusableElements = toArray(getPopup().querySelectorAll(focusable)).filter(
        (el) => el.getAttribute('tabindex') !== '-1'
      );

      return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter((el) => isVisible$1(el))
    };

    /**
     * @returns {boolean}
     */
    const isModal = () => {
      return (
        hasClass(document.body, swalClasses.shown) &&
        !hasClass(document.body, swalClasses['toast-shown']) &&
        !hasClass(document.body, swalClasses['no-backdrop'])
      )
    };

    /**
     * @returns {boolean}
     */
    const isToast = () => {
      return getPopup() && hasClass(getPopup(), swalClasses.toast)
    };

    /**
     * @returns {boolean}
     */
    const isLoading = () => {
      return getPopup().hasAttribute('data-loading')
    };

    // Remember state in cases where opening and handling a modal will fiddle with it.
    const states = {
      previousBodyPadding: null,
    };

    /**
     * Securely set innerHTML of an element
     * https://github.com/sweetalert2/sweetalert2/issues/1926
     *
     * @param {HTMLElement} elem
     * @param {string} html
     */
    const setInnerHtml = (elem, html) => {
      elem.textContent = '';
      if (html) {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(html, `text/html`);
        toArray(parsed.querySelector('head').childNodes).forEach((child) => {
          elem.appendChild(child);
        });
        toArray(parsed.querySelector('body').childNodes).forEach((child) => {
          elem.appendChild(child);
        });
      }
    };

    /**
     * @param {HTMLElement} elem
     * @param {string} className
     * @returns {boolean}
     */
    const hasClass = (elem, className) => {
      if (!className) {
        return false
      }
      const classList = className.split(/\s+/);
      for (let i = 0; i < classList.length; i++) {
        if (!elem.classList.contains(classList[i])) {
          return false
        }
      }
      return true
    };

    /**
     * @param {HTMLElement} elem
     * @param {SweetAlertOptions} params
     */
    const removeCustomClasses = (elem, params) => {
      toArray(elem.classList).forEach((className) => {
        if (
          !Object.values(swalClasses).includes(className) &&
          !Object.values(iconTypes).includes(className) &&
          !Object.values(params.showClass).includes(className)
        ) {
          elem.classList.remove(className);
        }
      });
    };

    /**
     * @param {HTMLElement} elem
     * @param {SweetAlertOptions} params
     * @param {string} className
     */
    const applyCustomClass = (elem, params, className) => {
      removeCustomClasses(elem, params);

      if (params.customClass && params.customClass[className]) {
        if (typeof params.customClass[className] !== 'string' && !params.customClass[className].forEach) {
          return warn(
            `Invalid type of customClass.${className}! Expected string or iterable object, got "${typeof params.customClass[
          className
        ]}"`
          )
        }

        addClass(elem, params.customClass[className]);
      }
    };

    /**
     * @param {HTMLElement} popup
     * @param {import('./renderers/renderInput').InputClass} inputClass
     * @returns {HTMLInputElement | null}
     */
    const getInput$1 = (popup, inputClass) => {
      if (!inputClass) {
        return null
      }
      switch (inputClass) {
        case 'select':
        case 'textarea':
        case 'file':
          return popup.querySelector(`.${swalClasses.popup} > .${swalClasses[inputClass]}`)
        case 'checkbox':
          return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.checkbox} input`)
        case 'radio':
          return (
            popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:checked`) ||
            popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:first-child`)
          )
        case 'range':
          return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.range} input`)
        default:
          return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.input}`)
      }
    };

    /**
     * @param {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} input
     */
    const focusInput = (input) => {
      input.focus();

      // place cursor at end of text in text input
      if (input.type !== 'file') {
        // http://stackoverflow.com/a/2345915
        const val = input.value;
        input.value = '';
        input.value = val;
      }
    };

    /**
     * @param {HTMLElement | HTMLElement[] | null} target
     * @param {string | string[] | readonly string[]} classList
     * @param {boolean} condition
     */
    const toggleClass = (target, classList, condition) => {
      if (!target || !classList) {
        return
      }
      if (typeof classList === 'string') {
        classList = classList.split(/\s+/).filter(Boolean);
      }
      classList.forEach((className) => {
        if (Array.isArray(target)) {
          target.forEach((elem) => {
            condition ? elem.classList.add(className) : elem.classList.remove(className);
          });
        } else {
          condition ? target.classList.add(className) : target.classList.remove(className);
        }
      });
    };

    /**
     * @param {HTMLElement | HTMLElement[] | null} target
     * @param {string | string[] | readonly string[]} classList
     */
    const addClass = (target, classList) => {
      toggleClass(target, classList, true);
    };

    /**
     * @param {HTMLElement | HTMLElement[] | null} target
     * @param {string | string[] | readonly string[]} classList
     */
    const removeClass = (target, classList) => {
      toggleClass(target, classList, false);
    };

    /**
     * Get direct child of an element by class name
     *
     * @param {HTMLElement} elem
     * @param {string} className
     * @returns {HTMLElement | null}
     */
    const getDirectChildByClass = (elem, className) => {
      const childNodes = toArray(elem.childNodes);
      for (let i = 0; i < childNodes.length; i++) {
        if (hasClass(childNodes[i], className)) {
          return childNodes[i]
        }
      }
    };

    /**
     * @param {HTMLElement} elem
     * @param {string} property
     * @param {*} value
     */
    const applyNumericalStyle = (elem, property, value) => {
      if (value === `${parseInt(value)}`) {
        value = parseInt(value);
      }
      if (value || parseInt(value) === 0) {
        elem.style[property] = typeof value === 'number' ? `${value}px` : value;
      } else {
        elem.style.removeProperty(property);
      }
    };

    /**
     * @param {HTMLElement} elem
     * @param {string} display
     */
    const show = (elem, display = 'flex') => {
      elem.style.display = display;
    };

    /**
     * @param {HTMLElement} elem
     */
    const hide = (elem) => {
      elem.style.display = 'none';
    };

    /**
     * @param {HTMLElement} parent
     * @param {string} selector
     * @param {string} property
     * @param {string} value
     */
    const setStyle = (parent, selector, property, value) => {
      /** @type {HTMLElement} */
      const el = parent.querySelector(selector);
      if (el) {
        el.style[property] = value;
      }
    };

    /**
     * @param {HTMLElement} elem
     * @param {any} condition
     * @param {string} display
     */
    const toggle = (elem, condition, display = 'flex') => {
      condition ? show(elem, display) : hide(elem);
    };

    /**
     * borrowed from jquery $(elem).is(':visible') implementation
     *
     * @param {HTMLElement} elem
     * @returns {boolean}
     */
    const isVisible$1 = (elem) => !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));

    /**
     * @returns {boolean}
     */
    const allButtonsAreHidden = () =>
      !isVisible$1(getConfirmButton()) && !isVisible$1(getDenyButton()) && !isVisible$1(getCancelButton());

    /**
     * @returns {boolean}
     */
    const isScrollable = (elem) => !!(elem.scrollHeight > elem.clientHeight);

    /**
     * borrowed from https://stackoverflow.com/a/46352119
     *
     * @param {HTMLElement} elem
     * @returns {boolean}
     */
    const hasCssAnimation = (elem) => {
      const style = window.getComputedStyle(elem);

      const animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
      const transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');

      return animDuration > 0 || transDuration > 0
    };

    /**
     * @param {number} timer
     * @param {boolean} reset
     */
    const animateTimerProgressBar = (timer, reset = false) => {
      const timerProgressBar = getTimerProgressBar();
      if (isVisible$1(timerProgressBar)) {
        if (reset) {
          timerProgressBar.style.transition = 'none';
          timerProgressBar.style.width = '100%';
        }
        setTimeout(() => {
          timerProgressBar.style.transition = `width ${timer / 1000}s linear`;
          timerProgressBar.style.width = '0%';
        }, 10);
      }
    };

    const stopTimerProgressBar = () => {
      const timerProgressBar = getTimerProgressBar();
      const timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
      timerProgressBar.style.removeProperty('transition');
      timerProgressBar.style.width = '100%';
      const timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
      const timerProgressBarPercent = (timerProgressBarWidth / timerProgressBarFullWidth) * 100;
      timerProgressBar.style.removeProperty('transition');
      timerProgressBar.style.width = `${timerProgressBarPercent}%`;
    };

    /**
     * Detect Node env
     *
     * @returns {boolean}
     */
    const isNodeEnv = () => typeof window === 'undefined' || typeof document === 'undefined';

    const RESTORE_FOCUS_TIMEOUT = 100;

    /** @type {GlobalState} */
    const globalState = {};

    const focusPreviousActiveElement = () => {
      if (globalState.previousActiveElement instanceof HTMLElement) {
        globalState.previousActiveElement.focus();
        globalState.previousActiveElement = null;
      } else if (document.body) {
        document.body.focus();
      }
    };

    /**
     * Restore previous active (focused) element
     *
     * @param {boolean} returnFocus
     * @returns {Promise}
     */
    const restoreActiveElement = (returnFocus) => {
      return new Promise((resolve) => {
        if (!returnFocus) {
          return resolve()
        }
        const x = window.scrollX;
        const y = window.scrollY;

        globalState.restoreFocusTimeout = setTimeout(() => {
          focusPreviousActiveElement();
          resolve();
        }, RESTORE_FOCUS_TIMEOUT); // issues/900

        window.scrollTo(x, y);
      })
    };

    const sweetHTML = `
 <div aria-labelledby="${swalClasses.title}" aria-describedby="${swalClasses['html-container']}" class="${swalClasses.popup}" tabindex="-1">
   <button type="button" class="${swalClasses.close}"></button>
   <ul class="${swalClasses['progress-steps']}"></ul>
   <div class="${swalClasses.icon}"></div>
   <img class="${swalClasses.image}" />
   <h2 class="${swalClasses.title}" id="${swalClasses.title}"></h2>
   <div class="${swalClasses['html-container']}" id="${swalClasses['html-container']}"></div>
   <input class="${swalClasses.input}" />
   <input type="file" class="${swalClasses.file}" />
   <div class="${swalClasses.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${swalClasses.select}"></select>
   <div class="${swalClasses.radio}"></div>
   <label for="${swalClasses.checkbox}" class="${swalClasses.checkbox}">
     <input type="checkbox" />
     <span class="${swalClasses.label}"></span>
   </label>
   <textarea class="${swalClasses.textarea}"></textarea>
   <div class="${swalClasses['validation-message']}" id="${swalClasses['validation-message']}"></div>
   <div class="${swalClasses.actions}">
     <div class="${swalClasses.loader}"></div>
     <button type="button" class="${swalClasses.confirm}"></button>
     <button type="button" class="${swalClasses.deny}"></button>
     <button type="button" class="${swalClasses.cancel}"></button>
   </div>
   <div class="${swalClasses.footer}"></div>
   <div class="${swalClasses['timer-progress-bar-container']}">
     <div class="${swalClasses['timer-progress-bar']}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g, '');

    /**
     * @returns {boolean}
     */
    const resetOldContainer = () => {
      const oldContainer = getContainer();
      if (!oldContainer) {
        return false
      }

      oldContainer.remove();
      removeClass(
        [document.documentElement, document.body],
        [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]
      );

      return true
    };

    const resetValidationMessage$1 = () => {
      globalState.currentInstance.resetValidationMessage();
    };

    const addInputChangeListeners = () => {
      const popup = getPopup();

      const input = getDirectChildByClass(popup, swalClasses.input);
      const file = getDirectChildByClass(popup, swalClasses.file);
      /** @type {HTMLInputElement} */
      const range = popup.querySelector(`.${swalClasses.range} input`);
      /** @type {HTMLOutputElement} */
      const rangeOutput = popup.querySelector(`.${swalClasses.range} output`);
      const select = getDirectChildByClass(popup, swalClasses.select);
      /** @type {HTMLInputElement} */
      const checkbox = popup.querySelector(`.${swalClasses.checkbox} input`);
      const textarea = getDirectChildByClass(popup, swalClasses.textarea);

      input.oninput = resetValidationMessage$1;
      file.onchange = resetValidationMessage$1;
      select.onchange = resetValidationMessage$1;
      checkbox.onchange = resetValidationMessage$1;
      textarea.oninput = resetValidationMessage$1;

      range.oninput = () => {
        resetValidationMessage$1();
        rangeOutput.value = range.value;
      };

      range.onchange = () => {
        resetValidationMessage$1();
        rangeOutput.value = range.value;
      };
    };

    /**
     * @param {string | HTMLElement} target
     * @returns {HTMLElement}
     */
    const getTarget = (target) => (typeof target === 'string' ? document.querySelector(target) : target);

    /**
     * @param {SweetAlertOptions} params
     */
    const setupAccessibility = (params) => {
      const popup = getPopup();

      popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
      popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');
      if (!params.toast) {
        popup.setAttribute('aria-modal', 'true');
      }
    };

    /**
     * @param {HTMLElement} targetElement
     */
    const setupRTL = (targetElement) => {
      if (window.getComputedStyle(targetElement).direction === 'rtl') {
        addClass(getContainer(), swalClasses.rtl);
      }
    };

    /**
     * Add modal + backdrop + no-war message for Russians to DOM
     *
     * @param {SweetAlertOptions} params
     */
    const init = (params) => {
      // Clean up the old popup container if it exists
      const oldContainerExisted = resetOldContainer();

      /* istanbul ignore if */
      if (isNodeEnv()) {
        error('SweetAlert2 requires document to initialize');
        return
      }

      const container = document.createElement('div');
      container.className = swalClasses.container;
      if (oldContainerExisted) {
        addClass(container, swalClasses['no-transition']);
      }
      setInnerHtml(container, sweetHTML);

      const targetElement = getTarget(params.target);
      targetElement.appendChild(container);

      setupAccessibility(params);
      setupRTL(targetElement);
      addInputChangeListeners();

      noWarMessageForRussians(container, params);
    };

    /**
     * @param {HTMLElement} container
     * @param {SweetAlertOptions} params
     */
    const noWarMessageForRussians = (container, params) => {
      if (params.toast) {
        return
      }
      // This message is targeted at people who are corrupted by propaganda, everybody else
      // is already against war either silently or actively.
      //
      // The point is to wrap the truth-bomb into a patriotic title so they will actually click it
      // and listen to the uncomfortable truth about the war from the people they love or respect.
      const message = getRandomElement([
        {
          text: 'ШВАРЦЕНЕГГЕР обратился <br> к РУССКОМУ НАРОДУ о войне',
          // Arnold is loved in Russia by all people including those who are for this war
          // His speech might change the mind of those who are brainwashed by propaganda
          youtubeId: 'fWClXZd9c78',
        },
        {
          text: 'РУССКИЙ ПАТРИОТ <br> открыл главную тайну спецоперации',
          // In this video one of the most famous Russian nationalist leaders, Dmitry Demushkin,
          // explains that this war has no sense and produces the exact opposite result of what
          // it was intended to do.
          youtubeId: '_RjBNkn88yA',
        },
        {
          text: 'ГЕРОЙ НОВОРОССИИ СТРЕЛКОВ <br> дал оценку ходу спецоперации',
          // In this video Igor Girkin, who played a key role in the annexation of Crimea,
          // explains that this war has failed already and all possible outcomes are bad for Russia.
          youtubeId: 'yUmzQT4C8JY',
        },
        {
          text: 'ФИНСКИЙ ДРУГ РОССИИ <br> говорит ПО-РУССКИ о спецоперации',
          youtubeId: 'hkCYb6edUrQ',
        },
        {
          text: 'ЮРИЙ ПОДОЛЯКА честно <br> о генералах РУССКОЙ АРМИИ',
          youtubeId: 'w4-_8BJKfpk',
        },
        {
          text: 'Полковник ФСБ СТРЕЛКОВ <br> об успехах РОССИИ в спецоперации',
          youtubeId: 'saK5UTKroDA',
        },
      ]);
      // The message will only be shown to Russian users visiting Russian sites
      if (navigator.language === 'ru' && location.host.match(/\.(ru|su|xn--p1ai)$/)) {
        const noWar = document.createElement('div');
        noWar.className = swalClasses['no-war'];
        setInnerHtml(
          noWar,
          `<a href="https://www.youtube.com/watch?v=${message.youtubeId}" target="_blank">${message.text}</a>`
        );
        container.appendChild(noWar);
        container.style.paddingTop = '4em';
      }
    };

    /**
     * @param {HTMLElement | object | string} param
     * @param {HTMLElement} target
     */
    const parseHtmlToContainer = (param, target) => {
      // DOM element
      if (param instanceof HTMLElement) {
        target.appendChild(param);
      }

      // Object
      else if (typeof param === 'object') {
        handleObject(param, target);
      }

      // Plain string
      else if (param) {
        setInnerHtml(target, param);
      }
    };

    /**
     * @param {object} param
     * @param {HTMLElement} target
     */
    const handleObject = (param, target) => {
      // JQuery element(s)
      if (param.jquery) {
        handleJqueryElem(target, param);
      }

      // For other objects use their string representation
      else {
        setInnerHtml(target, param.toString());
      }
    };

    /**
     * @param {HTMLElement} target
     * @param {HTMLElement} elem
     */
    const handleJqueryElem = (target, elem) => {
      target.textContent = '';
      if (0 in elem) {
        for (let i = 0; i in elem; i++) {
          target.appendChild(elem[i].cloneNode(true));
        }
      } else {
        target.appendChild(elem.cloneNode(true));
      }
    };

    /**
     * @returns {'webkitAnimationEnd' | 'animationend' | false}
     */
    const animationEndEvent = (() => {
      // Prevent run in Node env
      /* istanbul ignore if */
      if (isNodeEnv()) {
        return false
      }

      const testEl = document.createElement('div');
      const transEndEventNames = {
        WebkitAnimation: 'webkitAnimationEnd', // Chrome, Safari and Opera
        animation: 'animationend', // Standard syntax
      };
      for (const i in transEndEventNames) {
        if (Object.prototype.hasOwnProperty.call(transEndEventNames, i) && typeof testEl.style[i] !== 'undefined') {
          return transEndEventNames[i]
        }
      }

      return false
    })();

    /**
     * Measure scrollbar width for padding body during modal show/hide
     * https://github.com/twbs/bootstrap/blob/master/js/src/modal.js
     *
     * @returns {number}
     */
    const measureScrollbar = () => {
      const scrollDiv = document.createElement('div');
      scrollDiv.className = swalClasses['scrollbar-measure'];
      document.body.appendChild(scrollDiv);
      const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth
    };

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const renderActions = (instance, params) => {
      const actions = getActions();
      const loader = getLoader();

      // Actions (buttons) wrapper
      if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
        hide(actions);
      } else {
        show(actions);
      }

      // Custom class
      applyCustomClass(actions, params, 'actions');

      // Render all the buttons
      renderButtons(actions, loader, params);

      // Loader
      setInnerHtml(loader, params.loaderHtml);
      applyCustomClass(loader, params, 'loader');
    };

    /**
     * @param {HTMLElement} actions
     * @param {HTMLElement} loader
     * @param {SweetAlertOptions} params
     */
    function renderButtons(actions, loader, params) {
      const confirmButton = getConfirmButton();
      const denyButton = getDenyButton();
      const cancelButton = getCancelButton();

      // Render buttons
      renderButton(confirmButton, 'confirm', params);
      renderButton(denyButton, 'deny', params);
      renderButton(cancelButton, 'cancel', params);
      handleButtonsStyling(confirmButton, denyButton, cancelButton, params);

      if (params.reverseButtons) {
        if (params.toast) {
          actions.insertBefore(cancelButton, confirmButton);
          actions.insertBefore(denyButton, confirmButton);
        } else {
          actions.insertBefore(cancelButton, loader);
          actions.insertBefore(denyButton, loader);
          actions.insertBefore(confirmButton, loader);
        }
      }
    }

    /**
     * @param {HTMLElement} confirmButton
     * @param {HTMLElement} denyButton
     * @param {HTMLElement} cancelButton
     * @param {SweetAlertOptions} params
     */
    function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
      if (!params.buttonsStyling) {
        return removeClass([confirmButton, denyButton, cancelButton], swalClasses.styled)
      }

      addClass([confirmButton, denyButton, cancelButton], swalClasses.styled);

      // Buttons background colors
      if (params.confirmButtonColor) {
        confirmButton.style.backgroundColor = params.confirmButtonColor;
        addClass(confirmButton, swalClasses['default-outline']);
      }
      if (params.denyButtonColor) {
        denyButton.style.backgroundColor = params.denyButtonColor;
        addClass(denyButton, swalClasses['default-outline']);
      }
      if (params.cancelButtonColor) {
        cancelButton.style.backgroundColor = params.cancelButtonColor;
        addClass(cancelButton, swalClasses['default-outline']);
      }
    }

    /**
     * @param {HTMLElement} button
     * @param {'confirm' | 'deny' | 'cancel'} buttonType
     * @param {SweetAlertOptions} params
     */
    function renderButton(button, buttonType, params) {
      toggle(button, params[`show${capitalizeFirstLetter(buttonType)}Button`], 'inline-block');
      setInnerHtml(button, params[`${buttonType}ButtonText`]); // Set caption text
      button.setAttribute('aria-label', params[`${buttonType}ButtonAriaLabel`]); // ARIA label

      // Add buttons custom classes
      button.className = swalClasses[buttonType];
      applyCustomClass(button, params, `${buttonType}Button`);
      addClass(button, params[`${buttonType}ButtonClass`]);
    }

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const renderContainer = (instance, params) => {
      const container = getContainer();

      if (!container) {
        return
      }

      handleBackdropParam(container, params.backdrop);

      handlePositionParam(container, params.position);
      handleGrowParam(container, params.grow);

      // Custom class
      applyCustomClass(container, params, 'container');
    };

    /**
     * @param {HTMLElement} container
     * @param {SweetAlertOptions['backdrop']} backdrop
     */
    function handleBackdropParam(container, backdrop) {
      if (typeof backdrop === 'string') {
        container.style.background = backdrop;
      } else if (!backdrop) {
        addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
      }
    }

    /**
     * @param {HTMLElement} container
     * @param {SweetAlertOptions['position']} position
     */
    function handlePositionParam(container, position) {
      if (position in swalClasses) {
        addClass(container, swalClasses[position]);
      } else {
        warn('The "position" parameter is not valid, defaulting to "center"');
        addClass(container, swalClasses.center);
      }
    }

    /**
     * @param {HTMLElement} container
     * @param {SweetAlertOptions['grow']} grow
     */
    function handleGrowParam(container, grow) {
      if (grow && typeof grow === 'string') {
        const growClass = `grow-${grow}`;
        if (growClass in swalClasses) {
          addClass(container, swalClasses[growClass]);
        }
      }
    }

    /**
     * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
     * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
     * This is the approach that Babel will probably take to implement private methods/fields
     *   https://github.com/tc39/proposal-private-methods
     *   https://github.com/babel/babel/pull/7555
     * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
     *   then we can use that language feature.
     */

    var privateProps = {
      awaitingPromise: new WeakMap(),
      promise: new WeakMap(),
      innerParams: new WeakMap(),
      domCache: new WeakMap(),
    };

    /// <reference path="../../../../sweetalert2.d.ts"/>

    /** @type {InputClass[]} */
    const inputClasses = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const renderInput = (instance, params) => {
      const popup = getPopup();
      const innerParams = privateProps.innerParams.get(instance);
      const rerender = !innerParams || params.input !== innerParams.input;

      inputClasses.forEach((inputClass) => {
        const inputContainer = getDirectChildByClass(popup, swalClasses[inputClass]);

        // set attributes
        setAttributes(inputClass, params.inputAttributes);

        // set class
        inputContainer.className = swalClasses[inputClass];

        if (rerender) {
          hide(inputContainer);
        }
      });

      if (params.input) {
        if (rerender) {
          showInput(params);
        }
        // set custom class
        setCustomClass(params);
      }
    };

    /**
     * @param {SweetAlertOptions} params
     */
    const showInput = (params) => {
      if (!renderInputType[params.input]) {
        return error(
          `Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "${params.input}"`
        )
      }

      const inputContainer = getInputContainer(params.input);
      const input = renderInputType[params.input](inputContainer, params);
      show(inputContainer);

      // input autofocus
      setTimeout(() => {
        focusInput(input);
      });
    };

    /**
     * @param {HTMLInputElement} input
     */
    const removeAttributes = (input) => {
      for (let i = 0; i < input.attributes.length; i++) {
        const attrName = input.attributes[i].name;
        if (!['type', 'value', 'style'].includes(attrName)) {
          input.removeAttribute(attrName);
        }
      }
    };

    /**
     * @param {InputClass} inputClass
     * @param {SweetAlertOptions['inputAttributes']} inputAttributes
     */
    const setAttributes = (inputClass, inputAttributes) => {
      const input = getInput$1(getPopup(), inputClass);
      if (!input) {
        return
      }

      removeAttributes(input);

      for (const attr in inputAttributes) {
        input.setAttribute(attr, inputAttributes[attr]);
      }
    };

    /**
     * @param {SweetAlertOptions} params
     */
    const setCustomClass = (params) => {
      const inputContainer = getInputContainer(params.input);
      if (typeof params.customClass === 'object') {
        addClass(inputContainer, params.customClass.input);
      }
    };

    /**
     * @param {HTMLInputElement | HTMLTextAreaElement} input
     * @param {SweetAlertOptions} params
     */
    const setInputPlaceholder = (input, params) => {
      if (!input.placeholder || params.inputPlaceholder) {
        input.placeholder = params.inputPlaceholder;
      }
    };

    /**
     * @param {Input} input
     * @param {Input} prependTo
     * @param {SweetAlertOptions} params
     */
    const setInputLabel = (input, prependTo, params) => {
      if (params.inputLabel) {
        input.id = swalClasses.input;
        const label = document.createElement('label');
        const labelClass = swalClasses['input-label'];
        label.setAttribute('for', input.id);
        label.className = labelClass;
        if (typeof params.customClass === 'object') {
          addClass(label, params.customClass.inputLabel);
        }
        label.innerText = params.inputLabel;
        prependTo.insertAdjacentElement('beforebegin', label);
      }
    };

    /**
     * @param {SweetAlertOptions['input']} inputType
     * @returns {HTMLElement}
     */
    const getInputContainer = (inputType) => {
      return getDirectChildByClass(getPopup(), swalClasses[inputType] || swalClasses.input)
    };

    /**
     * @param {HTMLInputElement | HTMLOutputElement | HTMLTextAreaElement} input
     * @param {SweetAlertOptions['inputValue']} inputValue
     */
    const checkAndSetInputValue = (input, inputValue) => {
      if (['string', 'number'].includes(typeof inputValue)) {
        input.value = `${inputValue}`;
      } else if (!isPromise(inputValue)) {
        warn(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof inputValue}"`);
      }
    };

    /** @type Record<string, (input: Input | HTMLElement, params: SweetAlertOptions) => Input> */
    const renderInputType = {};

    /**
     * @param {HTMLInputElement} input
     * @param {SweetAlertOptions} params
     * @returns {HTMLInputElement}
     */
    renderInputType.text =
      renderInputType.email =
      renderInputType.password =
      renderInputType.number =
      renderInputType.tel =
      renderInputType.url =
        (input, params) => {
          checkAndSetInputValue(input, params.inputValue);
          setInputLabel(input, input, params);
          setInputPlaceholder(input, params);
          input.type = params.input;
          return input
        };

    /**
     * @param {HTMLInputElement} input
     * @param {SweetAlertOptions} params
     * @returns {HTMLInputElement}
     */
    renderInputType.file = (input, params) => {
      setInputLabel(input, input, params);
      setInputPlaceholder(input, params);
      return input
    };

    /**
     * @param {HTMLInputElement} range
     * @param {SweetAlertOptions} params
     * @returns {HTMLInputElement}
     */
    renderInputType.range = (range, params) => {
      const rangeInput = range.querySelector('input');
      const rangeOutput = range.querySelector('output');
      checkAndSetInputValue(rangeInput, params.inputValue);
      rangeInput.type = params.input;
      checkAndSetInputValue(rangeOutput, params.inputValue);
      setInputLabel(rangeInput, range, params);
      return range
    };

    /**
     * @param {HTMLSelectElement} select
     * @param {SweetAlertOptions} params
     * @returns {HTMLSelectElement}
     */
    renderInputType.select = (select, params) => {
      select.textContent = '';
      if (params.inputPlaceholder) {
        const placeholder = document.createElement('option');
        setInnerHtml(placeholder, params.inputPlaceholder);
        placeholder.value = '';
        placeholder.disabled = true;
        placeholder.selected = true;
        select.appendChild(placeholder);
      }
      setInputLabel(select, select, params);
      return select
    };

    /**
     * @param {HTMLInputElement} radio
     * @returns {HTMLInputElement}
     */
    renderInputType.radio = (radio) => {
      radio.textContent = '';
      return radio
    };

    /**
     * @param {HTMLLabelElement} checkboxContainer
     * @param {SweetAlertOptions} params
     * @returns {HTMLInputElement}
     */
    renderInputType.checkbox = (checkboxContainer, params) => {
      const checkbox = getInput$1(getPopup(), 'checkbox');
      checkbox.value = '1';
      checkbox.id = swalClasses.checkbox;
      checkbox.checked = Boolean(params.inputValue);
      const label = checkboxContainer.querySelector('span');
      setInnerHtml(label, params.inputPlaceholder);
      return checkbox
    };

    /**
     * @param {HTMLTextAreaElement} textarea
     * @param {SweetAlertOptions} params
     * @returns {HTMLTextAreaElement}
     */
    renderInputType.textarea = (textarea, params) => {
      checkAndSetInputValue(textarea, params.inputValue);
      setInputPlaceholder(textarea, params);
      setInputLabel(textarea, textarea, params);

      /**
       * @param {HTMLElement} el
       * @returns {number}
       */
      const getMargin = (el) =>
        parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight);

      // https://github.com/sweetalert2/sweetalert2/issues/2291
      setTimeout(() => {
        // https://github.com/sweetalert2/sweetalert2/issues/1699
        if ('MutationObserver' in window) {
          const initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
          const textareaResizeHandler = () => {
            const textareaWidth = textarea.offsetWidth + getMargin(textarea);
            if (textareaWidth > initialPopupWidth) {
              getPopup().style.width = `${textareaWidth}px`;
            } else {
              getPopup().style.width = null;
            }
          };
          new MutationObserver(textareaResizeHandler).observe(textarea, {
            attributes: true,
            attributeFilter: ['style'],
          });
        }
      });

      return textarea
    };

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const renderContent = (instance, params) => {
      const htmlContainer = getHtmlContainer();

      applyCustomClass(htmlContainer, params, 'htmlContainer');

      // Content as HTML
      if (params.html) {
        parseHtmlToContainer(params.html, htmlContainer);
        show(htmlContainer, 'block');
      }

      // Content as plain text
      else if (params.text) {
        htmlContainer.textContent = params.text;
        show(htmlContainer, 'block');
      }

      // No content
      else {
        hide(htmlContainer);
      }

      renderInput(instance, params);
    };

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const renderFooter = (instance, params) => {
      const footer = getFooter();

      toggle(footer, params.footer);

      if (params.footer) {
        parseHtmlToContainer(params.footer, footer);
      }

      // Custom class
      applyCustomClass(footer, params, 'footer');
    };

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const renderCloseButton = (instance, params) => {
      const closeButton = getCloseButton();

      setInnerHtml(closeButton, params.closeButtonHtml);

      // Custom class
      applyCustomClass(closeButton, params, 'closeButton');

      toggle(closeButton, params.showCloseButton);
      closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
    };

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const renderIcon = (instance, params) => {
      const innerParams = privateProps.innerParams.get(instance);
      const icon = getIcon();

      // if the given icon already rendered, apply the styling without re-rendering the icon
      if (innerParams && params.icon === innerParams.icon) {
        // Custom or default content
        setContent(icon, params);

        applyStyles(icon, params);
        return
      }

      if (!params.icon && !params.iconHtml) {
        hide(icon);
        return
      }

      if (params.icon && Object.keys(iconTypes).indexOf(params.icon) === -1) {
        error(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${params.icon}"`);
        hide(icon);
        return
      }

      show(icon);

      // Custom or default content
      setContent(icon, params);

      applyStyles(icon, params);

      // Animate icon
      addClass(icon, params.showClass.icon);
    };

    /**
     * @param {HTMLElement} icon
     * @param {SweetAlertOptions} params
     */
    const applyStyles = (icon, params) => {
      for (const iconType in iconTypes) {
        if (params.icon !== iconType) {
          removeClass(icon, iconTypes[iconType]);
        }
      }
      addClass(icon, iconTypes[params.icon]);

      // Icon color
      setColor(icon, params);

      // Success icon background color
      adjustSuccessIconBackgroundColor();

      // Custom class
      applyCustomClass(icon, params, 'icon');
    };

    // Adjust success icon background color to match the popup background color
    const adjustSuccessIconBackgroundColor = () => {
      const popup = getPopup();
      const popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
      /** @type {NodeListOf<HTMLElement>} */
      const successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
      for (let i = 0; i < successIconParts.length; i++) {
        successIconParts[i].style.backgroundColor = popupBackgroundColor;
      }
    };

    const successIconHtml = `
  <div class="swal2-success-circular-line-left"></div>
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>
  <div class="swal2-success-circular-line-right"></div>
`;

    const errorIconHtml = `
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`;

    /**
     * @param {HTMLElement} icon
     * @param {SweetAlertOptions} params
     */
    const setContent = (icon, params) => {
      let oldContent = icon.innerHTML;
      let newContent;
      if (params.iconHtml) {
        newContent = iconContent(params.iconHtml);
      } else if (params.icon === 'success') {
        newContent = successIconHtml;
        oldContent = oldContent.replace(/ style=".*?"/g, ''); // undo adjustSuccessIconBackgroundColor()
      } else if (params.icon === 'error') {
        newContent = errorIconHtml;
      } else {
        const defaultIconHtml = {
          question: '?',
          warning: '!',
          info: 'i',
        };
        newContent = iconContent(defaultIconHtml[params.icon]);
      }

      if (oldContent.trim() !== newContent.trim()) {
        setInnerHtml(icon, newContent);
      }
    };

    /**
     * @param {HTMLElement} icon
     * @param {SweetAlertOptions} params
     */
    const setColor = (icon, params) => {
      if (!params.iconColor) {
        return
      }
      icon.style.color = params.iconColor;
      icon.style.borderColor = params.iconColor;
      for (const sel of [
        '.swal2-success-line-tip',
        '.swal2-success-line-long',
        '.swal2-x-mark-line-left',
        '.swal2-x-mark-line-right',
      ]) {
        setStyle(icon, sel, 'backgroundColor', params.iconColor);
      }
      setStyle(icon, '.swal2-success-ring', 'borderColor', params.iconColor);
    };

    /**
     * @param {string} content
     * @returns {string}
     */
    const iconContent = (content) => `<div class="${swalClasses['icon-content']}">${content}</div>`;

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const renderImage = (instance, params) => {
      const image = getImage();

      if (!params.imageUrl) {
        return hide(image)
      }

      show(image, '');

      // Src, alt
      image.setAttribute('src', params.imageUrl);
      image.setAttribute('alt', params.imageAlt);

      // Width, height
      applyNumericalStyle(image, 'width', params.imageWidth);
      applyNumericalStyle(image, 'height', params.imageHeight);

      // Class
      image.className = swalClasses.image;
      applyCustomClass(image, params, 'image');
    };

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const renderProgressSteps = (instance, params) => {
      const progressStepsContainer = getProgressSteps$1();
      if (!params.progressSteps || params.progressSteps.length === 0) {
        return hide(progressStepsContainer)
      }

      show(progressStepsContainer);
      progressStepsContainer.textContent = '';
      if (params.currentProgressStep >= params.progressSteps.length) {
        warn(
          'Invalid currentProgressStep parameter, it should be less than progressSteps.length ' +
            '(currentProgressStep like JS arrays starts from 0)'
        );
      }

      params.progressSteps.forEach((step, index) => {
        const stepEl = createStepElement(step);
        progressStepsContainer.appendChild(stepEl);
        if (index === params.currentProgressStep) {
          addClass(stepEl, swalClasses['active-progress-step']);
        }

        if (index !== params.progressSteps.length - 1) {
          const lineEl = createLineElement(params);
          progressStepsContainer.appendChild(lineEl);
        }
      });
    };

    /**
     * @param {string} step
     * @returns {HTMLLIElement}
     */
    const createStepElement = (step) => {
      const stepEl = document.createElement('li');
      addClass(stepEl, swalClasses['progress-step']);
      setInnerHtml(stepEl, step);
      return stepEl
    };

    /**
     * @param {SweetAlertOptions} params
     * @returns {HTMLLIElement}
     */
    const createLineElement = (params) => {
      const lineEl = document.createElement('li');
      addClass(lineEl, swalClasses['progress-step-line']);
      if (params.progressStepsDistance) {
        applyNumericalStyle(lineEl, 'width', params.progressStepsDistance);
      }
      return lineEl
    };

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const renderTitle = (instance, params) => {
      const title = getTitle();

      toggle(title, params.title || params.titleText, 'block');

      if (params.title) {
        parseHtmlToContainer(params.title, title);
      }

      if (params.titleText) {
        title.innerText = params.titleText;
      }

      // Custom class
      applyCustomClass(title, params, 'title');
    };

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const renderPopup = (instance, params) => {
      const container = getContainer();
      const popup = getPopup();

      // Width
      // https://github.com/sweetalert2/sweetalert2/issues/2170
      if (params.toast) {
        applyNumericalStyle(container, 'width', params.width);
        popup.style.width = '100%';
        popup.insertBefore(getLoader(), getIcon());
      } else {
        applyNumericalStyle(popup, 'width', params.width);
      }

      // Padding
      applyNumericalStyle(popup, 'padding', params.padding);

      // Color
      if (params.color) {
        popup.style.color = params.color;
      }

      // Background
      if (params.background) {
        popup.style.background = params.background;
      }

      hide(getValidationMessage());

      // Classes
      addClasses$1(popup, params);
    };

    /**
     * @param {HTMLElement} popup
     * @param {SweetAlertOptions} params
     */
    const addClasses$1 = (popup, params) => {
      // Default Class + showClass when updating Swal.update({})
      popup.className = `${swalClasses.popup} ${isVisible$1(popup) ? params.showClass.popup : ''}`;

      if (params.toast) {
        addClass([document.documentElement, document.body], swalClasses['toast-shown']);
        addClass(popup, swalClasses.toast);
      } else {
        addClass(popup, swalClasses.modal);
      }

      // Custom class
      applyCustomClass(popup, params, 'popup');
      if (typeof params.customClass === 'string') {
        addClass(popup, params.customClass);
      }

      // Icon class (#1842)
      if (params.icon) {
        addClass(popup, swalClasses[`icon-${params.icon}`]);
      }
    };

    /**
     * @param {SweetAlert2} instance
     * @param {SweetAlertOptions} params
     */
    const render = (instance, params) => {
      renderPopup(instance, params);
      renderContainer(instance, params);

      renderProgressSteps(instance, params);
      renderIcon(instance, params);
      renderImage(instance, params);
      renderTitle(instance, params);
      renderCloseButton(instance, params);

      renderContent(instance, params);
      renderActions(instance, params);
      renderFooter(instance, params);

      if (typeof params.didRender === 'function') {
        params.didRender(getPopup());
      }
    };

    const DismissReason = Object.freeze({
      cancel: 'cancel',
      backdrop: 'backdrop',
      close: 'close',
      esc: 'esc',
      timer: 'timer',
    });

    // From https://developer.paciellogroup.com/blog/2018/06/the-current-state-of-modal-dialog-accessibility/
    // Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
    // elements not within the active modal dialog will not be surfaced if a user opens a screen
    // reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

    const setAriaHidden = () => {
      const bodyChildren = toArray(document.body.children);
      bodyChildren.forEach((el) => {
        if (el === getContainer() || el.contains(getContainer())) {
          return
        }

        if (el.hasAttribute('aria-hidden')) {
          el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden'));
        }
        el.setAttribute('aria-hidden', 'true');
      });
    };

    const unsetAriaHidden = () => {
      const bodyChildren = toArray(document.body.children);
      bodyChildren.forEach((el) => {
        if (el.hasAttribute('data-previous-aria-hidden')) {
          el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden'));
          el.removeAttribute('data-previous-aria-hidden');
        } else {
          el.removeAttribute('aria-hidden');
        }
      });
    };

    const swalStringParams = ['swal-title', 'swal-html', 'swal-footer'];

    const getTemplateParams = (params) => {
      const template = typeof params.template === 'string' ? document.querySelector(params.template) : params.template;
      if (!template) {
        return {}
      }
      /** @type {DocumentFragment} */
      const templateContent = template.content;

      showWarningsForElements(templateContent);

      const result = Object.assign(
        getSwalParams(templateContent),
        getSwalButtons(templateContent),
        getSwalImage(templateContent),
        getSwalIcon(templateContent),
        getSwalInput(templateContent),
        getSwalStringParams(templateContent, swalStringParams)
      );
      return result
    };

    /**
     * @param {DocumentFragment} templateContent
     */
    const getSwalParams = (templateContent) => {
      const result = {};
      toArray(templateContent.querySelectorAll('swal-param')).forEach((param) => {
        showWarningsForAttributes(param, ['name', 'value']);
        const paramName = param.getAttribute('name');
        const value = param.getAttribute('value');
        if (typeof defaultParams[paramName] === 'boolean' && value === 'false') {
          result[paramName] = false;
        }
        if (typeof defaultParams[paramName] === 'object') {
          result[paramName] = JSON.parse(value);
        }
      });
      return result
    };

    /**
     * @param {DocumentFragment} templateContent
     */
    const getSwalButtons = (templateContent) => {
      const result = {};
      toArray(templateContent.querySelectorAll('swal-button')).forEach((button) => {
        showWarningsForAttributes(button, ['type', 'color', 'aria-label']);
        const type = button.getAttribute('type');
        result[`${type}ButtonText`] = button.innerHTML;
        result[`show${capitalizeFirstLetter(type)}Button`] = true;
        if (button.hasAttribute('color')) {
          result[`${type}ButtonColor`] = button.getAttribute('color');
        }
        if (button.hasAttribute('aria-label')) {
          result[`${type}ButtonAriaLabel`] = button.getAttribute('aria-label');
        }
      });
      return result
    };

    /**
     * @param {DocumentFragment} templateContent
     */
    const getSwalImage = (templateContent) => {
      const result = {};
      /** @type {HTMLElement} */
      const image = templateContent.querySelector('swal-image');
      if (image) {
        showWarningsForAttributes(image, ['src', 'width', 'height', 'alt']);
        if (image.hasAttribute('src')) {
          result.imageUrl = image.getAttribute('src');
        }
        if (image.hasAttribute('width')) {
          result.imageWidth = image.getAttribute('width');
        }
        if (image.hasAttribute('height')) {
          result.imageHeight = image.getAttribute('height');
        }
        if (image.hasAttribute('alt')) {
          result.imageAlt = image.getAttribute('alt');
        }
      }
      return result
    };

    /**
     * @param {DocumentFragment} templateContent
     */
    const getSwalIcon = (templateContent) => {
      const result = {};
      /** @type {HTMLElement} */
      const icon = templateContent.querySelector('swal-icon');
      if (icon) {
        showWarningsForAttributes(icon, ['type', 'color']);
        if (icon.hasAttribute('type')) {
          result.icon = icon.getAttribute('type');
        }
        if (icon.hasAttribute('color')) {
          result.iconColor = icon.getAttribute('color');
        }
        result.iconHtml = icon.innerHTML;
      }
      return result
    };

    /**
     * @param {DocumentFragment} templateContent
     */
    const getSwalInput = (templateContent) => {
      const result = {};
      /** @type {HTMLElement} */
      const input = templateContent.querySelector('swal-input');
      if (input) {
        showWarningsForAttributes(input, ['type', 'label', 'placeholder', 'value']);
        result.input = input.getAttribute('type') || 'text';
        if (input.hasAttribute('label')) {
          result.inputLabel = input.getAttribute('label');
        }
        if (input.hasAttribute('placeholder')) {
          result.inputPlaceholder = input.getAttribute('placeholder');
        }
        if (input.hasAttribute('value')) {
          result.inputValue = input.getAttribute('value');
        }
      }
      const inputOptions = templateContent.querySelectorAll('swal-input-option');
      if (inputOptions.length) {
        result.inputOptions = {};
        toArray(inputOptions).forEach((option) => {
          showWarningsForAttributes(option, ['value']);
          const optionValue = option.getAttribute('value');
          const optionName = option.innerHTML;
          result.inputOptions[optionValue] = optionName;
        });
      }
      return result
    };

    /**
     * @param {DocumentFragment} templateContent
     * @param {string[]} paramNames
     */
    const getSwalStringParams = (templateContent, paramNames) => {
      const result = {};
      for (const i in paramNames) {
        const paramName = paramNames[i];
        /** @type {HTMLElement} */
        const tag = templateContent.querySelector(paramName);
        if (tag) {
          showWarningsForAttributes(tag, []);
          result[paramName.replace(/^swal-/, '')] = tag.innerHTML.trim();
        }
      }
      return result
    };

    /**
     * @param {DocumentFragment} templateContent
     */
    const showWarningsForElements = (templateContent) => {
      const allowedElements = swalStringParams.concat([
        'swal-param',
        'swal-button',
        'swal-image',
        'swal-icon',
        'swal-input',
        'swal-input-option',
      ]);
      toArray(templateContent.children).forEach((el) => {
        const tagName = el.tagName.toLowerCase();
        if (allowedElements.indexOf(tagName) === -1) {
          warn(`Unrecognized element <${tagName}>`);
        }
      });
    };

    /**
     * @param {HTMLElement} el
     * @param {string[]} allowedAttributes
     */
    const showWarningsForAttributes = (el, allowedAttributes) => {
      toArray(el.attributes).forEach((attribute) => {
        if (allowedAttributes.indexOf(attribute.name) === -1) {
          warn([
            `Unrecognized attribute "${attribute.name}" on <${el.tagName.toLowerCase()}>.`,
            `${
          allowedAttributes.length
            ? `Allowed attributes are: ${allowedAttributes.join(', ')}`
            : 'To set the value, use HTML within the element.'
        }`,
          ]);
        }
      });
    };

    var defaultInputValidators = {
      /**
       * @param {string} string
       * @param {string} validationMessage
       * @returns {Promise<void | string>}
       */
      email: (string, validationMessage) => {
        return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string)
          ? Promise.resolve()
          : Promise.resolve(validationMessage || 'Invalid email address')
      },
      /**
       * @param {string} string
       * @param {string} validationMessage
       * @returns {Promise<void | string>}
       */
      url: (string, validationMessage) => {
        // taken from https://stackoverflow.com/a/3809435 with a small change from #1306 and #2013
        return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string)
          ? Promise.resolve()
          : Promise.resolve(validationMessage || 'Invalid URL')
      },
    };

    /**
     * @param {SweetAlertOptions} params
     */
    function setDefaultInputValidators(params) {
      // Use default `inputValidator` for supported input types if not provided
      if (!params.inputValidator) {
        Object.keys(defaultInputValidators).forEach((key) => {
          if (params.input === key) {
            params.inputValidator = defaultInputValidators[key];
          }
        });
      }
    }

    /**
     * @param {SweetAlertOptions} params
     */
    function validateCustomTargetElement(params) {
      // Determine if the custom target element is valid
      if (
        !params.target ||
        (typeof params.target === 'string' && !document.querySelector(params.target)) ||
        (typeof params.target !== 'string' && !params.target.appendChild)
      ) {
        warn('Target parameter is not valid, defaulting to "body"');
        params.target = 'body';
      }
    }

    /**
     * Set type, text and actions on popup
     *
     * @param {SweetAlertOptions} params
     */
    function setParameters(params) {
      setDefaultInputValidators(params);

      // showLoaderOnConfirm && preConfirm
      if (params.showLoaderOnConfirm && !params.preConfirm) {
        warn(
          'showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' +
            'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' +
            'https://sweetalert2.github.io/#ajax-request'
        );
      }

      validateCustomTargetElement(params);

      // Replace newlines with <br> in title
      if (typeof params.title === 'string') {
        params.title = params.title.split('\n').join('<br />');
      }

      init(params);
    }

    class Timer {
      constructor(callback, delay) {
        this.callback = callback;
        this.remaining = delay;
        this.running = false;

        this.start();
      }

      start() {
        if (!this.running) {
          this.running = true;
          this.started = new Date();
          this.id = setTimeout(this.callback, this.remaining);
        }
        return this.remaining
      }

      stop() {
        if (this.running) {
          this.running = false;
          clearTimeout(this.id);
          this.remaining -= new Date().getTime() - this.started.getTime();
        }
        return this.remaining
      }

      increase(n) {
        const running = this.running;
        if (running) {
          this.stop();
        }
        this.remaining += n;
        if (running) {
          this.start();
        }
        return this.remaining
      }

      getTimerLeft() {
        if (this.running) {
          this.stop();
          this.start();
        }
        return this.remaining
      }

      isRunning() {
        return this.running
      }
    }

    const fixScrollbar = () => {
      // for queues, do not do this more than once
      if (states.previousBodyPadding !== null) {
        return
      }
      // if the body has overflow
      if (document.body.scrollHeight > window.innerHeight) {
        // add padding so the content doesn't shift after removal of scrollbar
        states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
        document.body.style.paddingRight = `${states.previousBodyPadding + measureScrollbar()}px`;
      }
    };

    const undoScrollbar = () => {
      if (states.previousBodyPadding !== null) {
        document.body.style.paddingRight = `${states.previousBodyPadding}px`;
        states.previousBodyPadding = null;
      }
    };

    /* istanbul ignore file */

    // Fix iOS scrolling http://stackoverflow.com/q/39626302

    const iOSfix = () => {
      const iOS =
        // @ts-ignore
        (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
        const offset = document.body.scrollTop;
        document.body.style.top = `${offset * -1}px`;
        addClass(document.body, swalClasses.iosfix);
        lockBodyScroll();
        addBottomPaddingForTallPopups();
      }
    };

    /**
     * https://github.com/sweetalert2/sweetalert2/issues/1948
     */
    const addBottomPaddingForTallPopups = () => {
      const ua = navigator.userAgent;
      const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
      const webkit = !!ua.match(/WebKit/i);
      const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
      if (iOSSafari) {
        const bottomPanelHeight = 44;
        if (getPopup().scrollHeight > window.innerHeight - bottomPanelHeight) {
          getContainer().style.paddingBottom = `${bottomPanelHeight}px`;
        }
      }
    };

    /**
     * https://github.com/sweetalert2/sweetalert2/issues/1246
     */
    const lockBodyScroll = () => {
      const container = getContainer();
      let preventTouchMove;
      container.ontouchstart = (e) => {
        preventTouchMove = shouldPreventTouchMove(e);
      };
      container.ontouchmove = (e) => {
        if (preventTouchMove) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
    };

    const shouldPreventTouchMove = (event) => {
      const target = event.target;
      const container = getContainer();
      if (isStylus(event) || isZoom(event)) {
        return false
      }
      if (target === container) {
        return true
      }
      if (
        !isScrollable(container) &&
        target.tagName !== 'INPUT' && // #1603
        target.tagName !== 'TEXTAREA' && // #2266
        !(
          isScrollable(getHtmlContainer()) && // #1944
          getHtmlContainer().contains(target)
        )
      ) {
        return true
      }
      return false
    };

    /**
     * https://github.com/sweetalert2/sweetalert2/issues/1786
     *
     * @param {*} event
     * @returns {boolean}
     */
    const isStylus = (event) => {
      return event.touches && event.touches.length && event.touches[0].touchType === 'stylus'
    };

    /**
     * https://github.com/sweetalert2/sweetalert2/issues/1891
     *
     * @param {TouchEvent} event
     * @returns {boolean}
     */
    const isZoom = (event) => {
      return event.touches && event.touches.length > 1
    };

    const undoIOSfix = () => {
      if (hasClass(document.body, swalClasses.iosfix)) {
        const offset = parseInt(document.body.style.top, 10);
        removeClass(document.body, swalClasses.iosfix);
        document.body.style.top = '';
        document.body.scrollTop = offset * -1;
      }
    };

    const SHOW_CLASS_TIMEOUT = 10;

    /**
     * Open popup, add necessary classes and styles, fix scrollbar
     *
     * @param params
     */
    const openPopup = (params) => {
      const container = getContainer();
      const popup = getPopup();

      if (typeof params.willOpen === 'function') {
        params.willOpen(popup);
      }

      const bodyStyles = window.getComputedStyle(document.body);
      const initialBodyOverflow = bodyStyles.overflowY;
      addClasses(container, popup, params);

      // scrolling is 'hidden' until animation is done, after that 'auto'
      setTimeout(() => {
        setScrollingVisibility(container, popup);
      }, SHOW_CLASS_TIMEOUT);

      if (isModal()) {
        fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow);
        setAriaHidden();
      }

      if (!isToast() && !globalState.previousActiveElement) {
        globalState.previousActiveElement = document.activeElement;
      }

      if (typeof params.didOpen === 'function') {
        setTimeout(() => params.didOpen(popup));
      }

      removeClass(container, swalClasses['no-transition']);
    };

    const swalOpenAnimationFinished = (event) => {
      const popup = getPopup();
      if (event.target !== popup) {
        return
      }
      const container = getContainer();
      popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
      container.style.overflowY = 'auto';
    };

    const setScrollingVisibility = (container, popup) => {
      if (animationEndEvent && hasCssAnimation(popup)) {
        container.style.overflowY = 'hidden';
        popup.addEventListener(animationEndEvent, swalOpenAnimationFinished);
      } else {
        container.style.overflowY = 'auto';
      }
    };

    const fixScrollContainer = (container, scrollbarPadding, initialBodyOverflow) => {
      iOSfix();

      if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
        fixScrollbar();
      }

      // sweetalert2/issues/1247
      setTimeout(() => {
        container.scrollTop = 0;
      });
    };

    const addClasses = (container, popup, params) => {
      addClass(container, params.showClass.backdrop);
      // this workaround with opacity is needed for https://github.com/sweetalert2/sweetalert2/issues/2059
      popup.style.setProperty('opacity', '0', 'important');
      show(popup, 'grid');
      setTimeout(() => {
        // Animate popup right after showing it
        addClass(popup, params.showClass.popup);
        // and remove the opacity workaround
        popup.style.removeProperty('opacity');
      }, SHOW_CLASS_TIMEOUT); // 10ms in order to fix #2062

      addClass([document.documentElement, document.body], swalClasses.shown);
      if (params.heightAuto && params.backdrop && !params.toast) {
        addClass([document.documentElement, document.body], swalClasses['height-auto']);
      }
    };

    /**
     * Shows loader (spinner), this is useful with AJAX requests.
     * By default the loader be shown instead of the "Confirm" button.
     */
    const showLoading = (buttonToReplace) => {
      let popup = getPopup();
      if (!popup) {
        new Swal(); // eslint-disable-line no-new
      }
      popup = getPopup();
      const loader = getLoader();

      if (isToast()) {
        hide(getIcon());
      } else {
        replaceButton(popup, buttonToReplace);
      }
      show(loader);

      popup.setAttribute('data-loading', 'true');
      popup.setAttribute('aria-busy', 'true');
      popup.focus();
    };

    const replaceButton = (popup, buttonToReplace) => {
      const actions = getActions();
      const loader = getLoader();

      if (!buttonToReplace && isVisible$1(getConfirmButton())) {
        buttonToReplace = getConfirmButton();
      }

      show(actions);
      if (buttonToReplace) {
        hide(buttonToReplace);
        loader.setAttribute('data-button-to-replace', buttonToReplace.className);
      }
      loader.parentNode.insertBefore(loader, buttonToReplace);
      addClass([popup, actions], swalClasses.loading);
    };

    const handleInputOptionsAndValue = (instance, params) => {
      if (params.input === 'select' || params.input === 'radio') {
        handleInputOptions(instance, params);
      } else if (
        ['text', 'email', 'number', 'tel', 'textarea'].includes(params.input) &&
        (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))
      ) {
        showLoading(getConfirmButton());
        handleInputValue(instance, params);
      }
    };

    const getInputValue = (instance, innerParams) => {
      const input = instance.getInput();
      if (!input) {
        return null
      }
      switch (innerParams.input) {
        case 'checkbox':
          return getCheckboxValue(input)
        case 'radio':
          return getRadioValue(input)
        case 'file':
          return getFileValue(input)
        default:
          return innerParams.inputAutoTrim ? input.value.trim() : input.value
      }
    };

    const getCheckboxValue = (input) => (input.checked ? 1 : 0);

    const getRadioValue = (input) => (input.checked ? input.value : null);

    const getFileValue = (input) =>
      input.files.length ? (input.getAttribute('multiple') !== null ? input.files : input.files[0]) : null;

    const handleInputOptions = (instance, params) => {
      const popup = getPopup();
      const processInputOptions = (inputOptions) =>
        populateInputOptions[params.input](popup, formatInputOptions(inputOptions), params);
      if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
        showLoading(getConfirmButton());
        asPromise(params.inputOptions).then((inputOptions) => {
          instance.hideLoading();
          processInputOptions(inputOptions);
        });
      } else if (typeof params.inputOptions === 'object') {
        processInputOptions(params.inputOptions);
      } else {
        error(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof params.inputOptions}`);
      }
    };

    const handleInputValue = (instance, params) => {
      const input = instance.getInput();
      hide(input);
      asPromise(params.inputValue)
        .then((inputValue) => {
          input.value = params.input === 'number' ? parseFloat(inputValue) || 0 : `${inputValue}`;
          show(input);
          input.focus();
          instance.hideLoading();
        })
        .catch((err) => {
          error(`Error in inputValue promise: ${err}`);
          input.value = '';
          show(input);
          input.focus();
          instance.hideLoading();
        });
    };

    const populateInputOptions = {
      select: (popup, inputOptions, params) => {
        const select = getDirectChildByClass(popup, swalClasses.select);
        const renderOption = (parent, optionLabel, optionValue) => {
          const option = document.createElement('option');
          option.value = optionValue;
          setInnerHtml(option, optionLabel);
          option.selected = isSelected(optionValue, params.inputValue);
          parent.appendChild(option);
        };
        inputOptions.forEach((inputOption) => {
          const optionValue = inputOption[0];
          const optionLabel = inputOption[1];
          // <optgroup> spec:
          // https://www.w3.org/TR/html401/interact/forms.html#h-17.6
          // "...all OPTGROUP elements must be specified directly within a SELECT element (i.e., groups may not be nested)..."
          // check whether this is a <optgroup>
          if (Array.isArray(optionLabel)) {
            // if it is an array, then it is an <optgroup>
            const optgroup = document.createElement('optgroup');
            optgroup.label = optionValue;
            optgroup.disabled = false; // not configurable for now
            select.appendChild(optgroup);
            optionLabel.forEach((o) => renderOption(optgroup, o[1], o[0]));
          } else {
            // case of <option>
            renderOption(select, optionLabel, optionValue);
          }
        });
        select.focus();
      },

      radio: (popup, inputOptions, params) => {
        const radio = getDirectChildByClass(popup, swalClasses.radio);
        inputOptions.forEach((inputOption) => {
          const radioValue = inputOption[0];
          const radioLabel = inputOption[1];
          const radioInput = document.createElement('input');
          const radioLabelElement = document.createElement('label');
          radioInput.type = 'radio';
          radioInput.name = swalClasses.radio;
          radioInput.value = radioValue;
          if (isSelected(radioValue, params.inputValue)) {
            radioInput.checked = true;
          }
          const label = document.createElement('span');
          setInnerHtml(label, radioLabel);
          label.className = swalClasses.label;
          radioLabelElement.appendChild(radioInput);
          radioLabelElement.appendChild(label);
          radio.appendChild(radioLabelElement);
        });
        const radios = radio.querySelectorAll('input');
        if (radios.length) {
          radios[0].focus();
        }
      },
    };

    /**
     * Converts `inputOptions` into an array of `[value, label]`s
     * @param inputOptions
     */
    const formatInputOptions = (inputOptions) => {
      const result = [];
      if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
        inputOptions.forEach((value, key) => {
          let valueFormatted = value;
          if (typeof valueFormatted === 'object') {
            // case of <optgroup>
            valueFormatted = formatInputOptions(valueFormatted);
          }
          result.push([key, valueFormatted]);
        });
      } else {
        Object.keys(inputOptions).forEach((key) => {
          let valueFormatted = inputOptions[key];
          if (typeof valueFormatted === 'object') {
            // case of <optgroup>
            valueFormatted = formatInputOptions(valueFormatted);
          }
          result.push([key, valueFormatted]);
        });
      }
      return result
    };

    const isSelected = (optionValue, inputValue) => {
      return inputValue && inputValue.toString() === optionValue.toString()
    };

    /**
     * Hides loader and shows back the button which was hidden by .showLoading()
     */
    function hideLoading() {
      // do nothing if popup is closed
      const innerParams = privateProps.innerParams.get(this);
      if (!innerParams) {
        return
      }
      const domCache = privateProps.domCache.get(this);
      hide(domCache.loader);
      if (isToast()) {
        if (innerParams.icon) {
          show(getIcon());
        }
      } else {
        showRelatedButton(domCache);
      }
      removeClass([domCache.popup, domCache.actions], swalClasses.loading);
      domCache.popup.removeAttribute('aria-busy');
      domCache.popup.removeAttribute('data-loading');
      domCache.confirmButton.disabled = false;
      domCache.denyButton.disabled = false;
      domCache.cancelButton.disabled = false;
    }

    const showRelatedButton = (domCache) => {
      const buttonToReplace = domCache.popup.getElementsByClassName(domCache.loader.getAttribute('data-button-to-replace'));
      if (buttonToReplace.length) {
        show(buttonToReplace[0], 'inline-block');
      } else if (allButtonsAreHidden()) {
        hide(domCache.actions);
      }
    };

    /**
     * Gets the input DOM node, this method works with input parameter.
     * @returns {HTMLElement | null}
     */
    function getInput(instance) {
      const innerParams = privateProps.innerParams.get(instance || this);
      const domCache = privateProps.domCache.get(instance || this);
      if (!domCache) {
        return null
      }
      return getInput$1(domCache.popup, innerParams.input)
    }

    /**
     * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
     * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
     * This is the approach that Babel will probably take to implement private methods/fields
     *   https://github.com/tc39/proposal-private-methods
     *   https://github.com/babel/babel/pull/7555
     * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
     *   then we can use that language feature.
     */

    var privateMethods = {
      swalPromiseResolve: new WeakMap(),
      swalPromiseReject: new WeakMap(),
    };

    /*
     * Global function to determine if SweetAlert2 popup is shown
     */
    const isVisible = () => {
      return isVisible$1(getPopup())
    };

    /*
     * Global function to click 'Confirm' button
     */
    const clickConfirm = () => getConfirmButton() && getConfirmButton().click();

    /*
     * Global function to click 'Deny' button
     */
    const clickDeny = () => getDenyButton() && getDenyButton().click();

    /*
     * Global function to click 'Cancel' button
     */
    const clickCancel = () => getCancelButton() && getCancelButton().click();

    /**
     * @param {GlobalState} globalState
     */
    const removeKeydownHandler = (globalState) => {
      if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
        globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
          capture: globalState.keydownListenerCapture,
        });
        globalState.keydownHandlerAdded = false;
      }
    };

    /**
     * @param {SweetAlert2} instance
     * @param {GlobalState} globalState
     * @param {SweetAlertOptions} innerParams
     * @param {*} dismissWith
     */
    const addKeydownHandler = (instance, globalState, innerParams, dismissWith) => {
      removeKeydownHandler(globalState);
      if (!innerParams.toast) {
        globalState.keydownHandler = (e) => keydownHandler(instance, e, dismissWith);
        globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
        globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
        globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
          capture: globalState.keydownListenerCapture,
        });
        globalState.keydownHandlerAdded = true;
      }
    };

    /**
     * @param {SweetAlertOptions} innerParams
     * @param {number} index
     * @param {number} increment
     */
    const setFocus = (innerParams, index, increment) => {
      const focusableElements = getFocusableElements();
      // search for visible elements and select the next possible match
      if (focusableElements.length) {
        index = index + increment;

        // rollover to first item
        if (index === focusableElements.length) {
          index = 0;

          // go to last item
        } else if (index === -1) {
          index = focusableElements.length - 1;
        }

        return focusableElements[index].focus()
      }
      // no visible focusable elements, focus the popup
      getPopup().focus();
    };

    const arrowKeysNextButton = ['ArrowRight', 'ArrowDown'];

    const arrowKeysPreviousButton = ['ArrowLeft', 'ArrowUp'];

    /**
     * @param {SweetAlert2} instance
     * @param {KeyboardEvent} e
     * @param {function} dismissWith
     */
    const keydownHandler = (instance, e, dismissWith) => {
      const innerParams = privateProps.innerParams.get(instance);

      if (!innerParams) {
        return // This instance has already been destroyed
      }

      // Ignore keydown during IME composition
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
      // https://github.com/sweetalert2/sweetalert2/issues/720
      // https://github.com/sweetalert2/sweetalert2/issues/2406
      if (e.isComposing || e.keyCode === 229) {
        return
      }

      if (innerParams.stopKeydownPropagation) {
        e.stopPropagation();
      }

      // ENTER
      if (e.key === 'Enter') {
        handleEnter(instance, e, innerParams);
      }

      // TAB
      else if (e.key === 'Tab') {
        handleTab(e, innerParams);
      }

      // ARROWS - switch focus between buttons
      else if ([...arrowKeysNextButton, ...arrowKeysPreviousButton].includes(e.key)) {
        handleArrows(e.key);
      }

      // ESC
      else if (e.key === 'Escape') {
        handleEsc(e, innerParams, dismissWith);
      }
    };

    /**
     * @param {SweetAlert2} instance
     * @param {KeyboardEvent} e
     * @param {SweetAlertOptions} innerParams
     */
    const handleEnter = (instance, e, innerParams) => {
      // https://github.com/sweetalert2/sweetalert2/issues/2386
      if (!callIfFunction(innerParams.allowEnterKey)) {
        return
      }

      if (
        e.target &&
        instance.getInput() &&
        e.target instanceof HTMLElement &&
        e.target.outerHTML === instance.getInput().outerHTML
      ) {
        if (['textarea', 'file'].includes(innerParams.input)) {
          return // do not submit
        }

        clickConfirm();
        e.preventDefault();
      }
    };

    /**
     * @param {KeyboardEvent} e
     * @param {SweetAlertOptions} innerParams
     */
    const handleTab = (e, innerParams) => {
      const targetElement = e.target;

      const focusableElements = getFocusableElements();
      let btnIndex = -1;
      for (let i = 0; i < focusableElements.length; i++) {
        if (targetElement === focusableElements[i]) {
          btnIndex = i;
          break
        }
      }

      // Cycle to the next button
      if (!e.shiftKey) {
        setFocus(innerParams, btnIndex, 1);
      }

      // Cycle to the prev button
      else {
        setFocus(innerParams, btnIndex, -1);
      }

      e.stopPropagation();
      e.preventDefault();
    };

    /**
     * @param {string} key
     */
    const handleArrows = (key) => {
      const confirmButton = getConfirmButton();
      const denyButton = getDenyButton();
      const cancelButton = getCancelButton();
      if (
        document.activeElement instanceof HTMLElement &&
        ![confirmButton, denyButton, cancelButton].includes(document.activeElement)
      ) {
        return
      }
      const sibling = arrowKeysNextButton.includes(key) ? 'nextElementSibling' : 'previousElementSibling';
      let buttonToFocus = document.activeElement;
      for (let i = 0; i < getActions().children.length; i++) {
        buttonToFocus = buttonToFocus[sibling];
        if (!buttonToFocus) {
          return
        }
        if (buttonToFocus instanceof HTMLButtonElement && isVisible$1(buttonToFocus)) {
          break
        }
      }
      if (buttonToFocus instanceof HTMLButtonElement) {
        buttonToFocus.focus();
      }
    };

    /**
     * @param {KeyboardEvent} e
     * @param {SweetAlertOptions} innerParams
     * @param {function} dismissWith
     */
    const handleEsc = (e, innerParams, dismissWith) => {
      if (callIfFunction(innerParams.allowEscapeKey)) {
        e.preventDefault();
        dismissWith(DismissReason.esc);
      }
    };

    /*
     * Instance method to close sweetAlert
     */

    function removePopupAndResetState(instance, container, returnFocus, didClose) {
      if (isToast()) {
        triggerDidCloseAndDispose(instance, didClose);
      } else {
        restoreActiveElement(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose));
        removeKeydownHandler(globalState);
      }

      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      // workaround for #2088
      // for some reason removing the container in Safari will scroll the document to bottom
      if (isSafari) {
        container.setAttribute('style', 'display:none !important');
        container.removeAttribute('class');
        container.innerHTML = '';
      } else {
        container.remove();
      }

      if (isModal()) {
        undoScrollbar();
        undoIOSfix();
        unsetAriaHidden();
      }

      removeBodyClasses();
    }

    function removeBodyClasses() {
      removeClass(
        [document.documentElement, document.body],
        [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown']]
      );
    }

    function close(resolveValue) {
      resolveValue = prepareResolveValue(resolveValue);

      const swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);

      const didClose = triggerClosePopup(this);

      if (this.isAwaitingPromise()) {
        // A swal awaiting for a promise (after a click on Confirm or Deny) cannot be dismissed anymore #2335
        if (!resolveValue.isDismissed) {
          handleAwaitingPromise(this);
          swalPromiseResolve(resolveValue);
        }
      } else if (didClose) {
        // Resolve Swal promise
        swalPromiseResolve(resolveValue);
      }
    }

    function isAwaitingPromise() {
      return !!privateProps.awaitingPromise.get(this)
    }

    const triggerClosePopup = (instance) => {
      const popup = getPopup();

      if (!popup) {
        return false
      }

      const innerParams = privateProps.innerParams.get(instance);
      if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
        return false
      }

      removeClass(popup, innerParams.showClass.popup);
      addClass(popup, innerParams.hideClass.popup);

      const backdrop = getContainer();
      removeClass(backdrop, innerParams.showClass.backdrop);
      addClass(backdrop, innerParams.hideClass.backdrop);

      handlePopupAnimation(instance, popup, innerParams);

      return true
    };

    function rejectPromise(error) {
      const rejectPromise = privateMethods.swalPromiseReject.get(this);
      handleAwaitingPromise(this);
      if (rejectPromise) {
        // Reject Swal promise
        rejectPromise(error);
      }
    }

    const handleAwaitingPromise = (instance) => {
      if (instance.isAwaitingPromise()) {
        privateProps.awaitingPromise.delete(instance);
        // The instance might have been previously partly destroyed, we must resume the destroy process in this case #2335
        if (!privateProps.innerParams.get(instance)) {
          instance._destroy();
        }
      }
    };

    const prepareResolveValue = (resolveValue) => {
      // When user calls Swal.close()
      if (typeof resolveValue === 'undefined') {
        return {
          isConfirmed: false,
          isDenied: false,
          isDismissed: true,
        }
      }

      return Object.assign(
        {
          isConfirmed: false,
          isDenied: false,
          isDismissed: false,
        },
        resolveValue
      )
    };

    const handlePopupAnimation = (instance, popup, innerParams) => {
      const container = getContainer();
      // If animation is supported, animate
      const animationIsSupported = animationEndEvent && hasCssAnimation(popup);

      if (typeof innerParams.willClose === 'function') {
        innerParams.willClose(popup);
      }

      if (animationIsSupported) {
        animatePopup(instance, popup, container, innerParams.returnFocus, innerParams.didClose);
      } else {
        // Otherwise, remove immediately
        removePopupAndResetState(instance, container, innerParams.returnFocus, innerParams.didClose);
      }
    };

    const animatePopup = (instance, popup, container, returnFocus, didClose) => {
      globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(
        null,
        instance,
        container,
        returnFocus,
        didClose
      );
      popup.addEventListener(animationEndEvent, function (e) {
        if (e.target === popup) {
          globalState.swalCloseEventFinishedCallback();
          delete globalState.swalCloseEventFinishedCallback;
        }
      });
    };

    const triggerDidCloseAndDispose = (instance, didClose) => {
      setTimeout(() => {
        if (typeof didClose === 'function') {
          didClose.bind(instance.params)();
        }
        instance._destroy();
      });
    };

    function setButtonsDisabled(instance, buttons, disabled) {
      const domCache = privateProps.domCache.get(instance);
      buttons.forEach((button) => {
        domCache[button].disabled = disabled;
      });
    }

    function setInputDisabled(input, disabled) {
      if (!input) {
        return false
      }
      if (input.type === 'radio') {
        const radiosContainer = input.parentNode.parentNode;
        const radios = radiosContainer.querySelectorAll('input');
        for (let i = 0; i < radios.length; i++) {
          radios[i].disabled = disabled;
        }
      } else {
        input.disabled = disabled;
      }
    }

    function enableButtons() {
      setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], false);
    }

    function disableButtons() {
      setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], true);
    }

    function enableInput() {
      return setInputDisabled(this.getInput(), false)
    }

    function disableInput() {
      return setInputDisabled(this.getInput(), true)
    }

    // Show block with validation message
    function showValidationMessage(error) {
      const domCache = privateProps.domCache.get(this);
      const params = privateProps.innerParams.get(this);
      setInnerHtml(domCache.validationMessage, error);
      domCache.validationMessage.className = swalClasses['validation-message'];
      if (params.customClass && params.customClass.validationMessage) {
        addClass(domCache.validationMessage, params.customClass.validationMessage);
      }
      show(domCache.validationMessage);

      const input = this.getInput();
      if (input) {
        input.setAttribute('aria-invalid', true);
        input.setAttribute('aria-describedby', swalClasses['validation-message']);
        focusInput(input);
        addClass(input, swalClasses.inputerror);
      }
    }

    // Hide block with validation message
    function resetValidationMessage() {
      const domCache = privateProps.domCache.get(this);
      if (domCache.validationMessage) {
        hide(domCache.validationMessage);
      }

      const input = this.getInput();
      if (input) {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
        removeClass(input, swalClasses.inputerror);
      }
    }

    function getProgressSteps() {
      const domCache = privateProps.domCache.get(this);
      return domCache.progressSteps
    }

    /**
     * Updates popup parameters.
     */
    function update(params) {
      const popup = getPopup();
      const innerParams = privateProps.innerParams.get(this);

      if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
        return warn(
          `You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.`
        )
      }

      const validUpdatableParams = filterValidParams(params);

      const updatedParams = Object.assign({}, innerParams, validUpdatableParams);

      render(this, updatedParams);

      privateProps.innerParams.set(this, updatedParams);
      Object.defineProperties(this, {
        params: {
          value: Object.assign({}, this.params, params),
          writable: false,
          enumerable: true,
        },
      });
    }

    const filterValidParams = (params) => {
      const validUpdatableParams = {};
      Object.keys(params).forEach((param) => {
        if (isUpdatableParameter(param)) {
          validUpdatableParams[param] = params[param];
        } else {
          warn(`Invalid parameter to update: ${param}`);
        }
      });
      return validUpdatableParams
    };

    function _destroy() {
      const domCache = privateProps.domCache.get(this);
      const innerParams = privateProps.innerParams.get(this);

      if (!innerParams) {
        disposeWeakMaps(this); // The WeakMaps might have been partly destroyed, we must recall it to dispose any remaining WeakMaps #2335
        return // This instance has already been destroyed
      }

      // Check if there is another Swal closing
      if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
        globalState.swalCloseEventFinishedCallback();
        delete globalState.swalCloseEventFinishedCallback;
      }

      if (typeof innerParams.didDestroy === 'function') {
        innerParams.didDestroy();
      }
      disposeSwal(this);
    }

    /**
     * @param {SweetAlert2} instance
     */
    const disposeSwal = (instance) => {
      disposeWeakMaps(instance);
      // Unset this.params so GC will dispose it (#1569)
      // @ts-ignore
      delete instance.params;
      // Unset globalState props so GC will dispose globalState (#1569)
      delete globalState.keydownHandler;
      delete globalState.keydownTarget;
      // Unset currentInstance
      delete globalState.currentInstance;
    };

    /**
     * @param {SweetAlert2} instance
     */
    const disposeWeakMaps = (instance) => {
      // If the current instance is awaiting a promise result, we keep the privateMethods to call them once the promise result is retrieved #2335
      // @ts-ignore
      if (instance.isAwaitingPromise()) {
        unsetWeakMaps(privateProps, instance);
        privateProps.awaitingPromise.set(instance, true);
      } else {
        unsetWeakMaps(privateMethods, instance);
        unsetWeakMaps(privateProps, instance);
      }
    };

    /**
     * @param {object} obj
     * @param {SweetAlert2} instance
     */
    const unsetWeakMaps = (obj, instance) => {
      for (const i in obj) {
        obj[i].delete(instance);
      }
    };

    var instanceMethods = /*#__PURE__*/Object.freeze({
        __proto__: null,
        hideLoading: hideLoading,
        disableLoading: hideLoading,
        getInput: getInput,
        close: close,
        isAwaitingPromise: isAwaitingPromise,
        rejectPromise: rejectPromise,
        handleAwaitingPromise: handleAwaitingPromise,
        closePopup: close,
        closeModal: close,
        closeToast: close,
        enableButtons: enableButtons,
        disableButtons: disableButtons,
        enableInput: enableInput,
        disableInput: disableInput,
        showValidationMessage: showValidationMessage,
        resetValidationMessage: resetValidationMessage,
        getProgressSteps: getProgressSteps,
        update: update,
        _destroy: _destroy
    });

    const handleConfirmButtonClick = (instance) => {
      const innerParams = privateProps.innerParams.get(instance);
      instance.disableButtons();
      if (innerParams.input) {
        handleConfirmOrDenyWithInput(instance, 'confirm');
      } else {
        confirm(instance, true);
      }
    };

    const handleDenyButtonClick = (instance) => {
      const innerParams = privateProps.innerParams.get(instance);
      instance.disableButtons();
      if (innerParams.returnInputValueOnDeny) {
        handleConfirmOrDenyWithInput(instance, 'deny');
      } else {
        deny(instance, false);
      }
    };

    const handleCancelButtonClick = (instance, dismissWith) => {
      instance.disableButtons();
      dismissWith(DismissReason.cancel);
    };

    const handleConfirmOrDenyWithInput = (instance, type /* 'confirm' | 'deny' */) => {
      const innerParams = privateProps.innerParams.get(instance);
      if (!innerParams.input) {
        return error(
          `The "input" parameter is needed to be set when using returnInputValueOn${capitalizeFirstLetter(type)}`
        )
      }
      const inputValue = getInputValue(instance, innerParams);
      if (innerParams.inputValidator) {
        handleInputValidator(instance, inputValue, type);
      } else if (!instance.getInput().checkValidity()) {
        instance.enableButtons();
        instance.showValidationMessage(innerParams.validationMessage);
      } else if (type === 'deny') {
        deny(instance, inputValue);
      } else {
        confirm(instance, inputValue);
      }
    };

    const handleInputValidator = (instance, inputValue, type /* 'confirm' | 'deny' */) => {
      const innerParams = privateProps.innerParams.get(instance);
      instance.disableInput();
      const validationPromise = Promise.resolve().then(() =>
        asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage))
      );
      validationPromise.then((validationMessage) => {
        instance.enableButtons();
        instance.enableInput();
        if (validationMessage) {
          instance.showValidationMessage(validationMessage);
        } else if (type === 'deny') {
          deny(instance, inputValue);
        } else {
          confirm(instance, inputValue);
        }
      });
    };

    const deny = (instance, value) => {
      const innerParams = privateProps.innerParams.get(instance || undefined);

      if (innerParams.showLoaderOnDeny) {
        showLoading(getDenyButton());
      }

      if (innerParams.preDeny) {
        privateProps.awaitingPromise.set(instance || undefined, true); // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preDeny's promise is received
        const preDenyPromise = Promise.resolve().then(() =>
          asPromise(innerParams.preDeny(value, innerParams.validationMessage))
        );
        preDenyPromise
          .then((preDenyValue) => {
            if (preDenyValue === false) {
              instance.hideLoading();
              handleAwaitingPromise(instance);
            } else {
              instance.closePopup({ isDenied: true, value: typeof preDenyValue === 'undefined' ? value : preDenyValue });
            }
          })
          .catch((error) => rejectWith(instance || undefined, error));
      } else {
        instance.closePopup({ isDenied: true, value });
      }
    };

    const succeedWith = (instance, value) => {
      instance.closePopup({ isConfirmed: true, value });
    };

    const rejectWith = (instance, error) => {
      instance.rejectPromise(error);
    };

    const confirm = (instance, value) => {
      const innerParams = privateProps.innerParams.get(instance || undefined);

      if (innerParams.showLoaderOnConfirm) {
        showLoading();
      }

      if (innerParams.preConfirm) {
        instance.resetValidationMessage();
        privateProps.awaitingPromise.set(instance || undefined, true); // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preConfirm's promise is received
        const preConfirmPromise = Promise.resolve().then(() =>
          asPromise(innerParams.preConfirm(value, innerParams.validationMessage))
        );
        preConfirmPromise
          .then((preConfirmValue) => {
            if (isVisible$1(getValidationMessage()) || preConfirmValue === false) {
              instance.hideLoading();
              handleAwaitingPromise(instance);
            } else {
              succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
            }
          })
          .catch((error) => rejectWith(instance || undefined, error));
      } else {
        succeedWith(instance, value);
      }
    };

    const handlePopupClick = (instance, domCache, dismissWith) => {
      const innerParams = privateProps.innerParams.get(instance);
      if (innerParams.toast) {
        handleToastClick(instance, domCache, dismissWith);
      } else {
        // Ignore click events that had mousedown on the popup but mouseup on the container
        // This can happen when the user drags a slider
        handleModalMousedown(domCache);

        // Ignore click events that had mousedown on the container but mouseup on the popup
        handleContainerMousedown(domCache);

        handleModalClick(instance, domCache, dismissWith);
      }
    };

    const handleToastClick = (instance, domCache, dismissWith) => {
      // Closing toast by internal click
      domCache.popup.onclick = () => {
        const innerParams = privateProps.innerParams.get(instance);
        if (innerParams && (isAnyButtonShown(innerParams) || innerParams.timer || innerParams.input)) {
          return
        }
        dismissWith(DismissReason.close);
      };
    };

    /**
     * @param {*} innerParams
     * @returns {boolean}
     */
    const isAnyButtonShown = (innerParams) => {
      return (
        innerParams.showConfirmButton ||
        innerParams.showDenyButton ||
        innerParams.showCancelButton ||
        innerParams.showCloseButton
      )
    };

    let ignoreOutsideClick = false;

    const handleModalMousedown = (domCache) => {
      domCache.popup.onmousedown = () => {
        domCache.container.onmouseup = function (e) {
          domCache.container.onmouseup = undefined;
          // We only check if the mouseup target is the container because usually it doesn't
          // have any other direct children aside of the popup
          if (e.target === domCache.container) {
            ignoreOutsideClick = true;
          }
        };
      };
    };

    const handleContainerMousedown = (domCache) => {
      domCache.container.onmousedown = () => {
        domCache.popup.onmouseup = function (e) {
          domCache.popup.onmouseup = undefined;
          // We also need to check if the mouseup target is a child of the popup
          if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
            ignoreOutsideClick = true;
          }
        };
      };
    };

    const handleModalClick = (instance, domCache, dismissWith) => {
      domCache.container.onclick = (e) => {
        const innerParams = privateProps.innerParams.get(instance);
        if (ignoreOutsideClick) {
          ignoreOutsideClick = false;
          return
        }
        if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
          dismissWith(DismissReason.backdrop);
        }
      };
    };

    const isJqueryElement = (elem) => typeof elem === 'object' && elem.jquery;
    const isElement = (elem) => elem instanceof Element || isJqueryElement(elem);

    const argsToParams = (args) => {
      const params = {};
      if (typeof args[0] === 'object' && !isElement(args[0])) {
        Object.assign(params, args[0]);
      } else {
    ['title', 'html', 'icon'].forEach((name, index) => {
          const arg = args[index];
          if (typeof arg === 'string' || isElement(arg)) {
            params[name] = arg;
          } else if (arg !== undefined) {
            error(`Unexpected type of ${name}! Expected "string" or "Element", got ${typeof arg}`);
          }
        });
      }
      return params
    };

    function fire(...args) {
      const Swal = this; // eslint-disable-line @typescript-eslint/no-this-alias
      return new Swal(...args)
    }

    /**
     * Returns an extended version of `Swal` containing `params` as defaults.
     * Useful for reusing Swal configuration.
     *
     * For example:
     *
     * Before:
     * const textPromptOptions = { input: 'text', showCancelButton: true }
     * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
     * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
     *
     * After:
     * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
     * const {value: firstName} = await TextPrompt('What is your first name?')
     * const {value: lastName} = await TextPrompt('What is your last name?')
     *
     * @param mixinParams
     */
    function mixin(mixinParams) {
      class MixinSwal extends this {
        _main(params, priorityMixinParams) {
          return super._main(params, Object.assign({}, mixinParams, priorityMixinParams))
        }
      }

      return MixinSwal
    }

    /**
     * If `timer` parameter is set, returns number of milliseconds of timer remained.
     * Otherwise, returns undefined.
     */
    const getTimerLeft = () => {
      return globalState.timeout && globalState.timeout.getTimerLeft()
    };

    /**
     * Stop timer. Returns number of milliseconds of timer remained.
     * If `timer` parameter isn't set, returns undefined.
     */
    const stopTimer = () => {
      if (globalState.timeout) {
        stopTimerProgressBar();
        return globalState.timeout.stop()
      }
    };

    /**
     * Resume timer. Returns number of milliseconds of timer remained.
     * If `timer` parameter isn't set, returns undefined.
     */
    const resumeTimer = () => {
      if (globalState.timeout) {
        const remaining = globalState.timeout.start();
        animateTimerProgressBar(remaining);
        return remaining
      }
    };

    /**
     * Resume timer. Returns number of milliseconds of timer remained.
     * If `timer` parameter isn't set, returns undefined.
     */
    const toggleTimer = () => {
      const timer = globalState.timeout;
      return timer && (timer.running ? stopTimer() : resumeTimer())
    };

    /**
     * Increase timer. Returns number of milliseconds of an updated timer.
     * If `timer` parameter isn't set, returns undefined.
     */
    const increaseTimer = (n) => {
      if (globalState.timeout) {
        const remaining = globalState.timeout.increase(n);
        animateTimerProgressBar(remaining, true);
        return remaining
      }
    };

    /**
     * Check if timer is running. Returns true if timer is running
     * or false if timer is paused or stopped.
     * If `timer` parameter isn't set, returns undefined
     */
    const isTimerRunning = () => {
      return globalState.timeout && globalState.timeout.isRunning()
    };

    let bodyClickListenerAdded = false;
    const clickHandlers = {};

    function bindClickHandler(attr = 'data-swal-template') {
      clickHandlers[attr] = this;

      if (!bodyClickListenerAdded) {
        document.body.addEventListener('click', bodyClickListener);
        bodyClickListenerAdded = true;
      }
    }

    const bodyClickListener = (event) => {
      for (let el = event.target; el && el !== document; el = el.parentNode) {
        for (const attr in clickHandlers) {
          const template = el.getAttribute(attr);
          if (template) {
            clickHandlers[attr].fire({ template });
            return
          }
        }
      }
    };

    var staticMethods = /*#__PURE__*/Object.freeze({
        __proto__: null,
        isValidParameter: isValidParameter,
        isUpdatableParameter: isUpdatableParameter,
        isDeprecatedParameter: isDeprecatedParameter,
        argsToParams: argsToParams,
        getContainer: getContainer,
        getPopup: getPopup,
        getTitle: getTitle,
        getHtmlContainer: getHtmlContainer,
        getImage: getImage,
        getIcon: getIcon,
        getInputLabel: getInputLabel,
        getCloseButton: getCloseButton,
        getActions: getActions,
        getConfirmButton: getConfirmButton,
        getDenyButton: getDenyButton,
        getCancelButton: getCancelButton,
        getLoader: getLoader,
        getFooter: getFooter,
        getTimerProgressBar: getTimerProgressBar,
        getFocusableElements: getFocusableElements,
        getValidationMessage: getValidationMessage,
        isLoading: isLoading,
        isVisible: isVisible,
        clickConfirm: clickConfirm,
        clickDeny: clickDeny,
        clickCancel: clickCancel,
        fire: fire,
        mixin: mixin,
        showLoading: showLoading,
        enableLoading: showLoading,
        getTimerLeft: getTimerLeft,
        stopTimer: stopTimer,
        resumeTimer: resumeTimer,
        toggleTimer: toggleTimer,
        increaseTimer: increaseTimer,
        isTimerRunning: isTimerRunning,
        bindClickHandler: bindClickHandler
    });

    let currentInstance;

    class SweetAlert {
      constructor(...args) {
        // Prevent run in Node env
        if (typeof window === 'undefined') {
          return
        }

        currentInstance = this;

        // @ts-ignore
        const outerParams = Object.freeze(this.constructor.argsToParams(args));

        Object.defineProperties(this, {
          params: {
            value: outerParams,
            writable: false,
            enumerable: true,
            configurable: true,
          },
        });

        // @ts-ignore
        const promise = currentInstance._main(currentInstance.params);
        privateProps.promise.set(this, promise);
      }

      _main(userParams, mixinParams = {}) {
        showWarningsForParams(Object.assign({}, mixinParams, userParams));

        if (globalState.currentInstance) {
          // @ts-ignore
          globalState.currentInstance._destroy();
          if (isModal()) {
            unsetAriaHidden();
          }
        }

        globalState.currentInstance = currentInstance;

        const innerParams = prepareParams(userParams, mixinParams);
        setParameters(innerParams);
        Object.freeze(innerParams);

        // clear the previous timer
        if (globalState.timeout) {
          globalState.timeout.stop();
          delete globalState.timeout;
        }

        // clear the restore focus timeout
        clearTimeout(globalState.restoreFocusTimeout);

        const domCache = populateDomCache(currentInstance);

        render(currentInstance, innerParams);

        privateProps.innerParams.set(currentInstance, innerParams);

        return swalPromise(currentInstance, domCache, innerParams)
      }

      // `catch` cannot be the name of a module export, so we define our thenable methods here instead
      then(onFulfilled) {
        const promise = privateProps.promise.get(this);
        return promise.then(onFulfilled)
      }

      finally(onFinally) {
        const promise = privateProps.promise.get(this);
        return promise.finally(onFinally)
      }
    }

    const swalPromise = (instance, domCache, innerParams) => {
      return new Promise((resolve, reject) => {
        // functions to handle all closings/dismissals
        const dismissWith = (dismiss) => {
          instance.closePopup({ isDismissed: true, dismiss });
        };

        privateMethods.swalPromiseResolve.set(instance, resolve);
        privateMethods.swalPromiseReject.set(instance, reject);

        domCache.confirmButton.onclick = () => handleConfirmButtonClick(instance);
        domCache.denyButton.onclick = () => handleDenyButtonClick(instance);
        domCache.cancelButton.onclick = () => handleCancelButtonClick(instance, dismissWith);

        domCache.closeButton.onclick = () => dismissWith(DismissReason.close);

        handlePopupClick(instance, domCache, dismissWith);

        addKeydownHandler(instance, globalState, innerParams, dismissWith);

        handleInputOptionsAndValue(instance, innerParams);

        openPopup(innerParams);

        setupTimer(globalState, innerParams, dismissWith);

        initFocus(domCache, innerParams);

        // Scroll container to top on open (#1247, #1946)
        setTimeout(() => {
          domCache.container.scrollTop = 0;
        });
      })
    };

    const prepareParams = (userParams, mixinParams) => {
      const templateParams = getTemplateParams(userParams);
      const params = Object.assign({}, defaultParams, mixinParams, templateParams, userParams); // precedence is described in #2131
      params.showClass = Object.assign({}, defaultParams.showClass, params.showClass);
      params.hideClass = Object.assign({}, defaultParams.hideClass, params.hideClass);
      return params
    };

    /**
     * @param {SweetAlert2} instance
     * @returns {DomCache}
     */
    const populateDomCache = (instance) => {
      const domCache = {
        popup: getPopup(),
        container: getContainer(),
        actions: getActions(),
        confirmButton: getConfirmButton(),
        denyButton: getDenyButton(),
        cancelButton: getCancelButton(),
        loader: getLoader(),
        closeButton: getCloseButton(),
        validationMessage: getValidationMessage(),
        progressSteps: getProgressSteps$1(),
      };
      privateProps.domCache.set(instance, domCache);

      return domCache
    };

    /**
     * @param {GlobalState} globalState
     * @param {SweetAlertOptions} innerParams
     * @param {function} dismissWith
     */
    const setupTimer = (globalState, innerParams, dismissWith) => {
      const timerProgressBar = getTimerProgressBar();
      hide(timerProgressBar);
      if (innerParams.timer) {
        globalState.timeout = new Timer(() => {
          dismissWith('timer');
          delete globalState.timeout;
        }, innerParams.timer);
        if (innerParams.timerProgressBar) {
          show(timerProgressBar);
          applyCustomClass(timerProgressBar, innerParams, 'timerProgressBar');
          setTimeout(() => {
            if (globalState.timeout && globalState.timeout.running) {
              // timer can be already stopped or unset at this point
              animateTimerProgressBar(innerParams.timer);
            }
          });
        }
      }
    };

    /**
     * @param {DomCache} domCache
     * @param {SweetAlertOptions} innerParams
     */
    const initFocus = (domCache, innerParams) => {
      if (innerParams.toast) {
        return
      }

      if (!callIfFunction(innerParams.allowEnterKey)) {
        return blurActiveElement()
      }

      if (!focusButton(domCache, innerParams)) {
        setFocus(innerParams, -1, 1);
      }
    };

    /**
     * @param {DomCache} domCache
     * @param {SweetAlertOptions} innerParams
     * @returns {boolean}
     */
    const focusButton = (domCache, innerParams) => {
      if (innerParams.focusDeny && isVisible$1(domCache.denyButton)) {
        domCache.denyButton.focus();
        return true
      }

      if (innerParams.focusCancel && isVisible$1(domCache.cancelButton)) {
        domCache.cancelButton.focus();
        return true
      }

      if (innerParams.focusConfirm && isVisible$1(domCache.confirmButton)) {
        domCache.confirmButton.focus();
        return true
      }

      return false
    };

    const blurActiveElement = () => {
      if (document.activeElement instanceof HTMLElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    };

    // Assign instance methods from src/instanceMethods/*.js to prototype
    Object.assign(SweetAlert.prototype, instanceMethods);

    // Assign static methods from src/staticMethods/*.js to constructor
    Object.assign(SweetAlert, staticMethods);

    // Proxy to instance methods to constructor, for now, for backwards compatibility
    Object.keys(instanceMethods).forEach((key) => {
      SweetAlert[key] = function (...args) {
        if (currentInstance) {
          return currentInstance[key](...args)
        }
      };
    });

    SweetAlert.DismissReason = DismissReason;

    SweetAlert.version = '11.4.17';

    const Swal = SweetAlert;
    // @ts-ignore
    Swal.default = Swal;

    var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

    var css = ".swal2-popup.swal2-toast{background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;overflow-y:hidden;padding:1em;pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{font-size:1em;margin:.5em 1em;padding:0;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{font-size:1em;height:2em;margin:.5em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{font-size:.8em;margin:.5em 0 0;padding:.5em 0 0}.swal2-popup.swal2-toast .swal2-close{align-self:center;font-size:2em;grid-column:3/3;grid-row:1/99;height:.8em;margin:0;width:.8em}.swal2-popup.swal2-toast .swal2-html-container{font-size:1em;margin:.5em 1em;padding:0;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{align-self:center;grid-column:1;grid-row:1/99;height:2em;margin:.25em;width:2em}.swal2-popup.swal2-toast .swal2-icon{align-self:center;grid-column:1;grid-row:1/99;height:2em;margin:0 .5em 0 0;min-width:2em;width:2em}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{align-items:center;display:flex;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{height:2em;width:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{height:auto;justify-content:flex-start;margin:.5em 0 0;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{font-size:1em;margin:.25em .5em;padding:.4em .6em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{border-radius:50%;height:3em;position:absolute;transform:rotate(45deg);width:1.6em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{border-radius:4em 0 0 4em;left:-.5em;top:-.8em;transform:rotate(-45deg);transform-origin:2em 2em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{border-radius:0 4em 4em 0;left:.9375em;top:-.25em;transform-origin:0 1.5em}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{height:2em;width:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{height:2.6875em;left:.4375em;top:0;width:.4375em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{left:.1875em;top:1.125em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{right:.1875em;top:.9375em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{-webkit-overflow-scrolling:touch;bottom:0;box-sizing:border-box;display:grid;grid-template-areas:\"top-start     top            top-end\" \"center-start  center         center-end\" \"bottom-start  bottom-center  bottom-end\";grid-template-rows:minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto) minmax(-webkit-min-content,auto);grid-template-rows:minmax(min-content,auto) minmax(min-content,auto) minmax(min-content,auto);height:100%;left:0;overflow-x:hidden;padding:.625em;position:fixed;right:0;top:0;transition:background-color .1s;z-index:1060}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{align-self:start;grid-column:2;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{align-self:start;grid-column:3;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{align-self:center;grid-row:2}.swal2-container.swal2-center>.swal2-popup{align-self:center;grid-column:2;grid-row:2;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{align-self:center;grid-column:3;grid-row:2;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{align-self:end;grid-column:1;grid-row:3}.swal2-container.swal2-bottom>.swal2-popup{align-self:end;grid-column:2;grid-row:3;justify-self:center}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{align-self:end;grid-column:3;grid-row:3;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{align-self:stretch;grid-row:1/4}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{background:#fff;border:none;border-radius:5px;box-sizing:border-box;color:#545454;display:none;font-family:inherit;font-size:1rem;grid-template-columns:minmax(0,100%);max-width:100%;padding:0 0 1.25em;position:relative;width:32em}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{word-wrap:break-word;color:inherit;font-size:1.875em;font-weight:600;margin:0;max-width:100%;padding:.8em 1em 0;position:relative;text-align:center;text-transform:none}.swal2-actions{align-items:center;box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:center;margin:1.25em auto 0;padding:0;width:auto;z-index:1}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{align-items:center;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-color:#2778c4 transparent;border-radius:100%;border-style:solid;border-width:.25em;display:none;height:2.2em;justify-content:center;margin:0 1.875em;width:2.2em}.swal2-styled{box-shadow:0 0 0 3px transparent;font-weight:500;margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{background:initial;background-color:#7066e0;border:0;border-radius:.25em;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{background:initial;background-color:#dc3741;border:0;border-radius:.25em;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{background:initial;background-color:#6e7881;border:0;border-radius:.25em;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px hsla(208,8%,47%,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{border-top:1px solid #eee;color:inherit;font-size:1em;justify-content:center;margin:1em 0 0;padding:1em 1em 0}.swal2-timer-progress-bar-container{border-bottom-left-radius:5px;border-bottom-right-radius:5px;bottom:0;grid-column:auto!important;left:0;overflow:hidden;position:absolute;right:0}.swal2-timer-progress-bar{background:rgba(0,0,0,.2);height:.25em;width:100%}.swal2-image{margin:2em auto 1em;max-width:100%}.swal2-close{align-items:center;background:0 0;border:none;border-radius:5px;color:#ccc;cursor:pointer;font-family:serif;font-family:monospace;font-size:2.5em;height:1.2em;justify-content:center;justify-self:end;margin-bottom:-1.2em;margin-right:0;margin-top:0;overflow:hidden;padding:0;transition:color .1s,box-shadow .1s;width:1.2em;z-index:2}.swal2-close:hover{background:0 0;color:#f27474;transform:none}.swal2-close:focus{box-shadow:inset 0 0 0 3px rgba(100,150,200,.5);outline:0}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{word-wrap:break-word;color:inherit;font-size:1.125em;font-weight:400;justify-content:center;line-height:normal;margin:1em 1.6em .3em;overflow:auto;padding:0;text-align:center;word-break:break-word;z-index:1}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 3px}.swal2-file,.swal2-input,.swal2-textarea{background:0 0;border:1px solid #d9d9d9;border-radius:.1875em;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;box-sizing:border-box;color:inherit;font-size:1.125em;transition:border-color .1s,box-shadow .1s;width:auto}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5);outline:0}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{background:#fff;margin:1em 2em 3px}.swal2-range input{width:80%}.swal2-range output{color:inherit;font-weight:600;text-align:center;width:20%}.swal2-range input,.swal2-range output{font-size:1.125em;height:2.625em;line-height:2.625em;padding:0}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{background:0 0;font-size:1.125em;margin-left:auto;margin-right:auto;width:75%}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{background:0 0;color:inherit;font-size:1.125em;max-width:100%;min-width:50%;padding:.375em .625em}.swal2-checkbox,.swal2-radio{align-items:center;background:#fff;color:inherit;justify-content:center}.swal2-checkbox label,.swal2-radio label{font-size:1.125em;margin:0 .6em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;background:#f0f0f0;color:#666;font-size:1em;font-weight:300;justify-content:center;margin:1em 0 0;overflow:hidden;padding:.625em}.swal2-validation-message:before{background-color:#f27474;border-radius:50%;color:#fff;content:\"!\";display:inline-block;font-weight:600;height:1.5em;line-height:1.5em;margin:0 .625em;min-width:1.5em;text-align:center;width:1.5em}.swal2-icon{border:.25em solid #000;border-radius:50%;box-sizing:content-box;cursor:default;font-family:inherit;height:5em;justify-content:center;line-height:5em;margin:2.5em auto .6em;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:5em}.swal2-icon .swal2-icon-content{align-items:center;display:flex;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{flex-grow:1;position:relative}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{background-color:#f27474;border-radius:.125em;display:block;height:.3125em;position:absolute;top:2.3125em;width:2.9375em}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .5s;animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-i-mark .8s;animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{-webkit-animation:swal2-animate-question-mark .8s;animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{border-radius:50%;height:7.5em;position:absolute;transform:rotate(45deg);width:3.75em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{border-radius:7.5em 0 0 7.5em;left:-2.0635em;top:-.4375em;transform:rotate(-45deg);transform-origin:3.75em 3.75em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{border-radius:0 7.5em 7.5em 0;left:1.875em;top:-.6875em;transform:rotate(-45deg);transform-origin:0 3.75em}.swal2-icon.swal2-success .swal2-success-ring{border:.25em solid hsla(98,55%,69%,.3);border-radius:50%;box-sizing:content-box;height:100%;left:-.25em;position:absolute;top:-.25em;width:100%;z-index:2}.swal2-icon.swal2-success .swal2-success-fix{height:5.625em;left:1.625em;position:absolute;top:.5em;transform:rotate(-45deg);width:.4375em;z-index:1}.swal2-icon.swal2-success [class^=swal2-success-line]{background-color:#a5dc86;border-radius:.125em;display:block;height:.3125em;position:absolute;z-index:2}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{left:.8125em;top:2.875em;transform:rotate(45deg);width:1.5625em}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{right:.5em;top:2.375em;transform:rotate(-45deg);width:2.9375em}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{align-items:center;background:0 0;flex-wrap:wrap;font-weight:600;margin:1.25em auto;max-width:100%;padding:0}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{background:#2778c4;border-radius:2em;color:#fff;flex-shrink:0;height:2em;line-height:2em;text-align:center;width:2em;z-index:20}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{background:#2778c4;flex-shrink:0;height:.4em;margin:0 -1px;width:2.5em;z-index:10}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{height:50px;overflow:scroll;position:absolute;top:-9999px;width:50px}.swal2-rtl .swal2-close{margin-left:0;margin-right:0}.swal2-rtl .swal2-timer-progress-bar{left:auto;right:0}.swal2-no-war{align-items:center;background:#20232a;color:#fff;display:flex;height:3.375em;justify-content:center;left:0;position:fixed;text-align:center;top:0;width:100%;z-index:1061}.swal2-no-war a{color:#61dafb;text-decoration:none}.swal2-no-war a:hover{text-decoration:underline}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotate(2deg)}33%{transform:translateY(0) rotate(-2deg)}66%{transform:translateY(.3125em) rotate(2deg)}to{transform:translateY(0) rotate(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotate(2deg)}33%{transform:translateY(0) rotate(-2deg)}66%{transform:translateY(.3125em) rotate(2deg)}to{transform:translateY(0) rotate(0)}}@-webkit-keyframes swal2-toast-hide{to{opacity:0;transform:rotate(1deg)}}@keyframes swal2-toast-hide{to{opacity:0;transform:rotate(1deg)}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{left:.0625em;top:.5625em;width:0}54%{left:.125em;top:.125em;width:0}70%{left:-.25em;top:.625em;width:1.625em}84%{left:.75em;top:1.0625em;width:.5em}to{left:.1875em;top:1.125em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{left:.0625em;top:.5625em;width:0}54%{left:.125em;top:.125em;width:0}70%{left:-.25em;top:.625em;width:1.625em}84%{left:.75em;top:1.0625em;width:.5em}to{left:.1875em;top:1.125em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{right:1.375em;top:1.625em;width:0}65%{right:.9375em;top:1.25em;width:0}84%{right:0;top:.9375em;width:1.125em}to{right:.1875em;top:.9375em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{right:1.375em;top:1.625em;width:0}65%{right:.9375em;top:1.25em;width:0}84%{right:0;top:.9375em;width:1.125em}to{right:.1875em;top:.9375em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}to{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}to{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.5)}}@keyframes swal2-hide{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.5)}}@-webkit-keyframes swal2-animate-success-line-tip{0%{left:.0625em;top:1.1875em;width:0}54%{left:.125em;top:1.0625em;width:0}70%{left:-.375em;top:2.1875em;width:3.125em}84%{left:1.3125em;top:3em;width:1.0625em}to{left:.8125em;top:2.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{left:.0625em;top:1.1875em;width:0}54%{left:.125em;top:1.0625em;width:0}70%{left:-.375em;top:2.1875em;width:3.125em}84%{left:1.3125em;top:3em;width:1.0625em}to{left:.8125em;top:2.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{right:2.875em;top:3.375em;width:0}65%{right:2.875em;top:3.375em;width:0}84%{right:0;top:2.1875em;width:3.4375em}to{right:.5em;top:2.375em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{right:2.875em;top:3.375em;width:0}65%{right:2.875em;top:3.375em;width:0}84%{right:0;top:2.1875em;width:3.4375em}to{right:.5em;top:2.375em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}to{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}to{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;opacity:0;transform:scale(.4)}50%{margin-top:1.625em;opacity:0;transform:scale(.4)}80%{margin-top:-.375em;transform:scale(1.15)}to{margin-top:0;opacity:1;transform:scale(1)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;opacity:0;transform:scale(.4)}50%{margin-top:1.625em;opacity:0;transform:scale(.4)}80%{margin-top:-.375em;transform:scale(1.15)}to{margin-top:0;opacity:1;transform:scale(1)}}@-webkit-keyframes swal2-animate-error-icon{0%{opacity:0;transform:rotateX(100deg)}to{opacity:1;transform:rotateX(0)}}@keyframes swal2-animate-error-icon{0%{opacity:0;transform:rotateX(100deg)}to{opacity:1;transform:rotateX(0)}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}to{transform:rotate(1turn)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}to{transform:rotate(1turn)}}@-webkit-keyframes swal2-animate-question-mark{0%{transform:rotateY(-1turn)}to{transform:rotateY(0)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-1turn)}to{transform:rotateY(0)}}@-webkit-keyframes swal2-animate-i-mark{0%{opacity:0;transform:rotate(45deg)}25%{opacity:.4;transform:rotate(-25deg)}50%{opacity:.8;transform:rotate(15deg)}75%{opacity:1;transform:rotate(-5deg)}to{opacity:1;transform:rotateX(0)}}@keyframes swal2-animate-i-mark{0%{opacity:0;transform:rotate(45deg)}25%{opacity:.4;transform:rotate(-25deg)}50%{opacity:.8;transform:rotate(15deg)}75%{opacity:1;transform:rotate(-5deg)}to{opacity:1;transform:rotateX(0)}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{background-color:transparent;box-sizing:border-box;max-width:100%;pointer-events:none;width:360px}body.swal2-toast-shown .swal2-container.swal2-top{bottom:auto;left:50%;right:auto;top:0;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{bottom:auto;left:auto;right:0;top:0}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{bottom:auto;left:0;right:auto;top:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{bottom:auto;left:0;right:auto;top:50%;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{bottom:auto;left:50%;right:auto;top:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{bottom:auto;left:auto;right:0;top:50%;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{bottom:0;left:0;right:auto;top:auto}body.swal2-toast-shown .swal2-container.swal2-bottom{bottom:0;left:50%;right:auto;top:auto;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{bottom:0;left:auto;right:0;top:auto}";
    n(css,{});

    var SweetAlertFactory = (function () {
        function SweetAlertFactory() {
            this.queue = [];
        }
        SweetAlertFactory.prototype.success = function (message, title, options) {
            this.flash('success', message, title, options);
        };
        SweetAlertFactory.prototype.info = function (message, title, options) {
            this.flash('info', message, title, options);
        };
        SweetAlertFactory.prototype.warning = function (message, title, options) {
            this.flash('warning', message, title, options);
        };
        SweetAlertFactory.prototype.error = function (message, title, options) {
            this.flash('error', message, title, options);
        };
        SweetAlertFactory.prototype.flash = function (type, message, title, options) {
            var notification = this.createNotification(type, message, title, options);
            this.renderOptions({});
            this.render({ notification: notification });
        };
        SweetAlertFactory.prototype.createNotification = function (type, message, title, options) {
            if (typeof type === 'object') {
                options = type;
                type = options.type;
            }
            if (typeof message === 'object') {
                options = message;
                message = options.message;
            }
            if (typeof title === 'object') {
                options = title;
                title = options.title;
            }
            if (undefined === message) {
                throw new Error('message option is required');
            }
            return {
                type: type || 'info',
                message: message,
                title: title,
                options: options
            };
        };
        SweetAlertFactory.prototype.render = function (envelope) {
            var _a;
            var notification = envelope.notification;
            var options = notification.options;
            notification.type = notification.type || 'info';
            options = __assign(__assign({}, options), { icon: ((options === null || options === void 0 ? void 0 : options.icon) || notification.type), text: ((options === null || options === void 0 ? void 0 : options.text) || notification.message) });
            return (_a = this.swalToastr) === null || _a === void 0 ? void 0 : _a.fire(options).then(function (promise) {
                window.dispatchEvent(new CustomEvent('flasher:sweetalert:promise', {
                    detail: {
                        promise: promise,
                        envelope: envelope
                    }
                }));
            });
        };
        SweetAlertFactory.prototype.renderOptions = function (options) {
            this.swalToastr = this.swalToastr || Swal.mixin(__assign({ timer: (options.timer || 5000), timerProgressBar: (options.timerProgressBar || true) }, options));
        };
        SweetAlertFactory.prototype.addEnvelope = function (envelope) {
            var _a;
            (_a = this.queue) === null || _a === void 0 ? void 0 : _a.push(envelope);
        };
        SweetAlertFactory.prototype.resetQueue = function () {
            this.queue = [];
        };
        SweetAlertFactory.prototype.renderQueue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < this.queue.length)) return [3, 4];
                            return [4, this.render(this.queue[i])];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3, 1];
                        case 4: return [2];
                    }
                });
            });
        };
        return SweetAlertFactory;
    }());

    var sweetalert = new SweetAlertFactory();
    flasher__default["default"].addFactory('sweetalert', sweetalert);

    return sweetalert;

}));
