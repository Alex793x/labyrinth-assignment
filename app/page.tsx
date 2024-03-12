import LabyrinthSolverPage from "@/templates/LabyrinthSolverPage";
import { generateMaze } from "@/utils/GameEngine/LabyrinthGenerator";
import { promises as fs, writeFile } from "fs";

function writeMazeToFile(mazeData: any, filePath: string): void {
  const data = JSON.stringify(mazeData, null, 2);
  fs.writeFile(filePath, data, 'utf8').then(() => {
    console.log('Data written to file');
  }).catch((err) => {
    console.error('An error occurred:', err);
  });
}

const mazeConfig = generateMaze(10, 10); // for a 6x7 maze


export default async function Home() {
  const mazeJsonString = await fs.readFile(process.cwd() + '/constants/mazeLarge.json', 'utf-8');

  const mazeJson = JSON.parse(mazeJsonString) as MazeConfig;

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <h1 className="text-2xl">A MAZE IS AMAZING WHEN U GET AMAZED</h1>
      <LabyrinthSolverPage mazeJson={mazeJson} />
    </main>
  );
}
