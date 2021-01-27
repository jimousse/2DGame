/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/lit-element/lib/css-tag.js":
/*!*************************************************!*\
  !*** ./node_modules/lit-element/lib/css-tag.js ***!
  \*************************************************/
/*! exports provided: supportsAdoptingStyleSheets, CSSResult, unsafeCSS, css */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsAdoptingStyleSheets", function() { return supportsAdoptingStyleSheets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSSResult", function() { return CSSResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsafeCSS", function() { return unsafeCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = (window.ShadowRoot) &&
    (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) &&
    ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);
const constructionToken = Symbol();
class CSSResult {
    constructor(cssText, safeToken) {
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
        if (this._styleSheet === undefined) {
            // Note, if `supportsAdoptingStyleSheets` is true then we assume
            // CSSStyleSheet is constructable.
            if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                this._styleSheet.replaceSync(this.cssText);
            }
            else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
/**
 * Wrap a value for interpolation in a [[`css`]] tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */
const unsafeCSS = (value) => {
    return new CSSResult(String(value), constructionToken);
};
const textFromCSSResult = (value) => {
    if (value instanceof CSSResult) {
        return value.cssText;
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
};
/**
 * Template tag which which can be used with LitElement's [[LitElement.styles |
 * `styles`]] property to set element styles. For security reasons, only literal
 * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
 * may be used inside a template string part.
 */
const css = (strings, ...values) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
};
//# sourceMappingURL=css-tag.js.map

/***/ }),

/***/ "./node_modules/lit-element/lib/decorators.js":
/*!****************************************************!*\
  !*** ./node_modules/lit-element/lib/decorators.js ***!
  \****************************************************/
/*! exports provided: customElement, property, internalProperty, query, queryAsync, queryAll, eventOptions, queryAssignedNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customElement", function() { return customElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "property", function() { return property; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "internalProperty", function() { return internalProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryAsync", function() { return queryAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryAll", function() { return queryAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventOptions", function() { return eventOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryAssignedNodes", function() { return queryAssignedNodes; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const legacyCustomElement = (tagName, clazz) => {
    window.customElements.define(tagName, clazz);
    // Cast as any because TS doesn't recognize the return type as being a
    // subtype of the decorated class when clazz is typed as
    // `Constructor<HTMLElement>` for some reason.
    // `Constructor<HTMLElement>` is helpful to make sure the decorator is
    // applied to elements however.
    // tslint:disable-next-line:no-any
    return clazz;
};
const standardCustomElement = (tagName, descriptor) => {
    const { kind, elements } = descriptor;
    return {
        kind,
        elements,
        // This callback is called once the class is otherwise fully defined
        finisher(clazz) {
            window.customElements.define(tagName, clazz);
        }
    };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```
 * @customElement('my-element')
 * class MyElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The name of the custom element to define.
 */
const customElement = (tagName) => (classOrDescriptor) => (typeof classOrDescriptor === 'function') ?
    legacyCustomElement(tagName, classOrDescriptor) :
    standardCustomElement(tagName, classOrDescriptor);
const standardProperty = (options, element) => {
    // When decorating an accessor, pass it through and add property metadata.
    // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
    // stomp over the user's accessor.
    if (element.kind === 'method' && element.descriptor &&
        !('value' in element.descriptor)) {
        return Object.assign(Object.assign({}, element), { finisher(clazz) {
                clazz.createProperty(element.key, options);
            } });
    }
    else {
        // createProperty() takes care of defining the property, but we still
        // must return some kind of descriptor, so return a descriptor for an
        // unused prototype field. The finisher calls createProperty().
        return {
            kind: 'field',
            key: Symbol(),
            placement: 'own',
            descriptor: {},
            // When @babel/plugin-proposal-decorators implements initializers,
            // do this instead of the initializer below. See:
            // https://github.com/babel/babel/issues/9260 extras: [
            //   {
            //     kind: 'initializer',
            //     placement: 'own',
            //     initializer: descriptor.initializer,
            //   }
            // ],
            initializer() {
                if (typeof element.initializer === 'function') {
                    this[element.key] = element.initializer.call(this);
                }
            },
            finisher(clazz) {
                clazz.createProperty(element.key, options);
            }
        };
    }
};
const legacyProperty = (options, proto, name) => {
    proto.constructor
        .createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A [[`PropertyDeclaration`]] may optionally be
 * supplied to configure property features.
 *
 * This decorator should only be used for public fields. Private or protected
 * fields should use the [[`internalProperty`]] decorator.
 *
 * @example
 * ```ts
 * class MyElement {
 *   @property({ type: Boolean })
 *   clicked = false;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */
function property(options) {
    // tslint:disable-next-line:no-any decorator
    return (protoOrDescriptor, name) => (name !== undefined) ?
        legacyProperty(options, protoOrDescriptor, name) :
        standardProperty(options, protoOrDescriptor);
}
/**
 * Declares a private or protected property that still triggers updates to the
 * element when it changes.
 *
 * Properties declared this way must not be used from HTML or HTML templating
 * systems, they're solely for properties internal to the element. These
 * properties may be renamed by optimization tools like closure compiler.
 * @category Decorator
 */
function internalProperty(options) {
    return property({ attribute: false, hasChanged: options === null || options === void 0 ? void 0 : options.hasChanged });
}
/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 * @param cache An optional boolean which when true performs the DOM query only
 * once and caches the result.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 *
 * ```ts
 * class MyElement {
 *   @query('#first')
 *   first;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */
function query(selector, cache) {
    return (protoOrDescriptor, 
    // tslint:disable-next-line:no-any decorator
    name) => {
        const descriptor = {
            get() {
                return this.renderRoot.querySelector(selector);
            },
            enumerable: true,
            configurable: true,
        };
        if (cache) {
            const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
            descriptor.get = function () {
                if (this[key] === undefined) {
                    (this[key] =
                        this.renderRoot.querySelector(selector));
                }
                return this[key];
            };
        }
        return (name !== undefined) ?
            legacyQuery(descriptor, protoOrDescriptor, name) :
            standardQuery(descriptor, protoOrDescriptor);
    };
}
// Note, in the future, we may extend this decorator to support the use case
// where the queried element may need to do work to become ready to interact
// with (e.g. load some implementation code). If so, we might elect to
// add a second argument defining a function that can be run to make the
// queried element loaded/updated/ready.
/**
 * A property decorator that converts a class property into a getter that
 * returns a promise that resolves to the result of a querySelector on the
 * element's renderRoot done after the element's `updateComplete` promise
 * resolves. When the queried property may change with element state, this
 * decorator can be used instead of requiring users to await the
 * `updateComplete` before accessing the property.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * @example
 * ```ts
 * class MyElement {
 *   @queryAsync('#first')
 *   first;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 *
 * // external usage
 * async doSomethingWithFirst() {
 *  (await aMyElement.first).doSomething();
 * }
 * ```
 * @category Decorator
 */
function queryAsync(selector) {
    return (protoOrDescriptor, 
    // tslint:disable-next-line:no-any decorator
    name) => {
        const descriptor = {
            async get() {
                await this.updateComplete;
                return this.renderRoot.querySelector(selector);
            },
            enumerable: true,
            configurable: true,
        };
        return (name !== undefined) ?
            legacyQuery(descriptor, protoOrDescriptor, name) :
            standardQuery(descriptor, protoOrDescriptor);
    };
}
/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 *
 * @example
 * ```ts
 * class MyElement {
 *   @queryAll('div')
 *   divs;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */
function queryAll(selector) {
    return (protoOrDescriptor, 
    // tslint:disable-next-line:no-any decorator
    name) => {
        const descriptor = {
            get() {
                return this.renderRoot.querySelectorAll(selector);
            },
            enumerable: true,
            configurable: true,
        };
        return (name !== undefined) ?
            legacyQuery(descriptor, protoOrDescriptor, name) :
            standardQuery(descriptor, protoOrDescriptor);
    };
}
const legacyQuery = (descriptor, proto, name) => {
    Object.defineProperty(proto, name, descriptor);
};
const standardQuery = (descriptor, element) => ({
    kind: 'method',
    placement: 'prototype',
    key: element.key,
    descriptor,
});
const standardEventOptions = (options, element) => {
    return Object.assign(Object.assign({}, element), { finisher(clazz) {
            Object.assign(clazz.prototype[element.key], options);
        } });
};
const legacyEventOptions = 
// tslint:disable-next-line:no-any legacy decorator
(options, proto, name) => {
    Object.assign(proto[name], options);
};
/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifies event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * @example
 * ```ts
 * class MyElement {
 *   clicked = false;
 *
 *   render() {
 *     return html`
 *       <div @click=${this._onClick}`>
 *         <button></button>
 *       </div>
 *     `;
 *   }
 *
 *   @eventOptions({capture: true})
 *   _onClick(e) {
 *     this.clicked = true;
 *   }
 * }
 * ```
 * @category Decorator
 */
function eventOptions(options) {
    // Return value typed as any to prevent TypeScript from complaining that
    // standard decorator function signature does not match TypeScript decorator
    // signature
    // TODO(kschaaf): unclear why it was only failing on this decorator and not
    // the others
    return ((protoOrDescriptor, name) => (name !== undefined) ?
        legacyEventOptions(options, protoOrDescriptor, name) :
        standardEventOptions(options, protoOrDescriptor));
}
// x-browser support for matches
// tslint:disable-next-line:no-any
const ElementProto = Element.prototype;
const legacyMatches = ElementProto.msMatchesSelector || ElementProto.webkitMatchesSelector;
/**
 * A property decorator that converts a class property into a getter that
 * returns the `assignedNodes` of the given named `slot`. Note, the type of
 * this property should be annotated as `NodeListOf<HTMLElement>`.
 *
 * @param slotName A string name of the slot.
 * @param flatten A boolean which when true flattens the assigned nodes,
 * meaning any assigned nodes that are slot elements are replaced with their
 * assigned nodes.
 * @param selector A string which filters the results to elements that match
 * the given css selector.
 *
 * * @example
 * ```ts
 * class MyElement {
 *   @queryAssignedNodes('list', true, '.item')
 *   listItems;
 *
 *   render() {
 *     return html`
 *       <slot name="list"></slot>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */
function queryAssignedNodes(slotName = '', flatten = false, selector = '') {
    return (protoOrDescriptor, 
    // tslint:disable-next-line:no-any decorator
    name) => {
        const descriptor = {
            get() {
                const slotSelector = `slot${slotName ? `[name=${slotName}]` : ':not([name])'}`;
                const slot = this.renderRoot.querySelector(slotSelector);
                let nodes = slot && slot.assignedNodes({ flatten });
                if (nodes && selector) {
                    nodes = nodes.filter((node) => node.nodeType === Node.ELEMENT_NODE &&
                        node.matches ?
                        node.matches(selector) :
                        legacyMatches.call(node, selector));
                }
                return nodes;
            },
            enumerable: true,
            configurable: true,
        };
        return (name !== undefined) ?
            legacyQuery(descriptor, protoOrDescriptor, name) :
            standardQuery(descriptor, protoOrDescriptor);
    };
}
//# sourceMappingURL=decorators.js.map

/***/ }),

/***/ "./node_modules/lit-element/lib/updating-element.js":
/*!**********************************************************!*\
  !*** ./node_modules/lit-element/lib/updating-element.js ***!
  \**********************************************************/
/*! exports provided: defaultConverter, notEqual, UpdatingElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultConverter", function() { return defaultConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notEqual", function() { return notEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdatingElement", function() { return UpdatingElement; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
/**
 * Use this module if you want to create your own base class extending
 * [[UpdatingElement]].
 * @packageDocumentation
 */
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty =
    (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
        return value;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */
class UpdatingElement extends HTMLElement {
    constructor() {
        super();
        this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this._classProperties.forEach((v, p) => {
            const attr = this._attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            // NOTE: Workaround IE11 not supporting Map constructor argument.
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v, k) => this._classProperties.set(k, v));
            }
        }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a PropertyDeclaration for the property with the given options.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     *
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        const descriptor = this.getPropertyDescriptor(name, key, options);
        if (descriptor !== undefined) {
            Object.defineProperty(this.prototype, name, descriptor);
        }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     *   class MyElement extends LitElement {
     *     static getPropertyDescriptor(name, key, options) {
     *       const defaultDescriptor =
     *           super.getPropertyDescriptor(name, key, options);
     *       const setter = defaultDescriptor.set;
     *       return {
     *         get: defaultDescriptor.get,
     *         set(value) {
     *           setter.call(this, value);
     *           // custom action.
     *         },
     *         configurable: true,
     *         enumerable: true
     *       }
     *     }
     *   }
     *
     * @nocollapse
     */
    static getPropertyDescriptor(name, key, options) {
        return {
            // tslint:disable-next-line:no-any no symbol in index
            get() {
                return this[key];
            },
            set(value) {
                const oldValue = this[name];
                this[key] = value;
                this
                    .requestUpdateInternal(name, oldValue, options);
            },
            configurable: true,
            enumerable: true
        };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a PropertyDeclaration via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override `createProperty`.
     *
     * @nocollapse
     * @final
     */
    static getPropertyOptions(name) {
        return this._classProperties && this._classProperties.get(name) ||
            defaultPropertyDeclaration;
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        if (!superCtor.hasOwnProperty(finalized)) {
            superCtor.finalize();
        }
        this[finalized] = true;
        this._ensureClassProperties();
        // initialize Map populated in observedAttributes
        this._attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...(typeof Object.getOwnPropertySymbols === 'function') ?
                    Object.getOwnPropertySymbols(props) :
                    []
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
            }
        }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ?
            undefined :
            (typeof attribute === 'string' ?
                attribute :
                (typeof name === 'string' ? name.toLowerCase() : undefined));
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute ||
            defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
        this._updateState = 0;
        this._updatePromise =
            new Promise((res) => this._enableUpdatingResolver = res);
        this._changedProperties = new Map();
        this._saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this.requestUpdateInternal();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    _saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor
            ._classProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                const value = this[p];
                delete this[p];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p, value);
            }
        });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach((v, p) => this[p] = v);
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        // Ensure first connection completes an update. Updates cannot complete
        // before connection.
        this.enableUpdating();
    }
    enableUpdating() {
        if (this._enableUpdatingResolver !== undefined) {
            this._enableUpdatingResolver();
            this._enableUpdatingResolver = undefined;
        }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {
    }
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            // an undefined value does not change the attribute.
            if (attrValue === undefined) {
                return;
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        // Note, hint this as an `AttributeMap` so closure clearly understands
        // the type; it has issues with tracking types through statics
        // tslint:disable-next-line:no-unnecessary-type-assertion
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options = ctor.getPropertyOptions(propName);
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] =
                // tslint:disable-next-line:no-any
                ctor._propertyValueFromAttribute(value, options);
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    /**
     * This protected version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */
    requestUpdateInternal(name, oldValue, options) {
        let shouldRequestUpdate = true;
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            const ctor = this.constructor;
            options = options || ctor.getPropertyOptions(name);
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                    this._changedProperties.set(name, oldValue);
                }
                // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.
                if (options.reflect === true &&
                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
            }
            else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._updatePromise = this._enqueueUpdate();
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */
    requestUpdate(name, oldValue) {
        this.requestUpdateInternal(name, oldValue);
        return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await this._updatePromise;
        }
        catch (e) {
            // Ignore any previous errors. We only care that the previous cycle is
            // done. Any error should have been handled in the previous update.
        }
        const result = this.performUpdate();
        // If `performUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.
        if (result != null) {
            await result;
        }
        return !this._hasRequestedUpdate;
    }
    get _hasRequestedUpdate() {
        return (this._updateState & STATE_UPDATE_REQUESTED);
    }
    get hasUpdated() {
        return (this._updateState & STATE_HAS_UPDATED);
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */
    performUpdate() {
        // Abort any update if one is not pending when this is called.
        // This can happen if `performUpdate` is called early to "flush"
        // the update.
        if (!this._hasRequestedUpdate) {
            return;
        }
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        let shouldUpdate = false;
        const changedProperties = this._changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.update(changedProperties);
            }
            else {
                this._markUpdated();
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            // Ensure element can accept additional updates after an exception.
            this._markUpdated();
            throw e;
        }
        if (shouldUpdate) {
            if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
        return this._getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */
    _getUpdateComplete() {
        return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined &&
            this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
            this._reflectingProperties = undefined;
        }
        this._markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {
    }
}
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */
UpdatingElement[_a] = true;
//# sourceMappingURL=updating-element.js.map

/***/ }),

/***/ "./node_modules/lit-element/lit-element.js":
/*!*************************************************!*\
  !*** ./node_modules/lit-element/lit-element.js ***!
  \*************************************************/
/*! exports provided: defaultConverter, notEqual, UpdatingElement, customElement, property, internalProperty, query, queryAsync, queryAll, eventOptions, queryAssignedNodes, html, svg, TemplateResult, SVGTemplateResult, supportsAdoptingStyleSheets, CSSResult, unsafeCSS, css, LitElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LitElement", function() { return LitElement; });
/* harmony import */ var lit_html_lib_shady_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-html/lib/shady-render.js */ "./node_modules/lit-html/lib/shady-render.js");
/* harmony import */ var _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/updating-element.js */ "./node_modules/lit-element/lib/updating-element.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultConverter", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_1__["defaultConverter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notEqual", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_1__["notEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UpdatingElement", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_1__["UpdatingElement"]; });

/* harmony import */ var _lib_decorators_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/decorators.js */ "./node_modules/lit-element/lib/decorators.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "customElement", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_2__["customElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "property", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_2__["property"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "internalProperty", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_2__["internalProperty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "query", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_2__["query"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryAsync", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_2__["queryAsync"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryAll", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_2__["queryAll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventOptions", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_2__["eventOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queryAssignedNodes", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_2__["queryAssignedNodes"]; });

/* harmony import */ var lit_html_lit_html_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lit-html/lit-html.js */ "./node_modules/lit-html/lit-html.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return lit_html_lit_html_js__WEBPACK_IMPORTED_MODULE_3__["html"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return lit_html_lit_html_js__WEBPACK_IMPORTED_MODULE_3__["svg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return lit_html_lit_html_js__WEBPACK_IMPORTED_MODULE_3__["TemplateResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return lit_html_lit_html_js__WEBPACK_IMPORTED_MODULE_3__["SVGTemplateResult"]; });

/* harmony import */ var _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/css-tag.js */ "./node_modules/lit-element/lib/css-tag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "supportsAdoptingStyleSheets", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["supportsAdoptingStyleSheets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSSResult", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["CSSResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unsafeCSS", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["unsafeCSS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "css", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["css"]; });

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The main LitElement module, which defines the [[`LitElement`]] base class and
 * related APIs.
 *
 *  LitElement components can define a template and a set of observed
 * properties. Changing an observed property triggers a re-render of the
 * element.
 *
 *  Import [[`LitElement`]] and [[`html`]] from this module to create a
 * component:
 *
 *  ```js
 * import {LitElement, html} from 'lit-element';
 *
 * class MyElement extends LitElement {
 *
 *   // Declare observed properties
 *   static get properties() {
 *     return {
 *       adjective: {}
 *     }
 *   }
 *
 *   constructor() {
 *     this.adjective = 'awesome';
 *   }
 *
 *   // Define the element's template
 *   render() {
 *     return html`<p>your ${adjective} template here</p>`;
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 * ```
 *
 * `LitElement` extends [[`UpdatingElement`]] and adds lit-html templating.
 * The `UpdatingElement` class is provided for users that want to build
 * their own custom element base classes that don't use lit-html.
 *
 * @packageDocumentation
 */







// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = []))
    .push('2.4.0');
/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */
const renderNotImplemented = {};
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the [[`properties`]] property or the [[`property`]] decorator.
 */
class LitElement extends _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_1__["UpdatingElement"] {
    /**
     * Return the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * @nocollapse
     */
    static getStyles() {
        return this.styles;
    }
    /** @nocollapse */
    static _getUniqueStyles() {
        // Only gather styles once per class
        if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
            return;
        }
        // Take care not to call `this.getStyles()` multiple times since this
        // generates new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        const userStyles = this.getStyles();
        if (Array.isArray(userStyles)) {
            // De-duplicate styles preserving the _last_ instance in the set.
            // This is a performance optimization to avoid duplicated styles that can
            // occur especially when composing via subclassing.
            // The last item is kept to try to preserve the cascade order with the
            // assumption that it's most important that last added styles override
            // previous styles.
            const addStyles = (styles, set) => styles.reduceRight((set, s) => 
            // Note: On IE set.add() does not return the set
            Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set);
            // Array.from does not work on Set in IE, otherwise return
            // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
            const set = addStyles(userStyles, new Set());
            const styles = [];
            set.forEach((v) => styles.unshift(v));
            this._styles = styles;
        }
        else {
            this._styles = userStyles === undefined ? [] : [userStyles];
        }
        // Ensure that there are no invalid CSSStyleSheet instances here. They are
        // invalid in two conditions.
        // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
        //     this is impossible to check except via .replaceSync or use
        // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
        //     false)
        this._styles = this._styles.map((s) => {
            if (s instanceof CSSStyleSheet && !_lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["supportsAdoptingStyleSheets"]) {
                // Flatten the cssText from the passed constructible stylesheet (or
                // undetectable non-constructible stylesheet). The user might have
                // expected to update their stylesheets over time, but the alternative
                // is a crash.
                const cssText = Array.prototype.slice.call(s.cssRules)
                    .reduce((css, rule) => css + rule.cssText, '');
                return Object(_lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["unsafeCSS"])(cssText);
            }
            return s;
        });
    }
    /**
     * Performs element initialization. By default this calls
     * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
     * captures any pre-set values for registered properties.
     */
    initialize() {
        super.initialize();
        this.constructor._getUniqueStyles();
        this.renderRoot = this.createRenderRoot();
        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
        return this.attachShadow({ mode: 'open' });
    }
    /**
     * Applies styling to the element shadowRoot using the [[`styles`]]
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
        }
        else if (_lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__["supportsAdoptingStyleSheets"]) {
            this.renderRoot.adoptedStyleSheets =
                styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
        }
        else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
        // Setting properties in `render` should not trigger an update. Since
        // updates are allowed after super.update, it's important to call `render`
        // before that.
        const templateResult = this.render();
        super.update(changedProperties);
        // If render is not implemented by the component, don't call lit-html render
        if (templateResult !== renderNotImplemented) {
            this.constructor
                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
        }
        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `NodePart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     */
    render() {
        return renderNotImplemented;
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */
LitElement['finalized'] = true;
/**
 * Reference to the underlying library method used to render the element's
 * DOM. By default, points to the `render` method from lit-html's shady-render
 * module.
 *
 * **Most users will never need to touch this property.**
 *
 * This  property should not be confused with the `render` instance method,
 * which should be overridden to define a template for the element.
 *
 * Advanced users creating a new base class based on LitElement can override
 * this property to point to a custom render method with a signature that
 * matches [shady-render's `render`
 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
 *
 * @nocollapse
 */
LitElement.render = lit_html_lib_shady_render_js__WEBPACK_IMPORTED_MODULE_0__["render"];
//# sourceMappingURL=lit-element.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/default-template-processor.js":
/*!*****************************************************************!*\
  !*** ./node_modules/lit-html/lib/default-template-processor.js ***!
  \*****************************************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultTemplateProcessor", function() { return DefaultTemplateProcessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTemplateProcessor", function() { return defaultTemplateProcessor; });
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parts.js */ "./node_modules/lit-html/lib/parts.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new _parts_js__WEBPACK_IMPORTED_MODULE_0__["PropertyCommitter"](element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__["EventPart"](element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__["BooleanAttributePart"](element, name.slice(1), strings)];
        }
        const committer = new _parts_js__WEBPACK_IMPORTED_MODULE_0__["AttributeCommitter"](element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new _parts_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"](options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
//# sourceMappingURL=default-template-processor.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/directive.js":
/*!************************************************!*\
  !*** ./node_modules/lit-html/lib/directive.js ***!
  \************************************************/
/*! exports provided: directive, isDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "directive", function() { return directive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDirective", function() { return isDirective; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};
//# sourceMappingURL=directive.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/dom.js":
/*!******************************************!*\
  !*** ./node_modules/lit-html/lib/dom.js ***!
  \******************************************/
/*! exports provided: isCEPolyfill, reparentNodes, removeNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCEPolyfill", function() { return isCEPolyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reparentNodes", function() { return reparentNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeNodes", function() { return removeNodes; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' &&
    window.customElements != null &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.insertBefore(start, before);
        start = n;
    }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/modify-template.js":
/*!******************************************************!*\
  !*** ./node_modules/lit-html/lib/modify-template.js ***!
  \******************************************************/
/*! exports provided: removeNodesFromTemplate, insertNodeIntoTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeNodesFromTemplate", function() { return removeNodesFromTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertNodeIntoTemplate", function() { return insertNodeIntoTemplate; });
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ "./node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */
function removeNodesFromTemplate(template, nodesToRemove) {
    const { element: { content }, parts } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        const node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            // go to the next active part.
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
const countNodes = (node) => {
    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (Object(_template_js__WEBPACK_IMPORTED_MODULE_0__["isTemplatePartActive"])(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content }, parts } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        const walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}
//# sourceMappingURL=modify-template.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/part.js":
/*!*******************************************!*\
  !*** ./node_modules/lit-html/lib/part.js ***!
  \*******************************************/
/*! exports provided: noChange, nothing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noChange", function() { return noChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nothing", function() { return nothing; });
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};
//# sourceMappingURL=part.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/parts.js":
/*!********************************************!*\
  !*** ./node_modules/lit-html/lib/parts.js ***!
  \********************************************/
/*! exports provided: isPrimitive, isIterable, AttributeCommitter, AttributePart, NodePart, BooleanAttributePart, PropertyCommitter, PropertyPart, EventPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return isPrimitive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIterable", function() { return isIterable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeCommitter", function() { return AttributeCommitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributePart", function() { return AttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodePart", function() { return NodePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooleanAttributePart", function() { return BooleanAttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyCommitter", function() { return PropertyCommitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPart", function() { return PropertyPart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventPart", function() { return EventPart; });
/* harmony import */ var _directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directive.js */ "./node_modules/lit-html/lib/directive.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./node_modules/lit-html/lib/dom.js");
/* harmony import */ var _part_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./part.js */ "./node_modules/lit-html/lib/part.js");
/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-instance.js */ "./node_modules/lit-html/lib/template-instance.js");
/* harmony import */ var _template_result_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template-result.js */ "./node_modules/lit-html/lib/template-result.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template.js */ "./node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */






const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        const parts = this.parts;
        // If we're assigning an attribute via syntax like:
        //    attr="${foo}"  or  attr=${foo}
        // but not
        //    attr="${foo} ${bar}" or attr="${foo} baz"
        // then we don't want to coerce the attribute value into one long
        // string. Instead we want to just return the value itself directly,
        // so that sanitizeDOMValue can get the actual value rather than
        // String(value)
        // The exception is if v is an array, in which case we do want to smash
        // it together into a string without calling String() on the array.
        //
        // This also allows trusted values (when using TrustedTypes) being
        // assigned to DOM sinks without being stringified in the process.
        if (l === 1 && strings[0] === '' && strings[1] === '') {
            const v = parts[0].value;
            if (typeof v === 'symbol') {
                return String(v);
            }
            if (typeof v === 'string' || !isIterable(v)) {
                return v;
            }
        }
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"] && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.value)) {
            const directive = this.value;
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this.value === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        this.endNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        part.__insert(this.endNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof _template_result_js__WEBPACK_IMPORTED_MODULE_4__["TemplateResult"]) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__["nothing"]) {
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__["nothing"];
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_3__["TemplateInstance"] &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new _template_instance_js__WEBPACK_IMPORTED_MODULE_3__["TemplateInstance"](template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_1__["removeNodes"])(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this.__pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
    try {
        const options = {
            get capture() {
                eventOptionsSupported = true;
                return false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('test', options, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.removeEventListener('test', options, options);
    }
    catch (_e) {
        // event options not supported
    }
})();
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this.__pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);
//# sourceMappingURL=parts.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/render.js":
/*!*********************************************!*\
  !*** ./node_modules/lit-html/lib/render.js ***!
  \*********************************************/
/*! exports provided: parts, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parts", function() { return parts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./node_modules/lit-html/lib/dom.js");
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parts.js */ "./node_modules/lit-html/lib/parts.js");
/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-factory.js */ "./node_modules/lit-html/lib/template-factory.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */



const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["removeNodes"])(container, container.firstChild);
        parts.set(container, part = new _parts_js__WEBPACK_IMPORTED_MODULE_1__["NodePart"](Object.assign({ templateFactory: _template_factory_js__WEBPACK_IMPORTED_MODULE_2__["templateFactory"] }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};
//# sourceMappingURL=render.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/shady-render.js":
/*!***************************************************!*\
  !*** ./node_modules/lit-html/lib/shady-render.js ***!
  \***************************************************/
/*! exports provided: html, svg, TemplateResult, shadyTemplateFactory, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shadyTemplateFactory", function() { return shadyTemplateFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./node_modules/lit-html/lib/dom.js");
/* harmony import */ var _modify_template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modify-template.js */ "./node_modules/lit-html/lib/modify-template.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render.js */ "./node_modules/lit-html/lib/render.js");
/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-factory.js */ "./node_modules/lit-html/lib/template-factory.js");
/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template-instance.js */ "./node_modules/lit-html/lib/template-instance.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template.js */ "./node_modules/lit-html/lib/template.js");
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lit-html.js */ "./node_modules/lit-html/lit-html.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_6__["html"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_6__["svg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_6__["TemplateResult"]; });

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Module to add shady DOM/shady CSS polyfill support to lit-html template
 * rendering. See the [[render]] method for details.
 *
 * @packageDocumentation
 */
/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */







// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
}
else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected. ` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
        `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = _template_factory_js__WEBPACK_IMPORTED_MODULE_3__["templateCaches"].get(cacheKey);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        _template_factory_js__WEBPACK_IMPORTED_MODULE_3__["templateCaches"].set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_5__["marker"]);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
            window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }
        template = new _template_js__WEBPACK_IMPORTED_MODULE_5__["Template"](result, element);
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
        const templates = _template_factory_js__WEBPACK_IMPORTED_MODULE_3__["templateCaches"].get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template) => {
                const { element: { content } } = template;
                // IE 11 doesn't support the iterable param Set constructor
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s) => {
                    styles.add(s);
                });
                Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__["removeNodesFromTemplate"])(template, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
    shadyRenderSet.add(scopeName);
    // If `renderedDOM` is stamped from a Template, then we need to edit that
    // Template's underlying template element. Otherwise, we create one here
    // to give to ShadyCSS, which still requires one while scoping.
    const templateElement = !!template ? template.element : document.createElement('template');
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll('style');
    const { length } = styles;
    // If there are no styles, skip unnecessary work
    if (length === 0) {
        // Ensure prepareTemplateStyles is called to support adding
        // styles via `prepareAdoptedCssText` since that requires that
        // `prepareTemplateStyles` is called.
        //
        // ShadyCSS will only update styles containing @apply in the template
        // given to `prepareTemplateStyles`. If no lit Template was given,
        // ShadyCSS will not be able to update uses of @apply in any relevant
        // template. However, this is not a problem because we only create the
        // template for the purpose of supporting `prepareAdoptedCssText`,
        // which doesn't support @apply at all.
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < length; i++) {
        const style = styles[i];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    const content = templateElement.content;
    if (!!template) {
        Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__["insertNodeIntoTemplate"])(template, condensedStyle, content.firstChild);
    }
    else {
        content.insertBefore(condensedStyle, content.firstChild);
    }
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector('style');
    if (window.ShadyCSS.nativeShadow && style !== null) {
        // When in native Shadow DOM, ensure the style created by ShadyCSS is
        // included in initially rendered output (`renderedDOM`).
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    }
    else if (!!template) {
        // When no style is left in the template, parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // There can be no style in the template in 2 cases (1) when Shady DOM
        // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
        // is in use ShadyCSS removes the style if it contains no content.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        content.insertBefore(condensedStyle, content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__["removeNodesFromTemplate"])(template, removes);
    }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */
const render = (result, container, options) => {
    if (!options || typeof options !== 'object' || !options.scopeName) {
        throw new Error('The `scopeName` option is required.');
    }
    const scopeName = options.scopeName;
    const hasRendered = _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].has(container);
    const needsScoping = compatibleShadyCSSVersion &&
        container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
        !!container.host;
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    Object(_render_js__WEBPACK_IMPORTED_MODULE_2__["render"])(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
        const part = _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].get(renderContainer);
        _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].delete(renderContainer);
        // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
        // that should apply to `renderContainer` even if the rendered value is
        // not a TemplateInstance. However, it will only insert scoped styles
        // into the document if `prepareTemplateStyles` has already been called
        // for the given scope name.
        const template = part.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_4__["TemplateInstance"] ?
            part.value.template :
            undefined;
        prepareTemplateStyles(scopeName, renderContainer, template);
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["removeNodes"])(container, container.firstChild);
        container.appendChild(renderContainer);
        _render_js__WEBPACK_IMPORTED_MODULE_2__["parts"].set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};
//# sourceMappingURL=shady-render.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/template-factory.js":
/*!*******************************************************!*\
  !*** ./node_modules/lit-html/lib/template-factory.js ***!
  \*******************************************************/
/*! exports provided: templateFactory, templateCaches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateFactory", function() { return templateFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateCaches", function() { return templateCaches; });
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ "./node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_0__["marker"]);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new _template_js__WEBPACK_IMPORTED_MODULE_0__["Template"](result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();
//# sourceMappingURL=template-factory.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/template-instance.js":
/*!********************************************************!*\
  !*** ./node_modules/lit-html/lib/template-instance.js ***!
  \********************************************************/
/*! exports provided: TemplateInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateInstance", function() { return TemplateInstance; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "./node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari does not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = _dom_js__WEBPACK_IMPORTED_MODULE_0__["isCEPolyfill"] ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!Object(_template_js__WEBPACK_IMPORTED_MODULE_1__["isTemplatePartActive"])(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (_dom_js__WEBPACK_IMPORTED_MODULE_0__["isCEPolyfill"]) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
//# sourceMappingURL=template-instance.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/template-result.js":
/*!******************************************************!*\
  !*** ./node_modules/lit-html/lib/template-result.js ***!
  \******************************************************/
/*! exports provided: TemplateResult, SVGTemplateResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return TemplateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return SVGTemplateResult; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "./node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes &&
    trustedTypes.createPolicy('lit-html', { createHTML: (s) => s });
const commentMarker = ` ${_template_js__WEBPACK_IMPORTED_MODULE_1__["marker"]} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment position.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = _template_js__WEBPACK_IMPORTED_MODULE_1__["lastAttributeNameRegex"].exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : _template_js__WEBPACK_IMPORTED_MODULE_1__["nodeMarker"]);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + _template_js__WEBPACK_IMPORTED_MODULE_1__["boundAttributeSuffix"] + attributeMatch[3] +
                    _template_js__WEBPACK_IMPORTED_MODULE_1__["marker"];
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        let value = this.getHTML();
        if (policy !== undefined) {
            // this is secure because `this.strings` is a TemplateStringsArray.
            // TODO: validate this when
            // https://github.com/tc39/proposal-array-is-template-object is
            // implemented.
            value = policy.createHTML(value);
        }
        template.innerHTML = value;
        return template;
    }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class SVGTemplateResult extends TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["reparentNodes"])(content, svgElement.firstChild);
        return template;
    }
}
//# sourceMappingURL=template-result.js.map

/***/ }),

/***/ "./node_modules/lit-html/lib/template.js":
/*!***********************************************!*\
  !*** ./node_modules/lit-html/lib/template.js ***!
  \***********************************************/
/*! exports provided: marker, nodeMarker, markerRegex, boundAttributeSuffix, Template, isTemplatePartActive, createMarker, lastAttributeNameRegex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "marker", function() { return marker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeMarker", function() { return nodeMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markerRegex", function() { return markerRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundAttributeSuffix", function() { return boundAttributeSuffix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return Template; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTemplatePartActive", function() { return isTemplatePartActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMarker", function() { return createMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lastAttributeNameRegex", function() { return lastAttributeNameRegex; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = 
// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
//# sourceMappingURL=template.js.map

/***/ }),

/***/ "./node_modules/lit-html/lit-html.js":
/*!*******************************************!*\
  !*** ./node_modules/lit-html/lit-html.js ***!
  \*******************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor, directive, isDirective, removeNodes, reparentNodes, noChange, nothing, AttributeCommitter, AttributePart, BooleanAttributePart, EventPart, isIterable, isPrimitive, NodePart, PropertyCommitter, PropertyPart, parts, render, templateCaches, templateFactory, TemplateInstance, SVGTemplateResult, TemplateResult, createMarker, isTemplatePartActive, Template, html, svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return svg; });
/* harmony import */ var _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/default-template-processor.js */ "./node_modules/lit-html/lib/default-template-processor.js");
/* harmony import */ var _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/template-result.js */ "./node_modules/lit-html/lib/template-result.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultTemplateProcessor", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["DefaultTemplateProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultTemplateProcessor", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]; });

/* harmony import */ var _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/directive.js */ "./node_modules/lit-html/lib/directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "directive", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__["directive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDirective", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__["isDirective"]; });

/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/dom.js */ "./node_modules/lit-html/lib/dom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeNodes", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["removeNodes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reparentNodes", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["reparentNodes"]; });

/* harmony import */ var _lib_part_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/part.js */ "./node_modules/lit-html/lib/part.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noChange", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__["noChange"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nothing", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__["nothing"]; });

/* harmony import */ var _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/parts.js */ "./node_modules/lit-html/lib/parts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributeCommitter", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["AttributeCommitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["AttributePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BooleanAttributePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["BooleanAttributePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventPart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["EventPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isIterable", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["isIterable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["isPrimitive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["NodePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyCommitter", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["PropertyCommitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["PropertyPart"]; });

/* harmony import */ var _lib_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/render.js */ "./node_modules/lit-html/lib/render.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parts", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__["parts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__["render"]; });

/* harmony import */ var _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/template-factory.js */ "./node_modules/lit-html/lib/template-factory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateCaches", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__["templateCaches"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateFactory", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__["templateFactory"]; });

/* harmony import */ var _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/template-instance.js */ "./node_modules/lit-html/lib/template-instance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateInstance", function() { return _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__["TemplateInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["SVGTemplateResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"]; });

/* harmony import */ var _lib_template_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/template.js */ "./node_modules/lit-html/lib/template.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMarker", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["createMarker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTemplatePartActive", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["isTemplatePartActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["Template"]; });

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @packageDocumentation
 */
/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */




// TODO(justinfagnani): remove line when we get NodePart moving methods








// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"](strings, values, 'html', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["SVGTemplateResult"](strings, values, 'svg', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]);
//# sourceMappingURL=lit-html.js.map

/***/ }),

/***/ "./src/components/constants.js":
/*!*************************************!*\
  !*** ./src/components/constants.js ***!
  \*************************************/
/*! exports provided: KEYS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEYS", function() { return KEYS; });
var KEYS = {
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown'
};


/***/ }),

/***/ "./src/components/cool-game.js":
/*!*************************************!*\
  !*** ./src/components/cool-game.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
/* harmony import */ var _game_game_interface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game/game-interface.js */ "./src/game/game-interface.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/components/constants.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n\t\t\t.on-screen-controller {\n\t\t\t\tposition: fixed;\n\t\t\t\tbottom: 0px;\n\t\t\t\tright: 0px;\n\t\t\t\tuser-select: none;\n\t\t\t\theight: min(min(50vw, 50vh), 400px);\n\t\t\t\twidth: min(min(50vw, 50vh), 400px);\n\t\t\t\tmargin: 5px;\n\t\t\t}\n\t\t\t#speech-bubble {\n\t\t\t\tposition: fixed;\n\t\t\t\tbottom: 20px;\n\t\t\t\tleft: 20px;\n\t\t\t}\n\t\t\t#container {\n\t\t\t\theight: 100%;\n\t\t\t\twidth: 100%;\n\t\t\t}\n\t\t\t#game-canvas {\n\t\t\t\theight: 100%;\n\t\t\t\twidth: 100%;\n\t\t\t\tuser-select: none;\n\t\t\t\t-webkit-touch-callout: none;\n\t\t\t\t-webkit-user-select: none;\n\t\t\t\t-khtml-user-select: none;\n\t\t\t\t-moz-user-select: none;\n\t\t\t\t-ms-user-select: none;\n\t\t\t\tuser-select: none;\n\t\t\t}\n\t\t"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<text-dialog\n\t\t\t\t\t\tid=\"speech-bubble\"\n\t\t\t\t\t\ttext=", "\n\t\t\t\t\t\tname=", " />"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\t\t\t<div id=\"container\">\n\t\t\t\t<canvas id=\"game-canvas\"></canvas>\n\t\t\t\t<virtual-controller\n\t\t\t\t\tclass=\"on-screen-controller\"\n\t\t\t\t\t.clickHandlers=", ">\n\t\t\t\t</virtual-controller>\n\t\t\t\t", "\n\t\t\t</div>\n\t\t"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var CoolGame = /*#__PURE__*/function (_LitElement) {
  _inherits(CoolGame, _LitElement);

  var _super = _createSuper(CoolGame);

  function CoolGame() {
    var _this;

    _classCallCheck(this, CoolGame);

    _this = _super.call(this);
    _this._controllerClickHandlers = {
      right: {
        mouseDown: function mouseDown() {
          _this.gameInterface.playerGoRight();
        },
        mouseUp: function mouseUp() {
          _this.gameInterface.playerStop();
        }
      },
      left: {
        mouseDown: function mouseDown() {
          _this.gameInterface.playerGoLeft();
        },
        mouseUp: function mouseUp() {
          _this.gameInterface.playerStop();
        }
      },
      up: {
        mouseDown: function mouseDown() {
          _this.gameInterface.playerGoUp();
        },
        mouseUp: function mouseUp() {
          _this.gameInterface.playerStop();
        }
      },
      down: {
        mouseDown: function mouseDown() {
          _this.gameInterface.playerGoDown();
        },
        mouseUp: function mouseUp() {
          _this.gameInterface.playerStop();
        }
      }
    };
    _this._showSpeechDialog = false;
    return _this;
  }

  _createClass(CoolGame, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      _get(_getPrototypeOf(CoolGame.prototype), "connectedCallback", this).call(this);

      this.addEventListener('game-speech', this._handleSpeechEvent);
      window.addEventListener('resize', this._canvasResize.bind(this));
      window.addEventListener('keydown', function (_ref) {
        var key = _ref.key;

        switch (key) {
          case _constants__WEBPACK_IMPORTED_MODULE_2__["KEYS"].ARROW_LEFT:
            _this2.gameInterface.playerGoLeft();

            break;

          case _constants__WEBPACK_IMPORTED_MODULE_2__["KEYS"].ARROW_UP:
            _this2.gameInterface.playerGoUp();

            break;

          case _constants__WEBPACK_IMPORTED_MODULE_2__["KEYS"].ARROW_RIGHT:
            _this2.gameInterface.playerGoRight();

            break;

          case _constants__WEBPACK_IMPORTED_MODULE_2__["KEYS"].ARROW_DOWN:
            _this2.gameInterface.playerGoDown();

            break;
        }
      });
      window.addEventListener('keyup', function (_ref2) {
        var key = _ref2.key;
        var directionalKeys = [_constants__WEBPACK_IMPORTED_MODULE_2__["KEYS"].ARROW_LEFT, _constants__WEBPACK_IMPORTED_MODULE_2__["KEYS"].ARROW_RIGHT, _constants__WEBPACK_IMPORTED_MODULE_2__["KEYS"].ARROW_UP, _constants__WEBPACK_IMPORTED_MODULE_2__["KEYS"].ARROW_DOWN];

        if (directionalKeys.indexOf(key) >= 0) {
          _this2.gameInterface.playerStop();
        }
      });
    }
  }, {
    key: "_handleSpeechEvent",
    value: function _handleSpeechEvent(info) {
      var _info$detail = info.detail,
          show = _info$detail.show,
          text = _info$detail.text,
          name = _info$detail.name;
      this._showSpeechDialog = show;
      this._text = text;
      this._name = name;
      this.requestUpdate();
    }
  }, {
    key: "_canvasResize",
    value: function _canvasResize() {
      this._canvas.width = this._canvas.offsetWidth;
      this._canvas.height = this._canvas.offsetHeight;
    }
  }, {
    key: "updated",
    value: function updated() {
      if (!this._canvas) {
        this._canvas = this.shadowRoot.getElementById('game-canvas');

        this._canvasResize();
      }

      if (!this.gameInterface) {
        this.gameInterface = new _game_game_interface_js__WEBPACK_IMPORTED_MODULE_1__["GameInterface"](this._canvas);
        this.gameInterface.start();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject(), this._controllerClickHandlers, this._showSpeechDialog ? Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject2(), this._text, this._name) : null);
    }
  }], [{
    key: "styles",
    get: function get() {
      return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject3());
    }
  }]);

  return CoolGame;
}(lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"]);

customElements.define('cool-game', CoolGame);

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _virtual_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./virtual-controller.js */ "./src/components/virtual-controller.js");
/* harmony import */ var _cool_game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cool-game.js */ "./src/components/cool-game.js");
/* harmony import */ var _text_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text-dialog */ "./src/components/text-dialog.js");




/***/ }),

/***/ "./src/components/text-dialog.js":
/*!***************************************!*\
  !*** ./src/components/text-dialog.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      .speech {\n        padding: ", ";\n        font-size: ", ";\n        font-family: ", ";\n        font-weight: bold;\n        border-radius: 30px;\n        min-width: 40px;\n        text-align: center;\n        align-self: flex-end;\n        position: relative;\n        z-index: 2;\n      }\n\n      .speech:before {\n        content: \"\";\n        position: absolute;\n        background: #f7ede2;\n        height: 60%;\n        width: 106%;\n        left: -3%;\n        border-radius: 50px;\n        top: 10%;\n        z-index: -1;\n      }\n\n      .speech:after {\n        content: \"\";\n        position: absolute;\n        background: #f7ede2;\n        width: 95%;\n        height: 60%;\n        left: 2%;\n        border-radius: 30px;\n        top: 30%;\n        z-index: -1;\n      }\n\n      .content {\n        overflow-wrap: break-word;\n        max-height: 100px;\n        overflow: auto;\n        color: #867760;\n      }\n\n      .name {\n        position: absolute;\n        top: -7%;\n        left: 7%;\n        z-index: 1;\n        color: #662616;\n        font-size: ", ";\n        border-radius: 20px;\n        background: #d68033;\n        padding: 5px 10px 5px 10px;\n        transform: rotate(-5deg);\n      }\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <div class=\"speech\">\n        <div class=\"name\">", "</div>\n        <div class=\"content\">", "</div>\n      </div>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var PADDING = 30;
var FONT_SIZE = 45;
var FONT_FAMILY = 'Arial';

var TextDialog = /*#__PURE__*/function (_LitElement) {
  _inherits(TextDialog, _LitElement);

  var _super = _createSuper(TextDialog);

  function TextDialog() {
    var _this;

    _classCallCheck(this, TextDialog);

    _this = _super.call(this);
    _this.text = 'Zzzzz...';
    _this.name = 'Jimmy';
    return _this;
  }

  _createClass(TextDialog, [{
    key: "render",
    value: function render() {
      if (!this.text) return null;
      return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["html"])(_templateObject(), this.name, this.text);
    }
  }], [{
    key: "properties",
    get: function get() {
      return {
        text: {
          type: String
        },
        name: {
          type: String
        }
      };
    }
  }, {
    key: "styles",
    get: function get() {
      return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject2(), Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["unsafeCSS"])("".concat(PADDING, "px")), Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["unsafeCSS"])("".concat(FONT_SIZE, "px")), Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["unsafeCSS"])(FONT_FAMILY), Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["unsafeCSS"])("".concat(FONT_SIZE / 2, "px")));
    }
  }]);

  return TextDialog;
}(lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"]);

customElements.define('text-dialog', TextDialog);

/***/ }),

/***/ "./src/components/virtual-controller.js":
/*!**********************************************!*\
  !*** ./src/components/virtual-controller.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ "./node_modules/lit-element/lit-element.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n          <rect\n            class=\"button-direction\"\n            @mousedown=", "\n            @mouseup=", "\n            @touchstart=", "\n            @touchend=", "\n            clip-path=\"url(#circle-clip)\"\n            x=\"", "\"\n            y=\"", "\"\n            opacity=\"", "\"\n            width=\"", "\"\n            height=\"", "\"\n            fill=\"", "\"\n          />\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <svg\n        viewBox=\"0 0 ", " ", "\"\n        width=\"", "\"\n        height=\"", "\"\n      >\n        <defs>\n          <clipPath id=\"circle-clip\">\n            <circle cx=\"", "\" cy=\"", "\" r=\"", "\" />\n          </clipPath>\n      </defs>\n      ", "\n    </svg>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var VirtualController = /*#__PURE__*/function (_LitElement) {
  _inherits(VirtualController, _LitElement);

  var _super = _createSuper(VirtualController);

  function VirtualController() {
    var _this;

    _classCallCheck(this, VirtualController);

    _this = _super.call(this);
    _this._clickedOpacity = 1;
    _this._defaultOpacity = 0.4;
    _this._fill = '#f7ede2';
    _this._resizeObserver = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        return entry.target.resizedCallback();
      });
    });
    return _this;
  }

  _createClass(VirtualController, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      _get(_getPrototypeOf(VirtualController.prototype), "connectedCallback", this).call(this);

      this._resizeObserver.observe(this);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _get(_getPrototypeOf(VirtualController.prototype), "disconnectedCallback", this).call(this);

      this._resizeObserver.unobserve(this);
    }
  }, {
    key: "resizedCallback",
    value: function resizedCallback() {
      this.requestUpdate();
    }
  }, {
    key: "_mouseDownHandler",
    value: function _mouseDownHandler(event, dir) {
      switch (dir) {
        case 'left':
          this.clickHandlers.left.mouseDown();
          break;

        case 'right':
          this.clickHandlers.right.mouseDown();
          break;

        case 'down':
          this.clickHandlers.down.mouseDown();
          break;

        case 'up':
          this.clickHandlers.up.mouseDown();
          break;

        default:
          break;
      }

      event.target.setAttribute('opacity', this._clickedOpacity);
    }
  }, {
    key: "_mouseUpHandler",
    value: function _mouseUpHandler(event, dir) {
      switch (dir) {
        case 'left':
          this.clickHandlers.left.mouseUp();
          break;

        case 'right':
          this.clickHandlers.right.mouseUp();
          break;

        case 'down':
          this.clickHandlers.down.mouseUp();
          break;

        case 'up':
          this.clickHandlers.up.mouseUp();
          break;

        default:
          break;
      }

      event.target.setAttribute('opacity', this._defaultOpacity);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$getBoundingClie = this.getBoundingClientRect(),
          width = _this$getBoundingClie.width,
          height = _this$getBoundingClie.height;

      var radius = height / 2;
      var buttonSize = height / 3;
      var buttons = [{
        dir: 'up',
        x: width / 3,
        y: 0
      }, {
        dir: 'down',
        x: width / 3,
        y: 2 * height / 3
      }, {
        dir: 'right',
        x: 2 * width / 3,
        y: height / 3
      }, {
        dir: 'left',
        x: 0,
        y: height / 3
      }];
      return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])(_templateObject(), width, height, width, height, width / 2, height / 2, radius, buttons.map(function (b) {
        return Object(lit_element__WEBPACK_IMPORTED_MODULE_0__["svg"])(_templateObject2(), function (e) {
          _this2._mouseDownHandler(e, b.dir);
        }, function (e) {
          _this2._mouseUpHandler(e, b.dir);
        }, function (e) {
          _this2._mouseDownHandler(e, b.dir);
        }, function (e) {
          _this2._mouseUpHandler(e, b.dir);
        }, b.x, b.y, _this2._defaultOpacity, buttonSize, buttonSize, _this2._fill);
      }));
    }
  }], [{
    key: "properties",
    get: function get() {
      return {
        clickHandlers: {
          type: Object
        }
      };
    }
  }]);

  return VirtualController;
}(lit_element__WEBPACK_IMPORTED_MODULE_0__["LitElement"]);

customElements.define('virtual-controller', VirtualController);

/***/ }),

/***/ "./src/game/game-interface.js":
/*!************************************!*\
  !*** ./src/game/game-interface.js ***!
  \************************************/
/*! exports provided: GameInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameInterface", function() { return GameInterface; });
/* harmony import */ var _parts_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parts/index.js */ "./src/game/parts/index.js");
/* harmony import */ var _parts_asset_info_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parts/asset-info.js */ "./src/game/parts/asset-info.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var GameInterface = /*#__PURE__*/function () {
  function GameInterface(canvas) {
    _classCallCheck(this, GameInterface);

    this.canvas = canvas;

    this._init();
  }

  _createClass(GameInterface, [{
    key: "_dispatchEvent",
    value: function _dispatchEvent(detail) {
      var event = new CustomEvent('game-speech', {
        detail: detail,
        bubbles: true,
        composed: true
      });
      this.canvas.dispatchEvent(event);
    }
  }, {
    key: "_init",
    value: function _init() {
      this._controller = new _parts_index_js__WEBPACK_IMPORTED_MODULE_0__["Controller"]();

      var _this$_computeCameraD = this._computeCameraDimensions(),
          cameraWidth = _this$_computeCameraD.cameraWidth,
          cameraHeight = _this$_computeCameraD.cameraHeight;

      this._gameMap = new _parts_index_js__WEBPACK_IMPORTED_MODULE_0__["GameMap"](_parts_asset_info_js__WEBPACK_IMPORTED_MODULE_1__["WORLD"], cameraWidth, cameraHeight);

      var _this$_computeCameraI = this._computeCameraInitPosition(cameraWidth, cameraHeight),
          cameraX = _this$_computeCameraI.cameraX,
          cameraY = _this$_computeCameraI.cameraY;

      this._camera = new _parts_index_js__WEBPACK_IMPORTED_MODULE_0__["Camera"](cameraWidth, cameraHeight, cameraX, cameraY);
      this._display = new _parts_index_js__WEBPACK_IMPORTED_MODULE_0__["Display"](this.canvas, this._gameMap, this._camera, cameraWidth, cameraHeight);
      this._game = new _parts_index_js__WEBPACK_IMPORTED_MODULE_0__["Game"](this._gameMap, this._camera, this._dispatchEvent.bind(this));
      this._engine = new _parts_index_js__WEBPACK_IMPORTED_MODULE_0__["Engine"](this._render.bind(this), this._update.bind(this));
    }
  }, {
    key: "_computeCameraDimensions",
    value: function _computeCameraDimensions() {
      var cameraSize = _parts_asset_info_js__WEBPACK_IMPORTED_MODULE_1__["WORLD"].cameraSize;
      var ratioWidth, ratioHeight;

      var _this$canvas$getBound = this.canvas.getBoundingClientRect(),
          width = _this$canvas$getBound.width,
          height = _this$canvas$getBound.height;

      if (height > width) {
        ratioWidth = 1;
        ratioHeight = height / width;
      } else {
        ratioHeight = 1;
        ratioWidth = width / height;
      }

      return {
        cameraHeight: cameraSize * ratioHeight,
        cameraWidth: cameraSize * ratioWidth
      };
    }
  }, {
    key: "_computeCameraInitPosition",
    value: function _computeCameraInitPosition(cameraWidth, cameraHeight) {
      var firstPosition = this._gameMap.startPositions[this._gameMap.startPositions.length - 1];

      this._gameMap.startPositions.pop();

      return {
        cameraX: firstPosition[0] - cameraWidth / 2,
        cameraY: firstPosition[1] - cameraHeight / 2
      };
    }
  }, {
    key: "_render",
    value: function _render() {
      this._display.drawMap(0);

      this._display.drawCharacters(this._game.getCharactersDisplayInfo());

      this._display.drawMap(1);

      this._display.displayScore(this._game.getScore());

      this._display.render();
    }
  }, {
    key: "playerGoLeft",
    value: function playerGoLeft() {
      this._controller.setActiveDirection('left');
    }
  }, {
    key: "playerGoRight",
    value: function playerGoRight() {
      this._controller.setActiveDirection('right');
    }
  }, {
    key: "playerGoUp",
    value: function playerGoUp() {
      this._controller.setActiveDirection('up');
    }
  }, {
    key: "playerGoDown",
    value: function playerGoDown() {
      this._controller.setActiveDirection('down');
    }
  }, {
    key: "playerStop",
    value: function playerStop() {
      this._controller.setActiveDirection(null);
    }
  }, {
    key: "_update",
    value: function _update() {
      this._game.update();

      var direction = this._controller.getActiveDirection();

      switch (direction) {
        case 'left':
          this._game.moveLeft();

          break;

        case 'right':
          this._game.moveRight();

          break;

        case 'up':
          this._game.moveUp();

          break;

        case 'down':
          this._game.moveDown();

          break;

        default:
          this._game.setIdle();

          break;
      }
    }
  }, {
    key: "start",
    value: function start() {
      this._engine.start();
    }
  }]);

  return GameInterface;
}();

/***/ }),

/***/ "./src/game/mixins/collision-detector.js":
/*!***********************************************!*\
  !*** ./src/game/mixins/collision-detector.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Mixin that contains the common collision detection
 * methods.
 * this._pointCollision is specific to the class using this mixin.
 * For instance:
 * - npc: _pointCollision = is within npc boundary
 * - map: _pointCollision = is within any of the obstacle of the map
 * @param {*} base - base class to extent
 */
var CollisionDetector = function CollisionDetector(base) {
  return /*#__PURE__*/function (_base) {
    _inherits(_class, _base);

    var _super = _createSuper(_class);

    function _class(config) {
      _classCallCheck(this, _class);

      return _super.call(this, config);
    }
    /**
     * Checks whether points of a segment
     * collides with obstacles using _pointDetection
     * Loops along the constant coordinate
     * @param {*} constantCoord
     * @param {*} startCoord
     * @param {*} length
     * @param {*} isHorizontal
     */


    _createClass(_class, [{
      key: "_segmentCollision",
      value: function _segmentCollision(constantCoord, startCoord, length, isHorizontal) {
        var collision = false;
        var increment = 1; // in px

        for (var i = startCoord; i < startCoord + length; i += increment) {
          collision = collision || (isHorizontal ? this._pointCollision(i, constantCoord) : this._pointCollision(constantCoord, i));
        }

        return collision;
      }
      /**
       * Detects whether a foreign object defined by a rect:
       * (x,y) is the top left corner and width and wight
      	 						foreign object
      	(x,y) ->  +-----------+ <- (x + width, y)
      						|           |
      						|           |
      						|           |
      						+-----------+ <- (x + width, y + height)
      						 <- width ->
      	 * has one of its four side colliding with one of the obtacle
       * @param {*} x
       * @param {*} y
       * @param {*} width
       * @param {*} height
       * @param {*} offset
       */

    }, {
      key: "collision",
      value: function collision(x, y, width, height, offset) {
        // right
        var constantXRight = x + width + offset;

        var right = this._segmentCollision(constantXRight, y, height, false); // left


        var constantXLeft = x - offset;

        var left = this._segmentCollision(constantXLeft, y, height, false); // top


        var constantYTop = y - offset;

        var top = this._segmentCollision(constantYTop, x, width, true); // bottom


        var constantYBottom = y + height + offset;

        var bottom = this._segmentCollision(constantYBottom, x, width, true);

        return {
          left: left,
          right: right,
          top: top,
          bottom: bottom
        };
      }
    }]);

    return _class;
  }(base);
};

/* harmony default export */ __webpack_exports__["default"] = (CollisionDetector);

/***/ }),

/***/ "./src/game/mixins/image-loader.js":
/*!*****************************************!*\
  !*** ./src/game/mixins/image-loader.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ImageLoader = function ImageLoader(base) {
  return /*#__PURE__*/function (_base) {
    _inherits(_class, _base);

    var _super = _createSuper(_class);

    function _class(config) {
      var _this;

      _classCallCheck(this, _class);

      _this = _super.call(this, config);
      _this._image = new Image();
      _this._image.src = config.src;
      return _this;
    }

    _createClass(_class, [{
      key: "getImage",
      value: function getImage() {
        return this._image;
      }
    }]);

    return _class;
  }(base);
};

/* harmony default export */ __webpack_exports__["default"] = (ImageLoader);

/***/ }),

/***/ "./src/game/mixins/index.js":
/*!**********************************!*\
  !*** ./src/game/mixins/index.js ***!
  \**********************************/
/*! exports provided: ImageLoader, StateHandler, CollisionDetector, MultiMixins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-loader.js */ "./src/game/mixins/image-loader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageLoader", function() { return _image_loader_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _state_handler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state-handler.js */ "./src/game/mixins/state-handler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StateHandler", function() { return _state_handler_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _collision_detector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collision-detector.js */ "./src/game/mixins/collision-detector.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollisionDetector", function() { return _collision_detector_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _multi_mixins_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./multi-mixins.js */ "./src/game/mixins/multi-mixins.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiMixins", function() { return _multi_mixins_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./src/game/mixins/multi-mixins.js":
/*!*****************************************!*\
  !*** ./src/game/mixins/multi-mixins.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function MultiMixins(mixins) {
  var _mixins = mixins;

  if (!Array.isArray(mixins)) {
    _mixins = [mixins];
  }

  var _class = function _class() {
    _classCallCheck(this, _class);
  };

  _mixins.forEach(function (mixin) {
    _class = mixin(_class);
  });

  return _class;
}

/* harmony default export */ __webpack_exports__["default"] = (MultiMixins);

/***/ }),

/***/ "./src/game/mixins/state-handler.js":
/*!******************************************!*\
  !*** ./src/game/mixins/state-handler.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_frame_animator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/frame-animator */ "./src/game/utils/frame-animator.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var StateHandler = function StateHandler(base) {
  return /*#__PURE__*/function (_base) {
    _inherits(_class, _base);

    var _super = _createSuper(_class);

    function _class(assetInfo) {
      var _this;

      _classCallCheck(this, _class);

      _this = _super.call(this, assetInfo);
      _this._moveSequences = assetInfo.moveSequences;
      _this._actions = Object.keys(assetInfo.moveSequences);

      _this._init();

      _this._timer = 0;
      _this._delay = assetInfo.delay;
      _this._frameAnimator = new _utils_frame_animator__WEBPACK_IMPORTED_MODULE_0__["default"](assetInfo, _this._state);
      return _this;
    }

    _createClass(_class, [{
      key: "_init",
      value: function _init() {
        var _this2 = this;

        this._state = {
          action: this._actions[0],
          actionSequenceIndex: {}
        };

        this._actions.forEach(function (action) {
          _this2._state.actionSequenceIndex[action] = 0;
        });
      }
    }, {
      key: "_updateState",
      value: function _updateState(newAction) {
        if (this._state.action !== newAction) {
          // if new action, we reset the timer
          this._timer = 0; // update current action

          this._state.action = newAction;
        }

        var sequenceLen = this._moveSequences[newAction].length; // timer is up => go to the next frame from the sequence

        if (this._timer >= this._delay) {
          this._timer = 0; // increment the current action

          this._state.actionSequenceIndex[newAction] = (this._state.actionSequenceIndex[newAction] + 1) % sequenceLen;
        }

        this._timer++;
      }
    }, {
      key: "getMoveState",
      value: function getMoveState() {
        return {
          action: this._state.action,
          sequenceIndex: this._state.actionSequenceIndex[this._state.action]
        };
      }
    }, {
      key: "getCurrentFrame",
      value: function getCurrentFrame() {
        var _this$getMoveState = this.getMoveState(),
            action = _this$getMoveState.action,
            sequenceIndex = _this$getMoveState.sequenceIndex;

        return this._frameAnimator.getCurrentFrame(action, sequenceIndex);
      }
    }, {
      key: "moveRight",
      value: function moveRight() {
        this._updateState('walk_right');
      }
    }, {
      key: "moveLeft",
      value: function moveLeft() {
        this._updateState('walk_left');
      }
    }, {
      key: "moveUp",
      value: function moveUp() {
        this._updateState('walk_up');
      }
    }, {
      key: "moveDown",
      value: function moveDown() {
        this._updateState('walk_down');
      }
    }, {
      key: "face",
      value: function face(direction) {
        return this._state.action.indexOf(direction) >= 0;
      }
    }, {
      key: "setIdle",
      value: function setIdle() {
        if (this.face('right')) this._updateState('idle_right');
        if (this.face('left')) this._updateState('idle_left');
        if (this.face('up')) this._updateState('idle_up');
        if (this.face('down')) this._updateState('idle_down');
      }
    }]);

    return _class;
  }(base);
};

/* harmony default export */ __webpack_exports__["default"] = (StateHandler);

/***/ }),

/***/ "./src/game/parts/asset-info.js":
/*!**************************************!*\
  !*** ./src/game/parts/asset-info.js ***!
  \**************************************/
/*! exports provided: WORLD, PLAYER, CAT, CAT2, CAT3, CAT4, OCEAN, COIN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORLD", function() { return WORLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLAYER", function() { return PLAYER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAT", function() { return CAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAT2", function() { return CAT2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAT3", function() { return CAT3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAT4", function() { return CAT4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OCEAN", function() { return OCEAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COIN", function() { return COIN; });
var WORLD = {
  src: './assets/garden_with_ocean.png',
  cols: 16,
  rows: 16,
  size: 64,
  // tile size
  uniqueKeys: {
    coin: 7,
    grass: 1,
    tree_bottom: 3,
    tree_top: 4,
    path: 2,
    ocean: 6,
    bush: 5
  },
  elements: {
    tree: {
      layers: [3],
      // tile index in the image
      top: 4,
      // tile index in the image
      key: 3 // key in playableAreaKeys

    },
    grass: {
      layers: [1],
      // tile index in the image
      key: 1 // key in playableAreaKeys

    },
    path: {
      layers: [2],
      // tile index in the image
      key: 2 // key in playableAreaKeys

    },
    coin_on_grass: {
      layers: [1, 7],
      // tile index in the image
      key: 4 // key in playableAreaKeys

    },
    coin_on_path: {
      layers: [2, 7],
      // tile index in the image
      key: 7 // key in playableAreaKeys

    },
    ocean: {
      layers: [6],
      // tile index in the image
      key: 6 // key in playableAreaKeys

    },
    bush: {
      layers: [1, 5],
      // tile index in the image
      key: 5 // key in playableAreaKeys

    },
    start_position: {
      layers: [1],
      key: -1
    }
  },
  cameraSize: 700,
  obstacles: new Set([3, 6, 5]),
  // keys here
  playableAreaKeys: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 4, 4, 4, 4, 1, 4, 1, 1, 1, 4, 1, 1, 4, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 3, 1, 3, 3, 1, -1, 5, 1, 1, 1, 3, 1, 1, 1, 4, 4, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 4, 1, 1, 3, 1, 1, 5, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 5, 1, 1, 1, 1, 1, 1, 1, 4, 1, 5, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3, 3, 1, 4, -1, 4, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 5, 1, 2, 2, 1, 1, 4, 1, 1, 1, 3, 3, 1, 4, 1, 1, 1, 1, 7, 2, 1, 1, 1, 1, 4, 1, 3, 3, 1, 3, 4, 1, 1, 4, 2, 2, 1, 1, 1, -1, 1, 3, 3, 3, 4, 1, -1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3]
};
var PLAYER = {
  src: './assets/moi.png',
  cols: 4,
  rows: 4,
  width: 36,
  // tile size
  height: 48,
  // tile size
  moveSequences: {
    'idle_down': [[0, 0]],
    // initial state
    'walk_down': [[1, 0], [2, 0], [3, 0]],
    'walk_left': [[1, 1], [2, 1], [3, 1]],
    'idle_left': [[0, 1]],
    'walk_up': [[1, 2], [2, 2], [3, 2]],
    'idle_up': [[0, 2]],
    'walk_right': [[1, 3], [2, 3], [3, 3]],
    'idle_right': [[0, 3]]
  },
  delay: 5
};
var CAT = {
  src: './assets/cat-frames.png',
  cols: 2,
  rows: 1,
  size: 40,
  // tile size
  moveSequences: {
    'idle_down': [[1, 0], [1, 3]],
    // initial state
    'idle_up': [[4, 0], [4, 3]],
    'idle_left': [[2, 0], [2, 3]],
    'idle_right': [[3, 0], [3, 3]],
    'walk_up': [[4, 1], [4, 2]],
    'walk_right': [[3, 1], [3, 0], [3, 2], [3, 3]],
    'walk_left': [[2, 1], [2, 0], [2, 2], [2, 3]],
    'walk_down': [[1, 1], [1, 0], [1, 2], [1, 3]]
  },
  delay: 10
};
var CAT2 = {
  src: './assets/cat-frames-2.png',
  cols: 2,
  rows: 1,
  size: 40,
  // tile size
  moveSequences: {
    'idle_down': [[1, 0], [1, 3]],
    // initial state
    'idle_up': [[4, 0], [4, 3]],
    'idle_left': [[2, 0], [2, 3]],
    'idle_right': [[3, 0], [3, 3]],
    'walk_up': [[4, 1], [4, 2]],
    'walk_right': [[3, 1], [3, 0], [3, 2], [3, 3]],
    'walk_left': [[2, 1], [2, 0], [2, 2], [2, 3]],
    'walk_down': [[1, 1], [1, 0], [1, 2], [1, 3]]
  },
  delay: 10
};
var CAT3 = {
  src: './assets/cat-frames-3.png',
  cols: 2,
  rows: 1,
  size: 40,
  // tile size
  moveSequences: {
    'idle_down': [[1, 0], [1, 3]],
    // initial state
    'idle_up': [[4, 0], [4, 3]],
    'idle_left': [[2, 0], [2, 3]],
    'idle_right': [[3, 0], [3, 3]],
    'walk_up': [[4, 1], [4, 2]],
    'walk_right': [[3, 1], [3, 0], [3, 2], [3, 3]],
    'walk_left': [[2, 1], [2, 0], [2, 2], [2, 3]],
    'walk_down': [[1, 1], [1, 0], [1, 2], [1, 3]]
  },
  delay: 10
};
var CAT4 = {
  src: './assets/cat-frames-4.png',
  cols: 2,
  rows: 1,
  size: 40,
  // tile size
  moveSequences: {
    'idle_down': [[1, 0], [1, 3]],
    // initial state
    'idle_up': [[4, 0], [4, 3]],
    'idle_left': [[2, 0], [2, 3]],
    'idle_right': [[3, 0], [3, 3]],
    'walk_up': [[4, 1], [4, 2]],
    'walk_right': [[3, 1], [3, 0], [3, 2], [3, 3]],
    'walk_left': [[2, 1], [2, 0], [2, 2], [2, 3]],
    'walk_down': [[1, 1], [1, 0], [1, 2], [1, 3]]
  },
  delay: 10
};
var OCEAN = {
  src: './assets/ocean-four-frames.png',
  cols: 3,
  rows: 1,
  size: 63,
  movement: 'wave',
  moveSequences: {
    'wave': [[0, 0], [0, 1], [0, 2], [0, 3]]
  },
  delay: 50
};
var COIN = {
  src: './assets/coin.png',
  cols: 8,
  rows: 1,
  size: 16,
  movement: 'rotate',
  moveSequences: {
    'rotate': [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]]
  },
  delay: 7
};

/***/ }),

/***/ "./src/game/parts/camera.js":
/*!**********************************!*\
  !*** ./src/game/parts/camera.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CAMERA_SPEED = 5;
/**
 * map - instance of GameMap
 */

var Camera = /*#__PURE__*/function () {
  function Camera(width, height, x, y) {
    _classCallCheck(this, Camera);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = CAMERA_SPEED;
    this.stop = {
      right: false,
      left: false,
      up: false,
      down: false
    };
  }

  _createClass(Camera, [{
    key: "moveRight",
    value: function moveRight() {
      if (this.stop.right) return;
      this.x += 1;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      if (this.stop.left) return;
      this.x -= 1;
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      if (this.stop.up) return;
      this.y -= 1;
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      if (this.stop.down) return;
      this.y += 1;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.stop.right = false;
      this.stop.left = false;
      this.stop.up = false;
      this.stop.down = false;
    }
  }]);

  return Camera;
}();

/* harmony default export */ __webpack_exports__["default"] = (Camera);

/***/ }),

/***/ "./src/game/parts/controller.js":
/*!**************************************!*\
  !*** ./src/game/parts/controller.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller = /*#__PURE__*/function () {
  function Controller() {
    _classCallCheck(this, Controller);

    this._activeDirection = null;
  }

  _createClass(Controller, [{
    key: "setActiveDirection",
    value: function setActiveDirection(direction) {
      this._activeDirection = direction;
    }
  }, {
    key: "getActiveDirection",
    value: function getActiveDirection() {
      return this._activeDirection;
    }
  }, {
    key: "isIdle",
    value: function isIdle() {
      return this._activeDirection === null;
    }
  }]);

  return Controller;
}();

/* harmony default export */ __webpack_exports__["default"] = (Controller);

/***/ }),

/***/ "./src/game/parts/display.js":
/*!***********************************!*\
  !*** ./src/game/parts/display.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _moving_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving-element.js */ "./src/game/parts/moving-element.js");
/* harmony import */ var _asset_info_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asset-info.js */ "./src/game/parts/asset-info.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var testString = 'Hello';
var expectedWithWithFont = 169;

var Display = /*#__PURE__*/function () {
  function Display(canvas, map, camera, canvasWidth, canvasHeight) {
    _classCallCheck(this, Display);

    this.context = canvas.getContext('2d');
    this._map = map;
    this.camera = camera;

    this._init();

    this._createBufferCanvas(canvasWidth, canvasHeight);
  }
  /**
   * Creates an offscreen canvas where elements will be drawn
   * one after the other, before rendering the whole thing on the
   * onscreen canvas
   * @param {*} width
   * @param {*} height
   */


  _createClass(Display, [{
    key: "_createBufferCanvas",
    value: function _createBufferCanvas(width, height) {
      this.buffer = document.createElement('canvas').getContext('2d'), this.buffer.canvas.width = width;
      this.buffer.canvas.height = height;
    }
  }, {
    key: "_init",
    value: function _init() {
      this._mapImage = this._map.getImage();
      this._tileSize = this._map.size;
      this._ocean = new _moving_element_js__WEBPACK_IMPORTED_MODULE_0__["default"](_asset_info_js__WEBPACK_IMPORTED_MODULE_1__["OCEAN"]);
      this._coin = new _moving_element_js__WEBPACK_IMPORTED_MODULE_0__["default"](_asset_info_js__WEBPACK_IMPORTED_MODULE_1__["COIN"]);
    }
  }, {
    key: "drawCharacters",
    value: function drawCharacters(players) {
      var _iterator = _createForOfIteratorHelper(players),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var player = _step.value;
          this.drawCharacter(player);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "drawCharacter",
    value: function drawCharacter(_ref) {
      var _this$buffer;

      var image = _ref.image,
          frame = _ref.frame,
          x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height;

      // this.buffer.fillStyle = 'red';
      // this.buffer.fillRect(
      //   x,
      //   y,
      //   width,
      //   height
      // );
      (_this$buffer = this.buffer).drawImage.apply(_this$buffer, [image].concat(_toConsumableArray(frame), [x, y, width, height]));
    }
  }, {
    key: "_drawOcean",
    value: function _drawOcean(x, y) {
      var _this$buffer2;

      (_this$buffer2 = this.buffer).drawImage.apply(_this$buffer2, [this._ocean.getImage()].concat(_toConsumableArray(this._ocean.getCurrentFrame()), [x, // target x
      y, // target y
      this._tileSize, // target width
      this._tileSize // target height
      ]));
    }
  }, {
    key: "_drawCoin",
    value: function _drawCoin(x, y, size) {
      var _this$buffer3;

      (_this$buffer3 = this.buffer).drawImage.apply(_this$buffer3, [this._coin.getImage()].concat(_toConsumableArray(this._coin.getCurrentFrame()), [x, // target x
      y, // target y
      size || this._coin.size, // target width
      size || this._coin.size // target height
      ]));
    }
  }, {
    key: "drawMap",
    value: function drawMap(layer) {
      this._ocean.updateMovement();

      this._coin.updateMovement();

      var startCol = Math.floor(this.camera.x / this._tileSize);
      var endCol = startCol + Math.floor(this.camera.width / this._tileSize) + 1;
      var startRow = Math.floor(this.camera.y / this._tileSize);
      var endRow = startRow + Math.floor(this.camera.height / this._tileSize) + 1;

      for (var col = startCol; col <= endCol; col++) {
        for (var row = startRow; row <= endRow; row++) {
          var x = Math.floor(col * this._tileSize - this.camera.x);
          var y = Math.floor(row * this._tileSize - this.camera.y);

          var currentTile = this._map.getTile(layer, col, row);

          switch (currentTile) {
            case this._map.uniqueKeys.ocean:
              this._drawOcean(x, y);

              break;

            case this._map.uniqueKeys.coin:
              var _x = this._tileSize / 2 - this._coin.size / 2 + x;

              var _y = this._tileSize / 2 - this._coin.size / 2 + y;

              this._drawCoin(_x, _y);

              break;

            default:
              this._drawMapElement(currentTile, x, y);

              break;
          }
        }
      }
    }
  }, {
    key: "_drawMapElement",
    value: function _drawMapElement(tileIndex, x, y) {
      this.buffer.drawImage(this._mapImage, // image
      (tileIndex - 1) * this._tileSize, // source x
      0, // source y
      this._tileSize, // source width
      this._tileSize, // source height
      x, // target x
      y, // target y
      this._tileSize, // target width
      this._tileSize // target height
      );
    }
  }, {
    key: "displayScore",
    value: function displayScore(score) {
      this.buffer.font = '48px Bungee Inline';
      this.buffer.fillStyle = '#fff';

      if (Math.floor(this.buffer.measureText(testString).width) !== expectedWithWithFont) {
        return;
      }

      var margin = 10;
      var offset = 5;
      var coinSize = this._tileSize / 2;
      var coinX = margin;
      var coinY = 50 - coinSize - 1;
      this.buffer.fillText("\xD7 ".concat(score), coinSize + coinX + offset, 50);

      this._drawCoin(coinX, coinY, coinSize);
    }
  }, {
    key: "render",
    value: function render() {
      this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }
  }]);

  return Display;
}();

/* harmony default export */ __webpack_exports__["default"] = (Display);

/***/ }),

/***/ "./src/game/parts/engine.js":
/*!**********************************!*\
  !*** ./src/game/parts/engine.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Engine = /*#__PURE__*/function () {
  function Engine(render, update) {
    _classCallCheck(this, Engine);

    this.animatedFrameRequest;
    this.tickLength = 1000 / 60;
    this.update = update;
    this.render = render;
  }

  _createClass(Engine, [{
    key: "run",
    value: function run(tFrame) {
      // theorical next tick
      var nextTick = this.lastTick + this.tickLength;
      var numTicks = 0; // we're late, let's count the ticks we missed

      if (tFrame > nextTick) {
        numTicks = Math.floor((tFrame - this.lastTick) / this.tickLength);
      } // apply an update for each tick we missed


      for (var i = 0; i < numTicks; i++) {
        this.lastTick = this.lastTick + this.tickLength;
        this.update();
      }

      this.render();
      this.animatedFrameRequest = window.requestAnimationFrame(this.handleRun);
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      this.lastTick = performance.now();

      this.handleRun = function (t) {
        return _this.run(t);
      };

      this.animatedFrameRequest = window.requestAnimationFrame(this.handleRun);
    }
  }, {
    key: "stop",
    value: function stop() {
      window.cancelAnimationFrame(this.animatedFrameRequest);
    }
  }]);

  return Engine;
}();

/* harmony default export */ __webpack_exports__["default"] = (Engine);

/***/ }),

/***/ "./src/game/parts/game-map.js":
/*!************************************!*\
  !*** ./src/game/parts/game-map.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixins/index.js */ "./src/game/mixins/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var BORDER_CONTENT = 6;

var GameMap = /*#__PURE__*/function (_MultiMixins) {
  _inherits(GameMap, _MultiMixins);

  var _super = _createSuper(GameMap);

  function GameMap(assetInfo, cameraWidth, cameraHeight) {
    var _this;

    _classCallCheck(this, GameMap);

    _this = _super.call(this, assetInfo);

    for (var _i = 0, _Object$entries = Object.entries(assetInfo); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          prop = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (value === undefined) continue;
      _this[prop] = value;
    }

    _this.borderLength = Math.ceil(Math.max(cameraHeight, cameraWidth) / (2 * assetInfo.size));

    _this._buildCompleteMap();

    _this._buildColisionMap();

    return _this;
  }

  _createClass(GameMap, [{
    key: "getTile",
    value: function getTile() {
      var layer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var col = arguments.length > 1 ? arguments[1] : undefined;
      var row = arguments.length > 2 ? arguments[2] : undefined;
      return this.layers[layer][row * this.cols + col];
    }
  }, {
    key: "_buildCompleteMap",

    /**
     * Builds the full map, a square of tiles, which includes:
     * - the playable area in the center
     * - a border, non playable around the playable area
     */
    value: function _buildCompleteMap() {
      this._buildBottomLayer();

      this._buildTopLayer();
    }
    /**
    * Builds the full map, a square of tiles, which includes:
    * - the playable area in the center
    * - a border, non playable around the playable area
    */

  }, {
    key: "_buildBottomLayer",
    value: function _buildBottomLayer() {
      var _this2 = this;

      this.entireMapOfKeys = this._addBorder(this.playableAreaKeys, this.rows, this.cols, this.borderLength, this.elements.ocean.key);
      var mapWithTileIndices = this.entireMapOfKeys.map(function (key) {
        var mapElement = Object.values(_this2.elements).filter(function (e) {
          return e.key === key;
        })[0];
        return mapElement.layers[0];
      });
      this.layers = [mapWithTileIndices];
      this.rows = this.rows + 2 * this.borderLength; // new number of rows of the full map

      this.cols = this.cols + 2 * this.borderLength; // new number of columns of the full map
    }
    /**
     * Completes the map with the top layers for elements
     * that have 2 stacked layers
     * Also keeps track of the grass positions for later use in the Game class.
     */

  }, {
    key: "_buildTopLayer",
    value: function _buildTopLayer() {
      var _this3 = this;

      var topLayer = new Array(this.rows * this.cols).fill(0);
      this.startPositions = [];
      this.entireMapOfKeys.forEach(function (key, i) {
        var element = _this3._getElementByKey(key);

        if (key === _this3.elements.start_position.key) {
          _this3.startPositions.push([Math.floor(i / _this3.rows) * _this3.size, // x
          i % _this3.rows * _this3.size]);
        } // tile above the current tile on the top layer


        if (element.top) {
          topLayer[i - _this3.rows] = element.top;
        } // same tile index on top layer


        if (element.layers.length > 1) {
          topLayer[i] = element.layers[1];
        }
      });
      this.layers[1] = topLayer;
    }
    /**
     * Builds an array that contain the same number of elements
     * as the map this.layer[0] and this.layer[1].
     * Filled with 0s and 1s.
     * 0 means no collision
     * 1 means collision
     */

  }, {
    key: "_buildColisionMap",
    value: function _buildColisionMap() {
      var _this4 = this;

      this._collisionMap = this.entireMapOfKeys.map(function (e) {
        if (_this4.obstacles.has(e)) return 1;
        return 0;
      });
    }
    /**
     * Returns true if the point (x,y) belongs to a tile
     * marked as an obstacle on the map. false otherwise.
     * @param {*} x
     * @param {*} y
     */

  }, {
    key: "_pointCollision",
    value: function _pointCollision(x, y) {
      var col = Math.floor(x / this.size);
      var row = Math.floor(y / this.size);
      var isObstacle = Boolean(this._collisionMap[row * this.cols + col]);

      if (isObstacle) {
        var obstacle = {
          x: col * this.size,
          y: row * this.size,
          width: this.size,
          height: this.size
        };
        var offset = 2;
        var collision = x >= obstacle.x + offset && x <= obstacle.x + obstacle.width - offset && y >= obstacle.y + offset && y <= obstacle.y + obstacle.height - offset;
        return collision;
      } else {
        return false;
      }
    }
  }, {
    key: "_getElementByKey",
    value: function _getElementByKey(key) {
      return Object.values(this.elements).filter(function (el) {
        return key === el.key;
      })[0];
    }
  }, {
    key: "checkAndHideCoins",
    value: function checkAndHideCoins(_ref, callback) {
      var x = _ref.x,
          y = _ref.y;
      var col = Math.floor(x / this.size);
      var row = Math.floor(y / this.size);
      var elementFound = this.layers[1][row * this.cols + col];
      var coinKey = this.uniqueKeys.coin;

      if (elementFound === coinKey) {
        this.layers[1][row * this.cols + col] = 0;
        callback();
      }
    }
    /**
     * Logs an array in the shape of a square
     * @param {*} game - array of numbers
     * @param {*} numOfRows - number of rows of the square to print
     */

  }, {
    key: "_prettyPrint",
    value: function _prettyPrint(game, numOfRows) {
      var prettyString = '\n';
      var i = 0;
      game.forEach(function (e) {
        if (i === numOfRows) {
          prettyString += '\n';
          i = 0;
        }

        prettyString += String(e) + '  ';
        i++;
      });
      prettyString += '\n';
    }
    /**
     * This method takes a square of tiles that is represented by an array of numbers
     * and returns a bigger array that is the first one with extra rows and columns around.
     *
     * Example:
     *
     * playableGame:
     * [
     *  1, 1, 1,
     *  1, 1, 1,
     *  1, 1, 1
     * ]
     * numRows = numCols = 3 (dimension of playableGame)
     * borderLen = 2
     * fillNumber = 9
     *
     * output:
     * [
     *  9, 9, 9, 9, 9, 9, 9
     *  9, 9, 9, 9, 9, 9, 9
     *  9, 9, 1, 1, 1, 9, 9
     *  9, 9, 1, 1, 1, 9, 9
     *  9, 9, 1, 1, 1, 9, 9
     *  9, 9, 9, 9, 9, 9, 9
     *  9, 9, 9, 9, 9, 9, 9
     * ]
     *
     * the playableGame is surounded by 2 (=borderLen) rows/columns of 9 (fillNumber)
     *
     * @param {*} playableGame - array that represent the playable area
     * @param {*} numRows - number of rows of the playable area
     * @param {*} numCols - number of columns of the playable area
     * @param {*} borderLen - the border width (in number of row/column) to add all around the playable area
     * @param {*} fillNumber - the content of the border
     */

  }, {
    key: "_addBorder",
    value: function _addBorder(playableGame, numRows, numCols, borderLen, fillNumber) {
      var newGame = [];
      var newRowLen = numRows + 2 * borderLen;
      var firstLine = new Array(newRowLen).fill(fillNumber);

      for (var i = 0; i < borderLen; i++) {
        newGame = [].concat(_toConsumableArray(newGame), _toConsumableArray(firstLine));
      }

      for (var _i2 = 0; _i2 < numRows; _i2++) {
        var newLine = [].concat(_toConsumableArray(new Array(borderLen).fill(fillNumber)), _toConsumableArray(playableGame.slice(numCols * _i2, numCols * _i2 + numRows)), _toConsumableArray(new Array(borderLen).fill(fillNumber)));
        newGame = [].concat(_toConsumableArray(newGame), _toConsumableArray(newLine));
      }

      for (var _i3 = 0; _i3 < borderLen; _i3++) {
        newGame = [].concat(_toConsumableArray(newGame), _toConsumableArray(firstLine));
      }

      return newGame;
    }
  }, {
    key: "width",
    get: function get() {
      return this.size * this.rows;
    }
  }, {
    key: "height",
    get: function get() {
      return this.size * this.cols;
    }
  }]);

  return GameMap;
}(Object(_mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["MultiMixins"])([_mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["ImageLoader"], _mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["CollisionDetector"]]));

/* harmony default export */ __webpack_exports__["default"] = (GameMap);

/***/ }),

/***/ "./src/game/parts/game.js":
/*!********************************!*\
  !*** ./src/game/parts/game.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _asset_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asset-info */ "./src/game/parts/asset-info.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/game/parts/player.js");
/* harmony import */ var _npc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./npc */ "./src/game/parts/npc.js");
/* harmony import */ var _npc_cats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./npc-cats */ "./src/game/parts/npc-cats.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var Game = /*#__PURE__*/function () {
  function Game(map, camera, dispatchFunction) {
    _classCallCheck(this, Game);

    this.collisionOffset = camera.speed;
    this.map = map;
    this.camera = camera;
    this.dispatchFunction = dispatchFunction;
    this._availableInitialPositions = _toConsumableArray(this.map.startPositions);

    this._initPlayer();

    this.npcs = [];

    this._initNPCs();
  }

  _createClass(Game, [{
    key: "_initPlayer",
    value: function _initPlayer() {
      this.player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](_asset_info__WEBPACK_IMPORTED_MODULE_0__["PLAYER"], this.camera);
      this.player.screenX = this.camera.width / 2;
      this.player.screenY = this.camera.height / 2;
    }
  }, {
    key: "_initNPCs",
    value: function _initNPCs() {
      var _this = this;

      this.npcs = _npc_cats__WEBPACK_IMPORTED_MODULE_3__["CATS"].map(function (npcDesc) {
        var position = _this._getRandomInitialPosition();

        return new _npc__WEBPACK_IMPORTED_MODULE_2__["default"]({
          assetInfo: npcDesc.asset,
          camera: _this.camera,
          dialog: {
            name: npcDesc.name,
            text: npcDesc.text
          },
          speed: npcDesc.speed,
          maxDistance: npcDesc.maxDistance,
          initialDirection: npcDesc.initialDirection,
          screenX: position[0] - _this.camera.x,
          screenY: position[1] - _this.camera.y
        });
      });
    }
    /**
     * This method returns one of those position and ensures that
     * there's no collision with map elements and the player.
     * Once a position is returned, it is removed from this._availableInitialPositions
     * to avoid having two NPCs with the same initial position.
     */

  }, {
    key: "_getRandomInitialPosition",
    value: function _getRandomInitialPosition() {
      var position = this._availableInitialPositions[this._availableInitialPositions.length - 1];

      this._availableInitialPositions.pop();

      return position;
    }
  }, {
    key: "update",
    value: function update() {
      this.player.update();
      this.collide();
      this.npcsMove();
    }
  }, {
    key: "npcsMove",
    value: function npcsMove() {
      var _this2 = this;

      if (!this.npcs) return;
      this.npcs.forEach(function (npc, i) {
        var otherNPCs = _toConsumableArray(_this2.npcs);

        otherNPCs.splice(i, 1);
        var x = npc.x,
            y = npc.y,
            width = npc.width,
            height = npc.height;

        var playerCollision = _this2.player.collision(x, y, width, height, _this2.collisionOffset);

        var _this2$checkNPCsColli = _this2.checkNPCsCollision(otherNPCs, {
          x: x,
          y: y,
          width: width,
          height: height
        }),
            npcCollision = _this2$checkNPCsColli.collision;

        var mapCollision = _this2.map.collision(x, y, width, height, _this2.collisionOffset);

        var metOstacle = Object.values(mapCollision).reduce(function (acc, value) {
          return acc || value;
        }, false);
        var metNPC = Object.values(npcCollision).reduce(function (acc, value) {
          return acc || value;
        }, false);
        npc.move(metOstacle, playerCollision, metNPC);
      });
    }
  }, {
    key: "getCharactersDisplayInfo",
    value: function getCharactersDisplayInfo() {
      return [this.player.getDisplayInfo()].concat(_toConsumableArray(this.npcs ? this.npcs.map(function (npc) {
        return npc.getDisplayInfo();
      }) : []));
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      for (var i = 0; i < this.camera.speed; i++) {
        this.camera.moveLeft();
        this.player.update();
        this.collide();
      }

      this.player.moveLeft(); // NPCs are unaffected by the camera movement
      // need to compensate

      var _iterator = _createForOfIteratorHelper(this.npcs),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var npc = _step.value;
          npc.keepImmobile('left');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      for (var i = 0; i < this.camera.speed; i++) {
        this.camera.moveRight();
        this.player.update();
        this.collide();
      }

      this.player.moveRight(); // NPCs are unaffected by the camera movement
      // need to compensate

      var _iterator2 = _createForOfIteratorHelper(this.npcs),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var npc = _step2.value;
          npc.keepImmobile('right');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      for (var i = 0; i < this.camera.speed; i++) {
        this.camera.moveUp();
        this.player.update();
        this.collide();
      }

      this.player.moveUp(); // NPCs are unaffected by the camera movement
      // need to compensate

      var _iterator3 = _createForOfIteratorHelper(this.npcs),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var npc = _step3.value;
          npc.keepImmobile('up');
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      for (var i = 0; i < this.camera.speed; i++) {
        this.camera.moveDown();
        this.player.update();
        this.collide();
      }

      this.player.moveDown(); // NPCs are unaffected by the camera movement
      // need to compensate

      var _iterator4 = _createForOfIteratorHelper(this.npcs),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var npc = _step4.value;
          npc.keepImmobile('down');
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "setIdle",
    value: function setIdle() {
      this.player.setIdle();
    }
  }, {
    key: "checkNPCsCollision",
    value: function checkNPCsCollision(npcList, _ref) {
      var _this3 = this;

      var x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height;
      var collision = {
        left: false,
        right: false,
        top: false,
        bottom: false
      };
      if (!this.npcs) return {
        collision: collision
      };
      var npcIndex = null;
      npcList.forEach(function (npc, i) {
        var currentCollision = npc.collision(x, y, width, height, _this3.collisionOffset);
        collision.left = collision.left || currentCollision.left;
        collision.right = collision.right || currentCollision.right;
        collision.top = collision.top || currentCollision.top;
        collision.bottom = collision.bottom || currentCollision.bottom;

        if (Object.values(currentCollision).reduce(function (acc, value) {
          return acc || value;
        }, false)) {
          npcIndex = i;
        }
      });
      return {
        collision: collision,
        npcIndex: npcIndex
      };
    }
  }, {
    key: "collide",
    value: function collide() {
      // get player size and coord
      var _this$player = this.player,
          height = _this$player.height,
          width = _this$player.width,
          x = _this$player.x,
          y = _this$player.y; // get collision info

      var mapCollision = this.map.collision(x, y, width, height, this.collisionOffset);

      var _this$checkNPCsCollis = this.checkNPCsCollision(this.npcs, {
        x: x,
        y: y,
        width: width,
        height: height
      }),
          npcCollision = _this$checkNPCsCollis.collision,
          npcIndex = _this$checkNPCsCollis.npcIndex;

      var left = mapCollision.left || npcCollision.left;
      var right = mapCollision.right || npcCollision.right;
      var bottom = mapCollision.bottom || npcCollision.bottom;
      var top = mapCollision.top || npcCollision.top; // stop camera if necessary

      this.camera.stop.left = left;
      this.camera.stop.right = right;
      this.camera.stop.down = bottom;
      this.camera.stop.up = top; // display speech dialog

      if (bottom && this.player.face('down') || top && this.player.face('up') || right && this.player.face('right') || left && this.player.face('left')) {
        this._handleSpeech(npcIndex);
      } else {
        this._cancelSpeechDialog();
      }

      this.map.checkAndHideCoins({
        x: x + width / 2,
        y: y + height / 2
      }, this.foundCoin.bind(this));
    }
  }, {
    key: "foundCoin",
    value: function foundCoin() {
      this.player.coinsCollected++;
    }
  }, {
    key: "getScore",
    value: function getScore() {
      return this.player.coinsCollected;
    }
  }, {
    key: "_handleSpeech",
    value: function _handleSpeech(npcIndex) {
      if (this._speechDialogInvoked || typeof npcIndex !== 'number') return;

      this._displaySpeechDialog(this.npcs[npcIndex].dialog);
    }
  }, {
    key: "_displaySpeechDialog",
    value: function _displaySpeechDialog(content) {
      this._speechDialogInvoked = true;
      this.dispatchFunction(_objectSpread({
        show: true
      }, content));
    }
  }, {
    key: "_cancelSpeechDialog",
    value: function _cancelSpeechDialog() {
      if (this._speechDialogInvoked) {
        this._speechDialogInvoked = false;
        this.dispatchFunction({
          show: false
        });
      }
    }
  }]);

  return Game;
}();

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/game/parts/index.js":
/*!*********************************!*\
  !*** ./src/game/parts/index.js ***!
  \*********************************/
/*! exports provided: Game, Engine, Player, Controller, Camera, Display, GameMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game/parts/game.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return _game_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _engine_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine.js */ "./src/game/parts/engine.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Engine", function() { return _engine_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player.js */ "./src/game/parts/player.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return _player_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controller.js */ "./src/game/parts/controller.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return _controller_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _camera_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./camera.js */ "./src/game/parts/camera.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Camera", function() { return _camera_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./display.js */ "./src/game/parts/display.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Display", function() { return _display_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _game_map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game-map.js */ "./src/game/parts/game-map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameMap", function() { return _game_map_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });









/***/ }),

/***/ "./src/game/parts/moving-element.js":
/*!******************************************!*\
  !*** ./src/game/parts/moving-element.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MovingElement; });
/* harmony import */ var _mixins_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixins/index.js */ "./src/game/mixins/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MovingElement = /*#__PURE__*/function (_MultiMixins) {
  _inherits(MovingElement, _MultiMixins);

  var _super = _createSuper(MovingElement);

  function MovingElement(asset) {
    var _this;

    _classCallCheck(this, MovingElement);

    _this = _super.call(this, asset);
    _this.asset = asset;
    _this.size = asset.size;
    return _this;
  }

  _createClass(MovingElement, [{
    key: "updateMovement",
    value: function updateMovement() {
      this._updateState(this.asset.movement);
    }
  }]);

  return MovingElement;
}(Object(_mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["MultiMixins"])([_mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["ImageLoader"], _mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["StateHandler"]]));



/***/ }),

/***/ "./src/game/parts/npc-cats.js":
/*!************************************!*\
  !*** ./src/game/parts/npc-cats.js ***!
  \************************************/
/*! exports provided: CATS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CATS", function() { return CATS; });
/* harmony import */ var _asset_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asset-info */ "./src/game/parts/asset-info.js");

var CATS = [{
  asset: _asset_info__WEBPACK_IMPORTED_MODULE_0__["CAT"],
  name: "Jasper",
  text: "Meoooow ❤️",
  speed: 0.3,
  maxDistance: 400,
  initialDirection: "right"
}, {
  asset: _asset_info__WEBPACK_IMPORTED_MODULE_0__["CAT2"],
  name: "Pancake",
  text: "Miaouuuu!",
  speed: 0.7,
  initialDirection: "left"
}, {
  asset: _asset_info__WEBPACK_IMPORTED_MODULE_0__["CAT3"],
  name: "Butters",
  text: "Got any food?",
  speed: 0.3,
  maxDistance: 200,
  initialDirection: "up"
}, {
  asset: _asset_info__WEBPACK_IMPORTED_MODULE_0__["CAT4"],
  name: "Tom",
  text: "Woof woof 🐶",
  speed: 0.5,
  maxDistance: 1000,
  initialDirection: "down"
}];

/***/ }),

/***/ "./src/game/parts/npc.js":
/*!*******************************!*\
  !*** ./src/game/parts/npc.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/game/parts/player.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var NPC = /*#__PURE__*/function (_Player) {
  _inherits(NPC, _Player);

  var _super = _createSuper(NPC);

  function NPC() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        assetInfo = _ref.assetInfo,
        camera = _ref.camera,
        rest = _objectWithoutProperties(_ref, ["assetInfo", "camera"]);

    _classCallCheck(this, NPC);

    _this = _super.call(this, assetInfo, camera);

    for (var _i = 0, _Object$entries = Object.entries(rest); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          prop = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (value === undefined) continue;
      _this[prop] = value;
    }

    _this._setInitialDirection();

    _this._distanceTraveled = 0;
    return _this;
  }

  _createClass(NPC, [{
    key: "_setInitialDirection",
    value: function _setInitialDirection() {
      switch (this.initialDirection) {
        case 'down':
          this.moveDown();
          break;

        case 'up':
          this.moveUp();
          break;

        case 'right':
          this.moveRight();
          break;

        case 'left':
          this.moveLeft();
          break;

        default:
          this.moveDown();
          break;
      }
    }
    /**
     * Adjusts screenXY to make sure the npc movement
     * is independent from the camera movement
     * @param {String} direction - up, down, right or left
     */

  }, {
    key: "keepImmobile",
    value: function keepImmobile(direction) {
      switch (direction) {
        case 'up':
          if (!this.camera.stop.up) {
            this.screenY += this.camera.speed;
          }

          break;

        case 'down':
          if (!this.camera.stop.down) {
            this.screenY -= this.camera.speed;
          }

          break;

        case 'right':
          if (!this.camera.stop.right) {
            this.screenX -= this.camera.speed;
          }

          break;

        case 'left':
          if (!this.camera.stop.left) {
            this.screenX += this.camera.speed;
          }

          break;

        default:
          break;
      }
    }
    /**
     * Defines how the NPC moves on the map
     * and how it reacts when meeting an obstacle or the main player
     * @param {Boolean} mapCollision - met an obstacle on the map
     * @param {Object} playerCollision - collision info with player
     * @param {Boolean} metOtherNPCs - met other NPCs
     */

  }, {
    key: "move",
    value: function move(mapCollision, playerCollision, metOtherNPCs) {
      // handle player collision
      if (playerCollision.left) {
        if (!this.face('left')) this.moveLeft();
        this.setIdle();
        return;
      } else if (playerCollision.right) {
        if (!this.face('right')) this.moveRight();
        this.setIdle();
        return;
      } else if (playerCollision.top) {
        if (!this.face('up')) this.moveUp();
        this.setIdle();
        return;
      } else if (playerCollision.bottom) {
        if (!this.face('down')) this.moveDown();
        this.setIdle();
        return;
      } // look down when immobile


      if (!this.speed) {
        this.setIdle();
        return;
      }

      ; // change direction if met obstacle or met NPC

      if (mapCollision || metOtherNPCs) {
        // reset distance and turn around
        if (this.face('left')) {
          this.moveRight();
        } else if (this.face('right')) {
          this.moveLeft();
        } else if (this.face('up')) {
          this.moveDown();
        } else if (this.face('down')) {
          this.moveUp();
        }

        this._distanceTraveled = 0;
      }

      if (this.face('left')) {
        this.moveLeft();
        this.screenX -= this.speed;
      } else if (this.face('right')) {
        this.moveRight();
        this.screenX += this.speed;
      } else if (this.face('up')) {
        this.moveUp();
        this.screenY -= this.speed;
      } else if (this.face('down')) {
        this.moveDown();
        this.screenY += this.speed;
      }

      if (this._distanceTraveled > this.maxDistance) {
        this._randomlyDirectionMove();

        this._distanceTraveled = 0;
      } else {
        this._distanceTraveled += this.speed;
      }
    }
  }, {
    key: "_randomlyDirectionMove",
    value: function _randomlyDirectionMove() {
      var allDirection = [this.moveLeft, this.moveRight, this.moveUp, this.moveDown];
      var randomIndex = Math.floor(Math.random() * allDirection.length);
      var randomMethod = allDirection[randomIndex];
      randomMethod.bind(this)();
    }
  }]);

  return NPC;
}(_player_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (NPC);

/***/ }),

/***/ "./src/game/parts/player.js":
/*!**********************************!*\
  !*** ./src/game/parts/player.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _mixins_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixins/index.js */ "./src/game/mixins/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var Player = /*#__PURE__*/function (_MultiMixins) {
  _inherits(Player, _MultiMixins);

  var _super = _createSuper(Player);

  function Player(assetInfo, camera) {
    var _this;

    _classCallCheck(this, Player);

    _this = _super.call(this, assetInfo);
    _this.camera = camera;
    _this.width = assetInfo.width || assetInfo.size;
    _this.height = assetInfo.height || assetInfo.size;
    _this.coinsCollected = 0;
    return _this;
  }

  _createClass(Player, [{
    key: "update",

    /**
     * x and y are the coordinates in the game
     * screenX and screenY are the coordinates on the screen
     */
    value: function update() {
      this.x = this._screenX + this.camera.x;
      this.y = this._screenY + this.camera.y;
    }
  }, {
    key: "getDisplayInfo",
    value: function getDisplayInfo() {
      return {
        image: this.getImage(),
        frame: this.getCurrentFrame(),
        x: this._screenX,
        y: this._screenY,
        width: this.width,
        height: this.height
      };
    }
  }, {
    key: "_pointCollision",
    value: function _pointCollision(x, y) {
      var offset = 5;
      return x >= this.x + offset && x <= this.x + this.width - offset && y >= this.y + offset && y <= this.y + this.height - offset;
    }
  }, {
    key: "screenX",
    get: function get() {
      return this._screenX;
    },
    set: function set(value) {
      this._screenX = value;
      this.x = value + this.camera.x;
    }
  }, {
    key: "screenY",
    get: function get() {
      return this._screenY;
    },
    set: function set(value) {
      this._screenY = value;
      this.y = value + this.camera.y;
    }
  }]);

  return Player;
}(Object(_mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["MultiMixins"])([_mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["ImageLoader"], _mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["StateHandler"], _mixins_index_js__WEBPACK_IMPORTED_MODULE_0__["CollisionDetector"]]));



/***/ }),

/***/ "./src/game/utils/frame-animator.js":
/*!******************************************!*\
  !*** ./src/game/utils/frame-animator.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FrameAnimator = /*#__PURE__*/function () {
  function FrameAnimator(assetInfo, initialState) {
    _classCallCheck(this, FrameAnimator);

    for (var _i = 0, _Object$entries = Object.entries(assetInfo); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          prop = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (value === undefined) continue;
      this[prop] = value;
    }

    this._frameSets = this._createFrameSets();
  }

  _createClass(FrameAnimator, [{
    key: "_getTile",
    value: function _getTile(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          row = _ref2[0],
          col = _ref2[1];

      var width = this.width || this.size;
      var height = this.height || this.size;
      return [col * width, // x
      row * height, // y
      width, // width
      height // height
      ];
    }
  }, {
    key: "_createFrameSets",
    value: function _createFrameSets() {
      var frameSets = {};

      for (var _i2 = 0, _Object$entries2 = Object.entries(this.moveSequences); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            move = _Object$entries2$_i[0],
            sequence = _Object$entries2$_i[1];

        frameSets[move] = sequence.map(this._getTile.bind(this));
      }

      return frameSets;
    }
  }, {
    key: "getCurrentFrame",
    value: function getCurrentFrame(action, sequenceIndex) {
      return this._frameSets[action][sequenceIndex];
    }
  }]);

  return FrameAnimator;
}();

/* harmony default export */ __webpack_exports__["default"] = (FrameAnimator);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/index.js */ "./src/components/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1lbGVtZW50L2xpYi9jc3MtdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQtZWxlbWVudC9saWIvZGVjb3JhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl0LWVsZW1lbnQvbGliL3VwZGF0aW5nLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1lbGVtZW50L2xpdC1lbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saWIvZGVmYXVsdC10ZW1wbGF0ZS1wcm9jZXNzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9tb2RpZnktdGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9wYXJ0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saWIvcGFydHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9zaGFkeS1yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi90ZW1wbGF0ZS1mYWN0b3J5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saWIvdGVtcGxhdGUtaW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi90ZW1wbGF0ZS1yZXN1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvbGl0LWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2Nvb2wtZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90ZXh0LWRpYWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aXJ0dWFsLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvZ2FtZS1pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvbWl4aW5zL2NvbGxpc2lvbi1kZXRlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9taXhpbnMvaW1hZ2UtbG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL21peGlucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9taXhpbnMvbXVsdGktbWl4aW5zLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL21peGlucy9zdGF0ZS1oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL3BhcnRzL2Fzc2V0LWluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcGFydHMvY2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL3BhcnRzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcGFydHMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9wYXJ0cy9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcGFydHMvZ2FtZS1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcGFydHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9wYXJ0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9wYXJ0cy9tb3ZpbmctZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9wYXJ0cy9ucGMtY2F0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9wYXJ0cy9ucGMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcGFydHMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL3V0aWxzL2ZyYW1lLWFuaW1hdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJLRVlTIiwiQVJST1dfUklHSFQiLCJBUlJPV19MRUZUIiwiQVJST1dfVVAiLCJBUlJPV19ET1dOIiwiQ29vbEdhbWUiLCJfY29udHJvbGxlckNsaWNrSGFuZGxlcnMiLCJyaWdodCIsIm1vdXNlRG93biIsImdhbWVJbnRlcmZhY2UiLCJwbGF5ZXJHb1JpZ2h0IiwibW91c2VVcCIsInBsYXllclN0b3AiLCJsZWZ0IiwicGxheWVyR29MZWZ0IiwidXAiLCJwbGF5ZXJHb1VwIiwiZG93biIsInBsYXllckdvRG93biIsIl9zaG93U3BlZWNoRGlhbG9nIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9oYW5kbGVTcGVlY2hFdmVudCIsIndpbmRvdyIsIl9jYW52YXNSZXNpemUiLCJiaW5kIiwia2V5IiwiZGlyZWN0aW9uYWxLZXlzIiwiaW5kZXhPZiIsImluZm8iLCJkZXRhaWwiLCJzaG93IiwidGV4dCIsIm5hbWUiLCJfdGV4dCIsIl9uYW1lIiwicmVxdWVzdFVwZGF0ZSIsIl9jYW52YXMiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic2hhZG93Um9vdCIsImdldEVsZW1lbnRCeUlkIiwiR2FtZUludGVyZmFjZSIsInN0YXJ0IiwiaHRtbCIsImNzcyIsIkxpdEVsZW1lbnQiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIlBBRERJTkciLCJGT05UX1NJWkUiLCJGT05UX0ZBTUlMWSIsIlRleHREaWFsb2ciLCJ0eXBlIiwiU3RyaW5nIiwidW5zYWZlQ1NTIiwiVmlydHVhbENvbnRyb2xsZXIiLCJfY2xpY2tlZE9wYWNpdHkiLCJfZGVmYXVsdE9wYWNpdHkiLCJfZmlsbCIsIl9yZXNpemVPYnNlcnZlciIsIlJlc2l6ZU9ic2VydmVyIiwiZW50cmllcyIsImZvckVhY2giLCJlbnRyeSIsInRhcmdldCIsInJlc2l6ZWRDYWxsYmFjayIsIm9ic2VydmUiLCJ1bm9ic2VydmUiLCJldmVudCIsImRpciIsImNsaWNrSGFuZGxlcnMiLCJzZXRBdHRyaWJ1dGUiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyYWRpdXMiLCJidXR0b25TaXplIiwiYnV0dG9ucyIsIngiLCJ5Iiwic3ZnIiwibWFwIiwiYiIsImUiLCJfbW91c2VEb3duSGFuZGxlciIsIl9tb3VzZVVwSGFuZGxlciIsIk9iamVjdCIsImNhbnZhcyIsIl9pbml0IiwiQ3VzdG9tRXZlbnQiLCJidWJibGVzIiwiY29tcG9zZWQiLCJkaXNwYXRjaEV2ZW50IiwiX2NvbnRyb2xsZXIiLCJDb250cm9sbGVyIiwiX2NvbXB1dGVDYW1lcmFEaW1lbnNpb25zIiwiY2FtZXJhV2lkdGgiLCJjYW1lcmFIZWlnaHQiLCJfZ2FtZU1hcCIsIkdhbWVNYXAiLCJXT1JMRCIsIl9jb21wdXRlQ2FtZXJhSW5pdFBvc2l0aW9uIiwiY2FtZXJhWCIsImNhbWVyYVkiLCJfY2FtZXJhIiwiQ2FtZXJhIiwiX2Rpc3BsYXkiLCJEaXNwbGF5IiwiX2dhbWUiLCJHYW1lIiwiX2Rpc3BhdGNoRXZlbnQiLCJfZW5naW5lIiwiRW5naW5lIiwiX3JlbmRlciIsIl91cGRhdGUiLCJjYW1lcmFTaXplIiwicmF0aW9XaWR0aCIsInJhdGlvSGVpZ2h0IiwiZmlyc3RQb3NpdGlvbiIsInN0YXJ0UG9zaXRpb25zIiwibGVuZ3RoIiwicG9wIiwiZHJhd01hcCIsImRyYXdDaGFyYWN0ZXJzIiwiZ2V0Q2hhcmFjdGVyc0Rpc3BsYXlJbmZvIiwiZGlzcGxheVNjb3JlIiwiZ2V0U2NvcmUiLCJyZW5kZXIiLCJzZXRBY3RpdmVEaXJlY3Rpb24iLCJ1cGRhdGUiLCJkaXJlY3Rpb24iLCJnZXRBY3RpdmVEaXJlY3Rpb24iLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsIm1vdmVVcCIsIm1vdmVEb3duIiwic2V0SWRsZSIsIkNvbGxpc2lvbkRldGVjdG9yIiwiYmFzZSIsImNvbmZpZyIsImNvbnN0YW50Q29vcmQiLCJzdGFydENvb3JkIiwiaXNIb3Jpem9udGFsIiwiY29sbGlzaW9uIiwiaW5jcmVtZW50IiwiaSIsIl9wb2ludENvbGxpc2lvbiIsIm9mZnNldCIsImNvbnN0YW50WFJpZ2h0IiwiX3NlZ21lbnRDb2xsaXNpb24iLCJjb25zdGFudFhMZWZ0IiwiY29uc3RhbnRZVG9wIiwidG9wIiwiY29uc3RhbnRZQm90dG9tIiwiYm90dG9tIiwiSW1hZ2VMb2FkZXIiLCJfaW1hZ2UiLCJJbWFnZSIsInNyYyIsIk11bHRpTWl4aW5zIiwibWl4aW5zIiwiX21peGlucyIsIkFycmF5IiwiaXNBcnJheSIsIl9jbGFzcyIsIm1peGluIiwiU3RhdGVIYW5kbGVyIiwiYXNzZXRJbmZvIiwiX21vdmVTZXF1ZW5jZXMiLCJtb3ZlU2VxdWVuY2VzIiwiX2FjdGlvbnMiLCJrZXlzIiwiX3RpbWVyIiwiX2RlbGF5IiwiZGVsYXkiLCJfZnJhbWVBbmltYXRvciIsIkZyYW1lQW5pbWF0b3IiLCJfc3RhdGUiLCJhY3Rpb24iLCJhY3Rpb25TZXF1ZW5jZUluZGV4IiwibmV3QWN0aW9uIiwic2VxdWVuY2VMZW4iLCJzZXF1ZW5jZUluZGV4IiwiZ2V0TW92ZVN0YXRlIiwiZ2V0Q3VycmVudEZyYW1lIiwiX3VwZGF0ZVN0YXRlIiwiZmFjZSIsImNvbHMiLCJyb3dzIiwic2l6ZSIsInVuaXF1ZUtleXMiLCJjb2luIiwiZ3Jhc3MiLCJ0cmVlX2JvdHRvbSIsInRyZWVfdG9wIiwicGF0aCIsIm9jZWFuIiwiYnVzaCIsImVsZW1lbnRzIiwidHJlZSIsImxheWVycyIsImNvaW5fb25fZ3Jhc3MiLCJjb2luX29uX3BhdGgiLCJzdGFydF9wb3NpdGlvbiIsIm9ic3RhY2xlcyIsIlNldCIsInBsYXlhYmxlQXJlYUtleXMiLCJQTEFZRVIiLCJDQVQiLCJDQVQyIiwiQ0FUMyIsIkNBVDQiLCJPQ0VBTiIsIm1vdmVtZW50IiwiQ09JTiIsIkNBTUVSQV9TUEVFRCIsInNwZWVkIiwic3RvcCIsIl9hY3RpdmVEaXJlY3Rpb24iLCJ0ZXN0U3RyaW5nIiwiZXhwZWN0ZWRXaXRoV2l0aEZvbnQiLCJjYW1lcmEiLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiX21hcCIsIl9jcmVhdGVCdWZmZXJDYW52YXMiLCJidWZmZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJfbWFwSW1hZ2UiLCJnZXRJbWFnZSIsIl90aWxlU2l6ZSIsIl9vY2VhbiIsIk1vdmluZ0VsZW1lbnQiLCJfY29pbiIsInBsYXllcnMiLCJwbGF5ZXIiLCJkcmF3Q2hhcmFjdGVyIiwiaW1hZ2UiLCJmcmFtZSIsImRyYXdJbWFnZSIsImxheWVyIiwidXBkYXRlTW92ZW1lbnQiLCJzdGFydENvbCIsIk1hdGgiLCJmbG9vciIsImVuZENvbCIsInN0YXJ0Um93IiwiZW5kUm93IiwiY29sIiwicm93IiwiY3VycmVudFRpbGUiLCJnZXRUaWxlIiwiX2RyYXdPY2VhbiIsIl94IiwiX3kiLCJfZHJhd0NvaW4iLCJfZHJhd01hcEVsZW1lbnQiLCJ0aWxlSW5kZXgiLCJzY29yZSIsImZvbnQiLCJmaWxsU3R5bGUiLCJtZWFzdXJlVGV4dCIsIm1hcmdpbiIsImNvaW5TaXplIiwiY29pblgiLCJjb2luWSIsImZpbGxUZXh0IiwiYW5pbWF0ZWRGcmFtZVJlcXVlc3QiLCJ0aWNrTGVuZ3RoIiwidEZyYW1lIiwibmV4dFRpY2siLCJsYXN0VGljayIsIm51bVRpY2tzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaGFuZGxlUnVuIiwicGVyZm9ybWFuY2UiLCJub3ciLCJ0IiwicnVuIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJCT1JERVJfQ09OVEVOVCIsInByb3AiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImJvcmRlckxlbmd0aCIsImNlaWwiLCJtYXgiLCJfYnVpbGRDb21wbGV0ZU1hcCIsIl9idWlsZENvbGlzaW9uTWFwIiwiX2J1aWxkQm90dG9tTGF5ZXIiLCJfYnVpbGRUb3BMYXllciIsImVudGlyZU1hcE9mS2V5cyIsIl9hZGRCb3JkZXIiLCJtYXBXaXRoVGlsZUluZGljZXMiLCJtYXBFbGVtZW50IiwidmFsdWVzIiwiZmlsdGVyIiwidG9wTGF5ZXIiLCJmaWxsIiwiZWxlbWVudCIsIl9nZXRFbGVtZW50QnlLZXkiLCJwdXNoIiwiX2NvbGxpc2lvbk1hcCIsImhhcyIsImlzT2JzdGFjbGUiLCJCb29sZWFuIiwib2JzdGFjbGUiLCJlbCIsImNhbGxiYWNrIiwiZWxlbWVudEZvdW5kIiwiY29pbktleSIsImdhbWUiLCJudW1PZlJvd3MiLCJwcmV0dHlTdHJpbmciLCJwbGF5YWJsZUdhbWUiLCJudW1Sb3dzIiwibnVtQ29scyIsImJvcmRlckxlbiIsImZpbGxOdW1iZXIiLCJuZXdHYW1lIiwibmV3Um93TGVuIiwiZmlyc3RMaW5lIiwibmV3TGluZSIsInNsaWNlIiwiZGlzcGF0Y2hGdW5jdGlvbiIsImNvbGxpc2lvbk9mZnNldCIsIl9hdmFpbGFibGVJbml0aWFsUG9zaXRpb25zIiwiX2luaXRQbGF5ZXIiLCJucGNzIiwiX2luaXROUENzIiwiUGxheWVyIiwic2NyZWVuWCIsInNjcmVlblkiLCJDQVRTIiwibnBjRGVzYyIsInBvc2l0aW9uIiwiX2dldFJhbmRvbUluaXRpYWxQb3NpdGlvbiIsIk5QQyIsImFzc2V0IiwiZGlhbG9nIiwibWF4RGlzdGFuY2UiLCJpbml0aWFsRGlyZWN0aW9uIiwiY29sbGlkZSIsIm5wY3NNb3ZlIiwibnBjIiwib3RoZXJOUENzIiwic3BsaWNlIiwicGxheWVyQ29sbGlzaW9uIiwiY2hlY2tOUENzQ29sbGlzaW9uIiwibnBjQ29sbGlzaW9uIiwibWFwQ29sbGlzaW9uIiwibWV0T3N0YWNsZSIsInJlZHVjZSIsImFjYyIsIm1ldE5QQyIsIm1vdmUiLCJnZXREaXNwbGF5SW5mbyIsImtlZXBJbW1vYmlsZSIsIm5wY0xpc3QiLCJucGNJbmRleCIsImN1cnJlbnRDb2xsaXNpb24iLCJfaGFuZGxlU3BlZWNoIiwiX2NhbmNlbFNwZWVjaERpYWxvZyIsImNoZWNrQW5kSGlkZUNvaW5zIiwiZm91bmRDb2luIiwiY29pbnNDb2xsZWN0ZWQiLCJfc3BlZWNoRGlhbG9nSW52b2tlZCIsIl9kaXNwbGF5U3BlZWNoRGlhbG9nIiwiY29udGVudCIsInJlc3QiLCJfc2V0SW5pdGlhbERpcmVjdGlvbiIsIl9kaXN0YW5jZVRyYXZlbGVkIiwibWV0T3RoZXJOUENzIiwiX3JhbmRvbWx5RGlyZWN0aW9uTW92ZSIsImFsbERpcmVjdGlvbiIsInJhbmRvbUluZGV4IiwicmFuZG9tIiwicmFuZG9tTWV0aG9kIiwiX3NjcmVlblgiLCJfc2NyZWVuWSIsImluaXRpYWxTdGF0ZSIsIl9mcmFtZVNldHMiLCJfY3JlYXRlRnJhbWVTZXRzIiwiZnJhbWVTZXRzIiwic2VxdWVuY2UiLCJfZ2V0VGlsZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkZBQTJGLE1BQU07QUFDakc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxtQzs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsaUJBQWlCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMs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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDOzs7Ozs7Ozs7Ozs7QUMzWUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxlQUFlO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELEtBQUs7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDLHdCQUF3QixJQUFJO0FBQzVCLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxzQkFBc0I7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLDBCQUEwQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7O0FDdE5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQytFO0FB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bnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvKipcbkBsaWNlbnNlXG5Db3B5cmlnaHQgKGMpIDIwMTkgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG5odHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHQgVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0IFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZVxuZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHQgQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXNcbnBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnRcbmZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuKi9cbi8qKlxuICogV2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIGBhZG9wdGVkU3R5bGVTaGVldHNgLlxuICovXG5leHBvcnQgY29uc3Qgc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzID0gKHdpbmRvdy5TaGFkb3dSb290KSAmJlxuICAgICh3aW5kb3cuU2hhZHlDU1MgPT09IHVuZGVmaW5lZCB8fCB3aW5kb3cuU2hhZHlDU1MubmF0aXZlU2hhZG93KSAmJlxuICAgICgnYWRvcHRlZFN0eWxlU2hlZXRzJyBpbiBEb2N1bWVudC5wcm90b3R5cGUpICYmXG4gICAgKCdyZXBsYWNlJyBpbiBDU1NTdHlsZVNoZWV0LnByb3RvdHlwZSk7XG5jb25zdCBjb25zdHJ1Y3Rpb25Ub2tlbiA9IFN5bWJvbCgpO1xuZXhwb3J0IGNsYXNzIENTU1Jlc3VsdCB7XG4gICAgY29uc3RydWN0b3IoY3NzVGV4dCwgc2FmZVRva2VuKSB7XG4gICAgICAgIGlmIChzYWZlVG9rZW4gIT09IGNvbnN0cnVjdGlvblRva2VuKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NTU1Jlc3VsdCBpcyBub3QgY29uc3RydWN0YWJsZS4gVXNlIGB1bnNhZmVDU1NgIG9yIGBjc3NgIGluc3RlYWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jc3NUZXh0ID0gY3NzVGV4dDtcbiAgICB9XG4gICAgLy8gTm90ZSwgdGhpcyBpcyBhIGdldHRlciBzbyB0aGF0IGl0J3MgbGF6eS4gSW4gcHJhY3RpY2UsIHRoaXMgbWVhbnNcbiAgICAvLyBzdHlsZXNoZWV0cyBhcmUgbm90IGNyZWF0ZWQgdW50aWwgdGhlIGZpcnN0IGVsZW1lbnQgaW5zdGFuY2UgaXMgbWFkZS5cbiAgICBnZXQgc3R5bGVTaGVldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0eWxlU2hlZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gTm90ZSwgaWYgYHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0c2AgaXMgdHJ1ZSB0aGVuIHdlIGFzc3VtZVxuICAgICAgICAgICAgLy8gQ1NTU3R5bGVTaGVldCBpcyBjb25zdHJ1Y3RhYmxlLlxuICAgICAgICAgICAgaWYgKHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlU2hlZXQgPSBuZXcgQ1NTU3R5bGVTaGVldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlU2hlZXQucmVwbGFjZVN5bmModGhpcy5jc3NUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlU2hlZXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVNoZWV0O1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3NzVGV4dDtcbiAgICB9XG59XG4vKipcbiAqIFdyYXAgYSB2YWx1ZSBmb3IgaW50ZXJwb2xhdGlvbiBpbiBhIFtbYGNzc2BdXSB0YWdnZWQgdGVtcGxhdGUgbGl0ZXJhbC5cbiAqXG4gKiBUaGlzIGlzIHVuc2FmZSBiZWNhdXNlIHVudHJ1c3RlZCBDU1MgdGV4dCBjYW4gYmUgdXNlZCB0byBwaG9uZSBob21lXG4gKiBvciBleGZpbHRyYXRlIGRhdGEgdG8gYW4gYXR0YWNrZXIgY29udHJvbGxlZCBzaXRlLiBUYWtlIGNhcmUgdG8gb25seSB1c2VcbiAqIHRoaXMgd2l0aCB0cnVzdGVkIGlucHV0LlxuICovXG5leHBvcnQgY29uc3QgdW5zYWZlQ1NTID0gKHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBDU1NSZXN1bHQoU3RyaW5nKHZhbHVlKSwgY29uc3RydWN0aW9uVG9rZW4pO1xufTtcbmNvbnN0IHRleHRGcm9tQ1NTUmVzdWx0ID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQ1NTUmVzdWx0KSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5jc3NUZXh0O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVmFsdWUgcGFzc2VkIHRvICdjc3MnIGZ1bmN0aW9uIG11c3QgYmUgYSAnY3NzJyBmdW5jdGlvbiByZXN1bHQ6ICR7dmFsdWV9LiBVc2UgJ3Vuc2FmZUNTUycgdG8gcGFzcyBub24tbGl0ZXJhbCB2YWx1ZXMsIGJ1dFxuICAgICAgICAgICAgdGFrZSBjYXJlIHRvIGVuc3VyZSBwYWdlIHNlY3VyaXR5LmApO1xuICAgIH1cbn07XG4vKipcbiAqIFRlbXBsYXRlIHRhZyB3aGljaCB3aGljaCBjYW4gYmUgdXNlZCB3aXRoIExpdEVsZW1lbnQncyBbW0xpdEVsZW1lbnQuc3R5bGVzIHxcbiAqIGBzdHlsZXNgXV0gcHJvcGVydHkgdG8gc2V0IGVsZW1lbnQgc3R5bGVzLiBGb3Igc2VjdXJpdHkgcmVhc29ucywgb25seSBsaXRlcmFsXG4gKiBzdHJpbmcgdmFsdWVzIG1heSBiZSB1c2VkLiBUbyBpbmNvcnBvcmF0ZSBub24tbGl0ZXJhbCB2YWx1ZXMgW1tgdW5zYWZlQ1NTYF1dXG4gKiBtYXkgYmUgdXNlZCBpbnNpZGUgYSB0ZW1wbGF0ZSBzdHJpbmcgcGFydC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNzcyA9IChzdHJpbmdzLCAuLi52YWx1ZXMpID0+IHtcbiAgICBjb25zdCBjc3NUZXh0ID0gdmFsdWVzLnJlZHVjZSgoYWNjLCB2LCBpZHgpID0+IGFjYyArIHRleHRGcm9tQ1NTUmVzdWx0KHYpICsgc3RyaW5nc1tpZHggKyAxXSwgc3RyaW5nc1swXSk7XG4gICAgcmV0dXJuIG5ldyBDU1NSZXN1bHQoY3NzVGV4dCwgY29uc3RydWN0aW9uVG9rZW4pO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNzcy10YWcuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuY29uc3QgbGVnYWN5Q3VzdG9tRWxlbWVudCA9ICh0YWdOYW1lLCBjbGF6eikgPT4ge1xuICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUodGFnTmFtZSwgY2xhenopO1xuICAgIC8vIENhc3QgYXMgYW55IGJlY2F1c2UgVFMgZG9lc24ndCByZWNvZ25pemUgdGhlIHJldHVybiB0eXBlIGFzIGJlaW5nIGFcbiAgICAvLyBzdWJ0eXBlIG9mIHRoZSBkZWNvcmF0ZWQgY2xhc3Mgd2hlbiBjbGF6eiBpcyB0eXBlZCBhc1xuICAgIC8vIGBDb25zdHJ1Y3RvcjxIVE1MRWxlbWVudD5gIGZvciBzb21lIHJlYXNvbi5cbiAgICAvLyBgQ29uc3RydWN0b3I8SFRNTEVsZW1lbnQ+YCBpcyBoZWxwZnVsIHRvIG1ha2Ugc3VyZSB0aGUgZGVjb3JhdG9yIGlzXG4gICAgLy8gYXBwbGllZCB0byBlbGVtZW50cyBob3dldmVyLlxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICByZXR1cm4gY2xheno7XG59O1xuY29uc3Qgc3RhbmRhcmRDdXN0b21FbGVtZW50ID0gKHRhZ05hbWUsIGRlc2NyaXB0b3IpID0+IHtcbiAgICBjb25zdCB7IGtpbmQsIGVsZW1lbnRzIH0gPSBkZXNjcmlwdG9yO1xuICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQsXG4gICAgICAgIGVsZW1lbnRzLFxuICAgICAgICAvLyBUaGlzIGNhbGxiYWNrIGlzIGNhbGxlZCBvbmNlIHRoZSBjbGFzcyBpcyBvdGhlcndpc2UgZnVsbHkgZGVmaW5lZFxuICAgICAgICBmaW5pc2hlcihjbGF6eikge1xuICAgICAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSh0YWdOYW1lLCBjbGF6eik7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbi8qKlxuICogQ2xhc3MgZGVjb3JhdG9yIGZhY3RvcnkgdGhhdCBkZWZpbmVzIHRoZSBkZWNvcmF0ZWQgY2xhc3MgYXMgYSBjdXN0b20gZWxlbWVudC5cbiAqXG4gKiBgYGBcbiAqIEBjdXN0b21FbGVtZW50KCdteS1lbGVtZW50JylcbiAqIGNsYXNzIE15RWxlbWVudCB7XG4gKiAgIHJlbmRlcigpIHtcbiAqICAgICByZXR1cm4gaHRtbGBgO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqIEBwYXJhbSB0YWdOYW1lIFRoZSBuYW1lIG9mIHRoZSBjdXN0b20gZWxlbWVudCB0byBkZWZpbmUuXG4gKi9cbmV4cG9ydCBjb25zdCBjdXN0b21FbGVtZW50ID0gKHRhZ05hbWUpID0+IChjbGFzc09yRGVzY3JpcHRvcikgPT4gKHR5cGVvZiBjbGFzc09yRGVzY3JpcHRvciA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgIGxlZ2FjeUN1c3RvbUVsZW1lbnQodGFnTmFtZSwgY2xhc3NPckRlc2NyaXB0b3IpIDpcbiAgICBzdGFuZGFyZEN1c3RvbUVsZW1lbnQodGFnTmFtZSwgY2xhc3NPckRlc2NyaXB0b3IpO1xuY29uc3Qgc3RhbmRhcmRQcm9wZXJ0eSA9IChvcHRpb25zLCBlbGVtZW50KSA9PiB7XG4gICAgLy8gV2hlbiBkZWNvcmF0aW5nIGFuIGFjY2Vzc29yLCBwYXNzIGl0IHRocm91Z2ggYW5kIGFkZCBwcm9wZXJ0eSBtZXRhZGF0YS5cbiAgICAvLyBOb3RlLCB0aGUgYGhhc093blByb3BlcnR5YCBjaGVjayBpbiBgY3JlYXRlUHJvcGVydHlgIGVuc3VyZXMgd2UgZG9uJ3RcbiAgICAvLyBzdG9tcCBvdmVyIHRoZSB1c2VyJ3MgYWNjZXNzb3IuXG4gICAgaWYgKGVsZW1lbnQua2luZCA9PT0gJ21ldGhvZCcgJiYgZWxlbWVudC5kZXNjcmlwdG9yICYmXG4gICAgICAgICEoJ3ZhbHVlJyBpbiBlbGVtZW50LmRlc2NyaXB0b3IpKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGVsZW1lbnQpLCB7IGZpbmlzaGVyKGNsYXp6KSB7XG4gICAgICAgICAgICAgICAgY2xhenouY3JlYXRlUHJvcGVydHkoZWxlbWVudC5rZXksIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGNyZWF0ZVByb3BlcnR5KCkgdGFrZXMgY2FyZSBvZiBkZWZpbmluZyB0aGUgcHJvcGVydHksIGJ1dCB3ZSBzdGlsbFxuICAgICAgICAvLyBtdXN0IHJldHVybiBzb21lIGtpbmQgb2YgZGVzY3JpcHRvciwgc28gcmV0dXJuIGEgZGVzY3JpcHRvciBmb3IgYW5cbiAgICAgICAgLy8gdW51c2VkIHByb3RvdHlwZSBmaWVsZC4gVGhlIGZpbmlzaGVyIGNhbGxzIGNyZWF0ZVByb3BlcnR5KCkuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBraW5kOiAnZmllbGQnLFxuICAgICAgICAgICAga2V5OiBTeW1ib2woKSxcbiAgICAgICAgICAgIHBsYWNlbWVudDogJ293bicsXG4gICAgICAgICAgICBkZXNjcmlwdG9yOiB7fSxcbiAgICAgICAgICAgIC8vIFdoZW4gQGJhYmVsL3BsdWdpbi1wcm9wb3NhbC1kZWNvcmF0b3JzIGltcGxlbWVudHMgaW5pdGlhbGl6ZXJzLFxuICAgICAgICAgICAgLy8gZG8gdGhpcyBpbnN0ZWFkIG9mIHRoZSBpbml0aWFsaXplciBiZWxvdy4gU2VlOlxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2JhYmVsL2JhYmVsL2lzc3Vlcy85MjYwIGV4dHJhczogW1xuICAgICAgICAgICAgLy8gICB7XG4gICAgICAgICAgICAvLyAgICAga2luZDogJ2luaXRpYWxpemVyJyxcbiAgICAgICAgICAgIC8vICAgICBwbGFjZW1lbnQ6ICdvd24nLFxuICAgICAgICAgICAgLy8gICAgIGluaXRpYWxpemVyOiBkZXNjcmlwdG9yLmluaXRpYWxpemVyLFxuICAgICAgICAgICAgLy8gICB9XG4gICAgICAgICAgICAvLyBdLFxuICAgICAgICAgICAgaW5pdGlhbGl6ZXIoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50LmluaXRpYWxpemVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZWxlbWVudC5rZXldID0gZWxlbWVudC5pbml0aWFsaXplci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaW5pc2hlcihjbGF6eikge1xuICAgICAgICAgICAgICAgIGNsYXp6LmNyZWF0ZVByb3BlcnR5KGVsZW1lbnQua2V5LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuY29uc3QgbGVnYWN5UHJvcGVydHkgPSAob3B0aW9ucywgcHJvdG8sIG5hbWUpID0+IHtcbiAgICBwcm90by5jb25zdHJ1Y3RvclxuICAgICAgICAuY3JlYXRlUHJvcGVydHkobmFtZSwgb3B0aW9ucyk7XG59O1xuLyoqXG4gKiBBIHByb3BlcnR5IGRlY29yYXRvciB3aGljaCBjcmVhdGVzIGEgTGl0RWxlbWVudCBwcm9wZXJ0eSB3aGljaCByZWZsZWN0cyBhXG4gKiBjb3JyZXNwb25kaW5nIGF0dHJpYnV0ZSB2YWx1ZS4gQSBbW2BQcm9wZXJ0eURlY2xhcmF0aW9uYF1dIG1heSBvcHRpb25hbGx5IGJlXG4gKiBzdXBwbGllZCB0byBjb25maWd1cmUgcHJvcGVydHkgZmVhdHVyZXMuXG4gKlxuICogVGhpcyBkZWNvcmF0b3Igc2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgcHVibGljIGZpZWxkcy4gUHJpdmF0ZSBvciBwcm90ZWN0ZWRcbiAqIGZpZWxkcyBzaG91bGQgdXNlIHRoZSBbW2BpbnRlcm5hbFByb3BlcnR5YF1dIGRlY29yYXRvci5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIGNsYXNzIE15RWxlbWVudCB7XG4gKiAgIEBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSlcbiAqICAgY2xpY2tlZCA9IGZhbHNlO1xuICogfVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgRGVjb3JhdG9yXG4gKiBARXhwb3J0RGVjb3JhdGVkSXRlbXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnR5KG9wdGlvbnMpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGRlY29yYXRvclxuICAgIHJldHVybiAocHJvdG9PckRlc2NyaXB0b3IsIG5hbWUpID0+IChuYW1lICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgbGVnYWN5UHJvcGVydHkob3B0aW9ucywgcHJvdG9PckRlc2NyaXB0b3IsIG5hbWUpIDpcbiAgICAgICAgc3RhbmRhcmRQcm9wZXJ0eShvcHRpb25zLCBwcm90b09yRGVzY3JpcHRvcik7XG59XG4vKipcbiAqIERlY2xhcmVzIGEgcHJpdmF0ZSBvciBwcm90ZWN0ZWQgcHJvcGVydHkgdGhhdCBzdGlsbCB0cmlnZ2VycyB1cGRhdGVzIHRvIHRoZVxuICogZWxlbWVudCB3aGVuIGl0IGNoYW5nZXMuXG4gKlxuICogUHJvcGVydGllcyBkZWNsYXJlZCB0aGlzIHdheSBtdXN0IG5vdCBiZSB1c2VkIGZyb20gSFRNTCBvciBIVE1MIHRlbXBsYXRpbmdcbiAqIHN5c3RlbXMsIHRoZXkncmUgc29sZWx5IGZvciBwcm9wZXJ0aWVzIGludGVybmFsIHRvIHRoZSBlbGVtZW50LiBUaGVzZVxuICogcHJvcGVydGllcyBtYXkgYmUgcmVuYW1lZCBieSBvcHRpbWl6YXRpb24gdG9vbHMgbGlrZSBjbG9zdXJlIGNvbXBpbGVyLlxuICogQGNhdGVnb3J5IERlY29yYXRvclxuICovXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJuYWxQcm9wZXJ0eShvcHRpb25zKSB7XG4gICAgcmV0dXJuIHByb3BlcnR5KHsgYXR0cmlidXRlOiBmYWxzZSwgaGFzQ2hhbmdlZDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmhhc0NoYW5nZWQgfSk7XG59XG4vKipcbiAqIEEgcHJvcGVydHkgZGVjb3JhdG9yIHRoYXQgY29udmVydHMgYSBjbGFzcyBwcm9wZXJ0eSBpbnRvIGEgZ2V0dGVyIHRoYXRcbiAqIGV4ZWN1dGVzIGEgcXVlcnlTZWxlY3RvciBvbiB0aGUgZWxlbWVudCdzIHJlbmRlclJvb3QuXG4gKlxuICogQHBhcmFtIHNlbGVjdG9yIEEgRE9NU3RyaW5nIGNvbnRhaW5pbmcgb25lIG9yIG1vcmUgc2VsZWN0b3JzIHRvIG1hdGNoLlxuICogQHBhcmFtIGNhY2hlIEFuIG9wdGlvbmFsIGJvb2xlYW4gd2hpY2ggd2hlbiB0cnVlIHBlcmZvcm1zIHRoZSBET00gcXVlcnkgb25seVxuICogb25jZSBhbmQgY2FjaGVzIHRoZSByZXN1bHQuXG4gKlxuICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRG9jdW1lbnQvcXVlcnlTZWxlY3RvclxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogYGBgdHNcbiAqIGNsYXNzIE15RWxlbWVudCB7XG4gKiAgIEBxdWVyeSgnI2ZpcnN0JylcbiAqICAgZmlyc3Q7XG4gKlxuICogICByZW5kZXIoKSB7XG4gKiAgICAgcmV0dXJuIGh0bWxgXG4gKiAgICAgICA8ZGl2IGlkPVwiZmlyc3RcIj48L2Rpdj5cbiAqICAgICAgIDxkaXYgaWQ9XCJzZWNvbmRcIj48L2Rpdj5cbiAqICAgICBgO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5KHNlbGVjdG9yLCBjYWNoZSkge1xuICAgIHJldHVybiAocHJvdG9PckRlc2NyaXB0b3IsIFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgZGVjb3JhdG9yXG4gICAgbmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0ge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlclJvb3QucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSB0eXBlb2YgbmFtZSA9PT0gJ3N5bWJvbCcgPyBTeW1ib2woKSA6IGBfXyR7bmFtZX1gO1xuICAgICAgICAgICAgZGVzY3JpcHRvci5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzW2tleV0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJSb290LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChuYW1lICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgICAgIGxlZ2FjeVF1ZXJ5KGRlc2NyaXB0b3IsIHByb3RvT3JEZXNjcmlwdG9yLCBuYW1lKSA6XG4gICAgICAgICAgICBzdGFuZGFyZFF1ZXJ5KGRlc2NyaXB0b3IsIHByb3RvT3JEZXNjcmlwdG9yKTtcbiAgICB9O1xufVxuLy8gTm90ZSwgaW4gdGhlIGZ1dHVyZSwgd2UgbWF5IGV4dGVuZCB0aGlzIGRlY29yYXRvciB0byBzdXBwb3J0IHRoZSB1c2UgY2FzZVxuLy8gd2hlcmUgdGhlIHF1ZXJpZWQgZWxlbWVudCBtYXkgbmVlZCB0byBkbyB3b3JrIHRvIGJlY29tZSByZWFkeSB0byBpbnRlcmFjdFxuLy8gd2l0aCAoZS5nLiBsb2FkIHNvbWUgaW1wbGVtZW50YXRpb24gY29kZSkuIElmIHNvLCB3ZSBtaWdodCBlbGVjdCB0b1xuLy8gYWRkIGEgc2Vjb25kIGFyZ3VtZW50IGRlZmluaW5nIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgcnVuIHRvIG1ha2UgdGhlXG4vLyBxdWVyaWVkIGVsZW1lbnQgbG9hZGVkL3VwZGF0ZWQvcmVhZHkuXG4vKipcbiAqIEEgcHJvcGVydHkgZGVjb3JhdG9yIHRoYXQgY29udmVydHMgYSBjbGFzcyBwcm9wZXJ0eSBpbnRvIGEgZ2V0dGVyIHRoYXRcbiAqIHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHJlc3VsdCBvZiBhIHF1ZXJ5U2VsZWN0b3Igb24gdGhlXG4gKiBlbGVtZW50J3MgcmVuZGVyUm9vdCBkb25lIGFmdGVyIHRoZSBlbGVtZW50J3MgYHVwZGF0ZUNvbXBsZXRlYCBwcm9taXNlXG4gKiByZXNvbHZlcy4gV2hlbiB0aGUgcXVlcmllZCBwcm9wZXJ0eSBtYXkgY2hhbmdlIHdpdGggZWxlbWVudCBzdGF0ZSwgdGhpc1xuICogZGVjb3JhdG9yIGNhbiBiZSB1c2VkIGluc3RlYWQgb2YgcmVxdWlyaW5nIHVzZXJzIHRvIGF3YWl0IHRoZVxuICogYHVwZGF0ZUNvbXBsZXRlYCBiZWZvcmUgYWNjZXNzaW5nIHRoZSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0gc2VsZWN0b3IgQSBET01TdHJpbmcgY29udGFpbmluZyBvbmUgb3IgbW9yZSBzZWxlY3RvcnMgdG8gbWF0Y2guXG4gKlxuICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRG9jdW1lbnQvcXVlcnlTZWxlY3RvclxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogY2xhc3MgTXlFbGVtZW50IHtcbiAqICAgQHF1ZXJ5QXN5bmMoJyNmaXJzdCcpXG4gKiAgIGZpcnN0O1xuICpcbiAqICAgcmVuZGVyKCkge1xuICogICAgIHJldHVybiBodG1sYFxuICogICAgICAgPGRpdiBpZD1cImZpcnN0XCI+PC9kaXY+XG4gKiAgICAgICA8ZGl2IGlkPVwic2Vjb25kXCI+PC9kaXY+XG4gKiAgICAgYDtcbiAqICAgfVxuICogfVxuICpcbiAqIC8vIGV4dGVybmFsIHVzYWdlXG4gKiBhc3luYyBkb1NvbWV0aGluZ1dpdGhGaXJzdCgpIHtcbiAqICAoYXdhaXQgYU15RWxlbWVudC5maXJzdCkuZG9Tb21ldGhpbmcoKTtcbiAqIH1cbiAqIGBgYFxuICogQGNhdGVnb3J5IERlY29yYXRvclxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlBc3luYyhzZWxlY3Rvcikge1xuICAgIHJldHVybiAocHJvdG9PckRlc2NyaXB0b3IsIFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgZGVjb3JhdG9yXG4gICAgbmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0ge1xuICAgICAgICAgICAgYXN5bmMgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ29tcGxldGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyUm9vdC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKG5hbWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICAgICAgbGVnYWN5UXVlcnkoZGVzY3JpcHRvciwgcHJvdG9PckRlc2NyaXB0b3IsIG5hbWUpIDpcbiAgICAgICAgICAgIHN0YW5kYXJkUXVlcnkoZGVzY3JpcHRvciwgcHJvdG9PckRlc2NyaXB0b3IpO1xuICAgIH07XG59XG4vKipcbiAqIEEgcHJvcGVydHkgZGVjb3JhdG9yIHRoYXQgY29udmVydHMgYSBjbGFzcyBwcm9wZXJ0eSBpbnRvIGEgZ2V0dGVyXG4gKiB0aGF0IGV4ZWN1dGVzIGEgcXVlcnlTZWxlY3RvckFsbCBvbiB0aGUgZWxlbWVudCdzIHJlbmRlclJvb3QuXG4gKlxuICogQHBhcmFtIHNlbGVjdG9yIEEgRE9NU3RyaW5nIGNvbnRhaW5pbmcgb25lIG9yIG1vcmUgc2VsZWN0b3JzIHRvIG1hdGNoLlxuICpcbiAqIFNlZTpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9xdWVyeVNlbGVjdG9yQWxsXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBjbGFzcyBNeUVsZW1lbnQge1xuICogICBAcXVlcnlBbGwoJ2RpdicpXG4gKiAgIGRpdnM7XG4gKlxuICogICByZW5kZXIoKSB7XG4gKiAgICAgcmV0dXJuIGh0bWxgXG4gKiAgICAgICA8ZGl2IGlkPVwiZmlyc3RcIj48L2Rpdj5cbiAqICAgICAgIDxkaXYgaWQ9XCJzZWNvbmRcIj48L2Rpdj5cbiAqICAgICBgO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5QWxsKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIChwcm90b09yRGVzY3JpcHRvciwgXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBkZWNvcmF0b3JcbiAgICBuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyUm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKG5hbWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICAgICAgbGVnYWN5UXVlcnkoZGVzY3JpcHRvciwgcHJvdG9PckRlc2NyaXB0b3IsIG5hbWUpIDpcbiAgICAgICAgICAgIHN0YW5kYXJkUXVlcnkoZGVzY3JpcHRvciwgcHJvdG9PckRlc2NyaXB0b3IpO1xuICAgIH07XG59XG5jb25zdCBsZWdhY3lRdWVyeSA9IChkZXNjcmlwdG9yLCBwcm90bywgbmFtZSkgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgbmFtZSwgZGVzY3JpcHRvcik7XG59O1xuY29uc3Qgc3RhbmRhcmRRdWVyeSA9IChkZXNjcmlwdG9yLCBlbGVtZW50KSA9PiAoe1xuICAgIGtpbmQ6ICdtZXRob2QnLFxuICAgIHBsYWNlbWVudDogJ3Byb3RvdHlwZScsXG4gICAga2V5OiBlbGVtZW50LmtleSxcbiAgICBkZXNjcmlwdG9yLFxufSk7XG5jb25zdCBzdGFuZGFyZEV2ZW50T3B0aW9ucyA9IChvcHRpb25zLCBlbGVtZW50KSA9PiB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZWxlbWVudCksIHsgZmluaXNoZXIoY2xhenopIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY2xhenoucHJvdG90eXBlW2VsZW1lbnQua2V5XSwgb3B0aW9ucyk7XG4gICAgICAgIH0gfSk7XG59O1xuY29uc3QgbGVnYWN5RXZlbnRPcHRpb25zID0gXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGxlZ2FjeSBkZWNvcmF0b3JcbihvcHRpb25zLCBwcm90bywgbmFtZSkgPT4ge1xuICAgIE9iamVjdC5hc3NpZ24ocHJvdG9bbmFtZV0sIG9wdGlvbnMpO1xufTtcbi8qKlxuICogQWRkcyBldmVudCBsaXN0ZW5lciBvcHRpb25zIHRvIGEgbWV0aG9kIHVzZWQgYXMgYW4gZXZlbnQgbGlzdGVuZXIgaW4gYVxuICogbGl0LWh0bWwgdGVtcGxhdGUuXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgQW4gb2JqZWN0IHRoYXQgc3BlY2lmaWVzIGV2ZW50IGxpc3RlbmVyIG9wdGlvbnMgYXMgYWNjZXB0ZWQgYnlcbiAqIGBFdmVudFRhcmdldCNhZGRFdmVudExpc3RlbmVyYCBhbmQgYEV2ZW50VGFyZ2V0I3JlbW92ZUV2ZW50TGlzdGVuZXJgLlxuICpcbiAqIEN1cnJlbnQgYnJvd3NlcnMgc3VwcG9ydCB0aGUgYGNhcHR1cmVgLCBgcGFzc2l2ZWAsIGFuZCBgb25jZWAgb3B0aW9ucy4gU2VlOlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L2FkZEV2ZW50TGlzdGVuZXIjUGFyYW1ldGVyc1xuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogY2xhc3MgTXlFbGVtZW50IHtcbiAqICAgY2xpY2tlZCA9IGZhbHNlO1xuICpcbiAqICAgcmVuZGVyKCkge1xuICogICAgIHJldHVybiBodG1sYFxuICogICAgICAgPGRpdiBAY2xpY2s9JHt0aGlzLl9vbkNsaWNrfWA+XG4gKiAgICAgICAgIDxidXR0b24+PC9idXR0b24+XG4gKiAgICAgICA8L2Rpdj5cbiAqICAgICBgO1xuICogICB9XG4gKlxuICogICBAZXZlbnRPcHRpb25zKHtjYXB0dXJlOiB0cnVlfSlcbiAqICAgX29uQ2xpY2soZSkge1xuICogICAgIHRoaXMuY2xpY2tlZCA9IHRydWU7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICogQGNhdGVnb3J5IERlY29yYXRvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZXZlbnRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAvLyBSZXR1cm4gdmFsdWUgdHlwZWQgYXMgYW55IHRvIHByZXZlbnQgVHlwZVNjcmlwdCBmcm9tIGNvbXBsYWluaW5nIHRoYXRcbiAgICAvLyBzdGFuZGFyZCBkZWNvcmF0b3IgZnVuY3Rpb24gc2lnbmF0dXJlIGRvZXMgbm90IG1hdGNoIFR5cGVTY3JpcHQgZGVjb3JhdG9yXG4gICAgLy8gc2lnbmF0dXJlXG4gICAgLy8gVE9ETyhrc2NoYWFmKTogdW5jbGVhciB3aHkgaXQgd2FzIG9ubHkgZmFpbGluZyBvbiB0aGlzIGRlY29yYXRvciBhbmQgbm90XG4gICAgLy8gdGhlIG90aGVyc1xuICAgIHJldHVybiAoKHByb3RvT3JEZXNjcmlwdG9yLCBuYW1lKSA9PiAobmFtZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGxlZ2FjeUV2ZW50T3B0aW9ucyhvcHRpb25zLCBwcm90b09yRGVzY3JpcHRvciwgbmFtZSkgOlxuICAgICAgICBzdGFuZGFyZEV2ZW50T3B0aW9ucyhvcHRpb25zLCBwcm90b09yRGVzY3JpcHRvcikpO1xufVxuLy8geC1icm93c2VyIHN1cHBvcnQgZm9yIG1hdGNoZXNcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbmNvbnN0IEVsZW1lbnRQcm90byA9IEVsZW1lbnQucHJvdG90eXBlO1xuY29uc3QgbGVnYWN5TWF0Y2hlcyA9IEVsZW1lbnRQcm90by5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50UHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuLyoqXG4gKiBBIHByb3BlcnR5IGRlY29yYXRvciB0aGF0IGNvbnZlcnRzIGEgY2xhc3MgcHJvcGVydHkgaW50byBhIGdldHRlciB0aGF0XG4gKiByZXR1cm5zIHRoZSBgYXNzaWduZWROb2Rlc2Agb2YgdGhlIGdpdmVuIG5hbWVkIGBzbG90YC4gTm90ZSwgdGhlIHR5cGUgb2ZcbiAqIHRoaXMgcHJvcGVydHkgc2hvdWxkIGJlIGFubm90YXRlZCBhcyBgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD5gLlxuICpcbiAqIEBwYXJhbSBzbG90TmFtZSBBIHN0cmluZyBuYW1lIG9mIHRoZSBzbG90LlxuICogQHBhcmFtIGZsYXR0ZW4gQSBib29sZWFuIHdoaWNoIHdoZW4gdHJ1ZSBmbGF0dGVucyB0aGUgYXNzaWduZWQgbm9kZXMsXG4gKiBtZWFuaW5nIGFueSBhc3NpZ25lZCBub2RlcyB0aGF0IGFyZSBzbG90IGVsZW1lbnRzIGFyZSByZXBsYWNlZCB3aXRoIHRoZWlyXG4gKiBhc3NpZ25lZCBub2Rlcy5cbiAqIEBwYXJhbSBzZWxlY3RvciBBIHN0cmluZyB3aGljaCBmaWx0ZXJzIHRoZSByZXN1bHRzIHRvIGVsZW1lbnRzIHRoYXQgbWF0Y2hcbiAqIHRoZSBnaXZlbiBjc3Mgc2VsZWN0b3IuXG4gKlxuICogKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIGNsYXNzIE15RWxlbWVudCB7XG4gKiAgIEBxdWVyeUFzc2lnbmVkTm9kZXMoJ2xpc3QnLCB0cnVlLCAnLml0ZW0nKVxuICogICBsaXN0SXRlbXM7XG4gKlxuICogICByZW5kZXIoKSB7XG4gKiAgICAgcmV0dXJuIGh0bWxgXG4gKiAgICAgICA8c2xvdCBuYW1lPVwibGlzdFwiPjwvc2xvdD5cbiAqICAgICBgO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5QXNzaWduZWROb2RlcyhzbG90TmFtZSA9ICcnLCBmbGF0dGVuID0gZmFsc2UsIHNlbGVjdG9yID0gJycpIHtcbiAgICByZXR1cm4gKHByb3RvT3JEZXNjcmlwdG9yLCBcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGRlY29yYXRvclxuICAgIG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbG90U2VsZWN0b3IgPSBgc2xvdCR7c2xvdE5hbWUgPyBgW25hbWU9JHtzbG90TmFtZX1dYCA6ICc6bm90KFtuYW1lXSknfWA7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xvdCA9IHRoaXMucmVuZGVyUm9vdC5xdWVyeVNlbGVjdG9yKHNsb3RTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGVzID0gc2xvdCAmJiBzbG90LmFzc2lnbmVkTm9kZXMoeyBmbGF0dGVuIH0pO1xuICAgICAgICAgICAgICAgIGlmIChub2RlcyAmJiBzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLmZpbHRlcigobm9kZSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubWF0Y2hlcyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm1hdGNoZXMoc2VsZWN0b3IpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FjeU1hdGNoZXMuY2FsbChub2RlLCBzZWxlY3RvcikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChuYW1lICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgICAgIGxlZ2FjeVF1ZXJ5KGRlc2NyaXB0b3IsIHByb3RvT3JEZXNjcmlwdG9yLCBuYW1lKSA6XG4gICAgICAgICAgICBzdGFuZGFyZFF1ZXJ5KGRlc2NyaXB0b3IsIHByb3RvT3JEZXNjcmlwdG9yKTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVjb3JhdG9ycy5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG52YXIgX2E7XG4vKipcbiAqIFVzZSB0aGlzIG1vZHVsZSBpZiB5b3Ugd2FudCB0byBjcmVhdGUgeW91ciBvd24gYmFzZSBjbGFzcyBleHRlbmRpbmdcbiAqIFtbVXBkYXRpbmdFbGVtZW50XV0uXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuLypcbiAqIFdoZW4gdXNpbmcgQ2xvc3VyZSBDb21waWxlciwgSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eShwcm9wZXJ0eSwgb2JqZWN0KSBpc1xuICogcmVwbGFjZWQgYXQgY29tcGlsZSB0aW1lIGJ5IHRoZSBtdW5nZWQgbmFtZSBmb3Igb2JqZWN0W3Byb3BlcnR5XS4gV2UgY2Fubm90XG4gKiBhbGlhcyB0aGlzIGZ1bmN0aW9uLCBzbyB3ZSBoYXZlIHRvIHVzZSBhIHNtYWxsIHNoaW0gdGhhdCBoYXMgdGhlIHNhbWVcbiAqIGJlaGF2aW9yIHdoZW4gbm90IGNvbXBpbGluZy5cbiAqL1xud2luZG93LkpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkgPVxuICAgIChwcm9wLCBfb2JqKSA9PiBwcm9wO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb252ZXJ0ZXIgPSB7XG4gICAgdG9BdHRyaWJ1dGUodmFsdWUsIHR5cGUpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIEJvb2xlYW46XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID8gJycgOiBudWxsO1xuICAgICAgICAgICAgY2FzZSBPYmplY3Q6XG4gICAgICAgICAgICBjYXNlIEFycmF5OlxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgcGFzcyB0aGlzIHRocm91Z2hcbiAgICAgICAgICAgICAgICAvLyB0byBhbGxvdyByZW1vdmluZy9ubyBjaGFuZ2UgYmVoYXZpb3IuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyB2YWx1ZSA6IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBmcm9tQXR0cmlidXRlKHZhbHVlLCB0eXBlKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBCb29sZWFuOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbDtcbiAgICAgICAgICAgIGNhc2UgTnVtYmVyOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCA/IG51bGwgOiBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgY2FzZSBPYmplY3Q6XG4gICAgICAgICAgICBjYXNlIEFycmF5OlxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufTtcbi8qKlxuICogQ2hhbmdlIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgZGlmZmVyZW50IGZyb20gYG9sZFZhbHVlYC5cbiAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgYXMgdGhlIGRlZmF1bHQgZm9yIGEgcHJvcGVydHkncyBgaGFzQ2hhbmdlZGAgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBub3RFcXVhbCA9ICh2YWx1ZSwgb2xkKSA9PiB7XG4gICAgLy8gVGhpcyBlbnN1cmVzIChvbGQ9PU5hTiwgdmFsdWU9PU5hTikgYWx3YXlzIHJldHVybnMgZmFsc2VcbiAgICByZXR1cm4gb2xkICE9PSB2YWx1ZSAmJiAob2xkID09PSBvbGQgfHwgdmFsdWUgPT09IHZhbHVlKTtcbn07XG5jb25zdCBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbiA9IHtcbiAgICBhdHRyaWJ1dGU6IHRydWUsXG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGNvbnZlcnRlcjogZGVmYXVsdENvbnZlcnRlcixcbiAgICByZWZsZWN0OiBmYWxzZSxcbiAgICBoYXNDaGFuZ2VkOiBub3RFcXVhbFxufTtcbmNvbnN0IFNUQVRFX0hBU19VUERBVEVEID0gMTtcbmNvbnN0IFNUQVRFX1VQREFURV9SRVFVRVNURUQgPSAxIDw8IDI7XG5jb25zdCBTVEFURV9JU19SRUZMRUNUSU5HX1RPX0FUVFJJQlVURSA9IDEgPDwgMztcbmNvbnN0IFNUQVRFX0lTX1JFRkxFQ1RJTkdfVE9fUFJPUEVSVFkgPSAxIDw8IDQ7XG4vKipcbiAqIFRoZSBDbG9zdXJlIEpTIENvbXBpbGVyIGRvZXNuJ3QgY3VycmVudGx5IGhhdmUgZ29vZCBzdXBwb3J0IGZvciBzdGF0aWNcbiAqIHByb3BlcnR5IHNlbWFudGljcyB3aGVyZSBcInRoaXNcIiBpcyBkeW5hbWljIChlLmcuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL2Nsb3N1cmUtY29tcGlsZXIvaXNzdWVzLzMxNzcgYW5kIG90aGVycykgc28gd2UgdXNlXG4gKiB0aGlzIGhhY2sgdG8gYnlwYXNzIGFueSByZXdyaXRpbmcgYnkgdGhlIGNvbXBpbGVyLlxuICovXG5jb25zdCBmaW5hbGl6ZWQgPSAnZmluYWxpemVkJztcbi8qKlxuICogQmFzZSBlbGVtZW50IGNsYXNzIHdoaWNoIG1hbmFnZXMgZWxlbWVudCBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzLiBXaGVuXG4gKiBwcm9wZXJ0aWVzIGNoYW5nZSwgdGhlIGB1cGRhdGVgIG1ldGhvZCBpcyBhc3luY2hyb25vdXNseSBjYWxsZWQuIFRoaXMgbWV0aG9kXG4gKiBzaG91bGQgYmUgc3VwcGxpZWQgYnkgc3ViY2xhc3NlcnMgdG8gcmVuZGVyIHVwZGF0ZXMgYXMgZGVzaXJlZC5cbiAqIEBub0luaGVyaXREb2NcbiAqL1xuZXhwb3J0IGNsYXNzIFVwZGF0aW5nRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGF0dHJpYnV0ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgcmVnaXN0ZXJlZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIC8vIG5vdGU6IHBpZ2d5IGJhY2tpbmcgb24gdGhpcyB0byBlbnN1cmUgd2UncmUgZmluYWxpemVkLlxuICAgICAgICB0aGlzLmZpbmFsaXplKCk7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBbXTtcbiAgICAgICAgLy8gVXNlIGZvckVhY2ggc28gdGhpcyB3b3JrcyBldmVuIGlmIGZvci9vZiBsb29wcyBhcmUgY29tcGlsZWQgdG8gZm9yIGxvb3BzXG4gICAgICAgIC8vIGV4cGVjdGluZyBhcnJheXNcbiAgICAgICAgdGhpcy5fY2xhc3NQcm9wZXJ0aWVzLmZvckVhY2goKHYsIHApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLl9hdHRyaWJ1dGVOYW1lRm9yUHJvcGVydHkocCwgdik7XG4gICAgICAgICAgICBpZiAoYXR0ciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXR0cmlidXRlVG9Qcm9wZXJ0eU1hcC5zZXQoYXR0ciwgcCk7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5wdXNoKGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuc3VyZXMgdGhlIHByaXZhdGUgYF9jbGFzc1Byb3BlcnRpZXNgIHByb3BlcnR5IG1ldGFkYXRhIGlzIGNyZWF0ZWQuXG4gICAgICogSW4gYWRkaXRpb24gdG8gYGZpbmFsaXplYCB0aGlzIGlzIGFsc28gY2FsbGVkIGluIGBjcmVhdGVQcm9wZXJ0eWAgdG9cbiAgICAgKiBlbnN1cmUgdGhlIGBAcHJvcGVydHlgIGRlY29yYXRvciBjYW4gYWRkIHByb3BlcnR5IG1ldGFkYXRhLlxuICAgICAqL1xuICAgIC8qKiBAbm9jb2xsYXBzZSAqL1xuICAgIHN0YXRpYyBfZW5zdXJlQ2xhc3NQcm9wZXJ0aWVzKCkge1xuICAgICAgICAvLyBlbnN1cmUgcHJpdmF0ZSBzdG9yYWdlIGZvciBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMuXG4gICAgICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdfY2xhc3NQcm9wZXJ0aWVzJywgdGhpcykpKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGFzc1Byb3BlcnRpZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAvLyBOT1RFOiBXb3JrYXJvdW5kIElFMTEgbm90IHN1cHBvcnRpbmcgTWFwIGNvbnN0cnVjdG9yIGFyZ3VtZW50LlxuICAgICAgICAgICAgY29uc3Qgc3VwZXJQcm9wZXJ0aWVzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9jbGFzc1Byb3BlcnRpZXM7XG4gICAgICAgICAgICBpZiAoc3VwZXJQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdXBlclByb3BlcnRpZXMuZm9yRWFjaCgodiwgaykgPT4gdGhpcy5fY2xhc3NQcm9wZXJ0aWVzLnNldChrLCB2KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHByb3BlcnR5IGFjY2Vzc29yIG9uIHRoZSBlbGVtZW50IHByb3RvdHlwZSBpZiBvbmUgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBhbmQgc3RvcmVzIGEgUHJvcGVydHlEZWNsYXJhdGlvbiBmb3IgdGhlIHByb3BlcnR5IHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAgICogVGhlIHByb3BlcnR5IHNldHRlciBjYWxscyB0aGUgcHJvcGVydHkncyBgaGFzQ2hhbmdlZGAgcHJvcGVydHkgb3B0aW9uXG4gICAgICogb3IgdXNlcyBhIHN0cmljdCBpZGVudGl0eSBjaGVjayB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3QgdG8gcmVxdWVzdFxuICAgICAqIGFuIHVwZGF0ZS5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIG1heSBiZSBvdmVycmlkZGVuIHRvIGN1c3RvbWl6ZSBwcm9wZXJ0aWVzOyBob3dldmVyLFxuICAgICAqIHdoZW4gZG9pbmcgc28sIGl0J3MgaW1wb3J0YW50IHRvIGNhbGwgYHN1cGVyLmNyZWF0ZVByb3BlcnR5YCB0byBlbnN1cmVcbiAgICAgKiB0aGUgcHJvcGVydHkgaXMgc2V0dXAgY29ycmVjdGx5LiBUaGlzIG1ldGhvZCBjYWxsc1xuICAgICAqIGBnZXRQcm9wZXJ0eURlc2NyaXB0b3JgIGludGVybmFsbHkgdG8gZ2V0IGEgZGVzY3JpcHRvciB0byBpbnN0YWxsLlxuICAgICAqIFRvIGN1c3RvbWl6ZSB3aGF0IHByb3BlcnRpZXMgZG8gd2hlbiB0aGV5IGFyZSBnZXQgb3Igc2V0LCBvdmVycmlkZVxuICAgICAqIGBnZXRQcm9wZXJ0eURlc2NyaXB0b3JgLiBUbyBjdXN0b21pemUgdGhlIG9wdGlvbnMgZm9yIGEgcHJvcGVydHksXG4gICAgICogaW1wbGVtZW50IGBjcmVhdGVQcm9wZXJ0eWAgbGlrZSB0aGlzOlxuICAgICAqXG4gICAgICogc3RhdGljIGNyZWF0ZVByb3BlcnR5KG5hbWUsIG9wdGlvbnMpIHtcbiAgICAgKiAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtteU9wdGlvbjogdHJ1ZX0pO1xuICAgICAqICAgc3VwZXIuY3JlYXRlUHJvcGVydHkobmFtZSwgb3B0aW9ucyk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogQG5vY29sbGFwc2VcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlUHJvcGVydHkobmFtZSwgb3B0aW9ucyA9IGRlZmF1bHRQcm9wZXJ0eURlY2xhcmF0aW9uKSB7XG4gICAgICAgIC8vIE5vdGUsIHNpbmNlIHRoaXMgY2FuIGJlIGNhbGxlZCBieSB0aGUgYEBwcm9wZXJ0eWAgZGVjb3JhdG9yIHdoaWNoXG4gICAgICAgIC8vIGlzIGNhbGxlZCBiZWZvcmUgYGZpbmFsaXplYCwgd2UgZW5zdXJlIHN0b3JhZ2UgZXhpc3RzIGZvciBwcm9wZXJ0eVxuICAgICAgICAvLyBtZXRhZGF0YS5cbiAgICAgICAgdGhpcy5fZW5zdXJlQ2xhc3NQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHRoaXMuX2NsYXNzUHJvcGVydGllcy5zZXQobmFtZSwgb3B0aW9ucyk7XG4gICAgICAgIC8vIERvIG5vdCBnZW5lcmF0ZSBhbiBhY2Nlc3NvciBpZiB0aGUgcHJvdG90eXBlIGFscmVhZHkgaGFzIG9uZSwgc2luY2VcbiAgICAgICAgLy8gaXQgd291bGQgYmUgbG9zdCBvdGhlcndpc2UgYW5kIHRoYXQgd291bGQgbmV2ZXIgYmUgdGhlIHVzZXIncyBpbnRlbnRpb247XG4gICAgICAgIC8vIEluc3RlYWQsIHdlIGV4cGVjdCB1c2VycyB0byBjYWxsIGByZXF1ZXN0VXBkYXRlYCB0aGVtc2VsdmVzIGZyb21cbiAgICAgICAgLy8gdXNlci1kZWZpbmVkIGFjY2Vzc29ycy4gTm90ZSB0aGF0IGlmIHRoZSBzdXBlciBoYXMgYW4gYWNjZXNzb3Igd2Ugd2lsbFxuICAgICAgICAvLyBzdGlsbCBvdmVyd3JpdGUgaXRcbiAgICAgICAgaWYgKG9wdGlvbnMubm9BY2Nlc3NvciB8fCB0aGlzLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleSA9IHR5cGVvZiBuYW1lID09PSAnc3ltYm9sJyA/IFN5bWJvbCgpIDogYF9fJHtuYW1lfWA7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB0aGlzLmdldFByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBrZXksIG9wdGlvbnMpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5wcm90b3R5cGUsIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHRvIGJlIGRlZmluZWQgb24gdGhlIGdpdmVuIG5hbWVkIHByb3BlcnR5LlxuICAgICAqIElmIG5vIGRlc2NyaXB0b3IgaXMgcmV0dXJuZWQsIHRoZSBwcm9wZXJ0eSB3aWxsIG5vdCBiZWNvbWUgYW4gYWNjZXNzb3IuXG4gICAgICogRm9yIGV4YW1wbGUsXG4gICAgICpcbiAgICAgKiAgIGNsYXNzIE15RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICAgICAqICAgICBzdGF0aWMgZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG5hbWUsIGtleSwgb3B0aW9ucykge1xuICAgICAqICAgICAgIGNvbnN0IGRlZmF1bHREZXNjcmlwdG9yID1cbiAgICAgKiAgICAgICAgICAgc3VwZXIuZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG5hbWUsIGtleSwgb3B0aW9ucyk7XG4gICAgICogICAgICAgY29uc3Qgc2V0dGVyID0gZGVmYXVsdERlc2NyaXB0b3Iuc2V0O1xuICAgICAqICAgICAgIHJldHVybiB7XG4gICAgICogICAgICAgICBnZXQ6IGRlZmF1bHREZXNjcmlwdG9yLmdldCxcbiAgICAgKiAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAqICAgICAgICAgICBzZXR0ZXIuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICogICAgICAgICAgIC8vIGN1c3RvbSBhY3Rpb24uXG4gICAgICogICAgICAgICB9LFxuICAgICAqICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAqICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAqICAgICAgIH1cbiAgICAgKiAgICAgfVxuICAgICAqICAgfVxuICAgICAqXG4gICAgICogQG5vY29sbGFwc2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG5hbWUsIGtleSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBubyBzeW1ib2wgaW4gaW5kZXhcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1trZXldO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpc1tuYW1lXTtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAgICAgICAgIC5yZXF1ZXN0VXBkYXRlSW50ZXJuYWwobmFtZSwgb2xkVmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJvcGVydHkgb3B0aW9ucyBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgICAqIFRoZXNlIG9wdGlvbnMgYXJlIGRlZmluZWQgd2l0aCBhIFByb3BlcnR5RGVjbGFyYXRpb24gdmlhIHRoZSBgcHJvcGVydGllc2BcbiAgICAgKiBvYmplY3Qgb3IgdGhlIGBAcHJvcGVydHlgIGRlY29yYXRvciBhbmQgYXJlIHJlZ2lzdGVyZWQgaW5cbiAgICAgKiBgY3JlYXRlUHJvcGVydHkoLi4uKWAuXG4gICAgICpcbiAgICAgKiBOb3RlLCB0aGlzIG1ldGhvZCBzaG91bGQgYmUgY29uc2lkZXJlZCBcImZpbmFsXCIgYW5kIG5vdCBvdmVycmlkZGVuLiBUb1xuICAgICAqIGN1c3RvbWl6ZSB0aGUgb3B0aW9ucyBmb3IgYSBnaXZlbiBwcm9wZXJ0eSwgb3ZlcnJpZGUgYGNyZWF0ZVByb3BlcnR5YC5cbiAgICAgKlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICogQGZpbmFsXG4gICAgICovXG4gICAgc3RhdGljIGdldFByb3BlcnR5T3B0aW9ucyhuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGFzc1Byb3BlcnRpZXMgJiYgdGhpcy5fY2xhc3NQcm9wZXJ0aWVzLmdldChuYW1lKSB8fFxuICAgICAgICAgICAgZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgcHJvcGVydHkgYWNjZXNzb3JzIGZvciByZWdpc3RlcmVkIHByb3BlcnRpZXMgYW5kIGVuc3VyZXNcbiAgICAgKiBhbnkgc3VwZXJjbGFzc2VzIGFyZSBhbHNvIGZpbmFsaXplZC5cbiAgICAgKiBAbm9jb2xsYXBzZVxuICAgICAqL1xuICAgIHN0YXRpYyBmaW5hbGl6ZSgpIHtcbiAgICAgICAgLy8gZmluYWxpemUgYW55IHN1cGVyY2xhc3Nlc1xuICAgICAgICBjb25zdCBzdXBlckN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7XG4gICAgICAgIGlmICghc3VwZXJDdG9yLmhhc093blByb3BlcnR5KGZpbmFsaXplZCkpIHtcbiAgICAgICAgICAgIHN1cGVyQ3Rvci5maW5hbGl6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXNbZmluYWxpemVkXSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2Vuc3VyZUNsYXNzUHJvcGVydGllcygpO1xuICAgICAgICAvLyBpbml0aWFsaXplIE1hcCBwb3B1bGF0ZWQgaW4gb2JzZXJ2ZWRBdHRyaWJ1dGVzXG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZVRvUHJvcGVydHlNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8vIG1ha2UgYW55IHByb3BlcnRpZXNcbiAgICAgICAgLy8gTm90ZSwgb25seSBwcm9jZXNzIFwib3duXCIgcHJvcGVydGllcyBzaW5jZSB0aGlzIGVsZW1lbnQgd2lsbCBpbmhlcml0XG4gICAgICAgIC8vIGFueSBwcm9wZXJ0aWVzIGRlZmluZWQgb24gdGhlIHN1cGVyQ2xhc3MsIGFuZCBmaW5hbGl6YXRpb24gZW5zdXJlc1xuICAgICAgICAvLyB0aGUgZW50aXJlIHByb3RvdHlwZSBjaGFpbiBpcyBmaW5hbGl6ZWQuXG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ3Byb3BlcnRpZXMnLCB0aGlzKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wZXJ0aWVzO1xuICAgICAgICAgICAgLy8gc3VwcG9ydCBzeW1ib2xzIGluIHByb3BlcnRpZXMgKElFMTEgZG9lcyBub3Qgc3VwcG9ydCB0aGlzKVxuICAgICAgICAgICAgY29uc3QgcHJvcEtleXMgPSBbXG4gICAgICAgICAgICAgICAgLi4uT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvcHMpLFxuICAgICAgICAgICAgICAgIC4uLih0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHByb3BzKSA6XG4gICAgICAgICAgICAgICAgICAgIFtdXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgLy8gVGhpcyBmb3Ivb2YgaXMgb2sgYmVjYXVzZSBwcm9wS2V5cyBpcyBhbiBhcnJheVxuICAgICAgICAgICAgZm9yIChjb25zdCBwIG9mIHByb3BLZXlzKSB7XG4gICAgICAgICAgICAgICAgLy8gbm90ZSwgdXNlIG9mIGBhbnlgIGlzIGR1ZSB0byBUeXBlU3JpcHQgbGFjayBvZiBzdXBwb3J0IGZvciBzeW1ib2wgaW5cbiAgICAgICAgICAgICAgICAvLyBpbmRleCB0eXBlc1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgbm8gc3ltYm9sIGluIGluZGV4XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQcm9wZXJ0eShwLCBwcm9wc1twXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGdpdmVuIGF0dHJpYnV0ZSBgbmFtZWAuXG4gICAgICogQG5vY29sbGFwc2VcbiAgICAgKi9cbiAgICBzdGF0aWMgX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShuYW1lLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG9wdGlvbnMuYXR0cmlidXRlO1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlID09PSBmYWxzZSA/XG4gICAgICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICAgICAgKHR5cGVvZiBhdHRyaWJ1dGUgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGUgOlxuICAgICAgICAgICAgICAgICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycgPyBuYW1lLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGEgcHJvcGVydHkgc2hvdWxkIHJlcXVlc3QgYW4gdXBkYXRlLlxuICAgICAqIENhbGxlZCB3aGVuIGEgcHJvcGVydHkgdmFsdWUgaXMgc2V0IGFuZCB1c2VzIHRoZSBgaGFzQ2hhbmdlZGBcbiAgICAgKiBvcHRpb24gZm9yIHRoZSBwcm9wZXJ0eSBpZiBwcmVzZW50IG9yIGEgc3RyaWN0IGlkZW50aXR5IGNoZWNrLlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIF92YWx1ZUhhc0NoYW5nZWQodmFsdWUsIG9sZCwgaGFzQ2hhbmdlZCA9IG5vdEVxdWFsKSB7XG4gICAgICAgIHJldHVybiBoYXNDaGFuZ2VkKHZhbHVlLCBvbGQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZSBmb3IgdGhlIGdpdmVuIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBDYWxsZWQgdmlhIHRoZSBgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrYCBhbmQgdXNlcyB0aGUgcHJvcGVydHknc1xuICAgICAqIGBjb252ZXJ0ZXJgIG9yIGBjb252ZXJ0ZXIuZnJvbUF0dHJpYnV0ZWAgcHJvcGVydHkgb3B0aW9uLlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIF9wcm9wZXJ0eVZhbHVlRnJvbUF0dHJpYnV0ZSh2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB0eXBlID0gb3B0aW9ucy50eXBlO1xuICAgICAgICBjb25zdCBjb252ZXJ0ZXIgPSBvcHRpb25zLmNvbnZlcnRlciB8fCBkZWZhdWx0Q29udmVydGVyO1xuICAgICAgICBjb25zdCBmcm9tQXR0cmlidXRlID0gKHR5cGVvZiBjb252ZXJ0ZXIgPT09ICdmdW5jdGlvbicgPyBjb252ZXJ0ZXIgOiBjb252ZXJ0ZXIuZnJvbUF0dHJpYnV0ZSk7XG4gICAgICAgIHJldHVybiBmcm9tQXR0cmlidXRlID8gZnJvbUF0dHJpYnV0ZSh2YWx1ZSwgdHlwZSkgOiB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgYXR0cmlidXRlIHZhbHVlIGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkgdmFsdWUuIElmIHRoaXNcbiAgICAgKiByZXR1cm5zIHVuZGVmaW5lZCwgdGhlIHByb3BlcnR5IHdpbGwgKm5vdCogYmUgcmVmbGVjdGVkIHRvIGFuIGF0dHJpYnV0ZS5cbiAgICAgKiBJZiB0aGlzIHJldHVybnMgbnVsbCwgdGhlIGF0dHJpYnV0ZSB3aWxsIGJlIHJlbW92ZWQsIG90aGVyd2lzZSB0aGVcbiAgICAgKiBhdHRyaWJ1dGUgd2lsbCBiZSBzZXQgdG8gdGhlIHZhbHVlLlxuICAgICAqIFRoaXMgdXNlcyB0aGUgcHJvcGVydHkncyBgcmVmbGVjdGAgYW5kIGB0eXBlLnRvQXR0cmlidXRlYCBwcm9wZXJ0eSBvcHRpb25zLlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIF9wcm9wZXJ0eVZhbHVlVG9BdHRyaWJ1dGUodmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucmVmbGVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgICAgICAgY29uc3QgY29udmVydGVyID0gb3B0aW9ucy5jb252ZXJ0ZXI7XG4gICAgICAgIGNvbnN0IHRvQXR0cmlidXRlID0gY29udmVydGVyICYmIGNvbnZlcnRlci50b0F0dHJpYnV0ZSB8fFxuICAgICAgICAgICAgZGVmYXVsdENvbnZlcnRlci50b0F0dHJpYnV0ZTtcbiAgICAgICAgcmV0dXJuIHRvQXR0cmlidXRlKHZhbHVlLCB0eXBlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgZWxlbWVudCBpbml0aWFsaXphdGlvbi4gQnkgZGVmYXVsdCBjYXB0dXJlcyBhbnkgcHJlLXNldCB2YWx1ZXMgZm9yXG4gICAgICogcmVnaXN0ZXJlZCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlID0gMDtcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvbWlzZSA9XG4gICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzKSA9PiB0aGlzLl9lbmFibGVVcGRhdGluZ1Jlc29sdmVyID0gcmVzKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZFByb3BlcnRpZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX3NhdmVJbnN0YW5jZVByb3BlcnRpZXMoKTtcbiAgICAgICAgLy8gZW5zdXJlcyBmaXJzdCB1cGRhdGUgd2lsbCBiZSBjYXVnaHQgYnkgYW4gZWFybHkgYWNjZXNzIG9mXG4gICAgICAgIC8vIGB1cGRhdGVDb21wbGV0ZWBcbiAgICAgICAgdGhpcy5yZXF1ZXN0VXBkYXRlSW50ZXJuYWwoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRml4ZXMgYW55IHByb3BlcnRpZXMgc2V0IG9uIHRoZSBpbnN0YW5jZSBiZWZvcmUgdXBncmFkZSB0aW1lLlxuICAgICAqIE90aGVyd2lzZSB0aGVzZSB3b3VsZCBzaGFkb3cgdGhlIGFjY2Vzc29yIGFuZCBicmVhayB0aGVzZSBwcm9wZXJ0aWVzLlxuICAgICAqIFRoZSBwcm9wZXJ0aWVzIGFyZSBzdG9yZWQgaW4gYSBNYXAgd2hpY2ggaXMgcGxheWVkIGJhY2sgYWZ0ZXIgdGhlXG4gICAgICogY29uc3RydWN0b3IgcnVucy4gTm90ZSwgb24gdmVyeSBvbGQgdmVyc2lvbnMgb2YgU2FmYXJpICg8PTkpIG9yIENocm9tZVxuICAgICAqICg8PTQxKSwgcHJvcGVydGllcyBjcmVhdGVkIGZvciBuYXRpdmUgcGxhdGZvcm0gcHJvcGVydGllcyBsaWtlIChgaWRgIG9yXG4gICAgICogYG5hbWVgKSBtYXkgbm90IGhhdmUgZGVmYXVsdCB2YWx1ZXMgc2V0IGluIHRoZSBlbGVtZW50IGNvbnN0cnVjdG9yLiBPblxuICAgICAqIHRoZXNlIGJyb3dzZXJzIG5hdGl2ZSBwcm9wZXJ0aWVzIGFwcGVhciBvbiBpbnN0YW5jZXMgYW5kIHRoZXJlZm9yZSB0aGVpclxuICAgICAqIGRlZmF1bHQgdmFsdWUgd2lsbCBvdmVyd3JpdGUgYW55IGVsZW1lbnQgZGVmYXVsdCAoZS5nLiBpZiB0aGUgZWxlbWVudCBzZXRzXG4gICAgICogdGhpcy5pZCA9ICdpZCcgaW4gdGhlIGNvbnN0cnVjdG9yLCB0aGUgJ2lkJyB3aWxsIGJlY29tZSAnJyBzaW5jZSB0aGlzIGlzXG4gICAgICogdGhlIG5hdGl2ZSBwbGF0Zm9ybSBkZWZhdWx0KS5cbiAgICAgKi9cbiAgICBfc2F2ZUluc3RhbmNlUHJvcGVydGllcygpIHtcbiAgICAgICAgLy8gVXNlIGZvckVhY2ggc28gdGhpcyB3b3JrcyBldmVuIGlmIGZvci9vZiBsb29wcyBhcmUgY29tcGlsZWQgdG8gZm9yIGxvb3BzXG4gICAgICAgIC8vIGV4cGVjdGluZyBhcnJheXNcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RvclxuICAgICAgICAgICAgLl9jbGFzc1Byb3BlcnRpZXMuZm9yRWFjaCgoX3YsIHApID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW3BdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzW3BdO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faW5zdGFuY2VQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlUHJvcGVydGllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VQcm9wZXJ0aWVzLnNldChwLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHByZXZpb3VzbHkgc2F2ZWQgaW5zdGFuY2UgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBfYXBwbHlJbnN0YW5jZVByb3BlcnRpZXMoKSB7XG4gICAgICAgIC8vIFVzZSBmb3JFYWNoIHNvIHRoaXMgd29ya3MgZXZlbiBpZiBmb3Ivb2YgbG9vcHMgYXJlIGNvbXBpbGVkIHRvIGZvciBsb29wc1xuICAgICAgICAvLyBleHBlY3RpbmcgYXJyYXlzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgdGhpcy5faW5zdGFuY2VQcm9wZXJ0aWVzLmZvckVhY2goKHYsIHApID0+IHRoaXNbcF0gPSB2KTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VQcm9wZXJ0aWVzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgLy8gRW5zdXJlIGZpcnN0IGNvbm5lY3Rpb24gY29tcGxldGVzIGFuIHVwZGF0ZS4gVXBkYXRlcyBjYW5ub3QgY29tcGxldGVcbiAgICAgICAgLy8gYmVmb3JlIGNvbm5lY3Rpb24uXG4gICAgICAgIHRoaXMuZW5hYmxlVXBkYXRpbmcoKTtcbiAgICB9XG4gICAgZW5hYmxlVXBkYXRpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbmFibGVVcGRhdGluZ1Jlc29sdmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZVVwZGF0aW5nUmVzb2x2ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZVVwZGF0aW5nUmVzb2x2ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxsb3dzIGZvciBgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKWAgaW4gZXh0ZW5zaW9ucyB3aGlsZVxuICAgICAqIHJlc2VydmluZyB0aGUgcG9zc2liaWxpdHkgb2YgbWFraW5nIG5vbi1icmVha2luZyBmZWF0dXJlIGFkZGl0aW9uc1xuICAgICAqIHdoZW4gZGlzY29ubmVjdGluZyBhdCBzb21lIHBvaW50IGluIHRoZSBmdXR1cmUuXG4gICAgICovXG4gICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN5bmNocm9uaXplcyBwcm9wZXJ0eSB2YWx1ZXMgd2hlbiBhdHRyaWJ1dGVzIGNoYW5nZS5cbiAgICAgKi9cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkLCB2YWx1ZSkge1xuICAgICAgICBpZiAob2xkICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fYXR0cmlidXRlVG9Qcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3Byb3BlcnR5VG9BdHRyaWJ1dGUobmFtZSwgdmFsdWUsIG9wdGlvbnMgPSBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbikge1xuICAgICAgICBjb25zdCBjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgICAgY29uc3QgYXR0ciA9IGN0b3IuX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShuYW1lLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKGF0dHIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgYXR0clZhbHVlID0gY3Rvci5fcHJvcGVydHlWYWx1ZVRvQXR0cmlidXRlKHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIC8vIGFuIHVuZGVmaW5lZCB2YWx1ZSBkb2VzIG5vdCBjaGFuZ2UgdGhlIGF0dHJpYnV0ZS5cbiAgICAgICAgICAgIGlmIChhdHRyVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRyYWNrIGlmIHRoZSBwcm9wZXJ0eSBpcyBiZWluZyByZWZsZWN0ZWQgdG8gYXZvaWRcbiAgICAgICAgICAgIC8vIHNldHRpbmcgdGhlIHByb3BlcnR5IGFnYWluIHZpYSBgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrYC4gTm90ZTpcbiAgICAgICAgICAgIC8vIDEuIHRoaXMgdGFrZXMgYWR2YW50YWdlIG9mIHRoZSBmYWN0IHRoYXQgdGhlIGNhbGxiYWNrIGlzIHN5bmNocm9ub3VzLlxuICAgICAgICAgICAgLy8gMi4gd2lsbCBiZWhhdmUgaW5jb3JyZWN0bHkgaWYgbXVsdGlwbGUgYXR0cmlidXRlcyBhcmUgaW4gdGhlIHJlYWN0aW9uXG4gICAgICAgICAgICAvLyBzdGFjayBhdCB0aW1lIG9mIGNhbGxpbmcuIEhvd2V2ZXIsIHNpbmNlIHdlIHByb2Nlc3MgYXR0cmlidXRlc1xuICAgICAgICAgICAgLy8gaW4gYHVwZGF0ZWAgdGhpcyBzaG91bGQgbm90IGJlIHBvc3NpYmxlIChvciBhbiBleHRyZW1lIGNvcm5lciBjYXNlXG4gICAgICAgICAgICAvLyB0aGF0IHdlJ2QgbGlrZSB0byBkaXNjb3ZlcikuXG4gICAgICAgICAgICAvLyBtYXJrIHN0YXRlIHJlZmxlY3RpbmdcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUgfCBTVEFURV9JU19SRUZMRUNUSU5HX1RPX0FUVFJJQlVURTtcbiAgICAgICAgICAgIGlmIChhdHRyVmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG1hcmsgc3RhdGUgbm90IHJlZmxlY3RpbmdcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUgJiB+U1RBVEVfSVNfUkVGTEVDVElOR19UT19BVFRSSUJVVEU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2F0dHJpYnV0ZVRvUHJvcGVydHkobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgLy8gVXNlIHRyYWNraW5nIGluZm8gdG8gYXZvaWQgZGVzZXJpYWxpemluZyBhdHRyaWJ1dGUgdmFsdWUgaWYgaXQgd2FzXG4gICAgICAgIC8vIGp1c3Qgc2V0IGZyb20gYSBwcm9wZXJ0eSBzZXR0ZXIuXG4gICAgICAgIGlmICh0aGlzLl91cGRhdGVTdGF0ZSAmIFNUQVRFX0lTX1JFRkxFQ1RJTkdfVE9fQVRUUklCVVRFKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgICAgIC8vIE5vdGUsIGhpbnQgdGhpcyBhcyBhbiBgQXR0cmlidXRlTWFwYCBzbyBjbG9zdXJlIGNsZWFybHkgdW5kZXJzdGFuZHNcbiAgICAgICAgLy8gdGhlIHR5cGU7IGl0IGhhcyBpc3N1ZXMgd2l0aCB0cmFja2luZyB0eXBlcyB0aHJvdWdoIHN0YXRpY3NcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVubmVjZXNzYXJ5LXR5cGUtYXNzZXJ0aW9uXG4gICAgICAgIGNvbnN0IHByb3BOYW1lID0gY3Rvci5fYXR0cmlidXRlVG9Qcm9wZXJ0eU1hcC5nZXQobmFtZSk7XG4gICAgICAgIGlmIChwcm9wTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gY3Rvci5nZXRQcm9wZXJ0eU9wdGlvbnMocHJvcE5hbWUpO1xuICAgICAgICAgICAgLy8gbWFyayBzdGF0ZSByZWZsZWN0aW5nXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSA9IHRoaXMuX3VwZGF0ZVN0YXRlIHwgU1RBVEVfSVNfUkVGTEVDVElOR19UT19QUk9QRVJUWTtcbiAgICAgICAgICAgIHRoaXNbcHJvcE5hbWVdID1cbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgICAgICAgICAgY3Rvci5fcHJvcGVydHlWYWx1ZUZyb21BdHRyaWJ1dGUodmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgLy8gbWFyayBzdGF0ZSBub3QgcmVmbGVjdGluZ1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUgPSB0aGlzLl91cGRhdGVTdGF0ZSAmIH5TVEFURV9JU19SRUZMRUNUSU5HX1RPX1BST1BFUlRZO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgcHJvdGVjdGVkIHZlcnNpb24gb2YgYHJlcXVlc3RVcGRhdGVgIGRvZXMgbm90IGFjY2VzcyBvciByZXR1cm4gdGhlXG4gICAgICogYHVwZGF0ZUNvbXBsZXRlYCBwcm9taXNlLiBUaGlzIHByb21pc2UgY2FuIGJlIG92ZXJyaWRkZW4gYW5kIGlzIHRoZXJlZm9yZVxuICAgICAqIG5vdCBmcmVlIHRvIGFjY2Vzcy5cbiAgICAgKi9cbiAgICByZXF1ZXN0VXBkYXRlSW50ZXJuYWwobmFtZSwgb2xkVmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHNob3VsZFJlcXVlc3RVcGRhdGUgPSB0cnVlO1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgcHJvcGVydHkga2V5LCBwZXJmb3JtIHByb3BlcnR5IHVwZGF0ZSBzdGVwcy5cbiAgICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgY3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCBjdG9yLmdldFByb3BlcnR5T3B0aW9ucyhuYW1lKTtcbiAgICAgICAgICAgIGlmIChjdG9yLl92YWx1ZUhhc0NoYW5nZWQodGhpc1tuYW1lXSwgb2xkVmFsdWUsIG9wdGlvbnMuaGFzQ2hhbmdlZCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NoYW5nZWRQcm9wZXJ0aWVzLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VkUHJvcGVydGllcy5zZXQobmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBBZGQgdG8gcmVmbGVjdGluZyBwcm9wZXJ0aWVzIHNldC5cbiAgICAgICAgICAgICAgICAvLyBOb3RlLCBpdCdzIGltcG9ydGFudCB0aGF0IGV2ZXJ5IGNoYW5nZSBoYXMgYSBjaGFuY2UgdG8gYWRkIHRoZVxuICAgICAgICAgICAgICAgIC8vIHByb3BlcnR5IHRvIGBfcmVmbGVjdGluZ1Byb3BlcnRpZXNgLiBUaGlzIGVuc3VyZXMgc2V0dGluZ1xuICAgICAgICAgICAgICAgIC8vIGF0dHJpYnV0ZSArIHByb3BlcnR5IHJlZmxlY3RzIGNvcnJlY3RseS5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5yZWZsZWN0ID09PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgICAgICEodGhpcy5fdXBkYXRlU3RhdGUgJiBTVEFURV9JU19SRUZMRUNUSU5HX1RPX1BST1BFUlRZKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcmVmbGVjdGluZ1Byb3BlcnRpZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVmbGVjdGluZ1Byb3BlcnRpZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVmbGVjdGluZ1Byb3BlcnRpZXMuc2V0KG5hbWUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEFib3J0IHRoZSByZXF1ZXN0IGlmIHRoZSBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIGNvbnNpZGVyZWQgY2hhbmdlZC5cbiAgICAgICAgICAgICAgICBzaG91bGRSZXF1ZXN0VXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9oYXNSZXF1ZXN0ZWRVcGRhdGUgJiYgc2hvdWxkUmVxdWVzdFVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlUHJvbWlzZSA9IHRoaXMuX2VucXVldWVVcGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbiB1cGRhdGUgd2hpY2ggaXMgcHJvY2Vzc2VkIGFzeW5jaHJvbm91c2x5LiBUaGlzIHNob3VsZFxuICAgICAqIGJlIGNhbGxlZCB3aGVuIGFuIGVsZW1lbnQgc2hvdWxkIHVwZGF0ZSBiYXNlZCBvbiBzb21lIHN0YXRlIG5vdCB0cmlnZ2VyZWRcbiAgICAgKiBieSBzZXR0aW5nIGEgcHJvcGVydHkuIEluIHRoaXMgY2FzZSwgcGFzcyBubyBhcmd1bWVudHMuIEl0IHNob3VsZCBhbHNvIGJlXG4gICAgICogY2FsbGVkIHdoZW4gbWFudWFsbHkgaW1wbGVtZW50aW5nIGEgcHJvcGVydHkgc2V0dGVyLiBJbiB0aGlzIGNhc2UsIHBhc3MgdGhlXG4gICAgICogcHJvcGVydHkgYG5hbWVgIGFuZCBgb2xkVmFsdWVgIHRvIGVuc3VyZSB0aGF0IGFueSBjb25maWd1cmVkIHByb3BlcnR5XG4gICAgICogb3B0aW9ucyBhcmUgaG9ub3JlZC4gUmV0dXJucyB0aGUgYHVwZGF0ZUNvbXBsZXRlYCBQcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkXG4gICAgICogd2hlbiB0aGUgdXBkYXRlIGNvbXBsZXRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIHtQcm9wZXJ0eUtleX0gKG9wdGlvbmFsKSBuYW1lIG9mIHJlcXVlc3RpbmcgcHJvcGVydHlcbiAgICAgKiBAcGFyYW0gb2xkVmFsdWUge2FueX0gKG9wdGlvbmFsKSBvbGQgdmFsdWUgb2YgcmVxdWVzdGluZyBwcm9wZXJ0eVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBBIFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHRoZSB1cGRhdGUgY29tcGxldGVzLlxuICAgICAqL1xuICAgIHJlcXVlc3RVcGRhdGUobmFtZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0VXBkYXRlSW50ZXJuYWwobmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVDb21wbGV0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB1cCB0aGUgZWxlbWVudCB0byBhc3luY2hyb25vdXNseSB1cGRhdGUuXG4gICAgICovXG4gICAgYXN5bmMgX2VucXVldWVVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUgfCBTVEFURV9VUERBVEVfUkVRVUVTVEVEO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRW5zdXJlIGFueSBwcmV2aW91cyB1cGRhdGUgaGFzIHJlc29sdmVkIGJlZm9yZSB1cGRhdGluZy5cbiAgICAgICAgICAgIC8vIFRoaXMgYGF3YWl0YCBhbHNvIGVuc3VyZXMgdGhhdCBwcm9wZXJ0eSBjaGFuZ2VzIGFyZSBiYXRjaGVkLlxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fdXBkYXRlUHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gSWdub3JlIGFueSBwcmV2aW91cyBlcnJvcnMuIFdlIG9ubHkgY2FyZSB0aGF0IHRoZSBwcmV2aW91cyBjeWNsZSBpc1xuICAgICAgICAgICAgLy8gZG9uZS4gQW55IGVycm9yIHNob3VsZCBoYXZlIGJlZW4gaGFuZGxlZCBpbiB0aGUgcHJldmlvdXMgdXBkYXRlLlxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucGVyZm9ybVVwZGF0ZSgpO1xuICAgICAgICAvLyBJZiBgcGVyZm9ybVVwZGF0ZWAgcmV0dXJucyBhIFByb21pc2UsIHdlIGF3YWl0IGl0LiBUaGlzIGlzIGRvbmUgdG9cbiAgICAgICAgLy8gZW5hYmxlIGNvb3JkaW5hdGluZyB1cGRhdGVzIHdpdGggYSBzY2hlZHVsZXIuIE5vdGUsIHRoZSByZXN1bHQgaXNcbiAgICAgICAgLy8gY2hlY2tlZCB0byBhdm9pZCBkZWxheWluZyBhbiBhZGRpdGlvbmFsIG1pY3JvdGFzayB1bmxlc3Mgd2UgbmVlZCB0by5cbiAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICF0aGlzLl9oYXNSZXF1ZXN0ZWRVcGRhdGU7XG4gICAgfVxuICAgIGdldCBfaGFzUmVxdWVzdGVkVXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuX3VwZGF0ZVN0YXRlICYgU1RBVEVfVVBEQVRFX1JFUVVFU1RFRCk7XG4gICAgfVxuICAgIGdldCBoYXNVcGRhdGVkKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuX3VwZGF0ZVN0YXRlICYgU1RBVEVfSEFTX1VQREFURUQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBlbGVtZW50IHVwZGF0ZS4gTm90ZSwgaWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBkdXJpbmcgdGhlXG4gICAgICogdXBkYXRlLCBgZmlyc3RVcGRhdGVkYCBhbmQgYHVwZGF0ZWRgIHdpbGwgbm90IGJlIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gY2hhbmdlIHRoZSB0aW1pbmcgb2YgdXBkYXRlcy4gSWYgdGhpc1xuICAgICAqIG1ldGhvZCBpcyBvdmVycmlkZGVuLCBgc3VwZXIucGVyZm9ybVVwZGF0ZSgpYCBtdXN0IGJlIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEZvciBpbnN0YW5jZSwgdG8gc2NoZWR1bGUgdXBkYXRlcyB0byBvY2N1ciBqdXN0IGJlZm9yZSB0aGUgbmV4dCBmcmFtZTpcbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqIHByb3RlY3RlZCBhc3luYyBwZXJmb3JtVXBkYXRlKCk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgICAqICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiByZXNvbHZlKCkpKTtcbiAgICAgKiAgIHN1cGVyLnBlcmZvcm1VcGRhdGUoKTtcbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgcGVyZm9ybVVwZGF0ZSgpIHtcbiAgICAgICAgLy8gQWJvcnQgYW55IHVwZGF0ZSBpZiBvbmUgaXMgbm90IHBlbmRpbmcgd2hlbiB0aGlzIGlzIGNhbGxlZC5cbiAgICAgICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIGBwZXJmb3JtVXBkYXRlYCBpcyBjYWxsZWQgZWFybHkgdG8gXCJmbHVzaFwiXG4gICAgICAgIC8vIHRoZSB1cGRhdGUuXG4gICAgICAgIGlmICghdGhpcy5faGFzUmVxdWVzdGVkVXBkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWl4aW4gaW5zdGFuY2UgcHJvcGVydGllcyBvbmNlLCBpZiB0aGV5IGV4aXN0LlxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2VQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBseUluc3RhbmNlUHJvcGVydGllcygpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaG91bGRVcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgY2hhbmdlZFByb3BlcnRpZXMgPSB0aGlzLl9jaGFuZ2VkUHJvcGVydGllcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRoaXMuc2hvdWxkVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXJrVXBkYXRlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBQcmV2ZW50IGBmaXJzdFVwZGF0ZWRgIGFuZCBgdXBkYXRlZGAgZnJvbSBydW5uaW5nIHdoZW4gdGhlcmUncyBhblxuICAgICAgICAgICAgLy8gdXBkYXRlIGV4Y2VwdGlvbi5cbiAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gRW5zdXJlIGVsZW1lbnQgY2FuIGFjY2VwdCBhZGRpdGlvbmFsIHVwZGF0ZXMgYWZ0ZXIgYW4gZXhjZXB0aW9uLlxuICAgICAgICAgICAgdGhpcy5fbWFya1VwZGF0ZWQoKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3VsZFVwZGF0ZSkge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5fdXBkYXRlU3RhdGUgJiBTVEFURV9IQVNfVVBEQVRFRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSA9IHRoaXMuX3VwZGF0ZVN0YXRlIHwgU1RBVEVfSEFTX1VQREFURUQ7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfbWFya1VwZGF0ZWQoKSB7XG4gICAgICAgIHRoaXMuX2NoYW5nZWRQcm9wZXJ0aWVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSA9IHRoaXMuX3VwZGF0ZVN0YXRlICYgflNUQVRFX1VQREFURV9SRVFVRVNURUQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZWxlbWVudCBoYXMgY29tcGxldGVkIHVwZGF0aW5nLlxuICAgICAqIFRoZSBQcm9taXNlIHZhbHVlIGlzIGEgYm9vbGVhbiB0aGF0IGlzIGB0cnVlYCBpZiB0aGUgZWxlbWVudCBjb21wbGV0ZWQgdGhlXG4gICAgICogdXBkYXRlIHdpdGhvdXQgdHJpZ2dlcmluZyBhbm90aGVyIHVwZGF0ZS4gVGhlIFByb21pc2UgcmVzdWx0IGlzIGBmYWxzZWAgaWZcbiAgICAgKiBhIHByb3BlcnR5IHdhcyBzZXQgaW5zaWRlIGB1cGRhdGVkKClgLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgYW5cbiAgICAgKiBleGNlcHRpb24gd2FzIHRocm93biBkdXJpbmcgdGhlIHVwZGF0ZS5cbiAgICAgKlxuICAgICAqIFRvIGF3YWl0IGFkZGl0aW9uYWwgYXN5bmNocm9ub3VzIHdvcmssIG92ZXJyaWRlIHRoZSBgX2dldFVwZGF0ZUNvbXBsZXRlYFxuICAgICAqIG1ldGhvZC4gRm9yIGV4YW1wbGUsIGl0IGlzIHNvbWV0aW1lcyB1c2VmdWwgdG8gYXdhaXQgYSByZW5kZXJlZCBlbGVtZW50XG4gICAgICogYmVmb3JlIGZ1bGZpbGxpbmcgdGhpcyBQcm9taXNlLiBUbyBkbyB0aGlzLCBmaXJzdCBhd2FpdFxuICAgICAqIGBzdXBlci5fZ2V0VXBkYXRlQ29tcGxldGUoKWAsIHRoZW4gYW55IHN1YnNlcXVlbnQgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgcmV0dXJucyBhIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgaWYgdGhlXG4gICAgICogdXBkYXRlIHJlc29sdmVkIHdpdGhvdXQgdHJpZ2dlcmluZyBhbm90aGVyIHVwZGF0ZS5cbiAgICAgKi9cbiAgICBnZXQgdXBkYXRlQ29tcGxldGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRVcGRhdGVDb21wbGV0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSBwb2ludCBmb3IgdGhlIGB1cGRhdGVDb21wbGV0ZWAgcHJvbWlzZS5cbiAgICAgKlxuICAgICAqIEl0IGlzIG5vdCBzYWZlIHRvIG92ZXJyaWRlIHRoZSBgdXBkYXRlQ29tcGxldGVgIGdldHRlciBkaXJlY3RseSBkdWUgdG8gYVxuICAgICAqIGxpbWl0YXRpb24gaW4gVHlwZVNjcmlwdCB3aGljaCBtZWFucyBpdCBpcyBub3QgcG9zc2libGUgdG8gY2FsbCBhXG4gICAgICogc3VwZXJjbGFzcyBnZXR0ZXIgKGUuZy4gYHN1cGVyLnVwZGF0ZUNvbXBsZXRlLnRoZW4oLi4uKWApIHdoZW4gdGhlIHRhcmdldFxuICAgICAqIGxhbmd1YWdlIGlzIEVTNSAoaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8zMzgpLlxuICAgICAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZGVuIGluc3RlYWQuIEZvciBleGFtcGxlOlxuICAgICAqXG4gICAgICogICBjbGFzcyBNeUVsZW1lbnQgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgICAgKiAgICAgYXN5bmMgX2dldFVwZGF0ZUNvbXBsZXRlKCkge1xuICAgICAqICAgICAgIGF3YWl0IHN1cGVyLl9nZXRVcGRhdGVDb21wbGV0ZSgpO1xuICAgICAqICAgICAgIGF3YWl0IHRoaXMuX215Q2hpbGQudXBkYXRlQ29tcGxldGU7XG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKi9cbiAgICBfZ2V0VXBkYXRlQ29tcGxldGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGVQcm9taXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCBgdXBkYXRlYCBzaG91bGQgYmUgY2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgcmVxdWVzdHNcbiAgICAgKiBhbiB1cGRhdGUuIEJ5IGRlZmF1bHQsIHRoaXMgbWV0aG9kIGFsd2F5cyByZXR1cm5zIGB0cnVlYCwgYnV0IHRoaXMgY2FuIGJlXG4gICAgICogY3VzdG9taXplZCB0byBjb250cm9sIHdoZW4gdG8gdXBkYXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgICAqL1xuICAgIHNob3VsZFVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGVsZW1lbnQuIFRoaXMgbWV0aG9kIHJlZmxlY3RzIHByb3BlcnR5IHZhbHVlcyB0byBhdHRyaWJ1dGVzLlxuICAgICAqIEl0IGNhbiBiZSBvdmVycmlkZGVuIHRvIHJlbmRlciBhbmQga2VlcCB1cGRhdGVkIGVsZW1lbnQgRE9NLlxuICAgICAqIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCAqbm90KiB0cmlnZ2VyXG4gICAgICogYW5vdGhlciB1cGRhdGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gX2NoYW5nZWRQcm9wZXJ0aWVzIE1hcCBvZiBjaGFuZ2VkIHByb3BlcnRpZXMgd2l0aCBvbGQgdmFsdWVzXG4gICAgICovXG4gICAgdXBkYXRlKF9jaGFuZ2VkUHJvcGVydGllcykge1xuICAgICAgICBpZiAodGhpcy5fcmVmbGVjdGluZ1Byb3BlcnRpZXMgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgdGhpcy5fcmVmbGVjdGluZ1Byb3BlcnRpZXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIC8vIFVzZSBmb3JFYWNoIHNvIHRoaXMgd29ya3MgZXZlbiBpZiBmb3Ivb2YgbG9vcHMgYXJlIGNvbXBpbGVkIHRvIGZvclxuICAgICAgICAgICAgLy8gbG9vcHMgZXhwZWN0aW5nIGFycmF5c1xuICAgICAgICAgICAgdGhpcy5fcmVmbGVjdGluZ1Byb3BlcnRpZXMuZm9yRWFjaCgodiwgaykgPT4gdGhpcy5fcHJvcGVydHlUb0F0dHJpYnV0ZShrLCB0aGlzW2tdLCB2KSk7XG4gICAgICAgICAgICB0aGlzLl9yZWZsZWN0aW5nUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXJrVXBkYXRlZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIHdoZW5ldmVyIHRoZSBlbGVtZW50IGlzIHVwZGF0ZWQuIEltcGxlbWVudCB0byBwZXJmb3JtXG4gICAgICogcG9zdC11cGRhdGluZyB0YXNrcyB2aWEgRE9NIEFQSXMsIGZvciBleGFtcGxlLCBmb2N1c2luZyBhbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogU2V0dGluZyBwcm9wZXJ0aWVzIGluc2lkZSB0aGlzIG1ldGhvZCB3aWxsIHRyaWdnZXIgdGhlIGVsZW1lbnQgdG8gdXBkYXRlXG4gICAgICogYWdhaW4gYWZ0ZXIgdGhpcyB1cGRhdGUgY3ljbGUgY29tcGxldGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgICAqL1xuICAgIHVwZGF0ZWQoX2NoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludm9rZWQgd2hlbiB0aGUgZWxlbWVudCBpcyBmaXJzdCB1cGRhdGVkLiBJbXBsZW1lbnQgdG8gcGVyZm9ybSBvbmUgdGltZVxuICAgICAqIHdvcmsgb24gdGhlIGVsZW1lbnQgYWZ0ZXIgdXBkYXRlLlxuICAgICAqXG4gICAgICogU2V0dGluZyBwcm9wZXJ0aWVzIGluc2lkZSB0aGlzIG1ldGhvZCB3aWxsIHRyaWdnZXIgdGhlIGVsZW1lbnQgdG8gdXBkYXRlXG4gICAgICogYWdhaW4gYWZ0ZXIgdGhpcyB1cGRhdGUgY3ljbGUgY29tcGxldGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgICAqL1xuICAgIGZpcnN0VXBkYXRlZChfY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICB9XG59XG5fYSA9IGZpbmFsaXplZDtcbi8qKlxuICogTWFya3MgY2xhc3MgYXMgaGF2aW5nIGZpbmlzaGVkIGNyZWF0aW5nIHByb3BlcnRpZXMuXG4gKi9cblVwZGF0aW5nRWxlbWVudFtfYV0gPSB0cnVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXBkYXRpbmctZWxlbWVudC5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG4vKipcbiAqIFRoZSBtYWluIExpdEVsZW1lbnQgbW9kdWxlLCB3aGljaCBkZWZpbmVzIHRoZSBbW2BMaXRFbGVtZW50YF1dIGJhc2UgY2xhc3MgYW5kXG4gKiByZWxhdGVkIEFQSXMuXG4gKlxuICogIExpdEVsZW1lbnQgY29tcG9uZW50cyBjYW4gZGVmaW5lIGEgdGVtcGxhdGUgYW5kIGEgc2V0IG9mIG9ic2VydmVkXG4gKiBwcm9wZXJ0aWVzLiBDaGFuZ2luZyBhbiBvYnNlcnZlZCBwcm9wZXJ0eSB0cmlnZ2VycyBhIHJlLXJlbmRlciBvZiB0aGVcbiAqIGVsZW1lbnQuXG4gKlxuICogIEltcG9ydCBbW2BMaXRFbGVtZW50YF1dIGFuZCBbW2BodG1sYF1dIGZyb20gdGhpcyBtb2R1bGUgdG8gY3JlYXRlIGFcbiAqIGNvbXBvbmVudDpcbiAqXG4gKiAgYGBganNcbiAqIGltcG9ydCB7TGl0RWxlbWVudCwgaHRtbH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuICpcbiAqIGNsYXNzIE15RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICpcbiAqICAgLy8gRGVjbGFyZSBvYnNlcnZlZCBwcm9wZXJ0aWVzXG4gKiAgIHN0YXRpYyBnZXQgcHJvcGVydGllcygpIHtcbiAqICAgICByZXR1cm4ge1xuICogICAgICAgYWRqZWN0aXZlOiB7fVxuICogICAgIH1cbiAqICAgfVxuICpcbiAqICAgY29uc3RydWN0b3IoKSB7XG4gKiAgICAgdGhpcy5hZGplY3RpdmUgPSAnYXdlc29tZSc7XG4gKiAgIH1cbiAqXG4gKiAgIC8vIERlZmluZSB0aGUgZWxlbWVudCdzIHRlbXBsYXRlXG4gKiAgIHJlbmRlcigpIHtcbiAqICAgICByZXR1cm4gaHRtbGA8cD55b3VyICR7YWRqZWN0aXZlfSB0ZW1wbGF0ZSBoZXJlPC9wPmA7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ215LWVsZW1lbnQnLCBNeUVsZW1lbnQpO1xuICogYGBgXG4gKlxuICogYExpdEVsZW1lbnRgIGV4dGVuZHMgW1tgVXBkYXRpbmdFbGVtZW50YF1dIGFuZCBhZGRzIGxpdC1odG1sIHRlbXBsYXRpbmcuXG4gKiBUaGUgYFVwZGF0aW5nRWxlbWVudGAgY2xhc3MgaXMgcHJvdmlkZWQgZm9yIHVzZXJzIHRoYXQgd2FudCB0byBidWlsZFxuICogdGhlaXIgb3duIGN1c3RvbSBlbGVtZW50IGJhc2UgY2xhc3NlcyB0aGF0IGRvbid0IHVzZSBsaXQtaHRtbC5cbiAqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAnbGl0LWh0bWwvbGliL3NoYWR5LXJlbmRlci5qcyc7XG5pbXBvcnQgeyBVcGRhdGluZ0VsZW1lbnQgfSBmcm9tICcuL2xpYi91cGRhdGluZy1lbGVtZW50LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3VwZGF0aW5nLWVsZW1lbnQuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZGVjb3JhdG9ycy5qcyc7XG5leHBvcnQgeyBodG1sLCBzdmcsIFRlbXBsYXRlUmVzdWx0LCBTVkdUZW1wbGF0ZVJlc3VsdCB9IGZyb20gJ2xpdC1odG1sL2xpdC1odG1sLmpzJztcbmltcG9ydCB7IHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cywgdW5zYWZlQ1NTIH0gZnJvbSAnLi9saWIvY3NzLXRhZy5qcyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9jc3MtdGFnLmpzJztcbi8vIElNUE9SVEFOVDogZG8gbm90IGNoYW5nZSB0aGUgcHJvcGVydHkgbmFtZSBvciB0aGUgYXNzaWdubWVudCBleHByZXNzaW9uLlxuLy8gVGhpcyBsaW5lIHdpbGwgYmUgdXNlZCBpbiByZWdleGVzIHRvIHNlYXJjaCBmb3IgTGl0RWxlbWVudCB1c2FnZS5cbi8vIFRPRE8oanVzdGluZmFnbmFuaSk6IGluamVjdCB2ZXJzaW9uIG51bWJlciBhdCBidWlsZCB0aW1lXG4od2luZG93WydsaXRFbGVtZW50VmVyc2lvbnMnXSB8fCAod2luZG93WydsaXRFbGVtZW50VmVyc2lvbnMnXSA9IFtdKSlcbiAgICAucHVzaCgnMi40LjAnKTtcbi8qKlxuICogU2VudGluYWwgdmFsdWUgdXNlZCB0byBhdm9pZCBjYWxsaW5nIGxpdC1odG1sJ3MgcmVuZGVyIGZ1bmN0aW9uIHdoZW5cbiAqIHN1YmNsYXNzZXMgZG8gbm90IGltcGxlbWVudCBgcmVuZGVyYFxuICovXG5jb25zdCByZW5kZXJOb3RJbXBsZW1lbnRlZCA9IHt9O1xuLyoqXG4gKiBCYXNlIGVsZW1lbnQgY2xhc3MgdGhhdCBtYW5hZ2VzIGVsZW1lbnQgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcywgYW5kXG4gKiByZW5kZXJzIGEgbGl0LWh0bWwgdGVtcGxhdGUuXG4gKlxuICogVG8gZGVmaW5lIGEgY29tcG9uZW50LCBzdWJjbGFzcyBgTGl0RWxlbWVudGAgYW5kIGltcGxlbWVudCBhXG4gKiBgcmVuZGVyYCBtZXRob2QgdG8gcHJvdmlkZSB0aGUgY29tcG9uZW50J3MgdGVtcGxhdGUuIERlZmluZSBwcm9wZXJ0aWVzXG4gKiB1c2luZyB0aGUgW1tgcHJvcGVydGllc2BdXSBwcm9wZXJ0eSBvciB0aGUgW1tgcHJvcGVydHlgXV0gZGVjb3JhdG9yLlxuICovXG5leHBvcnQgY2xhc3MgTGl0RWxlbWVudCBleHRlbmRzIFVwZGF0aW5nRWxlbWVudCB7XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBhcnJheSBvZiBzdHlsZXMgdG8gYXBwbHkgdG8gdGhlIGVsZW1lbnQuXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gaW50ZWdyYXRlIGludG8gYSBzdHlsZSBtYW5hZ2VtZW50IHN5c3RlbS5cbiAgICAgKlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIGdldFN0eWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGVzO1xuICAgIH1cbiAgICAvKiogQG5vY29sbGFwc2UgKi9cbiAgICBzdGF0aWMgX2dldFVuaXF1ZVN0eWxlcygpIHtcbiAgICAgICAgLy8gT25seSBnYXRoZXIgc3R5bGVzIG9uY2UgcGVyIGNsYXNzXG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ19zdHlsZXMnLCB0aGlzKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUYWtlIGNhcmUgbm90IHRvIGNhbGwgYHRoaXMuZ2V0U3R5bGVzKClgIG11bHRpcGxlIHRpbWVzIHNpbmNlIHRoaXNcbiAgICAgICAgLy8gZ2VuZXJhdGVzIG5ldyBDU1NSZXN1bHRzIGVhY2ggdGltZS5cbiAgICAgICAgLy8gVE9ETyhzb3J2ZWxsKTogU2luY2Ugd2UgZG8gbm90IGNhY2hlIENTU1Jlc3VsdHMgYnkgaW5wdXQsIGFueVxuICAgICAgICAvLyBzaGFyZWQgc3R5bGVzIHdpbGwgZ2VuZXJhdGUgbmV3IHN0eWxlc2hlZXQgb2JqZWN0cywgd2hpY2ggaXMgd2FzdGVmdWwuXG4gICAgICAgIC8vIFRoaXMgc2hvdWxkIGJlIGFkZHJlc3NlZCB3aGVuIGEgYnJvd3NlciBzaGlwcyBjb25zdHJ1Y3RhYmxlXG4gICAgICAgIC8vIHN0eWxlc2hlZXRzLlxuICAgICAgICBjb25zdCB1c2VyU3R5bGVzID0gdGhpcy5nZXRTdHlsZXMoKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXNlclN0eWxlcykpIHtcbiAgICAgICAgICAgIC8vIERlLWR1cGxpY2F0ZSBzdHlsZXMgcHJlc2VydmluZyB0aGUgX2xhc3RfIGluc3RhbmNlIGluIHRoZSBzZXQuXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIHRvIGF2b2lkIGR1cGxpY2F0ZWQgc3R5bGVzIHRoYXQgY2FuXG4gICAgICAgICAgICAvLyBvY2N1ciBlc3BlY2lhbGx5IHdoZW4gY29tcG9zaW5nIHZpYSBzdWJjbGFzc2luZy5cbiAgICAgICAgICAgIC8vIFRoZSBsYXN0IGl0ZW0gaXMga2VwdCB0byB0cnkgdG8gcHJlc2VydmUgdGhlIGNhc2NhZGUgb3JkZXIgd2l0aCB0aGVcbiAgICAgICAgICAgIC8vIGFzc3VtcHRpb24gdGhhdCBpdCdzIG1vc3QgaW1wb3J0YW50IHRoYXQgbGFzdCBhZGRlZCBzdHlsZXMgb3ZlcnJpZGVcbiAgICAgICAgICAgIC8vIHByZXZpb3VzIHN0eWxlcy5cbiAgICAgICAgICAgIGNvbnN0IGFkZFN0eWxlcyA9IChzdHlsZXMsIHNldCkgPT4gc3R5bGVzLnJlZHVjZVJpZ2h0KChzZXQsIHMpID0+IFxuICAgICAgICAgICAgLy8gTm90ZTogT24gSUUgc2V0LmFkZCgpIGRvZXMgbm90IHJldHVybiB0aGUgc2V0XG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHMpID8gYWRkU3R5bGVzKHMsIHNldCkgOiAoc2V0LmFkZChzKSwgc2V0KSwgc2V0KTtcbiAgICAgICAgICAgIC8vIEFycmF5LmZyb20gZG9lcyBub3Qgd29yayBvbiBTZXQgaW4gSUUsIG90aGVyd2lzZSByZXR1cm5cbiAgICAgICAgICAgIC8vIEFycmF5LmZyb20oYWRkU3R5bGVzKHVzZXJTdHlsZXMsIG5ldyBTZXQ8Q1NTUmVzdWx0PigpKSkucmV2ZXJzZSgpXG4gICAgICAgICAgICBjb25zdCBzZXQgPSBhZGRTdHlsZXModXNlclN0eWxlcywgbmV3IFNldCgpKTtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IFtdO1xuICAgICAgICAgICAgc2V0LmZvckVhY2goKHYpID0+IHN0eWxlcy51bnNoaWZ0KHYpKTtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlcyA9IHN0eWxlcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlcyA9IHVzZXJTdHlsZXMgPT09IHVuZGVmaW5lZCA/IFtdIDogW3VzZXJTdHlsZXNdO1xuICAgICAgICB9XG4gICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZXJlIGFyZSBubyBpbnZhbGlkIENTU1N0eWxlU2hlZXQgaW5zdGFuY2VzIGhlcmUuIFRoZXkgYXJlXG4gICAgICAgIC8vIGludmFsaWQgaW4gdHdvIGNvbmRpdGlvbnMuXG4gICAgICAgIC8vICgxKSB0aGUgc2hlZXQgaXMgbm9uLWNvbnN0cnVjdGlibGUgKGBzaGVldGAgb2YgYSBIVE1MU3R5bGVFbGVtZW50KSwgYnV0XG4gICAgICAgIC8vICAgICB0aGlzIGlzIGltcG9zc2libGUgdG8gY2hlY2sgZXhjZXB0IHZpYSAucmVwbGFjZVN5bmMgb3IgdXNlXG4gICAgICAgIC8vICgyKSB0aGUgU2hhZHlDU1MgcG9seWZpbGwgaXMgZW5hYmxlZCAoOi4gc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzIGlzXG4gICAgICAgIC8vICAgICBmYWxzZSlcbiAgICAgICAgdGhpcy5fc3R5bGVzID0gdGhpcy5fc3R5bGVzLm1hcCgocykgPT4ge1xuICAgICAgICAgICAgaWYgKHMgaW5zdGFuY2VvZiBDU1NTdHlsZVNoZWV0ICYmICFzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHMpIHtcbiAgICAgICAgICAgICAgICAvLyBGbGF0dGVuIHRoZSBjc3NUZXh0IGZyb20gdGhlIHBhc3NlZCBjb25zdHJ1Y3RpYmxlIHN0eWxlc2hlZXQgKG9yXG4gICAgICAgICAgICAgICAgLy8gdW5kZXRlY3RhYmxlIG5vbi1jb25zdHJ1Y3RpYmxlIHN0eWxlc2hlZXQpLiBUaGUgdXNlciBtaWdodCBoYXZlXG4gICAgICAgICAgICAgICAgLy8gZXhwZWN0ZWQgdG8gdXBkYXRlIHRoZWlyIHN0eWxlc2hlZXRzIG92ZXIgdGltZSwgYnV0IHRoZSBhbHRlcm5hdGl2ZVxuICAgICAgICAgICAgICAgIC8vIGlzIGEgY3Jhc2guXG4gICAgICAgICAgICAgICAgY29uc3QgY3NzVGV4dCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHMuY3NzUnVsZXMpXG4gICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGNzcywgcnVsZSkgPT4gY3NzICsgcnVsZS5jc3NUZXh0LCAnJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuc2FmZUNTUyhjc3NUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgZWxlbWVudCBpbml0aWFsaXphdGlvbi4gQnkgZGVmYXVsdCB0aGlzIGNhbGxzXG4gICAgICogW1tgY3JlYXRlUmVuZGVyUm9vdGBdXSB0byBjcmVhdGUgdGhlIGVsZW1lbnQgW1tgcmVuZGVyUm9vdGBdXSBub2RlIGFuZFxuICAgICAqIGNhcHR1cmVzIGFueSBwcmUtc2V0IHZhbHVlcyBmb3IgcmVnaXN0ZXJlZCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHN1cGVyLmluaXRpYWxpemUoKTtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5fZ2V0VW5pcXVlU3R5bGVzKCk7XG4gICAgICAgIHRoaXMucmVuZGVyUm9vdCA9IHRoaXMuY3JlYXRlUmVuZGVyUm9vdCgpO1xuICAgICAgICAvLyBOb3RlLCBpZiByZW5kZXJSb290IGlzIG5vdCBhIHNoYWRvd1Jvb3QsIHN0eWxlcyB3b3VsZC9jb3VsZCBhcHBseSB0byB0aGVcbiAgICAgICAgLy8gZWxlbWVudCdzIGdldFJvb3ROb2RlKCkuIFdoaWxlIHRoaXMgY291bGQgYmUgZG9uZSwgd2UncmUgY2hvb3Npbmcgbm90IHRvXG4gICAgICAgIC8vIHN1cHBvcnQgdGhpcyBub3cgc2luY2UgaXQgd291bGQgcmVxdWlyZSBkaWZmZXJlbnQgbG9naWMgYXJvdW5kIGRlLWR1cGluZy5cbiAgICAgICAgaWYgKHdpbmRvdy5TaGFkb3dSb290ICYmIHRoaXMucmVuZGVyUm9vdCBpbnN0YW5jZW9mIHdpbmRvdy5TaGFkb3dSb290KSB7XG4gICAgICAgICAgICB0aGlzLmFkb3B0U3R5bGVzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbm9kZSBpbnRvIHdoaWNoIHRoZSBlbGVtZW50IHNob3VsZCByZW5kZXIgYW5kIGJ5IGRlZmF1bHRcbiAgICAgKiBjcmVhdGVzIGFuZCByZXR1cm5zIGFuIG9wZW4gc2hhZG93Um9vdC4gSW1wbGVtZW50IHRvIGN1c3RvbWl6ZSB3aGVyZSB0aGVcbiAgICAgKiBlbGVtZW50J3MgRE9NIGlzIHJlbmRlcmVkLiBGb3IgZXhhbXBsZSwgdG8gcmVuZGVyIGludG8gdGhlIGVsZW1lbnQnc1xuICAgICAqIGNoaWxkTm9kZXMsIHJldHVybiBgdGhpc2AuXG4gICAgICogQHJldHVybnMge0VsZW1lbnR8RG9jdW1lbnRGcmFnbWVudH0gUmV0dXJucyBhIG5vZGUgaW50byB3aGljaCB0byByZW5kZXIuXG4gICAgICovXG4gICAgY3JlYXRlUmVuZGVyUm9vdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHN0eWxpbmcgdG8gdGhlIGVsZW1lbnQgc2hhZG93Um9vdCB1c2luZyB0aGUgW1tgc3R5bGVzYF1dXG4gICAgICogcHJvcGVydHkuIFN0eWxpbmcgd2lsbCBhcHBseSB1c2luZyBgc2hhZG93Um9vdC5hZG9wdGVkU3R5bGVTaGVldHNgIHdoZXJlXG4gICAgICogYXZhaWxhYmxlIGFuZCB3aWxsIGZhbGxiYWNrIG90aGVyd2lzZS4gV2hlbiBTaGFkb3cgRE9NIGlzIHBvbHlmaWxsZWQsXG4gICAgICogU2hhZHlDU1Mgc2NvcGVzIHN0eWxlcyBhbmQgYWRkcyB0aGVtIHRvIHRoZSBkb2N1bWVudC4gV2hlbiBTaGFkb3cgRE9NXG4gICAgICogaXMgYXZhaWxhYmxlIGJ1dCBgYWRvcHRlZFN0eWxlU2hlZXRzYCBpcyBub3QsIHN0eWxlcyBhcmUgYXBwZW5kZWQgdG8gdGhlXG4gICAgICogZW5kIG9mIHRoZSBgc2hhZG93Um9vdGAgdG8gW21pbWljIHNwZWNcbiAgICAgKiBiZWhhdmlvcl0oaHR0cHM6Ly93aWNnLmdpdGh1Yi5pby9jb25zdHJ1Y3Qtc3R5bGVzaGVldHMvI3VzaW5nLWNvbnN0cnVjdGVkLXN0eWxlc2hlZXRzKS5cbiAgICAgKi9cbiAgICBhZG9wdFN0eWxlcygpIHtcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5jb25zdHJ1Y3Rvci5fc3R5bGVzO1xuICAgICAgICBpZiAoc3R5bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZXJlIGFyZSB0aHJlZSBzZXBhcmF0ZSBjYXNlcyBoZXJlIGJhc2VkIG9uIFNoYWRvdyBET00gc3VwcG9ydC5cbiAgICAgICAgLy8gKDEpIHNoYWRvd1Jvb3QgcG9seWZpbGxlZDogdXNlIFNoYWR5Q1NTXG4gICAgICAgIC8vICgyKSBzaGFkb3dSb290LmFkb3B0ZWRTdHlsZVNoZWV0cyBhdmFpbGFibGU6IHVzZSBpdFxuICAgICAgICAvLyAoMykgc2hhZG93Um9vdC5hZG9wdGVkU3R5bGVTaGVldHMgcG9seWZpbGxlZDogYXBwZW5kIHN0eWxlcyBhZnRlclxuICAgICAgICAvLyByZW5kZXJpbmdcbiAgICAgICAgaWYgKHdpbmRvdy5TaGFkeUNTUyAhPT0gdW5kZWZpbmVkICYmICF3aW5kb3cuU2hhZHlDU1MubmF0aXZlU2hhZG93KSB7XG4gICAgICAgICAgICB3aW5kb3cuU2hhZHlDU1MuU2NvcGluZ1NoaW0ucHJlcGFyZUFkb3B0ZWRDc3NUZXh0KHN0eWxlcy5tYXAoKHMpID0+IHMuY3NzVGV4dCksIHRoaXMubG9jYWxOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHMpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUm9vdC5hZG9wdGVkU3R5bGVTaGVldHMgPVxuICAgICAgICAgICAgICAgIHN0eWxlcy5tYXAoKHMpID0+IHMgaW5zdGFuY2VvZiBDU1NTdHlsZVNoZWV0ID8gcyA6IHMuc3R5bGVTaGVldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGlzIG11c3QgYmUgZG9uZSBhZnRlciByZW5kZXJpbmcgc28gdGhlIGFjdHVhbCBzdHlsZSBpbnNlcnRpb24gaXMgZG9uZVxuICAgICAgICAgICAgLy8gaW4gYHVwZGF0ZWAuXG4gICAgICAgICAgICB0aGlzLl9uZWVkc1NoaW1BZG9wdGVkU3R5bGVTaGVldHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgICAgICAvLyBOb3RlLCBmaXJzdCB1cGRhdGUvcmVuZGVyIGhhbmRsZXMgc3R5bGVFbGVtZW50IHNvIHdlIG9ubHkgY2FsbCB0aGlzIGlmXG4gICAgICAgIC8vIGNvbm5lY3RlZCBhZnRlciBmaXJzdCB1cGRhdGUuXG4gICAgICAgIGlmICh0aGlzLmhhc1VwZGF0ZWQgJiYgd2luZG93LlNoYWR5Q1NTICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5TaGFkeUNTUy5zdHlsZUVsZW1lbnQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZWxlbWVudC4gVGhpcyBtZXRob2QgcmVmbGVjdHMgcHJvcGVydHkgdmFsdWVzIHRvIGF0dHJpYnV0ZXNcbiAgICAgKiBhbmQgY2FsbHMgYHJlbmRlcmAgdG8gcmVuZGVyIERPTSB2aWEgbGl0LWh0bWwuIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGVcbiAgICAgKiB0aGlzIG1ldGhvZCB3aWxsICpub3QqIHRyaWdnZXIgYW5vdGhlciB1cGRhdGUuXG4gICAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgICAqL1xuICAgIHVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcykge1xuICAgICAgICAvLyBTZXR0aW5nIHByb3BlcnRpZXMgaW4gYHJlbmRlcmAgc2hvdWxkIG5vdCB0cmlnZ2VyIGFuIHVwZGF0ZS4gU2luY2VcbiAgICAgICAgLy8gdXBkYXRlcyBhcmUgYWxsb3dlZCBhZnRlciBzdXBlci51cGRhdGUsIGl0J3MgaW1wb3J0YW50IHRvIGNhbGwgYHJlbmRlcmBcbiAgICAgICAgLy8gYmVmb3JlIHRoYXQuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlUmVzdWx0ID0gdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgc3VwZXIudXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICAgICAgLy8gSWYgcmVuZGVyIGlzIG5vdCBpbXBsZW1lbnRlZCBieSB0aGUgY29tcG9uZW50LCBkb24ndCBjYWxsIGxpdC1odG1sIHJlbmRlclxuICAgICAgICBpZiAodGVtcGxhdGVSZXN1bHQgIT09IHJlbmRlck5vdEltcGxlbWVudGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yXG4gICAgICAgICAgICAgICAgLnJlbmRlcih0ZW1wbGF0ZVJlc3VsdCwgdGhpcy5yZW5kZXJSb290LCB7IHNjb3BlTmFtZTogdGhpcy5sb2NhbE5hbWUsIGV2ZW50Q29udGV4dDogdGhpcyB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIG5hdGl2ZSBTaGFkb3cgRE9NIGlzIHVzZWQgYnV0IGFkb3B0ZWRTdHlsZXMgYXJlIG5vdCBzdXBwb3J0ZWQsXG4gICAgICAgIC8vIGluc2VydCBzdHlsaW5nIGFmdGVyIHJlbmRlcmluZyB0byBlbnN1cmUgYWRvcHRlZFN0eWxlcyBoYXZlIGhpZ2hlc3RcbiAgICAgICAgLy8gcHJpb3JpdHkuXG4gICAgICAgIGlmICh0aGlzLl9uZWVkc1NoaW1BZG9wdGVkU3R5bGVTaGVldHMpIHtcbiAgICAgICAgICAgIHRoaXMuX25lZWRzU2hpbUFkb3B0ZWRTdHlsZVNoZWV0cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5fc3R5bGVzLmZvckVhY2goKHMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBzLmNzc1RleHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJSb290LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludm9rZWQgb24gZWFjaCB1cGRhdGUgdG8gcGVyZm9ybSByZW5kZXJpbmcgdGFza3MuIFRoaXMgbWV0aG9kIG1heSByZXR1cm5cbiAgICAgKiBhbnkgdmFsdWUgcmVuZGVyYWJsZSBieSBsaXQtaHRtbCdzIGBOb2RlUGFydGAgLSB0eXBpY2FsbHkgYVxuICAgICAqIGBUZW1wbGF0ZVJlc3VsdGAuIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCAqbm90KiB0cmlnZ2VyXG4gICAgICogdGhlIGVsZW1lbnQgdG8gdXBkYXRlLlxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlck5vdEltcGxlbWVudGVkO1xuICAgIH1cbn1cbi8qKlxuICogRW5zdXJlIHRoaXMgY2xhc3MgaXMgbWFya2VkIGFzIGBmaW5hbGl6ZWRgIGFzIGFuIG9wdGltaXphdGlvbiBlbnN1cmluZ1xuICogaXQgd2lsbCBub3QgbmVlZGxlc3NseSB0cnkgdG8gYGZpbmFsaXplYC5cbiAqXG4gKiBOb3RlIHRoaXMgcHJvcGVydHkgbmFtZSBpcyBhIHN0cmluZyB0byBwcmV2ZW50IGJyZWFraW5nIENsb3N1cmUgSlMgQ29tcGlsZXJcbiAqIG9wdGltaXphdGlvbnMuIFNlZSB1cGRhdGluZy1lbGVtZW50LnRzIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICovXG5MaXRFbGVtZW50WydmaW5hbGl6ZWQnXSA9IHRydWU7XG4vKipcbiAqIFJlZmVyZW5jZSB0byB0aGUgdW5kZXJseWluZyBsaWJyYXJ5IG1ldGhvZCB1c2VkIHRvIHJlbmRlciB0aGUgZWxlbWVudCdzXG4gKiBET00uIEJ5IGRlZmF1bHQsIHBvaW50cyB0byB0aGUgYHJlbmRlcmAgbWV0aG9kIGZyb20gbGl0LWh0bWwncyBzaGFkeS1yZW5kZXJcbiAqIG1vZHVsZS5cbiAqXG4gKiAqKk1vc3QgdXNlcnMgd2lsbCBuZXZlciBuZWVkIHRvIHRvdWNoIHRoaXMgcHJvcGVydHkuKipcbiAqXG4gKiBUaGlzICBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIGNvbmZ1c2VkIHdpdGggdGhlIGByZW5kZXJgIGluc3RhbmNlIG1ldGhvZCxcbiAqIHdoaWNoIHNob3VsZCBiZSBvdmVycmlkZGVuIHRvIGRlZmluZSBhIHRlbXBsYXRlIGZvciB0aGUgZWxlbWVudC5cbiAqXG4gKiBBZHZhbmNlZCB1c2VycyBjcmVhdGluZyBhIG5ldyBiYXNlIGNsYXNzIGJhc2VkIG9uIExpdEVsZW1lbnQgY2FuIG92ZXJyaWRlXG4gKiB0aGlzIHByb3BlcnR5IHRvIHBvaW50IHRvIGEgY3VzdG9tIHJlbmRlciBtZXRob2Qgd2l0aCBhIHNpZ25hdHVyZSB0aGF0XG4gKiBtYXRjaGVzIFtzaGFkeS1yZW5kZXIncyBgcmVuZGVyYFxuICogbWV0aG9kXShodHRwczovL2xpdC1odG1sLnBvbHltZXItcHJvamVjdC5vcmcvYXBpL21vZHVsZXMvc2hhZHlfcmVuZGVyLmh0bWwjcmVuZGVyKS5cbiAqXG4gKiBAbm9jb2xsYXBzZVxuICovXG5MaXRFbGVtZW50LnJlbmRlciA9IHJlbmRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpdC1lbGVtZW50LmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmltcG9ydCB7IEF0dHJpYnV0ZUNvbW1pdHRlciwgQm9vbGVhbkF0dHJpYnV0ZVBhcnQsIEV2ZW50UGFydCwgTm9kZVBhcnQsIFByb3BlcnR5Q29tbWl0dGVyIH0gZnJvbSAnLi9wYXJ0cy5qcyc7XG4vKipcbiAqIENyZWF0ZXMgUGFydHMgd2hlbiBhIHRlbXBsYXRlIGlzIGluc3RhbnRpYXRlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRUZW1wbGF0ZVByb2Nlc3NvciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHBhcnRzIGZvciBhbiBhdHRyaWJ1dGUtcG9zaXRpb24gYmluZGluZywgZ2l2ZW4gdGhlIGV2ZW50LCBhdHRyaWJ1dGVcbiAgICAgKiBuYW1lLCBhbmQgc3RyaW5nIGxpdGVyYWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgY29udGFpbmluZyB0aGUgYmluZGluZ1xuICAgICAqIEBwYXJhbSBuYW1lICBUaGUgYXR0cmlidXRlIG5hbWVcbiAgICAgKiBAcGFyYW0gc3RyaW5ncyBUaGUgc3RyaW5nIGxpdGVyYWxzLiBUaGVyZSBhcmUgYWx3YXlzIGF0IGxlYXN0IHR3byBzdHJpbmdzLFxuICAgICAqICAgZXZlbnQgZm9yIGZ1bGx5LWNvbnRyb2xsZWQgYmluZGluZ3Mgd2l0aCBhIHNpbmdsZSBleHByZXNzaW9uLlxuICAgICAqL1xuICAgIGhhbmRsZUF0dHJpYnV0ZUV4cHJlc3Npb25zKGVsZW1lbnQsIG5hbWUsIHN0cmluZ3MsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gbmFtZVswXTtcbiAgICAgICAgaWYgKHByZWZpeCA9PT0gJy4nKSB7XG4gICAgICAgICAgICBjb25zdCBjb21taXR0ZXIgPSBuZXcgUHJvcGVydHlDb21taXR0ZXIoZWxlbWVudCwgbmFtZS5zbGljZSgxKSwgc3RyaW5ncyk7XG4gICAgICAgICAgICByZXR1cm4gY29tbWl0dGVyLnBhcnRzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmVmaXggPT09ICdAJykge1xuICAgICAgICAgICAgcmV0dXJuIFtuZXcgRXZlbnRQYXJ0KGVsZW1lbnQsIG5hbWUuc2xpY2UoMSksIG9wdGlvbnMuZXZlbnRDb250ZXh0KV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZWZpeCA9PT0gJz8nKSB7XG4gICAgICAgICAgICByZXR1cm4gW25ldyBCb29sZWFuQXR0cmlidXRlUGFydChlbGVtZW50LCBuYW1lLnNsaWNlKDEpLCBzdHJpbmdzKV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29tbWl0dGVyID0gbmV3IEF0dHJpYnV0ZUNvbW1pdHRlcihlbGVtZW50LCBuYW1lLCBzdHJpbmdzKTtcbiAgICAgICAgcmV0dXJuIGNvbW1pdHRlci5wYXJ0cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHBhcnRzIGZvciBhIHRleHQtcG9zaXRpb24gYmluZGluZy5cbiAgICAgKiBAcGFyYW0gdGVtcGxhdGVGYWN0b3J5XG4gICAgICovXG4gICAgaGFuZGxlVGV4dEV4cHJlc3Npb24ob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IE5vZGVQYXJ0KG9wdGlvbnMpO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBkZWZhdWx0VGVtcGxhdGVQcm9jZXNzb3IgPSBuZXcgRGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZhdWx0LXRlbXBsYXRlLXByb2Nlc3Nvci5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5jb25zdCBkaXJlY3RpdmVzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogQnJhbmRzIGEgZnVuY3Rpb24gYXMgYSBkaXJlY3RpdmUgZmFjdG9yeSBmdW5jdGlvbiBzbyB0aGF0IGxpdC1odG1sIHdpbGwgY2FsbFxuICogdGhlIGZ1bmN0aW9uIGR1cmluZyB0ZW1wbGF0ZSByZW5kZXJpbmcsIHJhdGhlciB0aGFuIHBhc3NpbmcgYXMgYSB2YWx1ZS5cbiAqXG4gKiBBIF9kaXJlY3RpdmVfIGlzIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIFBhcnQgYXMgYW4gYXJndW1lbnQuIEl0IGhhcyB0aGVcbiAqIHNpZ25hdHVyZTogYChwYXJ0OiBQYXJ0KSA9PiB2b2lkYC5cbiAqXG4gKiBBIGRpcmVjdGl2ZSBfZmFjdG9yeV8gaXMgYSBmdW5jdGlvbiB0aGF0IHRha2VzIGFyZ3VtZW50cyBmb3IgZGF0YSBhbmRcbiAqIGNvbmZpZ3VyYXRpb24gYW5kIHJldHVybnMgYSBkaXJlY3RpdmUuIFVzZXJzIG9mIGRpcmVjdGl2ZSB1c3VhbGx5IHJlZmVyIHRvXG4gKiB0aGUgZGlyZWN0aXZlIGZhY3RvcnkgYXMgdGhlIGRpcmVjdGl2ZS4gRm9yIGV4YW1wbGUsIFwiVGhlIHJlcGVhdCBkaXJlY3RpdmVcIi5cbiAqXG4gKiBVc3VhbGx5IGEgdGVtcGxhdGUgYXV0aG9yIHdpbGwgaW52b2tlIGEgZGlyZWN0aXZlIGZhY3RvcnkgaW4gdGhlaXIgdGVtcGxhdGVcbiAqIHdpdGggcmVsZXZhbnQgYXJndW1lbnRzLCB3aGljaCB3aWxsIHRoZW4gcmV0dXJuIGEgZGlyZWN0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEhlcmUncyBhbiBleGFtcGxlIG9mIHVzaW5nIHRoZSBgcmVwZWF0KClgIGRpcmVjdGl2ZSBmYWN0b3J5IHRoYXQgdGFrZXMgYW5cbiAqIGFycmF5IGFuZCBhIGZ1bmN0aW9uIHRvIHJlbmRlciBhbiBpdGVtOlxuICpcbiAqIGBgYGpzXG4gKiBodG1sYDx1bD48JHtyZXBlYXQoaXRlbXMsIChpdGVtKSA9PiBodG1sYDxsaT4ke2l0ZW19PC9saT5gKX08L3VsPmBcbiAqIGBgYFxuICpcbiAqIFdoZW4gYHJlcGVhdGAgaXMgaW52b2tlZCwgaXQgcmV0dXJucyBhIGRpcmVjdGl2ZSBmdW5jdGlvbiB0aGF0IGNsb3NlcyBvdmVyXG4gKiBgaXRlbXNgIGFuZCB0aGUgdGVtcGxhdGUgZnVuY3Rpb24uIFdoZW4gdGhlIG91dGVyIHRlbXBsYXRlIGlzIHJlbmRlcmVkLCB0aGVcbiAqIHJldHVybiBkaXJlY3RpdmUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggdGhlIFBhcnQgZm9yIHRoZSBleHByZXNzaW9uLlxuICogYHJlcGVhdGAgdGhlbiBwZXJmb3JtcyBpdCdzIGN1c3RvbSBsb2dpYyB0byByZW5kZXIgbXVsdGlwbGUgaXRlbXMuXG4gKlxuICogQHBhcmFtIGYgVGhlIGRpcmVjdGl2ZSBmYWN0b3J5IGZ1bmN0aW9uLiBNdXN0IGJlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFcbiAqIGZ1bmN0aW9uIG9mIHRoZSBzaWduYXR1cmUgYChwYXJ0OiBQYXJ0KSA9PiB2b2lkYC4gVGhlIHJldHVybmVkIGZ1bmN0aW9uIHdpbGxcbiAqIGJlIGNhbGxlZCB3aXRoIHRoZSBwYXJ0IG9iamVjdC5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqIGltcG9ydCB7ZGlyZWN0aXZlLCBodG1sfSBmcm9tICdsaXQtaHRtbCc7XG4gKlxuICogY29uc3QgaW1tdXRhYmxlID0gZGlyZWN0aXZlKCh2KSA9PiAocGFydCkgPT4ge1xuICogICBpZiAocGFydC52YWx1ZSAhPT0gdikge1xuICogICAgIHBhcnQuc2V0VmFsdWUodilcbiAqICAgfVxuICogfSk7XG4gKi9cbmV4cG9ydCBjb25zdCBkaXJlY3RpdmUgPSAoZikgPT4gKCguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgZCA9IGYoLi4uYXJncyk7XG4gICAgZGlyZWN0aXZlcy5zZXQoZCwgdHJ1ZSk7XG4gICAgcmV0dXJuIGQ7XG59KTtcbmV4cG9ydCBjb25zdCBpc0RpcmVjdGl2ZSA9IChvKSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBvID09PSAnZnVuY3Rpb24nICYmIGRpcmVjdGl2ZXMuaGFzKG8pO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpcmVjdGl2ZS5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG4vKipcbiAqIFRydWUgaWYgdGhlIGN1c3RvbSBlbGVtZW50cyBwb2x5ZmlsbCBpcyBpbiB1c2UuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0NFUG9seWZpbGwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cyAhPSBudWxsICYmXG4gICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLnBvbHlmaWxsV3JhcEZsdXNoQ2FsbGJhY2sgIT09XG4gICAgICAgIHVuZGVmaW5lZDtcbi8qKlxuICogUmVwYXJlbnRzIG5vZGVzLCBzdGFydGluZyBmcm9tIGBzdGFydGAgKGluY2x1c2l2ZSkgdG8gYGVuZGAgKGV4Y2x1c2l2ZSksXG4gKiBpbnRvIGFub3RoZXIgY29udGFpbmVyIChjb3VsZCBiZSB0aGUgc2FtZSBjb250YWluZXIpLCBiZWZvcmUgYGJlZm9yZWAuIElmXG4gKiBgYmVmb3JlYCBpcyBudWxsLCBpdCBhcHBlbmRzIHRoZSBub2RlcyB0byB0aGUgY29udGFpbmVyLlxuICovXG5leHBvcnQgY29uc3QgcmVwYXJlbnROb2RlcyA9IChjb250YWluZXIsIHN0YXJ0LCBlbmQgPSBudWxsLCBiZWZvcmUgPSBudWxsKSA9PiB7XG4gICAgd2hpbGUgKHN0YXJ0ICE9PSBlbmQpIHtcbiAgICAgICAgY29uc3QgbiA9IHN0YXJ0Lm5leHRTaWJsaW5nO1xuICAgICAgICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKHN0YXJ0LCBiZWZvcmUpO1xuICAgICAgICBzdGFydCA9IG47XG4gICAgfVxufTtcbi8qKlxuICogUmVtb3ZlcyBub2Rlcywgc3RhcnRpbmcgZnJvbSBgc3RhcnRgIChpbmNsdXNpdmUpIHRvIGBlbmRgIChleGNsdXNpdmUpLCBmcm9tXG4gKiBgY29udGFpbmVyYC5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZU5vZGVzID0gKGNvbnRhaW5lciwgc3RhcnQsIGVuZCA9IG51bGwpID0+IHtcbiAgICB3aGlsZSAoc3RhcnQgIT09IGVuZCkge1xuICAgICAgICBjb25zdCBuID0gc3RhcnQubmV4dFNpYmxpbmc7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChzdGFydCk7XG4gICAgICAgIHN0YXJ0ID0gbjtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG9tLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmltcG9ydCB7IGlzVGVtcGxhdGVQYXJ0QWN0aXZlIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG5jb25zdCB3YWxrZXJOb2RlRmlsdGVyID0gMTMzIC8qIE5vZGVGaWx0ZXIuU0hPV197RUxFTUVOVHxDT01NRU5UfFRFWFR9ICovO1xuLyoqXG4gKiBSZW1vdmVzIHRoZSBsaXN0IG9mIG5vZGVzIGZyb20gYSBUZW1wbGF0ZSBzYWZlbHkuIEluIGFkZGl0aW9uIHRvIHJlbW92aW5nXG4gKiBub2RlcyBmcm9tIHRoZSBUZW1wbGF0ZSwgdGhlIFRlbXBsYXRlIHBhcnQgaW5kaWNlcyBhcmUgdXBkYXRlZCB0byBtYXRjaFxuICogdGhlIG11dGF0ZWQgVGVtcGxhdGUgRE9NLlxuICpcbiAqIEFzIHRoZSB0ZW1wbGF0ZSBpcyB3YWxrZWQgdGhlIHJlbW92YWwgc3RhdGUgaXMgdHJhY2tlZCBhbmRcbiAqIHBhcnQgaW5kaWNlcyBhcmUgYWRqdXN0ZWQgYXMgbmVlZGVkLlxuICpcbiAqIGRpdlxuICogICBkaXYjMSAocmVtb3ZlKSA8LS0gc3RhcnQgcmVtb3ZpbmcgKHJlbW92aW5nIG5vZGUgaXMgZGl2IzEpXG4gKiAgICAgZGl2XG4gKiAgICAgICBkaXYjMiAocmVtb3ZlKSAgPC0tIGNvbnRpbnVlIHJlbW92aW5nIChyZW1vdmluZyBub2RlIGlzIHN0aWxsIGRpdiMxKVxuICogICAgICAgICBkaXZcbiAqIGRpdiA8LS0gc3RvcCByZW1vdmluZyBzaW5jZSBwcmV2aW91cyBzaWJsaW5nIGlzIHRoZSByZW1vdmluZyBub2RlIChkaXYjMSxcbiAqIHJlbW92ZWQgNCBub2RlcylcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZU5vZGVzRnJvbVRlbXBsYXRlKHRlbXBsYXRlLCBub2Rlc1RvUmVtb3ZlKSB7XG4gICAgY29uc3QgeyBlbGVtZW50OiB7IGNvbnRlbnQgfSwgcGFydHMgfSA9IHRlbXBsYXRlO1xuICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoY29udGVudCwgd2Fsa2VyTm9kZUZpbHRlciwgbnVsbCwgZmFsc2UpO1xuICAgIGxldCBwYXJ0SW5kZXggPSBuZXh0QWN0aXZlSW5kZXhJblRlbXBsYXRlUGFydHMocGFydHMpO1xuICAgIGxldCBwYXJ0ID0gcGFydHNbcGFydEluZGV4XTtcbiAgICBsZXQgbm9kZUluZGV4ID0gLTE7XG4gICAgbGV0IHJlbW92ZUNvdW50ID0gMDtcbiAgICBjb25zdCBub2Rlc1RvUmVtb3ZlSW5UZW1wbGF0ZSA9IFtdO1xuICAgIGxldCBjdXJyZW50UmVtb3ZpbmdOb2RlID0gbnVsbDtcbiAgICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcbiAgICAgICAgbm9kZUluZGV4Kys7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB3YWxrZXIuY3VycmVudE5vZGU7XG4gICAgICAgIC8vIEVuZCByZW1vdmFsIGlmIHN0ZXBwZWQgcGFzdCB0aGUgcmVtb3Zpbmcgbm9kZVxuICAgICAgICBpZiAobm9kZS5wcmV2aW91c1NpYmxpbmcgPT09IGN1cnJlbnRSZW1vdmluZ05vZGUpIHtcbiAgICAgICAgICAgIGN1cnJlbnRSZW1vdmluZ05vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIEEgbm9kZSB0byByZW1vdmUgd2FzIGZvdW5kIGluIHRoZSB0ZW1wbGF0ZVxuICAgICAgICBpZiAobm9kZXNUb1JlbW92ZS5oYXMobm9kZSkpIHtcbiAgICAgICAgICAgIG5vZGVzVG9SZW1vdmVJblRlbXBsYXRlLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAvLyBUcmFjayBub2RlIHdlJ3JlIHJlbW92aW5nXG4gICAgICAgICAgICBpZiAoY3VycmVudFJlbW92aW5nTm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRSZW1vdmluZ05vZGUgPSBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gcmVtb3ZpbmcsIGluY3JlbWVudCBjb3VudCBieSB3aGljaCB0byBhZGp1c3Qgc3Vic2VxdWVudCBwYXJ0IGluZGljZXNcbiAgICAgICAgaWYgKGN1cnJlbnRSZW1vdmluZ05vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJlbW92ZUNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHBhcnQgIT09IHVuZGVmaW5lZCAmJiBwYXJ0LmluZGV4ID09PSBub2RlSW5kZXgpIHtcbiAgICAgICAgICAgIC8vIElmIHBhcnQgaXMgaW4gYSByZW1vdmVkIG5vZGUgZGVhY3RpdmF0ZSBpdCBieSBzZXR0aW5nIGluZGV4IHRvIC0xIG9yXG4gICAgICAgICAgICAvLyBhZGp1c3QgdGhlIGluZGV4IGFzIG5lZWRlZC5cbiAgICAgICAgICAgIHBhcnQuaW5kZXggPSBjdXJyZW50UmVtb3ZpbmdOb2RlICE9PSBudWxsID8gLTEgOiBwYXJ0LmluZGV4IC0gcmVtb3ZlQ291bnQ7XG4gICAgICAgICAgICAvLyBnbyB0byB0aGUgbmV4dCBhY3RpdmUgcGFydC5cbiAgICAgICAgICAgIHBhcnRJbmRleCA9IG5leHRBY3RpdmVJbmRleEluVGVtcGxhdGVQYXJ0cyhwYXJ0cywgcGFydEluZGV4KTtcbiAgICAgICAgICAgIHBhcnQgPSBwYXJ0c1twYXJ0SW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5vZGVzVG9SZW1vdmVJblRlbXBsYXRlLmZvckVhY2goKG4pID0+IG4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuKSk7XG59XG5jb25zdCBjb3VudE5vZGVzID0gKG5vZGUpID0+IHtcbiAgICBsZXQgY291bnQgPSAobm9kZS5ub2RlVHlwZSA9PT0gMTEgLyogTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFICovKSA/IDAgOiAxO1xuICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIobm9kZSwgd2Fsa2VyTm9kZUZpbHRlciwgbnVsbCwgZmFsc2UpO1xuICAgIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkge1xuICAgICAgICBjb3VudCsrO1xuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG59O1xuY29uc3QgbmV4dEFjdGl2ZUluZGV4SW5UZW1wbGF0ZVBhcnRzID0gKHBhcnRzLCBzdGFydEluZGV4ID0gLTEpID0+IHtcbiAgICBmb3IgKGxldCBpID0gc3RhcnRJbmRleCArIDE7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwYXJ0ID0gcGFydHNbaV07XG4gICAgICAgIGlmIChpc1RlbXBsYXRlUGFydEFjdGl2ZShwYXJ0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufTtcbi8qKlxuICogSW5zZXJ0cyB0aGUgZ2l2ZW4gbm9kZSBpbnRvIHRoZSBUZW1wbGF0ZSwgb3B0aW9uYWxseSBiZWZvcmUgdGhlIGdpdmVuXG4gKiByZWZOb2RlLiBJbiBhZGRpdGlvbiB0byBpbnNlcnRpbmcgdGhlIG5vZGUgaW50byB0aGUgVGVtcGxhdGUsIHRoZSBUZW1wbGF0ZVxuICogcGFydCBpbmRpY2VzIGFyZSB1cGRhdGVkIHRvIG1hdGNoIHRoZSBtdXRhdGVkIFRlbXBsYXRlIERPTS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydE5vZGVJbnRvVGVtcGxhdGUodGVtcGxhdGUsIG5vZGUsIHJlZk5vZGUgPSBudWxsKSB7XG4gICAgY29uc3QgeyBlbGVtZW50OiB7IGNvbnRlbnQgfSwgcGFydHMgfSA9IHRlbXBsYXRlO1xuICAgIC8vIElmIHRoZXJlJ3Mgbm8gcmVmTm9kZSwgdGhlbiBwdXQgbm9kZSBhdCBlbmQgb2YgdGVtcGxhdGUuXG4gICAgLy8gTm8gcGFydCBpbmRpY2VzIG5lZWQgdG8gYmUgc2hpZnRlZCBpbiB0aGlzIGNhc2UuXG4gICAgaWYgKHJlZk5vZGUgPT09IG51bGwgfHwgcmVmTm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihjb250ZW50LCB3YWxrZXJOb2RlRmlsdGVyLCBudWxsLCBmYWxzZSk7XG4gICAgbGV0IHBhcnRJbmRleCA9IG5leHRBY3RpdmVJbmRleEluVGVtcGxhdGVQYXJ0cyhwYXJ0cyk7XG4gICAgbGV0IGluc2VydENvdW50ID0gMDtcbiAgICBsZXQgd2Fsa2VySW5kZXggPSAtMTtcbiAgICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcbiAgICAgICAgd2Fsa2VySW5kZXgrKztcbiAgICAgICAgY29uc3Qgd2Fsa2VyTm9kZSA9IHdhbGtlci5jdXJyZW50Tm9kZTtcbiAgICAgICAgaWYgKHdhbGtlck5vZGUgPT09IHJlZk5vZGUpIHtcbiAgICAgICAgICAgIGluc2VydENvdW50ID0gY291bnROb2Rlcyhub2RlKTtcbiAgICAgICAgICAgIHJlZk5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgcmVmTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHBhcnRJbmRleCAhPT0gLTEgJiYgcGFydHNbcGFydEluZGV4XS5pbmRleCA9PT0gd2Fsa2VySW5kZXgpIHtcbiAgICAgICAgICAgIC8vIElmIHdlJ3ZlIGluc2VydGVkIHRoZSBub2RlLCBzaW1wbHkgYWRqdXN0IGFsbCBzdWJzZXF1ZW50IHBhcnRzXG4gICAgICAgICAgICBpZiAoaW5zZXJ0Q291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhcnRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydHNbcGFydEluZGV4XS5pbmRleCArPSBpbnNlcnRDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgcGFydEluZGV4ID0gbmV4dEFjdGl2ZUluZGV4SW5UZW1wbGF0ZVBhcnRzKHBhcnRzLCBwYXJ0SW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJ0SW5kZXggPSBuZXh0QWN0aXZlSW5kZXhJblRlbXBsYXRlUGFydHMocGFydHMsIHBhcnRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RpZnktdGVtcGxhdGUuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE4IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuLyoqXG4gKiBBIHNlbnRpbmVsIHZhbHVlIHRoYXQgc2lnbmFscyB0aGF0IGEgdmFsdWUgd2FzIGhhbmRsZWQgYnkgYSBkaXJlY3RpdmUgYW5kXG4gKiBzaG91bGQgbm90IGJlIHdyaXR0ZW4gdG8gdGhlIERPTS5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vQ2hhbmdlID0ge307XG4vKipcbiAqIEEgc2VudGluZWwgdmFsdWUgdGhhdCBzaWduYWxzIGEgTm9kZVBhcnQgdG8gZnVsbHkgY2xlYXIgaXRzIGNvbnRlbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBub3RoaW5nID0ge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXJ0LmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmltcG9ydCB7IGlzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUuanMnO1xuaW1wb3J0IHsgcmVtb3ZlTm9kZXMgfSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgeyBub0NoYW5nZSwgbm90aGluZyB9IGZyb20gJy4vcGFydC5qcyc7XG5pbXBvcnQgeyBUZW1wbGF0ZUluc3RhbmNlIH0gZnJvbSAnLi90ZW1wbGF0ZS1pbnN0YW5jZS5qcyc7XG5pbXBvcnQgeyBUZW1wbGF0ZVJlc3VsdCB9IGZyb20gJy4vdGVtcGxhdGUtcmVzdWx0LmpzJztcbmltcG9ydCB7IGNyZWF0ZU1hcmtlciB9IGZyb20gJy4vdGVtcGxhdGUuanMnO1xuZXhwb3J0IGNvbnN0IGlzUHJpbWl0aXZlID0gKHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuICh2YWx1ZSA9PT0gbnVsbCB8fFxuICAgICAgICAhKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSk7XG59O1xuZXhwb3J0IGNvbnN0IGlzSXRlcmFibGUgPSAodmFsdWUpID0+IHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHxcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgISEodmFsdWUgJiYgdmFsdWVbU3ltYm9sLml0ZXJhdG9yXSk7XG59O1xuLyoqXG4gKiBXcml0ZXMgYXR0cmlidXRlIHZhbHVlcyB0byB0aGUgRE9NIGZvciBhIGdyb3VwIG9mIEF0dHJpYnV0ZVBhcnRzIGJvdW5kIHRvIGFcbiAqIHNpbmdsZSBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBpcyBvbmx5IHNldCBvbmNlIGV2ZW4gaWYgdGhlcmUgYXJlIG11bHRpcGxlIHBhcnRzXG4gKiBmb3IgYW4gYXR0cmlidXRlLlxuICovXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlQ29tbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBuYW1lLCBzdHJpbmdzKSB7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnN0cmluZ3MgPSBzdHJpbmdzO1xuICAgICAgICB0aGlzLnBhcnRzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGFydHNbaV0gPSB0aGlzLl9jcmVhdGVQYXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHNpbmdsZSBwYXJ0LiBPdmVycmlkZSB0aGlzIHRvIGNyZWF0ZSBhIGRpZmZlcm50IHR5cGUgb2YgcGFydC5cbiAgICAgKi9cbiAgICBfY3JlYXRlUGFydCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBdHRyaWJ1dGVQYXJ0KHRoaXMpO1xuICAgIH1cbiAgICBfZ2V0VmFsdWUoKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZ3MgPSB0aGlzLnN0cmluZ3M7XG4gICAgICAgIGNvbnN0IGwgPSBzdHJpbmdzLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gdGhpcy5wYXJ0cztcbiAgICAgICAgLy8gSWYgd2UncmUgYXNzaWduaW5nIGFuIGF0dHJpYnV0ZSB2aWEgc3ludGF4IGxpa2U6XG4gICAgICAgIC8vICAgIGF0dHI9XCIke2Zvb31cIiAgb3IgIGF0dHI9JHtmb299XG4gICAgICAgIC8vIGJ1dCBub3RcbiAgICAgICAgLy8gICAgYXR0cj1cIiR7Zm9vfSAke2Jhcn1cIiBvciBhdHRyPVwiJHtmb299IGJhelwiXG4gICAgICAgIC8vIHRoZW4gd2UgZG9uJ3Qgd2FudCB0byBjb2VyY2UgdGhlIGF0dHJpYnV0ZSB2YWx1ZSBpbnRvIG9uZSBsb25nXG4gICAgICAgIC8vIHN0cmluZy4gSW5zdGVhZCB3ZSB3YW50IHRvIGp1c3QgcmV0dXJuIHRoZSB2YWx1ZSBpdHNlbGYgZGlyZWN0bHksXG4gICAgICAgIC8vIHNvIHRoYXQgc2FuaXRpemVET01WYWx1ZSBjYW4gZ2V0IHRoZSBhY3R1YWwgdmFsdWUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gU3RyaW5nKHZhbHVlKVxuICAgICAgICAvLyBUaGUgZXhjZXB0aW9uIGlzIGlmIHYgaXMgYW4gYXJyYXksIGluIHdoaWNoIGNhc2Ugd2UgZG8gd2FudCB0byBzbWFzaFxuICAgICAgICAvLyBpdCB0b2dldGhlciBpbnRvIGEgc3RyaW5nIHdpdGhvdXQgY2FsbGluZyBTdHJpbmcoKSBvbiB0aGUgYXJyYXkuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoaXMgYWxzbyBhbGxvd3MgdHJ1c3RlZCB2YWx1ZXMgKHdoZW4gdXNpbmcgVHJ1c3RlZFR5cGVzKSBiZWluZ1xuICAgICAgICAvLyBhc3NpZ25lZCB0byBET00gc2lua3Mgd2l0aG91dCBiZWluZyBzdHJpbmdpZmllZCBpbiB0aGUgcHJvY2Vzcy5cbiAgICAgICAgaWYgKGwgPT09IDEgJiYgc3RyaW5nc1swXSA9PT0gJycgJiYgc3RyaW5nc1sxXSA9PT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSBwYXJ0c1swXS52YWx1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJyB8fCAhaXNJdGVyYWJsZSh2KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB0ZXh0ICs9IHN0cmluZ3NbaV07XG4gICAgICAgICAgICBjb25zdCBwYXJ0ID0gcGFydHNbaV07XG4gICAgICAgICAgICBpZiAocGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdiA9IHBhcnQudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGlzUHJpbWl0aXZlKHYpIHx8ICFpc0l0ZXJhYmxlKHYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgKz0gdHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdiA6IFN0cmluZyh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdCBvZiB2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IHR5cGVvZiB0ID09PSAnc3RyaW5nJyA/IHQgOiBTdHJpbmcodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGV4dCArPSBzdHJpbmdzW2xdO1xuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gICAgY29tbWl0KCkge1xuICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLm5hbWUsIHRoaXMuX2dldFZhbHVlKCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIFBhcnQgdGhhdCBjb250cm9scyBhbGwgb3IgcGFydCBvZiBhbiBhdHRyaWJ1dGUgdmFsdWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGVQYXJ0IHtcbiAgICBjb25zdHJ1Y3Rvcihjb21taXR0ZXIpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb21taXR0ZXIgPSBjb21taXR0ZXI7XG4gICAgfVxuICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gbm9DaGFuZ2UgJiYgKCFpc1ByaW1pdGl2ZSh2YWx1ZSkgfHwgdmFsdWUgIT09IHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdmFsdWUgaXMgYSBub3QgYSBkaXJlY3RpdmUsIGRpcnR5IHRoZSBjb21taXR0ZXIgc28gdGhhdCBpdCdsbFxuICAgICAgICAgICAgLy8gY2FsbCBzZXRBdHRyaWJ1dGUuIElmIHRoZSB2YWx1ZSBpcyBhIGRpcmVjdGl2ZSwgaXQnbGwgZGlydHkgdGhlXG4gICAgICAgICAgICAvLyBjb21taXR0ZXIgaWYgaXQgY2FsbHMgc2V0VmFsdWUoKS5cbiAgICAgICAgICAgIGlmICghaXNEaXJlY3RpdmUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21taXR0ZXIuZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbW1pdCgpIHtcbiAgICAgICAgd2hpbGUgKGlzRGlyZWN0aXZlKHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RpdmUgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG5vQ2hhbmdlO1xuICAgICAgICAgICAgZGlyZWN0aXZlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSBub0NoYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tbWl0dGVyLmNvbW1pdCgpO1xuICAgIH1cbn1cbi8qKlxuICogQSBQYXJ0IHRoYXQgY29udHJvbHMgYSBsb2NhdGlvbiB3aXRoaW4gYSBOb2RlIHRyZWUuIExpa2UgYSBSYW5nZSwgTm9kZVBhcnRcbiAqIGhhcyBzdGFydCBhbmQgZW5kIGxvY2F0aW9ucyBhbmQgY2FuIHNldCBhbmQgdXBkYXRlIHRoZSBOb2RlcyBiZXR3ZWVuIHRob3NlXG4gKiBsb2NhdGlvbnMuXG4gKlxuICogTm9kZVBhcnRzIHN1cHBvcnQgc2V2ZXJhbCB2YWx1ZSB0eXBlczogcHJpbWl0aXZlcywgTm9kZXMsIFRlbXBsYXRlUmVzdWx0cyxcbiAqIGFzIHdlbGwgYXMgYXJyYXlzIGFuZCBpdGVyYWJsZXMgb2YgdGhvc2UgdHlwZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb2RlUGFydCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9fcGVuZGluZ1ZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBlbmRzIHRoaXMgcGFydCBpbnRvIGEgY29udGFpbmVyLlxuICAgICAqXG4gICAgICogVGhpcyBwYXJ0IG11c3QgYmUgZW1wdHksIGFzIGl0cyBjb250ZW50cyBhcmUgbm90IGF1dG9tYXRpY2FsbHkgbW92ZWQuXG4gICAgICovXG4gICAgYXBwZW5kSW50byhjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5zdGFydE5vZGUgPSBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlTWFya2VyKCkpO1xuICAgICAgICB0aGlzLmVuZE5vZGUgPSBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlTWFya2VyKCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoaXMgcGFydCBhZnRlciB0aGUgYHJlZmAgbm9kZSAoYmV0d2VlbiBgcmVmYCBhbmQgYHJlZmAncyBuZXh0XG4gICAgICogc2libGluZykuIEJvdGggYHJlZmAgYW5kIGl0cyBuZXh0IHNpYmxpbmcgbXVzdCBiZSBzdGF0aWMsIHVuY2hhbmdpbmcgbm9kZXNcbiAgICAgKiBzdWNoIGFzIHRob3NlIHRoYXQgYXBwZWFyIGluIGEgbGl0ZXJhbCBzZWN0aW9uIG9mIGEgdGVtcGxhdGUuXG4gICAgICpcbiAgICAgKiBUaGlzIHBhcnQgbXVzdCBiZSBlbXB0eSwgYXMgaXRzIGNvbnRlbnRzIGFyZSBub3QgYXV0b21hdGljYWxseSBtb3ZlZC5cbiAgICAgKi9cbiAgICBpbnNlcnRBZnRlck5vZGUocmVmKSB7XG4gICAgICAgIHRoaXMuc3RhcnROb2RlID0gcmVmO1xuICAgICAgICB0aGlzLmVuZE5vZGUgPSByZWYubmV4dFNpYmxpbmc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGVuZHMgdGhpcyBwYXJ0IGludG8gYSBwYXJlbnQgcGFydC5cbiAgICAgKlxuICAgICAqIFRoaXMgcGFydCBtdXN0IGJlIGVtcHR5LCBhcyBpdHMgY29udGVudHMgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IG1vdmVkLlxuICAgICAqL1xuICAgIGFwcGVuZEludG9QYXJ0KHBhcnQpIHtcbiAgICAgICAgcGFydC5fX2luc2VydCh0aGlzLnN0YXJ0Tm9kZSA9IGNyZWF0ZU1hcmtlcigpKTtcbiAgICAgICAgcGFydC5fX2luc2VydCh0aGlzLmVuZE5vZGUgPSBjcmVhdGVNYXJrZXIoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhpcyBwYXJ0IGFmdGVyIHRoZSBgcmVmYCBwYXJ0LlxuICAgICAqXG4gICAgICogVGhpcyBwYXJ0IG11c3QgYmUgZW1wdHksIGFzIGl0cyBjb250ZW50cyBhcmUgbm90IGF1dG9tYXRpY2FsbHkgbW92ZWQuXG4gICAgICovXG4gICAgaW5zZXJ0QWZ0ZXJQYXJ0KHJlZikge1xuICAgICAgICByZWYuX19pbnNlcnQodGhpcy5zdGFydE5vZGUgPSBjcmVhdGVNYXJrZXIoKSk7XG4gICAgICAgIHRoaXMuZW5kTm9kZSA9IHJlZi5lbmROb2RlO1xuICAgICAgICByZWYuZW5kTm9kZSA9IHRoaXMuc3RhcnROb2RlO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9fcGVuZGluZ1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIGNvbW1pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnROb2RlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoaXNEaXJlY3RpdmUodGhpcy5fX3BlbmRpbmdWYWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHRoaXMuX19wZW5kaW5nVmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9fcGVuZGluZ1ZhbHVlID0gbm9DaGFuZ2U7XG4gICAgICAgICAgICBkaXJlY3RpdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9fcGVuZGluZ1ZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgPT09IG5vQ2hhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJpbWl0aXZlKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2NvbW1pdFRleHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMuX19jb21taXRUZW1wbGF0ZVJlc3VsdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgICAgICB0aGlzLl9fY29tbWl0Tm9kZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNJdGVyYWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX19jb21taXRJdGVyYWJsZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IG5vdGhpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBub3RoaW5nO1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gRmFsbGJhY2ssIHdpbGwgcmVuZGVyIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAgICAgICAgICAgIHRoaXMuX19jb21taXRUZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfX2luc2VydChub2RlKSB7XG4gICAgICAgIHRoaXMuZW5kTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCB0aGlzLmVuZE5vZGUpO1xuICAgIH1cbiAgICBfX2NvbW1pdE5vZGUodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICB0aGlzLl9faW5zZXJ0KHZhbHVlKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBfX2NvbW1pdFRleHQodmFsdWUpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuc3RhcnROb2RlLm5leHRTaWJsaW5nO1xuICAgICAgICB2YWx1ZSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuICAgICAgICAvLyBJZiBgdmFsdWVgIGlzbid0IGFscmVhZHkgYSBzdHJpbmcsIHdlIGV4cGxpY2l0bHkgY29udmVydCBpdCBoZXJlIGluIGNhc2VcbiAgICAgICAgLy8gaXQgY2FuJ3QgYmUgaW1wbGljaXRseSBjb252ZXJ0ZWQgLSBpLmUuIGl0J3MgYSBzeW1ib2wuXG4gICAgICAgIGNvbnN0IHZhbHVlQXNTdHJpbmcgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBTdHJpbmcodmFsdWUpO1xuICAgICAgICBpZiAobm9kZSA9PT0gdGhpcy5lbmROb2RlLnByZXZpb3VzU2libGluZyAmJlxuICAgICAgICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gMyAvKiBOb2RlLlRFWFRfTk9ERSAqLykge1xuICAgICAgICAgICAgLy8gSWYgd2Ugb25seSBoYXZlIGEgc2luZ2xlIHRleHQgbm9kZSBiZXR3ZWVuIHRoZSBtYXJrZXJzLCB3ZSBjYW4ganVzdFxuICAgICAgICAgICAgLy8gc2V0IGl0cyB2YWx1ZSwgcmF0aGVyIHRoYW4gcmVwbGFjaW5nIGl0LlxuICAgICAgICAgICAgLy8gVE9ETyhqdXN0aW5mYWduYW5pKTogQ2FuIHdlIGp1c3QgY2hlY2sgaWYgdGhpcy52YWx1ZSBpcyBwcmltaXRpdmU/XG4gICAgICAgICAgICBub2RlLmRhdGEgPSB2YWx1ZUFzU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fX2NvbW1pdE5vZGUoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWVBc1N0cmluZykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgX19jb21taXRUZW1wbGF0ZVJlc3VsdCh2YWx1ZSkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMub3B0aW9ucy50ZW1wbGF0ZUZhY3RvcnkodmFsdWUpO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlSW5zdGFuY2UgJiZcbiAgICAgICAgICAgIHRoaXMudmFsdWUudGVtcGxhdGUgPT09IHRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnVwZGF0ZSh2YWx1ZS52YWx1ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIHByb3BhZ2F0ZSB0aGUgdGVtcGxhdGUgcHJvY2Vzc29yIGZyb20gdGhlIFRlbXBsYXRlUmVzdWx0XG4gICAgICAgICAgICAvLyBzbyB0aGF0IHdlIHVzZSBpdHMgc3ludGF4IGV4dGVuc2lvbiwgZXRjLiBUaGUgdGVtcGxhdGUgZmFjdG9yeSBjb21lc1xuICAgICAgICAgICAgLy8gZnJvbSB0aGUgcmVuZGVyIGZ1bmN0aW9uIG9wdGlvbnMgc28gdGhhdCBpdCBjYW4gY29udHJvbCB0ZW1wbGF0ZVxuICAgICAgICAgICAgLy8gY2FjaGluZyBhbmQgcHJlcHJvY2Vzc2luZy5cbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFRlbXBsYXRlSW5zdGFuY2UodGVtcGxhdGUsIHZhbHVlLnByb2Nlc3NvciwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IGZyYWdtZW50ID0gaW5zdGFuY2UuX2Nsb25lKCk7XG4gICAgICAgICAgICBpbnN0YW5jZS51cGRhdGUodmFsdWUudmFsdWVzKTtcbiAgICAgICAgICAgIHRoaXMuX19jb21taXROb2RlKGZyYWdtZW50KTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBpbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfX2NvbW1pdEl0ZXJhYmxlKHZhbHVlKSB7XG4gICAgICAgIC8vIEZvciBhbiBJdGVyYWJsZSwgd2UgY3JlYXRlIGEgbmV3IEluc3RhbmNlUGFydCBwZXIgaXRlbSwgdGhlbiBzZXQgaXRzXG4gICAgICAgIC8vIHZhbHVlIHRvIHRoZSBpdGVtLiBUaGlzIGlzIGEgbGl0dGxlIGJpdCBvZiBvdmVyaGVhZCBmb3IgZXZlcnkgaXRlbSBpblxuICAgICAgICAvLyBhbiBJdGVyYWJsZSwgYnV0IGl0IGxldHMgdXMgcmVjdXJzZSBlYXNpbHkgYW5kIGVmZmljaWVudGx5IHVwZGF0ZSBBcnJheXNcbiAgICAgICAgLy8gb2YgVGVtcGxhdGVSZXN1bHRzIHRoYXQgd2lsbCBiZSBjb21tb25seSByZXR1cm5lZCBmcm9tIGV4cHJlc3Npb25zIGxpa2U6XG4gICAgICAgIC8vIGFycmF5Lm1hcCgoaSkgPT4gaHRtbGAke2l9YCksIGJ5IHJldXNpbmcgZXhpc3RpbmcgVGVtcGxhdGVJbnN0YW5jZXMuXG4gICAgICAgIC8vIElmIF92YWx1ZSBpcyBhbiBhcnJheSwgdGhlbiB0aGUgcHJldmlvdXMgcmVuZGVyIHdhcyBvZiBhblxuICAgICAgICAvLyBpdGVyYWJsZSBhbmQgX3ZhbHVlIHdpbGwgY29udGFpbiB0aGUgTm9kZVBhcnRzIGZyb20gdGhlIHByZXZpb3VzXG4gICAgICAgIC8vIHJlbmRlci4gSWYgX3ZhbHVlIGlzIG5vdCBhbiBhcnJheSwgY2xlYXIgdGhpcyBwYXJ0IGFuZCBtYWtlIGEgbmV3XG4gICAgICAgIC8vIGFycmF5IGZvciBOb2RlUGFydHMuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIExldHMgdXMga2VlcCB0cmFjayBvZiBob3cgbWFueSBpdGVtcyB3ZSBzdGFtcGVkIHNvIHdlIGNhbiBjbGVhciBsZWZ0b3ZlclxuICAgICAgICAvLyBpdGVtcyBmcm9tIGEgcHJldmlvdXMgcmVuZGVyXG4gICAgICAgIGNvbnN0IGl0ZW1QYXJ0cyA9IHRoaXMudmFsdWU7XG4gICAgICAgIGxldCBwYXJ0SW5kZXggPSAwO1xuICAgICAgICBsZXQgaXRlbVBhcnQ7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gVHJ5IHRvIHJldXNlIGFuIGV4aXN0aW5nIHBhcnRcbiAgICAgICAgICAgIGl0ZW1QYXJ0ID0gaXRlbVBhcnRzW3BhcnRJbmRleF07XG4gICAgICAgICAgICAvLyBJZiBubyBleGlzdGluZyBwYXJ0LCBjcmVhdGUgYSBuZXcgb25lXG4gICAgICAgICAgICBpZiAoaXRlbVBhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGl0ZW1QYXJ0ID0gbmV3IE5vZGVQYXJ0KHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgaXRlbVBhcnRzLnB1c2goaXRlbVBhcnQpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVBhcnQuYXBwZW5kSW50b1BhcnQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtUGFydC5pbnNlcnRBZnRlclBhcnQoaXRlbVBhcnRzW3BhcnRJbmRleCAtIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtUGFydC5zZXRWYWx1ZShpdGVtKTtcbiAgICAgICAgICAgIGl0ZW1QYXJ0LmNvbW1pdCgpO1xuICAgICAgICAgICAgcGFydEluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRJbmRleCA8IGl0ZW1QYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIFRydW5jYXRlIHRoZSBwYXJ0cyBhcnJheSBzbyBfdmFsdWUgcmVmbGVjdHMgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgICAgICAgIGl0ZW1QYXJ0cy5sZW5ndGggPSBwYXJ0SW5kZXg7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKGl0ZW1QYXJ0ICYmIGl0ZW1QYXJ0LmVuZE5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKHN0YXJ0Tm9kZSA9IHRoaXMuc3RhcnROb2RlKSB7XG4gICAgICAgIHJlbW92ZU5vZGVzKHRoaXMuc3RhcnROb2RlLnBhcmVudE5vZGUsIHN0YXJ0Tm9kZS5uZXh0U2libGluZywgdGhpcy5lbmROb2RlKTtcbiAgICB9XG59XG4vKipcbiAqIEltcGxlbWVudHMgYSBib29sZWFuIGF0dHJpYnV0ZSwgcm91Z2hseSBhcyBkZWZpbmVkIGluIHRoZSBIVE1MXG4gKiBzcGVjaWZpY2F0aW9uLlxuICpcbiAqIElmIHRoZSB2YWx1ZSBpcyB0cnV0aHksIHRoZW4gdGhlIGF0dHJpYnV0ZSBpcyBwcmVzZW50IHdpdGggYSB2YWx1ZSBvZlxuICogJycuIElmIHRoZSB2YWx1ZSBpcyBmYWxzZXksIHRoZSBhdHRyaWJ1dGUgaXMgcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIEJvb2xlYW5BdHRyaWJ1dGVQYXJ0IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBuYW1lLCBzdHJpbmdzKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX19wZW5kaW5nVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChzdHJpbmdzLmxlbmd0aCAhPT0gMiB8fCBzdHJpbmdzWzBdICE9PSAnJyB8fCBzdHJpbmdzWzFdICE9PSAnJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb29sZWFuIGF0dHJpYnV0ZXMgY2FuIG9ubHkgY29udGFpbiBhIHNpbmdsZSBleHByZXNzaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdHJpbmdzID0gc3RyaW5ncztcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fX3BlbmRpbmdWYWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBjb21taXQoKSB7XG4gICAgICAgIHdoaWxlIChpc0RpcmVjdGl2ZSh0aGlzLl9fcGVuZGluZ1ZhbHVlKSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0aXZlID0gdGhpcy5fX3BlbmRpbmdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX19wZW5kaW5nVmFsdWUgPSBub0NoYW5nZTtcbiAgICAgICAgICAgIGRpcmVjdGl2ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fX3BlbmRpbmdWYWx1ZSA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9ICEhdGhpcy5fX3BlbmRpbmdWYWx1ZTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKHRoaXMubmFtZSwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSh0aGlzLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX19wZW5kaW5nVmFsdWUgPSBub0NoYW5nZTtcbiAgICB9XG59XG4vKipcbiAqIFNldHMgYXR0cmlidXRlIHZhbHVlcyBmb3IgUHJvcGVydHlQYXJ0cywgc28gdGhhdCB0aGUgdmFsdWUgaXMgb25seSBzZXQgb25jZVxuICogZXZlbiBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgcGFydHMgZm9yIGEgcHJvcGVydHkuXG4gKlxuICogSWYgYW4gZXhwcmVzc2lvbiBjb250cm9scyB0aGUgd2hvbGUgcHJvcGVydHkgdmFsdWUsIHRoZW4gdGhlIHZhbHVlIGlzIHNpbXBseVxuICogYXNzaWduZWQgdG8gdGhlIHByb3BlcnR5IHVuZGVyIGNvbnRyb2wuIElmIHRoZXJlIGFyZSBzdHJpbmcgbGl0ZXJhbHMgb3JcbiAqIG11bHRpcGxlIGV4cHJlc3Npb25zLCB0aGVuIHRoZSBzdHJpbmdzIGFyZSBleHByZXNzaW9ucyBhcmUgaW50ZXJwb2xhdGVkIGludG9cbiAqIGEgc3RyaW5nIGZpcnN0LlxuICovXG5leHBvcnQgY2xhc3MgUHJvcGVydHlDb21taXR0ZXIgZXh0ZW5kcyBBdHRyaWJ1dGVDb21taXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG5hbWUsIHN0cmluZ3MpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudCwgbmFtZSwgc3RyaW5ncyk7XG4gICAgICAgIHRoaXMuc2luZ2xlID1cbiAgICAgICAgICAgIChzdHJpbmdzLmxlbmd0aCA9PT0gMiAmJiBzdHJpbmdzWzBdID09PSAnJyAmJiBzdHJpbmdzWzFdID09PSAnJyk7XG4gICAgfVxuICAgIF9jcmVhdGVQYXJ0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5UGFydCh0aGlzKTtcbiAgICB9XG4gICAgX2dldFZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5zaW5nbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnRzWzBdLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5fZ2V0VmFsdWUoKTtcbiAgICB9XG4gICAgY29tbWl0KCkge1xuICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFt0aGlzLm5hbWVdID0gdGhpcy5fZ2V0VmFsdWUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eVBhcnQgZXh0ZW5kcyBBdHRyaWJ1dGVQYXJ0IHtcbn1cbi8vIERldGVjdCBldmVudCBsaXN0ZW5lciBvcHRpb25zIHN1cHBvcnQuIElmIHRoZSBgY2FwdHVyZWAgcHJvcGVydHkgaXMgcmVhZFxuLy8gZnJvbSB0aGUgb3B0aW9ucyBvYmplY3QsIHRoZW4gb3B0aW9ucyBhcmUgc3VwcG9ydGVkLiBJZiBub3QsIHRoZW4gdGhlIHRoaXJkXG4vLyBhcmd1bWVudCB0byBhZGQvcmVtb3ZlRXZlbnRMaXN0ZW5lciBpcyBpbnRlcnByZXRlZCBhcyB0aGUgYm9vbGVhbiBjYXB0dXJlXG4vLyB2YWx1ZSBzbyB3ZSBzaG91bGQgb25seSBwYXNzIHRoZSBgY2FwdHVyZWAgcHJvcGVydHkuXG5sZXQgZXZlbnRPcHRpb25zU3VwcG9ydGVkID0gZmFsc2U7XG4vLyBXcmFwIGludG8gYW4gSUlGRSBiZWNhdXNlIE1TIEVkZ2UgPD0gdjQxIGRvZXMgbm90IHN1cHBvcnQgaGF2aW5nIHRyeS9jYXRjaFxuLy8gYmxvY2tzIHJpZ2h0IGludG8gdGhlIGJvZHkgb2YgYSBtb2R1bGVcbigoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGdldCBjYXB0dXJlKCkge1xuICAgICAgICAgICAgICAgIGV2ZW50T3B0aW9uc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBjYXRjaCAoX2UpIHtcbiAgICAgICAgLy8gZXZlbnQgb3B0aW9ucyBub3Qgc3VwcG9ydGVkXG4gICAgfVxufSkoKTtcbmV4cG9ydCBjbGFzcyBFdmVudFBhcnQge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGV2ZW50TmFtZSwgZXZlbnRDb250ZXh0KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX19wZW5kaW5nVmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICB0aGlzLmV2ZW50Q29udGV4dCA9IGV2ZW50Q29udGV4dDtcbiAgICAgICAgdGhpcy5fX2JvdW5kSGFuZGxlRXZlbnQgPSAoZSkgPT4gdGhpcy5oYW5kbGVFdmVudChlKTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fX3BlbmRpbmdWYWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBjb21taXQoKSB7XG4gICAgICAgIHdoaWxlIChpc0RpcmVjdGl2ZSh0aGlzLl9fcGVuZGluZ1ZhbHVlKSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0aXZlID0gdGhpcy5fX3BlbmRpbmdWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX19wZW5kaW5nVmFsdWUgPSBub0NoYW5nZTtcbiAgICAgICAgICAgIGRpcmVjdGl2ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fX3BlbmRpbmdWYWx1ZSA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdMaXN0ZW5lciA9IHRoaXMuX19wZW5kaW5nVmFsdWU7XG4gICAgICAgIGNvbnN0IG9sZExpc3RlbmVyID0gdGhpcy52YWx1ZTtcbiAgICAgICAgY29uc3Qgc2hvdWxkUmVtb3ZlTGlzdGVuZXIgPSBuZXdMaXN0ZW5lciA9PSBudWxsIHx8XG4gICAgICAgICAgICBvbGRMaXN0ZW5lciAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgKG5ld0xpc3RlbmVyLmNhcHR1cmUgIT09IG9sZExpc3RlbmVyLmNhcHR1cmUgfHxcbiAgICAgICAgICAgICAgICAgICAgbmV3TGlzdGVuZXIub25jZSAhPT0gb2xkTGlzdGVuZXIub25jZSB8fFxuICAgICAgICAgICAgICAgICAgICBuZXdMaXN0ZW5lci5wYXNzaXZlICE9PSBvbGRMaXN0ZW5lci5wYXNzaXZlKTtcbiAgICAgICAgY29uc3Qgc2hvdWxkQWRkTGlzdGVuZXIgPSBuZXdMaXN0ZW5lciAhPSBudWxsICYmIChvbGRMaXN0ZW5lciA9PSBudWxsIHx8IHNob3VsZFJlbW92ZUxpc3RlbmVyKTtcbiAgICAgICAgaWYgKHNob3VsZFJlbW92ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50TmFtZSwgdGhpcy5fX2JvdW5kSGFuZGxlRXZlbnQsIHRoaXMuX19vcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hvdWxkQWRkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX19vcHRpb25zID0gZ2V0T3B0aW9ucyhuZXdMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50TmFtZSwgdGhpcy5fX2JvdW5kSGFuZGxlRXZlbnQsIHRoaXMuX19vcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlID0gbmV3TGlzdGVuZXI7XG4gICAgICAgIHRoaXMuX19wZW5kaW5nVmFsdWUgPSBub0NoYW5nZTtcbiAgICB9XG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLmNhbGwodGhpcy5ldmVudENvbnRleHQgfHwgdGhpcy5lbGVtZW50LCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLmhhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIFdlIGNvcHkgb3B0aW9ucyBiZWNhdXNlIG9mIHRoZSBpbmNvbnNpc3RlbnQgYmVoYXZpb3Igb2YgYnJvd3NlcnMgd2hlbiByZWFkaW5nXG4vLyB0aGUgdGhpcmQgYXJndW1lbnQgb2YgYWRkL3JlbW92ZUV2ZW50TGlzdGVuZXIuIElFMTEgZG9lc24ndCBzdXBwb3J0IG9wdGlvbnNcbi8vIGF0IGFsbC4gQ2hyb21lIDQxIG9ubHkgcmVhZHMgYGNhcHR1cmVgIGlmIHRoZSBhcmd1bWVudCBpcyBhbiBvYmplY3QuXG5jb25zdCBnZXRPcHRpb25zID0gKG8pID0+IG8gJiZcbiAgICAoZXZlbnRPcHRpb25zU3VwcG9ydGVkID9cbiAgICAgICAgeyBjYXB0dXJlOiBvLmNhcHR1cmUsIHBhc3NpdmU6IG8ucGFzc2l2ZSwgb25jZTogby5vbmNlIH0gOlxuICAgICAgICBvLmNhcHR1cmUpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFydHMuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuaW1wb3J0IHsgcmVtb3ZlTm9kZXMgfSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgeyBOb2RlUGFydCB9IGZyb20gJy4vcGFydHMuanMnO1xuaW1wb3J0IHsgdGVtcGxhdGVGYWN0b3J5IH0gZnJvbSAnLi90ZW1wbGF0ZS1mYWN0b3J5LmpzJztcbmV4cG9ydCBjb25zdCBwYXJ0cyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIFJlbmRlcnMgYSB0ZW1wbGF0ZSByZXN1bHQgb3Igb3RoZXIgdmFsdWUgdG8gYSBjb250YWluZXIuXG4gKlxuICogVG8gdXBkYXRlIGEgY29udGFpbmVyIHdpdGggbmV3IHZhbHVlcywgcmVldmFsdWF0ZSB0aGUgdGVtcGxhdGUgbGl0ZXJhbCBhbmRcbiAqIGNhbGwgYHJlbmRlcmAgd2l0aCB0aGUgbmV3IHJlc3VsdC5cbiAqXG4gKiBAcGFyYW0gcmVzdWx0IEFueSB2YWx1ZSByZW5kZXJhYmxlIGJ5IE5vZGVQYXJ0IC0gdHlwaWNhbGx5IGEgVGVtcGxhdGVSZXN1bHRcbiAqICAgICBjcmVhdGVkIGJ5IGV2YWx1YXRpbmcgYSB0ZW1wbGF0ZSB0YWcgbGlrZSBgaHRtbGAgb3IgYHN2Z2AuXG4gKiBAcGFyYW0gY29udGFpbmVyIEEgRE9NIHBhcmVudCB0byByZW5kZXIgdG8uIFRoZSBlbnRpcmUgY29udGVudHMgYXJlIGVpdGhlclxuICogICAgIHJlcGxhY2VkLCBvciBlZmZpY2llbnRseSB1cGRhdGVkIGlmIHRoZSBzYW1lIHJlc3VsdCB0eXBlIHdhcyBwcmV2aW91c1xuICogICAgIHJlbmRlcmVkIHRoZXJlLlxuICogQHBhcmFtIG9wdGlvbnMgUmVuZGVyT3B0aW9ucyBmb3IgdGhlIGVudGlyZSByZW5kZXIgdHJlZSByZW5kZXJlZCB0byB0aGlzXG4gKiAgICAgY29udGFpbmVyLiBSZW5kZXIgb3B0aW9ucyBtdXN0ICpub3QqIGNoYW5nZSBiZXR3ZWVuIHJlbmRlcnMgdG8gdGhlIHNhbWVcbiAqICAgICBjb250YWluZXIsIGFzIHRob3NlIGNoYW5nZXMgd2lsbCBub3QgZWZmZWN0IHByZXZpb3VzbHkgcmVuZGVyZWQgRE9NLlxuICovXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKHJlc3VsdCwgY29udGFpbmVyLCBvcHRpb25zKSA9PiB7XG4gICAgbGV0IHBhcnQgPSBwYXJ0cy5nZXQoY29udGFpbmVyKTtcbiAgICBpZiAocGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlbW92ZU5vZGVzKGNvbnRhaW5lciwgY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICBwYXJ0cy5zZXQoY29udGFpbmVyLCBwYXJ0ID0gbmV3IE5vZGVQYXJ0KE9iamVjdC5hc3NpZ24oeyB0ZW1wbGF0ZUZhY3RvcnkgfSwgb3B0aW9ucykpKTtcbiAgICAgICAgcGFydC5hcHBlbmRJbnRvKGNvbnRhaW5lcik7XG4gICAgfVxuICAgIHBhcnQuc2V0VmFsdWUocmVzdWx0KTtcbiAgICBwYXJ0LmNvbW1pdCgpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlbmRlci5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG4vKipcbiAqIE1vZHVsZSB0byBhZGQgc2hhZHkgRE9NL3NoYWR5IENTUyBwb2x5ZmlsbCBzdXBwb3J0IHRvIGxpdC1odG1sIHRlbXBsYXRlXG4gKiByZW5kZXJpbmcuIFNlZSB0aGUgW1tyZW5kZXJdXSBtZXRob2QgZm9yIGRldGFpbHMuXG4gKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKi9cbi8qKlxuICogRG8gbm90IHJlbW92ZSB0aGlzIGNvbW1lbnQ7IGl0IGtlZXBzIHR5cGVkb2MgZnJvbSBtaXNwbGFjaW5nIHRoZSBtb2R1bGVcbiAqIGRvY3MuXG4gKi9cbmltcG9ydCB7IHJlbW92ZU5vZGVzIH0gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0IHsgaW5zZXJ0Tm9kZUludG9UZW1wbGF0ZSwgcmVtb3ZlTm9kZXNGcm9tVGVtcGxhdGUgfSBmcm9tICcuL21vZGlmeS10ZW1wbGF0ZS5qcyc7XG5pbXBvcnQgeyBwYXJ0cywgcmVuZGVyIGFzIGxpdFJlbmRlciB9IGZyb20gJy4vcmVuZGVyLmpzJztcbmltcG9ydCB7IHRlbXBsYXRlQ2FjaGVzIH0gZnJvbSAnLi90ZW1wbGF0ZS1mYWN0b3J5LmpzJztcbmltcG9ydCB7IFRlbXBsYXRlSW5zdGFuY2UgfSBmcm9tICcuL3RlbXBsYXRlLWluc3RhbmNlLmpzJztcbmltcG9ydCB7IG1hcmtlciwgVGVtcGxhdGUgfSBmcm9tICcuL3RlbXBsYXRlLmpzJztcbmV4cG9ydCB7IGh0bWwsIHN2ZywgVGVtcGxhdGVSZXN1bHQgfSBmcm9tICcuLi9saXQtaHRtbC5qcyc7XG4vLyBHZXQgYSBrZXkgdG8gbG9va3VwIGluIGB0ZW1wbGF0ZUNhY2hlc2AuXG5jb25zdCBnZXRUZW1wbGF0ZUNhY2hlS2V5ID0gKHR5cGUsIHNjb3BlTmFtZSkgPT4gYCR7dHlwZX0tLSR7c2NvcGVOYW1lfWA7XG5sZXQgY29tcGF0aWJsZVNoYWR5Q1NTVmVyc2lvbiA9IHRydWU7XG5pZiAodHlwZW9mIHdpbmRvdy5TaGFkeUNTUyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb21wYXRpYmxlU2hhZHlDU1NWZXJzaW9uID0gZmFsc2U7XG59XG5lbHNlIGlmICh0eXBlb2Ygd2luZG93LlNoYWR5Q1NTLnByZXBhcmVUZW1wbGF0ZURvbSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25zb2xlLndhcm4oYEluY29tcGF0aWJsZSBTaGFkeUNTUyB2ZXJzaW9uIGRldGVjdGVkLiBgICtcbiAgICAgICAgYFBsZWFzZSB1cGRhdGUgdG8gYXQgbGVhc3QgQHdlYmNvbXBvbmVudHMvd2ViY29tcG9uZW50c2pzQDIuMC4yIGFuZCBgICtcbiAgICAgICAgYEB3ZWJjb21wb25lbnRzL3NoYWR5Y3NzQDEuMy4xLmApO1xuICAgIGNvbXBhdGlibGVTaGFkeUNTU1ZlcnNpb24gPSBmYWxzZTtcbn1cbi8qKlxuICogVGVtcGxhdGUgZmFjdG9yeSB3aGljaCBzY29wZXMgdGVtcGxhdGUgRE9NIHVzaW5nIFNoYWR5Q1NTLlxuICogQHBhcmFtIHNjb3BlTmFtZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3Qgc2hhZHlUZW1wbGF0ZUZhY3RvcnkgPSAoc2NvcGVOYW1lKSA9PiAocmVzdWx0KSA9PiB7XG4gICAgY29uc3QgY2FjaGVLZXkgPSBnZXRUZW1wbGF0ZUNhY2hlS2V5KHJlc3VsdC50eXBlLCBzY29wZU5hbWUpO1xuICAgIGxldCB0ZW1wbGF0ZUNhY2hlID0gdGVtcGxhdGVDYWNoZXMuZ2V0KGNhY2hlS2V5KTtcbiAgICBpZiAodGVtcGxhdGVDYWNoZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRlbXBsYXRlQ2FjaGUgPSB7XG4gICAgICAgICAgICBzdHJpbmdzQXJyYXk6IG5ldyBXZWFrTWFwKCksXG4gICAgICAgICAgICBrZXlTdHJpbmc6IG5ldyBNYXAoKVxuICAgICAgICB9O1xuICAgICAgICB0ZW1wbGF0ZUNhY2hlcy5zZXQoY2FjaGVLZXksIHRlbXBsYXRlQ2FjaGUpO1xuICAgIH1cbiAgICBsZXQgdGVtcGxhdGUgPSB0ZW1wbGF0ZUNhY2hlLnN0cmluZ3NBcnJheS5nZXQocmVzdWx0LnN0cmluZ3MpO1xuICAgIGlmICh0ZW1wbGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gICAgY29uc3Qga2V5ID0gcmVzdWx0LnN0cmluZ3Muam9pbihtYXJrZXIpO1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGVDYWNoZS5rZXlTdHJpbmcuZ2V0KGtleSk7XG4gICAgaWYgKHRlbXBsYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHJlc3VsdC5nZXRUZW1wbGF0ZUVsZW1lbnQoKTtcbiAgICAgICAgaWYgKGNvbXBhdGlibGVTaGFkeUNTU1ZlcnNpb24pIHtcbiAgICAgICAgICAgIHdpbmRvdy5TaGFkeUNTUy5wcmVwYXJlVGVtcGxhdGVEb20oZWxlbWVudCwgc2NvcGVOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZShyZXN1bHQsIGVsZW1lbnQpO1xuICAgICAgICB0ZW1wbGF0ZUNhY2hlLmtleVN0cmluZy5zZXQoa2V5LCB0ZW1wbGF0ZSk7XG4gICAgfVxuICAgIHRlbXBsYXRlQ2FjaGUuc3RyaW5nc0FycmF5LnNldChyZXN1bHQuc3RyaW5ncywgdGVtcGxhdGUpO1xuICAgIHJldHVybiB0ZW1wbGF0ZTtcbn07XG5jb25zdCBURU1QTEFURV9UWVBFUyA9IFsnaHRtbCcsICdzdmcnXTtcbi8qKlxuICogUmVtb3ZlcyBhbGwgc3R5bGUgZWxlbWVudHMgZnJvbSBUZW1wbGF0ZXMgZm9yIHRoZSBnaXZlbiBzY29wZU5hbWUuXG4gKi9cbmNvbnN0IHJlbW92ZVN0eWxlc0Zyb21MaXRUZW1wbGF0ZXMgPSAoc2NvcGVOYW1lKSA9PiB7XG4gICAgVEVNUExBVEVfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZXMgPSB0ZW1wbGF0ZUNhY2hlcy5nZXQoZ2V0VGVtcGxhdGVDYWNoZUtleSh0eXBlLCBzY29wZU5hbWUpKTtcbiAgICAgICAgaWYgKHRlbXBsYXRlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZXMua2V5U3RyaW5nLmZvckVhY2goKHRlbXBsYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBlbGVtZW50OiB7IGNvbnRlbnQgfSB9ID0gdGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgLy8gSUUgMTEgZG9lc24ndCBzdXBwb3J0IHRoZSBpdGVyYWJsZSBwYXJhbSBTZXQgY29uc3RydWN0b3JcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShjb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3N0eWxlJykpLmZvckVhY2goKHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzLmFkZChzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZW1vdmVOb2Rlc0Zyb21UZW1wbGF0ZSh0ZW1wbGF0ZSwgc3R5bGVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuY29uc3Qgc2hhZHlSZW5kZXJTZXQgPSBuZXcgU2V0KCk7XG4vKipcbiAqIEZvciB0aGUgZ2l2ZW4gc2NvcGUgbmFtZSwgZW5zdXJlcyB0aGF0IFNoYWR5Q1NTIHN0eWxlIHNjb3BpbmcgaXMgcGVyZm9ybWVkLlxuICogVGhpcyBpcyBkb25lIGp1c3Qgb25jZSBwZXIgc2NvcGUgbmFtZSBzbyB0aGUgZnJhZ21lbnQgYW5kIHRlbXBsYXRlIGNhbm5vdFxuICogYmUgbW9kaWZpZWQuXG4gKiAoMSkgZXh0cmFjdHMgc3R5bGVzIGZyb20gdGhlIHJlbmRlcmVkIGZyYWdtZW50IGFuZCBoYW5kcyB0aGVtIHRvIFNoYWR5Q1NTXG4gKiB0byBiZSBzY29wZWQgYW5kIGFwcGVuZGVkIHRvIHRoZSBkb2N1bWVudFxuICogKDIpIHJlbW92ZXMgc3R5bGUgZWxlbWVudHMgZnJvbSBhbGwgbGl0LWh0bWwgVGVtcGxhdGVzIGZvciB0aGlzIHNjb3BlIG5hbWUuXG4gKlxuICogTm90ZSwgPHN0eWxlPiBlbGVtZW50cyBjYW4gb25seSBiZSBwbGFjZWQgaW50byB0ZW1wbGF0ZXMgZm9yIHRoZVxuICogaW5pdGlhbCByZW5kZXJpbmcgb2YgdGhlIHNjb3BlLiBJZiA8c3R5bGU+IGVsZW1lbnRzIGFyZSBpbmNsdWRlZCBpbiB0ZW1wbGF0ZXNcbiAqIGR5bmFtaWNhbGx5IHJlbmRlcmVkIHRvIHRoZSBzY29wZSAoYWZ0ZXIgdGhlIGZpcnN0IHNjb3BlIHJlbmRlciksIHRoZXkgd2lsbFxuICogbm90IGJlIHNjb3BlZCBhbmQgdGhlIDxzdHlsZT4gd2lsbCBiZSBsZWZ0IGluIHRoZSB0ZW1wbGF0ZSBhbmQgcmVuZGVyZWRcbiAqIG91dHB1dC5cbiAqL1xuY29uc3QgcHJlcGFyZVRlbXBsYXRlU3R5bGVzID0gKHNjb3BlTmFtZSwgcmVuZGVyZWRET00sIHRlbXBsYXRlKSA9PiB7XG4gICAgc2hhZHlSZW5kZXJTZXQuYWRkKHNjb3BlTmFtZSk7XG4gICAgLy8gSWYgYHJlbmRlcmVkRE9NYCBpcyBzdGFtcGVkIGZyb20gYSBUZW1wbGF0ZSwgdGhlbiB3ZSBuZWVkIHRvIGVkaXQgdGhhdFxuICAgIC8vIFRlbXBsYXRlJ3MgdW5kZXJseWluZyB0ZW1wbGF0ZSBlbGVtZW50LiBPdGhlcndpc2UsIHdlIGNyZWF0ZSBvbmUgaGVyZVxuICAgIC8vIHRvIGdpdmUgdG8gU2hhZHlDU1MsIHdoaWNoIHN0aWxsIHJlcXVpcmVzIG9uZSB3aGlsZSBzY29waW5nLlxuICAgIGNvbnN0IHRlbXBsYXRlRWxlbWVudCA9ICEhdGVtcGxhdGUgPyB0ZW1wbGF0ZS5lbGVtZW50IDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICAvLyBNb3ZlIHN0eWxlcyBvdXQgb2YgcmVuZGVyZWQgRE9NIGFuZCBzdG9yZS5cbiAgICBjb25zdCBzdHlsZXMgPSByZW5kZXJlZERPTS5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZScpO1xuICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSBzdHlsZXM7XG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIHN0eWxlcywgc2tpcCB1bm5lY2Vzc2FyeSB3b3JrXG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBFbnN1cmUgcHJlcGFyZVRlbXBsYXRlU3R5bGVzIGlzIGNhbGxlZCB0byBzdXBwb3J0IGFkZGluZ1xuICAgICAgICAvLyBzdHlsZXMgdmlhIGBwcmVwYXJlQWRvcHRlZENzc1RleHRgIHNpbmNlIHRoYXQgcmVxdWlyZXMgdGhhdFxuICAgICAgICAvLyBgcHJlcGFyZVRlbXBsYXRlU3R5bGVzYCBpcyBjYWxsZWQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNoYWR5Q1NTIHdpbGwgb25seSB1cGRhdGUgc3R5bGVzIGNvbnRhaW5pbmcgQGFwcGx5IGluIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAvLyBnaXZlbiB0byBgcHJlcGFyZVRlbXBsYXRlU3R5bGVzYC4gSWYgbm8gbGl0IFRlbXBsYXRlIHdhcyBnaXZlbixcbiAgICAgICAgLy8gU2hhZHlDU1Mgd2lsbCBub3QgYmUgYWJsZSB0byB1cGRhdGUgdXNlcyBvZiBAYXBwbHkgaW4gYW55IHJlbGV2YW50XG4gICAgICAgIC8vIHRlbXBsYXRlLiBIb3dldmVyLCB0aGlzIGlzIG5vdCBhIHByb2JsZW0gYmVjYXVzZSB3ZSBvbmx5IGNyZWF0ZSB0aGVcbiAgICAgICAgLy8gdGVtcGxhdGUgZm9yIHRoZSBwdXJwb3NlIG9mIHN1cHBvcnRpbmcgYHByZXBhcmVBZG9wdGVkQ3NzVGV4dGAsXG4gICAgICAgIC8vIHdoaWNoIGRvZXNuJ3Qgc3VwcG9ydCBAYXBwbHkgYXQgYWxsLlxuICAgICAgICB3aW5kb3cuU2hhZHlDU1MucHJlcGFyZVRlbXBsYXRlU3R5bGVzKHRlbXBsYXRlRWxlbWVudCwgc2NvcGVOYW1lKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb25kZW5zZWRTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgLy8gQ29sbGVjdCBzdHlsZXMgaW50byBhIHNpbmdsZSBzdHlsZS4gVGhpcyBoZWxwcyB1cyBtYWtlIHN1cmUgU2hhZHlDU1NcbiAgICAvLyBtYW5pcHVsYXRpb25zIHdpbGwgbm90IHByZXZlbnQgdXMgZnJvbSBiZWluZyBhYmxlIHRvIGZpeCB1cCB0ZW1wbGF0ZVxuICAgIC8vIHBhcnQgaW5kaWNlcy5cbiAgICAvLyBOT1RFOiBjb2xsZWN0aW5nIHN0eWxlcyBpcyBpbmVmZmljaWVudCBmb3IgYnJvd3NlcnMgYnV0IFNoYWR5Q1NTXG4gICAgLy8gY3VycmVudGx5IGRvZXMgdGhpcyBhbnl3YXkuIFdoZW4gaXQgZG9lcyBub3QsIHRoaXMgc2hvdWxkIGJlIGNoYW5nZWQuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzdHlsZSA9IHN0eWxlc1tpXTtcbiAgICAgICAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG4gICAgICAgIGNvbmRlbnNlZFN0eWxlLnRleHRDb250ZW50ICs9IHN0eWxlLnRleHRDb250ZW50O1xuICAgIH1cbiAgICAvLyBSZW1vdmUgc3R5bGVzIGZyb20gbmVzdGVkIHRlbXBsYXRlcyBpbiB0aGlzIHNjb3BlLlxuICAgIHJlbW92ZVN0eWxlc0Zyb21MaXRUZW1wbGF0ZXMoc2NvcGVOYW1lKTtcbiAgICAvLyBBbmQgdGhlbiBwdXQgdGhlIGNvbmRlbnNlZCBzdHlsZSBpbnRvIHRoZSBcInJvb3RcIiB0ZW1wbGF0ZSBwYXNzZWQgaW4gYXNcbiAgICAvLyBgdGVtcGxhdGVgLlxuICAgIGNvbnN0IGNvbnRlbnQgPSB0ZW1wbGF0ZUVsZW1lbnQuY29udGVudDtcbiAgICBpZiAoISF0ZW1wbGF0ZSkge1xuICAgICAgICBpbnNlcnROb2RlSW50b1RlbXBsYXRlKHRlbXBsYXRlLCBjb25kZW5zZWRTdHlsZSwgY29udGVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnRlbnQuaW5zZXJ0QmVmb3JlKGNvbmRlbnNlZFN0eWxlLCBjb250ZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICAvLyBOb3RlLCBpdCdzIGltcG9ydGFudCB0aGF0IFNoYWR5Q1NTIGdldHMgdGhlIHRlbXBsYXRlIHRoYXQgYGxpdC1odG1sYFxuICAgIC8vIHdpbGwgYWN0dWFsbHkgcmVuZGVyIHNvIHRoYXQgaXQgY2FuIHVwZGF0ZSB0aGUgc3R5bGUgaW5zaWRlIHdoZW5cbiAgICAvLyBuZWVkZWQgKGUuZy4gQGFwcGx5IG5hdGl2ZSBTaGFkb3cgRE9NIGNhc2UpLlxuICAgIHdpbmRvdy5TaGFkeUNTUy5wcmVwYXJlVGVtcGxhdGVTdHlsZXModGVtcGxhdGVFbGVtZW50LCBzY29wZU5hbWUpO1xuICAgIGNvbnN0IHN0eWxlID0gY29udGVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZScpO1xuICAgIGlmICh3aW5kb3cuU2hhZHlDU1MubmF0aXZlU2hhZG93ICYmIHN0eWxlICE9PSBudWxsKSB7XG4gICAgICAgIC8vIFdoZW4gaW4gbmF0aXZlIFNoYWRvdyBET00sIGVuc3VyZSB0aGUgc3R5bGUgY3JlYXRlZCBieSBTaGFkeUNTUyBpc1xuICAgICAgICAvLyBpbmNsdWRlZCBpbiBpbml0aWFsbHkgcmVuZGVyZWQgb3V0cHV0IChgcmVuZGVyZWRET01gKS5cbiAgICAgICAgcmVuZGVyZWRET00uaW5zZXJ0QmVmb3JlKHN0eWxlLmNsb25lTm9kZSh0cnVlKSwgcmVuZGVyZWRET00uZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCEhdGVtcGxhdGUpIHtcbiAgICAgICAgLy8gV2hlbiBubyBzdHlsZSBpcyBsZWZ0IGluIHRoZSB0ZW1wbGF0ZSwgcGFydHMgd2lsbCBiZSBicm9rZW4gYXMgYVxuICAgICAgICAvLyByZXN1bHQuIFRvIGZpeCB0aGlzLCB3ZSBwdXQgYmFjayB0aGUgc3R5bGUgbm9kZSBTaGFkeUNTUyByZW1vdmVkXG4gICAgICAgIC8vIGFuZCB0aGVuIHRlbGwgbGl0IHRvIHJlbW92ZSB0aGF0IG5vZGUgZnJvbSB0aGUgdGVtcGxhdGUuXG4gICAgICAgIC8vIFRoZXJlIGNhbiBiZSBubyBzdHlsZSBpbiB0aGUgdGVtcGxhdGUgaW4gMiBjYXNlcyAoMSkgd2hlbiBTaGFkeSBET01cbiAgICAgICAgLy8gaXMgaW4gdXNlLCBTaGFkeUNTUyByZW1vdmVzIGFsbCBzdHlsZXMsICgyKSB3aGVuIG5hdGl2ZSBTaGFkb3cgRE9NXG4gICAgICAgIC8vIGlzIGluIHVzZSBTaGFkeUNTUyByZW1vdmVzIHRoZSBzdHlsZSBpZiBpdCBjb250YWlucyBubyBjb250ZW50LlxuICAgICAgICAvLyBOT1RFLCBTaGFkeUNTUyBjcmVhdGVzIGl0cyBvd24gc3R5bGUgc28gd2UgY2FuIHNhZmVseSBhZGQvcmVtb3ZlXG4gICAgICAgIC8vIGBjb25kZW5zZWRTdHlsZWAgaGVyZS5cbiAgICAgICAgY29udGVudC5pbnNlcnRCZWZvcmUoY29uZGVuc2VkU3R5bGUsIGNvbnRlbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIGNvbnN0IHJlbW92ZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHJlbW92ZXMuYWRkKGNvbmRlbnNlZFN0eWxlKTtcbiAgICAgICAgcmVtb3ZlTm9kZXNGcm9tVGVtcGxhdGUodGVtcGxhdGUsIHJlbW92ZXMpO1xuICAgIH1cbn07XG4vKipcbiAqIEV4dGVuc2lvbiB0byB0aGUgc3RhbmRhcmQgYHJlbmRlcmAgbWV0aG9kIHdoaWNoIHN1cHBvcnRzIHJlbmRlcmluZ1xuICogdG8gU2hhZG93Um9vdHMgd2hlbiB0aGUgU2hhZHlET00gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJjb21wb25lbnRzL3NoYWR5ZG9tKVxuICogYW5kIFNoYWR5Q1NTIChodHRwczovL2dpdGh1Yi5jb20vd2ViY29tcG9uZW50cy9zaGFkeWNzcykgcG9seWZpbGxzIGFyZSB1c2VkXG4gKiBvciB3aGVuIHRoZSB3ZWJjb21wb25lbnRzanNcbiAqIChodHRwczovL2dpdGh1Yi5jb20vd2ViY29tcG9uZW50cy93ZWJjb21wb25lbnRzanMpIHBvbHlmaWxsIGlzIHVzZWQuXG4gKlxuICogQWRkcyBhIGBzY29wZU5hbWVgIG9wdGlvbiB3aGljaCBpcyB1c2VkIHRvIHNjb3BlIGVsZW1lbnQgRE9NIGFuZCBzdHlsZXNoZWV0c1xuICogd2hlbiBuYXRpdmUgU2hhZG93RE9NIGlzIHVuYXZhaWxhYmxlLiBUaGUgYHNjb3BlTmFtZWAgd2lsbCBiZSBhZGRlZCB0b1xuICogdGhlIGNsYXNzIGF0dHJpYnV0ZSBvZiBhbGwgcmVuZGVyZWQgRE9NLiBJbiBhZGRpdGlvbiwgYW55IHN0eWxlIGVsZW1lbnRzIHdpbGxcbiAqIGJlIGF1dG9tYXRpY2FsbHkgcmUtd3JpdHRlbiB3aXRoIHRoaXMgYHNjb3BlTmFtZWAgc2VsZWN0b3IgYW5kIG1vdmVkIG91dFxuICogb2YgdGhlIHJlbmRlcmVkIERPTSBhbmQgaW50byB0aGUgZG9jdW1lbnQgYDxoZWFkPmAuXG4gKlxuICogSXQgaXMgY29tbW9uIHRvIHVzZSB0aGlzIHJlbmRlciBtZXRob2QgaW4gY29uanVuY3Rpb24gd2l0aCBhIGN1c3RvbSBlbGVtZW50XG4gKiB3aGljaCByZW5kZXJzIGEgc2hhZG93Um9vdC4gV2hlbiB0aGlzIGlzIGRvbmUsIHR5cGljYWxseSB0aGUgZWxlbWVudCdzXG4gKiBgbG9jYWxOYW1lYCBzaG91bGQgYmUgdXNlZCBhcyB0aGUgYHNjb3BlTmFtZWAuXG4gKlxuICogSW4gYWRkaXRpb24gdG8gRE9NIHNjb3BpbmcsIFNoYWR5Q1NTIGFsc28gc3VwcG9ydHMgYSBiYXNpYyBzaGltIGZvciBjc3NcbiAqIGN1c3RvbSBwcm9wZXJ0aWVzIChuZWVkZWQgb25seSBvbiBvbGRlciBicm93c2VycyBsaWtlIElFMTEpIGFuZCBhIHNoaW0gZm9yXG4gKiBhIGRlcHJlY2F0ZWQgZmVhdHVyZSBjYWxsZWQgYEBhcHBseWAgdGhhdCBzdXBwb3J0cyBhcHBseWluZyBhIHNldCBvZiBjc3NcbiAqIGN1c3RvbSBwcm9wZXJ0aWVzIHRvIGEgZ2l2ZW4gbG9jYXRpb24uXG4gKlxuICogVXNhZ2UgY29uc2lkZXJhdGlvbnM6XG4gKlxuICogKiBQYXJ0IHZhbHVlcyBpbiBgPHN0eWxlPmAgZWxlbWVudHMgYXJlIG9ubHkgYXBwbGllZCB0aGUgZmlyc3QgdGltZSBhIGdpdmVuXG4gKiBgc2NvcGVOYW1lYCByZW5kZXJzLiBTdWJzZXF1ZW50IGNoYW5nZXMgdG8gcGFydHMgaW4gc3R5bGUgZWxlbWVudHMgd2lsbCBoYXZlXG4gKiBubyBlZmZlY3QuIEJlY2F1c2Ugb2YgdGhpcywgcGFydHMgaW4gc3R5bGUgZWxlbWVudHMgc2hvdWxkIG9ubHkgYmUgdXNlZCBmb3JcbiAqIHZhbHVlcyB0aGF0IHdpbGwgbmV2ZXIgY2hhbmdlLCBmb3IgZXhhbXBsZSBwYXJ0cyB0aGF0IHNldCBzY29wZS13aWRlIHRoZW1lXG4gKiB2YWx1ZXMgb3IgcGFydHMgd2hpY2ggcmVuZGVyIHNoYXJlZCBzdHlsZSBlbGVtZW50cy5cbiAqXG4gKiAqIE5vdGUsIGR1ZSB0byBhIGxpbWl0YXRpb24gb2YgdGhlIFNoYWR5RE9NIHBvbHlmaWxsLCByZW5kZXJpbmcgaW4gYVxuICogY3VzdG9tIGVsZW1lbnQncyBgY29uc3RydWN0b3JgIGlzIG5vdCBzdXBwb3J0ZWQuIEluc3RlYWQgcmVuZGVyaW5nIHNob3VsZFxuICogZWl0aGVyIGRvbmUgYXN5bmNocm9ub3VzbHksIGZvciBleGFtcGxlIGF0IG1pY3JvdGFzayB0aW1pbmcgKGZvciBleGFtcGxlXG4gKiBgUHJvbWlzZS5yZXNvbHZlKClgKSwgb3IgYmUgZGVmZXJyZWQgdW50aWwgdGhlIGZpcnN0IHRpbWUgdGhlIGVsZW1lbnQnc1xuICogYGNvbm5lY3RlZENhbGxiYWNrYCBydW5zLlxuICpcbiAqIFVzYWdlIGNvbnNpZGVyYXRpb25zIHdoZW4gdXNpbmcgc2hpbW1lZCBjdXN0b20gcHJvcGVydGllcyBvciBgQGFwcGx5YDpcbiAqXG4gKiAqIFdoZW5ldmVyIGFueSBkeW5hbWljIGNoYW5nZXMgYXJlIG1hZGUgd2hpY2ggYWZmZWN0XG4gKiBjc3MgY3VzdG9tIHByb3BlcnRpZXMsIGBTaGFkeUNTUy5zdHlsZUVsZW1lbnQoZWxlbWVudClgIG11c3QgYmUgY2FsbGVkXG4gKiB0byB1cGRhdGUgdGhlIGVsZW1lbnQuIFRoZXJlIGFyZSB0d28gY2FzZXMgd2hlbiB0aGlzIGlzIG5lZWRlZDpcbiAqICgxKSB0aGUgZWxlbWVudCBpcyBjb25uZWN0ZWQgdG8gYSBuZXcgcGFyZW50LCAoMikgYSBjbGFzcyBpcyBhZGRlZCB0byB0aGVcbiAqIGVsZW1lbnQgdGhhdCBjYXVzZXMgaXQgdG8gbWF0Y2ggZGlmZmVyZW50IGN1c3RvbSBwcm9wZXJ0aWVzLlxuICogVG8gYWRkcmVzcyB0aGUgZmlyc3QgY2FzZSB3aGVuIHJlbmRlcmluZyBhIGN1c3RvbSBlbGVtZW50LCBgc3R5bGVFbGVtZW50YFxuICogc2hvdWxkIGJlIGNhbGxlZCBpbiB0aGUgZWxlbWVudCdzIGBjb25uZWN0ZWRDYWxsYmFja2AuXG4gKlxuICogKiBTaGltbWVkIGN1c3RvbSBwcm9wZXJ0aWVzIG1heSBvbmx5IGJlIGRlZmluZWQgZWl0aGVyIGZvciBhbiBlbnRpcmVcbiAqIHNoYWRvd1Jvb3QgKGZvciBleGFtcGxlLCBpbiBhIGA6aG9zdGAgcnVsZSkgb3IgdmlhIGEgcnVsZSB0aGF0IGRpcmVjdGx5XG4gKiBtYXRjaGVzIGFuIGVsZW1lbnQgd2l0aCBhIHNoYWRvd1Jvb3QuIEluIG90aGVyIHdvcmRzLCBpbnN0ZWFkIG9mIGZsb3dpbmcgZnJvbVxuICogcGFyZW50IHRvIGNoaWxkIGFzIGRvIG5hdGl2ZSBjc3MgY3VzdG9tIHByb3BlcnRpZXMsIHNoaW1tZWQgY3VzdG9tIHByb3BlcnRpZXNcbiAqIGZsb3cgb25seSBmcm9tIHNoYWRvd1Jvb3RzIHRvIG5lc3RlZCBzaGFkb3dSb290cy5cbiAqXG4gKiAqIFdoZW4gdXNpbmcgYEBhcHBseWAgbWl4aW5nIGNzcyBzaG9ydGhhbmQgcHJvcGVydHkgbmFtZXMgd2l0aFxuICogbm9uLXNob3J0aGFuZCBuYW1lcyAoZm9yIGV4YW1wbGUgYGJvcmRlcmAgYW5kIGBib3JkZXItd2lkdGhgKSBpcyBub3RcbiAqIHN1cHBvcnRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbmRlciA9IChyZXN1bHQsIGNvbnRhaW5lciwgb3B0aW9ucykgPT4ge1xuICAgIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgfHwgIW9wdGlvbnMuc2NvcGVOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGBzY29wZU5hbWVgIG9wdGlvbiBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG4gICAgY29uc3Qgc2NvcGVOYW1lID0gb3B0aW9ucy5zY29wZU5hbWU7XG4gICAgY29uc3QgaGFzUmVuZGVyZWQgPSBwYXJ0cy5oYXMoY29udGFpbmVyKTtcbiAgICBjb25zdCBuZWVkc1Njb3BpbmcgPSBjb21wYXRpYmxlU2hhZHlDU1NWZXJzaW9uICYmXG4gICAgICAgIGNvbnRhaW5lci5ub2RlVHlwZSA9PT0gMTEgLyogTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFICovICYmXG4gICAgICAgICEhY29udGFpbmVyLmhvc3Q7XG4gICAgLy8gSGFuZGxlIGZpcnN0IHJlbmRlciB0byBhIHNjb3BlIHNwZWNpYWxseS4uLlxuICAgIGNvbnN0IGZpcnN0U2NvcGVSZW5kZXIgPSBuZWVkc1Njb3BpbmcgJiYgIXNoYWR5UmVuZGVyU2V0LmhhcyhzY29wZU5hbWUpO1xuICAgIC8vIE9uIGZpcnN0IHNjb3BlIHJlbmRlciwgcmVuZGVyIGludG8gYSBmcmFnbWVudDsgdGhpcyBjYW5ub3QgYmUgYSBzaW5nbGVcbiAgICAvLyBmcmFnbWVudCB0aGF0IGlzIHJldXNlZCBzaW5jZSBuZXN0ZWQgcmVuZGVycyBjYW4gb2NjdXIgc3luY2hyb25vdXNseS5cbiAgICBjb25zdCByZW5kZXJDb250YWluZXIgPSBmaXJzdFNjb3BlUmVuZGVyID8gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIDogY29udGFpbmVyO1xuICAgIGxpdFJlbmRlcihyZXN1bHQsIHJlbmRlckNvbnRhaW5lciwgT2JqZWN0LmFzc2lnbih7IHRlbXBsYXRlRmFjdG9yeTogc2hhZHlUZW1wbGF0ZUZhY3Rvcnkoc2NvcGVOYW1lKSB9LCBvcHRpb25zKSk7XG4gICAgLy8gV2hlbiBwZXJmb3JtaW5nIGZpcnN0IHNjb3BlIHJlbmRlcixcbiAgICAvLyAoMSkgV2UndmUgcmVuZGVyZWQgaW50byBhIGZyYWdtZW50IHNvIHRoYXQgdGhlcmUncyBhIGNoYW5jZSB0b1xuICAgIC8vIGBwcmVwYXJlVGVtcGxhdGVTdHlsZXNgIGJlZm9yZSBzdWItZWxlbWVudHMgaGl0IHRoZSBET01cbiAgICAvLyAod2hpY2ggbWlnaHQgY2F1c2UgdGhlbSB0byByZW5kZXIgYmFzZWQgb24gYSBjb21tb24gcGF0dGVybiBvZlxuICAgIC8vIHJlbmRlcmluZyBpbiBhIGN1c3RvbSBlbGVtZW50J3MgYGNvbm5lY3RlZENhbGxiYWNrYCk7XG4gICAgLy8gKDIpIFNjb3BlIHRoZSB0ZW1wbGF0ZSB3aXRoIFNoYWR5Q1NTIG9uZSB0aW1lIG9ubHkgZm9yIHRoaXMgc2NvcGUuXG4gICAgLy8gKDMpIFJlbmRlciB0aGUgZnJhZ21lbnQgaW50byB0aGUgY29udGFpbmVyIGFuZCBtYWtlIHN1cmUgdGhlXG4gICAgLy8gY29udGFpbmVyIGtub3dzIGl0cyBgcGFydGAgaXMgdGhlIG9uZSB3ZSBqdXN0IHJlbmRlcmVkLiBUaGlzIGVuc3VyZXNcbiAgICAvLyBET00gd2lsbCBiZSByZS11c2VkIG9uIHN1YnNlcXVlbnQgcmVuZGVycy5cbiAgICBpZiAoZmlyc3RTY29wZVJlbmRlcikge1xuICAgICAgICBjb25zdCBwYXJ0ID0gcGFydHMuZ2V0KHJlbmRlckNvbnRhaW5lcik7XG4gICAgICAgIHBhcnRzLmRlbGV0ZShyZW5kZXJDb250YWluZXIpO1xuICAgICAgICAvLyBTaGFkeUNTUyBtaWdodCBoYXZlIHN0eWxlIHNoZWV0cyAoZS5nLiBmcm9tIGBwcmVwYXJlQWRvcHRlZENzc1RleHRgKVxuICAgICAgICAvLyB0aGF0IHNob3VsZCBhcHBseSB0byBgcmVuZGVyQ29udGFpbmVyYCBldmVuIGlmIHRoZSByZW5kZXJlZCB2YWx1ZSBpc1xuICAgICAgICAvLyBub3QgYSBUZW1wbGF0ZUluc3RhbmNlLiBIb3dldmVyLCBpdCB3aWxsIG9ubHkgaW5zZXJ0IHNjb3BlZCBzdHlsZXNcbiAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQgaWYgYHByZXBhcmVUZW1wbGF0ZVN0eWxlc2AgaGFzIGFscmVhZHkgYmVlbiBjYWxsZWRcbiAgICAgICAgLy8gZm9yIHRoZSBnaXZlbiBzY29wZSBuYW1lLlxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHBhcnQudmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZUluc3RhbmNlID9cbiAgICAgICAgICAgIHBhcnQudmFsdWUudGVtcGxhdGUgOlxuICAgICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgICBwcmVwYXJlVGVtcGxhdGVTdHlsZXMoc2NvcGVOYW1lLCByZW5kZXJDb250YWluZXIsIHRlbXBsYXRlKTtcbiAgICAgICAgcmVtb3ZlTm9kZXMoY29udGFpbmVyLCBjb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJDb250YWluZXIpO1xuICAgICAgICBwYXJ0cy5zZXQoY29udGFpbmVyLCBwYXJ0KTtcbiAgICB9XG4gICAgLy8gQWZ0ZXIgZWxlbWVudHMgaGF2ZSBoaXQgdGhlIERPTSwgdXBkYXRlIHN0eWxpbmcgaWYgdGhpcyBpcyB0aGVcbiAgICAvLyBpbml0aWFsIHJlbmRlciB0byB0aGlzIGNvbnRhaW5lci5cbiAgICAvLyBUaGlzIGlzIG5lZWRlZCB3aGVuZXZlciBkeW5hbWljIGNoYW5nZXMgYXJlIG1hZGUgc28gaXQgd291bGQgYmVcbiAgICAvLyBzYWZlc3QgdG8gZG8gZXZlcnkgcmVuZGVyOyBob3dldmVyLCB0aGlzIHdvdWxkIHJlZ3Jlc3MgcGVyZm9ybWFuY2VcbiAgICAvLyBzbyB3ZSBsZWF2ZSBpdCB1cCB0byB0aGUgdXNlciB0byBjYWxsIGBTaGFkeUNTUy5zdHlsZUVsZW1lbnRgXG4gICAgLy8gZm9yIGR5bmFtaWMgY2hhbmdlcy5cbiAgICBpZiAoIWhhc1JlbmRlcmVkICYmIG5lZWRzU2NvcGluZykge1xuICAgICAgICB3aW5kb3cuU2hhZHlDU1Muc3R5bGVFbGVtZW50KGNvbnRhaW5lci5ob3N0KTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhZHktcmVuZGVyLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmltcG9ydCB7IG1hcmtlciwgVGVtcGxhdGUgfSBmcm9tICcuL3RlbXBsYXRlLmpzJztcbi8qKlxuICogVGhlIGRlZmF1bHQgVGVtcGxhdGVGYWN0b3J5IHdoaWNoIGNhY2hlcyBUZW1wbGF0ZXMga2V5ZWQgb25cbiAqIHJlc3VsdC50eXBlIGFuZCByZXN1bHQuc3RyaW5ncy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlRmFjdG9yeShyZXN1bHQpIHtcbiAgICBsZXQgdGVtcGxhdGVDYWNoZSA9IHRlbXBsYXRlQ2FjaGVzLmdldChyZXN1bHQudHlwZSk7XG4gICAgaWYgKHRlbXBsYXRlQ2FjaGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0ZW1wbGF0ZUNhY2hlID0ge1xuICAgICAgICAgICAgc3RyaW5nc0FycmF5OiBuZXcgV2Vha01hcCgpLFxuICAgICAgICAgICAga2V5U3RyaW5nOiBuZXcgTWFwKClcbiAgICAgICAgfTtcbiAgICAgICAgdGVtcGxhdGVDYWNoZXMuc2V0KHJlc3VsdC50eXBlLCB0ZW1wbGF0ZUNhY2hlKTtcbiAgICB9XG4gICAgbGV0IHRlbXBsYXRlID0gdGVtcGxhdGVDYWNoZS5zdHJpbmdzQXJyYXkuZ2V0KHJlc3VsdC5zdHJpbmdzKTtcbiAgICBpZiAodGVtcGxhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICAgIC8vIElmIHRoZSBUZW1wbGF0ZVN0cmluZ3NBcnJheSBpcyBuZXcsIGdlbmVyYXRlIGEga2V5IGZyb20gdGhlIHN0cmluZ3NcbiAgICAvLyBUaGlzIGtleSBpcyBzaGFyZWQgYmV0d2VlbiBhbGwgdGVtcGxhdGVzIHdpdGggaWRlbnRpY2FsIGNvbnRlbnRcbiAgICBjb25zdCBrZXkgPSByZXN1bHQuc3RyaW5ncy5qb2luKG1hcmtlcik7XG4gICAgLy8gQ2hlY2sgaWYgd2UgYWxyZWFkeSBoYXZlIGEgVGVtcGxhdGUgZm9yIHRoaXMga2V5XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZUNhY2hlLmtleVN0cmluZy5nZXQoa2V5KTtcbiAgICBpZiAodGVtcGxhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIG5vdCBzZWVuIHRoaXMga2V5IGJlZm9yZSwgY3JlYXRlIGEgbmV3IFRlbXBsYXRlXG4gICAgICAgIHRlbXBsYXRlID0gbmV3IFRlbXBsYXRlKHJlc3VsdCwgcmVzdWx0LmdldFRlbXBsYXRlRWxlbWVudCgpKTtcbiAgICAgICAgLy8gQ2FjaGUgdGhlIFRlbXBsYXRlIGZvciB0aGlzIGtleVxuICAgICAgICB0ZW1wbGF0ZUNhY2hlLmtleVN0cmluZy5zZXQoa2V5LCB0ZW1wbGF0ZSk7XG4gICAgfVxuICAgIC8vIENhY2hlIGFsbCBmdXR1cmUgcXVlcmllcyBmb3IgdGhpcyBUZW1wbGF0ZVN0cmluZ3NBcnJheVxuICAgIHRlbXBsYXRlQ2FjaGUuc3RyaW5nc0FycmF5LnNldChyZXN1bHQuc3RyaW5ncywgdGVtcGxhdGUpO1xuICAgIHJldHVybiB0ZW1wbGF0ZTtcbn1cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZUNhY2hlcyA9IG5ldyBNYXAoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRlbXBsYXRlLWZhY3RvcnkuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuaW1wb3J0IHsgaXNDRVBvbHlmaWxsIH0gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0IHsgaXNUZW1wbGF0ZVBhcnRBY3RpdmUgfSBmcm9tICcuL3RlbXBsYXRlLmpzJztcbi8qKlxuICogQW4gaW5zdGFuY2Ugb2YgYSBgVGVtcGxhdGVgIHRoYXQgY2FuIGJlIGF0dGFjaGVkIHRvIHRoZSBET00gYW5kIHVwZGF0ZWRcbiAqIHdpdGggbmV3IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFRlbXBsYXRlSW5zdGFuY2Uge1xuICAgIGNvbnN0cnVjdG9yKHRlbXBsYXRlLCBwcm9jZXNzb3IsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fX3BhcnRzID0gW107XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgICAgdGhpcy5wcm9jZXNzb3IgPSBwcm9jZXNzb3I7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIHVwZGF0ZSh2YWx1ZXMpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgdGhpcy5fX3BhcnRzKSB7XG4gICAgICAgICAgICBpZiAocGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcGFydC5zZXRWYWx1ZSh2YWx1ZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiB0aGlzLl9fcGFydHMpIHtcbiAgICAgICAgICAgIGlmIChwYXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBwYXJ0LmNvbW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9jbG9uZSgpIHtcbiAgICAgICAgLy8gVGhlcmUgYXJlIGEgbnVtYmVyIG9mIHN0ZXBzIGluIHRoZSBsaWZlY3ljbGUgb2YgYSB0ZW1wbGF0ZSBpbnN0YW5jZSdzXG4gICAgICAgIC8vIERPTSBmcmFnbWVudDpcbiAgICAgICAgLy8gIDEuIENsb25lIC0gY3JlYXRlIHRoZSBpbnN0YW5jZSBmcmFnbWVudFxuICAgICAgICAvLyAgMi4gQWRvcHQgLSBhZG9wdCBpbnRvIHRoZSBtYWluIGRvY3VtZW50XG4gICAgICAgIC8vICAzLiBQcm9jZXNzIC0gZmluZCBwYXJ0IG1hcmtlcnMgYW5kIGNyZWF0ZSBwYXJ0c1xuICAgICAgICAvLyAgNC4gVXBncmFkZSAtIHVwZ3JhZGUgY3VzdG9tIGVsZW1lbnRzXG4gICAgICAgIC8vICA1LiBVcGRhdGUgLSBzZXQgbm9kZSwgYXR0cmlidXRlLCBwcm9wZXJ0eSwgZXRjLiwgdmFsdWVzXG4gICAgICAgIC8vICA2LiBDb25uZWN0IC0gY29ubmVjdCB0byB0aGUgZG9jdW1lbnQuIE9wdGlvbmFsIGFuZCBvdXRzaWRlIG9mIHRoaXNcbiAgICAgICAgLy8gICAgIG1ldGhvZC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gV2UgaGF2ZSBhIGZldyBjb25zdHJhaW50cyBvbiB0aGUgb3JkZXJpbmcgb2YgdGhlc2Ugc3RlcHM6XG4gICAgICAgIC8vICAqIFdlIG5lZWQgdG8gdXBncmFkZSBiZWZvcmUgdXBkYXRpbmcsIHNvIHRoYXQgcHJvcGVydHkgdmFsdWVzIHdpbGwgcGFzc1xuICAgICAgICAvLyAgICB0aHJvdWdoIGFueSBwcm9wZXJ0eSBzZXR0ZXJzLlxuICAgICAgICAvLyAgKiBXZSB3b3VsZCBsaWtlIHRvIHByb2Nlc3MgYmVmb3JlIHVwZ3JhZGluZyBzbyB0aGF0IHdlJ3JlIHN1cmUgdGhhdCB0aGVcbiAgICAgICAgLy8gICAgY2xvbmVkIGZyYWdtZW50IGlzIGluZXJ0IGFuZCBub3QgZGlzdHVyYmVkIGJ5IHNlbGYtbW9kaWZ5aW5nIERPTS5cbiAgICAgICAgLy8gICogV2Ugd2FudCBjdXN0b20gZWxlbWVudHMgdG8gdXBncmFkZSBldmVuIGluIGRpc2Nvbm5lY3RlZCBmcmFnbWVudHMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEdpdmVuIHRoZXNlIGNvbnN0cmFpbnRzLCB3aXRoIGZ1bGwgY3VzdG9tIGVsZW1lbnRzIHN1cHBvcnQgd2Ugd291bGRcbiAgICAgICAgLy8gcHJlZmVyIHRoZSBvcmRlcjogQ2xvbmUsIFByb2Nlc3MsIEFkb3B0LCBVcGdyYWRlLCBVcGRhdGUsIENvbm5lY3RcbiAgICAgICAgLy9cbiAgICAgICAgLy8gQnV0IFNhZmFyaSBkb2VzIG5vdCBpbXBsZW1lbnQgQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5I3VwZ3JhZGUsIHNvIHdlXG4gICAgICAgIC8vIGNhbiBub3QgaW1wbGVtZW50IHRoYXQgb3JkZXIgYW5kIHN0aWxsIGhhdmUgdXBncmFkZS1iZWZvcmUtdXBkYXRlIGFuZFxuICAgICAgICAvLyB1cGdyYWRlIGRpc2Nvbm5lY3RlZCBmcmFnbWVudHMuIFNvIHdlIGluc3RlYWQgc2FjcmlmaWNlIHRoZVxuICAgICAgICAvLyBwcm9jZXNzLWJlZm9yZS11cGdyYWRlIGNvbnN0cmFpbnQsIHNpbmNlIGluIEN1c3RvbSBFbGVtZW50cyB2MSBlbGVtZW50c1xuICAgICAgICAvLyBtdXN0IG5vdCBtb2RpZnkgdGhlaXIgbGlnaHQgRE9NIGluIHRoZSBjb25zdHJ1Y3Rvci4gV2Ugc3RpbGwgaGF2ZSBpc3N1ZXNcbiAgICAgICAgLy8gd2hlbiBjby1leGlzdGluZyB3aXRoIENFdjAgZWxlbWVudHMgbGlrZSBQb2x5bWVyIDEsIGFuZCB3aXRoIHBvbHlmaWxsc1xuICAgICAgICAvLyB0aGF0IGRvbid0IHN0cmljdGx5IGFkaGVyZSB0byB0aGUgbm8tbW9kaWZpY2F0aW9uIHJ1bGUgYmVjYXVzZSBzaGFkb3dcbiAgICAgICAgLy8gRE9NLCB3aGljaCBtYXkgYmUgY3JlYXRlZCBpbiB0aGUgY29uc3RydWN0b3IsIGlzIGVtdWxhdGVkIGJ5IGJlaW5nIHBsYWNlZFxuICAgICAgICAvLyBpbiB0aGUgbGlnaHQgRE9NLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcmVzdWx0aW5nIG9yZGVyIGlzIG9uIG5hdGl2ZSBpczogQ2xvbmUsIEFkb3B0LCBVcGdyYWRlLCBQcm9jZXNzLFxuICAgICAgICAvLyBVcGRhdGUsIENvbm5lY3QuIGRvY3VtZW50LmltcG9ydE5vZGUoKSBwZXJmb3JtcyBDbG9uZSwgQWRvcHQsIGFuZCBVcGdyYWRlXG4gICAgICAgIC8vIGluIG9uZSBzdGVwLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgQ3VzdG9tIEVsZW1lbnRzIHYxIHBvbHlmaWxsIHN1cHBvcnRzIHVwZ3JhZGUoKSwgc28gdGhlIG9yZGVyIHdoZW5cbiAgICAgICAgLy8gcG9seWZpbGxlZCBpcyB0aGUgbW9yZSBpZGVhbDogQ2xvbmUsIFByb2Nlc3MsIEFkb3B0LCBVcGdyYWRlLCBVcGRhdGUsXG4gICAgICAgIC8vIENvbm5lY3QuXG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gaXNDRVBvbHlmaWxsID9cbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGUuZWxlbWVudC5jb250ZW50LmNsb25lTm9kZSh0cnVlKSA6XG4gICAgICAgICAgICBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMudGVtcGxhdGUuZWxlbWVudC5jb250ZW50LCB0cnVlKTtcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBbXTtcbiAgICAgICAgY29uc3QgcGFydHMgPSB0aGlzLnRlbXBsYXRlLnBhcnRzO1xuICAgICAgICAvLyBFZGdlIG5lZWRzIGFsbCA0IHBhcmFtZXRlcnMgcHJlc2VudDsgSUUxMSBuZWVkcyAzcmQgcGFyYW1ldGVyIHRvIGJlIG51bGxcbiAgICAgICAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihmcmFnbWVudCwgMTMzIC8qIE5vZGVGaWx0ZXIuU0hPV197RUxFTUVOVHxDT01NRU5UfFRFWFR9ICovLCBudWxsLCBmYWxzZSk7XG4gICAgICAgIGxldCBwYXJ0SW5kZXggPSAwO1xuICAgICAgICBsZXQgbm9kZUluZGV4ID0gMDtcbiAgICAgICAgbGV0IHBhcnQ7XG4gICAgICAgIGxldCBub2RlID0gd2Fsa2VyLm5leHROb2RlKCk7XG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgdGhlIG5vZGVzIGFuZCBwYXJ0cyBvZiBhIHRlbXBsYXRlXG4gICAgICAgIHdoaWxlIChwYXJ0SW5kZXggPCBwYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHBhcnQgPSBwYXJ0c1twYXJ0SW5kZXhdO1xuICAgICAgICAgICAgaWYgKCFpc1RlbXBsYXRlUGFydEFjdGl2ZShwYXJ0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX19wYXJ0cy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgcGFydEluZGV4Kys7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQcm9ncmVzcyB0aGUgdHJlZSB3YWxrZXIgdW50aWwgd2UgZmluZCBvdXIgbmV4dCBwYXJ0J3Mgbm9kZS5cbiAgICAgICAgICAgIC8vIE5vdGUgdGhhdCBtdWx0aXBsZSBwYXJ0cyBtYXkgc2hhcmUgdGhlIHNhbWUgbm9kZSAoYXR0cmlidXRlIHBhcnRzXG4gICAgICAgICAgICAvLyBvbiBhIHNpbmdsZSBlbGVtZW50KSwgc28gdGhpcyBsb29wIG1heSBub3QgcnVuIGF0IGFsbC5cbiAgICAgICAgICAgIHdoaWxlIChub2RlSW5kZXggPCBwYXJ0LmluZGV4KSB7XG4gICAgICAgICAgICAgICAgbm9kZUluZGV4Kys7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09ICdURU1QTEFURScpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgd2Fsa2VyLmN1cnJlbnROb2RlID0gbm9kZS5jb250ZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKG5vZGUgPSB3YWxrZXIubmV4dE5vZGUoKSkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UndmUgZXhoYXVzdGVkIHRoZSBjb250ZW50IGluc2lkZSBhIG5lc3RlZCB0ZW1wbGF0ZSBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICAvLyBCZWNhdXNlIHdlIHN0aWxsIGhhdmUgcGFydHMgKHRoZSBvdXRlciBmb3ItbG9vcCksIHdlIGtub3c6XG4gICAgICAgICAgICAgICAgICAgIC8vIC0gVGhlcmUgaXMgYSB0ZW1wbGF0ZSBpbiB0aGUgc3RhY2tcbiAgICAgICAgICAgICAgICAgICAgLy8gLSBUaGUgd2Fsa2VyIHdpbGwgZmluZCBhIG5leHROb2RlIG91dHNpZGUgdGhlIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIHdhbGtlci5jdXJyZW50Tm9kZSA9IHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gd2Fsa2VyLm5leHROb2RlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2UndmUgYXJyaXZlZCBhdCBvdXIgcGFydCdzIG5vZGUuXG4gICAgICAgICAgICBpZiAocGFydC50eXBlID09PSAnbm9kZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0ID0gdGhpcy5wcm9jZXNzb3IuaGFuZGxlVGV4dEV4cHJlc3Npb24odGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICBwYXJ0Lmluc2VydEFmdGVyTm9kZShub2RlLnByZXZpb3VzU2libGluZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3BhcnRzLnB1c2gocGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fcGFydHMucHVzaCguLi50aGlzLnByb2Nlc3Nvci5oYW5kbGVBdHRyaWJ1dGVFeHByZXNzaW9ucyhub2RlLCBwYXJ0Lm5hbWUsIHBhcnQuc3RyaW5ncywgdGhpcy5vcHRpb25zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJ0SW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNDRVBvbHlmaWxsKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZG9wdE5vZGUoZnJhZ21lbnQpO1xuICAgICAgICAgICAgY3VzdG9tRWxlbWVudHMudXBncmFkZShmcmFnbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRlbXBsYXRlLWluc3RhbmNlLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbi8qKlxuICogQG1vZHVsZSBsaXQtaHRtbFxuICovXG5pbXBvcnQgeyByZXBhcmVudE5vZGVzIH0gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0IHsgYm91bmRBdHRyaWJ1dGVTdWZmaXgsIGxhc3RBdHRyaWJ1dGVOYW1lUmVnZXgsIG1hcmtlciwgbm9kZU1hcmtlciB9IGZyb20gJy4vdGVtcGxhdGUuanMnO1xuLyoqXG4gKiBPdXIgVHJ1c3RlZFR5cGVQb2xpY3kgZm9yIEhUTUwgd2hpY2ggaXMgZGVjbGFyZWQgdXNpbmcgdGhlIGh0bWwgdGVtcGxhdGVcbiAqIHRhZyBmdW5jdGlvbi5cbiAqXG4gKiBUaGF0IEhUTUwgaXMgYSBkZXZlbG9wZXItYXV0aG9yZWQgY29uc3RhbnQsIGFuZCBpcyBwYXJzZWQgd2l0aCBpbm5lckhUTUxcbiAqIGJlZm9yZSBhbnkgdW50cnVzdGVkIGV4cHJlc3Npb25zIGhhdmUgYmVlbiBtaXhlZCBpbi4gVGhlcmVmb3IgaXQgaXNcbiAqIGNvbnNpZGVyZWQgc2FmZSBieSBjb25zdHJ1Y3Rpb24uXG4gKi9cbmNvbnN0IHBvbGljeSA9IHdpbmRvdy50cnVzdGVkVHlwZXMgJiZcbiAgICB0cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5KCdsaXQtaHRtbCcsIHsgY3JlYXRlSFRNTDogKHMpID0+IHMgfSk7XG5jb25zdCBjb21tZW50TWFya2VyID0gYCAke21hcmtlcn0gYDtcbi8qKlxuICogVGhlIHJldHVybiB0eXBlIG9mIGBodG1sYCwgd2hpY2ggaG9sZHMgYSBUZW1wbGF0ZSBhbmQgdGhlIHZhbHVlcyBmcm9tXG4gKiBpbnRlcnBvbGF0ZWQgZXhwcmVzc2lvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZVJlc3VsdCB7XG4gICAgY29uc3RydWN0b3Ioc3RyaW5ncywgdmFsdWVzLCB0eXBlLCBwcm9jZXNzb3IpIHtcbiAgICAgICAgdGhpcy5zdHJpbmdzID0gc3RyaW5ncztcbiAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMucHJvY2Vzc29yID0gcHJvY2Vzc29yO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIG9mIEhUTUwgdXNlZCB0byBjcmVhdGUgYSBgPHRlbXBsYXRlPmAgZWxlbWVudC5cbiAgICAgKi9cbiAgICBnZXRIVE1MKCkge1xuICAgICAgICBjb25zdCBsID0gdGhpcy5zdHJpbmdzLmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBodG1sID0gJyc7XG4gICAgICAgIGxldCBpc0NvbW1lbnRCaW5kaW5nID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5zdHJpbmdzW2ldO1xuICAgICAgICAgICAgLy8gRm9yIGVhY2ggYmluZGluZyB3ZSB3YW50IHRvIGRldGVybWluZSB0aGUga2luZCBvZiBtYXJrZXIgdG8gaW5zZXJ0XG4gICAgICAgICAgICAvLyBpbnRvIHRoZSB0ZW1wbGF0ZSBzb3VyY2UgYmVmb3JlIGl0J3MgcGFyc2VkIGJ5IHRoZSBicm93c2VyJ3MgSFRNTFxuICAgICAgICAgICAgLy8gcGFyc2VyLiBUaGUgbWFya2VyIHR5cGUgaXMgYmFzZWQgb24gd2hldGhlciB0aGUgZXhwcmVzc2lvbiBpcyBpbiBhblxuICAgICAgICAgICAgLy8gYXR0cmlidXRlLCB0ZXh0LCBvciBjb21tZW50IHBvc2l0aW9uLlxuICAgICAgICAgICAgLy8gICAqIEZvciBub2RlLXBvc2l0aW9uIGJpbmRpbmdzIHdlIGluc2VydCBhIGNvbW1lbnQgd2l0aCB0aGUgbWFya2VyXG4gICAgICAgICAgICAvLyAgICAgc2VudGluZWwgYXMgaXRzIHRleHQgY29udGVudCwgbGlrZSA8IS0te3tsaXQtZ3VpZH19LS0+LlxuICAgICAgICAgICAgLy8gICAqIEZvciBhdHRyaWJ1dGUgYmluZGluZ3Mgd2UgaW5zZXJ0IGp1c3QgdGhlIG1hcmtlciBzZW50aW5lbCBmb3IgdGhlXG4gICAgICAgICAgICAvLyAgICAgZmlyc3QgYmluZGluZywgc28gdGhhdCB3ZSBzdXBwb3J0IHVucXVvdGVkIGF0dHJpYnV0ZSBiaW5kaW5ncy5cbiAgICAgICAgICAgIC8vICAgICBTdWJzZXF1ZW50IGJpbmRpbmdzIGNhbiB1c2UgYSBjb21tZW50IG1hcmtlciBiZWNhdXNlIG11bHRpLWJpbmRpbmdcbiAgICAgICAgICAgIC8vICAgICBhdHRyaWJ1dGVzIG11c3QgYmUgcXVvdGVkLlxuICAgICAgICAgICAgLy8gICAqIEZvciBjb21tZW50IGJpbmRpbmdzIHdlIGluc2VydCBqdXN0IHRoZSBtYXJrZXIgc2VudGluZWwgc28gd2UgZG9uJ3RcbiAgICAgICAgICAgIC8vICAgICBjbG9zZSB0aGUgY29tbWVudC5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGNvZGUgc2NhbnMgdGhlIHRlbXBsYXRlIHNvdXJjZSwgYnV0IGlzICpub3QqIGFuIEhUTUxcbiAgICAgICAgICAgIC8vIHBhcnNlci4gV2UgZG9uJ3QgbmVlZCB0byB0cmFjayB0aGUgdHJlZSBzdHJ1Y3R1cmUgb2YgdGhlIEhUTUwsIG9ubHlcbiAgICAgICAgICAgIC8vIHdoZXRoZXIgYSBiaW5kaW5nIGlzIGluc2lkZSBhIGNvbW1lbnQsIGFuZCBpZiBub3QsIGlmIGl0IGFwcGVhcnMgdG8gYmVcbiAgICAgICAgICAgIC8vIHRoZSBmaXJzdCBiaW5kaW5nIGluIGFuIGF0dHJpYnV0ZS5cbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRPcGVuID0gcy5sYXN0SW5kZXhPZignPCEtLScpO1xuICAgICAgICAgICAgLy8gV2UncmUgaW4gY29tbWVudCBwb3NpdGlvbiBpZiB3ZSBoYXZlIGEgY29tbWVudCBvcGVuIHdpdGggbm8gZm9sbG93aW5nXG4gICAgICAgICAgICAvLyBjb21tZW50IGNsb3NlLiBCZWNhdXNlIDwtLSBjYW4gYXBwZWFyIGluIGFuIGF0dHJpYnV0ZSB2YWx1ZSB0aGVyZSBjYW5cbiAgICAgICAgICAgIC8vIGJlIGZhbHNlIHBvc2l0aXZlcy5cbiAgICAgICAgICAgIGlzQ29tbWVudEJpbmRpbmcgPSAoY29tbWVudE9wZW4gPiAtMSB8fCBpc0NvbW1lbnRCaW5kaW5nKSAmJlxuICAgICAgICAgICAgICAgIHMuaW5kZXhPZignLS0+JywgY29tbWVudE9wZW4gKyAxKSA9PT0gLTE7XG4gICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBhbiBhdHRyaWJ1dGUtbGlrZSBzZXF1ZW5jZSBwcmVjZWRpbmcgdGhlXG4gICAgICAgICAgICAvLyBleHByZXNzaW9uLiBUaGlzIGNhbiBtYXRjaCBcIm5hbWU9dmFsdWVcIiBsaWtlIHN0cnVjdHVyZXMgaW4gdGV4dCxcbiAgICAgICAgICAgIC8vIGNvbW1lbnRzLCBhbmQgYXR0cmlidXRlIHZhbHVlcywgc28gdGhlcmUgY2FuIGJlIGZhbHNlLXBvc2l0aXZlcy5cbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU1hdGNoID0gbGFzdEF0dHJpYnV0ZU5hbWVSZWdleC5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZU1hdGNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UncmUgb25seSBpbiB0aGlzIGJyYW5jaCBpZiB3ZSBkb24ndCBoYXZlIGEgYXR0cmlidXRlLWxpa2VcbiAgICAgICAgICAgICAgICAvLyBwcmVjZWRpbmcgc2VxdWVuY2UuIEZvciBjb21tZW50cywgdGhpcyBndWFyZHMgYWdhaW5zdCB1bnVzdWFsXG4gICAgICAgICAgICAgICAgLy8gYXR0cmlidXRlIHZhbHVlcyBsaWtlIDxkaXYgZm9vPVwiPCEtLSR7J2Jhcid9XCI+LiBDYXNlcyBsaWtlXG4gICAgICAgICAgICAgICAgLy8gPCEtLSBmb289JHsnYmFyJ30tLT4gYXJlIGhhbmRsZWQgY29ycmVjdGx5IGluIHRoZSBhdHRyaWJ1dGUgYnJhbmNoXG4gICAgICAgICAgICAgICAgLy8gYmVsb3cuXG4gICAgICAgICAgICAgICAgaHRtbCArPSBzICsgKGlzQ29tbWVudEJpbmRpbmcgPyBjb21tZW50TWFya2VyIDogbm9kZU1hcmtlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBGb3IgYXR0cmlidXRlcyB3ZSB1c2UganVzdCBhIG1hcmtlciBzZW50aW5lbCwgYW5kIGFsc28gYXBwZW5kIGFcbiAgICAgICAgICAgICAgICAvLyAkbGl0JCBzdWZmaXggdG8gdGhlIG5hbWUgdG8gb3B0LW91dCBvZiBhdHRyaWJ1dGUtc3BlY2lmaWMgcGFyc2luZ1xuICAgICAgICAgICAgICAgIC8vIHRoYXQgSUUgYW5kIEVkZ2UgZG8gZm9yIHN0eWxlIGFuZCBjZXJ0YWluIFNWRyBhdHRyaWJ1dGVzLlxuICAgICAgICAgICAgICAgIGh0bWwgKz0gcy5zdWJzdHIoMCwgYXR0cmlidXRlTWF0Y2guaW5kZXgpICsgYXR0cmlidXRlTWF0Y2hbMV0gK1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVNYXRjaFsyXSArIGJvdW5kQXR0cmlidXRlU3VmZml4ICsgYXR0cmlidXRlTWF0Y2hbM10gK1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaHRtbCArPSB0aGlzLnN0cmluZ3NbbF07XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH1cbiAgICBnZXRUZW1wbGF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRIVE1MKCk7XG4gICAgICAgIGlmIChwb2xpY3kgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyBzZWN1cmUgYmVjYXVzZSBgdGhpcy5zdHJpbmdzYCBpcyBhIFRlbXBsYXRlU3RyaW5nc0FycmF5LlxuICAgICAgICAgICAgLy8gVE9ETzogdmFsaWRhdGUgdGhpcyB3aGVuXG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1hcnJheS1pcy10ZW1wbGF0ZS1vYmplY3QgaXNcbiAgICAgICAgICAgIC8vIGltcGxlbWVudGVkLlxuICAgICAgICAgICAgdmFsdWUgPSBwb2xpY3kuY3JlYXRlSFRNTCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG59XG4vKipcbiAqIEEgVGVtcGxhdGVSZXN1bHQgZm9yIFNWRyBmcmFnbWVudHMuXG4gKlxuICogVGhpcyBjbGFzcyB3cmFwcyBIVE1MIGluIGFuIGA8c3ZnPmAgdGFnIGluIG9yZGVyIHRvIHBhcnNlIGl0cyBjb250ZW50cyBpbiB0aGVcbiAqIFNWRyBuYW1lc3BhY2UsIHRoZW4gbW9kaWZpZXMgdGhlIHRlbXBsYXRlIHRvIHJlbW92ZSB0aGUgYDxzdmc+YCB0YWcgc28gdGhhdFxuICogY2xvbmVzIG9ubHkgY29udGFpbmVyIHRoZSBvcmlnaW5hbCBmcmFnbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNWR1RlbXBsYXRlUmVzdWx0IGV4dGVuZHMgVGVtcGxhdGVSZXN1bHQge1xuICAgIGdldEhUTUwoKSB7XG4gICAgICAgIHJldHVybiBgPHN2Zz4ke3N1cGVyLmdldEhUTUwoKX08L3N2Zz5gO1xuICAgIH1cbiAgICBnZXRUZW1wbGF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gc3VwZXIuZ2V0VGVtcGxhdGVFbGVtZW50KCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50O1xuICAgICAgICBjb25zdCBzdmdFbGVtZW50ID0gY29udGVudC5maXJzdENoaWxkO1xuICAgICAgICBjb250ZW50LnJlbW92ZUNoaWxkKHN2Z0VsZW1lbnQpO1xuICAgICAgICByZXBhcmVudE5vZGVzKGNvbnRlbnQsIHN2Z0VsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZW1wbGF0ZS1yZXN1bHQuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuLyoqXG4gKiBBbiBleHByZXNzaW9uIG1hcmtlciB3aXRoIGVtYmVkZGVkIHVuaXF1ZSBrZXkgdG8gYXZvaWQgY29sbGlzaW9uIHdpdGhcbiAqIHBvc3NpYmxlIHRleHQgaW4gdGVtcGxhdGVzLlxuICovXG5leHBvcnQgY29uc3QgbWFya2VyID0gYHt7bGl0LSR7U3RyaW5nKE1hdGgucmFuZG9tKCkpLnNsaWNlKDIpfX19YDtcbi8qKlxuICogQW4gZXhwcmVzc2lvbiBtYXJrZXIgdXNlZCB0ZXh0LXBvc2l0aW9ucywgbXVsdGktYmluZGluZyBhdHRyaWJ1dGVzLCBhbmRcbiAqIGF0dHJpYnV0ZXMgd2l0aCBtYXJrdXAtbGlrZSB0ZXh0IHZhbHVlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vZGVNYXJrZXIgPSBgPCEtLSR7bWFya2VyfS0tPmA7XG5leHBvcnQgY29uc3QgbWFya2VyUmVnZXggPSBuZXcgUmVnRXhwKGAke21hcmtlcn18JHtub2RlTWFya2VyfWApO1xuLyoqXG4gKiBTdWZmaXggYXBwZW5kZWQgdG8gYWxsIGJvdW5kIGF0dHJpYnV0ZSBuYW1lcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGJvdW5kQXR0cmlidXRlU3VmZml4ID0gJyRsaXQkJztcbi8qKlxuICogQW4gdXBkYXRhYmxlIFRlbXBsYXRlIHRoYXQgdHJhY2tzIHRoZSBsb2NhdGlvbiBvZiBkeW5hbWljIHBhcnRzLlxuICovXG5leHBvcnQgY2xhc3MgVGVtcGxhdGUge1xuICAgIGNvbnN0cnVjdG9yKHJlc3VsdCwgZWxlbWVudCkge1xuICAgICAgICB0aGlzLnBhcnRzID0gW107XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IG5vZGVzVG9SZW1vdmUgPSBbXTtcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBbXTtcbiAgICAgICAgLy8gRWRnZSBuZWVkcyBhbGwgNCBwYXJhbWV0ZXJzIHByZXNlbnQ7IElFMTEgbmVlZHMgM3JkIHBhcmFtZXRlciB0byBiZSBudWxsXG4gICAgICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoZWxlbWVudC5jb250ZW50LCAxMzMgLyogTm9kZUZpbHRlci5TSE9XX3tFTEVNRU5UfENPTU1FTlR8VEVYVH0gKi8sIG51bGwsIGZhbHNlKTtcbiAgICAgICAgLy8gS2VlcHMgdHJhY2sgb2YgdGhlIGxhc3QgaW5kZXggYXNzb2NpYXRlZCB3aXRoIGEgcGFydC4gV2UgdHJ5IHRvIGRlbGV0ZVxuICAgICAgICAvLyB1bm5lY2Vzc2FyeSBub2RlcywgYnV0IHdlIG5ldmVyIHdhbnQgdG8gYXNzb2NpYXRlIHR3byBkaWZmZXJlbnQgcGFydHNcbiAgICAgICAgLy8gdG8gdGhlIHNhbWUgaW5kZXguIFRoZXkgbXVzdCBoYXZlIGEgY29uc3RhbnQgbm9kZSBiZXR3ZWVuLlxuICAgICAgICBsZXQgbGFzdFBhcnRJbmRleCA9IDA7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBsZXQgcGFydEluZGV4ID0gMDtcbiAgICAgICAgY29uc3QgeyBzdHJpbmdzLCB2YWx1ZXM6IHsgbGVuZ3RoIH0gfSA9IHJlc3VsdDtcbiAgICAgICAgd2hpbGUgKHBhcnRJbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHdhbGtlci5uZXh0Tm9kZSgpO1xuICAgICAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSd2ZSBleGhhdXN0ZWQgdGhlIGNvbnRlbnQgaW5zaWRlIGEgbmVzdGVkIHRlbXBsYXRlIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gQmVjYXVzZSB3ZSBzdGlsbCBoYXZlIHBhcnRzICh0aGUgb3V0ZXIgZm9yLWxvb3ApLCB3ZSBrbm93OlxuICAgICAgICAgICAgICAgIC8vIC0gVGhlcmUgaXMgYSB0ZW1wbGF0ZSBpbiB0aGUgc3RhY2tcbiAgICAgICAgICAgICAgICAvLyAtIFRoZSB3YWxrZXIgd2lsbCBmaW5kIGEgbmV4dE5vZGUgb3V0c2lkZSB0aGUgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICB3YWxrZXIuY3VycmVudE5vZGUgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSAvKiBOb2RlLkVMRU1FTlRfTk9ERSAqLykge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmhhc0F0dHJpYnV0ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxlbmd0aCB9ID0gYXR0cmlidXRlcztcbiAgICAgICAgICAgICAgICAgICAgLy8gUGVyXG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9OYW1lZE5vZGVNYXAsXG4gICAgICAgICAgICAgICAgICAgIC8vIGF0dHJpYnV0ZXMgYXJlIG5vdCBndWFyYW50ZWVkIHRvIGJlIHJldHVybmVkIGluIGRvY3VtZW50IG9yZGVyLlxuICAgICAgICAgICAgICAgICAgICAvLyBJbiBwYXJ0aWN1bGFyLCBFZGdlL0lFIGNhbiByZXR1cm4gdGhlbSBvdXQgb2Ygb3JkZXIsIHNvIHdlIGNhbm5vdFxuICAgICAgICAgICAgICAgICAgICAvLyBhc3N1bWUgYSBjb3JyZXNwb25kZW5jZSBiZXR3ZWVuIHBhcnQgaW5kZXggYW5kIGF0dHJpYnV0ZSBpbmRleC5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVuZHNXaXRoKGF0dHJpYnV0ZXNbaV0ubmFtZSwgYm91bmRBdHRyaWJ1dGVTdWZmaXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY291bnQtLSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgdGVtcGxhdGUgbGl0ZXJhbCBzZWN0aW9uIGxlYWRpbmcgdXAgdG8gdGhlIGZpcnN0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBleHByZXNzaW9uIGluIHRoaXMgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJpbmdGb3JQYXJ0ID0gc3RyaW5nc1twYXJ0SW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgYXR0cmlidXRlIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBsYXN0QXR0cmlidXRlTmFtZVJlZ2V4LmV4ZWMoc3RyaW5nRm9yUGFydClbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIHRoZSBjb3JyZXNwb25kaW5nIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxsIGJvdW5kIGF0dHJpYnV0ZXMgaGF2ZSBoYWQgYSBzdWZmaXggYWRkZWQgaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRlbXBsYXRlUmVzdWx0I2dldEhUTUwgdG8gb3B0IG91dCBvZiBzcGVjaWFsIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxpbmcuIFRvIGxvb2sgdXAgdGhlIGF0dHJpYnV0ZSB2YWx1ZSB3ZSBhbHNvIG5lZWQgdG8gYWRkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgc3VmZml4LlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlTG9va3VwTmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKSArIGJvdW5kQXR0cmlidXRlU3VmZml4O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVMb29rdXBOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZUxvb2t1cE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdGljcyA9IGF0dHJpYnV0ZVZhbHVlLnNwbGl0KG1hcmtlclJlZ2V4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFydHMucHVzaCh7IHR5cGU6ICdhdHRyaWJ1dGUnLCBpbmRleCwgbmFtZSwgc3RyaW5nczogc3RhdGljcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRJbmRleCArPSBzdGF0aWNzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gJ1RFTVBMQVRFJykge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB3YWxrZXIuY3VycmVudE5vZGUgPSBub2RlLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMyAvKiBOb2RlLlRFWFRfTk9ERSAqLykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBub2RlLmRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaW5kZXhPZihtYXJrZXIpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJpbmdzID0gZGF0YS5zcGxpdChtYXJrZXJSZWdleCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IHN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgYSBuZXcgdGV4dCBub2RlIGZvciBlYWNoIGxpdGVyYWwgc2VjdGlvblxuICAgICAgICAgICAgICAgICAgICAvLyBUaGVzZSBub2RlcyBhcmUgYWxzbyB1c2VkIGFzIHRoZSBtYXJrZXJzIGZvciBub2RlIHBhcnRzXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFzdEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnNlcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcyA9IHN0cmluZ3NbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocyA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnQgPSBjcmVhdGVNYXJrZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gbGFzdEF0dHJpYnV0ZU5hbWVSZWdleC5leGVjKHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCAhPT0gbnVsbCAmJiBlbmRzV2l0aChtYXRjaFsyXSwgYm91bmRBdHRyaWJ1dGVTdWZmaXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBzLnNsaWNlKDAsIG1hdGNoLmluZGV4KSArIG1hdGNoWzFdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzJdLnNsaWNlKDAsIC1ib3VuZEF0dHJpYnV0ZVN1ZmZpeC5sZW5ndGgpICsgbWF0Y2hbM107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShpbnNlcnQsIG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJ0cy5wdXNoKHsgdHlwZTogJ25vZGUnLCBpbmRleDogKytpbmRleCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSdzIG5vIHRleHQsIHdlIG11c3QgaW5zZXJ0IGEgY29tbWVudCB0byBtYXJrIG91ciBwbGFjZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSwgd2UgY2FuIHRydXN0IGl0IHdpbGwgc3RpY2sgYXJvdW5kIGFmdGVyIGNsb25pbmcuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdzW2xhc3RJbmRleF0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNyZWF0ZU1hcmtlcigpLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzVG9SZW1vdmUucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZGF0YSA9IHN0cmluZ3NbbGFzdEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGEgcGFydCBmb3IgZWFjaCBtYXRjaCBmb3VuZFxuICAgICAgICAgICAgICAgICAgICBwYXJ0SW5kZXggKz0gbGFzdEluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDggLyogTm9kZS5DT01NRU5UX05PREUgKi8pIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5kYXRhID09PSBtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgYSBuZXcgbWFya2VyIG5vZGUgdG8gYmUgdGhlIHN0YXJ0Tm9kZSBvZiB0aGUgUGFydCBpZiBhbnkgb2ZcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGZvbGxvd2luZyBhcmUgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgLy8gICogV2UgZG9uJ3QgaGF2ZSBhIHByZXZpb3VzU2libGluZ1xuICAgICAgICAgICAgICAgICAgICAvLyAgKiBUaGUgcHJldmlvdXNTaWJsaW5nIGlzIGFscmVhZHkgdGhlIHN0YXJ0IG9mIGEgcHJldmlvdXMgcGFydFxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5wcmV2aW91c1NpYmxpbmcgPT09IG51bGwgfHwgaW5kZXggPT09IGxhc3RQYXJ0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNyZWF0ZU1hcmtlcigpLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsYXN0UGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFydHMucHVzaCh7IHR5cGU6ICdub2RlJywgaW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBuZXh0U2libGluZywga2VlcCB0aGlzIG5vZGUgc28gd2UgaGF2ZSBhbiBlbmQuXG4gICAgICAgICAgICAgICAgICAgIC8vIEVsc2UsIHdlIGNhbiByZW1vdmUgaXQgdG8gc2F2ZSBmdXR1cmUgY29zdHMuXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5leHRTaWJsaW5nID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmRhdGEgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzVG9SZW1vdmUucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFydEluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKGkgPSBub2RlLmRhdGEuaW5kZXhPZihtYXJrZXIsIGkgKyAxKSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb21tZW50IG5vZGUgaGFzIGEgYmluZGluZyBtYXJrZXIgaW5zaWRlLCBtYWtlIGFuIGluYWN0aXZlIHBhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBiaW5kaW5nIHdvbid0IHdvcmssIGJ1dCBzdWJzZXF1ZW50IGJpbmRpbmdzIHdpbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gKGp1c3RpbmZhZ25hbmkpOiBjb25zaWRlciB3aGV0aGVyIGl0J3MgZXZlbiB3b3J0aCBpdCB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBiaW5kaW5ncyBpbiBjb21tZW50cyB3b3JrXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnRzLnB1c2goeyB0eXBlOiAnbm9kZScsIGluZGV4OiAtMSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSB0ZXh0IGJpbmRpbmcgbm9kZXMgYWZ0ZXIgdGhlIHdhbGsgdG8gbm90IGRpc3R1cmIgdGhlIFRyZWVXYWxrZXJcbiAgICAgICAgZm9yIChjb25zdCBuIG9mIG5vZGVzVG9SZW1vdmUpIHtcbiAgICAgICAgICAgIG4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNvbnN0IGVuZHNXaXRoID0gKHN0ciwgc3VmZml4KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aDtcbiAgICByZXR1cm4gaW5kZXggPj0gMCAmJiBzdHIuc2xpY2UoaW5kZXgpID09PSBzdWZmaXg7XG59O1xuZXhwb3J0IGNvbnN0IGlzVGVtcGxhdGVQYXJ0QWN0aXZlID0gKHBhcnQpID0+IHBhcnQuaW5kZXggIT09IC0xO1xuLy8gQWxsb3dzIGBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcnKWAgdG8gYmUgcmVuYW1lZCBmb3IgYVxuLy8gc21hbGwgbWFudWFsIHNpemUtc2F2aW5ncy5cbmV4cG9ydCBjb25zdCBjcmVhdGVNYXJrZXIgPSAoKSA9PiBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcnKTtcbi8qKlxuICogVGhpcyByZWdleCBleHRyYWN0cyB0aGUgYXR0cmlidXRlIG5hbWUgcHJlY2VkaW5nIGFuIGF0dHJpYnV0ZS1wb3NpdGlvblxuICogZXhwcmVzc2lvbi4gSXQgZG9lcyB0aGlzIGJ5IG1hdGNoaW5nIHRoZSBzeW50YXggYWxsb3dlZCBmb3IgYXR0cmlidXRlc1xuICogYWdhaW5zdCB0aGUgc3RyaW5nIGxpdGVyYWwgZGlyZWN0bHkgcHJlY2VkaW5nIHRoZSBleHByZXNzaW9uLCBhc3N1bWluZyB0aGF0XG4gKiB0aGUgZXhwcmVzc2lvbiBpcyBpbiBhbiBhdHRyaWJ1dGUtdmFsdWUgcG9zaXRpb24uXG4gKlxuICogU2VlIGF0dHJpYnV0ZXMgaW4gdGhlIEhUTUwgc3BlYzpcbiAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9zeW50YXguaHRtbCNlbGVtZW50cy1hdHRyaWJ1dGVzXG4gKlxuICogXCIgXFx4MDlcXHgwYVxceDBjXFx4MGRcIiBhcmUgSFRNTCBzcGFjZSBjaGFyYWN0ZXJzOlxuICogaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw1L2luZnJhc3RydWN0dXJlLmh0bWwjc3BhY2UtY2hhcmFjdGVyc1xuICpcbiAqIFwiXFwwLVxceDFGXFx4N0YtXFx4OUZcIiBhcmUgVW5pY29kZSBjb250cm9sIGNoYXJhY3RlcnMsIHdoaWNoIGluY2x1ZGVzIGV2ZXJ5XG4gKiBzcGFjZSBjaGFyYWN0ZXIgZXhjZXB0IFwiIFwiLlxuICpcbiAqIFNvIGFuIGF0dHJpYnV0ZSBpczpcbiAqICAqIFRoZSBuYW1lOiBhbnkgY2hhcmFjdGVyIGV4Y2VwdCBhIGNvbnRyb2wgY2hhcmFjdGVyLCBzcGFjZSBjaGFyYWN0ZXIsICgnKSxcbiAqICAgIChcIiksIFwiPlwiLCBcIj1cIiwgb3IgXCIvXCJcbiAqICAqIEZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBzcGFjZSBjaGFyYWN0ZXJzXG4gKiAgKiBGb2xsb3dlZCBieSBcIj1cIlxuICogICogRm9sbG93ZWQgYnkgemVybyBvciBtb3JlIHNwYWNlIGNoYXJhY3RlcnNcbiAqICAqIEZvbGxvd2VkIGJ5OlxuICogICAgKiBBbnkgY2hhcmFjdGVyIGV4Y2VwdCBzcGFjZSwgKCcpLCAoXCIpLCBcIjxcIiwgXCI+XCIsIFwiPVwiLCAoYCksIG9yXG4gKiAgICAqIChcIikgdGhlbiBhbnkgbm9uLShcIiksIG9yXG4gKiAgICAqICgnKSB0aGVuIGFueSBub24tKCcpXG4gKi9cbmV4cG9ydCBjb25zdCBsYXN0QXR0cmlidXRlTmFtZVJlZ2V4ID0gXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxuLyhbIFxceDA5XFx4MGFcXHgwY1xceDBkXSkoW15cXDAtXFx4MUZcXHg3Ri1cXHg5RiBcIic+PS9dKykoWyBcXHgwOVxceDBhXFx4MGNcXHgwZF0qPVsgXFx4MDlcXHgwYVxceDBjXFx4MGRdKig/OlteIFxceDA5XFx4MGFcXHgwY1xceDBkXCInYDw+PV0qfFwiW15cIl0qfCdbXiddKikpJC87XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZW1wbGF0ZS5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG4vKipcbiAqXG4gKiBNYWluIGxpdC1odG1sIG1vZHVsZS5cbiAqXG4gKiBNYWluIGV4cG9ydHM6XG4gKlxuICogLSAgW1todG1sXV1cbiAqIC0gIFtbc3ZnXV1cbiAqIC0gIFtbcmVuZGVyXV1cbiAqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuLyoqXG4gKiBEbyBub3QgcmVtb3ZlIHRoaXMgY29tbWVudDsgaXQga2VlcHMgdHlwZWRvYyBmcm9tIG1pc3BsYWNpbmcgdGhlIG1vZHVsZVxuICogZG9jcy5cbiAqL1xuaW1wb3J0IHsgZGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yIH0gZnJvbSAnLi9saWIvZGVmYXVsdC10ZW1wbGF0ZS1wcm9jZXNzb3IuanMnO1xuaW1wb3J0IHsgU1ZHVGVtcGxhdGVSZXN1bHQsIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtcmVzdWx0LmpzJztcbmV4cG9ydCB7IERlZmF1bHRUZW1wbGF0ZVByb2Nlc3NvciwgZGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yIH0gZnJvbSAnLi9saWIvZGVmYXVsdC10ZW1wbGF0ZS1wcm9jZXNzb3IuanMnO1xuZXhwb3J0IHsgZGlyZWN0aXZlLCBpc0RpcmVjdGl2ZSB9IGZyb20gJy4vbGliL2RpcmVjdGl2ZS5qcyc7XG4vLyBUT0RPKGp1c3RpbmZhZ25hbmkpOiByZW1vdmUgbGluZSB3aGVuIHdlIGdldCBOb2RlUGFydCBtb3ZpbmcgbWV0aG9kc1xuZXhwb3J0IHsgcmVtb3ZlTm9kZXMsIHJlcGFyZW50Tm9kZXMgfSBmcm9tICcuL2xpYi9kb20uanMnO1xuZXhwb3J0IHsgbm9DaGFuZ2UsIG5vdGhpbmcgfSBmcm9tICcuL2xpYi9wYXJ0LmpzJztcbmV4cG9ydCB7IEF0dHJpYnV0ZUNvbW1pdHRlciwgQXR0cmlidXRlUGFydCwgQm9vbGVhbkF0dHJpYnV0ZVBhcnQsIEV2ZW50UGFydCwgaXNJdGVyYWJsZSwgaXNQcmltaXRpdmUsIE5vZGVQYXJ0LCBQcm9wZXJ0eUNvbW1pdHRlciwgUHJvcGVydHlQYXJ0IH0gZnJvbSAnLi9saWIvcGFydHMuanMnO1xuZXhwb3J0IHsgcGFydHMsIHJlbmRlciB9IGZyb20gJy4vbGliL3JlbmRlci5qcyc7XG5leHBvcnQgeyB0ZW1wbGF0ZUNhY2hlcywgdGVtcGxhdGVGYWN0b3J5IH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtZmFjdG9yeS5qcyc7XG5leHBvcnQgeyBUZW1wbGF0ZUluc3RhbmNlIH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtaW5zdGFuY2UuanMnO1xuZXhwb3J0IHsgU1ZHVGVtcGxhdGVSZXN1bHQsIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnLi9saWIvdGVtcGxhdGUtcmVzdWx0LmpzJztcbmV4cG9ydCB7IGNyZWF0ZU1hcmtlciwgaXNUZW1wbGF0ZVBhcnRBY3RpdmUsIFRlbXBsYXRlIH0gZnJvbSAnLi9saWIvdGVtcGxhdGUuanMnO1xuLy8gSU1QT1JUQU5UOiBkbyBub3QgY2hhbmdlIHRoZSBwcm9wZXJ0eSBuYW1lIG9yIHRoZSBhc3NpZ25tZW50IGV4cHJlc3Npb24uXG4vLyBUaGlzIGxpbmUgd2lsbCBiZSB1c2VkIGluIHJlZ2V4ZXMgdG8gc2VhcmNoIGZvciBsaXQtaHRtbCB1c2FnZS5cbi8vIFRPRE8oanVzdGluZmFnbmFuaSk6IGluamVjdCB2ZXJzaW9uIG51bWJlciBhdCBidWlsZCB0aW1lXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAod2luZG93WydsaXRIdG1sVmVyc2lvbnMnXSB8fCAod2luZG93WydsaXRIdG1sVmVyc2lvbnMnXSA9IFtdKSkucHVzaCgnMS4zLjAnKTtcbn1cbi8qKlxuICogSW50ZXJwcmV0cyBhIHRlbXBsYXRlIGxpdGVyYWwgYXMgYW4gSFRNTCB0ZW1wbGF0ZSB0aGF0IGNhbiBlZmZpY2llbnRseVxuICogcmVuZGVyIHRvIGFuZCB1cGRhdGUgYSBjb250YWluZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBodG1sID0gKHN0cmluZ3MsIC4uLnZhbHVlcykgPT4gbmV3IFRlbXBsYXRlUmVzdWx0KHN0cmluZ3MsIHZhbHVlcywgJ2h0bWwnLCBkZWZhdWx0VGVtcGxhdGVQcm9jZXNzb3IpO1xuLyoqXG4gKiBJbnRlcnByZXRzIGEgdGVtcGxhdGUgbGl0ZXJhbCBhcyBhbiBTVkcgdGVtcGxhdGUgdGhhdCBjYW4gZWZmaWNpZW50bHlcbiAqIHJlbmRlciB0byBhbmQgdXBkYXRlIGEgY29udGFpbmVyLlxuICovXG5leHBvcnQgY29uc3Qgc3ZnID0gKHN0cmluZ3MsIC4uLnZhbHVlcykgPT4gbmV3IFNWR1RlbXBsYXRlUmVzdWx0KHN0cmluZ3MsIHZhbHVlcywgJ3N2ZycsIGRlZmF1bHRUZW1wbGF0ZVByb2Nlc3Nvcik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXQtaHRtbC5qcy5tYXAiLCJjb25zdCBLRVlTID0ge1xuICBBUlJPV19SSUdIVDogJ0Fycm93UmlnaHQnLFxuICBBUlJPV19MRUZUOiAnQXJyb3dMZWZ0JyxcbiAgQVJST1dfVVA6ICdBcnJvd1VwJyxcbiAgQVJST1dfRE9XTjogJ0Fycm93RG93bidcbn07XG5cbmV4cG9ydCB7IEtFWVMgfTsiLCJpbXBvcnQgeyBMaXRFbGVtZW50LCBodG1sLCBjc3MgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5pbXBvcnQgeyBHYW1lSW50ZXJmYWNlIH0gZnJvbSAnLi4vZ2FtZS9nYW1lLWludGVyZmFjZS5qcyc7XG5pbXBvcnQgeyBLRVlTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5cbmNsYXNzIENvb2xHYW1lIGV4dGVuZHMgTGl0RWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fY29udHJvbGxlckNsaWNrSGFuZGxlcnMgPSB7XG5cdFx0XHRyaWdodDoge1xuXHRcdFx0XHRtb3VzZURvd246ICgpID0+IHsgdGhpcy5nYW1lSW50ZXJmYWNlLnBsYXllckdvUmlnaHQoKTsgfSxcblx0XHRcdFx0bW91c2VVcDogKCkgPT4geyB0aGlzLmdhbWVJbnRlcmZhY2UucGxheWVyU3RvcCgpOyB9XG5cdFx0XHR9LFxuXHRcdFx0bGVmdDoge1xuXHRcdFx0XHRtb3VzZURvd246ICgpID0+IHsgdGhpcy5nYW1lSW50ZXJmYWNlLnBsYXllckdvTGVmdCgpOyB9LFxuXHRcdFx0XHRtb3VzZVVwOiAoKSA9PiB7IHRoaXMuZ2FtZUludGVyZmFjZS5wbGF5ZXJTdG9wKCk7IH1cblx0XHRcdH0sXG5cdFx0XHR1cDoge1xuXHRcdFx0XHRtb3VzZURvd246ICgpID0+IHsgdGhpcy5nYW1lSW50ZXJmYWNlLnBsYXllckdvVXAoKTsgfSxcblx0XHRcdFx0bW91c2VVcDogKCkgPT4geyB0aGlzLmdhbWVJbnRlcmZhY2UucGxheWVyU3RvcCgpOyB9XG5cdFx0XHR9LFxuXHRcdFx0ZG93bjoge1xuXHRcdFx0XHRtb3VzZURvd246ICgpID0+IHsgdGhpcy5nYW1lSW50ZXJmYWNlLnBsYXllckdvRG93bigpOyB9LFxuXHRcdFx0XHRtb3VzZVVwOiAoKSA9PiB7IHRoaXMuZ2FtZUludGVyZmFjZS5wbGF5ZXJTdG9wKCk7IH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdHRoaXMuX3Nob3dTcGVlY2hEaWFsb2cgPSBmYWxzZTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgc3R5bGVzKCkge1xuXHRcdHJldHVybiBjc3NgXG5cdFx0XHQub24tc2NyZWVuLWNvbnRyb2xsZXIge1xuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XG5cdFx0XHRcdGJvdHRvbTogMHB4O1xuXHRcdFx0XHRyaWdodDogMHB4O1xuXHRcdFx0XHR1c2VyLXNlbGVjdDogbm9uZTtcblx0XHRcdFx0aGVpZ2h0OiBtaW4obWluKDUwdncsIDUwdmgpLCA0MDBweCk7XG5cdFx0XHRcdHdpZHRoOiBtaW4obWluKDUwdncsIDUwdmgpLCA0MDBweCk7XG5cdFx0XHRcdG1hcmdpbjogNXB4O1xuXHRcdFx0fVxuXHRcdFx0I3NwZWVjaC1idWJibGUge1xuXHRcdFx0XHRwb3NpdGlvbjogZml4ZWQ7XG5cdFx0XHRcdGJvdHRvbTogMjBweDtcblx0XHRcdFx0bGVmdDogMjBweDtcblx0XHRcdH1cblx0XHRcdCNjb250YWluZXIge1xuXHRcdFx0XHRoZWlnaHQ6IDEwMCU7XG5cdFx0XHRcdHdpZHRoOiAxMDAlO1xuXHRcdFx0fVxuXHRcdFx0I2dhbWUtY2FudmFzIHtcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xuXHRcdFx0XHR3aWR0aDogMTAwJTtcblx0XHRcdFx0dXNlci1zZWxlY3Q6IG5vbmU7XG5cdFx0XHRcdC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcblx0XHRcdFx0LXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcblx0XHRcdFx0LWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuXHRcdFx0XHQtbW96LXVzZXItc2VsZWN0OiBub25lO1xuXHRcdFx0XHQtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG5cdFx0XHRcdHVzZXItc2VsZWN0OiBub25lO1xuXHRcdFx0fVxuXHRcdGA7XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignZ2FtZS1zcGVlY2gnLCB0aGlzLl9oYW5kbGVTcGVlY2hFdmVudCk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2NhbnZhc1Jlc2l6ZS5iaW5kKHRoaXMpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsICh7IGtleSB9KSA9PiB7XG5cdFx0XHRzd2l0Y2ggKGtleSkge1xuXHRcdFx0XHRjYXNlIEtFWVMuQVJST1dfTEVGVDpcblx0XHRcdFx0XHR0aGlzLmdhbWVJbnRlcmZhY2UucGxheWVyR29MZWZ0KCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgS0VZUy5BUlJPV19VUDpcblx0XHRcdFx0XHR0aGlzLmdhbWVJbnRlcmZhY2UucGxheWVyR29VcCgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIEtFWVMuQVJST1dfUklHSFQ6XG5cdFx0XHRcdFx0dGhpcy5nYW1lSW50ZXJmYWNlLnBsYXllckdvUmlnaHQoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBLRVlTLkFSUk9XX0RPV046XG5cdFx0XHRcdFx0dGhpcy5nYW1lSW50ZXJmYWNlLnBsYXllckdvRG93bigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICh7IGtleSB9KSA9PiB7XG5cdFx0XHRjb25zdCBkaXJlY3Rpb25hbEtleXMgPSBbS0VZUy5BUlJPV19MRUZULCBLRVlTLkFSUk9XX1JJR0hULCBLRVlTLkFSUk9XX1VQLCBLRVlTLkFSUk9XX0RPV05dO1xuXHRcdFx0aWYgKGRpcmVjdGlvbmFsS2V5cy5pbmRleE9mKGtleSkgPj0gMCkge1xuXHRcdFx0XHR0aGlzLmdhbWVJbnRlcmZhY2UucGxheWVyU3RvcCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0X2hhbmRsZVNwZWVjaEV2ZW50KGluZm8pIHtcblx0XHRjb25zdCB7IHNob3csIHRleHQsIG5hbWUgfSA9IGluZm8uZGV0YWlsO1xuXHRcdHRoaXMuX3Nob3dTcGVlY2hEaWFsb2cgPSBzaG93O1xuXHRcdHRoaXMuX3RleHQgPSB0ZXh0O1xuXHRcdHRoaXMuX25hbWUgPSBuYW1lO1xuXHRcdHRoaXMucmVxdWVzdFVwZGF0ZSgpO1xuXHR9XG5cblx0X2NhbnZhc1Jlc2l6ZSgpIHtcblx0XHR0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXMub2Zmc2V0V2lkdGg7XG5cdFx0dGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2NhbnZhcy5vZmZzZXRIZWlnaHQ7XG5cdH1cblxuXHR1cGRhdGVkKCkge1xuXHRcdGlmICghdGhpcy5fY2FudmFzKSB7XG5cdFx0XHR0aGlzLl9jYW52YXMgPSB0aGlzLnNoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJyk7XG5cdFx0XHR0aGlzLl9jYW52YXNSZXNpemUoKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmdhbWVJbnRlcmZhY2UpIHtcblx0XHRcdHRoaXMuZ2FtZUludGVyZmFjZSA9IG5ldyBHYW1lSW50ZXJmYWNlKHRoaXMuX2NhbnZhcyk7XG5cdFx0XHR0aGlzLmdhbWVJbnRlcmZhY2Uuc3RhcnQoKTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIGh0bWxgXG5cdFx0XHQ8ZGl2IGlkPVwiY29udGFpbmVyXCI+XG5cdFx0XHRcdDxjYW52YXMgaWQ9XCJnYW1lLWNhbnZhc1wiPjwvY2FudmFzPlxuXHRcdFx0XHQ8dmlydHVhbC1jb250cm9sbGVyXG5cdFx0XHRcdFx0Y2xhc3M9XCJvbi1zY3JlZW4tY29udHJvbGxlclwiXG5cdFx0XHRcdFx0LmNsaWNrSGFuZGxlcnM9JHt0aGlzLl9jb250cm9sbGVyQ2xpY2tIYW5kbGVyc30+XG5cdFx0XHRcdDwvdmlydHVhbC1jb250cm9sbGVyPlxuXHRcdFx0XHQke3RoaXMuX3Nob3dTcGVlY2hEaWFsb2cgP1xuXHRcdFx0XHRodG1sYDx0ZXh0LWRpYWxvZ1xuXHRcdFx0XHRcdFx0aWQ9XCJzcGVlY2gtYnViYmxlXCJcblx0XHRcdFx0XHRcdHRleHQ9JHt0aGlzLl90ZXh0fVxuXHRcdFx0XHRcdFx0bmFtZT0ke3RoaXMuX25hbWV9IC8+YCA6IG51bGx9XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXHR9XG59XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2Nvb2wtZ2FtZScsIENvb2xHYW1lKTsiLCJpbXBvcnQgJy4vdmlydHVhbC1jb250cm9sbGVyLmpzJztcbmltcG9ydCAnLi9jb29sLWdhbWUuanMnO1xuaW1wb3J0ICcuL3RleHQtZGlhbG9nJzsiLCJpbXBvcnQgeyBMaXRFbGVtZW50LCBodG1sLCBjc3MsIHVuc2FmZUNTUyB9IGZyb20gJ2xpdC1lbGVtZW50JztcblxuXG5jb25zdCBQQURESU5HID0gMzA7XG5jb25zdCBGT05UX1NJWkUgPSA0NTtcbmNvbnN0IEZPTlRfRkFNSUxZID0gJ0FyaWFsJztcblxuY2xhc3MgVGV4dERpYWxvZyBleHRlbmRzIExpdEVsZW1lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50ZXh0ID0gJ1p6enp6Li4uJztcbiAgICB0aGlzLm5hbWUgPSAnSmltbXknO1xuICB9XG5cbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0OiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgbmFtZTogeyB0eXBlOiBTdHJpbmcgfVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0eWxlcygpIHtcbiAgICByZXR1cm4gY3NzYFxuICAgICAgLnNwZWVjaCB7XG4gICAgICAgIHBhZGRpbmc6ICR7dW5zYWZlQ1NTKGAke1BBRERJTkd9cHhgKX07XG4gICAgICAgIGZvbnQtc2l6ZTogJHt1bnNhZmVDU1MoYCR7Rk9OVF9TSVpFfXB4YCl9O1xuICAgICAgICBmb250LWZhbWlseTogJHt1bnNhZmVDU1MoRk9OVF9GQU1JTFkpfTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gICAgICAgIG1pbi13aWR0aDogNDBweDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgfVxuXG4gICAgICAuc3BlZWNoOmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYmFja2dyb3VuZDogI2Y3ZWRlMjtcbiAgICAgICAgaGVpZ2h0OiA2MCU7XG4gICAgICAgIHdpZHRoOiAxMDYlO1xuICAgICAgICBsZWZ0OiAtMyU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XG4gICAgICAgIHRvcDogMTAlO1xuICAgICAgICB6LWluZGV4OiAtMTtcbiAgICAgIH1cblxuICAgICAgLnNwZWVjaDphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYmFja2dyb3VuZDogI2Y3ZWRlMjtcbiAgICAgICAgd2lkdGg6IDk1JTtcbiAgICAgICAgaGVpZ2h0OiA2MCU7XG4gICAgICAgIGxlZnQ6IDIlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xuICAgICAgICB0b3A6IDMwJTtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICB9XG5cbiAgICAgIC5jb250ZW50IHtcbiAgICAgICAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbiAgICAgICAgbWF4LWhlaWdodDogMTAwcHg7XG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgICBjb2xvcjogIzg2Nzc2MDtcbiAgICAgIH1cblxuICAgICAgLm5hbWUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogLTclO1xuICAgICAgICBsZWZ0OiA3JTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgY29sb3I6ICM2NjI2MTY7XG4gICAgICAgIGZvbnQtc2l6ZTogJHt1bnNhZmVDU1MoYCR7Rk9OVF9TSVpFLzJ9cHhgKX07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICAgIGJhY2tncm91bmQ6ICNkNjgwMzM7XG4gICAgICAgIHBhZGRpbmc6IDVweCAxMHB4IDVweCAxMHB4O1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNWRlZyk7XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMudGV4dCkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzcGVlY2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj4ke3RoaXMubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj4ke3RoaXMudGV4dH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd0ZXh0LWRpYWxvZycsIFRleHREaWFsb2cpOyIsImltcG9ydCB7IExpdEVsZW1lbnQsIHN2ZyAgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5jbGFzcyBWaXJ0dWFsQ29udHJvbGxlciBleHRlbmRzIExpdEVsZW1lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY2xpY2tlZE9wYWNpdHkgPSAxO1xuICAgIHRoaXMuX2RlZmF1bHRPcGFjaXR5ID0gMC40O1xuICAgIHRoaXMuX2ZpbGwgPSAnI2Y3ZWRlMic7XG4gICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4gZW50cnkudGFyZ2V0LnJlc2l6ZWRDYWxsYmFjaygpKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGlja0hhbmRsZXJzOiB7IHR5cGU6IE9iamVjdCB9XG4gICAgfTtcbiAgfVxuXG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9yZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcyk7XG4gIH1cblxuICByZXNpemVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XG4gIH1cblxuICBfbW91c2VEb3duSGFuZGxlcihldmVudCwgZGlyKSB7XG4gICAgc3dpdGNoIChkaXIpIHtcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICB0aGlzLmNsaWNrSGFuZGxlcnMubGVmdC5tb3VzZURvd24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVycy5yaWdodC5tb3VzZURvd24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgdGhpcy5jbGlja0hhbmRsZXJzLmRvd24ubW91c2VEb3duKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXAnOlxuICAgICAgICB0aGlzLmNsaWNrSGFuZGxlcnMudXAubW91c2VEb3duKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywgdGhpcy5fY2xpY2tlZE9wYWNpdHkpO1xuICB9XG5cbiAgX21vdXNlVXBIYW5kbGVyKGV2ZW50LCBkaXIpIHtcbiAgICBzd2l0Y2ggKGRpcikge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVycy5sZWZ0Lm1vdXNlVXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVycy5yaWdodC5tb3VzZVVwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVycy5kb3duLm1vdXNlVXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1cCc6XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVycy51cC5tb3VzZVVwKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywgdGhpcy5fZGVmYXVsdE9wYWNpdHkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCByYWRpdXMgPSBoZWlnaHQvMjtcbiAgICBjb25zdCBidXR0b25TaXplID0gaGVpZ2h0LzM7XG4gICAgY29uc3QgYnV0dG9ucyA9IFtcbiAgICAgIHsgZGlyOiAndXAnLCB4OiB3aWR0aC8zLCB5OiAwIH0sXG4gICAgICB7IGRpcjogJ2Rvd24nLCB4OiB3aWR0aC8zLCB5OiAyKmhlaWdodC8zIH0sXG4gICAgICB7IGRpcjogJ3JpZ2h0JywgeDogMip3aWR0aC8zLCB5OiBoZWlnaHQvMyB9LFxuICAgICAgeyBkaXI6ICdsZWZ0JywgeDogMCwgeTogaGVpZ2h0LzMgfVxuICAgIF07XG4gICAgcmV0dXJuIHN2Z2BcbiAgICAgIDxzdmdcbiAgICAgICAgdmlld0JveD1cIjAgMCAke3dpZHRofSAke2hlaWdodH1cIlxuICAgICAgICB3aWR0aD1cIiR7d2lkdGh9XCJcbiAgICAgICAgaGVpZ2h0PVwiJHtoZWlnaHR9XCJcbiAgICAgID5cbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgPGNsaXBQYXRoIGlkPVwiY2lyY2xlLWNsaXBcIj5cbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIke3dpZHRoLzJ9XCIgY3k9XCIke2hlaWdodC8yfVwiIHI9XCIke3JhZGl1c31cIiAvPlxuICAgICAgICAgIDwvY2xpcFBhdGg+XG4gICAgICA8L2RlZnM+XG4gICAgICAke2J1dHRvbnMubWFwKGIgPT5cbiAgICAgICAgc3ZnYFxuICAgICAgICAgIDxyZWN0XG4gICAgICAgICAgICBjbGFzcz1cImJ1dHRvbi1kaXJlY3Rpb25cIlxuICAgICAgICAgICAgQG1vdXNlZG93bj0keyhlKSA9PiB7IHRoaXMuX21vdXNlRG93bkhhbmRsZXIoZSwgYi5kaXIpOyB9fVxuICAgICAgICAgICAgQG1vdXNldXA9JHsoZSkgPT4geyB0aGlzLl9tb3VzZVVwSGFuZGxlcihlLCBiLmRpcik7IH19XG4gICAgICAgICAgICBAdG91Y2hzdGFydD0keyhlKSA9PiB7IHRoaXMuX21vdXNlRG93bkhhbmRsZXIoZSwgYi5kaXIpOyB9fVxuICAgICAgICAgICAgQHRvdWNoZW5kPSR7KGUpID0+IHsgdGhpcy5fbW91c2VVcEhhbmRsZXIoZSwgYi5kaXIpOyB9fVxuICAgICAgICAgICAgY2xpcC1wYXRoPVwidXJsKCNjaXJjbGUtY2xpcClcIlxuICAgICAgICAgICAgeD1cIiR7Yi54fVwiXG4gICAgICAgICAgICB5PVwiJHtiLnl9XCJcbiAgICAgICAgICAgIG9wYWNpdHk9XCIke3RoaXMuX2RlZmF1bHRPcGFjaXR5fVwiXG4gICAgICAgICAgICB3aWR0aD1cIiR7YnV0dG9uU2l6ZX1cIlxuICAgICAgICAgICAgaGVpZ2h0PVwiJHtidXR0b25TaXplfVwiXG4gICAgICAgICAgICBmaWxsPVwiJHt0aGlzLl9maWxsfVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgYFxuICAgICAgKX1cbiAgICA8L3N2Zz5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndmlydHVhbC1jb250cm9sbGVyJywgVmlydHVhbENvbnRyb2xsZXIpOyIsImltcG9ydCB7XG4gIEdhbWUsXG4gIEVuZ2luZSxcbiAgQ29udHJvbGxlcixcbiAgQ2FtZXJhLFxuICBEaXNwbGF5LFxuICBHYW1lTWFwXG59IGZyb20gJy4vcGFydHMvaW5kZXguanMnO1xuXG5pbXBvcnQgeyBXT1JMRCB9IGZyb20gJy4vcGFydHMvYXNzZXQtaW5mby5qcyc7XG5cbmV4cG9ydCBjbGFzcyBHYW1lSW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3IoY2FudmFzKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgX2Rpc3BhdGNoRXZlbnQoZGV0YWlsKSB7XG4gICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdnYW1lLXNwZWVjaCcsIHtcbiAgICAgIGRldGFpbCxcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjb21wb3NlZDogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMuY2FudmFzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5fY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKCk7XG4gICAgY29uc3QgeyBjYW1lcmFXaWR0aCwgY2FtZXJhSGVpZ2h0IH0gPSB0aGlzLl9jb21wdXRlQ2FtZXJhRGltZW5zaW9ucygpO1xuICAgIHRoaXMuX2dhbWVNYXAgPSBuZXcgR2FtZU1hcChXT1JMRCwgY2FtZXJhV2lkdGgsIGNhbWVyYUhlaWdodCk7XG4gICAgY29uc3QgeyBjYW1lcmFYLCBjYW1lcmFZIH0gPSB0aGlzLl9jb21wdXRlQ2FtZXJhSW5pdFBvc2l0aW9uKGNhbWVyYVdpZHRoLCBjYW1lcmFIZWlnaHQpO1xuICAgIHRoaXMuX2NhbWVyYSA9IG5ldyBDYW1lcmEoY2FtZXJhV2lkdGgsIGNhbWVyYUhlaWdodCwgY2FtZXJhWCwgY2FtZXJhWSk7XG4gICAgdGhpcy5fZGlzcGxheSA9IG5ldyBEaXNwbGF5KHRoaXMuY2FudmFzLCB0aGlzLl9nYW1lTWFwLCB0aGlzLl9jYW1lcmEsIGNhbWVyYVdpZHRoLCBjYW1lcmFIZWlnaHQpO1xuICAgIHRoaXMuX2dhbWUgPSBuZXcgR2FtZSh0aGlzLl9nYW1lTWFwLCB0aGlzLl9jYW1lcmEsIHRoaXMuX2Rpc3BhdGNoRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fZW5naW5lID0gbmV3IEVuZ2luZSh0aGlzLl9yZW5kZXIuYmluZCh0aGlzKSwgdGhpcy5fdXBkYXRlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgX2NvbXB1dGVDYW1lcmFEaW1lbnNpb25zKCkge1xuICAgIGNvbnN0IHsgY2FtZXJhU2l6ZSB9ID0gV09STEQ7XG4gICAgbGV0IHJhdGlvV2lkdGgsIHJhdGlvSGVpZ2h0O1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGhlaWdodCA+IHdpZHRoKSB7XG4gICAgICByYXRpb1dpZHRoID0gMTtcbiAgICAgIHJhdGlvSGVpZ2h0ID0gaGVpZ2h0L3dpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICByYXRpb0hlaWdodCA9IDE7XG4gICAgICByYXRpb1dpZHRoID0gd2lkdGgvaGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgY2FtZXJhSGVpZ2h0OiBjYW1lcmFTaXplKnJhdGlvSGVpZ2h0LFxuICAgICAgY2FtZXJhV2lkdGg6IGNhbWVyYVNpemUqcmF0aW9XaWR0aFxuICAgIH07XG4gIH1cblxuICBfY29tcHV0ZUNhbWVyYUluaXRQb3NpdGlvbihjYW1lcmFXaWR0aCwgY2FtZXJhSGVpZ2h0KSB7XG4gICAgY29uc3QgZmlyc3RQb3NpdGlvbiA9IHRoaXMuX2dhbWVNYXAuc3RhcnRQb3NpdGlvbnNbdGhpcy5fZ2FtZU1hcC5zdGFydFBvc2l0aW9ucy5sZW5ndGggLSAxXTtcbiAgICB0aGlzLl9nYW1lTWFwLnN0YXJ0UG9zaXRpb25zLnBvcCgpO1xuICAgIHJldHVybiB7XG4gICAgICBjYW1lcmFYOiBmaXJzdFBvc2l0aW9uWzBdIC0gY2FtZXJhV2lkdGgvMixcbiAgICAgIGNhbWVyYVk6IGZpcnN0UG9zaXRpb25bMV0gLSBjYW1lcmFIZWlnaHQvMlxuICAgIH07XG4gIH1cblxuICBfcmVuZGVyKCkge1xuICAgIHRoaXMuX2Rpc3BsYXkuZHJhd01hcCgwKTtcbiAgICB0aGlzLl9kaXNwbGF5LmRyYXdDaGFyYWN0ZXJzKHRoaXMuX2dhbWUuZ2V0Q2hhcmFjdGVyc0Rpc3BsYXlJbmZvKCkpO1xuICAgIHRoaXMuX2Rpc3BsYXkuZHJhd01hcCgxKTtcbiAgICB0aGlzLl9kaXNwbGF5LmRpc3BsYXlTY29yZSh0aGlzLl9nYW1lLmdldFNjb3JlKCkpO1xuICAgIHRoaXMuX2Rpc3BsYXkucmVuZGVyKCk7XG4gIH1cblxuICBwbGF5ZXJHb0xlZnQoKSB7XG4gICAgdGhpcy5fY29udHJvbGxlci5zZXRBY3RpdmVEaXJlY3Rpb24oJ2xlZnQnKTtcbiAgfVxuXG4gIHBsYXllckdvUmlnaHQoKSB7XG4gICAgdGhpcy5fY29udHJvbGxlci5zZXRBY3RpdmVEaXJlY3Rpb24oJ3JpZ2h0Jyk7XG4gIH1cblxuICBwbGF5ZXJHb1VwKCkge1xuICAgIHRoaXMuX2NvbnRyb2xsZXIuc2V0QWN0aXZlRGlyZWN0aW9uKCd1cCcpO1xuICB9XG5cbiAgcGxheWVyR29Eb3duKCkge1xuICAgIHRoaXMuX2NvbnRyb2xsZXIuc2V0QWN0aXZlRGlyZWN0aW9uKCdkb3duJyk7XG4gIH1cblxuICBwbGF5ZXJTdG9wKCkge1xuICAgIHRoaXMuX2NvbnRyb2xsZXIuc2V0QWN0aXZlRGlyZWN0aW9uKG51bGwpO1xuICB9XG5cbiAgX3VwZGF0ZSgpIHtcbiAgICB0aGlzLl9nYW1lLnVwZGF0ZSgpO1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuX2NvbnRyb2xsZXIuZ2V0QWN0aXZlRGlyZWN0aW9uKCk7XG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICB0aGlzLl9nYW1lLm1vdmVMZWZ0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICB0aGlzLl9nYW1lLm1vdmVSaWdodCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgdGhpcy5fZ2FtZS5tb3ZlVXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgdGhpcy5fZ2FtZS5tb3ZlRG93bigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX2dhbWUuc2V0SWRsZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLl9lbmdpbmUuc3RhcnQoKTtcbiAgfVxufSIsIi8qKlxuICogTWl4aW4gdGhhdCBjb250YWlucyB0aGUgY29tbW9uIGNvbGxpc2lvbiBkZXRlY3Rpb25cbiAqIG1ldGhvZHMuXG4gKiB0aGlzLl9wb2ludENvbGxpc2lvbiBpcyBzcGVjaWZpYyB0byB0aGUgY2xhc3MgdXNpbmcgdGhpcyBtaXhpbi5cbiAqIEZvciBpbnN0YW5jZTpcbiAqIC0gbnBjOiBfcG9pbnRDb2xsaXNpb24gPSBpcyB3aXRoaW4gbnBjIGJvdW5kYXJ5XG4gKiAtIG1hcDogX3BvaW50Q29sbGlzaW9uID0gaXMgd2l0aGluIGFueSBvZiB0aGUgb2JzdGFjbGUgb2YgdGhlIG1hcFxuICogQHBhcmFtIHsqfSBiYXNlIC0gYmFzZSBjbGFzcyB0byBleHRlbnRcbiAqL1xuY29uc3QgQ29sbGlzaW9uRGV0ZWN0b3IgPSBiYXNlID0+IHtcblx0cmV0dXJuIGNsYXNzIGV4dGVuZHMgYmFzZSB7XG5cdFx0Y29uc3RydWN0b3IoY29uZmlnKSB7XG5cdFx0XHRzdXBlcihjb25maWcpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIENoZWNrcyB3aGV0aGVyIHBvaW50cyBvZiBhIHNlZ21lbnRcblx0XHQgKiBjb2xsaWRlcyB3aXRoIG9ic3RhY2xlcyB1c2luZyBfcG9pbnREZXRlY3Rpb25cblx0XHQgKiBMb29wcyBhbG9uZyB0aGUgY29uc3RhbnQgY29vcmRpbmF0ZVxuXHRcdCAqIEBwYXJhbSB7Kn0gY29uc3RhbnRDb29yZFxuXHRcdCAqIEBwYXJhbSB7Kn0gc3RhcnRDb29yZFxuXHRcdCAqIEBwYXJhbSB7Kn0gbGVuZ3RoXG5cdFx0ICogQHBhcmFtIHsqfSBpc0hvcml6b250YWxcblx0XHQgKi9cblx0XHRfc2VnbWVudENvbGxpc2lvbihjb25zdGFudENvb3JkLCBzdGFydENvb3JkLCBsZW5ndGgsIGlzSG9yaXpvbnRhbCkge1xuXHRcdFx0bGV0IGNvbGxpc2lvbiA9IGZhbHNlO1xuXHRcdFx0bGV0IGluY3JlbWVudCA9IDE7IC8vIGluIHB4XG5cdFx0XHRmb3IobGV0IGkgPSBzdGFydENvb3JkOyBpIDwgc3RhcnRDb29yZCArIGxlbmd0aCA7IGkrPSBpbmNyZW1lbnQpIHtcblx0XHRcdFx0Y29sbGlzaW9uID0gY29sbGlzaW9uIHx8XG5cdFx0XHRcdFx0KGlzSG9yaXpvbnRhbCA/IHRoaXMuX3BvaW50Q29sbGlzaW9uKGksIGNvbnN0YW50Q29vcmQpIDogdGhpcy5fcG9pbnRDb2xsaXNpb24oY29uc3RhbnRDb29yZCwgaSkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNvbGxpc2lvbjtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBEZXRlY3RzIHdoZXRoZXIgYSBmb3JlaWduIG9iamVjdCBkZWZpbmVkIGJ5IGEgcmVjdDpcblx0XHQgKiAoeCx5KSBpcyB0aGUgdG9wIGxlZnQgY29ybmVyIGFuZCB3aWR0aCBhbmQgd2lnaHRcblxuXHRcdCBcdFx0XHRcdFx0XHRmb3JlaWduIG9iamVjdFxuXHRcdFx0KHgseSkgLT4gICstLS0tLS0tLS0tLSsgPC0gKHggKyB3aWR0aCwgeSlcblx0XHRcdFx0XHRcdFx0XHR8ICAgICAgICAgICB8XG5cdFx0XHRcdFx0XHRcdFx0fCAgICAgICAgICAgfFxuXHRcdFx0XHRcdFx0XHRcdHwgICAgICAgICAgIHxcblx0XHRcdFx0XHRcdFx0XHQrLS0tLS0tLS0tLS0rIDwtICh4ICsgd2lkdGgsIHkgKyBoZWlnaHQpXG5cdFx0XHRcdFx0XHRcdFx0IDwtIHdpZHRoIC0+XG5cblx0XHQgKiBoYXMgb25lIG9mIGl0cyBmb3VyIHNpZGUgY29sbGlkaW5nIHdpdGggb25lIG9mIHRoZSBvYnRhY2xlXG5cdFx0ICogQHBhcmFtIHsqfSB4XG5cdFx0ICogQHBhcmFtIHsqfSB5XG5cdFx0ICogQHBhcmFtIHsqfSB3aWR0aFxuXHRcdCAqIEBwYXJhbSB7Kn0gaGVpZ2h0XG5cdFx0ICogQHBhcmFtIHsqfSBvZmZzZXRcblx0XHQgKi9cblx0XHRjb2xsaXNpb24oIHgsIHksIHdpZHRoLCBoZWlnaHQsIG9mZnNldCApIHtcblx0XHRcdC8vIHJpZ2h0XG5cdFx0XHRjb25zdCBjb25zdGFudFhSaWdodCA9IHggKyB3aWR0aCArIG9mZnNldDtcblx0XHRcdGNvbnN0IHJpZ2h0ID0gdGhpcy5fc2VnbWVudENvbGxpc2lvbihjb25zdGFudFhSaWdodCwgeSwgaGVpZ2h0LCBmYWxzZSk7XG5cblx0XHRcdC8vIGxlZnRcblx0XHRcdGNvbnN0IGNvbnN0YW50WExlZnQgPSB4IC0gb2Zmc2V0O1xuXHRcdFx0Y29uc3QgbGVmdCA9IHRoaXMuX3NlZ21lbnRDb2xsaXNpb24oY29uc3RhbnRYTGVmdCwgeSwgaGVpZ2h0LCBmYWxzZSk7XG5cblx0XHRcdC8vIHRvcFxuXHRcdFx0Y29uc3QgY29uc3RhbnRZVG9wID0geSAtIG9mZnNldDtcblx0XHRcdGNvbnN0IHRvcCA9IHRoaXMuX3NlZ21lbnRDb2xsaXNpb24oY29uc3RhbnRZVG9wLCB4LCB3aWR0aCwgdHJ1ZSk7XG5cblx0XHRcdC8vIGJvdHRvbVxuXHRcdFx0Y29uc3QgY29uc3RhbnRZQm90dG9tID0geSArIGhlaWdodCArIG9mZnNldDtcblx0XHRcdGNvbnN0IGJvdHRvbSA9IHRoaXMuX3NlZ21lbnRDb2xsaXNpb24oY29uc3RhbnRZQm90dG9tLCB4LCB3aWR0aCwgdHJ1ZSk7XG5cblx0XHRcdHJldHVybiB7IGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSB9O1xuXHRcdH1cblx0fTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxpc2lvbkRldGVjdG9yOyIsImNvbnN0IEltYWdlTG9hZGVyID0gYmFzZSA9PiB7XG4gICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgYmFzZSB7XG4gICAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcbiAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gY29uZmlnLnNyYztcbiAgICAgIH1cblxuICAgICAgZ2V0SW1hZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZTtcbiAgICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlTG9hZGVyOyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgSW1hZ2VMb2FkZXIgfSBmcm9tICcuL2ltYWdlLWxvYWRlci5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFN0YXRlSGFuZGxlciB9IGZyb20gJy4vc3RhdGUtaGFuZGxlci5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENvbGxpc2lvbkRldGVjdG9yIH0gZnJvbSAnLi9jb2xsaXNpb24tZGV0ZWN0b3IuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNdWx0aU1peGlucyB9IGZyb20gJy4vbXVsdGktbWl4aW5zLmpzJzsiLCJmdW5jdGlvbiBNdWx0aU1peGlucyhtaXhpbnMpIHtcbiAgbGV0IF9taXhpbnMgPSBtaXhpbnM7XG4gIGlmICghQXJyYXkuaXNBcnJheShtaXhpbnMpKSB7XG4gICAgX21peGlucyA9IFsgbWl4aW5zIF07XG4gIH1cblxuICBsZXQgX2NsYXNzID0gY2xhc3Mge307XG4gIF9taXhpbnMuZm9yRWFjaChtaXhpbiA9PiB7XG4gICAgX2NsYXNzID0gbWl4aW4oX2NsYXNzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIF9jbGFzcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXVsdGlNaXhpbnM7IiwiaW1wb3J0IEZyYW1lQW5pbWF0b3IgZnJvbSAnLi4vdXRpbHMvZnJhbWUtYW5pbWF0b3InO1xuXG5jb25zdCBTdGF0ZUhhbmRsZXIgPSBiYXNlID0+IHtcbiAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgYmFzZSB7XG4gICAgY29uc3RydWN0b3IoYXNzZXRJbmZvKSB7XG4gICAgICBzdXBlcihhc3NldEluZm8pO1xuICAgICAgdGhpcy5fbW92ZVNlcXVlbmNlcyA9IGFzc2V0SW5mby5tb3ZlU2VxdWVuY2VzO1xuICAgICAgdGhpcy5fYWN0aW9ucyA9IE9iamVjdC5rZXlzKGFzc2V0SW5mby5tb3ZlU2VxdWVuY2VzKTtcbiAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgIHRoaXMuX3RpbWVyID0gMDtcbiAgICAgIHRoaXMuX2RlbGF5ID0gYXNzZXRJbmZvLmRlbGF5O1xuICAgICAgdGhpcy5fZnJhbWVBbmltYXRvciA9IG5ldyBGcmFtZUFuaW1hdG9yKGFzc2V0SW5mbywgdGhpcy5fc3RhdGUpO1xuICAgIH1cblxuICAgIF9pbml0KCkge1xuICAgICAgdGhpcy5fc3RhdGUgPSB7XG4gICAgICAgIGFjdGlvbjogdGhpcy5fYWN0aW9uc1swXSxcbiAgICAgICAgYWN0aW9uU2VxdWVuY2VJbmRleDoge31cbiAgICAgIH07XG4gICAgICB0aGlzLl9hY3Rpb25zLmZvckVhY2goYWN0aW9uID0+IHtcbiAgICAgICAgdGhpcy5fc3RhdGUuYWN0aW9uU2VxdWVuY2VJbmRleFthY3Rpb25dID0gMDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIF91cGRhdGVTdGF0ZShuZXdBY3Rpb24pIHtcbiAgICAgIGlmICh0aGlzLl9zdGF0ZS5hY3Rpb24gIT09IG5ld0FjdGlvbikge1xuICAgICAgICAvLyBpZiBuZXcgYWN0aW9uLCB3ZSByZXNldCB0aGUgdGltZXJcbiAgICAgICAgdGhpcy5fdGltZXIgPSAwO1xuICAgICAgICAvLyB1cGRhdGUgY3VycmVudCBhY3Rpb25cbiAgICAgICAgdGhpcy5fc3RhdGUuYWN0aW9uID0gbmV3QWN0aW9uO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2VxdWVuY2VMZW4gPSB0aGlzLl9tb3ZlU2VxdWVuY2VzW25ld0FjdGlvbl0ubGVuZ3RoO1xuICAgICAgLy8gdGltZXIgaXMgdXAgPT4gZ28gdG8gdGhlIG5leHQgZnJhbWUgZnJvbSB0aGUgc2VxdWVuY2VcbiAgICAgIGlmICh0aGlzLl90aW1lciA+PSB0aGlzLl9kZWxheSkge1xuICAgICAgICB0aGlzLl90aW1lciA9IDA7XG4gICAgICAgIC8vIGluY3JlbWVudCB0aGUgY3VycmVudCBhY3Rpb25cbiAgICAgICAgdGhpcy5fc3RhdGUuYWN0aW9uU2VxdWVuY2VJbmRleFtuZXdBY3Rpb25dID0gKHRoaXMuX3N0YXRlLmFjdGlvblNlcXVlbmNlSW5kZXhbbmV3QWN0aW9uXSArIDEpICUgc2VxdWVuY2VMZW47XG4gICAgICB9XG4gICAgICB0aGlzLl90aW1lcisrO1xuICAgIH1cblxuICAgIGdldE1vdmVTdGF0ZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjdGlvbjogdGhpcy5fc3RhdGUuYWN0aW9uLFxuICAgICAgICBzZXF1ZW5jZUluZGV4OiB0aGlzLl9zdGF0ZS5hY3Rpb25TZXF1ZW5jZUluZGV4W3RoaXMuX3N0YXRlLmFjdGlvbl1cbiAgICAgIH07XG4gICAgfVxuXG4gIFx0Z2V0Q3VycmVudEZyYW1lKCkge1xuICBcdFx0Y29uc3QgeyBhY3Rpb24sIHNlcXVlbmNlSW5kZXggfSA9IHRoaXMuZ2V0TW92ZVN0YXRlKCk7XG4gIFx0XHRyZXR1cm4gdGhpcy5fZnJhbWVBbmltYXRvci5nZXRDdXJyZW50RnJhbWUoYWN0aW9uLCBzZXF1ZW5jZUluZGV4KTtcbiAgXHR9XG5cbiAgXHRtb3ZlUmlnaHQoKSB7XG4gIFx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnd2Fsa19yaWdodCcpO1xuICBcdH1cblxuICBcdG1vdmVMZWZ0KCkge1xuICBcdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ3dhbGtfbGVmdCcpO1xuICBcdH1cblxuICBcdG1vdmVVcCgpIHtcbiAgXHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCd3YWxrX3VwJyk7XG4gIFx0fVxuXG4gIFx0bW92ZURvd24oKSB7XG4gIFx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnd2Fsa19kb3duJyk7XG4gIFx0fVxuXG4gIFx0ZmFjZShkaXJlY3Rpb24pIHtcbiAgXHRcdHJldHVybiB0aGlzLl9zdGF0ZS5hY3Rpb24uaW5kZXhPZihkaXJlY3Rpb24pID49MDtcbiAgXHR9XG5cbiAgXHRzZXRJZGxlKCkge1xuICBcdFx0aWYgKHRoaXMuZmFjZSgncmlnaHQnKSkgdGhpcy5fdXBkYXRlU3RhdGUoJ2lkbGVfcmlnaHQnKTtcbiAgXHRcdGlmICh0aGlzLmZhY2UoJ2xlZnQnKSkgdGhpcy5fdXBkYXRlU3RhdGUoJ2lkbGVfbGVmdCcpO1xuICBcdFx0aWYgKHRoaXMuZmFjZSgndXAnKSkgdGhpcy5fdXBkYXRlU3RhdGUoJ2lkbGVfdXAnKTtcbiAgXHRcdGlmICh0aGlzLmZhY2UoJ2Rvd24nKSkgdGhpcy5fdXBkYXRlU3RhdGUoJ2lkbGVfZG93bicpO1xuICBcdH1cbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRlSGFuZGxlcjsiLCJleHBvcnQgY29uc3QgV09STEQgPSB7XG4gIHNyYzogJy4vYXNzZXRzL2dhcmRlbl93aXRoX29jZWFuLnBuZycsXG4gIGNvbHM6IDE2LFxuICByb3dzOiAxNixcbiAgc2l6ZTogNjQsIC8vIHRpbGUgc2l6ZVxuICB1bmlxdWVLZXlzOiB7XG4gICAgY29pbjogNyxcbiAgICBncmFzczogMSxcbiAgICB0cmVlX2JvdHRvbTogMyxcbiAgICB0cmVlX3RvcDogNCxcbiAgICBwYXRoOiAyLFxuICAgIG9jZWFuOiA2LFxuICAgIGJ1c2g6IDVcbiAgfSxcbiAgZWxlbWVudHM6IHtcbiAgICB0cmVlOiB7XG4gICAgICBsYXllcnM6IFsgMyBdLCAvLyB0aWxlIGluZGV4IGluIHRoZSBpbWFnZVxuICAgICAgdG9wOiA0LCAvLyB0aWxlIGluZGV4IGluIHRoZSBpbWFnZVxuICAgICAga2V5OiAzIC8vIGtleSBpbiBwbGF5YWJsZUFyZWFLZXlzXG4gICAgfSxcbiAgICBncmFzczoge1xuICAgICAgbGF5ZXJzOiBbIDEgXSwgLy8gdGlsZSBpbmRleCBpbiB0aGUgaW1hZ2VcbiAgICAgIGtleTogMSAvLyBrZXkgaW4gcGxheWFibGVBcmVhS2V5c1xuICAgIH0sXG4gICAgcGF0aDoge1xuICAgICAgbGF5ZXJzOiBbIDIgXSwgLy8gdGlsZSBpbmRleCBpbiB0aGUgaW1hZ2VcbiAgICAgIGtleTogMiAvLyBrZXkgaW4gcGxheWFibGVBcmVhS2V5c1xuICAgIH0sXG4gICAgY29pbl9vbl9ncmFzczoge1xuICAgICAgbGF5ZXJzOiBbIDEsIDcgXSwgLy8gdGlsZSBpbmRleCBpbiB0aGUgaW1hZ2VcbiAgICAgIGtleTogNCAvLyBrZXkgaW4gcGxheWFibGVBcmVhS2V5c1xuICAgIH0sXG4gICAgY29pbl9vbl9wYXRoOiB7XG4gICAgICBsYXllcnM6IFsgMiwgNyBdLCAvLyB0aWxlIGluZGV4IGluIHRoZSBpbWFnZVxuICAgICAga2V5OiA3IC8vIGtleSBpbiBwbGF5YWJsZUFyZWFLZXlzXG4gICAgfSxcbiAgICBvY2Vhbjoge1xuICAgICAgbGF5ZXJzOiBbIDYgXSwgLy8gdGlsZSBpbmRleCBpbiB0aGUgaW1hZ2VcbiAgICAgIGtleTogNiAvLyBrZXkgaW4gcGxheWFibGVBcmVhS2V5c1xuICAgIH0sXG4gICAgYnVzaDoge1xuICAgICAgbGF5ZXJzOiBbIDEsIDUgXSwgIC8vIHRpbGUgaW5kZXggaW4gdGhlIGltYWdlXG4gICAgICBrZXk6IDUgLy8ga2V5IGluIHBsYXlhYmxlQXJlYUtleXNcbiAgICB9LFxuICAgIHN0YXJ0X3Bvc2l0aW9uOiB7XG4gICAgICBsYXllcnM6IFsgMSBdLFxuICAgICAga2V5OiAtMVxuICAgIH1cbiAgfSxcbiAgY2FtZXJhU2l6ZTogNzAwLFxuICBvYnN0YWNsZXM6IG5ldyBTZXQoWyAzLCA2LCA1IF0pLCAvLyBrZXlzIGhlcmVcbiAgcGxheWFibGVBcmVhS2V5czogW1xuICAgIDMsIDMsIDMsIDMsIDMsIDMsIDMsIDMsIDMsIDMsIDMsIDMsIDMsIDMsIDMsIDMsXG4gICAgMywgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMyxcbiAgICAzLCA0LCA0LCA0LCA0LCAxLCA0LCAxLCAxLCAxLCA0LCAxLCAxLCA0LCAxLCAzLFxuICAgIDMsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIC0xLCAxLCAxLCAzLCAxLCAzLFxuICAgIDMsIDEsIC0xLCA1LCAxLCAxLCAxLCAzLCAxLCAxLCAxLCA0LCA0LCAxLCAxLCAzLFxuICAgIDMsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDMsXG4gICAgMywgMSwgMSwgMSwgNCwgMSwgMSwgMywgMSwgMSwgNSwgMSwgMSwgMSwgMSwgMyxcbiAgICAzLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAzLFxuICAgIDMsIDEsIDUsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDQsIDEsIDUsIDEsIDEsIDMsXG4gICAgMywgMSwgMSwgMSwgMSwgMSwgMSwgMiwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMyxcbiAgICAzLCAxLCA0LCAtMSwgNCwgMSwgMSwgMiwgMiwgMSwgMSwgMSwgMSwgMSwgMSwgMyxcbiAgICAzLCAxLCAxLCAxLCAxLCA1LCAxLCAyLCAyLCAxLCAxLCA0LCAxLCAxLCAxLCAzLFxuICAgIDMsIDEsIDQsIDEsIDEsIDEsIDEsIDcsIDIsIDEsIDEsIDEsIDEsIDQsIDEsIDMsXG4gICAgMywgMSwgMywgNCwgMSwgMSwgNCwgMiwgMiwgMSwgMSwgMSwgLTEsIDEsIDMsIDMsXG4gICAgMywgNCwgMSwgLTEsIDEsIDEsIDEsIDIsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDMsXG4gICAgMywgMywgMywgMywgMywgMywgMywgMiwgMiwgMywgMywgMywgMywgMywgMywgM1xuICBdXG59O1xuXG5leHBvcnQgY29uc3QgUExBWUVSID0ge1xuICBzcmM6ICcuL2Fzc2V0cy9tb2kucG5nJyxcbiAgY29sczogNCxcbiAgcm93czogNCxcbiAgd2lkdGg6IDM2LCAvLyB0aWxlIHNpemVcbiAgaGVpZ2h0OiA0OCwgLy8gdGlsZSBzaXplXG4gIG1vdmVTZXF1ZW5jZXM6IHtcbiAgICAnaWRsZV9kb3duJzpbIFsgMCwgMCBdIF0sIC8vIGluaXRpYWwgc3RhdGVcbiAgICAnd2Fsa19kb3duJzogWyBbIDEsIDAgXSwgWyAyLCAwIF0sIFsgMywgMCBdIF0sXG4gICAgJ3dhbGtfbGVmdCc6IFsgWyAxLCAxIF0sIFsgMiwgMSBdLCBbIDMsIDEgXSBdLFxuICAgICdpZGxlX2xlZnQnOlsgWyAwLDEgXSBdLFxuICAgICd3YWxrX3VwJzogWyBbIDEsIDIgXSwgWyAyLCAyIF0sIFsgMywgMiBdIF0sXG4gICAgJ2lkbGVfdXAnOlsgWyAwLDIgXSBdLFxuICAgICd3YWxrX3JpZ2h0JzogWyBbIDEsIDMgXSwgWyAyLCAzIF0sIFsgMywgMyBdIF0sXG4gICAgJ2lkbGVfcmlnaHQnOlsgWyAwLDMgXSBdXG4gIH0sXG4gIGRlbGF5OiA1XG59O1xuXG5leHBvcnQgY29uc3QgQ0FUID0ge1xuICBzcmM6ICcuL2Fzc2V0cy9jYXQtZnJhbWVzLnBuZycsXG4gIGNvbHM6IDIsXG4gIHJvd3M6IDEsXG4gIHNpemU6IDQwLCAvLyB0aWxlIHNpemVcbiAgbW92ZVNlcXVlbmNlczoge1xuICAgICdpZGxlX2Rvd24nOiBbIFsgMSwgMCBdLCBbIDEsIDMgXSBdLCAgLy8gaW5pdGlhbCBzdGF0ZVxuICAgICdpZGxlX3VwJzogWyBbIDQsIDAgXSwgWyA0LCAzIF0gXSxcbiAgICAnaWRsZV9sZWZ0JzogWyBbIDIsIDAgXSwgWyAyLCAzIF0gXSxcbiAgICAnaWRsZV9yaWdodCc6IFsgWyAzLCAwIF0sIFsgMywgMyBdIF0sXG4gICAgJ3dhbGtfdXAnOiBbIFsgNCwgMSBdLCBbIDQsIDIgXSBdLFxuICAgICd3YWxrX3JpZ2h0JzogWyBbIDMsIDEgXSwgWyAzLCAwIF0sICBbIDMsIDIgXSwgWyAzLCAzIF0gXSxcbiAgICAnd2Fsa19sZWZ0JzogWyBbIDIsIDEgXSwgWyAyLCAwIF0sICBbIDIsIDIgXSwgWyAyLCAzIF0gXSxcbiAgICAnd2Fsa19kb3duJzogWyBbIDEsIDEgXSwgWyAxLCAwIF0sIFsgMSwgMiBdLCBbIDEsIDMgXSBdXG4gIH0sXG4gIGRlbGF5OiAxMFxufTtcblxuZXhwb3J0IGNvbnN0IENBVDIgPSB7XG4gIHNyYzogJy4vYXNzZXRzL2NhdC1mcmFtZXMtMi5wbmcnLFxuICBjb2xzOiAyLFxuICByb3dzOiAxLFxuICBzaXplOiA0MCwgLy8gdGlsZSBzaXplXG4gIG1vdmVTZXF1ZW5jZXM6IHtcbiAgICAnaWRsZV9kb3duJzogWyBbIDEsIDAgXSwgWyAxLCAzIF0gXSwgIC8vIGluaXRpYWwgc3RhdGVcbiAgICAnaWRsZV91cCc6IFsgWyA0LCAwIF0sIFsgNCwgMyBdIF0sXG4gICAgJ2lkbGVfbGVmdCc6IFsgWyAyLCAwIF0sIFsgMiwgMyBdIF0sXG4gICAgJ2lkbGVfcmlnaHQnOiBbIFsgMywgMCBdLCBbIDMsIDMgXSBdLFxuICAgICd3YWxrX3VwJzogWyBbIDQsIDEgXSwgWyA0LCAyIF0gXSxcbiAgICAnd2Fsa19yaWdodCc6IFsgWyAzLCAxIF0sIFsgMywgMCBdLCAgWyAzLCAyIF0sIFsgMywgMyBdIF0sXG4gICAgJ3dhbGtfbGVmdCc6IFsgWyAyLCAxIF0sIFsgMiwgMCBdLCAgWyAyLCAyIF0sIFsgMiwgMyBdIF0sXG4gICAgJ3dhbGtfZG93bic6IFsgWyAxLCAxIF0sIFsgMSwgMCBdLCBbIDEsIDIgXSwgWyAxLCAzIF0gXVxuICB9LFxuICBkZWxheTogMTBcbn07XG5cbmV4cG9ydCBjb25zdCBDQVQzID0ge1xuICBzcmM6ICcuL2Fzc2V0cy9jYXQtZnJhbWVzLTMucG5nJyxcbiAgY29sczogMixcbiAgcm93czogMSxcbiAgc2l6ZTogNDAsIC8vIHRpbGUgc2l6ZVxuICBtb3ZlU2VxdWVuY2VzOiB7XG4gICAgJ2lkbGVfZG93bic6IFsgWyAxLCAwIF0sIFsgMSwgMyBdIF0sICAvLyBpbml0aWFsIHN0YXRlXG4gICAgJ2lkbGVfdXAnOiBbIFsgNCwgMCBdLCBbIDQsIDMgXSBdLFxuICAgICdpZGxlX2xlZnQnOiBbIFsgMiwgMCBdLCBbIDIsIDMgXSBdLFxuICAgICdpZGxlX3JpZ2h0JzogWyBbIDMsIDAgXSwgWyAzLCAzIF0gXSxcbiAgICAnd2Fsa191cCc6IFsgWyA0LCAxIF0sIFsgNCwgMiBdIF0sXG4gICAgJ3dhbGtfcmlnaHQnOiBbIFsgMywgMSBdLCBbIDMsIDAgXSwgIFsgMywgMiBdLCBbIDMsIDMgXSBdLFxuICAgICd3YWxrX2xlZnQnOiBbIFsgMiwgMSBdLCBbIDIsIDAgXSwgIFsgMiwgMiBdLCBbIDIsIDMgXSBdLFxuICAgICd3YWxrX2Rvd24nOiBbIFsgMSwgMSBdLCBbIDEsIDAgXSwgWyAxLCAyIF0sIFsgMSwgMyBdIF1cbiAgfSxcbiAgZGVsYXk6IDEwXG59O1xuXG5leHBvcnQgY29uc3QgQ0FUNCA9IHtcbiAgc3JjOiAnLi9hc3NldHMvY2F0LWZyYW1lcy00LnBuZycsXG4gIGNvbHM6IDIsXG4gIHJvd3M6IDEsXG4gIHNpemU6IDQwLCAvLyB0aWxlIHNpemVcbiAgbW92ZVNlcXVlbmNlczoge1xuICAgICdpZGxlX2Rvd24nOiBbIFsgMSwgMCBdLCBbIDEsIDMgXSBdLCAgLy8gaW5pdGlhbCBzdGF0ZVxuICAgICdpZGxlX3VwJzogWyBbIDQsIDAgXSwgWyA0LCAzIF0gXSxcbiAgICAnaWRsZV9sZWZ0JzogWyBbIDIsIDAgXSwgWyAyLCAzIF0gXSxcbiAgICAnaWRsZV9yaWdodCc6IFsgWyAzLCAwIF0sIFsgMywgMyBdIF0sXG4gICAgJ3dhbGtfdXAnOiBbIFsgNCwgMSBdLCBbIDQsIDIgXSBdLFxuICAgICd3YWxrX3JpZ2h0JzogWyBbIDMsIDEgXSwgWyAzLCAwIF0sICBbIDMsIDIgXSwgWyAzLCAzIF0gXSxcbiAgICAnd2Fsa19sZWZ0JzogWyBbIDIsIDEgXSwgWyAyLCAwIF0sICBbIDIsIDIgXSwgWyAyLCAzIF0gXSxcbiAgICAnd2Fsa19kb3duJzogWyBbIDEsIDEgXSwgWyAxLCAwIF0sIFsgMSwgMiBdLCBbIDEsIDMgXSBdXG4gIH0sXG4gIGRlbGF5OiAxMFxufTtcblxuZXhwb3J0IGNvbnN0IE9DRUFOID0ge1xuICBzcmM6ICcuL2Fzc2V0cy9vY2Vhbi1mb3VyLWZyYW1lcy5wbmcnLFxuICBjb2xzOiAzLFxuICByb3dzOiAxLFxuICBzaXplOiA2MyxcbiAgbW92ZW1lbnQ6ICd3YXZlJyxcbiAgbW92ZVNlcXVlbmNlczoge1xuICAgICd3YXZlJzogWyBbIDAsMCBdLCBbIDAsIDEgXSwgWyAwLCAyIF0sIFsgMCwgMyBdIF1cbiAgfSxcbiAgZGVsYXk6IDUwXG59O1xuXG5leHBvcnQgY29uc3QgQ09JTiA9IHtcbiAgc3JjOiAnLi9hc3NldHMvY29pbi5wbmcnLFxuICBjb2xzOiA4LFxuICByb3dzOiAxLFxuICBzaXplOiAxNixcbiAgbW92ZW1lbnQ6ICdyb3RhdGUnLFxuICBtb3ZlU2VxdWVuY2VzOiB7XG4gICAgJ3JvdGF0ZSc6IFsgWyAwLDAgXSwgWyAwLCAxIF0sIFsgMCwgMiBdLCBbIDAsIDMgXSwgWyAwLCA0IF0sIFsgMCwgNSBdLCBbIDAsIDYgXSwgWyAwLCA3IF0gXVxuICB9LFxuICBkZWxheTogN1xufTtcblxuXG4iLCJjb25zdCBDQU1FUkFfU1BFRUQgPSA1O1xuXG4vKipcbiAqIG1hcCAtIGluc3RhbmNlIG9mIEdhbWVNYXBcbiAqL1xuY2xhc3MgQ2FtZXJhIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5zcGVlZCA9IENBTUVSQV9TUEVFRDtcbiAgICB0aGlzLnN0b3AgPSB7XG4gICAgICByaWdodDogZmFsc2UsXG4gICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgIHVwOiBmYWxzZSxcbiAgICAgIGRvd246IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIG1vdmVSaWdodCgpIHtcbiAgICBpZiAodGhpcy5zdG9wLnJpZ2h0KSByZXR1cm47XG4gICAgdGhpcy54ICs9IDE7XG4gIH1cblxuICBtb3ZlTGVmdCgpIHtcbiAgICBpZiAodGhpcy5zdG9wLmxlZnQpIHJldHVybjtcbiAgICB0aGlzLnggLT0gMTtcbiAgfVxuXG4gIG1vdmVVcCgpIHtcbiAgICBpZiAodGhpcy5zdG9wLnVwKSByZXR1cm47XG4gICAgdGhpcy55IC09IDE7XG4gIH1cblxuICBtb3ZlRG93bigpIHtcbiAgICBpZiAodGhpcy5zdG9wLmRvd24pIHJldHVybjtcbiAgICB0aGlzLnkgKz0gMTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuc3RvcC5yaWdodCA9IGZhbHNlO1xuICAgIHRoaXMuc3RvcC5sZWZ0ID0gZmFsc2U7XG4gICAgdGhpcy5zdG9wLnVwID0gZmFsc2U7XG4gICAgdGhpcy5zdG9wLmRvd24gPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW1lcmE7IiwiY2xhc3MgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2FjdGl2ZURpcmVjdGlvbiA9IG51bGw7XG4gIH1cblxuICBzZXRBY3RpdmVEaXJlY3Rpb24oZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5fYWN0aXZlRGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB9XG5cbiAgZ2V0QWN0aXZlRGlyZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVEaXJlY3Rpb247XG4gIH1cblxuICBpc0lkbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZURpcmVjdGlvbiA9PT0gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyOyIsImltcG9ydCBNb3ZpbmdFbGVtZW50IGZyb20gJy4vbW92aW5nLWVsZW1lbnQuanMnO1xuaW1wb3J0IHsgT0NFQU4sIENPSU4gfSBmcm9tICcuL2Fzc2V0LWluZm8uanMnO1xuXG5jb25zdCB0ZXN0U3RyaW5nID0gJ0hlbGxvJztcbmNvbnN0IGV4cGVjdGVkV2l0aFdpdGhGb250ID0gMTY5O1xuXG5jbGFzcyBEaXNwbGF5IHtcbiAgY29uc3RydWN0b3IoY2FudmFzLCBtYXAsIGNhbWVyYSwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuX21hcCA9IG1hcDtcbiAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYTtcbiAgICB0aGlzLl9pbml0KCk7XG4gICAgdGhpcy5fY3JlYXRlQnVmZmVyQ2FudmFzKGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb2Zmc2NyZWVuIGNhbnZhcyB3aGVyZSBlbGVtZW50cyB3aWxsIGJlIGRyYXduXG4gICAqIG9uZSBhZnRlciB0aGUgb3RoZXIsIGJlZm9yZSByZW5kZXJpbmcgdGhlIHdob2xlIHRoaW5nIG9uIHRoZVxuICAgKiBvbnNjcmVlbiBjYW52YXNcbiAgICogQHBhcmFtIHsqfSB3aWR0aFxuICAgKiBAcGFyYW0geyp9IGhlaWdodFxuICAgKi9cbiAgX2NyZWF0ZUJ1ZmZlckNhbnZhcyh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5idWZmZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLFxuICAgICAgdGhpcy5idWZmZXIuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5idWZmZXIuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX21hcEltYWdlID0gdGhpcy5fbWFwLmdldEltYWdlKCk7XG4gICAgdGhpcy5fdGlsZVNpemUgPSB0aGlzLl9tYXAuc2l6ZTtcbiAgICB0aGlzLl9vY2VhbiA9IG5ldyBNb3ZpbmdFbGVtZW50KE9DRUFOKTtcbiAgICB0aGlzLl9jb2luID0gbmV3IE1vdmluZ0VsZW1lbnQoQ09JTik7XG4gIH1cblxuICBkcmF3Q2hhcmFjdGVycyhwbGF5ZXJzKSB7XG4gICAgZm9yIChjb25zdCBwbGF5ZXIgb2YgcGxheWVycykge1xuICAgICAgdGhpcy5kcmF3Q2hhcmFjdGVyKHBsYXllcik7XG4gICAgfVxuICB9XG5cbiAgZHJhd0NoYXJhY3Rlcih7IGltYWdlLCBmcmFtZSwgeCwgeSwgd2lkdGgsIGhlaWdodCB9KSB7XG4gICAgLy8gdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gJ3JlZCc7XG4gICAgLy8gdGhpcy5idWZmZXIuZmlsbFJlY3QoXG4gICAgLy8gICB4LFxuICAgIC8vICAgeSxcbiAgICAvLyAgIHdpZHRoLFxuICAgIC8vICAgaGVpZ2h0XG4gICAgLy8gKTtcbiAgICB0aGlzLmJ1ZmZlci5kcmF3SW1hZ2UoXG4gICAgICBpbWFnZSxcbiAgICAgIC4uLmZyYW1lLFxuICAgICAgeCxcbiAgICAgIHksXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodFxuICAgICk7XG4gIH1cblxuICBfZHJhd09jZWFuKHgsIHkpIHtcbiAgICB0aGlzLmJ1ZmZlci5kcmF3SW1hZ2UoXG4gICAgICB0aGlzLl9vY2Vhbi5nZXRJbWFnZSgpLCAvLyBpbWFnZVxuICAgICAgLi4udGhpcy5fb2NlYW4uZ2V0Q3VycmVudEZyYW1lKCksXG4gICAgICB4LCAvLyB0YXJnZXQgeFxuICAgICAgeSwgLy8gdGFyZ2V0IHlcbiAgICAgIHRoaXMuX3RpbGVTaXplLCAvLyB0YXJnZXQgd2lkdGhcbiAgICAgIHRoaXMuX3RpbGVTaXplIC8vIHRhcmdldCBoZWlnaHRcbiAgICApO1xuICB9XG5cbiAgX2RyYXdDb2luKHgsIHksIHNpemUpIHtcbiAgICB0aGlzLmJ1ZmZlci5kcmF3SW1hZ2UoXG4gICAgICB0aGlzLl9jb2luLmdldEltYWdlKCksIC8vIGltYWdlXG4gICAgICAuLi50aGlzLl9jb2luLmdldEN1cnJlbnRGcmFtZSgpLFxuICAgICAgeCwgLy8gdGFyZ2V0IHhcbiAgICAgIHksIC8vIHRhcmdldCB5XG4gICAgICAoc2l6ZSB8fCB0aGlzLl9jb2luLnNpemUpLCAvLyB0YXJnZXQgd2lkdGhcbiAgICAgIChzaXplIHx8IHRoaXMuX2NvaW4uc2l6ZSkgLy8gdGFyZ2V0IGhlaWdodFxuICAgICk7XG4gIH1cblxuXG4gIGRyYXdNYXAobGF5ZXIpIHtcbiAgICB0aGlzLl9vY2Vhbi51cGRhdGVNb3ZlbWVudCgpO1xuICAgIHRoaXMuX2NvaW4udXBkYXRlTW92ZW1lbnQoKTtcbiAgICBjb25zdCBzdGFydENvbCA9IE1hdGguZmxvb3IodGhpcy5jYW1lcmEueCAvIHRoaXMuX3RpbGVTaXplKTtcbiAgICBjb25zdCBlbmRDb2wgPSBzdGFydENvbCArIE1hdGguZmxvb3IodGhpcy5jYW1lcmEud2lkdGggLyB0aGlzLl90aWxlU2l6ZSkgKyAxO1xuICAgIGNvbnN0IHN0YXJ0Um93ID0gTWF0aC5mbG9vcih0aGlzLmNhbWVyYS55IC8gdGhpcy5fdGlsZVNpemUpO1xuICAgIGNvbnN0IGVuZFJvdyA9IHN0YXJ0Um93ICsgTWF0aC5mbG9vcih0aGlzLmNhbWVyYS5oZWlnaHQgLyB0aGlzLl90aWxlU2l6ZSkgKyAxO1xuICAgIGZvciAobGV0IGNvbCA9IHN0YXJ0Q29sOyBjb2wgPD0gZW5kQ29sOyBjb2wrKykge1xuICAgICAgZm9yIChsZXQgcm93ID0gc3RhcnRSb3c7IHJvdyA8PSBlbmRSb3c7IHJvdysrKSB7XG4gICAgICAgIHZhciB4ID0gTWF0aC5mbG9vcihjb2wgKiB0aGlzLl90aWxlU2l6ZSAtIHRoaXMuY2FtZXJhLngpO1xuICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3Iocm93ICogdGhpcy5fdGlsZVNpemUgLSB0aGlzLmNhbWVyYS55KTtcbiAgICAgICAgY29uc3QgY3VycmVudFRpbGUgPSB0aGlzLl9tYXAuZ2V0VGlsZShsYXllciwgY29sLCByb3cpO1xuICAgICAgICBzd2l0Y2ggKGN1cnJlbnRUaWxlKSB7XG4gICAgICAgICAgY2FzZSB0aGlzLl9tYXAudW5pcXVlS2V5cy5vY2VhbjpcbiAgICAgICAgICAgIHRoaXMuX2RyYXdPY2Vhbih4LCB5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdGhpcy5fbWFwLnVuaXF1ZUtleXMuY29pbjpcbiAgICAgICAgICAgIGNvbnN0IF94ID0gdGhpcy5fdGlsZVNpemUgLyAyIC0gdGhpcy5fY29pbi5zaXplIC8gMiArIHg7XG4gICAgICAgICAgICBjb25zdCBfeSA9IHRoaXMuX3RpbGVTaXplIC8gMiAtIHRoaXMuX2NvaW4uc2l6ZSAvIDIgKyB5O1xuICAgICAgICAgICAgdGhpcy5fZHJhd0NvaW4oX3gsIF95KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLl9kcmF3TWFwRWxlbWVudChjdXJyZW50VGlsZSwgeCwgeSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9kcmF3TWFwRWxlbWVudCh0aWxlSW5kZXgsIHgsIHkpIHtcbiAgICB0aGlzLmJ1ZmZlci5kcmF3SW1hZ2UoXG4gICAgICB0aGlzLl9tYXBJbWFnZSwgLy8gaW1hZ2VcbiAgICAgICh0aWxlSW5kZXggLSAxKSAqIHRoaXMuX3RpbGVTaXplLCAvLyBzb3VyY2UgeFxuICAgICAgMCwgLy8gc291cmNlIHlcbiAgICAgIHRoaXMuX3RpbGVTaXplLCAvLyBzb3VyY2Ugd2lkdGhcbiAgICAgIHRoaXMuX3RpbGVTaXplLCAvLyBzb3VyY2UgaGVpZ2h0XG4gICAgICB4LCAvLyB0YXJnZXQgeFxuICAgICAgeSwgLy8gdGFyZ2V0IHlcbiAgICAgIHRoaXMuX3RpbGVTaXplLCAvLyB0YXJnZXQgd2lkdGhcbiAgICAgIHRoaXMuX3RpbGVTaXplIC8vIHRhcmdldCBoZWlnaHRcbiAgICApO1xuICB9XG5cbiAgZGlzcGxheVNjb3JlKHNjb3JlKSB7XG4gICAgdGhpcy5idWZmZXIuZm9udCA9ICc0OHB4IEJ1bmdlZSBJbmxpbmUnO1xuICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9ICcjZmZmJztcbiAgICBpZiAoTWF0aC5mbG9vcih0aGlzLmJ1ZmZlci5tZWFzdXJlVGV4dCh0ZXN0U3RyaW5nKS53aWR0aCkgIT09IGV4cGVjdGVkV2l0aFdpdGhGb250KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1hcmdpbiA9IDEwO1xuICAgIGNvbnN0IG9mZnNldCA9IDU7XG4gICAgY29uc3QgY29pblNpemUgPSB0aGlzLl90aWxlU2l6ZSAvIDI7XG4gICAgY29uc3QgY29pblggPSBtYXJnaW47XG4gICAgY29uc3QgY29pblkgPSA1MCAtIGNvaW5TaXplIC0gMTtcbiAgICB0aGlzLmJ1ZmZlci5maWxsVGV4dChgw5cgJHtzY29yZX1gLCBjb2luU2l6ZSArIGNvaW5YICsgb2Zmc2V0LCA1MCk7XG4gICAgdGhpcy5fZHJhd0NvaW4oY29pblgsIGNvaW5ZLCBjb2luU2l6ZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcbiAgICAgIHRoaXMuYnVmZmVyLmNhbnZhcyxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgdGhpcy5idWZmZXIuY2FudmFzLndpZHRoLFxuICAgICAgdGhpcy5idWZmZXIuY2FudmFzLmhlaWdodCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCxcbiAgICAgIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXNwbGF5OyIsImNsYXNzIEVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKHJlbmRlciwgdXBkYXRlKSB7XG4gICAgdGhpcy5hbmltYXRlZEZyYW1lUmVxdWVzdDtcbiAgICB0aGlzLnRpY2tMZW5ndGggPSAxMDAwLzYwO1xuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xuICB9XG5cbiAgcnVuKHRGcmFtZSkge1xuICAgIC8vIHRoZW9yaWNhbCBuZXh0IHRpY2tcbiAgICBjb25zdCBuZXh0VGljayA9IHRoaXMubGFzdFRpY2sgKyB0aGlzLnRpY2tMZW5ndGg7XG4gICAgbGV0IG51bVRpY2tzID0gMDtcblxuICAgIC8vIHdlJ3JlIGxhdGUsIGxldCdzIGNvdW50IHRoZSB0aWNrcyB3ZSBtaXNzZWRcbiAgICBpZiAodEZyYW1lID4gbmV4dFRpY2spIHtcbiAgICAgIG51bVRpY2tzID0gTWF0aC5mbG9vcigodEZyYW1lIC0gdGhpcy5sYXN0VGljaykgLyB0aGlzLnRpY2tMZW5ndGgpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFuIHVwZGF0ZSBmb3IgZWFjaCB0aWNrIHdlIG1pc3NlZFxuICAgIGZvciAobGV0IGk9MDsgaTxudW1UaWNrczsgaSsrKSB7XG4gICAgICB0aGlzLmxhc3RUaWNrID0gdGhpcy5sYXN0VGljayArIHRoaXMudGlja0xlbmd0aDtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgICB0aGlzLmFuaW1hdGVkRnJhbWVSZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmhhbmRsZVJ1bik7XG5cbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMubGFzdFRpY2sgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB0aGlzLmhhbmRsZVJ1biA9ICh0KSA9PiB0aGlzLnJ1bih0KTtcbiAgICB0aGlzLmFuaW1hdGVkRnJhbWVSZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmhhbmRsZVJ1bik7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGVkRnJhbWVSZXF1ZXN0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFbmdpbmU7IiwiaW1wb3J0IHsgSW1hZ2VMb2FkZXIsIE11bHRpTWl4aW5zLCBDb2xsaXNpb25EZXRlY3RvciB9IGZyb20gJy4uL21peGlucy9pbmRleC5qcyc7XG5cbmNvbnN0IEJPUkRFUl9DT05URU5UID0gNjtcblxuY2xhc3MgR2FtZU1hcCBleHRlbmRzIE11bHRpTWl4aW5zKFsgSW1hZ2VMb2FkZXIsIENvbGxpc2lvbkRldGVjdG9yIF0pIHtcblx0Y29uc3RydWN0b3IoYXNzZXRJbmZvLCBjYW1lcmFXaWR0aCwgY2FtZXJhSGVpZ2h0KSB7XG5cdFx0c3VwZXIoYXNzZXRJbmZvKTtcblx0XHRmb3IgKGNvbnN0IFsgcHJvcCwgdmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhhc3NldEluZm8pKSB7XG5cdFx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG5cdFx0XHR0aGlzW3Byb3BdID0gdmFsdWU7XG5cdFx0fVxuXHRcdHRoaXMuYm9yZGVyTGVuZ3RoID0gTWF0aC5jZWlsKE1hdGgubWF4KGNhbWVyYUhlaWdodCwgY2FtZXJhV2lkdGgpIC8gKDIqYXNzZXRJbmZvLnNpemUpKTtcblx0XHR0aGlzLl9idWlsZENvbXBsZXRlTWFwKCk7XG5cdFx0dGhpcy5fYnVpbGRDb2xpc2lvbk1hcCgpO1xuXHR9XG5cblx0Z2V0VGlsZShsYXllciA9IDAsIGNvbCwgcm93KSB7XG5cdFx0cmV0dXJuIHRoaXMubGF5ZXJzW2xheWVyXVtyb3cgKiB0aGlzLmNvbHMgKyBjb2xdO1xuXHR9XG5cblx0Z2V0IHdpZHRoKCkge1xuXHRcdHJldHVybiB0aGlzLnNpemUgKiB0aGlzLnJvd3M7XG5cdH1cblxuXHRnZXQgaGVpZ2h0KCkge1xuXHRcdHJldHVybiB0aGlzLnNpemUgKiB0aGlzLmNvbHM7XG5cdH1cblxuXHQvKipcblx0ICogQnVpbGRzIHRoZSBmdWxsIG1hcCwgYSBzcXVhcmUgb2YgdGlsZXMsIHdoaWNoIGluY2x1ZGVzOlxuXHQgKiAtIHRoZSBwbGF5YWJsZSBhcmVhIGluIHRoZSBjZW50ZXJcblx0ICogLSBhIGJvcmRlciwgbm9uIHBsYXlhYmxlIGFyb3VuZCB0aGUgcGxheWFibGUgYXJlYVxuXHQgKi9cblx0X2J1aWxkQ29tcGxldGVNYXAoKSB7XG5cdFx0dGhpcy5fYnVpbGRCb3R0b21MYXllcigpO1xuXHRcdHRoaXMuX2J1aWxkVG9wTGF5ZXIoKTtcblx0fVxuXG5cdFx0LyoqXG5cdCAqIEJ1aWxkcyB0aGUgZnVsbCBtYXAsIGEgc3F1YXJlIG9mIHRpbGVzLCB3aGljaCBpbmNsdWRlczpcblx0ICogLSB0aGUgcGxheWFibGUgYXJlYSBpbiB0aGUgY2VudGVyXG5cdCAqIC0gYSBib3JkZXIsIG5vbiBwbGF5YWJsZSBhcm91bmQgdGhlIHBsYXlhYmxlIGFyZWFcblx0ICovXG5cdF9idWlsZEJvdHRvbUxheWVyKCkge1xuXHRcdHRoaXMuZW50aXJlTWFwT2ZLZXlzID0gdGhpcy5fYWRkQm9yZGVyKHRoaXMucGxheWFibGVBcmVhS2V5cywgdGhpcy5yb3dzLCB0aGlzLmNvbHMsIHRoaXMuYm9yZGVyTGVuZ3RoLCB0aGlzLmVsZW1lbnRzLm9jZWFuLmtleSk7XG5cdFx0Y29uc3QgbWFwV2l0aFRpbGVJbmRpY2VzID0gdGhpcy5lbnRpcmVNYXBPZktleXMubWFwKGtleSA9PiB7XG5cdFx0XHRjb25zdCBtYXBFbGVtZW50ID0gT2JqZWN0LnZhbHVlcyh0aGlzLmVsZW1lbnRzKS5maWx0ZXIoZSA9PiBlLmtleSA9PT0ga2V5KVswXTtcblx0XHRcdHJldHVybiBtYXBFbGVtZW50LmxheWVyc1swXTtcblx0XHR9KTtcblx0XHR0aGlzLmxheWVycyA9IFsgbWFwV2l0aFRpbGVJbmRpY2VzIF07XG5cdFx0dGhpcy5yb3dzID0gdGhpcy5yb3dzICsgMiAqIHRoaXMuYm9yZGVyTGVuZ3RoOyAvLyBuZXcgbnVtYmVyIG9mIHJvd3Mgb2YgdGhlIGZ1bGwgbWFwXG5cdFx0dGhpcy5jb2xzID0gdGhpcy5jb2xzICsgMiAqIHRoaXMuYm9yZGVyTGVuZ3RoOyAvLyBuZXcgbnVtYmVyIG9mIGNvbHVtbnMgb2YgdGhlIGZ1bGwgbWFwXG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDb21wbGV0ZXMgdGhlIG1hcCB3aXRoIHRoZSB0b3AgbGF5ZXJzIGZvciBlbGVtZW50c1xuXHQgKiB0aGF0IGhhdmUgMiBzdGFja2VkIGxheWVyc1xuXHQgKiBBbHNvIGtlZXBzIHRyYWNrIG9mIHRoZSBncmFzcyBwb3NpdGlvbnMgZm9yIGxhdGVyIHVzZSBpbiB0aGUgR2FtZSBjbGFzcy5cblx0ICovXG5cdF9idWlsZFRvcExheWVyKCkge1xuXHRcdGxldCB0b3BMYXllciA9IG5ldyBBcnJheSh0aGlzLnJvd3MqdGhpcy5jb2xzKS5maWxsKDApO1xuXHRcdHRoaXMuc3RhcnRQb3NpdGlvbnMgPSBbXTtcblx0XHR0aGlzLmVudGlyZU1hcE9mS2V5cy5mb3JFYWNoKChrZXksIGkpID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9nZXRFbGVtZW50QnlLZXkoa2V5KTtcblx0XHRcdGlmIChrZXkgPT09IHRoaXMuZWxlbWVudHMuc3RhcnRfcG9zaXRpb24ua2V5KSB7XG5cdFx0XHRcdHRoaXMuc3RhcnRQb3NpdGlvbnMucHVzaChbXG5cdFx0XHRcdFx0TWF0aC5mbG9vcihpIC8gdGhpcy5yb3dzKSAqIHRoaXMuc2l6ZSwgLy8geFxuXHRcdFx0XHRcdChpICUgdGhpcy5yb3dzKSAqIHRoaXMuc2l6ZVxuXHRcdFx0XHRdKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gdGlsZSBhYm92ZSB0aGUgY3VycmVudCB0aWxlIG9uIHRoZSB0b3AgbGF5ZXJcblx0XHRcdGlmIChlbGVtZW50LnRvcCkge1xuXHRcdFx0XHR0b3BMYXllcltpIC0gdGhpcy5yb3dzXSA9IGVsZW1lbnQudG9wO1xuXHRcdFx0fVxuXHRcdFx0Ly8gc2FtZSB0aWxlIGluZGV4IG9uIHRvcCBsYXllclxuXHRcdFx0aWYgKGVsZW1lbnQubGF5ZXJzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0dG9wTGF5ZXJbaV0gPSBlbGVtZW50LmxheWVyc1sxXTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLmxheWVyc1sxXSA9IHRvcExheWVyO1xuXHR9XG5cblxuXHQvKipcblx0ICogQnVpbGRzIGFuIGFycmF5IHRoYXQgY29udGFpbiB0aGUgc2FtZSBudW1iZXIgb2YgZWxlbWVudHNcblx0ICogYXMgdGhlIG1hcCB0aGlzLmxheWVyWzBdIGFuZCB0aGlzLmxheWVyWzFdLlxuXHQgKiBGaWxsZWQgd2l0aCAwcyBhbmQgMXMuXG5cdCAqIDAgbWVhbnMgbm8gY29sbGlzaW9uXG5cdCAqIDEgbWVhbnMgY29sbGlzaW9uXG5cdCAqL1xuXHRfYnVpbGRDb2xpc2lvbk1hcCgpIHtcblx0XHR0aGlzLl9jb2xsaXNpb25NYXAgPSB0aGlzLmVudGlyZU1hcE9mS2V5cy5tYXAoZSA9PiB7XG5cdFx0XHRpZiAodGhpcy5vYnN0YWNsZXMuaGFzKGUpKSByZXR1cm4gIDE7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50ICh4LHkpIGJlbG9uZ3MgdG8gYSB0aWxlXG5cdCAqIG1hcmtlZCBhcyBhbiBvYnN0YWNsZSBvbiB0aGUgbWFwLiBmYWxzZSBvdGhlcndpc2UuXG5cdCAqIEBwYXJhbSB7Kn0geFxuXHQgKiBAcGFyYW0geyp9IHlcblx0ICovXG5cdF9wb2ludENvbGxpc2lvbih4LCB5KSB7XG5cdFx0Y29uc3QgY29sID0gTWF0aC5mbG9vcih4IC8gdGhpcy5zaXplKTtcblx0XHRjb25zdCByb3cgPSBNYXRoLmZsb29yKHkgLyB0aGlzLnNpemUpO1xuXHRcdGNvbnN0IGlzT2JzdGFjbGUgPSBCb29sZWFuKHRoaXMuX2NvbGxpc2lvbk1hcFtyb3cgKiB0aGlzLmNvbHMgKyBjb2xdKTtcblx0XHRpZiAoaXNPYnN0YWNsZSkge1xuXHRcdFx0Y29uc3Qgb2JzdGFjbGUgPSB7XG5cdFx0XHRcdHg6IGNvbCp0aGlzLnNpemUsXG5cdFx0XHRcdHk6IHJvdyp0aGlzLnNpemUsXG5cdFx0XHRcdHdpZHRoOiB0aGlzLnNpemUsXG5cdFx0XHRcdGhlaWdodDogdGhpcy5zaXplXG5cdFx0XHR9O1xuXHRcdFx0Y29uc3Qgb2Zmc2V0ID0gMjtcblx0XHRcdGNvbnN0IGNvbGxpc2lvbiA9ICB4ID49IChvYnN0YWNsZS54ICsgb2Zmc2V0KSAmJlxuXHRcdFx0eCA8PSAob2JzdGFjbGUueCArIG9ic3RhY2xlLndpZHRoIC0gb2Zmc2V0KSAmJlxuXHRcdFx0eSA+PSAob2JzdGFjbGUueSArIG9mZnNldCkgJiZcblx0XHRcdHkgPD0gKG9ic3RhY2xlLnkgKyBvYnN0YWNsZS5oZWlnaHQgLSBvZmZzZXQpO1xuXHRcdFx0cmV0dXJuIGNvbGxpc2lvbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdF9nZXRFbGVtZW50QnlLZXkoa2V5KSB7XG5cdFx0cmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5lbGVtZW50cykuZmlsdGVyKGVsID0+IGtleSA9PT0gZWwua2V5KVswXTtcblx0fVxuXG5cdGNoZWNrQW5kSGlkZUNvaW5zKHsgeCwgeSB9LCBjYWxsYmFjaykge1xuXHRcdGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoeCAvIHRoaXMuc2l6ZSk7XG5cdFx0Y29uc3Qgcm93ID0gTWF0aC5mbG9vcih5IC8gdGhpcy5zaXplKTtcblx0XHRjb25zdCBlbGVtZW50Rm91bmQgPSB0aGlzLmxheWVyc1sxXVsgcm93ICogdGhpcy5jb2xzICsgY29sIF07XG5cdFx0Y29uc3QgY29pbktleSA9IHRoaXMudW5pcXVlS2V5cy5jb2luO1xuXHRcdGlmIChlbGVtZW50Rm91bmQgPT09IGNvaW5LZXkpIHtcblx0XHRcdHRoaXMubGF5ZXJzWzFdW3JvdyAqIHRoaXMuY29scyArIGNvbF0gPSAwO1xuXHRcdFx0Y2FsbGJhY2soKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTG9ncyBhbiBhcnJheSBpbiB0aGUgc2hhcGUgb2YgYSBzcXVhcmVcblx0ICogQHBhcmFtIHsqfSBnYW1lIC0gYXJyYXkgb2YgbnVtYmVyc1xuXHQgKiBAcGFyYW0geyp9IG51bU9mUm93cyAtIG51bWJlciBvZiByb3dzIG9mIHRoZSBzcXVhcmUgdG8gcHJpbnRcblx0ICovXG5cdF9wcmV0dHlQcmludChnYW1lLCBudW1PZlJvd3MpIHtcblx0XHRsZXQgcHJldHR5U3RyaW5nID0gJ1xcbic7XG5cdFx0bGV0IGkgPSAwO1xuXHRcdGdhbWUuZm9yRWFjaChlID0+IHtcblx0XHRcdGlmIChpID09PSBudW1PZlJvd3MpIHtcblx0XHRcdFx0cHJldHR5U3RyaW5nICs9ICdcXG4nO1xuXHRcdFx0XHRpID0gMDtcblx0XHRcdH1cblx0XHRcdHByZXR0eVN0cmluZyArPSBTdHJpbmcoZSkgKyAnICAnO1xuXHRcdFx0aSsrO1xuXHRcdH0pO1xuXHRcdHByZXR0eVN0cmluZyArPSAnXFxuJztcblx0fVxuXG5cblx0LyoqXG5cdCAqIFRoaXMgbWV0aG9kIHRha2VzIGEgc3F1YXJlIG9mIHRpbGVzIHRoYXQgaXMgcmVwcmVzZW50ZWQgYnkgYW4gYXJyYXkgb2YgbnVtYmVyc1xuXHQgKiBhbmQgcmV0dXJucyBhIGJpZ2dlciBhcnJheSB0aGF0IGlzIHRoZSBmaXJzdCBvbmUgd2l0aCBleHRyYSByb3dzIGFuZCBjb2x1bW5zIGFyb3VuZC5cblx0ICpcblx0ICogRXhhbXBsZTpcblx0ICpcblx0ICogcGxheWFibGVHYW1lOlxuXHQgKiBbXG5cdCAqICAxLCAxLCAxLFxuXHQgKiAgMSwgMSwgMSxcblx0ICogIDEsIDEsIDFcblx0ICogXVxuXHQgKiBudW1Sb3dzID0gbnVtQ29scyA9IDMgKGRpbWVuc2lvbiBvZiBwbGF5YWJsZUdhbWUpXG5cdCAqIGJvcmRlckxlbiA9IDJcblx0ICogZmlsbE51bWJlciA9IDlcblx0ICpcblx0ICogb3V0cHV0OlxuXHQgKiBbXG5cdCAqICA5LCA5LCA5LCA5LCA5LCA5LCA5XG5cdCAqICA5LCA5LCA5LCA5LCA5LCA5LCA5XG5cdCAqICA5LCA5LCAxLCAxLCAxLCA5LCA5XG5cdCAqICA5LCA5LCAxLCAxLCAxLCA5LCA5XG5cdCAqICA5LCA5LCAxLCAxLCAxLCA5LCA5XG5cdCAqICA5LCA5LCA5LCA5LCA5LCA5LCA5XG5cdCAqICA5LCA5LCA5LCA5LCA5LCA5LCA5XG5cdCAqIF1cblx0ICpcblx0ICogdGhlIHBsYXlhYmxlR2FtZSBpcyBzdXJvdW5kZWQgYnkgMiAoPWJvcmRlckxlbikgcm93cy9jb2x1bW5zIG9mIDkgKGZpbGxOdW1iZXIpXG5cdCAqXG5cdCAqIEBwYXJhbSB7Kn0gcGxheWFibGVHYW1lIC0gYXJyYXkgdGhhdCByZXByZXNlbnQgdGhlIHBsYXlhYmxlIGFyZWFcblx0ICogQHBhcmFtIHsqfSBudW1Sb3dzIC0gbnVtYmVyIG9mIHJvd3Mgb2YgdGhlIHBsYXlhYmxlIGFyZWFcblx0ICogQHBhcmFtIHsqfSBudW1Db2xzIC0gbnVtYmVyIG9mIGNvbHVtbnMgb2YgdGhlIHBsYXlhYmxlIGFyZWFcblx0ICogQHBhcmFtIHsqfSBib3JkZXJMZW4gLSB0aGUgYm9yZGVyIHdpZHRoIChpbiBudW1iZXIgb2Ygcm93L2NvbHVtbikgdG8gYWRkIGFsbCBhcm91bmQgdGhlIHBsYXlhYmxlIGFyZWFcblx0ICogQHBhcmFtIHsqfSBmaWxsTnVtYmVyIC0gdGhlIGNvbnRlbnQgb2YgdGhlIGJvcmRlclxuXHQgKi9cblx0X2FkZEJvcmRlcihwbGF5YWJsZUdhbWUsIG51bVJvd3MsIG51bUNvbHMsIGJvcmRlckxlbiwgZmlsbE51bWJlcikge1xuXHRcdGxldCBuZXdHYW1lID0gW107XG5cdFx0Y29uc3QgbmV3Um93TGVuID0gbnVtUm93cyArIDIqYm9yZGVyTGVuO1xuXHRcdGNvbnN0IGZpcnN0TGluZSA9ICBuZXcgQXJyYXkobmV3Um93TGVuKS5maWxsKGZpbGxOdW1iZXIpO1xuXHRcdGZvciAobGV0IGk9MDsgaTxib3JkZXJMZW47IGkrKykge1xuXHRcdFx0IG5ld0dhbWUgPSBbIC4uLm5ld0dhbWUsIC4uLmZpcnN0TGluZSBdO1xuXHRcdH1cblx0XHRmb3IgKGxldCBpPTA7IGkgPCBudW1Sb3dzOyBpKyspIHtcblx0XHRcdGxldCBuZXdMaW5lID0gW1xuXHRcdFx0XHQuLi4obmV3IEFycmF5KGJvcmRlckxlbikuZmlsbChmaWxsTnVtYmVyKSksXG5cdFx0XHRcdC4uLnBsYXlhYmxlR2FtZS5zbGljZShudW1Db2xzKmksIG51bUNvbHMqaSArIG51bVJvd3MpLFxuXHRcdFx0XHQuLi4obmV3IEFycmF5KGJvcmRlckxlbikuZmlsbChmaWxsTnVtYmVyKSlcblx0XHRcdF07XG5cdFx0XHRuZXdHYW1lID0gWyAuLi5uZXdHYW1lLCAuLi5uZXdMaW5lIF07XG5cdFx0fVxuXHRcdGZvciAobGV0IGk9MDsgaTxib3JkZXJMZW47IGkrKykge1xuXHRcdFx0IG5ld0dhbWUgPSBbIC4uLm5ld0dhbWUsIC4uLmZpcnN0TGluZSBdO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3R2FtZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lTWFwOyIsImltcG9ydCB7IFBMQVlFUiB9IGZyb20gJy4vYXNzZXQtaW5mbyc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBOUEMgZnJvbSAnLi9ucGMnO1xuaW1wb3J0IHsgQ0FUUyB9IGZyb20gJy4vbnBjLWNhdHMnO1xuXG5jbGFzcyBHYW1lIHtcblx0Y29uc3RydWN0b3IobWFwLCBjYW1lcmEsIGRpc3BhdGNoRnVuY3Rpb24pIHtcblx0XHR0aGlzLmNvbGxpc2lvbk9mZnNldCA9IGNhbWVyYS5zcGVlZDtcblx0XHR0aGlzLm1hcCA9IG1hcDtcblx0XHR0aGlzLmNhbWVyYSA9IGNhbWVyYTtcblx0XHR0aGlzLmRpc3BhdGNoRnVuY3Rpb24gPSBkaXNwYXRjaEZ1bmN0aW9uO1xuXHRcdHRoaXMuX2F2YWlsYWJsZUluaXRpYWxQb3NpdGlvbnMgPSBbIC4uLnRoaXMubWFwLnN0YXJ0UG9zaXRpb25zIF07XG5cdFx0dGhpcy5faW5pdFBsYXllcigpO1xuXHRcdHRoaXMubnBjcyA9IFtdO1xuXHRcdHRoaXMuX2luaXROUENzKCk7XG5cdH1cblxuXHRfaW5pdFBsYXllcigpIHtcblx0XHR0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoUExBWUVSLCB0aGlzLmNhbWVyYSk7XG5cdFx0dGhpcy5wbGF5ZXIuc2NyZWVuWCA9IHRoaXMuY2FtZXJhLndpZHRoLzI7XG5cdFx0dGhpcy5wbGF5ZXIuc2NyZWVuWSA9IHRoaXMuY2FtZXJhLmhlaWdodC8yO1xuXHR9XG5cblx0X2luaXROUENzKCkge1xuXHRcdHRoaXMubnBjcyA9IENBVFMubWFwKG5wY0Rlc2MgPT4ge1xuXHRcdFx0Y29uc3QgcG9zaXRpb24gPSB0aGlzLl9nZXRSYW5kb21Jbml0aWFsUG9zaXRpb24oKTtcblx0XHRcdHJldHVybiBuZXcgTlBDKHtcblx0XHRcdFx0YXNzZXRJbmZvOiBucGNEZXNjLmFzc2V0LFxuXHRcdFx0XHRjYW1lcmE6IHRoaXMuY2FtZXJhLFxuXHRcdFx0XHRkaWFsb2c6IHtcblx0XHRcdFx0XHRuYW1lOiBucGNEZXNjLm5hbWUsXG5cdFx0XHRcdFx0dGV4dDogbnBjRGVzYy50ZXh0XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNwZWVkOiBucGNEZXNjLnNwZWVkLFxuXHRcdFx0XHRtYXhEaXN0YW5jZTogbnBjRGVzYy5tYXhEaXN0YW5jZSxcblx0XHRcdFx0aW5pdGlhbERpcmVjdGlvbjogbnBjRGVzYy5pbml0aWFsRGlyZWN0aW9uLFxuXHRcdFx0XHRzY3JlZW5YOiBwb3NpdGlvblswXSAtIHRoaXMuY2FtZXJhLngsXG5cdFx0XHRcdHNjcmVlblk6IHBvc2l0aW9uWzFdIC0gdGhpcy5jYW1lcmEueVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyBtZXRob2QgcmV0dXJucyBvbmUgb2YgdGhvc2UgcG9zaXRpb24gYW5kIGVuc3VyZXMgdGhhdFxuXHQgKiB0aGVyZSdzIG5vIGNvbGxpc2lvbiB3aXRoIG1hcCBlbGVtZW50cyBhbmQgdGhlIHBsYXllci5cblx0ICogT25jZSBhIHBvc2l0aW9uIGlzIHJldHVybmVkLCBpdCBpcyByZW1vdmVkIGZyb20gdGhpcy5fYXZhaWxhYmxlSW5pdGlhbFBvc2l0aW9uc1xuXHQgKiB0byBhdm9pZCBoYXZpbmcgdHdvIE5QQ3Mgd2l0aCB0aGUgc2FtZSBpbml0aWFsIHBvc2l0aW9uLlxuXHQgKi9cblx0X2dldFJhbmRvbUluaXRpYWxQb3NpdGlvbigpIHtcblx0XHRjb25zdCBwb3NpdGlvbiA9IHRoaXMuX2F2YWlsYWJsZUluaXRpYWxQb3NpdGlvbnNbdGhpcy5fYXZhaWxhYmxlSW5pdGlhbFBvc2l0aW9ucy5sZW5ndGggLSAxXTtcblx0XHR0aGlzLl9hdmFpbGFibGVJbml0aWFsUG9zaXRpb25zLnBvcCgpO1xuXHRcdHJldHVybiBwb3NpdGlvbjtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHR0aGlzLnBsYXllci51cGRhdGUoKTtcblx0XHR0aGlzLmNvbGxpZGUoKTtcblx0XHR0aGlzLm5wY3NNb3ZlKCk7XG5cdH1cblxuXHRucGNzTW92ZSgpIHtcblx0XHRpZiAoIXRoaXMubnBjcykgcmV0dXJuO1xuXHRcdHRoaXMubnBjcy5mb3JFYWNoKChucGMsIGkpID0+IHtcblx0XHRcdGxldCBvdGhlck5QQ3MgPSBbIC4uLnRoaXMubnBjcyBdO1xuXHRcdFx0b3RoZXJOUENzLnNwbGljZShpLCAxKTtcblx0XHRcdGNvbnN0IHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9ID0gbnBjO1xuXHRcdFx0Y29uc3QgcGxheWVyQ29sbGlzaW9uID0gdGhpcy5wbGF5ZXIuY29sbGlzaW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIHRoaXMuY29sbGlzaW9uT2Zmc2V0KTtcblx0XHRcdGNvbnN0IHsgY29sbGlzaW9uOiBucGNDb2xsaXNpb24gfSA9IHRoaXMuY2hlY2tOUENzQ29sbGlzaW9uKG90aGVyTlBDcywgeyB4LCB5LCB3aWR0aCwgaGVpZ2h0IH0pO1xuXHRcdFx0Y29uc3QgbWFwQ29sbGlzaW9uID0gdGhpcy5tYXAuY29sbGlzaW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIHRoaXMuY29sbGlzaW9uT2Zmc2V0KTtcblx0XHRcdGNvbnN0IG1ldE9zdGFjbGUgPSBPYmplY3QudmFsdWVzKG1hcENvbGxpc2lvbikucmVkdWNlKChhY2MsIHZhbHVlKSA9PiBhY2MgfHwgdmFsdWUsIGZhbHNlKTtcblx0XHRcdGNvbnN0IG1ldE5QQyA9IE9iamVjdC52YWx1ZXMobnBjQ29sbGlzaW9uKS5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IGFjYyB8fCB2YWx1ZSwgZmFsc2UpO1xuXHRcdFx0bnBjLm1vdmUobWV0T3N0YWNsZSwgcGxheWVyQ29sbGlzaW9uLCBtZXROUEMpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0Q2hhcmFjdGVyc0Rpc3BsYXlJbmZvKCkge1xuXHRcdHJldHVybiBbXG5cdFx0XHR0aGlzLnBsYXllci5nZXREaXNwbGF5SW5mbygpLFxuXHRcdFx0Li4uKHRoaXMubnBjcyA/IHRoaXMubnBjcy5tYXAobnBjID0+IG5wYy5nZXREaXNwbGF5SW5mbygpKSA6IFtdKVxuXHRcdF07XG5cdH1cblxuXHRtb3ZlTGVmdCgpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FtZXJhLnNwZWVkOyBpKyspIHtcblx0XHRcdHRoaXMuY2FtZXJhLm1vdmVMZWZ0KCk7XG5cdFx0XHR0aGlzLnBsYXllci51cGRhdGUoKTtcblx0XHRcdHRoaXMuY29sbGlkZSgpO1xuXHRcdH1cblx0XHR0aGlzLnBsYXllci5tb3ZlTGVmdCgpO1xuXHRcdFx0Ly8gTlBDcyBhcmUgdW5hZmZlY3RlZCBieSB0aGUgY2FtZXJhIG1vdmVtZW50XG5cdFx0Ly8gbmVlZCB0byBjb21wZW5zYXRlXG5cdFx0Zm9yIChjb25zdCBucGMgb2YgdGhpcy5ucGNzKSB7XG5cdFx0XHRucGMua2VlcEltbW9iaWxlKCdsZWZ0Jyk7XG5cdFx0fVxuXHR9XG5cblx0bW92ZVJpZ2h0KCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYW1lcmEuc3BlZWQ7IGkrKykge1xuXHRcdFx0dGhpcy5jYW1lcmEubW92ZVJpZ2h0KCk7XG5cdFx0XHR0aGlzLnBsYXllci51cGRhdGUoKTtcblx0XHRcdHRoaXMuY29sbGlkZSgpO1xuXHRcdH1cblx0XHR0aGlzLnBsYXllci5tb3ZlUmlnaHQoKTtcblx0XHQvLyBOUENzIGFyZSB1bmFmZmVjdGVkIGJ5IHRoZSBjYW1lcmEgbW92ZW1lbnRcblx0XHQvLyBuZWVkIHRvIGNvbXBlbnNhdGVcblx0XHRmb3IgKGNvbnN0IG5wYyBvZiB0aGlzLm5wY3MpIHtcblx0XHRcdG5wYy5rZWVwSW1tb2JpbGUoJ3JpZ2h0Jyk7XG5cdFx0fVxuXHR9XG5cblx0bW92ZVVwKCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYW1lcmEuc3BlZWQ7IGkrKykge1xuXHRcdFx0dGhpcy5jYW1lcmEubW92ZVVwKCk7XG5cdFx0XHR0aGlzLnBsYXllci51cGRhdGUoKTtcblx0XHRcdHRoaXMuY29sbGlkZSgpO1xuXHRcdH1cblx0XHR0aGlzLnBsYXllci5tb3ZlVXAoKTtcblx0XHQvLyBOUENzIGFyZSB1bmFmZmVjdGVkIGJ5IHRoZSBjYW1lcmEgbW92ZW1lbnRcblx0XHQvLyBuZWVkIHRvIGNvbXBlbnNhdGVcblx0XHRmb3IgKGNvbnN0IG5wYyBvZiB0aGlzLm5wY3MpIHtcblx0XHRcdG5wYy5rZWVwSW1tb2JpbGUoJ3VwJyk7XG5cdFx0fVxuXG5cdH1cblxuXHRtb3ZlRG93bigpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FtZXJhLnNwZWVkOyBpKyspIHtcblx0XHRcdHRoaXMuY2FtZXJhLm1vdmVEb3duKCk7XG5cdFx0XHR0aGlzLnBsYXllci51cGRhdGUoKTtcblx0XHRcdHRoaXMuY29sbGlkZSgpO1xuXHRcdH1cblx0XHR0aGlzLnBsYXllci5tb3ZlRG93bigpO1xuXHRcdC8vIE5QQ3MgYXJlIHVuYWZmZWN0ZWQgYnkgdGhlIGNhbWVyYSBtb3ZlbWVudFxuXHRcdC8vIG5lZWQgdG8gY29tcGVuc2F0ZVxuXHRcdGZvciAoY29uc3QgbnBjIG9mIHRoaXMubnBjcykge1xuXHRcdFx0bnBjLmtlZXBJbW1vYmlsZSgnZG93bicpO1xuXHRcdH1cblx0fVxuXG5cdHNldElkbGUoKSB7XG5cdFx0dGhpcy5wbGF5ZXIuc2V0SWRsZSgpO1xuXHR9XG5cblx0Y2hlY2tOUENzQ29sbGlzaW9uKG5wY0xpc3QsIHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9KSB7XG5cdFx0Y29uc3QgY29sbGlzaW9uID0geyBsZWZ0OiBmYWxzZSwgcmlnaHQ6IGZhbHNlLCB0b3A6IGZhbHNlLCBib3R0b206IGZhbHNlIH07XG5cdFx0aWYgKCF0aGlzLm5wY3MpIHJldHVybiB7IGNvbGxpc2lvbiB9O1xuXHRcdGxldCBucGNJbmRleCA9IG51bGw7XG5cdFx0bnBjTGlzdC5mb3JFYWNoKChucGMsIGkpID0+e1xuXHRcdFx0Y29uc3QgY3VycmVudENvbGxpc2lvbiA9IG5wYy5jb2xsaXNpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgIHRoaXMuY29sbGlzaW9uT2Zmc2V0KTtcblx0XHRcdGNvbGxpc2lvbi5sZWZ0ID0gY29sbGlzaW9uLmxlZnQgfHwgY3VycmVudENvbGxpc2lvbi5sZWZ0O1xuXHRcdFx0Y29sbGlzaW9uLnJpZ2h0ID0gY29sbGlzaW9uLnJpZ2h0IHx8IGN1cnJlbnRDb2xsaXNpb24ucmlnaHQ7XG5cdFx0XHRjb2xsaXNpb24udG9wID0gY29sbGlzaW9uLnRvcCB8fCBjdXJyZW50Q29sbGlzaW9uLnRvcDtcblx0XHRcdGNvbGxpc2lvbi5ib3R0b20gPSBjb2xsaXNpb24uYm90dG9tIHx8IGN1cnJlbnRDb2xsaXNpb24uYm90dG9tO1xuXHRcdFx0aWYgKE9iamVjdC52YWx1ZXMoY3VycmVudENvbGxpc2lvbikucmVkdWNlKChhY2MsIHZhbHVlKSA9PiBhY2MgfHwgdmFsdWUsIGZhbHNlKSkge1xuXHRcdFx0XHRucGNJbmRleCA9IGk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHsgY29sbGlzaW9uLCBucGNJbmRleCB9O1xuXHR9XG5cblx0Y29sbGlkZSgpIHtcblx0XHQvLyBnZXQgcGxheWVyIHNpemUgYW5kIGNvb3JkXG5cdFx0Y29uc3QgeyBoZWlnaHQsIHdpZHRoLCB4LCB5IH0gPSB0aGlzLnBsYXllcjtcblxuXHRcdC8vIGdldCBjb2xsaXNpb24gaW5mb1xuXHRcdGNvbnN0IG1hcENvbGxpc2lvbiA9IHRoaXMubWFwLmNvbGxpc2lvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCB0aGlzLmNvbGxpc2lvbk9mZnNldCk7XG5cdFx0Y29uc3QgeyBjb2xsaXNpb246IG5wY0NvbGxpc2lvbiwgbnBjSW5kZXggfSA9IHRoaXMuY2hlY2tOUENzQ29sbGlzaW9uKHRoaXMubnBjcywgeyB4LCB5LCB3aWR0aCwgaGVpZ2h0IH0pO1xuXG5cdFx0Y29uc3QgbGVmdCA9IG1hcENvbGxpc2lvbi5sZWZ0IHx8IG5wY0NvbGxpc2lvbi5sZWZ0O1xuXHRcdGNvbnN0IHJpZ2h0ID0gbWFwQ29sbGlzaW9uLnJpZ2h0IHx8IG5wY0NvbGxpc2lvbi5yaWdodDtcblx0XHRjb25zdCBib3R0b20gPSBtYXBDb2xsaXNpb24uYm90dG9tIHx8IG5wY0NvbGxpc2lvbi5ib3R0b207XG5cdFx0Y29uc3QgdG9wID0gbWFwQ29sbGlzaW9uLnRvcCB8fCBucGNDb2xsaXNpb24udG9wO1xuXG5cdFx0Ly8gc3RvcCBjYW1lcmEgaWYgbmVjZXNzYXJ5XG5cdFx0dGhpcy5jYW1lcmEuc3RvcC5sZWZ0ID0gbGVmdDtcblx0XHR0aGlzLmNhbWVyYS5zdG9wLnJpZ2h0ID0gcmlnaHQ7XG5cdFx0dGhpcy5jYW1lcmEuc3RvcC5kb3duID0gYm90dG9tO1xuXHRcdHRoaXMuY2FtZXJhLnN0b3AudXAgPSB0b3A7XG5cblx0XHQvLyBkaXNwbGF5IHNwZWVjaCBkaWFsb2dcblx0XHRpZiAoYm90dG9tICYmIHRoaXMucGxheWVyLmZhY2UoJ2Rvd24nKSB8fFxuXHRcdFx0dG9wICYmIHRoaXMucGxheWVyLmZhY2UoJ3VwJykgfHxcblx0XHRcdHJpZ2h0ICYmIHRoaXMucGxheWVyLmZhY2UoJ3JpZ2h0JykgfHxcblx0XHRcdGxlZnQgJiYgdGhpcy5wbGF5ZXIuZmFjZSgnbGVmdCcpKSB7XG5cdFx0XHRcdHRoaXMuX2hhbmRsZVNwZWVjaChucGNJbmRleCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2NhbmNlbFNwZWVjaERpYWxvZygpO1xuXHRcdH1cblxuXHRcdHRoaXMubWFwLmNoZWNrQW5kSGlkZUNvaW5zKHsgeDogeCArIHdpZHRoLzIsIHk6IHkgKyBoZWlnaHQvMiB9LCB0aGlzLmZvdW5kQ29pbi5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdGZvdW5kQ29pbigpIHtcblx0XHR0aGlzLnBsYXllci5jb2luc0NvbGxlY3RlZCsrO1xuXHR9XG5cblx0Z2V0U2NvcmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMucGxheWVyLmNvaW5zQ29sbGVjdGVkO1xuXHR9XG5cblx0X2hhbmRsZVNwZWVjaChucGNJbmRleCkge1xuXHRcdGlmICh0aGlzLl9zcGVlY2hEaWFsb2dJbnZva2VkIHx8IHR5cGVvZiBucGNJbmRleCAhPT0gJ251bWJlcicpIHJldHVybjtcblx0XHR0aGlzLl9kaXNwbGF5U3BlZWNoRGlhbG9nKHRoaXMubnBjc1tucGNJbmRleF0uZGlhbG9nKTtcblx0fVxuXG5cdF9kaXNwbGF5U3BlZWNoRGlhbG9nKGNvbnRlbnQpIHtcblx0XHR0aGlzLl9zcGVlY2hEaWFsb2dJbnZva2VkID0gdHJ1ZTtcblx0XHR0aGlzLmRpc3BhdGNoRnVuY3Rpb24oe1xuXHRcdFx0c2hvdzogdHJ1ZSxcblx0XHRcdC4uLmNvbnRlbnRcblx0XHR9KTtcblx0fVxuXG5cdF9jYW5jZWxTcGVlY2hEaWFsb2coKSB7XG5cdFx0aWYgKHRoaXMuX3NwZWVjaERpYWxvZ0ludm9rZWQpIHtcblx0XHRcdHRoaXMuX3NwZWVjaERpYWxvZ0ludm9rZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuZGlzcGF0Y2hGdW5jdGlvbih7XG5cdFx0XHRcdHNob3c6IGZhbHNlXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJleHBvcnQgeyBkZWZhdWx0IGFzIEdhbWUgfSBmcm9tICcuL2dhbWUuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFbmdpbmUgfSBmcm9tICcuL2VuZ2luZS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFBsYXllciB9IGZyb20gJy4vcGxheWVyLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlci5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENhbWVyYSB9IGZyb20gJy4vY2FtZXJhLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRGlzcGxheSB9IGZyb20gJy4vZGlzcGxheS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEdhbWVNYXAgfSBmcm9tICcuL2dhbWUtbWFwLmpzJztcbiIsImltcG9ydCB7IEltYWdlTG9hZGVyLFN0YXRlSGFuZGxlciwgTXVsdGlNaXhpbnMgfSBmcm9tICcuLi9taXhpbnMvaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpbmdFbGVtZW50IGV4dGVuZHMgTXVsdGlNaXhpbnMoWyBJbWFnZUxvYWRlciwgU3RhdGVIYW5kbGVyIF0pIHtcblx0Y29uc3RydWN0b3IoYXNzZXQpIHtcblx0XHRzdXBlcihhc3NldCk7XG5cdFx0dGhpcy5hc3NldCA9IGFzc2V0O1xuXHRcdHRoaXMuc2l6ZSA9IGFzc2V0LnNpemU7XG5cdH1cblxuXHR1cGRhdGVNb3ZlbWVudCgpIHtcblx0XHR0aGlzLl91cGRhdGVTdGF0ZSh0aGlzLmFzc2V0Lm1vdmVtZW50KTtcblx0fVxufSIsImltcG9ydCB7IENBVCwgQ0FUMiwgQ0FUMywgQ0FUNCB9IGZyb20gJy4vYXNzZXQtaW5mbyc7XG5leHBvcnQgY29uc3QgQ0FUUyA9IFtcbiAge1xuICAgIGFzc2V0OiBDQVQsXG4gICAgbmFtZTogXCJKYXNwZXJcIixcbiAgICB0ZXh0OiBcIk1lb29vb3cg4p2k77iPXCIsXG4gICAgc3BlZWQ6IDAuMyxcbiAgICBtYXhEaXN0YW5jZTogNDAwLFxuICAgIGluaXRpYWxEaXJlY3Rpb246IFwicmlnaHRcIlxuICB9LFxuICB7XG4gICAgYXNzZXQ6IENBVDIsXG4gICAgbmFtZTogXCJQYW5jYWtlXCIsXG4gICAgdGV4dDogXCJNaWFvdXV1dSFcIixcbiAgICBzcGVlZDogMC43LFxuICAgIGluaXRpYWxEaXJlY3Rpb246IFwibGVmdFwiXG4gIH0sXG4gIHtcbiAgICBhc3NldDogQ0FUMyxcbiAgICBuYW1lOiBcIkJ1dHRlcnNcIixcbiAgICB0ZXh0OiBcIkdvdCBhbnkgZm9vZD9cIixcbiAgICBzcGVlZDogMC4zLFxuICAgIG1heERpc3RhbmNlOiAyMDAsXG4gICAgaW5pdGlhbERpcmVjdGlvbjogXCJ1cFwiXG4gIH0sXG4gIHtcbiAgICBhc3NldDogQ0FUNCxcbiAgICBuYW1lOiBcIlRvbVwiLFxuICAgIHRleHQ6IFwiV29vZiB3b29mIPCfkLZcIixcbiAgICBzcGVlZDogMC41LFxuICAgIG1heERpc3RhbmNlOiAxMDAwLFxuICAgIGluaXRpYWxEaXJlY3Rpb246IFwiZG93blwiXG4gIH1cbl07IiwiICBpbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyLmpzJztcblxuY2xhc3MgTlBDIGV4dGVuZHMgUGxheWVyIHtcbiAgY29uc3RydWN0b3Ioe1xuICAgIGFzc2V0SW5mbyxcbiAgICBjYW1lcmEsXG4gICAgLi4ucmVzdFxuICB9ID0ge30pIHtcbiAgICBzdXBlcihhc3NldEluZm8sIGNhbWVyYSk7XG4gICAgZm9yIChjb25zdCBbIHByb3AsIHZhbHVlIF0gb2YgT2JqZWN0LmVudHJpZXMocmVzdCkpIHtcblx0XHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcblx0XHRcdHRoaXNbcHJvcF0gPSB2YWx1ZTtcblx0XHR9XG5cdFx0dGhpcy5fc2V0SW5pdGlhbERpcmVjdGlvbigpO1xuXHRcdHRoaXMuX2Rpc3RhbmNlVHJhdmVsZWQgPSAwO1xuICB9XG5cbiAgX3NldEluaXRpYWxEaXJlY3Rpb24oKSB7XG4gICAgc3dpdGNoICh0aGlzLmluaXRpYWxEaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICB0aGlzLm1vdmVEb3duKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXAnOlxuICAgICAgICB0aGlzLm1vdmVVcCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgdGhpcy5tb3ZlTGVmdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMubW92ZURvd24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkanVzdHMgc2NyZWVuWFkgdG8gbWFrZSBzdXJlIHRoZSBucGMgbW92ZW1lbnRcbiAgICogaXMgaW5kZXBlbmRlbnQgZnJvbSB0aGUgY2FtZXJhIG1vdmVtZW50XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3Rpb24gLSB1cCwgZG93biwgcmlnaHQgb3IgbGVmdFxuICAgKi9cbiAga2VlcEltbW9iaWxlKGRpcmVjdGlvbikge1xuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlICd1cCc6XG4gICAgICAgIGlmICghdGhpcy5jYW1lcmEuc3RvcC51cCkge1xuICAgICAgICAgIHRoaXMuc2NyZWVuWSArPSB0aGlzLmNhbWVyYS5zcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICBpZiAoIXRoaXMuY2FtZXJhLnN0b3AuZG93bikge1xuICAgICAgICAgIHRoaXMuc2NyZWVuWSAtPSB0aGlzLmNhbWVyYS5zcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgaWYgKCF0aGlzLmNhbWVyYS5zdG9wLnJpZ2h0KSB7XG4gICAgICAgICAgdGhpcy5zY3JlZW5YIC09IHRoaXMuY2FtZXJhLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGlmICghdGhpcy5jYW1lcmEuc3RvcC5sZWZ0KSB7XG4gICAgICAgICAgdGhpcy5zY3JlZW5YICs9IHRoaXMuY2FtZXJhLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgaG93IHRoZSBOUEMgbW92ZXMgb24gdGhlIG1hcFxuICAgKiBhbmQgaG93IGl0IHJlYWN0cyB3aGVuIG1lZXRpbmcgYW4gb2JzdGFjbGUgb3IgdGhlIG1haW4gcGxheWVyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFwQ29sbGlzaW9uIC0gbWV0IGFuIG9ic3RhY2xlIG9uIHRoZSBtYXBcbiAgICogQHBhcmFtIHtPYmplY3R9IHBsYXllckNvbGxpc2lvbiAtIGNvbGxpc2lvbiBpbmZvIHdpdGggcGxheWVyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gbWV0T3RoZXJOUENzIC0gbWV0IG90aGVyIE5QQ3NcbiAgICovXG4gIG1vdmUobWFwQ29sbGlzaW9uLCBwbGF5ZXJDb2xsaXNpb24sIG1ldE90aGVyTlBDcykge1xuICAgIC8vIGhhbmRsZSBwbGF5ZXIgY29sbGlzaW9uXG5cdFx0aWYgKHBsYXllckNvbGxpc2lvbi5sZWZ0KSB7XG5cdFx0ICBpZiAoIXRoaXMuZmFjZSgnbGVmdCcpKSB0aGlzLm1vdmVMZWZ0KCk7XG5cdFx0ICB0aGlzLnNldElkbGUoKTtcblx0XHQgIHJldHVybjtcblx0XHR9IGVsc2UgaWYgKHBsYXllckNvbGxpc2lvbi5yaWdodCkge1xuXHRcdCAgaWYgKCF0aGlzLmZhY2UoJ3JpZ2h0JykpIHRoaXMubW92ZVJpZ2h0KCk7XG5cdFx0ICB0aGlzLnNldElkbGUoKTtcblx0XHQgIHJldHVybjtcblx0XHR9IGVsc2UgaWYgKHBsYXllckNvbGxpc2lvbi50b3ApIHtcbiAgICAgIGlmICghdGhpcy5mYWNlKCd1cCcpKSB0aGlzLm1vdmVVcCgpO1xuXHRcdCAgdGhpcy5zZXRJZGxlKCk7XG5cdFx0ICByZXR1cm47XG5cdFx0fSBlbHNlIGlmIChwbGF5ZXJDb2xsaXNpb24uYm90dG9tKSB7XG4gICAgICBpZiAoIXRoaXMuZmFjZSgnZG93bicpKSB0aGlzLm1vdmVEb3duKCk7XG5cdFx0ICB0aGlzLnNldElkbGUoKTtcblx0XHQgIHJldHVybjtcblx0XHR9XG5cbiAgICAvLyBsb29rIGRvd24gd2hlbiBpbW1vYmlsZVxuICAgIGlmICghdGhpcy5zcGVlZCkge1xuXHRcdFx0dGhpcy5zZXRJZGxlKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fTtcblxuICAgIC8vIGNoYW5nZSBkaXJlY3Rpb24gaWYgbWV0IG9ic3RhY2xlIG9yIG1ldCBOUENcblx0XHRpZiAobWFwQ29sbGlzaW9uIHx8IG1ldE90aGVyTlBDcykge1xuXHRcdCAgLy8gcmVzZXQgZGlzdGFuY2UgYW5kIHR1cm4gYXJvdW5kXG4gICAgICBpZiAodGhpcy5mYWNlKCdsZWZ0JykpIHtcbiAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlKCdyaWdodCcpKSB7XG4gICAgICAgIHRoaXMubW92ZUxlZnQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlKCd1cCcpKSB7XG4gICAgICAgIHRoaXMubW92ZURvd24oKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5mYWNlKCdkb3duJykpIHtcbiAgICAgICAgdGhpcy5tb3ZlVXAoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Rpc3RhbmNlVHJhdmVsZWQgPSAwO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZhY2UoJ2xlZnQnKSkge1xuXHRcdCAgdGhpcy5tb3ZlTGVmdCgpO1xuXHRcdCAgdGhpcy5zY3JlZW5YIC09IHRoaXMuc3BlZWQ7XG5cdFx0fSBlbHNlIGlmICh0aGlzLmZhY2UoJ3JpZ2h0JykpIHtcblx0XHQgIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgICB0aGlzLnNjcmVlblggKz0gdGhpcy5zcGVlZDtcblx0XHR9IGVsc2UgaWYgKHRoaXMuZmFjZSgndXAnKSkge1xuICAgICAgdGhpcy5tb3ZlVXAoKTtcbiAgICAgIHRoaXMuc2NyZWVuWSAtPSB0aGlzLnNwZWVkO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5mYWNlKCdkb3duJykpIHtcbiAgICAgIHRoaXMubW92ZURvd24oKTtcbiAgICAgIHRoaXMuc2NyZWVuWSArPSB0aGlzLnNwZWVkO1xuXHRcdH1cblxuICAgIGlmICh0aGlzLl9kaXN0YW5jZVRyYXZlbGVkID4gdGhpcy5tYXhEaXN0YW5jZSkge1xuICAgICAgdGhpcy5fcmFuZG9tbHlEaXJlY3Rpb25Nb3ZlKCk7XG4gICAgICB0aGlzLl9kaXN0YW5jZVRyYXZlbGVkID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGlzdGFuY2VUcmF2ZWxlZCArPSB0aGlzLnNwZWVkO1xuICAgIH1cbiAgfVxuXG4gIF9yYW5kb21seURpcmVjdGlvbk1vdmUoKSB7XG4gICAgY29uc3QgYWxsRGlyZWN0aW9uID0gWyB0aGlzLm1vdmVMZWZ0LCB0aGlzLm1vdmVSaWdodCwgdGhpcy5tb3ZlVXAsIHRoaXMubW92ZURvd24gXTtcbiAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooYWxsRGlyZWN0aW9uLmxlbmd0aCkpO1xuICAgIGNvbnN0IHJhbmRvbU1ldGhvZCA9IGFsbERpcmVjdGlvbltyYW5kb21JbmRleF07XG4gICAgcmFuZG9tTWV0aG9kLmJpbmQodGhpcykoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOUEM7IiwiaW1wb3J0IHsgSW1hZ2VMb2FkZXIsIFN0YXRlSGFuZGxlciwgTXVsdGlNaXhpbnMsIENvbGxpc2lvbkRldGVjdG9yIH0gZnJvbSAnLi4vbWl4aW5zL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgTXVsdGlNaXhpbnMoWyBJbWFnZUxvYWRlciwgU3RhdGVIYW5kbGVyLCBDb2xsaXNpb25EZXRlY3RvciBdKSB7XG5cdGNvbnN0cnVjdG9yKGFzc2V0SW5mbywgY2FtZXJhKSB7XG5cdFx0c3VwZXIoYXNzZXRJbmZvKTtcblx0XHR0aGlzLmNhbWVyYSA9IGNhbWVyYTtcblx0XHR0aGlzLndpZHRoID0gKGFzc2V0SW5mby53aWR0aCB8fCBhc3NldEluZm8uc2l6ZSk7XG5cdFx0dGhpcy5oZWlnaHQgPSAgKGFzc2V0SW5mby5oZWlnaHQgfHwgYXNzZXRJbmZvLnNpemUpO1xuXHRcdHRoaXMuY29pbnNDb2xsZWN0ZWQgPSAwO1xuXHR9XG5cblx0Z2V0IHNjcmVlblgoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3NjcmVlblg7XG5cdH1cblxuXHRzZXQgc2NyZWVuWCh2YWx1ZSkge1xuXHRcdHRoaXMuX3NjcmVlblggPSB2YWx1ZTtcblx0XHR0aGlzLnggPSB2YWx1ZSArIHRoaXMuY2FtZXJhLng7XG5cdH1cblxuXG5cdGdldCBzY3JlZW5ZKCkge1xuXHRcdHJldHVybiB0aGlzLl9zY3JlZW5ZO1xuXHR9XG5cblx0c2V0IHNjcmVlblkodmFsdWUpIHtcblx0XHR0aGlzLl9zY3JlZW5ZID0gdmFsdWU7XG5cdFx0dGhpcy55ID0gdmFsdWUgKyB0aGlzLmNhbWVyYS55O1xuXHR9XG5cblx0LyoqXG5cdCAqIHggYW5kIHkgYXJlIHRoZSBjb29yZGluYXRlcyBpbiB0aGUgZ2FtZVxuXHQgKiBzY3JlZW5YIGFuZCBzY3JlZW5ZIGFyZSB0aGUgY29vcmRpbmF0ZXMgb24gdGhlIHNjcmVlblxuXHQgKi9cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMueCA9IHRoaXMuX3NjcmVlblggKyB0aGlzLmNhbWVyYS54O1xuXHRcdHRoaXMueSA9IHRoaXMuX3NjcmVlblkgKyB0aGlzLmNhbWVyYS55O1xuXHR9XG5cblx0Z2V0RGlzcGxheUluZm8oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGltYWdlOiB0aGlzLmdldEltYWdlKCksXG5cdFx0XHRmcmFtZTogdGhpcy5nZXRDdXJyZW50RnJhbWUoKSxcblx0XHRcdHg6IHRoaXMuX3NjcmVlblgsXG5cdFx0XHR5OiB0aGlzLl9zY3JlZW5ZLFxuXHRcdFx0d2lkdGg6IHRoaXMud2lkdGgsXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0XG5cdFx0fTtcblx0fVxuXG5cdF9wb2ludENvbGxpc2lvbih4LCB5KSB7XG5cdFx0Y29uc3Qgb2Zmc2V0ID0gNTtcbiAgICByZXR1cm4geCA+PSAodGhpcy54ICsgb2Zmc2V0KSAmJlxuICAgIHggPD0gKHRoaXMueCArIHRoaXMud2lkdGggLSBvZmZzZXQpICYmXG4gICAgeSA+PSAodGhpcy55ICsgb2Zmc2V0KSAmJlxuICAgIHkgPD0gKHRoaXMueSArIHRoaXMuaGVpZ2h0IC0gb2Zmc2V0KTtcbiAgfVxufSIsImNsYXNzIEZyYW1lQW5pbWF0b3Ige1xuICBjb25zdHJ1Y3Rvcihhc3NldEluZm8sIGluaXRpYWxTdGF0ZSkge1xuICAgIGZvciAoY29uc3QgWyBwcm9wLCB2YWx1ZSBdIG9mIE9iamVjdC5lbnRyaWVzKGFzc2V0SW5mbykpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcbiAgICB9XG4gICAgdGhpcy5fZnJhbWVTZXRzID0gdGhpcy5fY3JlYXRlRnJhbWVTZXRzKCk7XG4gIH1cblxuICBfZ2V0VGlsZShbIHJvdywgY29sIF0pIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMud2lkdGggfHwgdGhpcy5zaXplO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaGVpZ2h0IHx8IHRoaXMuc2l6ZTtcbiAgICByZXR1cm4gW1xuICAgICAgY29sKndpZHRoLCAvLyB4XG4gICAgICByb3cqaGVpZ2h0LCAvLyB5XG4gICAgICB3aWR0aCwgLy8gd2lkdGhcbiAgICAgIGhlaWdodCAvLyBoZWlnaHRcbiAgICBdO1xuICB9XG5cbiAgX2NyZWF0ZUZyYW1lU2V0cygpIHtcbiAgICBjb25zdCBmcmFtZVNldHMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IFsgbW92ZSwgc2VxdWVuY2UgXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLm1vdmVTZXF1ZW5jZXMpKSB7XG4gICAgICBmcmFtZVNldHNbbW92ZV0gPSBzZXF1ZW5jZS5tYXAodGhpcy5fZ2V0VGlsZS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyYW1lU2V0cztcbiAgfVxuXG4gIGdldEN1cnJlbnRGcmFtZShhY3Rpb24sIHNlcXVlbmNlSW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5fZnJhbWVTZXRzW2FjdGlvbl1bc2VxdWVuY2VJbmRleF07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRnJhbWVBbmltYXRvcjsiLCJpbXBvcnQgJy4vY29tcG9uZW50cy9pbmRleC5qcyc7Il0sInNvdXJjZVJvb3QiOiIifQ==