/**
 * Array #1 exercise
 * https://leetcode.com/problems/two-sum/
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const helperHashMap = {}
    for(let i = 0; i < nums.length; i++) {
      if(nums[i] in helperHashMap) {
        return [helperHashMap[nums[i]], i];
      }
  
      helperHashMap[target - nums[i]] = i;
    }
  
    // brute- force algorithm 
    // for(let i = 0; i < nums.length; i++) {
    //   const numToCheck = target - nums[i];
    //   for(let j=i+1; j < nums.length; j++) {
    //     if(numToCheck === nums[j]) {
    //       return [i, j];
    //     }
    //   }
    // }
  
    return [];
  };

/**
 * Array #2 exercise
 * https://leetcode.com/problems/container-with-most-water/
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    if(height.length < 2) {
        return null;
    }

    let maxArea = 0, a = 0, b = height.length - 1;
    while(a < b) {
        const newArea = Math.min(height[a], height[b]) * (b - a);
        if(newArea > maxArea) {
            maxArea = newArea;
        }
        if(height[a] < height[b]) {
            a++;
        } else {
            b--;
        }
    }
    return maxArea;
};

/**
 * Array #3 exercise
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    if(height.length < 3) {
        return 0;
    }

    // find the height item
    let maxHeightIndex = 0; total = 0;
    for(let i=1; i < height.length; i++) {
        if(height[i] > height[maxHeightIndex]) {
            maxHeightIndex = i;
        }
    }

    let minHeight = height[0];
    for(let i = 1; i < maxHeightIndex ; i++) {
        if(minHeight > height[i]) {
            total += minHeight - height[i];
        } else {
            minHeight = height[i];
        }
    }

    minHeight = height[height.length - 1];
    for(let i = height.length - 2; i > maxHeightIndex ; i--) {
        if(minHeight > height[i]) {
            total += minHeight - height[i];
        } else {
            minHeight = height[i];
        }
    }

    return total;
};

 /**
  * Array #3 exercise
  * https://leetcode.com/problems/trapping-rain-water/
 * @param {number[]} height
 * @return {number}
 */
var trap2 = function(height) {
    if(height.length < 3) {
        return 0;
    }

    let total=0, a=0, b=height.length-1;
    let minBorder = 0;
    while(a<b){
        if(height[a] < minBorder) {
            total += minBorder - height[a];
            a++;
        }
        else if(height[b] < minBorder) {
            total += minBorder - height[b];
            b--;
        }
        else {
            minBorder = Math.min(height[a],height[b]);
            if(height[a] > height[b]) {
                b--;
            } else {
                a++;
            }
        }
    }

    return total;
};

