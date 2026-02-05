import "./globals.css"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <nav className="flex justify-center py-3 bg-gray-950">
          <a href="/" className="bg-blue-200 p-3 rounded-xl mx-4 hover:bg-blue-50 border-2 border-blue-800 text-black font-semibold">Home</a>
          <a href="/taskList" className="bg-blue-200 p-3 rounded-xl mx-4 hover:bg-blue-50 border-2 border-blue-800 text-black font-semibold">Tareas</a>
          <a href="/taskForm" className="bg-blue-200 p-3 rounded-xl mx-4 hover:bg-blue-50 border-2 border-blue-800 text-black font-semibold">Crear Tarea</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
