# multi-worker



### 安装

```bash
yarn add  @mfelibs/multiWorker --save
```

通过 `import` 导入
```javascript
import multiWorker from '@mfelibs/multiWorker'
```

### 使用

调用 `multiWorker` 构造函数，创建multiWorker实例:
```javascript
const config = { //可配置的config选项
  maxWorkers:4 ,//最大可并行的worker数，默认取navigator.hardwareConcurrency
}
mWorker = new multiWorker(config);

mWorker.add().excu(recurFib,[10]).then(()=>{
  console.log(res) //output->55
})


```

```

function recurFib(n) {
    if (n == 1 || n == 2) {
        return 1;
    }
    return recurFib(n - 1) + recurFib(n - 2);
   
}

```



### multiWorker方法

#### add



- id : `String | Number`  创建worker的id，参数为空时会自动分配id `(非必需) `

- fn : `Function`  worker 要执行的方法 `(非必需) `
- args : `Any`  此方法的参数 `(非必需) `


<!-- 其他参数会 assgin 到worker对象上。 `( 非必需) ` -->

> 此方法默认返回当前worker的实例
> 通过add方法创建的worker会加入队列中，队列最大并行的worker可通过maxWorker配置




示例：
```javascript
mWorker.add()

或

mWorker.add({
  id:id,
  fn:recurFib,
  args:10 ,
  xx:xxx
})

```

#### getWorker

- id:根据id查找已创建的worker; `( 非必需) `
  - id为空时返回全部worker的集合
  - id为String|Number时 ，返回指定worker
  - id为Array时，返回指定id 的 worker集合



示例：
```javascript
mWorker.getWorker(id)
```

#### getIdleWorker
- id:根据id查找空闲的worker;`( 非必需) `
  - id为空时返回全部worker
  - id为String|Number时 ，返回指定worker
  - id为Array时，返回指定id 的 worker集合

示例：
```javascript
mWorker.getWorker(id)

```

#### removeWorker

- id: 根据id 终止worker进程`( 非必需) `
  - id为终止全部worker
  - id为String|Number时 ，终止单个worker
  - id为Array时，终止指定id 的 worker集合

无返回值

示例：
```javascript
mWorker.kill(id)
```

#### race
类似Promise.race，返回最先在worker中执行完的结果
- excuFn: `Array`  执行的方法和参数`( 必需) `
 `[ { fn: fn1, args: args1 },{ fn: fn2, args: args2 }{ fn: fn3, args: args3 }]`
  - fn为执行的函数
  - args为参数

无返回值

示例：
```javascript

mWorker.race([{ fn: recurFib, args: 2 }, { fn: recurFib, args: 10 }]).then((res) => {
    document.write(`Fibonacci(${10}):${res}<br>`)
})
```


#### all
类似Promise.all，返回在worker中执行完的全部结果
- excuFn: `Array`  执行的方法和参数`( 必需) `
 `[ { fn: fn1, args: args1 },{ fn: fn2, args: args2 }{ fn: fn3, args: args3 }]`
  - fn为执行的函数
  - args为参数

无返回值

示例：
```javascript

mWorker.all([{ fn: recurFib, args: 2 }, { fn: recurFib, args: 10 }]).then((res) => {
    document.write(`<mark>all</mark> : Fibonacci(${20}),Fibonacci(${10}):<mark>${res}</mark><br>`) // 2 
})


### worker方法

#### excu
接受两个参数 fn，args
- fn:需要在webWorker里执行的方法 `(必需) `
- args:依赖的参数 `(非必需) `


```

mWorker.getWorker(id).excu(recurFib,[10]).then((res)=>{
  console.log(res) //output->55
}).catch((error)=>{
  console.log(error);
})

```
