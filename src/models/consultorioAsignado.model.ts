import mongoose, { Schema, Document } from "mongoose";
interface IConsultorioAsignado extends Document {
  inicioReserva: Date;
  finReserva: Date;
  doctor: Schema.Types.ObjectId;
  consultorio: Schema.Types.ObjectId;
}
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
export default mongoose.model<IConsultorioAsignado>(
  "ConsultoriosAsignados",
  consultorioAsignadoSchema
);
