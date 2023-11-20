class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}

class BinarySearchTree {
    #DFSInOrderHelper(node, results) {
        if (!node) return;
        if (node.left) {
            this.#DFSInOrderHelper(node.left, results);
        }
        results.push(node.value);
        if (node.right) {
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
    DFSInOrder() {
        const res = [];
        this.#DFSInOrderHelper(this.root, res);
        return res;
    }
    BFS() {
        let currentNode = this.root;

        const res = [], temp = [];
        while (currentNode) {
            res.push(currentNode.value);
            if (currentNode.left) temp.push(currentNode.left);
            if (currentNode.right) temp.push(currentNode.right);
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
var maxDepth = function (root) {
    if (!root) return 0;
    let maxLevel = [1];
    maxDepthHelper(root, 1, maxLevel);
    return maxLevel[0];
};

var maxDepthHelper = function (node, currentLevel, maxLevel) {
    if (!node) return;
    if (currentLevel > maxLevel[0]) maxLevel[0] = currentLevel;
    if (node.right) maxDepthHelper(node.right, currentLevel + 1, maxLevel);
    if (node.left) maxDepthHelper(node.left, currentLevel + 1, maxLevel);
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
var levelOrder = function (root) {
    if (!root) return [];
    let currentNode = root;
    currentNode.level = 0;

    const res = [], temp = [];
    while (currentNode) {
        if (!res[currentNode.level]) {
            res[currentNode.level] = [currentNode.value];
        } else {
            res[currentNode.level].push(currentNode.value);
        }
        if (currentNode.left) {
            currentNode.left.level = currentNode.level + 1;
            temp.push(currentNode.left);
        }
        if (currentNode.right) {
            currentNode.right.level = currentNode.level + 1;
            temp.push(currentNode.right);
        }
        currentNode = temp.shift();
    }
    return res;
};

var levelOrderDFS = function (root) {
    if (!root) return [];
    const res = [];
    levelOrderDFSHelper(root, 0, res);
    return res;
};

var levelOrderDFSHelper = function (node, level, res) {
    if (!node) return;
    if (!res[level]) {
        res[level] = [node.value];
    } else {
        res[level].push(node.value);
    }
    if (node.left) {
        levelOrderDFSHelper(node.left, level + 1, res);
    }
    if (node.right) {
        levelOrderDFSHelper(node.right, level + 1, res);
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
var rightSideView = function (root) {
    if (!root) return [];
    const res = [], helperStack = [root];
    while (helperStack.length) {
        const totalLevelCount = helperStack.length;
        for (let i = 0; i < totalLevelCount; i++) {
            const node = helperStack.shift();
            if (i === 0) res.push(node.value);
            if (node.right) helperStack.push(node.right);
            if (node.left) helperStack.push(node.left);
        }
    }
    return res;
};

console.log(rightSideView(tree.root));

/**
 * https://leetcode.com/problems/count-complete-tree-nodes/submissions/1090650676/
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
var countNodes = function (root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;
    let maxLevel = 0, currentNode = root;
    while (currentNode) {
        maxLevel++;
        currentNode = currentNode.left;
    }

    let nullIndex = binarySearchNullByLevel(root, maxLevel, 0, Math.pow(2, maxLevel) / 2);
    let loopIndex = nullIndex;
    while (loopIndex > -1) {
        loopIndex = binarySearchNullByLevel(root, maxLevel, 0, nullIndex - 1);
        if (loopIndex > -1) nullIndex = loopIndex;
    }

    if (nullIndex === -1) {
        return Math.pow(2, maxLevel) - 1;
    } else {
        return Math.pow(2, maxLevel - 1) - 1 + nullIndex;
    }
};

var binarySearchNullByLevel = function (node, level, from, to) {
    while (from <= to) {
        const midIndex = Math.ceil((to - from) / 2) + from;
        const midValue = getLevelElement(node, level, midIndex);
        if (!midValue) return midIndex;
        from = midIndex + 1;
    }
    return -1;
}

var getLevelElement = function (node, level, index) {
    let currentLevel = 1, from = 0, to = Math.pow(2, level) / 2, currentNode = node;
    while (currentLevel < level) {
        const mid = Math.ceil((to - from) / 2) + from;
        currentLevel++;
        if (index < mid) {
            console.log(`move left node ${currentNode.value} from ${from} to ${to}`)
            currentNode = currentNode.left;
            to = mid - 1;
        } else {
            console.log(`move right node ${currentNode.value} from ${from} to ${to}`)
            currentNode = currentNode.right;
            from = mid;
        }
    }
    return currentNode;
}


var countNodesHelper = function (node, level, maxLevelAndCount) {
    if (level === maxLevelAndCount[0] - 1) {
        if (!node.left) return true;
        maxLevelAndCount[1]++;
        if (!node.right) return true;
        maxLevelAndCount[1]++;
        return false;
    }
    if (countNodesHelper(node.left, level + 1, maxLevelAndCount)) return true;
    if (countNodesHelper(node.right, level + 1, maxLevelAndCount)) return true;
    return false;
}

const node2 = new Node(12);
node2.left = new Node(8);
node2.left.left = new Node(5);
node2.left.right = new Node(10);
node2.right = new Node(18);
node2.right.left = new Node(14);

console.log(countNodes(new Node(2)));

console.log(getLevelElement(node2, 3, 3));

/**
 * https://leetcode.com/problems/validate-binary-search-tree/
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
    if (!root) return true;
    if (!root.left && !root.right) return true;
    return isValidBSTHelper(root, []);
};

var isValidBSTHelper = function (node, minValue) {
    if (node.left) {
        if (!isValidBSTHelper(node.left, minValue)) return false;
    }
    if (minValue.length > 0 && node.value <= minValue[0]) return false;
    minValue[0] = node.value;
    if (node.right) {
        if (!isValidBSTHelper(node.right, minValue)) return false;
    }
    return true;
}

const node3 = new Node(0);
//node3.left = new Node(1);
node3.right = new Node(-1);
//node3.right.left = new Node(3);
//node3.right.right = new Node(6);
console.log(isValidBST(node3));

/**
 * https://leetcode.com/problems/number-of-islands/
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    if (grid.length === 0) return 0;
    const visitedGrid = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(false));
    let numOfIslands = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
            if (grid[row][column] === "1" && visitedGrid[row][column] === false) {
                numOfIslands++;
                markIsland(grid, visitedGrid, row, column);
            }
        }
    }
    return numOfIslands;
};

var markIsland = function (grid, visitedGrid, row, column) {
    if (
        row < 0 || column < 0 || row >= visitedGrid.length || column >= visitedGrid[0].length ||
        visitedGrid[row][column] === true || grid[row][column] === "0"
    ) return;
    visitedGrid[row][column] = true;
    markIsland(grid, visitedGrid, row - 1, column);
    markIsland(grid, visitedGrid, row, column + 1);
    markIsland(grid, visitedGrid, row + 1, column);
    markIsland(grid, visitedGrid, row, column - 1);
}

console.log(numIslands(
    [["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"]]));

var gridBFS = function (grid, row, column) {
    const res = [];
    const queue = [[row, column]];
    const directions = [
        [-1, 0], //up
        [0, 1], //right
        [1, 0], //down
        [0, -1], //left
    ];
    const seenGrid = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(false));
    while (queue.length) {
        const currentItem = queue.shift();
        if (seenGrid[currentItem[0]][currentItem[1]]) continue;
        res.push(grid[currentItem[0]][currentItem[1]]);
        seenGrid[currentItem[0]][currentItem[1]] = true;
        for (let i = 0; i < directions.length; i++) {
            const rowToCheck = currentItem[0] + directions[i][0],
                columnToCheck = currentItem[1] + directions[i][1];
            if (
                rowToCheck < 0 ||
                rowToCheck >= grid.length ||
                columnToCheck < 0 ||
                columnToCheck >= grid[0].length ||
                seenGrid[rowToCheck][columnToCheck]
            ) continue;
            queue.push([rowToCheck, columnToCheck]);
        }
    }

    return res;
}

var buildGrid = function (m, n) {
    let i = 1;
    const res = new Array(m).fill(0).map(() => new Array(n).fill(0).map(() => i++));
    return res;
}

console.log(gridBFS(buildGrid(5, 5), 2, 2));

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    // input validation
    if (grid.length === 0 || grid[0].length === 0) return 0;

    // calc num of 1
    // push all 2 to initial queue
    let freshOrangesCounter = 0;
    const q = [];
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
            const val = grid[row][column];
            if (val === 1) {
                freshOrangesCounter++;
            } else if (val === 2) {
                q.push([row, column]);
            }
        }
    }

    let itemsRemainingInCurrentMinute = q.length, totalMinutes = 0;
    const directions = [
        [-1, 0], //up
        [0, 1], //right
        [1, 0], //down
        [0, -1], //left
    ];

    while (q.length) {
        const currentItem = q.shift();
        if (currentItem[0] < 0 || currentItem[0] >= grid.length ||
            currentItem[1] < 0 || currentItem[1] >= grid[0].length) continue;
        if(itemsRemainingInCurrentMinute === 0) {
            itemsRemainingInCurrentMinute = q.length;
            totalMinutes++;
        } else {
            itemsRemainingInCurrentMinute--;
        }
        if(grid[currentItem[0]][currentItem[1]] === 1) {
            grid[currentItem[0]][currentItem[1]] = 2;
            freshOrangesCounter--;
            if(freshOrangesCounter === 0) return totalMinutes;
        }
        for(let i=0; i<directions.length;i++) {
            const newRow = currentItem[0] + directions[i][0], newColumn = currentItem[1] + directions[i][1];
            if (newRow < 0 || newRow >= grid.length ||
                newColumn < 0 || newColumn >= grid[0].length || grid[newRow][newColumn] !== 1) continue;
            q.push([newRow,newColumn]);
        }
    }

    if(freshOrangesCounter === 0) return totalMinutes;
    return -1;
};

console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]));