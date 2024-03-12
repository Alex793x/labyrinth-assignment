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
    const maze: Cell[][] = Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => ({
            row,
            col,
            north: true,
            east: true,
            south: true,
            west: true,
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
    // Determine the orientation of the union
    if (cell1.row === cell2.row) {
        // Horizontal neighbor
        if (cell1.col < cell2.col) {
            cell1.east = false;
            cell2.west = false;
        } else {
            cell1.west = false;
            cell2.east = false;
        }
    } else {
        // Vertical neighbor
        if (cell1.row < cell2.row) {
            cell1.south = false;
            cell2.north = false;
        } else {
            cell1.north = false;
            cell2.south = false;
        }
    }
}

function isMazeConnected(maze: Cell[][], start: {row: number, col: number}): boolean {
    const rows = maze.length;
    const cols = maze[0].length;
    const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));

    function dfs(cell: Cell) {
        if (visited[cell.row][cell.col]) return;
        visited[cell.row][cell.col] = true;

        // North
        if (!cell.north && cell.row > 0) dfs(maze[cell.row - 1][cell.col]);
        // East
        if (!cell.east && cell.col < cols - 1) dfs(maze[cell.row][cell.col + 1]);
        // South
        if (!cell.south && cell.row < rows - 1) dfs(maze[cell.row + 1][cell.col]);
        // West
        if (!cell.west && cell.col > 0) dfs(maze[cell.row][cell.col - 1]);
    }

    dfs(maze[start.row][start.col]);

    // Check if all cells were visited
    return visited.every(row => row.every(cell => cell));
}

export function generateMaze(rows: number, cols: number): MazeConfig {
    let mazeConfig = initializeMaze(rows, cols);
    const { maze, start } = mazeConfig;
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
            union(cell1, cell2, maze);
            unionFind.union(id1, id2);
        }
    });

    // Ensure there's no isolated sections and there's a path from start to goal
    return mazeConfig;
}