import LabyrinthGeneratorPage from "@/templates/LabyrinthGeneratorPage";

export default async function GeneratorPage() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
        <h1 className="text-2xl">A MAZE IS AMAZING WHEN U GET AMAZED</h1>
        <LabyrinthGeneratorPage />
      </main>
    );
  }