(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["myex"] = factory();
	else
		root["myex"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/list-diff2/index.js":
/*!******************************************!*\
  !*** ./node_modules/list-diff2/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/diff */ "./node_modules/list-diff2/lib/diff.js").diff


/***/ }),

/***/ "./node_modules/list-diff2/lib/diff.js":
/*!*********************************************!*\
  !*** ./node_modules/list-diff2/lib/diff.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */
function diff (oldList, newList, key) {
  var oldMap = makeKeyIndexAndFree(oldList, key)
  var newMap = makeKeyIndexAndFree(newList, key)

  var newFree = newMap.free

  var oldKeyIndex = oldMap.keyIndex
  var newKeyIndex = newMap.keyIndex

  var moves = []

  // a simulate list to manipulate
  var children = []
  var i = 0
  var item
  var itemKey
  var freeIndex = 0

  // fist pass to check item in old list: if it's removed or not
  while (i < oldList.length) {
    item = oldList[i]
    itemKey = getItemKey(item, key)
    if (itemKey) {
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        children.push(null)
      } else {
        var newItemIndex = newKeyIndex[itemKey]
        children.push(newList[newItemIndex])
      }
    } else {
      var freeItem = newFree[freeIndex++]
      children.push(freeItem || null)
    }
    i++
  }

  var simulateList = children.slice(0)

  // remove items no longer exist
  i = 0
  while (i < simulateList.length) {
    if (simulateList[i] === null) {
      remove(i)
      removeSimulate(i)
    } else {
      i++
    }
  }

  // i is cursor pointing to a item in new list
  // j is cursor pointing to a item in simulateList
  var j = i = 0
  while (i < newList.length) {
    item = newList[i]
    itemKey = getItemKey(item, key)

    var simulateItem = simulateList[j]
    var simulateItemKey = getItemKey(simulateItem, key)

    if (simulateItem) {
      if (itemKey === simulateItemKey) {
        j++
      } else {
        // new item, just inesrt it
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          insert(i, item)
        } else {
          // if remove current simulateItem make item in right place
          // then just remove it
          var nextItemKey = getItemKey(simulateList[j + 1], key)
          if (nextItemKey === itemKey) {
            remove(i)
            removeSimulate(j)
            j++ // after removing, current j is right, just jump to next one
          } else {
            // else insert item
            insert(i, item)
          }
        }
      }
    } else {
      insert(i, item)
    }

    i++
  }

  function remove (index) {
    var move = {index: index, type: 0}
    moves.push(move)
  }

  function insert (index, item) {
    var move = {index: index, item: item, type: 1}
    moves.push(move)
  }

  function removeSimulate (index) {
    simulateList.splice(index, 1)
  }

  return {
    moves: moves,
    children: children
  }
}

/**
 * Convert list to key-item keyIndex object.
 * @param {Array} list
 * @param {String|Function} key
 */
function makeKeyIndexAndFree (list, key) {
  var keyIndex = {}
  var free = []
  for (var i = 0, len = list.length; i < len; i++) {
    var item = list[i]
    var itemKey = getItemKey(item, key)
    if (itemKey) {
      keyIndex[itemKey] = i
    } else {
      free.push(item)
    }
  }
  return {
    keyIndex: keyIndex,
    free: free
  }
}

function getItemKey (item, key) {
  if (!item || !key) return void 666
  return typeof key === 'string'
    ? item[key]
    : key(item)
}

exports.makeKeyIndexAndFree = makeKeyIndexAndFree // exports for test
exports.diff = diff


/***/ }),

/***/ "./src/diff/ element.js":
/*!******************************!*\
  !*** ./src/diff/ element.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

function createElement(tagName,props,children){
    return new Element(tagName,props,children);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createElement);

/***/ }),

/***/ "./src/diff/diff.js":
/*!**************************!*\
  !*** ./src/diff/diff.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/diff/util.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var list_diff2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! list-diff2 */ "./node_modules/list-diff2/index.js");
/* harmony import */ var list_diff2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(list_diff2__WEBPACK_IMPORTED_MODULE_1__);


function difftree(oTree,nTree){
    // 节点位置
    let index = 0;
    // 记录下差异 类型，参数
    const patches = {};
    dfsWalk(oTree,nTree,index,patches);
    return patches;
}

function dfsWalk(oNode,nNode,index,patches){
    console.log('----dfsWalk---',index);
    const currentPatch = [];
    // 没有对应新阶段 首次渲染
    if(nNode === null)return;
    //判断类型 1: 字符串
    if((0,_util__WEBPACK_IMPORTED_MODULE_0__.isString)(oNode) && (0,_util__WEBPACK_IMPORTED_MODULE_0__.isString)(nNode)){
        oNode !== nNode &&
        currentPatch.push({
            type:'TEXT',
            current: nNode
        })
    //2：同种类型标签 且key相同 比较props && 比较子节点
    }else if(oNode.tagName === nNode.tagName && oNode.key === nNode.key){
        // diffprops
        const propsPatch = diffProps(oNode.props,nNode.props);
        propsPatch && 
        currentPatch.push({
            type: 'PROPS',
            props:propsPatch
        });
        // diffchildren
        diffChildren(oNode.children,nNode.children,patches,currentPatch,index);
    //3 以上都不符合 直接替换
    }else{
        currentPatch.push({
            type: 'REPLACE',
            node:nNode
        })
    }
    currentPatch.length && (patches[index] = currentPatch);
}

