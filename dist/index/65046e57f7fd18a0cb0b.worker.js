/*!
 * @version 1.0.3
 * @date 2018-07-12
 */
!function(r){var e={};function t(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return r[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=r,t.c=e,t.d=function(r,e,n){t.o(r,e)||Object.defineProperty(r,e,{configurable:!1,enumerable:!0,get:n})},t.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(e,"a",e),e},t.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},t.p="./",t(t.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__utils_GeneralUtils_js__=__webpack_require__(1),handler={excu:function excu(fn,args){var f=eval("("+fn+")");return Array.isArray(args)?f.apply(f,args):f.call(f,args)}};self.onmessage=function(r){var e=r.data,t=e.fn,n=e.args,o=(e.id,__WEBPACK_IMPORTED_MODULE_0__utils_GeneralUtils_js__.a.deSerializeFunction(t)),i=__WEBPACK_IMPORTED_MODULE_0__utils_GeneralUtils_js__.a.parseJson(n),a=handler.excu(o,i);self.postMessage(__WEBPACK_IMPORTED_MODULE_0__utils_GeneralUtils_js__.a.stringifyJson(a))}},function(r,e,t){"use strict";var n={isPromise:function(r){return r&&"function"===typeof r.then},isArray:function(r){return"[object Array]"==Object.prototype.toString.call(r)},isObject:function(r){return"[object Object]"!==Object.prototype.toString.call(r)},id2Arr:function(r){if([].push(r),"[object Array]"==Object.prototype.toString.call(r))return r},serializeFunction:function(r){return!(!r||"function"!==typeof r)&&encodeURI(r.toString())},deSerializeFunction:function(r){return!(!r||"string"!==typeof r)&&decodeURI(r)},serializeError:function(r){var e=void 0,t={},n=["name","message","stack","custom"];if(r instanceof Error){for(e=n.length-1;e>=0;e--)t[n[e]]=r[n[e]];return t}return t},deSerializeError:function(r){var e=void 0,t=new Error("");if(!r)return t;var n=Object.keys(r);for(e=0;e<n.length;e++)t[n[e]]=r[n[e]];return t},stringifyJson:function(r,e){try{r=JSON.stringify(r)}catch(r){console.warn(e)}return r},parseJson:function(r,e){var t=void 0;try{t=JSON.parse(r)}catch(r){console.warn(e)}return t}};e.a=n}]);