(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("three"), require("three-csg-ts"), require("suncalc"));
	else if(typeof define === 'function' && define.amd)
		define(["three", "three-csg-ts", "suncalc"], factory);
	else if(typeof exports === 'object')
		exports["huyong3d"] = factory(require("three"), require("three-csg-ts"), require("suncalc"));
	else
		root["huyong3d"] = factory(root["three"], root["three-csg-ts"], root["suncalc"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__72__, __WEBPACK_EXTERNAL_MODULE__75__, __WEBPACK_EXTERNAL_MODULE__79__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(1);
__webpack_require__(69);
(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(71)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _createScene) {
  "use strict";

  var _interopRequireDefault = __webpack_require__(70);
  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _createScene = _interopRequireDefault(_createScene);
  var _default = _createScene["default"];
  _exports["default"] = _default;
});

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// TODO: Remove from `core-js@4`
__webpack_require__(2);


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(3);
var global = __webpack_require__(4);

// `globalThis` object
// https://tc39.es/ecma262/#sec-globalthis
$({ global: true, forced: global.globalThis !== global }, {
  globalThis: global
});


/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(4);
var getOwnPropertyDescriptor = (__webpack_require__(5).f);
var createNonEnumerableProperty = __webpack_require__(44);
var defineBuiltIn = __webpack_require__(48);
var defineGlobalProperty = __webpack_require__(38);
var copyConstructorProperties = __webpack_require__(56);
var isForced = __webpack_require__(68);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 4 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || this || Function('return this')();


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(6);
var call = __webpack_require__(8);
var propertyIsEnumerableModule = __webpack_require__(10);
var createPropertyDescriptor = __webpack_require__(11);
var toIndexedObject = __webpack_require__(12);
var toPropertyKey = __webpack_require__(18);
var hasOwn = __webpack_require__(39);
var IE8_DOM_DEFINE = __webpack_require__(42);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 8 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(9);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),
/* 9 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 12 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(13);
var requireObjectCoercible = __webpack_require__(16);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 13 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(14);
var fails = __webpack_require__(7);
var classof = __webpack_require__(15);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),
/* 14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(9);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),
/* 15 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(14);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),
/* 16 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isNullOrUndefined = __webpack_require__(17);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 17 */
/***/ ((module) => {

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),
/* 18 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(19);
var isSymbol = __webpack_require__(23);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),
/* 19 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8);
var isObject = __webpack_require__(20);
var isSymbol = __webpack_require__(23);
var getMethod = __webpack_require__(30);
var ordinaryToPrimitive = __webpack_require__(33);
var wellKnownSymbol = __webpack_require__(34);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),
/* 20 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(21);
var $documentAll = __webpack_require__(22);

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),
/* 21 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $documentAll = __webpack_require__(22);

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),
/* 22 */
/***/ ((module) => {

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),
/* 23 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(24);
var isCallable = __webpack_require__(21);
var isPrototypeOf = __webpack_require__(25);
var USE_SYMBOL_AS_UID = __webpack_require__(26);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),
/* 24 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(4);
var isCallable = __webpack_require__(21);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),
/* 25 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(14);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),
/* 26 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(27);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),
/* 27 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(28);
var fails = __webpack_require__(7);
var global = __webpack_require__(4);

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),
/* 28 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(4);
var userAgent = __webpack_require__(29);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),
/* 30 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(31);
var isNullOrUndefined = __webpack_require__(17);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),
/* 31 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(21);
var tryToString = __webpack_require__(32);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),
/* 32 */
/***/ ((module) => {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),
/* 33 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8);
var isCallable = __webpack_require__(21);
var isObject = __webpack_require__(20);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 34 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(4);
var shared = __webpack_require__(35);
var hasOwn = __webpack_require__(39);
var uid = __webpack_require__(41);
var NATIVE_SYMBOL = __webpack_require__(27);
var USE_SYMBOL_AS_UID = __webpack_require__(26);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),
/* 35 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(36);
var store = __webpack_require__(37);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.31.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.31.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = false;


/***/ }),
/* 37 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(4);
var defineGlobalProperty = __webpack_require__(38);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),
/* 38 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(4);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 39 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(14);
var toObject = __webpack_require__(40);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),
/* 40 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(16);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),
/* 41 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(14);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),
/* 42 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(6);
var fails = __webpack_require__(7);
var createElement = __webpack_require__(43);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 43 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(4);
var isObject = __webpack_require__(20);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 44 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(6);
var definePropertyModule = __webpack_require__(45);
var createPropertyDescriptor = __webpack_require__(11);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(42);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(46);
var anObject = __webpack_require__(47);
var toPropertyKey = __webpack_require__(18);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 46 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(6);
var fails = __webpack_require__(7);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),
/* 47 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(20);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),
/* 48 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(21);
var definePropertyModule = __webpack_require__(45);
var makeBuiltIn = __webpack_require__(49);
var defineGlobalProperty = __webpack_require__(38);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),
/* 49 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(14);
var fails = __webpack_require__(7);
var isCallable = __webpack_require__(21);
var hasOwn = __webpack_require__(39);
var DESCRIPTORS = __webpack_require__(6);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(50).CONFIGURABLE);
var inspectSource = __webpack_require__(51);
var InternalStateModule = __webpack_require__(52);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),
/* 50 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(6);
var hasOwn = __webpack_require__(39);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),
/* 51 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(14);
var isCallable = __webpack_require__(21);
var store = __webpack_require__(37);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),
/* 52 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(53);
var global = __webpack_require__(4);
var isObject = __webpack_require__(20);
var createNonEnumerableProperty = __webpack_require__(44);
var hasOwn = __webpack_require__(39);
var shared = __webpack_require__(37);
var sharedKey = __webpack_require__(54);
var hiddenKeys = __webpack_require__(55);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 53 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(4);
var isCallable = __webpack_require__(21);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),
/* 54 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(35);
var uid = __webpack_require__(41);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 55 */
/***/ ((module) => {

module.exports = {};


/***/ }),
/* 56 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(39);
var ownKeys = __webpack_require__(57);
var getOwnPropertyDescriptorModule = __webpack_require__(5);
var definePropertyModule = __webpack_require__(45);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),
/* 57 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(24);
var uncurryThis = __webpack_require__(14);
var getOwnPropertyNamesModule = __webpack_require__(58);
var getOwnPropertySymbolsModule = __webpack_require__(67);
var anObject = __webpack_require__(47);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(59);
var enumBugKeys = __webpack_require__(66);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 59 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(14);
var hasOwn = __webpack_require__(39);
var toIndexedObject = __webpack_require__(12);
var indexOf = (__webpack_require__(60).indexOf);
var hiddenKeys = __webpack_require__(55);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),
/* 60 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(12);
var toAbsoluteIndex = __webpack_require__(61);
var lengthOfArrayLike = __webpack_require__(64);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 61 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(62);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 62 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trunc = __webpack_require__(63);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),
/* 63 */
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),
/* 64 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(65);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),
/* 65 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(62);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 66 */
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 68 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7);
var isCallable = __webpack_require__(21);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(6);
var defineProperty = (__webpack_require__(45).f);

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
// eslint-disable-next-line es/no-object-defineproperty -- safe
$({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {
  defineProperty: defineProperty
});


/***/ }),
/* 70 */
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(84);
/* harmony import */ var _house_cube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73);
/* harmony import */ var _roof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(76);
/* harmony import */ var _ground__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(77);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(74);
/* harmony import */ var _sun__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(78);
/* harmony import */ var _operation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(80);
/* harmony import */ var _obstacles_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(81);
/* harmony import */ var _support__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(83);
/// <reference path="../../node_modules/@types/three/src/Three.d.ts" />










