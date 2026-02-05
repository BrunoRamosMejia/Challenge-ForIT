import db from "../../../database";


// ENDPOINT GET | Obtiene una tarea por ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);

    if (!task) {
        return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(task), { status: 200 });
}

// ENDPOINT DELETE | Eliminar una tarea por ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = db.prepare('DELETE * FROM tasks WHERE id = ?').run(id);

    if (result.changes === 0) {
        return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Task deleted" }), { status: 200 });
}