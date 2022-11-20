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

    var toastr$1 = toastr$2.exports;

    var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

    var css = ".toast-title{font-weight:700}.toast-message{-ms-word-wrap:break-word;word-wrap:break-word}.toast-message a,.toast-message label{color:#fff}.toast-message a:hover{color:#ccc;text-decoration:none}.toast-close-button{color:#fff;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=80);filter:alpha(opacity=80);float:right;font-size:20px;font-weight:700;line-height:1;opacity:.8;position:relative;right:-.3em;-webkit-text-shadow:0 1px 0 #fff;text-shadow:0 1px 0 #fff;top:-.3em}.toast-close-button:focus,.toast-close-button:hover{color:#000;cursor:pointer;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=40);filter:alpha(opacity=40);opacity:.4;text-decoration:none}.rtl .toast-close-button{float:left;left:-.3em;right:.3em}button.toast-close-button{-webkit-appearance:none;background:0 0;border:0;cursor:pointer;padding:0}.toast-top-center{right:0;top:0;width:100%}.toast-bottom-center{bottom:0;right:0;width:100%}.toast-top-full-width{right:0;top:0;width:100%}.toast-bottom-full-width{bottom:0;right:0;width:100%}.toast-top-left{left:12px;top:12px}.toast-top-right{right:12px;top:12px}.toast-bottom-right{bottom:12px;right:12px}.toast-bottom-left{bottom:12px;left:12px}#toast-container{pointer-events:none;position:fixed;z-index:999999}#toast-container *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}#toast-container>div{background-position:15px;background-repeat:no-repeat;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-moz-box-shadow:0 0 12px #999;-webkit-box-shadow:0 0 12px #999;box-shadow:0 0 12px #999;color:#fff;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=80);filter:alpha(opacity=80);margin:0 0 6px;opacity:.8;overflow:hidden;padding:15px 15px 15px 50px;pointer-events:auto;position:relative;width:300px}#toast-container>div.rtl{background-position:right 15px center;direction:rtl;padding:15px 50px 15px 15px}#toast-container>div:hover{-moz-box-shadow:0 0 12px #000;-webkit-box-shadow:0 0 12px #000;box-shadow:0 0 12px #000;cursor:pointer;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);filter:alpha(opacity=100);opacity:1}#toast-container>.toast-info{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=)!important}#toast-container>.toast-error{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=)!important}#toast-container>.toast-success{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==)!important}#toast-container>.toast-warning{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=)!important}#toast-container.toast-bottom-center>div,#toast-container.toast-top-center>div{margin-left:auto;margin-right:auto;width:300px}#toast-container.toast-bottom-full-width>div,#toast-container.toast-top-full-width>div{margin-left:auto;margin-right:auto;width:96%}.toast{background-color:#030303}.toast-success{background-color:#51a351}.toast-error{background-color:#bd362f}.toast-info{background-color:#2f96b4}.toast-warning{background-color:#f89406}.toast-progress{background-color:#000;bottom:0;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=40);filter:alpha(opacity=40);height:4px;left:0;opacity:.4;position:absolute}@media (max-width:240px){#toast-container>div{padding:8px 8px 8px 50px;width:11em}#toast-container>div.rtl{padding:8px 50px 8px 8px}#toast-container .toast-close-button{right:-.2em;top:-.2em}#toast-container .rtl .toast-close-button{left:-.2em;right:.2em}}@media (min-width:241px) and (max-width:480px){#toast-container>div{padding:8px 8px 8px 50px;width:18em}#toast-container>div.rtl{padding:8px 50px 8px 8px}#toast-container .toast-close-button{right:-.2em;top:-.2em}#toast-container .rtl .toast-close-button{left:-.2em;right:.2em}}@media (min-width:481px) and (max-width:768px){#toast-container>div{padding:15px 15px 15px 50px;width:25em}#toast-container>div.rtl{padding:15px 50px 15px 15px}}";
    n(css,{});

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
