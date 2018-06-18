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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content_scripts/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// 默认(Markdown 格式文档)的环境列表地址
exports.defaultMarkDownSourceUrl = "https://github.com/TingGe/multi-env-switch/raw/master/multi-env-list.md";
// 联系作者地址
exports.authorLink = "https://github.com/TingGe/multi-env-switch";
// 事件类型
var requestEnum;
(function (requestEnum) {
    requestEnum["type"] = "FROM_PAGE";
})(requestEnum = exports.requestEnum || (exports.requestEnum = {}));
// 指令名称
var actionEnum;
(function (actionEnum) {
    actionEnum["copy"] = "copy";
})(actionEnum = exports.actionEnum || (exports.actionEnum = {}));
// 内容页面信息命名空间
var pageInfoEnum;
(function (pageInfoEnum) {
    pageInfoEnum["debug"] = "DEBUG_INFO";
})(pageInfoEnum = exports.pageInfoEnum || (exports.pageInfoEnum = {}));


/***/ }),

/***/ "./src/content_scripts/index.ts":
/*!**************************************!*\
  !*** ./src/content_scripts/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var consts_1 = __webpack_require__(/*! ./../consts */ "./src/consts.ts");
var utils_1 = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/** 监听 popup 页指令消息 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    try {
        request.action === consts_1.actionEnum.copy && utils_1.insertScript("js/inject.js");
    }
    catch (ex) {
        console.log("insertScript Fail:", ex.message);
        chrome.runtime.sendMessage({ type: consts_1.requestEnum.type, text: "" });
    }
});
/** 监听 inject 的消息，并把 pageInfo 传给 popup */
window.addEventListener("message", function (event) {
    event.data.type &&
        event.data.type == consts_1.requestEnum.type &&
        chrome.runtime.sendMessage(event.data);
}, false);


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** 解析 URL */
function parseUrl(
// url 字符串
url, 
// 目标字段
field) {
    var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    var result = parse_url.exec(url) || [];
    var index = [
        "url",
        "scheme",
        "slash",
        "host",
        "port",
        "path",
        "query",
        "hash"
    ].indexOf(field);
    return result[index];
}
exports.parseUrl = parseUrl;
/** 向页面插入JS */
function insertScript(jsPath) {
    jsPath = jsPath || "js/inject.js";
    var temp = document.createElement("script");
    temp.setAttribute("type", "text/javascript");
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}
exports.insertScript = insertScript;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudF9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsMkJBQTJCO0FBQ2QsZ0NBQXdCLEdBQ25DLHlFQUF5RSxDQUFDO0FBRTVFLFNBQVM7QUFDSSxrQkFBVSxHQUFHLDRDQUE0QyxDQUFDO0FBRXZFLE9BQU87QUFDUCxJQUFZLFdBRVg7QUFGRCxXQUFZLFdBQVc7SUFDckIsaUNBQWtCO0FBQ3BCLENBQUMsRUFGVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUV0QjtBQUVELE9BQU87QUFDUCxJQUFZLFVBRVg7QUFGRCxXQUFZLFVBQVU7SUFDcEIsMkJBQWE7QUFDZixDQUFDLEVBRlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFFckI7QUFFRCxhQUFhO0FBQ2IsSUFBWSxZQUVYO0FBRkQsV0FBWSxZQUFZO0lBQ3RCLG9DQUFvQjtBQUN0QixDQUFDLEVBRlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFFdkI7Ozs7Ozs7Ozs7Ozs7OztBQ3BCRCx5RUFBc0Q7QUFDdEQsb0VBQXdDO0FBRXhDLHFCQUFxQjtBQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBUyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVk7SUFDekUsSUFBSTtRQUNGLE9BQU8sQ0FBQyxNQUFNLEtBQUssbUJBQVUsQ0FBQyxJQUFJLElBQUksb0JBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUNwRTtJQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbEU7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILHlDQUF5QztBQUN6QyxNQUFNLENBQUMsZ0JBQWdCLENBQ3JCLFNBQVMsRUFDVCxVQUFTLEtBQUs7SUFDWixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUk7UUFDYixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxvQkFBVyxDQUFDLElBQUk7UUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLENBQUMsRUFDRCxLQUFLLENBQ04sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDdEJGLGFBQWE7QUFDYjtBQUNFLFVBQVU7QUFDVixHQUFXO0FBQ1gsT0FBTztBQUNQLEtBUVU7SUFFVixJQUFNLFNBQVMsR0FBRyxpR0FBaUcsQ0FBQztJQUNwSCxJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxJQUFNLEtBQUssR0FBRztRQUNaLEtBQUs7UUFDTCxRQUFRO1FBQ1IsT0FBTztRQUNQLE1BQU07UUFDTixNQUFNO1FBQ04sTUFBTTtRQUNOLE9BQU87UUFDUCxNQUFNO0tBQ1AsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQTNCRCw0QkEyQkM7QUFFRCxjQUFjO0FBQ2Qsc0JBQTZCLE1BQU07SUFDakMsTUFBTSxHQUFHLE1BQU0sSUFBSSxjQUFjLENBQUM7SUFDbEMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRztRQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFURCxvQ0FTQyIsImZpbGUiOiJjb250ZW50U2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvbnRlbnRfc2NyaXB0cy9pbmRleC50c1wiKTtcbiIsIi8vIOm7mOiupChNYXJrZG93biDmoLzlvI/mlofmoaMp55qE546v5aKD5YiX6KGo5Zyw5Z2AXG5leHBvcnQgY29uc3QgZGVmYXVsdE1hcmtEb3duU291cmNlVXJsID1cbiAgXCJodHRwczovL2dpdGh1Yi5jb20vVGluZ0dlL211bHRpLWVudi1zd2l0Y2gvcmF3L21hc3Rlci9tdWx0aS1lbnYtbGlzdC5tZFwiO1xuXG4vLyDogZTns7vkvZzogIXlnLDlnYBcbmV4cG9ydCBjb25zdCBhdXRob3JMaW5rID0gXCJodHRwczovL2dpdGh1Yi5jb20vVGluZ0dlL211bHRpLWVudi1zd2l0Y2hcIjtcblxuLy8g5LqL5Lu257G75Z6LXG5leHBvcnQgZW51bSByZXF1ZXN0RW51bSB7XG4gIHR5cGUgPSBcIkZST01fUEFHRVwiXG59XG5cbi8vIOaMh+S7pOWQjeensFxuZXhwb3J0IGVudW0gYWN0aW9uRW51bSB7XG4gIGNvcHkgPSBcImNvcHlcIlxufVxuXG4vLyDlhoXlrrnpobXpnaLkv6Hmga/lkb3lkI3nqbrpl7RcbmV4cG9ydCBlbnVtIHBhZ2VJbmZvRW51bSB7XG4gIGRlYnVnID0gXCJERUJVR19JTkZPXCJcbn1cbiIsImltcG9ydCB7IHJlcXVlc3RFbnVtLCBhY3Rpb25FbnVtIH0gZnJvbSAnLi8uLi9jb25zdHMnO1xuaW1wb3J0IHsgaW5zZXJ0U2NyaXB0IH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbi8qKiDnm5HlkKwgcG9wdXAg6aG15oyH5Luk5raI5oGvICovXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgdHJ5IHtcbiAgICByZXF1ZXN0LmFjdGlvbiA9PT0gYWN0aW9uRW51bS5jb3B5ICYmIGluc2VydFNjcmlwdChcImpzL2luamVjdC5qc1wiKTtcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICBjb25zb2xlLmxvZyhcImluc2VydFNjcmlwdCBGYWlsOlwiLCBleC5tZXNzYWdlKTtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6IHJlcXVlc3RFbnVtLnR5cGUsIHRleHQ6IFwiXCIgfSk7XG4gIH1cbn0pO1xuXG4vKiog55uR5ZCsIGluamVjdCDnmoTmtojmga/vvIzlubbmioogcGFnZUluZm8g5Lyg57uZIHBvcHVwICovXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgXCJtZXNzYWdlXCIsXG4gIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQuZGF0YS50eXBlICYmXG4gICAgICBldmVudC5kYXRhLnR5cGUgPT0gcmVxdWVzdEVudW0udHlwZSAmJlxuICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoZXZlbnQuZGF0YSk7XG4gIH0sXG4gIGZhbHNlXG4pO1xuIiwiLyoqIOino+aekCBVUkwgKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVybChcbiAgLy8gdXJsIOWtl+espuS4slxuICB1cmw6IHN0cmluZyxcbiAgLy8g55uu5qCH5a2X5q61XG4gIGZpZWxkOlxuICAgIHwgXCJ1cmxcIlxuICAgIHwgXCJzY2hlbWVcIlxuICAgIHwgXCJzbGFzaFwiXG4gICAgfCBcImhvc3RcIlxuICAgIHwgXCJwb3J0XCJcbiAgICB8IFwicGF0aFwiXG4gICAgfCBcInF1ZXJ5XCJcbiAgICB8IFwiaGFzaFwiXG4pIHtcbiAgY29uc3QgcGFyc2VfdXJsID0gL14oPzooW0EtWmEtel0rKTopPyhcXC97MCwzfSkoWzAtOS5cXC1BLVphLXpdKykoPzo6KFxcZCspKT8oPzpcXC8oW14/I10qKSk/KD86XFw/KFteI10qKSk/KD86IyguKikpPyQvO1xuICBjb25zdCByZXN1bHQgPSBwYXJzZV91cmwuZXhlYyh1cmwpIHx8IFtdO1xuICBjb25zdCBpbmRleCA9IFtcbiAgICBcInVybFwiLFxuICAgIFwic2NoZW1lXCIsXG4gICAgXCJzbGFzaFwiLFxuICAgIFwiaG9zdFwiLFxuICAgIFwicG9ydFwiLFxuICAgIFwicGF0aFwiLFxuICAgIFwicXVlcnlcIixcbiAgICBcImhhc2hcIlxuICBdLmluZGV4T2YoZmllbGQpO1xuICByZXR1cm4gcmVzdWx0W2luZGV4XTtcbn1cblxuLyoqIOWQkemhtemdouaPkuWFpUpTICovXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0U2NyaXB0KGpzUGF0aCkge1xuICBqc1BhdGggPSBqc1BhdGggfHwgXCJqcy9pbmplY3QuanNcIjtcbiAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gIHRlbXAuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvamF2YXNjcmlwdFwiKTtcbiAgdGVtcC5zcmMgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTChqc1BhdGgpO1xuICB0ZW1wLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgfTtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0ZW1wKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=