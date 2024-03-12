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

    return (
        <>
            {mazeJson && <Maze mazeJson={mazeJson} />}
        </>
    )
}

export default LabyrinthGeneratorPage