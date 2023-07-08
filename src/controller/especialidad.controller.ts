import especialidadServices from "../services/especialidad.services";
import { Request, Response } from 'express';

export const getEspecialidades = async (req: Request, res: Response) => {
    try {
        const especialidades = await especialidadServices.getEspecialidades();
        res.json(especialidades);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener las especialidades ' + error });
    }
};
export const getEspecialidadById = async (req: Request, res: Response) => {
    try {
        const especialidad = await especialidadServices.getEspecialidadById(req.params.id);
        res.json(especialidad);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener la especialidad ' + error });
    }
};
export const getEspecialidadesByNombre = async (req: Request, res: Response) => {
    try {
        const especialidad = await especialidadServices.getEspecialidadesByNombre(req.params.nombre);
        res.json(especialidad)
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener la especialidad ' + error });
    }
}

export default {
    getEspecialidades,
    getEspecialidadById,
    getEspecialidadesByNombre
}