/**
 * @description: 创建场景
 * @param {HTMLCanvasElement} dom
 * @return { loadData,render,control} 数据加载，渲染器，控制器
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((dom) => {
    const ctx = Object.create(null);
    const manager = new three__WEBPACK_IMPORTED_MODULE_0__.LoadingManager();
    if (!(dom instanceof HTMLElement) || dom.tagName.toLocaleLowerCase() != "canvas") {
        throw new Error("canvas is null");
    }
    //获取父级dom长宽
    const parentConf = ((obj) => {
        Object.defineProperty(obj, "width", {
            get() {
                return dom.parentNode.offsetWidth || window.innerWidth;
            },
        });
        Object.defineProperty(obj, "height", {
            get() {
                return dom.parentNode.offsetHeight || window.innerHeight;
            },
        });
        return obj;
    })(Object.create(null));
    //创建相机
    const camera = (() => {
        const _m = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(_config__WEBPACK_IMPORTED_MODULE_4__.FOV, parentConf.width / parentConf.height, _config__WEBPACK_IMPORTED_MODULE_4__.NEAR, _config__WEBPACK_IMPORTED_MODULE_4__.FAR);
        _m.position.set(_config__WEBPACK_IMPORTED_MODULE_4__.CAMERA_POSITION.X, _config__WEBPACK_IMPORTED_MODULE_4__.CAMERA_POSITION.Y, _config__WEBPACK_IMPORTED_MODULE_4__.CAMERA_POSITION.Z);
        return _m;
    })();
    //创建场景
    const scene = (() => {
        const _m = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
        _m.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(_config__WEBPACK_IMPORTED_MODULE_4__.SCENE_BG);
        return _m;
    })();
    //创建灯光
    const hemisphereLight = (function () {
        const _m = new three__WEBPACK_IMPORTED_MODULE_0__.HemisphereLight(_config__WEBPACK_IMPORTED_MODULE_4__.HEMISPHERE_CONF.SC, _config__WEBPACK_IMPORTED_MODULE_4__.HEMISPHERE_CONF.EC, _config__WEBPACK_IMPORTED_MODULE_4__.HEMISPHERE_CONF.I);
        _m.position.set(0, 10, 0);
        return _m;
    })();
    //创建渲染器
    const renderer = (() => {
        const _m = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ canvas: dom, antialias: true, logarithmicDepthBuffer: true });
        _m.setSize(parentConf.width, parentConf.height);
        _m.shadowMap.enabled = true;
        _m.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__.PCFSoftShadowMap;
        return _m;
    })();
    //创建控制器
    const control = (ctx.control = (() => {
        const _m = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_9__.OrbitControls(camera, renderer.domElement);
        _m.enableDamping = true;
        //TODO
        _m.maxDistance = 15;
        _m.minDistance = 1;
        _m.maxPolarAngle = (Math.PI / 180) * 80;
        _m.minPolarAngle = (Math.PI / 180) * 10;
        _m.enablePan = false;
        return _m;
    })());
    scene.add(camera);
    scene.add(hemisphereLight);
    //渲染器方法
    function render() {
        renderer.render(scene, camera);
    }
    ctx.render = render;
    control.update();
    //窗口缩放方法
    ctx.hanlder = () => {
        //更新摄像头宽高比
        camera.aspect = parentConf.width / parentConf.height;
        //更新摄像机投影矩阵，任何参数改变以后必须调用
        camera.updateProjectionMatrix();
        //更新渲染器宽高
        renderer.setSize(parentConf.width, parentConf.height);
        //更新渲染器像素比
        renderer.setPixelRatio(window.devicePixelRatio);
    };
    const createGroup = (g) => {
        return function (...args) {
            args.map((item) => g.add(item.group));
            return g;
        };
    };
    const group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    const addGroup = (ctx.addGroup = createGroup(group));
    //创建屋体
    ctx.createHouse = function createHouse(station) {
        //创建房屋形状
        const houseIns = _house_cube__WEBPACK_IMPORTED_MODULE_1__["default"].ins(station, manager);
        //创建场地
        const groundIns = _ground__WEBPACK_IMPORTED_MODULE_3__["default"].ins(houseIns.$data);
        //创建屋顶
        const roofIns = _roof__WEBPACK_IMPORTED_MODULE_2__["default"].ins(houseIns.$data, manager);
        addGroup(houseIns, groundIns, roofIns);
        ctx.drawObstacle = (0,_obstacles_index__WEBPACK_IMPORTED_MODULE_7__["default"])(houseIns, group);
        return {
            houseIns,
            groundIns,
            roofIns,
        };
    };
    ctx.createSupport = function createSupport(houseIns, data) {
        const supportIns = _support__WEBPACK_IMPORTED_MODULE_8__["default"].ins(houseIns, data);
        addGroup(supportIns);
    };
    //创建太阳轨迹
    ctx.createSun = function createSun(longitude, latitude, houseIns$Data) {
        const sunIns = _sun__WEBPACK_IMPORTED_MODULE_5__["default"].ins(longitude, latitude, houseIns$Data);
        addGroup(sunIns);
        //日期操作
        return (els) => {
            const operationIns = _operation__WEBPACK_IMPORTED_MODULE_6__["default"].ins(sunIns, els);
            sunIns.init(operationIns).then((now) => {
                operationIns.setElement(now);
                render();
            });
            ctx.onDate = new Function();
            operationIns.events.onChange = ([evt, dateObject, key]) => {
                render();
                ctx.onDate(evt, dateObject, key);
            };
        };
    };
    scene.add(group);
    //TODO取消动画帧
    ctx.cancelAnimation = () => {
        cancelAnimationFrame(ctx.animationId);
        ctx.animationId = null;
    };
    manager.onLoad = function () {
        render();
    };
    return ctx;
});


/***/ }),
/* 72 */
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__72__;

/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cube)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74);
/* harmony import */ var three_csg_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(75);
/* harmony import */ var three_csg_ts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(three_csg_ts__WEBPACK_IMPORTED_MODULE_2__);
/// <reference path="../../../node_modules/@types/three/src/Three.d.ts" />




class Cube {
    group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    mesh = Object.create(null);
    get $data() {
        return this.config;
    }
    defColor = "#eddac5";
    config = Object.create(null);
    constructor(data, manager) {
        const { roofTemplate } = data;
        //创建房屋
        this.config = this.setConfig(data);
        this.mesh = this.createHouse(this.config.l, this.config.w);
        let mainEave = this.createEave(this.config.eave_l, this.config.eave_w);
        const houseTexture = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader(manager).load("textures/house.jpg");
        houseTexture.wrapS = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping;
        houseTexture.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping;
        houseTexture.repeat.set(this.$data.w * 2, this.$data.h / 0.2);
        if (roofTemplate != 0) {
            const { cropRect } = data.threeOptions;
            cropRect.forEach((d) => {
                const w = d.long / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR;
                const l = d.width / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR;
                const [x, y] = d.point;
                const _house = this.createHouse(w, l);
                const _eave = this.createEave(w, l);
                _eave.position.x = _house.position.x = x / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR - this.config.l / 2 + w / 2;
                _eave.position.z = _house.position.z = y / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR - this.config.w / 2 + l / 2;
                _house.updateMatrix();
                _eave.updateMatrix();
                mainEave = three_csg_ts__WEBPACK_IMPORTED_MODULE_2__.CSG.subtract(mainEave, _eave);
                this.mesh = three_csg_ts__WEBPACK_IMPORTED_MODULE_2__.CSG.subtract(this.mesh, _house);
            });
        }
        this.group.add(this.mesh);
        this.mesh.material.map = houseTexture;
        {
            const { max } = new three__WEBPACK_IMPORTED_MODULE_0__.Box3().setFromObject(this.mesh);
            const eaveTexture = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader(manager).load("textures/eave.jpg");
            mainEave.material.map = eaveTexture;
            mainEave.position.y = max.y;
            this.group.add(mainEave);
        }
        this.mesh.castShadow = true;
    }
    createHouse(a, b) {
        return new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(a, this.config.h, b), new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: new three__WEBPACK_IMPORTED_MODULE_0__.Color(this.config.c) }));
    }
    createEave(a, b) {
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(a, this.config.eave_h, b), new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ depthTest: false, color: this.config.eave_c }));
        mesh.receiveShadow = true;
        return mesh;
    }
    setConfig(data) {
        const { width, long } = data.threeOptions.originRect;
        const w = width / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR;
        const l = long / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR;
        const h = data.roofHeight / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR;
        const c = this.defColor;
        const expand = _config__WEBPACK_IMPORTED_MODULE_1__.EAVE.EXPAND;
        const eave_h = _config__WEBPACK_IMPORTED_MODULE_1__.EAVE.H;
        const eave_w = w;
        const eave_l = l;
        return {
            w,
            h,
            l,
            c,
            expand,
            eave_h,
            eave_w,
            eave_l,
            eave_c: _config__WEBPACK_IMPORTED_MODULE_1__.EAVE.COLOR,
            d: data,
            rt: data.roofType,
        };
    }
    static ins(data, manager) {
        return new Cube(data, manager);
    }
}


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CAMERA_POSITION: () => (/* binding */ CAMERA_POSITION),
/* harmony export */   EAVE: () => (/* binding */ EAVE),
/* harmony export */   FAR: () => (/* binding */ FAR),
/* harmony export */   FOV: () => (/* binding */ FOV),
/* harmony export */   HEMISPHERE_CONF: () => (/* binding */ HEMISPHERE_CONF),
/* harmony export */   NEAR: () => (/* binding */ NEAR),
/* harmony export */   NUMERATOR: () => (/* binding */ NUMERATOR),
/* harmony export */   SCENE_BG: () => (/* binding */ SCENE_BG)
/* harmony export */ });
const NUMERATOR = 5000;
//摄像机视锥体垂直视野角度
const FOV = 75;
//摄像机视锥体近端面
const NEAR = 0.1;
//摄像机视锥体远端面
const FAR = 1000;
//透视相机位置
const CAMERA_POSITION = {
    X: 0,
    Y: 5,
    Z: 5,
};
const HEMISPHERE_CONF = {
    SC: 0xffffe2,
    EC: 0x080820,
    I: 0.5,
};
const SCENE_BG = 0x8ad0ff;
const EAVE = {
    H: 0.02,
    EXPAND: 0.001,
    COLOR: 0x919191,
};


/***/ }),
/* 75 */
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__75__;

/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Roof)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74);


/**
 * @description: 组件底板 ,重写支架support.ts
 */
