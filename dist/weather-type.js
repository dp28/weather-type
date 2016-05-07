/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	var WeatherType = (function () {
	    function WeatherType(raw) {
	        this.raw = raw;
	    }
	    return WeatherType;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = WeatherType;
	var PreciptitationType;
	(function (PreciptitationType) {
	    PreciptitationType[PreciptitationType["Rain"] = 0] = "Rain";
	    PreciptitationType[PreciptitationType["Sleet"] = 1] = "Sleet";
	    PreciptitationType[PreciptitationType["Snow"] = 2] = "Snow";
	    PreciptitationType[PreciptitationType["Hail"] = 3] = "Hail";
	})(PreciptitationType || (PreciptitationType = {}));
	var PrecipitationIntensity;
	(function (PrecipitationIntensity) {
	    PrecipitationIntensity[PrecipitationIntensity["Light"] = 0] = "Light";
	    PrecipitationIntensity[PrecipitationIntensity["Heavy"] = 1] = "Heavy";
	})(PrecipitationIntensity || (PrecipitationIntensity = {}));
	var PrecipitationDuration;
	(function (PrecipitationDuration) {
	    PrecipitationDuration[PrecipitationDuration["Showers"] = 0] = "Showers";
	    PrecipitationDuration[PrecipitationDuration["Steady"] = 1] = "Steady";
	})(PrecipitationDuration || (PrecipitationDuration = {}));
	var CloudLevel;
	(function (CloudLevel) {
	    CloudLevel[CloudLevel["Broken"] = 0] = "Broken";
	    CloudLevel[CloudLevel["Light"] = 1] = "Light";
	    CloudLevel[CloudLevel["Heavy"] = 2] = "Heavy";
	    CloudLevel[CloudLevel["Fog"] = 3] = "Fog";
	})(CloudLevel || (CloudLevel = {}));


/***/ }
/******/ ]);
//# sourceMappingURL=weather-type.js.map