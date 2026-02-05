"use client"

import { useEffect, useState } from "react";
import TaskCard from "../components/taskCard";

export default function taskList() {
    // ESTADOS
    const [tasks, setTasks] = useState<any[] | null>(null)

    // USE EFFECT
    useEffect(() => {
        if (!tasks) {
            fetch("/api/tasks")
                .then((res) => res.json())
                .then((data) => setTasks(data))
                .catch((error) => console.error("Bad Request: ", error))
        }
        console.log(tasks)    
    })

    // HANDLERS
    const handleToggleCompleted = (id: string) => {
        if (!tasks) return;
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return(
        <div>
            <h1 className="flex justify-center pt-5 text-3xl font-bold text-[#c6dfff]">Lista de Tareas:</h1>

            {/* Seccion de tareas */}
            <div>
                {Array.isArray(tasks) && tasks.map((task) => (
                    <TaskCard 
                        key={task.id}
                        task={task}
                        onToggleCompleted={handleToggleCompleted}
                    />
                ))}
            </div>
        </div>
    )
}