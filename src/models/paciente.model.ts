import mongoose, { Schema, Document } from "mongoose";
// Define una interfaz que describe la estructura de un Paciente en la base de datos
interface IPaciente extends Document {
  nombre: string;
  apellido: string;
  cedula: string;
  fechaNacimiento: Date;
  telefono: string;
}
// Crea un nuevo esquema de mongoose para los Pacientes
const pacienteSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cedula: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  telefono: { type: String, required: true },
});
// Exporta el modelo de mongoose para los Pacientes, basado en el esquema definido

export default mongoose.model<IPaciente>("Pacientes", pacienteSchema);
