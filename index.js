/*! klache v1.1.0, https://github.com/woodscreative/klache */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("klache", [], factory);
	else if(typeof exports === 'object')
		exports["klache"] = factory();
	else
		root["klache"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lib.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lib.js":
/*!********************!*\
  !*** ./src/lib.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar klache = {}\nklache.version = '1.0.0'\n\n/**\n * Get local storage object\n *\n * @param string $key the local storage object key\n * @return object payload or null if empty or expired\n */\nklache.get = function ($key) {\n  if (!window.localStorage.getItem($key)) {\n    return\n  };\n  var payload = JSON.parse(window.localStorage.getItem($key))\n  if (payload) {\n    // set to true to expire this storage item\n    var hasExpired = false\n\n    // check storage version...\n    var v = payload.storage.version\n    if (v !== klache.version) {\n      hasExpired = true\n    };\n\n    // check cache expiry...\n    if (payload.storage.expires > 0) {\n      var now = klache.getTimestamp()\n      var cacheExpiryTime = parseFloat(payload.storage.expires)\n      var timestamp = payload.storage.timestamp\n      var secondsThatHaveExpired = cacheExpiryTime - (now - timestamp)\n      if (secondsThatHaveExpired <= 0) {\n        hasExpired = true\n      };\n    };\n\n    // Expired?\n    if (hasExpired) {\n      klache.removeKey($key)\n      return null\n    };\n    return payload.data\n  };\n}\n\n/**\n * Get todays date as timestamp\n *\n * @return int\n */\nklache.getTimestamp = function () {\n  return parseInt(new Date().getTime() / 1000)\n}\n\n/**\n * Clear all local storage objects\n */\nklache.removeAll = function () {\n  window.localStorage.clear()\n}\n\n/**\n * Clear local storage object by key\n * @param string $key the storage key\n */\nklache.removeKey = function ($key) {\n  window.localStorage.removeItem($key)\n}\n\n/**\n * Set local storage object\n *\n * @param string $key the local storage object key\n * @param object $payload the object to store\n * @param int $expiryInSeconds the expiry time in seconds\n * @return object payload.data the payload\n */\nklache.set = function ($key, $payload, $expiryInSeconds) {\n  var payload = {}\n\n  // the storage configuration...\n  payload.storage = {\n    // version the storage item\n    version: klache.version,\n    // the current timestamp in seconds\n    timestamp: klache.getTimestamp(),\n    // the cache expiry time in seconds\n    expires: 0\n  }\n\n  // if defined add expiry time in seconds...\n  if ($expiryInSeconds) {\n    payload.storage.expires = $expiryInSeconds\n  };\n\n  // add data property\n  payload.data = $payload\n\n  window.localStorage.setItem($key, JSON.stringify(payload))\n  return payload.data\n}\n\nmodule.exports = klache\nmodule.exports.default = klache\n\n\n//# sourceURL=webpack://klache/./src/lib.js?");

/***/ })

/******/ });
});