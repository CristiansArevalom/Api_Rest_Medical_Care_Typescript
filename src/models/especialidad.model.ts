import mongoose, { Schema, Document } from "mongoose";

interface IEspecialidad extends Document {
  nombre: string;
  descripcion: string;
}

const especialidadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
});
export default mongoose.model<IEspecialidad>(
  "Especialidades",
  especialidadSchema
);
