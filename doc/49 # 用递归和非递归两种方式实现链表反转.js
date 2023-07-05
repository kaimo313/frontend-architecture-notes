// 节点类
class Node {
    constructor(element, next) {
        this.element = element; // 存放的数据
        this.next = next; // next 指针表示下一个是谁
    }
}

class LinkedList {
    constructor() {
        this.head = null; // 链表的头
        this.size = 0; // 链表长度
    }
    // 可以直接在尾部添加内容，或者根据索引添加
    add(index, element) {
        // 传入一个参数是需要设置一下 index, element
        if (arguments.length === 1) {
            // 在尾部添加，传入的 index 就当做是 element
            element = index;
            // 然后把 this.size 当做索引
            index = this.size;
        }
        // 处理越界可能
        if (index < 0 || index > this.size) throw new Error("越界");
        // 在索引为 0 的位置上插入元素
        if (index === 0) {
            // 老的头
            let head = this.head;
            // 设置新头，将老的头变为当前节点的下一个
            this.head = new Node(element, head);
        } else {
            // 先找到当前索引的上一个
            let prevNode = this.getNode(index - 1);
            // 将当前上一个节点的 next 指向新的节点，新的节点的下一个指向上一个节点的 next
            prevNode.next = new Node(element, prevNode.next);
        }
        // 累加 size
        this.size++;
    }
    getNode(index) {
        // 从头开始找
        let current = this.head;
        // 不能向后找，找到索引的位置
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
    // 递归方式反转
    reverseLinkedList() {
        const reverse = (head) => {
            // 停止条件
            if (head === null || head.next === null) return head;
            let newHead = reverse(head.next);
            head.next.next = head;
            head.next = null;
            return newHead;
        };
        this.head = reverse(this.head);
        return this.head;
    }
    // 非递归方式反转
    reverseLinkedList2() {
        // 获取原来的第一个元素
        let head = this.head;
        // 处理临界值：如果没有或者只有一个
        if (head === null || head.next === null) return head;
        let newHead = null;
        while (head !== null) {
            let temp = head.next; // 先保留 B
            head.next = newHead;
            newHead = head;
            head = temp;
        }
        this.head = newHead;
        return this.head;
    }
}

let ll = new LinkedList();
ll.add(0, 1);
ll.add(0, 2);
ll.add(3);
ll.add(1, 4);
// 不反转的：2 -> 4 -> 1 -> 3
console.log("不反转的---->");
console.dir(ll, { depth: 100 });
// 递归方式反转：3 -> 1 -> 4 -> 2
console.log("递归方式反转---->");
console.dir(ll.reverseLinkedList(), { depth: 100 });
// 非递归方式反转：3 -> 1 -> 4 -> 2
console.log("非递归方式反转---->");
console.dir(ll.reverseLinkedList2(), { depth: 100 });
