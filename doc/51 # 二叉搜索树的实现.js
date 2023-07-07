// 节点
class Node {
    constructor(element, parent) {
        this.element = element; // 存的数据
        this.parent = parent; // 父节点
        this.left = null; // 左子树
        this.right = null; // 右子树
    }
}

class BST {
    constructor(compare) {
        this.root = null;
        this.size = 0; // 节点个数
        this.compare = compare || this.compare;
    }
    compare(e1, e2) {
        return e1 - e2;
    }
    // 添加节点
    add(element) {
        // 如果根元素不存在
        if (this.root === null) {
            this.root = new Node(element, null);
            this.size++;
            return;
        } else {
            // 如果根元素存在，那么增加的就不是根节点，需要找到 parent
            let currentNode = this.root;
            // 当前比较的结果
            let compare = 0;
            // 先找到需要对比的 parent（当前父节点）
            let parent = null;
            while (currentNode) {
                parent = currentNode;
                compare = this.compare(element, currentNode.element);
                // 如果大于 0 找右树，小于 0 找左树
                if (compare > 0) {
                    currentNode = currentNode.right;
                } else if (compare < 0) {
                    currentNode = currentNode.left;
                } else {
                    // 如果比较后结果一样，由自己决定是否需要覆盖
                    currentNode.element = element; // 覆盖
                    return;
                }
            }
            // 找到了 parent，生成新节点
            let newNode = new Node(element, parent);
            if (compare > 0) {
                parent.right = newNode;
            } else {
                parent.left = newNode;
            }
        }
    }
}

// let bst = new BST();

// let arr = [10, 8, 19, 6, 15, 22, 20];

// arr.forEach((element) => {
//     bst.add(element);
// });

// console.dir(bst.root, { depth: 100 });

// 自定义比较器
let bst = new BST((e1, e2) => {
    return e1.age - e2.age;
});

let arr = [
    {
        name: "凯",
        age: 3
    },
    {
        name: "小",
        age: 1
    },
    {
        name: "默",
        age: 3
    },
    {
        name: "的",
        age: 6
    },
    {
        name: "博",
        age: 7
    },
    {
        name: "客",
        age: 8
    }
];

arr.forEach((element) => {
    bst.add(element);
});

console.dir(bst.root, { depth: 100 });
