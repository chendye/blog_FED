/*
 * @Author: XiaoFeng Chen 
 * @Date: 2019-02-23 16:58:38 
 * @Last Modified by: XiaoFeng Chen
 * @Last Modified time: 2019-02-23 21:33:13
 * 面试编程题
 */

//冒泡排序，数值小的往上冒泡
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = len - 1; j > i; j--) {
            if (arr[j - 1] > arr[j]) {
                let temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp
            }
        }
    }
    console.log(arr)
}
bubbleSort([10, 1, 8, 7, 9, 5, 6, 2, 3, 4])

//快速排序
function quickSort(arr) {
    if (arr.length === 0) {
        return arr;
    }
    let base = arr[0],
        left = [],
        right = [];
    for (let i = 1; i < arr.length; i++) {
        let num = arr[i];
        num > base ?
            right.push(num) :
            left.push(num);
    }
    return quickSort(left).concat([base], quickSort(right))
}
quickSort([10, 1, 8, 7, 9, 5, 6, 2, 3, 4])

[10, 1, 8, 7, 9, 5, 6, 2, 3, 4].sort((a, b) => {
    if (a === b) {
        return 0
    } else {
        return a - b > 0 ? 1 : -1
    }
})
//深拷贝
function clone(obj) {
    var o;
    switch (typeof obj) {
        case 'undefined':
            break;
        case 'string':
            o = obj + '';
            break;
        case 'number':
            o = obj - 0;
            break;
        case 'boolean':
            o = obj;
            break;
        case 'object':
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var k in obj) {
                        o[k] = clone(obj[k]);
                    }
                }
            }
            break;
        default:
            o = obj;
            break;
    }
    return o;
};
//浅拷贝
Object.assign

//节流函数 定时流水出来

function throttle(fn, wait = 0) {
    let lastTime = 0,
        timerId;
    return function () {
        clearTimeout(timerId);
        var current = +new Date();
        if (current - lastTime >= wait) {
            fn();
            lastTime = current;
        } else {
            timerId = setTimeout(function () {
                fn();
                lastTime = +new Date();
            }, wait - (current - lastTime));
        }
    }
}
var lastTime = 0;
var y = throttle(() => {
    var temp = +new Date();
    console.log('exec：' + (temp - lastTime));
    lastTime = temp;
}, 5000)
y()
setInterval(y, 4000)

//函数防抖 只关心当前操作匹配的最后结果Vue
function debounce(fn, wait = 0) {
    let timeId;
    return function(){
        timeId=setTimeout(fn,wait)
    }
}

//金额格式化
'123456'.replace(/\d(?=(\d{3})+$)/g, '$&,')