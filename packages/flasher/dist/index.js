'use strict';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = ".fl-main-container{position:fixed;transition:all 1s ease-in-out;width:24rem;z-index:99999}.fl-main-container[data-position^=top-]{top:.5rem}.fl-main-container[data-position^=bottom-]{bottom:.5rem}.fl-main-container[data-position$=-right]{right:.5rem}.fl-main-container[data-position$=-right] .fl-container{transform:translateX(110%)}.fl-main-container[data-position$=-left]{left:.5rem}.fl-main-container[data-position$=-left] .fl-container{transform:translateX(-110%)}.fl-main-container[data-position$=-center]{left:50%;transform:translateX(-50%)}.fl-main-container[data-position=top-center] .fl-container{transform:translateY(-100vh)}.fl-main-container[data-position=bottom-center] .fl-container{transform:translateY(100vh)}.fl-main-container .fl-container{transition:transform .3s ease-in-out}.fl-main-container .fl-container.fl-show{transform:translate(0)}.fl-main-container .fl-container .fl-progress-bar{display:flex;height:.125rem;margin-left:-1px}.fl-main-container .fl-container.fl-rtl{direction:rtl}.fl-main-container .fl-container.fl-rtl .fl-progress-bar{margin-left:auto;margin-right:-1px}.fl-main-container .fl-container.fl-success .fl-icon{background-color:#059669}.fl-main-container .fl-container.fl-success .fl-progress-bar{background-color:#6dface}.fl-main-container .fl-container.fl-success .fl-progress-bar .fl-progress{background-color:#059669}.fl-main-container .fl-container.fl-flasher.fl-success{border-left:.8rem solid #059669}.fl-main-container .fl-container.fl-flasher.fl-success.fl-rtl{border-left:none;border-right:.8rem solid #059669}.fl-main-container .fl-container.fl-flasher.fl-success:not(.fl-rtl){border-left:.8rem solid #059669;border-right:none}.fl-main-container .fl-container.fl-flasher.fl-success .fl-title{color:#059669}.fl-main-container .fl-container.fl-info .fl-icon{background-color:#2563eb}.fl-main-container .fl-container.fl-info .fl-progress-bar{background-color:#e0e9fc}.fl-main-container .fl-container.fl-info .fl-progress-bar .fl-progress{background-color:#2563eb}.fl-main-container .fl-container.fl-flasher.fl-info{border-left:.8rem solid #2563eb}.fl-main-container .fl-container.fl-flasher.fl-info.fl-rtl{border-left:none;border-right:.8rem solid #2563eb}.fl-main-container .fl-container.fl-flasher.fl-info:not(.fl-rtl){border-left:.8rem solid #2563eb;border-right:none}.fl-main-container .fl-container.fl-flasher.fl-info .fl-title{color:#2563eb}.fl-main-container .fl-container.fl-warning .fl-icon{background-color:#d97706}.fl-main-container .fl-container.fl-warning .fl-progress-bar{background-color:#fdd8ae}.fl-main-container .fl-container.fl-warning .fl-progress-bar .fl-progress{background-color:#d97706}.fl-main-container .fl-container.fl-flasher.fl-warning{border-left:.8rem solid #d97706}.fl-main-container .fl-container.fl-flasher.fl-warning.fl-rtl{border-left:none;border-right:.8rem solid #d97706}.fl-main-container .fl-container.fl-flasher.fl-warning:not(.fl-rtl){border-left:.8rem solid #d97706;border-right:none}.fl-main-container .fl-container.fl-flasher.fl-warning .fl-title{color:#d97706}.fl-main-container .fl-container.fl-error .fl-icon{background-color:#dc2626}.fl-main-container .fl-container.fl-error .fl-progress-bar{background-color:#f8d6d6}.fl-main-container .fl-container.fl-error .fl-progress-bar .fl-progress{background-color:#dc2626}.fl-main-container .fl-container.fl-flasher.fl-error{border-left:.8rem solid #dc2626}.fl-main-container .fl-container.fl-flasher.fl-error.fl-rtl{border-left:none;border-right:.8rem solid #dc2626}.fl-main-container .fl-container.fl-flasher.fl-error:not(.fl-rtl){border-left:.8rem solid #dc2626;border-right:none}.fl-main-container .fl-container.fl-flasher.fl-error .fl-title{color:#dc2626}.fl-main-container .fl-container .fl-icon{border-radius:50%;box-sizing:border-box;color:#fff;display:inline-block;height:1em;margin:0;position:relative;transition:all 1s;width:1em}.fl-main-container .fl-container .fl-icon:after,.fl-main-container .fl-container .fl-icon:before{border-width:0;box-sizing:border-box;content:\"\";position:absolute;transition:all 1s}.fl-main-container .fl-container.fl-success .fl-icon:after,.fl-main-container .fl-container.fl-success .fl-icon:before{background-color:currentColor;border-radius:.1em;height:.6em;left:.35em;top:.6em;transform:rotate(-135deg);transform-origin:.08em .08em;width:.16em}.fl-main-container .fl-container.fl-success .fl-icon:after{height:.16em;width:.4em}.fl-main-container .fl-container.fl-info .fl-icon:after,.fl-main-container .fl-container.fl-info .fl-icon:before{background-color:currentColor;border-radius:.03em;left:50%;transform:translateX(-50%);width:.15em}.fl-main-container .fl-container.fl-info .fl-icon:before{height:.38em;top:.4em}.fl-main-container .fl-container.fl-info .fl-icon:after{box-shadow:-.06em .19em,-.06em .44em,.06em .44em;height:.13em;top:.21em}.fl-main-container .fl-container.fl-warning .fl-icon:after,.fl-main-container .fl-container.fl-warning .fl-icon:before{background-color:currentColor;border-radius:.03em;left:50%;transform:translateX(-50%);width:.15em}.fl-main-container .fl-container.fl-warning .fl-icon:before{height:.38em;top:.21em}.fl-main-container .fl-container.fl-warning .fl-icon:after{height:.13em;top:.65em}.fl-main-container .fl-container.fl-error .fl-icon:after,.fl-main-container .fl-container.fl-error .fl-icon:before{background-color:currentColor;border-radius:.1em;height:.7em;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-135deg);width:.16em}.fl-main-container .fl-container.fl-error .fl-icon:after{transform:translate(-50%,-50%) rotate(-45deg)}.fl-main-container .fl-container.fl-flasher{background-color:#fff;box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05);color:#4b5563;cursor:pointer;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;line-height:1.5;margin-top:.5rem;word-break:break-word}.fl-main-container .fl-container.fl-flasher.fl-rtl{border-radius:0 .375rem .375rem 0}.fl-main-container .fl-container.fl-flasher:not(.fl-rtl){border-radius:.375rem 0 0 .375rem}.fl-main-container .fl-container.fl-flasher .fl-content{align-items:center;display:flex;padding:.75rem}.fl-main-container .fl-container.fl-flasher .fl-icon{font-size:2.5rem}.fl-main-container .fl-container.fl-flasher .fl-message,.fl-main-container .fl-container.fl-flasher .fl-title{display:block;line-height:1.25rem;margin-left:1rem;margin-right:1rem}.fl-main-container .fl-container.fl-flasher .fl-message:first-letter,.fl-main-container .fl-container.fl-flasher .fl-title:first-letter{text-transform:uppercase}.fl-main-container .fl-container.fl-flasher .fl-title{font-size:1rem;font-weight:500}.fl-main-container .fl-container.fl-flasher .fl-message{font-size:.875rem;margin-top:.25rem}.dark .fl-main-container .fl-flasher.fl-container{background-color:#0f172a;color:#fff}@media (prefers-color-scheme:dark){.fl-main-container .fl-flasher.fl-container{background-color:#0f172a;color:#fff}}";
n(css,{});

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
            style: {}
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
            options: options
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
    };
    FlasherFactory.prototype.createContainer = function (options) {
        var containerSelector = ".fl-main-container[data-position=\"".concat(options.position, "\"]");
        var container = document.querySelector(containerSelector);
        if (container) {
            return container;
        }
        container = document.createElement('div');
        container.classList.add('fl-main-container');
        container.dataset.position = options.position;
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
        progressBarContainer && progressBarContainer.append(progressBar);
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
            options: options
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
        document.body.appendChild(tag);
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
            queues.get(envelope.handler) || factory.resetQueue();
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
    }
});

module.exports = flasher;
