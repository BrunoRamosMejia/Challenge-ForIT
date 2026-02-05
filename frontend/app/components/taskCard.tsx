import Link from "next/link"

interface TaskCardProps {
    task: {
        id: string,
        title: string,
        description: string,
        completed: boolean,
        createdAt: Date,
    },
    onToggleCompleted?: (id: string) => void
}

const TaskCard: React.FC<TaskCardProps> = ({task, onToggleCompleted}) => {
    console.log("ESte es mi console.log: ",task)
    return(
        <div className="flex items-center gap-3 rounded-lg border p-3 m-8 md:mx-50 bg-[#123a5f] shadow">
            <input
                type="checkbox"
                checked={!!task.completed}
                onChange={() => onToggleCompleted && onToggleCompleted(task.id)}
                className="shrink-0 mt-1 accent-[#A47551] w-7 h-7"
            />
            <div>
                <Link href={`/taskItem/${task.id}`} className="font-semibold text-[#000000]">
                    {task.title}
                </Link>
                <p className="text-[#1a1a1a]">{task.description}</p>
            </div>
            <p>{new Date(task.createdAt).toLocaleDateString('es-ES')}</p>
        </div>
    )
}

export default TaskCard