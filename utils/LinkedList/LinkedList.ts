import LinkedListNode from "./LinkedListNode";

class LinkedList<T> {
    public head: LinkedListNode<T> | null = null;
    public tail: LinkedListNode<T> | null = null;
    public amount = 0;

    constructor() { }

    public add(data: T) {
        const newNode = new LinkedListNode(data);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.amount++;
    }

    public addLast(data: T) {
        const newNode = new LinkedListNode(data);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.amount++;
    }

    public addFirst(data: T) {
        const newNode = new LinkedListNode(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.amount++;
    }

    public clear() {
        this.head = null;
        this.tail = null;
        this.amount = 0;
    }

    public contains(data: T) {
        if (this.isEmpty()) {
            throw new Error("LinkedList is empty!");
        }

        let current = this.head;

        while (current !== null) {
            if (current.data === data) {
                return true;
            }

            current = current.next;
        }

        return false;
    }


    public copyToArray(): T[] {

        const copiedList: T[] = [];
        let current = this.head;

        while (current !== null) {
            copiedList.push(current.data);
            current = current.next;
        }

        return copiedList;
    }

    dumpList() {
    let current = this.head;
    while (current != null) {
        console.log(`
      node: ${JSON.stringify(current.data, null, 2)}
        prev: ${current.prev ? JSON.stringify(current.prev.data, null, 2) : 'undefined'}
        next: ${current.next ? JSON.stringify(current.next.data, null, 2) : 'undefined'}
      `);

        current = current.next;
    }
}


    public forEach(callback: (data: T) => void): void {
        let current = this.head;

        while (current !== null) {
            callback(current.data);
            current = current.next;
        }
    }

    public get(index: number) {
        if (this.isEmpty()) {
            throw new Error("LinkedList is empty!");
        }

        let current = this.head;

        while (current !== null) {
            if (this.amount === index) {
                return current.data;
            }

            current = current.next;
            this.amount++;
        }
    }

    public indexOf(data: T) {
        if (this.isEmpty()) {
            throw new Error("LinkedList is empty!");
        }

        let current = this.head;

        while (current !== null) {
            if (current.data === data) {
                return this.amount;
            }

            current = current.next;
        }

        return -1;
    }

    public getFirst() {
        if (this.isEmpty()) {
            throw new Error("LinkedList is empty!");
        }
        return this.head?.data;
    }

    public getLast() {
        if (this.isEmpty()) {
            throw new Error("LinkedList is empty!");
        }

        return this.tail?.data;
    }


    public map(callback: (data: T) => T): LinkedList<T> {
        const mappedList = new LinkedList<T>();
        let current = this.head;

        while (current !== null) {
            const newData = callback(current.data);
            mappedList.add(newData);
            current = current.next;
        }

        return mappedList;
    }


    public insertAfter(index: number, data: T) {
        if (index < 0 || index >= this.size()) {
            throw new Error(`Index ${index} out of bounds for size ${this.size}`);
        }

        const newNode = new LinkedListNode<T>(data);

        let current = this.head;
        let currentIndex = 0;

        while (current !== null && currentIndex < index) {
            current = current.next;
            currentIndex++;
        }

        if (current !== null) {
            newNode.prev = current;
            newNode.next = current.next;

            if (current.next !== null) {
                current.next.prev = newNode;
            } else {
                this.tail = newNode;
            }

            current.next = newNode;
        }

        this.amount++;
    }

    public insertAfterNode(data: T, existingNode: LinkedListNode<T>) {
        const newNode = new LinkedListNode<T>(data);

        newNode.next = existingNode.next;
        newNode.prev = existingNode;

        if (existingNode.next) {
            existingNode.next.prev = newNode;
        } else {
            this.tail = newNode;
        }

        existingNode.next = newNode;
        this.amount++;
    }




    public insertBefore(index: number, data: T) {
        if (index < 0 || index > this.size()) {
            throw new Error(`Index ${index} out of bounds for list size ${this.size}`);
        }

        const newNode = new LinkedListNode<T>(data);

        if (index === 0) {
            newNode.next = this.head;
            if (this.head !== null) {
                this.head.prev = newNode;
            } else {
                this.tail = newNode;
            }
            this.head = newNode;
        } else {
            let current = this.head;
            let currentIndex = 0;

            while (currentIndex < index - 1 && current !== null) {
                current = current.next;
                currentIndex++;
            }

            if (current !== null) {
                newNode.next = current.next;
                newNode.prev = current;

                if (current.next !== null) {
                    current.next.prev = newNode;
                } else {
                    this.tail = newNode;
                }

                current.next = newNode;
            }
        }

        this.amount++;
    }

    public insertBeforeNode(data: T, existingNode: LinkedListNode<T>) {
        const newNode = new LinkedListNode<T>(data);

        newNode.prev = existingNode.prev;
        newNode.next = existingNode;

        if (existingNode.prev) {
            existingNode.prev.next = newNode;
        } else {
            this.head = newNode;
        }

        existingNode.prev = newNode;
        this.amount++;
    }


    public isEmpty() {
        return this.amount === 0;
    }

    public nodeAt(index: number): LinkedListNode<T> | null {
        if (index < 0 || index >= this.size()) {
            throw new Error(`Index ${index} out of bounds for list size ${this.size}`);
        }

        let current = this.head;
        for (let i = 0; i < index && current !== null; i++) {
            current = current.next;
        }

        return current;
    }



    public remove(data: T) {
        if (this.isEmpty()) {
            throw new Error("LinkedList is empty!");
        }

        let current = this.head;

        while (current !== null) {
            if (current.data === data) {
                if (current === this.head) {
                    this.head = this.head.next;
                    if (this.head) {
                        this.head.prev = null;
                    }
                }

                if (current === this.tail) {
                    this.tail = this.tail.prev;
                    if (this.tail) {
                        this.tail.next = null;
                    }
                }

                if (current.next) {
                    current.next.prev = current.prev;
                }
                if (current.prev) {
                    current.prev.next = current.next;
                }

                this.amount--;
                return;
            }

            current = current.next;
        }
    }

    public removeAfter(data: T) {
        if (this.isEmpty()) {
            throw new Error("LinkedList is empty!");
        }

        let current = this.head;

        while (current !== null) {
            if (current.data === data && current.next !== null) {
                if (current.next === this.tail) {
                    this.tail = current;
                }
                current.next = current.next.next;

                if (current.next !== null) {
                    current.next.prev = current;
                }

                this.amount--;
                break;
            }
            current = current.next;
        }
    }

    public removeFirst() {
        if (this.isEmpty()) {
            throw new Error("LinkedList is empty!");
        }

        if (this.head !== null) {
            if (this.head?.hasNext()) {
                this.head = this.head?.next!
            } else {
                this.head = null;
                this.tail = null;
            }

            this.amount--;
        }
    }

    public removeLast() {
        if (this.isEmpty()) {
            throw new Error("LinkedList is empty!");
        }

        if (this.tail !== null) {
            if (this.tail.prev) {
                this.tail.prev.next = null;
            } else {
                this.head = null;
                this.tail = null;
            }

            this.amount--;
        }
    }

    public removeNode(node: LinkedListNode<T>) {
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }

        this.amount--;
    }


    public size() {
        return this.amount;
    }

    public swapNodes(nodeA: LinkedListNode<T>, nodeB: LinkedListNode<T>) {
        if (nodeA === nodeB) return;

        const tempPrev = nodeA.prev;
        const tempNext = nodeA.next;

        if (nodeA.prev) nodeA.prev.next = nodeB;
        if (nodeA.next) nodeA.next.prev = nodeB;

        nodeA.prev = nodeB.prev;
        nodeA.next = nodeB.next;

        if (nodeB.prev) nodeB.prev.next = nodeA;
        if (nodeB.next) nodeB.next.prev = nodeA;

        nodeB.prev = tempPrev;
        nodeB.next = tempNext;

        if (this.head === nodeA) {
            this.head = nodeB;
        } else if (this.head === nodeB) {
            this.head = nodeA;
        }

        if (this.tail === nodeA) {
            this.tail = nodeB;
        } else if (this.tail === nodeB) {
            this.tail = nodeA;
        }
    }



}

export default LinkedList