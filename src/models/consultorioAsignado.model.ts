import mongoose, { Schema, Document } from "mongoose";

// Definición de la estructura de un consultorio asignado
interface IConsultorioAsignado extends Document {
  inicioReserva: Date;
  finReserva: Date;
  doctor: Schema.Types.ObjectId;// Identificador del doctor ,se espera un ObjectId de mongoose
  consultorio: Schema.Types.ObjectId; // Identificador del consultorio,  se espera un ObjectId de mongoose
}
// Esquema de mongoose para los consultorios asignados
const consultorioAsignadoSchema = new mongoose.Schema({
  inicioReserva: { type: Date, required: true },
  finReserva: { type: Date, required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctores", required: true },
  consultorio: {
    type: Schema.Types.ObjectId,
    ref: "Consultorios",
    required: true,
  },
});
// Modelo de mongoose para los consultorios asignados
export default mongoose.model<IConsultorioAsignado>(
  "ConsultoriosAsignados",
  consultorioAsignadoSchema
);
