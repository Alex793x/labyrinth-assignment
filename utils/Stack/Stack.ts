import LinkedList from "../LinkedList/LinkedList";
import LinkedListNode from "../LinkedList/LinkedListNode";

class Stack<T> {
    private top: LinkedListNode<T> | null;
    private buffer: LinkedList<T>;

    constructor() {
        this.buffer = new LinkedList();
        this.top = this.buffer.head;
    }

    contains(element: T): boolean {
        let current = this.top;
        while (current !== null) {
            if (current.data === element) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    push(item: T) {
        this.buffer.addFirst(item);
        this.top = this.buffer.head;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        const item = this.buffer.getFirst();
        this.buffer.removeFirst();
        this.top = this.buffer.head;
        return item;
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.buffer.getFirst();
    }

    size() {
        return this.buffer.size();
    }

    isEmpty() {
        return this.buffer.isEmpty();
    }

    clear() {
        this.buffer.clear();
        this.top = null;
    }
}

export default Stack;