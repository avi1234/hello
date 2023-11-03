class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

class BinarySearchTree {
    #DFSInOrderHelper(node, results) {
        if(!node) return;
        if(node.left) {
            this.#DFSInOrderHelper(node.left, results);
        }
        results.push(node.value);
        if(node.right) {
            this.#DFSInOrderHelper(node.right, results);
        }
    };

    constructor() {
        this.root = null;
    }
    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            let currentNode = this.root;
            while (true) {
                if (value < currentNode.value) {
                    //Left
                    if (!currentNode.left) {
                        currentNode.left = newNode;
                        return this;
                    }
                    currentNode = currentNode.left;
                } else {
                    //Right
                    if (!currentNode.right) {
                        currentNode.right = newNode;
                        return this;
                    }
                    currentNode = currentNode.right;
                }
            }
        }
    }
    lookup(value) {
        if (!this.root) {
            return false;
        }
        let currentNode = this.root;
        while (currentNode) {
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else if (currentNode.value === value) {
                return currentNode;
            }
        }
        return null
    }
    remove(value) {
        if (!this.root) {
            return false;
        }
        let currentNode = this.root;
        let parentNode = null;
        while (currentNode) {
            if (value < currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else if (currentNode.value === value) {
                //We have a match, get to work!

                //Option 1: No right child: 
                if (currentNode.right === null) {
                    if (parentNode === null) {
                        this.root = currentNode.left;
                    } else {

                        //if parent > current value, make current left child a child of parent
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.left;

                            //if parent < current value, make left child a right child of parent
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.left;
                        }
                    }

                    //Option 2: Right child which doesnt have a left child
                } else if (currentNode.right.left === null) {
                    currentNode.right.left = currentNode.left;
                    if (parentNode === null) {
                        this.root = currentNode.right;
                    } else {

                        //if parent > current, make right child of the left the parent
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.right;

                            //if parent < current, make right child a right child of the parent
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.right;
                        }
                    }

                    //Option 3: Right child that has a left child
                } else {

                    //find the Right child's left most child
                    let leftmost = currentNode.right.left;
                    let leftmostParent = currentNode.right;
                    while (leftmost.left !== null) {
                        leftmostParent = leftmost;
                        leftmost = leftmost.left;
                    }

                    //Parent's left subtree is now leftmost's right subtree
                    leftmostParent.left = leftmost.right;
                    leftmost.left = currentNode.left;
                    leftmost.right = currentNode.right;

                    if (parentNode === null) {
                        this.root = leftmost;
                    } else {
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = leftmost;
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = leftmost;
                        }
                    }
                }
                return true;
            }
        }
    }
    DFSInOrder(){
        const res = [];
        this.#DFSInOrderHelper(this.root, res);
        return res;
    }
    BFS(){
        let currentNode = this.root;

        const res = [], temp = [];
        while(currentNode){
            res.push(currentNode.value);
            if(currentNode.left) temp.push(currentNode.left);
            if(currentNode.right) temp.push(currentNode.right);
            currentNode = temp.shift();
        }
        return res;
    }
}

const tree = new BinarySearchTree();
tree.insert(9)
tree.insert(4)
tree.insert(6)
tree.insert(20)
tree.insert(170)
tree.insert(15)
tree.insert(1)
tree.insert(180)

console.log(tree.DFSInOrder());
console.log(tree.BFS());

/**
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if(!root) return 0;
    let maxLevel = [1];
    maxDepthHelper(root, 1, maxLevel);
    return maxLevel[0];
};

var maxDepthHelper = function(node, currentLevel, maxLevel) {
    if(!node) return;
    if(currentLevel > maxLevel[0]) maxLevel[0] = currentLevel;
    if(node.right) maxDepthHelper(node.right,currentLevel+1,maxLevel);
    if(node.left) maxDepthHelper(node.left,currentLevel+1,maxLevel);
}

console.log(maxDepth(tree.root));

/**
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) return [];
    let currentNode = root;
    currentNode.level = 0;

    const res = [], temp = [];
    while(currentNode){
        if(!res[currentNode.level]) {
            res[currentNode.level] = [currentNode.value];
        } else {
            res[currentNode.level].push(currentNode.value);
        }
        if(currentNode.left) {
            currentNode.left.level = currentNode.level+1;
            temp.push(currentNode.left);
        }
        if(currentNode.right) {
            currentNode.right.level = currentNode.level+1;
            temp.push(currentNode.right);
        }
        currentNode = temp.shift();
    }
    return res;
};

var levelOrderDFS = function(root) {
    if(!root) return [];
    const res = [];
    levelOrderDFSHelper(root, 0, res);
    return res;
};

var levelOrderDFSHelper = function(node, level, res) {
    if(!node) return;
    if(!res[level]) {
        res[level] = [node.value];
    } else {
        res[level].push(node.value);
    }
    if(node.left) {
        levelOrderDFSHelper(node.left,level+1,res);
    }
    if(node.right) {
        levelOrderDFSHelper(node.right,level+1,res);
    }
};

const lores = levelOrder(tree.root);
const loresdfs = levelOrderDFS(tree.root);

/**
 * https://leetcode.com/problems/binary-tree-right-side-view/
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    if(!root) return [];
    const res = [], helperStack = [root];
    while(helperStack.length){
        const totalLevelCount = helperStack.length;
        for(let i = 0; i<totalLevelCount;i++){
            const node = helperStack.shift();
            if(i===0) res.push(node.value);
            if(node.right) helperStack.push(node.right);
            if(node.left) helperStack.push(node.left);
        }
    }
    return res;
};

console.log(rightSideView(tree.root));

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
    if(!root) return 0;
    if(!root.left && !root.right) return 1;
    let maxLevel = 0, currentNode = root;
    while(currentNode) {
        maxLevel++;
        currentNode = currentNode.left;
    }
    const maxLevelAndCount = [maxLevel, 0];
    countNodesHelper(root, 1, maxLevelAndCount);
    return Math.pow(2,maxLevel-1)-1+maxLevelAndCount[1];
};

var countNodesHelper = function(node, level, maxLevelAndCount) {
    if(level === maxLevelAndCount[0]-1) {
        if(!node.left) return true;
        maxLevelAndCount[1]++;
        if(!node.right) return true;
        maxLevelAndCount[1]++;
        return false;
    }
    if(countNodesHelper(node.left,level+1,maxLevelAndCount)) return true;
    if(countNodesHelper(node.right,level+1,maxLevelAndCount)) return true;
    return false;
}

const node = new Node(4);
node.left = new Node(3);
node.left.left = new Node(1);
node.left.right = new Node(2);
node.right = new Node(6);
node.right.left = new Node(5);

console.log(countNodes(new Node(2)));