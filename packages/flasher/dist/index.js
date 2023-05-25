'use strict';

<<<<<<< HEAD
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
=======
var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = ".fl-main-container{position:fixed;transition:all 1s ease-in-out;width:24em;z-index:99999}@media only screen and (max-width:480px){.fl-main-container{left:.5em;right:.5em;width:auto}}.fl-main-container[data-position^=top-]{top:.5em}.fl-main-container[data-position^=bottom-]{bottom:.5em}.fl-main-container[data-position$=-right]{right:.5em}.fl-main-container[data-position$=-right] .fl-container{transform:translateX(110%)}.fl-main-container[data-position$=-left]{left:.5em}.fl-main-container[data-position$=-left] .fl-container{transform:translateX(-110%)}.fl-main-container[data-position$=-center]{left:50%;transform:translateX(-50%)}.fl-main-container[data-position=top-center] .fl-container{transform:translateY(-100vh)}.fl-main-container[data-position=bottom-center] .fl-container{transform:translateY(100vh)}.fl-main-container .fl-container{transition:transform .3s ease-in-out}.fl-main-container .fl-container.fl-show{transform:translate(0)}.fl-main-container .fl-container .fl-progress-bar{display:flex;height:.125em;margin-left:-1px}.fl-main-container .fl-container.fl-rtl{direction:rtl}.fl-main-container .fl-container.fl-rtl .fl-progress-bar{margin-left:auto;margin-right:-1px}.fl-main-container .fl-container.fl-success .fl-icon{background-color:#059669}.fl-main-container .fl-container.fl-success .fl-progress-bar{background-color:#6dface}.fl-main-container .fl-container.fl-success .fl-progress-bar .fl-progress{background-color:#059669}.fl-main-container .fl-container.fl-flasher.fl-success{border-left:.8em solid #059669}.fl-main-container .fl-container.fl-flasher.fl-success.fl-rtl{border-left:none;border-right:.8em solid #059669}.fl-main-container .fl-container.fl-flasher.fl-success:not(.fl-rtl){border-left:.8em solid #059669;border-right:none}.fl-main-container .fl-container.fl-flasher.fl-success .fl-title{color:#059669}.fl-main-container .fl-container.fl-info .fl-icon{background-color:#2563eb}.fl-main-container .fl-container.fl-info .fl-progress-bar{background-color:#e0e9fc}.fl-main-container .fl-container.fl-info .fl-progress-bar .fl-progress{background-color:#2563eb}.fl-main-container .fl-container.fl-flasher.fl-info{border-left:.8em solid #2563eb}.fl-main-container .fl-container.fl-flasher.fl-info.fl-rtl{border-left:none;border-right:.8em solid #2563eb}.fl-main-container .fl-container.fl-flasher.fl-info:not(.fl-rtl){border-left:.8em solid #2563eb;border-right:none}.fl-main-container .fl-container.fl-flasher.fl-info .fl-title{color:#2563eb}.fl-main-container .fl-container.fl-warning .fl-icon{background-color:#d97706}.fl-main-container .fl-container.fl-warning .fl-progress-bar{background-color:#fdd8ae}.fl-main-container .fl-container.fl-warning .fl-progress-bar .fl-progress{background-color:#d97706}.fl-main-container .fl-container.fl-flasher.fl-warning{border-left:.8em solid #d97706}.fl-main-container .fl-container.fl-flasher.fl-warning.fl-rtl{border-left:none;border-right:.8em solid #d97706}.fl-main-container .fl-container.fl-flasher.fl-warning:not(.fl-rtl){border-left:.8em solid #d97706;border-right:none}.fl-main-container .fl-container.fl-flasher.fl-warning .fl-title{color:#d97706}.fl-main-container .fl-container.fl-error .fl-icon{background-color:#dc2626}.fl-main-container .fl-container.fl-error .fl-progress-bar{background-color:#f8d6d6}.fl-main-container .fl-container.fl-error .fl-progress-bar .fl-progress{background-color:#dc2626}.fl-main-container .fl-container.fl-flasher.fl-error{border-left:.8em solid #dc2626}.fl-main-container .fl-container.fl-flasher.fl-error.fl-rtl{border-left:none;border-right:.8em solid #dc2626}.fl-main-container .fl-container.fl-flasher.fl-error:not(.fl-rtl){border-left:.8em solid #dc2626;border-right:none}.fl-main-container .fl-container.fl-flasher.fl-error .fl-title{color:#dc2626}.fl-main-container .fl-container .fl-icon{border-radius:50%;box-sizing:border-box;color:#fff;display:inline-block;height:1em;margin:0;min-height:1em;min-width:1em;position:relative;transition:all 1s;width:1em}.fl-main-container .fl-container .fl-icon:after,.fl-main-container .fl-container .fl-icon:before{border-width:0;box-sizing:border-box;content:\"\";position:absolute;transition:all 1s}.fl-main-container .fl-container.fl-success .fl-icon:after,.fl-main-container .fl-container.fl-success .fl-icon:before{background-color:currentColor;border-radius:.1em;height:.6em;left:.35em;top:.6em;transform:rotate(-135deg);transform-origin:.08em .08em;width:.16em}.fl-main-container .fl-container.fl-success .fl-icon:after{height:.16em;width:.4em}.fl-main-container .fl-container.fl-info .fl-icon:after,.fl-main-container .fl-container.fl-info .fl-icon:before{background-color:currentColor;border-radius:.03em;left:50%;transform:translateX(-50%);width:.15em}.fl-main-container .fl-container.fl-info .fl-icon:before{height:.38em;top:.4em}.fl-main-container .fl-container.fl-info .fl-icon:after{box-shadow:-.06em .19em,-.06em .44em,.06em .44em;height:.13em;top:.21em}.fl-main-container .fl-container.fl-warning .fl-icon:after,.fl-main-container .fl-container.fl-warning .fl-icon:before{background-color:currentColor;border-radius:.03em;left:50%;transform:translateX(-50%);width:.15em}.fl-main-container .fl-container.fl-warning .fl-icon:before{height:.38em;top:.21em}.fl-main-container .fl-container.fl-warning .fl-icon:after{height:.13em;top:.65em}.fl-main-container .fl-container.fl-error .fl-icon:after,.fl-main-container .fl-container.fl-error .fl-icon:before{background-color:currentColor;border-radius:.1em;height:.7em;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-135deg);width:.16em}.fl-main-container .fl-container.fl-error .fl-icon:after{transform:translate(-50%,-50%) rotate(-45deg)}.fl-main-container .fl-container.fl-flasher{background-color:#fff;box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);color:#4b5563;cursor:pointer;line-height:1.5;margin-top:.5em;word-break:break-word}.fl-main-container .fl-container.fl-flasher.fl-rtl{border-radius:0 .375em .375em 0}.fl-main-container .fl-container.fl-flasher:not(.fl-rtl){border-radius:.375em 0 0 .375em}.fl-main-container .fl-container.fl-flasher .fl-content{align-items:center;display:flex;padding:.75em}.fl-main-container .fl-container.fl-flasher .fl-icon{font-size:2.5em}.fl-main-container .fl-container.fl-flasher .fl-message,.fl-main-container .fl-container.fl-flasher .fl-title{display:block;line-height:1.25em;margin-left:1em;margin-right:1em}.fl-main-container .fl-container.fl-flasher .fl-message:first-letter,.fl-main-container .fl-container.fl-flasher .fl-title:first-letter{text-transform:uppercase}.fl-main-container .fl-container.fl-flasher .fl-title{font-size:1em;font-weight:700}.fl-main-container .fl-container.fl-flasher .fl-message{font-size:.875em;margin-top:.25em}";
n(css,{});

