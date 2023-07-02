import {Router} from 'express';
import doctorController from '../controller/doctor.controller';


const doctorRoutes=Router();
//rutas para doctor
doctorRoutes.get('/',doctorController.getDoctores);
doctorRoutes.get('/:id',doctorController.getDoctorById);
doctorRoutes.get('/especialidad/:especialidad',doctorController.getDoctorByEspecialidad);
doctorRoutes.post('/',doctorController.createDoctor);


export default doctorRoutes;