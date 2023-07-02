import mongoose, { Schema, Document } from "mongoose";

interface IDoctor extends Document {
  nombre: string;
  apellido: string;
  correo: string;
  especialidad: Schema.Types.ObjectId;
}

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
export default mongoose.model<IDoctor>("Doctores", doctorSchema);
