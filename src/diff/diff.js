import {isString,} from './util';
import listdiff from 'list-diff2';
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
    if(isString(oNode) && isString(nNode)){
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
    const diffMoves = listdiff(oChildren,nChildren,'key');
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
export default difftree;