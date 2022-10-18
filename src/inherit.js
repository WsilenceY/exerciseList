
// 父类 Persion
function Person(){
    thie.name = 'p';
}
Person.prototype.sayName = function(){
    console.log('hello,my name is'+ this.name);
}

//原型链继承 问题：引用类型的属性都会被共享 不能向父类传参数
function Friend(){}
Friend.prototype = new Person();
//盗用构造函数 解决了原型链的问题 问题：方法在构造函数中回重复创建
function Friend(){
    Person.call(this);
}
//组合继承
function Friend(){
    Person.call(this);
}
Friend.prototype = new Person();
Friend.prototype.hobby = ['eat', 'sss']
//原型式继承
function objFactory(person){
    function o(){};
    o.prototype = person;
    return o;
}
//寄生式继承
function objFac(person){
    const c = Object.create(person);
    c.hobby = function (){
        console.log('i like eat')
    }
    return c;
}
//寄生组合式继承
