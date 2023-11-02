import { PriorityQueue } from '../../src/Class/PriorityQueue';

describe('PriorityQueue', () => {
    it('should enqueue elements with proper priority and dequeue in correct order', () => {
        const priorityQueue = new PriorityQueue<string>();

        priorityQueue.enqueue('Task 1', 3);
        priorityQueue.enqueue('Task 2', 1);
        priorityQueue.enqueue('Task 3', 2);

        expect(priorityQueue.dequeue()).toBe('Task 2');
        expect(priorityQueue.dequeue()).toBe('Task 3');
        expect(priorityQueue.dequeue()).toBe('Task 1');
    });

    it('should return when dequeuing from an empty queue', () => {
        const priorityQueue = new PriorityQueue<number>();

        expect(() => priorityQueue.dequeue()).toThrow();
    });

    it('should return the front element without dequeuing', () => {
        const priorityQueue = new PriorityQueue<number>();

        priorityQueue.enqueue(10, 3);
        priorityQueue.enqueue(20, 1);
        priorityQueue.enqueue(30, 2);

        expect(priorityQueue.front()).toBe(20);
    });

    it('should return undefined for front() and rear() on an empty queue', () => {
        const priorityQueue = new PriorityQueue<number>();

        expect(priorityQueue.front()).toBeUndefined();
        expect(priorityQueue.rear()).toBeUndefined();
    });

    it('should return the rear element without dequeuing', () => {
        const priorityQueue = new PriorityQueue<number>();

        priorityQueue.enqueue(10, 3);
        priorityQueue.enqueue(20, 1);
        priorityQueue.enqueue(30, 2);

        expect(priorityQueue.rear()).toBe(30);
    });

    it('should return undefined when peeking an empty queue', () => {
        const priorityQueue = new PriorityQueue<number>();

        expect(priorityQueue.front()).toBeUndefined();
        expect(priorityQueue.rear()).toBeUndefined();
    });

    it('should return the correct size of the queue', () => {
        const priorityQueue = new PriorityQueue<number>();

        priorityQueue.enqueue(10, 2);
        priorityQueue.enqueue(20, 1);
        priorityQueue.enqueue(30, 3);

        expect(priorityQueue.size()).toBe(3);

        priorityQueue.dequeue();
        expect(priorityQueue.size()).toBe(2);
    });

    it('should return true for isEmpty() on an empty queue and false otherwise', () => {
        const priorityQueue = new PriorityQueue<number>();

        expect(priorityQueue.isEmpty()).toBe(true);

        priorityQueue.enqueue(10, 2);
        expect(priorityQueue.isEmpty()).toBe(false);

        priorityQueue.dequeue();
        expect(priorityQueue.isEmpty()).toBe(true);
    });

    it('should return an array representation of the queue', () => {
        const priorityQueue = new PriorityQueue<string>();

        priorityQueue.enqueue('Task 1', 3);
        priorityQueue.enqueue('Task 2', 1);
        priorityQueue.enqueue('Task 3', 2);

        const expectedOrder = ['Task 1', 'Task 3', 'Task 2'];
        const actualOrder = priorityQueue.toArray();

        // Check if the arrays have the same elements (ignoring order)
        expect(actualOrder).toEqual(expect.arrayContaining(expectedOrder));
    });
});