function diffProps(oProps,nProps){
    let isChange = false;
    const propsPatch = {};
    Object.keys(oProps).forEach((key)=>{
        if(oProps[key] !== nProps[key]){
            !isChange && (isChange=true);
            propsPatch[key] = nProps[key]
        }
    })
    return isChange ? propsPatch : null;
}
function diffChildren(oChildren,nChildren,patchs,currentPatch,index){
    //得出简单移动路径
    const diffMoves = list_diff2__WEBPACK_IMPORTED_MODULE_1___default()(oChildren,nChildren,'key');
        // `moves` is a sequence of actions (remove or insert): 
        // type 0 is removing, type 1 is inserting
        // moves: [
        //   {index: 3, type: 0},
        //   {index: 0, type: 1, item: {id: "c"}}, 
        //   {index: 3, type: 0}, 
        //   {index: 4, type: 1, item: {id: "f"}}
        //  ]
    console.log('--diffMoves-',diffMoves)
    // 保留元素？ 
    nChildren = diffMoves.children;
    // 记录数字改变情况
    diffMoves.moves.length && 
    currentPatch.push({
        type: 'REORDER',
        moves: diffMoves.moves
    });
    // 深度遍历
    let leftNode = null;
    let currentNodeIndex = index;
    oChildren.forEach((ochild,index)=>{
        const nchild = nChildren[index];
        currentNodeIndex =
        leftNode && leftNode.count
        ? currentNodeIndex + leftNode.count + 1
        : currentNodeIndex + 1;
        ochild !== nchild && dfsWalk(ochild,nchild,currentNodeIndex,patchs);
        leftNode = ochild;
    })
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (difftree);

/***/ }),

/***/ "./src/diff/index.js":
/*!***************************!*\
  !*** ./src/diff/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ element */ "./src/diff/ element.js");
/* harmony import */ var _diff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diff */ "./src/diff/diff.js");
/* harmony import */ var _patch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./patch */ "./src/diff/patch.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    el: _element__WEBPACK_IMPORTED_MODULE_0__["default"],
    difftree: _diff__WEBPACK_IMPORTED_MODULE_1__["default"],
    patch: _patch__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/diff/patch.js":
/*!***************************!*\
  !*** ./src/diff/patch.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/diff/util.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_0__);

function patch(node,patches){
    const walker = {index: 0};
    dfsWalk(node, walker, patches);
}
// 深度遍历更新
function dfsWalk(node,walker,patches){
    const currentPatches = patches[walker.index];
    node.childNodes &&
    (0,_util__WEBPACK_IMPORTED_MODULE_0__.each)(node.childNodes, item => {
      walker.index++;
      dfsWalk(item, walker, patches);
    });
  console.log('-currentPatches-',node,currentPatches)
  currentPatches && applyPatches(node, currentPatches);
}
function applyPatches(node,currentPatches){
    (0,_util__WEBPACK_IMPORTED_MODULE_0__.each)(currentPatches, item => {
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
        ;(0,_util__WEBPACK_IMPORTED_MODULE_0__.setAttr)(node, key, value)
      }
    }
  }
  
  function reorderChildren (node, moves) {
    var staticNodeList = (0,_util__WEBPACK_IMPORTED_MODULE_0__.toArray)(node.childNodes)
    var maps = {}
    ;(0,_util__WEBPACK_IMPORTED_MODULE_0__.each)(staticNodeList, function (node) {
      if (node.nodeType === 1) {
        var key = node.getAttribute('key')
        if (key) {
          maps[key] = node
        }
      }
    })
  
    ;(0,_util__WEBPACK_IMPORTED_MODULE_0__.each)(moves, function (move) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (patch);

/***/ }),

/***/ "./src/diff/util.js":
/*!**************************!*\
  !*** ./src/diff/util.js ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

var _ = exports

_.type = function (obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

_.isArray = function isArray (list) {
  return _.type(list) === 'Array'
}

_.slice = function slice (arrayLike, index) {
  return Array.prototype.slice.call(arrayLike, index)
}

_.truthy = function truthy (value) {
  return !!value
}

_.isString = function isString (list) {
  return _.type(list) === 'String'
}

_.each = function each (array, fn) {
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i)
  }
}

_.toArray = function toArray (listLike) {
  if (!listLike) {
    return []
  }

  var list = []

  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i])
  }

  return list
}

_.setAttr = function setAttr (node, key, value) {
  switch (key) {
    case 'style':
      if(node.style){
        node.style.cssText = value;
      }
      break
    case 'value':
      var tagName = node.tagName || ''
      tagName = tagName.toLowerCase()
      if (
        tagName === 'input' || tagName === 'textarea'
      ) {
        node.value = value
      } else {
        // if it is not a input or textarea, use `setAttribute` to set
        node.setAttribute(key, value)
      }
      break
    default:
      node.setAttribute(key, value)
      break
  }
}

/***/ }),

/***/ "./src/flat.js":
/*!*********************!*\
  !*** ./src/flat.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// concat 递归
function flat(arr){
    let resArray = [];
    arr.forEach((a)=>{
        if(Array.isArray(a)){
            resArray = resArray.concat(flat(a));
        }else{
            resArray.push(a)
        }
    })
    return resArray;
}

function flatReduce(arr){
   return arr.reduce((pre,cur)=>{
       return  pre.concat( Array.isArray(cur) ? flatReduce(cur)  : cur)
    },[])
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flat);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _flat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flat */ "./src/flat.js");
/* harmony import */ var _diff_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diff/index */ "./src/diff/index.js");


