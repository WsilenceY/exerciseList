function Element(tagName,props,children){
    this.tagName = tagName;
    this.props = props;
    this.children = children;
}
Element.prototype.render = function(){
    var el = document.createElement(this.tagName);
    var props = this.props;
    for(var propName in props){
        var propValue = props[propName];
        el.setAttribute(propName,propValue);
    }
    var children = this.children || [];
    children.forEach((citem)=>{
        var childEl = (citem instanceof Element) ? 
        citem.render()
        : document.createTextNode(citem);
        el.appendChild(childEl);
    });
    return el;
}

export function createElement(tagName,props,children){
    return new Element(tagName,props,children);
}
export default createElement;