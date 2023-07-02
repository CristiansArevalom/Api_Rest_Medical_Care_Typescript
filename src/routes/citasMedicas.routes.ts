import { Router } from "express";
import citasMedicasController from "../controller/citasMedicas.controller";

const citasMedicasRouter = Router();

//rutas para citasMedicas
citasMedicasRouter.get("/", citasMedicasController.getCitasMedicas);
citasMedicasRouter.get("/consultorio-asignado/:id",citasMedicasController.getCitasMedicasByConsultorioAsignadoId);
citasMedicasRouter.get("/paciente/:id",citasMedicasController.getCitasMedicasByPacienteId);
citasMedicasRouter.get("/doctor/:id",citasMedicasController.getCitasMedicasByDoctorId);
citasMedicasRouter.get("/especialidad/:especialidad",citasMedicasController.getCitasMedicasByEspecialidad);
citasMedicasRouter.post("/", citasMedicasController.createCitasMedicas);

export default citasMedicasRouter;
