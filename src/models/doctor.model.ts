import mongoose, { Schema, Document } from "mongoose";
// Definición de la estructura de un Doctor
interface IDoctor extends Document {
  nombre: string;
  apellido: string;
  correo: string;
  especialidad: Schema.Types.ObjectId;
}
// Esquema de mongoose para los Doctores
const doctorSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  especialidad: {
    type: Schema.Types.ObjectId,
    ref: "Especialidades",
    required: true,
  },
});
// Exporta el modelo de mongoose para los Doctores, basado en el esquema definido
export default mongoose.model<IDoctor>("Doctores", doctorSchema);
