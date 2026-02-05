import { NextResponse } from "next/server";
import { Task, tasks } from "./db";
import db from "../../database"
import Database from "better-sqlite3";

// ENDPOINT GET | Obtiene todas las Tareas
// export async function GET() {
//     return NextResponse.json(tasks)
// }

// ENDPOINT POST | Crea una tarwea nueva
// export async function POST(req: Request) {
//     const body = await req.json()

//     const newTask: Task = {
//         id: crypto.randomUUID(),
//         createdAd: new Date().toISOString(),
//         completed: false,
//         ...body
//     }

//     tasks.push(newTask)

//     return NextResponse.json(newTask)
// }

// ENDPOINT GET | Obtiene todas las Tareas
export async function GET() {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  return new Response(JSON.stringify(tasks), { status: 200 });
}

// ENDPOINT POST | Crea una tarwea nueva
export async function POST(request: Request) {
  const { title, description } = await request.json();
  const stmt = db.prepare('INSERT INTO tasks (title, description, createdAt) VALUES (?, ?, ?)');
  const info = stmt.run(title, description, new Date().toISOString());
  return new Response(JSON.stringify({ id: info.lastInsertRowid, title, description, createdAt: new Date().toISOString() }), { status: 201 });
}