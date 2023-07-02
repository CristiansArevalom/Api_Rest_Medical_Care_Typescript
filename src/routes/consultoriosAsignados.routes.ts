import {Router} from 'express';
import consultorioAsignadoController from '../controller/consultorioAsignado.controller';

const consultorioAsignadoRoutes=Router();

//rutas para consultorioAsignado
consultorioAsignadoRoutes.get('/',consultorioAsignadoController.getConsultoriosAsignados);
consultorioAsignadoRoutes.get('/:id',consultorioAsignadoController.getConsultorioAsignadoById);
consultorioAsignadoRoutes.get('/consultorio/:id',consultorioAsignadoController.getConsultorioAsignadoByIdConsultorio);
consultorioAsignadoRoutes.get('/especialidad/:especialidad',consultorioAsignadoController.getConsultorioAsignadoByEspecialidad);
consultorioAsignadoRoutes.post('/',consultorioAsignadoController.createConsultorioAsignado);

export default consultorioAsignadoRoutes;