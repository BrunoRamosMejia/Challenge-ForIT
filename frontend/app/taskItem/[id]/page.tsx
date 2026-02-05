"use client"
import { useEffect, useState } from "react";

interface TaskItemPageProps {
    params: { id: string }
}

export default function taskItem({ params }: TaskItemPageProps) {
    const [task, setTask] = useState(null);

    return(
        <div className="max-w-xl mx-auto mt-10 bg-[#1a2233] p-8 rounded-lg shadow-lg text-[#6d97ce]">
            <h1 className="text-3xl font-bold mb-6 text-center">Detalle de la tarea</h1>
            <div className="mb-8">
                <p className="mb-2"><span className="font-semibold">Título:</span>titulo</p>
                <p className="mb-2"><span className="font-semibold">Descripción:</span>desc</p>
                <p className="mb-2"><span className="font-semibold">Fecha de creacion:</span>fecha</p>
            </div>
            <form className="flex flex-col gap-4 mb-6">
                <label className="flex flex-col">
                    <span className="mb-1 font-semibold">Título</span>
                    <input
                        type="text"
                        className="p-2 rounded bg-[#22304a] text-[#c6dfff] border border-[#3a4a6b] focus:outline-none"
                    />
                </label>
                <label className="flex flex-col">
                    <span className="mb-1 font-semibold">Descripción</span>
                    <textarea
                        className="p-2 rounded bg-[#22304a] text-[#c6dfff] border border-[#3a4a6b] focus:outline-none"
                        rows={4}
                    />
                </label>
                <button
                    type="submit"
                    className="bg-[#3a8bfd] hover:bg-[#2563eb] text-white font-bold py-2 px-4 rounded transition"
                >
                    Guardar Cambios
                </button>
            </form>
            <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition w-full"
                type="button"
            >
                Borrar Tarea
            </button>
        </div>
    )
}