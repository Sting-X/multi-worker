import GeneralUtils from './../utils/GeneralUtils.js';

'use strict';

const handler = {
    _fn  : null,
    _args: null,
    excu(){
        if (!handler._fn) throw new SyntaxError('Function parameter missing');

        let args = handler._args;
   
        let fn = eval('(' + handler._fn + ')');

        return Array.isArray(args) ? fn.apply(fn, args) : fn.call(fn, args);
    },
}
















self.onmessage =  function(e) {
    let { _fn , _args , _method} = e.data;
    if (_fn){
        handler._fn = GeneralUtils.deSerializeFunction(_fn);
        handler._args = GeneralUtils.parseJson(_args);
    }
    let res = handler.excu();
    self.postMessage(GeneralUtils.stringifyJson(res));
   
}

