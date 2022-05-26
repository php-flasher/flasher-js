(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@flasher/flasher')) :
  typeof define === 'function' && define.amd ? define(['@flasher/flasher'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.flasher = global.flasher || {}, global.flasher.notyf = factory(global.flasher)));
})(this, (function (flasher) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var flasher__default = /*#__PURE__*/_interopDefaultLegacy(flasher);

  var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

  var css$1 = ".notyf__icon--info,.notyf__icon--warning{background:#fff;border-radius:50%;box-sizing:border-box;display:block;height:1em;margin:0 auto;position:relative;width:1em}.notyf__icon--info:after,.notyf__icon--info:before,.notyf__icon--warning:after,.notyf__icon--warning:before{border-width:0;box-sizing:border-box;content:\"\";position:absolute;transition:all 1s}.notyf__icon--info:after,.notyf__icon--info:before{background-color:currentColor;border-radius:.03em;left:50%;transform:translateX(-50%);width:.15em}.notyf__icon--info:before{height:.38em;top:.4em}.notyf__icon--info:after{box-shadow:-.06em .19em,-.06em .44em,.06em .44em;height:.13em;top:.21em}.notyf__icon--warning:after,.notyf__icon--warning:before{background-color:currentColor;border-radius:.03em;left:50%;transform:translateX(-50%);width:.15em}.notyf__icon--warning:before{height:.38em;top:.21em}.notyf__icon--warning:after{height:.13em;top:.65em}";
  n(css$1,{});

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

  var __assign$1 = function() {
      __assign$1 = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign$1.apply(this, arguments);
  };

  /*! *****************************************************************************
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

  var NotyfNotification = /** @class */ (function () {
      function NotyfNotification(options) {
          this.options = options;
          this.listeners = {};
      }
      NotyfNotification.prototype.on = function (eventType, cb) {
          var callbacks = this.listeners[eventType] || [];
          this.listeners[eventType] = callbacks.concat([cb]);
      };
      NotyfNotification.prototype.triggerEvent = function (eventType, event) {
          var _this = this;
          var callbacks = this.listeners[eventType] || [];
          callbacks.forEach(function (cb) { return cb({ target: _this, event: event }); });
      };
      return NotyfNotification;
  }());
  var NotyfArrayEvent;
  (function (NotyfArrayEvent) {
      NotyfArrayEvent[NotyfArrayEvent["Add"] = 0] = "Add";
      NotyfArrayEvent[NotyfArrayEvent["Remove"] = 1] = "Remove";
  })(NotyfArrayEvent || (NotyfArrayEvent = {}));
  var NotyfArray = /** @class */ (function () {
      function NotyfArray() {
          this.notifications = [];
      }
      NotyfArray.prototype.push = function (elem) {
          this.notifications.push(elem);
          this.updateFn(elem, NotyfArrayEvent.Add, this.notifications);
      };
      NotyfArray.prototype.splice = function (index, num) {
          var elem = this.notifications.splice(index, num)[0];
          this.updateFn(elem, NotyfArrayEvent.Remove, this.notifications);
          return elem;
      };
      NotyfArray.prototype.indexOf = function (elem) {
          return this.notifications.indexOf(elem);
      };
      NotyfArray.prototype.onUpdate = function (fn) {
          this.updateFn = fn;
      };
      return NotyfArray;
  }());

  var NotyfEvent;
  (function (NotyfEvent) {
      NotyfEvent["Dismiss"] = "dismiss";
      NotyfEvent["Click"] = "click";
  })(NotyfEvent || (NotyfEvent = {}));
  var DEFAULT_OPTIONS = {
      types: [
          {
              type: 'success',
              className: 'notyf__toast--success',
              backgroundColor: '#3dc763',
              icon: {
                  className: 'notyf__icon--success',
                  tagName: 'i',
              },
          },
          {
              type: 'error',
              className: 'notyf__toast--error',
              backgroundColor: '#ed3d3d',
              icon: {
                  className: 'notyf__icon--error',
                  tagName: 'i',
              },
          },
      ],
      duration: 2000,
      ripple: true,
      position: {
          x: 'right',
          y: 'bottom',
      },
      dismissible: false,
  };

  var NotyfView = /** @class */ (function () {
      function NotyfView() {
          this.notifications = [];
          this.events = {};
          this.X_POSITION_FLEX_MAP = {
              left: 'flex-start',
              center: 'center',
              right: 'flex-end',
          };
          this.Y_POSITION_FLEX_MAP = {
              top: 'flex-start',
              center: 'center',
              bottom: 'flex-end',
          };
          // Creates the main notifications container
          var docFrag = document.createDocumentFragment();
          var notyfContainer = this._createHTMLElement({ tagName: 'div', className: 'notyf' });
          docFrag.appendChild(notyfContainer);
          document.body.appendChild(docFrag);
          this.container = notyfContainer;
          // Identifies the main animation end event
          this.animationEndEventName = this._getAnimationEndEventName();
          this._createA11yContainer();
      }
      NotyfView.prototype.on = function (event, cb) {
          var _a;
          this.events = __assign(__assign({}, this.events), (_a = {}, _a[event] = cb, _a));
      };
      NotyfView.prototype.update = function (notification, type) {
          if (type === NotyfArrayEvent.Add) {
              this.addNotification(notification);
          }
          else if (type === NotyfArrayEvent.Remove) {
              this.removeNotification(notification);
          }
      };
      NotyfView.prototype.removeNotification = function (notification) {
          var _this = this;
          var renderedNotification = this._popRenderedNotification(notification);
          var node;
          if (!renderedNotification) {
              return;
          }
          node = renderedNotification.node;
          node.classList.add('notyf__toast--disappear');
          var handleEvent;
          node.addEventListener(this.animationEndEventName, (handleEvent = function (event) {
              if (event.target === node) {
                  node.removeEventListener(_this.animationEndEventName, handleEvent);
                  _this.container.removeChild(node);
              }
          }));
      };
      NotyfView.prototype.addNotification = function (notification) {
          var node = this._renderNotification(notification);
          this.notifications.push({ notification: notification, node: node });
          // For a11y purposes, we still want to announce that there's a notification in the screen
          // even if it comes with no message.
          this._announce(notification.options.message || 'Notification');
      };
      NotyfView.prototype._renderNotification = function (notification) {
          var _a;
          var card = this._buildNotificationCard(notification);
          var className = notification.options.className;
          if (className) {
              (_a = card.classList).add.apply(_a, className.split(' '));
          }
          this.container.appendChild(card);
          return card;
      };
      NotyfView.prototype._popRenderedNotification = function (notification) {
          var idx = -1;
          for (var i = 0; i < this.notifications.length && idx < 0; i++) {
              if (this.notifications[i].notification === notification) {
                  idx = i;
              }
          }
          if (idx !== -1) {
              return this.notifications.splice(idx, 1)[0];
          }
          return;
      };
      NotyfView.prototype.getXPosition = function (options) {
          var _a;
          return ((_a = options === null || options === void 0 ? void 0 : options.position) === null || _a === void 0 ? void 0 : _a.x) || 'right';
      };
      NotyfView.prototype.getYPosition = function (options) {
          var _a;
          return ((_a = options === null || options === void 0 ? void 0 : options.position) === null || _a === void 0 ? void 0 : _a.y) || 'bottom';
      };
      NotyfView.prototype.adjustContainerAlignment = function (options) {
          var align = this.X_POSITION_FLEX_MAP[this.getXPosition(options)];
          var justify = this.Y_POSITION_FLEX_MAP[this.getYPosition(options)];
          var style = this.container.style;
          style.setProperty('justify-content', justify);
          style.setProperty('align-items', align);
      };
      NotyfView.prototype._buildNotificationCard = function (notification) {
          var _this = this;
          var options = notification.options;
          var iconOpts = options.icon;
          // Adjust container according to position (e.g. top-left, bottom-center, etc)
          this.adjustContainerAlignment(options);
          // Create elements
          var notificationElem = this._createHTMLElement({ tagName: 'div', className: 'notyf__toast' });
          var ripple = this._createHTMLElement({ tagName: 'div', className: 'notyf__ripple' });
          var wrapper = this._createHTMLElement({ tagName: 'div', className: 'notyf__wrapper' });
          var message = this._createHTMLElement({ tagName: 'div', className: 'notyf__message' });
          message.innerHTML = options.message || '';
          var mainColor = options.background || options.backgroundColor;
          // Build the icon and append it to the card
          if (iconOpts) {
              var iconContainer = this._createHTMLElement({ tagName: 'div', className: 'notyf__icon' });
              if (typeof iconOpts === 'string' || iconOpts instanceof String)
                  iconContainer.innerHTML = new String(iconOpts).valueOf();
              if (typeof iconOpts === 'object') {
                  var _a = iconOpts.tagName, tagName = _a === void 0 ? 'i' : _a, className_1 = iconOpts.className, text = iconOpts.text, _b = iconOpts.color, color = _b === void 0 ? mainColor : _b;
                  var iconElement = this._createHTMLElement({ tagName: tagName, className: className_1, text: text });
                  if (color)
                      iconElement.style.color = color;
                  iconContainer.appendChild(iconElement);
              }
              wrapper.appendChild(iconContainer);
          }
          wrapper.appendChild(message);
          notificationElem.appendChild(wrapper);
          // Add ripple if applicable, else just paint the full toast
          if (mainColor) {
              if (options.ripple) {
                  ripple.style.background = mainColor;
                  notificationElem.appendChild(ripple);
              }
              else {
                  notificationElem.style.background = mainColor;
              }
          }
          // Add dismiss button
          if (options.dismissible) {
              var dismissWrapper = this._createHTMLElement({ tagName: 'div', className: 'notyf__dismiss' });
              var dismissButton = this._createHTMLElement({
                  tagName: 'button',
                  className: 'notyf__dismiss-btn',
              });
              dismissWrapper.appendChild(dismissButton);
              wrapper.appendChild(dismissWrapper);
              notificationElem.classList.add("notyf__toast--dismissible");
              dismissButton.addEventListener('click', function (event) {
                  var _a, _b;
                  (_b = (_a = _this.events)[NotyfEvent.Dismiss]) === null || _b === void 0 ? void 0 : _b.call(_a, { target: notification, event: event });
                  event.stopPropagation();
              });
          }
          notificationElem.addEventListener('click', function (event) { var _a, _b; return (_b = (_a = _this.events)[NotyfEvent.Click]) === null || _b === void 0 ? void 0 : _b.call(_a, { target: notification, event: event }); });
          // Adjust margins depending on whether its an upper or lower notification
          var className = this.getYPosition(options) === 'top' ? 'upper' : 'lower';
          notificationElem.classList.add("notyf__toast--" + className);
          return notificationElem;
      };
      NotyfView.prototype._createHTMLElement = function (_a) {
          var tagName = _a.tagName, className = _a.className, text = _a.text;
          var elem = document.createElement(tagName);
          if (className) {
              elem.className = className;
          }
          elem.textContent = text || null;
          return elem;
      };
      /**
       * Creates an invisible container which will announce the notyfs to
       * screen readers
       */
      NotyfView.prototype._createA11yContainer = function () {
          var a11yContainer = this._createHTMLElement({ tagName: 'div', className: 'notyf-announcer' });
          a11yContainer.setAttribute('aria-atomic', 'true');
          a11yContainer.setAttribute('aria-live', 'polite');
          // Set the a11y container to be visible hidden. Can't use display: none as
          // screen readers won't read it.
          a11yContainer.style.border = '0';
          a11yContainer.style.clip = 'rect(0 0 0 0)';
          a11yContainer.style.height = '1px';
          a11yContainer.style.margin = '-1px';
          a11yContainer.style.overflow = 'hidden';
          a11yContainer.style.padding = '0';
          a11yContainer.style.position = 'absolute';
          a11yContainer.style.width = '1px';
          a11yContainer.style.outline = '0';
          document.body.appendChild(a11yContainer);
          this.a11yContainer = a11yContainer;
      };
      /**
       * Announces a message to screenreaders.
       */
      NotyfView.prototype._announce = function (message) {
          var _this = this;
          this.a11yContainer.textContent = '';
          // This 100ms timeout is necessary for some browser + screen-reader combinations:
          // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
          // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
          //   second time without clearing and then using a non-zero delay.
          // (using JAWS 17 at time of this writing).
          // https://github.com/angular/material2/blob/master/src/cdk/a11y/live-announcer/live-announcer.ts
          setTimeout(function () {
              _this.a11yContainer.textContent = message;
          }, 100);
      };
      /**
       * Determine which animationend event is supported
       */
      NotyfView.prototype._getAnimationEndEventName = function () {
          var el = document.createElement('_fake');
          var transitions = {
              MozTransition: 'animationend',
              OTransition: 'oAnimationEnd',
              WebkitTransition: 'webkitAnimationEnd',
              transition: 'animationend',
          };
          var t;
          for (t in transitions) {
              if (el.style[t] !== undefined) {
                  return transitions[t];
              }
          }
          // No supported animation end event. Using "animationend" as a fallback
          return 'animationend';
      };
      return NotyfView;
  }());

  /**
   * Main controller class. Defines the main Notyf API.
   */
  var Notyf = /** @class */ (function () {
      function Notyf(opts) {
          var _this = this;
          this.dismiss = this._removeNotification;
          this.notifications = new NotyfArray();
          this.view = new NotyfView();
          var types = this.registerTypes(opts);
          this.options = __assign(__assign({}, DEFAULT_OPTIONS), opts);
          this.options.types = types;
          this.notifications.onUpdate(function (elem, type) { return _this.view.update(elem, type); });
          this.view.on(NotyfEvent.Dismiss, function (_a) {
              var target = _a.target, event = _a.event;
              _this._removeNotification(target);
              // tslint:disable-next-line: no-string-literal
              target['triggerEvent'](NotyfEvent.Dismiss, event);
          });
          // tslint:disable-next-line: no-string-literal
          this.view.on(NotyfEvent.Click, function (_a) {
              var target = _a.target, event = _a.event;
              return target['triggerEvent'](NotyfEvent.Click, event);
          });
      }
      Notyf.prototype.error = function (payload) {
          var options = this.normalizeOptions('error', payload);
          return this.open(options);
      };
      Notyf.prototype.success = function (payload) {
          var options = this.normalizeOptions('success', payload);
          return this.open(options);
      };
      Notyf.prototype.open = function (options) {
          var defaultOpts = this.options.types.find(function (_a) {
              var type = _a.type;
              return type === options.type;
          }) || {};
          var config = __assign(__assign({}, defaultOpts), options);
          this.assignProps(['ripple', 'position', 'dismissible'], config);
          var notification = new NotyfNotification(config);
          this._pushNotification(notification);
          return notification;
      };
      Notyf.prototype.dismissAll = function () {
          while (this.notifications.splice(0, 1))
              ;
      };
      /**
       * Assigns properties to a config object based on two rules:
       * 1. If the config object already sets that prop, leave it as so
       * 2. Otherwise, use the default prop from the global options
       *
       * It's intended to build the final config object to open a notification. e.g. if
       * 'dismissible' is not set, then use the value from the global config.
       *
       * @param props - properties to be assigned to the config object
       * @param config - object whose properties need to be set
       */
      Notyf.prototype.assignProps = function (props, config) {
          var _this = this;
          props.forEach(function (prop) {
              // intentional double equality to check for both null and undefined
              config[prop] = config[prop] == null ? _this.options[prop] : config[prop];
          });
      };
      Notyf.prototype._pushNotification = function (notification) {
          var _this = this;
          this.notifications.push(notification);
          var duration = notification.options.duration !== undefined ? notification.options.duration : this.options.duration;
          if (duration) {
              setTimeout(function () { return _this._removeNotification(notification); }, duration);
          }
      };
      Notyf.prototype._removeNotification = function (notification) {
          var index = this.notifications.indexOf(notification);
          if (index !== -1) {
              this.notifications.splice(index, 1);
          }
      };
      Notyf.prototype.normalizeOptions = function (type, payload) {
          var options = { type: type };
          if (typeof payload === 'string') {
              options.message = payload;
          }
          else if (typeof payload === 'object') {
              options = __assign(__assign({}, options), payload);
          }
          return options;
      };
      Notyf.prototype.registerTypes = function (opts) {
          var incomingTypes = ((opts && opts.types) || []).slice();
          var finalDefaultTypes = DEFAULT_OPTIONS.types.map(function (defaultType) {
              // find if there's a default type within the user input's types, if so, it means the user
              // wants to change some of the default settings
              var userTypeIdx = -1;
              incomingTypes.forEach(function (t, idx) {
                  if (t.type === defaultType.type)
                      userTypeIdx = idx;
              });
              var userType = userTypeIdx !== -1 ? incomingTypes.splice(userTypeIdx, 1)[0] : {};
              return __assign(__assign({}, defaultType), userType);
          });
          return finalDefaultTypes.concat(incomingTypes);
      };
      return Notyf;
  }());

  var css = "@-webkit-keyframes notyf-fadeinup{0%{opacity:0;transform:translateY(25%)}to{opacity:1;transform:translateY(0)}}@keyframes notyf-fadeinup{0%{opacity:0;transform:translateY(25%)}to{opacity:1;transform:translateY(0)}}@-webkit-keyframes notyf-fadeinleft{0%{opacity:0;transform:translateX(25%)}to{opacity:1;transform:translateX(0)}}@keyframes notyf-fadeinleft{0%{opacity:0;transform:translateX(25%)}to{opacity:1;transform:translateX(0)}}@-webkit-keyframes notyf-fadeoutright{0%{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(25%)}}@keyframes notyf-fadeoutright{0%{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(25%)}}@-webkit-keyframes notyf-fadeoutdown{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(25%)}}@keyframes notyf-fadeoutdown{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(25%)}}@-webkit-keyframes ripple{0%{transform:scale(0) translateY(-45%) translateX(13%)}to{transform:scale(1) translateY(-45%) translateX(13%)}}@keyframes ripple{0%{transform:scale(0) translateY(-45%) translateX(13%)}to{transform:scale(1) translateY(-45%) translateX(13%)}}.notyf{align-items:flex-end;box-sizing:border-box;color:#fff;display:flex;flex-direction:column;height:100%;justify-content:flex-end;left:0;padding:20px;pointer-events:none;position:fixed;top:0;width:100%;z-index:9999}.notyf__icon--error,.notyf__icon--success{background:#fff;border-radius:50%;display:block;height:21px;margin:0 auto;position:relative;width:21px}.notyf__icon--error:after,.notyf__icon--error:before{background:currentColor;border-radius:3px;content:\"\";display:block;height:12px;left:9px;position:absolute;top:5px;width:3px}.notyf__icon--error:after{transform:rotate(-45deg)}.notyf__icon--error:before{transform:rotate(45deg)}.notyf__icon--success:after,.notyf__icon--success:before{background:currentColor;border-radius:3px;content:\"\";display:block;position:absolute;width:3px}.notyf__icon--success:after{height:6px;left:6px;top:9px;transform:rotate(-45deg)}.notyf__icon--success:before{height:11px;left:10px;top:5px;transform:rotate(45deg)}.notyf__toast{-webkit-animation:notyf-fadeinup .3s ease-in forwards;animation:notyf-fadeinup .3s ease-in forwards;border-radius:2px;box-shadow:0 3px 7px 0 rgba(0,0,0,.25);box-sizing:border-box;display:block;flex-shrink:0;max-width:300px;overflow:hidden;padding:0 15px;pointer-events:auto;position:relative;transform:translateY(25%)}.notyf__toast--disappear{-webkit-animation:notyf-fadeoutdown .3s forwards;animation:notyf-fadeoutdown .3s forwards;-webkit-animation-delay:.25s;animation-delay:.25s;transform:translateY(0)}.notyf__toast--disappear .notyf__icon,.notyf__toast--disappear .notyf__message{-webkit-animation:notyf-fadeoutdown .3s forwards;animation:notyf-fadeoutdown .3s forwards;opacity:1;transform:translateY(0)}.notyf__toast--disappear .notyf__dismiss{-webkit-animation:notyf-fadeoutright .3s forwards;animation:notyf-fadeoutright .3s forwards;opacity:1;transform:translateX(0)}.notyf__toast--disappear .notyf__message{-webkit-animation-delay:.05s;animation-delay:.05s}.notyf__toast--upper{margin-bottom:20px}.notyf__toast--lower{margin-top:20px}.notyf__toast--dismissible .notyf__wrapper{padding-right:30px}.notyf__ripple{-webkit-animation:ripple .4s ease-out forwards;animation:ripple .4s ease-out forwards;border-radius:50%;height:400px;position:absolute;right:0;top:0;transform:scale(0) translateY(-51%) translateX(13%);transform-origin:bottom right;width:400px;z-index:5}.notyf__wrapper{align-items:center;border-radius:3px;display:flex;padding-bottom:17px;padding-right:15px;padding-top:17px;position:relative;z-index:10}.notyf__icon{-webkit-animation:notyf-fadeinup .3s forwards;animation:notyf-fadeinup .3s forwards;-webkit-animation-delay:.3s;animation-delay:.3s;font-size:1.3em;margin-right:13px;opacity:0;text-align:center;width:22px}.notyf__dismiss{-webkit-animation:notyf-fadeinleft .3s forwards;animation:notyf-fadeinleft .3s forwards;-webkit-animation-delay:.35s;animation-delay:.35s;height:100%;margin-right:-15px;opacity:0;position:absolute;right:0;top:0;width:26px}.notyf__dismiss-btn{background-color:rgba(0,0,0,.25);border:none;cursor:pointer;height:100%;opacity:.35;outline:none;transition:opacity .2s ease,background-color .2s ease;width:100%}.notyf__dismiss-btn:after,.notyf__dismiss-btn:before{background:#fff;border-radius:3px;content:\"\";height:12px;left:calc(50% - 1px);position:absolute;top:calc(50% - 5px);width:2px}.notyf__dismiss-btn:after{transform:rotate(-45deg)}.notyf__dismiss-btn:before{transform:rotate(45deg)}.notyf__dismiss-btn:hover{background-color:rgba(0,0,0,.15);opacity:.7}.notyf__dismiss-btn:active{opacity:.8}.notyf__message{-webkit-animation:notyf-fadeinup .3s forwards;animation:notyf-fadeinup .3s forwards;-webkit-animation-delay:.25s;animation-delay:.25s;line-height:1.5em;opacity:0;position:relative;vertical-align:middle}@media only screen and (max-width:480px){.notyf{padding:0}.notyf__ripple{-webkit-animation-duration:.5s;animation-duration:.5s;height:600px;width:600px}.notyf__toast{border-radius:0;box-shadow:0 -2px 7px 0 rgba(0,0,0,.13);max-width:none;width:100%}.notyf__dismiss{width:56px}}";
  n(css,{});

  var NotyfFactory = (function () {
      function NotyfFactory() {
      }
      NotyfFactory.prototype.success = function (message, title, options) {
          this.flash('success', message, title, options);
      };
      NotyfFactory.prototype.info = function (message, title, options) {
          this.flash('info', message, title, options);
      };
      NotyfFactory.prototype.warning = function (message, title, options) {
          this.flash('warning', message, title, options);
      };
      NotyfFactory.prototype.error = function (message, title, options) {
          this.flash('error', message, title, options);
      };
      NotyfFactory.prototype.flash = function (type, message, title, options) {
          var notification = this.createNotification(type, message, title, options);
          this.renderOptions({});
          this.render({ notification: notification });
      };
      NotyfFactory.prototype.createNotification = function (type, message, title, options) {
          if (typeof type === 'object') {
              options = type;
              type = options.type;
              message = options.message;
              title = options.title;
          }
          else if (typeof message === 'object') {
              options = message;
              message = options.message;
              title = options.title;
          }
          else if (typeof title === 'object') {
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
      NotyfFactory.prototype.render = function (envelope) {
          var notification = envelope.notification;
          notification.type = notification.type || 'info';
          var options = __assign$1(__assign$1({}, notification), notification.options);
          this.notyf = this.notyf || new Notyf();
          this.notyf.open(options);
      };
      NotyfFactory.prototype.renderOptions = function (options) {
          var nOptions = __assign$1({ duration: options.duration || 5000 }, options);
          nOptions.types = nOptions.types || [];
          nOptions.types.push({
              type: 'info',
              className: 'notyf__toast--info',
              backgroundColor: '#5784E5',
              icon: {
                  className: 'notyf__icon--info',
                  tagName: 'i'
              }
          });
          nOptions.types.push({
              type: 'warning',
              className: 'notyf__toast--warning',
              backgroundColor: '#E3A008',
              icon: {
                  className: 'notyf__icon--warning',
                  tagName: 'i'
              }
          });
          this.notyf = this.notyf || new Notyf(nOptions);
      };
      return NotyfFactory;
  }());

  var notyf = new NotyfFactory();
  flasher__default["default"].addFactory('notyf', notyf);

  return notyf;

}));