class Support {
    group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    board = Object.create(null);
    cylinder = Object.create(null);
    compData = Object.create(null);
    houseData = Object.create(null);
    compIns = Object.create(null);
    static ins(compIns, houseData) {
        return new Support(compIns, houseData);
    }
    constructor(compIns, houseData) {
        this.compData = compIns.$data;
        this.compIns = compIns;
        this.houseData = houseData;
        this.board = this.createBoard();
        //  this.cylinder = this.createCylinder();
        this.group.add(this.board);
        // this.group.add(this.cylinder);
    }
    static BORAD_H = 0.01;
    createBoard() {
        const h = Support.BORAD_H;
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(this.compData.w, h, this.compData.l), new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0xdddddd }));
        mesh.position.x = this.compData.x;
        mesh.position.y = this.compData.y + this.houseData.h / 2 + this.houseData.eave_h - h - 0.005;
        mesh.position.z = this.compData.z - Math.cos((Math.PI / 180) * (90 - this.compData.tiltAngle)) * (h + 0.01);
        this.compIns.setRotation(mesh);
        return mesh;
    }
    static CYLINER = {
        H: 0.01,
        W: 0.01,
    };
    createCylinder() {
        const _height = this.compData.height + (Math.sin((Math.PI / 180) * this.compData.tiltAngle) * this.compData.l) / 2;
        const cylinder = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(Support.CYLINER.W, Support.CYLINER.H, _height, 3), new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.5, metalness: 0.5 }));
        cylinder.position.x = this.compData.x;
        cylinder.position.z = this.compData.z;
        cylinder.position.y = this.houseData.h / 2 + _height / 2 + _config__WEBPACK_IMPORTED_MODULE_1__.EAVE.H / 2;
        cylinder.castShadow = true;
        return cylinder;
    }
}
//0北 1南 2西 3东
class Component {
    static H = 0.02;
    static ins(data, manager) {
        return new Component(data, manager);
    }
    mesh = Object.create(null);
    data = Object.create(null);
    constructor(data, manager) {
        this.data = this.setSizeData(data);
        const texture = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader(manager).load("textures/component.png");
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(this.data.w, this.data.h, this.data.l), new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ map: texture, metalness: 0.7, roughness: 0.7 }));
        const conf = this.setConf(data, mesh);
        mesh.position.x = conf.x;
        mesh.position.y = conf.y;
        mesh.position.z = conf.z;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.setRotation(mesh);
        mesh.userData["ins"] = this;
        this.mesh = mesh;
    }
    setRotation(mesh) {
        let { position } = this.data;
        switch (position) {
            case 0:
                mesh.rotation.x = -1 * (Math.PI / 180) * this.data.tiltAngle;
                break;
            case 1:
                mesh.rotation.x = (Math.PI / 180) * this.data.tiltAngle;
                break;
            case 2:
                mesh.rotation.z = (Math.PI / 180) * this.data.tiltAngle;
                break;
            case 3:
                mesh.rotation.z = -1 * (Math.PI / 180) * this.data.tiltAngle;
                break;
            default:
                mesh.rotation.x = (Math.PI / 180) * this.data.tiltAngle;
                break;
        }
    }
    setConf(data, mesh) {
        const position0 = data.coordinates[0];
        const posOx = position0.x / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR;
        const posOy = position0.y / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR;
        let y1 = this.$data.height + (Math.sin((Math.PI / 180) * data.tiltAngle) * data.width) / 2 / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR;
        let y2 = this.$data.height + (Math.sin((Math.PI / 180) * data.tiltAngle) * data.length) / 2 / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR;
        (data.position == 2 || data.position == 3) && ([y1, y2] = [y2, y1]);
        const conf = data.direction == 1
            ? {
                x: posOx - (this.$data.l - this.$data.w) / 2,
                z: posOy + (this.$data.l - this.$data.w) / 2,
                y: y1,
                direction: data.direction,
            }
            : {
                x: posOx,
                z: posOy,
                y: y2,
                direction: data.direction,
            };
        this.data = Object.assign(this.data, conf);
        return conf;
    }
    setSizeData(data) {
        const params = data.direction != 1 ? { l: data.length, w: data.width } : { w: data.length, l: data.width };
        return {
            l: params.l / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR,
            w: params.w / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR,
            h: Component.H,
            height: data.height / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR,
            tiltAngle: data.tiltAngle,
            position: data.position,
        };
    }
    get $data() {
        return this.data;
    }
}
class Roof {
    group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    houseData = Object.create(null);
    manager = Object.create(null);
    constructor(houseData, manager) {
        this.houseData = houseData;
        this.manager = manager;
    }
    drawComp(list) {
        const setOrigin = this.createOrigin(this.houseData, list[0].modules[0]);
        const compGroup = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
        const supportGroup = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
        setOrigin(compGroup);
        setOrigin(supportGroup, { y: 0 });
        list.forEach((item, index) => {
            const { modules } = item;
            modules.forEach((ite, idx) => {
                const compIns = Component.ins({ ...ite, tiltAngle: item.tiltAngle }, this.manager);
                const supportIns = Support.ins(compIns, this.houseData);
                compGroup.add(compIns.mesh);
                supportGroup.add(supportIns.group);
            });
        });
        this.group.add(compGroup);
        this.group.add(supportGroup);
    }
    // public drawObstacle(list: Record<string, any>[]) {
    //   const obstacleGroup = new THREE.Group();
    //   list.forEach((item: Record<string, any>) => {
    //     let ins: (...args: any) => any | undefined = obstacle[item.type];
    //     if (!ins) {
    //       //默认障碍物
    //       ins = obstacle.default;
    //     }
    //     const instance = ins(item, this.houseData);
    //     obstacleGroup.add(instance.g);
    //   });
    //   this.group.add(obstacleGroup);
    // }
    createOrigin(houseData, firstCompData) {
        const _x = (-1 * houseData.l) / 2 + firstCompData.width / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR / 2;
        const _z = (-1 * houseData.w) / 2 + firstCompData.length / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR / 2;
        const _y = houseData.h / 2 + houseData.eave_h;
        return function (object, position) {
            let x = position?.x ?? _x;
            let y = position?.y ?? _y;
            let z = position?.z ?? _z;
            object.applyMatrix4(new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4().makeTranslation(x, y, z));
        };
    }
    static ins(houseData, manager) {
        return new Roof(houseData, manager);
    }
}


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ground)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);

class Ground {
    group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    houseData = Object.create(null);
    static ins(houseData) {
        return new Ground(houseData);
    }
    constructor(houseData) {
        this.houseData = houseData;
        this.group.add(this.createPlace());
    }
    createPlace() {
        const size = Math.max(this.houseData.w, this.houseData.l) * 10;
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(size, size), new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0xbababa, side: three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide }));
        mesh.rotation.x = -(Math.PI / 180) * 90;
        mesh.position.y = -this.houseData.h / 2 - 0.01;
        mesh.receiveShadow = true;
        return mesh;
    }
}


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sun)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var suncalc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(79);
/* harmony import */ var suncalc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(suncalc__WEBPACK_IMPORTED_MODULE_1__);



