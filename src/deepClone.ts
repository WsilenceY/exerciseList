function clone (target,map = new Map()){
    if(typeof target === 'object' && target !== null){
        // 考虑数组
        const res = Array.isArray(target) ? [] :  {};
        // 考虑循环引用
        if(map.get(target)){
            return target;
        }
        map.set(target, res);
        for(const key in target){
            res[key] = clone(target[key],map);
        }
        return res;
    }else{
        return target;
    }
}
function getTargetType(target){
 // typeof (可判断基础类型) typeof null === 'object'
 //instanceof（可判断具体类型 Array等） 原理在原型链上查找 遍历原型链 有可能不准确
 // Object.prototype.toString.call() （[object Array]） 准确类型
}
function dc(target,m=new Map()){
    if(typeof target === 'object' && target !== null){
        const res = Array.isArray(target) ? [] : {};
        if(m.get(target)){
            return target;
        }
        m.set(target,res)
        for(let key in target){
            res[key] = dc(target[key])
        }
        return res;
    }
    else{
        return target;
    }
}