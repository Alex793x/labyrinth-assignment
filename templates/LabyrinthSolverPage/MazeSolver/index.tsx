"use client";

import { aStarSearch } from "@/utils/GameEngine/A*DepthSearch";
import { useEffect, useState } from "react";

type MazeProps = {
    mazeJson: MazeConfig
}

const Maze = ({ mazeJson }: MazeProps) => {
    const [path, setPath] = useState<Cell[]>([]);
    const [visited, setVisited] = useState<Set<Cell>>(new Set());
    const [wrongPaths, setWrongPaths] = useState<Cell[]>([]);
    const [pathPoints, setPathPoints] = useState<string>("");


    useEffect(() => {
        const result = aStarSearch(mazeJson);
        if (result.path) {
            const visitedButNotPath = Array.from(result.visited).filter(cell =>
                !(result.path ?? []).some(pathCell => pathCell.row === cell.row && pathCell.col === cell.col)
            );
            setWrongPaths(visitedButNotPath);// Set the wrong paths for animation
            setPath([]);
            setVisited(result.visited); // Update visited cells

            const drawPathWithDelay = (path: Cell[], delay: number) => {
                path.forEach((cell, index) => {
                    setTimeout(() => {
                        setPath(prevPath => [...prevPath, cell]);
                    }, index * delay);
                });
            };

            const drawWrongPathsWithDelay = (wrongPaths: Cell[], delay: number) => {
                wrongPaths.forEach((cell, index) => {
                    setTimeout(() => {
                        setVisited(prev => new Set(prev).add(cell));
                    }, index * delay);
                });
            };

            drawPathWithDelay(result.path, 200);
            drawWrongPathsWithDelay(visitedButNotPath, 200);
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

    const cellSize = 80;

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

    const getPathDirection = (current: Cell, next: Cell | null) => {
        if (!next) return '';
        if (next.col === current.col) {
            return next.row > current.row ? 'south' : 'north';
        } else {
            return next.col > current.col ? 'east' : 'west';
        }
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


    const calculateWrongPathPoints = (wrongPaths: Cell[]) => {
        return wrongPaths.map(cell => {
            const x = cell.col * cellSize + cellSize / 2;
            const y = cell.row * cellSize + cellSize / 2;
            return { x, y };
        });
    };

    return (
        <div className="relative text-center">
            <h2 className="p-4 text-xl" >RED IS THE STARTING POINT AND PURPLE IS THE GOAL!</h2>
            <div className="grid grid-row-3" style={{ width: mazeJson.cols * cellSize }}>
                {mazeJson.maze.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center cursor-pointer">
                        {row.map((cell, colIndex) => {
                            const isStart = mazeJson.start.row === rowIndex && mazeJson.start.col === colIndex;
                            const isGoal = mazeJson.goal.row === rowIndex && mazeJson.goal.col === colIndex;
                            const onPath = isPath(cell);
                            const pathIndex = path.findIndex(pathCell => pathCell.row === cell.row && pathCell.col === cell.col);
                            const nextPathCell = pathIndex >= 0 && pathIndex < path.length - 1 ? path[pathIndex + 1] : null;
                            const wrongPathPoints = calculateWrongPathPoints(wrongPaths).map(p => `${p.x},${p.y}`).join(' ');
                            const wrongPathLength = wrongPaths.length * cellSize;
                            const direction = getPathDirection(cell, nextPathCell);

                            return (
                                <div
                                    className={`h-20 w-20 border flex items-center justify-center font-bold font-mono text-9xl 
                                    ${isStart ? 'bg-red-400' : ''} 
                                    ${isGoal ? 'bg-purple-300' : ''}
                                    ${setBorder(cell)}`}
                                    key={colIndex}
                                >
                                    {visited.has(cell) && !isPath(cell) && (
                                        <svg className="absolute top-14 left-0" width="100%" height="100%">
                                            <circle cx={cell.col * cellSize + cellSize / 2} cy={cell.row * cellSize + cellSize / 2} r="2" fill="orange" />
                                        </svg>
                                    )}
                                    {wrongPaths.map((cell, index) => (
                                        <svg className="absolute top-14 left-0" width="100%" height="100%" key={`wrong-${index}`}>
                                            <circle
                                                cx={cell.col * cellSize + cellSize / 2}
                                                cy={cell.row * cellSize + cellSize / 2}
                                                r="3"
                                                fill="orange"
                                                style={{
                                                    animation: `fadeIn ${index * 0.15}s linear forwards`, // Adjust the timing as needed
                                                }}
                                            />
                                        </svg>
                                    ))}
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
    )
}

export default Maze