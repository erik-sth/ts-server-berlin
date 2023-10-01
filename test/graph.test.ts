import { DirectedGraph, GraphNode } from "../Class/Graph"; // Replace with your actual file path

describe("DirectedGraph", () => {
  it("should add nodes correctly", () => {
    const graph = new DirectedGraph<string>();

    const nodeA = graph.addNode("A");
    const nodeB = graph.addNode("B");

    expect(graph.nodes).toContain(nodeA);
    expect(graph.nodes).toContain(nodeB);
  });

  it("should add edges correctly", () => {
    const graph = new DirectedGraph<string>();

    const nodeA = graph.addNode("A");
    const nodeB = graph.addNode("B");
    const nodeC = graph.addNode("C");

    graph.addEdge(nodeA, nodeB);
    graph.addEdge(nodeB, nodeC);

    expect(nodeA.edges).toContain(nodeB);
    expect(nodeB.edges).toContain(nodeC);
  });

  it("should remove nodes correctly", () => {
    const graph = new DirectedGraph<string>();

    const nodeA = graph.addNode("A");
    const nodeB = graph.addNode("B");
    const nodeC = graph.addNode("C");

    graph.addEdge(nodeA, nodeB);
    graph.addEdge(nodeB, nodeC);

    graph.removeNode(nodeB);

    expect(graph.nodes).toContain(nodeA);
    expect(graph.nodes).toContain(nodeC);
    expect(nodeA.edges).not.toContain(nodeB);
    expect(nodeC.edges).not.toContain(nodeB);
  });

  it("should check inclusion correctly", () => {
    const graph = new DirectedGraph<string>();

    const nodeA = graph.addNode("A");

    expect(graph.includes("A")).toBe(true);
    expect(graph.includes("B")).toBe(false);

    graph.removeNode(nodeA);

    expect(graph.includes("A")).toBe(false);
  });

  it("should get a node correctly", () => {
    const graph = new DirectedGraph<string>();

    const nodeA = graph.addNode("A");
    const nodeB = graph.addNode("B");

    const resultA = graph.getNode("A");
    const resultB = graph.getNode("B");
    const resultC = graph.getNode("C");

    expect(resultA).toEqual(nodeA);
    expect(resultB).toEqual(nodeB);
    expect(resultC).toBeUndefined();
  });

  it("should remove edges correctly", () => {
    const graph = new DirectedGraph<string>();

    const nodeA = graph.addNode("A");
    const nodeB = graph.addNode("B");
    const nodeC = graph.addNode("C");

    graph.addEdge(nodeA, nodeB);
    graph.addEdge(nodeB, nodeC);

    graph.removeEdge(nodeA, nodeB);

    expect(nodeA.edges).not.toContain(nodeB);
  });

  it("should get nodes without ingoing edges correctly", () => {
    const graph = new DirectedGraph<string>();

    const nodeA = graph.addNode("A");
    const nodeB = graph.addNode("B");
    const nodeC = graph.addNode("C");

    graph.addEdge(nodeA, nodeB);
    graph.addEdge(nodeB, nodeC);

    const result = graph.getNodesWithoutIngoingEdges();

    expect(result).toContain(nodeA);
    expect(result).not.toContain(nodeB);
    expect(result).not.toContain(nodeC);
  });
});