class Sun {
    lon;
    lat;
    houseData;
    static ins(lon, lat, houseData) {
        return new Sun(lon, lat, houseData);
    }
    group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    sun = Object.create(null);
    light = Object.create(null);
    elIns = Object.create(null);
    trackLine = Object.create(null);
    positions = [];
    raycolor = 0xffeb3b;
    dateObject = Object.create(null);
    lightHelper = Object.create(null);
    createDateObject(ins) {
        return ((o, _this) => {
            const object = Object.create({});
            Object.defineProperty(object, "year", {
                set(v) {
                    o.year = v;
                },
                get() {
                    return o.year;
                },
            });
            Object.defineProperty(object, "month", {
                set(v) {
                    o.month = v + 1;
                    ins.elsMap.month.setAttribute("value", o.month);
                },
                get() {
                    return o.month;
                },
            });
            Object.defineProperty(object, "day", {
                set(v) {
                    o.day = v;
                    ins.elsMap.day.setAttribute("value", v);
                },
                get() {
                    return o.day;
                },
            });
            Object.defineProperty(object, "timestamp", {
                set(v) {
                    o.timestamp = v;
                },
                get() {
                    return o.timestamp;
                },
            });
            Object.defineProperty(object, "time", {
                set(v) {
                    o.time = v;
                    const defaultHourValue = _this.positions.findIndex((item) => o.timestamp <= item.timestamp) || 1;
                    ins.elsMap.hour.setAttribute("value", String(defaultHourValue));
                },
                get() {
                    return o.time;
                },
            });
            Object.defineProperty(object, "strDate", {
                set(v) {
                    o.strDate = v;
                    ins.titleEl.innerHTML = v;
                },
                get() {
                    return o.strDate;
                },
            });
            return object;
        })(Object.create({}), this);
    }
    createSun() {
        return new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.IcosahedronGeometry(0.2, 2), new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0xffc900 }));
    }
    createLight() {
        const Light = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(0xffffff, 1);
        Light.castShadow = true;
        Light.shadow.mapSize.set(1024 * 2, 1024 * 2);
        return Light;
    }
    getLastDay(d) {
        return new Date(d.getFullYear(), Number(d.getMonth()) + 1, 0).getDate();
    }
    createTrackLine() {
        return new three__WEBPACK_IMPORTED_MODULE_0__.LineSegments(new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry(), new three__WEBPACK_IMPORTED_MODULE_0__.LineBasicMaterial({
            color: 0x999999,
        }));
    }
    updateTrackLine(vertices) {
        this.trackLine.geometry.setAttribute("position", new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(vertices, 3));
    }
    setNowSunInfo(d) {
        const { position, year, month, day, timestamp, strDate, time } = this.computedSunData(d);
        const lightScale = 2;
        const [x, y, z] = position;
        this.sun.position.set(x, y, z);
        this.light.position.set(x * lightScale, y * lightScale, z * lightScale);
        Promise.resolve().then(() => {
            this.lightHelper.update();
        });
        try {
            this.dateObject.year = year;
            this.dateObject.month = month;
            this.dateObject.day = day;
            this.dateObject.timestamp = timestamp;
            this.dateObject.strDate = strDate;
            this.dateObject.time = time;
        }
        catch (err) {
            console.log(err);
        }
    }
    getTrackData(d) {
        const sumtimes = suncalc__WEBPACK_IMPORTED_MODULE_1___default().getTimes(d, this.lat, this.lon);
        const sunrise = sumtimes.sunrise;
        const sunset = sumtimes.sunset;
        const endValue = Math.ceil((sumtimes.sunset - sumtimes.sunrise) / (60 * 1000) / 5);
        const startValue = 5 - (sumtimes.sunrise.getMinutes() - 10 * Math.floor(sumtimes.sunrise.getMinutes() / 10));
        const vertices = [];
        const list = [];
        list.push(this.computedSunData(sunrise));
        for (let i = 1; i < endValue; i++) {
            const d = this.computedSunData(new Date(sunrise.getFullYear(), sunrise.getMonth(), sunrise.getDate(), sunrise.getHours(), sunrise.getMinutes() + startValue + (i - 1) * 5));
            list.push(d);
            vertices.push(...d.position);
        }
        list.push(this.computedSunData(sunset));
        this.positions = list;
        this.elIns.updateSunInfo(sumtimes);
        return {
            vertices,
        };
    }
    computedSunData(d) {
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        const hour = d.getHours();
        const min = d.getMinutes();
        const timestamp = d.getTime();
        const sumpos = suncalc__WEBPACK_IMPORTED_MODULE_1___default().getPosition(d, this.lat, this.lon);
        let y = Math.sin(sumpos.altitude);
        const c = Math.sqrt(1 - Math.pow(y, 2));
        let x = -c * Math.sin(sumpos.azimuth);
        let z = c * Math.cos(sumpos.azimuth);
        const time = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
        const scale = 20 + this.houseData.h / 2;
        return {
            strDate: `${year}年${month + 1}月${day}日${time}`,
            position: [(x *= scale), (y *= scale), (z *= scale)],
            year,
            month,
            day,
            timestamp,
            hour,
            min,
            d,
            time,
        };
    }
    addGroup(...args) {
        args.map((o) => this.group.add(o));
    }
    async init(operationIns) {
        this.dateObject = this.createDateObject((this.elIns = operationIns));
        let now = new Date();
        let { vertices } = this.getTrackData(now);
        this.updateTrackLine(vertices);
        const start = this.positions[0];
        const end = this.positions[this.positions.length - 1];
        const firstDate = new Date(start.d);
        const lastDate = new Date(end.d);
        if (now.getTime() >= lastDate.getTime()) {
            now = lastDate;
        }
        else if (now.getTime() <= firstDate.getTime()) {
            now = firstDate;
        }
        return now;
    }
    constructor(lon, lat, houseData) {
        this.lon = lon;
        this.lat = lat;
        this.houseData = houseData;
        this.light = this.createLight();
        this.sun = this.createSun();
        this.trackLine = this.createTrackLine();
        this.lightHelper = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLightHelper(this.light, Math.max(this.houseData.l / 2, this.houseData.w / 2), this.raycolor);
        this.addGroup(this.light, this.sun, this.trackLine, this.lightHelper);
    }
}


/***/ }),
/* 79 */
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__79__;

/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Operation)
/* harmony export */ });
class Operation {
    sunIns;
    titleEl = document.querySelector("#title");
    sunEl = document.createElement("div");
    elsMap = Object.create(null);
    defElements = () => ({
        hour: document.querySelector("#hour"),
        month: document.querySelector("#month"),
        day: document.querySelector("#day"),
        title: document.querySelector("#title"),
        info: document.querySelector("#sunInfo"),
    });
    get $inputType() {
        return {
            month: "月",
            day: "日",
            hour: "时",
        };
    }
    static ins(sunIns, els) {
        return new Operation(sunIns, els);
    }
    events = {
        onChange() { },
    };
    setInputRange(key, conf) {
        conf.min && this.elsMap[key].setAttribute("min", conf.min);
        conf.max && this.elsMap[key].setAttribute("max", conf.max);
    }
    constructor(sunIns, elsMap = {}) {
        this.sunIns = sunIns;
        this.elsMap = Object.assign(this.defElements(), elsMap);
        this.registerEvent(sunIns);
    }
    setElement(now) {
        this.setInputRange("month", { min: "1", max: "12" });
        this.setInputRange("day", { min: "1", max: String(this.sunIns.getLastDay(new Date())) });
        this.setInputRange("hour", { min: "0", max: String(this.sunIns.positions.length - 1) });
        this.sunIns.setNowSunInfo(now);
    }
    updateSunInfo(sumtimes) {
        this.elsMap.info.innerHTML = `<span>日出:${sumtimes.sunrise.getHours()}:${String(sumtimes.sunrise.getMinutes()).padStart(2, "0")}</span><span>日落:${sumtimes.sunset.getHours()}:${String(sumtimes.sunset.getMinutes()).padStart(2, "0")}</span>`;
    }
    on(...args) {
        for (let key in this.events) {
            Promise.resolve().then(() => this.events[key](args));
        }
    }
    registerEvent(sunIns) {
        const hour = (e) => {
            const now = sunIns.positions[Number(e.target.value)];
            sunIns.setNowSunInfo(now.d);
            this.on(e, now, "hour");
        };
        const month = (e) => {
            const now = new Date(`${sunIns.dateObject.year}/${String(e.target.value).padStart(2, "0")}/${String(sunIns.dateObject.day).padStart(2, "0")} ${sunIns.dateObject.time}:00`);
            const { vertices } = sunIns.getTrackData(now);
            sunIns.updateTrackLine(vertices);
            sunIns.setNowSunInfo(now);
            this.setInputRange("hour", { max: String(sunIns.positions.length - 1) });
            this.on(e, now, "month");
        };
        const day = (e) => {
            const now = new Date(`${sunIns.dateObject.year}/${sunIns.dateObject.month}/${e.target.value} ${sunIns.dateObject.time}`);
            const { vertices } = sunIns.getTrackData(now);
            sunIns.updateTrackLine(vertices);
            sunIns.setNowSunInfo(now);
            this.setInputRange("hour", { max: String(sunIns.positions.length - 1) });
            this.on(e, now, "day");
        };
        this.elsMap.hour.addEventListener("input", hour);
        this.elsMap.month.addEventListener("input", month);
        this.elsMap.day.addEventListener("input", day);
        return {
            hour,
            month,
            day,
        };
    }
}


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createObstacle)
/* harmony export */ });
/* harmony import */ var _obstacle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(82);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);


const map = (function register(o) {
    const m = Object.create(null);
    Object.values(o).map((t) => (m[t.type] = t.ins));
    return m;
})(_obstacle__WEBPACK_IMPORTED_MODULE_0__);
function createObstacle(houseIns, group) {
    return (list) => {
        const obstacleGroup = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
        list.forEach((item) => {
            let ins = map[item.type];
            if (!ins) {
                //默认障碍物
                ins = map.default;
            }
            const instance = ins(item, houseIns.$data);
            obstacleGroup.add(instance.g);
        });
        group.add(obstacleGroup);
    };
}


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefType: () => (/* binding */ DefType),
/* harmony export */   Type0: () => (/* binding */ Type0),
/* harmony export */   Type1: () => (/* binding */ Type1),
/* harmony export */   Type10: () => (/* binding */ Type10),
/* harmony export */   Type2: () => (/* binding */ Type2),
/* harmony export */   Type3: () => (/* binding */ Type3),
/* harmony export */   Type4: () => (/* binding */ Type4),
/* harmony export */   Type5: () => (/* binding */ Type5),
/* harmony export */   Type6: () => (/* binding */ Type6),
/* harmony export */   Type7: () => (/* binding */ Type7),
/* harmony export */   Type8: () => (/* binding */ Type8),
/* harmony export */   Type9: () => (/* binding */ Type9)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74);
/* harmony import */ var three_csg_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(75);
/* harmony import */ var three_csg_ts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(three_csg_ts__WEBPACK_IMPORTED_MODULE_2__);



