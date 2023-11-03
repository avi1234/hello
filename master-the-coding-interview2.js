/**
 * https://leetcode.com/problems/valid-parentheses/
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if(!s || s === "") return true;
    const helperStack = [];
    for(let i=0; i< s.length; i++) {
        const iChar = s[i];
        
        if(iChar === '{' || iChar === '[' || iChar === '(') {
            helperStack.push(iChar);
            continue;
        }

        const lastStackItem = helperStack.pop();
        if(iChar === '}' && lastStackItem === '{') {
            continue;
        }
        if(iChar === ')' && lastStackItem === '(') {
            continue;
        }
        if(iChar === ']' && lastStackItem === '[') {
            continue;
        }
        return false;
    }
    return helperStack.length === 0;
};

console.log(isValid("(]"));

/**
 * https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function(s) {
    if(!s || s === "") return s;
    const indexToDelete = new Set();
    const helperStack = [];
    for(let i=0; i < s.length; i++) {
        const si = s[i];
        if(si === '(') {
            helperStack.push(i);
        } else if(si === ')') {
            if(helperStack.pop() === undefined) {
                indexToDelete.add(i);
            }
        }
    }
    while(helperStack.length > 0) {
        indexToDelete.add(helperStack.pop());
    }
    const res = [];
    for(let i=0; i < s.length; i++) {
        if(!indexToDelete.has(i)) {
            res.push(s[i]);
        }
    }

    return res.join('');
};

var selectionSort = function(arr) {
    for(let i=0; i< arr.length;i++){
        let minIndex = i;
        for(let j=i;j<arr.length;j++){
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        const temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
};

var insertionSort = function(arr) {
    for(let i=0; i< arr.length;i++){
        let minIndex = i;
        for(let j=i;j<arr.length;j++){
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        let prev = arr[minIndex];
        for(let j=i;j<=minIndex;j++) {
            let temp = prev;
            prev = arr[j];
            arr[j]=temp;
            
        }
    }
    return arr;
};

/**
 * https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let res = binarySearch(nums,0,nums.length-1, target);
    if(res === -1) return [-1,-1];

    let resFrom, resTo, tempRes = res;
    while(tempRes > -1) {
        resFrom = tempRes;
        tempRes = binarySearch(nums, 0, tempRes-1, target);
    }
    tempRes=res;
    while(tempRes > -1) {
        resTo = tempRes;
        tempRes = binarySearch(nums, tempRes+1, nums.length-1, target);
    }

    return [resFrom, resTo];
};

const binarySearch = function(nums, left, right, target) {

    while(left <= right) {
        let midIndex = Math.floor((right-left)/2) + left;
        if(nums[midIndex] === target) {
            return midIndex;
        } else if (nums[midIndex] < target) {
            left = midIndex+1;
        } else {
            right = midIndex-1;
        }
    }

    return -1;
};

// console.log(binarySearch([7,7,7], 0, 2, 7));

console.log(searchRange([1,2,7,7,7,8,9,10],20));

// console.log(insertionSort([6,5,3,1,8,7,2,4]));

// console.log(minRemoveToMakeValid("())()((("));