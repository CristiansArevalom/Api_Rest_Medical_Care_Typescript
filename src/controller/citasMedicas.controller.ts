import citaMedicaServices from "../services/citaMedica.services";
import e, { Request, Response } from "express";

export const getCitasMedicas = async (req: Request, res: Response) => {
    try {
        const citasMedicas = await citaMedicaServices.getCitasMedicas();
        res.json(citasMedicas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas medicas' + error });

    }
};

export const getCitasMedicasByConsultorioAsignadoId = async (req: Request, res: Response) => {
    try {
        const citasMedicas = await citaMedicaServices.getCitasMedicasByConsultorioAsignadoId(req.params.id);
        res.json(citasMedicas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas medicas' + error });

    }
};
export const getCitasMedicasByPacienteId = async (req: Request, res: Response) => {
    try {
        const citasMedicas = await citaMedicaServices.getCitasMedicasByPacienteId(req.params.id);
        res.json(citasMedicas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas medicas' + error });

    }
};
export const getCitasMedicasByDoctorId = async (req: Request, res: Response) => {
    try {
        const citasMedicas = await citaMedicaServices.getCitasMedicasByDoctorId(req.params.id);
        res.json(citasMedicas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas medicas' + error });

    }
};
export const getCitasMedicasByEspecialidad = async (req: Request, res: Response) => {
    try {
        const citasMedicas = await citaMedicaServices.getCitasMedicasByEspecialidad(req.params.especialidad);
        res.json(citasMedicas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas medicas' + error });

    }
};


export const createCitasMedicas = async (req: Request, res: Response) => {
    try {
        const citasMedicas = await citaMedicaServices.createCitasMedicas(req.body);
        res.json(citasMedicas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas medicas' + error });

    }
};

export default {
    getCitasMedicas,
    createCitasMedicas,
    getCitasMedicasByConsultorioAsignadoId,
    getCitasMedicasByPacienteId,
    getCitasMedicasByDoctorId,
    getCitasMedicasByEspecialidad
    

}