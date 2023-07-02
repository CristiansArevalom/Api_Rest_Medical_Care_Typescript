import { Router } from "express";
import consultorioController from "../controller/consultorio.controller";

const consultorioRoutes = Router();
//rutas para consultorio
consultorioRoutes.get("/", consultorioController.getConsultorios);
consultorioRoutes.get("/:id", consultorioController.getConsultorioById);
consultorioRoutes.get("/reserva/fecha-inicio=:inicio&fecha-fin=:fin",consultorioController.getConsultoriosDisponibles);
consultorioRoutes.post("/", consultorioController.createConsultorio);
consultorioRoutes.put("/:id", consultorioController.updateConsultorio);
consultorioRoutes.delete("/:id", consultorioController.deleteConsultorio);
export default consultorioRoutes;
