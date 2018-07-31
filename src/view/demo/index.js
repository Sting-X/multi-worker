import mWorker from './../../core/index';

var multiWorker = new mWorker({
    maxWorkers: 1
});


function recurFib(n) {
    if (n == 1 || n == 2) {

        return 1;
    }
    return recurFib(n - 1) + recurFib(n - 2);
}



multiWorker.add({ id: 1 })


// 创建指定idworker，计算
multiWorker.add({id:10}).excu(recurFib,[10]).then((res)=>{
    console.log('创建指定id worker，计算');
    console.log(res);
    document.write(`Fibonacci(${10}):${res}<br>`)
})

//创建 worker，计算 （自动分配id）
multiWorker.add().excu(recurFib, 20).then((res) => {
    console.log('创建 worker，计算 （自动分配id）');
    console.log(res);
    document.write(`Fibonacci(${20}):${res}<br>`)
})

//查找id为1的worker

multiWorker.getWorker(1).excu(recurFib, 30).then((res) => {
    console.log('查找id为10的worker');
    console.log(res);
    document.write(`Fibonacci(${30}):${res}<br>`)
})

//race方法
var raceWorker = multiWorker.race([{ fn: recurFib, args: 30 }, { fn: recurFib, args: 10 }]);
raceWorker.then((res) => {
    console.log('race方法', res);
    document.write(`<mark>race</mark> : Fibonacci(${30}),Fibonacci(${10}):<mark>${res}</mark><br>`)
});

//all方法
var allWorker = multiWorker.all([{ fn: recurFib, args: 20 }, { fn: recurFib, args: 10 }]);
allWorker.then((res) => {                                                                           
    console.log('all方法', res);// [6765,55];
    document.write(`<mark>all</mark> : Fibonacci(${20}),Fibonacci(${10}):<mark>${res}</mark><br>`)   //6765,55
}).then(()=>{
//终止 全部worker
    document.write(`2s后销毁全部worker<br>`);

}).then(()=>{
    setTimeout(() => {
        // multiWorker.kill()
        document.write(`全部worker已销毁`)
    }, 2000)
})




