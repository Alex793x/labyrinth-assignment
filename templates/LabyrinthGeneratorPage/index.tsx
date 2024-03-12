"use client";
import { ChangeEvent, useEffect, useState } from "react"
import Maze from "../LabyrinthSolverPage/MazeSolver"
import { generateMaze } from "@/utils/GameEngine/LabyrinthGenerator"



const LabyrinthGeneratorPage = () => {
    const [mazeJson, setMazeJson] = useState<MazeConfig>()
    const [rowAmount, setRowAmount] = useState(10);
    const [colAmount, setColAmount] = useState(10);

    useEffect(() => {
        const newMaze = generateMaze(rowAmount, colAmount);
        if (newMaze) {
            setMazeJson(newMaze);
        }
    }, [rowAmount, colAmount]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = parseInt(inputValue, 10);
        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 100) {
            return numericValue;
        }
    };

    return (
        <div>
            <label>
                Enter a number between 1 and 100:
                <input
                    type="text"
                    value={rowAmount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRowAmount(handleChange(e) ?? 10)}
                    placeholder="Enter a number"
                    maxLength={3} // Limit the maximum length to 3 characters
                />
            </label>
            <label>
                Enter a number between 1 and 100:
                <input
                    type="text"
                    value={colAmount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setColAmount(handleChange(e) ?? 10)}
                    placeholder="Enter a number"
                    maxLength={3} // Limit the maximum length to 3 characters
                />
            </label>
            {mazeJson && <Maze mazeJson={mazeJson} />}
        </div>
    )
}

export default LabyrinthGeneratorPage