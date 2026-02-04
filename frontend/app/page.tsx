import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans">
      <nav className="flex justify-center py-3 bg-gray-950">
        <a href="#" className="bg-blue-200 p-3 rounded-xl mx-4 hover:bg-blue-50 border-2 border-blue-800 text-black font-semibold">Tareas</a>
        <a href="#" className="bg-blue-200 p-3 rounded-xl mx-4 hover:bg-blue-50 border-2 border-blue-800 text-black font-semibold">Crear Tarea</a>
      </nav>
      
      <main className="flex flex-col my-30 items-center">
        <h1 className="text-3xl font-bold py-2 text-gray-400">Challenge ForIT | Bruno Ramos Mejia</h1>
        <h3 className="text-lg font-medium text-center p-2">Tecnologias Utilizadas: NextJS, Node.js, Git, Tailwindcss, entre otras</h3>
      </main>
    </div>
  );
}
