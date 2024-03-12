function generateMaze(rows: number, cols: number) {
    // Create a 2D array to represent the maze
    let maze = Array.from({ length: rows }, () => Array(cols).fill({}));

    // Initialize maze cells with default values
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            maze[row][col] = {
                row: row,
                col: col,
                north: true,
                east: true,
                west: true,
                south: true
            };
        }
    }

    // Recursive backtracking algorithm to generate the maze
    function backtrack(row: number, col: number) {
        // Mark the current cell as visited
        maze[row][col].visited = true;

        // Define the directions: up, right, down, left
        const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

        // Shuffle the directions
        directions.sort(() => Math.random() - 0.5);

        // Visit each direction
        for (let dir of directions) {
            let newRow = row + dir[0] * 2;
            let newCol = col + dir[1] * 2;

            // Check if the new cell is within bounds and unvisited
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !maze[newRow][newCol].visited) {
                // Mark the cell between the current and new cell as visited
                maze[row + dir[0]][col + dir[1]].visited = true;
                // Recursively visit the new cell
                backtrack(newRow, newCol);
            }
        }
    }

    // Start generating the maze from a random cell
    backtrack(Math.floor(Math.random() * rows), Math.floor(Math.random() * cols));

    // Set start and goal positions
    maze[0][0].start = true;
    maze[rows - 1][cols - 1].goal = true;

    return {
        rows: rows,
        cols: cols,
        start: { row: 0, col: 0 },
        goal: { row: rows - 1, col: cols - 1 },
        maze: maze
    };
}

// Example usage:
const rows = 4;
const cols = 4;
const maze = generateMaze(rows, cols);
console.log(JSON.stringify(maze));
