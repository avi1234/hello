/**
 * https://leetcode.com/problems/time-needed-to-inform-all-employees/
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function(n, headID, manager, informTime) {
    //build subordinates array
    const subordinates = new Array(n).fill(0).map(() => new Array());
    for(let i=0;i < n; i++) {
        if(manager[i] > -1) subordinates[manager[i]].push(i);
    }

    //BFS using queue
    let totalMinutes = 0, maxMinutesInLevel = 0, countInLevel = 1;
    const queue = [headID];

    while(queue.length) {
        const currentValue = queue.shift();
        countInLevel--;
        if(subordinates[currentValue].length) {
            if(informTime[currentValue] > maxMinutesInLevel) {
                maxMinutesInLevel = informTime[currentValue];
            }
        }
        
        for(let i=0; i < subordinates[currentValue].length; i++) {
            queue.push(subordinates[currentValue][i]);
        }
        
        if(countInLevel === 0) {
            countInLevel =  queue.length;
            console.log(`adding ${maxMinutesInLevel} to ${totalMinutes}`);
            totalMinutes += maxMinutesInLevel;
            maxMinutesInLevel = 0;
        }
    }

    return totalMinutes;
};

var numOfMinute2 = function(n, headID, manager, informTime) {
    const adjList = manager.map(() => []);
  
  for(let employee = 0; employee < n; employee++) {
    const manager2 = manager[employee];
    if(manager2 === -1) continue;
    
    adjList[manager2].push(employee);
  }
  
  return dfs(headID, adjList, informTime);
};

const dfs = function(currentId, adjList, informTime) {
  if(adjList[currentId].length === 0) {
    return 0;
  }
  
  let max = 0;
  const subordinates = adjList[currentId];
  for(let i = 0; i < subordinates.length; i++) {
    max = Math.max(max, dfs(subordinates[i], adjList, informTime));
  }

  console.log(`for ${currentId} adding ${max} and returning ${max + informTime[currentId]}`);
  
  return max + informTime[currentId];
};

// console.log(numOfMinutes(n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0]));
console.log(numOfMinutes(n = 11, headID = 4, manager = [5,9,6,10,-1,8,9,1,9,3,4], informTime = [0,213,0,253,686,170,975,0,261,309,337]));
console.log(numOfMinute2(n = 11, headID = 4, manager = [5,9,6,10,-1,8,9,1,9,3,4], informTime = [0,213,0,253,686,170,975,0,261,309,337]));

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if(!nums || nums.length <= 2) return nums.length;

    let lastItem = nums[0],
    lastItemIndex=0, foundDuplicate = false;

    for(let i=1; i<nums.length;i++){
      if(nums[i] === lastItem) {
        if(!foundDuplicate) {
          lastItemIndex++;
          foundDuplicate = true;
        }
      } else if(nums[i] > lastItem) {
        lastItem = nums[i];
        lastItemIndex++;
        nums[lastItemIndex] = lastItem;
        foundDuplicate = false;
      }
    }

    return lastItemIndex+1;
};

const t1 = [0,0,1,1,1,2,2,3,3,4], t2 = removeDuplicates(t1);
console.log(t2);
