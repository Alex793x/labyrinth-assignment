"use client";

import { aStarSearch } from "@/utils/GameEngine/A*DepthSearch";
import { useEffect, useState } from "react";

type MazeProps = {
    mazeJson: MazeConfig
}

const Maze = ({ mazeJson }: MazeProps) => {
    const [path, setPath] = useState<Cell[]>([]);
    const [wrongPaths, setWrongPaths] = useState<Cell[]>([]);
    const [pathPoints, setPathPoints] = useState("");
    const [wrongPathPoints, setWrongPathPoints] = useState("");
    const cellSize = 80;

    useEffect(() => {
        const result = aStarSearch(mazeJson);
        if (result.path) {
            const visitedButNotPath = Array.from(result.visited).filter(cell =>
                !(result.path ?? []).some(pathCell => pathCell.row === cell.row && pathCell.col === cell.col)
            );
            // Set the wrong paths for animation
            setWrongPaths(visitedButNotPath);
            // Clear previous paths and visited cells
            setPath([]);


            const drawPathsWithDelay = (paths: Cell[], delay: number, isCorrectPath = true) => {
                paths.forEach((cell, index) => {
                    setTimeout(() => {
                        if (isCorrectPath) {
                            setPath(prevPath => [...prevPath, cell]);
                        }
                    }, index * delay);
                });
            };

            drawPathsWithDelay(result.path, 200, true);
            drawPathsWithDelay(visitedButNotPath, 200, false);
        }
    }, [mazeJson]);

    useEffect(() => {
        if (path.length > 0) {
            // Generate SVG path points
            const points = path.map((cell, index) => {
                const x = cell.col * cellSize + cellSize / 2;
                const y = cell.row * cellSize + cellSize / 2;
                return `${x},${y}`;
            }).join(' ');

            setPathPoints(points);
        }
    }, [path]);

    useEffect(() => {
        if (path.length > 0) {
            const points = path.map(cell => `${cell.col * cellSize + cellSize / 2},${cell.row * cellSize + cellSize / 2}`).join(' ');
            setPathPoints(points);
        }

        // For wrong paths, since their visualization might differ, ensure they're handled appropriately
        if (wrongPaths.length > 0) {
            const points = wrongPaths.map(cell => `${cell.col * cellSize + cellSize / 2},${cell.row * cellSize + cellSize / 2}`).join(' ');
            setWrongPathPoints(points);
        }
    }, [path, wrongPaths, cellSize]);

    const setBorder = (cell: Cell) => {
        let cssBorder = "";
        const directions: (keyof Cell)[] = ['north', 'east', 'south', 'west'];
        const cssClasses: { [key in keyof Cell]?: string } = {
            north: 'border-t-green-500 border-2',
            east: 'border-r-green-500 border-2',
            south: 'border-b-green-500 border-2',
            west: 'border-l-green-500 border-2'
        };

        directions.forEach((direction) => {
            if (!cell[direction]) {
                cssBorder += `${cssClasses[direction]} `;
            }
        });

        return cssBorder.trim();
    }

    const isPath = (cell: Cell) => {
        // Check if the current cell is part of the path
        return path.some(pathCell => pathCell.row === cell.row && pathCell.col === cell.col);
    };

    const isWrongPath = (cell: Cell) => {
        return wrongPaths.some(wrongPathCell => wrongPathCell.row === cell.row && wrongPathCell.col === cell.col);
    };


    const pathLength = path.reduce((totalLength, cell, index, arr) => {
        if (index < arr.length - 1) {
            const nextCell = arr[index + 1];
            const dx = (nextCell.col - cell.col) * cellSize;
            const dy = (nextCell.row - cell.row) * cellSize;
            return totalLength + Math.sqrt(dx * dx + dy * dy);
        }
        return totalLength;
    }, 0);

    const wrongPathLength = wrongPaths.reduce((totalLength, cell, index, arr) => {
        if (index < arr.length - 1) {
            const nextCell = arr[index + 1];
            const dx = (nextCell.col - cell.col) * cellSize;
            const dy = (nextCell.row - cell.row) * cellSize;
            return totalLength + Math.sqrt(dx * dx + dy * dy);
        }
        return totalLength;
    }, 0);


    return (
        <div className="relative text-center">
            <h2 className="p-4 text-xl">RED IS THE STARTING POINT AND PURPLE IS THE GOAL!</h2>
            <div className="grid grid-row-3" style={{ width: mazeJson.cols * cellSize }}>
                {mazeJson.maze.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center cursor-pointer">
                        {row.map((cell, colIndex) => {
                            const isStart = mazeJson.start.row === rowIndex && mazeJson.start.col === colIndex;
                            const isGoal = mazeJson.goal.row === rowIndex && mazeJson.goal.col === colIndex;
                            const onPath = isPath(cell);
                            const onWrongPath = isWrongPath(cell); // Check if the cell is on the wrong path


                            return (
                                <div
                                    className={`h-20 w-20 border flex items-center justify-center font-bold font-mono text-9xl 
                                    ${isStart ? 'bg-red-400' : ''} 
                                    ${isGoal ? 'bg-purple-300' : ''}
                                    ${setBorder(cell)}
                                    ${onWrongPath ? 'bg-orange-200' : ''}`} // Apply a different background if it's the wrong path
                                    key={colIndex}
                                >
                                    {onPath && (
                                        <svg className="absolute top-14 left-0" width="100%" height="100%">
                                            <polyline
                                                points={pathPoints}
                                                fill="none"
                                                stroke="red"
                                                strokeWidth="5"
                                                strokeDasharray={pathLength}
                                                strokeDashoffset={pathLength}
                                                style={{
                                                    animation: `drawPath ${path.length * 0.15}s linear forwards`
                                                }}
                                            />
                                        </svg>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Maze