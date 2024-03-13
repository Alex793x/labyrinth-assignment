"use client";
import { useEffect, useState } from "react"
import Maze from "../LabyrinthSolverPage/MazeSolver"
import { generateMaze } from "@/utils/GameEngine/LabyrinthGenerator"



const LabyrinthGeneratorPage = () => {
    const [mazeJson, setMazeJson] = useState<MazeConfig>()
    const [rowAmount, setRowAmount] = useState(20);
    const [colAmount, setColAmount] = useState(20);

    useEffect(() => {
        const newMaze = generateMaze(rowAmount, colAmount);
        if (newMaze) {
            setMazeJson(newMaze);
        }
    }, [rowAmount, colAmount]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;        
        const numValue = parseInt(inputValue, 10);
        if (!isNaN(numValue) && numValue >= 4 && numValue <= 100) {
            return numValue;
        }
        return 10;
    };

    return (
        <>
            <label htmlFor="rowInput" className="block mb-2">Enter row size must be between 4 and 100:</label>
            <input  
                type="number"
                id="rowInput"
                value={rowAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => alert(`THIS IS A DEMO - row size wont change yet to: ${handleChange(e)}`)}                
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <label htmlFor="rowInput" className="block mb-2">Enter column size must be between 4 and 100:</label>
            <input
                type="number"
                id="colInput"
                value={colAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => alert(`THIS IS A DEMO - col size wont change yet to: ${handleChange(e)}`)}                
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {mazeJson && <Maze mazeJson={mazeJson} />}
        </>
    )
}

export default LabyrinthGeneratorPage