
const P = function () { 
    const resolver = {};

    resolver.promise = new Promise(function (resolve, reject) {
        resolver.resolve = resolve;
        resolver.reject = reject;
    });
    return resolver;
 }
 


export default P;
