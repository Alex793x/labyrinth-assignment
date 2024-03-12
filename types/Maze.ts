type Cell = {
    row: number;
    col: number;
    north: boolean;
    east: boolean;
    west: boolean;
    south: boolean;
  }
  
  type MazeConfig = {
    rows: number;
    cols: number;
    start: { row: number; col: number };
    goal: { row: number; col: number };
    maze: Cell[][];
  } 