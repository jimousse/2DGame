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
  var data = _taggedTemplateLiteral(["\n\t\t\t<div id=\"container\">\n\t\t\t\t<canvas id=\"game-canvas\"></canvas>\n\t\t\t\t<virtual-controller\n\t\t\t\t\tclass=\"on-screen-controller\"\n\t\t\t\t\t.clickHandlers=", ">\n\t\t\t\t</virtual-controller>\n\t\t\t\t", "\n\n\t\t\t</div>\n\t\t"]);

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
    value: function _drawCoin(x, y) {
      var _this$buffer3;

      (_this$buffer3 = this.buffer).drawImage.apply(_this$buffer3, [this._coin.getImage()].concat(_toConsumableArray(this._coin.getCurrentFrame()), [this._tileSize / 2 - this._coin.size / 2 + x, // target x
      this._tileSize / 2 - this._coin.size / 2 + y, // target y
      this._coin.size, // target width
      this._coin.size // target height
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
              this._drawCoin(x, y);

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
      console.log("I have ".concat(this.player.coinsCollected, " coins!"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1lbGVtZW50L2xpYi9jc3MtdGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQtZWxlbWVudC9saWIvZGVjb3JhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl0LWVsZW1lbnQvbGliL3VwZGF0aW5nLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1lbGVtZW50L2xpdC1lbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saWIvZGVmYXVsdC10ZW1wbGF0ZS1wcm9jZXNzb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9tb2RpZnktdGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9wYXJ0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saWIvcGFydHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi9zaGFkeS1yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi90ZW1wbGF0ZS1mYWN0b3J5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXQtaHRtbC9saWIvdGVtcGxhdGUtaW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi90ZW1wbGF0ZS1yZXN1bHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdC1odG1sL2xpYi90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvbGl0LWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2Nvb2wtZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90ZXh0LWRpYWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy92aXJ0dWFsLWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvZ2FtZS1pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvbWl4aW5zL2NvbGxpc2lvbi1kZXRlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9taXhpbnMvaW1hZ2UtbG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL21peGlucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9taXhpbnMvbXVsdGktbWl4aW5zLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL21peGlucy9zdGF0ZS1oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL3BhcnRzL2Fzc2V0LWluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcGFydHMvY2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL3BhcnRzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcGFydHMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9wYXJ0cy9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcGFydHMvZ2FtZS1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcGFydHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9wYXJ0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9wYXJ0cy9tb3ZpbmctZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9wYXJ0cy9ucGMtY2F0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9wYXJ0cy9ucGMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcGFydHMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lL3V0aWxzL2ZyYW1lLWFuaW1hdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJLRVlTIiwiQVJST1dfUklHSFQiLCJBUlJPV19MRUZUIiwiQVJST1dfVVAiLCJBUlJPV19ET1dOIiwiQ29vbEdhbWUiLCJfY29udHJvbGxlckNsaWNrSGFuZGxlcnMiLCJyaWdodCIsIm1vdXNlRG93biIsImdhbWVJbnRlcmZhY2UiLCJwbGF5ZXJHb1JpZ2h0IiwibW91c2VVcCIsInBsYXllclN0b3AiLCJsZWZ0IiwicGxheWVyR29MZWZ0IiwidXAiLCJwbGF5ZXJHb1VwIiwiZG93biIsInBsYXllckdvRG93biIsIl9zaG93U3BlZWNoRGlhbG9nIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9oYW5kbGVTcGVlY2hFdmVudCIsIndpbmRvdyIsIl9jYW52YXNSZXNpemUiLCJiaW5kIiwia2V5IiwiZGlyZWN0aW9uYWxLZXlzIiwiaW5kZXhPZiIsImluZm8iLCJkZXRhaWwiLCJzaG93IiwidGV4dCIsIm5hbWUiLCJfdGV4dCIsIl9uYW1lIiwicmVxdWVzdFVwZGF0ZSIsIl9jYW52YXMiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic2hhZG93Um9vdCIsImdldEVsZW1lbnRCeUlkIiwiR2FtZUludGVyZmFjZSIsInN0YXJ0IiwiaHRtbCIsImNzcyIsIkxpdEVsZW1lbnQiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIlBBRERJTkciLCJGT05UX1NJWkUiLCJGT05UX0ZBTUlMWSIsIlRleHREaWFsb2ciLCJ0eXBlIiwiU3RyaW5nIiwidW5zYWZlQ1NTIiwiVmlydHVhbENvbnRyb2xsZXIiLCJfY2xpY2tlZE9wYWNpdHkiLCJfZGVmYXVsdE9wYWNpdHkiLCJfZmlsbCIsIl9yZXNpemVPYnNlcnZlciIsIlJlc2l6ZU9ic2VydmVyIiwiZW50cmllcyIsImZvckVhY2giLCJlbnRyeSIsInRhcmdldCIsInJlc2l6ZWRDYWxsYmFjayIsIm9ic2VydmUiLCJ1bm9ic2VydmUiLCJldmVudCIsImRpciIsImNsaWNrSGFuZGxlcnMiLCJzZXRBdHRyaWJ1dGUiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyYWRpdXMiLCJidXR0b25TaXplIiwiYnV0dG9ucyIsIngiLCJ5Iiwic3ZnIiwibWFwIiwiYiIsImUiLCJfbW91c2VEb3duSGFuZGxlciIsIl9tb3VzZVVwSGFuZGxlciIsIk9iamVjdCIsImNhbnZhcyIsIl9pbml0IiwiQ3VzdG9tRXZlbnQiLCJidWJibGVzIiwiY29tcG9zZWQiLCJkaXNwYXRjaEV2ZW50IiwiX2NvbnRyb2xsZXIiLCJDb250cm9sbGVyIiwiX2NvbXB1dGVDYW1lcmFEaW1lbnNpb25zIiwiY2FtZXJhV2lkdGgiLCJjYW1lcmFIZWlnaHQiLCJfZ2FtZU1hcCIsIkdhbWVNYXAiLCJXT1JMRCIsIl9jb21wdXRlQ2FtZXJhSW5pdFBvc2l0aW9uIiwiY2FtZXJhWCIsImNhbWVyYVkiLCJfY2FtZXJhIiwiQ2FtZXJhIiwiX2Rpc3BsYXkiLCJEaXNwbGF5IiwiX2dhbWUiLCJHYW1lIiwiX2Rpc3BhdGNoRXZlbnQiLCJfZW5naW5lIiwiRW5naW5lIiwiX3JlbmRlciIsIl91cGRhdGUiLCJjYW1lcmFTaXplIiwicmF0aW9XaWR0aCIsInJhdGlvSGVpZ2h0IiwiZmlyc3RQb3NpdGlvbiIsInN0YXJ0UG9zaXRpb25zIiwibGVuZ3RoIiwicG9wIiwiZHJhd01hcCIsImRyYXdDaGFyYWN0ZXJzIiwiZ2V0Q2hhcmFjdGVyc0Rpc3BsYXlJbmZvIiwicmVuZGVyIiwic2V0QWN0aXZlRGlyZWN0aW9uIiwidXBkYXRlIiwiZGlyZWN0aW9uIiwiZ2V0QWN0aXZlRGlyZWN0aW9uIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJtb3ZlVXAiLCJtb3ZlRG93biIsInNldElkbGUiLCJDb2xsaXNpb25EZXRlY3RvciIsImJhc2UiLCJjb25maWciLCJjb25zdGFudENvb3JkIiwic3RhcnRDb29yZCIsImlzSG9yaXpvbnRhbCIsImNvbGxpc2lvbiIsImluY3JlbWVudCIsImkiLCJfcG9pbnRDb2xsaXNpb24iLCJvZmZzZXQiLCJjb25zdGFudFhSaWdodCIsIl9zZWdtZW50Q29sbGlzaW9uIiwiY29uc3RhbnRYTGVmdCIsImNvbnN0YW50WVRvcCIsInRvcCIsImNvbnN0YW50WUJvdHRvbSIsImJvdHRvbSIsIkltYWdlTG9hZGVyIiwiX2ltYWdlIiwiSW1hZ2UiLCJzcmMiLCJNdWx0aU1peGlucyIsIm1peGlucyIsIl9taXhpbnMiLCJBcnJheSIsImlzQXJyYXkiLCJfY2xhc3MiLCJtaXhpbiIsIlN0YXRlSGFuZGxlciIsImFzc2V0SW5mbyIsIl9tb3ZlU2VxdWVuY2VzIiwibW92ZVNlcXVlbmNlcyIsIl9hY3Rpb25zIiwia2V5cyIsIl90aW1lciIsIl9kZWxheSIsImRlbGF5IiwiX2ZyYW1lQW5pbWF0b3IiLCJGcmFtZUFuaW1hdG9yIiwiX3N0YXRlIiwiYWN0aW9uIiwiYWN0aW9uU2VxdWVuY2VJbmRleCIsIm5ld0FjdGlvbiIsInNlcXVlbmNlTGVuIiwic2VxdWVuY2VJbmRleCIsImdldE1vdmVTdGF0ZSIsImdldEN1cnJlbnRGcmFtZSIsIl91cGRhdGVTdGF0ZSIsImZhY2UiLCJjb2xzIiwicm93cyIsInNpemUiLCJ1bmlxdWVLZXlzIiwiY29pbiIsImdyYXNzIiwidHJlZV9ib3R0b20iLCJ0cmVlX3RvcCIsInBhdGgiLCJvY2VhbiIsImJ1c2giLCJlbGVtZW50cyIsInRyZWUiLCJsYXllcnMiLCJjb2luX29uX2dyYXNzIiwiY29pbl9vbl9wYXRoIiwic3RhcnRfcG9zaXRpb24iLCJvYnN0YWNsZXMiLCJTZXQiLCJwbGF5YWJsZUFyZWFLZXlzIiwiUExBWUVSIiwiQ0FUIiwiQ0FUMiIsIkNBVDMiLCJDQVQ0IiwiT0NFQU4iLCJtb3ZlbWVudCIsIkNPSU4iLCJDQU1FUkFfU1BFRUQiLCJzcGVlZCIsInN0b3AiLCJfYWN0aXZlRGlyZWN0aW9uIiwiY2FtZXJhIiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIl9tYXAiLCJfY3JlYXRlQnVmZmVyQ2FudmFzIiwiYnVmZmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiX21hcEltYWdlIiwiZ2V0SW1hZ2UiLCJfdGlsZVNpemUiLCJfb2NlYW4iLCJNb3ZpbmdFbGVtZW50IiwiX2NvaW4iLCJwbGF5ZXJzIiwicGxheWVyIiwiZHJhd0NoYXJhY3RlciIsImltYWdlIiwiZnJhbWUiLCJkcmF3SW1hZ2UiLCJsYXllciIsInVwZGF0ZU1vdmVtZW50Iiwic3RhcnRDb2wiLCJNYXRoIiwiZmxvb3IiLCJlbmRDb2wiLCJzdGFydFJvdyIsImVuZFJvdyIsImNvbCIsInJvdyIsImN1cnJlbnRUaWxlIiwiZ2V0VGlsZSIsIl9kcmF3T2NlYW4iLCJfZHJhd0NvaW4iLCJfZHJhd01hcEVsZW1lbnQiLCJ0aWxlSW5kZXgiLCJhbmltYXRlZEZyYW1lUmVxdWVzdCIsInRpY2tMZW5ndGgiLCJ0RnJhbWUiLCJuZXh0VGljayIsImxhc3RUaWNrIiwibnVtVGlja3MiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJoYW5kbGVSdW4iLCJwZXJmb3JtYW5jZSIsIm5vdyIsInQiLCJydW4iLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIkJPUkRFUl9DT05URU5UIiwicHJvcCIsInZhbHVlIiwidW5kZWZpbmVkIiwiYm9yZGVyTGVuZ3RoIiwiY2VpbCIsIm1heCIsIl9idWlsZENvbXBsZXRlTWFwIiwiX2J1aWxkQ29saXNpb25NYXAiLCJfYnVpbGRCb3R0b21MYXllciIsIl9idWlsZFRvcExheWVyIiwiZW50aXJlTWFwT2ZLZXlzIiwiX2FkZEJvcmRlciIsIm1hcFdpdGhUaWxlSW5kaWNlcyIsIm1hcEVsZW1lbnQiLCJ2YWx1ZXMiLCJmaWx0ZXIiLCJ0b3BMYXllciIsImZpbGwiLCJlbGVtZW50IiwiX2dldEVsZW1lbnRCeUtleSIsInB1c2giLCJfY29sbGlzaW9uTWFwIiwiaGFzIiwiaXNPYnN0YWNsZSIsIkJvb2xlYW4iLCJvYnN0YWNsZSIsImVsIiwiY2FsbGJhY2siLCJlbGVtZW50Rm91bmQiLCJjb2luS2V5IiwiZ2FtZSIsIm51bU9mUm93cyIsInByZXR0eVN0cmluZyIsInBsYXlhYmxlR2FtZSIsIm51bVJvd3MiLCJudW1Db2xzIiwiYm9yZGVyTGVuIiwiZmlsbE51bWJlciIsIm5ld0dhbWUiLCJuZXdSb3dMZW4iLCJmaXJzdExpbmUiLCJuZXdMaW5lIiwic2xpY2UiLCJkaXNwYXRjaEZ1bmN0aW9uIiwiY29sbGlzaW9uT2Zmc2V0IiwiX2F2YWlsYWJsZUluaXRpYWxQb3NpdGlvbnMiLCJfaW5pdFBsYXllciIsIm5wY3MiLCJfaW5pdE5QQ3MiLCJQbGF5ZXIiLCJzY3JlZW5YIiwic2NyZWVuWSIsIkNBVFMiLCJucGNEZXNjIiwicG9zaXRpb24iLCJfZ2V0UmFuZG9tSW5pdGlhbFBvc2l0aW9uIiwiTlBDIiwiYXNzZXQiLCJkaWFsb2ciLCJtYXhEaXN0YW5jZSIsImluaXRpYWxEaXJlY3Rpb24iLCJjb2xsaWRlIiwibnBjc01vdmUiLCJucGMiLCJvdGhlck5QQ3MiLCJzcGxpY2UiLCJwbGF5ZXJDb2xsaXNpb24iLCJjaGVja05QQ3NDb2xsaXNpb24iLCJucGNDb2xsaXNpb24iLCJtYXBDb2xsaXNpb24iLCJtZXRPc3RhY2xlIiwicmVkdWNlIiwiYWNjIiwibWV0TlBDIiwibW92ZSIsImdldERpc3BsYXlJbmZvIiwia2VlcEltbW9iaWxlIiwibnBjTGlzdCIsIm5wY0luZGV4IiwiY3VycmVudENvbGxpc2lvbiIsIl9oYW5kbGVTcGVlY2giLCJfY2FuY2VsU3BlZWNoRGlhbG9nIiwiY2hlY2tBbmRIaWRlQ29pbnMiLCJmb3VuZENvaW4iLCJjb2luc0NvbGxlY3RlZCIsImNvbnNvbGUiLCJsb2ciLCJfc3BlZWNoRGlhbG9nSW52b2tlZCIsIl9kaXNwbGF5U3BlZWNoRGlhbG9nIiwiY29udGVudCIsInJlc3QiLCJfc2V0SW5pdGlhbERpcmVjdGlvbiIsIl9kaXN0YW5jZVRyYXZlbGVkIiwibWV0T3RoZXJOUENzIiwiX3JhbmRvbWx5RGlyZWN0aW9uTW92ZSIsImFsbERpcmVjdGlvbiIsInJhbmRvbUluZGV4IiwicmFuZG9tIiwicmFuZG9tTWV0aG9kIiwiX3NjcmVlblgiLCJfc2NyZWVuWSIsImluaXRpYWxTdGF0ZSIsIl9mcmFtZVNldHMiLCJfY3JlYXRlRnJhbWVTZXRzIiwiZnJhbWVTZXRzIiwic2VxdWVuY2UiLCJfZ2V0VGlsZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkZBQTJGLE1BQU07QUFDakc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxtQzs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsaUJBQWlCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsYUFBYTtBQUMxRDtBQUNBLGFBQWEsRUFBRTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxlQUFlO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELEtBQUs7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDLHdCQUF3QixJQUFJO0FBQzVCLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEM7Ozs7Ozs7Ozs7OztBQ2hxQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7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QUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7O0FDdE5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQytFO0FBQ0Y7QUFDNEI7QUFDN0M7QUFDNUQ7QUFDMEQ7QUFDUjtBQUNzSDtBQUN4SDtBQUM0QjtBQUNkO0FBQ2U7QUFDSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLHlDQUF5QyxzRUFBYywwQkFBMEIsMkZB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ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLyoqXG5AbGljZW5zZVxuQ29weXJpZ2h0IChjKSAyMDE5IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cblRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0IFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbmh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dCBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmVcbmZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0IENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzXG5wYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzbyBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50XG5mb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiovXG4vKipcbiAqIFdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBgYWRvcHRlZFN0eWxlU2hlZXRzYC5cbiAqL1xuZXhwb3J0IGNvbnN0IHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cyA9ICh3aW5kb3cuU2hhZG93Um9vdCkgJiZcbiAgICAod2luZG93LlNoYWR5Q1NTID09PSB1bmRlZmluZWQgfHwgd2luZG93LlNoYWR5Q1NTLm5hdGl2ZVNoYWRvdykgJiZcbiAgICAoJ2Fkb3B0ZWRTdHlsZVNoZWV0cycgaW4gRG9jdW1lbnQucHJvdG90eXBlKSAmJlxuICAgICgncmVwbGFjZScgaW4gQ1NTU3R5bGVTaGVldC5wcm90b3R5cGUpO1xuY29uc3QgY29uc3RydWN0aW9uVG9rZW4gPSBTeW1ib2woKTtcbmV4cG9ydCBjbGFzcyBDU1NSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKGNzc1RleHQsIHNhZmVUb2tlbikge1xuICAgICAgICBpZiAoc2FmZVRva2VuICE9PSBjb25zdHJ1Y3Rpb25Ub2tlbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDU1NSZXN1bHQgaXMgbm90IGNvbnN0cnVjdGFibGUuIFVzZSBgdW5zYWZlQ1NTYCBvciBgY3NzYCBpbnN0ZWFkLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3NzVGV4dCA9IGNzc1RleHQ7XG4gICAgfVxuICAgIC8vIE5vdGUsIHRoaXMgaXMgYSBnZXR0ZXIgc28gdGhhdCBpdCdzIGxhenkuIEluIHByYWN0aWNlLCB0aGlzIG1lYW5zXG4gICAgLy8gc3R5bGVzaGVldHMgYXJlIG5vdCBjcmVhdGVkIHVudGlsIHRoZSBmaXJzdCBlbGVtZW50IGluc3RhbmNlIGlzIG1hZGUuXG4gICAgZ2V0IHN0eWxlU2hlZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdHlsZVNoZWV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIE5vdGUsIGlmIGBzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHNgIGlzIHRydWUgdGhlbiB3ZSBhc3N1bWVcbiAgICAgICAgICAgIC8vIENTU1N0eWxlU2hlZXQgaXMgY29uc3RydWN0YWJsZS5cbiAgICAgICAgICAgIGlmIChzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZVNoZWV0ID0gbmV3IENTU1N0eWxlU2hlZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZVNoZWV0LnJlcGxhY2VTeW5jKHRoaXMuY3NzVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZVNoZWV0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGVTaGVldDtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNzc1RleHQ7XG4gICAgfVxufVxuLyoqXG4gKiBXcmFwIGEgdmFsdWUgZm9yIGludGVycG9sYXRpb24gaW4gYSBbW2Bjc3NgXV0gdGFnZ2VkIHRlbXBsYXRlIGxpdGVyYWwuXG4gKlxuICogVGhpcyBpcyB1bnNhZmUgYmVjYXVzZSB1bnRydXN0ZWQgQ1NTIHRleHQgY2FuIGJlIHVzZWQgdG8gcGhvbmUgaG9tZVxuICogb3IgZXhmaWx0cmF0ZSBkYXRhIHRvIGFuIGF0dGFja2VyIGNvbnRyb2xsZWQgc2l0ZS4gVGFrZSBjYXJlIHRvIG9ubHkgdXNlXG4gKiB0aGlzIHdpdGggdHJ1c3RlZCBpbnB1dC5cbiAqL1xuZXhwb3J0IGNvbnN0IHVuc2FmZUNTUyA9ICh2YWx1ZSkgPT4ge1xuICAgIHJldHVybiBuZXcgQ1NTUmVzdWx0KFN0cmluZyh2YWx1ZSksIGNvbnN0cnVjdGlvblRva2VuKTtcbn07XG5jb25zdCB0ZXh0RnJvbUNTU1Jlc3VsdCA9ICh2YWx1ZSkgPT4ge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIENTU1Jlc3VsdCkge1xuICAgICAgICByZXR1cm4gdmFsdWUuY3NzVGV4dDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFZhbHVlIHBhc3NlZCB0byAnY3NzJyBmdW5jdGlvbiBtdXN0IGJlIGEgJ2NzcycgZnVuY3Rpb24gcmVzdWx0OiAke3ZhbHVlfS4gVXNlICd1bnNhZmVDU1MnIHRvIHBhc3Mgbm9uLWxpdGVyYWwgdmFsdWVzLCBidXRcbiAgICAgICAgICAgIHRha2UgY2FyZSB0byBlbnN1cmUgcGFnZSBzZWN1cml0eS5gKTtcbiAgICB9XG59O1xuLyoqXG4gKiBUZW1wbGF0ZSB0YWcgd2hpY2ggd2hpY2ggY2FuIGJlIHVzZWQgd2l0aCBMaXRFbGVtZW50J3MgW1tMaXRFbGVtZW50LnN0eWxlcyB8XG4gKiBgc3R5bGVzYF1dIHByb3BlcnR5IHRvIHNldCBlbGVtZW50IHN0eWxlcy4gRm9yIHNlY3VyaXR5IHJlYXNvbnMsIG9ubHkgbGl0ZXJhbFxuICogc3RyaW5nIHZhbHVlcyBtYXkgYmUgdXNlZC4gVG8gaW5jb3Jwb3JhdGUgbm9uLWxpdGVyYWwgdmFsdWVzIFtbYHVuc2FmZUNTU2BdXVxuICogbWF5IGJlIHVzZWQgaW5zaWRlIGEgdGVtcGxhdGUgc3RyaW5nIHBhcnQuXG4gKi9cbmV4cG9ydCBjb25zdCBjc3MgPSAoc3RyaW5ncywgLi4udmFsdWVzKSA9PiB7XG4gICAgY29uc3QgY3NzVGV4dCA9IHZhbHVlcy5yZWR1Y2UoKGFjYywgdiwgaWR4KSA9PiBhY2MgKyB0ZXh0RnJvbUNTU1Jlc3VsdCh2KSArIHN0cmluZ3NbaWR4ICsgMV0sIHN0cmluZ3NbMF0pO1xuICAgIHJldHVybiBuZXcgQ1NTUmVzdWx0KGNzc1RleHQsIGNvbnN0cnVjdGlvblRva2VuKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jc3MtdGFnLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmNvbnN0IGxlZ2FjeUN1c3RvbUVsZW1lbnQgPSAodGFnTmFtZSwgY2xhenopID0+IHtcbiAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKHRhZ05hbWUsIGNsYXp6KTtcbiAgICAvLyBDYXN0IGFzIGFueSBiZWNhdXNlIFRTIGRvZXNuJ3QgcmVjb2duaXplIHRoZSByZXR1cm4gdHlwZSBhcyBiZWluZyBhXG4gICAgLy8gc3VidHlwZSBvZiB0aGUgZGVjb3JhdGVkIGNsYXNzIHdoZW4gY2xhenogaXMgdHlwZWQgYXNcbiAgICAvLyBgQ29uc3RydWN0b3I8SFRNTEVsZW1lbnQ+YCBmb3Igc29tZSByZWFzb24uXG4gICAgLy8gYENvbnN0cnVjdG9yPEhUTUxFbGVtZW50PmAgaXMgaGVscGZ1bCB0byBtYWtlIHN1cmUgdGhlIGRlY29yYXRvciBpc1xuICAgIC8vIGFwcGxpZWQgdG8gZWxlbWVudHMgaG93ZXZlci5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgcmV0dXJuIGNsYXp6O1xufTtcbmNvbnN0IHN0YW5kYXJkQ3VzdG9tRWxlbWVudCA9ICh0YWdOYW1lLCBkZXNjcmlwdG9yKSA9PiB7XG4gICAgY29uc3QgeyBraW5kLCBlbGVtZW50cyB9ID0gZGVzY3JpcHRvcjtcbiAgICByZXR1cm4ge1xuICAgICAgICBraW5kLFxuICAgICAgICBlbGVtZW50cyxcbiAgICAgICAgLy8gVGhpcyBjYWxsYmFjayBpcyBjYWxsZWQgb25jZSB0aGUgY2xhc3MgaXMgb3RoZXJ3aXNlIGZ1bGx5IGRlZmluZWRcbiAgICAgICAgZmluaXNoZXIoY2xhenopIHtcbiAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUodGFnTmFtZSwgY2xhenopO1xuICAgICAgICB9XG4gICAgfTtcbn07XG4vKipcbiAqIENsYXNzIGRlY29yYXRvciBmYWN0b3J5IHRoYXQgZGVmaW5lcyB0aGUgZGVjb3JhdGVkIGNsYXNzIGFzIGEgY3VzdG9tIGVsZW1lbnQuXG4gKlxuICogYGBgXG4gKiBAY3VzdG9tRWxlbWVudCgnbXktZWxlbWVudCcpXG4gKiBjbGFzcyBNeUVsZW1lbnQge1xuICogICByZW5kZXIoKSB7XG4gKiAgICAgcmV0dXJuIGh0bWxgYDtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgRGVjb3JhdG9yXG4gKiBAcGFyYW0gdGFnTmFtZSBUaGUgbmFtZSBvZiB0aGUgY3VzdG9tIGVsZW1lbnQgdG8gZGVmaW5lLlxuICovXG5leHBvcnQgY29uc3QgY3VzdG9tRWxlbWVudCA9ICh0YWdOYW1lKSA9PiAoY2xhc3NPckRlc2NyaXB0b3IpID0+ICh0eXBlb2YgY2xhc3NPckRlc2NyaXB0b3IgPT09ICdmdW5jdGlvbicpID9cbiAgICBsZWdhY3lDdXN0b21FbGVtZW50KHRhZ05hbWUsIGNsYXNzT3JEZXNjcmlwdG9yKSA6XG4gICAgc3RhbmRhcmRDdXN0b21FbGVtZW50KHRhZ05hbWUsIGNsYXNzT3JEZXNjcmlwdG9yKTtcbmNvbnN0IHN0YW5kYXJkUHJvcGVydHkgPSAob3B0aW9ucywgZWxlbWVudCkgPT4ge1xuICAgIC8vIFdoZW4gZGVjb3JhdGluZyBhbiBhY2Nlc3NvciwgcGFzcyBpdCB0aHJvdWdoIGFuZCBhZGQgcHJvcGVydHkgbWV0YWRhdGEuXG4gICAgLy8gTm90ZSwgdGhlIGBoYXNPd25Qcm9wZXJ0eWAgY2hlY2sgaW4gYGNyZWF0ZVByb3BlcnR5YCBlbnN1cmVzIHdlIGRvbid0XG4gICAgLy8gc3RvbXAgb3ZlciB0aGUgdXNlcidzIGFjY2Vzc29yLlxuICAgIGlmIChlbGVtZW50LmtpbmQgPT09ICdtZXRob2QnICYmIGVsZW1lbnQuZGVzY3JpcHRvciAmJlxuICAgICAgICAhKCd2YWx1ZScgaW4gZWxlbWVudC5kZXNjcmlwdG9yKSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBlbGVtZW50KSwgeyBmaW5pc2hlcihjbGF6eikge1xuICAgICAgICAgICAgICAgIGNsYXp6LmNyZWF0ZVByb3BlcnR5KGVsZW1lbnQua2V5LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBjcmVhdGVQcm9wZXJ0eSgpIHRha2VzIGNhcmUgb2YgZGVmaW5pbmcgdGhlIHByb3BlcnR5LCBidXQgd2Ugc3RpbGxcbiAgICAgICAgLy8gbXVzdCByZXR1cm4gc29tZSBraW5kIG9mIGRlc2NyaXB0b3IsIHNvIHJldHVybiBhIGRlc2NyaXB0b3IgZm9yIGFuXG4gICAgICAgIC8vIHVudXNlZCBwcm90b3R5cGUgZmllbGQuIFRoZSBmaW5pc2hlciBjYWxscyBjcmVhdGVQcm9wZXJ0eSgpLlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2luZDogJ2ZpZWxkJyxcbiAgICAgICAgICAgIGtleTogU3ltYm9sKCksXG4gICAgICAgICAgICBwbGFjZW1lbnQ6ICdvd24nLFxuICAgICAgICAgICAgZGVzY3JpcHRvcjoge30sXG4gICAgICAgICAgICAvLyBXaGVuIEBiYWJlbC9wbHVnaW4tcHJvcG9zYWwtZGVjb3JhdG9ycyBpbXBsZW1lbnRzIGluaXRpYWxpemVycyxcbiAgICAgICAgICAgIC8vIGRvIHRoaXMgaW5zdGVhZCBvZiB0aGUgaW5pdGlhbGl6ZXIgYmVsb3cuIFNlZTpcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvOTI2MCBleHRyYXM6IFtcbiAgICAgICAgICAgIC8vICAge1xuICAgICAgICAgICAgLy8gICAgIGtpbmQ6ICdpbml0aWFsaXplcicsXG4gICAgICAgICAgICAvLyAgICAgcGxhY2VtZW50OiAnb3duJyxcbiAgICAgICAgICAgIC8vICAgICBpbml0aWFsaXplcjogZGVzY3JpcHRvci5pbml0aWFsaXplcixcbiAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgLy8gXSxcbiAgICAgICAgICAgIGluaXRpYWxpemVyKCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZWxlbWVudC5pbml0aWFsaXplciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2VsZW1lbnQua2V5XSA9IGVsZW1lbnQuaW5pdGlhbGl6ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluaXNoZXIoY2xhenopIHtcbiAgICAgICAgICAgICAgICBjbGF6ei5jcmVhdGVQcm9wZXJ0eShlbGVtZW50LmtleSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufTtcbmNvbnN0IGxlZ2FjeVByb3BlcnR5ID0gKG9wdGlvbnMsIHByb3RvLCBuYW1lKSA9PiB7XG4gICAgcHJvdG8uY29uc3RydWN0b3JcbiAgICAgICAgLmNyZWF0ZVByb3BlcnR5KG5hbWUsIG9wdGlvbnMpO1xufTtcbi8qKlxuICogQSBwcm9wZXJ0eSBkZWNvcmF0b3Igd2hpY2ggY3JlYXRlcyBhIExpdEVsZW1lbnQgcHJvcGVydHkgd2hpY2ggcmVmbGVjdHMgYVxuICogY29ycmVzcG9uZGluZyBhdHRyaWJ1dGUgdmFsdWUuIEEgW1tgUHJvcGVydHlEZWNsYXJhdGlvbmBdXSBtYXkgb3B0aW9uYWxseSBiZVxuICogc3VwcGxpZWQgdG8gY29uZmlndXJlIHByb3BlcnR5IGZlYXR1cmVzLlxuICpcbiAqIFRoaXMgZGVjb3JhdG9yIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIHB1YmxpYyBmaWVsZHMuIFByaXZhdGUgb3IgcHJvdGVjdGVkXG4gKiBmaWVsZHMgc2hvdWxkIHVzZSB0aGUgW1tgaW50ZXJuYWxQcm9wZXJ0eWBdXSBkZWNvcmF0b3IuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBjbGFzcyBNeUVsZW1lbnQge1xuICogICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gKiAgIGNsaWNrZWQgPSBmYWxzZTtcbiAqIH1cbiAqIGBgYFxuICogQGNhdGVnb3J5IERlY29yYXRvclxuICogQEV4cG9ydERlY29yYXRlZEl0ZW1zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eShvcHRpb25zKSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBkZWNvcmF0b3JcbiAgICByZXR1cm4gKHByb3RvT3JEZXNjcmlwdG9yLCBuYW1lKSA9PiAobmFtZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgIGxlZ2FjeVByb3BlcnR5KG9wdGlvbnMsIHByb3RvT3JEZXNjcmlwdG9yLCBuYW1lKSA6XG4gICAgICAgIHN0YW5kYXJkUHJvcGVydHkob3B0aW9ucywgcHJvdG9PckRlc2NyaXB0b3IpO1xufVxuLyoqXG4gKiBEZWNsYXJlcyBhIHByaXZhdGUgb3IgcHJvdGVjdGVkIHByb3BlcnR5IHRoYXQgc3RpbGwgdHJpZ2dlcnMgdXBkYXRlcyB0byB0aGVcbiAqIGVsZW1lbnQgd2hlbiBpdCBjaGFuZ2VzLlxuICpcbiAqIFByb3BlcnRpZXMgZGVjbGFyZWQgdGhpcyB3YXkgbXVzdCBub3QgYmUgdXNlZCBmcm9tIEhUTUwgb3IgSFRNTCB0ZW1wbGF0aW5nXG4gKiBzeXN0ZW1zLCB0aGV5J3JlIHNvbGVseSBmb3IgcHJvcGVydGllcyBpbnRlcm5hbCB0byB0aGUgZWxlbWVudC4gVGhlc2VcbiAqIHByb3BlcnRpZXMgbWF5IGJlIHJlbmFtZWQgYnkgb3B0aW1pemF0aW9uIHRvb2xzIGxpa2UgY2xvc3VyZSBjb21waWxlci5cbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludGVybmFsUHJvcGVydHkob3B0aW9ucykge1xuICAgIHJldHVybiBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogZmFsc2UsIGhhc0NoYW5nZWQ6IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5oYXNDaGFuZ2VkIH0pO1xufVxuLyoqXG4gKiBBIHByb3BlcnR5IGRlY29yYXRvciB0aGF0IGNvbnZlcnRzIGEgY2xhc3MgcHJvcGVydHkgaW50byBhIGdldHRlciB0aGF0XG4gKiBleGVjdXRlcyBhIHF1ZXJ5U2VsZWN0b3Igb24gdGhlIGVsZW1lbnQncyByZW5kZXJSb290LlxuICpcbiAqIEBwYXJhbSBzZWxlY3RvciBBIERPTVN0cmluZyBjb250YWluaW5nIG9uZSBvciBtb3JlIHNlbGVjdG9ycyB0byBtYXRjaC5cbiAqIEBwYXJhbSBjYWNoZSBBbiBvcHRpb25hbCBib29sZWFuIHdoaWNoIHdoZW4gdHJ1ZSBwZXJmb3JtcyB0aGUgRE9NIHF1ZXJ5IG9ubHlcbiAqIG9uY2UgYW5kIGNhY2hlcyB0aGUgcmVzdWx0LlxuICpcbiAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L3F1ZXJ5U2VsZWN0b3JcbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqIGBgYHRzXG4gKiBjbGFzcyBNeUVsZW1lbnQge1xuICogICBAcXVlcnkoJyNmaXJzdCcpXG4gKiAgIGZpcnN0O1xuICpcbiAqICAgcmVuZGVyKCkge1xuICogICAgIHJldHVybiBodG1sYFxuICogICAgICAgPGRpdiBpZD1cImZpcnN0XCI+PC9kaXY+XG4gKiAgICAgICA8ZGl2IGlkPVwic2Vjb25kXCI+PC9kaXY+XG4gKiAgICAgYDtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgRGVjb3JhdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeShzZWxlY3RvciwgY2FjaGUpIHtcbiAgICByZXR1cm4gKHByb3RvT3JEZXNjcmlwdG9yLCBcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGRlY29yYXRvclxuICAgIG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJSb290LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gdHlwZW9mIG5hbWUgPT09ICdzeW1ib2wnID8gU3ltYm9sKCkgOiBgX18ke25hbWV9YDtcbiAgICAgICAgICAgIGRlc2NyaXB0b3IuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAodGhpc1trZXldID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyUm9vdC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW2tleV07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAobmFtZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgICAgICBsZWdhY3lRdWVyeShkZXNjcmlwdG9yLCBwcm90b09yRGVzY3JpcHRvciwgbmFtZSkgOlxuICAgICAgICAgICAgc3RhbmRhcmRRdWVyeShkZXNjcmlwdG9yLCBwcm90b09yRGVzY3JpcHRvcik7XG4gICAgfTtcbn1cbi8vIE5vdGUsIGluIHRoZSBmdXR1cmUsIHdlIG1heSBleHRlbmQgdGhpcyBkZWNvcmF0b3IgdG8gc3VwcG9ydCB0aGUgdXNlIGNhc2Vcbi8vIHdoZXJlIHRoZSBxdWVyaWVkIGVsZW1lbnQgbWF5IG5lZWQgdG8gZG8gd29yayB0byBiZWNvbWUgcmVhZHkgdG8gaW50ZXJhY3Rcbi8vIHdpdGggKGUuZy4gbG9hZCBzb21lIGltcGxlbWVudGF0aW9uIGNvZGUpLiBJZiBzbywgd2UgbWlnaHQgZWxlY3QgdG9cbi8vIGFkZCBhIHNlY29uZCBhcmd1bWVudCBkZWZpbmluZyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHJ1biB0byBtYWtlIHRoZVxuLy8gcXVlcmllZCBlbGVtZW50IGxvYWRlZC91cGRhdGVkL3JlYWR5LlxuLyoqXG4gKiBBIHByb3BlcnR5IGRlY29yYXRvciB0aGF0IGNvbnZlcnRzIGEgY2xhc3MgcHJvcGVydHkgaW50byBhIGdldHRlciB0aGF0XG4gKiByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSByZXN1bHQgb2YgYSBxdWVyeVNlbGVjdG9yIG9uIHRoZVxuICogZWxlbWVudCdzIHJlbmRlclJvb3QgZG9uZSBhZnRlciB0aGUgZWxlbWVudCdzIGB1cGRhdGVDb21wbGV0ZWAgcHJvbWlzZVxuICogcmVzb2x2ZXMuIFdoZW4gdGhlIHF1ZXJpZWQgcHJvcGVydHkgbWF5IGNoYW5nZSB3aXRoIGVsZW1lbnQgc3RhdGUsIHRoaXNcbiAqIGRlY29yYXRvciBjYW4gYmUgdXNlZCBpbnN0ZWFkIG9mIHJlcXVpcmluZyB1c2VycyB0byBhd2FpdCB0aGVcbiAqIGB1cGRhdGVDb21wbGV0ZWAgYmVmb3JlIGFjY2Vzc2luZyB0aGUgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHNlbGVjdG9yIEEgRE9NU3RyaW5nIGNvbnRhaW5pbmcgb25lIG9yIG1vcmUgc2VsZWN0b3JzIHRvIG1hdGNoLlxuICpcbiAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L3F1ZXJ5U2VsZWN0b3JcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIGNsYXNzIE15RWxlbWVudCB7XG4gKiAgIEBxdWVyeUFzeW5jKCcjZmlyc3QnKVxuICogICBmaXJzdDtcbiAqXG4gKiAgIHJlbmRlcigpIHtcbiAqICAgICByZXR1cm4gaHRtbGBcbiAqICAgICAgIDxkaXYgaWQ9XCJmaXJzdFwiPjwvZGl2PlxuICogICAgICAgPGRpdiBpZD1cInNlY29uZFwiPjwvZGl2PlxuICogICAgIGA7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiAvLyBleHRlcm5hbCB1c2FnZVxuICogYXN5bmMgZG9Tb21ldGhpbmdXaXRoRmlyc3QoKSB7XG4gKiAgKGF3YWl0IGFNeUVsZW1lbnQuZmlyc3QpLmRvU29tZXRoaW5nKCk7XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5QXN5bmMoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gKHByb3RvT3JEZXNjcmlwdG9yLCBcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGRlY29yYXRvclxuICAgIG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgICAgIGFzeW5jIGdldCgpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnVwZGF0ZUNvbXBsZXRlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlclJvb3QucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChuYW1lICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgICAgIGxlZ2FjeVF1ZXJ5KGRlc2NyaXB0b3IsIHByb3RvT3JEZXNjcmlwdG9yLCBuYW1lKSA6XG4gICAgICAgICAgICBzdGFuZGFyZFF1ZXJ5KGRlc2NyaXB0b3IsIHByb3RvT3JEZXNjcmlwdG9yKTtcbiAgICB9O1xufVxuLyoqXG4gKiBBIHByb3BlcnR5IGRlY29yYXRvciB0aGF0IGNvbnZlcnRzIGEgY2xhc3MgcHJvcGVydHkgaW50byBhIGdldHRlclxuICogdGhhdCBleGVjdXRlcyBhIHF1ZXJ5U2VsZWN0b3JBbGwgb24gdGhlIGVsZW1lbnQncyByZW5kZXJSb290LlxuICpcbiAqIEBwYXJhbSBzZWxlY3RvciBBIERPTVN0cmluZyBjb250YWluaW5nIG9uZSBvciBtb3JlIHNlbGVjdG9ycyB0byBtYXRjaC5cbiAqXG4gKiBTZWU6XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRG9jdW1lbnQvcXVlcnlTZWxlY3RvckFsbFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogY2xhc3MgTXlFbGVtZW50IHtcbiAqICAgQHF1ZXJ5QWxsKCdkaXYnKVxuICogICBkaXZzO1xuICpcbiAqICAgcmVuZGVyKCkge1xuICogICAgIHJldHVybiBodG1sYFxuICogICAgICAgPGRpdiBpZD1cImZpcnN0XCI+PC9kaXY+XG4gKiAgICAgICA8ZGl2IGlkPVwic2Vjb25kXCI+PC9kaXY+XG4gKiAgICAgYDtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgRGVjb3JhdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeUFsbChzZWxlY3Rvcikge1xuICAgIHJldHVybiAocHJvdG9PckRlc2NyaXB0b3IsIFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgZGVjb3JhdG9yXG4gICAgbmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0ge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlclJvb3QucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChuYW1lICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgICAgIGxlZ2FjeVF1ZXJ5KGRlc2NyaXB0b3IsIHByb3RvT3JEZXNjcmlwdG9yLCBuYW1lKSA6XG4gICAgICAgICAgICBzdGFuZGFyZFF1ZXJ5KGRlc2NyaXB0b3IsIHByb3RvT3JEZXNjcmlwdG9yKTtcbiAgICB9O1xufVxuY29uc3QgbGVnYWN5UXVlcnkgPSAoZGVzY3JpcHRvciwgcHJvdG8sIG5hbWUpID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sIG5hbWUsIGRlc2NyaXB0b3IpO1xufTtcbmNvbnN0IHN0YW5kYXJkUXVlcnkgPSAoZGVzY3JpcHRvciwgZWxlbWVudCkgPT4gKHtcbiAgICBraW5kOiAnbWV0aG9kJyxcbiAgICBwbGFjZW1lbnQ6ICdwcm90b3R5cGUnLFxuICAgIGtleTogZWxlbWVudC5rZXksXG4gICAgZGVzY3JpcHRvcixcbn0pO1xuY29uc3Qgc3RhbmRhcmRFdmVudE9wdGlvbnMgPSAob3B0aW9ucywgZWxlbWVudCkgPT4ge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGVsZW1lbnQpLCB7IGZpbmlzaGVyKGNsYXp6KSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGNsYXp6LnByb3RvdHlwZVtlbGVtZW50LmtleV0sIG9wdGlvbnMpO1xuICAgICAgICB9IH0pO1xufTtcbmNvbnN0IGxlZ2FjeUV2ZW50T3B0aW9ucyA9IFxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBsZWdhY3kgZGVjb3JhdG9yXG4ob3B0aW9ucywgcHJvdG8sIG5hbWUpID0+IHtcbiAgICBPYmplY3QuYXNzaWduKHByb3RvW25hbWVdLCBvcHRpb25zKTtcbn07XG4vKipcbiAqIEFkZHMgZXZlbnQgbGlzdGVuZXIgb3B0aW9ucyB0byBhIG1ldGhvZCB1c2VkIGFzIGFuIGV2ZW50IGxpc3RlbmVyIGluIGFcbiAqIGxpdC1odG1sIHRlbXBsYXRlLlxuICpcbiAqIEBwYXJhbSBvcHRpb25zIEFuIG9iamVjdCB0aGF0IHNwZWNpZmllcyBldmVudCBsaXN0ZW5lciBvcHRpb25zIGFzIGFjY2VwdGVkIGJ5XG4gKiBgRXZlbnRUYXJnZXQjYWRkRXZlbnRMaXN0ZW5lcmAgYW5kIGBFdmVudFRhcmdldCNyZW1vdmVFdmVudExpc3RlbmVyYC5cbiAqXG4gKiBDdXJyZW50IGJyb3dzZXJzIHN1cHBvcnQgdGhlIGBjYXB0dXJlYCwgYHBhc3NpdmVgLCBhbmQgYG9uY2VgIG9wdGlvbnMuIFNlZTpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldC9hZGRFdmVudExpc3RlbmVyI1BhcmFtZXRlcnNcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIGNsYXNzIE15RWxlbWVudCB7XG4gKiAgIGNsaWNrZWQgPSBmYWxzZTtcbiAqXG4gKiAgIHJlbmRlcigpIHtcbiAqICAgICByZXR1cm4gaHRtbGBcbiAqICAgICAgIDxkaXYgQGNsaWNrPSR7dGhpcy5fb25DbGlja31gPlxuICogICAgICAgICA8YnV0dG9uPjwvYnV0dG9uPlxuICogICAgICAgPC9kaXY+XG4gKiAgICAgYDtcbiAqICAgfVxuICpcbiAqICAgQGV2ZW50T3B0aW9ucyh7Y2FwdHVyZTogdHJ1ZX0pXG4gKiAgIF9vbkNsaWNrKGUpIHtcbiAqICAgICB0aGlzLmNsaWNrZWQgPSB0cnVlO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIEBjYXRlZ29yeSBEZWNvcmF0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV2ZW50T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgLy8gUmV0dXJuIHZhbHVlIHR5cGVkIGFzIGFueSB0byBwcmV2ZW50IFR5cGVTY3JpcHQgZnJvbSBjb21wbGFpbmluZyB0aGF0XG4gICAgLy8gc3RhbmRhcmQgZGVjb3JhdG9yIGZ1bmN0aW9uIHNpZ25hdHVyZSBkb2VzIG5vdCBtYXRjaCBUeXBlU2NyaXB0IGRlY29yYXRvclxuICAgIC8vIHNpZ25hdHVyZVxuICAgIC8vIFRPRE8oa3NjaGFhZik6IHVuY2xlYXIgd2h5IGl0IHdhcyBvbmx5IGZhaWxpbmcgb24gdGhpcyBkZWNvcmF0b3IgYW5kIG5vdFxuICAgIC8vIHRoZSBvdGhlcnNcbiAgICByZXR1cm4gKChwcm90b09yRGVzY3JpcHRvciwgbmFtZSkgPT4gKG5hbWUgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICBsZWdhY3lFdmVudE9wdGlvbnMob3B0aW9ucywgcHJvdG9PckRlc2NyaXB0b3IsIG5hbWUpIDpcbiAgICAgICAgc3RhbmRhcmRFdmVudE9wdGlvbnMob3B0aW9ucywgcHJvdG9PckRlc2NyaXB0b3IpKTtcbn1cbi8vIHgtYnJvd3NlciBzdXBwb3J0IGZvciBtYXRjaGVzXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG5jb25zdCBFbGVtZW50UHJvdG8gPSBFbGVtZW50LnByb3RvdHlwZTtcbmNvbnN0IGxlZ2FjeU1hdGNoZXMgPSBFbGVtZW50UHJvdG8ubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudFByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3Rvcjtcbi8qKlxuICogQSBwcm9wZXJ0eSBkZWNvcmF0b3IgdGhhdCBjb252ZXJ0cyBhIGNsYXNzIHByb3BlcnR5IGludG8gYSBnZXR0ZXIgdGhhdFxuICogcmV0dXJucyB0aGUgYGFzc2lnbmVkTm9kZXNgIG9mIHRoZSBnaXZlbiBuYW1lZCBgc2xvdGAuIE5vdGUsIHRoZSB0eXBlIG9mXG4gKiB0aGlzIHByb3BlcnR5IHNob3VsZCBiZSBhbm5vdGF0ZWQgYXMgYE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+YC5cbiAqXG4gKiBAcGFyYW0gc2xvdE5hbWUgQSBzdHJpbmcgbmFtZSBvZiB0aGUgc2xvdC5cbiAqIEBwYXJhbSBmbGF0dGVuIEEgYm9vbGVhbiB3aGljaCB3aGVuIHRydWUgZmxhdHRlbnMgdGhlIGFzc2lnbmVkIG5vZGVzLFxuICogbWVhbmluZyBhbnkgYXNzaWduZWQgbm9kZXMgdGhhdCBhcmUgc2xvdCBlbGVtZW50cyBhcmUgcmVwbGFjZWQgd2l0aCB0aGVpclxuICogYXNzaWduZWQgbm9kZXMuXG4gKiBAcGFyYW0gc2VsZWN0b3IgQSBzdHJpbmcgd2hpY2ggZmlsdGVycyB0aGUgcmVzdWx0cyB0byBlbGVtZW50cyB0aGF0IG1hdGNoXG4gKiB0aGUgZ2l2ZW4gY3NzIHNlbGVjdG9yLlxuICpcbiAqICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBjbGFzcyBNeUVsZW1lbnQge1xuICogICBAcXVlcnlBc3NpZ25lZE5vZGVzKCdsaXN0JywgdHJ1ZSwgJy5pdGVtJylcbiAqICAgbGlzdEl0ZW1zO1xuICpcbiAqICAgcmVuZGVyKCkge1xuICogICAgIHJldHVybiBodG1sYFxuICogICAgICAgPHNsb3QgbmFtZT1cImxpc3RcIj48L3Nsb3Q+XG4gKiAgICAgYDtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBAY2F0ZWdvcnkgRGVjb3JhdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeUFzc2lnbmVkTm9kZXMoc2xvdE5hbWUgPSAnJywgZmxhdHRlbiA9IGZhbHNlLCBzZWxlY3RvciA9ICcnKSB7XG4gICAgcmV0dXJuIChwcm90b09yRGVzY3JpcHRvciwgXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBkZWNvcmF0b3JcbiAgICBuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xvdFNlbGVjdG9yID0gYHNsb3Qke3Nsb3ROYW1lID8gYFtuYW1lPSR7c2xvdE5hbWV9XWAgOiAnOm5vdChbbmFtZV0pJ31gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNsb3QgPSB0aGlzLnJlbmRlclJvb3QucXVlcnlTZWxlY3RvcihzbG90U2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGxldCBub2RlcyA9IHNsb3QgJiYgc2xvdC5hc3NpZ25lZE5vZGVzKHsgZmxhdHRlbiB9KTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZXMgJiYgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5maWx0ZXIoKG5vZGUpID0+IG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm1hdGNoZXMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5tYXRjaGVzKHNlbGVjdG9yKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdhY3lNYXRjaGVzLmNhbGwobm9kZSwgc2VsZWN0b3IpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAobmFtZSAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgICAgICBsZWdhY3lRdWVyeShkZXNjcmlwdG9yLCBwcm90b09yRGVzY3JpcHRvciwgbmFtZSkgOlxuICAgICAgICAgICAgc3RhbmRhcmRRdWVyeShkZXNjcmlwdG9yLCBwcm90b09yRGVzY3JpcHRvcik7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlY29yYXRvcnMuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xudmFyIF9hO1xuLyoqXG4gKiBVc2UgdGhpcyBtb2R1bGUgaWYgeW91IHdhbnQgdG8gY3JlYXRlIHlvdXIgb3duIGJhc2UgY2xhc3MgZXh0ZW5kaW5nXG4gKiBbW1VwZGF0aW5nRWxlbWVudF1dLlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKi9cbi8qXG4gKiBXaGVuIHVzaW5nIENsb3N1cmUgQ29tcGlsZXIsIEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkocHJvcGVydHksIG9iamVjdCkgaXNcbiAqIHJlcGxhY2VkIGF0IGNvbXBpbGUgdGltZSBieSB0aGUgbXVuZ2VkIG5hbWUgZm9yIG9iamVjdFtwcm9wZXJ0eV0uIFdlIGNhbm5vdFxuICogYWxpYXMgdGhpcyBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byB1c2UgYSBzbWFsbCBzaGltIHRoYXQgaGFzIHRoZSBzYW1lXG4gKiBiZWhhdmlvciB3aGVuIG5vdCBjb21waWxpbmcuXG4gKi9cbndpbmRvdy5KU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5ID1cbiAgICAocHJvcCwgX29iaikgPT4gcHJvcDtcbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29udmVydGVyID0ge1xuICAgIHRvQXR0cmlidXRlKHZhbHVlLCB0eXBlKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBCb29sZWFuOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/ICcnIDogbnVsbDtcbiAgICAgICAgICAgIGNhc2UgT2JqZWN0OlxuICAgICAgICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgYG51bGxgIG9yIGB1bmRlZmluZWRgIHBhc3MgdGhpcyB0aHJvdWdoXG4gICAgICAgICAgICAgICAgLy8gdG8gYWxsb3cgcmVtb3Zpbmcvbm8gY2hhbmdlIGJlaGF2aW9yLlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gdmFsdWUgOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgZnJvbUF0dHJpYnV0ZSh2YWx1ZSwgdHlwZSkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQm9vbGVhbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IG51bGw7XG4gICAgICAgICAgICBjYXNlIE51bWJlcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgPyBudWxsIDogTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgIGNhc2UgT2JqZWN0OlxuICAgICAgICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn07XG4vKipcbiAqIENoYW5nZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIGRpZmZlcmVudCBmcm9tIGBvbGRWYWx1ZWAuXG4gKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGFzIHRoZSBkZWZhdWx0IGZvciBhIHByb3BlcnR5J3MgYGhhc0NoYW5nZWRgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3Qgbm90RXF1YWwgPSAodmFsdWUsIG9sZCkgPT4ge1xuICAgIC8vIFRoaXMgZW5zdXJlcyAob2xkPT1OYU4sIHZhbHVlPT1OYU4pIGFsd2F5cyByZXR1cm5zIGZhbHNlXG4gICAgcmV0dXJuIG9sZCAhPT0gdmFsdWUgJiYgKG9sZCA9PT0gb2xkIHx8IHZhbHVlID09PSB2YWx1ZSk7XG59O1xuY29uc3QgZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb24gPSB7XG4gICAgYXR0cmlidXRlOiB0cnVlLFxuICAgIHR5cGU6IFN0cmluZyxcbiAgICBjb252ZXJ0ZXI6IGRlZmF1bHRDb252ZXJ0ZXIsXG4gICAgcmVmbGVjdDogZmFsc2UsXG4gICAgaGFzQ2hhbmdlZDogbm90RXF1YWxcbn07XG5jb25zdCBTVEFURV9IQVNfVVBEQVRFRCA9IDE7XG5jb25zdCBTVEFURV9VUERBVEVfUkVRVUVTVEVEID0gMSA8PCAyO1xuY29uc3QgU1RBVEVfSVNfUkVGTEVDVElOR19UT19BVFRSSUJVVEUgPSAxIDw8IDM7XG5jb25zdCBTVEFURV9JU19SRUZMRUNUSU5HX1RPX1BST1BFUlRZID0gMSA8PCA0O1xuLyoqXG4gKiBUaGUgQ2xvc3VyZSBKUyBDb21waWxlciBkb2Vzbid0IGN1cnJlbnRseSBoYXZlIGdvb2Qgc3VwcG9ydCBmb3Igc3RhdGljXG4gKiBwcm9wZXJ0eSBzZW1hbnRpY3Mgd2hlcmUgXCJ0aGlzXCIgaXMgZHluYW1pYyAoZS5nLlxuICogaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9jbG9zdXJlLWNvbXBpbGVyL2lzc3Vlcy8zMTc3IGFuZCBvdGhlcnMpIHNvIHdlIHVzZVxuICogdGhpcyBoYWNrIHRvIGJ5cGFzcyBhbnkgcmV3cml0aW5nIGJ5IHRoZSBjb21waWxlci5cbiAqL1xuY29uc3QgZmluYWxpemVkID0gJ2ZpbmFsaXplZCc7XG4vKipcbiAqIEJhc2UgZWxlbWVudCBjbGFzcyB3aGljaCBtYW5hZ2VzIGVsZW1lbnQgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcy4gV2hlblxuICogcHJvcGVydGllcyBjaGFuZ2UsIHRoZSBgdXBkYXRlYCBtZXRob2QgaXMgYXN5bmNocm9ub3VzbHkgY2FsbGVkLiBUaGlzIG1ldGhvZFxuICogc2hvdWxkIGJlIHN1cHBsaWVkIGJ5IHN1YmNsYXNzZXJzIHRvIHJlbmRlciB1cGRhdGVzIGFzIGRlc2lyZWQuXG4gKiBAbm9Jbmhlcml0RG9jXG4gKi9cbmV4cG9ydCBjbGFzcyBVcGRhdGluZ0VsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBhdHRyaWJ1dGVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHJlZ2lzdGVyZWQgcHJvcGVydGllcy5cbiAgICAgKiBAbm9jb2xsYXBzZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgICAgICAvLyBub3RlOiBwaWdneSBiYWNraW5nIG9uIHRoaXMgdG8gZW5zdXJlIHdlJ3JlIGZpbmFsaXplZC5cbiAgICAgICAgdGhpcy5maW5hbGl6ZSgpO1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gW107XG4gICAgICAgIC8vIFVzZSBmb3JFYWNoIHNvIHRoaXMgd29ya3MgZXZlbiBpZiBmb3Ivb2YgbG9vcHMgYXJlIGNvbXBpbGVkIHRvIGZvciBsb29wc1xuICAgICAgICAvLyBleHBlY3RpbmcgYXJyYXlzXG4gICAgICAgIHRoaXMuX2NsYXNzUHJvcGVydGllcy5mb3JFYWNoKCh2LCBwKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhdHRyID0gdGhpcy5fYXR0cmlidXRlTmFtZUZvclByb3BlcnR5KHAsIHYpO1xuICAgICAgICAgICAgaWYgKGF0dHIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZVRvUHJvcGVydHlNYXAuc2V0KGF0dHIsIHApO1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbnN1cmVzIHRoZSBwcml2YXRlIGBfY2xhc3NQcm9wZXJ0aWVzYCBwcm9wZXJ0eSBtZXRhZGF0YSBpcyBjcmVhdGVkLlxuICAgICAqIEluIGFkZGl0aW9uIHRvIGBmaW5hbGl6ZWAgdGhpcyBpcyBhbHNvIGNhbGxlZCBpbiBgY3JlYXRlUHJvcGVydHlgIHRvXG4gICAgICogZW5zdXJlIHRoZSBgQHByb3BlcnR5YCBkZWNvcmF0b3IgY2FuIGFkZCBwcm9wZXJ0eSBtZXRhZGF0YS5cbiAgICAgKi9cbiAgICAvKiogQG5vY29sbGFwc2UgKi9cbiAgICBzdGF0aWMgX2Vuc3VyZUNsYXNzUHJvcGVydGllcygpIHtcbiAgICAgICAgLy8gZW5zdXJlIHByaXZhdGUgc3RvcmFnZSBmb3IgcHJvcGVydHkgZGVjbGFyYXRpb25zLlxuICAgICAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoSlNDb21waWxlcl9yZW5hbWVQcm9wZXJ0eSgnX2NsYXNzUHJvcGVydGllcycsIHRoaXMpKSkge1xuICAgICAgICAgICAgdGhpcy5fY2xhc3NQcm9wZXJ0aWVzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgLy8gTk9URTogV29ya2Fyb3VuZCBJRTExIG5vdCBzdXBwb3J0aW5nIE1hcCBjb25zdHJ1Y3RvciBhcmd1bWVudC5cbiAgICAgICAgICAgIGNvbnN0IHN1cGVyUHJvcGVydGllcyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fY2xhc3NQcm9wZXJ0aWVzO1xuICAgICAgICAgICAgaWYgKHN1cGVyUHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3VwZXJQcm9wZXJ0aWVzLmZvckVhY2goKHYsIGspID0+IHRoaXMuX2NsYXNzUHJvcGVydGllcy5zZXQoaywgdikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBwcm9wZXJ0eSBhY2Nlc3NvciBvbiB0aGUgZWxlbWVudCBwcm90b3R5cGUgaWYgb25lIGRvZXMgbm90IGV4aXN0XG4gICAgICogYW5kIHN0b3JlcyBhIFByb3BlcnR5RGVjbGFyYXRpb24gZm9yIHRoZSBwcm9wZXJ0eSB3aXRoIHRoZSBnaXZlbiBvcHRpb25zLlxuICAgICAqIFRoZSBwcm9wZXJ0eSBzZXR0ZXIgY2FsbHMgdGhlIHByb3BlcnR5J3MgYGhhc0NoYW5nZWRgIHByb3BlcnR5IG9wdGlvblxuICAgICAqIG9yIHVzZXMgYSBzdHJpY3QgaWRlbnRpdHkgY2hlY2sgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHRvIHJlcXVlc3RcbiAgICAgKiBhbiB1cGRhdGUuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBtYXkgYmUgb3ZlcnJpZGRlbiB0byBjdXN0b21pemUgcHJvcGVydGllczsgaG93ZXZlcixcbiAgICAgKiB3aGVuIGRvaW5nIHNvLCBpdCdzIGltcG9ydGFudCB0byBjYWxsIGBzdXBlci5jcmVhdGVQcm9wZXJ0eWAgdG8gZW5zdXJlXG4gICAgICogdGhlIHByb3BlcnR5IGlzIHNldHVwIGNvcnJlY3RseS4gVGhpcyBtZXRob2QgY2FsbHNcbiAgICAgKiBgZ2V0UHJvcGVydHlEZXNjcmlwdG9yYCBpbnRlcm5hbGx5IHRvIGdldCBhIGRlc2NyaXB0b3IgdG8gaW5zdGFsbC5cbiAgICAgKiBUbyBjdXN0b21pemUgd2hhdCBwcm9wZXJ0aWVzIGRvIHdoZW4gdGhleSBhcmUgZ2V0IG9yIHNldCwgb3ZlcnJpZGVcbiAgICAgKiBgZ2V0UHJvcGVydHlEZXNjcmlwdG9yYC4gVG8gY3VzdG9taXplIHRoZSBvcHRpb25zIGZvciBhIHByb3BlcnR5LFxuICAgICAqIGltcGxlbWVudCBgY3JlYXRlUHJvcGVydHlgIGxpa2UgdGhpczpcbiAgICAgKlxuICAgICAqIHN0YXRpYyBjcmVhdGVQcm9wZXJ0eShuYW1lLCBvcHRpb25zKSB7XG4gICAgICogICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7bXlPcHRpb246IHRydWV9KTtcbiAgICAgKiAgIHN1cGVyLmNyZWF0ZVByb3BlcnR5KG5hbWUsIG9wdGlvbnMpO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVByb3BlcnR5KG5hbWUsIG9wdGlvbnMgPSBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbikge1xuICAgICAgICAvLyBOb3RlLCBzaW5jZSB0aGlzIGNhbiBiZSBjYWxsZWQgYnkgdGhlIGBAcHJvcGVydHlgIGRlY29yYXRvciB3aGljaFxuICAgICAgICAvLyBpcyBjYWxsZWQgYmVmb3JlIGBmaW5hbGl6ZWAsIHdlIGVuc3VyZSBzdG9yYWdlIGV4aXN0cyBmb3IgcHJvcGVydHlcbiAgICAgICAgLy8gbWV0YWRhdGEuXG4gICAgICAgIHRoaXMuX2Vuc3VyZUNsYXNzUHJvcGVydGllcygpO1xuICAgICAgICB0aGlzLl9jbGFzc1Byb3BlcnRpZXMuc2V0KG5hbWUsIG9wdGlvbnMpO1xuICAgICAgICAvLyBEbyBub3QgZ2VuZXJhdGUgYW4gYWNjZXNzb3IgaWYgdGhlIHByb3RvdHlwZSBhbHJlYWR5IGhhcyBvbmUsIHNpbmNlXG4gICAgICAgIC8vIGl0IHdvdWxkIGJlIGxvc3Qgb3RoZXJ3aXNlIGFuZCB0aGF0IHdvdWxkIG5ldmVyIGJlIHRoZSB1c2VyJ3MgaW50ZW50aW9uO1xuICAgICAgICAvLyBJbnN0ZWFkLCB3ZSBleHBlY3QgdXNlcnMgdG8gY2FsbCBgcmVxdWVzdFVwZGF0ZWAgdGhlbXNlbHZlcyBmcm9tXG4gICAgICAgIC8vIHVzZXItZGVmaW5lZCBhY2Nlc3NvcnMuIE5vdGUgdGhhdCBpZiB0aGUgc3VwZXIgaGFzIGFuIGFjY2Vzc29yIHdlIHdpbGxcbiAgICAgICAgLy8gc3RpbGwgb3ZlcndyaXRlIGl0XG4gICAgICAgIGlmIChvcHRpb25zLm5vQWNjZXNzb3IgfHwgdGhpcy5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXkgPSB0eXBlb2YgbmFtZSA9PT0gJ3N5bWJvbCcgPyBTeW1ib2woKSA6IGBfXyR7bmFtZX1gO1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gdGhpcy5nZXRQcm9wZXJ0eURlc2NyaXB0b3IobmFtZSwga2V5LCBvcHRpb25zKTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMucHJvdG90eXBlLCBuYW1lLCBkZXNjcmlwdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvcGVydHkgZGVzY3JpcHRvciB0byBiZSBkZWZpbmVkIG9uIHRoZSBnaXZlbiBuYW1lZCBwcm9wZXJ0eS5cbiAgICAgKiBJZiBubyBkZXNjcmlwdG9yIGlzIHJldHVybmVkLCB0aGUgcHJvcGVydHkgd2lsbCBub3QgYmVjb21lIGFuIGFjY2Vzc29yLlxuICAgICAqIEZvciBleGFtcGxlLFxuICAgICAqXG4gICAgICogICBjbGFzcyBNeUVsZW1lbnQgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAgICAgKiAgICAgc3RhdGljIGdldFByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBrZXksIG9wdGlvbnMpIHtcbiAgICAgKiAgICAgICBjb25zdCBkZWZhdWx0RGVzY3JpcHRvciA9XG4gICAgICogICAgICAgICAgIHN1cGVyLmdldFByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBrZXksIG9wdGlvbnMpO1xuICAgICAqICAgICAgIGNvbnN0IHNldHRlciA9IGRlZmF1bHREZXNjcmlwdG9yLnNldDtcbiAgICAgKiAgICAgICByZXR1cm4ge1xuICAgICAqICAgICAgICAgZ2V0OiBkZWZhdWx0RGVzY3JpcHRvci5nZXQsXG4gICAgICogICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgKiAgICAgICAgICAgc2V0dGVyLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAqICAgICAgICAgICAvLyBjdXN0b20gYWN0aW9uLlxuICAgICAqICAgICAgICAgfSxcbiAgICAgKiAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgKiAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgKiAgICAgICB9XG4gICAgICogICAgIH1cbiAgICAgKiAgIH1cbiAgICAgKlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIGdldFByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgbm8gc3ltYm9sIGluIGluZGV4XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNba2V5XTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXNbbmFtZV07XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpc1xuICAgICAgICAgICAgICAgICAgICAucmVxdWVzdFVwZGF0ZUludGVybmFsKG5hbWUsIG9sZFZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHByb3BlcnR5IG9wdGlvbnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAgICAgKiBUaGVzZSBvcHRpb25zIGFyZSBkZWZpbmVkIHdpdGggYSBQcm9wZXJ0eURlY2xhcmF0aW9uIHZpYSB0aGUgYHByb3BlcnRpZXNgXG4gICAgICogb2JqZWN0IG9yIHRoZSBgQHByb3BlcnR5YCBkZWNvcmF0b3IgYW5kIGFyZSByZWdpc3RlcmVkIGluXG4gICAgICogYGNyZWF0ZVByb3BlcnR5KC4uLilgLlxuICAgICAqXG4gICAgICogTm90ZSwgdGhpcyBtZXRob2Qgc2hvdWxkIGJlIGNvbnNpZGVyZWQgXCJmaW5hbFwiIGFuZCBub3Qgb3ZlcnJpZGRlbi4gVG9cbiAgICAgKiBjdXN0b21pemUgdGhlIG9wdGlvbnMgZm9yIGEgZ2l2ZW4gcHJvcGVydHksIG92ZXJyaWRlIGBjcmVhdGVQcm9wZXJ0eWAuXG4gICAgICpcbiAgICAgKiBAbm9jb2xsYXBzZVxuICAgICAqIEBmaW5hbFxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRQcm9wZXJ0eU9wdGlvbnMobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xhc3NQcm9wZXJ0aWVzICYmIHRoaXMuX2NsYXNzUHJvcGVydGllcy5nZXQobmFtZSkgfHxcbiAgICAgICAgICAgIGRlZmF1bHRQcm9wZXJ0eURlY2xhcmF0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHByb3BlcnR5IGFjY2Vzc29ycyBmb3IgcmVnaXN0ZXJlZCBwcm9wZXJ0aWVzIGFuZCBlbnN1cmVzXG4gICAgICogYW55IHN1cGVyY2xhc3NlcyBhcmUgYWxzbyBmaW5hbGl6ZWQuXG4gICAgICogQG5vY29sbGFwc2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZmluYWxpemUoKSB7XG4gICAgICAgIC8vIGZpbmFsaXplIGFueSBzdXBlcmNsYXNzZXNcbiAgICAgICAgY29uc3Qgc3VwZXJDdG9yID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpO1xuICAgICAgICBpZiAoIXN1cGVyQ3Rvci5oYXNPd25Qcm9wZXJ0eShmaW5hbGl6ZWQpKSB7XG4gICAgICAgICAgICBzdXBlckN0b3IuZmluYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzW2ZpbmFsaXplZF0gPSB0cnVlO1xuICAgICAgICB0aGlzLl9lbnN1cmVDbGFzc1Byb3BlcnRpZXMoKTtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBNYXAgcG9wdWxhdGVkIGluIG9ic2VydmVkQXR0cmlidXRlc1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAvLyBtYWtlIGFueSBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIE5vdGUsIG9ubHkgcHJvY2VzcyBcIm93blwiIHByb3BlcnRpZXMgc2luY2UgdGhpcyBlbGVtZW50IHdpbGwgaW5oZXJpdFxuICAgICAgICAvLyBhbnkgcHJvcGVydGllcyBkZWZpbmVkIG9uIHRoZSBzdXBlckNsYXNzLCBhbmQgZmluYWxpemF0aW9uIGVuc3VyZXNcbiAgICAgICAgLy8gdGhlIGVudGlyZSBwcm90b3R5cGUgY2hhaW4gaXMgZmluYWxpemVkLlxuICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdwcm9wZXJ0aWVzJywgdGhpcykpKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcGVydGllcztcbiAgICAgICAgICAgIC8vIHN1cHBvcnQgc3ltYm9scyBpbiBwcm9wZXJ0aWVzIChJRTExIGRvZXMgbm90IHN1cHBvcnQgdGhpcylcbiAgICAgICAgICAgIGNvbnN0IHByb3BLZXlzID0gW1xuICAgICAgICAgICAgICAgIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3BzKSxcbiAgICAgICAgICAgICAgICAuLi4odHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpID9cbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhwcm9wcykgOlxuICAgICAgICAgICAgICAgICAgICBbXVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIC8vIFRoaXMgZm9yL29mIGlzIG9rIGJlY2F1c2UgcHJvcEtleXMgaXMgYW4gYXJyYXlcbiAgICAgICAgICAgIGZvciAoY29uc3QgcCBvZiBwcm9wS2V5cykge1xuICAgICAgICAgICAgICAgIC8vIG5vdGUsIHVzZSBvZiBgYW55YCBpcyBkdWUgdG8gVHlwZVNyaXB0IGxhY2sgb2Ygc3VwcG9ydCBmb3Igc3ltYm9sIGluXG4gICAgICAgICAgICAgICAgLy8gaW5kZXggdHlwZXNcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IG5vIHN5bWJvbCBpbiBpbmRleFxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUHJvcGVydHkocCwgcHJvcHNbcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHByb3BlcnR5IG5hbWUgZm9yIHRoZSBnaXZlbiBhdHRyaWJ1dGUgYG5hbWVgLlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIF9hdHRyaWJ1dGVOYW1lRm9yUHJvcGVydHkobmFtZSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBvcHRpb25zLmF0dHJpYnV0ZTtcbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZSA9PT0gZmFsc2UgP1xuICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgICh0eXBlb2YgYXR0cmlidXRlID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlIDpcbiAgICAgICAgICAgICAgICAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnID8gbmFtZS50b0xvd2VyQ2FzZSgpIDogdW5kZWZpbmVkKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBhIHByb3BlcnR5IHNob3VsZCByZXF1ZXN0IGFuIHVwZGF0ZS5cbiAgICAgKiBDYWxsZWQgd2hlbiBhIHByb3BlcnR5IHZhbHVlIGlzIHNldCBhbmQgdXNlcyB0aGUgYGhhc0NoYW5nZWRgXG4gICAgICogb3B0aW9uIGZvciB0aGUgcHJvcGVydHkgaWYgcHJlc2VudCBvciBhIHN0cmljdCBpZGVudGl0eSBjaGVjay5cbiAgICAgKiBAbm9jb2xsYXBzZVxuICAgICAqL1xuICAgIHN0YXRpYyBfdmFsdWVIYXNDaGFuZ2VkKHZhbHVlLCBvbGQsIGhhc0NoYW5nZWQgPSBub3RFcXVhbCkge1xuICAgICAgICByZXR1cm4gaGFzQ2hhbmdlZCh2YWx1ZSwgb2xkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgZm9yIHRoZSBnaXZlbiBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQ2FsbGVkIHZpYSB0aGUgYGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFja2AgYW5kIHVzZXMgdGhlIHByb3BlcnR5J3NcbiAgICAgKiBgY29udmVydGVyYCBvciBgY29udmVydGVyLmZyb21BdHRyaWJ1dGVgIHByb3BlcnR5IG9wdGlvbi5cbiAgICAgKiBAbm9jb2xsYXBzZVxuICAgICAqL1xuICAgIHN0YXRpYyBfcHJvcGVydHlWYWx1ZUZyb21BdHRyaWJ1dGUodmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgICAgICAgY29uc3QgY29udmVydGVyID0gb3B0aW9ucy5jb252ZXJ0ZXIgfHwgZGVmYXVsdENvbnZlcnRlcjtcbiAgICAgICAgY29uc3QgZnJvbUF0dHJpYnV0ZSA9ICh0eXBlb2YgY29udmVydGVyID09PSAnZnVuY3Rpb24nID8gY29udmVydGVyIDogY29udmVydGVyLmZyb21BdHRyaWJ1dGUpO1xuICAgICAgICByZXR1cm4gZnJvbUF0dHJpYnV0ZSA/IGZyb21BdHRyaWJ1dGUodmFsdWUsIHR5cGUpIDogdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGF0dHJpYnV0ZSB2YWx1ZSBmb3IgdGhlIGdpdmVuIHByb3BlcnR5IHZhbHVlLiBJZiB0aGlzXG4gICAgICogcmV0dXJucyB1bmRlZmluZWQsIHRoZSBwcm9wZXJ0eSB3aWxsICpub3QqIGJlIHJlZmxlY3RlZCB0byBhbiBhdHRyaWJ1dGUuXG4gICAgICogSWYgdGhpcyByZXR1cm5zIG51bGwsIHRoZSBhdHRyaWJ1dGUgd2lsbCBiZSByZW1vdmVkLCBvdGhlcndpc2UgdGhlXG4gICAgICogYXR0cmlidXRlIHdpbGwgYmUgc2V0IHRvIHRoZSB2YWx1ZS5cbiAgICAgKiBUaGlzIHVzZXMgdGhlIHByb3BlcnR5J3MgYHJlZmxlY3RgIGFuZCBgdHlwZS50b0F0dHJpYnV0ZWAgcHJvcGVydHkgb3B0aW9ucy5cbiAgICAgKiBAbm9jb2xsYXBzZVxuICAgICAqL1xuICAgIHN0YXRpYyBfcHJvcGVydHlWYWx1ZVRvQXR0cmlidXRlKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnJlZmxlY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlciA9IG9wdGlvbnMuY29udmVydGVyO1xuICAgICAgICBjb25zdCB0b0F0dHJpYnV0ZSA9IGNvbnZlcnRlciAmJiBjb252ZXJ0ZXIudG9BdHRyaWJ1dGUgfHxcbiAgICAgICAgICAgIGRlZmF1bHRDb252ZXJ0ZXIudG9BdHRyaWJ1dGU7XG4gICAgICAgIHJldHVybiB0b0F0dHJpYnV0ZSh2YWx1ZSwgdHlwZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGVsZW1lbnQgaW5pdGlhbGl6YXRpb24uIEJ5IGRlZmF1bHQgY2FwdHVyZXMgYW55IHByZS1zZXQgdmFsdWVzIGZvclxuICAgICAqIHJlZ2lzdGVyZWQgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSA9IDA7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVByb21pc2UgPVxuICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlcykgPT4gdGhpcy5fZW5hYmxlVXBkYXRpbmdSZXNvbHZlciA9IHJlcyk7XG4gICAgICAgIHRoaXMuX2NoYW5nZWRQcm9wZXJ0aWVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9zYXZlSW5zdGFuY2VQcm9wZXJ0aWVzKCk7XG4gICAgICAgIC8vIGVuc3VyZXMgZmlyc3QgdXBkYXRlIHdpbGwgYmUgY2F1Z2h0IGJ5IGFuIGVhcmx5IGFjY2VzcyBvZlxuICAgICAgICAvLyBgdXBkYXRlQ29tcGxldGVgXG4gICAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZUludGVybmFsKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpeGVzIGFueSBwcm9wZXJ0aWVzIHNldCBvbiB0aGUgaW5zdGFuY2UgYmVmb3JlIHVwZ3JhZGUgdGltZS5cbiAgICAgKiBPdGhlcndpc2UgdGhlc2Ugd291bGQgc2hhZG93IHRoZSBhY2Nlc3NvciBhbmQgYnJlYWsgdGhlc2UgcHJvcGVydGllcy5cbiAgICAgKiBUaGUgcHJvcGVydGllcyBhcmUgc3RvcmVkIGluIGEgTWFwIHdoaWNoIGlzIHBsYXllZCBiYWNrIGFmdGVyIHRoZVxuICAgICAqIGNvbnN0cnVjdG9yIHJ1bnMuIE5vdGUsIG9uIHZlcnkgb2xkIHZlcnNpb25zIG9mIFNhZmFyaSAoPD05KSBvciBDaHJvbWVcbiAgICAgKiAoPD00MSksIHByb3BlcnRpZXMgY3JlYXRlZCBmb3IgbmF0aXZlIHBsYXRmb3JtIHByb3BlcnRpZXMgbGlrZSAoYGlkYCBvclxuICAgICAqIGBuYW1lYCkgbWF5IG5vdCBoYXZlIGRlZmF1bHQgdmFsdWVzIHNldCBpbiB0aGUgZWxlbWVudCBjb25zdHJ1Y3Rvci4gT25cbiAgICAgKiB0aGVzZSBicm93c2VycyBuYXRpdmUgcHJvcGVydGllcyBhcHBlYXIgb24gaW5zdGFuY2VzIGFuZCB0aGVyZWZvcmUgdGhlaXJcbiAgICAgKiBkZWZhdWx0IHZhbHVlIHdpbGwgb3ZlcndyaXRlIGFueSBlbGVtZW50IGRlZmF1bHQgKGUuZy4gaWYgdGhlIGVsZW1lbnQgc2V0c1xuICAgICAqIHRoaXMuaWQgPSAnaWQnIGluIHRoZSBjb25zdHJ1Y3RvciwgdGhlICdpZCcgd2lsbCBiZWNvbWUgJycgc2luY2UgdGhpcyBpc1xuICAgICAqIHRoZSBuYXRpdmUgcGxhdGZvcm0gZGVmYXVsdCkuXG4gICAgICovXG4gICAgX3NhdmVJbnN0YW5jZVByb3BlcnRpZXMoKSB7XG4gICAgICAgIC8vIFVzZSBmb3JFYWNoIHNvIHRoaXMgd29ya3MgZXZlbiBpZiBmb3Ivb2YgbG9vcHMgYXJlIGNvbXBpbGVkIHRvIGZvciBsb29wc1xuICAgICAgICAvLyBleHBlY3RpbmcgYXJyYXlzXG4gICAgICAgIHRoaXMuY29uc3RydWN0b3JcbiAgICAgICAgICAgIC5fY2xhc3NQcm9wZXJ0aWVzLmZvckVhY2goKF92LCBwKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1twXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpc1twXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlUHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZVByb3BlcnRpZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlUHJvcGVydGllcy5zZXQocCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbGllcyBwcmV2aW91c2x5IHNhdmVkIGluc3RhbmNlIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgX2FwcGx5SW5zdGFuY2VQcm9wZXJ0aWVzKCkge1xuICAgICAgICAvLyBVc2UgZm9yRWFjaCBzbyB0aGlzIHdvcmtzIGV2ZW4gaWYgZm9yL29mIGxvb3BzIGFyZSBjb21waWxlZCB0byBmb3IgbG9vcHNcbiAgICAgICAgLy8gZXhwZWN0aW5nIGFycmF5c1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgIHRoaXMuX2luc3RhbmNlUHJvcGVydGllcy5mb3JFYWNoKCh2LCBwKSA9PiB0aGlzW3BdID0gdik7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIC8vIEVuc3VyZSBmaXJzdCBjb25uZWN0aW9uIGNvbXBsZXRlcyBhbiB1cGRhdGUuIFVwZGF0ZXMgY2Fubm90IGNvbXBsZXRlXG4gICAgICAgIC8vIGJlZm9yZSBjb25uZWN0aW9uLlxuICAgICAgICB0aGlzLmVuYWJsZVVwZGF0aW5nKCk7XG4gICAgfVxuICAgIGVuYWJsZVVwZGF0aW5nKCkge1xuICAgICAgICBpZiAodGhpcy5fZW5hYmxlVXBkYXRpbmdSZXNvbHZlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVVcGRhdGluZ1Jlc29sdmVyKCk7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVVcGRhdGluZ1Jlc29sdmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsbG93cyBmb3IgYHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKClgIGluIGV4dGVuc2lvbnMgd2hpbGVcbiAgICAgKiByZXNlcnZpbmcgdGhlIHBvc3NpYmlsaXR5IG9mIG1ha2luZyBub24tYnJlYWtpbmcgZmVhdHVyZSBhZGRpdGlvbnNcbiAgICAgKiB3aGVuIGRpc2Nvbm5lY3RpbmcgYXQgc29tZSBwb2ludCBpbiB0aGUgZnV0dXJlLlxuICAgICAqL1xuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTeW5jaHJvbml6ZXMgcHJvcGVydHkgdmFsdWVzIHdoZW4gYXR0cmlidXRlcyBjaGFuZ2UuXG4gICAgICovXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZVRvUHJvcGVydHkobmFtZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9wcm9wZXJ0eVRvQXR0cmlidXRlKG5hbWUsIHZhbHVlLCBvcHRpb25zID0gZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb24pIHtcbiAgICAgICAgY29uc3QgY3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBjdG9yLl9hdHRyaWJ1dGVOYW1lRm9yUHJvcGVydHkobmFtZSwgb3B0aW9ucyk7XG4gICAgICAgIGlmIChhdHRyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJWYWx1ZSA9IGN0b3IuX3Byb3BlcnR5VmFsdWVUb0F0dHJpYnV0ZSh2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAvLyBhbiB1bmRlZmluZWQgdmFsdWUgZG9lcyBub3QgY2hhbmdlIHRoZSBhdHRyaWJ1dGUuXG4gICAgICAgICAgICBpZiAoYXR0clZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUcmFjayBpZiB0aGUgcHJvcGVydHkgaXMgYmVpbmcgcmVmbGVjdGVkIHRvIGF2b2lkXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSBwcm9wZXJ0eSBhZ2FpbiB2aWEgYGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFja2AuIE5vdGU6XG4gICAgICAgICAgICAvLyAxLiB0aGlzIHRha2VzIGFkdmFudGFnZSBvZiB0aGUgZmFjdCB0aGF0IHRoZSBjYWxsYmFjayBpcyBzeW5jaHJvbm91cy5cbiAgICAgICAgICAgIC8vIDIuIHdpbGwgYmVoYXZlIGluY29ycmVjdGx5IGlmIG11bHRpcGxlIGF0dHJpYnV0ZXMgYXJlIGluIHRoZSByZWFjdGlvblxuICAgICAgICAgICAgLy8gc3RhY2sgYXQgdGltZSBvZiBjYWxsaW5nLiBIb3dldmVyLCBzaW5jZSB3ZSBwcm9jZXNzIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgIC8vIGluIGB1cGRhdGVgIHRoaXMgc2hvdWxkIG5vdCBiZSBwb3NzaWJsZSAob3IgYW4gZXh0cmVtZSBjb3JuZXIgY2FzZVxuICAgICAgICAgICAgLy8gdGhhdCB3ZSdkIGxpa2UgdG8gZGlzY292ZXIpLlxuICAgICAgICAgICAgLy8gbWFyayBzdGF0ZSByZWZsZWN0aW5nXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSA9IHRoaXMuX3VwZGF0ZVN0YXRlIHwgU1RBVEVfSVNfUkVGTEVDVElOR19UT19BVFRSSUJVVEU7XG4gICAgICAgICAgICBpZiAoYXR0clZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBtYXJrIHN0YXRlIG5vdCByZWZsZWN0aW5nXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSA9IHRoaXMuX3VwZGF0ZVN0YXRlICYgflNUQVRFX0lTX1JFRkxFQ1RJTkdfVE9fQVRUUklCVVRFO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9hdHRyaWJ1dGVUb1Byb3BlcnR5KG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIC8vIFVzZSB0cmFja2luZyBpbmZvIHRvIGF2b2lkIGRlc2VyaWFsaXppbmcgYXR0cmlidXRlIHZhbHVlIGlmIGl0IHdhc1xuICAgICAgICAvLyBqdXN0IHNldCBmcm9tIGEgcHJvcGVydHkgc2V0dGVyLlxuICAgICAgICBpZiAodGhpcy5fdXBkYXRlU3RhdGUgJiBTVEFURV9JU19SRUZMRUNUSU5HX1RPX0FUVFJJQlVURSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgICAgICAvLyBOb3RlLCBoaW50IHRoaXMgYXMgYW4gYEF0dHJpYnV0ZU1hcGAgc28gY2xvc3VyZSBjbGVhcmx5IHVuZGVyc3RhbmRzXG4gICAgICAgIC8vIHRoZSB0eXBlOyBpdCBoYXMgaXNzdWVzIHdpdGggdHJhY2tpbmcgdHlwZXMgdGhyb3VnaCBzdGF0aWNzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bm5lY2Vzc2FyeS10eXBlLWFzc2VydGlvblxuICAgICAgICBjb25zdCBwcm9wTmFtZSA9IGN0b3IuX2F0dHJpYnV0ZVRvUHJvcGVydHlNYXAuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAocHJvcE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGN0b3IuZ2V0UHJvcGVydHlPcHRpb25zKHByb3BOYW1lKTtcbiAgICAgICAgICAgIC8vIG1hcmsgc3RhdGUgcmVmbGVjdGluZ1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUgPSB0aGlzLl91cGRhdGVTdGF0ZSB8IFNUQVRFX0lTX1JFRkxFQ1RJTkdfVE9fUFJPUEVSVFk7XG4gICAgICAgICAgICB0aGlzW3Byb3BOYW1lXSA9XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICAgICAgIGN0b3IuX3Byb3BlcnR5VmFsdWVGcm9tQXR0cmlidXRlKHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIC8vIG1hcmsgc3RhdGUgbm90IHJlZmxlY3RpbmdcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlID0gdGhpcy5fdXBkYXRlU3RhdGUgJiB+U1RBVEVfSVNfUkVGTEVDVElOR19UT19QUk9QRVJUWTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIHByb3RlY3RlZCB2ZXJzaW9uIG9mIGByZXF1ZXN0VXBkYXRlYCBkb2VzIG5vdCBhY2Nlc3Mgb3IgcmV0dXJuIHRoZVxuICAgICAqIGB1cGRhdGVDb21wbGV0ZWAgcHJvbWlzZS4gVGhpcyBwcm9taXNlIGNhbiBiZSBvdmVycmlkZGVuIGFuZCBpcyB0aGVyZWZvcmVcbiAgICAgKiBub3QgZnJlZSB0byBhY2Nlc3MuXG4gICAgICovXG4gICAgcmVxdWVzdFVwZGF0ZUludGVybmFsKG5hbWUsIG9sZFZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBzaG91bGRSZXF1ZXN0VXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHByb3BlcnR5IGtleSwgcGVyZm9ybSBwcm9wZXJ0eSB1cGRhdGUgc3RlcHMuXG4gICAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgY3Rvci5nZXRQcm9wZXJ0eU9wdGlvbnMobmFtZSk7XG4gICAgICAgICAgICBpZiAoY3Rvci5fdmFsdWVIYXNDaGFuZ2VkKHRoaXNbbmFtZV0sIG9sZFZhbHVlLCBvcHRpb25zLmhhc0NoYW5nZWQpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jaGFuZ2VkUHJvcGVydGllcy5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlZFByb3BlcnRpZXMuc2V0KG5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQWRkIHRvIHJlZmxlY3RpbmcgcHJvcGVydGllcyBzZXQuXG4gICAgICAgICAgICAgICAgLy8gTm90ZSwgaXQncyBpbXBvcnRhbnQgdGhhdCBldmVyeSBjaGFuZ2UgaGFzIGEgY2hhbmNlIHRvIGFkZCB0aGVcbiAgICAgICAgICAgICAgICAvLyBwcm9wZXJ0eSB0byBgX3JlZmxlY3RpbmdQcm9wZXJ0aWVzYC4gVGhpcyBlbnN1cmVzIHNldHRpbmdcbiAgICAgICAgICAgICAgICAvLyBhdHRyaWJ1dGUgKyBwcm9wZXJ0eSByZWZsZWN0cyBjb3JyZWN0bHkuXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVmbGVjdCA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgICAgICAgICAhKHRoaXMuX3VwZGF0ZVN0YXRlICYgU1RBVEVfSVNfUkVGTEVDVElOR19UT19QUk9QRVJUWSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JlZmxlY3RpbmdQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZmxlY3RpbmdQcm9wZXJ0aWVzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZmxlY3RpbmdQcm9wZXJ0aWVzLnNldChuYW1lLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBBYm9ydCB0aGUgcmVxdWVzdCBpZiB0aGUgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSBjb25zaWRlcmVkIGNoYW5nZWQuXG4gICAgICAgICAgICAgICAgc2hvdWxkUmVxdWVzdFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5faGFzUmVxdWVzdGVkVXBkYXRlICYmIHNob3VsZFJlcXVlc3RVcGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVByb21pc2UgPSB0aGlzLl9lbnF1ZXVlVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgYW4gdXBkYXRlIHdoaWNoIGlzIHByb2Nlc3NlZCBhc3luY2hyb25vdXNseS4gVGhpcyBzaG91bGRcbiAgICAgKiBiZSBjYWxsZWQgd2hlbiBhbiBlbGVtZW50IHNob3VsZCB1cGRhdGUgYmFzZWQgb24gc29tZSBzdGF0ZSBub3QgdHJpZ2dlcmVkXG4gICAgICogYnkgc2V0dGluZyBhIHByb3BlcnR5LiBJbiB0aGlzIGNhc2UsIHBhc3Mgbm8gYXJndW1lbnRzLiBJdCBzaG91bGQgYWxzbyBiZVxuICAgICAqIGNhbGxlZCB3aGVuIG1hbnVhbGx5IGltcGxlbWVudGluZyBhIHByb3BlcnR5IHNldHRlci4gSW4gdGhpcyBjYXNlLCBwYXNzIHRoZVxuICAgICAqIHByb3BlcnR5IGBuYW1lYCBhbmQgYG9sZFZhbHVlYCB0byBlbnN1cmUgdGhhdCBhbnkgY29uZmlndXJlZCBwcm9wZXJ0eVxuICAgICAqIG9wdGlvbnMgYXJlIGhvbm9yZWQuIFJldHVybnMgdGhlIGB1cGRhdGVDb21wbGV0ZWAgUHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZFxuICAgICAqIHdoZW4gdGhlIHVwZGF0ZSBjb21wbGV0ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSB7UHJvcGVydHlLZXl9IChvcHRpb25hbCkgbmFtZSBvZiByZXF1ZXN0aW5nIHByb3BlcnR5XG4gICAgICogQHBhcmFtIG9sZFZhbHVlIHthbnl9IChvcHRpb25hbCkgb2xkIHZhbHVlIG9mIHJlcXVlc3RpbmcgcHJvcGVydHlcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgdXBkYXRlIGNvbXBsZXRlcy5cbiAgICAgKi9cbiAgICByZXF1ZXN0VXBkYXRlKG5hbWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZUludGVybmFsKG5hbWUsIG9sZFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlQ29tcGxldGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgdGhlIGVsZW1lbnQgdG8gYXN5bmNocm9ub3VzbHkgdXBkYXRlLlxuICAgICAqL1xuICAgIGFzeW5jIF9lbnF1ZXVlVXBkYXRlKCkge1xuICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSA9IHRoaXMuX3VwZGF0ZVN0YXRlIHwgU1RBVEVfVVBEQVRFX1JFUVVFU1RFRDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEVuc3VyZSBhbnkgcHJldmlvdXMgdXBkYXRlIGhhcyByZXNvbHZlZCBiZWZvcmUgdXBkYXRpbmcuXG4gICAgICAgICAgICAvLyBUaGlzIGBhd2FpdGAgYWxzbyBlbnN1cmVzIHRoYXQgcHJvcGVydHkgY2hhbmdlcyBhcmUgYmF0Y2hlZC5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3VwZGF0ZVByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIElnbm9yZSBhbnkgcHJldmlvdXMgZXJyb3JzLiBXZSBvbmx5IGNhcmUgdGhhdCB0aGUgcHJldmlvdXMgY3ljbGUgaXNcbiAgICAgICAgICAgIC8vIGRvbmUuIEFueSBlcnJvciBzaG91bGQgaGF2ZSBiZWVuIGhhbmRsZWQgaW4gdGhlIHByZXZpb3VzIHVwZGF0ZS5cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnBlcmZvcm1VcGRhdGUoKTtcbiAgICAgICAgLy8gSWYgYHBlcmZvcm1VcGRhdGVgIHJldHVybnMgYSBQcm9taXNlLCB3ZSBhd2FpdCBpdC4gVGhpcyBpcyBkb25lIHRvXG4gICAgICAgIC8vIGVuYWJsZSBjb29yZGluYXRpbmcgdXBkYXRlcyB3aXRoIGEgc2NoZWR1bGVyLiBOb3RlLCB0aGUgcmVzdWx0IGlzXG4gICAgICAgIC8vIGNoZWNrZWQgdG8gYXZvaWQgZGVsYXlpbmcgYW4gYWRkaXRpb25hbCBtaWNyb3Rhc2sgdW5sZXNzIHdlIG5lZWQgdG8uXG4gICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhdGhpcy5faGFzUmVxdWVzdGVkVXBkYXRlO1xuICAgIH1cbiAgICBnZXQgX2hhc1JlcXVlc3RlZFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl91cGRhdGVTdGF0ZSAmIFNUQVRFX1VQREFURV9SRVFVRVNURUQpO1xuICAgIH1cbiAgICBnZXQgaGFzVXBkYXRlZCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl91cGRhdGVTdGF0ZSAmIFNUQVRFX0hBU19VUERBVEVEKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZWxlbWVudCB1cGRhdGUuIE5vdGUsIGlmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZHVyaW5nIHRoZVxuICAgICAqIHVwZGF0ZSwgYGZpcnN0VXBkYXRlZGAgYW5kIGB1cGRhdGVkYCB3aWxsIG5vdCBiZSBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGNoYW5nZSB0aGUgdGltaW5nIG9mIHVwZGF0ZXMuIElmIHRoaXNcbiAgICAgKiBtZXRob2QgaXMgb3ZlcnJpZGRlbiwgYHN1cGVyLnBlcmZvcm1VcGRhdGUoKWAgbXVzdCBiZSBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBGb3IgaW5zdGFuY2UsIHRvIHNjaGVkdWxlIHVwZGF0ZXMgdG8gb2NjdXIganVzdCBiZWZvcmUgdGhlIG5leHQgZnJhbWU6XG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiBwcm90ZWN0ZWQgYXN5bmMgcGVyZm9ybVVwZGF0ZSgpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICAgKiAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gcmVzb2x2ZSgpKSk7XG4gICAgICogICBzdXBlci5wZXJmb3JtVXBkYXRlKCk7XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHBlcmZvcm1VcGRhdGUoKSB7XG4gICAgICAgIC8vIEFib3J0IGFueSB1cGRhdGUgaWYgb25lIGlzIG5vdCBwZW5kaW5nIHdoZW4gdGhpcyBpcyBjYWxsZWQuXG4gICAgICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpZiBgcGVyZm9ybVVwZGF0ZWAgaXMgY2FsbGVkIGVhcmx5IHRvIFwiZmx1c2hcIlxuICAgICAgICAvLyB0aGUgdXBkYXRlLlxuICAgICAgICBpZiAoIXRoaXMuX2hhc1JlcXVlc3RlZFVwZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIE1peGluIGluc3RhbmNlIHByb3BlcnRpZXMgb25jZSwgaWYgdGhleSBleGlzdC5cbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlUHJvcGVydGllcykge1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlJbnN0YW5jZVByb3BlcnRpZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2hvdWxkVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRQcm9wZXJ0aWVzID0gdGhpcy5fY2hhbmdlZFByb3BlcnRpZXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzaG91bGRVcGRhdGUgPSB0aGlzLnNob3VsZFVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICAgICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFya1VwZGF0ZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gUHJldmVudCBgZmlyc3RVcGRhdGVkYCBhbmQgYHVwZGF0ZWRgIGZyb20gcnVubmluZyB3aGVuIHRoZXJlJ3MgYW5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBleGNlcHRpb24uXG4gICAgICAgICAgICBzaG91bGRVcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIEVuc3VyZSBlbGVtZW50IGNhbiBhY2NlcHQgYWRkaXRpb25hbCB1cGRhdGVzIGFmdGVyIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAgICAgIHRoaXMuX21hcmtVcGRhdGVkKCk7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMuX3VwZGF0ZVN0YXRlICYgU1RBVEVfSEFTX1VQREFURUQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUgPSB0aGlzLl91cGRhdGVTdGF0ZSB8IFNUQVRFX0hBU19VUERBVEVEO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RVcGRhdGVkKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlZChjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX21hcmtVcGRhdGVkKCkge1xuICAgICAgICB0aGlzLl9jaGFuZ2VkUHJvcGVydGllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUgPSB0aGlzLl91cGRhdGVTdGF0ZSAmIH5TVEFURV9VUERBVEVfUkVRVUVTVEVEO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGVsZW1lbnQgaGFzIGNvbXBsZXRlZCB1cGRhdGluZy5cbiAgICAgKiBUaGUgUHJvbWlzZSB2YWx1ZSBpcyBhIGJvb2xlYW4gdGhhdCBpcyBgdHJ1ZWAgaWYgdGhlIGVsZW1lbnQgY29tcGxldGVkIHRoZVxuICAgICAqIHVwZGF0ZSB3aXRob3V0IHRyaWdnZXJpbmcgYW5vdGhlciB1cGRhdGUuIFRoZSBQcm9taXNlIHJlc3VsdCBpcyBgZmFsc2VgIGlmXG4gICAgICogYSBwcm9wZXJ0eSB3YXMgc2V0IGluc2lkZSBgdXBkYXRlZCgpYC4gSWYgdGhlIFByb21pc2UgaXMgcmVqZWN0ZWQsIGFuXG4gICAgICogZXhjZXB0aW9uIHdhcyB0aHJvd24gZHVyaW5nIHRoZSB1cGRhdGUuXG4gICAgICpcbiAgICAgKiBUbyBhd2FpdCBhZGRpdGlvbmFsIGFzeW5jaHJvbm91cyB3b3JrLCBvdmVycmlkZSB0aGUgYF9nZXRVcGRhdGVDb21wbGV0ZWBcbiAgICAgKiBtZXRob2QuIEZvciBleGFtcGxlLCBpdCBpcyBzb21ldGltZXMgdXNlZnVsIHRvIGF3YWl0IGEgcmVuZGVyZWQgZWxlbWVudFxuICAgICAqIGJlZm9yZSBmdWxmaWxsaW5nIHRoaXMgUHJvbWlzZS4gVG8gZG8gdGhpcywgZmlyc3QgYXdhaXRcbiAgICAgKiBgc3VwZXIuX2dldFVwZGF0ZUNvbXBsZXRlKClgLCB0aGVuIGFueSBzdWJzZXF1ZW50IHN0YXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHJldHVybnMgYSBib29sZWFuIHRoYXQgaW5kaWNhdGVzIGlmIHRoZVxuICAgICAqIHVwZGF0ZSByZXNvbHZlZCB3aXRob3V0IHRyaWdnZXJpbmcgYW5vdGhlciB1cGRhdGUuXG4gICAgICovXG4gICAgZ2V0IHVwZGF0ZUNvbXBsZXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0VXBkYXRlQ29tcGxldGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgcG9pbnQgZm9yIHRoZSBgdXBkYXRlQ29tcGxldGVgIHByb21pc2UuXG4gICAgICpcbiAgICAgKiBJdCBpcyBub3Qgc2FmZSB0byBvdmVycmlkZSB0aGUgYHVwZGF0ZUNvbXBsZXRlYCBnZXR0ZXIgZGlyZWN0bHkgZHVlIHRvIGFcbiAgICAgKiBsaW1pdGF0aW9uIGluIFR5cGVTY3JpcHQgd2hpY2ggbWVhbnMgaXQgaXMgbm90IHBvc3NpYmxlIHRvIGNhbGwgYVxuICAgICAqIHN1cGVyY2xhc3MgZ2V0dGVyIChlLmcuIGBzdXBlci51cGRhdGVDb21wbGV0ZS50aGVuKC4uLilgKSB3aGVuIHRoZSB0YXJnZXRcbiAgICAgKiBsYW5ndWFnZSBpcyBFUzUgKGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMzM4KS5cbiAgICAgKiBUaGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGRlbiBpbnN0ZWFkLiBGb3IgZXhhbXBsZTpcbiAgICAgKlxuICAgICAqICAgY2xhc3MgTXlFbGVtZW50IGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gICAgICogICAgIGFzeW5jIF9nZXRVcGRhdGVDb21wbGV0ZSgpIHtcbiAgICAgKiAgICAgICBhd2FpdCBzdXBlci5fZ2V0VXBkYXRlQ29tcGxldGUoKTtcbiAgICAgKiAgICAgICBhd2FpdCB0aGlzLl9teUNoaWxkLnVwZGF0ZUNvbXBsZXRlO1xuICAgICAqICAgICB9XG4gICAgICogICB9XG4gICAgICovXG4gICAgX2dldFVwZGF0ZUNvbXBsZXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXBkYXRlUHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29udHJvbHMgd2hldGhlciBvciBub3QgYHVwZGF0ZWAgc2hvdWxkIGJlIGNhbGxlZCB3aGVuIHRoZSBlbGVtZW50IHJlcXVlc3RzXG4gICAgICogYW4gdXBkYXRlLiBCeSBkZWZhdWx0LCB0aGlzIG1ldGhvZCBhbHdheXMgcmV0dXJucyBgdHJ1ZWAsIGJ1dCB0aGlzIGNhbiBiZVxuICAgICAqIGN1c3RvbWl6ZWQgdG8gY29udHJvbCB3aGVuIHRvIHVwZGF0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBfY2hhbmdlZFByb3BlcnRpZXMgTWFwIG9mIGNoYW5nZWQgcHJvcGVydGllcyB3aXRoIG9sZCB2YWx1ZXNcbiAgICAgKi9cbiAgICBzaG91bGRVcGRhdGUoX2NoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBlbGVtZW50LiBUaGlzIG1ldGhvZCByZWZsZWN0cyBwcm9wZXJ0eSB2YWx1ZXMgdG8gYXR0cmlidXRlcy5cbiAgICAgKiBJdCBjYW4gYmUgb3ZlcnJpZGRlbiB0byByZW5kZXIgYW5kIGtlZXAgdXBkYXRlZCBlbGVtZW50IERPTS5cbiAgICAgKiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlIHRoaXMgbWV0aG9kIHdpbGwgKm5vdCogdHJpZ2dlclxuICAgICAqIGFub3RoZXIgdXBkYXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgICAqL1xuICAgIHVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlZmxlY3RpbmdQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHRoaXMuX3JlZmxlY3RpbmdQcm9wZXJ0aWVzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAvLyBVc2UgZm9yRWFjaCBzbyB0aGlzIHdvcmtzIGV2ZW4gaWYgZm9yL29mIGxvb3BzIGFyZSBjb21waWxlZCB0byBmb3JcbiAgICAgICAgICAgIC8vIGxvb3BzIGV4cGVjdGluZyBhcnJheXNcbiAgICAgICAgICAgIHRoaXMuX3JlZmxlY3RpbmdQcm9wZXJ0aWVzLmZvckVhY2goKHYsIGspID0+IHRoaXMuX3Byb3BlcnR5VG9BdHRyaWJ1dGUoaywgdGhpc1trXSwgdikpO1xuICAgICAgICAgICAgdGhpcy5fcmVmbGVjdGluZ1Byb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFya1VwZGF0ZWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW52b2tlZCB3aGVuZXZlciB0aGUgZWxlbWVudCBpcyB1cGRhdGVkLiBJbXBsZW1lbnQgdG8gcGVyZm9ybVxuICAgICAqIHBvc3QtdXBkYXRpbmcgdGFza3MgdmlhIERPTSBBUElzLCBmb3IgZXhhbXBsZSwgZm9jdXNpbmcgYW4gZWxlbWVudC5cbiAgICAgKlxuICAgICAqIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIHRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICAgICAqIGFnYWluIGFmdGVyIHRoaXMgdXBkYXRlIGN5Y2xlIGNvbXBsZXRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBfY2hhbmdlZFByb3BlcnRpZXMgTWFwIG9mIGNoYW5nZWQgcHJvcGVydGllcyB3aXRoIG9sZCB2YWx1ZXNcbiAgICAgKi9cbiAgICB1cGRhdGVkKF9jaGFuZ2VkUHJvcGVydGllcykge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIHdoZW4gdGhlIGVsZW1lbnQgaXMgZmlyc3QgdXBkYXRlZC4gSW1wbGVtZW50IHRvIHBlcmZvcm0gb25lIHRpbWVcbiAgICAgKiB3b3JrIG9uIHRoZSBlbGVtZW50IGFmdGVyIHVwZGF0ZS5cbiAgICAgKlxuICAgICAqIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIHRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICAgICAqIGFnYWluIGFmdGVyIHRoaXMgdXBkYXRlIGN5Y2xlIGNvbXBsZXRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBfY2hhbmdlZFByb3BlcnRpZXMgTWFwIG9mIGNoYW5nZWQgcHJvcGVydGllcyB3aXRoIG9sZCB2YWx1ZXNcbiAgICAgKi9cbiAgICBmaXJzdFVwZGF0ZWQoX2NoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgfVxufVxuX2EgPSBmaW5hbGl6ZWQ7XG4vKipcbiAqIE1hcmtzIGNsYXNzIGFzIGhhdmluZyBmaW5pc2hlZCBjcmVhdGluZyBwcm9wZXJ0aWVzLlxuICovXG5VcGRhdGluZ0VsZW1lbnRbX2FdID0gdHJ1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVwZGF0aW5nLWVsZW1lbnQuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuLyoqXG4gKiBUaGUgbWFpbiBMaXRFbGVtZW50IG1vZHVsZSwgd2hpY2ggZGVmaW5lcyB0aGUgW1tgTGl0RWxlbWVudGBdXSBiYXNlIGNsYXNzIGFuZFxuICogcmVsYXRlZCBBUElzLlxuICpcbiAqICBMaXRFbGVtZW50IGNvbXBvbmVudHMgY2FuIGRlZmluZSBhIHRlbXBsYXRlIGFuZCBhIHNldCBvZiBvYnNlcnZlZFxuICogcHJvcGVydGllcy4gQ2hhbmdpbmcgYW4gb2JzZXJ2ZWQgcHJvcGVydHkgdHJpZ2dlcnMgYSByZS1yZW5kZXIgb2YgdGhlXG4gKiBlbGVtZW50LlxuICpcbiAqICBJbXBvcnQgW1tgTGl0RWxlbWVudGBdXSBhbmQgW1tgaHRtbGBdXSBmcm9tIHRoaXMgbW9kdWxlIHRvIGNyZWF0ZSBhXG4gKiBjb21wb25lbnQ6XG4gKlxuICogIGBgYGpzXG4gKiBpbXBvcnQge0xpdEVsZW1lbnQsIGh0bWx9IGZyb20gJ2xpdC1lbGVtZW50JztcbiAqXG4gKiBjbGFzcyBNeUVsZW1lbnQgZXh0ZW5kcyBMaXRFbGVtZW50IHtcbiAqXG4gKiAgIC8vIERlY2xhcmUgb2JzZXJ2ZWQgcHJvcGVydGllc1xuICogICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gKiAgICAgcmV0dXJuIHtcbiAqICAgICAgIGFkamVjdGl2ZToge31cbiAqICAgICB9XG4gKiAgIH1cbiAqXG4gKiAgIGNvbnN0cnVjdG9yKCkge1xuICogICAgIHRoaXMuYWRqZWN0aXZlID0gJ2F3ZXNvbWUnO1xuICogICB9XG4gKlxuICogICAvLyBEZWZpbmUgdGhlIGVsZW1lbnQncyB0ZW1wbGF0ZVxuICogICByZW5kZXIoKSB7XG4gKiAgICAgcmV0dXJuIGh0bWxgPHA+eW91ciAke2FkamVjdGl2ZX0gdGVtcGxhdGUgaGVyZTwvcD5gO1xuICogICB9XG4gKiB9XG4gKlxuICogY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdteS1lbGVtZW50JywgTXlFbGVtZW50KTtcbiAqIGBgYFxuICpcbiAqIGBMaXRFbGVtZW50YCBleHRlbmRzIFtbYFVwZGF0aW5nRWxlbWVudGBdXSBhbmQgYWRkcyBsaXQtaHRtbCB0ZW1wbGF0aW5nLlxuICogVGhlIGBVcGRhdGluZ0VsZW1lbnRgIGNsYXNzIGlzIHByb3ZpZGVkIGZvciB1c2VycyB0aGF0IHdhbnQgdG8gYnVpbGRcbiAqIHRoZWlyIG93biBjdXN0b20gZWxlbWVudCBiYXNlIGNsYXNzZXMgdGhhdCBkb24ndCB1c2UgbGl0LWh0bWwuXG4gKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKi9cbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ2xpdC1odG1sL2xpYi9zaGFkeS1yZW5kZXIuanMnO1xuaW1wb3J0IHsgVXBkYXRpbmdFbGVtZW50IH0gZnJvbSAnLi9saWIvdXBkYXRpbmctZWxlbWVudC5qcyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi91cGRhdGluZy1lbGVtZW50LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2RlY29yYXRvcnMuanMnO1xuZXhwb3J0IHsgaHRtbCwgc3ZnLCBUZW1wbGF0ZVJlc3VsdCwgU1ZHVGVtcGxhdGVSZXN1bHQgfSBmcm9tICdsaXQtaHRtbC9saXQtaHRtbC5qcyc7XG5pbXBvcnQgeyBzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHMsIHVuc2FmZUNTUyB9IGZyb20gJy4vbGliL2Nzcy10YWcuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvY3NzLXRhZy5qcyc7XG4vLyBJTVBPUlRBTlQ6IGRvIG5vdCBjaGFuZ2UgdGhlIHByb3BlcnR5IG5hbWUgb3IgdGhlIGFzc2lnbm1lbnQgZXhwcmVzc2lvbi5cbi8vIFRoaXMgbGluZSB3aWxsIGJlIHVzZWQgaW4gcmVnZXhlcyB0byBzZWFyY2ggZm9yIExpdEVsZW1lbnQgdXNhZ2UuXG4vLyBUT0RPKGp1c3RpbmZhZ25hbmkpOiBpbmplY3QgdmVyc2lvbiBudW1iZXIgYXQgYnVpbGQgdGltZVxuKHdpbmRvd1snbGl0RWxlbWVudFZlcnNpb25zJ10gfHwgKHdpbmRvd1snbGl0RWxlbWVudFZlcnNpb25zJ10gPSBbXSkpXG4gICAgLnB1c2goJzIuNC4wJyk7XG4vKipcbiAqIFNlbnRpbmFsIHZhbHVlIHVzZWQgdG8gYXZvaWQgY2FsbGluZyBsaXQtaHRtbCdzIHJlbmRlciBmdW5jdGlvbiB3aGVuXG4gKiBzdWJjbGFzc2VzIGRvIG5vdCBpbXBsZW1lbnQgYHJlbmRlcmBcbiAqL1xuY29uc3QgcmVuZGVyTm90SW1wbGVtZW50ZWQgPSB7fTtcbi8qKlxuICogQmFzZSBlbGVtZW50IGNsYXNzIHRoYXQgbWFuYWdlcyBlbGVtZW50IHByb3BlcnRpZXMgYW5kIGF0dHJpYnV0ZXMsIGFuZFxuICogcmVuZGVycyBhIGxpdC1odG1sIHRlbXBsYXRlLlxuICpcbiAqIFRvIGRlZmluZSBhIGNvbXBvbmVudCwgc3ViY2xhc3MgYExpdEVsZW1lbnRgIGFuZCBpbXBsZW1lbnQgYVxuICogYHJlbmRlcmAgbWV0aG9kIHRvIHByb3ZpZGUgdGhlIGNvbXBvbmVudCdzIHRlbXBsYXRlLiBEZWZpbmUgcHJvcGVydGllc1xuICogdXNpbmcgdGhlIFtbYHByb3BlcnRpZXNgXV0gcHJvcGVydHkgb3IgdGhlIFtbYHByb3BlcnR5YF1dIGRlY29yYXRvci5cbiAqL1xuZXhwb3J0IGNsYXNzIExpdEVsZW1lbnQgZXh0ZW5kcyBVcGRhdGluZ0VsZW1lbnQge1xuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgYXJyYXkgb2Ygc3R5bGVzIHRvIGFwcGx5IHRvIHRoZSBlbGVtZW50LlxuICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGludGVncmF0ZSBpbnRvIGEgc3R5bGUgbWFuYWdlbWVudCBzeXN0ZW0uXG4gICAgICpcbiAgICAgKiBAbm9jb2xsYXBzZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRTdHlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0eWxlcztcbiAgICB9XG4gICAgLyoqIEBub2NvbGxhcHNlICovXG4gICAgc3RhdGljIF9nZXRVbmlxdWVTdHlsZXMoKSB7XG4gICAgICAgIC8vIE9ubHkgZ2F0aGVyIHN0eWxlcyBvbmNlIHBlciBjbGFzc1xuICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdfc3R5bGVzJywgdGhpcykpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGFrZSBjYXJlIG5vdCB0byBjYWxsIGB0aGlzLmdldFN0eWxlcygpYCBtdWx0aXBsZSB0aW1lcyBzaW5jZSB0aGlzXG4gICAgICAgIC8vIGdlbmVyYXRlcyBuZXcgQ1NTUmVzdWx0cyBlYWNoIHRpbWUuXG4gICAgICAgIC8vIFRPRE8oc29ydmVsbCk6IFNpbmNlIHdlIGRvIG5vdCBjYWNoZSBDU1NSZXN1bHRzIGJ5IGlucHV0LCBhbnlcbiAgICAgICAgLy8gc2hhcmVkIHN0eWxlcyB3aWxsIGdlbmVyYXRlIG5ldyBzdHlsZXNoZWV0IG9iamVjdHMsIHdoaWNoIGlzIHdhc3RlZnVsLlxuICAgICAgICAvLyBUaGlzIHNob3VsZCBiZSBhZGRyZXNzZWQgd2hlbiBhIGJyb3dzZXIgc2hpcHMgY29uc3RydWN0YWJsZVxuICAgICAgICAvLyBzdHlsZXNoZWV0cy5cbiAgICAgICAgY29uc3QgdXNlclN0eWxlcyA9IHRoaXMuZ2V0U3R5bGVzKCk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHVzZXJTdHlsZXMpKSB7XG4gICAgICAgICAgICAvLyBEZS1kdXBsaWNhdGUgc3R5bGVzIHByZXNlcnZpbmcgdGhlIF9sYXN0XyBpbnN0YW5jZSBpbiB0aGUgc2V0LlxuICAgICAgICAgICAgLy8gVGhpcyBpcyBhIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbiB0byBhdm9pZCBkdXBsaWNhdGVkIHN0eWxlcyB0aGF0IGNhblxuICAgICAgICAgICAgLy8gb2NjdXIgZXNwZWNpYWxseSB3aGVuIGNvbXBvc2luZyB2aWEgc3ViY2xhc3NpbmcuXG4gICAgICAgICAgICAvLyBUaGUgbGFzdCBpdGVtIGlzIGtlcHQgdG8gdHJ5IHRvIHByZXNlcnZlIHRoZSBjYXNjYWRlIG9yZGVyIHdpdGggdGhlXG4gICAgICAgICAgICAvLyBhc3N1bXB0aW9uIHRoYXQgaXQncyBtb3N0IGltcG9ydGFudCB0aGF0IGxhc3QgYWRkZWQgc3R5bGVzIG92ZXJyaWRlXG4gICAgICAgICAgICAvLyBwcmV2aW91cyBzdHlsZXMuXG4gICAgICAgICAgICBjb25zdCBhZGRTdHlsZXMgPSAoc3R5bGVzLCBzZXQpID0+IHN0eWxlcy5yZWR1Y2VSaWdodCgoc2V0LCBzKSA9PiBcbiAgICAgICAgICAgIC8vIE5vdGU6IE9uIElFIHNldC5hZGQoKSBkb2VzIG5vdCByZXR1cm4gdGhlIHNldFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShzKSA/IGFkZFN0eWxlcyhzLCBzZXQpIDogKHNldC5hZGQocyksIHNldCksIHNldCk7XG4gICAgICAgICAgICAvLyBBcnJheS5mcm9tIGRvZXMgbm90IHdvcmsgb24gU2V0IGluIElFLCBvdGhlcndpc2UgcmV0dXJuXG4gICAgICAgICAgICAvLyBBcnJheS5mcm9tKGFkZFN0eWxlcyh1c2VyU3R5bGVzLCBuZXcgU2V0PENTU1Jlc3VsdD4oKSkpLnJldmVyc2UoKVxuICAgICAgICAgICAgY29uc3Qgc2V0ID0gYWRkU3R5bGVzKHVzZXJTdHlsZXMsIG5ldyBTZXQoKSk7XG4gICAgICAgICAgICBjb25zdCBzdHlsZXMgPSBbXTtcbiAgICAgICAgICAgIHNldC5mb3JFYWNoKCh2KSA9PiBzdHlsZXMudW5zaGlmdCh2KSk7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZXMgPSBzdHlsZXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZXMgPSB1c2VyU3R5bGVzID09PSB1bmRlZmluZWQgPyBbXSA6IFt1c2VyU3R5bGVzXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGVyZSBhcmUgbm8gaW52YWxpZCBDU1NTdHlsZVNoZWV0IGluc3RhbmNlcyBoZXJlLiBUaGV5IGFyZVxuICAgICAgICAvLyBpbnZhbGlkIGluIHR3byBjb25kaXRpb25zLlxuICAgICAgICAvLyAoMSkgdGhlIHNoZWV0IGlzIG5vbi1jb25zdHJ1Y3RpYmxlIChgc2hlZXRgIG9mIGEgSFRNTFN0eWxlRWxlbWVudCksIGJ1dFxuICAgICAgICAvLyAgICAgdGhpcyBpcyBpbXBvc3NpYmxlIHRvIGNoZWNrIGV4Y2VwdCB2aWEgLnJlcGxhY2VTeW5jIG9yIHVzZVxuICAgICAgICAvLyAoMikgdGhlIFNoYWR5Q1NTIHBvbHlmaWxsIGlzIGVuYWJsZWQgKDouIHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cyBpc1xuICAgICAgICAvLyAgICAgZmFsc2UpXG4gICAgICAgIHRoaXMuX3N0eWxlcyA9IHRoaXMuX3N0eWxlcy5tYXAoKHMpID0+IHtcbiAgICAgICAgICAgIGlmIChzIGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldCAmJiAhc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzKSB7XG4gICAgICAgICAgICAgICAgLy8gRmxhdHRlbiB0aGUgY3NzVGV4dCBmcm9tIHRoZSBwYXNzZWQgY29uc3RydWN0aWJsZSBzdHlsZXNoZWV0IChvclxuICAgICAgICAgICAgICAgIC8vIHVuZGV0ZWN0YWJsZSBub24tY29uc3RydWN0aWJsZSBzdHlsZXNoZWV0KS4gVGhlIHVzZXIgbWlnaHQgaGF2ZVxuICAgICAgICAgICAgICAgIC8vIGV4cGVjdGVkIHRvIHVwZGF0ZSB0aGVpciBzdHlsZXNoZWV0cyBvdmVyIHRpbWUsIGJ1dCB0aGUgYWx0ZXJuYXRpdmVcbiAgICAgICAgICAgICAgICAvLyBpcyBhIGNyYXNoLlxuICAgICAgICAgICAgICAgIGNvbnN0IGNzc1RleHQgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChzLmNzc1J1bGVzKVxuICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChjc3MsIHJ1bGUpID0+IGNzcyArIHJ1bGUuY3NzVGV4dCwgJycpO1xuICAgICAgICAgICAgICAgIHJldHVybiB1bnNhZmVDU1MoY3NzVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGVsZW1lbnQgaW5pdGlhbGl6YXRpb24uIEJ5IGRlZmF1bHQgdGhpcyBjYWxsc1xuICAgICAqIFtbYGNyZWF0ZVJlbmRlclJvb3RgXV0gdG8gY3JlYXRlIHRoZSBlbGVtZW50IFtbYHJlbmRlclJvb3RgXV0gbm9kZSBhbmRcbiAgICAgKiBjYXB0dXJlcyBhbnkgcHJlLXNldCB2YWx1ZXMgZm9yIHJlZ2lzdGVyZWQgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IuX2dldFVuaXF1ZVN0eWxlcygpO1xuICAgICAgICB0aGlzLnJlbmRlclJvb3QgPSB0aGlzLmNyZWF0ZVJlbmRlclJvb3QoKTtcbiAgICAgICAgLy8gTm90ZSwgaWYgcmVuZGVyUm9vdCBpcyBub3QgYSBzaGFkb3dSb290LCBzdHlsZXMgd291bGQvY291bGQgYXBwbHkgdG8gdGhlXG4gICAgICAgIC8vIGVsZW1lbnQncyBnZXRSb290Tm9kZSgpLiBXaGlsZSB0aGlzIGNvdWxkIGJlIGRvbmUsIHdlJ3JlIGNob29zaW5nIG5vdCB0b1xuICAgICAgICAvLyBzdXBwb3J0IHRoaXMgbm93IHNpbmNlIGl0IHdvdWxkIHJlcXVpcmUgZGlmZmVyZW50IGxvZ2ljIGFyb3VuZCBkZS1kdXBpbmcuXG4gICAgICAgIGlmICh3aW5kb3cuU2hhZG93Um9vdCAmJiB0aGlzLnJlbmRlclJvb3QgaW5zdGFuY2VvZiB3aW5kb3cuU2hhZG93Um9vdCkge1xuICAgICAgICAgICAgdGhpcy5hZG9wdFN0eWxlcygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG5vZGUgaW50byB3aGljaCB0aGUgZWxlbWVudCBzaG91bGQgcmVuZGVyIGFuZCBieSBkZWZhdWx0XG4gICAgICogY3JlYXRlcyBhbmQgcmV0dXJucyBhbiBvcGVuIHNoYWRvd1Jvb3QuIEltcGxlbWVudCB0byBjdXN0b21pemUgd2hlcmUgdGhlXG4gICAgICogZWxlbWVudCdzIERPTSBpcyByZW5kZXJlZC4gRm9yIGV4YW1wbGUsIHRvIHJlbmRlciBpbnRvIHRoZSBlbGVtZW50J3NcbiAgICAgKiBjaGlsZE5vZGVzLCByZXR1cm4gYHRoaXNgLlxuICAgICAqIEByZXR1cm5zIHtFbGVtZW50fERvY3VtZW50RnJhZ21lbnR9IFJldHVybnMgYSBub2RlIGludG8gd2hpY2ggdG8gcmVuZGVyLlxuICAgICAqL1xuICAgIGNyZWF0ZVJlbmRlclJvb3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbGllcyBzdHlsaW5nIHRvIHRoZSBlbGVtZW50IHNoYWRvd1Jvb3QgdXNpbmcgdGhlIFtbYHN0eWxlc2BdXVxuICAgICAqIHByb3BlcnR5LiBTdHlsaW5nIHdpbGwgYXBwbHkgdXNpbmcgYHNoYWRvd1Jvb3QuYWRvcHRlZFN0eWxlU2hlZXRzYCB3aGVyZVxuICAgICAqIGF2YWlsYWJsZSBhbmQgd2lsbCBmYWxsYmFjayBvdGhlcndpc2UuIFdoZW4gU2hhZG93IERPTSBpcyBwb2x5ZmlsbGVkLFxuICAgICAqIFNoYWR5Q1NTIHNjb3BlcyBzdHlsZXMgYW5kIGFkZHMgdGhlbSB0byB0aGUgZG9jdW1lbnQuIFdoZW4gU2hhZG93IERPTVxuICAgICAqIGlzIGF2YWlsYWJsZSBidXQgYGFkb3B0ZWRTdHlsZVNoZWV0c2AgaXMgbm90LCBzdHlsZXMgYXJlIGFwcGVuZGVkIHRvIHRoZVxuICAgICAqIGVuZCBvZiB0aGUgYHNoYWRvd1Jvb3RgIHRvIFttaW1pYyBzcGVjXG4gICAgICogYmVoYXZpb3JdKGh0dHBzOi8vd2ljZy5naXRodWIuaW8vY29uc3RydWN0LXN0eWxlc2hlZXRzLyN1c2luZy1jb25zdHJ1Y3RlZC1zdHlsZXNoZWV0cykuXG4gICAgICovXG4gICAgYWRvcHRTdHlsZXMoKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuY29uc3RydWN0b3IuX3N0eWxlcztcbiAgICAgICAgaWYgKHN0eWxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGVyZSBhcmUgdGhyZWUgc2VwYXJhdGUgY2FzZXMgaGVyZSBiYXNlZCBvbiBTaGFkb3cgRE9NIHN1cHBvcnQuXG4gICAgICAgIC8vICgxKSBzaGFkb3dSb290IHBvbHlmaWxsZWQ6IHVzZSBTaGFkeUNTU1xuICAgICAgICAvLyAoMikgc2hhZG93Um9vdC5hZG9wdGVkU3R5bGVTaGVldHMgYXZhaWxhYmxlOiB1c2UgaXRcbiAgICAgICAgLy8gKDMpIHNoYWRvd1Jvb3QuYWRvcHRlZFN0eWxlU2hlZXRzIHBvbHlmaWxsZWQ6IGFwcGVuZCBzdHlsZXMgYWZ0ZXJcbiAgICAgICAgLy8gcmVuZGVyaW5nXG4gICAgICAgIGlmICh3aW5kb3cuU2hhZHlDU1MgIT09IHVuZGVmaW5lZCAmJiAhd2luZG93LlNoYWR5Q1NTLm5hdGl2ZVNoYWRvdykge1xuICAgICAgICAgICAgd2luZG93LlNoYWR5Q1NTLlNjb3BpbmdTaGltLnByZXBhcmVBZG9wdGVkQ3NzVGV4dChzdHlsZXMubWFwKChzKSA9PiBzLmNzc1RleHQpLCB0aGlzLmxvY2FsTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclJvb3QuYWRvcHRlZFN0eWxlU2hlZXRzID1cbiAgICAgICAgICAgICAgICBzdHlsZXMubWFwKChzKSA9PiBzIGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldCA/IHMgOiBzLnN0eWxlU2hlZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhpcyBtdXN0IGJlIGRvbmUgYWZ0ZXIgcmVuZGVyaW5nIHNvIHRoZSBhY3R1YWwgc3R5bGUgaW5zZXJ0aW9uIGlzIGRvbmVcbiAgICAgICAgICAgIC8vIGluIGB1cGRhdGVgLlxuICAgICAgICAgICAgdGhpcy5fbmVlZHNTaGltQWRvcHRlZFN0eWxlU2hlZXRzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICAgICAgLy8gTm90ZSwgZmlyc3QgdXBkYXRlL3JlbmRlciBoYW5kbGVzIHN0eWxlRWxlbWVudCBzbyB3ZSBvbmx5IGNhbGwgdGhpcyBpZlxuICAgICAgICAvLyBjb25uZWN0ZWQgYWZ0ZXIgZmlyc3QgdXBkYXRlLlxuICAgICAgICBpZiAodGhpcy5oYXNVcGRhdGVkICYmIHdpbmRvdy5TaGFkeUNTUyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB3aW5kb3cuU2hhZHlDU1Muc3R5bGVFbGVtZW50KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGVsZW1lbnQuIFRoaXMgbWV0aG9kIHJlZmxlY3RzIHByb3BlcnR5IHZhbHVlcyB0byBhdHRyaWJ1dGVzXG4gICAgICogYW5kIGNhbGxzIGByZW5kZXJgIHRvIHJlbmRlciBET00gdmlhIGxpdC1odG1sLiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlXG4gICAgICogdGhpcyBtZXRob2Qgd2lsbCAqbm90KiB0cmlnZ2VyIGFub3RoZXIgdXBkYXRlLlxuICAgICAqIEBwYXJhbSBfY2hhbmdlZFByb3BlcnRpZXMgTWFwIG9mIGNoYW5nZWQgcHJvcGVydGllcyB3aXRoIG9sZCB2YWx1ZXNcbiAgICAgKi9cbiAgICB1cGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICAgICAgLy8gU2V0dGluZyBwcm9wZXJ0aWVzIGluIGByZW5kZXJgIHNob3VsZCBub3QgdHJpZ2dlciBhbiB1cGRhdGUuIFNpbmNlXG4gICAgICAgIC8vIHVwZGF0ZXMgYXJlIGFsbG93ZWQgYWZ0ZXIgc3VwZXIudXBkYXRlLCBpdCdzIGltcG9ydGFudCB0byBjYWxsIGByZW5kZXJgXG4gICAgICAgIC8vIGJlZm9yZSB0aGF0LlxuICAgICAgICBjb25zdCB0ZW1wbGF0ZVJlc3VsdCA9IHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHN1cGVyLnVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICAgIC8vIElmIHJlbmRlciBpcyBub3QgaW1wbGVtZW50ZWQgYnkgdGhlIGNvbXBvbmVudCwgZG9uJ3QgY2FsbCBsaXQtaHRtbCByZW5kZXJcbiAgICAgICAgaWYgKHRlbXBsYXRlUmVzdWx0ICE9PSByZW5kZXJOb3RJbXBsZW1lbnRlZCkge1xuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3RvclxuICAgICAgICAgICAgICAgIC5yZW5kZXIodGVtcGxhdGVSZXN1bHQsIHRoaXMucmVuZGVyUm9vdCwgeyBzY29wZU5hbWU6IHRoaXMubG9jYWxOYW1lLCBldmVudENvbnRleHQ6IHRoaXMgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2hlbiBuYXRpdmUgU2hhZG93IERPTSBpcyB1c2VkIGJ1dCBhZG9wdGVkU3R5bGVzIGFyZSBub3Qgc3VwcG9ydGVkLFxuICAgICAgICAvLyBpbnNlcnQgc3R5bGluZyBhZnRlciByZW5kZXJpbmcgdG8gZW5zdXJlIGFkb3B0ZWRTdHlsZXMgaGF2ZSBoaWdoZXN0XG4gICAgICAgIC8vIHByaW9yaXR5LlxuICAgICAgICBpZiAodGhpcy5fbmVlZHNTaGltQWRvcHRlZFN0eWxlU2hlZXRzKSB7XG4gICAgICAgICAgICB0aGlzLl9uZWVkc1NoaW1BZG9wdGVkU3R5bGVTaGVldHMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuX3N0eWxlcy5mb3JFYWNoKChzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gcy5jc3NUZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyUm9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIG9uIGVhY2ggdXBkYXRlIHRvIHBlcmZvcm0gcmVuZGVyaW5nIHRhc2tzLiBUaGlzIG1ldGhvZCBtYXkgcmV0dXJuXG4gICAgICogYW55IHZhbHVlIHJlbmRlcmFibGUgYnkgbGl0LWh0bWwncyBgTm9kZVBhcnRgIC0gdHlwaWNhbGx5IGFcbiAgICAgKiBgVGVtcGxhdGVSZXN1bHRgLiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlIHRoaXMgbWV0aG9kIHdpbGwgKm5vdCogdHJpZ2dlclxuICAgICAqIHRoZSBlbGVtZW50IHRvIHVwZGF0ZS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJOb3RJbXBsZW1lbnRlZDtcbiAgICB9XG59XG4vKipcbiAqIEVuc3VyZSB0aGlzIGNsYXNzIGlzIG1hcmtlZCBhcyBgZmluYWxpemVkYCBhcyBhbiBvcHRpbWl6YXRpb24gZW5zdXJpbmdcbiAqIGl0IHdpbGwgbm90IG5lZWRsZXNzbHkgdHJ5IHRvIGBmaW5hbGl6ZWAuXG4gKlxuICogTm90ZSB0aGlzIHByb3BlcnR5IG5hbWUgaXMgYSBzdHJpbmcgdG8gcHJldmVudCBicmVha2luZyBDbG9zdXJlIEpTIENvbXBpbGVyXG4gKiBvcHRpbWl6YXRpb25zLiBTZWUgdXBkYXRpbmctZWxlbWVudC50cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqL1xuTGl0RWxlbWVudFsnZmluYWxpemVkJ10gPSB0cnVlO1xuLyoqXG4gKiBSZWZlcmVuY2UgdG8gdGhlIHVuZGVybHlpbmcgbGlicmFyeSBtZXRob2QgdXNlZCB0byByZW5kZXIgdGhlIGVsZW1lbnQnc1xuICogRE9NLiBCeSBkZWZhdWx0LCBwb2ludHMgdG8gdGhlIGByZW5kZXJgIG1ldGhvZCBmcm9tIGxpdC1odG1sJ3Mgc2hhZHktcmVuZGVyXG4gKiBtb2R1bGUuXG4gKlxuICogKipNb3N0IHVzZXJzIHdpbGwgbmV2ZXIgbmVlZCB0byB0b3VjaCB0aGlzIHByb3BlcnR5LioqXG4gKlxuICogVGhpcyAgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSBjb25mdXNlZCB3aXRoIHRoZSBgcmVuZGVyYCBpbnN0YW5jZSBtZXRob2QsXG4gKiB3aGljaCBzaG91bGQgYmUgb3ZlcnJpZGRlbiB0byBkZWZpbmUgYSB0ZW1wbGF0ZSBmb3IgdGhlIGVsZW1lbnQuXG4gKlxuICogQWR2YW5jZWQgdXNlcnMgY3JlYXRpbmcgYSBuZXcgYmFzZSBjbGFzcyBiYXNlZCBvbiBMaXRFbGVtZW50IGNhbiBvdmVycmlkZVxuICogdGhpcyBwcm9wZXJ0eSB0byBwb2ludCB0byBhIGN1c3RvbSByZW5kZXIgbWV0aG9kIHdpdGggYSBzaWduYXR1cmUgdGhhdFxuICogbWF0Y2hlcyBbc2hhZHktcmVuZGVyJ3MgYHJlbmRlcmBcbiAqIG1ldGhvZF0oaHR0cHM6Ly9saXQtaHRtbC5wb2x5bWVyLXByb2plY3Qub3JnL2FwaS9tb2R1bGVzL3NoYWR5X3JlbmRlci5odG1sI3JlbmRlcikuXG4gKlxuICogQG5vY29sbGFwc2VcbiAqL1xuTGl0RWxlbWVudC5yZW5kZXIgPSByZW5kZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXQtZWxlbWVudC5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5pbXBvcnQgeyBBdHRyaWJ1dGVDb21taXR0ZXIsIEJvb2xlYW5BdHRyaWJ1dGVQYXJ0LCBFdmVudFBhcnQsIE5vZGVQYXJ0LCBQcm9wZXJ0eUNvbW1pdHRlciB9IGZyb20gJy4vcGFydHMuanMnO1xuLyoqXG4gKiBDcmVhdGVzIFBhcnRzIHdoZW4gYSB0ZW1wbGF0ZSBpcyBpbnN0YW50aWF0ZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZhdWx0VGVtcGxhdGVQcm9jZXNzb3Ige1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBwYXJ0cyBmb3IgYW4gYXR0cmlidXRlLXBvc2l0aW9uIGJpbmRpbmcsIGdpdmVuIHRoZSBldmVudCwgYXR0cmlidXRlXG4gICAgICogbmFtZSwgYW5kIHN0cmluZyBsaXRlcmFscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGJpbmRpbmdcbiAgICAgKiBAcGFyYW0gbmFtZSAgVGhlIGF0dHJpYnV0ZSBuYW1lXG4gICAgICogQHBhcmFtIHN0cmluZ3MgVGhlIHN0cmluZyBsaXRlcmFscy4gVGhlcmUgYXJlIGFsd2F5cyBhdCBsZWFzdCB0d28gc3RyaW5ncyxcbiAgICAgKiAgIGV2ZW50IGZvciBmdWxseS1jb250cm9sbGVkIGJpbmRpbmdzIHdpdGggYSBzaW5nbGUgZXhwcmVzc2lvbi5cbiAgICAgKi9cbiAgICBoYW5kbGVBdHRyaWJ1dGVFeHByZXNzaW9ucyhlbGVtZW50LCBuYW1lLCBzdHJpbmdzLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IG5hbWVbMF07XG4gICAgICAgIGlmIChwcmVmaXggPT09ICcuJykge1xuICAgICAgICAgICAgY29uc3QgY29tbWl0dGVyID0gbmV3IFByb3BlcnR5Q29tbWl0dGVyKGVsZW1lbnQsIG5hbWUuc2xpY2UoMSksIHN0cmluZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1pdHRlci5wYXJ0cztcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJlZml4ID09PSAnQCcpIHtcbiAgICAgICAgICAgIHJldHVybiBbbmV3IEV2ZW50UGFydChlbGVtZW50LCBuYW1lLnNsaWNlKDEpLCBvcHRpb25zLmV2ZW50Q29udGV4dCldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmVmaXggPT09ICc/Jykge1xuICAgICAgICAgICAgcmV0dXJuIFtuZXcgQm9vbGVhbkF0dHJpYnV0ZVBhcnQoZWxlbWVudCwgbmFtZS5zbGljZSgxKSwgc3RyaW5ncyldO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbW1pdHRlciA9IG5ldyBBdHRyaWJ1dGVDb21taXR0ZXIoZWxlbWVudCwgbmFtZSwgc3RyaW5ncyk7XG4gICAgICAgIHJldHVybiBjb21taXR0ZXIucGFydHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBwYXJ0cyBmb3IgYSB0ZXh0LXBvc2l0aW9uIGJpbmRpbmcuXG4gICAgICogQHBhcmFtIHRlbXBsYXRlRmFjdG9yeVxuICAgICAqL1xuICAgIGhhbmRsZVRleHRFeHByZXNzaW9uKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOb2RlUGFydChvcHRpb25zKTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgZGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yID0gbmV3IERlZmF1bHRUZW1wbGF0ZVByb2Nlc3NvcigpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmYXVsdC10ZW1wbGF0ZS1wcm9jZXNzb3IuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuY29uc3QgZGlyZWN0aXZlcyA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIEJyYW5kcyBhIGZ1bmN0aW9uIGFzIGEgZGlyZWN0aXZlIGZhY3RvcnkgZnVuY3Rpb24gc28gdGhhdCBsaXQtaHRtbCB3aWxsIGNhbGxcbiAqIHRoZSBmdW5jdGlvbiBkdXJpbmcgdGVtcGxhdGUgcmVuZGVyaW5nLCByYXRoZXIgdGhhbiBwYXNzaW5nIGFzIGEgdmFsdWUuXG4gKlxuICogQSBfZGlyZWN0aXZlXyBpcyBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBQYXJ0IGFzIGFuIGFyZ3VtZW50LiBJdCBoYXMgdGhlXG4gKiBzaWduYXR1cmU6IGAocGFydDogUGFydCkgPT4gdm9pZGAuXG4gKlxuICogQSBkaXJlY3RpdmUgX2ZhY3RvcnlfIGlzIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhcmd1bWVudHMgZm9yIGRhdGEgYW5kXG4gKiBjb25maWd1cmF0aW9uIGFuZCByZXR1cm5zIGEgZGlyZWN0aXZlLiBVc2VycyBvZiBkaXJlY3RpdmUgdXN1YWxseSByZWZlciB0b1xuICogdGhlIGRpcmVjdGl2ZSBmYWN0b3J5IGFzIHRoZSBkaXJlY3RpdmUuIEZvciBleGFtcGxlLCBcIlRoZSByZXBlYXQgZGlyZWN0aXZlXCIuXG4gKlxuICogVXN1YWxseSBhIHRlbXBsYXRlIGF1dGhvciB3aWxsIGludm9rZSBhIGRpcmVjdGl2ZSBmYWN0b3J5IGluIHRoZWlyIHRlbXBsYXRlXG4gKiB3aXRoIHJlbGV2YW50IGFyZ3VtZW50cywgd2hpY2ggd2lsbCB0aGVuIHJldHVybiBhIGRpcmVjdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBIZXJlJ3MgYW4gZXhhbXBsZSBvZiB1c2luZyB0aGUgYHJlcGVhdCgpYCBkaXJlY3RpdmUgZmFjdG9yeSB0aGF0IHRha2VzIGFuXG4gKiBhcnJheSBhbmQgYSBmdW5jdGlvbiB0byByZW5kZXIgYW4gaXRlbTpcbiAqXG4gKiBgYGBqc1xuICogaHRtbGA8dWw+PCR7cmVwZWF0KGl0ZW1zLCAoaXRlbSkgPT4gaHRtbGA8bGk+JHtpdGVtfTwvbGk+YCl9PC91bD5gXG4gKiBgYGBcbiAqXG4gKiBXaGVuIGByZXBlYXRgIGlzIGludm9rZWQsIGl0IHJldHVybnMgYSBkaXJlY3RpdmUgZnVuY3Rpb24gdGhhdCBjbG9zZXMgb3ZlclxuICogYGl0ZW1zYCBhbmQgdGhlIHRlbXBsYXRlIGZ1bmN0aW9uLiBXaGVuIHRoZSBvdXRlciB0ZW1wbGF0ZSBpcyByZW5kZXJlZCwgdGhlXG4gKiByZXR1cm4gZGlyZWN0aXZlIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIHRoZSBQYXJ0IGZvciB0aGUgZXhwcmVzc2lvbi5cbiAqIGByZXBlYXRgIHRoZW4gcGVyZm9ybXMgaXQncyBjdXN0b20gbG9naWMgdG8gcmVuZGVyIG11bHRpcGxlIGl0ZW1zLlxuICpcbiAqIEBwYXJhbSBmIFRoZSBkaXJlY3RpdmUgZmFjdG9yeSBmdW5jdGlvbi4gTXVzdCBiZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhXG4gKiBmdW5jdGlvbiBvZiB0aGUgc2lnbmF0dXJlIGAocGFydDogUGFydCkgPT4gdm9pZGAuIFRoZSByZXR1cm5lZCBmdW5jdGlvbiB3aWxsXG4gKiBiZSBjYWxsZWQgd2l0aCB0aGUgcGFydCBvYmplY3QuXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiBpbXBvcnQge2RpcmVjdGl2ZSwgaHRtbH0gZnJvbSAnbGl0LWh0bWwnO1xuICpcbiAqIGNvbnN0IGltbXV0YWJsZSA9IGRpcmVjdGl2ZSgodikgPT4gKHBhcnQpID0+IHtcbiAqICAgaWYgKHBhcnQudmFsdWUgIT09IHYpIHtcbiAqICAgICBwYXJ0LnNldFZhbHVlKHYpXG4gKiAgIH1cbiAqIH0pO1xuICovXG5leHBvcnQgY29uc3QgZGlyZWN0aXZlID0gKGYpID0+ICgoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IGQgPSBmKC4uLmFyZ3MpO1xuICAgIGRpcmVjdGl2ZXMuc2V0KGQsIHRydWUpO1xuICAgIHJldHVybiBkO1xufSk7XG5leHBvcnQgY29uc3QgaXNEaXJlY3RpdmUgPSAobykgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgbyA9PT0gJ2Z1bmN0aW9uJyAmJiBkaXJlY3RpdmVzLmhhcyhvKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXJlY3RpdmUuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuLyoqXG4gKiBUcnVlIGlmIHRoZSBjdXN0b20gZWxlbWVudHMgcG9seWZpbGwgaXMgaW4gdXNlLlxuICovXG5leHBvcnQgY29uc3QgaXNDRVBvbHlmaWxsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMgIT0gbnVsbCAmJlxuICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5wb2x5ZmlsbFdyYXBGbHVzaENhbGxiYWNrICE9PVxuICAgICAgICB1bmRlZmluZWQ7XG4vKipcbiAqIFJlcGFyZW50cyBub2Rlcywgc3RhcnRpbmcgZnJvbSBgc3RhcnRgIChpbmNsdXNpdmUpIHRvIGBlbmRgIChleGNsdXNpdmUpLFxuICogaW50byBhbm90aGVyIGNvbnRhaW5lciAoY291bGQgYmUgdGhlIHNhbWUgY29udGFpbmVyKSwgYmVmb3JlIGBiZWZvcmVgLiBJZlxuICogYGJlZm9yZWAgaXMgbnVsbCwgaXQgYXBwZW5kcyB0aGUgbm9kZXMgdG8gdGhlIGNvbnRhaW5lci5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlcGFyZW50Tm9kZXMgPSAoY29udGFpbmVyLCBzdGFydCwgZW5kID0gbnVsbCwgYmVmb3JlID0gbnVsbCkgPT4ge1xuICAgIHdoaWxlIChzdGFydCAhPT0gZW5kKSB7XG4gICAgICAgIGNvbnN0IG4gPSBzdGFydC5uZXh0U2libGluZztcbiAgICAgICAgY29udGFpbmVyLmluc2VydEJlZm9yZShzdGFydCwgYmVmb3JlKTtcbiAgICAgICAgc3RhcnQgPSBuO1xuICAgIH1cbn07XG4vKipcbiAqIFJlbW92ZXMgbm9kZXMsIHN0YXJ0aW5nIGZyb20gYHN0YXJ0YCAoaW5jbHVzaXZlKSB0byBgZW5kYCAoZXhjbHVzaXZlKSwgZnJvbVxuICogYGNvbnRhaW5lcmAuXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVOb2RlcyA9IChjb250YWluZXIsIHN0YXJ0LCBlbmQgPSBudWxsKSA9PiB7XG4gICAgd2hpbGUgKHN0YXJ0ICE9PSBlbmQpIHtcbiAgICAgICAgY29uc3QgbiA9IHN0YXJ0Lm5leHRTaWJsaW5nO1xuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoc3RhcnQpO1xuICAgICAgICBzdGFydCA9IG47XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5pbXBvcnQgeyBpc1RlbXBsYXRlUGFydEFjdGl2ZSB9IGZyb20gJy4vdGVtcGxhdGUuanMnO1xuY29uc3Qgd2Fsa2VyTm9kZUZpbHRlciA9IDEzMyAvKiBOb2RlRmlsdGVyLlNIT1dfe0VMRU1FTlR8Q09NTUVOVHxURVhUfSAqLztcbi8qKlxuICogUmVtb3ZlcyB0aGUgbGlzdCBvZiBub2RlcyBmcm9tIGEgVGVtcGxhdGUgc2FmZWx5LiBJbiBhZGRpdGlvbiB0byByZW1vdmluZ1xuICogbm9kZXMgZnJvbSB0aGUgVGVtcGxhdGUsIHRoZSBUZW1wbGF0ZSBwYXJ0IGluZGljZXMgYXJlIHVwZGF0ZWQgdG8gbWF0Y2hcbiAqIHRoZSBtdXRhdGVkIFRlbXBsYXRlIERPTS5cbiAqXG4gKiBBcyB0aGUgdGVtcGxhdGUgaXMgd2Fsa2VkIHRoZSByZW1vdmFsIHN0YXRlIGlzIHRyYWNrZWQgYW5kXG4gKiBwYXJ0IGluZGljZXMgYXJlIGFkanVzdGVkIGFzIG5lZWRlZC5cbiAqXG4gKiBkaXZcbiAqICAgZGl2IzEgKHJlbW92ZSkgPC0tIHN0YXJ0IHJlbW92aW5nIChyZW1vdmluZyBub2RlIGlzIGRpdiMxKVxuICogICAgIGRpdlxuICogICAgICAgZGl2IzIgKHJlbW92ZSkgIDwtLSBjb250aW51ZSByZW1vdmluZyAocmVtb3Zpbmcgbm9kZSBpcyBzdGlsbCBkaXYjMSlcbiAqICAgICAgICAgZGl2XG4gKiBkaXYgPC0tIHN0b3AgcmVtb3Zpbmcgc2luY2UgcHJldmlvdXMgc2libGluZyBpcyB0aGUgcmVtb3Zpbmcgbm9kZSAoZGl2IzEsXG4gKiByZW1vdmVkIDQgbm9kZXMpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVOb2Rlc0Zyb21UZW1wbGF0ZSh0ZW1wbGF0ZSwgbm9kZXNUb1JlbW92ZSkge1xuICAgIGNvbnN0IHsgZWxlbWVudDogeyBjb250ZW50IH0sIHBhcnRzIH0gPSB0ZW1wbGF0ZTtcbiAgICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGNvbnRlbnQsIHdhbGtlck5vZGVGaWx0ZXIsIG51bGwsIGZhbHNlKTtcbiAgICBsZXQgcGFydEluZGV4ID0gbmV4dEFjdGl2ZUluZGV4SW5UZW1wbGF0ZVBhcnRzKHBhcnRzKTtcbiAgICBsZXQgcGFydCA9IHBhcnRzW3BhcnRJbmRleF07XG4gICAgbGV0IG5vZGVJbmRleCA9IC0xO1xuICAgIGxldCByZW1vdmVDb3VudCA9IDA7XG4gICAgY29uc3Qgbm9kZXNUb1JlbW92ZUluVGVtcGxhdGUgPSBbXTtcbiAgICBsZXQgY3VycmVudFJlbW92aW5nTm9kZSA9IG51bGw7XG4gICAgd2hpbGUgKHdhbGtlci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgIG5vZGVJbmRleCsrO1xuICAgICAgICBjb25zdCBub2RlID0gd2Fsa2VyLmN1cnJlbnROb2RlO1xuICAgICAgICAvLyBFbmQgcmVtb3ZhbCBpZiBzdGVwcGVkIHBhc3QgdGhlIHJlbW92aW5nIG5vZGVcbiAgICAgICAgaWYgKG5vZGUucHJldmlvdXNTaWJsaW5nID09PSBjdXJyZW50UmVtb3ZpbmdOb2RlKSB7XG4gICAgICAgICAgICBjdXJyZW50UmVtb3ZpbmdOb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBBIG5vZGUgdG8gcmVtb3ZlIHdhcyBmb3VuZCBpbiB0aGUgdGVtcGxhdGVcbiAgICAgICAgaWYgKG5vZGVzVG9SZW1vdmUuaGFzKG5vZGUpKSB7XG4gICAgICAgICAgICBub2Rlc1RvUmVtb3ZlSW5UZW1wbGF0ZS5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgLy8gVHJhY2sgbm9kZSB3ZSdyZSByZW1vdmluZ1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRSZW1vdmluZ05vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UmVtb3ZpbmdOb2RlID0gbm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHJlbW92aW5nLCBpbmNyZW1lbnQgY291bnQgYnkgd2hpY2ggdG8gYWRqdXN0IHN1YnNlcXVlbnQgcGFydCBpbmRpY2VzXG4gICAgICAgIGlmIChjdXJyZW50UmVtb3ZpbmdOb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZW1vdmVDb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChwYXJ0ICE9PSB1bmRlZmluZWQgJiYgcGFydC5pbmRleCA9PT0gbm9kZUluZGV4KSB7XG4gICAgICAgICAgICAvLyBJZiBwYXJ0IGlzIGluIGEgcmVtb3ZlZCBub2RlIGRlYWN0aXZhdGUgaXQgYnkgc2V0dGluZyBpbmRleCB0byAtMSBvclxuICAgICAgICAgICAgLy8gYWRqdXN0IHRoZSBpbmRleCBhcyBuZWVkZWQuXG4gICAgICAgICAgICBwYXJ0LmluZGV4ID0gY3VycmVudFJlbW92aW5nTm9kZSAhPT0gbnVsbCA/IC0xIDogcGFydC5pbmRleCAtIHJlbW92ZUNvdW50O1xuICAgICAgICAgICAgLy8gZ28gdG8gdGhlIG5leHQgYWN0aXZlIHBhcnQuXG4gICAgICAgICAgICBwYXJ0SW5kZXggPSBuZXh0QWN0aXZlSW5kZXhJblRlbXBsYXRlUGFydHMocGFydHMsIHBhcnRJbmRleCk7XG4gICAgICAgICAgICBwYXJ0ID0gcGFydHNbcGFydEluZGV4XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBub2Rlc1RvUmVtb3ZlSW5UZW1wbGF0ZS5mb3JFYWNoKChuKSA9PiBuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobikpO1xufVxuY29uc3QgY291bnROb2RlcyA9IChub2RlKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gKG5vZGUubm9kZVR5cGUgPT09IDExIC8qIE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSAqLykgPyAwIDogMTtcbiAgICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKG5vZGUsIHdhbGtlck5vZGVGaWx0ZXIsIG51bGwsIGZhbHNlKTtcbiAgICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcbiAgICAgICAgY291bnQrKztcbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xufTtcbmNvbnN0IG5leHRBY3RpdmVJbmRleEluVGVtcGxhdGVQYXJ0cyA9IChwYXJ0cywgc3RhcnRJbmRleCA9IC0xKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXggKyAxOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGFydCA9IHBhcnRzW2ldO1xuICAgICAgICBpZiAoaXNUZW1wbGF0ZVBhcnRBY3RpdmUocGFydCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG4vKipcbiAqIEluc2VydHMgdGhlIGdpdmVuIG5vZGUgaW50byB0aGUgVGVtcGxhdGUsIG9wdGlvbmFsbHkgYmVmb3JlIHRoZSBnaXZlblxuICogcmVmTm9kZS4gSW4gYWRkaXRpb24gdG8gaW5zZXJ0aW5nIHRoZSBub2RlIGludG8gdGhlIFRlbXBsYXRlLCB0aGUgVGVtcGxhdGVcbiAqIHBhcnQgaW5kaWNlcyBhcmUgdXBkYXRlZCB0byBtYXRjaCB0aGUgbXV0YXRlZCBUZW1wbGF0ZSBET00uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnROb2RlSW50b1RlbXBsYXRlKHRlbXBsYXRlLCBub2RlLCByZWZOb2RlID0gbnVsbCkge1xuICAgIGNvbnN0IHsgZWxlbWVudDogeyBjb250ZW50IH0sIHBhcnRzIH0gPSB0ZW1wbGF0ZTtcbiAgICAvLyBJZiB0aGVyZSdzIG5vIHJlZk5vZGUsIHRoZW4gcHV0IG5vZGUgYXQgZW5kIG9mIHRlbXBsYXRlLlxuICAgIC8vIE5vIHBhcnQgaW5kaWNlcyBuZWVkIHRvIGJlIHNoaWZ0ZWQgaW4gdGhpcyBjYXNlLlxuICAgIGlmIChyZWZOb2RlID09PSBudWxsIHx8IHJlZk5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoY29udGVudCwgd2Fsa2VyTm9kZUZpbHRlciwgbnVsbCwgZmFsc2UpO1xuICAgIGxldCBwYXJ0SW5kZXggPSBuZXh0QWN0aXZlSW5kZXhJblRlbXBsYXRlUGFydHMocGFydHMpO1xuICAgIGxldCBpbnNlcnRDb3VudCA9IDA7XG4gICAgbGV0IHdhbGtlckluZGV4ID0gLTE7XG4gICAgd2hpbGUgKHdhbGtlci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgIHdhbGtlckluZGV4Kys7XG4gICAgICAgIGNvbnN0IHdhbGtlck5vZGUgPSB3YWxrZXIuY3VycmVudE5vZGU7XG4gICAgICAgIGlmICh3YWxrZXJOb2RlID09PSByZWZOb2RlKSB7XG4gICAgICAgICAgICBpbnNlcnRDb3VudCA9IGNvdW50Tm9kZXMobm9kZSk7XG4gICAgICAgICAgICByZWZOb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIHJlZk5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChwYXJ0SW5kZXggIT09IC0xICYmIHBhcnRzW3BhcnRJbmRleF0uaW5kZXggPT09IHdhbGtlckluZGV4KSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSd2ZSBpbnNlcnRlZCB0aGUgbm9kZSwgc2ltcGx5IGFkanVzdCBhbGwgc3Vic2VxdWVudCBwYXJ0c1xuICAgICAgICAgICAgaWYgKGluc2VydENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChwYXJ0SW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRzW3BhcnRJbmRleF0uaW5kZXggKz0gaW5zZXJ0Q291bnQ7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRJbmRleCA9IG5leHRBY3RpdmVJbmRleEluVGVtcGxhdGVQYXJ0cyhwYXJ0cywgcGFydEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFydEluZGV4ID0gbmV4dEFjdGl2ZUluZGV4SW5UZW1wbGF0ZVBhcnRzKHBhcnRzLCBwYXJ0SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kaWZ5LXRlbXBsYXRlLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxOCBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbi8qKlxuICogQSBzZW50aW5lbCB2YWx1ZSB0aGF0IHNpZ25hbHMgdGhhdCBhIHZhbHVlIHdhcyBoYW5kbGVkIGJ5IGEgZGlyZWN0aXZlIGFuZFxuICogc2hvdWxkIG5vdCBiZSB3cml0dGVuIHRvIHRoZSBET00uXG4gKi9cbmV4cG9ydCBjb25zdCBub0NoYW5nZSA9IHt9O1xuLyoqXG4gKiBBIHNlbnRpbmVsIHZhbHVlIHRoYXQgc2lnbmFscyBhIE5vZGVQYXJ0IHRvIGZ1bGx5IGNsZWFyIGl0cyBjb250ZW50LlxuICovXG5leHBvcnQgY29uc3Qgbm90aGluZyA9IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFydC5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5pbXBvcnQgeyBpc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlLmpzJztcbmltcG9ydCB7IHJlbW92ZU5vZGVzIH0gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0IHsgbm9DaGFuZ2UsIG5vdGhpbmcgfSBmcm9tICcuL3BhcnQuanMnO1xuaW1wb3J0IHsgVGVtcGxhdGVJbnN0YW5jZSB9IGZyb20gJy4vdGVtcGxhdGUtaW5zdGFuY2UuanMnO1xuaW1wb3J0IHsgVGVtcGxhdGVSZXN1bHQgfSBmcm9tICcuL3RlbXBsYXRlLXJlc3VsdC5qcyc7XG5pbXBvcnQgeyBjcmVhdGVNYXJrZXIgfSBmcm9tICcuL3RlbXBsYXRlLmpzJztcbmV4cG9ydCBjb25zdCBpc1ByaW1pdGl2ZSA9ICh2YWx1ZSkgPT4ge1xuICAgIHJldHVybiAodmFsdWUgPT09IG51bGwgfHxcbiAgICAgICAgISh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykpO1xufTtcbmV4cG9ydCBjb25zdCBpc0l0ZXJhYmxlID0gKHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpIHx8XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICEhKHZhbHVlICYmIHZhbHVlW1N5bWJvbC5pdGVyYXRvcl0pO1xufTtcbi8qKlxuICogV3JpdGVzIGF0dHJpYnV0ZSB2YWx1ZXMgdG8gdGhlIERPTSBmb3IgYSBncm91cCBvZiBBdHRyaWJ1dGVQYXJ0cyBib3VuZCB0byBhXG4gKiBzaW5nbGUgYXR0cmlidXRlLiBUaGUgdmFsdWUgaXMgb25seSBzZXQgb25jZSBldmVuIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBwYXJ0c1xuICogZm9yIGFuIGF0dHJpYnV0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEF0dHJpYnV0ZUNvbW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgbmFtZSwgc3RyaW5ncykge1xuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdHJpbmdzID0gc3RyaW5ncztcbiAgICAgICAgdGhpcy5wYXJ0cyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnRzW2ldID0gdGhpcy5fY3JlYXRlUGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBzaW5nbGUgcGFydC4gT3ZlcnJpZGUgdGhpcyB0byBjcmVhdGUgYSBkaWZmZXJudCB0eXBlIG9mIHBhcnQuXG4gICAgICovXG4gICAgX2NyZWF0ZVBhcnQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXR0cmlidXRlUGFydCh0aGlzKTtcbiAgICB9XG4gICAgX2dldFZhbHVlKCkge1xuICAgICAgICBjb25zdCBzdHJpbmdzID0gdGhpcy5zdHJpbmdzO1xuICAgICAgICBjb25zdCBsID0gc3RyaW5ncy5sZW5ndGggLSAxO1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHRoaXMucGFydHM7XG4gICAgICAgIC8vIElmIHdlJ3JlIGFzc2lnbmluZyBhbiBhdHRyaWJ1dGUgdmlhIHN5bnRheCBsaWtlOlxuICAgICAgICAvLyAgICBhdHRyPVwiJHtmb299XCIgIG9yICBhdHRyPSR7Zm9vfVxuICAgICAgICAvLyBidXQgbm90XG4gICAgICAgIC8vICAgIGF0dHI9XCIke2Zvb30gJHtiYXJ9XCIgb3IgYXR0cj1cIiR7Zm9vfSBiYXpcIlxuICAgICAgICAvLyB0aGVuIHdlIGRvbid0IHdhbnQgdG8gY29lcmNlIHRoZSBhdHRyaWJ1dGUgdmFsdWUgaW50byBvbmUgbG9uZ1xuICAgICAgICAvLyBzdHJpbmcuIEluc3RlYWQgd2Ugd2FudCB0byBqdXN0IHJldHVybiB0aGUgdmFsdWUgaXRzZWxmIGRpcmVjdGx5LFxuICAgICAgICAvLyBzbyB0aGF0IHNhbml0aXplRE9NVmFsdWUgY2FuIGdldCB0aGUgYWN0dWFsIHZhbHVlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vIFN0cmluZyh2YWx1ZSlcbiAgICAgICAgLy8gVGhlIGV4Y2VwdGlvbiBpcyBpZiB2IGlzIGFuIGFycmF5LCBpbiB3aGljaCBjYXNlIHdlIGRvIHdhbnQgdG8gc21hc2hcbiAgICAgICAgLy8gaXQgdG9nZXRoZXIgaW50byBhIHN0cmluZyB3aXRob3V0IGNhbGxpbmcgU3RyaW5nKCkgb24gdGhlIGFycmF5LlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGlzIGFsc28gYWxsb3dzIHRydXN0ZWQgdmFsdWVzICh3aGVuIHVzaW5nIFRydXN0ZWRUeXBlcykgYmVpbmdcbiAgICAgICAgLy8gYXNzaWduZWQgdG8gRE9NIHNpbmtzIHdpdGhvdXQgYmVpbmcgc3RyaW5naWZpZWQgaW4gdGhlIHByb2Nlc3MuXG4gICAgICAgIGlmIChsID09PSAxICYmIHN0cmluZ3NbMF0gPT09ICcnICYmIHN0cmluZ3NbMV0gPT09ICcnKSB7XG4gICAgICAgICAgICBjb25zdCB2ID0gcGFydHNbMF0udmFsdWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHYgPT09ICdzeW1ib2wnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgfHwgIWlzSXRlcmFibGUodikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgdGV4dCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdGV4dCArPSBzdHJpbmdzW2ldO1xuICAgICAgICAgICAgY29uc3QgcGFydCA9IHBhcnRzW2ldO1xuICAgICAgICAgICAgaWYgKHBhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBwYXJ0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChpc1ByaW1pdGl2ZSh2KSB8fCAhaXNJdGVyYWJsZSh2KSkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IHR5cGVvZiB2ID09PSAnc3RyaW5nJyA/IHYgOiBTdHJpbmcodik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHQgb2Ygdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArPSB0eXBlb2YgdCA9PT0gJ3N0cmluZycgPyB0IDogU3RyaW5nKHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRleHQgKz0gc3RyaW5nc1tsXTtcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuICAgIGNvbW1pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLCB0aGlzLl9nZXRWYWx1ZSgpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQSBQYXJ0IHRoYXQgY29udHJvbHMgYWxsIG9yIHBhcnQgb2YgYW4gYXR0cmlidXRlIHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlUGFydCB7XG4gICAgY29uc3RydWN0b3IoY29tbWl0dGVyKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY29tbWl0dGVyID0gY29tbWl0dGVyO1xuICAgIH1cbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG5vQ2hhbmdlICYmICghaXNQcmltaXRpdmUodmFsdWUpIHx8IHZhbHVlICE9PSB0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGlzIGEgbm90IGEgZGlyZWN0aXZlLCBkaXJ0eSB0aGUgY29tbWl0dGVyIHNvIHRoYXQgaXQnbGxcbiAgICAgICAgICAgIC8vIGNhbGwgc2V0QXR0cmlidXRlLiBJZiB0aGUgdmFsdWUgaXMgYSBkaXJlY3RpdmUsIGl0J2xsIGRpcnR5IHRoZVxuICAgICAgICAgICAgLy8gY29tbWl0dGVyIGlmIGl0IGNhbGxzIHNldFZhbHVlKCkuXG4gICAgICAgICAgICBpZiAoIWlzRGlyZWN0aXZlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWl0dGVyLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21taXQoKSB7XG4gICAgICAgIHdoaWxlIChpc0RpcmVjdGl2ZSh0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0aXZlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBub0NoYW5nZTtcbiAgICAgICAgICAgIGRpcmVjdGl2ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbW1pdHRlci5jb21taXQoKTtcbiAgICB9XG59XG4vKipcbiAqIEEgUGFydCB0aGF0IGNvbnRyb2xzIGEgbG9jYXRpb24gd2l0aGluIGEgTm9kZSB0cmVlLiBMaWtlIGEgUmFuZ2UsIE5vZGVQYXJ0XG4gKiBoYXMgc3RhcnQgYW5kIGVuZCBsb2NhdGlvbnMgYW5kIGNhbiBzZXQgYW5kIHVwZGF0ZSB0aGUgTm9kZXMgYmV0d2VlbiB0aG9zZVxuICogbG9jYXRpb25zLlxuICpcbiAqIE5vZGVQYXJ0cyBzdXBwb3J0IHNldmVyYWwgdmFsdWUgdHlwZXM6IHByaW1pdGl2ZXMsIE5vZGVzLCBUZW1wbGF0ZVJlc3VsdHMsXG4gKiBhcyB3ZWxsIGFzIGFycmF5cyBhbmQgaXRlcmFibGVzIG9mIHRob3NlIHR5cGVzLlxuICovXG5leHBvcnQgY2xhc3MgTm9kZVBhcnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fX3BlbmRpbmdWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwZW5kcyB0aGlzIHBhcnQgaW50byBhIGNvbnRhaW5lci5cbiAgICAgKlxuICAgICAqIFRoaXMgcGFydCBtdXN0IGJlIGVtcHR5LCBhcyBpdHMgY29udGVudHMgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IG1vdmVkLlxuICAgICAqL1xuICAgIGFwcGVuZEludG8oY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuc3RhcnROb2RlID0gY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZU1hcmtlcigpKTtcbiAgICAgICAgdGhpcy5lbmROb2RlID0gY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZU1hcmtlcigpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGlzIHBhcnQgYWZ0ZXIgdGhlIGByZWZgIG5vZGUgKGJldHdlZW4gYHJlZmAgYW5kIGByZWZgJ3MgbmV4dFxuICAgICAqIHNpYmxpbmcpLiBCb3RoIGByZWZgIGFuZCBpdHMgbmV4dCBzaWJsaW5nIG11c3QgYmUgc3RhdGljLCB1bmNoYW5naW5nIG5vZGVzXG4gICAgICogc3VjaCBhcyB0aG9zZSB0aGF0IGFwcGVhciBpbiBhIGxpdGVyYWwgc2VjdGlvbiBvZiBhIHRlbXBsYXRlLlxuICAgICAqXG4gICAgICogVGhpcyBwYXJ0IG11c3QgYmUgZW1wdHksIGFzIGl0cyBjb250ZW50cyBhcmUgbm90IGF1dG9tYXRpY2FsbHkgbW92ZWQuXG4gICAgICovXG4gICAgaW5zZXJ0QWZ0ZXJOb2RlKHJlZikge1xuICAgICAgICB0aGlzLnN0YXJ0Tm9kZSA9IHJlZjtcbiAgICAgICAgdGhpcy5lbmROb2RlID0gcmVmLm5leHRTaWJsaW5nO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBlbmRzIHRoaXMgcGFydCBpbnRvIGEgcGFyZW50IHBhcnQuXG4gICAgICpcbiAgICAgKiBUaGlzIHBhcnQgbXVzdCBiZSBlbXB0eSwgYXMgaXRzIGNvbnRlbnRzIGFyZSBub3QgYXV0b21hdGljYWxseSBtb3ZlZC5cbiAgICAgKi9cbiAgICBhcHBlbmRJbnRvUGFydChwYXJ0KSB7XG4gICAgICAgIHBhcnQuX19pbnNlcnQodGhpcy5zdGFydE5vZGUgPSBjcmVhdGVNYXJrZXIoKSk7XG4gICAgICAgIHBhcnQuX19pbnNlcnQodGhpcy5lbmROb2RlID0gY3JlYXRlTWFya2VyKCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoaXMgcGFydCBhZnRlciB0aGUgYHJlZmAgcGFydC5cbiAgICAgKlxuICAgICAqIFRoaXMgcGFydCBtdXN0IGJlIGVtcHR5LCBhcyBpdHMgY29udGVudHMgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IG1vdmVkLlxuICAgICAqL1xuICAgIGluc2VydEFmdGVyUGFydChyZWYpIHtcbiAgICAgICAgcmVmLl9faW5zZXJ0KHRoaXMuc3RhcnROb2RlID0gY3JlYXRlTWFya2VyKCkpO1xuICAgICAgICB0aGlzLmVuZE5vZGUgPSByZWYuZW5kTm9kZTtcbiAgICAgICAgcmVmLmVuZE5vZGUgPSB0aGlzLnN0YXJ0Tm9kZTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fX3BlbmRpbmdWYWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBjb21taXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0Tm9kZS5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGlzRGlyZWN0aXZlKHRoaXMuX19wZW5kaW5nVmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RpdmUgPSB0aGlzLl9fcGVuZGluZ1ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fX3BlbmRpbmdWYWx1ZSA9IG5vQ2hhbmdlO1xuICAgICAgICAgICAgZGlyZWN0aXZlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fX3BlbmRpbmdWYWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBub0NoYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1ByaW1pdGl2ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX19jb21taXRUZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLl9fY29tbWl0VGVtcGxhdGVSZXN1bHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICAgICAgdGhpcy5fX2NvbW1pdE5vZGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzSXRlcmFibGUodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9fY29tbWl0SXRlcmFibGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBub3RoaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbm90aGluZztcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrLCB3aWxsIHJlbmRlciB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gICAgICAgICAgICB0aGlzLl9fY29tbWl0VGV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX19pbnNlcnQobm9kZSkge1xuICAgICAgICB0aGlzLmVuZE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgdGhpcy5lbmROb2RlKTtcbiAgICB9XG4gICAgX19jb21taXROb2RlKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fX2luc2VydCh2YWx1ZSk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgX19jb21taXRUZXh0KHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLnN0YXJ0Tm9kZS5uZXh0U2libGluZztcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcbiAgICAgICAgLy8gSWYgYHZhbHVlYCBpc24ndCBhbHJlYWR5IGEgc3RyaW5nLCB3ZSBleHBsaWNpdGx5IGNvbnZlcnQgaXQgaGVyZSBpbiBjYXNlXG4gICAgICAgIC8vIGl0IGNhbid0IGJlIGltcGxpY2l0bHkgY29udmVydGVkIC0gaS5lLiBpdCdzIGEgc3ltYm9sLlxuICAgICAgICBjb25zdCB2YWx1ZUFzU3RyaW5nID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlIDogU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgaWYgKG5vZGUgPT09IHRoaXMuZW5kTm9kZS5wcmV2aW91c1NpYmxpbmcgJiZcbiAgICAgICAgICAgIG5vZGUubm9kZVR5cGUgPT09IDMgLyogTm9kZS5URVhUX05PREUgKi8pIHtcbiAgICAgICAgICAgIC8vIElmIHdlIG9ubHkgaGF2ZSBhIHNpbmdsZSB0ZXh0IG5vZGUgYmV0d2VlbiB0aGUgbWFya2Vycywgd2UgY2FuIGp1c3RcbiAgICAgICAgICAgIC8vIHNldCBpdHMgdmFsdWUsIHJhdGhlciB0aGFuIHJlcGxhY2luZyBpdC5cbiAgICAgICAgICAgIC8vIFRPRE8oanVzdGluZmFnbmFuaSk6IENhbiB3ZSBqdXN0IGNoZWNrIGlmIHRoaXMudmFsdWUgaXMgcHJpbWl0aXZlP1xuICAgICAgICAgICAgbm9kZS5kYXRhID0gdmFsdWVBc1N0cmluZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX19jb21taXROb2RlKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlQXNTdHJpbmcpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIF9fY29tbWl0VGVtcGxhdGVSZXN1bHQodmFsdWUpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMudGVtcGxhdGVGYWN0b3J5KHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZUluc3RhbmNlICYmXG4gICAgICAgICAgICB0aGlzLnZhbHVlLnRlbXBsYXRlID09PSB0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZS51cGRhdGUodmFsdWUudmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBwcm9wYWdhdGUgdGhlIHRlbXBsYXRlIHByb2Nlc3NvciBmcm9tIHRoZSBUZW1wbGF0ZVJlc3VsdFxuICAgICAgICAgICAgLy8gc28gdGhhdCB3ZSB1c2UgaXRzIHN5bnRheCBleHRlbnNpb24sIGV0Yy4gVGhlIHRlbXBsYXRlIGZhY3RvcnkgY29tZXNcbiAgICAgICAgICAgIC8vIGZyb20gdGhlIHJlbmRlciBmdW5jdGlvbiBvcHRpb25zIHNvIHRoYXQgaXQgY2FuIGNvbnRyb2wgdGVtcGxhdGVcbiAgICAgICAgICAgIC8vIGNhY2hpbmcgYW5kIHByZXByb2Nlc3NpbmcuXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBUZW1wbGF0ZUluc3RhbmNlKHRlbXBsYXRlLCB2YWx1ZS5wcm9jZXNzb3IsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudCA9IGluc3RhbmNlLl9jbG9uZSgpO1xuICAgICAgICAgICAgaW5zdGFuY2UudXBkYXRlKHZhbHVlLnZhbHVlcyk7XG4gICAgICAgICAgICB0aGlzLl9fY29tbWl0Tm9kZShmcmFnbWVudCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX19jb21taXRJdGVyYWJsZSh2YWx1ZSkge1xuICAgICAgICAvLyBGb3IgYW4gSXRlcmFibGUsIHdlIGNyZWF0ZSBhIG5ldyBJbnN0YW5jZVBhcnQgcGVyIGl0ZW0sIHRoZW4gc2V0IGl0c1xuICAgICAgICAvLyB2YWx1ZSB0byB0aGUgaXRlbS4gVGhpcyBpcyBhIGxpdHRsZSBiaXQgb2Ygb3ZlcmhlYWQgZm9yIGV2ZXJ5IGl0ZW0gaW5cbiAgICAgICAgLy8gYW4gSXRlcmFibGUsIGJ1dCBpdCBsZXRzIHVzIHJlY3Vyc2UgZWFzaWx5IGFuZCBlZmZpY2llbnRseSB1cGRhdGUgQXJyYXlzXG4gICAgICAgIC8vIG9mIFRlbXBsYXRlUmVzdWx0cyB0aGF0IHdpbGwgYmUgY29tbW9ubHkgcmV0dXJuZWQgZnJvbSBleHByZXNzaW9ucyBsaWtlOlxuICAgICAgICAvLyBhcnJheS5tYXAoKGkpID0+IGh0bWxgJHtpfWApLCBieSByZXVzaW5nIGV4aXN0aW5nIFRlbXBsYXRlSW5zdGFuY2VzLlxuICAgICAgICAvLyBJZiBfdmFsdWUgaXMgYW4gYXJyYXksIHRoZW4gdGhlIHByZXZpb3VzIHJlbmRlciB3YXMgb2YgYW5cbiAgICAgICAgLy8gaXRlcmFibGUgYW5kIF92YWx1ZSB3aWxsIGNvbnRhaW4gdGhlIE5vZGVQYXJ0cyBmcm9tIHRoZSBwcmV2aW91c1xuICAgICAgICAvLyByZW5kZXIuIElmIF92YWx1ZSBpcyBub3QgYW4gYXJyYXksIGNsZWFyIHRoaXMgcGFydCBhbmQgbWFrZSBhIG5ld1xuICAgICAgICAvLyBhcnJheSBmb3IgTm9kZVBhcnRzLlxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBMZXRzIHVzIGtlZXAgdHJhY2sgb2YgaG93IG1hbnkgaXRlbXMgd2Ugc3RhbXBlZCBzbyB3ZSBjYW4gY2xlYXIgbGVmdG92ZXJcbiAgICAgICAgLy8gaXRlbXMgZnJvbSBhIHByZXZpb3VzIHJlbmRlclxuICAgICAgICBjb25zdCBpdGVtUGFydHMgPSB0aGlzLnZhbHVlO1xuICAgICAgICBsZXQgcGFydEluZGV4ID0gMDtcbiAgICAgICAgbGV0IGl0ZW1QYXJ0O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFRyeSB0byByZXVzZSBhbiBleGlzdGluZyBwYXJ0XG4gICAgICAgICAgICBpdGVtUGFydCA9IGl0ZW1QYXJ0c1twYXJ0SW5kZXhdO1xuICAgICAgICAgICAgLy8gSWYgbm8gZXhpc3RpbmcgcGFydCwgY3JlYXRlIGEgbmV3IG9uZVxuICAgICAgICAgICAgaWYgKGl0ZW1QYXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpdGVtUGFydCA9IG5ldyBOb2RlUGFydCh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGl0ZW1QYXJ0cy5wdXNoKGl0ZW1QYXJ0KTtcbiAgICAgICAgICAgICAgICBpZiAocGFydEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1QYXJ0LmFwcGVuZEludG9QYXJ0KHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVBhcnQuaW5zZXJ0QWZ0ZXJQYXJ0KGl0ZW1QYXJ0c1twYXJ0SW5kZXggLSAxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbVBhcnQuc2V0VmFsdWUoaXRlbSk7XG4gICAgICAgICAgICBpdGVtUGFydC5jb21taXQoKTtcbiAgICAgICAgICAgIHBhcnRJbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJ0SW5kZXggPCBpdGVtUGFydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBUcnVuY2F0ZSB0aGUgcGFydHMgYXJyYXkgc28gX3ZhbHVlIHJlZmxlY3RzIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgICAgICAgICBpdGVtUGFydHMubGVuZ3RoID0gcGFydEluZGV4O1xuICAgICAgICAgICAgdGhpcy5jbGVhcihpdGVtUGFydCAmJiBpdGVtUGFydC5lbmROb2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhcihzdGFydE5vZGUgPSB0aGlzLnN0YXJ0Tm9kZSkge1xuICAgICAgICByZW1vdmVOb2Rlcyh0aGlzLnN0YXJ0Tm9kZS5wYXJlbnROb2RlLCBzdGFydE5vZGUubmV4dFNpYmxpbmcsIHRoaXMuZW5kTm9kZSk7XG4gICAgfVxufVxuLyoqXG4gKiBJbXBsZW1lbnRzIGEgYm9vbGVhbiBhdHRyaWJ1dGUsIHJvdWdobHkgYXMgZGVmaW5lZCBpbiB0aGUgSFRNTFxuICogc3BlY2lmaWNhdGlvbi5cbiAqXG4gKiBJZiB0aGUgdmFsdWUgaXMgdHJ1dGh5LCB0aGVuIHRoZSBhdHRyaWJ1dGUgaXMgcHJlc2VudCB3aXRoIGEgdmFsdWUgb2ZcbiAqICcnLiBJZiB0aGUgdmFsdWUgaXMgZmFsc2V5LCB0aGUgYXR0cmlidXRlIGlzIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBCb29sZWFuQXR0cmlidXRlUGFydCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgbmFtZSwgc3RyaW5ncykge1xuICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9fcGVuZGluZ1ZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoc3RyaW5ncy5sZW5ndGggIT09IDIgfHwgc3RyaW5nc1swXSAhPT0gJycgfHwgc3RyaW5nc1sxXSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQm9vbGVhbiBhdHRyaWJ1dGVzIGNhbiBvbmx5IGNvbnRhaW4gYSBzaW5nbGUgZXhwcmVzc2lvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc3RyaW5ncyA9IHN0cmluZ3M7XG4gICAgfVxuICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX19wZW5kaW5nVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgY29tbWl0KCkge1xuICAgICAgICB3aGlsZSAoaXNEaXJlY3RpdmUodGhpcy5fX3BlbmRpbmdWYWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHRoaXMuX19wZW5kaW5nVmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9fcGVuZGluZ1ZhbHVlID0gbm9DaGFuZ2U7XG4gICAgICAgICAgICBkaXJlY3RpdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX19wZW5kaW5nVmFsdWUgPT09IG5vQ2hhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSAhIXRoaXMuX19wZW5kaW5nVmFsdWU7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLm5hbWUsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUodGhpcy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fcGVuZGluZ1ZhbHVlID0gbm9DaGFuZ2U7XG4gICAgfVxufVxuLyoqXG4gKiBTZXRzIGF0dHJpYnV0ZSB2YWx1ZXMgZm9yIFByb3BlcnR5UGFydHMsIHNvIHRoYXQgdGhlIHZhbHVlIGlzIG9ubHkgc2V0IG9uY2VcbiAqIGV2ZW4gaWYgdGhlcmUgYXJlIG11bHRpcGxlIHBhcnRzIGZvciBhIHByb3BlcnR5LlxuICpcbiAqIElmIGFuIGV4cHJlc3Npb24gY29udHJvbHMgdGhlIHdob2xlIHByb3BlcnR5IHZhbHVlLCB0aGVuIHRoZSB2YWx1ZSBpcyBzaW1wbHlcbiAqIGFzc2lnbmVkIHRvIHRoZSBwcm9wZXJ0eSB1bmRlciBjb250cm9sLiBJZiB0aGVyZSBhcmUgc3RyaW5nIGxpdGVyYWxzIG9yXG4gKiBtdWx0aXBsZSBleHByZXNzaW9ucywgdGhlbiB0aGUgc3RyaW5ncyBhcmUgZXhwcmVzc2lvbnMgYXJlIGludGVycG9sYXRlZCBpbnRvXG4gKiBhIHN0cmluZyBmaXJzdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5Q29tbWl0dGVyIGV4dGVuZHMgQXR0cmlidXRlQ29tbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBuYW1lLCBzdHJpbmdzKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnQsIG5hbWUsIHN0cmluZ3MpO1xuICAgICAgICB0aGlzLnNpbmdsZSA9XG4gICAgICAgICAgICAoc3RyaW5ncy5sZW5ndGggPT09IDIgJiYgc3RyaW5nc1swXSA9PT0gJycgJiYgc3RyaW5nc1sxXSA9PT0gJycpO1xuICAgIH1cbiAgICBfY3JlYXRlUGFydCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVBhcnQodGhpcyk7XG4gICAgfVxuICAgIF9nZXRWYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJ0c1swXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIuX2dldFZhbHVlKCk7XG4gICAgfVxuICAgIGNvbW1pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRbdGhpcy5uYW1lXSA9IHRoaXMuX2dldFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgY2xhc3MgUHJvcGVydHlQYXJ0IGV4dGVuZHMgQXR0cmlidXRlUGFydCB7XG59XG4vLyBEZXRlY3QgZXZlbnQgbGlzdGVuZXIgb3B0aW9ucyBzdXBwb3J0LiBJZiB0aGUgYGNhcHR1cmVgIHByb3BlcnR5IGlzIHJlYWRcbi8vIGZyb20gdGhlIG9wdGlvbnMgb2JqZWN0LCB0aGVuIG9wdGlvbnMgYXJlIHN1cHBvcnRlZC4gSWYgbm90LCB0aGVuIHRoZSB0aGlyZFxuLy8gYXJndW1lbnQgdG8gYWRkL3JlbW92ZUV2ZW50TGlzdGVuZXIgaXMgaW50ZXJwcmV0ZWQgYXMgdGhlIGJvb2xlYW4gY2FwdHVyZVxuLy8gdmFsdWUgc28gd2Ugc2hvdWxkIG9ubHkgcGFzcyB0aGUgYGNhcHR1cmVgIHByb3BlcnR5LlxubGV0IGV2ZW50T3B0aW9uc1N1cHBvcnRlZCA9IGZhbHNlO1xuLy8gV3JhcCBpbnRvIGFuIElJRkUgYmVjYXVzZSBNUyBFZGdlIDw9IHY0MSBkb2VzIG5vdCBzdXBwb3J0IGhhdmluZyB0cnkvY2F0Y2hcbi8vIGJsb2NrcyByaWdodCBpbnRvIHRoZSBib2R5IG9mIGEgbW9kdWxlXG4oKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBnZXQgY2FwdHVyZSgpIHtcbiAgICAgICAgICAgICAgICBldmVudE9wdGlvbnNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICB9XG4gICAgY2F0Y2ggKF9lKSB7XG4gICAgICAgIC8vIGV2ZW50IG9wdGlvbnMgbm90IHN1cHBvcnRlZFxuICAgIH1cbn0pKCk7XG5leHBvcnQgY2xhc3MgRXZlbnRQYXJ0IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBldmVudE5hbWUsIGV2ZW50Q29udGV4dCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9fcGVuZGluZ1ZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgdGhpcy5ldmVudENvbnRleHQgPSBldmVudENvbnRleHQ7XG4gICAgICAgIHRoaXMuX19ib3VuZEhhbmRsZUV2ZW50ID0gKGUpID0+IHRoaXMuaGFuZGxlRXZlbnQoZSk7XG4gICAgfVxuICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX19wZW5kaW5nVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgY29tbWl0KCkge1xuICAgICAgICB3aGlsZSAoaXNEaXJlY3RpdmUodGhpcy5fX3BlbmRpbmdWYWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHRoaXMuX19wZW5kaW5nVmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9fcGVuZGluZ1ZhbHVlID0gbm9DaGFuZ2U7XG4gICAgICAgICAgICBkaXJlY3RpdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX19wZW5kaW5nVmFsdWUgPT09IG5vQ2hhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3TGlzdGVuZXIgPSB0aGlzLl9fcGVuZGluZ1ZhbHVlO1xuICAgICAgICBjb25zdCBvbGRMaXN0ZW5lciA9IHRoaXMudmFsdWU7XG4gICAgICAgIGNvbnN0IHNob3VsZFJlbW92ZUxpc3RlbmVyID0gbmV3TGlzdGVuZXIgPT0gbnVsbCB8fFxuICAgICAgICAgICAgb2xkTGlzdGVuZXIgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIChuZXdMaXN0ZW5lci5jYXB0dXJlICE9PSBvbGRMaXN0ZW5lci5jYXB0dXJlIHx8XG4gICAgICAgICAgICAgICAgICAgIG5ld0xpc3RlbmVyLm9uY2UgIT09IG9sZExpc3RlbmVyLm9uY2UgfHxcbiAgICAgICAgICAgICAgICAgICAgbmV3TGlzdGVuZXIucGFzc2l2ZSAhPT0gb2xkTGlzdGVuZXIucGFzc2l2ZSk7XG4gICAgICAgIGNvbnN0IHNob3VsZEFkZExpc3RlbmVyID0gbmV3TGlzdGVuZXIgIT0gbnVsbCAmJiAob2xkTGlzdGVuZXIgPT0gbnVsbCB8fCBzaG91bGRSZW1vdmVMaXN0ZW5lcik7XG4gICAgICAgIGlmIChzaG91bGRSZW1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsIHRoaXMuX19ib3VuZEhhbmRsZUV2ZW50LCB0aGlzLl9fb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3VsZEFkZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9fb3B0aW9ucyA9IGdldE9wdGlvbnMobmV3TGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsIHRoaXMuX19ib3VuZEhhbmRsZUV2ZW50LCB0aGlzLl9fb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld0xpc3RlbmVyO1xuICAgICAgICB0aGlzLl9fcGVuZGluZ1ZhbHVlID0gbm9DaGFuZ2U7XG4gICAgfVxuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5jYWxsKHRoaXMuZXZlbnRDb250ZXh0IHx8IHRoaXMuZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5oYW5kbGVFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyBXZSBjb3B5IG9wdGlvbnMgYmVjYXVzZSBvZiB0aGUgaW5jb25zaXN0ZW50IGJlaGF2aW9yIG9mIGJyb3dzZXJzIHdoZW4gcmVhZGluZ1xuLy8gdGhlIHRoaXJkIGFyZ3VtZW50IG9mIGFkZC9yZW1vdmVFdmVudExpc3RlbmVyLiBJRTExIGRvZXNuJ3Qgc3VwcG9ydCBvcHRpb25zXG4vLyBhdCBhbGwuIENocm9tZSA0MSBvbmx5IHJlYWRzIGBjYXB0dXJlYCBpZiB0aGUgYXJndW1lbnQgaXMgYW4gb2JqZWN0LlxuY29uc3QgZ2V0T3B0aW9ucyA9IChvKSA9PiBvICYmXG4gICAgKGV2ZW50T3B0aW9uc1N1cHBvcnRlZCA/XG4gICAgICAgIHsgY2FwdHVyZTogby5jYXB0dXJlLCBwYXNzaXZlOiBvLnBhc3NpdmUsIG9uY2U6IG8ub25jZSB9IDpcbiAgICAgICAgby5jYXB0dXJlKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhcnRzLmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmltcG9ydCB7IHJlbW92ZU5vZGVzIH0gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0IHsgTm9kZVBhcnQgfSBmcm9tICcuL3BhcnRzLmpzJztcbmltcG9ydCB7IHRlbXBsYXRlRmFjdG9yeSB9IGZyb20gJy4vdGVtcGxhdGUtZmFjdG9yeS5qcyc7XG5leHBvcnQgY29uc3QgcGFydHMgPSBuZXcgV2Vha01hcCgpO1xuLyoqXG4gKiBSZW5kZXJzIGEgdGVtcGxhdGUgcmVzdWx0IG9yIG90aGVyIHZhbHVlIHRvIGEgY29udGFpbmVyLlxuICpcbiAqIFRvIHVwZGF0ZSBhIGNvbnRhaW5lciB3aXRoIG5ldyB2YWx1ZXMsIHJlZXZhbHVhdGUgdGhlIHRlbXBsYXRlIGxpdGVyYWwgYW5kXG4gKiBjYWxsIGByZW5kZXJgIHdpdGggdGhlIG5ldyByZXN1bHQuXG4gKlxuICogQHBhcmFtIHJlc3VsdCBBbnkgdmFsdWUgcmVuZGVyYWJsZSBieSBOb2RlUGFydCAtIHR5cGljYWxseSBhIFRlbXBsYXRlUmVzdWx0XG4gKiAgICAgY3JlYXRlZCBieSBldmFsdWF0aW5nIGEgdGVtcGxhdGUgdGFnIGxpa2UgYGh0bWxgIG9yIGBzdmdgLlxuICogQHBhcmFtIGNvbnRhaW5lciBBIERPTSBwYXJlbnQgdG8gcmVuZGVyIHRvLiBUaGUgZW50aXJlIGNvbnRlbnRzIGFyZSBlaXRoZXJcbiAqICAgICByZXBsYWNlZCwgb3IgZWZmaWNpZW50bHkgdXBkYXRlZCBpZiB0aGUgc2FtZSByZXN1bHQgdHlwZSB3YXMgcHJldmlvdXNcbiAqICAgICByZW5kZXJlZCB0aGVyZS5cbiAqIEBwYXJhbSBvcHRpb25zIFJlbmRlck9wdGlvbnMgZm9yIHRoZSBlbnRpcmUgcmVuZGVyIHRyZWUgcmVuZGVyZWQgdG8gdGhpc1xuICogICAgIGNvbnRhaW5lci4gUmVuZGVyIG9wdGlvbnMgbXVzdCAqbm90KiBjaGFuZ2UgYmV0d2VlbiByZW5kZXJzIHRvIHRoZSBzYW1lXG4gKiAgICAgY29udGFpbmVyLCBhcyB0aG9zZSBjaGFuZ2VzIHdpbGwgbm90IGVmZmVjdCBwcmV2aW91c2x5IHJlbmRlcmVkIERPTS5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlbmRlciA9IChyZXN1bHQsIGNvbnRhaW5lciwgb3B0aW9ucykgPT4ge1xuICAgIGxldCBwYXJ0ID0gcGFydHMuZ2V0KGNvbnRhaW5lcik7XG4gICAgaWYgKHBhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZW1vdmVOb2Rlcyhjb250YWluZXIsIGNvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICAgICAgcGFydHMuc2V0KGNvbnRhaW5lciwgcGFydCA9IG5ldyBOb2RlUGFydChPYmplY3QuYXNzaWduKHsgdGVtcGxhdGVGYWN0b3J5IH0sIG9wdGlvbnMpKSk7XG4gICAgICAgIHBhcnQuYXBwZW5kSW50byhjb250YWluZXIpO1xuICAgIH1cbiAgICBwYXJ0LnNldFZhbHVlKHJlc3VsdCk7XG4gICAgcGFydC5jb21taXQoKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZW5kZXIuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuLyoqXG4gKiBNb2R1bGUgdG8gYWRkIHNoYWR5IERPTS9zaGFkeSBDU1MgcG9seWZpbGwgc3VwcG9ydCB0byBsaXQtaHRtbCB0ZW1wbGF0ZVxuICogcmVuZGVyaW5nLiBTZWUgdGhlIFtbcmVuZGVyXV0gbWV0aG9kIGZvciBkZXRhaWxzLlxuICpcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICovXG4vKipcbiAqIERvIG5vdCByZW1vdmUgdGhpcyBjb21tZW50OyBpdCBrZWVwcyB0eXBlZG9jIGZyb20gbWlzcGxhY2luZyB0aGUgbW9kdWxlXG4gKiBkb2NzLlxuICovXG5pbXBvcnQgeyByZW1vdmVOb2RlcyB9IGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCB7IGluc2VydE5vZGVJbnRvVGVtcGxhdGUsIHJlbW92ZU5vZGVzRnJvbVRlbXBsYXRlIH0gZnJvbSAnLi9tb2RpZnktdGVtcGxhdGUuanMnO1xuaW1wb3J0IHsgcGFydHMsIHJlbmRlciBhcyBsaXRSZW5kZXIgfSBmcm9tICcuL3JlbmRlci5qcyc7XG5pbXBvcnQgeyB0ZW1wbGF0ZUNhY2hlcyB9IGZyb20gJy4vdGVtcGxhdGUtZmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBUZW1wbGF0ZUluc3RhbmNlIH0gZnJvbSAnLi90ZW1wbGF0ZS1pbnN0YW5jZS5qcyc7XG5pbXBvcnQgeyBtYXJrZXIsIFRlbXBsYXRlIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG5leHBvcnQgeyBodG1sLCBzdmcsIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnLi4vbGl0LWh0bWwuanMnO1xuLy8gR2V0IGEga2V5IHRvIGxvb2t1cCBpbiBgdGVtcGxhdGVDYWNoZXNgLlxuY29uc3QgZ2V0VGVtcGxhdGVDYWNoZUtleSA9ICh0eXBlLCBzY29wZU5hbWUpID0+IGAke3R5cGV9LS0ke3Njb3BlTmFtZX1gO1xubGV0IGNvbXBhdGlibGVTaGFkeUNTU1ZlcnNpb24gPSB0cnVlO1xuaWYgKHR5cGVvZiB3aW5kb3cuU2hhZHlDU1MgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29tcGF0aWJsZVNoYWR5Q1NTVmVyc2lvbiA9IGZhbHNlO1xufVxuZWxzZSBpZiAodHlwZW9mIHdpbmRvdy5TaGFkeUNTUy5wcmVwYXJlVGVtcGxhdGVEb20gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29uc29sZS53YXJuKGBJbmNvbXBhdGlibGUgU2hhZHlDU1MgdmVyc2lvbiBkZXRlY3RlZC4gYCArXG4gICAgICAgIGBQbGVhc2UgdXBkYXRlIHRvIGF0IGxlYXN0IEB3ZWJjb21wb25lbnRzL3dlYmNvbXBvbmVudHNqc0AyLjAuMiBhbmQgYCArXG4gICAgICAgIGBAd2ViY29tcG9uZW50cy9zaGFkeWNzc0AxLjMuMS5gKTtcbiAgICBjb21wYXRpYmxlU2hhZHlDU1NWZXJzaW9uID0gZmFsc2U7XG59XG4vKipcbiAqIFRlbXBsYXRlIGZhY3Rvcnkgd2hpY2ggc2NvcGVzIHRlbXBsYXRlIERPTSB1c2luZyBTaGFkeUNTUy5cbiAqIEBwYXJhbSBzY29wZU5hbWUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHNoYWR5VGVtcGxhdGVGYWN0b3J5ID0gKHNjb3BlTmFtZSkgPT4gKHJlc3VsdCkgPT4ge1xuICAgIGNvbnN0IGNhY2hlS2V5ID0gZ2V0VGVtcGxhdGVDYWNoZUtleShyZXN1bHQudHlwZSwgc2NvcGVOYW1lKTtcbiAgICBsZXQgdGVtcGxhdGVDYWNoZSA9IHRlbXBsYXRlQ2FjaGVzLmdldChjYWNoZUtleSk7XG4gICAgaWYgKHRlbXBsYXRlQ2FjaGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0ZW1wbGF0ZUNhY2hlID0ge1xuICAgICAgICAgICAgc3RyaW5nc0FycmF5OiBuZXcgV2Vha01hcCgpLFxuICAgICAgICAgICAga2V5U3RyaW5nOiBuZXcgTWFwKClcbiAgICAgICAgfTtcbiAgICAgICAgdGVtcGxhdGVDYWNoZXMuc2V0KGNhY2hlS2V5LCB0ZW1wbGF0ZUNhY2hlKTtcbiAgICB9XG4gICAgbGV0IHRlbXBsYXRlID0gdGVtcGxhdGVDYWNoZS5zdHJpbmdzQXJyYXkuZ2V0KHJlc3VsdC5zdHJpbmdzKTtcbiAgICBpZiAodGVtcGxhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICAgIGNvbnN0IGtleSA9IHJlc3VsdC5zdHJpbmdzLmpvaW4obWFya2VyKTtcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlQ2FjaGUua2V5U3RyaW5nLmdldChrZXkpO1xuICAgIGlmICh0ZW1wbGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXN1bHQuZ2V0VGVtcGxhdGVFbGVtZW50KCk7XG4gICAgICAgIGlmIChjb21wYXRpYmxlU2hhZHlDU1NWZXJzaW9uKSB7XG4gICAgICAgICAgICB3aW5kb3cuU2hhZHlDU1MucHJlcGFyZVRlbXBsYXRlRG9tKGVsZW1lbnQsIHNjb3BlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcGxhdGUgPSBuZXcgVGVtcGxhdGUocmVzdWx0LCBlbGVtZW50KTtcbiAgICAgICAgdGVtcGxhdGVDYWNoZS5rZXlTdHJpbmcuc2V0KGtleSwgdGVtcGxhdGUpO1xuICAgIH1cbiAgICB0ZW1wbGF0ZUNhY2hlLnN0cmluZ3NBcnJheS5zZXQocmVzdWx0LnN0cmluZ3MsIHRlbXBsYXRlKTtcbiAgICByZXR1cm4gdGVtcGxhdGU7XG59O1xuY29uc3QgVEVNUExBVEVfVFlQRVMgPSBbJ2h0bWwnLCAnc3ZnJ107XG4vKipcbiAqIFJlbW92ZXMgYWxsIHN0eWxlIGVsZW1lbnRzIGZyb20gVGVtcGxhdGVzIGZvciB0aGUgZ2l2ZW4gc2NvcGVOYW1lLlxuICovXG5jb25zdCByZW1vdmVTdHlsZXNGcm9tTGl0VGVtcGxhdGVzID0gKHNjb3BlTmFtZSkgPT4ge1xuICAgIFRFTVBMQVRFX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGVzID0gdGVtcGxhdGVDYWNoZXMuZ2V0KGdldFRlbXBsYXRlQ2FjaGVLZXkodHlwZSwgc2NvcGVOYW1lKSk7XG4gICAgICAgIGlmICh0ZW1wbGF0ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGVtcGxhdGVzLmtleVN0cmluZy5mb3JFYWNoKCh0ZW1wbGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZWxlbWVudDogeyBjb250ZW50IH0gfSA9IHRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIC8vIElFIDExIGRvZXNuJ3Qgc3VwcG9ydCB0aGUgaXRlcmFibGUgcGFyYW0gU2V0IGNvbnN0cnVjdG9yXG4gICAgICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0gbmV3IFNldCgpO1xuICAgICAgICAgICAgICAgIEFycmF5LmZyb20oY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZScpKS5mb3JFYWNoKChzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcy5hZGQocyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlTm9kZXNGcm9tVGVtcGxhdGUodGVtcGxhdGUsIHN0eWxlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmNvbnN0IHNoYWR5UmVuZGVyU2V0ID0gbmV3IFNldCgpO1xuLyoqXG4gKiBGb3IgdGhlIGdpdmVuIHNjb3BlIG5hbWUsIGVuc3VyZXMgdGhhdCBTaGFkeUNTUyBzdHlsZSBzY29waW5nIGlzIHBlcmZvcm1lZC5cbiAqIFRoaXMgaXMgZG9uZSBqdXN0IG9uY2UgcGVyIHNjb3BlIG5hbWUgc28gdGhlIGZyYWdtZW50IGFuZCB0ZW1wbGF0ZSBjYW5ub3RcbiAqIGJlIG1vZGlmaWVkLlxuICogKDEpIGV4dHJhY3RzIHN0eWxlcyBmcm9tIHRoZSByZW5kZXJlZCBmcmFnbWVudCBhbmQgaGFuZHMgdGhlbSB0byBTaGFkeUNTU1xuICogdG8gYmUgc2NvcGVkIGFuZCBhcHBlbmRlZCB0byB0aGUgZG9jdW1lbnRcbiAqICgyKSByZW1vdmVzIHN0eWxlIGVsZW1lbnRzIGZyb20gYWxsIGxpdC1odG1sIFRlbXBsYXRlcyBmb3IgdGhpcyBzY29wZSBuYW1lLlxuICpcbiAqIE5vdGUsIDxzdHlsZT4gZWxlbWVudHMgY2FuIG9ubHkgYmUgcGxhY2VkIGludG8gdGVtcGxhdGVzIGZvciB0aGVcbiAqIGluaXRpYWwgcmVuZGVyaW5nIG9mIHRoZSBzY29wZS4gSWYgPHN0eWxlPiBlbGVtZW50cyBhcmUgaW5jbHVkZWQgaW4gdGVtcGxhdGVzXG4gKiBkeW5hbWljYWxseSByZW5kZXJlZCB0byB0aGUgc2NvcGUgKGFmdGVyIHRoZSBmaXJzdCBzY29wZSByZW5kZXIpLCB0aGV5IHdpbGxcbiAqIG5vdCBiZSBzY29wZWQgYW5kIHRoZSA8c3R5bGU+IHdpbGwgYmUgbGVmdCBpbiB0aGUgdGVtcGxhdGUgYW5kIHJlbmRlcmVkXG4gKiBvdXRwdXQuXG4gKi9cbmNvbnN0IHByZXBhcmVUZW1wbGF0ZVN0eWxlcyA9IChzY29wZU5hbWUsIHJlbmRlcmVkRE9NLCB0ZW1wbGF0ZSkgPT4ge1xuICAgIHNoYWR5UmVuZGVyU2V0LmFkZChzY29wZU5hbWUpO1xuICAgIC8vIElmIGByZW5kZXJlZERPTWAgaXMgc3RhbXBlZCBmcm9tIGEgVGVtcGxhdGUsIHRoZW4gd2UgbmVlZCB0byBlZGl0IHRoYXRcbiAgICAvLyBUZW1wbGF0ZSdzIHVuZGVybHlpbmcgdGVtcGxhdGUgZWxlbWVudC4gT3RoZXJ3aXNlLCB3ZSBjcmVhdGUgb25lIGhlcmVcbiAgICAvLyB0byBnaXZlIHRvIFNoYWR5Q1NTLCB3aGljaCBzdGlsbCByZXF1aXJlcyBvbmUgd2hpbGUgc2NvcGluZy5cbiAgICBjb25zdCB0ZW1wbGF0ZUVsZW1lbnQgPSAhIXRlbXBsYXRlID8gdGVtcGxhdGUuZWxlbWVudCA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgLy8gTW92ZSBzdHlsZXMgb3V0IG9mIHJlbmRlcmVkIERPTSBhbmQgc3RvcmUuXG4gICAgY29uc3Qgc3R5bGVzID0gcmVuZGVyZWRET00ucXVlcnlTZWxlY3RvckFsbCgnc3R5bGUnKTtcbiAgICBjb25zdCB7IGxlbmd0aCB9ID0gc3R5bGVzO1xuICAgIC8vIElmIHRoZXJlIGFyZSBubyBzdHlsZXMsIHNraXAgdW5uZWNlc3Nhcnkgd29ya1xuICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gRW5zdXJlIHByZXBhcmVUZW1wbGF0ZVN0eWxlcyBpcyBjYWxsZWQgdG8gc3VwcG9ydCBhZGRpbmdcbiAgICAgICAgLy8gc3R5bGVzIHZpYSBgcHJlcGFyZUFkb3B0ZWRDc3NUZXh0YCBzaW5jZSB0aGF0IHJlcXVpcmVzIHRoYXRcbiAgICAgICAgLy8gYHByZXBhcmVUZW1wbGF0ZVN0eWxlc2AgaXMgY2FsbGVkLlxuICAgICAgICAvL1xuICAgICAgICAvLyBTaGFkeUNTUyB3aWxsIG9ubHkgdXBkYXRlIHN0eWxlcyBjb250YWluaW5nIEBhcHBseSBpbiB0aGUgdGVtcGxhdGVcbiAgICAgICAgLy8gZ2l2ZW4gdG8gYHByZXBhcmVUZW1wbGF0ZVN0eWxlc2AuIElmIG5vIGxpdCBUZW1wbGF0ZSB3YXMgZ2l2ZW4sXG4gICAgICAgIC8vIFNoYWR5Q1NTIHdpbGwgbm90IGJlIGFibGUgdG8gdXBkYXRlIHVzZXMgb2YgQGFwcGx5IGluIGFueSByZWxldmFudFxuICAgICAgICAvLyB0ZW1wbGF0ZS4gSG93ZXZlciwgdGhpcyBpcyBub3QgYSBwcm9ibGVtIGJlY2F1c2Ugd2Ugb25seSBjcmVhdGUgdGhlXG4gICAgICAgIC8vIHRlbXBsYXRlIGZvciB0aGUgcHVycG9zZSBvZiBzdXBwb3J0aW5nIGBwcmVwYXJlQWRvcHRlZENzc1RleHRgLFxuICAgICAgICAvLyB3aGljaCBkb2Vzbid0IHN1cHBvcnQgQGFwcGx5IGF0IGFsbC5cbiAgICAgICAgd2luZG93LlNoYWR5Q1NTLnByZXBhcmVUZW1wbGF0ZVN0eWxlcyh0ZW1wbGF0ZUVsZW1lbnQsIHNjb3BlTmFtZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29uZGVuc2VkU3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIC8vIENvbGxlY3Qgc3R5bGVzIGludG8gYSBzaW5nbGUgc3R5bGUuIFRoaXMgaGVscHMgdXMgbWFrZSBzdXJlIFNoYWR5Q1NTXG4gICAgLy8gbWFuaXB1bGF0aW9ucyB3aWxsIG5vdCBwcmV2ZW50IHVzIGZyb20gYmVpbmcgYWJsZSB0byBmaXggdXAgdGVtcGxhdGVcbiAgICAvLyBwYXJ0IGluZGljZXMuXG4gICAgLy8gTk9URTogY29sbGVjdGluZyBzdHlsZXMgaXMgaW5lZmZpY2llbnQgZm9yIGJyb3dzZXJzIGJ1dCBTaGFkeUNTU1xuICAgIC8vIGN1cnJlbnRseSBkb2VzIHRoaXMgYW55d2F5LiBXaGVuIGl0IGRvZXMgbm90LCB0aGlzIHNob3VsZCBiZSBjaGFuZ2VkLlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBzdHlsZXNbaV07XG4gICAgICAgIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuICAgICAgICBjb25kZW5zZWRTdHlsZS50ZXh0Q29udGVudCArPSBzdHlsZS50ZXh0Q29udGVudDtcbiAgICB9XG4gICAgLy8gUmVtb3ZlIHN0eWxlcyBmcm9tIG5lc3RlZCB0ZW1wbGF0ZXMgaW4gdGhpcyBzY29wZS5cbiAgICByZW1vdmVTdHlsZXNGcm9tTGl0VGVtcGxhdGVzKHNjb3BlTmFtZSk7XG4gICAgLy8gQW5kIHRoZW4gcHV0IHRoZSBjb25kZW5zZWQgc3R5bGUgaW50byB0aGUgXCJyb290XCIgdGVtcGxhdGUgcGFzc2VkIGluIGFzXG4gICAgLy8gYHRlbXBsYXRlYC5cbiAgICBjb25zdCBjb250ZW50ID0gdGVtcGxhdGVFbGVtZW50LmNvbnRlbnQ7XG4gICAgaWYgKCEhdGVtcGxhdGUpIHtcbiAgICAgICAgaW5zZXJ0Tm9kZUludG9UZW1wbGF0ZSh0ZW1wbGF0ZSwgY29uZGVuc2VkU3R5bGUsIGNvbnRlbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb250ZW50Lmluc2VydEJlZm9yZShjb25kZW5zZWRTdHlsZSwgY29udGVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgLy8gTm90ZSwgaXQncyBpbXBvcnRhbnQgdGhhdCBTaGFkeUNTUyBnZXRzIHRoZSB0ZW1wbGF0ZSB0aGF0IGBsaXQtaHRtbGBcbiAgICAvLyB3aWxsIGFjdHVhbGx5IHJlbmRlciBzbyB0aGF0IGl0IGNhbiB1cGRhdGUgdGhlIHN0eWxlIGluc2lkZSB3aGVuXG4gICAgLy8gbmVlZGVkIChlLmcuIEBhcHBseSBuYXRpdmUgU2hhZG93IERPTSBjYXNlKS5cbiAgICB3aW5kb3cuU2hhZHlDU1MucHJlcGFyZVRlbXBsYXRlU3R5bGVzKHRlbXBsYXRlRWxlbWVudCwgc2NvcGVOYW1lKTtcbiAgICBjb25zdCBzdHlsZSA9IGNvbnRlbnQucXVlcnlTZWxlY3Rvcignc3R5bGUnKTtcbiAgICBpZiAod2luZG93LlNoYWR5Q1NTLm5hdGl2ZVNoYWRvdyAmJiBzdHlsZSAhPT0gbnVsbCkge1xuICAgICAgICAvLyBXaGVuIGluIG5hdGl2ZSBTaGFkb3cgRE9NLCBlbnN1cmUgdGhlIHN0eWxlIGNyZWF0ZWQgYnkgU2hhZHlDU1MgaXNcbiAgICAgICAgLy8gaW5jbHVkZWQgaW4gaW5pdGlhbGx5IHJlbmRlcmVkIG91dHB1dCAoYHJlbmRlcmVkRE9NYCkuXG4gICAgICAgIHJlbmRlcmVkRE9NLmluc2VydEJlZm9yZShzdHlsZS5jbG9uZU5vZGUodHJ1ZSksIHJlbmRlcmVkRE9NLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBlbHNlIGlmICghIXRlbXBsYXRlKSB7XG4gICAgICAgIC8vIFdoZW4gbm8gc3R5bGUgaXMgbGVmdCBpbiB0aGUgdGVtcGxhdGUsIHBhcnRzIHdpbGwgYmUgYnJva2VuIGFzIGFcbiAgICAgICAgLy8gcmVzdWx0LiBUbyBmaXggdGhpcywgd2UgcHV0IGJhY2sgdGhlIHN0eWxlIG5vZGUgU2hhZHlDU1MgcmVtb3ZlZFxuICAgICAgICAvLyBhbmQgdGhlbiB0ZWxsIGxpdCB0byByZW1vdmUgdGhhdCBub2RlIGZyb20gdGhlIHRlbXBsYXRlLlxuICAgICAgICAvLyBUaGVyZSBjYW4gYmUgbm8gc3R5bGUgaW4gdGhlIHRlbXBsYXRlIGluIDIgY2FzZXMgKDEpIHdoZW4gU2hhZHkgRE9NXG4gICAgICAgIC8vIGlzIGluIHVzZSwgU2hhZHlDU1MgcmVtb3ZlcyBhbGwgc3R5bGVzLCAoMikgd2hlbiBuYXRpdmUgU2hhZG93IERPTVxuICAgICAgICAvLyBpcyBpbiB1c2UgU2hhZHlDU1MgcmVtb3ZlcyB0aGUgc3R5bGUgaWYgaXQgY29udGFpbnMgbm8gY29udGVudC5cbiAgICAgICAgLy8gTk9URSwgU2hhZHlDU1MgY3JlYXRlcyBpdHMgb3duIHN0eWxlIHNvIHdlIGNhbiBzYWZlbHkgYWRkL3JlbW92ZVxuICAgICAgICAvLyBgY29uZGVuc2VkU3R5bGVgIGhlcmUuXG4gICAgICAgIGNvbnRlbnQuaW5zZXJ0QmVmb3JlKGNvbmRlbnNlZFN0eWxlLCBjb250ZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICBjb25zdCByZW1vdmVzID0gbmV3IFNldCgpO1xuICAgICAgICByZW1vdmVzLmFkZChjb25kZW5zZWRTdHlsZSk7XG4gICAgICAgIHJlbW92ZU5vZGVzRnJvbVRlbXBsYXRlKHRlbXBsYXRlLCByZW1vdmVzKTtcbiAgICB9XG59O1xuLyoqXG4gKiBFeHRlbnNpb24gdG8gdGhlIHN0YW5kYXJkIGByZW5kZXJgIG1ldGhvZCB3aGljaCBzdXBwb3J0cyByZW5kZXJpbmdcbiAqIHRvIFNoYWRvd1Jvb3RzIHdoZW4gdGhlIFNoYWR5RE9NIChodHRwczovL2dpdGh1Yi5jb20vd2ViY29tcG9uZW50cy9zaGFkeWRvbSlcbiAqIGFuZCBTaGFkeUNTUyAoaHR0cHM6Ly9naXRodWIuY29tL3dlYmNvbXBvbmVudHMvc2hhZHljc3MpIHBvbHlmaWxscyBhcmUgdXNlZFxuICogb3Igd2hlbiB0aGUgd2ViY29tcG9uZW50c2pzXG4gKiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYmNvbXBvbmVudHMvd2ViY29tcG9uZW50c2pzKSBwb2x5ZmlsbCBpcyB1c2VkLlxuICpcbiAqIEFkZHMgYSBgc2NvcGVOYW1lYCBvcHRpb24gd2hpY2ggaXMgdXNlZCB0byBzY29wZSBlbGVtZW50IERPTSBhbmQgc3R5bGVzaGVldHNcbiAqIHdoZW4gbmF0aXZlIFNoYWRvd0RPTSBpcyB1bmF2YWlsYWJsZS4gVGhlIGBzY29wZU5hbWVgIHdpbGwgYmUgYWRkZWQgdG9cbiAqIHRoZSBjbGFzcyBhdHRyaWJ1dGUgb2YgYWxsIHJlbmRlcmVkIERPTS4gSW4gYWRkaXRpb24sIGFueSBzdHlsZSBlbGVtZW50cyB3aWxsXG4gKiBiZSBhdXRvbWF0aWNhbGx5IHJlLXdyaXR0ZW4gd2l0aCB0aGlzIGBzY29wZU5hbWVgIHNlbGVjdG9yIGFuZCBtb3ZlZCBvdXRcbiAqIG9mIHRoZSByZW5kZXJlZCBET00gYW5kIGludG8gdGhlIGRvY3VtZW50IGA8aGVhZD5gLlxuICpcbiAqIEl0IGlzIGNvbW1vbiB0byB1c2UgdGhpcyByZW5kZXIgbWV0aG9kIGluIGNvbmp1bmN0aW9uIHdpdGggYSBjdXN0b20gZWxlbWVudFxuICogd2hpY2ggcmVuZGVycyBhIHNoYWRvd1Jvb3QuIFdoZW4gdGhpcyBpcyBkb25lLCB0eXBpY2FsbHkgdGhlIGVsZW1lbnQnc1xuICogYGxvY2FsTmFtZWAgc2hvdWxkIGJlIHVzZWQgYXMgdGhlIGBzY29wZU5hbWVgLlxuICpcbiAqIEluIGFkZGl0aW9uIHRvIERPTSBzY29waW5nLCBTaGFkeUNTUyBhbHNvIHN1cHBvcnRzIGEgYmFzaWMgc2hpbSBmb3IgY3NzXG4gKiBjdXN0b20gcHJvcGVydGllcyAobmVlZGVkIG9ubHkgb24gb2xkZXIgYnJvd3NlcnMgbGlrZSBJRTExKSBhbmQgYSBzaGltIGZvclxuICogYSBkZXByZWNhdGVkIGZlYXR1cmUgY2FsbGVkIGBAYXBwbHlgIHRoYXQgc3VwcG9ydHMgYXBwbHlpbmcgYSBzZXQgb2YgY3NzXG4gKiBjdXN0b20gcHJvcGVydGllcyB0byBhIGdpdmVuIGxvY2F0aW9uLlxuICpcbiAqIFVzYWdlIGNvbnNpZGVyYXRpb25zOlxuICpcbiAqICogUGFydCB2YWx1ZXMgaW4gYDxzdHlsZT5gIGVsZW1lbnRzIGFyZSBvbmx5IGFwcGxpZWQgdGhlIGZpcnN0IHRpbWUgYSBnaXZlblxuICogYHNjb3BlTmFtZWAgcmVuZGVycy4gU3Vic2VxdWVudCBjaGFuZ2VzIHRvIHBhcnRzIGluIHN0eWxlIGVsZW1lbnRzIHdpbGwgaGF2ZVxuICogbm8gZWZmZWN0LiBCZWNhdXNlIG9mIHRoaXMsIHBhcnRzIGluIHN0eWxlIGVsZW1lbnRzIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yXG4gKiB2YWx1ZXMgdGhhdCB3aWxsIG5ldmVyIGNoYW5nZSwgZm9yIGV4YW1wbGUgcGFydHMgdGhhdCBzZXQgc2NvcGUtd2lkZSB0aGVtZVxuICogdmFsdWVzIG9yIHBhcnRzIHdoaWNoIHJlbmRlciBzaGFyZWQgc3R5bGUgZWxlbWVudHMuXG4gKlxuICogKiBOb3RlLCBkdWUgdG8gYSBsaW1pdGF0aW9uIG9mIHRoZSBTaGFkeURPTSBwb2x5ZmlsbCwgcmVuZGVyaW5nIGluIGFcbiAqIGN1c3RvbSBlbGVtZW50J3MgYGNvbnN0cnVjdG9yYCBpcyBub3Qgc3VwcG9ydGVkLiBJbnN0ZWFkIHJlbmRlcmluZyBzaG91bGRcbiAqIGVpdGhlciBkb25lIGFzeW5jaHJvbm91c2x5LCBmb3IgZXhhbXBsZSBhdCBtaWNyb3Rhc2sgdGltaW5nIChmb3IgZXhhbXBsZVxuICogYFByb21pc2UucmVzb2x2ZSgpYCksIG9yIGJlIGRlZmVycmVkIHVudGlsIHRoZSBmaXJzdCB0aW1lIHRoZSBlbGVtZW50J3NcbiAqIGBjb25uZWN0ZWRDYWxsYmFja2AgcnVucy5cbiAqXG4gKiBVc2FnZSBjb25zaWRlcmF0aW9ucyB3aGVuIHVzaW5nIHNoaW1tZWQgY3VzdG9tIHByb3BlcnRpZXMgb3IgYEBhcHBseWA6XG4gKlxuICogKiBXaGVuZXZlciBhbnkgZHluYW1pYyBjaGFuZ2VzIGFyZSBtYWRlIHdoaWNoIGFmZmVjdFxuICogY3NzIGN1c3RvbSBwcm9wZXJ0aWVzLCBgU2hhZHlDU1Muc3R5bGVFbGVtZW50KGVsZW1lbnQpYCBtdXN0IGJlIGNhbGxlZFxuICogdG8gdXBkYXRlIHRoZSBlbGVtZW50LiBUaGVyZSBhcmUgdHdvIGNhc2VzIHdoZW4gdGhpcyBpcyBuZWVkZWQ6XG4gKiAoMSkgdGhlIGVsZW1lbnQgaXMgY29ubmVjdGVkIHRvIGEgbmV3IHBhcmVudCwgKDIpIGEgY2xhc3MgaXMgYWRkZWQgdG8gdGhlXG4gKiBlbGVtZW50IHRoYXQgY2F1c2VzIGl0IHRvIG1hdGNoIGRpZmZlcmVudCBjdXN0b20gcHJvcGVydGllcy5cbiAqIFRvIGFkZHJlc3MgdGhlIGZpcnN0IGNhc2Ugd2hlbiByZW5kZXJpbmcgYSBjdXN0b20gZWxlbWVudCwgYHN0eWxlRWxlbWVudGBcbiAqIHNob3VsZCBiZSBjYWxsZWQgaW4gdGhlIGVsZW1lbnQncyBgY29ubmVjdGVkQ2FsbGJhY2tgLlxuICpcbiAqICogU2hpbW1lZCBjdXN0b20gcHJvcGVydGllcyBtYXkgb25seSBiZSBkZWZpbmVkIGVpdGhlciBmb3IgYW4gZW50aXJlXG4gKiBzaGFkb3dSb290IChmb3IgZXhhbXBsZSwgaW4gYSBgOmhvc3RgIHJ1bGUpIG9yIHZpYSBhIHJ1bGUgdGhhdCBkaXJlY3RseVxuICogbWF0Y2hlcyBhbiBlbGVtZW50IHdpdGggYSBzaGFkb3dSb290LiBJbiBvdGhlciB3b3JkcywgaW5zdGVhZCBvZiBmbG93aW5nIGZyb21cbiAqIHBhcmVudCB0byBjaGlsZCBhcyBkbyBuYXRpdmUgY3NzIGN1c3RvbSBwcm9wZXJ0aWVzLCBzaGltbWVkIGN1c3RvbSBwcm9wZXJ0aWVzXG4gKiBmbG93IG9ubHkgZnJvbSBzaGFkb3dSb290cyB0byBuZXN0ZWQgc2hhZG93Um9vdHMuXG4gKlxuICogKiBXaGVuIHVzaW5nIGBAYXBwbHlgIG1peGluZyBjc3Mgc2hvcnRoYW5kIHByb3BlcnR5IG5hbWVzIHdpdGhcbiAqIG5vbi1zaG9ydGhhbmQgbmFtZXMgKGZvciBleGFtcGxlIGBib3JkZXJgIGFuZCBgYm9yZGVyLXdpZHRoYCkgaXMgbm90XG4gKiBzdXBwb3J0ZWQuXG4gKi9cbmV4cG9ydCBjb25zdCByZW5kZXIgPSAocmVzdWx0LCBjb250YWluZXIsIG9wdGlvbnMpID0+IHtcbiAgICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnIHx8ICFvcHRpb25zLnNjb3BlTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgc2NvcGVOYW1lYCBvcHRpb24gaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHNjb3BlTmFtZSA9IG9wdGlvbnMuc2NvcGVOYW1lO1xuICAgIGNvbnN0IGhhc1JlbmRlcmVkID0gcGFydHMuaGFzKGNvbnRhaW5lcik7XG4gICAgY29uc3QgbmVlZHNTY29waW5nID0gY29tcGF0aWJsZVNoYWR5Q1NTVmVyc2lvbiAmJlxuICAgICAgICBjb250YWluZXIubm9kZVR5cGUgPT09IDExIC8qIE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSAqLyAmJlxuICAgICAgICAhIWNvbnRhaW5lci5ob3N0O1xuICAgIC8vIEhhbmRsZSBmaXJzdCByZW5kZXIgdG8gYSBzY29wZSBzcGVjaWFsbHkuLi5cbiAgICBjb25zdCBmaXJzdFNjb3BlUmVuZGVyID0gbmVlZHNTY29waW5nICYmICFzaGFkeVJlbmRlclNldC5oYXMoc2NvcGVOYW1lKTtcbiAgICAvLyBPbiBmaXJzdCBzY29wZSByZW5kZXIsIHJlbmRlciBpbnRvIGEgZnJhZ21lbnQ7IHRoaXMgY2Fubm90IGJlIGEgc2luZ2xlXG4gICAgLy8gZnJhZ21lbnQgdGhhdCBpcyByZXVzZWQgc2luY2UgbmVzdGVkIHJlbmRlcnMgY2FuIG9jY3VyIHN5bmNocm9ub3VzbHkuXG4gICAgY29uc3QgcmVuZGVyQ29udGFpbmVyID0gZmlyc3RTY29wZVJlbmRlciA/IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSA6IGNvbnRhaW5lcjtcbiAgICBsaXRSZW5kZXIocmVzdWx0LCByZW5kZXJDb250YWluZXIsIE9iamVjdC5hc3NpZ24oeyB0ZW1wbGF0ZUZhY3Rvcnk6IHNoYWR5VGVtcGxhdGVGYWN0b3J5KHNjb3BlTmFtZSkgfSwgb3B0aW9ucykpO1xuICAgIC8vIFdoZW4gcGVyZm9ybWluZyBmaXJzdCBzY29wZSByZW5kZXIsXG4gICAgLy8gKDEpIFdlJ3ZlIHJlbmRlcmVkIGludG8gYSBmcmFnbWVudCBzbyB0aGF0IHRoZXJlJ3MgYSBjaGFuY2UgdG9cbiAgICAvLyBgcHJlcGFyZVRlbXBsYXRlU3R5bGVzYCBiZWZvcmUgc3ViLWVsZW1lbnRzIGhpdCB0aGUgRE9NXG4gICAgLy8gKHdoaWNoIG1pZ2h0IGNhdXNlIHRoZW0gdG8gcmVuZGVyIGJhc2VkIG9uIGEgY29tbW9uIHBhdHRlcm4gb2ZcbiAgICAvLyByZW5kZXJpbmcgaW4gYSBjdXN0b20gZWxlbWVudCdzIGBjb25uZWN0ZWRDYWxsYmFja2ApO1xuICAgIC8vICgyKSBTY29wZSB0aGUgdGVtcGxhdGUgd2l0aCBTaGFkeUNTUyBvbmUgdGltZSBvbmx5IGZvciB0aGlzIHNjb3BlLlxuICAgIC8vICgzKSBSZW5kZXIgdGhlIGZyYWdtZW50IGludG8gdGhlIGNvbnRhaW5lciBhbmQgbWFrZSBzdXJlIHRoZVxuICAgIC8vIGNvbnRhaW5lciBrbm93cyBpdHMgYHBhcnRgIGlzIHRoZSBvbmUgd2UganVzdCByZW5kZXJlZC4gVGhpcyBlbnN1cmVzXG4gICAgLy8gRE9NIHdpbGwgYmUgcmUtdXNlZCBvbiBzdWJzZXF1ZW50IHJlbmRlcnMuXG4gICAgaWYgKGZpcnN0U2NvcGVSZW5kZXIpIHtcbiAgICAgICAgY29uc3QgcGFydCA9IHBhcnRzLmdldChyZW5kZXJDb250YWluZXIpO1xuICAgICAgICBwYXJ0cy5kZWxldGUocmVuZGVyQ29udGFpbmVyKTtcbiAgICAgICAgLy8gU2hhZHlDU1MgbWlnaHQgaGF2ZSBzdHlsZSBzaGVldHMgKGUuZy4gZnJvbSBgcHJlcGFyZUFkb3B0ZWRDc3NUZXh0YClcbiAgICAgICAgLy8gdGhhdCBzaG91bGQgYXBwbHkgdG8gYHJlbmRlckNvbnRhaW5lcmAgZXZlbiBpZiB0aGUgcmVuZGVyZWQgdmFsdWUgaXNcbiAgICAgICAgLy8gbm90IGEgVGVtcGxhdGVJbnN0YW5jZS4gSG93ZXZlciwgaXQgd2lsbCBvbmx5IGluc2VydCBzY29wZWQgc3R5bGVzXG4gICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50IGlmIGBwcmVwYXJlVGVtcGxhdGVTdHlsZXNgIGhhcyBhbHJlYWR5IGJlZW4gY2FsbGVkXG4gICAgICAgIC8vIGZvciB0aGUgZ2l2ZW4gc2NvcGUgbmFtZS5cbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBwYXJ0LnZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVJbnN0YW5jZSA/XG4gICAgICAgICAgICBwYXJ0LnZhbHVlLnRlbXBsYXRlIDpcbiAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgcHJlcGFyZVRlbXBsYXRlU3R5bGVzKHNjb3BlTmFtZSwgcmVuZGVyQ29udGFpbmVyLCB0ZW1wbGF0ZSk7XG4gICAgICAgIHJlbW92ZU5vZGVzKGNvbnRhaW5lciwgY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyQ29udGFpbmVyKTtcbiAgICAgICAgcGFydHMuc2V0KGNvbnRhaW5lciwgcGFydCk7XG4gICAgfVxuICAgIC8vIEFmdGVyIGVsZW1lbnRzIGhhdmUgaGl0IHRoZSBET00sIHVwZGF0ZSBzdHlsaW5nIGlmIHRoaXMgaXMgdGhlXG4gICAgLy8gaW5pdGlhbCByZW5kZXIgdG8gdGhpcyBjb250YWluZXIuXG4gICAgLy8gVGhpcyBpcyBuZWVkZWQgd2hlbmV2ZXIgZHluYW1pYyBjaGFuZ2VzIGFyZSBtYWRlIHNvIGl0IHdvdWxkIGJlXG4gICAgLy8gc2FmZXN0IHRvIGRvIGV2ZXJ5IHJlbmRlcjsgaG93ZXZlciwgdGhpcyB3b3VsZCByZWdyZXNzIHBlcmZvcm1hbmNlXG4gICAgLy8gc28gd2UgbGVhdmUgaXQgdXAgdG8gdGhlIHVzZXIgdG8gY2FsbCBgU2hhZHlDU1Muc3R5bGVFbGVtZW50YFxuICAgIC8vIGZvciBkeW5hbWljIGNoYW5nZXMuXG4gICAgaWYgKCFoYXNSZW5kZXJlZCAmJiBuZWVkc1Njb3BpbmcpIHtcbiAgICAgICAgd2luZG93LlNoYWR5Q1NTLnN0eWxlRWxlbWVudChjb250YWluZXIuaG9zdCk7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoYWR5LXJlbmRlci5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5pbXBvcnQgeyBtYXJrZXIsIFRlbXBsYXRlIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG4vKipcbiAqIFRoZSBkZWZhdWx0IFRlbXBsYXRlRmFjdG9yeSB3aGljaCBjYWNoZXMgVGVtcGxhdGVzIGtleWVkIG9uXG4gKiByZXN1bHQudHlwZSBhbmQgcmVzdWx0LnN0cmluZ3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZUZhY3RvcnkocmVzdWx0KSB7XG4gICAgbGV0IHRlbXBsYXRlQ2FjaGUgPSB0ZW1wbGF0ZUNhY2hlcy5nZXQocmVzdWx0LnR5cGUpO1xuICAgIGlmICh0ZW1wbGF0ZUNhY2hlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGVtcGxhdGVDYWNoZSA9IHtcbiAgICAgICAgICAgIHN0cmluZ3NBcnJheTogbmV3IFdlYWtNYXAoKSxcbiAgICAgICAgICAgIGtleVN0cmluZzogbmV3IE1hcCgpXG4gICAgICAgIH07XG4gICAgICAgIHRlbXBsYXRlQ2FjaGVzLnNldChyZXN1bHQudHlwZSwgdGVtcGxhdGVDYWNoZSk7XG4gICAgfVxuICAgIGxldCB0ZW1wbGF0ZSA9IHRlbXBsYXRlQ2FjaGUuc3RyaW5nc0FycmF5LmdldChyZXN1bHQuc3RyaW5ncyk7XG4gICAgaWYgKHRlbXBsYXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgVGVtcGxhdGVTdHJpbmdzQXJyYXkgaXMgbmV3LCBnZW5lcmF0ZSBhIGtleSBmcm9tIHRoZSBzdHJpbmdzXG4gICAgLy8gVGhpcyBrZXkgaXMgc2hhcmVkIGJldHdlZW4gYWxsIHRlbXBsYXRlcyB3aXRoIGlkZW50aWNhbCBjb250ZW50XG4gICAgY29uc3Qga2V5ID0gcmVzdWx0LnN0cmluZ3Muam9pbihtYXJrZXIpO1xuICAgIC8vIENoZWNrIGlmIHdlIGFscmVhZHkgaGF2ZSBhIFRlbXBsYXRlIGZvciB0aGlzIGtleVxuICAgIHRlbXBsYXRlID0gdGVtcGxhdGVDYWNoZS5rZXlTdHJpbmcuZ2V0KGtleSk7XG4gICAgaWYgKHRlbXBsYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBub3Qgc2VlbiB0aGlzIGtleSBiZWZvcmUsIGNyZWF0ZSBhIG5ldyBUZW1wbGF0ZVxuICAgICAgICB0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZShyZXN1bHQsIHJlc3VsdC5nZXRUZW1wbGF0ZUVsZW1lbnQoKSk7XG4gICAgICAgIC8vIENhY2hlIHRoZSBUZW1wbGF0ZSBmb3IgdGhpcyBrZXlcbiAgICAgICAgdGVtcGxhdGVDYWNoZS5rZXlTdHJpbmcuc2V0KGtleSwgdGVtcGxhdGUpO1xuICAgIH1cbiAgICAvLyBDYWNoZSBhbGwgZnV0dXJlIHF1ZXJpZXMgZm9yIHRoaXMgVGVtcGxhdGVTdHJpbmdzQXJyYXlcbiAgICB0ZW1wbGF0ZUNhY2hlLnN0cmluZ3NBcnJheS5zZXQocmVzdWx0LnN0cmluZ3MsIHRlbXBsYXRlKTtcbiAgICByZXR1cm4gdGVtcGxhdGU7XG59XG5leHBvcnQgY29uc3QgdGVtcGxhdGVDYWNoZXMgPSBuZXcgTWFwKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZW1wbGF0ZS1mYWN0b3J5LmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbmltcG9ydCB7IGlzQ0VQb2x5ZmlsbCB9IGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCB7IGlzVGVtcGxhdGVQYXJ0QWN0aXZlIH0gZnJvbSAnLi90ZW1wbGF0ZS5qcyc7XG4vKipcbiAqIEFuIGluc3RhbmNlIG9mIGEgYFRlbXBsYXRlYCB0aGF0IGNhbiBiZSBhdHRhY2hlZCB0byB0aGUgRE9NIGFuZCB1cGRhdGVkXG4gKiB3aXRoIG5ldyB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZUluc3RhbmNlIHtcbiAgICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZSwgcHJvY2Vzc29yLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX19wYXJ0cyA9IFtdO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgIHRoaXMucHJvY2Vzc29yID0gcHJvY2Vzc29yO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICB1cGRhdGUodmFsdWVzKSB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBwYXJ0IG9mIHRoaXMuX19wYXJ0cykge1xuICAgICAgICAgICAgaWYgKHBhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHBhcnQuc2V0VmFsdWUodmFsdWVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgdGhpcy5fX3BhcnRzKSB7XG4gICAgICAgICAgICBpZiAocGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcGFydC5jb21taXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY2xvbmUoKSB7XG4gICAgICAgIC8vIFRoZXJlIGFyZSBhIG51bWJlciBvZiBzdGVwcyBpbiB0aGUgbGlmZWN5Y2xlIG9mIGEgdGVtcGxhdGUgaW5zdGFuY2Unc1xuICAgICAgICAvLyBET00gZnJhZ21lbnQ6XG4gICAgICAgIC8vICAxLiBDbG9uZSAtIGNyZWF0ZSB0aGUgaW5zdGFuY2UgZnJhZ21lbnRcbiAgICAgICAgLy8gIDIuIEFkb3B0IC0gYWRvcHQgaW50byB0aGUgbWFpbiBkb2N1bWVudFxuICAgICAgICAvLyAgMy4gUHJvY2VzcyAtIGZpbmQgcGFydCBtYXJrZXJzIGFuZCBjcmVhdGUgcGFydHNcbiAgICAgICAgLy8gIDQuIFVwZ3JhZGUgLSB1cGdyYWRlIGN1c3RvbSBlbGVtZW50c1xuICAgICAgICAvLyAgNS4gVXBkYXRlIC0gc2V0IG5vZGUsIGF0dHJpYnV0ZSwgcHJvcGVydHksIGV0Yy4sIHZhbHVlc1xuICAgICAgICAvLyAgNi4gQ29ubmVjdCAtIGNvbm5lY3QgdG8gdGhlIGRvY3VtZW50LiBPcHRpb25hbCBhbmQgb3V0c2lkZSBvZiB0aGlzXG4gICAgICAgIC8vICAgICBtZXRob2QuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFdlIGhhdmUgYSBmZXcgY29uc3RyYWludHMgb24gdGhlIG9yZGVyaW5nIG9mIHRoZXNlIHN0ZXBzOlxuICAgICAgICAvLyAgKiBXZSBuZWVkIHRvIHVwZ3JhZGUgYmVmb3JlIHVwZGF0aW5nLCBzbyB0aGF0IHByb3BlcnR5IHZhbHVlcyB3aWxsIHBhc3NcbiAgICAgICAgLy8gICAgdGhyb3VnaCBhbnkgcHJvcGVydHkgc2V0dGVycy5cbiAgICAgICAgLy8gICogV2Ugd291bGQgbGlrZSB0byBwcm9jZXNzIGJlZm9yZSB1cGdyYWRpbmcgc28gdGhhdCB3ZSdyZSBzdXJlIHRoYXQgdGhlXG4gICAgICAgIC8vICAgIGNsb25lZCBmcmFnbWVudCBpcyBpbmVydCBhbmQgbm90IGRpc3R1cmJlZCBieSBzZWxmLW1vZGlmeWluZyBET00uXG4gICAgICAgIC8vICAqIFdlIHdhbnQgY3VzdG9tIGVsZW1lbnRzIHRvIHVwZ3JhZGUgZXZlbiBpbiBkaXNjb25uZWN0ZWQgZnJhZ21lbnRzLlxuICAgICAgICAvL1xuICAgICAgICAvLyBHaXZlbiB0aGVzZSBjb25zdHJhaW50cywgd2l0aCBmdWxsIGN1c3RvbSBlbGVtZW50cyBzdXBwb3J0IHdlIHdvdWxkXG4gICAgICAgIC8vIHByZWZlciB0aGUgb3JkZXI6IENsb25lLCBQcm9jZXNzLCBBZG9wdCwgVXBncmFkZSwgVXBkYXRlLCBDb25uZWN0XG4gICAgICAgIC8vXG4gICAgICAgIC8vIEJ1dCBTYWZhcmkgZG9lcyBub3QgaW1wbGVtZW50IEN1c3RvbUVsZW1lbnRSZWdpc3RyeSN1cGdyYWRlLCBzbyB3ZVxuICAgICAgICAvLyBjYW4gbm90IGltcGxlbWVudCB0aGF0IG9yZGVyIGFuZCBzdGlsbCBoYXZlIHVwZ3JhZGUtYmVmb3JlLXVwZGF0ZSBhbmRcbiAgICAgICAgLy8gdXBncmFkZSBkaXNjb25uZWN0ZWQgZnJhZ21lbnRzLiBTbyB3ZSBpbnN0ZWFkIHNhY3JpZmljZSB0aGVcbiAgICAgICAgLy8gcHJvY2Vzcy1iZWZvcmUtdXBncmFkZSBjb25zdHJhaW50LCBzaW5jZSBpbiBDdXN0b20gRWxlbWVudHMgdjEgZWxlbWVudHNcbiAgICAgICAgLy8gbXVzdCBub3QgbW9kaWZ5IHRoZWlyIGxpZ2h0IERPTSBpbiB0aGUgY29uc3RydWN0b3IuIFdlIHN0aWxsIGhhdmUgaXNzdWVzXG4gICAgICAgIC8vIHdoZW4gY28tZXhpc3Rpbmcgd2l0aCBDRXYwIGVsZW1lbnRzIGxpa2UgUG9seW1lciAxLCBhbmQgd2l0aCBwb2x5ZmlsbHNcbiAgICAgICAgLy8gdGhhdCBkb24ndCBzdHJpY3RseSBhZGhlcmUgdG8gdGhlIG5vLW1vZGlmaWNhdGlvbiBydWxlIGJlY2F1c2Ugc2hhZG93XG4gICAgICAgIC8vIERPTSwgd2hpY2ggbWF5IGJlIGNyZWF0ZWQgaW4gdGhlIGNvbnN0cnVjdG9yLCBpcyBlbXVsYXRlZCBieSBiZWluZyBwbGFjZWRcbiAgICAgICAgLy8gaW4gdGhlIGxpZ2h0IERPTS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhlIHJlc3VsdGluZyBvcmRlciBpcyBvbiBuYXRpdmUgaXM6IENsb25lLCBBZG9wdCwgVXBncmFkZSwgUHJvY2VzcyxcbiAgICAgICAgLy8gVXBkYXRlLCBDb25uZWN0LiBkb2N1bWVudC5pbXBvcnROb2RlKCkgcGVyZm9ybXMgQ2xvbmUsIEFkb3B0LCBhbmQgVXBncmFkZVxuICAgICAgICAvLyBpbiBvbmUgc3RlcC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhlIEN1c3RvbSBFbGVtZW50cyB2MSBwb2x5ZmlsbCBzdXBwb3J0cyB1cGdyYWRlKCksIHNvIHRoZSBvcmRlciB3aGVuXG4gICAgICAgIC8vIHBvbHlmaWxsZWQgaXMgdGhlIG1vcmUgaWRlYWw6IENsb25lLCBQcm9jZXNzLCBBZG9wdCwgVXBncmFkZSwgVXBkYXRlLFxuICAgICAgICAvLyBDb25uZWN0LlxuICAgICAgICBjb25zdCBmcmFnbWVudCA9IGlzQ0VQb2x5ZmlsbCA/XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlLmVsZW1lbnQuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkgOlxuICAgICAgICAgICAgZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlLmVsZW1lbnQuY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHN0YWNrID0gW107XG4gICAgICAgIGNvbnN0IHBhcnRzID0gdGhpcy50ZW1wbGF0ZS5wYXJ0cztcbiAgICAgICAgLy8gRWRnZSBuZWVkcyBhbGwgNCBwYXJhbWV0ZXJzIHByZXNlbnQ7IElFMTEgbmVlZHMgM3JkIHBhcmFtZXRlciB0byBiZSBudWxsXG4gICAgICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoZnJhZ21lbnQsIDEzMyAvKiBOb2RlRmlsdGVyLlNIT1dfe0VMRU1FTlR8Q09NTUVOVHxURVhUfSAqLywgbnVsbCwgZmFsc2UpO1xuICAgICAgICBsZXQgcGFydEluZGV4ID0gMDtcbiAgICAgICAgbGV0IG5vZGVJbmRleCA9IDA7XG4gICAgICAgIGxldCBwYXJ0O1xuICAgICAgICBsZXQgbm9kZSA9IHdhbGtlci5uZXh0Tm9kZSgpO1xuICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBub2RlcyBhbmQgcGFydHMgb2YgYSB0ZW1wbGF0ZVxuICAgICAgICB3aGlsZSAocGFydEluZGV4IDwgcGFydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBwYXJ0ID0gcGFydHNbcGFydEluZGV4XTtcbiAgICAgICAgICAgIGlmICghaXNUZW1wbGF0ZVBhcnRBY3RpdmUocGFydCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fcGFydHMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHBhcnRJbmRleCsrO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUHJvZ3Jlc3MgdGhlIHRyZWUgd2Fsa2VyIHVudGlsIHdlIGZpbmQgb3VyIG5leHQgcGFydCdzIG5vZGUuXG4gICAgICAgICAgICAvLyBOb3RlIHRoYXQgbXVsdGlwbGUgcGFydHMgbWF5IHNoYXJlIHRoZSBzYW1lIG5vZGUgKGF0dHJpYnV0ZSBwYXJ0c1xuICAgICAgICAgICAgLy8gb24gYSBzaW5nbGUgZWxlbWVudCksIHNvIHRoaXMgbG9vcCBtYXkgbm90IHJ1biBhdCBhbGwuXG4gICAgICAgICAgICB3aGlsZSAobm9kZUluZGV4IDwgcGFydC5pbmRleCkge1xuICAgICAgICAgICAgICAgIG5vZGVJbmRleCsrO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSAnVEVNUExBVEUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHdhbGtlci5jdXJyZW50Tm9kZSA9IG5vZGUuY29udGVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChub2RlID0gd2Fsa2VyLm5leHROb2RlKCkpID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlJ3ZlIGV4aGF1c3RlZCB0aGUgY29udGVudCBpbnNpZGUgYSBuZXN0ZWQgdGVtcGxhdGUgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgLy8gQmVjYXVzZSB3ZSBzdGlsbCBoYXZlIHBhcnRzICh0aGUgb3V0ZXIgZm9yLWxvb3ApLCB3ZSBrbm93OlxuICAgICAgICAgICAgICAgICAgICAvLyAtIFRoZXJlIGlzIGEgdGVtcGxhdGUgaW4gdGhlIHN0YWNrXG4gICAgICAgICAgICAgICAgICAgIC8vIC0gVGhlIHdhbGtlciB3aWxsIGZpbmQgYSBuZXh0Tm9kZSBvdXRzaWRlIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICB3YWxrZXIuY3VycmVudE5vZGUgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHdhbGtlci5uZXh0Tm9kZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdlJ3ZlIGFycml2ZWQgYXQgb3VyIHBhcnQncyBub2RlLlxuICAgICAgICAgICAgaWYgKHBhcnQudHlwZSA9PT0gJ25vZGUnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFydCA9IHRoaXMucHJvY2Vzc29yLmhhbmRsZVRleHRFeHByZXNzaW9uKHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgcGFydC5pbnNlcnRBZnRlck5vZGUobm9kZS5wcmV2aW91c1NpYmxpbmcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19wYXJ0cy5wdXNoKHBhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3BhcnRzLnB1c2goLi4udGhpcy5wcm9jZXNzb3IuaGFuZGxlQXR0cmlidXRlRXhwcmVzc2lvbnMobm9kZSwgcGFydC5uYW1lLCBwYXJ0LnN0cmluZ3MsIHRoaXMub3B0aW9ucykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFydEluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQ0VQb2x5ZmlsbCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRvcHROb2RlKGZyYWdtZW50KTtcbiAgICAgICAgICAgIGN1c3RvbUVsZW1lbnRzLnVwZ3JhZGUoZnJhZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcmFnbWVudDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10ZW1wbGF0ZS1pbnN0YW5jZS5qcy5tYXAiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFBvbHltZXIgUHJvamVjdCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyBjb2RlIG1heSBvbmx5IGJlIHVzZWQgdW5kZXIgdGhlIEJTRCBzdHlsZSBsaWNlbnNlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9BVVRIT1JTLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBjb250cmlidXRvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQ09OVFJJQlVUT1JTLnR4dFxuICogQ29kZSBkaXN0cmlidXRlZCBieSBHb29nbGUgYXMgcGFydCBvZiB0aGUgcG9seW1lciBwcm9qZWN0IGlzIGFsc29cbiAqIHN1YmplY3QgdG8gYW4gYWRkaXRpb25hbCBJUCByaWdodHMgZ3JhbnQgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG4vKipcbiAqIEBtb2R1bGUgbGl0LWh0bWxcbiAqL1xuaW1wb3J0IHsgcmVwYXJlbnROb2RlcyB9IGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCB7IGJvdW5kQXR0cmlidXRlU3VmZml4LCBsYXN0QXR0cmlidXRlTmFtZVJlZ2V4LCBtYXJrZXIsIG5vZGVNYXJrZXIgfSBmcm9tICcuL3RlbXBsYXRlLmpzJztcbi8qKlxuICogT3VyIFRydXN0ZWRUeXBlUG9saWN5IGZvciBIVE1MIHdoaWNoIGlzIGRlY2xhcmVkIHVzaW5nIHRoZSBodG1sIHRlbXBsYXRlXG4gKiB0YWcgZnVuY3Rpb24uXG4gKlxuICogVGhhdCBIVE1MIGlzIGEgZGV2ZWxvcGVyLWF1dGhvcmVkIGNvbnN0YW50LCBhbmQgaXMgcGFyc2VkIHdpdGggaW5uZXJIVE1MXG4gKiBiZWZvcmUgYW55IHVudHJ1c3RlZCBleHByZXNzaW9ucyBoYXZlIGJlZW4gbWl4ZWQgaW4uIFRoZXJlZm9yIGl0IGlzXG4gKiBjb25zaWRlcmVkIHNhZmUgYnkgY29uc3RydWN0aW9uLlxuICovXG5jb25zdCBwb2xpY3kgPSB3aW5kb3cudHJ1c3RlZFR5cGVzICYmXG4gICAgdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSgnbGl0LWh0bWwnLCB7IGNyZWF0ZUhUTUw6IChzKSA9PiBzIH0pO1xuY29uc3QgY29tbWVudE1hcmtlciA9IGAgJHttYXJrZXJ9IGA7XG4vKipcbiAqIFRoZSByZXR1cm4gdHlwZSBvZiBgaHRtbGAsIHdoaWNoIGhvbGRzIGEgVGVtcGxhdGUgYW5kIHRoZSB2YWx1ZXMgZnJvbVxuICogaW50ZXJwb2xhdGVkIGV4cHJlc3Npb25zLlxuICovXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKHN0cmluZ3MsIHZhbHVlcywgdHlwZSwgcHJvY2Vzc29yKSB7XG4gICAgICAgIHRoaXMuc3RyaW5ncyA9IHN0cmluZ3M7XG4gICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnByb2Nlc3NvciA9IHByb2Nlc3NvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyBvZiBIVE1MIHVzZWQgdG8gY3JlYXRlIGEgYDx0ZW1wbGF0ZT5gIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0SFRNTCgpIHtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMuc3RyaW5ncy5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgaHRtbCA9ICcnO1xuICAgICAgICBsZXQgaXNDb21tZW50QmluZGluZyA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcyA9IHRoaXMuc3RyaW5nc1tpXTtcbiAgICAgICAgICAgIC8vIEZvciBlYWNoIGJpbmRpbmcgd2Ugd2FudCB0byBkZXRlcm1pbmUgdGhlIGtpbmQgb2YgbWFya2VyIHRvIGluc2VydFxuICAgICAgICAgICAgLy8gaW50byB0aGUgdGVtcGxhdGUgc291cmNlIGJlZm9yZSBpdCdzIHBhcnNlZCBieSB0aGUgYnJvd3NlcidzIEhUTUxcbiAgICAgICAgICAgIC8vIHBhcnNlci4gVGhlIG1hcmtlciB0eXBlIGlzIGJhc2VkIG9uIHdoZXRoZXIgdGhlIGV4cHJlc3Npb24gaXMgaW4gYW5cbiAgICAgICAgICAgIC8vIGF0dHJpYnV0ZSwgdGV4dCwgb3IgY29tbWVudCBwb3NpdGlvbi5cbiAgICAgICAgICAgIC8vICAgKiBGb3Igbm9kZS1wb3NpdGlvbiBiaW5kaW5ncyB3ZSBpbnNlcnQgYSBjb21tZW50IHdpdGggdGhlIG1hcmtlclxuICAgICAgICAgICAgLy8gICAgIHNlbnRpbmVsIGFzIGl0cyB0ZXh0IGNvbnRlbnQsIGxpa2UgPCEtLXt7bGl0LWd1aWR9fS0tPi5cbiAgICAgICAgICAgIC8vICAgKiBGb3IgYXR0cmlidXRlIGJpbmRpbmdzIHdlIGluc2VydCBqdXN0IHRoZSBtYXJrZXIgc2VudGluZWwgZm9yIHRoZVxuICAgICAgICAgICAgLy8gICAgIGZpcnN0IGJpbmRpbmcsIHNvIHRoYXQgd2Ugc3VwcG9ydCB1bnF1b3RlZCBhdHRyaWJ1dGUgYmluZGluZ3MuXG4gICAgICAgICAgICAvLyAgICAgU3Vic2VxdWVudCBiaW5kaW5ncyBjYW4gdXNlIGEgY29tbWVudCBtYXJrZXIgYmVjYXVzZSBtdWx0aS1iaW5kaW5nXG4gICAgICAgICAgICAvLyAgICAgYXR0cmlidXRlcyBtdXN0IGJlIHF1b3RlZC5cbiAgICAgICAgICAgIC8vICAgKiBGb3IgY29tbWVudCBiaW5kaW5ncyB3ZSBpbnNlcnQganVzdCB0aGUgbWFya2VyIHNlbnRpbmVsIHNvIHdlIGRvbid0XG4gICAgICAgICAgICAvLyAgICAgY2xvc2UgdGhlIGNvbW1lbnQuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBjb2RlIHNjYW5zIHRoZSB0ZW1wbGF0ZSBzb3VyY2UsIGJ1dCBpcyAqbm90KiBhbiBIVE1MXG4gICAgICAgICAgICAvLyBwYXJzZXIuIFdlIGRvbid0IG5lZWQgdG8gdHJhY2sgdGhlIHRyZWUgc3RydWN0dXJlIG9mIHRoZSBIVE1MLCBvbmx5XG4gICAgICAgICAgICAvLyB3aGV0aGVyIGEgYmluZGluZyBpcyBpbnNpZGUgYSBjb21tZW50LCBhbmQgaWYgbm90LCBpZiBpdCBhcHBlYXJzIHRvIGJlXG4gICAgICAgICAgICAvLyB0aGUgZmlyc3QgYmluZGluZyBpbiBhbiBhdHRyaWJ1dGUuXG4gICAgICAgICAgICBjb25zdCBjb21tZW50T3BlbiA9IHMubGFzdEluZGV4T2YoJzwhLS0nKTtcbiAgICAgICAgICAgIC8vIFdlJ3JlIGluIGNvbW1lbnQgcG9zaXRpb24gaWYgd2UgaGF2ZSBhIGNvbW1lbnQgb3BlbiB3aXRoIG5vIGZvbGxvd2luZ1xuICAgICAgICAgICAgLy8gY29tbWVudCBjbG9zZS4gQmVjYXVzZSA8LS0gY2FuIGFwcGVhciBpbiBhbiBhdHRyaWJ1dGUgdmFsdWUgdGhlcmUgY2FuXG4gICAgICAgICAgICAvLyBiZSBmYWxzZSBwb3NpdGl2ZXMuXG4gICAgICAgICAgICBpc0NvbW1lbnRCaW5kaW5nID0gKGNvbW1lbnRPcGVuID4gLTEgfHwgaXNDb21tZW50QmluZGluZykgJiZcbiAgICAgICAgICAgICAgICBzLmluZGV4T2YoJy0tPicsIGNvbW1lbnRPcGVuICsgMSkgPT09IC0xO1xuICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHdlIGhhdmUgYW4gYXR0cmlidXRlLWxpa2Ugc2VxdWVuY2UgcHJlY2VkaW5nIHRoZVxuICAgICAgICAgICAgLy8gZXhwcmVzc2lvbi4gVGhpcyBjYW4gbWF0Y2ggXCJuYW1lPXZhbHVlXCIgbGlrZSBzdHJ1Y3R1cmVzIGluIHRleHQsXG4gICAgICAgICAgICAvLyBjb21tZW50cywgYW5kIGF0dHJpYnV0ZSB2YWx1ZXMsIHNvIHRoZXJlIGNhbiBiZSBmYWxzZS1wb3NpdGl2ZXMuXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVNYXRjaCA9IGxhc3RBdHRyaWJ1dGVOYW1lUmVnZXguZXhlYyhzKTtcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVNYXRjaCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIFdlJ3JlIG9ubHkgaW4gdGhpcyBicmFuY2ggaWYgd2UgZG9uJ3QgaGF2ZSBhIGF0dHJpYnV0ZS1saWtlXG4gICAgICAgICAgICAgICAgLy8gcHJlY2VkaW5nIHNlcXVlbmNlLiBGb3IgY29tbWVudHMsIHRoaXMgZ3VhcmRzIGFnYWluc3QgdW51c3VhbFxuICAgICAgICAgICAgICAgIC8vIGF0dHJpYnV0ZSB2YWx1ZXMgbGlrZSA8ZGl2IGZvbz1cIjwhLS0keydiYXInfVwiPi4gQ2FzZXMgbGlrZVxuICAgICAgICAgICAgICAgIC8vIDwhLS0gZm9vPSR7J2Jhcid9LS0+IGFyZSBoYW5kbGVkIGNvcnJlY3RseSBpbiB0aGUgYXR0cmlidXRlIGJyYW5jaFxuICAgICAgICAgICAgICAgIC8vIGJlbG93LlxuICAgICAgICAgICAgICAgIGh0bWwgKz0gcyArIChpc0NvbW1lbnRCaW5kaW5nID8gY29tbWVudE1hcmtlciA6IG5vZGVNYXJrZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIGF0dHJpYnV0ZXMgd2UgdXNlIGp1c3QgYSBtYXJrZXIgc2VudGluZWwsIGFuZCBhbHNvIGFwcGVuZCBhXG4gICAgICAgICAgICAgICAgLy8gJGxpdCQgc3VmZml4IHRvIHRoZSBuYW1lIHRvIG9wdC1vdXQgb2YgYXR0cmlidXRlLXNwZWNpZmljIHBhcnNpbmdcbiAgICAgICAgICAgICAgICAvLyB0aGF0IElFIGFuZCBFZGdlIGRvIGZvciBzdHlsZSBhbmQgY2VydGFpbiBTVkcgYXR0cmlidXRlcy5cbiAgICAgICAgICAgICAgICBodG1sICs9IHMuc3Vic3RyKDAsIGF0dHJpYnV0ZU1hdGNoLmluZGV4KSArIGF0dHJpYnV0ZU1hdGNoWzFdICtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlTWF0Y2hbMl0gKyBib3VuZEF0dHJpYnV0ZVN1ZmZpeCArIGF0dHJpYnV0ZU1hdGNoWzNdICtcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGh0bWwgKz0gdGhpcy5zdHJpbmdzW2xdO1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG4gICAgZ2V0VGVtcGxhdGVFbGVtZW50KCkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0SFRNTCgpO1xuICAgICAgICBpZiAocG9saWN5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgc2VjdXJlIGJlY2F1c2UgYHRoaXMuc3RyaW5nc2AgaXMgYSBUZW1wbGF0ZVN0cmluZ3NBcnJheS5cbiAgICAgICAgICAgIC8vIFRPRE86IHZhbGlkYXRlIHRoaXMgd2hlblxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtYXJyYXktaXMtdGVtcGxhdGUtb2JqZWN0IGlzXG4gICAgICAgICAgICAvLyBpbXBsZW1lbnRlZC5cbiAgICAgICAgICAgIHZhbHVlID0gcG9saWN5LmNyZWF0ZUhUTUwodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxufVxuLyoqXG4gKiBBIFRlbXBsYXRlUmVzdWx0IGZvciBTVkcgZnJhZ21lbnRzLlxuICpcbiAqIFRoaXMgY2xhc3Mgd3JhcHMgSFRNTCBpbiBhbiBgPHN2Zz5gIHRhZyBpbiBvcmRlciB0byBwYXJzZSBpdHMgY29udGVudHMgaW4gdGhlXG4gKiBTVkcgbmFtZXNwYWNlLCB0aGVuIG1vZGlmaWVzIHRoZSB0ZW1wbGF0ZSB0byByZW1vdmUgdGhlIGA8c3ZnPmAgdGFnIHNvIHRoYXRcbiAqIGNsb25lcyBvbmx5IGNvbnRhaW5lciB0aGUgb3JpZ2luYWwgZnJhZ21lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTVkdUZW1wbGF0ZVJlc3VsdCBleHRlbmRzIFRlbXBsYXRlUmVzdWx0IHtcbiAgICBnZXRIVE1MKCkge1xuICAgICAgICByZXR1cm4gYDxzdmc+JHtzdXBlci5nZXRIVE1MKCl9PC9zdmc+YDtcbiAgICB9XG4gICAgZ2V0VGVtcGxhdGVFbGVtZW50KCkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHN1cGVyLmdldFRlbXBsYXRlRWxlbWVudCgpO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGVtcGxhdGUuY29udGVudDtcbiAgICAgICAgY29uc3Qgc3ZnRWxlbWVudCA9IGNvbnRlbnQuZmlyc3RDaGlsZDtcbiAgICAgICAgY29udGVudC5yZW1vdmVDaGlsZChzdmdFbGVtZW50KTtcbiAgICAgICAgcmVwYXJlbnROb2Rlcyhjb250ZW50LCBzdmdFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGVtcGxhdGUtcmVzdWx0LmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNyBUaGUgUG9seW1lciBQcm9qZWN0IEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIGNvZGUgbWF5IG9ubHkgYmUgdXNlZCB1bmRlciB0aGUgQlNEIHN0eWxlIGxpY2Vuc2UgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9MSUNFTlNFLnR4dFxuICogVGhlIGNvbXBsZXRlIHNldCBvZiBhdXRob3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXRcbiAqIGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9DT05UUklCVVRPUlMudHh0XG4gKiBDb2RlIGRpc3RyaWJ1dGVkIGJ5IEdvb2dsZSBhcyBwYXJ0IG9mIHRoZSBwb2x5bWVyIHByb2plY3QgaXMgYWxzb1xuICogc3ViamVjdCB0byBhbiBhZGRpdGlvbmFsIElQIHJpZ2h0cyBncmFudCBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL1BBVEVOVFMudHh0XG4gKi9cbi8qKlxuICogQW4gZXhwcmVzc2lvbiBtYXJrZXIgd2l0aCBlbWJlZGRlZCB1bmlxdWUga2V5IHRvIGF2b2lkIGNvbGxpc2lvbiB3aXRoXG4gKiBwb3NzaWJsZSB0ZXh0IGluIHRlbXBsYXRlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IG1hcmtlciA9IGB7e2xpdC0ke1N0cmluZyhNYXRoLnJhbmRvbSgpKS5zbGljZSgyKX19fWA7XG4vKipcbiAqIEFuIGV4cHJlc3Npb24gbWFya2VyIHVzZWQgdGV4dC1wb3NpdGlvbnMsIG11bHRpLWJpbmRpbmcgYXR0cmlidXRlcywgYW5kXG4gKiBhdHRyaWJ1dGVzIHdpdGggbWFya3VwLWxpa2UgdGV4dCB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBub2RlTWFya2VyID0gYDwhLS0ke21hcmtlcn0tLT5gO1xuZXhwb3J0IGNvbnN0IG1hcmtlclJlZ2V4ID0gbmV3IFJlZ0V4cChgJHttYXJrZXJ9fCR7bm9kZU1hcmtlcn1gKTtcbi8qKlxuICogU3VmZml4IGFwcGVuZGVkIHRvIGFsbCBib3VuZCBhdHRyaWJ1dGUgbmFtZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBib3VuZEF0dHJpYnV0ZVN1ZmZpeCA9ICckbGl0JCc7XG4vKipcbiAqIEFuIHVwZGF0YWJsZSBUZW1wbGF0ZSB0aGF0IHRyYWNrcyB0aGUgbG9jYXRpb24gb2YgZHluYW1pYyBwYXJ0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFRlbXBsYXRlIHtcbiAgICBjb25zdHJ1Y3RvcihyZXN1bHQsIGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5wYXJ0cyA9IFtdO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICBjb25zdCBub2Rlc1RvUmVtb3ZlID0gW107XG4gICAgICAgIGNvbnN0IHN0YWNrID0gW107XG4gICAgICAgIC8vIEVkZ2UgbmVlZHMgYWxsIDQgcGFyYW1ldGVycyBwcmVzZW50OyBJRTExIG5lZWRzIDNyZCBwYXJhbWV0ZXIgdG8gYmUgbnVsbFxuICAgICAgICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGVsZW1lbnQuY29udGVudCwgMTMzIC8qIE5vZGVGaWx0ZXIuU0hPV197RUxFTUVOVHxDT01NRU5UfFRFWFR9ICovLCBudWxsLCBmYWxzZSk7XG4gICAgICAgIC8vIEtlZXBzIHRyYWNrIG9mIHRoZSBsYXN0IGluZGV4IGFzc29jaWF0ZWQgd2l0aCBhIHBhcnQuIFdlIHRyeSB0byBkZWxldGVcbiAgICAgICAgLy8gdW5uZWNlc3Nhcnkgbm9kZXMsIGJ1dCB3ZSBuZXZlciB3YW50IHRvIGFzc29jaWF0ZSB0d28gZGlmZmVyZW50IHBhcnRzXG4gICAgICAgIC8vIHRvIHRoZSBzYW1lIGluZGV4LiBUaGV5IG11c3QgaGF2ZSBhIGNvbnN0YW50IG5vZGUgYmV0d2Vlbi5cbiAgICAgICAgbGV0IGxhc3RQYXJ0SW5kZXggPSAwO1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgbGV0IHBhcnRJbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IHsgc3RyaW5ncywgdmFsdWVzOiB7IGxlbmd0aCB9IH0gPSByZXN1bHQ7XG4gICAgICAgIHdoaWxlIChwYXJ0SW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB3YWxrZXIubmV4dE5vZGUoKTtcbiAgICAgICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UndmUgZXhoYXVzdGVkIHRoZSBjb250ZW50IGluc2lkZSBhIG5lc3RlZCB0ZW1wbGF0ZSBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIEJlY2F1c2Ugd2Ugc3RpbGwgaGF2ZSBwYXJ0cyAodGhlIG91dGVyIGZvci1sb29wKSwgd2Uga25vdzpcbiAgICAgICAgICAgICAgICAvLyAtIFRoZXJlIGlzIGEgdGVtcGxhdGUgaW4gdGhlIHN0YWNrXG4gICAgICAgICAgICAgICAgLy8gLSBUaGUgd2Fsa2VyIHdpbGwgZmluZCBhIG5leHROb2RlIG91dHNpZGUgdGhlIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgd2Fsa2VyLmN1cnJlbnROb2RlID0gc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEgLyogTm9kZS5FTEVNRU5UX05PREUgKi8pIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5oYXNBdHRyaWJ1dGVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IG5vZGUuYXR0cmlidXRlcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBsZW5ndGggfSA9IGF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBlclxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTmFtZWROb2RlTWFwLFxuICAgICAgICAgICAgICAgICAgICAvLyBhdHRyaWJ1dGVzIGFyZSBub3QgZ3VhcmFudGVlZCB0byBiZSByZXR1cm5lZCBpbiBkb2N1bWVudCBvcmRlci5cbiAgICAgICAgICAgICAgICAgICAgLy8gSW4gcGFydGljdWxhciwgRWRnZS9JRSBjYW4gcmV0dXJuIHRoZW0gb3V0IG9mIG9yZGVyLCBzbyB3ZSBjYW5ub3RcbiAgICAgICAgICAgICAgICAgICAgLy8gYXNzdW1lIGEgY29ycmVzcG9uZGVuY2UgYmV0d2VlbiBwYXJ0IGluZGV4IGFuZCBhdHRyaWJ1dGUgaW5kZXguXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbmRzV2l0aChhdHRyaWJ1dGVzW2ldLm5hbWUsIGJvdW5kQXR0cmlidXRlU3VmZml4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNvdW50LS0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIHRlbXBsYXRlIGxpdGVyYWwgc2VjdGlvbiBsZWFkaW5nIHVwIHRvIHRoZSBmaXJzdFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhwcmVzc2lvbiBpbiB0aGlzIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyaW5nRm9yUGFydCA9IHN0cmluZ3NbcGFydEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGF0dHJpYnV0ZSBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gbGFzdEF0dHJpYnV0ZU5hbWVSZWdleC5leGVjKHN0cmluZ0ZvclBhcnQpWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgY29ycmVzcG9uZGluZyBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFsbCBib3VuZCBhdHRyaWJ1dGVzIGhhdmUgaGFkIGEgc3VmZml4IGFkZGVkIGluXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUZW1wbGF0ZVJlc3VsdCNnZXRIVE1MIHRvIG9wdCBvdXQgb2Ygc3BlY2lhbCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsaW5nLiBUbyBsb29rIHVwIHRoZSBhdHRyaWJ1dGUgdmFsdWUgd2UgYWxzbyBuZWVkIHRvIGFkZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHN1ZmZpeC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZUxvb2t1cE5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCkgKyBib3VuZEF0dHJpYnV0ZVN1ZmZpeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTG9va3VwTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVMb29rdXBOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRpY3MgPSBhdHRyaWJ1dGVWYWx1ZS5zcGxpdChtYXJrZXJSZWdleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnRzLnB1c2goeyB0eXBlOiAnYXR0cmlidXRlJywgaW5kZXgsIG5hbWUsIHN0cmluZ3M6IHN0YXRpY3MgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0SW5kZXggKz0gc3RhdGljcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09ICdURU1QTEFURScpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgd2Fsa2VyLmN1cnJlbnROb2RlID0gbm9kZS5jb250ZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMgLyogTm9kZS5URVhUX05PREUgKi8pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gbm9kZS5kYXRhO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmluZGV4T2YobWFya2VyKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyaW5ncyA9IGRhdGEuc3BsaXQobWFya2VyUmVnZXgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBzdHJpbmdzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIGEgbmV3IHRleHQgbm9kZSBmb3IgZWFjaCBsaXRlcmFsIHNlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlc2Ugbm9kZXMgYXJlIGFsc28gdXNlZCBhcyB0aGUgbWFya2VycyBmb3Igbm9kZSBwYXJ0c1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5zZXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHMgPSBzdHJpbmdzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0ID0gY3JlYXRlTWFya2VyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IGxhc3RBdHRyaWJ1dGVOYW1lUmVnZXguZXhlYyhzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggIT09IG51bGwgJiYgZW5kc1dpdGgobWF0Y2hbMl0sIGJvdW5kQXR0cmlidXRlU3VmZml4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzID0gcy5zbGljZSgwLCBtYXRjaC5pbmRleCkgKyBtYXRjaFsxXSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFsyXS5zbGljZSgwLCAtYm91bmRBdHRyaWJ1dGVTdWZmaXgubGVuZ3RoKSArIG1hdGNoWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoaW5zZXJ0LCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFydHMucHVzaCh7IHR5cGU6ICdub2RlJywgaW5kZXg6ICsraW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBubyB0ZXh0LCB3ZSBtdXN0IGluc2VydCBhIGNvbW1lbnQgdG8gbWFyayBvdXIgcGxhY2UuXG4gICAgICAgICAgICAgICAgICAgIC8vIEVsc2UsIHdlIGNhbiB0cnVzdCBpdCB3aWxsIHN0aWNrIGFyb3VuZCBhZnRlciBjbG9uaW5nLlxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5nc1tsYXN0SW5kZXhdID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShjcmVhdGVNYXJrZXIoKSwgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2Rlc1RvUmVtb3ZlLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmRhdGEgPSBzdHJpbmdzW2xhc3RJbmRleF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHBhcnQgZm9yIGVhY2ggbWF0Y2ggZm91bmRcbiAgICAgICAgICAgICAgICAgICAgcGFydEluZGV4ICs9IGxhc3RJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSA4IC8qIE5vZGUuQ09NTUVOVF9OT0RFICovKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuZGF0YSA9PT0gbWFya2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGEgbmV3IG1hcmtlciBub2RlIHRvIGJlIHRoZSBzdGFydE5vZGUgb2YgdGhlIFBhcnQgaWYgYW55IG9mXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgYXJlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgIC8vICAqIFdlIGRvbid0IGhhdmUgYSBwcmV2aW91c1NpYmxpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gICogVGhlIHByZXZpb3VzU2libGluZyBpcyBhbHJlYWR5IHRoZSBzdGFydCBvZiBhIHByZXZpb3VzIHBhcnRcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUucHJldmlvdXNTaWJsaW5nID09PSBudWxsIHx8IGluZGV4ID09PSBsYXN0UGFydEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShjcmVhdGVNYXJrZXIoKSwgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGFzdFBhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnRzLnB1c2goeyB0eXBlOiAnbm9kZScsIGluZGV4IH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGEgbmV4dFNpYmxpbmcsIGtlZXAgdGhpcyBub2RlIHNvIHdlIGhhdmUgYW4gZW5kLlxuICAgICAgICAgICAgICAgICAgICAvLyBFbHNlLCB3ZSBjYW4gcmVtb3ZlIGl0IHRvIHNhdmUgZnV0dXJlIGNvc3RzLlxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5uZXh0U2libGluZyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5kYXRhID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2Rlc1RvUmVtb3ZlLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhcnRJbmRleCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChpID0gbm9kZS5kYXRhLmluZGV4T2YobWFya2VyLCBpICsgMSkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29tbWVudCBub2RlIGhhcyBhIGJpbmRpbmcgbWFya2VyIGluc2lkZSwgbWFrZSBhbiBpbmFjdGl2ZSBwYXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgYmluZGluZyB3b24ndCB3b3JrLCBidXQgc3Vic2VxdWVudCBiaW5kaW5ncyB3aWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIChqdXN0aW5mYWduYW5pKTogY29uc2lkZXIgd2hldGhlciBpdCdzIGV2ZW4gd29ydGggaXQgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgYmluZGluZ3MgaW4gY29tbWVudHMgd29ya1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJ0cy5wdXNoKHsgdHlwZTogJ25vZGUnLCBpbmRleDogLTEgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0SW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBSZW1vdmUgdGV4dCBiaW5kaW5nIG5vZGVzIGFmdGVyIHRoZSB3YWxrIHRvIG5vdCBkaXN0dXJiIHRoZSBUcmVlV2Fsa2VyXG4gICAgICAgIGZvciAoY29uc3QgbiBvZiBub2Rlc1RvUmVtb3ZlKSB7XG4gICAgICAgICAgICBuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobik7XG4gICAgICAgIH1cbiAgICB9XG59XG5jb25zdCBlbmRzV2l0aCA9IChzdHIsIHN1ZmZpeCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gc3RyLmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGg7XG4gICAgcmV0dXJuIGluZGV4ID49IDAgJiYgc3RyLnNsaWNlKGluZGV4KSA9PT0gc3VmZml4O1xufTtcbmV4cG9ydCBjb25zdCBpc1RlbXBsYXRlUGFydEFjdGl2ZSA9IChwYXJ0KSA9PiBwYXJ0LmluZGV4ICE9PSAtMTtcbi8vIEFsbG93cyBgZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnJylgIHRvIGJlIHJlbmFtZWQgZm9yIGFcbi8vIHNtYWxsIG1hbnVhbCBzaXplLXNhdmluZ3MuXG5leHBvcnQgY29uc3QgY3JlYXRlTWFya2VyID0gKCkgPT4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnJyk7XG4vKipcbiAqIFRoaXMgcmVnZXggZXh0cmFjdHMgdGhlIGF0dHJpYnV0ZSBuYW1lIHByZWNlZGluZyBhbiBhdHRyaWJ1dGUtcG9zaXRpb25cbiAqIGV4cHJlc3Npb24uIEl0IGRvZXMgdGhpcyBieSBtYXRjaGluZyB0aGUgc3ludGF4IGFsbG93ZWQgZm9yIGF0dHJpYnV0ZXNcbiAqIGFnYWluc3QgdGhlIHN0cmluZyBsaXRlcmFsIGRpcmVjdGx5IHByZWNlZGluZyB0aGUgZXhwcmVzc2lvbiwgYXNzdW1pbmcgdGhhdFxuICogdGhlIGV4cHJlc3Npb24gaXMgaW4gYW4gYXR0cmlidXRlLXZhbHVlIHBvc2l0aW9uLlxuICpcbiAqIFNlZSBhdHRyaWJ1dGVzIGluIHRoZSBIVE1MIHNwZWM6XG4gKiBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjZWxlbWVudHMtYXR0cmlidXRlc1xuICpcbiAqIFwiIFxceDA5XFx4MGFcXHgwY1xceDBkXCIgYXJlIEhUTUwgc3BhY2UgY2hhcmFjdGVyczpcbiAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9pbmZyYXN0cnVjdHVyZS5odG1sI3NwYWNlLWNoYXJhY3RlcnNcbiAqXG4gKiBcIlxcMC1cXHgxRlxceDdGLVxceDlGXCIgYXJlIFVuaWNvZGUgY29udHJvbCBjaGFyYWN0ZXJzLCB3aGljaCBpbmNsdWRlcyBldmVyeVxuICogc3BhY2UgY2hhcmFjdGVyIGV4Y2VwdCBcIiBcIi5cbiAqXG4gKiBTbyBhbiBhdHRyaWJ1dGUgaXM6XG4gKiAgKiBUaGUgbmFtZTogYW55IGNoYXJhY3RlciBleGNlcHQgYSBjb250cm9sIGNoYXJhY3Rlciwgc3BhY2UgY2hhcmFjdGVyLCAoJyksXG4gKiAgICAoXCIpLCBcIj5cIiwgXCI9XCIsIG9yIFwiL1wiXG4gKiAgKiBGb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgc3BhY2UgY2hhcmFjdGVyc1xuICogICogRm9sbG93ZWQgYnkgXCI9XCJcbiAqICAqIEZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBzcGFjZSBjaGFyYWN0ZXJzXG4gKiAgKiBGb2xsb3dlZCBieTpcbiAqICAgICogQW55IGNoYXJhY3RlciBleGNlcHQgc3BhY2UsICgnKSwgKFwiKSwgXCI8XCIsIFwiPlwiLCBcIj1cIiwgKGApLCBvclxuICogICAgKiAoXCIpIHRoZW4gYW55IG5vbi0oXCIpLCBvclxuICogICAgKiAoJykgdGhlbiBhbnkgbm9uLSgnKVxuICovXG5leHBvcnQgY29uc3QgbGFzdEF0dHJpYnV0ZU5hbWVSZWdleCA9IFxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbi8oWyBcXHgwOVxceDBhXFx4MGNcXHgwZF0pKFteXFwwLVxceDFGXFx4N0YtXFx4OUYgXCInPj0vXSspKFsgXFx4MDlcXHgwYVxceDBjXFx4MGRdKj1bIFxceDA5XFx4MGFcXHgwY1xceDBkXSooPzpbXiBcXHgwOVxceDBhXFx4MGNcXHgwZFwiJ2A8Pj1dKnxcIlteXCJdKnwnW14nXSopKSQvO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGVtcGxhdGUuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0xJQ0VOU0UudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGF1dGhvcnMgbWF5IGJlIGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vQVVUSE9SUy50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgY29udHJpYnV0b3JzIG1heSBiZSBmb3VuZCBhdFxuICogaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0XG4gKiBodHRwOi8vcG9seW1lci5naXRodWIuaW8vUEFURU5UUy50eHRcbiAqL1xuLyoqXG4gKlxuICogTWFpbiBsaXQtaHRtbCBtb2R1bGUuXG4gKlxuICogTWFpbiBleHBvcnRzOlxuICpcbiAqIC0gIFtbaHRtbF1dXG4gKiAtICBbW3N2Z11dXG4gKiAtICBbW3JlbmRlcl1dXG4gKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKi9cbi8qKlxuICogRG8gbm90IHJlbW92ZSB0aGlzIGNvbW1lbnQ7IGl0IGtlZXBzIHR5cGVkb2MgZnJvbSBtaXNwbGFjaW5nIHRoZSBtb2R1bGVcbiAqIGRvY3MuXG4gKi9cbmltcG9ydCB7IGRlZmF1bHRUZW1wbGF0ZVByb2Nlc3NvciB9IGZyb20gJy4vbGliL2RlZmF1bHQtdGVtcGxhdGUtcHJvY2Vzc29yLmpzJztcbmltcG9ydCB7IFNWR1RlbXBsYXRlUmVzdWx0LCBUZW1wbGF0ZVJlc3VsdCB9IGZyb20gJy4vbGliL3RlbXBsYXRlLXJlc3VsdC5qcyc7XG5leHBvcnQgeyBEZWZhdWx0VGVtcGxhdGVQcm9jZXNzb3IsIGRlZmF1bHRUZW1wbGF0ZVByb2Nlc3NvciB9IGZyb20gJy4vbGliL2RlZmF1bHQtdGVtcGxhdGUtcHJvY2Vzc29yLmpzJztcbmV4cG9ydCB7IGRpcmVjdGl2ZSwgaXNEaXJlY3RpdmUgfSBmcm9tICcuL2xpYi9kaXJlY3RpdmUuanMnO1xuLy8gVE9ETyhqdXN0aW5mYWduYW5pKTogcmVtb3ZlIGxpbmUgd2hlbiB3ZSBnZXQgTm9kZVBhcnQgbW92aW5nIG1ldGhvZHNcbmV4cG9ydCB7IHJlbW92ZU5vZGVzLCByZXBhcmVudE5vZGVzIH0gZnJvbSAnLi9saWIvZG9tLmpzJztcbmV4cG9ydCB7IG5vQ2hhbmdlLCBub3RoaW5nIH0gZnJvbSAnLi9saWIvcGFydC5qcyc7XG5leHBvcnQgeyBBdHRyaWJ1dGVDb21taXR0ZXIsIEF0dHJpYnV0ZVBhcnQsIEJvb2xlYW5BdHRyaWJ1dGVQYXJ0LCBFdmVudFBhcnQsIGlzSXRlcmFibGUsIGlzUHJpbWl0aXZlLCBOb2RlUGFydCwgUHJvcGVydHlDb21taXR0ZXIsIFByb3BlcnR5UGFydCB9IGZyb20gJy4vbGliL3BhcnRzLmpzJztcbmV4cG9ydCB7IHBhcnRzLCByZW5kZXIgfSBmcm9tICcuL2xpYi9yZW5kZXIuanMnO1xuZXhwb3J0IHsgdGVtcGxhdGVDYWNoZXMsIHRlbXBsYXRlRmFjdG9yeSB9IGZyb20gJy4vbGliL3RlbXBsYXRlLWZhY3RvcnkuanMnO1xuZXhwb3J0IHsgVGVtcGxhdGVJbnN0YW5jZSB9IGZyb20gJy4vbGliL3RlbXBsYXRlLWluc3RhbmNlLmpzJztcbmV4cG9ydCB7IFNWR1RlbXBsYXRlUmVzdWx0LCBUZW1wbGF0ZVJlc3VsdCB9IGZyb20gJy4vbGliL3RlbXBsYXRlLXJlc3VsdC5qcyc7XG5leHBvcnQgeyBjcmVhdGVNYXJrZXIsIGlzVGVtcGxhdGVQYXJ0QWN0aXZlLCBUZW1wbGF0ZSB9IGZyb20gJy4vbGliL3RlbXBsYXRlLmpzJztcbi8vIElNUE9SVEFOVDogZG8gbm90IGNoYW5nZSB0aGUgcHJvcGVydHkgbmFtZSBvciB0aGUgYXNzaWdubWVudCBleHByZXNzaW9uLlxuLy8gVGhpcyBsaW5lIHdpbGwgYmUgdXNlZCBpbiByZWdleGVzIHRvIHNlYXJjaCBmb3IgbGl0LWh0bWwgdXNhZ2UuXG4vLyBUT0RPKGp1c3RpbmZhZ25hbmkpOiBpbmplY3QgdmVyc2lvbiBudW1iZXIgYXQgYnVpbGQgdGltZVxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgKHdpbmRvd1snbGl0SHRtbFZlcnNpb25zJ10gfHwgKHdpbmRvd1snbGl0SHRtbFZlcnNpb25zJ10gPSBbXSkpLnB1c2goJzEuMy4wJyk7XG59XG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIGFuIEhUTUwgdGVtcGxhdGUgdGhhdCBjYW4gZWZmaWNpZW50bHlcbiAqIHJlbmRlciB0byBhbmQgdXBkYXRlIGEgY29udGFpbmVyLlxuICovXG5leHBvcnQgY29uc3QgaHRtbCA9IChzdHJpbmdzLCAuLi52YWx1ZXMpID0+IG5ldyBUZW1wbGF0ZVJlc3VsdChzdHJpbmdzLCB2YWx1ZXMsICdodG1sJywgZGVmYXVsdFRlbXBsYXRlUHJvY2Vzc29yKTtcbi8qKlxuICogSW50ZXJwcmV0cyBhIHRlbXBsYXRlIGxpdGVyYWwgYXMgYW4gU1ZHIHRlbXBsYXRlIHRoYXQgY2FuIGVmZmljaWVudGx5XG4gKiByZW5kZXIgdG8gYW5kIHVwZGF0ZSBhIGNvbnRhaW5lci5cbiAqL1xuZXhwb3J0IGNvbnN0IHN2ZyA9IChzdHJpbmdzLCAuLi52YWx1ZXMpID0+IG5ldyBTVkdUZW1wbGF0ZVJlc3VsdChzdHJpbmdzLCB2YWx1ZXMsICdzdmcnLCBkZWZhdWx0VGVtcGxhdGVQcm9jZXNzb3IpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGl0LWh0bWwuanMubWFwIiwiY29uc3QgS0VZUyA9IHtcbiAgQVJST1dfUklHSFQ6ICdBcnJvd1JpZ2h0JyxcbiAgQVJST1dfTEVGVDogJ0Fycm93TGVmdCcsXG4gIEFSUk9XX1VQOiAnQXJyb3dVcCcsXG4gIEFSUk9XX0RPV046ICdBcnJvd0Rvd24nXG59O1xuXG5leHBvcnQgeyBLRVlTIH07IiwiaW1wb3J0IHsgTGl0RWxlbWVudCwgaHRtbCwgY3NzIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuaW1wb3J0IHsgR2FtZUludGVyZmFjZSB9IGZyb20gJy4uL2dhbWUvZ2FtZS1pbnRlcmZhY2UuanMnO1xuaW1wb3J0IHsgS0VZUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmNsYXNzIENvb2xHYW1lIGV4dGVuZHMgTGl0RWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5fY29udHJvbGxlckNsaWNrSGFuZGxlcnMgPSB7XG5cdFx0XHRyaWdodDoge1xuXHRcdFx0XHRtb3VzZURvd246ICgpID0+IHsgdGhpcy5nYW1lSW50ZXJmYWNlLnBsYXllckdvUmlnaHQoKTt9LFxuXHRcdFx0XHRtb3VzZVVwOiAoKSA9PiB7IHRoaXMuZ2FtZUludGVyZmFjZS5wbGF5ZXJTdG9wKCk7fVxuXHRcdFx0fSxcblx0XHRcdGxlZnQ6IHtcblx0XHRcdFx0bW91c2VEb3duOiAoKSA9PiB7IHRoaXMuZ2FtZUludGVyZmFjZS5wbGF5ZXJHb0xlZnQoKTt9LFxuXHRcdFx0XHRtb3VzZVVwOiAoKSA9PiB7IHRoaXMuZ2FtZUludGVyZmFjZS5wbGF5ZXJTdG9wKCk7fVxuXHRcdFx0fSxcblx0XHRcdHVwOiB7XG5cdFx0XHRcdG1vdXNlRG93bjogKCkgPT4geyB0aGlzLmdhbWVJbnRlcmZhY2UucGxheWVyR29VcCgpO30sXG5cdFx0XHRcdG1vdXNlVXA6ICgpID0+IHsgdGhpcy5nYW1lSW50ZXJmYWNlLnBsYXllclN0b3AoKTt9XG5cdFx0XHR9LFxuXHRcdFx0ZG93bjoge1xuXHRcdFx0XHRtb3VzZURvd246ICgpID0+IHsgdGhpcy5nYW1lSW50ZXJmYWNlLnBsYXllckdvRG93bigpO30sXG5cdFx0XHRcdG1vdXNlVXA6ICgpID0+IHsgdGhpcy5nYW1lSW50ZXJmYWNlLnBsYXllclN0b3AoKTt9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR0aGlzLl9zaG93U3BlZWNoRGlhbG9nID0gZmFsc2U7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IHN0eWxlcygpIHtcblx0XHRyZXR1cm4gY3NzYFxuXHRcdFx0Lm9uLXNjcmVlbi1jb250cm9sbGVyIHtcblx0XHRcdFx0cG9zaXRpb246IGZpeGVkO1xuXHRcdFx0XHRib3R0b206IDBweDtcblx0XHRcdFx0cmlnaHQ6IDBweDtcblx0XHRcdFx0dXNlci1zZWxlY3Q6IG5vbmU7XG5cdFx0XHRcdGhlaWdodDogbWluKG1pbig1MHZ3LCA1MHZoKSwgNDAwcHgpO1xuXHRcdFx0XHR3aWR0aDogbWluKG1pbig1MHZ3LCA1MHZoKSwgNDAwcHgpO1xuXHRcdFx0XHRtYXJnaW46IDVweDtcblx0XHRcdH1cblx0XHRcdCNzcGVlY2gtYnViYmxlIHtcblx0XHRcdFx0cG9zaXRpb246IGZpeGVkO1xuXHRcdFx0XHRib3R0b206IDIwcHg7XG5cdFx0XHRcdGxlZnQ6IDIwcHg7XG5cdFx0XHR9XG5cdFx0XHQjY29udGFpbmVyIHtcblx0XHRcdFx0aGVpZ2h0OiAxMDAlO1xuXHRcdFx0XHR3aWR0aDogMTAwJTtcblx0XHRcdH1cblx0XHRcdCNnYW1lLWNhbnZhcyB7XG5cdFx0XHRcdGhlaWdodDogMTAwJTtcblx0XHRcdFx0d2lkdGg6IDEwMCU7XG5cdFx0XHRcdHVzZXItc2VsZWN0OiBub25lO1xuXHRcdFx0XHQtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG5cdFx0XHRcdC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG5cdFx0XHRcdC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcblx0XHRcdFx0LW1vei11c2VyLXNlbGVjdDogbm9uZTtcblx0XHRcdFx0LW1zLXVzZXItc2VsZWN0OiBub25lO1xuXHRcdFx0XHR1c2VyLXNlbGVjdDogbm9uZTtcblx0XHRcdH1cblx0XHRgO1xuXHR9XG5cblx0Y29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0c3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2dhbWUtc3BlZWNoJywgdGhpcy5faGFuZGxlU3BlZWNoRXZlbnQpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9jYW52YXNSZXNpemUuYmluZCh0aGlzKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoeyBrZXkgfSkgPT4ge1xuXHRcdFx0c3dpdGNoIChrZXkpIHtcblx0XHRcdFx0Y2FzZSBLRVlTLkFSUk9XX0xFRlQ6XG5cdFx0XHRcdHRoaXMuZ2FtZUludGVyZmFjZS5wbGF5ZXJHb0xlZnQoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBLRVlTLkFSUk9XX1VQOlxuXHRcdFx0XHR0aGlzLmdhbWVJbnRlcmZhY2UucGxheWVyR29VcCgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIEtFWVMuQVJST1dfUklHSFQ6XG5cdFx0XHRcdHRoaXMuZ2FtZUludGVyZmFjZS5wbGF5ZXJHb1JpZ2h0KCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgS0VZUy5BUlJPV19ET1dOOlxuXHRcdFx0XHR0aGlzLmdhbWVJbnRlcmZhY2UucGxheWVyR29Eb3duKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKHsga2V5IH0pID0+IHtcblx0XHRcdGNvbnN0IGRpcmVjdGlvbmFsS2V5cyA9IFsgS0VZUy5BUlJPV19MRUZULCBLRVlTLkFSUk9XX1JJR0hULCBLRVlTLkFSUk9XX1VQLCBLRVlTLkFSUk9XX0RPV04gXTtcblx0XHRcdGlmIChkaXJlY3Rpb25hbEtleXMuaW5kZXhPZihrZXkpID49IDApIHtcblx0XHRcdFx0dGhpcy5nYW1lSW50ZXJmYWNlLnBsYXllclN0b3AoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdF9oYW5kbGVTcGVlY2hFdmVudChpbmZvKSB7XG5cdFx0Y29uc3QgeyBzaG93LCB0ZXh0LCBuYW1lIH0gPSBpbmZvLmRldGFpbDtcblx0XHR0aGlzLl9zaG93U3BlZWNoRGlhbG9nID0gc2hvdztcblx0XHR0aGlzLl90ZXh0ID0gdGV4dDtcblx0XHR0aGlzLl9uYW1lID0gbmFtZTtcblx0XHR0aGlzLnJlcXVlc3RVcGRhdGUoKTtcblx0fVxuXG5cdF9jYW52YXNSZXNpemUoKSB7XG5cdFx0dGhpcy5fY2FudmFzLndpZHRoICA9IHRoaXMuX2NhbnZhcy5vZmZzZXRXaWR0aDtcblx0XHR0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdGhpcy5fY2FudmFzLm9mZnNldEhlaWdodDtcblx0fVxuXG5cdHVwZGF0ZWQoKSB7XG5cdFx0aWYgKCF0aGlzLl9jYW52YXMpIHtcblx0XHRcdHRoaXMuX2NhbnZhcyA9IHRoaXMuc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1jYW52YXMnKTtcblx0XHRcdHRoaXMuX2NhbnZhc1Jlc2l6ZSgpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuZ2FtZUludGVyZmFjZSkge1xuXHRcdFx0dGhpcy5nYW1lSW50ZXJmYWNlID0gbmV3IEdhbWVJbnRlcmZhY2UodGhpcy5fY2FudmFzKTtcblx0XHRcdHRoaXMuZ2FtZUludGVyZmFjZS5zdGFydCgpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gaHRtbGBcblx0XHRcdDxkaXYgaWQ9XCJjb250YWluZXJcIj5cblx0XHRcdFx0PGNhbnZhcyBpZD1cImdhbWUtY2FudmFzXCI+PC9jYW52YXM+XG5cdFx0XHRcdDx2aXJ0dWFsLWNvbnRyb2xsZXJcblx0XHRcdFx0XHRjbGFzcz1cIm9uLXNjcmVlbi1jb250cm9sbGVyXCJcblx0XHRcdFx0XHQuY2xpY2tIYW5kbGVycz0ke3RoaXMuX2NvbnRyb2xsZXJDbGlja0hhbmRsZXJzfT5cblx0XHRcdFx0PC92aXJ0dWFsLWNvbnRyb2xsZXI+XG5cdFx0XHRcdCR7dGhpcy5fc2hvd1NwZWVjaERpYWxvZyA/XG5cdFx0XHRcdFx0aHRtbGA8dGV4dC1kaWFsb2dcblx0XHRcdFx0XHRcdGlkPVwic3BlZWNoLWJ1YmJsZVwiXG5cdFx0XHRcdFx0XHR0ZXh0PSR7dGhpcy5fdGV4dH1cblx0XHRcdFx0XHRcdG5hbWU9JHt0aGlzLl9uYW1lfSAvPmAgOiBudWxsfVxuXG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXHR9XG59XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2Nvb2wtZ2FtZScsIENvb2xHYW1lKTsiLCJpbXBvcnQgJy4vdmlydHVhbC1jb250cm9sbGVyLmpzJztcbmltcG9ydCAnLi9jb29sLWdhbWUuanMnO1xuaW1wb3J0ICcuL3RleHQtZGlhbG9nJzsiLCJpbXBvcnQgeyBMaXRFbGVtZW50LCBodG1sLCBjc3MsIHVuc2FmZUNTUyB9IGZyb20gJ2xpdC1lbGVtZW50JztcblxuXG5jb25zdCBQQURESU5HID0gMzA7XG5jb25zdCBGT05UX1NJWkUgPSA0NTtcbmNvbnN0IEZPTlRfRkFNSUxZID0gJ0FyaWFsJztcblxuY2xhc3MgVGV4dERpYWxvZyBleHRlbmRzIExpdEVsZW1lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50ZXh0ID0gJ1p6enp6Li4uJztcbiAgICB0aGlzLm5hbWUgPSAnSmltbXknO1xuICB9XG5cbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0ZXh0OiB7IHR5cGU6IFN0cmluZyB9LFxuICAgICAgbmFtZTogeyB0eXBlOiBTdHJpbmcgfVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0eWxlcygpIHtcbiAgICByZXR1cm4gY3NzYFxuICAgICAgLnNwZWVjaCB7XG4gICAgICAgIHBhZGRpbmc6ICR7dW5zYWZlQ1NTKGAke1BBRERJTkd9cHhgKX07XG4gICAgICAgIGZvbnQtc2l6ZTogJHt1bnNhZmVDU1MoYCR7Rk9OVF9TSVpFfXB4YCl9O1xuICAgICAgICBmb250LWZhbWlseTogJHt1bnNhZmVDU1MoRk9OVF9GQU1JTFkpfTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gICAgICAgIG1pbi13aWR0aDogNDBweDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgfVxuXG4gICAgICAuc3BlZWNoOmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYmFja2dyb3VuZDogI2Y3ZWRlMjtcbiAgICAgICAgaGVpZ2h0OiA2MCU7XG4gICAgICAgIHdpZHRoOiAxMDYlO1xuICAgICAgICBsZWZ0OiAtMyU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XG4gICAgICAgIHRvcDogMTAlO1xuICAgICAgICB6LWluZGV4OiAtMTtcbiAgICAgIH1cblxuICAgICAgLnNwZWVjaDphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYmFja2dyb3VuZDogI2Y3ZWRlMjtcbiAgICAgICAgd2lkdGg6IDk1JTtcbiAgICAgICAgaGVpZ2h0OiA2MCU7XG4gICAgICAgIGxlZnQ6IDIlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xuICAgICAgICB0b3A6IDMwJTtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICB9XG5cbiAgICAgIC5jb250ZW50IHtcbiAgICAgICAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbiAgICAgICAgbWF4LWhlaWdodDogMTAwcHg7XG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgICBjb2xvcjogIzg2Nzc2MDtcbiAgICAgIH1cblxuICAgICAgLm5hbWUge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogLTclO1xuICAgICAgICBsZWZ0OiA3JTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgY29sb3I6ICM2NjI2MTY7XG4gICAgICAgIGZvbnQtc2l6ZTogJHt1bnNhZmVDU1MoYCR7Rk9OVF9TSVpFLzJ9cHhgKX07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICAgIGJhY2tncm91bmQ6ICNkNjgwMzM7XG4gICAgICAgIHBhZGRpbmc6IDVweCAxMHB4IDVweCAxMHB4O1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNWRlZyk7XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMudGV4dCkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gaHRtbGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzcGVlY2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj4ke3RoaXMubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj4ke3RoaXMudGV4dH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd0ZXh0LWRpYWxvZycsIFRleHREaWFsb2cpOyIsImltcG9ydCB7IExpdEVsZW1lbnQsIHN2ZyAgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5jbGFzcyBWaXJ0dWFsQ29udHJvbGxlciBleHRlbmRzIExpdEVsZW1lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY2xpY2tlZE9wYWNpdHkgPSAxO1xuICAgIHRoaXMuX2RlZmF1bHRPcGFjaXR5ID0gMC40O1xuICAgIHRoaXMuX2ZpbGwgPSAnI2Y3ZWRlMic7XG4gICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4gZW50cnkudGFyZ2V0LnJlc2l6ZWRDYWxsYmFjaygpKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGlja0hhbmRsZXJzOiB7IHR5cGU6IE9iamVjdCB9XG4gICAgfTtcbiAgfVxuXG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9yZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcyk7XG4gIH1cblxuICByZXNpemVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5yZXF1ZXN0VXBkYXRlKCk7XG4gIH1cblxuICBfbW91c2VEb3duSGFuZGxlcihldmVudCwgZGlyKSB7XG4gICAgc3dpdGNoIChkaXIpIHtcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICB0aGlzLmNsaWNrSGFuZGxlcnMubGVmdC5tb3VzZURvd24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVycy5yaWdodC5tb3VzZURvd24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgdGhpcy5jbGlja0hhbmRsZXJzLmRvd24ubW91c2VEb3duKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndXAnOlxuICAgICAgICB0aGlzLmNsaWNrSGFuZGxlcnMudXAubW91c2VEb3duKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywgdGhpcy5fY2xpY2tlZE9wYWNpdHkpO1xuICB9XG5cbiAgX21vdXNlVXBIYW5kbGVyKGV2ZW50LCBkaXIpIHtcbiAgICBzd2l0Y2ggKGRpcikge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVycy5sZWZ0Lm1vdXNlVXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVycy5yaWdodC5tb3VzZVVwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVycy5kb3duLm1vdXNlVXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1cCc6XG4gICAgICAgIHRoaXMuY2xpY2tIYW5kbGVycy51cC5tb3VzZVVwKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKCdvcGFjaXR5JywgdGhpcy5fZGVmYXVsdE9wYWNpdHkpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCByYWRpdXMgPSBoZWlnaHQvMjtcbiAgICBjb25zdCBidXR0b25TaXplID0gaGVpZ2h0LzM7XG4gICAgY29uc3QgYnV0dG9ucyA9IFtcbiAgICAgIHsgZGlyOiAndXAnLCB4OiB3aWR0aC8zLCB5OiAwIH0sXG4gICAgICB7IGRpcjogJ2Rvd24nLCB4OiB3aWR0aC8zLCB5OiAyKmhlaWdodC8zIH0sXG4gICAgICB7IGRpcjogJ3JpZ2h0JywgeDogMip3aWR0aC8zLCB5OiBoZWlnaHQvMyB9LFxuICAgICAgeyBkaXI6ICdsZWZ0JywgeDogMCwgeTogaGVpZ2h0LzMgfVxuICAgIF07XG4gICAgcmV0dXJuIHN2Z2BcbiAgICAgIDxzdmdcbiAgICAgICAgdmlld0JveD1cIjAgMCAke3dpZHRofSAke2hlaWdodH1cIlxuICAgICAgICB3aWR0aD1cIiR7d2lkdGh9XCJcbiAgICAgICAgaGVpZ2h0PVwiJHtoZWlnaHR9XCJcbiAgICAgID5cbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgPGNsaXBQYXRoIGlkPVwiY2lyY2xlLWNsaXBcIj5cbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIke3dpZHRoLzJ9XCIgY3k9XCIke2hlaWdodC8yfVwiIHI9XCIke3JhZGl1c31cIiAvPlxuICAgICAgICAgIDwvY2xpcFBhdGg+XG4gICAgICA8L2RlZnM+XG4gICAgICAke2J1dHRvbnMubWFwKGIgPT5cbiAgICAgICAgc3ZnYFxuICAgICAgICAgIDxyZWN0XG4gICAgICAgICAgICBjbGFzcz1cImJ1dHRvbi1kaXJlY3Rpb25cIlxuICAgICAgICAgICAgQG1vdXNlZG93bj0keyhlKSA9PiB7IHRoaXMuX21vdXNlRG93bkhhbmRsZXIoZSwgYi5kaXIpOyB9fVxuICAgICAgICAgICAgQG1vdXNldXA9JHsoZSkgPT4geyB0aGlzLl9tb3VzZVVwSGFuZGxlcihlLCBiLmRpcik7IH19XG4gICAgICAgICAgICBAdG91Y2hzdGFydD0keyhlKSA9PiB7IHRoaXMuX21vdXNlRG93bkhhbmRsZXIoZSwgYi5kaXIpOyB9fVxuICAgICAgICAgICAgQHRvdWNoZW5kPSR7KGUpID0+IHsgdGhpcy5fbW91c2VVcEhhbmRsZXIoZSwgYi5kaXIpOyB9fVxuICAgICAgICAgICAgY2xpcC1wYXRoPVwidXJsKCNjaXJjbGUtY2xpcClcIlxuICAgICAgICAgICAgeD1cIiR7Yi54fVwiXG4gICAgICAgICAgICB5PVwiJHtiLnl9XCJcbiAgICAgICAgICAgIG9wYWNpdHk9XCIke3RoaXMuX2RlZmF1bHRPcGFjaXR5fVwiXG4gICAgICAgICAgICB3aWR0aD1cIiR7YnV0dG9uU2l6ZX1cIlxuICAgICAgICAgICAgaGVpZ2h0PVwiJHtidXR0b25TaXplfVwiXG4gICAgICAgICAgICBmaWxsPVwiJHt0aGlzLl9maWxsfVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgYFxuICAgICAgKX1cbiAgICA8L3N2Zz5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndmlydHVhbC1jb250cm9sbGVyJywgVmlydHVhbENvbnRyb2xsZXIpOyIsImltcG9ydCB7XG4gIEdhbWUsXG4gIEVuZ2luZSxcbiAgQ29udHJvbGxlcixcbiAgQ2FtZXJhLFxuICBEaXNwbGF5LFxuICBHYW1lTWFwXG59IGZyb20gJy4vcGFydHMvaW5kZXguanMnO1xuXG5pbXBvcnQgeyBXT1JMRCB9IGZyb20gJy4vcGFydHMvYXNzZXQtaW5mby5qcyc7XG5cbmV4cG9ydCBjbGFzcyBHYW1lSW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3IoY2FudmFzKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgX2Rpc3BhdGNoRXZlbnQoZGV0YWlsKSB7XG4gICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdnYW1lLXNwZWVjaCcsIHtcbiAgICAgIGRldGFpbCxcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBjb21wb3NlZDogdHJ1ZVxuICAgIH0pO1xuICAgIHRoaXMuY2FudmFzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5fY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKCk7XG4gICAgY29uc3QgeyBjYW1lcmFXaWR0aCwgY2FtZXJhSGVpZ2h0IH0gPSB0aGlzLl9jb21wdXRlQ2FtZXJhRGltZW5zaW9ucygpO1xuICAgIHRoaXMuX2dhbWVNYXAgPSBuZXcgR2FtZU1hcChXT1JMRCwgY2FtZXJhV2lkdGgsIGNhbWVyYUhlaWdodCk7XG4gICAgY29uc3QgeyBjYW1lcmFYLCBjYW1lcmFZIH0gPSB0aGlzLl9jb21wdXRlQ2FtZXJhSW5pdFBvc2l0aW9uKGNhbWVyYVdpZHRoLCBjYW1lcmFIZWlnaHQpO1xuICAgIHRoaXMuX2NhbWVyYSA9IG5ldyBDYW1lcmEoY2FtZXJhV2lkdGgsIGNhbWVyYUhlaWdodCwgY2FtZXJhWCwgY2FtZXJhWSk7XG4gICAgdGhpcy5fZGlzcGxheSA9IG5ldyBEaXNwbGF5KHRoaXMuY2FudmFzLCB0aGlzLl9nYW1lTWFwLCB0aGlzLl9jYW1lcmEsIGNhbWVyYVdpZHRoLCBjYW1lcmFIZWlnaHQpO1xuICAgIHRoaXMuX2dhbWUgPSBuZXcgR2FtZSh0aGlzLl9nYW1lTWFwLCB0aGlzLl9jYW1lcmEsIHRoaXMuX2Rpc3BhdGNoRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fZW5naW5lID0gbmV3IEVuZ2luZSh0aGlzLl9yZW5kZXIuYmluZCh0aGlzKSwgdGhpcy5fdXBkYXRlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgX2NvbXB1dGVDYW1lcmFEaW1lbnNpb25zKCkge1xuICAgIGNvbnN0IHsgY2FtZXJhU2l6ZSB9ID0gV09STEQ7XG4gICAgbGV0IHJhdGlvV2lkdGgsIHJhdGlvSGVpZ2h0O1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGhlaWdodCA+IHdpZHRoKSB7XG4gICAgICByYXRpb1dpZHRoID0gMTtcbiAgICAgIHJhdGlvSGVpZ2h0ID0gaGVpZ2h0L3dpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICByYXRpb0hlaWdodCA9IDE7XG4gICAgICByYXRpb1dpZHRoID0gd2lkdGgvaGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgY2FtZXJhSGVpZ2h0OiBjYW1lcmFTaXplKnJhdGlvSGVpZ2h0LFxuICAgICAgY2FtZXJhV2lkdGg6IGNhbWVyYVNpemUqcmF0aW9XaWR0aFxuICAgIH07XG4gIH1cblxuICBfY29tcHV0ZUNhbWVyYUluaXRQb3NpdGlvbihjYW1lcmFXaWR0aCwgY2FtZXJhSGVpZ2h0KSB7XG4gICAgY29uc3QgZmlyc3RQb3NpdGlvbiA9IHRoaXMuX2dhbWVNYXAuc3RhcnRQb3NpdGlvbnNbdGhpcy5fZ2FtZU1hcC5zdGFydFBvc2l0aW9ucy5sZW5ndGggLSAxXTtcbiAgICB0aGlzLl9nYW1lTWFwLnN0YXJ0UG9zaXRpb25zLnBvcCgpO1xuICAgIHJldHVybiB7XG4gICAgICBjYW1lcmFYOiBmaXJzdFBvc2l0aW9uWzBdIC0gY2FtZXJhV2lkdGgvMixcbiAgICAgIGNhbWVyYVk6IGZpcnN0UG9zaXRpb25bMV0gLSBjYW1lcmFIZWlnaHQvMlxuICAgIH07XG4gIH1cblxuICBfcmVuZGVyKCkge1xuICAgIHRoaXMuX2Rpc3BsYXkuZHJhd01hcCgwKTtcbiAgICB0aGlzLl9kaXNwbGF5LmRyYXdDaGFyYWN0ZXJzKHRoaXMuX2dhbWUuZ2V0Q2hhcmFjdGVyc0Rpc3BsYXlJbmZvKCkpO1xuICAgIHRoaXMuX2Rpc3BsYXkuZHJhd01hcCgxKTtcbiAgICB0aGlzLl9kaXNwbGF5LnJlbmRlcigpO1xuICB9XG5cbiAgcGxheWVyR29MZWZ0KCkge1xuICAgIHRoaXMuX2NvbnRyb2xsZXIuc2V0QWN0aXZlRGlyZWN0aW9uKCdsZWZ0Jyk7XG4gIH1cblxuICBwbGF5ZXJHb1JpZ2h0KCkge1xuICAgIHRoaXMuX2NvbnRyb2xsZXIuc2V0QWN0aXZlRGlyZWN0aW9uKCdyaWdodCcpO1xuICB9XG5cbiAgcGxheWVyR29VcCgpIHtcbiAgICB0aGlzLl9jb250cm9sbGVyLnNldEFjdGl2ZURpcmVjdGlvbigndXAnKTtcbiAgfVxuXG4gIHBsYXllckdvRG93bigpIHtcbiAgICB0aGlzLl9jb250cm9sbGVyLnNldEFjdGl2ZURpcmVjdGlvbignZG93bicpO1xuICB9XG5cbiAgcGxheWVyU3RvcCgpIHtcbiAgICB0aGlzLl9jb250cm9sbGVyLnNldEFjdGl2ZURpcmVjdGlvbihudWxsKTtcbiAgfVxuXG4gIF91cGRhdGUoKSB7XG4gICAgdGhpcy5fZ2FtZS51cGRhdGUoKTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLl9jb250cm9sbGVyLmdldEFjdGl2ZURpcmVjdGlvbigpO1xuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgdGhpcy5fZ2FtZS5tb3ZlTGVmdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgdGhpcy5fZ2FtZS5tb3ZlUmlnaHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1cCc6XG4gICAgICAgIHRoaXMuX2dhbWUubW92ZVVwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgIHRoaXMuX2dhbWUubW92ZURvd24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLl9nYW1lLnNldElkbGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5fZW5naW5lLnN0YXJ0KCk7XG4gIH1cbn0iLCIvKipcbiAqIE1peGluIHRoYXQgY29udGFpbnMgdGhlIGNvbW1vbiBjb2xsaXNpb24gZGV0ZWN0aW9uXG4gKiBtZXRob2RzLlxuICogdGhpcy5fcG9pbnRDb2xsaXNpb24gaXMgc3BlY2lmaWMgdG8gdGhlIGNsYXNzIHVzaW5nIHRoaXMgbWl4aW4uXG4gKiBGb3IgaW5zdGFuY2U6XG4gKiAtIG5wYzogX3BvaW50Q29sbGlzaW9uID0gaXMgd2l0aGluIG5wYyBib3VuZGFyeVxuICogLSBtYXA6IF9wb2ludENvbGxpc2lvbiA9IGlzIHdpdGhpbiBhbnkgb2YgdGhlIG9ic3RhY2xlIG9mIHRoZSBtYXBcbiAqIEBwYXJhbSB7Kn0gYmFzZSAtIGJhc2UgY2xhc3MgdG8gZXh0ZW50XG4gKi9cbmNvbnN0IENvbGxpc2lvbkRldGVjdG9yID0gYmFzZSA9PiB7XG5cdHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuXHRcdGNvbnN0cnVjdG9yKGNvbmZpZykge1xuXHRcdFx0c3VwZXIoY29uZmlnKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDaGVja3Mgd2hldGhlciBwb2ludHMgb2YgYSBzZWdtZW50XG5cdFx0ICogY29sbGlkZXMgd2l0aCBvYnN0YWNsZXMgdXNpbmcgX3BvaW50RGV0ZWN0aW9uXG5cdFx0ICogTG9vcHMgYWxvbmcgdGhlIGNvbnN0YW50IGNvb3JkaW5hdGVcblx0XHQgKiBAcGFyYW0geyp9IGNvbnN0YW50Q29vcmRcblx0XHQgKiBAcGFyYW0geyp9IHN0YXJ0Q29vcmRcblx0XHQgKiBAcGFyYW0geyp9IGxlbmd0aFxuXHRcdCAqIEBwYXJhbSB7Kn0gaXNIb3Jpem9udGFsXG5cdFx0ICovXG5cdFx0X3NlZ21lbnRDb2xsaXNpb24oY29uc3RhbnRDb29yZCwgc3RhcnRDb29yZCwgbGVuZ3RoLCBpc0hvcml6b250YWwpIHtcblx0XHRcdGxldCBjb2xsaXNpb24gPSBmYWxzZTtcblx0XHRcdGxldCBpbmNyZW1lbnQgPSAxOyAvLyBpbiBweFxuXHRcdFx0Zm9yKGxldCBpID0gc3RhcnRDb29yZDsgaSA8IHN0YXJ0Q29vcmQgKyBsZW5ndGggOyBpKz0gaW5jcmVtZW50KSB7XG5cdFx0XHRcdGNvbGxpc2lvbiA9IGNvbGxpc2lvbiB8fFxuXHRcdFx0XHRcdChpc0hvcml6b250YWwgPyB0aGlzLl9wb2ludENvbGxpc2lvbihpLCBjb25zdGFudENvb3JkKSA6IHRoaXMuX3BvaW50Q29sbGlzaW9uKGNvbnN0YW50Q29vcmQsIGkpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBjb2xsaXNpb247XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogRGV0ZWN0cyB3aGV0aGVyIGEgZm9yZWlnbiBvYmplY3QgZGVmaW5lZCBieSBhIHJlY3Q6XG5cdFx0ICogKHgseSkgaXMgdGhlIHRvcCBsZWZ0IGNvcm5lciBhbmQgd2lkdGggYW5kIHdpZ2h0XG5cblx0XHQgXHRcdFx0XHRcdFx0Zm9yZWlnbiBvYmplY3Rcblx0XHRcdCh4LHkpIC0+ICArLS0tLS0tLS0tLS0rIDwtICh4ICsgd2lkdGgsIHkpXG5cdFx0XHRcdFx0XHRcdFx0fCAgICAgICAgICAgfFxuXHRcdFx0XHRcdFx0XHRcdHwgICAgICAgICAgIHxcblx0XHRcdFx0XHRcdFx0XHR8ICAgICAgICAgICB8XG5cdFx0XHRcdFx0XHRcdFx0Ky0tLS0tLS0tLS0tKyA8LSAoeCArIHdpZHRoLCB5ICsgaGVpZ2h0KVxuXHRcdFx0XHRcdFx0XHRcdCA8LSB3aWR0aCAtPlxuXG5cdFx0ICogaGFzIG9uZSBvZiBpdHMgZm91ciBzaWRlIGNvbGxpZGluZyB3aXRoIG9uZSBvZiB0aGUgb2J0YWNsZVxuXHRcdCAqIEBwYXJhbSB7Kn0geFxuXHRcdCAqIEBwYXJhbSB7Kn0geVxuXHRcdCAqIEBwYXJhbSB7Kn0gd2lkdGhcblx0XHQgKiBAcGFyYW0geyp9IGhlaWdodFxuXHRcdCAqIEBwYXJhbSB7Kn0gb2Zmc2V0XG5cdFx0ICovXG5cdFx0Y29sbGlzaW9uKCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBvZmZzZXQgKSB7XG5cdFx0XHQvLyByaWdodFxuXHRcdFx0Y29uc3QgY29uc3RhbnRYUmlnaHQgPSB4ICsgd2lkdGggKyBvZmZzZXQ7XG5cdFx0XHRjb25zdCByaWdodCA9IHRoaXMuX3NlZ21lbnRDb2xsaXNpb24oY29uc3RhbnRYUmlnaHQsIHksIGhlaWdodCwgZmFsc2UpO1xuXG5cdFx0XHQvLyBsZWZ0XG5cdFx0XHRjb25zdCBjb25zdGFudFhMZWZ0ID0geCAtIG9mZnNldDtcblx0XHRcdGNvbnN0IGxlZnQgPSB0aGlzLl9zZWdtZW50Q29sbGlzaW9uKGNvbnN0YW50WExlZnQsIHksIGhlaWdodCwgZmFsc2UpO1xuXG5cdFx0XHQvLyB0b3Bcblx0XHRcdGNvbnN0IGNvbnN0YW50WVRvcCA9IHkgLSBvZmZzZXQ7XG5cdFx0XHRjb25zdCB0b3AgPSB0aGlzLl9zZWdtZW50Q29sbGlzaW9uKGNvbnN0YW50WVRvcCwgeCwgd2lkdGgsIHRydWUpO1xuXG5cdFx0XHQvLyBib3R0b21cblx0XHRcdGNvbnN0IGNvbnN0YW50WUJvdHRvbSA9IHkgKyBoZWlnaHQgKyBvZmZzZXQ7XG5cdFx0XHRjb25zdCBib3R0b20gPSB0aGlzLl9zZWdtZW50Q29sbGlzaW9uKGNvbnN0YW50WUJvdHRvbSwgeCwgd2lkdGgsIHRydWUpO1xuXG5cdFx0XHRyZXR1cm4geyBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20gfTtcblx0XHR9XG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb2xsaXNpb25EZXRlY3RvcjsiLCJjb25zdCBJbWFnZUxvYWRlciA9IGJhc2UgPT4ge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuICAgICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IGNvbmZpZy5zcmM7XG4gICAgICB9XG5cbiAgICAgIGdldEltYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2U7XG4gICAgICB9XG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxvYWRlcjsiLCJleHBvcnQgeyBkZWZhdWx0IGFzIEltYWdlTG9hZGVyIH0gZnJvbSAnLi9pbWFnZS1sb2FkZXIuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdGF0ZUhhbmRsZXIgfSBmcm9tICcuL3N0YXRlLWhhbmRsZXIuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDb2xsaXNpb25EZXRlY3RvciB9IGZyb20gJy4vY29sbGlzaW9uLWRldGVjdG9yLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTXVsdGlNaXhpbnMgfSBmcm9tICcuL211bHRpLW1peGlucy5qcyc7IiwiZnVuY3Rpb24gTXVsdGlNaXhpbnMobWl4aW5zKSB7XG4gIGxldCBfbWl4aW5zID0gbWl4aW5zO1xuICBpZiAoIUFycmF5LmlzQXJyYXkobWl4aW5zKSkge1xuICAgIF9taXhpbnMgPSBbIG1peGlucyBdO1xuICB9XG5cbiAgbGV0IF9jbGFzcyA9IGNsYXNzIHt9O1xuICBfbWl4aW5zLmZvckVhY2gobWl4aW4gPT4ge1xuICAgIF9jbGFzcyA9IG1peGluKF9jbGFzcyk7XG4gIH0pO1xuXG4gIHJldHVybiBfY2xhc3M7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE11bHRpTWl4aW5zOyIsImltcG9ydCBGcmFtZUFuaW1hdG9yIGZyb20gJy4uL3V0aWxzL2ZyYW1lLWFuaW1hdG9yJztcblxuY29uc3QgU3RhdGVIYW5kbGVyID0gYmFzZSA9PiB7XG4gIHJldHVybiBjbGFzcyBleHRlbmRzIGJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKGFzc2V0SW5mbykge1xuICAgICAgc3VwZXIoYXNzZXRJbmZvKTtcbiAgICAgIHRoaXMuX21vdmVTZXF1ZW5jZXMgPSBhc3NldEluZm8ubW92ZVNlcXVlbmNlcztcbiAgICAgIHRoaXMuX2FjdGlvbnMgPSBPYmplY3Qua2V5cyhhc3NldEluZm8ubW92ZVNlcXVlbmNlcyk7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgICB0aGlzLl90aW1lciA9IDA7XG4gICAgICB0aGlzLl9kZWxheSA9IGFzc2V0SW5mby5kZWxheTtcbiAgICAgIHRoaXMuX2ZyYW1lQW5pbWF0b3IgPSBuZXcgRnJhbWVBbmltYXRvcihhc3NldEluZm8sIHRoaXMuX3N0YXRlKTtcbiAgICB9XG5cbiAgICBfaW5pdCgpIHtcbiAgICAgIHRoaXMuX3N0YXRlID0ge1xuICAgICAgICBhY3Rpb246IHRoaXMuX2FjdGlvbnNbMF0sXG4gICAgICAgIGFjdGlvblNlcXVlbmNlSW5kZXg6IHt9XG4gICAgICB9O1xuICAgICAgdGhpcy5fYWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuX3N0YXRlLmFjdGlvblNlcXVlbmNlSW5kZXhbYWN0aW9uXSA9IDA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBfdXBkYXRlU3RhdGUobmV3QWN0aW9uKSB7XG4gICAgICBpZiAodGhpcy5fc3RhdGUuYWN0aW9uICE9PSBuZXdBY3Rpb24pIHtcbiAgICAgICAgLy8gaWYgbmV3IGFjdGlvbiwgd2UgcmVzZXQgdGhlIHRpbWVyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gMDtcbiAgICAgICAgLy8gdXBkYXRlIGN1cnJlbnQgYWN0aW9uXG4gICAgICAgIHRoaXMuX3N0YXRlLmFjdGlvbiA9IG5ld0FjdGlvbjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNlcXVlbmNlTGVuID0gdGhpcy5fbW92ZVNlcXVlbmNlc1tuZXdBY3Rpb25dLmxlbmd0aDtcbiAgICAgIC8vIHRpbWVyIGlzIHVwID0+IGdvIHRvIHRoZSBuZXh0IGZyYW1lIGZyb20gdGhlIHNlcXVlbmNlXG4gICAgICBpZiAodGhpcy5fdGltZXIgPj0gdGhpcy5fZGVsYXkpIHtcbiAgICAgICAgdGhpcy5fdGltZXIgPSAwO1xuICAgICAgICAvLyBpbmNyZW1lbnQgdGhlIGN1cnJlbnQgYWN0aW9uXG4gICAgICAgIHRoaXMuX3N0YXRlLmFjdGlvblNlcXVlbmNlSW5kZXhbbmV3QWN0aW9uXSA9ICh0aGlzLl9zdGF0ZS5hY3Rpb25TZXF1ZW5jZUluZGV4W25ld0FjdGlvbl0gKyAxKSAlIHNlcXVlbmNlTGVuO1xuICAgICAgfVxuICAgICAgdGhpcy5fdGltZXIrKztcbiAgICB9XG5cbiAgICBnZXRNb3ZlU3RhdGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY3Rpb246IHRoaXMuX3N0YXRlLmFjdGlvbixcbiAgICAgICAgc2VxdWVuY2VJbmRleDogdGhpcy5fc3RhdGUuYWN0aW9uU2VxdWVuY2VJbmRleFt0aGlzLl9zdGF0ZS5hY3Rpb25dXG4gICAgICB9O1xuICAgIH1cblxuICBcdGdldEN1cnJlbnRGcmFtZSgpIHtcbiAgXHRcdGNvbnN0IHsgYWN0aW9uLCBzZXF1ZW5jZUluZGV4IH0gPSB0aGlzLmdldE1vdmVTdGF0ZSgpO1xuICBcdFx0cmV0dXJuIHRoaXMuX2ZyYW1lQW5pbWF0b3IuZ2V0Q3VycmVudEZyYW1lKGFjdGlvbiwgc2VxdWVuY2VJbmRleCk7XG4gIFx0fVxuXG4gIFx0bW92ZVJpZ2h0KCkge1xuICBcdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ3dhbGtfcmlnaHQnKTtcbiAgXHR9XG5cbiAgXHRtb3ZlTGVmdCgpIHtcbiAgXHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCd3YWxrX2xlZnQnKTtcbiAgXHR9XG5cbiAgXHRtb3ZlVXAoKSB7XG4gIFx0XHR0aGlzLl91cGRhdGVTdGF0ZSgnd2Fsa191cCcpO1xuICBcdH1cblxuICBcdG1vdmVEb3duKCkge1xuICBcdFx0dGhpcy5fdXBkYXRlU3RhdGUoJ3dhbGtfZG93bicpO1xuICBcdH1cblxuICBcdGZhY2UoZGlyZWN0aW9uKSB7XG4gIFx0XHRyZXR1cm4gdGhpcy5fc3RhdGUuYWN0aW9uLmluZGV4T2YoZGlyZWN0aW9uKSA+PTA7XG4gIFx0fVxuXG4gIFx0c2V0SWRsZSgpIHtcbiAgXHRcdGlmICh0aGlzLmZhY2UoJ3JpZ2h0JykpIHRoaXMuX3VwZGF0ZVN0YXRlKCdpZGxlX3JpZ2h0Jyk7XG4gIFx0XHRpZiAodGhpcy5mYWNlKCdsZWZ0JykpIHRoaXMuX3VwZGF0ZVN0YXRlKCdpZGxlX2xlZnQnKTtcbiAgXHRcdGlmICh0aGlzLmZhY2UoJ3VwJykpIHRoaXMuX3VwZGF0ZVN0YXRlKCdpZGxlX3VwJyk7XG4gIFx0XHRpZiAodGhpcy5mYWNlKCdkb3duJykpIHRoaXMuX3VwZGF0ZVN0YXRlKCdpZGxlX2Rvd24nKTtcbiAgXHR9XG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGF0ZUhhbmRsZXI7IiwiZXhwb3J0IGNvbnN0IFdPUkxEID0ge1xuICBzcmM6ICcuL2Fzc2V0cy9nYXJkZW5fd2l0aF9vY2Vhbi5wbmcnLFxuICBjb2xzOiAxNixcbiAgcm93czogMTYsXG4gIHNpemU6IDY0LCAvLyB0aWxlIHNpemVcbiAgdW5pcXVlS2V5czoge1xuICAgIGNvaW46IDcsXG4gICAgZ3Jhc3M6IDEsXG4gICAgdHJlZV9ib3R0b206IDMsXG4gICAgdHJlZV90b3A6IDQsXG4gICAgcGF0aDogMixcbiAgICBvY2VhbjogNixcbiAgICBidXNoOiA1XG4gIH0sXG4gIGVsZW1lbnRzOiB7XG4gICAgdHJlZToge1xuICAgICAgbGF5ZXJzOiBbIDMgXSwgLy8gdGlsZSBpbmRleCBpbiB0aGUgaW1hZ2VcbiAgICAgIHRvcDogNCwgLy8gdGlsZSBpbmRleCBpbiB0aGUgaW1hZ2VcbiAgICAgIGtleTogMyAvLyBrZXkgaW4gcGxheWFibGVBcmVhS2V5c1xuICAgIH0sXG4gICAgZ3Jhc3M6IHtcbiAgICAgIGxheWVyczogWyAxIF0sIC8vIHRpbGUgaW5kZXggaW4gdGhlIGltYWdlXG4gICAgICBrZXk6IDEgLy8ga2V5IGluIHBsYXlhYmxlQXJlYUtleXNcbiAgICB9LFxuICAgIHBhdGg6IHtcbiAgICAgIGxheWVyczogWyAyIF0sIC8vIHRpbGUgaW5kZXggaW4gdGhlIGltYWdlXG4gICAgICBrZXk6IDIgLy8ga2V5IGluIHBsYXlhYmxlQXJlYUtleXNcbiAgICB9LFxuICAgIGNvaW5fb25fZ3Jhc3M6IHtcbiAgICAgIGxheWVyczogWyAxLCA3IF0sIC8vIHRpbGUgaW5kZXggaW4gdGhlIGltYWdlXG4gICAgICBrZXk6IDQgLy8ga2V5IGluIHBsYXlhYmxlQXJlYUtleXNcbiAgICB9LFxuICAgIGNvaW5fb25fcGF0aDoge1xuICAgICAgbGF5ZXJzOiBbIDIsIDcgXSwgLy8gdGlsZSBpbmRleCBpbiB0aGUgaW1hZ2VcbiAgICAgIGtleTogNyAvLyBrZXkgaW4gcGxheWFibGVBcmVhS2V5c1xuICAgIH0sXG4gICAgb2NlYW46IHtcbiAgICAgIGxheWVyczogWyA2IF0sIC8vIHRpbGUgaW5kZXggaW4gdGhlIGltYWdlXG4gICAgICBrZXk6IDYgLy8ga2V5IGluIHBsYXlhYmxlQXJlYUtleXNcbiAgICB9LFxuICAgIGJ1c2g6IHtcbiAgICAgIGxheWVyczogWyAxLCA1IF0sICAvLyB0aWxlIGluZGV4IGluIHRoZSBpbWFnZVxuICAgICAga2V5OiA1IC8vIGtleSBpbiBwbGF5YWJsZUFyZWFLZXlzXG4gICAgfSxcbiAgICBzdGFydF9wb3NpdGlvbjoge1xuICAgICAgbGF5ZXJzOiBbIDEgXSxcbiAgICAgIGtleTogLTFcbiAgICB9XG4gIH0sXG4gIGNhbWVyYVNpemU6IDcwMCxcbiAgb2JzdGFjbGVzOiBuZXcgU2V0KFsgMywgNiwgNSBdKSwgLy8ga2V5cyBoZXJlXG4gIHBsYXlhYmxlQXJlYUtleXM6IFtcbiAgICAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLCAzLFxuICAgIDMsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDMsXG4gICAgMywgNCwgNCwgNCwgNCwgMSwgNCwgMSwgMSwgMSwgNCwgMSwgMSwgNCwgMSwgMyxcbiAgICAzLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAtMSwgMSwgMSwgMywgMSwgMyxcbiAgICAzLCAxLCAtMSwgNSwgMSwgMSwgMSwgMywgMSwgMSwgMSwgNCwgNCwgMSwgMSwgMyxcbiAgICAzLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAzLFxuICAgIDMsIDEsIDEsIDEsIDQsIDEsIDEsIDMsIDEsIDEsIDUsIDEsIDEsIDEsIDEsIDMsXG4gICAgMywgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMyxcbiAgICAzLCAxLCA1LCAxLCAxLCAxLCAxLCAxLCAxLCAxLCA0LCAxLCA1LCAxLCAxLCAzLFxuICAgIDMsIDEsIDEsIDEsIDEsIDEsIDEsIDIsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDMsXG4gICAgMywgMSwgNCwgLTEsIDQsIDEsIDEsIDIsIDIsIDEsIDEsIDEsIDEsIDEsIDEsIDMsXG4gICAgMywgMSwgMSwgMSwgMSwgNSwgMSwgMiwgMiwgMSwgMSwgNCwgMSwgMSwgMSwgMyxcbiAgICAzLCAxLCA0LCAxLCAxLCAxLCAxLCA3LCAyLCAxLCAxLCAxLCAxLCA0LCAxLCAzLFxuICAgIDMsIDEsIDMsIDQsIDEsIDEsIDQsIDIsIDIsIDEsIDEsIDEsIC0xLCAxLCAzLCAzLFxuICAgIDMsIDQsIDEsIC0xLCAxLCAxLCAxLCAyLCAyLCAxLCAxLCAxLCAxLCAxLCAxLCAzLFxuICAgIDMsIDMsIDMsIDMsIDMsIDMsIDMsIDIsIDIsIDMsIDMsIDMsIDMsIDMsIDMsIDNcbiAgXVxufTtcblxuZXhwb3J0IGNvbnN0IFBMQVlFUiA9IHtcbiAgc3JjOiAnLi9hc3NldHMvbW9pLnBuZycsXG4gIGNvbHM6IDQsXG4gIHJvd3M6IDQsXG4gIHdpZHRoOiAzNiwgLy8gdGlsZSBzaXplXG4gIGhlaWdodDogNDgsIC8vIHRpbGUgc2l6ZVxuICBtb3ZlU2VxdWVuY2VzOiB7XG4gICAgJ2lkbGVfZG93bic6WyBbIDAsIDAgXSBdLCAvLyBpbml0aWFsIHN0YXRlXG4gICAgJ3dhbGtfZG93bic6IFsgWyAxLCAwIF0sIFsgMiwgMCBdLCBbIDMsIDAgXSBdLFxuICAgICd3YWxrX2xlZnQnOiBbIFsgMSwgMSBdLCBbIDIsIDEgXSwgWyAzLCAxIF0gXSxcbiAgICAnaWRsZV9sZWZ0JzpbIFsgMCwxIF0gXSxcbiAgICAnd2Fsa191cCc6IFsgWyAxLCAyIF0sIFsgMiwgMiBdLCBbIDMsIDIgXSBdLFxuICAgICdpZGxlX3VwJzpbIFsgMCwyIF0gXSxcbiAgICAnd2Fsa19yaWdodCc6IFsgWyAxLCAzIF0sIFsgMiwgMyBdLCBbIDMsIDMgXSBdLFxuICAgICdpZGxlX3JpZ2h0JzpbIFsgMCwzIF0gXVxuICB9LFxuICBkZWxheTogNVxufTtcblxuZXhwb3J0IGNvbnN0IENBVCA9IHtcbiAgc3JjOiAnLi9hc3NldHMvY2F0LWZyYW1lcy5wbmcnLFxuICBjb2xzOiAyLFxuICByb3dzOiAxLFxuICBzaXplOiA0MCwgLy8gdGlsZSBzaXplXG4gIG1vdmVTZXF1ZW5jZXM6IHtcbiAgICAnaWRsZV9kb3duJzogWyBbIDEsIDAgXSwgWyAxLCAzIF0gXSwgIC8vIGluaXRpYWwgc3RhdGVcbiAgICAnaWRsZV91cCc6IFsgWyA0LCAwIF0sIFsgNCwgMyBdIF0sXG4gICAgJ2lkbGVfbGVmdCc6IFsgWyAyLCAwIF0sIFsgMiwgMyBdIF0sXG4gICAgJ2lkbGVfcmlnaHQnOiBbIFsgMywgMCBdLCBbIDMsIDMgXSBdLFxuICAgICd3YWxrX3VwJzogWyBbIDQsIDEgXSwgWyA0LCAyIF0gXSxcbiAgICAnd2Fsa19yaWdodCc6IFsgWyAzLCAxIF0sIFsgMywgMCBdLCAgWyAzLCAyIF0sIFsgMywgMyBdIF0sXG4gICAgJ3dhbGtfbGVmdCc6IFsgWyAyLCAxIF0sIFsgMiwgMCBdLCAgWyAyLCAyIF0sIFsgMiwgMyBdIF0sXG4gICAgJ3dhbGtfZG93bic6IFsgWyAxLCAxIF0sIFsgMSwgMCBdLCBbIDEsIDIgXSwgWyAxLCAzIF0gXVxuICB9LFxuICBkZWxheTogMTBcbn07XG5cbmV4cG9ydCBjb25zdCBDQVQyID0ge1xuICBzcmM6ICcuL2Fzc2V0cy9jYXQtZnJhbWVzLTIucG5nJyxcbiAgY29sczogMixcbiAgcm93czogMSxcbiAgc2l6ZTogNDAsIC8vIHRpbGUgc2l6ZVxuICBtb3ZlU2VxdWVuY2VzOiB7XG4gICAgJ2lkbGVfZG93bic6IFsgWyAxLCAwIF0sIFsgMSwgMyBdIF0sICAvLyBpbml0aWFsIHN0YXRlXG4gICAgJ2lkbGVfdXAnOiBbIFsgNCwgMCBdLCBbIDQsIDMgXSBdLFxuICAgICdpZGxlX2xlZnQnOiBbIFsgMiwgMCBdLCBbIDIsIDMgXSBdLFxuICAgICdpZGxlX3JpZ2h0JzogWyBbIDMsIDAgXSwgWyAzLCAzIF0gXSxcbiAgICAnd2Fsa191cCc6IFsgWyA0LCAxIF0sIFsgNCwgMiBdIF0sXG4gICAgJ3dhbGtfcmlnaHQnOiBbIFsgMywgMSBdLCBbIDMsIDAgXSwgIFsgMywgMiBdLCBbIDMsIDMgXSBdLFxuICAgICd3YWxrX2xlZnQnOiBbIFsgMiwgMSBdLCBbIDIsIDAgXSwgIFsgMiwgMiBdLCBbIDIsIDMgXSBdLFxuICAgICd3YWxrX2Rvd24nOiBbIFsgMSwgMSBdLCBbIDEsIDAgXSwgWyAxLCAyIF0sIFsgMSwgMyBdIF1cbiAgfSxcbiAgZGVsYXk6IDEwXG59O1xuXG5leHBvcnQgY29uc3QgQ0FUMyA9IHtcbiAgc3JjOiAnLi9hc3NldHMvY2F0LWZyYW1lcy0zLnBuZycsXG4gIGNvbHM6IDIsXG4gIHJvd3M6IDEsXG4gIHNpemU6IDQwLCAvLyB0aWxlIHNpemVcbiAgbW92ZVNlcXVlbmNlczoge1xuICAgICdpZGxlX2Rvd24nOiBbIFsgMSwgMCBdLCBbIDEsIDMgXSBdLCAgLy8gaW5pdGlhbCBzdGF0ZVxuICAgICdpZGxlX3VwJzogWyBbIDQsIDAgXSwgWyA0LCAzIF0gXSxcbiAgICAnaWRsZV9sZWZ0JzogWyBbIDIsIDAgXSwgWyAyLCAzIF0gXSxcbiAgICAnaWRsZV9yaWdodCc6IFsgWyAzLCAwIF0sIFsgMywgMyBdIF0sXG4gICAgJ3dhbGtfdXAnOiBbIFsgNCwgMSBdLCBbIDQsIDIgXSBdLFxuICAgICd3YWxrX3JpZ2h0JzogWyBbIDMsIDEgXSwgWyAzLCAwIF0sICBbIDMsIDIgXSwgWyAzLCAzIF0gXSxcbiAgICAnd2Fsa19sZWZ0JzogWyBbIDIsIDEgXSwgWyAyLCAwIF0sICBbIDIsIDIgXSwgWyAyLCAzIF0gXSxcbiAgICAnd2Fsa19kb3duJzogWyBbIDEsIDEgXSwgWyAxLCAwIF0sIFsgMSwgMiBdLCBbIDEsIDMgXSBdXG4gIH0sXG4gIGRlbGF5OiAxMFxufTtcblxuZXhwb3J0IGNvbnN0IENBVDQgPSB7XG4gIHNyYzogJy4vYXNzZXRzL2NhdC1mcmFtZXMtNC5wbmcnLFxuICBjb2xzOiAyLFxuICByb3dzOiAxLFxuICBzaXplOiA0MCwgLy8gdGlsZSBzaXplXG4gIG1vdmVTZXF1ZW5jZXM6IHtcbiAgICAnaWRsZV9kb3duJzogWyBbIDEsIDAgXSwgWyAxLCAzIF0gXSwgIC8vIGluaXRpYWwgc3RhdGVcbiAgICAnaWRsZV91cCc6IFsgWyA0LCAwIF0sIFsgNCwgMyBdIF0sXG4gICAgJ2lkbGVfbGVmdCc6IFsgWyAyLCAwIF0sIFsgMiwgMyBdIF0sXG4gICAgJ2lkbGVfcmlnaHQnOiBbIFsgMywgMCBdLCBbIDMsIDMgXSBdLFxuICAgICd3YWxrX3VwJzogWyBbIDQsIDEgXSwgWyA0LCAyIF0gXSxcbiAgICAnd2Fsa19yaWdodCc6IFsgWyAzLCAxIF0sIFsgMywgMCBdLCAgWyAzLCAyIF0sIFsgMywgMyBdIF0sXG4gICAgJ3dhbGtfbGVmdCc6IFsgWyAyLCAxIF0sIFsgMiwgMCBdLCAgWyAyLCAyIF0sIFsgMiwgMyBdIF0sXG4gICAgJ3dhbGtfZG93bic6IFsgWyAxLCAxIF0sIFsgMSwgMCBdLCBbIDEsIDIgXSwgWyAxLCAzIF0gXVxuICB9LFxuICBkZWxheTogMTBcbn07XG5cbmV4cG9ydCBjb25zdCBPQ0VBTiA9IHtcbiAgc3JjOiAnLi9hc3NldHMvb2NlYW4tZm91ci1mcmFtZXMucG5nJyxcbiAgY29sczogMyxcbiAgcm93czogMSxcbiAgc2l6ZTogNjMsXG4gIG1vdmVtZW50OiAnd2F2ZScsXG4gIG1vdmVTZXF1ZW5jZXM6IHtcbiAgICAnd2F2ZSc6IFsgWyAwLDAgXSwgWyAwLCAxIF0sIFsgMCwgMiBdLCBbIDAsIDMgXSBdXG4gIH0sXG4gIGRlbGF5OiA1MFxufTtcblxuZXhwb3J0IGNvbnN0IENPSU4gPSB7XG4gIHNyYzogJy4vYXNzZXRzL2NvaW4ucG5nJyxcbiAgY29sczogOCxcbiAgcm93czogMSxcbiAgc2l6ZTogMTYsXG4gIG1vdmVtZW50OiAncm90YXRlJyxcbiAgbW92ZVNlcXVlbmNlczoge1xuICAgICdyb3RhdGUnOiBbIFsgMCwwIF0sIFsgMCwgMSBdLCBbIDAsIDIgXSwgWyAwLCAzIF0sIFsgMCwgNCBdLCBbIDAsIDUgXSwgWyAwLCA2IF0sIFsgMCwgNyBdIF1cbiAgfSxcbiAgZGVsYXk6IDdcbn07XG5cblxuIiwiY29uc3QgQ0FNRVJBX1NQRUVEID0gNTtcblxuLyoqXG4gKiBtYXAgLSBpbnN0YW5jZSBvZiBHYW1lTWFwXG4gKi9cbmNsYXNzIENhbWVyYSB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuc3BlZWQgPSBDQU1FUkFfU1BFRUQ7XG4gICAgdGhpcy5zdG9wID0ge1xuICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgICAgbGVmdDogZmFsc2UsXG4gICAgICB1cDogZmFsc2UsXG4gICAgICBkb3duOiBmYWxzZVxuICAgIH07XG4gIH1cblxuICBtb3ZlUmlnaHQoKSB7XG4gICAgaWYgKHRoaXMuc3RvcC5yaWdodCkgcmV0dXJuO1xuICAgIHRoaXMueCArPSAxO1xuICB9XG5cbiAgbW92ZUxlZnQoKSB7XG4gICAgaWYgKHRoaXMuc3RvcC5sZWZ0KSByZXR1cm47XG4gICAgdGhpcy54IC09IDE7XG4gIH1cblxuICBtb3ZlVXAoKSB7XG4gICAgaWYgKHRoaXMuc3RvcC51cCkgcmV0dXJuO1xuICAgIHRoaXMueSAtPSAxO1xuICB9XG5cbiAgbW92ZURvd24oKSB7XG4gICAgaWYgKHRoaXMuc3RvcC5kb3duKSByZXR1cm47XG4gICAgdGhpcy55ICs9IDE7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnN0b3AucmlnaHQgPSBmYWxzZTtcbiAgICB0aGlzLnN0b3AubGVmdCA9IGZhbHNlO1xuICAgIHRoaXMuc3RvcC51cCA9IGZhbHNlO1xuICAgIHRoaXMuc3RvcC5kb3duID0gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FtZXJhOyIsImNsYXNzIENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9hY3RpdmVEaXJlY3Rpb24gPSBudWxsO1xuICB9XG5cbiAgc2V0QWN0aXZlRGlyZWN0aW9uKGRpcmVjdGlvbikge1xuICAgIHRoaXMuX2FjdGl2ZURpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgfVxuXG4gIGdldEFjdGl2ZURpcmVjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlRGlyZWN0aW9uO1xuICB9XG5cbiAgaXNJZGxlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVEaXJlY3Rpb24gPT09IG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjsiLCJpbXBvcnQgTW92aW5nRWxlbWVudCBmcm9tICcuL21vdmluZy1lbGVtZW50LmpzJztcbmltcG9ydCB7IE9DRUFOLCBDT0lOIH0gZnJvbSAnLi9hc3NldC1pbmZvLmpzJztcblxuY2xhc3MgRGlzcGxheSB7XG4gIGNvbnN0cnVjdG9yKGNhbnZhcywgbWFwLCBjYW1lcmEsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLl9tYXAgPSBtYXA7XG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG4gICAgdGhpcy5faW5pdCgpO1xuICAgIHRoaXMuX2NyZWF0ZUJ1ZmZlckNhbnZhcyhjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG9mZnNjcmVlbiBjYW52YXMgd2hlcmUgZWxlbWVudHMgd2lsbCBiZSBkcmF3blxuICAgKiBvbmUgYWZ0ZXIgdGhlIG90aGVyLCBiZWZvcmUgcmVuZGVyaW5nIHRoZSB3aG9sZSB0aGluZyBvbiB0aGVcbiAgICogb25zY3JlZW4gY2FudmFzXG4gICAqIEBwYXJhbSB7Kn0gd2lkdGhcbiAgICogQHBhcmFtIHsqfSBoZWlnaHRcbiAgICovXG4gIF9jcmVhdGVCdWZmZXJDYW52YXMod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMuYnVmZmVyICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJyksXG4gICAgdGhpcy5idWZmZXIuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5idWZmZXIuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIF9pbml0KCkge1xuICAgIHRoaXMuX21hcEltYWdlID0gdGhpcy5fbWFwLmdldEltYWdlKCk7XG4gICAgdGhpcy5fdGlsZVNpemUgPSB0aGlzLl9tYXAuc2l6ZTtcbiAgICB0aGlzLl9vY2VhbiA9IG5ldyBNb3ZpbmdFbGVtZW50KE9DRUFOKTtcbiAgICB0aGlzLl9jb2luID0gbmV3IE1vdmluZ0VsZW1lbnQoQ09JTik7XG4gIH1cblxuICBkcmF3Q2hhcmFjdGVycyhwbGF5ZXJzKSB7XG4gICAgZm9yIChjb25zdCBwbGF5ZXIgb2YgcGxheWVycykge1xuICAgICAgdGhpcy5kcmF3Q2hhcmFjdGVyKHBsYXllcik7XG4gICAgfVxuICB9XG5cbiAgZHJhd0NoYXJhY3Rlcih7IGltYWdlLCBmcmFtZSwgeCwgeSwgd2lkdGgsIGhlaWdodCB9KSB7XG4gICAgLy8gdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gJ3JlZCc7XG4gICAgLy8gdGhpcy5idWZmZXIuZmlsbFJlY3QoXG4gICAgLy8gICB4LFxuICAgIC8vICAgeSxcbiAgICAvLyAgIHdpZHRoLFxuICAgIC8vICAgaGVpZ2h0XG4gICAgLy8gKTtcbiAgICB0aGlzLmJ1ZmZlci5kcmF3SW1hZ2UoXG4gICAgICBpbWFnZSxcbiAgICAgIC4uLmZyYW1lLFxuICAgICAgeCxcbiAgICAgIHksXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodFxuICAgICk7XG4gIH1cblxuICBfZHJhd09jZWFuKHgsIHkpIHtcbiAgICB0aGlzLmJ1ZmZlci5kcmF3SW1hZ2UoXG4gICAgICB0aGlzLl9vY2Vhbi5nZXRJbWFnZSgpLCAvLyBpbWFnZVxuICAgICAgLi4udGhpcy5fb2NlYW4uZ2V0Q3VycmVudEZyYW1lKCksXG4gICAgICB4LCAvLyB0YXJnZXQgeFxuICAgICAgeSwgLy8gdGFyZ2V0IHlcbiAgICAgIHRoaXMuX3RpbGVTaXplLCAvLyB0YXJnZXQgd2lkdGhcbiAgICAgIHRoaXMuX3RpbGVTaXplIC8vIHRhcmdldCBoZWlnaHRcbiAgICApO1xuICB9XG5cbiAgX2RyYXdDb2luKHgsIHkpIHtcbiAgICB0aGlzLmJ1ZmZlci5kcmF3SW1hZ2UoXG4gICAgICB0aGlzLl9jb2luLmdldEltYWdlKCksIC8vIGltYWdlXG4gICAgICAuLi50aGlzLl9jb2luLmdldEN1cnJlbnRGcmFtZSgpLFxuICAgICAgKHRoaXMuX3RpbGVTaXplLzIgLSB0aGlzLl9jb2luLnNpemUvMiArIHgpLCAvLyB0YXJnZXQgeFxuICAgICAgKHRoaXMuX3RpbGVTaXplLzIgLSB0aGlzLl9jb2luLnNpemUvMiArIHkpLCAvLyB0YXJnZXQgeVxuICAgICAgdGhpcy5fY29pbi5zaXplLCAvLyB0YXJnZXQgd2lkdGhcbiAgICAgIHRoaXMuX2NvaW4uc2l6ZSAvLyB0YXJnZXQgaGVpZ2h0XG4gICAgKTtcbiAgfVxuXG5cbiAgZHJhd01hcChsYXllcikge1xuICAgIHRoaXMuX29jZWFuLnVwZGF0ZU1vdmVtZW50KCk7XG4gICAgdGhpcy5fY29pbi51cGRhdGVNb3ZlbWVudCgpO1xuICAgIGNvbnN0IHN0YXJ0Q29sID0gTWF0aC5mbG9vcih0aGlzLmNhbWVyYS54IC8gdGhpcy5fdGlsZVNpemUpO1xuICAgIGNvbnN0IGVuZENvbCA9IHN0YXJ0Q29sICsgTWF0aC5mbG9vcih0aGlzLmNhbWVyYS53aWR0aCAvIHRoaXMuX3RpbGVTaXplKSArIDE7XG4gICAgY29uc3Qgc3RhcnRSb3cgPSBNYXRoLmZsb29yKHRoaXMuY2FtZXJhLnkgLyB0aGlzLl90aWxlU2l6ZSk7XG4gICAgY29uc3QgZW5kUm93ID0gc3RhcnRSb3cgKyBNYXRoLmZsb29yKHRoaXMuY2FtZXJhLmhlaWdodCAvIHRoaXMuX3RpbGVTaXplKSArIDE7XG4gICAgZm9yIChsZXQgY29sID0gc3RhcnRDb2w7IGNvbCA8PSBlbmRDb2w7IGNvbCsrKSB7XG4gICAgICBmb3IgKGxldCByb3cgPSBzdGFydFJvdzsgcm93IDw9IGVuZFJvdzsgcm93KyspIHtcbiAgICAgICAgdmFyIHggPSBNYXRoLmZsb29yKGNvbCAqIHRoaXMuX3RpbGVTaXplIC0gdGhpcy5jYW1lcmEueCk7XG4gICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihyb3cgKiB0aGlzLl90aWxlU2l6ZSAtIHRoaXMuY2FtZXJhLnkpO1xuICAgICAgICBjb25zdCBjdXJyZW50VGlsZSA9IHRoaXMuX21hcC5nZXRUaWxlKGxheWVyLCBjb2wsIHJvdyk7XG4gICAgICAgIHN3aXRjaCAoY3VycmVudFRpbGUpIHtcbiAgICAgICAgICBjYXNlIHRoaXMuX21hcC51bmlxdWVLZXlzLm9jZWFuOlxuICAgICAgICAgICAgdGhpcy5fZHJhd09jZWFuKHgsIHkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSB0aGlzLl9tYXAudW5pcXVlS2V5cy5jb2luOlxuICAgICAgICAgICAgdGhpcy5fZHJhd0NvaW4oeCwgeSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5fZHJhd01hcEVsZW1lbnQoY3VycmVudFRpbGUsIHgsIHkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfZHJhd01hcEVsZW1lbnQodGlsZUluZGV4LCB4LCB5KSB7XG4gICAgdGhpcy5idWZmZXIuZHJhd0ltYWdlKFxuICAgICAgdGhpcy5fbWFwSW1hZ2UsIC8vIGltYWdlXG4gICAgICAodGlsZUluZGV4IC0gMSkgKiB0aGlzLl90aWxlU2l6ZSwgLy8gc291cmNlIHhcbiAgICAgIDAsIC8vIHNvdXJjZSB5XG4gICAgICB0aGlzLl90aWxlU2l6ZSwgLy8gc291cmNlIHdpZHRoXG4gICAgICB0aGlzLl90aWxlU2l6ZSwgLy8gc291cmNlIGhlaWdodFxuICAgICAgeCwgLy8gdGFyZ2V0IHhcbiAgICAgIHksIC8vIHRhcmdldCB5XG4gICAgICB0aGlzLl90aWxlU2l6ZSwgLy8gdGFyZ2V0IHdpZHRoXG4gICAgICB0aGlzLl90aWxlU2l6ZSAvLyB0YXJnZXQgaGVpZ2h0XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgdGhpcy5idWZmZXIuY2FudmFzLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICB0aGlzLmJ1ZmZlci5jYW52YXMud2lkdGgsXG4gICAgICB0aGlzLmJ1ZmZlci5jYW52YXMuaGVpZ2h0LFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoLFxuICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHRcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERpc3BsYXk7IiwiY2xhc3MgRW5naW5lIHtcbiAgY29uc3RydWN0b3IocmVuZGVyLCB1cGRhdGUpIHtcbiAgICB0aGlzLmFuaW1hdGVkRnJhbWVSZXF1ZXN0O1xuICAgIHRoaXMudGlja0xlbmd0aCA9IDEwMDAvNjA7XG4gICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XG4gIH1cblxuICBydW4odEZyYW1lKSB7XG4gICAgLy8gdGhlb3JpY2FsIG5leHQgdGlja1xuICAgIGNvbnN0IG5leHRUaWNrID0gdGhpcy5sYXN0VGljayArIHRoaXMudGlja0xlbmd0aDtcbiAgICBsZXQgbnVtVGlja3MgPSAwO1xuXG4gICAgLy8gd2UncmUgbGF0ZSwgbGV0J3MgY291bnQgdGhlIHRpY2tzIHdlIG1pc3NlZFxuICAgIGlmICh0RnJhbWUgPiBuZXh0VGljaykge1xuICAgICAgbnVtVGlja3MgPSBNYXRoLmZsb29yKCh0RnJhbWUgLSB0aGlzLmxhc3RUaWNrKSAvIHRoaXMudGlja0xlbmd0aCk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW4gdXBkYXRlIGZvciBlYWNoIHRpY2sgd2UgbWlzc2VkXG4gICAgZm9yIChsZXQgaT0wOyBpPG51bVRpY2tzOyBpKyspIHtcbiAgICAgIHRoaXMubGFzdFRpY2sgPSB0aGlzLmxhc3RUaWNrICsgdGhpcy50aWNrTGVuZ3RoO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICAgIHRoaXMuYW5pbWF0ZWRGcmFtZVJlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuaGFuZGxlUnVuKTtcblxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5sYXN0VGljayA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHRoaXMuaGFuZGxlUnVuID0gKHQpID0+IHRoaXMucnVuKHQpO1xuICAgIHRoaXMuYW5pbWF0ZWRGcmFtZVJlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuaGFuZGxlUnVuKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZWRGcmFtZVJlcXVlc3QpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVuZ2luZTsiLCJpbXBvcnQgeyBJbWFnZUxvYWRlciwgTXVsdGlNaXhpbnMsIENvbGxpc2lvbkRldGVjdG9yIH0gZnJvbSAnLi4vbWl4aW5zL2luZGV4LmpzJztcblxuY29uc3QgQk9SREVSX0NPTlRFTlQgPSA2O1xuXG5jbGFzcyBHYW1lTWFwIGV4dGVuZHMgTXVsdGlNaXhpbnMoWyBJbWFnZUxvYWRlciwgQ29sbGlzaW9uRGV0ZWN0b3IgXSkge1xuXHRjb25zdHJ1Y3Rvcihhc3NldEluZm8sIGNhbWVyYVdpZHRoLCBjYW1lcmFIZWlnaHQpIHtcblx0XHRzdXBlcihhc3NldEluZm8pO1xuXHRcdGZvciAoY29uc3QgWyBwcm9wLCB2YWx1ZSBdIG9mIE9iamVjdC5lbnRyaWVzKGFzc2V0SW5mbykpIHtcblx0XHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcblx0XHRcdHRoaXNbcHJvcF0gPSB2YWx1ZTtcblx0XHR9XG5cdFx0dGhpcy5ib3JkZXJMZW5ndGggPSBNYXRoLmNlaWwoTWF0aC5tYXgoY2FtZXJhSGVpZ2h0LCBjYW1lcmFXaWR0aCkgLyAoMiphc3NldEluZm8uc2l6ZSkpO1xuXHRcdHRoaXMuX2J1aWxkQ29tcGxldGVNYXAoKTtcblx0XHR0aGlzLl9idWlsZENvbGlzaW9uTWFwKCk7XG5cdH1cblxuXHRnZXRUaWxlKGxheWVyID0gMCwgY29sLCByb3cpIHtcblx0XHRyZXR1cm4gdGhpcy5sYXllcnNbbGF5ZXJdW3JvdyAqIHRoaXMuY29scyArIGNvbF07XG5cdH1cblxuXHRnZXQgd2lkdGgoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2l6ZSAqIHRoaXMucm93cztcblx0fVxuXG5cdGdldCBoZWlnaHQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2l6ZSAqIHRoaXMuY29scztcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZHMgdGhlIGZ1bGwgbWFwLCBhIHNxdWFyZSBvZiB0aWxlcywgd2hpY2ggaW5jbHVkZXM6XG5cdCAqIC0gdGhlIHBsYXlhYmxlIGFyZWEgaW4gdGhlIGNlbnRlclxuXHQgKiAtIGEgYm9yZGVyLCBub24gcGxheWFibGUgYXJvdW5kIHRoZSBwbGF5YWJsZSBhcmVhXG5cdCAqL1xuXHRfYnVpbGRDb21wbGV0ZU1hcCgpIHtcblx0XHR0aGlzLl9idWlsZEJvdHRvbUxheWVyKCk7XG5cdFx0dGhpcy5fYnVpbGRUb3BMYXllcigpO1xuXHR9XG5cblx0XHQvKipcblx0ICogQnVpbGRzIHRoZSBmdWxsIG1hcCwgYSBzcXVhcmUgb2YgdGlsZXMsIHdoaWNoIGluY2x1ZGVzOlxuXHQgKiAtIHRoZSBwbGF5YWJsZSBhcmVhIGluIHRoZSBjZW50ZXJcblx0ICogLSBhIGJvcmRlciwgbm9uIHBsYXlhYmxlIGFyb3VuZCB0aGUgcGxheWFibGUgYXJlYVxuXHQgKi9cblx0X2J1aWxkQm90dG9tTGF5ZXIoKSB7XG5cdFx0dGhpcy5lbnRpcmVNYXBPZktleXMgPSB0aGlzLl9hZGRCb3JkZXIodGhpcy5wbGF5YWJsZUFyZWFLZXlzLCB0aGlzLnJvd3MsIHRoaXMuY29scywgdGhpcy5ib3JkZXJMZW5ndGgsIHRoaXMuZWxlbWVudHMub2NlYW4ua2V5KTtcblx0XHRjb25zdCBtYXBXaXRoVGlsZUluZGljZXMgPSB0aGlzLmVudGlyZU1hcE9mS2V5cy5tYXAoa2V5ID0+IHtcblx0XHRcdGNvbnN0IG1hcEVsZW1lbnQgPSBPYmplY3QudmFsdWVzKHRoaXMuZWxlbWVudHMpLmZpbHRlcihlID0+IGUua2V5ID09PSBrZXkpWzBdO1xuXHRcdFx0cmV0dXJuIG1hcEVsZW1lbnQubGF5ZXJzWzBdO1xuXHRcdH0pO1xuXHRcdHRoaXMubGF5ZXJzID0gWyBtYXBXaXRoVGlsZUluZGljZXMgXTtcblx0XHR0aGlzLnJvd3MgPSB0aGlzLnJvd3MgKyAyICogdGhpcy5ib3JkZXJMZW5ndGg7IC8vIG5ldyBudW1iZXIgb2Ygcm93cyBvZiB0aGUgZnVsbCBtYXBcblx0XHR0aGlzLmNvbHMgPSB0aGlzLmNvbHMgKyAyICogdGhpcy5ib3JkZXJMZW5ndGg7IC8vIG5ldyBudW1iZXIgb2YgY29sdW1ucyBvZiB0aGUgZnVsbCBtYXBcblx0fVxuXG5cblx0LyoqXG5cdCAqIENvbXBsZXRlcyB0aGUgbWFwIHdpdGggdGhlIHRvcCBsYXllcnMgZm9yIGVsZW1lbnRzXG5cdCAqIHRoYXQgaGF2ZSAyIHN0YWNrZWQgbGF5ZXJzXG5cdCAqIEFsc28ga2VlcHMgdHJhY2sgb2YgdGhlIGdyYXNzIHBvc2l0aW9ucyBmb3IgbGF0ZXIgdXNlIGluIHRoZSBHYW1lIGNsYXNzLlxuXHQgKi9cblx0X2J1aWxkVG9wTGF5ZXIoKSB7XG5cdFx0bGV0IHRvcExheWVyID0gbmV3IEFycmF5KHRoaXMucm93cyp0aGlzLmNvbHMpLmZpbGwoMCk7XG5cdFx0dGhpcy5zdGFydFBvc2l0aW9ucyA9IFtdO1xuXHRcdHRoaXMuZW50aXJlTWFwT2ZLZXlzLmZvckVhY2goKGtleSwgaSkgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudCA9IHRoaXMuX2dldEVsZW1lbnRCeUtleShrZXkpO1xuXHRcdFx0aWYgKGtleSA9PT0gdGhpcy5lbGVtZW50cy5zdGFydF9wb3NpdGlvbi5rZXkpIHtcblx0XHRcdFx0dGhpcy5zdGFydFBvc2l0aW9ucy5wdXNoKFtcblx0XHRcdFx0XHRNYXRoLmZsb29yKGkgLyB0aGlzLnJvd3MpICogdGhpcy5zaXplLCAvLyB4XG5cdFx0XHRcdFx0KGkgJSB0aGlzLnJvd3MpICogdGhpcy5zaXplXG5cdFx0XHRcdF0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyB0aWxlIGFib3ZlIHRoZSBjdXJyZW50IHRpbGUgb24gdGhlIHRvcCBsYXllclxuXHRcdFx0aWYgKGVsZW1lbnQudG9wKSB7XG5cdFx0XHRcdHRvcExheWVyW2kgLSB0aGlzLnJvd3NdID0gZWxlbWVudC50b3A7XG5cdFx0XHR9XG5cdFx0XHQvLyBzYW1lIHRpbGUgaW5kZXggb24gdG9wIGxheWVyXG5cdFx0XHRpZiAoZWxlbWVudC5sYXllcnMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHR0b3BMYXllcltpXSA9IGVsZW1lbnQubGF5ZXJzWzFdO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMubGF5ZXJzWzFdID0gdG9wTGF5ZXI7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBCdWlsZHMgYW4gYXJyYXkgdGhhdCBjb250YWluIHRoZSBzYW1lIG51bWJlciBvZiBlbGVtZW50c1xuXHQgKiBhcyB0aGUgbWFwIHRoaXMubGF5ZXJbMF0gYW5kIHRoaXMubGF5ZXJbMV0uXG5cdCAqIEZpbGxlZCB3aXRoIDBzIGFuZCAxcy5cblx0ICogMCBtZWFucyBubyBjb2xsaXNpb25cblx0ICogMSBtZWFucyBjb2xsaXNpb25cblx0ICovXG5cdF9idWlsZENvbGlzaW9uTWFwKCkge1xuXHRcdHRoaXMuX2NvbGxpc2lvbk1hcCA9IHRoaXMuZW50aXJlTWFwT2ZLZXlzLm1hcChlID0+IHtcblx0XHRcdGlmICh0aGlzLm9ic3RhY2xlcy5oYXMoZSkpIHJldHVybiAgMTtcblx0XHRcdHJldHVybiAwO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgKHgseSkgYmVsb25ncyB0byBhIHRpbGVcblx0ICogbWFya2VkIGFzIGFuIG9ic3RhY2xlIG9uIHRoZSBtYXAuIGZhbHNlIG90aGVyd2lzZS5cblx0ICogQHBhcmFtIHsqfSB4XG5cdCAqIEBwYXJhbSB7Kn0geVxuXHQgKi9cblx0X3BvaW50Q29sbGlzaW9uKHgsIHkpIHtcblx0XHRjb25zdCBjb2wgPSBNYXRoLmZsb29yKHggLyB0aGlzLnNpemUpO1xuXHRcdGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoeSAvIHRoaXMuc2l6ZSk7XG5cdFx0Y29uc3QgaXNPYnN0YWNsZSA9IEJvb2xlYW4odGhpcy5fY29sbGlzaW9uTWFwW3JvdyAqIHRoaXMuY29scyArIGNvbF0pO1xuXHRcdGlmIChpc09ic3RhY2xlKSB7XG5cdFx0XHRjb25zdCBvYnN0YWNsZSA9IHtcblx0XHRcdFx0eDogY29sKnRoaXMuc2l6ZSxcblx0XHRcdFx0eTogcm93KnRoaXMuc2l6ZSxcblx0XHRcdFx0d2lkdGg6IHRoaXMuc2l6ZSxcblx0XHRcdFx0aGVpZ2h0OiB0aGlzLnNpemVcblx0XHRcdH07XG5cdFx0XHRjb25zdCBvZmZzZXQgPSAyO1xuXHRcdFx0Y29uc3QgY29sbGlzaW9uID0gIHggPj0gKG9ic3RhY2xlLnggKyBvZmZzZXQpICYmXG5cdFx0XHR4IDw9IChvYnN0YWNsZS54ICsgb2JzdGFjbGUud2lkdGggLSBvZmZzZXQpICYmXG5cdFx0XHR5ID49IChvYnN0YWNsZS55ICsgb2Zmc2V0KSAmJlxuXHRcdFx0eSA8PSAob2JzdGFjbGUueSArIG9ic3RhY2xlLmhlaWdodCAtIG9mZnNldCk7XG5cdFx0XHRyZXR1cm4gY29sbGlzaW9uO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0X2dldEVsZW1lbnRCeUtleShrZXkpIHtcblx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLmVsZW1lbnRzKS5maWx0ZXIoZWwgPT4ga2V5ID09PSBlbC5rZXkpWzBdO1xuXHR9XG5cblx0Y2hlY2tBbmRIaWRlQ29pbnMoeyB4LCB5IH0sIGNhbGxiYWNrKSB7XG5cdFx0Y29uc3QgY29sID0gTWF0aC5mbG9vcih4IC8gdGhpcy5zaXplKTtcblx0XHRjb25zdCByb3cgPSBNYXRoLmZsb29yKHkgLyB0aGlzLnNpemUpO1xuXHRcdGNvbnN0IGVsZW1lbnRGb3VuZCA9IHRoaXMubGF5ZXJzWzFdWyByb3cgKiB0aGlzLmNvbHMgKyBjb2wgXTtcblx0XHRjb25zdCBjb2luS2V5ID0gdGhpcy51bmlxdWVLZXlzLmNvaW47XG5cdFx0aWYgKGVsZW1lbnRGb3VuZCA9PT0gY29pbktleSkge1xuXHRcdFx0dGhpcy5sYXllcnNbMV1bcm93ICogdGhpcy5jb2xzICsgY29sXSA9IDA7XG5cdFx0XHRjYWxsYmFjaygpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBMb2dzIGFuIGFycmF5IGluIHRoZSBzaGFwZSBvZiBhIHNxdWFyZVxuXHQgKiBAcGFyYW0geyp9IGdhbWUgLSBhcnJheSBvZiBudW1iZXJzXG5cdCAqIEBwYXJhbSB7Kn0gbnVtT2ZSb3dzIC0gbnVtYmVyIG9mIHJvd3Mgb2YgdGhlIHNxdWFyZSB0byBwcmludFxuXHQgKi9cblx0X3ByZXR0eVByaW50KGdhbWUsIG51bU9mUm93cykge1xuXHRcdGxldCBwcmV0dHlTdHJpbmcgPSAnXFxuJztcblx0XHRsZXQgaSA9IDA7XG5cdFx0Z2FtZS5mb3JFYWNoKGUgPT4ge1xuXHRcdFx0aWYgKGkgPT09IG51bU9mUm93cykge1xuXHRcdFx0XHRwcmV0dHlTdHJpbmcgKz0gJ1xcbic7XG5cdFx0XHRcdGkgPSAwO1xuXHRcdFx0fVxuXHRcdFx0cHJldHR5U3RyaW5nICs9IFN0cmluZyhlKSArICcgICc7XG5cdFx0XHRpKys7XG5cdFx0fSk7XG5cdFx0cHJldHR5U3RyaW5nICs9ICdcXG4nO1xuXHR9XG5cblxuXHQvKipcblx0ICogVGhpcyBtZXRob2QgdGFrZXMgYSBzcXVhcmUgb2YgdGlsZXMgdGhhdCBpcyByZXByZXNlbnRlZCBieSBhbiBhcnJheSBvZiBudW1iZXJzXG5cdCAqIGFuZCByZXR1cm5zIGEgYmlnZ2VyIGFycmF5IHRoYXQgaXMgdGhlIGZpcnN0IG9uZSB3aXRoIGV4dHJhIHJvd3MgYW5kIGNvbHVtbnMgYXJvdW5kLlxuXHQgKlxuXHQgKiBFeGFtcGxlOlxuXHQgKlxuXHQgKiBwbGF5YWJsZUdhbWU6XG5cdCAqIFtcblx0ICogIDEsIDEsIDEsXG5cdCAqICAxLCAxLCAxLFxuXHQgKiAgMSwgMSwgMVxuXHQgKiBdXG5cdCAqIG51bVJvd3MgPSBudW1Db2xzID0gMyAoZGltZW5zaW9uIG9mIHBsYXlhYmxlR2FtZSlcblx0ICogYm9yZGVyTGVuID0gMlxuXHQgKiBmaWxsTnVtYmVyID0gOVxuXHQgKlxuXHQgKiBvdXRwdXQ6XG5cdCAqIFtcblx0ICogIDksIDksIDksIDksIDksIDksIDlcblx0ICogIDksIDksIDksIDksIDksIDksIDlcblx0ICogIDksIDksIDEsIDEsIDEsIDksIDlcblx0ICogIDksIDksIDEsIDEsIDEsIDksIDlcblx0ICogIDksIDksIDEsIDEsIDEsIDksIDlcblx0ICogIDksIDksIDksIDksIDksIDksIDlcblx0ICogIDksIDksIDksIDksIDksIDksIDlcblx0ICogXVxuXHQgKlxuXHQgKiB0aGUgcGxheWFibGVHYW1lIGlzIHN1cm91bmRlZCBieSAyICg9Ym9yZGVyTGVuKSByb3dzL2NvbHVtbnMgb2YgOSAoZmlsbE51bWJlcilcblx0ICpcblx0ICogQHBhcmFtIHsqfSBwbGF5YWJsZUdhbWUgLSBhcnJheSB0aGF0IHJlcHJlc2VudCB0aGUgcGxheWFibGUgYXJlYVxuXHQgKiBAcGFyYW0geyp9IG51bVJvd3MgLSBudW1iZXIgb2Ygcm93cyBvZiB0aGUgcGxheWFibGUgYXJlYVxuXHQgKiBAcGFyYW0geyp9IG51bUNvbHMgLSBudW1iZXIgb2YgY29sdW1ucyBvZiB0aGUgcGxheWFibGUgYXJlYVxuXHQgKiBAcGFyYW0geyp9IGJvcmRlckxlbiAtIHRoZSBib3JkZXIgd2lkdGggKGluIG51bWJlciBvZiByb3cvY29sdW1uKSB0byBhZGQgYWxsIGFyb3VuZCB0aGUgcGxheWFibGUgYXJlYVxuXHQgKiBAcGFyYW0geyp9IGZpbGxOdW1iZXIgLSB0aGUgY29udGVudCBvZiB0aGUgYm9yZGVyXG5cdCAqL1xuXHRfYWRkQm9yZGVyKHBsYXlhYmxlR2FtZSwgbnVtUm93cywgbnVtQ29scywgYm9yZGVyTGVuLCBmaWxsTnVtYmVyKSB7XG5cdFx0bGV0IG5ld0dhbWUgPSBbXTtcblx0XHRjb25zdCBuZXdSb3dMZW4gPSBudW1Sb3dzICsgMipib3JkZXJMZW47XG5cdFx0Y29uc3QgZmlyc3RMaW5lID0gIG5ldyBBcnJheShuZXdSb3dMZW4pLmZpbGwoZmlsbE51bWJlcik7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPGJvcmRlckxlbjsgaSsrKSB7XG5cdFx0XHQgbmV3R2FtZSA9IFsgLi4ubmV3R2FtZSwgLi4uZmlyc3RMaW5lIF07XG5cdFx0fVxuXHRcdGZvciAobGV0IGk9MDsgaSA8IG51bVJvd3M7IGkrKykge1xuXHRcdFx0bGV0IG5ld0xpbmUgPSBbXG5cdFx0XHRcdC4uLihuZXcgQXJyYXkoYm9yZGVyTGVuKS5maWxsKGZpbGxOdW1iZXIpKSxcblx0XHRcdFx0Li4ucGxheWFibGVHYW1lLnNsaWNlKG51bUNvbHMqaSwgbnVtQ29scyppICsgbnVtUm93cyksXG5cdFx0XHRcdC4uLihuZXcgQXJyYXkoYm9yZGVyTGVuKS5maWxsKGZpbGxOdW1iZXIpKVxuXHRcdFx0XTtcblx0XHRcdG5ld0dhbWUgPSBbIC4uLm5ld0dhbWUsIC4uLm5ld0xpbmUgXTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgaT0wOyBpPGJvcmRlckxlbjsgaSsrKSB7XG5cdFx0XHQgbmV3R2FtZSA9IFsgLi4ubmV3R2FtZSwgLi4uZmlyc3RMaW5lIF07XG5cdFx0fVxuXHRcdHJldHVybiBuZXdHYW1lO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVNYXA7IiwiaW1wb3J0IHsgUExBWUVSIH0gZnJvbSAnLi9hc3NldC1pbmZvJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IE5QQyBmcm9tICcuL25wYyc7XG5pbXBvcnQgeyBDQVRTIH0gZnJvbSAnLi9ucGMtY2F0cyc7XG5cbmNsYXNzIEdhbWUge1xuXHRjb25zdHJ1Y3RvcihtYXAsIGNhbWVyYSwgZGlzcGF0Y2hGdW5jdGlvbikge1xuXHRcdHRoaXMuY29sbGlzaW9uT2Zmc2V0ID0gY2FtZXJhLnNwZWVkO1xuXHRcdHRoaXMubWFwID0gbWFwO1xuXHRcdHRoaXMuY2FtZXJhID0gY2FtZXJhO1xuXHRcdHRoaXMuZGlzcGF0Y2hGdW5jdGlvbiA9IGRpc3BhdGNoRnVuY3Rpb247XG5cdFx0dGhpcy5fYXZhaWxhYmxlSW5pdGlhbFBvc2l0aW9ucyA9IFsgLi4udGhpcy5tYXAuc3RhcnRQb3NpdGlvbnMgXTtcblx0XHR0aGlzLl9pbml0UGxheWVyKCk7XG5cdFx0dGhpcy5ucGNzID0gW107XG5cdFx0dGhpcy5faW5pdE5QQ3MoKTtcblx0fVxuXG5cdF9pbml0UGxheWVyKCkge1xuXHRcdHRoaXMucGxheWVyID0gbmV3IFBsYXllcihQTEFZRVIsIHRoaXMuY2FtZXJhKTtcblx0XHR0aGlzLnBsYXllci5zY3JlZW5YID0gdGhpcy5jYW1lcmEud2lkdGgvMjtcblx0XHR0aGlzLnBsYXllci5zY3JlZW5ZID0gdGhpcy5jYW1lcmEuaGVpZ2h0LzI7XG5cdH1cblxuXHRfaW5pdE5QQ3MoKSB7XG5cdFx0dGhpcy5ucGNzID0gQ0FUUy5tYXAobnBjRGVzYyA9PiB7XG5cdFx0XHRjb25zdCBwb3NpdGlvbiA9IHRoaXMuX2dldFJhbmRvbUluaXRpYWxQb3NpdGlvbigpO1xuXHRcdFx0cmV0dXJuIG5ldyBOUEMoe1xuXHRcdFx0XHRhc3NldEluZm86IG5wY0Rlc2MuYXNzZXQsXG5cdFx0XHRcdGNhbWVyYTogdGhpcy5jYW1lcmEsXG5cdFx0XHRcdGRpYWxvZzoge1xuXHRcdFx0XHRcdG5hbWU6IG5wY0Rlc2MubmFtZSxcblx0XHRcdFx0XHR0ZXh0OiBucGNEZXNjLnRleHRcblx0XHRcdFx0fSxcblx0XHRcdFx0c3BlZWQ6IG5wY0Rlc2Muc3BlZWQsXG5cdFx0XHRcdG1heERpc3RhbmNlOiBucGNEZXNjLm1heERpc3RhbmNlLFxuXHRcdFx0XHRpbml0aWFsRGlyZWN0aW9uOiBucGNEZXNjLmluaXRpYWxEaXJlY3Rpb24sXG5cdFx0XHRcdHNjcmVlblg6IHBvc2l0aW9uWzBdIC0gdGhpcy5jYW1lcmEueCxcblx0XHRcdFx0c2NyZWVuWTogcG9zaXRpb25bMV0gLSB0aGlzLmNhbWVyYS55XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIG1ldGhvZCByZXR1cm5zIG9uZSBvZiB0aG9zZSBwb3NpdGlvbiBhbmQgZW5zdXJlcyB0aGF0XG5cdCAqIHRoZXJlJ3Mgbm8gY29sbGlzaW9uIHdpdGggbWFwIGVsZW1lbnRzIGFuZCB0aGUgcGxheWVyLlxuXHQgKiBPbmNlIGEgcG9zaXRpb24gaXMgcmV0dXJuZWQsIGl0IGlzIHJlbW92ZWQgZnJvbSB0aGlzLl9hdmFpbGFibGVJbml0aWFsUG9zaXRpb25zXG5cdCAqIHRvIGF2b2lkIGhhdmluZyB0d28gTlBDcyB3aXRoIHRoZSBzYW1lIGluaXRpYWwgcG9zaXRpb24uXG5cdCAqL1xuXHRfZ2V0UmFuZG9tSW5pdGlhbFBvc2l0aW9uKCkge1xuXHRcdGNvbnN0IHBvc2l0aW9uID0gdGhpcy5fYXZhaWxhYmxlSW5pdGlhbFBvc2l0aW9uc1t0aGlzLl9hdmFpbGFibGVJbml0aWFsUG9zaXRpb25zLmxlbmd0aCAtIDFdO1xuXHRcdHRoaXMuX2F2YWlsYWJsZUluaXRpYWxQb3NpdGlvbnMucG9wKCk7XG5cdFx0cmV0dXJuIHBvc2l0aW9uO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMucGxheWVyLnVwZGF0ZSgpO1xuXHRcdHRoaXMuY29sbGlkZSgpO1xuXHRcdHRoaXMubnBjc01vdmUoKTtcblx0fVxuXG5cdG5wY3NNb3ZlKCkge1xuXHRcdGlmICghdGhpcy5ucGNzKSByZXR1cm47XG5cdFx0dGhpcy5ucGNzLmZvckVhY2goKG5wYywgaSkgPT4ge1xuXHRcdFx0bGV0IG90aGVyTlBDcyA9IFsgLi4udGhpcy5ucGNzIF07XG5cdFx0XHRvdGhlck5QQ3Muc3BsaWNlKGksIDEpO1xuXHRcdFx0Y29uc3QgeyB4LCB5LCB3aWR0aCwgaGVpZ2h0IH0gPSBucGM7XG5cdFx0XHRjb25zdCBwbGF5ZXJDb2xsaXNpb24gPSB0aGlzLnBsYXllci5jb2xsaXNpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgdGhpcy5jb2xsaXNpb25PZmZzZXQpO1xuXHRcdFx0Y29uc3QgeyBjb2xsaXNpb246IG5wY0NvbGxpc2lvbiB9ID0gdGhpcy5jaGVja05QQ3NDb2xsaXNpb24ob3RoZXJOUENzLCB7IHgsIHksIHdpZHRoLCBoZWlnaHQgfSk7XG5cdFx0XHRjb25zdCBtYXBDb2xsaXNpb24gPSB0aGlzLm1hcC5jb2xsaXNpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgdGhpcy5jb2xsaXNpb25PZmZzZXQpO1xuXHRcdFx0Y29uc3QgbWV0T3N0YWNsZSA9IE9iamVjdC52YWx1ZXMobWFwQ29sbGlzaW9uKS5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IGFjYyB8fCB2YWx1ZSwgZmFsc2UpO1xuXHRcdFx0Y29uc3QgbWV0TlBDID0gT2JqZWN0LnZhbHVlcyhucGNDb2xsaXNpb24pLnJlZHVjZSgoYWNjLCB2YWx1ZSkgPT4gYWNjIHx8IHZhbHVlLCBmYWxzZSk7XG5cdFx0XHRucGMubW92ZShtZXRPc3RhY2xlLCBwbGF5ZXJDb2xsaXNpb24sIG1ldE5QQyk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRDaGFyYWN0ZXJzRGlzcGxheUluZm8oKSB7XG5cdFx0cmV0dXJuIFtcblx0XHRcdHRoaXMucGxheWVyLmdldERpc3BsYXlJbmZvKCksXG5cdFx0XHQuLi4odGhpcy5ucGNzID8gdGhpcy5ucGNzLm1hcChucGMgPT4gbnBjLmdldERpc3BsYXlJbmZvKCkpIDogW10pXG5cdFx0XTtcblx0fVxuXG5cdG1vdmVMZWZ0KCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYW1lcmEuc3BlZWQ7IGkrKykge1xuXHRcdFx0dGhpcy5jYW1lcmEubW92ZUxlZnQoKTtcblx0XHRcdHRoaXMucGxheWVyLnVwZGF0ZSgpO1xuXHRcdFx0dGhpcy5jb2xsaWRlKCk7XG5cdFx0fVxuXHRcdHRoaXMucGxheWVyLm1vdmVMZWZ0KCk7XG5cdFx0XHQvLyBOUENzIGFyZSB1bmFmZmVjdGVkIGJ5IHRoZSBjYW1lcmEgbW92ZW1lbnRcblx0XHQvLyBuZWVkIHRvIGNvbXBlbnNhdGVcblx0XHRmb3IgKGNvbnN0IG5wYyBvZiB0aGlzLm5wY3MpIHtcblx0XHRcdG5wYy5rZWVwSW1tb2JpbGUoJ2xlZnQnKTtcblx0XHR9XG5cdH1cblxuXHRtb3ZlUmlnaHQoKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhbWVyYS5zcGVlZDsgaSsrKSB7XG5cdFx0XHR0aGlzLmNhbWVyYS5tb3ZlUmlnaHQoKTtcblx0XHRcdHRoaXMucGxheWVyLnVwZGF0ZSgpO1xuXHRcdFx0dGhpcy5jb2xsaWRlKCk7XG5cdFx0fVxuXHRcdHRoaXMucGxheWVyLm1vdmVSaWdodCgpO1xuXHRcdC8vIE5QQ3MgYXJlIHVuYWZmZWN0ZWQgYnkgdGhlIGNhbWVyYSBtb3ZlbWVudFxuXHRcdC8vIG5lZWQgdG8gY29tcGVuc2F0ZVxuXHRcdGZvciAoY29uc3QgbnBjIG9mIHRoaXMubnBjcykge1xuXHRcdFx0bnBjLmtlZXBJbW1vYmlsZSgncmlnaHQnKTtcblx0XHR9XG5cdH1cblxuXHRtb3ZlVXAoKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhbWVyYS5zcGVlZDsgaSsrKSB7XG5cdFx0XHR0aGlzLmNhbWVyYS5tb3ZlVXAoKTtcblx0XHRcdHRoaXMucGxheWVyLnVwZGF0ZSgpO1xuXHRcdFx0dGhpcy5jb2xsaWRlKCk7XG5cdFx0fVxuXHRcdHRoaXMucGxheWVyLm1vdmVVcCgpO1xuXHRcdC8vIE5QQ3MgYXJlIHVuYWZmZWN0ZWQgYnkgdGhlIGNhbWVyYSBtb3ZlbWVudFxuXHRcdC8vIG5lZWQgdG8gY29tcGVuc2F0ZVxuXHRcdGZvciAoY29uc3QgbnBjIG9mIHRoaXMubnBjcykge1xuXHRcdFx0bnBjLmtlZXBJbW1vYmlsZSgndXAnKTtcblx0XHR9XG5cblx0fVxuXG5cdG1vdmVEb3duKCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYW1lcmEuc3BlZWQ7IGkrKykge1xuXHRcdFx0dGhpcy5jYW1lcmEubW92ZURvd24oKTtcblx0XHRcdHRoaXMucGxheWVyLnVwZGF0ZSgpO1xuXHRcdFx0dGhpcy5jb2xsaWRlKCk7XG5cdFx0fVxuXHRcdHRoaXMucGxheWVyLm1vdmVEb3duKCk7XG5cdFx0Ly8gTlBDcyBhcmUgdW5hZmZlY3RlZCBieSB0aGUgY2FtZXJhIG1vdmVtZW50XG5cdFx0Ly8gbmVlZCB0byBjb21wZW5zYXRlXG5cdFx0Zm9yIChjb25zdCBucGMgb2YgdGhpcy5ucGNzKSB7XG5cdFx0XHRucGMua2VlcEltbW9iaWxlKCdkb3duJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0SWRsZSgpIHtcblx0XHR0aGlzLnBsYXllci5zZXRJZGxlKCk7XG5cdH1cblxuXHRjaGVja05QQ3NDb2xsaXNpb24obnBjTGlzdCwgeyB4LCB5LCB3aWR0aCwgaGVpZ2h0IH0pIHtcblx0XHRjb25zdCBjb2xsaXNpb24gPSB7IGxlZnQ6IGZhbHNlLCByaWdodDogZmFsc2UsIHRvcDogZmFsc2UsIGJvdHRvbTogZmFsc2UgfTtcblx0XHRpZiAoIXRoaXMubnBjcykgcmV0dXJuIHsgY29sbGlzaW9uIH07XG5cdFx0bGV0IG5wY0luZGV4ID0gbnVsbDtcblx0XHRucGNMaXN0LmZvckVhY2goKG5wYywgaSkgPT57XG5cdFx0XHRjb25zdCBjdXJyZW50Q29sbGlzaW9uID0gbnBjLmNvbGxpc2lvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCAgdGhpcy5jb2xsaXNpb25PZmZzZXQpO1xuXHRcdFx0Y29sbGlzaW9uLmxlZnQgPSBjb2xsaXNpb24ubGVmdCB8fCBjdXJyZW50Q29sbGlzaW9uLmxlZnQ7XG5cdFx0XHRjb2xsaXNpb24ucmlnaHQgPSBjb2xsaXNpb24ucmlnaHQgfHwgY3VycmVudENvbGxpc2lvbi5yaWdodDtcblx0XHRcdGNvbGxpc2lvbi50b3AgPSBjb2xsaXNpb24udG9wIHx8IGN1cnJlbnRDb2xsaXNpb24udG9wO1xuXHRcdFx0Y29sbGlzaW9uLmJvdHRvbSA9IGNvbGxpc2lvbi5ib3R0b20gfHwgY3VycmVudENvbGxpc2lvbi5ib3R0b207XG5cdFx0XHRpZiAoT2JqZWN0LnZhbHVlcyhjdXJyZW50Q29sbGlzaW9uKS5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IGFjYyB8fCB2YWx1ZSwgZmFsc2UpKSB7XG5cdFx0XHRcdG5wY0luZGV4ID0gaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4geyBjb2xsaXNpb24sIG5wY0luZGV4IH07XG5cdH1cblxuXHRjb2xsaWRlKCkge1xuXHRcdC8vIGdldCBwbGF5ZXIgc2l6ZSBhbmQgY29vcmRcblx0XHRjb25zdCB7IGhlaWdodCwgd2lkdGgsIHgsIHkgfSA9IHRoaXMucGxheWVyO1xuXG5cdFx0Ly8gZ2V0IGNvbGxpc2lvbiBpbmZvXG5cdFx0Y29uc3QgbWFwQ29sbGlzaW9uID0gdGhpcy5tYXAuY29sbGlzaW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIHRoaXMuY29sbGlzaW9uT2Zmc2V0KTtcblx0XHRjb25zdCB7IGNvbGxpc2lvbjogbnBjQ29sbGlzaW9uLCBucGNJbmRleCB9ID0gdGhpcy5jaGVja05QQ3NDb2xsaXNpb24odGhpcy5ucGNzLCB7IHgsIHksIHdpZHRoLCBoZWlnaHQgfSk7XG5cblx0XHRjb25zdCBsZWZ0ID0gbWFwQ29sbGlzaW9uLmxlZnQgfHwgbnBjQ29sbGlzaW9uLmxlZnQ7XG5cdFx0Y29uc3QgcmlnaHQgPSBtYXBDb2xsaXNpb24ucmlnaHQgfHwgbnBjQ29sbGlzaW9uLnJpZ2h0O1xuXHRcdGNvbnN0IGJvdHRvbSA9IG1hcENvbGxpc2lvbi5ib3R0b20gfHwgbnBjQ29sbGlzaW9uLmJvdHRvbTtcblx0XHRjb25zdCB0b3AgPSBtYXBDb2xsaXNpb24udG9wIHx8IG5wY0NvbGxpc2lvbi50b3A7XG5cblx0XHQvLyBzdG9wIGNhbWVyYSBpZiBuZWNlc3Nhcnlcblx0XHR0aGlzLmNhbWVyYS5zdG9wLmxlZnQgPSBsZWZ0O1xuXHRcdHRoaXMuY2FtZXJhLnN0b3AucmlnaHQgPSByaWdodDtcblx0XHR0aGlzLmNhbWVyYS5zdG9wLmRvd24gPSBib3R0b207XG5cdFx0dGhpcy5jYW1lcmEuc3RvcC51cCA9IHRvcDtcblxuXHRcdC8vIGRpc3BsYXkgc3BlZWNoIGRpYWxvZ1xuXHRcdGlmIChib3R0b20gJiYgdGhpcy5wbGF5ZXIuZmFjZSgnZG93bicpIHx8XG5cdFx0XHR0b3AgJiYgdGhpcy5wbGF5ZXIuZmFjZSgndXAnKSB8fFxuXHRcdFx0cmlnaHQgJiYgdGhpcy5wbGF5ZXIuZmFjZSgncmlnaHQnKSB8fFxuXHRcdFx0bGVmdCAmJiB0aGlzLnBsYXllci5mYWNlKCdsZWZ0JykpIHtcblx0XHRcdFx0dGhpcy5faGFuZGxlU3BlZWNoKG5wY0luZGV4KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fY2FuY2VsU3BlZWNoRGlhbG9nKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5tYXAuY2hlY2tBbmRIaWRlQ29pbnMoeyB4OiB4ICsgd2lkdGgvMiwgeTogeSArIGhlaWdodC8yIH0sIHRoaXMuZm91bmRDb2luLmJpbmQodGhpcykpO1xuXHR9XG5cblx0Zm91bmRDb2luKCkge1xuXHRcdHRoaXMucGxheWVyLmNvaW5zQ29sbGVjdGVkKys7XG5cdFx0Y29uc29sZS5sb2coYEkgaGF2ZSAke3RoaXMucGxheWVyLmNvaW5zQ29sbGVjdGVkfSBjb2lucyFgKTtcblx0fVxuXG5cdF9oYW5kbGVTcGVlY2gobnBjSW5kZXgpIHtcblx0XHRpZiAodGhpcy5fc3BlZWNoRGlhbG9nSW52b2tlZCB8fCB0eXBlb2YgbnBjSW5kZXggIT09ICdudW1iZXInKSByZXR1cm47XG5cdFx0dGhpcy5fZGlzcGxheVNwZWVjaERpYWxvZyh0aGlzLm5wY3NbbnBjSW5kZXhdLmRpYWxvZyk7XG5cdH1cblxuXHRfZGlzcGxheVNwZWVjaERpYWxvZyhjb250ZW50KSB7XG5cdFx0dGhpcy5fc3BlZWNoRGlhbG9nSW52b2tlZCA9IHRydWU7XG5cdFx0dGhpcy5kaXNwYXRjaEZ1bmN0aW9uKHtcblx0XHRcdHNob3c6IHRydWUsXG5cdFx0XHQuLi5jb250ZW50XG5cdFx0fSk7XG5cdH1cblxuXHRfY2FuY2VsU3BlZWNoRGlhbG9nKCkge1xuXHRcdGlmICh0aGlzLl9zcGVlY2hEaWFsb2dJbnZva2VkKSB7XG5cdFx0XHR0aGlzLl9zcGVlY2hEaWFsb2dJbnZva2VkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRnVuY3Rpb24oe1xuXHRcdFx0XHRzaG93OiBmYWxzZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBHYW1lIH0gZnJvbSAnLi9nYW1lLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRW5naW5lIH0gZnJvbSAnLi9lbmdpbmUuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllci5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXIuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYW1lcmEgfSBmcm9tICcuL2NhbWVyYS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERpc3BsYXkgfSBmcm9tICcuL2Rpc3BsYXkuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBHYW1lTWFwIH0gZnJvbSAnLi9nYW1lLW1hcC5qcyc7XG4iLCJpbXBvcnQgeyBJbWFnZUxvYWRlcixTdGF0ZUhhbmRsZXIsIE11bHRpTWl4aW5zIH0gZnJvbSAnLi4vbWl4aW5zL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW92aW5nRWxlbWVudCBleHRlbmRzIE11bHRpTWl4aW5zKFsgSW1hZ2VMb2FkZXIsIFN0YXRlSGFuZGxlciBdKSB7XG5cdGNvbnN0cnVjdG9yKGFzc2V0KSB7XG5cdFx0c3VwZXIoYXNzZXQpO1xuXHRcdHRoaXMuYXNzZXQgPSBhc3NldDtcblx0XHR0aGlzLnNpemUgPSBhc3NldC5zaXplO1xuXHR9XG5cblx0dXBkYXRlTW92ZW1lbnQoKSB7XG5cdFx0dGhpcy5fdXBkYXRlU3RhdGUodGhpcy5hc3NldC5tb3ZlbWVudCk7XG5cdH1cbn0iLCJpbXBvcnQgeyBDQVQsIENBVDIsIENBVDMsIENBVDQgfSBmcm9tICcuL2Fzc2V0LWluZm8nO1xuZXhwb3J0IGNvbnN0IENBVFMgPSBbXG4gIHtcbiAgICBhc3NldDogQ0FULFxuICAgIG5hbWU6IFwiSmFzcGVyXCIsXG4gICAgdGV4dDogXCJNZW9vb293IOKdpO+4j1wiLFxuICAgIHNwZWVkOiAwLjMsXG4gICAgbWF4RGlzdGFuY2U6IDQwMCxcbiAgICBpbml0aWFsRGlyZWN0aW9uOiBcInJpZ2h0XCJcbiAgfSxcbiAge1xuICAgIGFzc2V0OiBDQVQyLFxuICAgIG5hbWU6IFwiUGFuY2FrZVwiLFxuICAgIHRleHQ6IFwiTWlhb3V1dXUhXCIsXG4gICAgc3BlZWQ6IDAuNyxcbiAgICBpbml0aWFsRGlyZWN0aW9uOiBcImxlZnRcIlxuICB9LFxuICB7XG4gICAgYXNzZXQ6IENBVDMsXG4gICAgbmFtZTogXCJCdXR0ZXJzXCIsXG4gICAgdGV4dDogXCJHb3QgYW55IGZvb2Q/XCIsXG4gICAgc3BlZWQ6IDAuMyxcbiAgICBtYXhEaXN0YW5jZTogMjAwLFxuICAgIGluaXRpYWxEaXJlY3Rpb246IFwidXBcIlxuICB9LFxuICB7XG4gICAgYXNzZXQ6IENBVDQsXG4gICAgbmFtZTogXCJUb21cIixcbiAgICB0ZXh0OiBcIldvb2Ygd29vZiDwn5C2XCIsXG4gICAgc3BlZWQ6IDAuNSxcbiAgICBtYXhEaXN0YW5jZTogMTAwMCxcbiAgICBpbml0aWFsRGlyZWN0aW9uOiBcImRvd25cIlxuICB9XG5dOyIsIiAgaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllci5qcyc7XG5cbmNsYXNzIE5QQyBleHRlbmRzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKHtcbiAgICBhc3NldEluZm8sXG4gICAgY2FtZXJhLFxuICAgIC4uLnJlc3RcbiAgfSA9IHt9KSB7XG4gICAgc3VwZXIoYXNzZXRJbmZvLCBjYW1lcmEpO1xuICAgIGZvciAoY29uc3QgWyBwcm9wLCB2YWx1ZSBdIG9mIE9iamVjdC5lbnRyaWVzKHJlc3QpKSB7XG5cdFx0XHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG5cdFx0XHR0aGlzW3Byb3BdID0gdmFsdWU7XG5cdFx0fVxuXHRcdHRoaXMuX3NldEluaXRpYWxEaXJlY3Rpb24oKTtcblx0XHR0aGlzLl9kaXN0YW5jZVRyYXZlbGVkID0gMDtcbiAgfVxuXG4gIF9zZXRJbml0aWFsRGlyZWN0aW9uKCkge1xuICAgIHN3aXRjaCAodGhpcy5pbml0aWFsRGlyZWN0aW9uKSB7XG4gICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgdGhpcy5tb3ZlRG93bigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgdGhpcy5tb3ZlVXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHRoaXMubW92ZUxlZnQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLm1vdmVEb3duKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGp1c3RzIHNjcmVlblhZIHRvIG1ha2Ugc3VyZSB0aGUgbnBjIG1vdmVtZW50XG4gICAqIGlzIGluZGVwZW5kZW50IGZyb20gdGhlIGNhbWVyYSBtb3ZlbWVudFxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0aW9uIC0gdXAsIGRvd24sIHJpZ2h0IG9yIGxlZnRcbiAgICovXG4gIGtlZXBJbW1vYmlsZShkaXJlY3Rpb24pIHtcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSAndXAnOlxuICAgICAgICBpZiAoIXRoaXMuY2FtZXJhLnN0b3AudXApIHtcbiAgICAgICAgICB0aGlzLnNjcmVlblkgKz0gdGhpcy5jYW1lcmEuc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgaWYgKCF0aGlzLmNhbWVyYS5zdG9wLmRvd24pIHtcbiAgICAgICAgICB0aGlzLnNjcmVlblkgLT0gdGhpcy5jYW1lcmEuc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGlmICghdGhpcy5jYW1lcmEuc3RvcC5yaWdodCkge1xuICAgICAgICAgIHRoaXMuc2NyZWVuWCAtPSB0aGlzLmNhbWVyYS5zcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBpZiAoIXRoaXMuY2FtZXJhLnN0b3AubGVmdCkge1xuICAgICAgICAgIHRoaXMuc2NyZWVuWCArPSB0aGlzLmNhbWVyYS5zcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGhvdyB0aGUgTlBDIG1vdmVzIG9uIHRoZSBtYXBcbiAgICogYW5kIGhvdyBpdCByZWFjdHMgd2hlbiBtZWV0aW5nIGFuIG9ic3RhY2xlIG9yIHRoZSBtYWluIHBsYXllclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG1hcENvbGxpc2lvbiAtIG1ldCBhbiBvYnN0YWNsZSBvbiB0aGUgbWFwXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwbGF5ZXJDb2xsaXNpb24gLSBjb2xsaXNpb24gaW5mbyB3aXRoIHBsYXllclxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG1ldE90aGVyTlBDcyAtIG1ldCBvdGhlciBOUENzXG4gICAqL1xuICBtb3ZlKG1hcENvbGxpc2lvbiwgcGxheWVyQ29sbGlzaW9uLCBtZXRPdGhlck5QQ3MpIHtcbiAgICAvLyBoYW5kbGUgcGxheWVyIGNvbGxpc2lvblxuXHRcdGlmIChwbGF5ZXJDb2xsaXNpb24ubGVmdCkge1xuXHRcdCAgaWYgKCF0aGlzLmZhY2UoJ2xlZnQnKSkgdGhpcy5tb3ZlTGVmdCgpO1xuXHRcdCAgdGhpcy5zZXRJZGxlKCk7XG5cdFx0ICByZXR1cm47XG5cdFx0fSBlbHNlIGlmIChwbGF5ZXJDb2xsaXNpb24ucmlnaHQpIHtcblx0XHQgIGlmICghdGhpcy5mYWNlKCdyaWdodCcpKSB0aGlzLm1vdmVSaWdodCgpO1xuXHRcdCAgdGhpcy5zZXRJZGxlKCk7XG5cdFx0ICByZXR1cm47XG5cdFx0fSBlbHNlIGlmIChwbGF5ZXJDb2xsaXNpb24udG9wKSB7XG4gICAgICBpZiAoIXRoaXMuZmFjZSgndXAnKSkgdGhpcy5tb3ZlVXAoKTtcblx0XHQgIHRoaXMuc2V0SWRsZSgpO1xuXHRcdCAgcmV0dXJuO1xuXHRcdH0gZWxzZSBpZiAocGxheWVyQ29sbGlzaW9uLmJvdHRvbSkge1xuICAgICAgaWYgKCF0aGlzLmZhY2UoJ2Rvd24nKSkgdGhpcy5tb3ZlRG93bigpO1xuXHRcdCAgdGhpcy5zZXRJZGxlKCk7XG5cdFx0ICByZXR1cm47XG5cdFx0fVxuXG4gICAgLy8gbG9vayBkb3duIHdoZW4gaW1tb2JpbGVcbiAgICBpZiAoIXRoaXMuc3BlZWQpIHtcblx0XHRcdHRoaXMuc2V0SWRsZSgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH07XG5cbiAgICAvLyBjaGFuZ2UgZGlyZWN0aW9uIGlmIG1ldCBvYnN0YWNsZSBvciBtZXQgTlBDXG5cdFx0aWYgKG1hcENvbGxpc2lvbiB8fCBtZXRPdGhlck5QQ3MpIHtcblx0XHQgIC8vIHJlc2V0IGRpc3RhbmNlIGFuZCB0dXJuIGFyb3VuZFxuICAgICAgaWYgKHRoaXMuZmFjZSgnbGVmdCcpKSB7XG4gICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSgncmlnaHQnKSkge1xuICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSgndXAnKSkge1xuICAgICAgICB0aGlzLm1vdmVEb3duKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZmFjZSgnZG93bicpKSB7XG4gICAgICAgIHRoaXMubW92ZVVwKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9kaXN0YW5jZVRyYXZlbGVkID0gMDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5mYWNlKCdsZWZ0JykpIHtcblx0XHQgIHRoaXMubW92ZUxlZnQoKTtcblx0XHQgIHRoaXMuc2NyZWVuWCAtPSB0aGlzLnNwZWVkO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5mYWNlKCdyaWdodCcpKSB7XG5cdFx0ICB0aGlzLm1vdmVSaWdodCgpO1xuICAgICAgdGhpcy5zY3JlZW5YICs9IHRoaXMuc3BlZWQ7XG5cdFx0fSBlbHNlIGlmICh0aGlzLmZhY2UoJ3VwJykpIHtcbiAgICAgIHRoaXMubW92ZVVwKCk7XG4gICAgICB0aGlzLnNjcmVlblkgLT0gdGhpcy5zcGVlZDtcblx0XHR9IGVsc2UgaWYgKHRoaXMuZmFjZSgnZG93bicpKSB7XG4gICAgICB0aGlzLm1vdmVEb3duKCk7XG4gICAgICB0aGlzLnNjcmVlblkgKz0gdGhpcy5zcGVlZDtcblx0XHR9XG5cbiAgICBpZiAodGhpcy5fZGlzdGFuY2VUcmF2ZWxlZCA+IHRoaXMubWF4RGlzdGFuY2UpIHtcbiAgICAgIHRoaXMuX3JhbmRvbWx5RGlyZWN0aW9uTW92ZSgpO1xuICAgICAgdGhpcy5fZGlzdGFuY2VUcmF2ZWxlZCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Rpc3RhbmNlVHJhdmVsZWQgKz0gdGhpcy5zcGVlZDtcbiAgICB9XG4gIH1cblxuICBfcmFuZG9tbHlEaXJlY3Rpb25Nb3ZlKCkge1xuICAgIGNvbnN0IGFsbERpcmVjdGlvbiA9IFsgdGhpcy5tb3ZlTGVmdCwgdGhpcy5tb3ZlUmlnaHQsIHRoaXMubW92ZVVwLCB0aGlzLm1vdmVEb3duIF07XG4gICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKGFsbERpcmVjdGlvbi5sZW5ndGgpKTtcbiAgICBjb25zdCByYW5kb21NZXRob2QgPSBhbGxEaXJlY3Rpb25bcmFuZG9tSW5kZXhdO1xuICAgIHJhbmRvbU1ldGhvZC5iaW5kKHRoaXMpKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTlBDOyIsImltcG9ydCB7IEltYWdlTG9hZGVyLCBTdGF0ZUhhbmRsZXIsIE11bHRpTWl4aW5zLCBDb2xsaXNpb25EZXRlY3RvciB9IGZyb20gJy4uL21peGlucy9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIE11bHRpTWl4aW5zKFsgSW1hZ2VMb2FkZXIsIFN0YXRlSGFuZGxlciwgQ29sbGlzaW9uRGV0ZWN0b3IgXSkge1xuXHRjb25zdHJ1Y3Rvcihhc3NldEluZm8sIGNhbWVyYSkge1xuXHRcdHN1cGVyKGFzc2V0SW5mbyk7XG5cdFx0dGhpcy5jYW1lcmEgPSBjYW1lcmE7XG5cdFx0dGhpcy53aWR0aCA9IChhc3NldEluZm8ud2lkdGggfHwgYXNzZXRJbmZvLnNpemUpO1xuXHRcdHRoaXMuaGVpZ2h0ID0gIChhc3NldEluZm8uaGVpZ2h0IHx8IGFzc2V0SW5mby5zaXplKTtcblx0XHR0aGlzLmNvaW5zQ29sbGVjdGVkID0gMDtcblx0fVxuXG5cdGdldCBzY3JlZW5YKCkge1xuXHRcdHJldHVybiB0aGlzLl9zY3JlZW5YO1xuXHR9XG5cblx0c2V0IHNjcmVlblgodmFsdWUpIHtcblx0XHR0aGlzLl9zY3JlZW5YID0gdmFsdWU7XG5cdFx0dGhpcy54ID0gdmFsdWUgKyB0aGlzLmNhbWVyYS54O1xuXHR9XG5cblxuXHRnZXQgc2NyZWVuWSgpIHtcblx0XHRyZXR1cm4gdGhpcy5fc2NyZWVuWTtcblx0fVxuXG5cdHNldCBzY3JlZW5ZKHZhbHVlKSB7XG5cdFx0dGhpcy5fc2NyZWVuWSA9IHZhbHVlO1xuXHRcdHRoaXMueSA9IHZhbHVlICsgdGhpcy5jYW1lcmEueTtcblx0fVxuXG5cdC8qKlxuXHQgKiB4IGFuZCB5IGFyZSB0aGUgY29vcmRpbmF0ZXMgaW4gdGhlIGdhbWVcblx0ICogc2NyZWVuWCBhbmQgc2NyZWVuWSBhcmUgdGhlIGNvb3JkaW5hdGVzIG9uIHRoZSBzY3JlZW5cblx0ICovXG5cdHVwZGF0ZSgpIHtcblx0XHR0aGlzLnggPSB0aGlzLl9zY3JlZW5YICsgdGhpcy5jYW1lcmEueDtcblx0XHR0aGlzLnkgPSB0aGlzLl9zY3JlZW5ZICsgdGhpcy5jYW1lcmEueTtcblx0fVxuXG5cdGdldERpc3BsYXlJbmZvKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRpbWFnZTogdGhpcy5nZXRJbWFnZSgpLFxuXHRcdFx0ZnJhbWU6IHRoaXMuZ2V0Q3VycmVudEZyYW1lKCksXG5cdFx0XHR4OiB0aGlzLl9zY3JlZW5YLFxuXHRcdFx0eTogdGhpcy5fc2NyZWVuWSxcblx0XHRcdHdpZHRoOiB0aGlzLndpZHRoLFxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodFxuXHRcdH07XG5cdH1cblxuXHRfcG9pbnRDb2xsaXNpb24oeCwgeSkge1xuXHRcdGNvbnN0IG9mZnNldCA9IDU7XG4gICAgcmV0dXJuIHggPj0gKHRoaXMueCArIG9mZnNldCkgJiZcbiAgICB4IDw9ICh0aGlzLnggKyB0aGlzLndpZHRoIC0gb2Zmc2V0KSAmJlxuICAgIHkgPj0gKHRoaXMueSArIG9mZnNldCkgJiZcbiAgICB5IDw9ICh0aGlzLnkgKyB0aGlzLmhlaWdodCAtIG9mZnNldCk7XG4gIH1cbn0iLCJjbGFzcyBGcmFtZUFuaW1hdG9yIHtcbiAgY29uc3RydWN0b3IoYXNzZXRJbmZvLCBpbml0aWFsU3RhdGUpIHtcbiAgICBmb3IgKGNvbnN0IFsgcHJvcCwgdmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhhc3NldEluZm8pKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgfVxuICAgIHRoaXMuX2ZyYW1lU2V0cyA9IHRoaXMuX2NyZWF0ZUZyYW1lU2V0cygpO1xuICB9XG5cbiAgX2dldFRpbGUoWyByb3csIGNvbCBdKSB7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLndpZHRoIHx8IHRoaXMuc2l6ZTtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmhlaWdodCB8fCB0aGlzLnNpemU7XG4gICAgcmV0dXJuIFtcbiAgICAgIGNvbCp3aWR0aCwgLy8geFxuICAgICAgcm93KmhlaWdodCwgLy8geVxuICAgICAgd2lkdGgsIC8vIHdpZHRoXG4gICAgICBoZWlnaHQgLy8gaGVpZ2h0XG4gICAgXTtcbiAgfVxuXG4gIF9jcmVhdGVGcmFtZVNldHMoKSB7XG4gICAgY29uc3QgZnJhbWVTZXRzID0ge307XG4gICAgZm9yIChjb25zdCBbIG1vdmUsIHNlcXVlbmNlIF0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5tb3ZlU2VxdWVuY2VzKSkge1xuICAgICAgZnJhbWVTZXRzW21vdmVdID0gc2VxdWVuY2UubWFwKHRoaXMuX2dldFRpbGUuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHJldHVybiBmcmFtZVNldHM7XG4gIH1cblxuICBnZXRDdXJyZW50RnJhbWUoYWN0aW9uLCBzZXF1ZW5jZUluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZyYW1lU2V0c1thY3Rpb25dW3NlcXVlbmNlSW5kZXhdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZyYW1lQW5pbWF0b3I7IiwiaW1wb3J0ICcuL2NvbXBvbmVudHMvaW5kZXguanMnOyJdLCJzb3VyY2VSb290IjoiIn0=