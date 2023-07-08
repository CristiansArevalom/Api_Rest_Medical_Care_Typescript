import mongoose, { Schema, Document } from "mongoose";

// Define una interfaz que describe la estructura de una especialidad en la base de datos
interface IEspecialidad extends Document {
  nombre: string;
  descripcion: string;
}
// Crea un nuevo esquema de mongoose para la especialidad

const especialidadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
});
// Exporta el modelo de mongoose para la especialidad, basado en el esquema definido
export default mongoose.model<IEspecialidad>(
  "Especialidades",
  especialidadSchema
);
