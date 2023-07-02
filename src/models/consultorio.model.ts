import mongoose, { Schema, Document } from "mongoose";
interface IConsultorio extends Document {
  ciudad: string;
  direccion: string;
  numero: number;
  descripcion: string;
}
const consultorioSchema = new mongoose.Schema({
  ciudad: { type: String, required: true },
  direccion: { type: String, required: true },
  numero: { type: Number, required: true },
  descripcion: { type: String, required: true },
});
export default mongoose.model<IConsultorio>("Consultorios", consultorioSchema);
