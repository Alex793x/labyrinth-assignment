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
    const openSet: CellNode[] = [];
    const closedSet: Set<Cell> = new Set();
    const visitedCells: Set<Cell> = new Set();
    
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
        
        let neighborNode = openSet.find(node => node.cell === neighbor);
        if (!neighborNode) {
          neighborNode = {
            cell: neighbor,
            parent: current,
            cost: tentativeGScore,
            heuristic: manhattanDistance({ row: neighbor.row, col: neighbor.col }, mazeConfig.goal),
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
    
    return { path: null, visited: visitedCells };
  }