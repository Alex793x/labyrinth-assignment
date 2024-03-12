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


    find(predicate: (item: T) => boolean): T | undefined {
        let current = this.top;
        while (current !== null) {
            if (predicate(current.data)) {
                return current.data;
            }
            current = current.next;
        }
        return undefined;
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
    sort(compareFn: (a: T, b: T) => number): void {
        this.buffer.sort(compareFn);
    }

    shift(): T | undefined {
        const item = this.buffer.shift();
        return item === null ? undefined : item;
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