import { Router } from 'express';
import especialidadController from '../controller/especialidad.controller';

const especialidadRoutes = Router();
//rutas para especialidades
especialidadRoutes.get('/', especialidadController.getEspecialidades);
especialidadRoutes.get('/:id', especialidadController.getEspecialidadById);
especialidadRoutes.get('/nombre/:nombre', especialidadController.getEspecialidadesByNombre);
export default especialidadRoutes;