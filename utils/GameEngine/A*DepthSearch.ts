import Stack from "../Stack/Stack";

type CellNode = {
    cell: Cell;
    parent: CellNode | null;
    cost: number; // g
    heuristic: number; // h
    score: number; // f
};



function manhattanDistance(a: { row: number; col: number }, b: { row: number; col: number }): number {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function aStarSearch(mazeConfig: MazeConfig): { path: Cell[] | null, visited: Set<Cell> } {
    const startCell = mazeConfig.maze[mazeConfig.start.row][mazeConfig.start.col];
    const goalCell = mazeConfig.maze[mazeConfig.goal.row][mazeConfig.goal.col];
    const openSet = new Stack<CellNode>();
    const closedSet: Set<Cell> = new Set();
    const visitedCells: Set<Cell> = new Set();

    openSet.push({
        cell: startCell,
        parent: null,
        cost: 0,
        heuristic: manhattanDistance(mazeConfig.start, mazeConfig.goal),
        score: manhattanDistance(mazeConfig.start, mazeConfig.goal),
    });

    while (!openSet.isEmpty()) {
        // Sort by the lowest score f = g + h
        openSet.sort((a, b) => {
            const fScoreDiff = a.score - b.score;
            if (fScoreDiff === 0) { // Tie on f score
                return b.cost - a.cost; // Prefer higher g scores
            }
            return fScoreDiff;
        });
        const current = openSet.shift()!;

        if (current.cell === goalCell) {
            const path = [];
            let node: CellNode | null = current;
            while (node) {
                path.push(node.cell);
                node = node.parent;
            }
            return { path: path.reverse(), visited: visitedCells };
        }

        closedSet.add(current.cell);
        visitedCells.add(current.cell);

        // Add neighbors to the open set
        const neighbors: Cell[] = [];
        if (current.cell.north) neighbors.push(mazeConfig.maze[current.cell.row - 1][current.cell.col]);
        if (current.cell.south) neighbors.push(mazeConfig.maze[current.cell.row + 1][current.cell.col]);
        if (current.cell.east) neighbors.push(mazeConfig.maze[current.cell.row][current.cell.col + 1]);
        if (current.cell.west) neighbors.push(mazeConfig.maze[current.cell.row][current.cell.col - 1]);

        for (const neighbor of neighbors) {
            if (closedSet.has(neighbor)) {
                continue;
            }
        
            const tentativeGScore = current.cost + 1; // assuming cost to move to a neighbor is 1
            const neighborHeuristic = manhattanDistance({ row: neighbor.row, col: neighbor.col }, mazeConfig.goal);
            const tentativeFScore = tentativeGScore + neighborHeuristic;
        
            let neighborNode = openSet.find(node => node.cell === neighbor);
            if (!neighborNode) {
                // Create a new node for the neighbor
                neighborNode = {
                    cell: neighbor,
                    parent: current,
                    cost: tentativeGScore,
                    heuristic: neighborHeuristic,
                    score: tentativeFScore,
                };
                openSet.push(neighborNode);
            } else if (tentativeGScore < neighborNode.cost) {
                // Update the neighbor node if the new path is better
                neighborNode.parent = current;
                neighborNode.cost = tentativeGScore;
                neighborNode.heuristic = neighborHeuristic;
                neighborNode.score = tentativeFScore;
            }
        }
    }

    return { path: null, visited: visitedCells };
}