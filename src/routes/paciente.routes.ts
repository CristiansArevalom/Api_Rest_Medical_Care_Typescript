import { Router } from 'express';
import pacienteController from '../controller/paciente.controller';

const pacienteRoutes = Router();
//rutas para pacientes
pacienteRoutes.get('/', pacienteController.getPacientes);
pacienteRoutes.get('/:id', pacienteController.getPacienteById);
pacienteRoutes.get('/cedula/:cedula', pacienteController.getPacientesByCedula);
pacienteRoutes.post('/', pacienteController.createPaciente);
pacienteRoutes.put('/:id', pacienteController.updatePaciente);
pacienteRoutes.delete('/:id', pacienteController.deletePaciente);

export default pacienteRoutes;


