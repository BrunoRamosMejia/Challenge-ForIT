"use client"
import React, { useState } from "react"
import { validateRegister } from "../helpers/validateForm"

export default function taskForm() {
    //ESTADO INICIAL
    const initialState = {
        title: "",
        description: "",
    }

    // ===== STATES =====
    const [form, setForm] = useState(initialState)

    const [errors, setErrors] = useState({
        title: "Se requiere un Nombre de tarea",
        description: "Se requiere una descripccion",
    })

    const [touched, setTouched] = useState({
        title: false,
        description: false,
    })

    // ===== HANDLERS =====
    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const updatedForm = {
            ...form,
            [name]: type === "checkbox" ? checked : value,
        };
        setForm(updatedForm)

        setErrors(validateRegister(updatedForm))
    }

    const handleTouched = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({
        ...prev,
        [name]: true,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTouched({
            title: true,
            description: true,
        });
        setErrors(validateRegister(form));

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Bad Request");
            setForm(initialState);
            alert("Tarea Creada Exitosamente!")
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="flex flex-col items-center pt-5">
            <h1 className="text-3xl font-bold text-[#c6dfff] mb-6">Crear Nueva Tarea</h1>
            <form 
                className="bg-[#1a2233] p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4 border"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-[#c6dfff] font-semibold mb-1">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        onBlur={handleTouched}
                        required
                        className="p-2 rounded bg-[#232e47] text-white focus:outline-none"
                        placeholder="Ingrese el título"
                    />
                    {touched.title && errors.title && (
                        <span style={{ color: '#8B0000', fontSize: '0.9em' }}>{errors.title}</span>
                    )}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-[#c6dfff] font-semibold mb-1">Descripción</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        onBlur={handleTouched}
                        required
                        className="p-2 rounded bg-[#232e47] text-white focus:outline-none"
                        placeholder="Ingrese la descripción"
                    />
                    {touched.description && errors.description && (
                        <span style={{ color: '#8B0000', fontSize: '0.9em' }}>{errors.description}</span>
                    )}
                </div>
                <div className="flex justify-between mt-1">
                    <button
                        type="submit"
                        className="bg-[#003aa5] text-white font-bold py-2 px-4 rounded hover:bg-[#3572cc] transition"
                    >
                        Crear
                    </button>
                    <button
                        type="reset"
                        className="bg-[#bedaff] text-[#000000] font-bold py-2 px-4 rounded hover:bg-[#a3c7e6] transition"
                    >
                        Reiniciar
                    </button>
                </div>
            </form>
        </div>
    )
}