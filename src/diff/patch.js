import {each,setAttr,toArray} from './util';
function patch(node,patches){
    const walker = {index: 0};
    dfsWalk(node, walker, patches);
}
// 深度遍历更新
function dfsWalk(node,walker,patches){
    const currentPatches = patches[walker.index];
    node.childNodes &&
    each(node.childNodes, item => {
      walker.index++;
      dfsWalk(item, walker, patches);
    });
  console.log('-currentPatches-',node,currentPatches)
  currentPatches && applyPatches(node, currentPatches);
}
function applyPatches(node,currentPatches){
    each(currentPatches, item => {
        switch (item.type) {
          case 'REPLACE':
            const nNode = isString(item.node)
              ? document.createTextNode(item.node)
              : item.node.render();
            node.parentNode.replaceChild(nNode, node);
            break;
          case 'REORDER':
            reorderChildren(node, item.moves);
            break;
          case 'PROPS':
            setProps(node, item.props);
            break;
          case 'TEXT':
            if (node.textContent) {
              // 使用纯文本
              node.textContent = item.content;
            } else {
              // 仅仅对CDATA片段，注释comment，Processing Instruction节点或text节点有效
              node.nodeValue = item.content;
            }
            break;
          default:
            throw new Error("Unknown patch type " + item.type);
        }
      });
}
// 修改属性

function setProps (node, props) {
    for (var key in props) {
      if (props[key] === void 666) {
        node.removeAttribute(key)
      } else {
        var value = props[key]
        setAttr(node, key, value)
      }
    }
  }
  
  function reorderChildren (node, moves) {
    var staticNodeList = toArray(node.childNodes)
    var maps = {}
    each(staticNodeList, function (node) {
      if (node.nodeType === 1) {
        var key = node.getAttribute('key')
        if (key) {
          maps[key] = node
        }
      }
    })
  
    each(moves, function (move) {
      var index = move.index
      if (move.type === 0) { // remove item
        if (staticNodeList[index] === node.childNodes[index]) { // maybe have been removed for inserting
          node.removeChild(node.childNodes[index])
        }
        staticNodeList.splice(index, 1)
      } else if (move.type === 1) { // insert item
        var insertNode = maps[move.item.key]
          ? maps[move.item.key].cloneNode(true) // reuse old item
          : (typeof move.item === 'object')
              ? move.item.render()
              : document.createTextNode(move.item)
        staticNodeList.splice(index, 0, insertNode)
        node.insertBefore(insertNode, node.childNodes[index] || null)
      }
    })
  }
export default patch;