class Base {
    g;
    data = Object.create(null);
    get $data() {
        return this.data;
    }
    w = 0;
    h = 0;
    l = 0;
    position = Object.create(null);
    shape = 0;
    constructor(data) {
        const { actualHeight, length, width, shape, roofInside, x, y } = data;
        this.g = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
        this.position = {
            x,
            y,
        };
        this.w = Number((width / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR).toFixed(6));
        this.h = Number((actualHeight / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR).toFixed(6));
        this.l = Number((length / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR).toFixed(6));
        this.shape = shape;
        this.data = { x, y, height: actualHeight, length, width, isRoofInside: roofInside };
    }
    get topIdx() {
        return this.shape == 1 ? 1 : 2;
    }
    createModel(houseData) {
        const handler = this.shape == 1 ? this.cylinder : this.createCube;
        const mesh = handler.call(this, houseData);
        return mesh;
    }
    createCube(houseData) {
        const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0x999999 });
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(this.w, this.h, this.l), new Array(6).fill(material.clone()));
        const positionY = this.data.isRoofInside ? houseData.h / 2 + this.h / 2 : houseData.h / -2 + this.h / 2;
        mesh.position.y = positionY;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.x = this.position.x / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR + this.w / 2 - houseData.l / 2;
        mesh.position.z = this.position.y / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR + this.l / 2 - houseData.w / 2;
        this.g.add(mesh);
        return mesh;
    }
    cylinder(houseData) {
        const r = this.w / 2;
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(r, r, this.h, 32), [new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0x999999 }), new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0x999999 })]);
        const positionY = this.data.isRoofInside ? houseData.h / 2 + this.h / 2 : houseData.h / -2 + this.h / 2;
        mesh.position.y = positionY;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.x = this.position.x / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR + r - houseData.l / 2;
        mesh.position.z = this.position.y / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR + r - houseData.w / 2;
        this.g.add(mesh);
        return mesh;
    }
}
class DefType extends Base {
    static type = "default";
    static label = "默认";
    static ins(data, houseData) {
        return new DefType(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        this.createModel(houseData);
    }
}
class Type8 extends Base {
    static type = 8;
    static label = "女儿墙";
    static ins(data, houseData) {
        return new Type8(data, houseData);
    }
    texture = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load("textures/wall.jpg");
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        this.texture.wrapS = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping;
        this.texture.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.MirroredRepeatWrapping;
        this.l > this.w ? this.texture.repeat.set(this.l * 2, 2) : this.texture.repeat.set(2, this.w * 2);
        mesh.material.forEach((m, idx) => {
            if (idx == this.topIdx) {
                m.color = new three__WEBPACK_IMPORTED_MODULE_0__.Color("#150c01");
            }
            else {
                m.map = this.texture;
            }
        });
    }
}
class Type0 extends Base {
    static type = 0;
    static label = "烟囱";
    static ins(data, houseData) {
        return new Type0(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        const texture = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load("textures/wall.jpg");
        texture.wrapS = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping;
        texture.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.MirroredRepeatWrapping;
        texture.repeat.set(this.h * 2, 2);
        mesh.material.forEach((m, idx) => {
            if (idx == this.topIdx) {
                m.color = new three__WEBPACK_IMPORTED_MODULE_0__.Color("#150c01");
            }
            else {
                m.map = texture;
            }
        });
    }
}
class Type1 extends Base {
    static type = 1;
    static label = "太阳能";
    static ins(data, houseData) {
        return new Type1(data, houseData);
    }
    createTop() {
        const r = 0.03;
        const h = Math.min(this.w, this.l);
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(r, r, h, 32), new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.5 }));
        mesh.rotation.z = (Math.PI / 180) * 90;
        mesh.position.y = h / 2 + r;
        return mesh;
    }
    createComponent(v) {
        const r = (Math.PI / 180) * v;
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(this.w, Math.abs(this.h / Math.cos(r))), new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({
            color: 0x666666,
            metalness: 0.5,
            roughness: 0.5,
            alphaMap: new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load("textures/1.jpg"),
            transparent: true,
            side: three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide,
        }));
        mesh.rotation.x = r;
        mesh.position.z = -1 * (v / Math.abs(v)) * Math.abs(Math.sin(r) * this.l);
        return mesh;
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        const top = this.createTop();
        const body = this.createComponent(-25);
        const bottom = this.createComponent(10);
        mesh.material.forEach((m) => {
            m.transparent = true;
            m.opacity = 0;
            m.depthTest = false;
        });
        mesh.add(top, body, bottom);
    }
}
class Type2 extends Base {
    static type = 2;
    static label = "水箱";
    static ins(data, houseData) {
        return new Type2(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        mesh.material.forEach((m, idx) => {
            if (idx == this.topIdx) {
                m.color = new three__WEBPACK_IMPORTED_MODULE_0__.Color("#41768b");
            }
            else {
                m.color = new three__WEBPACK_IMPORTED_MODULE_0__.Color("#3b7389");
            }
        });
    }
}
class Type3 extends Base {
    static type = 3;
    static label = "树";
    static LEAF = {
        H: 0.15,
        S: 16,
    };
    static ins(data, houseData) {
        return new Type3(data, houseData);
    }
    createLeaf() {
        const scale = 0.9;
        const len = Math.ceil(this.h / (Type3.LEAF.H * scale));
        const group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
        for (let i = 0; i < len; i++) {
            const m = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.ConeGeometry((this.w / len) * (((i + 1) / len) * 2 + 1), Type3.LEAF.H, Type3.LEAF.S), new three__WEBPACK_IMPORTED_MODULE_0__.MeshLambertMaterial({ color: 0x00721a }));
            m.position.y = (len - i) * Type3.LEAF.H * scale - this.h / 2;
            group.add(m);
        }
        return group;
    }
    createMain(houseData) {
        const tree = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(this.w, this.l, this.h, 32), new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial());
        const positionY = this.$data.isRoofInside ? houseData.h / 2 + this.h / 2 : houseData.h / -2 + this.h / 2;
        tree.castShadow = true;
        tree.receiveShadow = true;
        tree.position.y = positionY;
        tree.position.x = this.position.x / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR + this.w / 2 - houseData.l / 2;
        tree.position.z = this.position.y / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR + this.l / 2 - houseData.w / 2;
        return tree;
    }
    constructor(data, houseData) {
        super(data);
        const shadow = this.createMain(houseData);
        const leaf = this.createLeaf();
        const tree = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(0.02, 0.02, this.h, 32), new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0x6a4d00 }));
        shadow.material.transparent = true;
        shadow.material.opacity = 0;
        shadow.add(leaf);
        shadow.add(tree);
        this.g.add(shadow);
    }
}
class Type4 extends Base {
    static type = 4;
    static label = "电线杆";
    static ins(data, houseData) {
        return new Type4(data, houseData);
    }
    createPoles(n) {
        const group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
        const w = 0.2;
        const r = 0.01;
        for (let i = 0; i < n; i++) {
            const m = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(r, r, w, 8), new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhysicalMaterial({ color: 0x999999 }));
            m.position.y = this.h / 2 - 0.05 * (i + 1);
            m.rotation.x = (Math.PI / 180) * 90;
            m.castShadow = true;
            group.add(m);
        }
        return group;
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        mesh.add(this.createPoles(2));
    }
}
class Type5 extends Base {
    static type = 5;
    static label = "炮台";
    static ins(data, houseData) {
        return new Type5(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        const plane = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(0.08, Math.min(this.h, 0.12) * 0.9), new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ side: three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide, map: new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load("textures/window.jpg") }));
        const position = this.w / 2 + 0.0001;
        const rotations = [0, (Math.PI / 180) * 90, (Math.PI / 180) * 90];
        const createWindow = () => plane.clone();
        const doorHeight = 0.15;
        const doorWidth = Math.min(this.h, 0.25) * 0.9;
        const door = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(doorHeight, doorWidth), new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ side: three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide, color: 0x000000 }));
        rotations.forEach((r, idx) => {
            const m = createWindow();
            const result = idx % 2 ? position : -1 * position;
            if (r == 0) {
                m.position.z = result;
            }
            else {
                m.position.x = result;
                m.rotation.y = r;
            }
            mesh.add(m);
        });
        door.position.z = position;
        door.position.y = -1 * (this.h / 2 - doorWidth / 2);
        mesh.add(door);
    }
}
class Type6 extends Base {
    static type = 6;
    static label = "邻居家平屋顶";
    static ins(data, houseData) {
        return new Type6(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createCube(houseData);
        mesh.material.forEach((m, idx) => {
            m.color = new three__WEBPACK_IMPORTED_MODULE_0__.Color("#eddac5");
        });
    }
}
class Type7 extends Base {
    static type = 7;
    static label = "洞口";
    static ins(data, houseData) {
        return new Type7(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        mesh.material.forEach((m, idx) => {
            m.color = new three__WEBPACK_IMPORTED_MODULE_0__.Color("#111");
            if (idx != this.topIdx) {
                m.depthTest = false;
                m.transparent = true;
                m.opacity = 0;
            }
        });
        mesh.castShadow = false;
        mesh.position.y = houseData.h / 2 - this.h / 2 + 0.02;
    }
}
class Type9 extends Base {
    static type = 9;
    static label = "邻居家斜屋顶";
    static roofHeight = 0.05;
    static ins(data, houseData) {
        return new Type9(data, houseData);
    }
    createRoof() {
        const create = () => {
            const scale = this.h > 1.5 ? 0.6 : 0.5;
            const m = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(this.l * scale, this.l * scale, this.w, 6), new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0xffff00 }));
            m.rotation.x = (Math.PI / 180) * -90;
            m.rotation.z = (Math.PI / 180) * -90;
            m.rotation.y = (Math.PI / 180) * -180;
            m.position.y = Math.max(this.l, this.h, this.w) / 2;
            return m;
        };
        const roof_before = create();
        const roof_after = create();
        roof_before.position.z = -this.l / 2;
        roof_after.position.z = this.l / 2;
        roof_before.updateMatrix();
        roof_after.updateMatrix();
        const result = three_csg_ts__WEBPACK_IMPORTED_MODULE_2__.CSG.union(roof_before, roof_after);
        result.castShadow = true;
        result.receiveShadow = true;
        return result;
    }
    constructor(data, houseData) {
        super(data);
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(this.w, this.h, this.l), new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0xeddac5 }));
        const positionY = this.$data.isRoofInside ? houseData.h / 2 + this.h / 2 : houseData.h / -2 + this.h / 2;
        const roof = this.createRoof();
        roof.updateMatrix();
        const result = three_csg_ts__WEBPACK_IMPORTED_MODULE_2__.CSG.subtract(mesh, roof);
        result.position.y = positionY;
        result.castShadow = true;
        result.receiveShadow = true;
        result.position.x = this.position.x / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR + this.w / 2 - houseData.l / 2;
        result.position.z = this.position.y / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR + this.l / 2 - houseData.w / 2;
        this.g.add(result);
    }
}
class Type10 extends Base {
    static type = 10;
    static label = "电线";
    static roofHeight = 0.05;
    static ins(data, houseData) {
        return new Type10(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(this.l, this.w, 0.001);
        const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0x000000 });
        const line = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);
        line.rotation.x = (Math.PI / 180) * 90;
        line.rotation.z = (Math.PI / 180) * 90;
        const positionY = this.$data.isRoofInside ? houseData.h / 2 : houseData.h / -2;
        line.position.y = positionY + this.h;
        line.position.x = this.position.x / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR + this.w / 2 - houseData.l / 2;
        line.position.z = this.position.y / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR + this.l / 2 - houseData.w / 2;
        line.castShadow = true;
        line.receiveShadow = true;
        this.g.add(line);
    }
}


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Support)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74);


