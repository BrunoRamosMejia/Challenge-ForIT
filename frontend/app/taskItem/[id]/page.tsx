"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Task = {
    id: string;
    title: string;
    description: string;
    completed: string;
    createdAt: Date;
}

type TaskDto = {
    title: string,
    description: string,
}

export default function taskItem() {
    //ESTADO INICIAL
    const initialState = {
        title: "",
        description: "",
    }

    const params = useParams()
    const router = useRouter()

    // STATES
    const [task, setTask] = useState<Task | null>(null);

    const [form, setForm] = useState<TaskDto>(initialState)

    useEffect(() => {
        if (!task) {
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${params.id}`)
                .then((res) => res.json())
                .then((data) => setTask(data))
        }
        console.log("Tarea individual: ",task);
    });

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title,
                description: task.description,
            });
        }
    }, [task]);

    // HANDLERS
    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, type, checked } = e.target;
            const updatedForm = {
                ...form,
                [name]: type === "checkbox" ? checked : value,
            };
            setForm(updatedForm)
        }

    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${params.id}`, { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error("Bad Request")
            alert("Tarea actualizada exitosamente")
            router.push("/taskList")
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = () => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${params.id}`, { method: "DELETE" })
            .then((res => res.json()))
            .then((data) => {
                alert("Tarea eliminada exitosamente");
                router.push("/taskList")
            })
    };

    return(
        <div className="max-w-xl mx-auto mt-10 bg-[#1a2233] p-8 rounded-lg shadow-lg text-[#6d97ce]">
            <h1 className="text-3xl font-bold mb-6 text-center">Detalle de la tarea</h1>
            <div className="mb-8">
                <p className="mb-2"><span className="font-semibold">Título: </span>{task?.title}</p>
                <p className="mb-2"><span className="font-semibold">Descripción: </span>{task?.description}</p>
                <p className="mb-2"><span className="font-semibold">Fecha de creacion: </span>{task?.createdAt ? new Date(task.createdAt).toLocaleDateString('es-ES') : ""}</p>
            </div>
            <form 
                className="flex flex-col gap-4 mb-6"
                onSubmit={handleSubmit}
            >
                <label className="flex flex-col">
                    <span className="mb-1 font-semibold">Titulo</span>
                    <input
                        type="text"
                        className="p-2 rounded bg-[#22304a] text-[#c6dfff] border border-[#3a4a6b] focus:outline-none"
                        onChange={handleChange}
                        name="title"
                        value={form.title}
                    />
                </label>
                <label className="flex flex-col">
                    <span className="mb-1 font-semibold">Descripción</span>
                    <input
                        className="p-2 rounded bg-[#22304a] text-[#c6dfff] border border-[#3a4a6b] focus:outline-none"
                        onChange={handleChange}
                        name="description"
                        value={form.description}
                    />
                </label>
                <button
                    type="submit"
                    className="bg-[#71a8f7] hover:bg-[#487df0] text-black font-bold py-2 px-4 rounded transition"
                >
                    Guardar Cambios
                </button>
            </form>
            <button
                className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded transition w-full"
                type="button"
                onClick={handleDelete}
            >
                Borrar Tarea
            </button>
        </div>
    )
}