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
        const index = this.nodes.indexOf(node);
        if (index !== -1) {
            this.nodes.splice(index, 1);
            this.nodes.forEach((n) => {
                const edge_index = n.edges.indexOf(node);
                if (edge_index !== -1) {
                    n.edges.splice(edge_index, 1);
                }
            });
        }
    }
    includes(item: T): boolean {
        return this.nodes.some((node) => node.value === item);
    }
    getNode(value: T): GraphNode<T> {
        return this.nodes.find((node) => node.value === value);
    }
    removeEdge(from: GraphNode<T>, to: GraphNode<T>): void {
        const index = from.edges.indexOf(to);
        if (index !== -1) {
            from.edges.splice(index, 1);
        }
    }

    getNodesWithIndegreeZero(): GraphNode<T>[] {
        // Create a map to keep track of incoming edge counts for each node.
        const inDegreeMap = new Map<GraphNode<T>, number>();

        // Initialize the map with all nodes and set their counts to 0.
        this.nodes.forEach((node) => {
            inDegreeMap.set(node, 0);
        });

        // Calculate incoming edge counts for each node.
        this.nodes.forEach((node) => {
            node.edges.forEach((edgeNode) => {
                inDegreeMap.set(edgeNode, inDegreeMap.get(edgeNode)! + 1);
            });
        });
        // Filter nodes with no incoming edges.
        const inDegreeOfZero = this.nodes.filter((node) => {
            return inDegreeMap.get(node) === 0;
        });

        return inDegreeOfZero;
    }
}

export { DirectedGraph, GraphNode };
