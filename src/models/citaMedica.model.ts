import mongoose, { Schema, Document } from "mongoose";

// Define una interfaz que describe la estructura de una cita médica en la base de datos
interface ICitaMedica extends Document {
  paciente: Schema.Types.ObjectId;
  especialidad: string;
  fechaInicio: Date;
  fechaFin: Date;
  consultorioAsignado: Schema.Types.ObjectId;
}

// Crea un nuevo esquema de mongoose para las citas médicas
const citaMedicaSchema = new mongoose.Schema({
  paciente: { type: Schema.Types.ObjectId, ref: "Pacientes", required: true }, //// Campo paciente, referencia a la colección "Pacientes", es requerido
  especialidad: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  consultorioAsignado: { 
    type: Schema.Types.ObjectId,
    ref: "ConsultoriosAsignados",
    required: true,
  },
});
// Exporta el modelo de mongoose para las citas médicas, basado en el esquema definido

export default mongoose.model<ICitaMedica>("CitasMedicas", citaMedicaSchema);