/**
 * String #4 exercise
 * https://leetcode.com/problems/backspace-string-compare/
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function(s, t) {
    
    var backspaceCompareHelper = function(str, i) {
        let firstFlag = true, delCount = 0;
        while(firstFlag || (delCount > 0 || str[i] === '#')) {
            if(firstFlag) {firstFlag = false;}
            if(str[i] === '#') {
                delCount++;
                i--;
            } else {
                if(delCount > 0) {
                    delCount--;
                    i--;
                }
            }
        }
        return i;
    }

    let si = s.length-1, ti = t.length-1;
    
    while(si >= 0 || ti >= 0) {

        if(si >= 0 && s[si] === '#') {
            si = backspaceCompareHelper(s, si);
        }

        if(ti >= 0 && t[ti] === '#') {
            ti = backspaceCompareHelper(t, ti);
        }

        if(ti < 0 && si < 0) {
            return true;
        } else if (ti >= 0 && si >= 0) {
            if(t[ti] !== s[si]) {
                return false;
            }
            ti--;
            si--;
        } else {
            return false;
        }
    }
    return true;
};

/**
 * String #5 exercise
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let from=0, maxLength=0, uniqueHash=new Map();
    for(let to=0; to < s.length; to++) {
        let currentChar = s[to];
        let currentUniqueValue = uniqueHash.get(currentChar);
        if(currentUniqueValue >= from) {
            from = currentUniqueValue + 1;
        } else {
            maxLength = Math.max(maxLength, to - from + 1);
        }
        uniqueHash.set(currentChar, to);
    }
    return maxLength;
};

var lengthOfLongestSubstring2 = function(s) {
    if(s.length <=1) return s.length;

    const seenChars = {};
    let left = 0, longest = 0;
    for(let right=0; right < s.length; right++) {
        const currentChar = s[right];
        const prevSeenChar = seenChars[currentChar];
        if(prevSeenChar >= left) {
            left = prevSeenChar + 1;
        }
        seenChars[currentChar] = right;

        longest = Math.max(longest,right-left+1);
    }

    return longest;
};

/**
 * not correct answer
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    s = s.replace(/[^A-Za-z0-9]/g,'').toLowerCase();
    let start=0, end=s.length-1, charDeleted=false;
    while(start < end) {
        if(s[start] === s[end]) {
            start++;
            end--;
        } else {
            if(charDeleted) {
                return false;
            } else {
                charDeleted = true;
                if(s[start+1] === s[end]) {
                    end--;
                    start += 2;
                } else if(s[start] === s[end-1]) {
                    end -= 2;
                    start++;
                } else {
                    return false;
                }
            }
        }
    }
    return true;
};

var reverseLinkedList = function(head) {
    let currentNode = head, prev=null;
    while(currentNode) {
        let next = currentNode.next;
        currentNode.next = prev;
        prev = currentNode;
        currentNode = next;
    }
    return prev;
}

var reverse = function(prevNode, head, numOfNodesToReverse) {
    let prev = prevNode, currentNode = head, count = 0;
    while(currentNode && count < numOfNodesToReverse) {
        count++;
        const next = currentNode.next;
        currentNode.next = prev;
        prev = currentNode;
        currentNode = next;
    }
    if(prevNode) {
        prevNode.next = prev;
    }
    head.next = currentNode;

    return currentNode;
}

/**
 * https://leetcode.com/problems/reverse-linked-list-ii/
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
    var reverse = function(prevNode, head, numOfNodesToReverse) {
        let prev = prevNode, currentNode = head, count = 0;
        while(currentNode && count < numOfNodesToReverse) {
            count++;
            const next = currentNode.next;
            currentNode.next = prev;
            prev = currentNode;
            currentNode = next;
        }
        if(prevNode) {
            prevNode.next = prev;
        }
        head.next = currentNode;
    
        return prev;
    }

    let currentNode = head, prev = null;

    for(let i=1; i < left && currentNode; i++) {
        prev = currentNode;
        currentNode = currentNode.next;
    }

    let res = reverse(prev, currentNode, right-left+1);

    if(left === 1) {
        return res;
    } else {
        return head;
    }
};

var flattenChild = function(child) {
    let currentNode = child, prev = child;
    while(currentNode) {
        prev = currentNode;
        if(!currentNode.child) {
            currentNode = currentNode.next;
            continue;
        }
        let res = flattenChild(currentNode.child);
        let next = currentNode.next;
        currentNode.next = res.head;
        currentNode.child = null;
        if(next) { next.prev = res.tail; }
        res.tail.next = next;
        res.head.prev = currentNode;
    }

    return {"head": child, "tail": prev};
};

/**
 * https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */
var flatten = function(head) {
    let res = flattenChild(head);

    return res.head;
};

/*
NOTE: The beginning portion builds our test case linked list. Scroll down to the section titled Our Solution for the code solution!
 */

class ListNode {
    constructor(val, next = null, prev = null, child = null) {
      this.val = val;
      this.next = next;
      this.prev = prev;
      this.child = child;
    }
  }
  
  // ---- Generate our linked list ----
  const nodes = [1, [2, 7, [8, 10, 11], 9], 3, 4, [5, 12, 13], 6]
  
  const buildMultiLevel = function(nodes) {
    const head = new ListNode(nodes[0]);
    let currentNode = head;
  
    for(let i = 1; i < nodes.length; i++) {
      const val = nodes[i];
      let nextNode;
  
      if(Array.isArray(val)) {
        nextNode = buildMultiLevel(val);
        currentNode.child = nextNode;
        continue;
      }
  
      nextNode = new ListNode(val);
      currentNode.next = nextNode;
      nextNode.prev = currentNode;
      currentNode = nextNode;
    }
    
    return head;
  }
  
  let multiLinkedList = buildMultiLevel(nodes);
  
  // ---- Generate our linked list ----
  
  const printListMulti = head => {
    if(!head) {
      return;
    }
  
    console.log(head.val)
  
    if(head.child) {
      printListMulti(head.child);
    }
  
    printListMulti(head.next);
  }
  
  const printList = head => {
    if(!head) {
      return;
    }
  
    console.log(head.val);
    
    printList(head.next);
  }

  printList(multiLinkedList);
  let flatres = flatten(multiLinkedList);
  printList(flatres);

const head = {
    "data":1,
    "next":{
        "data":2,
        "next":{
            "data":3,
            "next":{
                "data":4,
                "next":{
                    "data":5,
                    "next":null,
                },
            },
        },
    },
};

const res = reverseBetween(head,4,2);

const head2 = {
    "data":1,
    "next":{
        "data":2,
        "next": null,
    },
};

const res2 = reverseBetween(head2,2,1);

console.log(res);