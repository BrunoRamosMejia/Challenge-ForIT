export const validateRegister = (input: {
  title: string;
  description: string;
}) => {
  return {
    title: !input.title.trim() ? "Se requiere un Nombre de tarea" : "",
    description: !input.description.trim() ? "Se requiere una descripccion" : "",
  };
};