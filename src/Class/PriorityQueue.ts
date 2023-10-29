class PriorityQueue<T> {
    private items: { element: T; priority: number }[] = [];

    constructor() {}

    enqueue(element: T, priority: number): void {
        const QUEUE_ELEMENT = { element, priority };
        this.items.push(QUEUE_ELEMENT);
        this.heapifyUp();
    }

    dequeue(): T {
        if (this.isEmpty()) {
            // eslint-disable-next-line quotes
            throw new Error("PriorityQueue is Empty. Can't dequeue.");
        }

        const ROOT = this.items[0];

        if (this.items.length === 1) {
            this.items.pop();
        } else {
            this.items[0] = this.items.pop()!;
            this.heapifyDown();
        }

        return ROOT.element;
    }

    front(): T | undefined {
        return this.isEmpty() ? undefined : this.items[0].element;
    }

    rear(): T | undefined {
        return this.isEmpty() ? undefined : this.items[this.items.length - 1].element;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    toArray(): T[] {
        return this.items.map((item) => item.element);
    }

    private heapifyUp(): void {
        let currentIndex = this.items.length - 1;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);

            if (this.items[currentIndex].priority < this.items[parentIndex].priority) {
                this.swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    private heapifyDown(): void {
        let currentIndex = 0;
        const length = this.items.length;

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let smallestChildIndex = currentIndex;

            if (
                leftChildIndex < length &&
                this.items[leftChildIndex].priority < this.items[smallestChildIndex].priority
            ) {
                smallestChildIndex = leftChildIndex;
            }

            if (
                rightChildIndex < length &&
                this.items[rightChildIndex].priority < this.items[smallestChildIndex].priority
            ) {
                smallestChildIndex = rightChildIndex;
            }

            if (smallestChildIndex === currentIndex) {
                break;
            }

            this.swap(currentIndex, smallestChildIndex);
            currentIndex = smallestChildIndex;
        }
    }

    private swap(index1: number, index2: number): void {
        [this.items[index1], this.items[index2]] = [this.items[index2], this.items[index1]];
    }
}

export { PriorityQueue };
