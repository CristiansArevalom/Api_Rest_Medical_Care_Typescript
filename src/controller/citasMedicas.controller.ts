import citaMedicaServices from "../services/citaMedica.services";
import { Request, Response } from "express";

// Obtener las citas médicas utilizando el servicio "getCitasMedicas" de "citaMedicaServices"
export const getCitasMedicas = async (req: Request, res: Response) => {
    try {
        const citasMedicas = await citaMedicaServices.getCitasMedicas(); // Obtener las citas médicas utilizando el servicio "getCitasMedicas" de "citaMedicaServices"
         // Enviar las citas médicas como respuesta en formato JSON
        res.json(citasMedicas);
    } catch (error) {
        // En caso de error, enviar una respuesta con estado 400 y un mensaje de error en formato JSON
        res.status(400).json({ message: 'Error al obtener las citas medicas' + error });

    }
};
// Definir una función asíncrona llamada "getCitasMedicasByConsultorioAsignadoId" con los parámetros "req" y "res" de tipo "Request" y "Response" 
export const getCitasMedicasByConsultorioAsignadoId = async (req: Request, res: Response) => {
    try {
        // Obtener las citas médicas utilizando el servicio  de "citaMedicaServices"
        const citasMedicas = await citaMedicaServices.getCitasMedicasByConsultorioAsignadoId(req.params.id);
        // Enviar las citas médicas como respuesta en formato JSON
        res.json(citasMedicas);
    } catch (error) {
        // En caso de error, enviar una respuesta con estado 400 y un mensaje de error en formato JSON
        res.status(400).json({ message: 'Error al obtener las citas medicas' + error });

    }
};
export const getCitasMedicasByPacienteId = async (req: Request, res: Response) => {
    try {
        const citasMedicas = await citaMedicaServices.getCitasMedicasByPacienteId(req.params.id);
        res.json(citasMedicas);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener las citas medicas' + error });

    }
};
export const getCitasMedicasByDoctorId = async (req: Request, res: Response) => {
    try {
        const citasMedicas = await citaMedicaServices.getCitasMedicasByDoctorId(req.params.id);
        res.json(citasMedicas);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener las citas medicas' + error });

    }
};
export const getCitasMedicasByEspecialidad = async (req: Request, res: Response) => {
    try {
        const citasMedicas = await citaMedicaServices.getCitasMedicasByEspecialidad(req.params.especialidad);
        res.json(citasMedicas);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener las citas medicas' + error });

    }
};


export const createCitasMedicas = async (req: Request, res: Response) => {
    try {
        const citasMedicas = await citaMedicaServices.createCitasMedicas(req.body);
        res.json(citasMedicas);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener las citas medicas' + error });

    }
};
// Exportar un objeto con todas las funciones controladoras definidas anteriormente
export default {
    getCitasMedicas,
    createCitasMedicas,
    getCitasMedicasByConsultorioAsignadoId,
    getCitasMedicasByPacienteId,
    getCitasMedicasByDoctorId,
    getCitasMedicasByEspecialidad
    

}