class FlasherFactory {
    constructor(viewFactory) {
>>>>>>> 37c201a (Wip)
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
        const options = Array.isArray(nOptions) ? this.options : { ...this.options, ...nOptions };
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
        this.options = { ...this.options, ...options };
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
            container?.style.setProperty(key, options.style[key]);
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
            envelope.context = { ...envelope.context, ...context };
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
        if (typeof func !== 'string') {
            return func;
        }
        const match = func.match(/^function(?:.+)?(?:\s+)?\((.+)?\)(?:\s+|\n+)?{(?:\s+|\n+)?((?:.|\n)+)}$/m);
        if (!match) {
            return func;
        }
        const args = match[1]?.split(',').map((arg) => arg.trim()) ?? [];
        const body = match[2];
        return new Function(...args, body);
    }
    pushStyles(response, handler) {
        handler = handler.replace('theme.', '');
        const styles = this.themes.get(handler)?.styles || [];
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
        const notification = envelope.notification;
        return '<div class="fl-flasher fl-' + notification.type + '">' +
            '<div class="fl-content">' +
            '<div class="fl-icon"></div>' +
            '<div>' +
            '<strong class="fl-title">' + (notification.title ?? notification.type) + '</strong>' +
            '<span class="fl-message">' + notification.message + '</span>' +
            '</div>' +
            '</div>' +
            '<span class="fl-progress-bar"></span>' +
            '</div>';
    },
});

module.exports = flasher;
