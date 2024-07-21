
class Node {
  constructor(array) {
    this.data = array[0];

    if (!array[1][0]) {
      this.left = null;
    } else {
      this.left = new Node(divideArrayforNode(array[1]));
    }

    if (!array[2][0]) {
      this.right = null;
    } else {
      this.right = new Node(divideArrayforNode(array[2]));
    }
  }
}

function sortAndDeleteDuplicates(array) {
  for (let i = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) != array.lastIndexOf(array[i])) {
      array.splice(array.lastIndexOf(array[i]), 1);
    }
  }
  // sorts in ascending order
  array.sort((a, b) => a - b);

  return array;
}

function divideArrayforNode(array) {
  // seperates array into three values. The data for the node, the left array, and the right array
  let forNodeArray = [];
  forNodeArray[0] = array[Math.floor(array.length / 2)];
  forNodeArray[1] = [];
  for (let i = 0; i < array.indexOf(forNodeArray[0]); i++) {
    forNodeArray[1][i] = array[i];
  }
  forNodeArray[2] = [];
  for (let i = array.indexOf(forNodeArray[0]) + 1; i < array.length; i++) {
    forNodeArray[2][i - forNodeArray[1].length - 1] = array[i];
  }

  return forNodeArray;
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    array = sortAndDeleteDuplicates(array);
    return new Node(divideArrayforNode(array));
  }

  insert(value) {
    let path = this.root;
    let parent = path;
    let array = [value];

    while (true) {
      if (path == null) {
        console.log(`Value: ${value} added`);
        break;
      }
      parent = path;
      if (value > path.data) {
        parent = path;
        path = path.right;
      } else if (value < path.data) {
        parent = path;
        path = path.left;
      } else if (value == path.data) {
        console.log(`Value: ${value}, already exists`);
        break;
      }
      
    }

    const newNode = new Node(divideArrayforNode(array));
    if (value < parent.data) {
      parent.left = newNode;
    } else if (value > parent.data) {
      parent.right = newNode;
    }
  }

  delete(value) {
    let path = this.root;
    let parent = path;

    while (true) {
      if (path == null) {
        console.log(`Value: ${value}, doesn't exist`);
        return;
      } else if (value > path.data) {
        parent = path;
        path = path.right;
      } else if (value < path.data) {
        parent = path;
        path = path.left;
      } else if (value == path.data) {
        break;
      }
      
    }

    if(path.left == null && path.right == null) {
        if(parent.left?.data) {
            parent.left = null
        } else if (parent.right?.data) {
            parent.right = null
        }
    } else if(path.right == null) {
        if(parent.right.data == value) {
            parent.right = path.left
        } else if(parent.left.data == value) {
            parent.left = path.left
        }
    } else if(path.left == null) {
        if(parent.right.data == value) {
            parent.right = path.right
        } else if(parent.left.data == value) {
            parent.left = path.right
        }
    } else if (path.left != null && path.right != null) {
      let pathNewData = path.right;
      let pathRight = path.right;
      while (true) {
        if (pathNewData.left == null) {
          break;
        }
        pathNewData = pathNewData.left;
      }

      let pathNew = {
        data: pathNewData.data,
        left: path.left,
        right: path.right,
      };
      let pathFind = pathNew.right;
      let pathFindParent = pathFind;
      while (true) {
        if (pathFind.left == null) {
          pathFindParent.left = null;
          break;
        }
        pathFindParent = pathFind;
        pathFind = pathFind.left;
      }

      if (parent.right.data == value) {
        parent.right = pathNew;
      } else if (parent.left.data == value) {
        parent.right = pathNew;
      }

      if (value == this.root.data) {
        this.root = pathNew;
      }
    }
  }

  find(value) {
    let path = this.root;

    while (true) {
      if (path == null) {
        console.log(`Value: ${value}, doesn't exist`);
        break;
      } else if (value > path.data) {
        path = path.right;
      } else if (value < path.data) {
        path = path.left;
      } else if (value == path.data) {
        break;
      }
    }
    return path;
  }


  levelOrder(callback = null, root = this.root) {
    const queue = []
    const result = []

    if(root == null) {
        return
    }
    queue.push(root)

    while(queue.length > 0) {
        let current = queue.shift()
        
        if(callback) {
            current.data = callback(current.data)
        }

        result.push(current.data)
        

        if(current.left != null) {
            queue.push(current.left)
        }

        if(current.right != null) {
            queue.push(current.right)
        }
    }
    
    console.log(result)
    return result
  }

  inOrder(callback, node = this.root, result = []) {
    if(node != null) {
        this.inOrder(callback, node.left, result)
        if(callback) {
            node.data = callback(node.data)
        }
        result.push(node.data)
        this.inOrder(callback, node.right, result)
    }
    return result
  }

  preOrder(callback = null, node = this.root, result = []) {
    if(node != null) {
        if(callback) {
            node.data = callback(node.data)
        }
        result.push(node.data)
        this.preOrder(callback, node.left, result)
        this.preOrder(callback, node.right, result)
    }
    return result
  }

  postOrder(callback = null, node = this.root, result = []) {
    if(node != null) {
        
        this.postOrder(callback, node.left, result)
        this.postOrder(callback, node.right, result)
        if(callback) {
            node.data = callback(node.data)
        }
        result.push(node.data)
    }
    return result
  }

  depth(node, path = this.root) {
    
    let height = 0

    while (true) {
      if (path == null) {
        console.log(`Value: ${node.data}, doesn't exist`);
        break;
      } else if (node.data > path.data) {
        path = path.right;
      } else if (node.data < path.data) {
        path = path.left;
      } else if (node.data == path.data) {
        break;
      }
      height++
    }
    return height;
  }

  height(node) {
    
    let array = this.preOrder(null, node)
    let processedArray1 = []
    let processedArray2 = []
    for (let i = 0; i < array.length; i++) {
        processedArray1[i] = this.find(array[i])
        processedArray2[i] = this.depth(processedArray1[i])
    }
    let bigNum = processedArray2[processedArray2.length - 1]
    let smallNum = processedArray2[0]
    let result = bigNum - smallNum
    return result
    
  }
  isBalanced() {
    let array = this.levelOrder()
    let processedArray1 = []
    let processedArray2 = []
    
    for (let i = 0; i < array.length; i++) {
        processedArray1[i] = this.find(array[i])
        processedArray2[i] = this.depth(processedArray1[i])
        
    }
    let variable = processedArray2[processedArray2.length - 1] - 1
    let variable2 = 0
    for(let i = 0; i < processedArray2.length; i++) {
        if(processedArray2[i] == variable) {
            variable2++
        }
    }
    if(Math.pow(2, variable) == variable2) {
        return true
    } else {
        return false
    }

    
  }
  rebalance() {
    let array = this.preOrder()
    this.root = this.buildTree(array)
  }
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null || node.data === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

function addOne(nodeData) {
    nodeData++
    return nodeData
}

function getRandomNumbers(count, max) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * max));
}

const randomNumbers = getRandomNumbers(15, 100);
const tree = new Tree(randomNumbers);




console.log('Tree is balanced:', tree.isBalanced());


console.log('Level-order:', tree.levelOrder());
console.log('Pre-order:', tree.preOrder());
console.log('In-order:', tree.inOrder());
console.log('Post-order:', tree.postOrder());


const unbalancingNumbers = [101, 102, 103, 104, 105];
unbalancingNumbers.forEach(num => tree.insert(num));
console.log('Unbalancing numbers added:', unbalancingNumbers);


console.log('Tree is balanced after adding > 100:', tree.isBalanced());


tree.rebalance();
console.log('Tree has been rebalanced');


console.log('Tree is balanced after rebalancing:', tree.isBalanced());

console.log('Level-order after rebalancing:', tree.levelOrder());
console.log('Pre-order after rebalancing:', tree.preOrder());
console.log('In-order after rebalancing:', tree.inOrder());
console.log('Post-order after rebalancing:', tree.postOrder());