class Support {
    houseIns;
    data;
    group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    constructor(houseIns, data) {
        this.houseIns = houseIns;
        this.data = data;
        console.log(this.data);
        this.data.forEach((d) => {
            const mesh = this.createCylinder(d.coordinate.x / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR, d.coordinate.y / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR, d.height / _config__WEBPACK_IMPORTED_MODULE_1__.NUMERATOR);
            this.group.add(mesh);
        });
    }
    static ins(houseIns, data) {
        return new Support(houseIns, data);
    }
    createCylinder(x, z, height) {
        const cylinder = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(0.01, 0.01, height, 3), new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.5 }));
        cylinder.position.x = x - this.houseIns.$data.l / 2;
        cylinder.position.z = z - this.houseIns.$data.w / 2;
        cylinder.position.y = height / 2 + this.houseIns.$data.h / 2 + _config__WEBPACK_IMPORTED_MODULE_1__.EAVE.H / 2;
        cylinder.castShadow = true;
        return cylinder;
    }
}


/***/ }),
/* 84 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MapControls: () => (/* binding */ MapControls),
/* harmony export */   OrbitControls: () => (/* binding */ OrbitControls)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);


// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one-finger move
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

const _changeEvent = { type: 'change' };
const _startEvent = { type: 'start' };
const _endEvent = { type: 'end' };

class OrbitControls extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {

