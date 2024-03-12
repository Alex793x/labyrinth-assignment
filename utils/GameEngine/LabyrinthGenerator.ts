class UnionFind {
    private parent: Record<string, string>;

    constructor() {
        this.parent = {};
    }

    find(id: string): string {
        if (!this.parent[id]) {
            this.parent[id] = id;
        } else if (this.parent[id] !== id) {
            this.parent[id] = this.find(this.parent[id]);
        }
        return this.parent[id];
    }

    union(id1: string, id2: string): void {
        const root1 = this.find(id1);
        const root2 = this.find(id2);

        if (root1 !== root2) {
            this.parent[root2] = root1;
        }
    }
}

function initializeMaze(rows: number, cols: number): MazeConfig {
    // Initialize all paths as blocked (false)
    const maze: Cell[][] = Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => ({
            row,
            col,
            north: false,
            east: false,
            south: false,
            west: false,
        }))
    );

    return {
        rows,
        cols,
        start: { row: 0, col: 0 },
        goal: { row: rows - 1, col: cols - 1 },
        maze,
    };
}

function union(cell1: Cell, cell2: Cell, maze: Cell[][]): void {
    // When connecting two cells, set the direction to true to indicate an open path
    if (cell1.row === cell2.row) {
        if (cell1.col < cell2.col) {
            cell1.east = true;
            cell2.west = true;
        } else {
            cell1.west = true;
            cell2.east = true;
        }
    } else {
        if (cell1.row < cell2.row) {
            cell1.south = true;
            cell2.north = true;
        } else {
            cell1.north = true;
            cell2.south = true;
        }
    }
}

export function generateMaze(rows: number, cols: number): MazeConfig {
    let mazeConfig = initializeMaze(rows, cols);
    const { maze } = mazeConfig;
    const unionFind = new UnionFind();
    
    let edges: [Cell, Cell][] = [];

    // Generate edges
    maze.forEach(row => {
        row.forEach(cell => {
            if (cell.col < cols - 1) edges.push([cell, maze[cell.row][cell.col + 1]]); // Right
            if (cell.row < rows - 1) edges.push([cell, maze[cell.row + 1][cell.col]]); // Down
        });
    });

    // Shuffle edges
    edges = edges.sort(() => Math.random() - 0.5);

    edges.forEach(([cell1, cell2]) => {
        const id1 = `${cell1.row},${cell1.col}`;
        const id2 = `${cell2.row},${cell2.col}`;

        if (unionFind.find(id1) !== unionFind.find(id2)) {
            union(cell1, cell2, maze); // Open a path between the cells
            unionFind.union(id1, id2);
        }
    });

    return mazeConfig;
}