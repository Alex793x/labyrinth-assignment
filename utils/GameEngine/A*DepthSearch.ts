type CellNode = {
    cell: Cell;
    parent: CellNode | null;
    cost: number; // g
    heuristic: number; // h
    score: number; // f
};


function getNeighbor(maze: Cell[][], cell: Cell, direction: string): Cell | null {
    let newRow = cell.row;
    let newCol = cell.col;

    // Check if the direction is allowed based on the walls of the current cell
    switch (direction) {
        case 'north':
            if (!cell.north) return null; // There's a wall to the north
            newRow -= 1;
            break;
        case 'south':
            if (!cell.south) return null; // There's a wall to the south
            newRow += 1;
            break;
        case 'east':
            if (!cell.east) return null; // There's a wall to the east
            newCol += 1;
            break;
        case 'west':
            if (!cell.west) return null; // There's a wall to the west
            newCol -= 1;
            break;
        default:
            return null;
    }

    // Check if the new row and column are within the bounds of the maze
    if (newRow >= 0 && newRow < maze.length && newCol >= 0 && newCol < maze[0].length) {
        return maze[newRow][newCol];
    } else {
        return null;
    }
}

function manhattanDistance(a: { row: number; col: number }, b: { row: number; col: number }): number {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}


export function aStarSearch(mazeConfig: MazeConfig): Cell[] | null {
    const startCell = mazeConfig.maze[mazeConfig.start.row][mazeConfig.start.col];
    const goalCell = mazeConfig.maze[mazeConfig.goal.row][mazeConfig.goal.col];
    const openSet: CellNode[] = [];
    const closedSet: Set<Cell> = new Set();

    openSet.push({
        cell: startCell,
        parent: null,
        cost: 0,
        heuristic: manhattanDistance(mazeConfig.start, mazeConfig.goal),
        score: manhattanDistance(mazeConfig.start, mazeConfig.goal),
    });

    while (openSet.length > 0) {
        // Sort by the lowest score f = g + h
        openSet.sort((a, b) => a.score - b.score);

        const current = openSet.shift()!;

        if (current.cell === goalCell) {
            // Reconstruct path
            const path = [];
            let node: CellNode | null = current;
            while (node) {
                path.push(node.cell);
                node = node.parent;
            }
            return path.reverse();
        }

        closedSet.add(current.cell);

        // Add neighbors to the open set
        for (const direction of ['north', 'south', 'east', 'west']) {
            const neighborCell = getNeighbor(mazeConfig.maze, current.cell, direction);
            if (neighborCell && !closedSet.has(neighborCell)) {
                const tentativeGScore = current.cost + 1; // assuming cost to move to a neighbor is 1

                let neighborNode = openSet.find(node => node.cell === neighborCell);
                if (!neighborNode) {
                    neighborNode = {
                        cell: neighborCell,
                        parent: current,
                        cost: tentativeGScore,
                        heuristic: manhattanDistance({ row: neighborCell.row, col: neighborCell.col }, mazeConfig.goal),
                        score: 0,
                    };
                    openSet.push(neighborNode);
                } else if (tentativeGScore < neighborNode.cost) {
                    neighborNode.parent = current;
                    neighborNode.cost = tentativeGScore;
                }

                neighborNode.score = neighborNode.cost + neighborNode.heuristic;
            }
        }
    }

    return null; // If no path is found
}