export interface Task {
    id: string,
    title: string,
    description: string,
    completed: boolean,
    createdAd: Date,
}

export const tasks: Task[] = [
    {
        id: "1",
        title: "Codear el back",
        description: "Empezar a hacer los endpoints y la conexion con el front",
        completed: true,
        createdAd: new Date("2024-02-05T10:00:00Z")
    },
]