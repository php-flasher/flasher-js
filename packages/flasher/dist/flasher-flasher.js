(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.flasher = factory());
})(this, (function () { 'use strict';

    class FlasherFactory {
        constructor(viewFactory) {
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
        success(message, title, options) {
            this.flash('success', message, title, options);
        }
        info(message, title, options) {
            this.flash('info', message, title, options);
        }
        warning(message, title, options) {
            this.flash('warning', message, title, options);
        }
        error(message, title, options) {
            this.flash('error', message, title, options);
        }
        flash(type, message, title, options) {
            const notification = this.createNotification(type, message, title, options);
            this.renderOptions({});
            this.render({ notification });
        }
        createNotification(type, message, title, options) {
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
                message,
                title,
                options,
            };
        }
        render(envelope) {
            const { notification } = envelope;
            const nOptions = notification.options || {};
            const options = Array.isArray(nOptions) ? this.options : Object.assign(Object.assign({}, this.options), nOptions);
            const onContainerReady = () => {
                const container = this.createContainer(options);
                this.addToContainer(container, envelope, options);
            };
            if ('loading' !== document.readyState) {
                onContainerReady();
                return;
            }
            document.addEventListener('DOMContentLoaded', onContainerReady);
        }
        renderOptions(options) {
            this.options = Object.assign(Object.assign({}, this.options), options);
            this.applyDarkMode();
        }
        createContainer(options) {
            const containerSelector = `.fl-main-container[data-position="${options.position}"]`;
            let container = document.querySelector(containerSelector);
            if (container) {
                container.dataset.turboCache = 'false';
                return container;
            }
            container = document.createElement('div');
            container.classList.add('fl-main-container');
            container.dataset.position = options.position;
            container.dataset.turboCache = 'false';
            Object.keys(options.style).forEach((key) => {
                container === null || container === void 0 ? void 0 : container.style.setProperty(key, options.style[key]);
            });
            document.body.append(container);
            return container;
        }
        addToContainer(container, envelope, options) {
            const template = this.stringToHTML(envelope.template || this.viewFactory.render(envelope));
            template.classList.add('fl-container');
            this.appendNotification(container, template, options);
            this.renderProgressBar(template, options);
            this.handleClick(template);
        }
        appendNotification(container, template, options) {
            if (options.direction === 'bottom') {
                container.append(template);
            }
            else {
                container.prepend(template);
            }
            if (options.rtl) {
                template.classList.add('fl-rtl');
            }
            setTimeout(() => {
                template.classList.add('fl-show');
            }, 100);
        }
        removeNotification(template) {
            const container = template.parentElement;
            template.classList.remove('fl-show');
            template.addEventListener('transitionend', () => {
                template.remove();
                if (container.hasChildNodes()) {
                    return;
                }
                container.remove();
            });
        }
        handleClick(template) {
            template.addEventListener('click', () => this.removeNotification(template));
        }
        renderProgressBar(template, options) {
            if (!options.timeout || options.timeout <= 0) {
                return;
            }
            const progressBar = document.createElement('span');
            progressBar.classList.add('fl-progress');
            const progressBarContainer = template.querySelector('.fl-progress-bar');
            if (progressBarContainer) {
                progressBarContainer.append(progressBar);
            }
            const lapse = 1000 / options.fps;
            let width = 0;
            const showProgress = () => {
                width += 1;
                const percent = (1 - lapse * (width / options.timeout)) * 100;
                progressBar.style.width = `${percent}%`;
                if (percent <= 0) {
                    clearInterval(progressInterval);
                    this.removeNotification(template);
                }
            };
            let progressInterval = window.setInterval(showProgress, lapse);
            template.addEventListener('mouseout', () => (progressInterval = window.setInterval(showProgress, lapse)));
            template.addEventListener('mouseover', () => clearInterval(progressInterval));
        }
        applyDarkMode() {
            if (document.body.classList.contains('fl-dark-mode') || document.querySelector('style.flasher-js')) {
                return;
            }
            const [mode, className = '.dark'] = [].concat(this.options.darkMode);
            let css = '.fl-main-container .fl-container.fl-flasher {background-color: rgb(15, 23, 42);color: rgb(255, 255, 255);}';
            css = mode === 'media' ? `@media (prefers-color-scheme: dark) {${css}}` : `${className} ${css}`;
            const style = document.createElement('style');
            style.type = 'text/css';
            style.classList.add('flasher-js');
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
            document.body.classList.add('fl-dark-mode');
        }
        stringToHTML(str) {
            const support = (() => {
                if (!DOMParser) {
                    return false;
                }
                const parser = new DOMParser();
                try {
                    parser.parseFromString('x', 'text/html');
                }
                catch (err) {
                    return false;
                }
                return true;
            })();
            if (support) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(str, 'text/html');
                return doc.body.firstChild;
            }
            const dom = document.createElement('div');
            dom.innerHTML = str;
            return dom.firstElementChild;
        }
    }

    class Flasher {
        constructor() {
            this.defaultHandler = 'theme.flasher';
            this.factories = new Map();
            this.themes = new Map();
        }
        success(message, title, options) {
            this.flash('success', message, title, options);
        }
        info(message, title, options) {
            this.flash('info', message, title, options);
        }
        warning(message, title, options) {
            this.flash('warning', message, title, options);
        }
        error(message, title, options) {
            this.flash('error', message, title, options);
        }
        flash(type, message, title, options) {
            const notification = this.createNotification(type, message, title, options);
            const factory = this.create(this.defaultHandler);
            factory.renderOptions({});
            factory.render({ notification });
        }
        createNotification(type, message, title, options) {
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
                message,
                title,
                options,
            };
        }
        create(alias) {
            alias = this.resolveHandler(alias);
            this.resolveThemeHandler(alias);
            const factory = this.factories.get(alias);
            if (!factory) {
                throw new Error(`Unable to resolve "${alias}" notification factory, did you forget to register it?`);
            }
            return factory;
        }
        renderOptions(options) {
            Object.entries(options).forEach(([handler, option]) => {
                this.create(handler).renderOptions(option);
            });
        }
        render(response) {
            response = this.resolveResponse(response);
            this.addStyles(response.styles, () => {
                this.addScripts(response.scripts, () => {
                    this.renderOptions(response.options);
                    this.renderEnvelopes(response.envelopes, response.context);
                });
            });
        }
        addFactory(name, factory) {
            this.factories.set(name, factory);
        }
        addTheme(name, theme) {
            this.themes.set(name, theme);
        }
        using(name) {
            this.defaultHandler = name;
            return this;
        }
        addStyles(urls, callback) {
            if (urls.length === 0) {
                if (typeof callback === 'function') {
                    callback();
                }
                return;
            }
            if (document.querySelector(`link[href="${urls[0]}"]`) !== null) {
                this.addStyles(urls.slice(1), callback);
                return;
            }
            const tag = document.createElement('link');
            tag.setAttribute('href', urls[0]);
            tag.setAttribute('type', 'text/css');
            tag.setAttribute('rel', 'stylesheet');
            tag.onload = () => this.addStyles(urls.slice(1), callback);
            document.head.appendChild(tag);
        }
        addScripts(urls, callback) {
            if (urls.length === 0) {
                if (typeof callback === 'function') {
                    callback();
                }
                return;
            }
            if (document.querySelector(`script[src="${urls[0]}"]`) !== null) {
                this.addScripts(urls.slice(1), callback);
                return;
            }
            const tag = document.createElement('script');
            tag.setAttribute('src', urls[0]);
            tag.setAttribute('type', 'text/javascript');
            tag.onload = () => this.addScripts(urls.slice(1), callback);
            document.head.appendChild(tag);
        }
        renderEnvelopes(envelopes, context) {
            const queues = new Map();
            envelopes.forEach((envelope) => {
                envelope.context = Object.assign(Object.assign({}, envelope.context), context);
                envelope.handler = this.resolveHandler(envelope.handler);
                const factory = this.create(envelope.handler);
                if (!this.isQueueable(factory)) {
                    factory.render(envelope);
                    return;
                }
                if (!queues.get(envelope.handler)) {
                    factory.resetQueue();
                }
                factory.addEnvelope(envelope);
                queues.set(envelope.handler, factory);
            });
            queues.forEach((factory) => factory.renderQueue());
        }
        isQueueable(object) {
            return (typeof object.addEnvelope === 'function' && typeof object.renderQueue === 'function');
        }
        resolveResponse(response) {
            response.envelopes = response.envelopes || [];
            response.options = response.options || {};
            response.scripts = response.scripts || [];
            response.styles = response.styles || [];
            response.context = response.context || {};
            Object.entries(response.options).forEach(([handler, options]) => {
                response.options[handler] = this.parseOptions(options);
            });
            response.envelopes.forEach((envelope) => {
                envelope.handler = this.resolveHandler(envelope.handler);
                envelope.notification.options = this.parseOptions(envelope.notification.options || {});
                this.pushStyles(response, envelope.handler);
            });
            return response;
        }
        parseOptions(options) {
            Object.entries(options).forEach(([key, value]) => {
                options[key] = this.parseFunction(value);
            });
            return options;
        }
        parseFunction(func) {
            var _a, _b;
            if (typeof func !== 'string') {
                return func;
            }
            const match = func.match(/^function(?:.+)?(?:\s+)?\((.+)?\)(?:\s+|\n+)?{(?:\s+|\n+)?((?:.|\n)+)}$/m);
            if (!match) {
                return func;
            }
            const args = (_b = (_a = match[1]) === null || _a === void 0 ? void 0 : _a.split(',').map((arg) => arg.trim())) !== null && _b !== void 0 ? _b : [];
            const body = match[2];
            return new Function(...args, body);
        }
        pushStyles(response, handler) {
            var _a;
            handler = handler.replace('theme.', '');
            const styles = ((_a = this.themes.get(handler)) === null || _a === void 0 ? void 0 : _a.styles) || [];
            response.styles = Array.from(new Set([...response.styles, ...styles]));
        }
        resolveHandler(handler) {
            handler = handler || this.defaultHandler;
            if (['flasher', 'theme', 'template'].includes(handler)) {
                handler = 'theme.flasher';
            }
            handler = handler.replace('template.', 'theme.');
            return handler;
        }
        resolveThemeHandler(alias) {
            const factory = this.factories.get(alias);
            if (factory) {
                return;
            }
            if (0 !== alias.indexOf('theme.')) {
                return;
            }
            const viewFactory = this.themes.get(alias.replace('theme.', ''));
            if (!viewFactory) {
                return;
            }
            this.addFactory(alias, new FlasherFactory(viewFactory));
        }
    }

    const flasher = new Flasher();
    flasher.addTheme('flasher', {
        render: (envelope) => {
            var _a;
            const notification = envelope.notification;
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
