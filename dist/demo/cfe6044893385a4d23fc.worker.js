/*!
 * @version 1.0.5
 * @date 2018-07-31
 */
!function(r){var e={};function n(t){if(e[t])return e[t].exports;var o=e[t]={i:t,l:!1,exports:{}};return r[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=r,n.c=e,n.d=function(r,e,t){n.o(r,e)||Object.defineProperty(r,e,{configurable:!1,enumerable:!0,get:t})},n.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return n.d(e,"a",e),e},n.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},n.p="./",n(n.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__utils_GeneralUtils_js__=__webpack_require__(1),handler={_fn:null,_args:null,excu:function excu(){if(!handler._fn)throw new SyntaxError("Function parameter missing");var args=handler._args,fn=eval("("+handler._fn+")");return Array.isArray(args)?fn.apply(fn,args):fn.call(fn,args)}};self.onmessage=function(r){var e=r.data,n=e._fn,t=e._args;e._method;n&&(handler._fn=__WEBPACK_IMPORTED_MODULE_0__utils_GeneralUtils_js__.a.deSerializeFunction(n),handler._args=__WEBPACK_IMPORTED_MODULE_0__utils_GeneralUtils_js__.a.parseJson(t));var o=handler.excu();self.postMessage(__WEBPACK_IMPORTED_MODULE_0__utils_GeneralUtils_js__.a.stringifyJson(o))}},function(r,e,n){"use strict";var t={isPromise:function(r){return r&&"function"===typeof r.then},isArray:function(r){return"[object Array]"==Object.prototype.toString.call(r)},isObject:function(r){return"[object Object]"!==Object.prototype.toString.call(r)},id2Arr:function(r){if([].push(r),"[object Array]"==Object.prototype.toString.call(r))return r},serializeFunction:function(r){return!(!r||"function"!==typeof r)&&encodeURI(r.toString())},deSerializeFunction:function(r){return!(!r||"string"!==typeof r)&&decodeURI(r)},serializeError:function(r){var e=void 0,n={},t=["name","message","stack","custom"];if(r instanceof Error){for(e=t.length-1;e>=0;e--)n[t[e]]=r[t[e]];return n}return n},deSerializeError:function(r){var e=void 0,n=new Error("");if(!r)return n;var t=Object.keys(r);for(e=0;e<t.length;e++)n[t[e]]=r[t[e]];return n},stringifyJson:function(r,e){try{r=JSON.stringify(r)}catch(r){console.warn(e)}return r},parseJson:function(r,e){var n=void 0;try{n=JSON.parse(r)}catch(r){console.warn(e)}return n}};e.a=t}]);