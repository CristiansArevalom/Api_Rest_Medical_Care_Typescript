import mongoose, { Schema, Document } from "mongoose";

// Define una interfaz que describe la estructura de un consultorio en la base de datos
interface IConsultorio extends Document {
  ciudad: string;
  direccion: string;
  numero: number;
  descripcion: string;
}
// Crea un nuevo esquema de mongoose para los consultorios
const consultorioSchema = new mongoose.Schema({
  ciudad: { type: String, required: true },
  direccion: { type: String, required: true },
  numero: { type: Number, required: true },
  descripcion: { type: String, required: true },
});
// Exporta el modelo de mongoose para los consultorios, basado en el esquema definido
export default mongoose.model<IConsultorio>("Consultorios", consultorioSchema);
