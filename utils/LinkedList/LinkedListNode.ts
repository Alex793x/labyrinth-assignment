class LinkedListNode<T> {
    public data: T;
    public next: LinkedListNode<T> | null = null;
    public prev: LinkedListNode<T> | null = null;

    constructor(data: T) {
        this.data = data;
    }

    public hasNext() {
        return this.next !== null;
    }

    public hasPrev() {
        return this.prev !== null;
    }

}

export default LinkedListNode