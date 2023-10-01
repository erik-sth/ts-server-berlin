class PriorityQueue<T> {
  private items: { element: T; priority: number }[];

  constructor() {
    this.items = [];
  }

  enqueue(element: T, priority: number) {
    const queueElement = { element, priority };
    this.items.push(queueElement);
    this.heapifyUp();
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const root = this.items[0];
    if (this.items.length === 1) {
      this.items.pop();
    } else {
      this.items[0] = this.items.pop()!;
      this.heapifyDown();
    }
    return root.element;
  }

  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.items[0].element;
  }

  peekLast(): T | undefined {
    return this.isEmpty()
      ? undefined
      : this.items[this.items.length - 1].element;
  }

  front(): T | undefined {
    return this.peek();
  }

  rear(): T | undefined {
    return this.peekLast();
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

  private heapifyUp() {
    let currentIndex = this.items.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (
        this.items[currentIndex].priority < this.items[parentIndex].priority
      ) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  private heapifyDown() {
    let currentIndex = 0;
    const length = this.items.length;
    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestChildIndex = currentIndex;

      if (
        leftChildIndex < length &&
        this.items[leftChildIndex].priority <
          this.items[smallestChildIndex].priority
      ) {
        smallestChildIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.items[rightChildIndex].priority <
          this.items[smallestChildIndex].priority
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

  private swap(index1: number, index2: number) {
    [this.items[index1], this.items[index2]] = [
      this.items[index2],
      this.items[index1],
    ];
  }
}

export { PriorityQueue };
