(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@flasher/flasher'), require('jquery')) :
    typeof define === 'function' && define.amd ? define(['@flasher/flasher', 'jquery'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.flasher = global.flasher || {}, global.flasher.toastr = factory(global.flasher, global.jQuery)));
})(this, (function (flasher, require$$0) { 'use strict';

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

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var toastr$2 = {exports: {}};

    /*
     * Toastr
     * Copyright 2012-2015
     * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
     * All Rights Reserved.
     * Use, reproduction, distribution, and modification of this code is subject to the terms and
     * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
     *
     * ARIA Support: Greta Krafsig
     *
     * Project: https://github.com/CodeSeven/toastr
     */

    (function (module) {
    	/* global define */
    	(function (define) {
    	    define(['jquery'], function ($) {
    	        return (function () {
    	            var $container;
    	            var listener;
    	            var toastId = 0;
    	            var toastType = {
    	                error: 'error',
    	                info: 'info',
    	                success: 'success',
    	                warning: 'warning'
    	            };

    	            var toastr = {
    	                clear: clear,
    	                remove: remove,
    	                error: error,
    	                getContainer: getContainer,
    	                info: info,
    	                options: {},
    	                subscribe: subscribe,
    	                success: success,
    	                version: '2.1.4',
    	                warning: warning
    	            };

    	            var previousToast;

    	            return toastr;

    	            ////////////////

    	            function error(message, title, optionsOverride) {
    	                return notify({
    	                    type: toastType.error,
    	                    iconClass: getOptions().iconClasses.error,
    	                    message: message,
    	                    optionsOverride: optionsOverride,
    	                    title: title
    	                });
    	            }

    	            function getContainer(options, create) {
    	                if (!options) { options = getOptions(); }
    	                $container = $('#' + options.containerId);
    	                if ($container.length) {
    	                    return $container;
    	                }
    	                if (create) {
    	                    $container = createContainer(options);
    	                }
    	                return $container;
    	            }

    	            function info(message, title, optionsOverride) {
    	                return notify({
    	                    type: toastType.info,
    	                    iconClass: getOptions().iconClasses.info,
    	                    message: message,
    	                    optionsOverride: optionsOverride,
    	                    title: title
    	                });
    	            }

    	            function subscribe(callback) {
    	                listener = callback;
    	            }

    	            function success(message, title, optionsOverride) {
    	                return notify({
    	                    type: toastType.success,
    	                    iconClass: getOptions().iconClasses.success,
    	                    message: message,
    	                    optionsOverride: optionsOverride,
    	                    title: title
    	                });
    	            }

    	            function warning(message, title, optionsOverride) {
    	                return notify({
    	                    type: toastType.warning,
    	                    iconClass: getOptions().iconClasses.warning,
    	                    message: message,
    	                    optionsOverride: optionsOverride,
    	                    title: title
    	                });
    	            }

    	            function clear($toastElement, clearOptions) {
    	                var options = getOptions();
    	                if (!$container) { getContainer(options); }
    	                if (!clearToast($toastElement, options, clearOptions)) {
    	                    clearContainer(options);
    	                }
    	            }

    	            function remove($toastElement) {
    	                var options = getOptions();
    	                if (!$container) { getContainer(options); }
    	                if ($toastElement && $(':focus', $toastElement).length === 0) {
    	                    removeToast($toastElement);
    	                    return;
    	                }
    	                if ($container.children().length) {
    	                    $container.remove();
    	                }
    	            }

    	            // internal functions

    	            function clearContainer (options) {
    	                var toastsToClear = $container.children();
    	                for (var i = toastsToClear.length - 1; i >= 0; i--) {
    	                    clearToast($(toastsToClear[i]), options);
    	                }
    	            }

    	            function clearToast ($toastElement, options, clearOptions) {
    	                var force = clearOptions && clearOptions.force ? clearOptions.force : false;
    	                if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
    	                    $toastElement[options.hideMethod]({
    	                        duration: options.hideDuration,
    	                        easing: options.hideEasing,
    	                        complete: function () { removeToast($toastElement); }
    	                    });
    	                    return true;
    	                }
    	                return false;
    	            }

    	            function createContainer(options) {
    	                $container = $('<div/>')
    	                    .attr('id', options.containerId)
    	                    .addClass(options.positionClass);

    	                $container.appendTo($(options.target));
    	                return $container;
    	            }

    	            function getDefaults() {
    	                return {
    	                    tapToDismiss: true,
    	                    toastClass: 'toast',
    	                    containerId: 'toast-container',
    	                    debug: false,

    	                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
    	                    showDuration: 300,
    	                    showEasing: 'swing', //swing and linear are built into jQuery
    	                    onShown: undefined,
    	                    hideMethod: 'fadeOut',
    	                    hideDuration: 1000,
    	                    hideEasing: 'swing',
    	                    onHidden: undefined,
    	                    closeMethod: false,
    	                    closeDuration: false,
    	                    closeEasing: false,
    	                    closeOnHover: true,

    	                    extendedTimeOut: 1000,
    	                    iconClasses: {
    	                        error: 'toast-error',
    	                        info: 'toast-info',
    	                        success: 'toast-success',
    	                        warning: 'toast-warning'
    	                    },
    	                    iconClass: 'toast-info',
    	                    positionClass: 'toast-top-right',
    	                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
    	                    titleClass: 'toast-title',
    	                    messageClass: 'toast-message',
    	                    escapeHtml: false,
    	                    target: 'body',
    	                    closeHtml: '<button type="button">&times;</button>',
    	                    closeClass: 'toast-close-button',
    	                    newestOnTop: true,
    	                    preventDuplicates: false,
    	                    progressBar: false,
    	                    progressClass: 'toast-progress',
    	                    rtl: false
    	                };
    	            }

    	            function publish(args) {
    	                if (!listener) { return; }
    	                listener(args);
    	            }

    	            function notify(map) {
    	                var options = getOptions();
    	                var iconClass = map.iconClass || options.iconClass;

    	                if (typeof (map.optionsOverride) !== 'undefined') {
    	                    options = $.extend(options, map.optionsOverride);
    	                    iconClass = map.optionsOverride.iconClass || iconClass;
    	                }

    	                if (shouldExit(options, map)) { return; }

    	                toastId++;

    	                $container = getContainer(options, true);

    	                var intervalId = null;
    	                var $toastElement = $('<div/>');
    	                var $titleElement = $('<div/>');
    	                var $messageElement = $('<div/>');
    	                var $progressElement = $('<div/>');
    	                var $closeElement = $(options.closeHtml);
    	                var progressBar = {
    	                    intervalId: null,
    	                    hideEta: null,
    	                    maxHideTime: null
    	                };
    	                var response = {
    	                    toastId: toastId,
    	                    state: 'visible',
    	                    startTime: new Date(),
    	                    options: options,
    	                    map: map
    	                };

    	                personalizeToast();

    	                displayToast();

    	                handleEvents();

    	                publish(response);

    	                if (options.debug && console) {
    	                    console.log(response);
    	                }

    	                return $toastElement;

    	                function escapeHtml(source) {
    	                    if (source == null) {
    	                        source = '';
    	                    }

    	                    return source
    	                        .replace(/&/g, '&amp;')
    	                        .replace(/"/g, '&quot;')
    	                        .replace(/'/g, '&#39;')
    	                        .replace(/</g, '&lt;')
    	                        .replace(/>/g, '&gt;');
    	                }

    	                function personalizeToast() {
    	                    setIcon();
    	                    setTitle();
    	                    setMessage();
    	                    setCloseButton();
    	                    setProgressBar();
    	                    setRTL();
    	                    setSequence();
    	                    setAria();
    	                }

    	                function setAria() {
    	                    var ariaValue = '';
    	                    switch (map.iconClass) {
    	                        case 'toast-success':
    	                        case 'toast-info':
    	                            ariaValue =  'polite';
    	                            break;
    	                        default:
    	                            ariaValue = 'assertive';
    	                    }
    	                    $toastElement.attr('aria-live', ariaValue);
    	                }

    	                function handleEvents() {
    	                    if (options.closeOnHover) {
    	                        $toastElement.hover(stickAround, delayedHideToast);
    	                    }

    	                    if (!options.onclick && options.tapToDismiss) {
    	                        $toastElement.click(hideToast);
    	                    }

    	                    if (options.closeButton && $closeElement) {
    	                        $closeElement.click(function (event) {
    	                            if (event.stopPropagation) {
    	                                event.stopPropagation();
    	                            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
    	                                event.cancelBubble = true;
    	                            }

    	                            if (options.onCloseClick) {
    	                                options.onCloseClick(event);
    	                            }

    	                            hideToast(true);
    	                        });
    	                    }

    	                    if (options.onclick) {
    	                        $toastElement.click(function (event) {
    	                            options.onclick(event);
    	                            hideToast();
    	                        });
    	                    }
    	                }

    	                function displayToast() {
    	                    $toastElement.hide();

    	                    $toastElement[options.showMethod](
    	                        {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
    	                    );

    	                    if (options.timeOut > 0) {
    	                        intervalId = setTimeout(hideToast, options.timeOut);
    	                        progressBar.maxHideTime = parseFloat(options.timeOut);
    	                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
    	                        if (options.progressBar) {
    	                            progressBar.intervalId = setInterval(updateProgress, 10);
    	                        }
    	                    }
    	                }

    	                function setIcon() {
    	                    if (map.iconClass) {
    	                        $toastElement.addClass(options.toastClass).addClass(iconClass);
    	                    }
    	                }

    	                function setSequence() {
    	                    if (options.newestOnTop) {
    	                        $container.prepend($toastElement);
    	                    } else {
    	                        $container.append($toastElement);
    	                    }
    	                }

    	                function setTitle() {
    	                    if (map.title) {
    	                        var suffix = map.title;
    	                        if (options.escapeHtml) {
    	                            suffix = escapeHtml(map.title);
    	                        }
    	                        $titleElement.append(suffix).addClass(options.titleClass);
    	                        $toastElement.append($titleElement);
    	                    }
    	                }

    	                function setMessage() {
    	                    if (map.message) {
    	                        var suffix = map.message;
    	                        if (options.escapeHtml) {
    	                            suffix = escapeHtml(map.message);
    	                        }
    	                        $messageElement.append(suffix).addClass(options.messageClass);
    	                        $toastElement.append($messageElement);
    	                    }
    	                }

    	                function setCloseButton() {
    	                    if (options.closeButton) {
    	                        $closeElement.addClass(options.closeClass).attr('role', 'button');
    	                        $toastElement.prepend($closeElement);
    	                    }
    	                }

    	                function setProgressBar() {
    	                    if (options.progressBar) {
    	                        $progressElement.addClass(options.progressClass);
    	                        $toastElement.prepend($progressElement);
    	                    }
    	                }

    	                function setRTL() {
    	                    if (options.rtl) {
    	                        $toastElement.addClass('rtl');
    	                    }
    	                }

    	                function shouldExit(options, map) {
    	                    if (options.preventDuplicates) {
    	                        if (map.message === previousToast) {
    	                            return true;
    	                        } else {
    	                            previousToast = map.message;
    	                        }
    	                    }
    	                    return false;
    	                }

    	                function hideToast(override) {
    	                    var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
    	                    var duration = override && options.closeDuration !== false ?
    	                        options.closeDuration : options.hideDuration;
    	                    var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
    	                    if ($(':focus', $toastElement).length && !override) {
    	                        return;
    	                    }
    	                    clearTimeout(progressBar.intervalId);
    	                    return $toastElement[method]({
    	                        duration: duration,
    	                        easing: easing,
    	                        complete: function () {
    	                            removeToast($toastElement);
    	                            clearTimeout(intervalId);
    	                            if (options.onHidden && response.state !== 'hidden') {
    	                                options.onHidden();
    	                            }
    	                            response.state = 'hidden';
    	                            response.endTime = new Date();
    	                            publish(response);
    	                        }
    	                    });
    	                }

    	                function delayedHideToast() {
    	                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
    	                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
    	                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
    	                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
    	                    }
    	                }

    	                function stickAround() {
    	                    clearTimeout(intervalId);
    	                    progressBar.hideEta = 0;
    	                    $toastElement.stop(true, true)[options.showMethod](
    	                        {duration: options.showDuration, easing: options.showEasing}
    	                    );
    	                }

    	                function updateProgress() {
    	                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
    	                    $progressElement.width(percentage + '%');
    	                }
    	            }

    	            function getOptions() {
    	                return $.extend({}, getDefaults(), toastr.options);
    	            }

    	            function removeToast($toastElement) {
    	                if (!$container) { $container = getContainer(); }
    	                if ($toastElement.is(':visible')) {
    	                    return;
    	                }
    	                $toastElement.remove();
    	                $toastElement = null;
    	                if ($container.children().length === 0) {
    	                    $container.remove();
    	                    previousToast = undefined;
    	                }
    	            }

    	        })();
    	    });
    	}(function (deps, factory) {
    	    if (module.exports) { //Node
    	        module.exports = factory(require$$0);
    	    } else {
    	        window.toastr = factory(window.jQuery);
    	    }
    	})); 
    } (toastr$2));

    var toastrExports = toastr$2.exports;
    var toastr$1 = /*@__PURE__*/getDefaultExportFromCjs(toastrExports);

    var ToastrFactory = (function () {
        function ToastrFactory() {
        }
        ToastrFactory.prototype.success = function (message, title, options) {
            this.flash('success', message, title, options);
        };
        ToastrFactory.prototype.info = function (message, title, options) {
            this.flash('info', message, title, options);
        };
        ToastrFactory.prototype.warning = function (message, title, options) {
            this.flash('warning', message, title, options);
        };
        ToastrFactory.prototype.error = function (message, title, options) {
            this.flash('error', message, title, options);
        };
        ToastrFactory.prototype.flash = function (type, message, title, options) {
            var notification = this.createNotification(type, message, title, options);
            this.renderOptions({});
            this.render({ notification: notification });
        };
        ToastrFactory.prototype.createNotification = function (type, message, title, options) {
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
        ToastrFactory.prototype.render = function (envelope) {
            var notification = envelope.notification;
            var message = notification.message, title = notification.title, options = notification.options;
            var type = notification.type || 'info';
            var instance = toastr$1[type](message, title, options);
            instance.parent().attr('data-turbo-cache', 'false');
        };
        ToastrFactory.prototype.renderOptions = function (options) {
            toastr$1.options = __assign({ timeOut: (options.timeOut || 5000), progressBar: (options.progressBar || 5000) }, options);
        };
        return ToastrFactory;
    }());

    var toastr = new ToastrFactory();
    flasher.addFactory('toastr', toastr);

    return toastr;

}));