	constructor( object, domElement ) {

		super();

		this.object = object;
		this.domElement = domElement;
		this.domElement.style.touchAction = 'none'; // disable touch scroll

		// Set to false to disable this control
		this.enabled = true;

		// "target" sets the location of focus, where the object orbits around
		this.target = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		// How far you can dolly in and out ( PerspectiveCamera only )
		this.minDistance = 0;
		this.maxDistance = Infinity;

		// How far you can zoom in and out ( OrthographicCamera only )
		this.minZoom = 0;
		this.maxZoom = Infinity;

		// How far you can orbit vertically, upper and lower limits.
		// Range is 0 to Math.PI radians.
		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians

		// How far you can orbit horizontally, upper and lower limits.
		// If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
		this.minAzimuthAngle = - Infinity; // radians
		this.maxAzimuthAngle = Infinity; // radians

		// Set to true to enable damping (inertia)
		// If damping is enabled, you must call controls.update() in your animation loop
		this.enableDamping = false;
		this.dampingFactor = 0.05;

		// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
		// Set to false to disable zooming
		this.enableZoom = true;
		this.zoomSpeed = 1.0;

		// Set to false to disable rotating
		this.enableRotate = true;
		this.rotateSpeed = 1.0;

		// Set to false to disable panning
		this.enablePan = true;
		this.panSpeed = 1.0;
		this.screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up
		this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

		// Set to true to automatically rotate around the target
		// If auto-rotate is enabled, you must call controls.update() in your animation loop
		this.autoRotate = false;
		this.autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60

		// The four arrow keys
		this.keys = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' };

		// Mouse buttons
		this.mouseButtons = { LEFT: three__WEBPACK_IMPORTED_MODULE_0__.MOUSE.ROTATE, MIDDLE: three__WEBPACK_IMPORTED_MODULE_0__.MOUSE.DOLLY, RIGHT: three__WEBPACK_IMPORTED_MODULE_0__.MOUSE.PAN };

		// Touch fingers
		this.touches = { ONE: three__WEBPACK_IMPORTED_MODULE_0__.TOUCH.ROTATE, TWO: three__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_PAN };

		// for reset
		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.zoom0 = this.object.zoom;

		// the target DOM element for key events
		this._domElementKeyEvents = null;

		//
		// public methods
		//

		this.getPolarAngle = function () {

			return spherical.phi;

		};

		this.getAzimuthalAngle = function () {

			return spherical.theta;

		};

		this.getDistance = function () {

			return this.object.position.distanceTo( this.target );

		};

		this.listenToKeyEvents = function ( domElement ) {

			domElement.addEventListener( 'keydown', onKeyDown );
			this._domElementKeyEvents = domElement;

		};

		this.saveState = function () {

			scope.target0.copy( scope.target );
			scope.position0.copy( scope.object.position );
			scope.zoom0 = scope.object.zoom;

		};

		this.reset = function () {

			scope.target.copy( scope.target0 );
			scope.object.position.copy( scope.position0 );
			scope.object.zoom = scope.zoom0;

			scope.object.updateProjectionMatrix();
			scope.dispatchEvent( _changeEvent );

			scope.update();

			state = STATE.NONE;

		};

		// this method is exposed, but perhaps it would be better if we can make it private...
		this.update = function () {

			const offset = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

			// so camera.up is the orbit axis
			const quat = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion().setFromUnitVectors( object.up, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3( 0, 1, 0 ) );
			const quatInverse = quat.clone().invert();

			const lastPosition = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
			const lastQuaternion = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion();

			const twoPI = 2 * Math.PI;

			return function update() {

				const position = scope.object.position;

				offset.copy( position ).sub( scope.target );

				// rotate offset to "y-axis-is-up" space
				offset.applyQuaternion( quat );

				// angle from z-axis around y-axis
				spherical.setFromVector3( offset );

				if ( scope.autoRotate && state === STATE.NONE ) {

					rotateLeft( getAutoRotationAngle() );

				}

				if ( scope.enableDamping ) {

					spherical.theta += sphericalDelta.theta * scope.dampingFactor;
					spherical.phi += sphericalDelta.phi * scope.dampingFactor;

				} else {

					spherical.theta += sphericalDelta.theta;
					spherical.phi += sphericalDelta.phi;

				}

				// restrict theta to be between desired limits

				let min = scope.minAzimuthAngle;
				let max = scope.maxAzimuthAngle;

				if ( isFinite( min ) && isFinite( max ) ) {

					if ( min < - Math.PI ) min += twoPI; else if ( min > Math.PI ) min -= twoPI;

					if ( max < - Math.PI ) max += twoPI; else if ( max > Math.PI ) max -= twoPI;

					if ( min <= max ) {

						spherical.theta = Math.max( min, Math.min( max, spherical.theta ) );

					} else {

						spherical.theta = ( spherical.theta > ( min + max ) / 2 ) ?
							Math.max( min, spherical.theta ) :
							Math.min( max, spherical.theta );

					}

				}

				// restrict phi to be between desired limits
				spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

				spherical.makeSafe();


				spherical.radius *= scale;

				// restrict radius to be between desired limits
				spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

				// move target to panned location

				if ( scope.enableDamping === true ) {

					scope.target.addScaledVector( panOffset, scope.dampingFactor );

				} else {

					scope.target.add( panOffset );

				}

				offset.setFromSpherical( spherical );

				// rotate offset back to "camera-up-vector-is-up" space
				offset.applyQuaternion( quatInverse );

				position.copy( scope.target ).add( offset );

				scope.object.lookAt( scope.target );

				if ( scope.enableDamping === true ) {

					sphericalDelta.theta *= ( 1 - scope.dampingFactor );
					sphericalDelta.phi *= ( 1 - scope.dampingFactor );

					panOffset.multiplyScalar( 1 - scope.dampingFactor );

				} else {

					sphericalDelta.set( 0, 0, 0 );

					panOffset.set( 0, 0, 0 );

				}

				scale = 1;

				// update condition is:
				// min(camera displacement, camera rotation in radians)^2 > EPS
				// using small-angle approximation cos(x/2) = 1 - x^2 / 8

				if ( zoomChanged ||
					lastPosition.distanceToSquared( scope.object.position ) > EPS ||
					8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

					scope.dispatchEvent( _changeEvent );

					lastPosition.copy( scope.object.position );
					lastQuaternion.copy( scope.object.quaternion );
					zoomChanged = false;

					return true;

				}

				return false;

			};

		}();

		this.dispose = function () {

			scope.domElement.removeEventListener( 'contextmenu', onContextMenu );

			scope.domElement.removeEventListener( 'pointerdown', onPointerDown );
			scope.domElement.removeEventListener( 'pointercancel', onPointerCancel );
			scope.domElement.removeEventListener( 'wheel', onMouseWheel );

			scope.domElement.removeEventListener( 'pointermove', onPointerMove );
			scope.domElement.removeEventListener( 'pointerup', onPointerUp );


			if ( scope._domElementKeyEvents !== null ) {

				scope._domElementKeyEvents.removeEventListener( 'keydown', onKeyDown );

			}

			//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

		};

		//
		// internals
		//

		const scope = this;

		const STATE = {
			NONE: - 1,
			ROTATE: 0,
			DOLLY: 1,
			PAN: 2,
			TOUCH_ROTATE: 3,
			TOUCH_PAN: 4,
			TOUCH_DOLLY_PAN: 5,
			TOUCH_DOLLY_ROTATE: 6
		};

		let state = STATE.NONE;

		const EPS = 0.000001;

		// current position in spherical coordinates
		const spherical = new three__WEBPACK_IMPORTED_MODULE_0__.Spherical();
		const sphericalDelta = new three__WEBPACK_IMPORTED_MODULE_0__.Spherical();

		let scale = 1;
		const panOffset = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
		let zoomChanged = false;

		const rotateStart = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
		const rotateEnd = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
		const rotateDelta = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();

		const panStart = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
		const panEnd = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
		const panDelta = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();

		const dollyStart = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
		const dollyEnd = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
		const dollyDelta = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();

		const pointers = [];
		const pointerPositions = {};

		function getAutoRotationAngle() {

			return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

		}

		function getZoomScale() {

			return Math.pow( 0.95, scope.zoomSpeed );

		}

		function rotateLeft( angle ) {

			sphericalDelta.theta -= angle;

		}

		function rotateUp( angle ) {

			sphericalDelta.phi -= angle;

		}

		const panLeft = function () {

			const v = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

			return function panLeft( distance, objectMatrix ) {

				v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
				v.multiplyScalar( - distance );

				panOffset.add( v );

			};

		}();

		const panUp = function () {

			const v = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

			return function panUp( distance, objectMatrix ) {

				if ( scope.screenSpacePanning === true ) {

					v.setFromMatrixColumn( objectMatrix, 1 );

				} else {

					v.setFromMatrixColumn( objectMatrix, 0 );
					v.crossVectors( scope.object.up, v );

				}

				v.multiplyScalar( distance );

				panOffset.add( v );

			};

		}();

		// deltaX and deltaY are in pixels; right and down are positive
		const pan = function () {

			const offset = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

			return function pan( deltaX, deltaY ) {

				const element = scope.domElement;

				if ( scope.object.isPerspectiveCamera ) {

					// perspective
					const position = scope.object.position;
					offset.copy( position ).sub( scope.target );
					let targetDistance = offset.length();

					// half of the fov is center to top of screen
					targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

					// we use only clientHeight here so aspect ratio does not distort speed
					panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
					panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

				} else if ( scope.object.isOrthographicCamera ) {

					// orthographic
					panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
					panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

				} else {

					// camera neither orthographic nor perspective
					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
					scope.enablePan = false;

				}

			};

		}();

		function dollyOut( dollyScale ) {

			if ( scope.object.isPerspectiveCamera ) {

				scale /= dollyScale;

			} else if ( scope.object.isOrthographicCamera ) {

				scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
				scope.object.updateProjectionMatrix();
				zoomChanged = true;

			} else {

				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
				scope.enableZoom = false;

			}

		}

		function dollyIn( dollyScale ) {

			if ( scope.object.isPerspectiveCamera ) {

				scale *= dollyScale;

			} else if ( scope.object.isOrthographicCamera ) {

				scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
				scope.object.updateProjectionMatrix();
				zoomChanged = true;

			} else {

				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
				scope.enableZoom = false;

			}

		}

		//
		// event callbacks - update the object state
		//

		function handleMouseDownRotate( event ) {

			rotateStart.set( event.clientX, event.clientY );

		}

		function handleMouseDownDolly( event ) {

			dollyStart.set( event.clientX, event.clientY );

		}

		function handleMouseDownPan( event ) {

			panStart.set( event.clientX, event.clientY );

		}

		function handleMouseMoveRotate( event ) {

			rotateEnd.set( event.clientX, event.clientY );

			rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

			const element = scope.domElement;

			rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

			rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

			rotateStart.copy( rotateEnd );

			scope.update();

		}

		function handleMouseMoveDolly( event ) {

			dollyEnd.set( event.clientX, event.clientY );

			dollyDelta.subVectors( dollyEnd, dollyStart );

			if ( dollyDelta.y > 0 ) {

				dollyOut( getZoomScale() );

			} else if ( dollyDelta.y < 0 ) {

				dollyIn( getZoomScale() );

			}

			dollyStart.copy( dollyEnd );

			scope.update();

		}

		function handleMouseMovePan( event ) {

			panEnd.set( event.clientX, event.clientY );

			panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

			pan( panDelta.x, panDelta.y );

			panStart.copy( panEnd );

			scope.update();

		}

		function handleMouseWheel( event ) {

			if ( event.deltaY < 0 ) {

				dollyIn( getZoomScale() );

			} else if ( event.deltaY > 0 ) {

				dollyOut( getZoomScale() );

			}

			scope.update();

		}

		function handleKeyDown( event ) {

			let needsUpdate = false;

			switch ( event.code ) {

				case scope.keys.UP:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						rotateUp( 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

					} else {

						pan( 0, scope.keyPanSpeed );

					}

					needsUpdate = true;
					break;

				case scope.keys.BOTTOM:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						rotateUp( - 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

					} else {

						pan( 0, - scope.keyPanSpeed );

					}

					needsUpdate = true;
					break;

				case scope.keys.LEFT:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						rotateLeft( 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

					} else {

						pan( scope.keyPanSpeed, 0 );

					}

					needsUpdate = true;
					break;

				case scope.keys.RIGHT:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						rotateLeft( - 2 * Math.PI * scope.rotateSpeed / scope.domElement.clientHeight );

					} else {

						pan( - scope.keyPanSpeed, 0 );

					}

					needsUpdate = true;
					break;

			}

			if ( needsUpdate ) {

				// prevent the browser from scrolling on cursor keys
				event.preventDefault();

				scope.update();

			}


		}

		function handleTouchStartRotate() {

			if ( pointers.length === 1 ) {

				rotateStart.set( pointers[ 0 ].pageX, pointers[ 0 ].pageY );

			} else {

				const x = 0.5 * ( pointers[ 0 ].pageX + pointers[ 1 ].pageX );
				const y = 0.5 * ( pointers[ 0 ].pageY + pointers[ 1 ].pageY );

				rotateStart.set( x, y );

			}

		}

		function handleTouchStartPan() {

			if ( pointers.length === 1 ) {

				panStart.set( pointers[ 0 ].pageX, pointers[ 0 ].pageY );

			} else {

				const x = 0.5 * ( pointers[ 0 ].pageX + pointers[ 1 ].pageX );
				const y = 0.5 * ( pointers[ 0 ].pageY + pointers[ 1 ].pageY );

				panStart.set( x, y );

			}

		}

		function handleTouchStartDolly() {

			const dx = pointers[ 0 ].pageX - pointers[ 1 ].pageX;
			const dy = pointers[ 0 ].pageY - pointers[ 1 ].pageY;

			const distance = Math.sqrt( dx * dx + dy * dy );

			dollyStart.set( 0, distance );

		}

		function handleTouchStartDollyPan() {

			if ( scope.enableZoom ) handleTouchStartDolly();

			if ( scope.enablePan ) handleTouchStartPan();

		}

		function handleTouchStartDollyRotate() {

			if ( scope.enableZoom ) handleTouchStartDolly();

			if ( scope.enableRotate ) handleTouchStartRotate();

		}

		function handleTouchMoveRotate( event ) {

			if ( pointers.length == 1 ) {

				rotateEnd.set( event.pageX, event.pageY );

			} else {

				const position = getSecondPointerPosition( event );

				const x = 0.5 * ( event.pageX + position.x );
				const y = 0.5 * ( event.pageY + position.y );

				rotateEnd.set( x, y );

			}

			rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

			const element = scope.domElement;

			rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

			rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

			rotateStart.copy( rotateEnd );

		}

