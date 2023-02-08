export default class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(obj) {
        this.items.push(obj);
    }
    dequeue() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
