import mongoose, { Schema, Document } from "mongoose";
interface ICitaMedica extends Document {
  paciente: Schema.Types.ObjectId;
  especialidad: string;
  fechaInicio: Date;
  fechaFin: Date;
  consultorioAsignado: Schema.Types.ObjectId;
}
const citaMedicaSchema = new mongoose.Schema({
  paciente: { type: Schema.Types.ObjectId, ref: "Pacientes", required: true },
  especialidad: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  consultorioAsignado: {
    type: Schema.Types.ObjectId,
    ref: "ConsultoriosAsignados",
    required: true,
  },
});
export default mongoose.model<ICitaMedica>("CitasMedicas", citaMedicaSchema);
