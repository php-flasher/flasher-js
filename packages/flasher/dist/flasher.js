(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.flasher = factory());
})(this, (function () { 'use strict';

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
    /* global Reflect, Promise */


    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var FlasherFactory = (function () {
        function FlasherFactory(viewFactory) {
            this.options = {
                timeout: 5000,
                fps: 30,
                position: 'top-right',
                direction: 'top',
                rtl: false,
                style: {},
                darkMode: 'media',
            };
            this.viewFactory = viewFactory;
        }
        FlasherFactory.prototype.success = function (message, title, options) {
            this.flash('success', message, title, options);
        };
        FlasherFactory.prototype.info = function (message, title, options) {
            this.flash('info', message, title, options);
        };
        FlasherFactory.prototype.warning = function (message, title, options) {
            this.flash('warning', message, title, options);
        };
        FlasherFactory.prototype.error = function (message, title, options) {
            this.flash('error', message, title, options);
        };
        FlasherFactory.prototype.flash = function (type, message, title, options) {
            var notification = this.createNotification(type, message, title, options);
            this.renderOptions({});
            this.render({ notification: notification });
        };
        FlasherFactory.prototype.createNotification = function (type, message, title, options) {
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
                options: options,
            };
        };
        FlasherFactory.prototype.render = function (envelope) {
            var _this = this;
            var notification = envelope.notification;
            var nOptions = notification.options || {};
            var options = Array.isArray(nOptions) ? this.options : Object.assign({}, this.options, nOptions);
            var onContainerReady = function () {
                var container = _this.createContainer(options);
                _this.addToContainer(container, envelope, options);
            };
            if ('loading' !== document.readyState) {
                onContainerReady();
                return;
            }
            document.addEventListener('DOMContentLoaded', onContainerReady);
        };
        FlasherFactory.prototype.renderOptions = function (options) {
            this.options = Object.assign({}, this.options, options);
            this.applyDarkMode();
        };
        FlasherFactory.prototype.createContainer = function (options) {
            var containerSelector = ".fl-main-container[data-position=\"".concat(options.position, "\"]");
            var container = document.querySelector(containerSelector);
            if (container) {
                container.dataset.turboCache = 'false';
                container.classList.add('fl-no-cache');
                return container;
            }
            container = document.createElement('div');
            container.classList.add('fl-main-container');
            container.dataset.position = options.position;
            container.dataset.turboCache = 'false';
            container.classList.add('fl-no-cache');
            Object.keys(options.style).forEach(function (key) {
                container === null || container === void 0 ? void 0 : container.style.setProperty(key, options.style[key]);
            });
            document.body.append(container);
            return container;
        };
        FlasherFactory.prototype.addToContainer = function (container, envelope, options) {
            var template = this.stringToHTML(envelope.template || this.viewFactory.render(envelope));
            template.classList.add('fl-container');
            this.appendNotification(container, template, options);
            this.renderProgressBar(template, options);
            this.handleClick(template);
        };
        FlasherFactory.prototype.appendNotification = function (container, template, options) {
            if (options.direction === 'bottom') {
                container.append(template);
            }
            else {
                container.prepend(template);
            }
            if (options.rtl) {
                template.classList.add('fl-rtl');
            }
            setTimeout(function () {
                template.classList.add('fl-show');
            }, 100);
        };
        FlasherFactory.prototype.removeNotification = function (template) {
            var container = template.parentElement;
            template.classList.remove('fl-show');
            template.addEventListener('transitionend', function () {
                template.remove();
                if (container.hasChildNodes()) {
                    return;
                }
                container.remove();
            });
        };
        FlasherFactory.prototype.handleClick = function (template) {
            var _this = this;
            template.addEventListener('click', function () { return _this.removeNotification(template); });
        };
        FlasherFactory.prototype.renderProgressBar = function (template, options) {
            var _this = this;
            if (!options.timeout || options.timeout <= 0) {
                return;
            }
            var progressBar = document.createElement('span');
            progressBar.classList.add('fl-progress');
            var progressBarContainer = template.querySelector('.fl-progress-bar');
            if (progressBarContainer) {
                progressBarContainer.append(progressBar);
            }
            var lapse = 1000 / options.fps;
            var width = 0;
            var showProgress = function () {
                width += 1;
                var percent = (1 - lapse * (width / options.timeout)) * 100;
                progressBar.style.width = "".concat(percent, "%");
                if (percent <= 0) {
                    clearInterval(progressInterval);
                    _this.removeNotification(template);
                }
            };
            var progressInterval = window.setInterval(showProgress, lapse);
            template.addEventListener('mouseout', function () { return progressInterval = window.setInterval(showProgress, lapse); });
            template.addEventListener('mouseover', function () { return clearInterval(progressInterval); });
        };
        FlasherFactory.prototype.applyDarkMode = function () {
            if (document.body.classList.contains('fl-dark-mode') || document.querySelector('style.flasher-js')) {
                return;
            }
            var _a = [].concat(this.options.darkMode), mode = _a[0], _b = _a[1], className = _b === void 0 ? '.dark' : _b;
            var css = '.fl-main-container .fl-container.fl-flasher {background-color: rgb(15, 23, 42);color: rgb(255, 255, 255);}';
            css = 'media' === mode
                ? "@media (prefers-color-scheme: dark) {".concat(css, "}")
                : "".concat(className, " ").concat(css);
            var style = document.createElement('style');
            style.type = 'text/css';
            style.classList.add('flasher-js');
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
            document.body.classList.add('fl-dark-mode');
        };
        FlasherFactory.prototype.stringToHTML = function (str) {
            var support = (function () {
                if (!DOMParser) {
                    return false;
                }
                var parser = new DOMParser();
                try {
                    parser.parseFromString('x', 'text/html');
                }
                catch (err) {
                    return false;
                }
                return true;
            })();
            if (support) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(str, 'text/html');
                return doc.body.firstChild;
            }
            var dom = document.createElement('div');
            dom.innerHTML = str;
            return dom.firstElementChild;
        };
        return FlasherFactory;
    }());

    var Flasher = (function () {
        function Flasher() {
            this.defaultHandler = 'theme.flasher';
            this.factories = new Map();
            this.themes = new Map();
        }
        Flasher.prototype.success = function (message, title, options) {
            this.flash('success', message, title, options);
        };
        Flasher.prototype.info = function (message, title, options) {
            this.flash('info', message, title, options);
        };
        Flasher.prototype.warning = function (message, title, options) {
            this.flash('warning', message, title, options);
        };
        Flasher.prototype.error = function (message, title, options) {
            this.flash('error', message, title, options);
        };
        Flasher.prototype.flash = function (type, message, title, options) {
            var notification = this.createNotification(type, message, title, options);
            var factory = this.create(this.defaultHandler);
            factory.renderOptions({});
            factory.render({ notification: notification });
        };
        Flasher.prototype.createNotification = function (type, message, title, options) {
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
                options: options,
            };
        };
        Flasher.prototype.create = function (alias) {
            alias = this.resolveHandler(alias);
            this.resolveThemeHandler(alias);
            var factory = this.factories.get(alias);
            if (!factory) {
                throw new Error("Unable to resolve \"".concat(alias, "\" notification factory, did you forget to register it?"));
            }
            return factory;
        };
        Flasher.prototype.renderOptions = function (options) {
            var _this = this;
            Object.entries(options).forEach(function (_a) {
                var handler = _a[0], option = _a[1];
                _this.create(handler).renderOptions(option);
            });
        };
        Flasher.prototype.render = function (response) {
            var _this = this;
            response = this.resolveResponse(response);
            this.addStyles(response.styles, function () {
                _this.addScripts(response.scripts, function () {
                    _this.renderOptions(response.options);
                    _this.renderEnvelopes(response.envelopes, response.context);
                });
            });
        };
        Flasher.prototype.addFactory = function (name, factory) {
            this.factories.set(name, factory);
        };
        Flasher.prototype.addTheme = function (name, theme) {
            this.themes.set(name, theme);
        };
        Flasher.prototype.using = function (name) {
            this.defaultHandler = name;
            return this;
        };
        Flasher.prototype.addStyles = function (urls, callback) {
            var _this = this;
            if (urls.length === 0) {
                if (typeof callback === 'function') {
                    callback();
                }
                return;
            }
            if (document.querySelector("link[href=\"".concat(urls[0], "\"]")) !== null) {
                this.addStyles(urls.slice(1), callback);
                return;
            }
            var tag = document.createElement('link');
            tag.setAttribute('href', urls[0]);
            tag.setAttribute('type', 'text/css');
            tag.setAttribute('rel', 'stylesheet');
            tag.onload = function () { return _this.addStyles(urls.slice(1), callback); };
            document.head.appendChild(tag);
        };
        Flasher.prototype.addScripts = function (urls, callback) {
            var _this = this;
            if (urls.length === 0) {
                if (typeof callback === 'function') {
                    callback();
                }
                return;
            }
            if (document.querySelector("script[src=\"".concat(urls[0], "\"]")) !== null) {
                this.addScripts(urls.slice(1), callback);
                return;
            }
            var tag = document.createElement('script');
            tag.setAttribute('src', urls[0]);
            tag.setAttribute('type', 'text/javascript');
            tag.onload = function () { return _this.addScripts(urls.slice(1), callback); };
            document.head.appendChild(tag);
        };
        Flasher.prototype.renderEnvelopes = function (envelopes, context) {
            var _this = this;
            var queues = new Map();
            envelopes.forEach(function (envelope) {
                envelope.context = Object.assign({}, envelope.context || {}, context);
                envelope.handler = _this.resolveHandler(envelope.handler);
                var factory = _this.create(envelope.handler);
                if (!_this.isQueueable(factory)) {
                    factory.render(envelope);
                    return;
                }
                if (!queues.get(envelope.handler)) {
                    factory.resetQueue();
                }
                factory.addEnvelope(envelope);
                queues.set(envelope.handler, factory);
            });
            queues.forEach(function (factory) { return factory.renderQueue(); });
        };
        Flasher.prototype.isQueueable = function (object) {
            return typeof object.addEnvelope === 'function'
                && typeof object.renderQueue === 'function';
        };
        Flasher.prototype.resolveResponse = function (response) {
            var _this = this;
            response.envelopes = response.envelopes || [];
            response.options = response.options || {};
            response.scripts = response.scripts || [];
            response.styles = response.styles || [];
            response.context = response.context || {};
            Object.entries(response.options).forEach(function (_a) {
                var handler = _a[0], options = _a[1];
                response.options[handler] = _this.parseOptions(options);
            });
            response.envelopes.forEach(function (envelope) {
                envelope.handler = _this.resolveHandler(envelope.handler);
                envelope.notification.options = _this.parseOptions(envelope.notification.options || {});
                _this.pushStyles(response, envelope.handler);
            });
            return response;
        };
        Flasher.prototype.parseOptions = function (options) {
            var _this = this;
            Object.entries(options).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                options[key] = _this.parseFunction(value);
            });
            return options;
        };
        Flasher.prototype.parseFunction = function (func) {
            var _a, _b;
            if (typeof func !== 'string') {
                return func;
            }
            var match = func.match(/^function(?:.+)?(?:\s+)?\((.+)?\)(?:\s+|\n+)?{(?:\s+|\n+)?((?:.|\n)+)}$/m);
            if (!match) {
                return func;
            }
            var args = (_b = (_a = match[1]) === null || _a === void 0 ? void 0 : _a.split(',').map(function (arg) { return arg.trim(); })) !== null && _b !== void 0 ? _b : [];
            var body = match[2];
            return new (Function.bind.apply(Function, __spreadArray(__spreadArray([void 0], args, false), [body], false)))();
        };
        Flasher.prototype.pushStyles = function (response, handler) {
            var _a;
            handler = handler.replace('theme.', '');
            var styles = ((_a = this.themes.get(handler)) === null || _a === void 0 ? void 0 : _a.styles) || [];
            response.styles = response.styles
                .concat(styles)
                .filter(function (value, index, self) { return self.indexOf(value) === index; });
        };
        Flasher.prototype.resolveHandler = function (handler) {
            handler = handler || this.defaultHandler;
            if (['flasher', 'theme', 'template'].includes(handler)) {
                handler = 'theme.flasher';
            }
            handler = handler.replace('template.', 'theme.');
            return handler;
        };
        Flasher.prototype.resolveThemeHandler = function (alias) {
            var factory = this.factories.get(alias);
            if (factory) {
                return;
            }
            if (0 !== alias.indexOf('theme.')) {
                return;
            }
            var viewFactory = this.themes.get(alias.replace('theme.', ''));
            if (!viewFactory) {
                return;
            }
            this.addFactory(alias, new FlasherFactory(viewFactory));
        };
        return Flasher;
    }());

    var flasher = new Flasher();
    flasher.addTheme('flasher', {
        render: function (envelope) {
            var _a;
            var notification = envelope.notification;
            return '<div class="fl-flasher fl-' + notification.type + '">' +
                '<div class="fl-content">' +
                '<div class="fl-icon"></div>' +
                '<div>' +
                '<strong class="fl-title">' + ((_a = notification.title) !== null && _a !== void 0 ? _a : notification.type) + '</strong>' +
                '<span class="fl-message">' + notification.message + '</span>' +
                '</div>' +
                '</div>' +
                '<span class="fl-progress-bar"></span>' +
                '</div>';
        },
    });

    return flasher;

}));
