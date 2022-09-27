/** new 的实现 **/
function objectFactory() {
    // 新建一个对象
    let newobj = new Object();
    // 获取第一个参数 构造函数 shift回改变原来数字，去掉arguments第一个
    Constructor = [].shift.call(arguments);
    // 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
    newobj._proto_ = Constructor.prototype;
    // 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
    Constructor.apply(obj, arguments);
    return newobj;
};
