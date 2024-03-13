# Solution for maze generator and maze solver

## LINK FOR DEPLOYED VERSION
`LINK IS FOR DEPLOYED GITHUB PAGES` -> [LINK TO DEPLOYED GITHUB PAGES]()

## Algortihm used for the maze solver
[Link for maze solver](https://github.com/Alex793x/labyrinth-assignment/blob/main/utils/GameEngine/A*DepthSearch.ts)
<br>

The maze solver is using a stack data structure to keep track of the current path explored.
It is making use of heuristc `A* search algorithm` searching to prioritize cells which are estimated to be closer to the goal, based on
manhattan distance calculation.  It is a combination of `Dijkstra's algorithm` and a `heuristic function`, often referred to as a best-first search algorithm.
The solver doesn't rely on recursion it instead uses a loop to iterate over cells in the maze until it finds the goal or exhausts all possibilities.

### Big O Notation: 
The time complexity of A* Search depends on several factors, including the heuristic function and the structure of the maze. In the worst case, where all cells need to be considered, it can be exponential. However, with a good heuristic function, it typically performs well, often close to linear time complexity (O(n log n)), where n is the number of cells in the maze.

### How the algorithm works:

- It maintains two sets: `openSet` and `closedSet`. The `openSet` contains nodes to be evaluated, and the `closedSet` contains nodes that have already been evaluated.
- The algorithm iterates over nodes in the `openSet`, selecting the one with the lowest combined cost (f = g + h), where g is the cost from the start node to the current node, and h is the heuristic estimate of the cost from the current node to the goal.
- It expands the selected node by considering its neighbors, updating their costs, and adding them to the `openSet` if necessary.
- The process continues until the goal node is reached or the `openSet` becomes empty, indicating that there is no path to the goal.

The provided code efficiently implements the A* search algorithm for finding the shortest path through a maze using a stack data structure to manage the `openSet`.

## Algortihm used for the maze generator
[Link to maze generator](https://github.com/Alex793x/labyrinth-assignment/blob/main/utils/GameEngine/LabyrinthGenerator.ts)

The maze generator generates a maze using a variation of the randomized `Kruskal's algorithm`, combined with the `Union-Find data structure`.

### What is Kruskal's algorithm:
`Kruskal's algorithm` is a greedy approach for finding the Minimum Spanning Tree (MST) of a connected, undirected graph. The MST is a subset of edges that form a tree and connect all vertices with the minimum total edge weight.

Initialization: Create a forest where each vertex is a separate tree.
Sort Edges: Arrange all edges by weight in non-decreasing order.
Iterate Over Edges: For each edge:
If adding it to the forest doesn't create a cycle, include it in the MST.
Use a structure like Union-Find to detect cycles.
Termination: Repeat until all vertices are connected or there are n-1 edges in the MST (n is the number of vertices).
Output: The selected edges form the MST.
Kruskal's algorithm is efficient with a typical time complexity of O(E log E), suitable for sparse graphs where edges are much fewer than vertices.

### What is union-find data structure:
The Union-Find data structure, also known as Disjoint-Set Union (DSU), is a data structure used to efficiently manage disjoint sets and perform operations such as union and find. It's commonly used in algorithms like Kruskal's algorithm for finding minimum spanning trees and in other graph algorithms.
The datastrucutre can be implemented using an array or a tree-based approach:
- `Array Implementation` In this approach, each element in the set is represented by an index in the array. The value at each index represents the parent of the element. The representative of the set is the root of the tree formed by following parent pointers.
- `Tree-Based Implementation` In this approach, each set is represented by a tree. The parent of each element in the tree points to its ancestor until the root of the tree is reached. The representative of the set is the root of the tree.

### Big O Notation
The time complexity of the maze generation algorithm depends on several factors, including the size of the maze (number of cells) and the efficiency of the Union-Find data structure. In this implementation:
Initializing the maze and creating the initial set of edges takes O(rows * cols) time.
Shuffling the edges takes O(E log E) time, where E is the number of edges.
Iterating through the edges and performing union operations takes O(E α(V)) time, where α is the inverse Ackermann function, which grows extremely slowly and can be considered constant for all practical purposes.
Therefore, the overall time complexity is dominated by the sorting step and can be approximated as O(rows * cols + E log E).


### How the algorithm works:
Leverages the `UnionFind` class to efficiently manage connected cell groups and avoid cycles during maze creation.

* `unionFind.find(id)`: Determines the root cell of the set a cell belongs to (path compression for faster future lookups).
* `union(id1, id2)`: Merges the sets containing cells `id1` and `id2`.

##### Maze Initialization:

* `initializeMaze(rows, cols)`: Creates a 2D array representing the maze, with each cell object containing boolean flags for north, east, south, and west paths (initially all blocked).

##### Union Function:

* `union(cell1, cell2, maze)`: Opens a path between two cells by setting the appropriate direction flag to true in the maze array.

##### Generating the Maze: `generateMaze(rows, cols)`:

1. Initializes the maze and creates a `UnionFind` instance.
2. Generates a list of all possible edges (connections) between adjacent cells and shuffles them for randomness.
3. Iterates through edges:
    * Uses `unionFind.find` to check if connecting the cells would create a cycle (ensuring a single path).
    * If not a cycle, opens the path between the cells using `union` and updates `UnionFind` to reflect the merged sets.
4. Returns the final maze configuration.

In essence, the code constructs the maze by iteratively adding connections between cells while guaranteeing a single path through the maze using the Union-Find data structure for efficient set management.