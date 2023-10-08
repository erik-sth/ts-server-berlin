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
    const NEW_NODE = new GraphNode(value);
    this.nodes.push(NEW_NODE);
    return NEW_NODE;
  }

  addEdge(from: GraphNode<T>, to: GraphNode<T>): void {
    from.edges.push(to);
  }

  removeNode(node: GraphNode<T>): void {
    const INDEX = this.nodes.indexOf(node);
    if (INDEX !== -1) {
      this.nodes.splice(INDEX, 1);
      this.nodes.forEach((n) => {
        const EDGE_INDEX = n.edges.indexOf(node);
        if (EDGE_INDEX !== -1) {
          n.edges.splice(EDGE_INDEX, 1);
        }
      });
    }
  }
  includes(item: T): boolean {
    return this.nodes.some((node) => node.value === item);
  }
  getNode(value: T): GraphNode<T> | undefined {
    return this.nodes.find((node) => node.value === value);
  }
  removeEdge(from: GraphNode<T>, to: GraphNode<T>): void {
    const INDEX = from.edges.indexOf(to);
    if (INDEX !== -1) {
      from.edges.splice(INDEX, 1);
    }
  }

  getNodesWithoutIngoingEdges(): GraphNode<T>[] {
    // Create a map to keep track of incoming edge counts for each node.
    const INCOMING_EDGE_COUNTS = new Map<GraphNode<T>, number>();

    // Initialize the map with all nodes and set their counts to 0.
    this.nodes.forEach((node) => {
      INCOMING_EDGE_COUNTS.set(node, 0);
    });

    // Calculate incoming edge counts for each node.
    this.nodes.forEach((node) => {
      node.edges.forEach((edgeNode) => {
        INCOMING_EDGE_COUNTS.set(
          edgeNode,
          INCOMING_EDGE_COUNTS.get(edgeNode)! + 1
        );
      });
    });
    // Filter nodes with no incoming edges.
    const NODES_WITHOUT_INGOING_EDGES = this.nodes.filter((node) => {
      return INCOMING_EDGE_COUNTS.get(node) === 0;
    });

    return NODES_WITHOUT_INGOING_EDGES;
  }
}

export { DirectedGraph, GraphNode };
