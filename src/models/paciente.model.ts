import mongoose, { Schema, Document } from "mongoose";

interface IPaciente extends Document {
  nombre: string;
  apellido: string;
  cedula: string;
  fechaNacimiento: Date;
  telefono: string;
}

const pacienteSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cedula: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  telefono: { type: String, required: true },
});

export default mongoose.model<IPaciente>("Pacientes", pacienteSchema);
