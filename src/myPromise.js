/**Promise 实现 **/

function MyPromise (fn){
    let state = 'pending';
    let PromiseResult = null;
    // then 函数列表
    const fulfilledcallbacks = [];
    const rejectedcallbacks = [];
    // then接收两个回调, 成功，失败
    this.then = function(s,f){
        const succeedCallback = typeof s === 'function' ?  s : ()=>s;
        const failCallback = typeof f === 'function' ?  f : ()=>f;
        var thenPormise =  new MyPromise((resolve, reject)=>{
            const resolvePromise = cb => {
                try {
                    const x = cb(this.PromiseResult)
                    if (x === thenPromise) {
                        // 不能返回自身哦
                        throw new Error('不能返回自身。。。')
                    }
                    if (x instanceof MyPromise) {
                        // 如果返回值是Promise
                        // 如果返回值是promise对象，返回值为成功，新promise就是成功
                        // 如果返回值是promise对象，返回值为失败，新promise就是失败
                        // 谁知道返回的promise是失败成功？只有then知道
                        x.then(resolve, reject)
                    } else {
                        // 非Promise就直接成功
                        resolve(x)
                    }
                } catch (err) {
                    // 处理报错
                    reject(err)
                    throw new Error(err)
                }
            }
            if(state === 'fulfilled'){
                resolvePromise(succeedCallback);
            }else if(state === 'rejected'){
                resolvePromise(failCallback);
            }else if(state === 'pending'){
                fulfilledcallbacks.push(succeedCallback);
                rejectedcallbacks.push(failCallback);
            }
        });
        return thenPormise;
    }
    function resolve(newValue){
        if(state !== 'pending')return;
        state = 'fulfilled';
        PromiseResult = newValue;
        while(fulfilledcallbacks.length){
            fulfilledcallbacks.shift()(PromiseResult);
        }
    }
    function reject(){
        if(state !== 'pending') return;
        state = 'rejected';
        while(rejectedcallbacks.length){
            rejectedcallbacks.shift()(PromiseResult);
        }
    }
    // 立即执行传入的函数
    fn(resolve,reject)
}