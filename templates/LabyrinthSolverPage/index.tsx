import Maze from "./MazeSolver"


type LabyrinthSolverPageProps = {
    mazeJson: MazeConfig;
}

const LabyrinthSolverPage = ({ mazeJson }: LabyrinthSolverPageProps) => {

    return (
        <div>
            <Maze mazeJson={mazeJson} />
        </div>
    )
}

export default LabyrinthSolverPage