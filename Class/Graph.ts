class GraphNode<T> {
  value: T;
  edges: GraphNode<T>[] = [];

  constructor(value: T) {
    this.value = value;
  }
}

class DirectedGraph<T> {
  nodes: GraphNode<T>[] = [];

  addNode(value: T): GraphNode<T> {
    const newNode = new GraphNode(value);
    this.nodes.push(newNode);
    return newNode;
  }

  addEdge(from: GraphNode<T>, to: GraphNode<T>): void {
    from.edges.push(to);
  }

  removeNode(node: GraphNode<T>): void {
    const index = this.nodes.indexOf(node);
    if (index !== -1) {
      this.nodes.splice(index, 1);
      this.nodes.forEach((n) => {
        const edgeIndex = n.edges.indexOf(node);
        if (edgeIndex !== -1) {
          n.edges.splice(edgeIndex, 1);
        }
      });
    }
  }
  includes(item: T): boolean {
    return this.nodes.some((node) => node.value === item);
  }
  removeEdge(from: GraphNode<T>, to: GraphNode<T>): void {
    const index = from.edges.indexOf(to);
    if (index !== -1) {
      from.edges.splice(index, 1);
    }
  }
  getNodesWithoutIngoingEdges(): GraphNode<T>[] {
    // Create a map to keep track of incoming edge counts for each node.
    const incomingEdgeCounts = new Map<GraphNode<T>, number>();

    // Initialize the map with all nodes and set their counts to 0.
    this.nodes.forEach((node) => {
      incomingEdgeCounts.set(node, 0);
    });

    // Calculate incoming edge counts for each node.
    this.nodes.forEach((node) => {
      node.edges.forEach((edgeNode) => {
        incomingEdgeCounts.set(edgeNode, incomingEdgeCounts.get(edgeNode)! + 1);
      });
    });

    // Filter nodes with no incoming edges.
    const nodesWithoutIngoingEdges = this.nodes.filter((node) => {
      return incomingEdgeCounts.get(node) === 0;
    });

    return nodesWithoutIngoingEdges;
  }
}

export { DirectedGraph, GraphNode };