		function handleTouchMovePan( event ) {

			if ( pointers.length === 1 ) {

				panEnd.set( event.pageX, event.pageY );

			} else {

				const position = getSecondPointerPosition( event );

				const x = 0.5 * ( event.pageX + position.x );
				const y = 0.5 * ( event.pageY + position.y );

				panEnd.set( x, y );

			}

			panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

			pan( panDelta.x, panDelta.y );

			panStart.copy( panEnd );

		}

		function handleTouchMoveDolly( event ) {

			const position = getSecondPointerPosition( event );

			const dx = event.pageX - position.x;
			const dy = event.pageY - position.y;

			const distance = Math.sqrt( dx * dx + dy * dy );

			dollyEnd.set( 0, distance );

			dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );

			dollyOut( dollyDelta.y );

			dollyStart.copy( dollyEnd );

		}

		function handleTouchMoveDollyPan( event ) {

			if ( scope.enableZoom ) handleTouchMoveDolly( event );

			if ( scope.enablePan ) handleTouchMovePan( event );

		}

		function handleTouchMoveDollyRotate( event ) {

			if ( scope.enableZoom ) handleTouchMoveDolly( event );

			if ( scope.enableRotate ) handleTouchMoveRotate( event );

		}

		//
		// event handlers - FSM: listen for events and reset state
		//

		function onPointerDown( event ) {

			if ( scope.enabled === false ) return;

			if ( pointers.length === 0 ) {

				scope.domElement.setPointerCapture( event.pointerId );

				scope.domElement.addEventListener( 'pointermove', onPointerMove );
				scope.domElement.addEventListener( 'pointerup', onPointerUp );

			}

			//

			addPointer( event );

			if ( event.pointerType === 'touch' ) {

				onTouchStart( event );

			} else {

				onMouseDown( event );

			}

		}

		function onPointerMove( event ) {

			if ( scope.enabled === false ) return;

			if ( event.pointerType === 'touch' ) {

				onTouchMove( event );

			} else {

				onMouseMove( event );

			}

		}

		function onPointerUp( event ) {

		    removePointer( event );

		    if ( pointers.length === 0 ) {

		        scope.domElement.releasePointerCapture( event.pointerId );

		        scope.domElement.removeEventListener( 'pointermove', onPointerMove );
		        scope.domElement.removeEventListener( 'pointerup', onPointerUp );

		    }

		    scope.dispatchEvent( _endEvent );

		    state = STATE.NONE;

		}

		function onPointerCancel( event ) {

			removePointer( event );

		}

		function onMouseDown( event ) {

			let mouseAction;

			switch ( event.button ) {

				case 0:

					mouseAction = scope.mouseButtons.LEFT;
					break;

				case 1:

					mouseAction = scope.mouseButtons.MIDDLE;
					break;

				case 2:

					mouseAction = scope.mouseButtons.RIGHT;
					break;

				default:

					mouseAction = - 1;

			}

			switch ( mouseAction ) {

				case three__WEBPACK_IMPORTED_MODULE_0__.MOUSE.DOLLY:

					if ( scope.enableZoom === false ) return;

					handleMouseDownDolly( event );

					state = STATE.DOLLY;

					break;

				case three__WEBPACK_IMPORTED_MODULE_0__.MOUSE.ROTATE:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						if ( scope.enablePan === false ) return;

						handleMouseDownPan( event );

						state = STATE.PAN;

					} else {

						if ( scope.enableRotate === false ) return;

						handleMouseDownRotate( event );

						state = STATE.ROTATE;

					}

					break;

				case three__WEBPACK_IMPORTED_MODULE_0__.MOUSE.PAN:

					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

						if ( scope.enableRotate === false ) return;

						handleMouseDownRotate( event );

						state = STATE.ROTATE;

					} else {

						if ( scope.enablePan === false ) return;

						handleMouseDownPan( event );

						state = STATE.PAN;

					}

					break;

				default:

					state = STATE.NONE;

			}

			if ( state !== STATE.NONE ) {

				scope.dispatchEvent( _startEvent );

			}

		}

		function onMouseMove( event ) {

			switch ( state ) {

				case STATE.ROTATE:

					if ( scope.enableRotate === false ) return;

					handleMouseMoveRotate( event );

					break;

				case STATE.DOLLY:

					if ( scope.enableZoom === false ) return;

					handleMouseMoveDolly( event );

					break;

				case STATE.PAN:

					if ( scope.enablePan === false ) return;

					handleMouseMovePan( event );

					break;

			}

		}

		function onMouseWheel( event ) {

			if ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE ) return;

			event.preventDefault();

			scope.dispatchEvent( _startEvent );

			handleMouseWheel( event );

			scope.dispatchEvent( _endEvent );

		}

		function onKeyDown( event ) {

			if ( scope.enabled === false || scope.enablePan === false ) return;

			handleKeyDown( event );

		}

		function onTouchStart( event ) {

			trackPointer( event );

			switch ( pointers.length ) {

				case 1:

					switch ( scope.touches.ONE ) {

						case three__WEBPACK_IMPORTED_MODULE_0__.TOUCH.ROTATE:

							if ( scope.enableRotate === false ) return;

							handleTouchStartRotate();

							state = STATE.TOUCH_ROTATE;

							break;

						case three__WEBPACK_IMPORTED_MODULE_0__.TOUCH.PAN:

							if ( scope.enablePan === false ) return;

							handleTouchStartPan();

							state = STATE.TOUCH_PAN;

							break;

						default:

							state = STATE.NONE;

					}

					break;

				case 2:

					switch ( scope.touches.TWO ) {

						case three__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_PAN:

							if ( scope.enableZoom === false && scope.enablePan === false ) return;

							handleTouchStartDollyPan();

							state = STATE.TOUCH_DOLLY_PAN;

							break;

						case three__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_ROTATE:

							if ( scope.enableZoom === false && scope.enableRotate === false ) return;

							handleTouchStartDollyRotate();

							state = STATE.TOUCH_DOLLY_ROTATE;

							break;

						default:

							state = STATE.NONE;

					}

					break;

				default:

					state = STATE.NONE;

			}

			if ( state !== STATE.NONE ) {

				scope.dispatchEvent( _startEvent );

			}

		}

		function onTouchMove( event ) {

			trackPointer( event );

			switch ( state ) {

				case STATE.TOUCH_ROTATE:

					if ( scope.enableRotate === false ) return;

					handleTouchMoveRotate( event );

					scope.update();

					break;

				case STATE.TOUCH_PAN:

					if ( scope.enablePan === false ) return;

					handleTouchMovePan( event );

					scope.update();

					break;

				case STATE.TOUCH_DOLLY_PAN:

					if ( scope.enableZoom === false && scope.enablePan === false ) return;

					handleTouchMoveDollyPan( event );

					scope.update();

					break;

				case STATE.TOUCH_DOLLY_ROTATE:

					if ( scope.enableZoom === false && scope.enableRotate === false ) return;

					handleTouchMoveDollyRotate( event );

					scope.update();

					break;

				default:

					state = STATE.NONE;

			}

		}

		function onContextMenu( event ) {

			if ( scope.enabled === false ) return;

			event.preventDefault();

		}

		function addPointer( event ) {

			pointers.push( event );

		}

		function removePointer( event ) {

			delete pointerPositions[ event.pointerId ];

			for ( let i = 0; i < pointers.length; i ++ ) {

				if ( pointers[ i ].pointerId == event.pointerId ) {

					pointers.splice( i, 1 );
					return;

				}

			}

		}

		function trackPointer( event ) {

			let position = pointerPositions[ event.pointerId ];

			if ( position === undefined ) {

				position = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
				pointerPositions[ event.pointerId ] = position;

			}

			position.set( event.pageX, event.pageY );

		}

		function getSecondPointerPosition( event ) {

			const pointer = ( event.pointerId === pointers[ 0 ].pointerId ) ? pointers[ 1 ] : pointers[ 0 ];

			return pointerPositions[ pointer.pointerId ];

		}

		//

		scope.domElement.addEventListener( 'contextmenu', onContextMenu );

		scope.domElement.addEventListener( 'pointerdown', onPointerDown );
		scope.domElement.addEventListener( 'pointercancel', onPointerCancel );
		scope.domElement.addEventListener( 'wheel', onMouseWheel, { passive: false } );

		// force an update at start

		this.update();

	}

}


// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
// This is very similar to OrbitControls, another set of touch behavior
//
//    Orbit - right mouse, or left mouse + ctrl/meta/shiftKey / touch: two-finger rotate
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - left mouse, or arrow keys / touch: one-finger move

class MapControls extends OrbitControls {

	constructor( object, domElement ) {

		super( object, domElement );

		this.screenSpacePanning = false; // pan orthogonal to world-space direction camera.up

		this.mouseButtons.LEFT = three__WEBPACK_IMPORTED_MODULE_0__.MOUSE.PAN;
		this.mouseButtons.RIGHT = three__WEBPACK_IMPORTED_MODULE_0__.MOUSE.ROTATE;

		this.touches.ONE = three__WEBPACK_IMPORTED_MODULE_0__.TOUCH.PAN;
		this.touches.TWO = three__WEBPACK_IMPORTED_MODULE_0__.TOUCH.DOLLY_ROTATE;

	}

}




/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});