const u = {
    flat: _flat__WEBPACK_IMPORTED_MODULE_0__["default"],
    diff: _diff_index__WEBPACK_IMPORTED_MODULE_1__["default"]
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (u);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsaUVBQWUsSUFBSTs7Ozs7O1VDbEJuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOMEI7QUFDSztBQUMvQjtBQUNBLFVBQVUsNkNBQUk7QUFDZCxVQUFVLG1EQUFJO0FBQ2Q7QUFDQSxpRUFBZSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teWV4L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9teWV4Ly4vbm9kZV9tb2R1bGVzL2xpc3QtZGlmZjIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbXlleC8uL25vZGVfbW9kdWxlcy9saXN0LWRpZmYyL2xpYi9kaWZmLmpzIiwid2VicGFjazovL215ZXgvLi9zcmMvZGlmZi8gZWxlbWVudC5qcyIsIndlYnBhY2s6Ly9teWV4Ly4vc3JjL2RpZmYvZGlmZi5qcyIsIndlYnBhY2s6Ly9teWV4Ly4vc3JjL2RpZmYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbXlleC8uL3NyYy9kaWZmL3BhdGNoLmpzIiwid2VicGFjazovL215ZXgvLi9zcmMvZGlmZi91dGlsLmpzIiwid2VicGFjazovL215ZXgvLi9zcmMvZmxhdC5qcyIsIndlYnBhY2s6Ly9teWV4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL215ZXgvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbXlleC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbXlleC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL215ZXgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teWV4Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm15ZXhcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wibXlleFwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2RpZmYnKS5kaWZmXG4iLCIvKipcclxuICogRGlmZiB0d28gbGlzdCBpbiBPKE4pLlxyXG4gKiBAcGFyYW0ge0FycmF5fSBvbGRMaXN0IC0gT3JpZ2luYWwgTGlzdFxyXG4gKiBAcGFyYW0ge0FycmF5fSBuZXdMaXN0IC0gTGlzdCBBZnRlciBjZXJ0YWluIGluc2VydGlvbnMsIHJlbW92ZXMsIG9yIG1vdmVzXHJcbiAqIEByZXR1cm4ge09iamVjdH0gLSB7bW92ZXM6IDxBcnJheT59XHJcbiAqICAgICAgICAgICAgICAgICAgLSBtb3ZlcyBpcyBhIGxpc3Qgb2YgYWN0aW9ucyB0aGF0IHRlbGxpbmcgaG93IHRvIHJlbW92ZSBhbmQgaW5zZXJ0XHJcbiAqL1xyXG5mdW5jdGlvbiBkaWZmIChvbGRMaXN0LCBuZXdMaXN0LCBrZXkpIHtcclxuICB2YXIgb2xkTWFwID0gbWFrZUtleUluZGV4QW5kRnJlZShvbGRMaXN0LCBrZXkpXHJcbiAgdmFyIG5ld01hcCA9IG1ha2VLZXlJbmRleEFuZEZyZWUobmV3TGlzdCwga2V5KVxyXG5cclxuICB2YXIgbmV3RnJlZSA9IG5ld01hcC5mcmVlXHJcblxyXG4gIHZhciBvbGRLZXlJbmRleCA9IG9sZE1hcC5rZXlJbmRleFxyXG4gIHZhciBuZXdLZXlJbmRleCA9IG5ld01hcC5rZXlJbmRleFxyXG5cclxuICB2YXIgbW92ZXMgPSBbXVxyXG5cclxuICAvLyBhIHNpbXVsYXRlIGxpc3QgdG8gbWFuaXB1bGF0ZVxyXG4gIHZhciBjaGlsZHJlbiA9IFtdXHJcbiAgdmFyIGkgPSAwXHJcbiAgdmFyIGl0ZW1cclxuICB2YXIgaXRlbUtleVxyXG4gIHZhciBmcmVlSW5kZXggPSAwXHJcblxyXG4gIC8vIGZpc3QgcGFzcyB0byBjaGVjayBpdGVtIGluIG9sZCBsaXN0OiBpZiBpdCdzIHJlbW92ZWQgb3Igbm90XHJcbiAgd2hpbGUgKGkgPCBvbGRMaXN0Lmxlbmd0aCkge1xyXG4gICAgaXRlbSA9IG9sZExpc3RbaV1cclxuICAgIGl0ZW1LZXkgPSBnZXRJdGVtS2V5KGl0ZW0sIGtleSlcclxuICAgIGlmIChpdGVtS2V5KSB7XHJcbiAgICAgIGlmICghbmV3S2V5SW5kZXguaGFzT3duUHJvcGVydHkoaXRlbUtleSkpIHtcclxuICAgICAgICBjaGlsZHJlbi5wdXNoKG51bGwpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIG5ld0l0ZW1JbmRleCA9IG5ld0tleUluZGV4W2l0ZW1LZXldXHJcbiAgICAgICAgY2hpbGRyZW4ucHVzaChuZXdMaXN0W25ld0l0ZW1JbmRleF0pXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBmcmVlSXRlbSA9IG5ld0ZyZWVbZnJlZUluZGV4KytdXHJcbiAgICAgIGNoaWxkcmVuLnB1c2goZnJlZUl0ZW0gfHwgbnVsbClcclxuICAgIH1cclxuICAgIGkrK1xyXG4gIH1cclxuXHJcbiAgdmFyIHNpbXVsYXRlTGlzdCA9IGNoaWxkcmVuLnNsaWNlKDApXHJcblxyXG4gIC8vIHJlbW92ZSBpdGVtcyBubyBsb25nZXIgZXhpc3RcclxuICBpID0gMFxyXG4gIHdoaWxlIChpIDwgc2ltdWxhdGVMaXN0Lmxlbmd0aCkge1xyXG4gICAgaWYgKHNpbXVsYXRlTGlzdFtpXSA9PT0gbnVsbCkge1xyXG4gICAgICByZW1vdmUoaSlcclxuICAgICAgcmVtb3ZlU2ltdWxhdGUoaSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGkrK1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaSBpcyBjdXJzb3IgcG9pbnRpbmcgdG8gYSBpdGVtIGluIG5ldyBsaXN0XHJcbiAgLy8gaiBpcyBjdXJzb3IgcG9pbnRpbmcgdG8gYSBpdGVtIGluIHNpbXVsYXRlTGlzdFxyXG4gIHZhciBqID0gaSA9IDBcclxuICB3aGlsZSAoaSA8IG5ld0xpc3QubGVuZ3RoKSB7XHJcbiAgICBpdGVtID0gbmV3TGlzdFtpXVxyXG4gICAgaXRlbUtleSA9IGdldEl0ZW1LZXkoaXRlbSwga2V5KVxyXG5cclxuICAgIHZhciBzaW11bGF0ZUl0ZW0gPSBzaW11bGF0ZUxpc3Rbal1cclxuICAgIHZhciBzaW11bGF0ZUl0ZW1LZXkgPSBnZXRJdGVtS2V5KHNpbXVsYXRlSXRlbSwga2V5KVxyXG5cclxuICAgIGlmIChzaW11bGF0ZUl0ZW0pIHtcclxuICAgICAgaWYgKGl0ZW1LZXkgPT09IHNpbXVsYXRlSXRlbUtleSkge1xyXG4gICAgICAgIGorK1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG5ldyBpdGVtLCBqdXN0IGluZXNydCBpdFxyXG4gICAgICAgIGlmICghb2xkS2V5SW5kZXguaGFzT3duUHJvcGVydHkoaXRlbUtleSkpIHtcclxuICAgICAgICAgIGluc2VydChpLCBpdGVtKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBpZiByZW1vdmUgY3VycmVudCBzaW11bGF0ZUl0ZW0gbWFrZSBpdGVtIGluIHJpZ2h0IHBsYWNlXHJcbiAgICAgICAgICAvLyB0aGVuIGp1c3QgcmVtb3ZlIGl0XHJcbiAgICAgICAgICB2YXIgbmV4dEl0ZW1LZXkgPSBnZXRJdGVtS2V5KHNpbXVsYXRlTGlzdFtqICsgMV0sIGtleSlcclxuICAgICAgICAgIGlmIChuZXh0SXRlbUtleSA9PT0gaXRlbUtleSkge1xyXG4gICAgICAgICAgICByZW1vdmUoaSlcclxuICAgICAgICAgICAgcmVtb3ZlU2ltdWxhdGUoailcclxuICAgICAgICAgICAgaisrIC8vIGFmdGVyIHJlbW92aW5nLCBjdXJyZW50IGogaXMgcmlnaHQsIGp1c3QganVtcCB0byBuZXh0IG9uZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZWxzZSBpbnNlcnQgaXRlbVxyXG4gICAgICAgICAgICBpbnNlcnQoaSwgaXRlbSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluc2VydChpLCBpdGVtKVxyXG4gICAgfVxyXG5cclxuICAgIGkrK1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlIChpbmRleCkge1xyXG4gICAgdmFyIG1vdmUgPSB7aW5kZXg6IGluZGV4LCB0eXBlOiAwfVxyXG4gICAgbW92ZXMucHVzaChtb3ZlKVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5zZXJ0IChpbmRleCwgaXRlbSkge1xyXG4gICAgdmFyIG1vdmUgPSB7aW5kZXg6IGluZGV4LCBpdGVtOiBpdGVtLCB0eXBlOiAxfVxyXG4gICAgbW92ZXMucHVzaChtb3ZlKVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlU2ltdWxhdGUgKGluZGV4KSB7XHJcbiAgICBzaW11bGF0ZUxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1vdmVzOiBtb3ZlcyxcclxuICAgIGNoaWxkcmVuOiBjaGlsZHJlblxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgbGlzdCB0byBrZXktaXRlbSBrZXlJbmRleCBvYmplY3QuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcclxuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IGtleVxyXG4gKi9cclxuZnVuY3Rpb24gbWFrZUtleUluZGV4QW5kRnJlZSAobGlzdCwga2V5KSB7XHJcbiAgdmFyIGtleUluZGV4ID0ge31cclxuICB2YXIgZnJlZSA9IFtdXHJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgIHZhciBpdGVtID0gbGlzdFtpXVxyXG4gICAgdmFyIGl0ZW1LZXkgPSBnZXRJdGVtS2V5KGl0ZW0sIGtleSlcclxuICAgIGlmIChpdGVtS2V5KSB7XHJcbiAgICAgIGtleUluZGV4W2l0ZW1LZXldID0gaVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZnJlZS5wdXNoKGl0ZW0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB7XHJcbiAgICBrZXlJbmRleDoga2V5SW5kZXgsXHJcbiAgICBmcmVlOiBmcmVlXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRJdGVtS2V5IChpdGVtLCBrZXkpIHtcclxuICBpZiAoIWl0ZW0gfHwgIWtleSkgcmV0dXJuIHZvaWQgNjY2XHJcbiAgcmV0dXJuIHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnXHJcbiAgICA/IGl0ZW1ba2V5XVxyXG4gICAgOiBrZXkoaXRlbSlcclxufVxyXG5cclxuZXhwb3J0cy5tYWtlS2V5SW5kZXhBbmRGcmVlID0gbWFrZUtleUluZGV4QW5kRnJlZSAvLyBleHBvcnRzIGZvciB0ZXN0XHJcbmV4cG9ydHMuZGlmZiA9IGRpZmZcclxuIiwiZnVuY3Rpb24gRWxlbWVudCh0YWdOYW1lLHByb3BzLGNoaWxkcmVuKXtcbiAgICB0aGlzLnRhZ05hbWUgPSB0YWdOYW1lO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG59XG5FbGVtZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpe1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy50YWdOYW1lKTtcbiAgICB2YXIgcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgIGZvcih2YXIgcHJvcE5hbWUgaW4gcHJvcHMpe1xuICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUocHJvcE5hbWUscHJvcFZhbHVlKTtcbiAgICB9XG4gICAgdmFyIGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbiB8fCBbXTtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChjaXRlbSk9PntcbiAgICAgICAgdmFyIGNoaWxkRWwgPSAoY2l0ZW0gaW5zdGFuY2VvZiBFbGVtZW50KSA/IFxuICAgICAgICBjaXRlbS5yZW5kZXIoKVxuICAgICAgICA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNpdGVtKTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGRFbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGVsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lLHByb3BzLGNoaWxkcmVuKXtcbiAgICByZXR1cm4gbmV3IEVsZW1lbnQodGFnTmFtZSxwcm9wcyxjaGlsZHJlbik7XG59XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFbGVtZW50OyIsImltcG9ydCB7aXNTdHJpbmcsfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IGxpc3RkaWZmIGZyb20gJ2xpc3QtZGlmZjInO1xuZnVuY3Rpb24gZGlmZnRyZWUob1RyZWUsblRyZWUpe1xuICAgIC8vIOiKgueCueS9jee9rlxuICAgIGxldCBpbmRleCA9IDA7XG4gICAgLy8g6K6w5b2V5LiL5beu5byCIOexu+Wei++8jOWPguaVsFxuICAgIGNvbnN0IHBhdGNoZXMgPSB7fTtcbiAgICBkZnNXYWxrKG9UcmVlLG5UcmVlLGluZGV4LHBhdGNoZXMpO1xuICAgIHJldHVybiBwYXRjaGVzO1xufVxuXG5mdW5jdGlvbiBkZnNXYWxrKG9Ob2RlLG5Ob2RlLGluZGV4LHBhdGNoZXMpe1xuICAgIGNvbnNvbGUubG9nKCctLS0tZGZzV2Fsay0tLScsaW5kZXgpO1xuICAgIGNvbnN0IGN1cnJlbnRQYXRjaCA9IFtdO1xuICAgIC8vIOayoeacieWvueW6lOaWsOmYtuautSDpppbmrKHmuLLmn5NcbiAgICBpZihuTm9kZSA9PT0gbnVsbClyZXR1cm47XG4gICAgLy/liKTmlq3nsbvlnosgMTog5a2X56ym5LiyXG4gICAgaWYoaXNTdHJpbmcob05vZGUpICYmIGlzU3RyaW5nKG5Ob2RlKSl7XG4gICAgICAgIG9Ob2RlICE9PSBuTm9kZSAmJlxuICAgICAgICBjdXJyZW50UGF0Y2gucHVzaCh7XG4gICAgICAgICAgICB0eXBlOidURVhUJyxcbiAgICAgICAgICAgIGN1cnJlbnQ6IG5Ob2RlXG4gICAgICAgIH0pXG4gICAgLy8y77ya5ZCM56eN57G75Z6L5qCH562+IOS4lGtleeebuOWQjCDmr5TovoNwcm9wcyAmJiDmr5TovoPlrZDoioLngrlcbiAgICB9ZWxzZSBpZihvTm9kZS50YWdOYW1lID09PSBuTm9kZS50YWdOYW1lICYmIG9Ob2RlLmtleSA9PT0gbk5vZGUua2V5KXtcbiAgICAgICAgLy8gZGlmZnByb3BzXG4gICAgICAgIGNvbnN0IHByb3BzUGF0Y2ggPSBkaWZmUHJvcHMob05vZGUucHJvcHMsbk5vZGUucHJvcHMpO1xuICAgICAgICBwcm9wc1BhdGNoICYmIFxuICAgICAgICBjdXJyZW50UGF0Y2gucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAnUFJPUFMnLFxuICAgICAgICAgICAgcHJvcHM6cHJvcHNQYXRjaFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gZGlmZmNoaWxkcmVuXG4gICAgICAgIGRpZmZDaGlsZHJlbihvTm9kZS5jaGlsZHJlbixuTm9kZS5jaGlsZHJlbixwYXRjaGVzLGN1cnJlbnRQYXRjaCxpbmRleCk7XG4gICAgLy8zIOS7peS4iumDveS4jeespuWQiCDnm7TmjqXmm7/mjaJcbiAgICB9ZWxzZXtcbiAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogJ1JFUExBQ0UnLFxuICAgICAgICAgICAgbm9kZTpuTm9kZVxuICAgICAgICB9KVxuICAgIH1cbiAgICBjdXJyZW50UGF0Y2gubGVuZ3RoICYmIChwYXRjaGVzW2luZGV4XSA9IGN1cnJlbnRQYXRjaCk7XG59XG5cbmZ1bmN0aW9uIGRpZmZQcm9wcyhvUHJvcHMsblByb3BzKXtcbiAgICBsZXQgaXNDaGFuZ2UgPSBmYWxzZTtcbiAgICBjb25zdCBwcm9wc1BhdGNoID0ge307XG4gICAgT2JqZWN0LmtleXMob1Byb3BzKS5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgIGlmKG9Qcm9wc1trZXldICE9PSBuUHJvcHNba2V5XSl7XG4gICAgICAgICAgICAhaXNDaGFuZ2UgJiYgKGlzQ2hhbmdlPXRydWUpO1xuICAgICAgICAgICAgcHJvcHNQYXRjaFtrZXldID0gblByb3BzW2tleV1cbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGlzQ2hhbmdlID8gcHJvcHNQYXRjaCA6IG51bGw7XG59XG5mdW5jdGlvbiBkaWZmQ2hpbGRyZW4ob0NoaWxkcmVuLG5DaGlsZHJlbixwYXRjaHMsY3VycmVudFBhdGNoLGluZGV4KXtcbiAgICAvL+W+l+WHuueugOWNleenu+WKqOi3r+W+hFxuICAgIGNvbnN0IGRpZmZNb3ZlcyA9IGxpc3RkaWZmKG9DaGlsZHJlbixuQ2hpbGRyZW4sJ2tleScpO1xuICAgICAgICAvLyBgbW92ZXNgIGlzIGEgc2VxdWVuY2Ugb2YgYWN0aW9ucyAocmVtb3ZlIG9yIGluc2VydCk6IFxuICAgICAgICAvLyB0eXBlIDAgaXMgcmVtb3ZpbmcsIHR5cGUgMSBpcyBpbnNlcnRpbmdcbiAgICAgICAgLy8gbW92ZXM6IFtcbiAgICAgICAgLy8gICB7aW5kZXg6IDMsIHR5cGU6IDB9LFxuICAgICAgICAvLyAgIHtpbmRleDogMCwgdHlwZTogMSwgaXRlbToge2lkOiBcImNcIn19LCBcbiAgICAgICAgLy8gICB7aW5kZXg6IDMsIHR5cGU6IDB9LCBcbiAgICAgICAgLy8gICB7aW5kZXg6IDQsIHR5cGU6IDEsIGl0ZW06IHtpZDogXCJmXCJ9fVxuICAgICAgICAvLyAgXVxuICAgIGNvbnNvbGUubG9nKCctLWRpZmZNb3Zlcy0nLGRpZmZNb3ZlcylcbiAgICAvLyDkv53nlZnlhYPntKDvvJ8gXG4gICAgbkNoaWxkcmVuID0gZGlmZk1vdmVzLmNoaWxkcmVuO1xuICAgIC8vIOiusOW9leaVsOWtl+aUueWPmOaDheWGtVxuICAgIGRpZmZNb3Zlcy5tb3Zlcy5sZW5ndGggJiYgXG4gICAgY3VycmVudFBhdGNoLnB1c2goe1xuICAgICAgICB0eXBlOiAnUkVPUkRFUicsXG4gICAgICAgIG1vdmVzOiBkaWZmTW92ZXMubW92ZXNcbiAgICB9KTtcbiAgICAvLyDmt7HluqbpgY3ljoZcbiAgICBsZXQgbGVmdE5vZGUgPSBudWxsO1xuICAgIGxldCBjdXJyZW50Tm9kZUluZGV4ID0gaW5kZXg7XG4gICAgb0NoaWxkcmVuLmZvckVhY2goKG9jaGlsZCxpbmRleCk9PntcbiAgICAgICAgY29uc3QgbmNoaWxkID0gbkNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgY3VycmVudE5vZGVJbmRleCA9XG4gICAgICAgIGxlZnROb2RlICYmIGxlZnROb2RlLmNvdW50XG4gICAgICAgID8gY3VycmVudE5vZGVJbmRleCArIGxlZnROb2RlLmNvdW50ICsgMVxuICAgICAgICA6IGN1cnJlbnROb2RlSW5kZXggKyAxO1xuICAgICAgICBvY2hpbGQgIT09IG5jaGlsZCAmJiBkZnNXYWxrKG9jaGlsZCxuY2hpbGQsY3VycmVudE5vZGVJbmRleCxwYXRjaHMpO1xuICAgICAgICBsZWZ0Tm9kZSA9IG9jaGlsZDtcbiAgICB9KVxufVxuZXhwb3J0IGRlZmF1bHQgZGlmZnRyZWU7IiwiaW1wb3J0IGVsIGZyb20gJy4vIGVsZW1lbnQnO1xuaW1wb3J0IGRpZmZ0cmVlIGZyb20gJy4vZGlmZic7XG5pbXBvcnQgcGF0Y2ggZnJvbSAnLi9wYXRjaCc7XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWwsXG4gICAgZGlmZnRyZWUsXG4gICAgcGF0Y2hcbn0iLCJpbXBvcnQge2VhY2gsc2V0QXR0cix0b0FycmF5fSBmcm9tICcuL3V0aWwnO1xuZnVuY3Rpb24gcGF0Y2gobm9kZSxwYXRjaGVzKXtcbiAgICBjb25zdCB3YWxrZXIgPSB7aW5kZXg6IDB9O1xuICAgIGRmc1dhbGsobm9kZSwgd2Fsa2VyLCBwYXRjaGVzKTtcbn1cbi8vIOa3seW6pumBjeWOhuabtOaWsFxuZnVuY3Rpb24gZGZzV2Fsayhub2RlLHdhbGtlcixwYXRjaGVzKXtcbiAgICBjb25zdCBjdXJyZW50UGF0Y2hlcyA9IHBhdGNoZXNbd2Fsa2VyLmluZGV4XTtcbiAgICBub2RlLmNoaWxkTm9kZXMgJiZcbiAgICBlYWNoKG5vZGUuY2hpbGROb2RlcywgaXRlbSA9PiB7XG4gICAgICB3YWxrZXIuaW5kZXgrKztcbiAgICAgIGRmc1dhbGsoaXRlbSwgd2Fsa2VyLCBwYXRjaGVzKTtcbiAgICB9KTtcbiAgY29uc29sZS5sb2coJy1jdXJyZW50UGF0Y2hlcy0nLG5vZGUsY3VycmVudFBhdGNoZXMpXG4gIGN1cnJlbnRQYXRjaGVzICYmIGFwcGx5UGF0Y2hlcyhub2RlLCBjdXJyZW50UGF0Y2hlcyk7XG59XG5mdW5jdGlvbiBhcHBseVBhdGNoZXMobm9kZSxjdXJyZW50UGF0Y2hlcyl7XG4gICAgZWFjaChjdXJyZW50UGF0Y2hlcywgaXRlbSA9PiB7XG4gICAgICAgIHN3aXRjaCAoaXRlbS50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnUkVQTEFDRSc6XG4gICAgICAgICAgICBjb25zdCBuTm9kZSA9IGlzU3RyaW5nKGl0ZW0ubm9kZSlcbiAgICAgICAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpdGVtLm5vZGUpXG4gICAgICAgICAgICAgIDogaXRlbS5ub2RlLnJlbmRlcigpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuTm9kZSwgbm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdSRU9SREVSJzpcbiAgICAgICAgICAgIHJlb3JkZXJDaGlsZHJlbihub2RlLCBpdGVtLm1vdmVzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1BST1BTJzpcbiAgICAgICAgICAgIHNldFByb3BzKG5vZGUsIGl0ZW0ucHJvcHMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnVEVYVCc6XG4gICAgICAgICAgICBpZiAobm9kZS50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAvLyDkvb/nlKjnuq/mlofmnKxcbiAgICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIOS7heS7heWvuUNEQVRB54mH5q6177yM5rOo6YeKY29tbWVudO+8jFByb2Nlc3NpbmcgSW5zdHJ1Y3Rpb27oioLngrnmiJZ0ZXh06IqC54K55pyJ5pWIXG4gICAgICAgICAgICAgIG5vZGUubm9kZVZhbHVlID0gaXRlbS5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gcGF0Y2ggdHlwZSBcIiArIGl0ZW0udHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xufVxuLy8g5L+u5pS55bGe5oCnXG5cbmZ1bmN0aW9uIHNldFByb3BzIChub2RlLCBwcm9wcykge1xuICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgICAgaWYgKHByb3BzW2tleV0gPT09IHZvaWQgNjY2KSB7XG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHByb3BzW2tleV1cbiAgICAgICAgc2V0QXR0cihub2RlLCBrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gcmVvcmRlckNoaWxkcmVuIChub2RlLCBtb3Zlcykge1xuICAgIHZhciBzdGF0aWNOb2RlTGlzdCA9IHRvQXJyYXkobm9kZS5jaGlsZE5vZGVzKVxuICAgIHZhciBtYXBzID0ge31cbiAgICBlYWNoKHN0YXRpY05vZGVMaXN0LCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgdmFyIGtleSA9IG5vZGUuZ2V0QXR0cmlidXRlKCdrZXknKVxuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgbWFwc1trZXldID0gbm9kZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgXG4gICAgZWFjaChtb3ZlcywgZnVuY3Rpb24gKG1vdmUpIHtcbiAgICAgIHZhciBpbmRleCA9IG1vdmUuaW5kZXhcbiAgICAgIGlmIChtb3ZlLnR5cGUgPT09IDApIHsgLy8gcmVtb3ZlIGl0ZW1cbiAgICAgICAgaWYgKHN0YXRpY05vZGVMaXN0W2luZGV4XSA9PT0gbm9kZS5jaGlsZE5vZGVzW2luZGV4XSkgeyAvLyBtYXliZSBoYXZlIGJlZW4gcmVtb3ZlZCBmb3IgaW5zZXJ0aW5nXG4gICAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbaW5kZXhdKVxuICAgICAgICB9XG4gICAgICAgIHN0YXRpY05vZGVMaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICAgIH0gZWxzZSBpZiAobW92ZS50eXBlID09PSAxKSB7IC8vIGluc2VydCBpdGVtXG4gICAgICAgIHZhciBpbnNlcnROb2RlID0gbWFwc1ttb3ZlLml0ZW0ua2V5XVxuICAgICAgICAgID8gbWFwc1ttb3ZlLml0ZW0ua2V5XS5jbG9uZU5vZGUodHJ1ZSkgLy8gcmV1c2Ugb2xkIGl0ZW1cbiAgICAgICAgICA6ICh0eXBlb2YgbW92ZS5pdGVtID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgICAgPyBtb3ZlLml0ZW0ucmVuZGVyKClcbiAgICAgICAgICAgICAgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtb3ZlLml0ZW0pXG4gICAgICAgIHN0YXRpY05vZGVMaXN0LnNwbGljZShpbmRleCwgMCwgaW5zZXJ0Tm9kZSlcbiAgICAgICAgbm9kZS5pbnNlcnRCZWZvcmUoaW5zZXJ0Tm9kZSwgbm9kZS5jaGlsZE5vZGVzW2luZGV4XSB8fCBudWxsKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbmV4cG9ydCBkZWZhdWx0IHBhdGNoOyIsInZhciBfID0gZXhwb3J0c1xuXG5fLnR5cGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5yZXBsYWNlKC9cXFtvYmplY3RcXHN8XFxdL2csICcnKVxufVxuXG5fLmlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5IChsaXN0KSB7XG4gIHJldHVybiBfLnR5cGUobGlzdCkgPT09ICdBcnJheSdcbn1cblxuXy5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChhcnJheUxpa2UsIGluZGV4KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnJheUxpa2UsIGluZGV4KVxufVxuXG5fLnRydXRoeSA9IGZ1bmN0aW9uIHRydXRoeSAodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWVcbn1cblxuXy5pc1N0cmluZyA9IGZ1bmN0aW9uIGlzU3RyaW5nIChsaXN0KSB7XG4gIHJldHVybiBfLnR5cGUobGlzdCkgPT09ICdTdHJpbmcnXG59XG5cbl8uZWFjaCA9IGZ1bmN0aW9uIGVhY2ggKGFycmF5LCBmbikge1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBmbihhcnJheVtpXSwgaSlcbiAgfVxufVxuXG5fLnRvQXJyYXkgPSBmdW5jdGlvbiB0b0FycmF5IChsaXN0TGlrZSkge1xuICBpZiAoIWxpc3RMaWtlKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICB2YXIgbGlzdCA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpc3RMaWtlLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgbGlzdC5wdXNoKGxpc3RMaWtlW2ldKVxuICB9XG5cbiAgcmV0dXJuIGxpc3Rcbn1cblxuXy5zZXRBdHRyID0gZnVuY3Rpb24gc2V0QXR0ciAobm9kZSwga2V5LCB2YWx1ZSkge1xuICBzd2l0Y2ggKGtleSkge1xuICAgIGNhc2UgJ3N0eWxlJzpcbiAgICAgIGlmKG5vZGUuc3R5bGUpe1xuICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndmFsdWUnOlxuICAgICAgdmFyIHRhZ05hbWUgPSBub2RlLnRhZ05hbWUgfHwgJydcbiAgICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgIGlmIChcbiAgICAgICAgdGFnTmFtZSA9PT0gJ2lucHV0JyB8fCB0YWdOYW1lID09PSAndGV4dGFyZWEnXG4gICAgICApIHtcbiAgICAgICAgbm9kZS52YWx1ZSA9IHZhbHVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBpdCBpcyBub3QgYSBpbnB1dCBvciB0ZXh0YXJlYSwgdXNlIGBzZXRBdHRyaWJ1dGVgIHRvIHNldFxuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuICAgICAgfVxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcbiAgICAgIGJyZWFrXG4gIH1cbn0iLCIvLyBjb25jYXQg6YCS5b2SXG5mdW5jdGlvbiBmbGF0KGFycil7XG4gICAgbGV0IHJlc0FycmF5ID0gW107XG4gICAgYXJyLmZvckVhY2goKGEpPT57XG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoYSkpe1xuICAgICAgICAgICAgcmVzQXJyYXkgPSByZXNBcnJheS5jb25jYXQoZmxhdChhKSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmVzQXJyYXkucHVzaChhKVxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmVzQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGZsYXRSZWR1Y2UoYXJyKXtcbiAgIHJldHVybiBhcnIucmVkdWNlKChwcmUsY3VyKT0+e1xuICAgICAgIHJldHVybiAgcHJlLmNvbmNhdCggQXJyYXkuaXNBcnJheShjdXIpID8gZmxhdFJlZHVjZShjdXIpICA6IGN1cilcbiAgICB9LFtdKVxufVxuZXhwb3J0IGRlZmF1bHQgZmxhdDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGZsYXQgZnJvbSAnLi9mbGF0JztcbmltcG9ydCBkaWZmIGZyb20gJy4vZGlmZi9pbmRleCdcbmNvbnN0IHUgPSB7XG4gICAgZmxhdDogZmxhdCxcbiAgICBkaWZmOiBkaWZmXG59XG5leHBvcnQgZGVmYXVsdCB1OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==