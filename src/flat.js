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
export default flat;